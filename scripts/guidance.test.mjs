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

  it('the README has an Install section: from GitHub through the marketplace, or from a checkout with --plugin-dir', () => {
    const readme = read('README.md');
    const start = readme.indexOf('\n## Install\n');
    assert.ok(start >= 0, 'no ## Install section');
    const install = readme.slice(start, readme.indexOf('\n## ', start + 1));
    assert.ok(install.includes('claude plugin marketplace add reecesim/theme-devtools-for-hubspot\n'));
    assert.ok(install.includes('claude plugin install theme-devtools-for-hubspot@theme-devtools-for-hubspot\n'));
    assert.ok(install.includes('claude --plugin-dir /path/to/theme-devtools-for-hubspot\n'));
    assert.ok(install.indexOf('marketplace add') < install.indexOf('plugin install'), 'add the marketplace before installing from it');
  });
});

describe('signing in to HubSpot', () => {
  const readme = readFileSync(join(pluginRoot, 'README.md'), 'utf8').replace(/\r\n/g, '\n');

  it('the README has a Configure subsection under Install: the /plugin configure command, both fields, and that both are optional', () => {
    const install = readme.slice(readme.indexOf('\n## Install\n'), readme.indexOf('\n## ', readme.indexOf('\n## Install\n') + 1));
    const start = install.indexOf('\n### Configure\n');
    assert.ok(start >= 0, 'no ### Configure under ## Install');
    const configure = install.slice(start);
    assert.ok(configure.includes('/plugin configure theme-devtools-for-hubspot@theme-devtools-for-hubspot\n'));
    const { userConfig } = JSON.parse(readFileSync(join(pluginRoot, '.claude-plugin', 'plugin.json'), 'utf8'));
    for (const option of Object.values(userConfig)) assert.ok(configure.includes(`**${option.title}**`), `the README does not describe "${option.title}"`);
    assert.match(configure, /secure credential store/);
    assert.match(configure, /Claude never sees it/);
    assert.match(configure, /Both are optional\. Leave them empty to sign in with `hs account auth` in your own terminal instead/);
  });

  it('the README names both routes under Requirements', () => {
    const requirements = readmeSection('## Requirements');
    const upload = requirements.split('\n').find((line) => line.startsWith('- To upload the theme to HubSpot:'));
    assert.match(upload, /entered in the plugin's configuration \(see "Configure"\)/);
    assert.match(upload, /`hs account auth` run in your own terminal/);
  });

  it('the README says, under "What this plugin does not do", that the plugin never reads a key from ~/.hscli/config.yml or any other file', () => {
    assert.match(readmeSection('## What this plugin does not do'), /It never reads your HubSpot key from `~\/\.hscli\/config\.yml` or any other file\./);
  });

  it('the README lists the MCP server under Scripts', () => {
    assert.match(readmeSection('## Scripts'), /^\| `scripts\/hubspot-cli-server\.mjs` \| The `hubspot-cli` MCP server/m);
  });
});

// Hosted ThemeSpot is named only where the free tool stops, after saying what it cannot do,
// and its URL lives in one place (the README) so it changes in one edit.
const THEMESPOT_URL = /themespot\.app/gi;
const POINTER_LINK = '[ThemeSpot](${CLAUDE_PLUGIN_ROOT}/README.md#what-this-plugin-does-not-do)';
export const THEMESPOT_MOMENTS = {
  'skills/design-to-hubspot-theme/SKILL.md': ['## 2. Plan before writing, and show the user', '## 8. Hand over'],
  'skills/preview-and-validate/SKILL.md': ['## What the local render is, and is not'],
  'skills/deploy-to-hubspot/SKILL.md': ['## Without the CLI'],
};

/** GitHub's anchor for a heading's text. */
export function githubSlug(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 _-]/g, '')
    .replace(/ /g, '-');
}

describe('ThemeSpot pointers', () => {
  const everyFile = walk(pluginRoot, '').map((path) => ({ name: rel(path), text: readFileSync(path).toString('latin1') }));

  it('the URL appears exactly once in the whole plugin, in the README', () => {
    const hits = everyFile.flatMap((file) => [...file.text.matchAll(THEMESPOT_URL)].map(() => file.name));
    assert.deepEqual(hits, ['README.md']);
  });

  it("the README's URL sits in its \"What this plugin does not do\" section, the anchor the skills link to", () => {
    const readme = readFileSync(join(pluginRoot, 'README.md'), 'utf8').replace(/\r\n/g, '\n');
    const headings = readme.split('\n').filter((line) => /^## /.test(line));
    const heading = headings.find((line) => githubSlug(line.slice(3)) === 'what-this-plugin-does-not-do');
    assert.ok(heading, 'no README heading has the anchor #what-this-plugin-does-not-do');
    const start = readme.indexOf(`\n${heading}\n`);
    const body = readme.slice(start, readme.indexOf('\n## ', start + 1));
    assert.equal([...body.matchAll(THEMESPOT_URL)].length, 1);
    for (const item of ['populating pages with real content', 'real pages|own pages', 'React modules', 'managed Git with CI']) {
      assert.match(body, new RegExp(item), item);
    }
  });

  it('skills name ThemeSpot only at the pinned moments, each time as the one link to the README', () => {
    const found = {};
    for (const path of walk(join(pluginRoot, 'skills'), '')) {
      const text = readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
      const lines = text.split('\n');
      let current = '(before any ## heading)';
      lines.forEach((line) => {
        if (/^## /.test(line)) current = line;
        for (const match of line.matchAll(/themespot/gi)) {
          (found[rel(path)] ??= []).push(current);
          assert.equal(line.slice(match.index - 1, match.index - 1 + POINTER_LINK.length), POINTER_LINK, `${rel(path)}: ${line.trim()}`);
        }
      });
    }
    assert.deepEqual(found, THEMESPOT_MOMENTS);
  });

  it('each pointer comes after a sentence saying what this plugin cannot do, and is not a pitch', () => {
    for (const file of Object.keys(THEMESPOT_MOMENTS)) {
      const text = readFileSync(join(pluginRoot, file), 'utf8').replace(/\r\n/g, '\n');
      for (const line of text.split('\n').filter((l) => l.includes(POINTER_LINK))) {
        const before = line.slice(0, line.indexOf(POINTER_LINK));
        assert.match(before, /(does not|cannot|no other route)/, `${file}: no limit stated before the pointer: ${line.trim()}`);
        assert.doesNotMatch(line, /\b(switch|upgrade|recommend|better|best)\b/i, `${file}: ${line.trim()}`);
      }
    }
  });

  it('no script names hosted ThemeSpot (pre-flight included)', () => {
    for (const path of walk(join(pluginRoot, 'scripts'), '.mjs').filter((p) => !p.endsWith('.test.mjs'))) {
      assert.doesNotMatch(readFileSync(path, 'utf8'), /ThemeSpot/, rel(path));
    }
  });
});

describe('the bundled boilerplate', () => {
  const src = join(pluginRoot, 'vendor', 'boilerplate', 'src');
  const fieldFiles = walk(src, 'fields.json');

  it("has the theme's fields.json and every module's", () => {
    assert.ok(fieldFiles.length >= 6, `${fieldFiles.length} fields.json files`);
  });

  it('names no field label, body or name at any depth, so the reserved-name guidance holds for it unchanged', () => {
    const hits = fieldFiles.flatMap((path) => reservedFieldEntries(JSON.parse(readFileSync(path, 'utf8'))).map((hit) => `${rel(path)}: ${hit}`));
    assert.deepEqual(hits, []);
  });

  it('names no field items, keys, values or get (shadowed in the local render)', () => {
    const hits = fieldFiles.flatMap((path) => [...readFileSync(path, 'utf8').matchAll(/"name"\s*:\s*"(items|keys|values|get)"/g)].map((m) => `${rel(path)}: ${m[0]}`));
    assert.deepEqual(hits, []);
  });
});

const ISSUES_URL = 'https://github.com/reecesim/theme-devtools-for-hubspot/issues';
const ADVISORY_URL = 'https://github.com/reecesim/theme-devtools-for-hubspot/security/advisories/new';
const MARKETPLACE_SENTENCE = "This plugin is not for rendering, cloning or recreating a theme from HubSpot's Template Marketplace";

/** The body of a README `## ` section, heading excluded. */
function readmeSection(heading) {
  const readme = readFileSync(join(pluginRoot, 'README.md'), 'utf8').replace(/\r\n/g, '\n');
  const start = readme.indexOf(`\n${heading}\n`);
  assert.ok(start >= 0, `no "${heading}" section in the README`);
  const next = readme.indexOf('\n## ', start + 1);
  return readme.slice(start + heading.length + 2, next === -1 ? undefined : next);
}

describe('privacy, support and security', () => {
  it('the README has a Privacy section: local only, nothing to the author, the outbound traffic, retention and contact', () => {
    const privacy = readmeSection('## Privacy');
    assert.match(privacy, /runs on your machine/);
    assert.match(privacy, /no service, no account and no telemetry/);
    assert.match(privacy, /collects, stores and sends nothing to the plugin's author/);
    for (const traffic of [/HubSpot documentation pages Claude reads/, /web fonts, icon scripts and placeholder images/, /your own theme files, sent to your own HubSpot account/, /capture tool you choose to install/]) {
      assert.match(privacy, traffic);
    }
    assert.match(privacy, /Data retention: none/);
    assert.match(privacy, /GitHub Issues/);
    assert.match(privacy, /private vulnerability reporting/);
  });

  it('the README has a Support and security section naming the issues and private vulnerability reporting', () => {
    const support = readmeSection('## Support and security');
    assert.ok(support.includes(ISSUES_URL), 'support: the issues URL');
    assert.ok(support.includes(ADVISORY_URL), 'security: the private vulnerability reporting URL');
  });

  it('SECURITY.md at the plugin root says the same in three lines', () => {
    const lines = readFileSync(join(pluginRoot, 'SECURITY.md'), 'utf8').replace(/\r\n/g, '\n').trim().split('\n').filter((line) => line && !line.startsWith('#'));
    assert.equal(lines.length, 3, lines.join(' | '));
    assert.ok(lines.join('\n').includes(ADVISORY_URL));
    assert.ok(lines.join('\n').includes(ISSUES_URL));
  });
});

describe("HubSpot's Template Marketplace", () => {
  it('the README says, under "What this plugin does not do", that the plugin is not for marketplace themes, and why', () => {
    const section = readmeSection('## What this plugin does not do');
    assert.ok(section.includes(MARKETPLACE_SENTENCE), 'the marketplace sentence is missing');
    assert.match(section, /purchased marketplace themes cannot be cloned/);
    assert.match(section, /licence is its provider's/);
  });

  it("the entry skill's intake step refuses a marketplace theme as the design and says why", () => {
    const skill = readFileSync(join(pluginRoot, 'skills', 'design-to-hubspot-theme', 'SKILL.md'), 'utf8').replace(/\r\n/g, '\n');
    const start = skill.indexOf('\n## 1. Intake: what the user has\n');
    assert.ok(start >= 0, 'no intake step');
    const intake = skill.slice(start, skill.indexOf('\n## ', start + 1));
    assert.ok(intake.includes(MARKETPLACE_SENTENCE), 'the marketplace sentence is missing from the intake step');
    assert.match(intake, /stop: do not render, clone or rebuild it, and tell the user why/);
    assert.match(intake, /licence is its provider's/);
  });
});
