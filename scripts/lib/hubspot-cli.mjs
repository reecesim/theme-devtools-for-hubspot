// SPDX-License-Identifier: Apache-2.0
//
// Finding HubSpot's CLI on this machine without running it: the `hs` command on
// PATH, the @hubspot/cli package it belongs to, and the JavaScript file that
// package's `bin.hs` names. preflight.mjs reports what it finds;
// hubspot-cli-server.mjs runs that file with Node, so neither a Windows `.cmd`
// shim nor a shell is ever involved.

import { readFileSync, realpathSync, statSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';

export function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return null;
  }
}

export function isFile(path) {
  try {
    return statSync(path).isFile();
  } catch {
    return false;
  }
}

/** An environment value by name, ignoring case (Windows names are case-insensitive). */
export function envValue(env, name) {
  if (env[name] !== undefined) return env[name];
  const key = Object.keys(env).find((k) => k.toLowerCase() === name.toLowerCase());
  return key === undefined ? undefined : env[key];
}

export function findOnPath(command, { env = process.env, platform = process.platform } = {}) {
  const dirs = (envValue(env, 'PATH') || '').split(platform === 'win32' ? ';' : ':').filter(Boolean);
  const extensions =
    platform === 'win32' ? ['', ...(envValue(env, 'PATHEXT') || '.COM;.EXE;.BAT;.CMD').split(';').filter(Boolean)] : [''];
  for (const dir of dirs) {
    for (const extension of extensions) {
      const candidate = join(dir, command + extension);
      if (isFile(candidate)) return candidate;
    }
  }
  return null;
}

/** Locate the @hubspot/cli package that an `hs` executable belongs to: { version, packageJson }, or null. */
export function hubspotCliPackage(executable) {
  const candidates = [];
  try {
    let dir = dirname(realpathSync(executable));
    for (let i = 0; i < 6; i++) {
      candidates.push(join(dir, 'package.json'));
      dir = dirname(dir);
    }
  } catch {
    // unreadable link; fall through to the layout guesses
  }
  const bin = dirname(executable);
  candidates.push(join(bin, 'node_modules', '@hubspot', 'cli', 'package.json'));
  candidates.push(join(bin, '..', 'lib', 'node_modules', '@hubspot', 'cli', 'package.json'));
  candidates.push(join(bin, '..', '@hubspot', 'cli', 'package.json'));
  for (const candidate of candidates) {
    const json = readJson(candidate);
    if (json && json.name === '@hubspot/cli') return { version: json.version, packageJson: candidate };
  }
  return null;
}

/**
 * HubSpot's CLI as Node can run it, or null when no `hs` is on PATH:
 * { executable, packageJson, version, entry }. `entry` is the file the package's
 * `bin.hs` names, inside the package folder; it is null (and so are `packageJson`
 * and `version` when no package was found) when the `hs` on PATH cannot be traced
 * to one.
 */
export function resolveHubSpotCli({ env = process.env, platform = process.platform } = {}) {
  const executable = findOnPath('hs', { env, platform });
  if (!executable) return null;
  const found = hubspotCliPackage(executable);
  if (!found) return { executable, packageJson: null, version: null, entry: null };
  const bin = readJson(found.packageJson)?.bin;
  const target = bin && typeof bin === 'object' ? bin.hs : undefined;
  if (typeof target !== 'string') return { executable, ...found, entry: null };
  const root = dirname(found.packageJson);
  const entry = resolve(root, target);
  const inside = relative(root, entry);
  const contained = inside !== '' && !inside.startsWith('..') && !isAbsolute(inside);
  return { executable, ...found, entry: contained && isFile(entry) ? entry : null };
}
