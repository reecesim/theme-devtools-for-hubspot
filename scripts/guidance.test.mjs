// SPDX-License-Identifier: Apache-2.0
//
// Checks the guidance text itself, the way an agent will copy it:
// - no JSON example in any Markdown file of the plugin names a field `label`,
//   `body` or `name` (HubSpot's upload refuses them at any depth, groups and
//   repeaters included), and no example reads one from `module`;
// - hubl-authoring states that rule under its own heading;
// - no skill promises that a theme will or should upload;
// - the changelog has an entry for the version in plugin.json;
// - the plugin's name, listing name and author, its root NOTICE and the README's
//   title, licence holder and trademark line.
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

const pluginRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
export const RESERVED_FIELD_NAMES = ['label', 'body', 'name'];
const RESERVED_NAME_TEXT = /"name"\s*:\s*"(label|body|name)"/g;

function walk(dir, suffix) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(path, suffix));
    else if (entry.isFile() && entry.name.endsWith(suffix)) out.push(path);
  }
  return out;
}

const rel = (path) => relative(pluginRoot, path).split(sep).join('/');

/** Every fenced code block in a Markdown text: { info, line, text }. */
export function fences(markdown) {
  const out = [];
  let open = null;
  markdown.split(/\r?\n/).forEach((line, index) => {
    if (!open) {
      const start = /^\s*(`{3,}|~{3,})\s*([^\s`]*)/.exec(line);
      if (start) open = { marker: start[1], info: start[2].toLowerCase(), line: index + 1, body: [] };
      return;
    }
    const end = /^\s*(`{3,}|~{3,})\s*$/.exec(line);
    if (end && end[1][0] === open.marker[0] && end[1].length >= open.marker.length) {
      out.push({ info: open.info, line: open.line, text: open.body.join('\n') });
      open = null;
    } else {
      open.body.push(line);
    }
  });
  return out;
}

/** Parses a fence as JSON, or as the body of an object (a fragment such as `"key": {…}`); null if neither. */
export function parseJsonFence(text) {
  for (const candidate of [text, `{${text}}`]) {
    try {
      return { value: JSON.parse(candidate) };
    } catch {
      // try the next form
    }
  }
  return null;
}

/** Field entries (objects with a string `name` and `type`) whose name is reserved, at any depth. */
export function reservedFieldEntries(value, path = '$') {
  const hits = [];
  if (Array.isArray(value)) {
    value.forEach((item, i) => hits.push(...reservedFieldEntries(item, `${path}[${i}]`)));
  } else if (value && typeof value === 'object') {
    if (typeof value.name === 'string' && typeof value.type === 'string' && RESERVED_FIELD_NAMES.includes(value.name)) {
      hits.push(`${path}: ${value.type} field named "${value.name}"`);
    }
    for (const [key, child] of Object.entries(value)) hits.push(...reservedFieldEntries(child, `${path}.${key}`));
  }
  return hits;
}

/** Every reserved-name finding in one fence's text: from the parsed tree, and from the raw text either way. */
export function reservedNamesInJson(text) {
  const findings = [];
  const parsed = parseJsonFence(text);
  if (parsed) findings.push(...reservedFieldEntries(parsed.value));
  for (const match of text.matchAll(RESERVED_NAME_TEXT)) findings.push(`text: ${match[0]}`);
  return { parsed: Boolean(parsed), findings };
}

function isJsonFence(fence) {
  if (fence.info === 'json' || fence.info === 'jsonc') return true;
  const trimmed = fence.text.trim();
  return (trimmed.startsWith('{') || trimmed.startsWith('[')) && parseJsonFence(trimmed) !== null;
}

/**
 * Reserved-name findings across fences, each `file:line: finding`. JSON fences are parsed
 * and walked; every fence, JSON or not (an unlabelled or abbreviated excerpt), gets the
 * raw-text scan, so a `"name": "body"` cannot hide in a fence that does not parse.
 */
export function reservedNamesInFences(fenceList) {
  const problems = [];
  for (const fence of fenceList) {
    const findings = isJsonFence(fence)
      ? reservedNamesInJson(fence.text).findings
      : [...fence.text.matchAll(RESERVED_NAME_TEXT)].map((match) => `text: ${match[0]}`);
    for (const finding of findings) problems.push(`${fence.file ?? '?'}:${fence.line}: ${finding}`);
  }
  return problems;
}

const markdownFiles = walk(pluginRoot, '.md').map((path) => ({ path, text: readFileSync(path, 'utf8') }));
const allFences = markdownFiles.flatMap((file) => fences(file.text).map((fence) => ({ ...fence, file: rel(file.path) })));

describe('the reserved-name scanner', () => {
  it('finds a reserved name on a top-level field, a group, a repeater child and a nested child', () => {
    const bad = JSON.stringify([
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'body', label: 'Body', type: 'group', children: [{ name: 'size', label: 'Size', type: 'number' }] },
      { name: 'cards', label: 'Cards', type: 'group', occurrence: { min: 1 }, children: [{ name: 'label', label: 'Label', type: 'text' }] },
      { name: 'fonts', label: 'Fonts', type: 'group', children: [{ name: 'inner', label: 'Inner', type: 'group', children: [{ name: 'body', label: 'Body font', type: 'font' }] }] },
    ]);
    const { parsed, findings } = reservedNamesInJson(bad);
    assert.equal(parsed, true);
    assert.equal(findings.filter((f) => !f.startsWith('text:')).length, 4, findings.join('\n'));
  });

  it('passes renamed fields, field labels and simple-menu items', () => {
    const good = JSON.stringify([
      { name: 'body_text', label: 'Body', type: 'richtext' },
      { name: 'item_label', label: 'Label', type: 'text' },
      { name: 'menu', label: 'Menu', type: 'simplemenu', default: [{ linkLabel: 'Home', linkUrl: '/', type: 'URL_LINK', children: [] }] },
    ]);
    assert.deepEqual(reservedNamesInJson(good).findings, []);
  });

  it('reads a fragment fence, and falls back to the raw text when a fence does not parse', () => {
    assert.equal(reservedNamesInJson('"field": { "name": "body", "type": "text" }').findings.length, 2);
    const broken = reservedNamesInJson('{ "name": "label", "type": "text", … }');
    assert.equal(broken.parsed, false);
    assert.equal(broken.findings.length, 1);
  });

  it('catches a reserved name in an unlabelled fence that does not parse', () => {
    const markdown = [
      'An abbreviated excerpt:',
      '',
      '```',
      '  {',
      '    "name": "body",   // the text block',
      '    "type": "richtext",',
      '  },',
      '  …',
      '```',
      '',
    ].join('\n');
    const fenceList = fences(markdown);
    assert.equal(fenceList.length, 1);
    assert.equal(isJsonFence(fenceList[0]), false);
    assert.deepEqual(reservedNamesInFences(fenceList), ['?:3: text: "name": "body"']);
  });
});

describe('examples in the plugin', () => {
  const jsonFences = allFences.filter(isJsonFence);

  it('include JSON examples to check', () => {
    assert.ok(jsonFences.length >= 5, `only ${jsonFences.length} JSON fences found`);
    assert.ok(jsonFences.filter((fence) => parseJsonFence(fence.text)).length >= 3, 'too few JSON fences parse');
  });

  it('name no field label, body or name in any fence, JSON or not, at any depth, groups included', () => {
    assert.deepEqual(reservedNamesInFences(allFences), []);
  });

  it('read no reserved field name from module in any fence', () => {
    const problems = allFences
      .filter((fence) => /\bmodule\.(label|body|name)\b/.test(fence.text))
      .map((fence) => `${fence.file}:${fence.line}: ${/\bmodule\.(label|body|name)\b/.exec(fence.text)[0]}`);
    assert.deepEqual(problems, []);
  });
});

describe('hubl-authoring', () => {
  const body = readFileSync(join(pluginRoot, 'skills', 'hubl-authoring', 'SKILL.md'), 'utf8');
  const headings = body.split(/\r?\n/).map((line, index) => ({ line, index })).filter(({ line }) => /^##\s/.test(line));

  it('has a heading naming all three reserved field names, after "Compose from the module\'s field schema"', () => {
    const reserved = headings.find(({ line }) => RESERVED_FIELD_NAMES.every((name) => line.includes(`\`${name}\``)));
    assert.ok(reserved, 'no ## heading names `label`, `body` and `name`');
    const compose = headings.find(({ line }) => line.includes("Compose from the module's field schema"));
    assert.ok(compose, 'the "Compose from the module\'s field schema" heading is missing');
    assert.equal(headings.indexOf(reserved), headings.indexOf(compose) + 1, 'the reserved-names heading should follow "Compose from the module\'s field schema"');
  });

  it('says the list comes from observed refusals and may not be complete', () => {
    const start = body.indexOf(headings.find(({ line }) => RESERVED_FIELD_NAMES.every((name) => line.includes(`\`${name}\``))).line);
    const section = body.slice(start, body.indexOf('\n## ', start + 1));
    assert.match(section, /observed refusals/);
    assert.match(section, /may not be complete/);
  });
});

describe('skills', () => {
  it('never say a theme will upload or should upload', () => {
    const problems = [];
    for (const path of walk(join(pluginRoot, 'skills'), '')) {
      readFileSync(path, 'utf8')
        .split(/\r?\n/)
        .forEach((line, index) => {
          if (/\b(will|should) upload\b/i.test(line)) problems.push(`${rel(path)}:${index + 1}: ${line.trim()}`);
        });
    }
    assert.deepEqual(problems, []);
  });
});

describe('changelog', () => {
  it('has an entry for the version in plugin.json', () => {
    const { version } = JSON.parse(readFileSync(join(pluginRoot, '.claude-plugin', 'plugin.json'), 'utf8'));
    const changelog = readFileSync(join(pluginRoot, 'CHANGELOG.md'), 'utf8');
    assert.match(changelog, new RegExp(`^## ${version.replace(/\./g, '\\.')}\\s*$`, 'm'));
  });
});

describe('identity', () => {
  const read = (...parts) => readFileSync(join(pluginRoot, ...parts), 'utf8').replace(/\r\n/g, '\n');

  it('plugin.json names the plugin, its listing name and its author', () => {
    const manifest = JSON.parse(read('.claude-plugin', 'plugin.json'));
    assert.equal(manifest.name, 'theme-devtools-for-hubspot');
    assert.equal(manifest.displayName, 'Theme Dev Tools for HubSpot, by ThemeSpot');
    assert.deepEqual(manifest.author, { name: 'Reece Sim' });
    assert.equal(manifest.license, 'Apache-2.0');
  });

  it('the root NOTICE holds the copyright, the licence, the hubl-authoring origin and the renderer pointer', () => {
    const notice = read('NOTICE');
    assert.ok(notice.startsWith('Theme Dev Tools for HubSpot\nCopyright 2026 Reece Sim\n'), notice.split('\n').slice(0, 2).join(' | '));
    assert.match(notice, /Apache License, Version 2\.0/);
    assert.match(notice, /skills\/hubl-authoring\/ was adapted by the same author, Reece Sim, .* under the same licence/);
    assert.match(notice, /see vendor\/renderer\/NOTICE/);
  });

  it('the README carries the listing name, the licence holder and the trademark line', () => {
    const readme = read('README.md');
    assert.equal(readme.split('\n')[0], '# Theme Dev Tools for HubSpot, by ThemeSpot');
    assert.ok(readme.includes('HubSpot is a trademark of HubSpot, Inc. This plugin is not affiliated with or endorsed by HubSpot.'));
    const licence = readme.slice(readme.indexOf('\n## Licence\n'));
    assert.match(licence, /^\n## Licence\n\nCopyright 2026 Reece Sim\. /);
  });
});
