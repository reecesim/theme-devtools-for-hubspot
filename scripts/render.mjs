#!/usr/bin/env node
// SPDX-License-Identifier: Apache-2.0
//
// render.mjs <command> [options]
//
// Launcher for the vendored HubL renderer at vendor/renderer/themespot-render.mjs.
// Forwards every argument and the renderer's exit code unchanged:
//   render    --theme-root <dir> --template <name> [--parent-theme-root <dir>] [--state <id>] [--out <file.html>] [--asset-base <url>] [--json]
//   serve     --theme-root <dir> [--parent-theme-root <dir>] [--port 3456]
//   templates --theme-root <dir> [--parent-theme-root <dir>] [--json]
//   validate  --theme-root <dir> [flags]
//
// Exit codes: the renderer's own (0 rendered, 1 could not, 2 bad arguments),
// or 4 when the renderer is not vendored in this copy of the plugin.

import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const EXIT_NOT_VENDORED = 4;
const bundle = join(dirname(fileURLToPath(import.meta.url)), '..', 'vendor', 'renderer', 'themespot-render.mjs');

if (!existsSync(bundle)) {
  console.error(`The renderer is not vendored in this copy of the plugin (${bundle} is missing), so local rendering is unavailable.`);
  process.exit(EXIT_NOT_VENDORED);
}

const child = spawn(process.execPath, [bundle, ...process.argv.slice(2)], { stdio: 'inherit' });
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    if (!child.killed) child.kill(signal);
  });
}
child.on('error', (error) => {
  console.error(`render: could not start the renderer: ${error.message}`);
  process.exit(1);
});
child.on('exit', (code, signal) => {
  process.exit(code ?? (signal ? 1 : 0));
});
