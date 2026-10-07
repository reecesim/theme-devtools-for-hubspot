// SPDX-License-Identifier: Apache-2.0
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative, sep } from 'node:path';
import { after, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { EXIT_NOT_BUNDLED, scaffold } from './scaffold.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const script = join(here, 'scaffold.mjs');
const boilerplate = join(here, '..', 'vendor', 'boilerplate');
const work = mkdtempSync(join(tmpdir(), 'scaffold-test-'));
after(() => rmSync(work, { recursive: true, force: true }));

const run = (args) => spawnSync(process.execPath, [script, ...args], { cwd: work, encoding: 'utf8' });

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => (entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]));
}

const listing = (dir) => walk(dir).map((path) => relative(dir, path).split(sep).join('/')).sort();
const sha256 = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('scaffold.mjs', () => {
  it('copies every file of the bundled boilerplate into a new folder, byte for byte, and nothing else', () => {
    const theme = join(work, 'new-theme');
    const result = run([theme]);
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /^Copied \d+ files of HubSpot's CMS theme boilerplate 3\.14\.2 \(commit 656aaeb\) into /);
    const source = join(boilerplate, 'src');
    assert.deepEqual(listing(theme), listing(source));
    for (const path of listing(source)) assert.equal(sha256(join(theme, path)), sha256(join(source, path)), path);
    assert.ok(!existsSync(join(theme, 'MANIFEST.json')), 'the MANIFEST stays in the plugin');
    assert.ok(!existsSync(join(theme, 'LICENSE')), "HubSpot's LICENSE file stays in the plugin");
  });

  it('copies into an existing empty folder', () => {
    const theme = join(work, 'empty-theme');
    mkdirSync(theme);
    const result = run([theme, '--json']);
    assert.equal(result.status, 0, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.files, listing(join(boilerplate, 'src')).length);
    assert.deepEqual(report.boilerplate, { version: '3.14.2', commit: '656aaeb758712d4728e95bda60d695f8fdbc22f2', url: 'https://github.com/HubSpot/cms-theme-boilerplate' });
    assert.ok(existsSync(join(theme, 'templates', 'layouts', 'base.html')));
  });

  it('refuses a folder that already holds anything, and writes nothing into it', () => {
    const theme = join(work, 'taken');
    mkdirSync(theme);
    writeFileSync(join(theme, 'theme.json'), '{"label":"mine"}');
    const result = run([theme]);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /is not empty\. Nothing was copied/);
    assert.deepEqual(readdirSync(theme), ['theme.json']);
    assert.equal(readFileSync(join(theme, 'theme.json'), 'utf8'), '{"label":"mine"}');
  });

  it('refuses a file in place of the folder', () => {
    const file = join(work, 'a-file');
    writeFileSync(file, '');
    const result = run([file]);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /is a file, not a folder/);
  });

  it('exits 2 without exactly one folder, or with an unknown option', () => {
    assert.equal(run([]).status, 2);
    assert.equal(run([join(work, 'x'), join(work, 'y')]).status, 2);
    assert.equal(run([join(work, 'z'), '--force']).status, 2);
    assert.ok(!existsSync(join(work, 'z')));
  });

  it('exits 4 and copies nothing when the boilerplate is not bundled', () => {
    const empty = join(work, 'no-boilerplate');
    mkdirSync(empty);
    const outcome = scaffold(join(work, 'never'), { boilerplateRoot: empty });
    assert.equal(outcome.ok, false);
    assert.equal(outcome.exitCode, EXIT_NOT_BUNDLED);
    assert.match(outcome.message, /not bundled in this copy of the plugin/);
    assert.ok(!existsSync(join(work, 'never')));
  });
});
