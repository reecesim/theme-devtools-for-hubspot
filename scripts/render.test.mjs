// SPDX-License-Identifier: Apache-2.0
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { after, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const work = mkdtempSync(join(tmpdir(), 'render-test-'));
after(() => rmSync(work, { recursive: true, force: true }));

/** A copy of the launcher in a plugin-shaped directory, with or without a bundle. */
function pluginCopy(name, bundleSource) {
  const root = join(work, name);
  mkdirSync(join(root, 'scripts'), { recursive: true });
  copyFileSync(join(here, 'render.mjs'), join(root, 'scripts', 'render.mjs'));
  if (bundleSource !== undefined) {
    mkdirSync(join(root, 'vendor', 'renderer'), { recursive: true });
    writeFileSync(join(root, 'vendor', 'renderer', 'themespot-render.mjs'), bundleSource);
  }
  return join(root, 'scripts', 'render.mjs');
}

describe('render.mjs', () => {
  it('exits 4 with one line when the renderer bundle is absent', () => {
    const launcher = pluginCopy('no-bundle');
    const result = spawnSync(process.execPath, [launcher, 'templates', '--theme-root', '.'], { encoding: 'utf8' });
    assert.equal(result.status, 4);
    assert.equal(result.stdout, '');
    const lines = result.stderr.trim().split(/\r?\n/);
    assert.equal(lines.length, 1);
    assert.match(lines[0], /^The renderer is not vendored in this copy of the plugin \(.*themespot-render\.mjs is missing\)/);
  });

  it('forwards every argument and the exit code to the bundle', () => {
    const launcher = pluginCopy(
      'fake-bundle',
      'process.stdout.write(JSON.stringify(process.argv.slice(2))); process.exit(2);\n',
    );
    const args = ['render', '--theme-root', 'C:\\themes\\my theme', '--template', 'home.html', '--json'];
    const result = spawnSync(process.execPath, [launcher, ...args], { encoding: 'utf8' });
    assert.equal(result.status, 2);
    assert.deepEqual(JSON.parse(result.stdout), args);
  });

  it('passes exit 0 through', () => {
    const launcher = pluginCopy('ok-bundle', 'process.exit(0);\n');
    assert.equal(spawnSync(process.execPath, [launcher, 'templates'], { encoding: 'utf8' }).status, 0);
  });
});
