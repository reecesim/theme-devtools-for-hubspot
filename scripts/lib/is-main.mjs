// SPDX-License-Identifier: Apache-2.0
// True when the module at `metaUrl` is the script Node was asked to run, so a
// script can be both a command and a module that tests import.
import { realpathSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export function isMainModule(metaUrl) {
  const entry = process.argv[1];
  if (!entry) return false;
  try {
    const self = realpathSync(fileURLToPath(metaUrl));
    const main = realpathSync(resolve(entry));
    return process.platform === 'win32'
      ? self.toLowerCase() === main.toLowerCase()
      : self === main;
  } catch {
    return false;
  }
}
