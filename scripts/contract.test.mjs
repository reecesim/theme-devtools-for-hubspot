// SPDX-License-Identifier: Apache-2.0
//
// Checks the pixel contract and what surrounds it, the way an agent reads them:
// - preview-and-validate states the contract verbatim under `## The contract`;
// - talk of installing a capture tool appears only under `## Producing the PNGs`;
// - nothing in the plugin names the two scripts this version removed;
// - the vendored renderer matches its MANIFEST.json, and the changelog quotes its version;
// - the README's network sentence.
// The forbidden strings are assembled at run time so this file does not contain them.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

const pluginRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const previewSkill = join(pluginRoot, 'skills', 'preview-and-validate', 'SKILL.md');

export const CONTRACT =
  'Before you say the build matches, you must have compared pixels. Produce full-page PNGs of the design and of the build at 1440×900 and 390×844, device scale factor 1, fonts loaded, lazy images loaded, animations off. Run `compare` on each pair. Fix the largest difference first. Repeat until `compare` reports `identical` (it is judged at threshold 0 and equal dimensions), or every remaining range is explained from its crop, for at most 8 iterations. A build you have not captured after your last change is not verified.';

const INSTALL_PHRASES = [['must use', 'Playwright'], ['install', 'Playwright']].map((words) => words.join(' '));
const REMOVED_SCRIPTS = ['capture', 'compare'].map((name) => `${name}.mjs`);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(path));
    else if (entry.isFile()) out.push(path);
  }
  return out;
}

const rel = (path) => relative(pluginRoot, path).split(sep).join('/');
const files = walk(pluginRoot).map((path) => ({ path, name: rel(path), text: readFileSync(path, 'utf8').replace(/\r\n/g, '\n') }));

/** The text between a `## ` heading and the next `## ` heading (or the end), without the heading line. */
export function section(markdown, heading) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const starts = lines.flatMap((line, index) => (line === heading ? [index] : []));
  assert.equal(starts.length, 1, `expected one "${heading}" heading, found ${starts.length}`);
  const next = lines.findIndex((line, index) => index > starts[0] && /^## /.test(line));
  return { start: starts[0], end: next === -1 ? lines.length : next, text: lines.slice(starts[0] + 1, next === -1 ? undefined : next).join('\n').trim() };
}

/** Occurrences of each phrase, ignoring case, as `file:line: phrase`. */
function occurrences(name, text, phrases, lineOffset = 0) {
  const hits = [];
  text.split('\n').forEach((line, index) => {
    for (const phrase of phrases) if (line.toLowerCase().includes(phrase.toLowerCase())) hits.push(`${name}:${index + 1 + lineOffset}: ${phrase}`);
  });
  return hits;
}

describe('the contract', () => {
  const skill = readFileSync(previewSkill, 'utf8');

  it('is stated verbatim under ## The contract in preview-and-validate', () => {
    assert.equal(section(skill, '## The contract').text, CONTRACT);
  });

  it('is followed by ## Producing the PNGs', () => {
    const contract = section(skill, '## The contract');
    const producing = section(skill, '## Producing the PNGs');
    assert.equal(producing.start, contract.end);
  });

  it('is named by design-to-hubspot-theme at the check step', () => {
    const design = readFileSync(join(pluginRoot, 'skills', 'design-to-hubspot-theme', 'SKILL.md'), 'utf8');
    assert.match(design, /`## The contract`/);
  });
});

describe('installing a capture tool', () => {
  it('is mentioned only under ## Producing the PNGs in preview-and-validate', () => {
    const hits = [];
    for (const file of files) {
      if (file.path === previewSkill) {
        const lines = file.text.split('\n');
        const { start, end } = section(file.text, '## Producing the PNGs');
        hits.push(...occurrences(file.name, lines.slice(0, start).join('\n'), INSTALL_PHRASES));
        hits.push(...occurrences(file.name, lines.slice(end).join('\n'), INSTALL_PHRASES, end));
      } else {
        hits.push(...occurrences(file.name, file.text, INSTALL_PHRASES));
      }
    }
    assert.deepEqual(hits, []);
  });

  it('asks before any install, in that section', () => {
    const { text } = section(readFileSync(previewSkill, 'utf8'), '## Producing the PNGs');
    assert.match(text, /ask before any install/i);
  });
});

describe('the removed scripts', () => {
  it('are named by no file in the plugin', () => {
    const hits = files.flatMap((file) => occurrences(file.name, file.text, REMOVED_SCRIPTS));
    assert.deepEqual(hits, []);
  });

  it('are gone from scripts/', () => {
    const scripts = readdirSync(join(pluginRoot, 'scripts'));
    for (const name of REMOVED_SCRIPTS) {
      assert.ok(!scripts.includes(name), `scripts/${name} still exists`);
      assert.ok(!scripts.includes(name.replace('.mjs', '.test.mjs')), `scripts/${name.replace('.mjs', '.test.mjs')} still exists`);
    }
  });
});

// A copy of the plugin without the renderer is supported (the launcher exits 4), so its
// absence skips this suite, visibly, rather than failing the whole file.
const vendor = join(pluginRoot, 'vendor', 'renderer');
const manifestPath = join(vendor, 'MANIFEST.json');
const vendored = existsSync(manifestPath);

describe('the vendored renderer', { skip: vendored ? false : 'vendor/renderer is absent from this copy of the plugin (the launcher exits 4)' }, () => {
  const manifest = vendored ? JSON.parse(readFileSync(manifestPath, 'utf8')) : { files: [], version: null };

  it('matches every sha256 and size in MANIFEST.json, with no unlisted file', () => {
    for (const file of manifest.files) {
      if (file.sha256 === null) continue;
      const bytes = readFileSync(join(vendor, file.path));
      assert.equal(bytes.length, file.size, `${file.path} size`);
      assert.equal(createHash('sha256').update(bytes).digest('hex'), file.sha256, `${file.path} sha256`);
    }
    const onDisk = walk(vendor).map((path) => relative(vendor, path).split(sep).join('/'));
    assert.deepEqual(onDisk.sort(), manifest.files.map((file) => file.path).sort());
  });

  it('has its version quoted in the changelog entry for this plugin version', () => {
    const { version } = JSON.parse(readFileSync(join(pluginRoot, '.claude-plugin', 'plugin.json'), 'utf8'));
    const changelog = readFileSync(join(pluginRoot, 'CHANGELOG.md'), 'utf8');
    const entry = section(changelog, `## ${version}`).text;
    assert.ok(entry.includes(`renderer ${manifest.version}`), `the ${version} entry does not quote renderer ${manifest.version}`);
  });
});

describe('README', () => {
  it('says no script makes a network call', () => {
    const readme = readFileSync(join(pluginRoot, 'README.md'), 'utf8');
    assert.ok(readme.includes('No script makes a network call; a capture tool loads only the pages you point it at.'));
  });
});
