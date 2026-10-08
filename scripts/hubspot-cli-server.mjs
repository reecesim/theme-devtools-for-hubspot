#!/usr/bin/env node
// SPDX-License-Identifier: Apache-2.0
//
// hubspot-cli-server.mjs
//
// The plugin's `hubspot-cli` MCP server. Claude Code starts it from plugin.json
// and talks to it over stdio, one JSON-RPC 2.0 message per line. It runs a few
// of HubSpot's CLI commands for the account in the plugin's configuration: the
// personal access key and the account ID arrive as HUBSPOT_PERSONAL_ACCESS_KEY
// and HUBSPOT_ACCOUNT_ID, which Claude Code fills in from its secure storage,
// and each command runs with --use-env so the CLI reads them from its
// environment and from no file. The key is never put on a command line, and
// every result has it replaced by [redacted].
//
// Tools: hs_version, hs_cms_list, hs_cms_upload, hs_cms_fetch and
// hs_filemanager_upload. Nothing that deletes (--clean, watch --remove),
// watches, serves (theme preview) or changes the sign-in (account) is offered,
// and a string argument that starts with "-" is refused, so none of them can be
// passed in as a flag. `hs cms lint` is not offered: it does not accept
// --use-env, so it stays with HubSpot's own sign-in and Bash.
//
// With the key or the account ID empty, tools/list still answers and every
// call but hs_version is refused without running anything. `hs` is found on
// PATH, and the JavaScript file its package's `bin.hs` names is run with this
// Node, with no shell.
//
// Writes nothing to stdout but JSON-RPC messages. Diagnostics go to stderr and
// never include the configured values.

import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';
import { readJson, resolveHubSpotCli } from './lib/hubspot-cli.mjs';
import { isMainModule } from './lib/is-main.mjs';

export const SERVER_NAME = 'hubspot-cli';
export const PLUGIN_ID = 'theme-devtools-for-hubspot@theme-devtools-for-hubspot';
/** Protocol versions this server answers in; a client asking for another gets the fallback. */
export const PROTOCOL_VERSIONS = ['2025-11-25', '2025-06-18', '2025-03-26', '2024-11-05'];
export const FALLBACK_PROTOCOL_VERSION = '2024-11-05';
export const TIMEOUT_MS = 10 * 60 * 1000;
/** Characters of output a result keeps: the end, where the CLI reports what failed. */
export const OUTPUT_LIMIT = 100_000;

const PLUGIN_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PLUGIN_VERSION = readJson(join(PLUGIN_ROOT, '.claude-plugin', 'plugin.json'))?.version ?? '0.0.0';

const KEY_VARIABLE = 'HUBSPOT_PERSONAL_ACCESS_KEY';
const ACCOUNT_VARIABLE = 'HUBSPOT_ACCOUNT_ID';
// A `${user_config.…}` reference left as it was written, as if no value were set.
const UNSUBSTITUTED = /^\$\{user_config\.[^}]*\}$/;
// HubSpot's private app access tokens start with "pat", a hyphen and the region
// (na1, eu1, …). A personal access key has no documented shape, so the configured
// value itself is what gets redacted; this catches a token of the other kind. The
// prefix is assembled so that this file does not itself contain a key shape.
const TOKEN_SHAPE = new RegExp(`\\b${'pat'}-[a-z0-9-]+`, 'gi');

const PATHS = 'Give local paths absolute: a relative one resolves against this server\'s working directory. An argument that starts with "-" is refused.';
const ACCOUNT = 'Runs for the account in this plugin\'s configuration (no --account).';
const ASK = 'Ask the user before calling it (deploy-to-hubspot, "Safe defaults").';

/** The tools: what each is, its input, and the CLI arguments it becomes. */
export const TOOLS = [
  {
    name: 'hs_version',
    title: 'HubSpot CLI version',
    description:
      'Runs `hs --version`: the installed HubSpot CLI\'s version. Writes nothing. Its result also says whether this plugin is configured ' +
      '(`configured`, and the configured `accountId`); when it is not, the other tools refuse, and the account is reached through ' +
      '`hs account auth` in the user\'s own terminal and `hs` in Bash instead.',
    properties: {},
    required: [],
    annotations: { readOnlyHint: true, openWorldHint: false },
    needsAccount: false,
    args: () => ['--version'],
  },
  {
    name: 'hs_cms_list',
    title: 'List the Design Manager',
    description: `Runs \`hs cms list [path] --use-env\`: lists the Design Manager (developer file system) at \`path\`, the root when omitted. Reads only; writes nothing to the account. ${ACCOUNT}`,
    properties: { path: { type: 'string', description: 'Design Manager folder to list; the root when omitted.' } },
    required: [],
    annotations: { readOnlyHint: true, openWorldHint: true },
    needsAccount: true,
    args: ({ path }) => ['cms', 'list', ...(path === undefined ? [] : [path]), '--use-env'],
  },
  {
    name: 'hs_cms_upload',
    title: 'Upload to the Design Manager',
    description:
      'Runs `hs cms upload <src> <dest> --use-env [--cms-publish-mode …]`. Writes to the account: copies the local folder or file `src` into the ' +
      'Design Manager (developer file system) at `dest`. HubSpot\'s documentation says changes uploaded with `hs cms upload` are live immediately, ' +
      'and the CLI\'s default publish mode is `publish`, so uploading over a path that pages already use changes those pages straight away. ' +
      'It does not create or publish any page, and it does not touch the File Manager. One clear yes covers the first upload of this theme to a ' +
      'new destination and every re-upload of fixes to that same destination; a different destination, or writing over anything that existed ' +
      `before this session, needs a new yes. --clean is not offered. ${ASK} ${ACCOUNT} ${PATHS}`,
    properties: {
      src: { type: 'string', description: 'Local folder or file to upload, such as the theme folder.' },
      dest: { type: 'string', description: 'Design Manager path to upload to, such as a new folder named after the theme.' },
      cmsPublishMode: {
        type: 'string',
        enum: ['draft', 'publish'],
        description: '`draft` saves the files as drafts instead of publishing them; the CLI\'s default is `publish`.',
      },
    },
    required: ['src', 'dest'],
    annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: true },
    needsAccount: true,
    args: ({ src, dest, cmsPublishMode }) => [
      'cms',
      'upload',
      src,
      dest,
      '--use-env',
      ...(cmsPublishMode === undefined ? [] : ['--cms-publish-mode', cmsPublishMode]),
    ],
  },
  {
    name: 'hs_cms_fetch',
    title: 'Fetch from the Design Manager',
    description:
      'Runs `hs cms fetch <src> <dest> --use-env [--overwrite]`: copies the Design Manager path `src` into the local folder `dest`. ' +
      'Reads from the account and writes nothing to it; it writes local files. Without `overwrite` it does not replace local files that exist: ' +
      `fetch into an empty folder and compare. ${ACCOUNT} ${PATHS}`,
    properties: {
      src: { type: 'string', description: 'Design Manager path to fetch.' },
      dest: { type: 'string', description: 'Local folder to write into, ideally new or empty.' },
      overwrite: { type: 'boolean', description: 'Replace local files that exist. Off unless the user asked for it.' },
    },
    required: ['src', 'dest'],
    annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
    needsAccount: true,
    args: ({ src, dest, overwrite }) => ['cms', 'fetch', src, dest, '--use-env', ...(overwrite === true ? ['--overwrite'] : [])],
  },
  {
    name: 'hs_filemanager_upload',
    title: 'Upload to the File Manager',
    description:
      'Runs `hs filemanager upload <src> <dest> --use-env`. Writes to the account: uploads the local file or folder `src` to the File Manager at ' +
      '`dest`. HubSpot\'s documentation says files uploaded this way are public: anyone with the URL can see them. This needs its own yes. ' +
      `${ASK} ${ACCOUNT} ${PATHS}`,
    properties: {
      src: { type: 'string', description: 'Local file or folder to upload.' },
      dest: { type: 'string', description: 'File Manager folder to upload into.' },
    },
    required: ['src', 'dest'],
    annotations: { readOnlyHint: false, destructiveHint: true, openWorldHint: true },
    needsAccount: true,
    args: ({ src, dest }) => ['filemanager', 'upload', src, dest, '--use-env'],
  },
];

class RpcError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

/** A configured value, trimmed; empty when unset or left as an unsubstituted reference. */
function configuredValue(value) {
  const text = typeof value === 'string' ? value.trim() : '';
  return UNSUBSTITUTED.test(text) ? '' : text;
}

/** The plugin's configuration as this process received it: { key, accountId, missing, valid }. */
export function readConfiguration(env = process.env) {
  const key = configuredValue(env[KEY_VARIABLE]);
  const accountId = configuredValue(env[ACCOUNT_VARIABLE]);
  const missing = [...(key ? [] : ['personal access key']), ...(accountId ? [] : ['account ID'])];
  return { key, accountId, missing, valid: missing.length === 0 && /^\d+$/.test(accountId) };
}

/** `text` with every occurrence of `key`, and anything shaped like a HubSpot access token, replaced by [redacted]. */
export function redact(text, key) {
  const without = key ? text.split(key).join('[redacted]') : text;
  return without.replace(TOKEN_SHAPE, '[redacted]');
}

function log(message, key) {
  process.stderr.write(`${SERVER_NAME}: ${redact(String(message), key)}\n`);
}

function notConfigured(missing) {
  const what = missing.length === 2 ? 'the HubSpot personal access key and the account ID are' : `the HubSpot ${missing[0]} is`;
  return (
    `This plugin is not configured: ${what} not set, so nothing was run. ` +
    `The user enters both once in the plugin's configuration dialog, \`/plugin configure ${PLUGIN_ID}\` in Claude Code ` +
    `(from a shell, \`claude plugin configure ${PLUGIN_ID}\` shows which are set); the key goes to Claude Code's secure storage, ` +
    'never into the chat. The alternative: the user runs `hs account auth` in their own terminal, and you run `hs` through Bash ' +
    'with --account (deploy-to-hubspot, "2. Sign in").'
  );
}

const ACCOUNT_ID_NOT_NUMERIC =
  'The account ID in this plugin\'s configuration is not a number, so nothing was run. The user enters the numeric account (portal) ID ' +
  `the key belongs to in \`/plugin configure ${PLUGIN_ID}\`.`;

const CLI_NOT_FOUND =
  'HubSpot\'s CLI was not found on PATH, so nothing was run. Install it only with the user\'s agreement: npm install -g @hubspot/cli ' +
  '(needs Node 20 or newer). If it is installed and still not found, the folder npm puts global commands in is not on the PATH ' +
  'Claude Code was started with.';

function errorResult(text) {
  return { content: [{ type: 'text', text }], isError: true };
}

function jsonResult(value, isError) {
  return { content: [{ type: 'text', text: JSON.stringify(value, null, 2) }], isError };
}

/** The tool's arguments, checked against its schema: { values } or { error }. */
export function readArguments(tool, input) {
  if (input !== undefined && input !== null && (typeof input !== 'object' || Array.isArray(input))) return { error: 'the arguments must be an object' };
  const values = Object.fromEntries(Object.entries(input ?? {}).filter(([, value]) => value !== undefined && value !== null));
  for (const name of Object.keys(values)) {
    if (!(name in tool.properties)) return { error: `"${name}" is not an argument of this tool` };
  }
  for (const name of tool.required) {
    if (values[name] === undefined) return { error: `"${name}" is required` };
  }
  for (const [name, value] of Object.entries(values)) {
    const schema = tool.properties[name];
    if (schema.type === 'boolean') {
      if (typeof value !== 'boolean') return { error: `"${name}" must be true or false` };
      continue;
    }
    if (typeof value !== 'string' || value.trim() === '') return { error: `"${name}" must be a non-empty string` };
    if (value.trimStart().startsWith('-')) return { error: `"${name}" starts with "-", and arguments that could be read as flags are refused` };
    if (value.includes('\0')) return { error: `"${name}" contains a NUL character` };
    if (schema.enum && !schema.enum.includes(value)) return { error: `"${name}" must be one of ${schema.enum.join(', ')}` };
  }
  return { values };
}

/** The child's environment: this process's, with the configured values trimmed, or removed when empty. */
function childEnvironment(configuration) {
  const env = { ...process.env };
  const set = { [KEY_VARIABLE]: configuration.key, [ACCOUNT_VARIABLE]: configuration.accountId };
  for (const [name, value] of Object.entries(set)) {
    // Names are case-insensitive on Windows: drop every spelling before setting one.
    for (const existing of Object.keys(env)) if (existing.toLowerCase() === name.toLowerCase()) delete env[existing];
    if (value !== '') env[name] = value;
  }
  return env;
}

function display(args) {
  return ['hs', ...args.map((arg) => (/[\s"]/.test(arg) ? JSON.stringify(arg) : arg))].join(' ');
}

const running = new Set();

/** Runs the CLI's entry with this Node: { exitCode, timedOut, output }, the output redacted and capped. */
function runCli(entry, args, env, key) {
  return new Promise((settle) => {
    let output = '';
    let omitted = 0;
    let timedOut = false;
    let done = false;
    const finish = (exitCode) => {
      if (done) return;
      done = true;
      output = redact(output, key);
      if (output.length > OUTPUT_LIMIT) {
        omitted += output.length - OUTPUT_LIMIT;
        output = output.slice(-OUTPUT_LIMIT);
      }
      if (omitted > 0) output = `[${omitted} characters of earlier output omitted]\n${output}`;
      if (timedOut) output += `\n[stopped after ${TIMEOUT_MS / 60000} minutes without finishing; part of the work may already be done]`;
      settle({ exitCode, timedOut, output });
    };
    let child;
    try {
      child = spawn(process.execPath, [entry, ...args], { cwd: process.cwd(), env, shell: false, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
    } catch (error) {
      output = `HubSpot's CLI could not be started: ${error.message}`;
      finish(null);
      return;
    }
    running.add(child);
    const collect = (chunk) => {
      output += chunk;
      if (output.length <= 4 * OUTPUT_LIMIT) return;
      // Drop the start, cutting at a line break: a key or token never spans lines, so the
      // cut cannot leave part of one behind, and what is kept is redacted in full at the end.
      const lineBreak = output.indexOf('\n', output.length - 2 * OUTPUT_LIMIT);
      if (lineBreak !== -1) {
        omitted += lineBreak + 1;
        output = output.slice(lineBreak + 1);
      } else if (output.length > 16 * OUTPUT_LIMIT) {
        // One enormous line: redact what has arrived, then keep its end.
        output = redact(output, key);
        omitted += output.length - 2 * OUTPUT_LIMIT;
        output = output.slice(-2 * OUTPUT_LIMIT);
      }
    };
    child.stdout.setEncoding('utf8').on('data', collect);
    child.stderr.setEncoding('utf8').on('data', collect);
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill();
    }, TIMEOUT_MS);
    child.on('error', (error) => {
      output += `\nHubSpot's CLI could not be run: ${error.message}`;
      if (child.pid === undefined) {
        clearTimeout(timer);
        running.delete(child);
        finish(null);
      }
    });
    child.on('close', (code) => {
      clearTimeout(timer);
      running.delete(child);
      finish(code);
    });
  });
}

async function callTool(params) {
  const tool = TOOLS.find((candidate) => candidate.name === params?.name);
  if (!tool) throw new RpcError(-32602, `Unknown tool: ${String(params?.name)}`);
  const configuration = readConfiguration();
  if (tool.needsAccount) {
    if (configuration.missing.length > 0) return errorResult(notConfigured(configuration.missing));
    if (!configuration.valid) return errorResult(ACCOUNT_ID_NOT_NUMERIC);
  }
  const parsed = readArguments(tool, params.arguments);
  if (parsed.error) return errorResult(`${tool.name}: ${parsed.error}. Nothing was run.`);
  const status = tool.needsAccount
    ? {}
    : { configured: configuration.valid, ...(configuration.valid ? { accountId: configuration.accountId } : {}) };
  const args = tool.args(parsed.values);
  const cli = resolveHubSpotCli();
  if (!cli || !cli.entry) {
    const text = cli
      ? `An \`hs\` command is on PATH at ${cli.executable}, but the @hubspot/cli package it belongs to, or the file its \`bin.hs\` names, could not be found, so nothing was run. Reinstall it with the user's agreement: npm install -g @hubspot/cli`
      : CLI_NOT_FOUND;
    return tool.needsAccount ? errorResult(text) : jsonResult({ command: display(args), exitCode: null, output: text, ...status }, true);
  }
  // Only the tools that reach the account are given the key and the account ID.
  const env = childEnvironment(tool.needsAccount ? configuration : { key: '', accountId: '' });
  const result = await runCli(cli.entry, args, env, configuration.key);
  return jsonResult({ command: display(args), exitCode: result.exitCode, output: result.output, ...status }, result.exitCode !== 0);
}

function initialize(params) {
  const requested = params?.protocolVersion;
  return {
    protocolVersion: PROTOCOL_VERSIONS.includes(requested) ? requested : FALLBACK_PROTOCOL_VERSION,
    capabilities: { tools: {} },
    serverInfo: { name: SERVER_NAME, title: 'HubSpot CLI', version: PLUGIN_VERSION },
    instructions:
      'Runs HubSpot\'s CLI for the account in this plugin\'s configuration. Follow the deploy-to-hubspot skill: ' +
      'every tool that writes to the account needs the user\'s yes first.',
  };
}

async function dispatch(method, params) {
  switch (method) {
    case 'initialize':
      return initialize(params);
    case 'ping':
      return {};
    case 'tools/list':
      return {
        tools: TOOLS.map((tool) => ({
          name: tool.name,
          title: tool.title,
          description: tool.description,
          inputSchema: { type: 'object', properties: tool.properties, required: tool.required, additionalProperties: false },
          annotations: { title: tool.title, ...tool.annotations },
        })),
      };
    case 'tools/call':
      return callTool(params);
    default:
      throw new RpcError(-32601, `Method not found: ${method}`);
  }
}

function send(message) {
  process.stdout.write(`${JSON.stringify({ jsonrpc: '2.0', ...message })}\n`);
}

async function handleLine(line) {
  let message;
  try {
    message = JSON.parse(line);
  } catch {
    send({ id: null, error: { code: -32700, message: 'Parse error' } });
    return;
  }
  const isObject = message !== null && typeof message === 'object' && !Array.isArray(message);
  if (isObject && typeof message.method !== 'string' && 'id' in message && ('result' in message || 'error' in message)) return; // a reply; this server sends no requests
  if (!isObject || typeof message.method !== 'string') {
    send({ id: isObject && 'id' in message ? message.id : null, error: { code: -32600, message: 'Invalid Request' } });
    return;
  }
  if (!('id' in message)) return; // a notification (notifications/initialized, notifications/cancelled): nothing to answer
  try {
    send({ id: message.id, result: await dispatch(message.method, message.params) });
  } catch (error) {
    if (error instanceof RpcError) {
      send({ id: message.id, error: { code: error.code, message: error.message } });
    } else {
      log(`internal error in ${message.method}: ${error?.message ?? error}`, readConfiguration().key);
      send({ id: message.id, error: { code: -32603, message: 'Internal error' } });
    }
  }
}

function stopRunning() {
  for (const child of running) child.kill();
}

export function startServer() {
  const lines = createInterface({ input: process.stdin, crlfDelay: Infinity });
  lines.on('line', (line) => {
    if (line.trim() === '') return;
    handleLine(line).catch((error) => log(`could not answer: ${error?.message ?? error}`, readConfiguration().key));
  });
  // The client has gone: stop what is running, and let the process end.
  lines.on('close', stopRunning);
  process.stdout.on('error', stopRunning);
  log(`ready (${readConfiguration().valid ? 'configured' : 'not configured'})`);
}

if (isMainModule(import.meta.url)) {
  startServer();
}
