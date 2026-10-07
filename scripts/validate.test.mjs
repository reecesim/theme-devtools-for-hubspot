// SPDX-License-Identifier: Apache-2.0
//
// Runs the vendored renderer's `validate` (through scripts/render.mjs) on two
// small themes written for the purpose: one with a field HubSpot's upload
// refuses (a leaf named `label` inside a repeater, and a theme font named
// `body` inside a group), and the same theme with those fields renamed. The
// bad one must fail with FIELD_NAME_RESERVED at those paths; the good one must
// pass with no errors. A missing renderer fails this test rather than skipping it.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { after, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const launcher = join(here, 'render.mjs');
const bundle = join(here, '..', 'vendor', 'renderer', 'themespot-render.mjs');
const work = mkdtempSync(join(tmpdir(), 'validate-test-'));
after(() => rmSync(work, { recursive: true, force: true }));

const PAGE = `<!--
  templateType: page
  isAvailableForNewContent: true
  label: Home
-->
{% extends "./layouts/base.html" %}
{% block body %}
{% dnd_area "main" %}
  {% dnd_section %}
    {% dnd_module path="../modules/price-list" %}{% end_dnd_module %}
  {% end_dnd_section %}
{% end_dnd_area %}
{% endblock body %}
`;

const LAYOUT = `<!--
  templateType: none
-->
<!doctype html>
<html><head>{{ standard_header_includes }}</head>
<body>{% block body %}{% endblock body %}{{ standard_footer_includes }}</body></html>
`;

/** Writes a one-module theme whose repeater child and theme font take the given names. */
function writeTheme(name, { rowField, fontField }) {
  const root = join(work, name);
  const files = {
    'theme.json': { label: 'Fixture', preview_path: './templates/home.html', version: '1.0' },
    'fields.json': [
      {
        label: 'Fonts',
        name: 'fonts',
        type: 'group',
        children: [{ label: 'Body font', name: fontField, type: 'font', default: { font: 'Inter', font_set: 'GOOGLE', fallback: 'sans-serif' } }],
      },
    ],
    'modules/price-list.module/meta.json': { label: 'Price list', content_types: ['SITE_PAGE'], is_available_for_new_content: true, global: false },
    'modules/price-list.module/fields.json': [
      {
        name: 'prices',
        label: 'Prices',
        type: 'group',
        occurrence: { min: 1, max: 6, default: 2 },
        children: [{ name: rowField, label: 'Plan', type: 'text', default: 'Starter' }],
        default: [{ [rowField]: 'Starter' }, { [rowField]: 'Team' }],
      },
    ],
  };
  for (const [path, value] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), `${JSON.stringify(value, null, 2)}\n`);
  }
  writeFileSync(
    join(root, 'modules/price-list.module/module.html'),
    `<ul>{% for row in module.prices %}<li>{{ row.${rowField}|escape_html }}</li>{% endfor %}</ul>\n`,
  );
  mkdirSync(join(root, 'templates', 'layouts'), { recursive: true });
  writeFileSync(join(root, 'templates', 'home.html'), PAGE);
  writeFileSync(join(root, 'templates', 'layouts', 'base.html'), LAYOUT);
  return root;
}

const badTheme = writeTheme('bad', { rowField: 'label', fontField: 'body' });
const goodTheme = writeTheme('good', { rowField: 'item_label', fontField: 'body_font' });

function validate(themeRoot) {
  const result = spawnSync(process.execPath, [launcher, 'validate', '--theme-root', themeRoot, '--json'], { encoding: 'utf8' });
  return { status: result.status, report: JSON.parse(result.stdout), stderr: result.stderr };
}

describe('the vendored validate', () => {
  it('is vendored', () => {
    assert.ok(existsSync(bundle), `${bundle} is missing`);
  });

  it('fails a theme with reserved field names, naming each path and a new name', () => {
    const { status, report } = validate(badTheme);
    assert.equal(status, 1);
    const reserved = report.diagnostics.filter((d) => d.code === 'FIELD_NAME_RESERVED');
    assert.deepEqual(
      reserved.map((d) => [d.severity, d.details.file, d.details.fieldPath]).sort(),
      [
        ['error', 'fields.json', 'fonts.body'],
        ['error', 'modules/price-list.module/fields.json', 'prices.label'],
      ],
    );
    for (const d of reserved) assert.ok(d.details.suggestedName && !['label', 'body', 'name'].includes(d.details.suggestedName));
  });

  it('passes the same theme with the fields renamed', () => {
    const { status, report } = validate(goodTheme);
    assert.equal(status, 0);
    assert.equal(report.counts.error, 0);
    assert.deepEqual(report.diagnostics.filter((d) => d.code === 'FIELD_NAME_RESERVED'), []);
  });

  it("reports exactly one error on HubSpot's bundled boilerplate, the one preview-and-validate names", () => {
    const { report } = validate(join(here, '..', 'vendor', 'boilerplate', 'src'));
    const errors = report.diagnostics.filter((d) => d.severity === 'error');
    assert.deepEqual(errors.map((d) => d.code), ['FIELD_REQUIRED_NO_DEFAULT']);
    assert.match(errors[0].message, /modules\/pricing-card\.module\/fields\.json .*'payment_link'/);
    const skill = readFileSync(join(here, '..', 'skills', 'preview-and-validate', 'SKILL.md'), 'utf8');
    assert.match(skill, /\| `FIELD_REQUIRED_NO_DEFAULT` \| error \| .*`payment_link` in `modules\/pricing-card\.module\/fields\.json`/);
  });

  it('renders the good theme', () => {
    const result = spawnSync(
      process.execPath,
      [launcher, 'render', '--theme-root', goodTheme, '--template', 'home.html', '--json'],
      { encoding: 'utf8' },
    );
    assert.equal(result.status, 0);
    const out = JSON.parse(result.stdout);
    assert.equal(out.ok, true);
    assert.match(out.html, /<li>Starter<\/li><li>Team<\/li>/);
  });
});
