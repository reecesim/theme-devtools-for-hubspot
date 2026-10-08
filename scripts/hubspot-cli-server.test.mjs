// SPDX-License-Identifier: Apache-2.0
//
// Runs the hubspot-cli MCP server as Claude Code does, a separate process spoken to
// over stdio, with a fake HubSpot CLI laid out like an npm global install: an `hs`
// shim in a folder on PATH, and beside it node_modules/@hubspot/cli whose package.json
// names the fake's JavaScript entry as `bin.hs`. The fake prints its arguments and the
// HubSpot variables it received, and exits with the code in FAKE_HS_EXIT.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { createInterface } from 'node:readline';
import { after, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { FALLBACK_PROTOCOL_VERSION, OUTPUT_LIMIT, PLUGIN_ID, TOOLS, readArguments, redact } from './hubspot-cli-server.mjs';
import { resolveHubSpotCli } from './lib/hubspot-cli.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const pluginRoot = join(here, '..');
const serverScript = join(here, 'hubspot-cli-server.mjs');
const work = mkdtempSync(join(tmpdir(), 'hubspot-cli-server-test-'));
after(() => rmSync(work, { recursive: true, force: true }));

const KEY = 'test-key-0123456789abcdef';
const ACCOUNT_ID = '12345678';
// Shaped like a HubSpot private app token; assembled so this file holds no key shape.
const TOKEN = ['pat', 'na1', '0a1b2c3d'].join('-');

function touch(path, content = '') {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
  return path;
}

/** A fake @hubspot/cli: the folder to put on PATH. */
function fakeCli() {
  const bin = join(work, 'npm-global');
  touch(join(bin, 'hs'), '#!/bin/sh\necho "the server runs the package entry, not this shim" >&2\nexit 99\n');
  touch(join(bin, 'hs.cmd'), '@echo the server runs the package entry, not this shim 1>&2\r\n@exit /b 99\r\n');
  const cli = join(bin, 'node_modules', '@hubspot', 'cli');
  touch(join(cli, 'package.json'), JSON.stringify({ name: '@hubspot/cli', version: '8.8.0', bin: { hs: './bin/hs.cjs' } }));
  touch(
    join(cli, 'bin', 'hs.cjs'),
    [
      "const env = process.env;",
      "if (env.FAKE_HS_MARKER) require('node:fs').appendFileSync(env.FAKE_HS_MARKER, 'ran\\n');",
      'process.stdout.write(JSON.stringify({',
      '  argv: process.argv.slice(2),',
      '  key: env.HUBSPOT_PERSONAL_ACCESS_KEY ?? null,',
      '  keyReceived: env.HUBSPOT_PERSONAL_ACCESS_KEY !== undefined && env.HUBSPOT_PERSONAL_ACCESS_KEY === env.FAKE_HS_EXPECTED_KEY,',
      '  accountId: env.HUBSPOT_ACCOUNT_ID ?? null,',
      '  cwd: process.cwd(),',
      "}) + '\\n');",
      "if (env.FAKE_HS_ECHO) process.stderr.write(env.FAKE_HS_ECHO + '\\n');",
      "for (let i = 0; i < Number(env.FAKE_HS_LINES || '0'); i++) process.stdout.write('line ' + i + ' ' + env.HUBSPOT_PERSONAL_ACCESS_KEY + ' ' + 'x'.repeat(60) + '\\n');",
      "process.exitCode = Number(env.FAKE_HS_EXIT || '0');",
      '',
    ].join('\n'),
  );
  return bin;
}

const fakeBin = fakeCli();
const emptyBin = mkdtempSync(join(work, 'no-cli-'));

// Environment names are case-insensitive on Windows, so drop every spelling of a key before setting it.
function withEnv(overrides) {
  const names = new Set(Object.keys(overrides).map((key) => key.toLowerCase()));
  const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => !names.has(key.toLowerCase())));
  for (const [key, value] of Object.entries(overrides)) if (value !== undefined) env[key] = value;
  return env;
}

let markers = 0;
function markerPath() {
  return join(work, `marker-${++markers}.txt`);
}

function configuredEnv(extra = {}) {
  return {
    PATH: fakeBin,
    HUBSPOT_PERSONAL_ACCESS_KEY: KEY,
    HUBSPOT_ACCOUNT_ID: ACCOUNT_ID,
    FAKE_HS_EXPECTED_KEY: KEY,
    FAKE_HS_EXIT: undefined,
    FAKE_HS_ECHO: undefined,
    FAKE_HS_LINES: undefined,
    ...extra,
  };
}

/** The server as a process: request(), notify(), send() and close(), which returns stderr and every stdout line. */
function startServer(overrides) {
  const child = spawn(process.execPath, [serverScript], { cwd: work, env: withEnv(overrides), stdio: ['pipe', 'pipe', 'pipe'] });
  const waiting = new Map();
  const lines = [];
  let stderr = '';
  createInterface({ input: child.stdout }).on('line', (line) => {
    lines.push(line);
    const message = JSON.parse(line);
    const resolve = waiting.get(message.id);
    if (resolve) {
      waiting.delete(message.id);
      resolve(message);
    }
  });
  child.stderr.setEncoding('utf8').on('data', (chunk) => {
    stderr += chunk;
  });
  let nextId = 1;
  const reply = (id) => new Promise((resolve) => waiting.set(id, resolve));
  return {
    request(method, params) {
      const id = nextId++;
      const answer = reply(id);
      child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', id, method, ...(params === undefined ? {} : { params }) })}\n`);
      return answer;
    },
    notify(method, params) {
      child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', method, ...(params === undefined ? {} : { params }) })}\n`);
    },
    /** Writes a raw line and waits for the reply with this id (null for parse errors). */
    send(line, id = null) {
      const answer = reply(id);
      child.stdin.write(`${line}\n`);
      return answer;
    },
    async close() {
      child.stdin.end();
      if (child.exitCode === null) await once(child, 'close');
      return { stderr, lines };
    },
  };
}

async function callTool(server, name, args = {}) {
  const reply = await server.request('tools/call', { name, arguments: args });
  assert.equal(reply.error, undefined, JSON.stringify(reply.error));
  const { content, isError } = reply.result;
  assert.equal(content.length, 1);
  assert.equal(content[0].type, 'text');
  let json = null;
  try {
    json = JSON.parse(content[0].text);
  } catch {
    // a plain-text refusal
  }
  return { isError: isError === true, text: content[0].text, json };
}

/** What the fake CLI printed on its first line of output. */
const fakeReport = (json) => JSON.parse(json.output.split(/\r?\n/)[0]);

const ACCOUNT_TOOLS = TOOLS.filter((tool) => tool.name !== 'hs_version');
const SAMPLE_ARGS = { hs_cms_list: {}, hs_cms_upload: { src: 'theme', dest: 'new-theme' }, hs_cms_fetch: { src: 'new-theme', dest: 'fetched' }, hs_filemanager_upload: { src: 'images', dest: 'theme-images' } };

describe('hubspot-cli-server.mjs: the protocol', { timeout: 30_000 }, () => {
  it('answers initialize in the protocol version the client asked for, with the tools capability and the plugin version', async () => {
    const server = startServer(configuredEnv());
    const reply = await server.request('initialize', { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'test', version: '0' } });
    const { version } = JSON.parse(readFileSync(join(pluginRoot, '.claude-plugin', 'plugin.json'), 'utf8'));
    assert.equal(reply.result.protocolVersion, '2025-06-18');
    assert.deepEqual(reply.result.capabilities, { tools: {} });
    assert.equal(reply.result.serverInfo.name, 'hubspot-cli');
    assert.equal(reply.result.serverInfo.version, version);
    server.notify('notifications/initialized');
    assert.deepEqual((await server.request('ping')).result, {});
    await server.close();
  });

  it(`falls back to ${FALLBACK_PROTOCOL_VERSION} for a protocol version it does not know`, async () => {
    const server = startServer(configuredEnv());
    const reply = await server.request('initialize', { protocolVersion: '1999-01-01', capabilities: {}, clientInfo: { name: 'test', version: '0' } });
    assert.equal(reply.result.protocolVersion, '2024-11-05');
    await server.close();
  });

  it('lists the five tools, each with an object input schema, and none that lints, cleans, watches, removes, previews or signs in', async () => {
    const server = startServer(configuredEnv({ HUBSPOT_PERSONAL_ACCESS_KEY: '' }));
    const { tools } = (await server.request('tools/list')).result;
    assert.deepEqual(tools.map((tool) => tool.name), ['hs_version', 'hs_cms_list', 'hs_cms_upload', 'hs_cms_fetch', 'hs_filemanager_upload']);
    for (const tool of tools) {
      assert.equal(tool.inputSchema.type, 'object', tool.name);
      assert.equal(tool.inputSchema.additionalProperties, false, tool.name);
      assert.doesNotMatch(tool.name, /lint|clean|watch|remove|preview|account/);
      for (const property of Object.keys(tool.inputSchema.properties)) assert.doesNotMatch(property, /clean|watch|remove|account/i, `${tool.name}.${property}`);
    }
    await server.close();
  });

  it('says in each description whether the tool writes to the account, in the deploy skill\'s words', async () => {
    const server = startServer(configuredEnv());
    const { tools } = (await server.request('tools/list')).result;
    const description = (name) => tools.find((tool) => tool.name === name).description;
    for (const name of ['hs_cms_upload', 'hs_filemanager_upload']) {
      assert.match(description(name), /Writes to the account/, name);
      assert.match(description(name), /Ask the user before calling it/, name);
    }
    assert.match(description('hs_cms_upload'), /live immediately/);
    assert.match(description('hs_cms_upload'), /does not create or publish any page/);
    assert.match(description('hs_filemanager_upload'), /public: anyone with the URL can see them/);
    for (const name of ['hs_version', 'hs_cms_list', 'hs_cms_fetch']) assert.match(description(name), /Writes nothing/i, name);
    await server.close();
  });

  it('answers an unknown method with -32601, a line that is not JSON with -32700, and an unknown tool with -32602', async () => {
    const server = startServer(configuredEnv());
    assert.equal((await server.request('resources/list')).error.code, -32601);
    assert.equal((await server.send('{not json')).error.code, -32700);
    assert.equal((await server.request('tools/call', { name: 'hs_cms_delete', arguments: {} })).error.code, -32602);
    await server.close();
  });

  it('writes nothing to stdout but JSON-RPC messages', async () => {
    const server = startServer(configuredEnv());
    await server.request('initialize', { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'test', version: '0' } });
    await callTool(server, 'hs_cms_upload', { src: 'theme', dest: 'new-theme' });
    const { lines } = await server.close();
    for (const line of lines) assert.equal(JSON.parse(line).jsonrpc, '2.0', line);
  });
});

describe('hubspot-cli-server.mjs: not configured', { timeout: 30_000 }, () => {
  const cases = [
    ['no key', { HUBSPOT_PERSONAL_ACCESS_KEY: '' }, /the HubSpot personal access key is not set/],
    ['no account ID', { HUBSPOT_ACCOUNT_ID: undefined }, /the HubSpot account ID is not set/],
    ['neither, as unsubstituted references', { HUBSPOT_PERSONAL_ACCESS_KEY: '${user_config.hubspot_personal_access_key}', HUBSPOT_ACCOUNT_ID: '${user_config.hubspot_account_id}' }, /the HubSpot personal access key and the account ID are not set/],
  ];
  for (const [label, overrides, what] of cases) {
    it(`refuses every account tool with ${label}, names /plugin configure and hs account auth, and runs nothing`, async () => {
      const marker = markerPath();
      const server = startServer(configuredEnv({ ...overrides, FAKE_HS_MARKER: marker }));
      for (const tool of ACCOUNT_TOOLS) {
        const result = await callTool(server, tool.name, SAMPLE_ARGS[tool.name]);
        assert.equal(result.isError, true, tool.name);
        assert.match(result.text, /^This plugin is not configured/);
        assert.match(result.text, what);
        assert.ok(result.text.includes(`/plugin configure ${PLUGIN_ID}`));
        assert.ok(result.text.includes(`claude plugin configure ${PLUGIN_ID}`));
        assert.match(result.text, /`hs account auth` in their own terminal/);
        assert.match(result.text, /`hs` through Bash/);
        assert.doesNotMatch(result.text, new RegExp(KEY));
      }
      await server.close();
      assert.equal(existsSync(marker), false, 'the CLI was run');
    });
  }

  it('still runs hs_version, reports configured: false, and gives it no key', async () => {
    const server = startServer(configuredEnv({ HUBSPOT_ACCOUNT_ID: '' }));
    const result = await callTool(server, 'hs_version');
    assert.equal(result.isError, false, result.text);
    assert.equal(result.json.configured, false);
    assert.equal(result.json.accountId, undefined);
    assert.equal(result.json.exitCode, 0);
    assert.deepEqual(fakeReport(result.json).argv, ['--version']);
    assert.equal(fakeReport(result.json).key, null);
    await server.close();
  });

  it('refuses an account ID that is not a number, without running anything or echoing it', async () => {
    const marker = markerPath();
    const server = startServer(configuredEnv({ HUBSPOT_ACCOUNT_ID: 'my-portal', FAKE_HS_MARKER: marker }));
    const result = await callTool(server, 'hs_cms_list');
    assert.equal(result.isError, true);
    assert.match(result.text, /not a number/);
    assert.doesNotMatch(result.text, /my-portal/);
    assert.equal(existsSync(marker), false, 'the CLI was run');
    const version = await callTool(server, 'hs_version');
    assert.equal(version.json.configured, false);
    assert.doesNotMatch(version.text, /my-portal/);
    await server.close();
  });
});

describe('hubspot-cli-server.mjs: configured', { timeout: 30_000 }, () => {
  it('runs hs cms upload <src> <dest> --use-env with the key and the account ID in its environment', async () => {
    const server = startServer(configuredEnv());
    const result = await callTool(server, 'hs_cms_upload', { src: 'my theme', dest: 'new-theme' });
    assert.equal(result.isError, false, result.text);
    assert.equal(result.json.exitCode, 0);
    assert.equal(result.json.command, 'hs cms upload "my theme" new-theme --use-env');
    const report = fakeReport(result.json);
    assert.deepEqual(report.argv, ['cms', 'upload', 'my theme', 'new-theme', '--use-env']);
    assert.equal(report.keyReceived, true);
    assert.equal(report.accountId, ACCOUNT_ID);
    assert.equal(realpathSync(report.cwd), realpathSync(work), 'the CLI runs in the server\'s working directory');
    await server.close();
  });

  it('replaces the key in the output with [redacted], and anything shaped like a HubSpot access token', async () => {
    const server = startServer(configuredEnv({ FAKE_HS_ECHO: `token ${TOKEN} and key ${KEY}` }));
    const result = await callTool(server, 'hs_cms_upload', { src: 'theme', dest: 'new-theme' });
    assert.equal(fakeReport(result.json).key, '[redacted]');
    assert.ok(!result.text.includes(KEY), 'the key is in the result');
    assert.ok(!result.text.includes(TOKEN), 'the token is in the result');
    assert.match(result.json.output, /token \[redacted\] and key \[redacted\]/);
    const { stderr } = await server.close();
    assert.ok(!stderr.includes(KEY), 'the key is in the diagnostics');
  });

  it('passes --cms-publish-mode for draft, and refuses any other mode', async () => {
    const server = startServer(configuredEnv());
    const draft = await callTool(server, 'hs_cms_upload', { src: 'theme', dest: 'new-theme', cmsPublishMode: 'draft' });
    assert.deepEqual(fakeReport(draft.json).argv, ['cms', 'upload', 'theme', 'new-theme', '--use-env', '--cms-publish-mode', 'draft']);
    const other = await callTool(server, 'hs_cms_upload', { src: 'theme', dest: 'new-theme', cmsPublishMode: 'live' });
    assert.equal(other.isError, true);
    assert.match(other.text, /must be one of draft, publish/);
    await server.close();
  });

  it('runs list, fetch and filemanager upload with --use-env, and fetch with --overwrite only when asked', async () => {
    const server = startServer(configuredEnv());
    const argv = async (name, args) => fakeReport((await callTool(server, name, args)).json).argv;
    assert.deepEqual(await argv('hs_cms_list', {}), ['cms', 'list', '--use-env']);
    assert.deepEqual(await argv('hs_cms_list', { path: 'new-theme' }), ['cms', 'list', 'new-theme', '--use-env']);
    assert.deepEqual(await argv('hs_cms_fetch', { src: 'new-theme', dest: 'fetched' }), ['cms', 'fetch', 'new-theme', 'fetched', '--use-env']);
    assert.deepEqual(await argv('hs_cms_fetch', { src: 'new-theme', dest: 'fetched', overwrite: true }), ['cms', 'fetch', 'new-theme', 'fetched', '--use-env', '--overwrite']);
    assert.deepEqual(await argv('hs_filemanager_upload', { src: 'images', dest: 'theme-images' }), ['filemanager', 'upload', 'images', 'theme-images', '--use-env']);
    await server.close();
  });

  it('keeps the end of a long output, with the key redacted on every line it keeps', async () => {
    const server = startServer(configuredEnv({ FAKE_HS_LINES: '12000' }));
    const result = await callTool(server, 'hs_cms_upload', { src: 'theme', dest: 'new-theme' });
    const { output } = result.json;
    assert.ok(!result.text.includes(KEY), 'the key is in the result');
    assert.ok(!result.text.includes(KEY.slice(4)), 'part of the key is in the result');
    assert.match(output, /^\[\d+ characters of earlier output omitted\]\n/);
    assert.ok(output.length <= OUTPUT_LIMIT + 100, `${output.length} characters kept`);
    assert.match(output, /line 11999 \[redacted\] x{60}\n?$/);
    await server.close();
  });

  it('reports a non-zero exit as an error with its exit code', async () => {
    const server = startServer(configuredEnv({ FAKE_HS_EXIT: '2' }));
    const result = await callTool(server, 'hs_cms_upload', { src: 'theme', dest: 'new-theme' });
    assert.equal(result.isError, true);
    assert.equal(result.json.exitCode, 2);
    await server.close();
  });

  it('refuses an argument that starts with "-", or one the tool does not take, without running anything', async () => {
    const marker = markerPath();
    const server = startServer(configuredEnv({ FAKE_HS_MARKER: marker }));
    for (const [name, args, pattern] of [
      ['hs_cms_upload', { src: '--clean', dest: 'new-theme' }, /"src" starts with "-"/],
      ['hs_cms_upload', { src: 'theme', dest: ' -x' }, /"dest" starts with "-"/],
      ['hs_cms_list', { path: '--help' }, /"path" starts with "-"/],
      ['hs_cms_upload', { src: 'theme', dest: 'new-theme', clean: true }, /"clean" is not an argument of this tool/],
      ['hs_cms_upload', { src: 'theme' }, /"dest" is required/],
      ['hs_cms_fetch', { src: 'new-theme', dest: 'fetched', overwrite: 'yes' }, /"overwrite" must be true or false/],
    ]) {
      const result = await callTool(server, name, args);
      assert.equal(result.isError, true, `${name} ${JSON.stringify(args)}`);
      assert.match(result.text, pattern);
      assert.match(result.text, /Nothing was run\.$/);
    }
    await server.close();
    assert.equal(existsSync(marker), false, 'the CLI was run');
  });

  it('reports a CLI that is not on PATH, with how to install it, and the configuration state from hs_version', async () => {
    const server = startServer(configuredEnv({ PATH: emptyBin }));
    const upload = await callTool(server, 'hs_cms_upload', { src: 'theme', dest: 'new-theme' });
    assert.equal(upload.isError, true);
    assert.match(upload.text, /not found on PATH/);
    assert.match(upload.text, /npm install -g @hubspot\/cli/);
    const version = await callTool(server, 'hs_version');
    assert.equal(version.isError, true);
    assert.equal(version.json.configured, true);
    assert.equal(version.json.accountId, ACCOUNT_ID);
    await server.close();
  });
});

describe('hubspot-cli-server.mjs: helpers', () => {
  it('redact replaces every occurrence of the key and token shapes, and leaves other text alone', () => {
    assert.equal(redact(`a ${KEY} b ${KEY}`, KEY), 'a [redacted] b [redacted]');
    assert.equal(redact(`Bearer ${TOKEN.toUpperCase()}`, ''), 'Bearer [redacted]');
    assert.equal(redact('compat-mode stays', KEY), 'compat-mode stays');
  });

  it('resolveHubSpotCli traces the hs on PATH to its package and the file bin.hs names, and to nothing outside the package', () => {
    const found = resolveHubSpotCli({ env: { PATH: fakeBin, PATHEXT: '.CMD' } });
    assert.equal(found.version, '8.8.0');
    assert.equal(found.entry, join(fakeBin, 'node_modules', '@hubspot', 'cli', 'bin', 'hs.cjs'));
    assert.equal(resolveHubSpotCli({ env: { PATH: emptyBin } }), null);

    const stray = join(work, 'stray-global');
    touch(join(stray, 'hs'));
    touch(join(stray, 'node_modules', '@hubspot', 'cli', 'package.json'), JSON.stringify({ name: '@hubspot/cli', version: '8.8.0', bin: { hs: '../../../evil.js' } }));
    touch(join(stray, 'evil.js'));
    assert.equal(resolveHubSpotCli({ env: { PATH: stray } }).entry, null);
  });

  it('readArguments drops null optional values and keeps the rest', () => {
    const upload = TOOLS.find((tool) => tool.name === 'hs_cms_upload');
    assert.deepEqual(readArguments(upload, { src: 'a', dest: 'b', cmsPublishMode: null }), { values: { src: 'a', dest: 'b' } });
    assert.match(readArguments(upload, ['a']).error, /must be an object/);
  });
});

describe('the manifest', () => {
  const manifest = JSON.parse(readFileSync(join(pluginRoot, '.claude-plugin', 'plugin.json'), 'utf8'));

  it('asks for the key as a sensitive, optional string and the account ID as an optional string', () => {
    const { hubspot_personal_access_key: key, hubspot_account_id: account } = manifest.userConfig;
    assert.deepEqual(Object.keys(manifest.userConfig).sort(), ['hubspot_account_id', 'hubspot_personal_access_key']);
    assert.equal(key.type, 'string');
    assert.equal(key.title, 'HubSpot personal access key');
    assert.equal(key.sensitive, true);
    assert.match(key.description, /secure storage/);
    assert.match(key.description, /hs account auth/);
    assert.equal(account.type, 'string');
    assert.equal(account.title, 'HubSpot account ID');
    assert.equal(account.sensitive, undefined);
    for (const option of [key, account]) {
      assert.equal(option.required, undefined);
      assert.equal(option.default, undefined);
    }
  });

  it('starts this server with node from the plugin root, and hands it the two values through its environment only', () => {
    assert.deepEqual(manifest.mcpServers, {
      'hubspot-cli': {
        command: 'node',
        args: ['${CLAUDE_PLUGIN_ROOT}/scripts/hubspot-cli-server.mjs'],
        env: {
          HUBSPOT_PERSONAL_ACCESS_KEY: '${user_config.hubspot_personal_access_key}',
          HUBSPOT_ACCOUNT_ID: '${user_config.hubspot_account_id}',
        },
      },
    });
  });
});
