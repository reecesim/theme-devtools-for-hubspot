#!/usr/bin/env node
// SPDX-License-Identifier: Apache-2.0
//
// preflight.mjs [--json]
//
// Reports what this machine has for the design-to-theme workflow and what each
// missing piece costs: Node, HubSpot's CLI, the vendored renderer, and the
// means of taking screenshots it can find (the playwright, playwright-core and
// puppeteer packages, and a Chrome, Edge or Chromium binary), each with its
// path. None of the capture means is required. Reads files only: it runs no
// other program, makes no network call and installs nothing.
//
// Exit codes: 0 when Node is new enough (missing optional pieces are reported,
// not failed), 1 when Node is older than 20.

import { existsSync, realpathSync } from 'node:fs';
import { createRequire } from 'node:module';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { envValue, findOnPath, hubspotCliPackage, isFile, readJson } from './lib/hubspot-cli.mjs';
import { isMainModule } from './lib/is-main.mjs';

export const MIN_NODE_MAJOR = 20;
export const CAPTURE_PACKAGES = ['playwright', 'playwright-core', 'puppeteer'];
const PLUGIN_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** A key that is equal for two spellings of one file (links resolved; case ignored on Windows). */
function samePathKey(path, platform = process.platform) {
  let real = path;
  try {
    real = realpathSync(path);
  } catch {
    // keep the spelling given
  }
  return platform === 'win32' ? real.toLowerCase() : real;
}

export function checkNode() {
  const version = process.versions.node;
  const major = Number(version.split('.')[0]);
  return {
    ok: major >= MIN_NODE_MAJOR,
    version,
    note:
      major >= MIN_NODE_MAJOR
        ? `Node ${version}`
        : `Node ${version} is older than ${MIN_NODE_MAJOR}. Every script here and the HubSpot CLI need Node ${MIN_NODE_MAJOR} or newer; nothing else will work until it is upgraded.`,
  };
}

export function checkHubSpotCli(cwd = process.cwd()) {
  const local = readJson(join(cwd, 'node_modules', '@hubspot', 'cli', 'package.json'));
  const executable = findOnPath('hs');
  const global = executable ? hubspotCliPackage(executable) : null;
  if (global || local) {
    const where = global ? `on PATH at ${executable}` : "in this project's node_modules";
    const version = (global || local).version;
    const major = Number(String(version).split('.')[0]);
    return {
      ok: true,
      version,
      location: global ? executable : join(cwd, 'node_modules', '@hubspot', 'cli'),
      note:
        `HubSpot CLI ${version} ${where}.` +
        (major < 8 ? ' This is older than 8.0: CMS commands are spelt without the "cms" group (hs upload, hs watch). Suggest upgrading before you start.' : ''),
    };
  }
  if (executable) {
    return { ok: true, version: null, location: executable, note: `an "hs" command is on PATH at ${executable}, but its version could not be read; run "hs --version".` };
  }
  return {
    ok: false,
    version: null,
    location: null,
    note:
      'HubSpot CLI not found. Building and previewing the theme do not need it (the boilerplate is bundled); uploading it to HubSpot does. ' +
      'Install only with the user\'s agreement, when the theme is ready to upload: npm install -g @hubspot/cli',
  };
}

export function checkRenderer() {
  const bundle = join(PLUGIN_ROOT, 'vendor', 'renderer', 'themespot-render.mjs');
  const ok = existsSync(bundle);
  return {
    ok,
    path: bundle,
    note: ok
      ? 'local HubL renderer vendored.'
      : 'local HubL renderer not vendored in this copy of the plugin: no local render, so the theme can only be seen after it is in HubSpot.',
  };
}

function resolvePackage(requireFrom, name) {
  try {
    return dirname(requireFrom.resolve(`${name}/package.json`));
  } catch {
    // a package that does not export its package.json
  }
  try {
    return requireFrom.resolve(name);
  } catch {
    return null;
  }
}

/**
 * The capture packages Node can load from the working directory (where the user
 * would install one) and from the plugin folder, each { kind, name, path, where }.
 */
export function findCapturePackages({ cwd = process.cwd(), pluginRoot = PLUGIN_ROOT } = {}) {
  const found = [];
  const seen = new Set();
  for (const [where, base] of [['working directory', cwd], ['plugin folder', pluginRoot]]) {
    const requireFrom = createRequire(join(resolve(base), 'resolve-anchor.cjs'));
    for (const name of CAPTURE_PACKAGES) {
      const path = resolvePackage(requireFrom, name);
      if (!path) continue;
      const key = samePathKey(path);
      if (seen.has(key)) continue;
      seen.add(key);
      found.push({ kind: 'package', name, path, where });
    }
  }
  return found;
}

const BROWSER_COMMANDS = {
  win32: [['Chrome', 'chrome'], ['Edge', 'msedge'], ['Chromium', 'chromium']],
  darwin: [['Chrome', 'google-chrome'], ['Chromium', 'chromium'], ['Edge', 'microsoft-edge']],
  other: [
    ['Chrome', 'google-chrome'],
    ['Chrome', 'google-chrome-stable'],
    ['Chromium', 'chromium'],
    ['Chromium', 'chromium-browser'],
    ['Edge', 'microsoft-edge'],
    ['Edge', 'microsoft-edge-stable'],
  ],
};

/** Where Chrome, Edge and Chromium are installed by default on each system: [name, path] pairs. */
export function standardBrowserLocations(platform = process.platform, env = process.env, home = homedir()) {
  if (platform === 'win32') {
    const roots = (names) => [...new Set(names.map((name) => envValue(env, name)).filter(Boolean))];
    const programFiles = roots(['ProgramFiles', 'ProgramFiles(x86)', 'ProgramW6432']);
    const userPrograms = roots(['LOCALAPPDATA']);
    return [
      ...[...programFiles, ...userPrograms].map((root) => ['Chrome', join(root, 'Google', 'Chrome', 'Application', 'chrome.exe')]),
      ...[...programFiles, ...userPrograms].map((root) => ['Edge', join(root, 'Microsoft', 'Edge', 'Application', 'msedge.exe')]),
      ...userPrograms.map((root) => ['Chromium', join(root, 'Chromium', 'Application', 'chrome.exe')]),
    ];
  }
  if (platform === 'darwin') {
    const folders = ['/Applications', join(home, 'Applications')];
    return [
      ...folders.map((folder) => ['Chrome', join(folder, 'Google Chrome.app', 'Contents', 'MacOS', 'Google Chrome')]),
      ...folders.map((folder) => ['Edge', join(folder, 'Microsoft Edge.app', 'Contents', 'MacOS', 'Microsoft Edge')]),
      ...folders.map((folder) => ['Chromium', join(folder, 'Chromium.app', 'Contents', 'MacOS', 'Chromium')]),
    ];
  }
  return [
    ['Chrome', '/opt/google/chrome/chrome'],
    ['Chrome', '/usr/bin/google-chrome'],
    ['Chrome', '/usr/bin/google-chrome-stable'],
    ['Chromium', '/usr/bin/chromium'],
    ['Chromium', '/usr/bin/chromium-browser'],
    ['Chromium', '/snap/bin/chromium'],
    ['Edge', '/opt/microsoft/msedge/msedge'],
    ['Edge', '/usr/bin/microsoft-edge'],
  ];
}

/**
 * Chrome, Edge and Chromium binaries on PATH and in the standard install
 * locations, each { kind, name, path, where }. `candidates` replaces the
 * standard locations (the tests use it).
 */
export function findBrowsers({ platform = process.platform, env = process.env, home = homedir(), candidates } = {}) {
  const onPath = (BROWSER_COMMANDS[platform] || BROWSER_COMMANDS.other)
    .map(([name, command]) => {
      const path = findOnPath(command, { env, platform });
      return path ? { name, path, where: 'PATH' } : null;
    })
    .filter(Boolean);
  const installed = (candidates ?? standardBrowserLocations(platform, env, home))
    .filter(([, path]) => isFile(path))
    .map(([name, path]) => ({ name, path, where: 'standard location' }));
  const seen = new Set();
  const found = [];
  for (const browser of [...onPath, ...installed]) {
    const key = samePathKey(browser.path, platform);
    if (seen.has(key)) continue;
    seen.add(key);
    found.push({ kind: 'browser', ...browser });
  }
  return found;
}

function describeMeans(means) {
  return means.kind === 'package'
    ? `${means.name} package in the ${means.where} at ${means.path}`
    : `${means.name} at ${means.path} (${means.where === 'PATH' ? 'on PATH' : 'standard install location'})`;
}

/** The captureMeans entry for a list of found means: a fact per means, and what an empty list costs. */
export function captureMeansReport(found) {
  return {
    ok: found.length > 0,
    found,
    note:
      found.length > 0
        ? `${found.map(describeMeans).join('; ')}. None is required: preview-and-validate, "Producing the PNGs", says how each can take the screenshots. Nothing was installed or started.`
        : 'No playwright, playwright-core or puppeteer package in the working directory or the plugin folder, and no Chrome, Edge or Chromium on PATH or in the standard install locations. ' +
          'Pixel comparison needs full-page PNGs from somewhere: a browser tool in this session that can save one, or a capture tool the user agrees to add (preview-and-validate, "Producing the PNGs"). Without one, say the build is not pixel-verified.',
  };
}

export function checkCaptureMeans(options = {}) {
  return captureMeansReport([...findCapturePackages(options), ...findBrowsers(options)]);
}

export function preflight(cwd = process.cwd()) {
  return {
    node: checkNode(),
    hubspotCli: checkHubSpotCli(cwd),
    renderer: checkRenderer(),
    captureMeans: checkCaptureMeans({ cwd }),
  };
}

/** `report` defaults to this machine's; the tests pass one built from injected inputs. */
export function main(argv = process.argv.slice(2), report = preflight()) {
  const json = argv.includes('--json');
  if (json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    const rows = [
      ['node', report.node, 'too old'],
      ['hubspot cli', report.hubspotCli, 'missing'],
      ['renderer', report.renderer, 'missing'],
      ['capture', report.captureMeans, 'none'],
    ];
    for (const [label, entry, absent] of rows) {
      const status = entry.ok ? (label === 'capture' ? 'found' : 'ok') : absent;
      console.log(`${label.padEnd(12)} ${status.padEnd(8)} ${entry.note}`);
    }
  }
  return report.node.ok ? 0 : 1;
}

if (isMainModule(import.meta.url)) {
  process.exitCode = main();
}
