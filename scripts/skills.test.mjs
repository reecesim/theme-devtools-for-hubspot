// SPDX-License-Identifier: Apache-2.0
//
// Checks every skill's frontmatter and shape against what Claude Code needs and
// what this plugin promises: a name and description, description + when_to_use
// under 1,200 characters (Claude Code truncates the listing at 1,536), bodies
// under 400 lines, referenced files present, and descriptions that don't compete.
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { PLUGIN_ID, TOOLS } from './hubspot-cli-server.mjs';

const pluginRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const skillsDir = join(pluginRoot, 'skills');
const EXPECTED = ['deploy-to-hubspot', 'design-to-hubspot-theme', 'hubl-authoring', 'preview-and-validate'];

/** Minimal frontmatter reader: `key: value` lines, plain or double-quoted. */
export function readFrontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(text);
  if (!match) return { fields: null, body: text };
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const pair = /^([A-Za-z_-]+):\s*(.*)$/.exec(line);
    assert.ok(pair, `unparseable frontmatter line: ${line}`);
    let value = pair[2].trim();
    if (value.startsWith('"')) value = JSON.parse(value);
    fields[pair[1]] = value;
  }
  return { fields, body: text.slice(match[0].length) };
}

const skills = readdirSync(skillsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => {
    const path = join(skillsDir, entry.name, 'SKILL.md');
    const text = readFileSync(path, 'utf8');
    return { dir: entry.name, path, text, ...readFrontmatter(text) };
  });

describe('skills', () => {
  it('are exactly the four this plugin ships', () => {
    assert.deepEqual(skills.map((s) => s.dir).sort(), EXPECTED);
  });

  for (const skill of skills) {
    describe(skill.dir, () => {
      it('has a name matching its folder and a description', () => {
        assert.ok(skill.fields, 'missing frontmatter');
        assert.equal(skill.fields.name, skill.dir);
        assert.ok(skill.fields.description && skill.fields.description.length > 40, 'description missing or too short');
      });

      it('keeps description + when_to_use under 1,200 characters', () => {
        const total = skill.fields.description.length + (skill.fields.when_to_use || '').length;
        assert.ok(total < 1200, `${total} characters`);
      });

      it('does not disable model invocation and uses only known fields', () => {
        assert.equal(skill.fields['disable-model-invocation'], undefined);
        for (const key of Object.keys(skill.fields)) assert.ok(['name', 'description', 'when_to_use'].includes(key), `unexpected field ${key}`);
      });

      it('has a body under 400 lines', () => {
        const lines = skill.body.split(/\r?\n/).length;
        assert.ok(lines < 400, `${lines} lines`);
      });

      it('names every reference file it has, and every reference it names exists', () => {
        const refsDir = join(skillsDir, skill.dir, 'references');
        const onDisk = existsSync(refsDir) ? readdirSync(refsDir).filter((f) => f.endsWith('.md')) : [];
        const named = [...new Set([...skill.body.matchAll(/`references\/([a-z0-9-]+\.md)`/g)].map((m) => m[1]))];
        for (const file of onDisk) assert.ok(named.includes(file), `references/${file} is not named in SKILL.md`);
        // A skill may point at another skill's reference ("`hubl-authoring`, `references/theme-fields.md`").
        for (const file of named) {
          const exists = EXPECTED.some((dir) => existsSync(join(skillsDir, dir, 'references', file)));
          assert.ok(exists, `references/${file} is named but exists in no skill`);
        }
      });

      it('runs plugin scripts through ${CLAUDE_PLUGIN_ROOT}, quoted', () => {
        for (const match of skill.body.matchAll(/node\s+(\S+)/g)) {
          if (!match[1].includes('scripts/')) continue;
          assert.ok(match[1].startsWith('"${CLAUDE_PLUGIN_ROOT}/scripts/'), `unquoted or relative script path: ${match[0]}`);
        }
        for (const script of skill.body.matchAll(/\$\{CLAUDE_PLUGIN_ROOT\}\/scripts\/([a-z-]+\.mjs)/g)) {
          assert.ok(existsSync(join(pluginRoot, 'scripts', script[1])), `scripts/${script[1]} does not exist`);
        }
        // Sessions that allow only `node …` refuse a chained command whole, so script commands stand alone.
        for (const line of skill.body.split(/\r?\n/)) {
          if (!line.includes('${CLAUDE_PLUGIN_ROOT}/scripts/')) continue;
          const command = line.replace(/^.*?(node\s+")/, '$1');
          assert.doesNotMatch(command, /&&|\|\||;\s|\s\|\s|\s>\s|^cd\s/, `script command is chained or redirected: ${line.trim()}`);
        }
      });
    });
  }

  it('do not compete: only preview-and-validate claims render, preview, screenshot or compare', () => {
    const words = /\b(render|rendering|renders|preview|previews|screenshots?|compare|comparison)\b/i;
    for (const skill of skills) {
      const listing = `${skill.fields.description} ${skill.fields.when_to_use || ''}`;
      if (skill.dir === 'preview-and-validate') assert.match(listing, words);
      else assert.doesNotMatch(listing, words, skill.dir);
    }
  });

  it('do not compete: only deploy-to-hubspot claims upload, the CLI or the account', () => {
    const words = /\b(upload|uploads|uploading|cli|account|accounts)\b/i;
    for (const skill of skills) {
      const listing = `${skill.fields.description} ${skill.fields.when_to_use || ''}`;
      if (skill.dir === 'deploy-to-hubspot') assert.match(listing, words);
      else assert.doesNotMatch(listing, words, skill.dir);
    }
  });

  it('scope the one-yes rule to hs cms upload: every other account-writing command needs its own yes', () => {
    const deploy = skills.find((s) => s.dir === 'deploy-to-hubspot');
    assert.ok(
      deploy.body.includes('For `hs cms upload`, one yes covers what is stated above; every other command here needs its own yes.'),
      'deploy-to-hubspot must scope the one-yes rule to hs cms upload',
    );
  });

  it('state the trademark notice in the first skill', () => {
    const first = skills.find((s) => s.dir === 'design-to-hubspot-theme');
    assert.match(first.body, /HubSpot is a trademark of HubSpot, Inc\. This plugin is not affiliated with or endorsed by HubSpot\./);
  });
});

/** The lines of a `## ` section, heading excluded, up to the next `## ` heading: { start, end, text }. */
function section(markdown, heading) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const starts = lines.flatMap((line, index) => (line === heading ? [index] : []));
  assert.equal(starts.length, 1, `expected one "${heading}" heading, found ${starts.length}`);
  const next = lines.findIndex((line, index) => index > starts[0] && /^## /.test(line));
  const end = next === -1 ? lines.length : next;
  return { start: starts[0], end, text: lines.slice(starts[0] + 1, end).join('\n').trim() };
}

const DOCS_HEADING = "## HubSpot's documentation: when and how";

describe("design-to-hubspot-theme: HubSpot's documentation", () => {
  const entry = skills.find((s) => s.dir === 'design-to-hubspot-theme').body;
  const docs = section(entry, DOCS_HEADING);

  it('has its own section, before pre-flight, under 25 lines', () => {
    assert.ok(docs.end <= section(entry, '## 0. Pre-flight').start, 'the section should come before ## 0. Pre-flight');
    const lines = docs.text.split('\n').length;
    assert.ok(lines < 25, `${lines} lines`);
  });

  it('names the MCP route (search-docs, then fetch-doc) and the web route (developers.hubspot.com)', () => {
    assert.match(docs.text, /`search-docs`/);
    assert.match(docs.text, /`fetch-doc`/);
    assert.ok(docs.text.indexOf('`search-docs`') < docs.text.indexOf('`fetch-doc`'), 'search before fetch');
    assert.match(docs.text, /search snippet alone/);
    assert.match(docs.text, /developers\.hubspot\.com/);
  });

  it("says when: platform facts, default modules, every validation or upload error, unexpected diagnostics", () => {
    assert.match(docs.text, /\*\*When\.\*\*/);
    assert.match(docs.text, /from memory/);
    assert.match(docs.text, /`@hubspot\/…` default module/);
    assert.match(docs.text, /every HubSpot validation or upload error/);
    assert.match(docs.text, /diagnostics are not what you expected/);
  });

  it('says the documentation wins over this plugin and the local render, and the agent says so', () => {
    assert.match(docs.text, /authority over this plugin's text and the local renderer's behaviour/);
    assert.match(docs.text, /tell the user what disagreed/);
  });

  it("links to hubl-authoring's URL list by its heading instead of repeating the URLs", () => {
    const hubl = skills.find((s) => s.dir === 'hubl-authoring').body;
    assert.ok(hubl.split(/\r?\n/).includes("## Look it up; don't answer from memory"), 'the heading the section points to is gone');
    assert.match(docs.text, /`hubl-authoring`, "Look it up; don't answer from memory"/);
    assert.doesNotMatch(docs.text, /\/docs\/cms\/reference\//, 'the URL list belongs in hubl-authoring');
  });

  it('is what preview-and-validate points to for questions about HubSpot itself', () => {
    const preview = skills.find((s) => s.dir === 'preview-and-validate').body;
    assert.match(preview, /`design-to-hubspot-theme`, "HubSpot's documentation: when and how"/);
    assert.match(preview, /answered from HubSpot's documentation, not from the renderer's source/);
  });
});

describe('design-to-hubspot-theme: no HubSpot CLI needed to build', () => {
  const entry = skills.find((s) => s.dir === 'design-to-hubspot-theme').body;

  it('scaffolds from the bundled boilerplate, naming its path and script before any CLI or Git command', () => {
    const step = section(entry, '## 4. Scaffold from the bundled boilerplate').text;
    const bundled = step.indexOf('${CLAUDE_PLUGIN_ROOT}/vendor/boilerplate/src/');
    assert.ok(bundled >= 0, 'step 4 does not name the bundled path');
    assert.ok(step.indexOf('node "${CLAUDE_PLUGIN_ROOT}/scripts/scaffold.mjs" <theme-folder>') > bundled);
    for (const command of ['`hs ', 'hs cms theme create', 'git', 'clone']) {
      const at = step.indexOf(command);
      if (at !== -1) assert.ok(at > bundled, `${command} comes before the bundled path`);
    }
    assert.match(step, /\*\*If you want HubSpot's latest boilerplate instead\*\*/);
  });

  it('says in step 3 that the CLI is needed only to upload', () => {
    const step = section(entry, '## 3. The HubSpot CLI, if installed').text;
    assert.match(step, /not needed to build or preview/);
    assert.match(step, /needed only to upload the theme to HubSpot \(step 7\)/);
  });

  it('no longer says in pre-flight that the CLI is needed to scaffold', () => {
    const preflight = section(entry, '## 0. Pre-flight').text;
    const row = preflight.split('\n').find((line) => line.startsWith('| HubSpot CLI |'));
    assert.ok(row, 'the pre-flight table has no HubSpot CLI row');
    assert.doesNotMatch(row, /scaffold/i);
    assert.match(row, /Building and previewing are unaffected/);
    assert.doesNotMatch(preflight, /needed by every script here and by HubSpot's CLI/);
  });
});

// The Bash command each hubspot-cli tool runs, as the deploy skill spells it.
const TOOL_FOR_COMMAND = {
  'hs --version': 'hs_version',
  'hs cms list': 'hs_cms_list',
  'hs cms upload': 'hs_cms_upload',
  'hs cms fetch': 'hs_cms_fetch',
  'hs filemanager upload': 'hs_filemanager_upload',
};

describe('deploy-to-hubspot: two sign-in routes', () => {
  const deploy = skills.find((s) => s.dir === 'deploy-to-hubspot').body.replace(/\r\n/g, '\n');
  const signIn = section(deploy, '## 2. Sign in').text;

  it("offers the plugin's configuration first (route a), then hs account auth in the user's own terminal (route b)", () => {
    const configure = `/plugin configure ${PLUGIN_ID}`;
    assert.ok(signIn.includes(configure), 'route a does not name the configuration dialog');
    assert.ok(signIn.indexOf(configure) < signIn.indexOf('hs account auth'), 'route a should come first');
    assert.ok(signIn.indexOf("**a. The plugin's configuration.**") < signIn.indexOf("**b. HubSpot's own sign-in.**"));
    assert.match(signIn, /you never see it/);
    assert.match(signIn, /they take no `--account`/);
    assert.match(signIn, /On this route you run `hs` through Bash: .*`--account <name-or-id>`/);
  });

  it('names every tool the hubspot-cli server lists, and the tool-name prefix for permission rules', () => {
    for (const tool of TOOLS) assert.ok(signIn.includes(`\`${tool.name}\``), `${tool.name} is not named under ## 2. Sign in`);
    assert.ok(signIn.includes('`mcp__plugin_theme-devtools-for-hubspot_hubspot-cli__<tool>`'));
  });

  it('says how to tell which route applies, and not to retry a refusal through the other route', () => {
    assert.match(signIn, /\*\*Which route applies\.\*\* Call `hs_version`\. `"configured": true` means route a/);
    assert.match(signIn, /"This plugin is not configured"/);
    assert.match(signIn, /do not retry it through the other route/);
  });

  it('says a key is entered in exactly two places, never in the chat, a file or a command line, and never asked for', () => {
    const safe = section(deploy, '## Safe defaults').text;
    assert.match(
      safe,
      /\*\*A key is entered in exactly two places\*\*: HubSpot's own `hs account auth` prompt in the user's terminal, or this plugin's configuration dialog \(step 2\)\. Never in the chat, a file, or a command line; never ask the user to paste it to you/,
    );
  });

  it('names the account-writing tools beside their commands where it asks before writing, and applies every rule to the tools', () => {
    const ask = section(deploy, '## Safe defaults').text.split('\n').find((line) => line.startsWith('- **Ask before any command that writes to the account**'));
    assert.match(ask, /`hs cms upload` \(`hs_cms_upload`\)/);
    assert.match(ask, /`hs filemanager upload` \(`hs_filemanager_upload`\)/);
    assert.match(deploy, /A tool call counts as the command it runs: every rule here applies to the tools as it does to `hs` in Bash\./);
  });

  it('pairs every account command in its examples with its tool: route a without --account, route b with it', () => {
    const blocks = [...deploy.matchAll(/^```[^\n]*\n([\s\S]*?)^```$/gm)].map((match) => match[1].trim().split('\n'));
    let pairs = 0;
    for (const lines of blocks) {
      const routeB = lines.find((line) => line.startsWith('route b: '));
      if (!routeB) {
        for (const line of lines) {
          for (const command of Object.keys(TOOL_FOR_COMMAND)) assert.ok(!line.startsWith(command), `"${line}" has no route a beside it`);
        }
        continue;
      }
      const command = Object.keys(TOOL_FOR_COMMAND).find((name) => routeB.slice('route b: '.length).startsWith(name));
      assert.ok(command, `unknown route b command: ${routeB}`);
      const routeA = lines.find((line) => line.startsWith('route a: '));
      assert.ok(routeA, `${routeB} has no route a`);
      assert.ok(routeA.startsWith(`route a: ${TOOL_FOR_COMMAND[command]}`), `${routeA} is not ${TOOL_FOR_COMMAND[command]}`);
      assert.doesNotMatch(routeA, /--account/);
      if (command !== 'hs --version') assert.match(routeB, /--account <name-or-id>$/);
      pairs++;
    }
    assert.equal(pairs, 5, 'check, list, upload, fetch and File Manager upload each show both routes');
  });

  it('keeps watch, theme preview and lint on route b, saying no tool runs them', () => {
    const flowing = section(deploy, '## 5. Keep changes flowing (optional)').text;
    assert.match(flowing, /These two run through Bash only \(route b\); no `hubspot-cli` tool runs them\./);
    const check = section(deploy, '## 3. Check before writing').text;
    assert.match(check, /`hs cms lint <theme-folder>` sends each HubL file .* \(route b; no `hubspot-cli` tool runs it\)\./);
    assert.match(signIn, /The tools offer no `hs cms lint`, `watch`/);
  });
});
