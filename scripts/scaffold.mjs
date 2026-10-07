#!/usr/bin/env node
// SPDX-License-Identifier: Apache-2.0
//
// scaffold.mjs <theme-folder> [--json]
//
// Copies the HubSpot CMS theme boilerplate bundled in vendor/boilerplate/src/
// into <theme-folder>, which must be new or empty: a folder that already holds
// anything is refused, and no file is ever overwritten. Copies files only: it
// runs no other program, makes no network call and contacts no HubSpot account.
//
// Exit codes: 0 copied, 1 refused (the folder is not empty, or is a file) or a
// copy failed, 2 bad arguments, 4 the boilerplate is not bundled in this copy
// of the plugin.

import { constants, copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isMainModule } from './lib/is-main.mjs';

export const EXIT_NOT_BUNDLED = 4;
const BOILERPLATE = join(dirname(fileURLToPath(import.meta.url)), '..', 'vendor', 'boilerplate');

/** The version and commit recorded in the bundled MANIFEST.json, or nulls when it cannot be read. */
function boilerplateInfo(boilerplateRoot) {
  try {
    const manifest = JSON.parse(readFileSync(join(boilerplateRoot, 'MANIFEST.json'), 'utf8'));
    return { version: manifest.version ?? null, commit: manifest.source?.commit ?? null, url: manifest.source?.url ?? null };
  } catch {
    return { version: null, commit: null, url: null };
  }
}

/** Copies every file under `from` into `to`, creating folders, refusing to overwrite. Returns the count. */
function copyTree(from, to) {
  mkdirSync(to, { recursive: true });
  let count = 0;
  for (const entry of readdirSync(from, { withFileTypes: true })) {
    const source = join(from, entry.name);
    const target = join(to, entry.name);
    if (entry.isDirectory()) count += copyTree(source, target);
    else if (entry.isFile()) {
      copyFileSync(source, target, constants.COPYFILE_EXCL);
      count++;
    }
  }
  return count;
}

/**
 * Copies the bundled boilerplate into `destination`. `boilerplateRoot` replaces the
 * bundled folder (the tests use it). Returns { ok, exitCode, destination, files, message, boilerplate }.
 */
export function scaffold(destination, { boilerplateRoot = BOILERPLATE } = {}) {
  const target = resolve(destination);
  const source = join(boilerplateRoot, 'src');
  const boilerplate = boilerplateInfo(boilerplateRoot);
  const result = (ok, exitCode, files, message) => ({ ok, exitCode, destination: target, files, message, boilerplate });

  if (!existsSync(join(source, 'theme.json'))) {
    return result(false, EXIT_NOT_BUNDLED, 0, `The boilerplate is not bundled in this copy of the plugin (${join(source, 'theme.json')} is missing). Nothing was copied.`);
  }
  if (existsSync(target)) {
    const stats = statSync(target);
    if (!stats.isDirectory()) return result(false, 1, 0, `${target} is a file, not a folder. Nothing was copied.`);
    if (readdirSync(target).length > 0) {
      return result(false, 1, 0, `${target} is not empty. Nothing was copied: choose a new or empty folder for the theme.`);
    }
  }
  try {
    const files = copyTree(source, target);
    const from = boilerplate.version ? `HubSpot's CMS theme boilerplate ${boilerplate.version}` : "HubSpot's CMS theme boilerplate";
    const at = boilerplate.commit ? ` (commit ${boilerplate.commit.slice(0, 7)})` : '';
    return result(true, 0, files, `Copied ${files} files of ${from}${at} into ${target}.`);
  } catch (error) {
    return result(false, 1, 0, `Copying into ${target} failed: ${error.message}. Some files may have been copied; check the folder before trying again.`);
  }
}

export function main(argv = process.argv.slice(2), options = {}) {
  const json = argv.includes('--json');
  const positional = argv.filter((arg) => !arg.startsWith('--'));
  const unknown = argv.filter((arg) => arg.startsWith('--') && arg !== '--json');
  if (positional.length !== 1 || unknown.length > 0) {
    console.error('usage: node scaffold.mjs <theme-folder> [--json]');
    return 2;
  }
  const outcome = scaffold(positional[0], options);
  if (json) {
    const { exitCode, ...report } = outcome;
    console.log(JSON.stringify(report, null, 2));
  } else if (outcome.ok) {
    console.log(outcome.message);
  } else {
    console.error(outcome.message);
  }
  return outcome.exitCode;
}

if (isMainModule(import.meta.url)) {
  process.exitCode = main();
}
