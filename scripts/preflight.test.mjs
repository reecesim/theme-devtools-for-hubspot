// SPDX-License-Identifier: Apache-2.0
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { after, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  captureMeansReport,
  checkCaptureMeans,
  checkHubSpotCli,
  checkNode,
  checkRenderer,
  findBrowsers,
  findCapturePackages,
  main,
  standardBrowserLocations,
} from './preflight.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const script = join(here, 'preflight.mjs');
const work = mkdtempSync(join(tmpdir(), 'preflight-test-'));
after(() => rmSync(work, { recursive: true, force: true }));

// Environment variable names are case-insensitive on Windows, so drop every
// spelling of a key before setting it.
function withEnv(overrides) {
  const names = new Set(Object.keys(overrides).map((key) => key.toLowerCase()));
  const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => !names.has(key.toLowerCase())));
  return { ...env, ...overrides };
}

const run = (args, env = {}, cwd = work) =>
  spawnSync(process.execPath, [script, ...args], { cwd, encoding: 'utf8', env: withEnv(env) });

function touch(path, content = '') {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
  return path;
}

/** A package folder Node can resolve: package.json with a main file. */
function fakePackage(root, name) {
  const dir = join(root, 'node_modules', name);
  touch(join(dir, 'package.json'), JSON.stringify({ name, version: '1.0.0', main: 'index.js' }));
  touch(join(dir, 'index.js'), 'module.exports = {};\n');
  return dir;
}

const MEANS_KEYS = ['kind', 'name', 'path', 'where'];

describe('preflight.mjs', () => {
  it('reports node, hubspotCli, renderer and captureMeans as JSON and exits 0 on a supported Node', () => {
    const result = run(['--json']);
    assert.equal(result.status, 0, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.deepEqual(Object.keys(report).sort(), ['captureMeans', 'hubspotCli', 'node', 'renderer']);
    assert.equal(report.node.ok, true);
    assert.equal(report.node.version, process.versions.node);
    assert.equal(typeof report.renderer.ok, 'boolean');
  });

  it('reports captureMeans as facts with paths: { ok, found: [{ kind, name, path, where }], note }', () => {
    const { captureMeans } = JSON.parse(run(['--json']).stdout);
    assert.deepEqual(Object.keys(captureMeans).sort(), ['found', 'note', 'ok']);
    assert.equal(captureMeans.ok, captureMeans.found.length > 0);
    assert.equal(typeof captureMeans.note, 'string');
    for (const means of captureMeans.found) {
      assert.deepEqual(Object.keys(means).sort(), MEANS_KEYS);
      assert.ok(['package', 'browser'].includes(means.kind), means.kind);
      assert.ok(['playwright', 'playwright-core', 'puppeteer', 'Chrome', 'Edge', 'Chromium'].includes(means.name), means.name);
      assert.ok(means.path.length > 0);
      assert.ok(captureMeans.note.includes(means.path), `the note names ${means.path}`);
    }
  });

  it('finds a HubSpot CLI installed in the project directory without running it', () => {
    const project = join(work, 'project');
    touch(join(project, 'node_modules', '@hubspot', 'cli', 'package.json'), JSON.stringify({ name: '@hubspot/cli', version: '8.15.0' }));
    const result = run(['--json'], { PATH: '' }, project);
    assert.equal(result.status, 0, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.equal(report.hubspotCli.ok, true);
    assert.equal(report.hubspotCli.version, '8.15.0');
  });

  it('reports a missing HubSpot CLI with what it costs: uploading, not building, previewing or scaffolding', () => {
    const result = run(['--json'], { PATH: '' });
    const report = JSON.parse(result.stdout);
    assert.equal(report.hubspotCli.ok, false);
    assert.match(report.hubspotCli.note, /Building and previewing the theme do not need it \(the boilerplate is bundled\); uploading it to HubSpot does\./);
    assert.doesNotMatch(report.hubspotCli.note, /scaffold/i);
  });

  it('prints one line per check in text mode, capture last', () => {
    const result = run([]);
    assert.equal(result.status, 0);
    const lines = result.stdout.trim().split(/\r?\n/);
    assert.equal(lines.length, 4);
    assert.match(lines[0], /^node\s+ok\s/);
    assert.match(lines[3], /^capture\s+(found|none)\s/);
  });
});

describe('capture means', () => {
  it('finds playwright, playwright-core and puppeteer in the working directory and the plugin folder, with paths', () => {
    const project = join(work, 'capture-project');
    const plugin = join(work, 'capture-plugin');
    const expected = [
      { kind: 'package', name: 'playwright-core', path: fakePackage(project, 'playwright-core'), where: 'working directory' },
      { kind: 'package', name: 'puppeteer', path: fakePackage(project, 'puppeteer'), where: 'working directory' },
      { kind: 'package', name: 'playwright', path: fakePackage(plugin, 'playwright'), where: 'plugin folder' },
    ];
    // Only what this test wrote counts: a package resolvable from elsewhere on this machine is not ours to assert on.
    const found = findCapturePackages({ cwd: project, pluginRoot: plugin }).filter((means) => means.path.startsWith(work));
    assert.deepEqual(
      found.map((means) => ({ ...means })).sort((a, b) => a.name.localeCompare(b.name)),
      expected.sort((a, b) => a.name.localeCompare(b.name)),
    );
  });

  it('finds Chrome and Edge in the standard Windows install locations', () => {
    const programFiles = join(work, 'Program Files');
    const local = join(work, 'Local');
    const chrome = touch(join(programFiles, 'Google', 'Chrome', 'Application', 'chrome.exe'));
    const edge = touch(join(local, 'Microsoft', 'Edge', 'Application', 'msedge.exe'));
    const env = { ProgramFiles: programFiles, LOCALAPPDATA: local, PATH: '' };
    const locations = standardBrowserLocations('win32', env, work).map(([, path]) => path);
    assert.ok(locations.includes(chrome) && locations.includes(edge));
    assert.deepEqual(findBrowsers({ platform: 'win32', env, home: work }), [
      { kind: 'browser', name: 'Chrome', path: chrome, where: 'standard location' },
      { kind: 'browser', name: 'Edge', path: edge, where: 'standard location' },
    ]);
  });

  it('finds a browser on PATH and reports one file once', () => {
    const bin = join(work, 'bin');
    const edge = touch(join(bin, 'msedge.EXE'));
    const env = { PATH: bin, PATHEXT: '.EXE' };
    assert.deepEqual(findBrowsers({ platform: 'win32', env, home: work, candidates: [['Edge', edge]] }), [
      { kind: 'browser', name: 'Edge', path: edge, where: 'PATH' },
    ]);
  });

  it('lists the standard locations for macOS and Linux too', () => {
    assert.ok(standardBrowserLocations('darwin', {}, '/Users/someone').some(([name, path]) => name === 'Chrome' && path.includes('Google Chrome.app')));
    assert.ok(standardBrowserLocations('linux', {}, '/home/someone').some(([name, path]) => name === 'Chromium' && path.endsWith('chromium')));
  });

  it('reports each means it found as a fact with its path, none required', () => {
    const found = [
      { kind: 'package', name: 'playwright-core', path: '/p/node_modules/playwright-core', where: 'working directory' },
      { kind: 'browser', name: 'Chrome', path: '/opt/google/chrome/chrome', where: 'standard location' },
    ];
    const report = captureMeansReport(found);
    assert.equal(report.ok, true);
    assert.deepEqual(report.found, found);
    assert.match(report.note, /playwright-core package in the working directory at \/p\/node_modules\/playwright-core/);
    assert.match(report.note, /Chrome at \/opt\/google\/chrome\/chrome/);
    assert.match(report.note, /None is required/);
  });

  it('says what having none costs, without requiring or installing anything', () => {
    const report = captureMeansReport([]);
    assert.equal(report.ok, false);
    assert.deepEqual(report.found, []);
    assert.match(report.note, /not pixel-verified/);
    assert.match(report.note, /agrees/);
  });

  it('finds none when no package resolves and no browser is on PATH or installed, and text mode prints the not-pixel-verified row', () => {
    // Empty folders for both package searches, an empty PATH and no install locations:
    // the result does not depend on what this machine has.
    const empty = mkdtempSync(join(work, 'no-capture-'));
    const captureMeans = checkCaptureMeans({ cwd: empty, pluginRoot: empty, platform: 'win32', env: { PATH: '' }, home: empty, candidates: [] });
    assert.equal(captureMeans.ok, false);
    assert.deepEqual(captureMeans.found, []);

    const printed = [];
    const log = console.log;
    console.log = (line) => printed.push(String(line));
    let status;
    try {
      status = main([], { node: checkNode(), hubspotCli: checkHubSpotCli(empty), renderer: checkRenderer(), captureMeans });
    } finally {
      console.log = log;
    }
    assert.equal(status, 0);
    assert.equal(printed.length, 4);
    assert.match(printed[3], /^capture\s+none\s+.*not pixel-verified/);
  });
});
