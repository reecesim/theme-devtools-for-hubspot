#!/usr/bin/env node
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
import {
  CONTENT_FIXTURE_DIRECTORY,
  CONTENT_FIXTURE_KINDS,
  contentFixtureFile,
  contentKindForModuleContentTypes,
  contentKindForTemplateSource,
  createAssetUrlRewriter,
  createPageRenderer,
  listContentStates,
  loadContentState,
  resolveContentState,
  resolveThemeSettings,
  unknownContentStateError
} from "./chunks/chunk-XGUSAY2R.mjs";
import {
  parseSimpleKwargs
} from "./chunks/chunk-DS7F6ODD.mjs";
import {
  CRM_OBJECT_FIXTURE_DIRECTORY,
  FIELD_SCHEMA_DIR,
  FIELD_SCHEMA_SUFFIX,
  UNTYPED_FIXTURE_KINDS,
  classifyModuleDir,
  contentStateSchema,
  crmObjectFixtureSchema,
  decodeBase64Utf8,
  describeContentId,
  exampleFromEmbedded,
  findUnresolvableContentLinks,
  locateTemplate,
  resolveInThemeCascade,
  resolveModuleDir,
  resolveThemeRoots,
  themeRelativeDirectory
} from "./chunks/chunk-ZOOMNTJN.mjs";
import {
  EMBEDDED_FIXTURES
} from "./chunks/chunk-S62FVW6S.mjs";
import {
  renderThemeCssToFile
} from "./chunks/chunk-ZH4AFS5M.mjs";
import {
  DIAGNOSTIC_CODES,
  diagnostic
} from "./chunks/chunk-W5TSNL56.mjs";
import "./chunks/chunk-RZIZEC7B.mjs";
import "./chunks/chunk-SECO6OCJ.mjs";
import {
  hubspotDefaultModuleSlug
} from "./chunks/chunk-7ICA6BQD.mjs";
import {
  RendererError,
  getHostFs,
  hostFs,
  resolveSafePath,
  setHostFs
} from "./chunks/chunk-TILBP2YO.mjs";
import {
  __name
} from "./chunks/chunk-PPQVNGDG.mjs";

// src/cli.ts
import path8 from "path";
import fs3 from "fs";

// src/theme-validator.ts
import path from "path";

// src/browser/diagnostics.ts
var UNKNOWN_CODE_SEVERITY = "error";
var SEVERITY_BY_CODE = Object.assign(/* @__PURE__ */ Object.create(null), {
  [DIAGNOSTIC_CODES.MODULE_RENDER_ERROR]: "error",
  [DIAGNOSTIC_CODES.HUBL_MODULE_ERROR]: "error",
  [DIAGNOSTIC_CODES.CSS_RENDER_ERROR]: "error",
  [DIAGNOSTIC_CODES.MODULE_SHAPE_UNRECOGNISED]: "warning",
  [DIAGNOSTIC_CODES.HUBL_DATA_TEMPLATE_FAILED]: "error",
  [DIAGNOSTIC_CODES.HUBL_DATA_TEMPLATE_INVALID]: "error",
  [DIAGNOSTIC_CODES.HUBL_DATA_FIXTURE_INVALID]: "warning",
  [DIAGNOSTIC_CODES.CRM_OBJECT_FIXTURE_INVALID]: "warning",
  [DIAGNOSTIC_CODES.CRM_OBJECT_QUERY_NOT_APPLIED]: "info",
  [DIAGNOSTIC_CODES.SPECIMEN_SOURCE_FAILED]: "error",
  [DIAGNOSTIC_CODES.CONTENT_FIXTURE_INVALID]: "warning",
  [DIAGNOSTIC_CODES.CONTENT_STATE_UNKNOWN]: "error",
  [DIAGNOSTIC_CODES.SSR_BRIDGE_UNAVAILABLE]: "warning",
  [DIAGNOSTIC_CODES.SSR_BRIDGE_REQUEST_FAILED]: "error",
  [DIAGNOSTIC_CODES.REACT_MODULE_NOT_RENDERED]: "warning",
  [DIAGNOSTIC_CODES.HUBL_FILTER_UNSUPPORTED]: "warning",
  [DIAGNOSTIC_CODES.HUBL_FILTER_UNIMPLEMENTED]: "warning",
  [DIAGNOSTIC_CODES.HUBL_GLOBAL_UNIMPLEMENTED]: "warning",
  [DIAGNOSTIC_CODES.HUBL_TRANSLATIONS_UNRESOLVED]: "warning",
  [DIAGNOSTIC_CODES.HUBL_WIDGET_EDITOR_ONLY]: "info",
  [DIAGNOSTIC_CODES.HUBL_TAG_UNSUPPORTED]: "warning",
  [DIAGNOSTIC_CODES.HUBL_FOR_RECURSIVE_DEGRADED]: "warning",
  [DIAGNOSTIC_CODES.HUBL_DO_NO_OP]: "warning",
  [DIAGNOSTIC_CODES.HUBL_SCOPE_CSS_UNSCOPED]: "warning",
  [DIAGNOSTIC_CODES.HUBL_SCOPE_CSS_APPROXIMATE]: "info",
  [DIAGNOSTIC_CODES.FIELD_TYPE_UNSUPPORTED]: "warning",
  [DIAGNOSTIC_CODES.THEME_MANIFEST_FALLBACK]: "info",
  [DIAGNOSTIC_CODES.TEMPLATE_CONTEXT_UNREADABLE]: "info",
  [DIAGNOSTIC_CODES.INHERITANCE_PARENT_MISSING]: "error",
  [DIAGNOSTIC_CODES.INHERITANCE_TOO_DEEP]: "error",
  [DIAGNOSTIC_CODES.DND_HIERARCHY_VIOLATION]: "warning",
  [DIAGNOSTIC_CODES.DND_ARGUMENT_SERIALISED]: "warning",
  [DIAGNOSTIC_CODES.FIELD_BOOLEAN_FORMAT]: "warning",
  [DIAGNOSTIC_CODES.FIELD_REQUIRED_NO_DEFAULT]: "error",
  [DIAGNOSTIC_CODES.FIELD_CONTENT_LINK_UNRESOLVABLE]: "error",
  [DIAGNOSTIC_CODES.CONTENT_LINK_UNRESOLVED]: "warning",
  [DIAGNOSTIC_CODES.FIELD_NAME_RESERVED]: "error",
  [DIAGNOSTIC_CODES.TEMPLATE_REQUIRED_VARIABLE_MISSING]: "warning",
  [DIAGNOSTIC_CODES.HUBL_PARTIAL_NOT_FOUND]: "error",
  [DIAGNOSTIC_CODES.MODULE_NOT_FOUND]: "error",
  [DIAGNOSTIC_CODES.HUBSPOT_INTERNAL_MODULE]: "info",
  [DIAGNOSTIC_CODES.HUBSPOT_DEFAULT_MODULE_UNAVAILABLE]: "warning",
  [DIAGNOSTIC_CODES.HUBSPOT_DEFAULT_MODULE_NEEDS_PORTAL_DATA]: "info",
  [DIAGNOSTIC_CODES.HUBSPOT_DEFAULT_MODULE_APPROXIMATED]: "info",
  [DIAGNOSTIC_CODES.REACT_MODULE_FIELD_SCHEMA_UNAVAILABLE]: "warning",
  [DIAGNOSTIC_CODES.REACT_MODULE_FIELD_DEFAULT_UNEVALUABLE]: "info",
  [DIAGNOSTIC_CODES.VALIDATION_SOURCE_UNREADABLE]: "error",
  [DIAGNOSTIC_CODES.ASSET_BASE_URL_MISSING]: "info",
  [DIAGNOSTIC_CODES.ASSET_URL_UNRESOLVED]: "warning",
  [DIAGNOSTIC_CODES.ASSET_BASE_URL_INVALID]: "error",
  [DIAGNOSTIC_CODES.PAGE_MODULE_NOT_DRAWN]: "warning",
  [DIAGNOSTIC_CODES.PAGE_TEMPLATE_NOT_DRAWN]: "warning",
  [DIAGNOSTIC_CODES.PAGE_LAYOUT_UNBOUND]: "warning",
  [DIAGNOSTIC_CODES.PAGE_WIDGET_UNBOUND]: "warning",
  [DIAGNOSTIC_CODES.PAGE_LAYOUT_INVALID]: "warning",
  [DIAGNOSTIC_CODES.PAGE_THEME_ROOT_FILE_REJECTED]: "error"
});

// src/hubl-structure.ts
var DND_TAGS = [
  "dnd_area",
  "dnd_section",
  "dnd_column",
  "dnd_row",
  "dnd_module"
];
var ALLOWED_DND_CHILDREN = {
  dnd_area: ["dnd_section"],
  dnd_section: ["dnd_column", "dnd_module"],
  dnd_column: ["dnd_row"],
  dnd_row: ["dnd_column", "dnd_module"],
  dnd_module: []
};
var CONTROL_TAGS = /* @__PURE__ */ new Set(["if", "for"]);
var BLOCK_TAGS = /* @__PURE__ */ new Set(["block", "macro", "call", "filter", "with", "module_block"]);
var CONTROL_END_TAGS = {
  endif: "if",
  endfor: "for",
  endblock: "block",
  endmacro: "macro",
  endcall: "call",
  endfilter: "filter",
  endwith: "with",
  end_module_block: "module_block"
};
var VOID_ELEMENTS = /* @__PURE__ */ new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
var MODULE_TAGS = /* @__PURE__ */ new Set(["dnd_module", "module", "module_block"]);
function isDndTag(name) {
  return DND_TAGS.includes(name);
}
__name(isDndTag, "isDndTag");
function parseTemplateAnnotations(source) {
  const match = /^\s*<!--([\s\S]*?)-->/.exec(source);
  if (!match) return {};
  const annotations = {};
  const templateType = /^\s*templateType\s*:\s*(\S+)\s*$/m.exec(match[1]);
  if (templateType) annotations.templateType = templateType[1];
  const label = /^\s*label\s*:\s*(.+?)\s*$/m.exec(match[1]);
  if (label) annotations.label = label[1].replace(/^["']|["']$/g, "");
  const available = /^\s*isAvailableForNewContent\s*:\s*(true|false)\s*$/m.exec(match[1]);
  if (available) annotations.isAvailableForNewContent = available[1] === "true";
  return annotations;
}
__name(parseTemplateAnnotations, "parseTemplateAnnotations");
function blank(text) {
  return text.replace(/[^\n]/g, " ");
}
__name(blank, "blank");
function maskHublNoise(source) {
  return source.replace(/\{%-?\s*raw\s*-?%\}[\s\S]*?\{%-?\s*endraw\s*-?%\}/g, blank).replace(/\{#[\s\S]*?#\}/g, blank).replace(/<!--[\s\S]*?-->/g, blank).replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, blank);
}
__name(maskHublNoise, "maskHublNoise");
function readStatement(source, openIndex) {
  let i = openIndex + 2;
  if (source[i] === "-") i++;
  while (i < source.length && /\s/.test(source[i])) i++;
  const nameStart = i;
  while (i < source.length && /[A-Za-z0-9_]/.test(source[i])) i++;
  if (i === nameStart) return null;
  const name = source.slice(nameStart, i);
  const bodyStart = i;
  let quote = null;
  while (i < source.length) {
    const char = source[i];
    if (quote) {
      if (char === "\\") {
        i += 2;
        continue;
      }
      if (char === quote) quote = null;
      i++;
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      i++;
      continue;
    }
    if (char === "%" && source[i + 1] === "}") {
      const rawEnd = source[i - 1] === "-" ? i - 1 : i;
      return { name, raw: source.slice(bodyStart, rawEnd).trim(), end: i + 2 };
    }
    i++;
  }
  return { name, raw: "", end: bodyStart };
}
__name(readStatement, "readStatement");
var HTML_TAG_RE = /<(\/?)([A-Za-z][A-Za-z0-9:-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>/g;
function lineStarts(source) {
  const starts = [0];
  for (let i = 0; i < source.length; i++) {
    if (source[i] === "\n") starts.push(i + 1);
  }
  return starts;
}
__name(lineStarts, "lineStarts");
function lineAt(starts, index) {
  let low = 0;
  let high = starts.length - 1;
  while (low < high) {
    const mid = Math.ceil((low + high) / 2);
    if (starts[mid] <= index) low = mid;
    else high = mid - 1;
  }
  return low + 1;
}
__name(lineAt, "lineAt");
function scanDndStructure(source, options = {}) {
  const masked = maskHublNoise(source);
  const starts = lineStarts(masked);
  const violations = [];
  const stack = [];
  const isPageTemplate = options.templateType === "page";
  const nearestDnd = /* @__PURE__ */ __name(() => {
    for (let i = stack.length - 1; i >= 0; i--) {
      const frame = stack[i];
      if (frame.kind === "dnd") return frame.tag;
    }
    return null;
  }, "nearestDnd");
  const closeTo = /* @__PURE__ */ __name((match, stopAtDnd) => {
    for (let i = stack.length - 1; i >= 0; i--) {
      const frame = stack[i];
      if (match(frame)) {
        stack.length = i;
        return;
      }
      if (stopAtDnd && frame.kind === "dnd") return;
    }
  }, "closeTo");
  let htmlMatch = null;
  let htmlExhausted = false;
  const htmlMatchFrom = /* @__PURE__ */ __name((from) => {
    if (htmlExhausted) return null;
    if (htmlMatch && htmlMatch.index >= from) return htmlMatch;
    HTML_TAG_RE.lastIndex = from;
    htmlMatch = HTML_TAG_RE.exec(masked);
    if (!htmlMatch) htmlExhausted = true;
    return htmlMatch;
  }, "htmlMatchFrom");
  let index = 0;
  while (index < masked.length) {
    const nextStatement = masked.indexOf("{%", index);
    const currentHtml = htmlMatchFrom(index);
    const nextHtml = currentHtml ? currentHtml.index : -1;
    if (nextStatement === -1 && nextHtml === -1) break;
    if (nextStatement === -1 || nextHtml !== -1 && nextHtml < nextStatement) {
      const [full, closing, rawName, attributes] = currentHtml;
      const name2 = rawName.toLowerCase();
      if (closing === "/") {
        closeTo((frame) => frame.kind === "html" && frame.tag === name2, true);
      } else if (!VOID_ELEMENTS.has(name2) && !attributes.trimEnd().endsWith("/")) {
        stack.push({ kind: "html", tag: name2, line: lineAt(starts, nextHtml) });
      }
      index = nextHtml + full.length;
      continue;
    }
    const statement = readStatement(masked, nextStatement);
    if (!statement) {
      index = nextStatement + 2;
      continue;
    }
    const line = lineAt(starts, nextStatement);
    const { name } = statement;
    if (isDndTag(name)) {
      const parentTag = nearestDnd();
      if (parentTag === null) {
        if (isPageTemplate && name !== "dnd_area") {
          violations.push({
            rule: 4,
            tag: name,
            parentTag: null,
            line,
            message: `Tag '${name}' must be within a 'dnd_area' and will be skipped.`
          });
        }
      } else if (!ALLOWED_DND_CHILDREN[parentTag].includes(name)) {
        violations.push({
          rule: catalogueRule(parentTag, name),
          tag: name,
          parentTag,
          line,
          message: `Tag ${name} cannot be a descendant of tag ${parentTag} and will be ignored.`
        });
      }
      stack.push({ kind: "dnd", tag: name, line });
      index = statement.end;
      continue;
    }
    if (name.startsWith("end_dnd_")) {
      const opening = name.slice("end_".length);
      closeTo((frame) => frame.kind === "dnd" && frame.tag === opening, false);
      index = statement.end;
      continue;
    }
    if (CONTROL_TAGS.has(name) || BLOCK_TAGS.has(name)) {
      const top = stack[stack.length - 1];
      if (CONTROL_TAGS.has(name) && top && top.kind === "dnd" && top.tag === "dnd_column") {
        violations.push({
          rule: 3,
          tag: name,
          parentTag: "dnd_column",
          line,
          message: `Tag ${name} cannot be a descendant of tag dnd_column and will be ignored.`
        });
      }
      stack.push({ kind: "control", tag: name, line });
      index = statement.end;
      continue;
    }
    const closes = CONTROL_END_TAGS[name];
    if (closes) {
      closeTo((frame) => frame.kind === "control" && frame.tag === closes, true);
    }
    index = statement.end;
  }
  return violations;
}
__name(scanDndStructure, "scanDndStructure");
function catalogueRule(parentTag, tag) {
  if (parentTag === "dnd_section" && tag === "dnd_row") return 1;
  if (parentTag === "dnd_column" && tag === "dnd_module") return 2;
  return null;
}
__name(catalogueRule, "catalogueRule");
function extractModuleTags(source) {
  const masked = maskHublNoise(source);
  const starts = lineStarts(masked);
  const found = [];
  let index = 0;
  while (index < masked.length) {
    const openIndex = masked.indexOf("{%", index);
    if (openIndex === -1) break;
    const statement = readStatement(masked, openIndex);
    if (!statement) {
      index = openIndex + 2;
      continue;
    }
    if (MODULE_TAGS.has(statement.name)) {
      found.push({
        tag: statement.name,
        raw: statement.raw,
        line: lineAt(starts, openIndex)
      });
    }
    index = statement.end;
  }
  return found;
}
__name(extractModuleTags, "extractModuleTags");

// src/field-metadata-extractor.ts
function fieldsJsonToFieldMetadata(fields) {
  const out = [];
  if (!Array.isArray(fields)) return out;
  for (const field of fields) {
    if (!field || !field.name) continue;
    const meta = { name: field.name, type: field.type ?? "unknown" };
    if (field.label !== void 0) meta.label = field.label;
    if (field.default !== void 0) meta.default = field.default;
    const help = field.help_text ?? field.inline_help_text;
    if (help !== void 0) meta.helpText = help;
    if (field.choices) meta.choices = field.choices;
    if (field.id !== void 0) meta.id = field.id;
    if (field.display !== void 0) meta.display = field.display;
    if (field.required !== void 0) meta.required = field.required;
    if (field.occurrence !== void 0) meta.occurrence = field.occurrence;
    if (field.visibility) meta.visibility = field.visibility;
    if (field.advanced_visibility) meta.advancedVisibility = field.advanced_visibility;
    if (Array.isArray(field.children)) meta.children = fieldsJsonToFieldMetadata(field.children);
    out.push(meta);
  }
  return out;
}
__name(fieldsJsonToFieldMetadata, "fieldsJsonToFieldMetadata");
function flattenFieldMetadata(fields, prefix = "") {
  const map = /* @__PURE__ */ new Map();
  for (const field of fields) {
    const path9 = prefix ? `${prefix}.${field.name}` : field.name;
    map.set(path9, field);
    if (field.children) {
      const childMap = flattenFieldMetadata(field.children, path9);
      for (const [childPath, childMeta] of childMap) {
        map.set(childPath, childMeta);
      }
    }
  }
  return map;
}
__name(flattenFieldMetadata, "flattenFieldMetadata");

// src/module-field-validator.ts
var RESERVED_FIELD_NAMES = /* @__PURE__ */ new Set([
  "label",
  "name",
  "id",
  "type",
  "module_id",
  "style",
  "class",
  "tag"
]);
var BOOLEAN_FIELD_TYPES = /* @__PURE__ */ new Set(["BooleanField", "boolean"]);
var CONTAINER_FIELD_TYPES = /* @__PURE__ */ new Set(["FieldGroup", "RepeatedFieldGroup", "group"]);
function isBooleanField(field) {
  return BOOLEAN_FIELD_TYPES.has(field.type);
}
__name(isBooleanField, "isBooleanField");
function isContainerField(field) {
  return CONTAINER_FIELD_TYPES.has(field.type) || Array.isArray(field.children) && field.children.length > 0;
}
__name(isContainerField, "isContainerField");
function isQuotedBoolean(value) {
  return typeof value === "string" && /^(?:true|false)$/i.test(value.trim());
}
__name(isQuotedBoolean, "isQuotedBoolean");
var DEFAULT_FIELD_RULES = [
  "visibility-path",
  "reserved-name",
  "link-default"
];
var OFFLINE_VALIDATION_FIELD_RULES = [
  "boolean-format",
  "required-no-default"
];
function validateModuleFields(fields, options = {}) {
  const rules = new Set(options.rules ?? DEFAULT_FIELD_RULES);
  const errors = [];
  const knownPaths = new Set(flattenFieldMetadata(fields).keys());
  function walk(items, prefix = "") {
    for (const field of items) {
      const fieldPath = prefix ? `${prefix}.${field.name}` : field.name;
      if (rules.has("reserved-name") && RESERVED_FIELD_NAMES.has(field.name)) {
        errors.push({
          kind: "reserved-name",
          fieldPath,
          message: `${fieldPath}: field name cannot be '${field.name}'`
        });
      }
      if (rules.has("visibility-path")) {
        checkVisibility(fieldPath, field.visibility, knownPaths, errors);
        checkVisibility(fieldPath, field.advancedVisibility, knownPaths, errors);
      }
      if (rules.has("link-default") && field.type === "LinkField" && field.default !== void 0) {
        const reason = invalidLinkDefaultReason(field.default);
        if (reason) {
          errors.push({
            kind: "link-default",
            fieldPath,
            message: `Link field at path ${fieldPath} has an invalid default value (${reason})`
          });
        }
      }
      if (rules.has("boolean-format") && isBooleanField(field) && isQuotedBoolean(field.default)) {
        errors.push({
          kind: "boolean-format",
          fieldPath,
          message: `${fieldPath}: the format for the boolean value is invalid (default is the string "${field.default}"; booleans must be unquoted)`
        });
      }
      if (rules.has("required-no-default") && field.required === true && field.default === void 0 && !isContainerField(field)) {
        errors.push({
          kind: "required-no-default",
          fieldPath,
          message: `'${fieldPath}' is required but no default is set`
        });
      }
      if (field.children) walk(field.children, fieldPath);
    }
  }
  __name(walk, "walk");
  walk(fields);
  return errors;
}
__name(validateModuleFields, "validateModuleFields");
var MODULE_TAG_PARAMS = /* @__PURE__ */ new Set([
  "path",
  "offset",
  "width",
  "horizontal_alignment",
  "vertical_alignment",
  "flexbox_positioning",
  "label",
  "class",
  "overrideable",
  "no_wrapper",
  "extra_classes",
  "unique_id",
  "export_to_template_context",
  "type",
  "_positional"
]);
function validateModuleParams(fields, params, options = {}) {
  const ignore = new Set(options.ignoreKeys ?? MODULE_TAG_PARAMS);
  const errors = [];
  function walk(items, values, prefix, top) {
    const byName = /* @__PURE__ */ new Map();
    for (const field of items) {
      byName.set(field.name, field);
      if (field.id) byName.set(field.id, field);
    }
    for (const [key, value] of Object.entries(values)) {
      const field = byName.get(key);
      if (!field && top && key === "fields" && isPlainObject(value)) {
        walk(items, value, prefix, false);
        continue;
      }
      if (!field) continue;
      if (top && ignore.has(key)) continue;
      const fieldPath = prefix ? `${prefix}.${field.name}` : field.name;
      if (isBooleanField(field) && isQuotedBoolean(value)) {
        errors.push({
          kind: "boolean-format",
          fieldPath,
          message: `${fieldPath}: the format for the boolean value is invalid (passed the string "${value}"; booleans must be unquoted)`
        });
        continue;
      }
      if (!field.children) continue;
      if (isPlainObject(value)) {
        walk(field.children, value, fieldPath, false);
      } else if (Array.isArray(value)) {
        value.forEach((entry, occurrence) => {
          if (isPlainObject(entry)) walk(field.children, entry, `${fieldPath}[${occurrence}]`, false);
        });
      }
    }
  }
  __name(walk, "walk");
  walk(fields, params, "", true);
  return errors;
}
__name(validateModuleParams, "validateModuleParams");
function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
__name(isPlainObject, "isPlainObject");
function checkVisibility(fieldPath, vis, knownPaths, errors) {
  if (!vis || typeof vis !== "object") return;
  if (typeof vis.controlling_field_path === "string" && !knownPaths.has(vis.controlling_field_path)) {
    errors.push({
      kind: "visibility-path",
      fieldPath,
      message: `${fieldPath}: no controlling_field with path '${vis.controlling_field_path}' exists`
    });
  }
  if (Array.isArray(vis.criteria)) {
    for (const criterion of vis.criteria) {
      checkVisibility(fieldPath, criterion, knownPaths, errors);
    }
  }
  if (vis.children && typeof vis.children === "object") {
    checkVisibility(fieldPath, vis.children, knownPaths, errors);
  }
}
__name(checkVisibility, "checkVisibility");
function invalidLinkDefaultReason(value) {
  if (value === null || typeof value !== "object") {
    return "expected an object";
  }
  if (Array.isArray(value)) {
    return "expected an object, got an array";
  }
  if (!value.url || typeof value.url !== "object" || Array.isArray(value.url)) {
    return "missing required 'url' object";
  }
  if (typeof value.url.type !== "string" || value.url.type.length === 0) {
    return "'url.type' is required (e.g. 'EXTERNAL')";
  }
  return null;
}
__name(invalidLinkDefaultReason, "invalidLinkDefaultReason");

// src/browser/template-scan.ts
var TEMPLATE_SEARCH_DIRS = ["templates", "sections", "helpers", "partials", ""];
var QUOTED = String.raw`(?:"([^"]*)"|'([^']*)')`;
var PATTERNS = [
  { kind: "extends", regex: new RegExp(String.raw`\{%-?\s*extends\s+${QUOTED}`, "g") },
  { kind: "include", regex: new RegExp(String.raw`\{%-?\s*include\s+${QUOTED}`, "g") },
  { kind: "import", regex: new RegExp(String.raw`\{%-?\s*(?:from|import)\s+${QUOTED}`, "g") },
  { kind: "dnd-partial", regex: new RegExp(String.raw`\{%-?\s*include_dnd_partial[^%]*?\bpath\s*=\s*${QUOTED}`, "g") },
  { kind: "global-partial", regex: new RegExp(String.raw`\{%-?\s*global_partial[^%]*?\bpath\s*=\s*${QUOTED}`, "g") },
  { kind: "module", regex: new RegExp(String.raw`\{%-?\s*(?:dnd_module|module|module_block)\b[^%]*?\bpath\s*=\s*${QUOTED}`, "g") },
  { kind: "asset", regex: new RegExp(String.raw`get_asset_url\(\s*${QUOTED}`, "g") }
];
var CSS_IMPORT = new RegExp(String.raw`@import\s+(?:url\(\s*)?${QUOTED}`, "g");
var CSS_HUBL_REF = new RegExp(String.raw`\{%-?\s*(?:include|import)\s+${QUOTED}`, "g");
function normaliseThemePath(pathname) {
  const segments = [];
  for (const segment of pathname.replace(/\\/g, "/").split("/")) {
    if (segment === "" || segment === ".") continue;
    if (segment === "..") {
      segments.pop();
      continue;
    }
    segments.push(segment);
  }
  return segments.join("/");
}
__name(normaliseThemePath, "normaliseThemePath");
function templateCandidates(ref, fromDir = "") {
  const bare = ref.replace(/^(?:\.\.\/)+/, "");
  const candidates = /* @__PURE__ */ new Set();
  if (fromDir && (ref.startsWith("./") || ref.startsWith("../"))) {
    candidates.add(normaliseThemePath(`${fromDir}/${ref}`));
  }
  for (const dir of TEMPLATE_SEARCH_DIRS) {
    candidates.add(normaliseThemePath(dir ? `${dir}/${bare}` : bare));
  }
  candidates.add(normaliseThemePath(ref));
  return [...candidates].filter(Boolean);
}
__name(templateCandidates, "templateCandidates");

// src/theme-validator.ts
var HUBSPOT_MODULE_PREFIX = "@hubspot/";
var SKIPPED_DIRECTORIES = /* @__PURE__ */ new Set([
  "node_modules",
  ".git",
  ".hs",
  "dist",
  "build",
  "coverage",
  ".next",
  ".vite",
  ".turbo",
  "test-results",
  "playwright-report"
]);
var TEMPLATE_EXTENSION = ".html";
function severityOf(error) {
  return SEVERITY_BY_CODE[error.code] ?? UNKNOWN_CODE_SEVERITY;
}
__name(severityOf, "severityOf");
function validateTheme(options) {
  const diagnostics = [];
  const { themeRoots: themeRoots2, resolved } = resolveRootsForValidation(options, diagnostics);
  const root = themeRoots2.themeRoot;
  diagnostics.push(...themeRoots2.diagnostics);
  const filesScanned = [];
  const walk = collectThemeFiles(root, options.maxFiles ?? 5e3, diagnostics);
  const moduleFields = /* @__PURE__ */ new Map();
  const cascadeComplete = resolved && !themeRoots2.diagnostics.some(
    (entry) => entry.code === DIAGNOSTIC_CODES.INHERITANCE_PARENT_MISSING || entry.code === DIAGNOSTIC_CODES.INHERITANCE_TOO_DEEP
  );
  const includeScans = /* @__PURE__ */ new Map();
  for (const relativePath of walk.templates) {
    filesScanned.push(relativePath);
    const source = readTextFile(root, relativePath, diagnostics);
    if (source === null) continue;
    validateTemplate({
      root,
      relativePath,
      source,
      themeRoots: themeRoots2,
      diagnostics,
      moduleFields,
      cascadeComplete,
      includeScans
    });
  }
  for (const relativePath of walk.fieldFiles) {
    filesScanned.push(relativePath);
    const source = readTextFile(root, relativePath, diagnostics);
    if (source === null) continue;
    validateFieldsFile(relativePath, source, diagnostics);
  }
  for (const relativePath of walk.schemaFiles) {
    filesScanned.push(relativePath);
    const source = readTextFile(root, relativePath, diagnostics);
    if (source === null) continue;
    validateFieldSchemaFile(relativePath, source, diagnostics);
  }
  diagnostics.sort(compareDiagnostics);
  const counts = { error: 0, warning: 0, info: 0 };
  for (const entry of diagnostics) counts[severityOf(entry)]++;
  return { diagnostics, filesScanned, truncated: walk.truncated, counts };
}
__name(validateTheme, "validateTheme");
function resolveRootsForValidation(options, diagnostics) {
  try {
    return {
      themeRoots: resolveThemeRoots({
        childThemeRoot: options.themeRoot,
        parentThemeRoot: options.parentThemeRoot,
        projects: options.projects
      }),
      resolved: true
    };
  } catch (err) {
    diagnostics.push(
      err instanceof RendererError ? err : diagnostic(
        DIAGNOSTIC_CODES.VALIDATION_SOURCE_UNREADABLE,
        `Theme cascade resolution failed: ${err instanceof Error ? err.message : String(err)}. Validation continued against ${options.themeRoot} alone, so nothing inherited was checked.`,
        { file: "theme.json" }
      )
    );
    return { themeRoots: resolveThemeRoots({ themeRoot: options.themeRoot }), resolved: false };
  }
}
__name(resolveRootsForValidation, "resolveRootsForValidation");
function isFieldSchemaFile(relative) {
  const segments = relative.split("/");
  return segments.length >= 2 && segments[segments.length - 2] === FIELD_SCHEMA_DIR && segments[segments.length - 1].endsWith(FIELD_SCHEMA_SUFFIX);
}
__name(isFieldSchemaFile, "isFieldSchemaFile");
function collectThemeFiles(root, maxFiles, diagnostics) {
  const templates = [];
  const fieldFiles = [];
  const schemaFiles = [];
  let seen = 0;
  let truncated = false;
  const visit = /* @__PURE__ */ __name((directory, prefix) => {
    if (truncated) return;
    let entries;
    try {
      entries = hostFs.readdirSync(directory);
    } catch (err) {
      diagnostics.push(
        diagnostic(
          DIAGNOSTIC_CODES.VALIDATION_SOURCE_UNREADABLE,
          `Could not list ${prefix || "."}: ${err instanceof Error ? err.message : String(err)}. Nothing inside that directory was validated.`,
          { file: prefix || "." }
        )
      );
      return;
    }
    for (const entry of entries.slice().sort()) {
      if (truncated) return;
      const absolute = path.join(directory, entry);
      const relative = prefix ? `${prefix}/${entry}` : entry;
      let isDirectory3;
      try {
        isDirectory3 = hostFs.statSync(absolute).isDirectory();
      } catch (err) {
        diagnostics.push(
          diagnostic(
            DIAGNOSTIC_CODES.VALIDATION_SOURCE_UNREADABLE,
            `Could not stat ${relative}: ${err instanceof Error ? err.message : String(err)}. It was skipped, so any fault in it is unreported.`,
            { file: relative }
          )
        );
        continue;
      }
      if (isDirectory3) {
        if (SKIPPED_DIRECTORIES.has(entry)) continue;
        visit(absolute, relative);
        continue;
      }
      if (++seen > maxFiles) {
        truncated = true;
        return;
      }
      if (entry.toLowerCase().endsWith(TEMPLATE_EXTENSION)) templates.push(relative);
      else if (entry === "fields.json") fieldFiles.push(relative);
      else if (isFieldSchemaFile(relative)) schemaFiles.push(relative);
    }
  }, "visit");
  visit(root, "");
  return { templates, fieldFiles, schemaFiles, truncated };
}
__name(collectThemeFiles, "collectThemeFiles");
function readTextFile(root, relativePath, diagnostics) {
  try {
    return hostFs.readFileSync(resolveSafePath(root, relativePath), "utf-8");
  } catch (err) {
    diagnostics.push(
      diagnostic(
        DIAGNOSTIC_CODES.VALIDATION_SOURCE_UNREADABLE,
        `Could not read ${relativePath}: ${err instanceof Error ? err.message : String(err)}. It was skipped, so any fault inside it is unreported.`,
        { file: relativePath }
      )
    );
    return null;
  }
}
__name(readTextFile, "readTextFile");
function validateTemplate(input) {
  const { relativePath, source, themeRoots: themeRoots2, diagnostics, moduleFields } = input;
  const annotations = parseTemplateAnnotations(source);
  const fromDir = relativePath.split("/").slice(0, -1).join("/");
  for (const violation of scanDndStructure(source, { templateType: annotations.templateType })) {
    diagnostics.push(dndDiagnostic(relativePath, violation));
  }
  if (input.cascadeComplete && requiresStandardIncludes(annotations)) {
    let missing;
    try {
      missing = missingRequiredVariables(input);
    } catch (err) {
      if (!(err instanceof RendererError)) throw err;
      missing = null;
    }
    if (missing && missing.length > 0) {
      diagnostics.push(requiredVariableDiagnostic(relativePath, annotations.templateType, missing));
    }
  }
  const reportedHubSpotModules = /* @__PURE__ */ new Set();
  for (const invocation of extractModuleTags(source)) {
    let kwargs;
    try {
      kwargs = parseSimpleKwargs(invocation.raw);
    } catch {
      continue;
    }
    const modulePath = typeof kwargs.path === "string" ? kwargs.path : "";
    if (!modulePath) continue;
    for (const [parameter, value] of Object.entries(kwargs)) {
      if (parameter === "path") continue;
      for (const link of findUnresolvableContentLinks(value, parameter)) {
        diagnostics.push(
          contentLinkDiagnostic(relativePath, link, { line: invocation.line, modulePath, parameter })
        );
      }
    }
    if (modulePath.startsWith(HUBSPOT_MODULE_PREFIX)) {
      if (reportedHubSpotModules.has(modulePath)) continue;
      reportedHubSpotModules.add(modulePath);
      diagnostics.push(hubspotInternalDiagnostic(relativePath, modulePath, invocation.line));
      continue;
    }
    const cacheKey = `${fromDir}\0${modulePath}`;
    let fields = moduleFields.get(cacheKey);
    if (fields === void 0) {
      fields = loadModuleFields(themeRoots2, modulePath, fromDir);
      moduleFields.set(cacheKey, fields);
    }
    if (!fields) continue;
    for (const error of validateModuleParams(fields, kwargs)) {
      diagnostics.push(
        booleanFormatDiagnostic(relativePath, error, {
          line: invocation.line,
          modulePath,
          origin: "template"
        })
      );
    }
  }
}
__name(validateTemplate, "validateTemplate");
function isDirectory(pathname) {
  try {
    return hostFs.statSync(pathname).isDirectory();
  } catch {
    return false;
  }
}
__name(isDirectory, "isDirectory");
function resolveModuleDirFrom(themeRoots2, modulePath, fromDir) {
  if (fromDir && /^\.\.?\//.test(modulePath)) {
    const candidate = normaliseThemePath(`${fromDir}/${modulePath}`);
    if (candidate) {
      try {
        const resolved = resolveInThemeCascade(themeRoots2, candidate);
        if (resolved && isDirectory(resolved)) return resolved;
      } catch (err) {
        if (!(err instanceof RendererError)) throw err;
      }
    }
  }
  try {
    return resolveModuleDir(themeRoots2, modulePath);
  } catch (err) {
    if (err instanceof RendererError) return null;
    throw err;
  }
}
__name(resolveModuleDirFrom, "resolveModuleDirFrom");
function loadModuleFields(themeRoots2, modulePath, fromDir) {
  const moduleDir = resolveModuleDirFrom(themeRoots2, modulePath, fromDir);
  if (!moduleDir) return null;
  let fieldsPath;
  try {
    fieldsPath = resolveSafePath(moduleDir, "fields.json");
  } catch {
    return null;
  }
  if (!hostFs.existsSync(fieldsPath)) return null;
  try {
    return fieldsJsonToFieldMetadata(JSON.parse(hostFs.readFileSync(fieldsPath, "utf-8")));
  } catch {
    return null;
  }
}
__name(loadModuleFields, "loadModuleFields");
function validateFieldsFile(relativePath, source, diagnostics) {
  let parsed;
  try {
    parsed = JSON.parse(source);
  } catch (err) {
    diagnostics.push(
      diagnostic(
        DIAGNOSTIC_CODES.VALIDATION_SOURCE_UNREADABLE,
        `${relativePath} is not valid JSON (${err instanceof Error ? err.message : String(err)}), so its field definitions could not be validated.`,
        { file: relativePath }
      )
    );
    return;
  }
  if (!Array.isArray(parsed)) return;
  if (!isHubspotAuthoredFile(relativePath)) {
    for (const entry of reservedFieldNameEntries(parsed)) {
      diagnostics.push(reservedFieldNameDiagnostic(relativePath, entry));
    }
  }
  const fields = fieldsJsonToFieldMetadata(parsed);
  for (const error of validateModuleFields(fields, { rules: OFFLINE_VALIDATION_FIELD_RULES })) {
    if (error.kind === "boolean-format") {
      diagnostics.push(booleanFormatDiagnostic(relativePath, error, { origin: "default" }));
    } else if (error.kind === "required-no-default") {
      diagnostics.push(requiredNoDefaultDiagnostic(relativePath, error));
    }
  }
  for (const { link, declaredOn } of contentLinksInFieldDefaults(parsed)) {
    diagnostics.push(contentLinkDiagnostic(relativePath, link, { declaredOn }));
  }
}
__name(validateFieldsFile, "validateFieldsFile");
function validateFieldSchemaFile(relativePath, source, diagnostics) {
  let parsed;
  try {
    parsed = JSON.parse(source);
  } catch (err) {
    diagnostics.push(
      diagnostic(
        DIAGNOSTIC_CODES.VALIDATION_SOURCE_UNREADABLE,
        `${relativePath} is not valid JSON (${err instanceof Error ? err.message : String(err)}), so the module defaults it carries could not be validated.`,
        { file: relativePath }
      )
    );
    return;
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) return;
  const schema = parsed;
  const fields = [
    ...Array.isArray(schema.contentFields) ? schema.contentFields : [],
    ...Array.isArray(schema.styleFields) ? schema.styleFields : []
  ];
  for (const { link, declaredOn } of contentLinksInFieldDefaults(fields)) {
    diagnostics.push(contentLinkDiagnostic(relativePath, link, { declaredOn }));
  }
}
__name(validateFieldSchemaFile, "validateFieldSchemaFile");
function contentLinksInFieldDefaults(fields, prefix = "") {
  const found = [];
  if (!Array.isArray(fields)) return found;
  for (const field of fields) {
    if (field === null || typeof field !== "object" || Array.isArray(field)) continue;
    const { name, default: value, children } = field;
    if (typeof name !== "string" || name === "") continue;
    const fieldPath = prefix ? `${prefix}.${name}` : name;
    if (value !== void 0) {
      for (const link of findUnresolvableContentLinks(value, fieldPath)) {
        found.push({ link, declaredOn: fieldPath });
      }
    }
    found.push(...contentLinksInFieldDefaults(children, fieldPath));
  }
  return found;
}
__name(contentLinksInFieldDefaults, "contentLinksInFieldDefaults");
var RESERVED_FIELD_RENAMES = /* @__PURE__ */ new Map([
  ["label", "item_label"],
  ["body", "body_text"],
  ["name", "item_name"]
]);
function isHubspotAuthoredFile(relativePath) {
  return relativePath.split("/").some((segment) => segment === "@hubspot");
}
__name(isHubspotAuthoredFile, "isHubspotAuthoredFile");
function reservedFieldNameEntries(fields, prefix = "") {
  const found = [];
  if (!Array.isArray(fields)) return found;
  for (const field of fields) {
    if (field === null || typeof field !== "object" || Array.isArray(field)) continue;
    const { name, type, children } = field;
    if (typeof name !== "string" || name === "") continue;
    const fieldPath = prefix ? `${prefix}.${name}` : name;
    const rename = RESERVED_FIELD_RENAMES.get(name);
    if (rename !== void 0) {
      found.push({ fieldPath, name, rename, type: typeof type === "string" ? type : null });
    }
    found.push(...reservedFieldNameEntries(children, fieldPath));
  }
  return found;
}
__name(reservedFieldNameEntries, "reservedFieldNameEntries");
var REQUIRED_TEMPLATE_VARIABLES = ["standard_header_includes", "standard_footer_includes"];
var REQUIRED_VARIABLE_TEMPLATE_TYPES = /* @__PURE__ */ new Set(["page", "blog", "blog_post", "blog_listing"]);
var MAX_INCLUDE_WALK_FILES = 200;
function requiresStandardIncludes(annotations) {
  if (!annotations.templateType || !REQUIRED_VARIABLE_TEMPLATE_TYPES.has(annotations.templateType)) return false;
  return annotations.isAvailableForNewContent !== false;
}
__name(requiresStandardIncludes, "requiresStandardIncludes");
function maskHublComments(source) {
  return source.replace(/\{%-?\s*raw\s*-?%\}[\s\S]*?\{%-?\s*endraw\s*-?%\}/g, " ").replace(/\{#[\s\S]*?#\}/g, " ");
}
__name(maskHublComments, "maskHublComments");
var INCLUDE_STATEMENT_RE = /\{%-?\s*(include_dnd_partial|global_partial|extends|include|import|from)\b([\s\S]*?)-?%\}/g;
function printsVariable(source, variable) {
  return new RegExp(`\\{\\{-?\\s*${variable}\\s*(?:\\|[^{}]*?)?-?\\}\\}`).test(source);
}
__name(printsVariable, "printsVariable");
function literalString(text) {
  const match = /^\s*(?:"([^"]*)"|'([^']*)')/.exec(text);
  if (!match) return null;
  const value = match[1] ?? match[2];
  return value.includes("{{") || value.includes("{%") ? null : value;
}
__name(literalString, "literalString");
function scanIncludes(source) {
  const masked = maskHublComments(source);
  const variables = /* @__PURE__ */ new Set();
  for (const variable of REQUIRED_TEMPLATE_VARIABLES) {
    if (printsVariable(masked, variable)) variables.add(variable);
  }
  const references = [];
  INCLUDE_STATEMENT_RE.lastIndex = 0;
  let match;
  while ((match = INCLUDE_STATEMENT_RE.exec(masked)) !== null) {
    const [, tag, args2] = match;
    if (tag === "import" || tag === "from") {
      references.push({ tag, target: null });
      continue;
    }
    if (tag === "extends" || tag === "include") {
      references.push({ tag, target: literalString(args2) });
      continue;
    }
    const pathArg = /\bpath\s*=\s*([\s\S]*)$/.exec(args2);
    if (!pathArg) continue;
    references.push({ tag, target: literalString(pathArg[1]) });
  }
  return { variables, references };
}
__name(scanIncludes, "scanIncludes");
function isFile(pathname) {
  try {
    return hostFs.statSync(pathname).isFile();
  } catch {
    return false;
  }
}
__name(isFile, "isFile");
function resolveIncludeTarget(themeRoots2, fromRelative, tag, target) {
  const fromDir = fromRelative.split("/").slice(0, -1).join("/");
  const candidates = templateCandidates(target, fromDir);
  if (tag === "global_partial") {
    const base = target.split("/").pop() ?? target;
    candidates.push(normaliseThemePath(`templates/layouts/${target}`), normaliseThemePath(`partials/${base}`));
  }
  for (const candidate of candidates) {
    if (!candidate) continue;
    try {
      const resolved = resolveInThemeCascade(themeRoots2, candidate);
      if (resolved && isFile(resolved)) return resolved;
    } catch (err) {
      if (!(err instanceof RendererError)) throw err;
    }
  }
  return null;
}
__name(resolveIncludeTarget, "resolveIncludeTarget");
function cascadeRelativePath(absolute, themeRoots2) {
  const dir = themeRelativeDirectory(absolute, themeRoots2);
  if (dir === null) return null;
  const base = path.basename(absolute);
  return dir ? `${dir}/${base}` : base;
}
__name(cascadeRelativePath, "cascadeRelativePath");
function missingRequiredVariables(input) {
  const { root, relativePath, source, themeRoots: themeRoots2, includeScans } = input;
  const found = /* @__PURE__ */ new Set();
  const entry = resolveSafePath(root, relativePath);
  const queue = [
    { absolute: entry, relative: relativePath, source }
  ];
  const visited = /* @__PURE__ */ new Set();
  while (queue.length > 0) {
    const next = queue.shift();
    if (visited.has(next.absolute)) continue;
    visited.add(next.absolute);
    if (visited.size > MAX_INCLUDE_WALK_FILES) return null;
    let scan = includeScans.get(next.absolute);
    if (scan === void 0) {
      let text = next.source;
      if (text === null) {
        try {
          text = hostFs.readFileSync(next.absolute, "utf-8");
        } catch {
          text = null;
        }
      }
      scan = text === null ? null : scanIncludes(text);
      includeScans.set(next.absolute, scan);
    }
    if (scan === null) return null;
    for (const variable of scan.variables) found.add(variable);
    if (found.size === REQUIRED_TEMPLATE_VARIABLES.length) return [];
    for (const reference of scan.references) {
      if (reference.target === null) return null;
      const resolved = resolveIncludeTarget(themeRoots2, next.relative, reference.tag, reference.target);
      if (resolved === null) return null;
      const relative = cascadeRelativePath(resolved, themeRoots2);
      if (relative === null) return null;
      queue.push({ absolute: resolved, relative, source: null });
    }
  }
  return REQUIRED_TEMPLATE_VARIABLES.filter((variable) => !found.has(variable));
}
__name(missingRequiredVariables, "missingRequiredVariables");
var RULE_REMEDIES = {
  1: "A dnd_section holds dnd_column and dnd_module directly. Drop the dnd_row wrapper, or put the row inside a dnd_column.",
  2: "Modules are columns themselves, so a dnd_module cannot sit directly in a dnd_column. Wrap it in a dnd_row.",
  3: "Wrap the conditional in an HTML element so the control-flow tag lives inside HTML rather than directly inside the dnd_column.",
  4: "Enclose it in a dnd_area > dnd_section > dnd_column chain. dnd_area ids must be literal strings \u2014 HubL interpolation is not supported there."
};
function dndDiagnostic(file, violation) {
  const remedy = violation.rule ? ` ${RULE_REMEDIES[violation.rule]}` : "";
  return diagnostic(
    DIAGNOSTIC_CODES.DND_HIERARCHY_VIOLATION,
    `${file}:${violation.line} \u2014 ${violation.message}${remedy}`,
    {
      file,
      sourceFile: file,
      line: violation.line,
      rule: violation.rule,
      tag: violation.tag,
      parentTag: violation.parentTag,
      hubspotMessage: violation.message
    }
  );
}
__name(dndDiagnostic, "dndDiagnostic");
function booleanFormatDiagnostic(file, error, context) {
  const at = context.line ? `${file}:${context.line}` : file;
  const target = context.modulePath ? ` passed to ${context.modulePath}` : "";
  return diagnostic(
    DIAGNOSTIC_CODES.FIELD_BOOLEAN_FORMAT,
    `${at} \u2014 ${error.message}${target}. HubSpot reports this as "The format for the boolean value is invalid." and ignores the value.`,
    {
      file,
      sourceFile: file,
      ...context.line ? { line: context.line } : {},
      ...context.modulePath ? { modulePath: context.modulePath } : {},
      fieldPath: error.fieldPath,
      origin: context.origin
    }
  );
}
__name(booleanFormatDiagnostic, "booleanFormatDiagnostic");
function requiredNoDefaultDiagnostic(file, error) {
  return diagnostic(
    DIAGNOSTIC_CODES.FIELD_REQUIRED_NO_DEFAULT,
    `${file} \u2014 ${error.message}. HubSpot fails the build on this, because an empty editor state can never satisfy the field. Give it a default, or make it optional.`,
    { file, sourceFile: file, fieldPath: error.fieldPath }
  );
}
__name(requiredNoDefaultDiagnostic, "requiredNoDefaultDiagnostic");
var CONTENT_LINK_REMEDY = 'Internal defaults should ship EXTERNAL with a relative href (e.g. {"type": "EXTERNAL", "href": "/contact"}) until the page exists; an editor re-points the link to CONTENT once it does.';
function contentLinkDiagnostic(file, link, context) {
  const at = context.line ? `${file}:${context.line}` : file;
  const where = context.parameter !== void 0 ? `'${link.path}' passed to ${context.modulePath}` : `'${link.path}' in the default of field '${context.declaredOn}'`;
  const consequence = context.parameter !== void 0 ? "so the link renders empty on the page" : "so every page that keeps this default renders the link empty";
  return diagnostic(
    DIAGNOSTIC_CODES.FIELD_CONTENT_LINK_UNRESOLVABLE,
    `${at} \u2014 ${where} is a CONTENT link with content_id ${describeContentId(link.contentId)}, which names no page. HubSpot resolves a CONTENT link by content_id and ignores its href, ${consequence}. ${CONTENT_LINK_REMEDY}`,
    {
      file,
      sourceFile: file,
      ...context.line ? { line: context.line } : {},
      ...context.modulePath ? { modulePath: context.modulePath } : {},
      fieldPath: link.path,
      ...context.declaredOn !== void 0 ? { declaredOn: context.declaredOn } : {},
      ...context.parameter !== void 0 ? { parameter: context.parameter } : {},
      contentId: link.contentId ?? null,
      origin: context.parameter !== void 0 ? "template" : "default"
    }
  );
}
__name(contentLinkDiagnostic, "contentLinkDiagnostic");
function reservedFieldNameDiagnostic(file, entry) {
  const scope = file === "fields.json" ? "theme" : "module";
  const kind = entry.type === "group" ? "group" : "field";
  return diagnostic(
    DIAGNOSTIC_CODES.FIELD_NAME_RESERVED,
    `${file} \u2014 ${kind} '${entry.fieldPath}' is named '${entry.name}', which HubSpot refuses at upload ("field name cannot be '${entry.name}'") whether the entry is a field, a group or a repeater. Rename it, for example to '${entry.rename}', and every ${scope}.${entry.fieldPath} reference with it. HubSpot reports one refused name per upload, so fix every one this run lists before uploading again.`,
    {
      file,
      sourceFile: file,
      fieldPath: entry.fieldPath,
      fieldName: entry.name,
      fieldType: entry.type,
      suggestedName: entry.rename
    }
  );
}
__name(reservedFieldNameDiagnostic, "reservedFieldNameDiagnostic");
function requiredVariableDiagnostic(file, templateType, missing) {
  const names = missing.map((variable) => `{{ ${variable} }}`).join(" and ");
  return diagnostic(
    DIAGNOSTIC_CODES.TEMPLATE_REQUIRED_VARIABLE_MISSING,
    `${file} \u2014 this ${templateType} template has no ${names}, neither in the file nor in anything it extends or includes. HubSpot requires both in a template or its partials before the template can be published and used; add the missing one to the template or to the layout it extends. A template that is not meant for new content can say so with isAvailableForNewContent: false instead.`,
    { file, sourceFile: file, templateType, missing }
  );
}
__name(requiredVariableDiagnostic, "requiredVariableDiagnostic");
function hubspotInternalDiagnostic(file, modulePath, line) {
  return diagnostic(
    DIAGNOSTIC_CODES.HUBSPOT_INTERNAL_MODULE,
    `${file}:${line} \u2014 ${modulePath} is a HubSpot-shipped module. Upload warnings originating inside it (typically "Cannot resolve property 'style' in ''") come from HubSpot's own template, which cannot be edited, so they are informational. Passing a minimal style={} silences the common one.`,
    { file, sourceFile: file, line, modulePath }
  );
}
__name(hubspotInternalDiagnostic, "hubspotInternalDiagnostic");
function compareDiagnostics(a, b) {
  const fileA = String(a.details?.file ?? "");
  const fileB = String(b.details?.file ?? "");
  if (fileA !== fileB) return fileA < fileB ? -1 : 1;
  const lineA = typeof a.details?.line === "number" ? a.details.line : 0;
  const lineB = typeof b.details?.line === "number" ? b.details.line : 0;
  if (lineA !== lineB) return lineA - lineB;
  return a.code < b.code ? -1 : a.code > b.code ? 1 : 0;
}
__name(compareDiagnostics, "compareDiagnostics");
function formatValidationReport(result, options = {}) {
  const lines = [];
  const where = options.themeRoot ? ` in ${options.themeRoot}` : "";
  for (const entry of result.diagnostics) {
    lines.push(`${severityOf(entry).padEnd(7)} ${entry.code}  ${entry.message}`);
  }
  if (result.diagnostics.length === 0) {
    lines.push(`No template validation faults found${where}.`);
  }
  lines.push("");
  lines.push(
    `${result.filesScanned.length} file(s) scanned${where}: ${result.counts.error} error(s), ${result.counts.warning} warning(s), ${result.counts.info} informational.`
  );
  if (result.truncated) {
    lines.push("WARNING: the file walk hit its maxFiles limit; this report is incomplete.");
  }
  return lines.join("\n");
}
__name(formatValidationReport, "formatValidationReport");

// src/cli-commands.ts
import fs2 from "fs";
import path7 from "path";
import { pathToFileURL } from "url";

// src/theme-templates.ts
import path2 from "path";
var NON_PAGE_TEMPLATE_DIRECTORIES = /* @__PURE__ */ new Set(["layouts", "partials"]);
var MAX_TEMPLATE_DEPTH = 16;
function listPageTemplates(roots) {
  const byName = /* @__PURE__ */ new Map();
  const sources = [{ root: roots.themeRoot, label: "theme" }];
  if (roots.parentThemeRoot) sources.push({ root: roots.parentThemeRoot, label: "parent" });
  for (const { root, label } of sources) {
    for (const entry of htmlFilesUnder(root, label, "templates", NON_PAGE_TEMPLATE_DIRECTORIES)) {
      if (!byName.has(entry.name)) byName.set(entry.name, entry);
    }
  }
  return [...byName.values()].sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
}
__name(listPageTemplates, "listPageTemplates");
function listHtmlFilesUnder(roots, directory) {
  const byName = /* @__PURE__ */ new Map();
  const sources = [{ root: roots.themeRoot, label: "theme" }];
  if (roots.parentThemeRoot) sources.push({ root: roots.parentThemeRoot, label: "parent" });
  for (const { root, label } of sources) {
    for (const entry of htmlFilesUnder(root, label, directory, /* @__PURE__ */ new Set())) {
      if (!byName.has(entry.name)) byName.set(entry.name, entry);
    }
  }
  return [...byName.values()].sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
}
__name(listHtmlFilesUnder, "listHtmlFilesUnder");
function normaliseTemplateName(input) {
  let name = input.trim().replace(/\\/g, "/");
  while (name.startsWith("./")) name = name.slice(2);
  if (name.startsWith("templates/")) name = name.slice("templates/".length);
  return name;
}
__name(normaliseTemplateName, "normaliseTemplateName");
function findPageTemplate(templates, input) {
  const name = normaliseTemplateName(input);
  return templates.find((entry) => entry.name === name) ?? null;
}
__name(findPageTemplate, "findPageTemplate");
function htmlFilesUnder(root, label, directory, skipTopLevel) {
  let templatesDir;
  try {
    templatesDir = resolveSafePath(root, directory);
  } catch (err) {
    if (err instanceof RendererError) return [];
    throw err;
  }
  if (!isDirectory2(templatesDir)) return [];
  const found = [];
  const visited = /* @__PURE__ */ new Set();
  const walk = /* @__PURE__ */ __name((dir, relative, depth) => {
    if (depth > MAX_TEMPLATE_DEPTH || visited.has(dir)) return;
    visited.add(dir);
    let names;
    try {
      names = hostFs.readdirSync(dir).slice().sort();
    } catch {
      return;
    }
    for (const name of names) {
      if (relative.length === 0 && skipTopLevel.has(name)) continue;
      let candidate;
      try {
        candidate = resolveSafePath(root, path2.join(dir, name));
      } catch (err) {
        if (err instanceof RendererError) continue;
        throw err;
      }
      if (isDirectory2(candidate)) {
        walk(candidate, [...relative, name], depth + 1);
      } else if (name.toLowerCase().endsWith(".html") && isFile2(candidate)) {
        found.push({ name: [...relative, name].join("/"), root: label, path: candidate });
      }
    }
  }, "walk");
  walk(templatesDir, [], 0);
  return found;
}
__name(htmlFilesUnder, "htmlFilesUnder");
function isDirectory2(candidate) {
  try {
    return hostFs.existsSync(candidate) && hostFs.statSync(candidate).isDirectory();
  } catch {
    return false;
  }
}
__name(isDirectory2, "isDirectory");
function isFile2(candidate) {
  try {
    return hostFs.existsSync(candidate) && hostFs.statSync(candidate).isFile();
  } catch {
    return false;
  }
}
__name(isFile2, "isFile");

// src/theme-inventory.ts
import path3 from "path";

// src/browser/portal-context.ts
var SNAPSHOT_FIXTURE_FILES = {
  menu: "menu.json",
  menus: "menus.json",
  blogPosts: "blog-posts.json",
  hubdbRows: "hubdb-rows.json",
  form: "form.json",
  forms: "forms.json",
  brandSettings: "brand-settings.json",
  subscriptionTypes: "subscription-types.json"
};

// src/theme-inventory.ts
var LIST_KINDS = ["template", "module", "section", "partial", "state"];
var TARGET_KINDS = ["template", "module", "section", "partial"];
var MODULES_DIRECTORY = "modules";
var SECTIONS_DIRECTORY = "sections";
var PARTIALS_DIRECTORY = "templates/partials";
var FILE_TARGET_PATTERN = /^[A-Za-z0-9._/-]+\.html$/;
var MODULE_REFERENCE_PATTERN = /^(?:\.\.\/)*[A-Za-z0-9._@-][A-Za-z0-9._/@-]*$/;
function moduleTemplateFile(dir) {
  for (const name of ["module.hubl.html", "module.html"]) {
    try {
      if (hostFs.existsSync(path3.join(dir, name))) return name;
    } catch {
    }
  }
  return null;
}
__name(moduleTemplateFile, "moduleTemplateFile");
function listModules(roots) {
  const byName = /* @__PURE__ */ new Map();
  const sources = [{ root: roots.themeRoot, label: "theme" }];
  if (roots.parentThemeRoot) sources.push({ root: roots.parentThemeRoot, label: "parent" });
  for (const { root, label } of sources) {
    let dir;
    try {
      dir = resolveSafePath(root, MODULES_DIRECTORY);
    } catch (err) {
      if (err instanceof RendererError) continue;
      throw err;
    }
    let names;
    try {
      if (!hostFs.existsSync(dir) || !hostFs.statSync(dir).isDirectory()) continue;
      names = hostFs.readdirSync(dir).slice().sort();
    } catch {
      continue;
    }
    for (const entry of names) {
      let moduleDir;
      try {
        moduleDir = resolveSafePath(root, path3.join(dir, entry));
      } catch (err) {
        if (err instanceof RendererError) continue;
        throw err;
      }
      if (classifyModuleDir(moduleDir) !== "hubl") continue;
      const template = moduleTemplateFile(moduleDir);
      if (!template) continue;
      const name = `../${MODULES_DIRECTORY}/${entry.replace(/\.module$/, "")}`;
      if (byName.has(name)) continue;
      byName.set(name, { name, root: label, file: `${MODULES_DIRECTORY}/${entry}/${template}` });
    }
  }
  return [...byName.values()].sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
}
__name(listModules, "listModules");
function listFiles(roots, directory) {
  return listHtmlFilesUnder(roots, directory).filter((entry) => fileTargetSpellingProblem(entry.name) === null).map((entry) => ({ name: entry.name, root: entry.root, file: `${directory}/${entry.name}` }));
}
__name(listFiles, "listFiles");
function listStates(themeRoot) {
  return listContentStates(themeRoot).kinds.flatMap(
    (kind) => kind.states.map((state) => ({
      name: state.id,
      root: state.source === "theme" ? "theme" : "embedded",
      file: `fixtures/${contentFixtureFile(kind.kind, state.name)}`,
      label: state.label,
      source: state.source,
      required: state.required
    }))
  );
}
__name(listStates, "listStates");
function listThemeTargets(roots, kind) {
  switch (kind) {
    case "template":
      return listPageTemplates(roots).map((entry) => ({ name: entry.name, root: entry.root, file: `templates/${entry.name}` }));
    case "module":
      return listModules(roots);
    case "section":
      return listFiles(roots, SECTIONS_DIRECTORY);
    case "partial":
      return listFiles(roots, PARTIALS_DIRECTORY);
    case "state":
      return listStates(roots.themeRoot);
  }
}
__name(listThemeTargets, "listThemeTargets");
function fileTargetSpellingProblem(name) {
  if (!FILE_TARGET_PATTERN.test(name)) return 'it must be a relative .html file name of letters, digits, ".", "_", "-" and "/"';
  if (name.split("/").some((segment) => segment === "" || segment === "." || segment === "..") || name.includes("..")) {
    return 'it must not contain "..", an empty segment or a leading "/"';
  }
  return null;
}
__name(fileTargetSpellingProblem, "fileTargetSpellingProblem");
function resolveModuleReference(roots, input) {
  const reference = input.trim().replace(/\\/g, "/");
  if (reference.startsWith("@hubspot/")) {
    return hubspotDefaultModuleSlug(reference) !== null ? { ok: true, reference, directory: null, shape: "hubspot-default" } : { ok: false, reason: "a HubSpot default module is written @hubspot/<name>" };
  }
  if (!MODULE_REFERENCE_PATTERN.test(reference) || reference.replace(/^(?:\.\.\/)+/, "").split("/").some((segment) => segment === ".." || segment === "")) {
    return { ok: false, reason: "it is not a module reference (../modules/<name>, or a path inside the theme)" };
  }
  let directory = null;
  try {
    const cascade = resolveThemeRoots({ childThemeRoot: roots.themeRoot, parentThemeRoot: roots.parentThemeRoot });
    directory = resolveModuleDir(cascade, reference);
  } catch (err) {
    if (!(err instanceof RendererError)) throw err;
  }
  if (!directory) return { ok: false, reason: "no module directory in the theme answers to it" };
  const shape = classifyModuleDir(directory);
  if (shape === "unrecognised") return { ok: false, reason: "it names a directory that holds neither module.html nor a React entry" };
  return { ok: true, reference, directory, shape };
}
__name(resolveModuleReference, "resolveModuleReference");
function readModuleFields(roots, input) {
  const listing = /* @__PURE__ */ __name(() => listThemeTargets(roots, "module").map((item) => item.name), "listing");
  const resolved = resolveModuleReference(roots, input);
  if (!resolved.ok) return { ok: false, reason: resolved.reason, listing: listing() };
  if (resolved.shape === "hubspot-default" || !resolved.directory) {
    return { ok: false, reason: "a HubSpot default module's fields are not in the theme", listing: listing() };
  }
  if (resolved.shape === "react") {
    return { ok: true, module: resolved.reference, directory: resolved.directory, shape: "react", fields: [], note: "React module: not read" };
  }
  const file = path3.join(resolved.directory, "fields.json");
  if (!hostFs.existsSync(file)) {
    return { ok: true, module: resolved.reference, directory: resolved.directory, shape: "hubl", fields: [], note: "The module has no fields.json." };
  }
  let parsed;
  try {
    parsed = JSON.parse(hostFs.readFileSync(file, "utf-8"));
  } catch (err) {
    return { ok: false, unreadable: true, reason: `its fields.json is not valid JSON (${err instanceof Error ? err.message : String(err)})`, listing: [] };
  }
  if (!Array.isArray(parsed)) return { ok: false, unreadable: true, reason: "its fields.json is not a list of fields", listing: [] };
  return { ok: true, module: resolved.reference, directory: resolved.directory, shape: "hubl", fields: fieldsJsonToFieldMetadata(parsed) };
}
__name(readModuleFields, "readModuleFields");
var FIXTURES_NOTE = "Fixtures are read from the theme root only: a parent theme's fixtures are not read. A file in the --fixtures directory is read instead of the theme's file at the same path; a file the theme lacks falls back to the renderer's embedded copy where there is one.";
function isFile3(candidate) {
  try {
    return hostFs.existsSync(candidate) && hostFs.statSync(candidate).isFile();
  } catch {
    return false;
  }
}
__name(isFile3, "isFile");
function jsonFilesIn(dir) {
  try {
    if (!hostFs.existsSync(dir) || !hostFs.statSync(dir).isDirectory()) return [];
    return hostFs.readdirSync(dir).filter((name) => name.toLowerCase().endsWith(".json")).sort();
  } catch {
    return [];
  }
}
__name(jsonFilesIn, "jsonFilesIn");
function describeFixtures(themeRoot, overlay = null) {
  const fixturesDirectory = path3.join(themeRoot, "fixtures");
  const readPath = /* @__PURE__ */ __name((relative) => {
    if (overlay && isFile3(path3.join(overlay, relative))) return path3.join(overlay, relative);
    return path3.join(fixturesDirectory, relative);
  }, "readPath");
  const present = /* @__PURE__ */ __name((relative) => isFile3(path3.join(fixturesDirectory, relative)), "present");
  const kinds = [];
  for (const file of Object.values(SNAPSHOT_FIXTURE_FILES)) {
    const contract = UNTYPED_FIXTURE_KINDS[file];
    if (!contract) throw new Error(`The fixture contract does not describe ${file}.`);
    const embedded = Object.hasOwn(EMBEDDED_FIXTURES, file) ? EMBEDDED_FIXTURES[file] : void 0;
    kinds.push({
      kind: file,
      path: readPath(file),
      present: present(file),
      embeddedDefault: embedded === void 0 ? null : file,
      whenAbsent: embedded === void 0 ? contract.whenAbsent ?? "nothing" : "the renderer's embedded copy",
      description: contract.description,
      schema: null,
      example: contract.authoredExample !== void 0 ? structuredClone(contract.authoredExample) : exampleFromEmbedded(embedded, contract.fileType)
    });
  }
  const states = listContentStates(themeRoot);
  for (const kind of Object.keys(CONTENT_FIXTURE_KINDS)) {
    const summary = states.kinds.find((entry) => entry.kind === kind);
    const files = (summary?.states ?? []).map((state) => {
      const relative = contentFixtureFile(kind, state.name);
      return {
        name: state.id,
        path: readPath(relative),
        present: present(relative),
        embeddedDefault: Object.hasOwn(EMBEDDED_FIXTURES, relative) ? relative : null
      };
    });
    kinds.push({
      kind: `${CONTENT_FIXTURE_DIRECTORY}/${kind}/<state>.json`,
      path: path3.join(fixturesDirectory, CONTENT_FIXTURE_DIRECTORY, kind, "<state>.json"),
      present: files.some((entry) => entry.present),
      embeddedDefault: `${CONTENT_FIXTURE_DIRECTORY}/${kind}/<state>.json`,
      whenAbsent: `the renderer's embedded state, for the states every ${kind} has (${CONTENT_FIXTURE_KINDS[kind].join(", ")}); a state only the theme adds has no fallback`,
      description: `A page a ${kind} render binds as content, request, blog and the rest; rendered with --state ${kind}/<state>. The first required state is the default.`,
      schema: contentStateSchema(kind),
      example: null,
      files
    });
  }
  const crmDirectory = path3.join(fixturesDirectory, CRM_OBJECT_FIXTURE_DIRECTORY);
  const prefix = `${CRM_OBJECT_FIXTURE_DIRECTORY}/`;
  const embeddedCrm = Object.keys(EMBEDDED_FIXTURES).filter((key) => key.startsWith(prefix)).sort();
  const crmNames = [.../* @__PURE__ */ new Set([...jsonFilesIn(crmDirectory), ...embeddedCrm.map((key) => key.slice(prefix.length))])].sort();
  const crmFiles = crmNames.map((name) => {
    const relative = `${prefix}${name}`;
    return {
      name: name.slice(0, -".json".length),
      path: readPath(relative),
      present: present(relative),
      embeddedDefault: embeddedCrm.includes(relative) ? relative : null
    };
  });
  kinds.push({
    kind: `${CRM_OBJECT_FIXTURE_DIRECTORY}/<objectType>.json`,
    path: path3.join(crmDirectory, "<objectType>.json"),
    present: crmFiles.some((entry) => entry.present),
    embeddedDefault: embeddedCrm.length > 0 ? embeddedCrm.join(", ") : null,
    whenAbsent: "no records for an object type no file answers",
    description: "A CRM object type and its records: what crm_objects, crm_object and crm_associations answer. A file answers the type named by its objectTypeId, name or fullyQualifiedName, or its own file name, compared without regard to case; the theme's files are tried before the renderer's.",
    schema: crmObjectFixtureSchema(),
    example: null,
    files: crmFiles
  });
  return { themeRoot, fixturesDirectory, overlay, note: FIXTURES_NOTE, kinds };
}
__name(describeFixtures, "describeFixtures");
function leafPaths(value, prefix, out) {
  if (value !== null && typeof value === "object" && !Array.isArray(value) && Object.keys(value).length > 0) {
    for (const [key, child] of Object.entries(value)) leafPaths(child, prefix ? `${prefix}.${key}` : key, out);
  } else if (prefix) {
    out.push(prefix);
  }
  return out;
}
__name(leafPaths, "leafPaths");
async function readThemeMetadata(roots) {
  const renderer = await createPageRenderer({ childThemeRoot: roots.themeRoot, parentThemeRoot: roots.parentThemeRoot });
  try {
    const metadata = renderer.getThemeMetadata();
    return {
      theme: metadata.theme,
      settingsKeys: leafPaths(metadata.theme, "", []),
      fields: metadata.fields,
      presets: metadata.presets,
      defaultPreset: metadata.defaultPreset,
      surfaces: renderer.getThemeSurfaces(),
      manifest: metadata.manifest
    };
  } finally {
    await renderer.close().catch(() => void 0);
  }
}
__name(readThemeMetadata, "readThemeMetadata");

// src/render-inputs.ts
var PREVIEW_PROPS_INVALID = "PREVIEW_PROPS_INVALID";
function isPlainObject2(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
__name(isPlainObject2, "isPlainObject");
function normaliseBase64Param(value) {
  const standard = value.replace(/ /g, "+").replace(/-/g, "+").replace(/_/g, "/").replace(/\s+/g, "");
  const remainder = standard.length % 4;
  return remainder === 0 ? standard : standard + "=".repeat(4 - remainder);
}
__name(normaliseBase64Param, "normaliseBase64Param");
function readPropsParam(params) {
  const refuse = /* @__PURE__ */ __name((param, reason) => ({
    ok: false,
    status: 400,
    body: {
      error: {
        code: PREVIEW_PROPS_INVALID,
        message: `?${param}= could not be read: ${reason}. ` + (param === "props64" ? "Send base64 of a JSON object, URL-encoded (encodeURIComponent), e.g. ?props64=eyJ0aXRsZSI6IkhpIn0%3D." : "Send a JSON object, URL-encoded (encodeURIComponent), e.g. ?props=%7B%22title%22%3A%22Hi%22%7D."),
        param
      }
    }
  }), "refuse");
  const b64 = params.get("props64");
  if (b64 !== null && b64 !== "") {
    let text;
    try {
      text = decodeBase64Utf8(normaliseBase64Param(b64));
    } catch {
      return refuse("props64", "it is not base64");
    }
    let value;
    try {
      value = JSON.parse(text);
    } catch {
      return refuse("props64", "it decodes to text that is not JSON");
    }
    if (!isPlainObject2(value)) return refuse("props64", "it decodes to JSON that is not an object");
    return { ok: true, props: value };
  }
  const raw = params.get("props");
  if (raw !== null && raw !== "") {
    let value;
    try {
      value = JSON.parse(raw);
    } catch {
      return refuse("props", "it is not JSON (a raw `&`, `#` or `+` in the value is the usual cause)");
    }
    if (!isPlainObject2(value)) return refuse("props", "it is JSON but not an object");
    return { ok: true, props: value };
  }
  return { ok: true, props: null };
}
__name(readPropsParam, "readPropsParam");
function checkContentStateParam(themeRoot, value) {
  if (value === void 0 || value === null || value === "") return { ok: true, state: void 0 };
  if (typeof value === "string" && loadContentState(themeRoot, value).state) return { ok: true, state: value };
  const requested = typeof value === "string" ? value : JSON.stringify(value) ?? String(value);
  const refusal = unknownContentStateError(themeRoot, requested);
  const message = typeof value === "string" ? refusal.message : `A content state is a string written <kind>/<name>, not ${requested}. ${refusal.message.replace(/^[^.]*\.\s*/, "")}`;
  return {
    ok: false,
    status: 400,
    body: { error: { code: refusal.code, message, ...refusal.details ?? {}, requested: value } }
  };
}
__name(checkContentStateParam, "checkContentStateParam");
var OVERRIDES_KEYS = ["preset", "settings"];
function readJsonObjectArgument(raw, readFile) {
  let text = raw;
  if (raw.startsWith("@")) {
    const file = raw.slice(1);
    if (file === "") return { ok: false, reason: "a value starting with @ names a file, and none was given" };
    try {
      text = readFile(file);
    } catch (err) {
      const code = err?.code;
      const why = typeof code === "string" ? code : err instanceof Error ? err.message : String(err);
      return { ok: false, reason: `the file ${JSON.stringify(file)} could not be read (${why})` };
    }
  }
  let value;
  try {
    value = JSON.parse(text);
  } catch (err) {
    return { ok: false, reason: `it is not JSON (${err instanceof Error ? err.message : String(err)})` };
  }
  if (!isPlainObject2(value)) {
    const got = Array.isArray(value) ? "a list" : value === null ? "null" : typeof value;
    return { ok: false, reason: `it is JSON but not an object (got ${got})` };
  }
  return { ok: true, value };
}
__name(readJsonObjectArgument, "readJsonObjectArgument");
function overridesShapeProblem(value) {
  if (!isPlainObject2(value)) return 'it must be a JSON object: { "preset"?: string, "settings"?: object }';
  const unknown = Object.keys(value).filter((key) => !OVERRIDES_KEYS.includes(key));
  if (unknown.length > 0) {
    const named = unknown.map((key) => JSON.stringify(key)).join(", ");
    return `it carries ${named}; the only keys are "preset" and "settings"`;
  }
  if ("preset" in value && (typeof value.preset !== "string" || value.preset === "")) {
    return '"preset" must be a preset name (a non-empty string)';
  }
  if ("settings" in value && !isPlainObject2(value.settings)) return '"settings" must be an object of theme settings';
  return null;
}
__name(overridesShapeProblem, "overridesShapeProblem");

// src/render-job.ts
import path4 from "path";
var ARGUMENT_FAILURES = /* @__PURE__ */ new Set(["target-unknown", "props-invalid", "overrides-invalid"]);
var RENDER_JOB_CODES = {
  TEMPLATE_UNKNOWN: "TEMPLATE_UNKNOWN",
  TARGET_UNKNOWN: "TARGET_UNKNOWN",
  PROPS_INVALID: PREVIEW_PROPS_INVALID,
  OVERRIDES_INVALID: "OVERRIDES_INVALID",
  RENDER_FAILED: "RENDER_FAILED"
};
function failureText(failure) {
  const lines = [failure.message];
  if (failure.listingTitle !== void 0 && failure.listing.length > 0) lines.push(failure.listingTitle, ...failure.listing);
  for (const entry of failure.related ?? []) lines.push(`${entry.code}: ${entry.message.replace(/\s*\n\s*/g, " ")}`);
  return `${lines.join("\n")}
`;
}
__name(failureText, "failureText");
function toJsonDiagnostic(entry) {
  return {
    code: entry.code,
    message: entry.message,
    ...entry.details !== void 0 ? { details: entry.details } : {}
  };
}
__name(toJsonDiagnostic, "toJsonDiagnostic");
function refusedCharacters(base) {
  const named = [];
  if (/\s/.test(base)) named.push("whitespace");
  if (/["']/.test(base)) named.push("quotes");
  if (/[()]/.test(base)) named.push("parentheses");
  if (/[<>]/.test(base)) named.push("angle brackets");
  if (/`/.test(base)) named.push("backticks");
  return named.join(", ") || "characters it does not accept";
}
__name(refusedCharacters, "refusedCharacters");
function refusedAssetBase(base) {
  return createAssetUrlRewriter({ baseUrl: base }).report().invalidBaseUrl ?? null;
}
__name(refusedAssetBase, "refusedAssetBase");
function assetBaseRefusal(base, origin) {
  const characters = refusedCharacters(base);
  if (origin === "theme-root") {
    return `The theme root's file URL ${base} contains ${characters}, which the renderer refuses in an asset base. Pass --asset-base <url>, or use the serve command, which serves the theme over HTTP.`;
  }
  return `The asset base ${JSON.stringify(base)} contains ${characters}, which the renderer refuses. Pass a base without them, or use the serve command.`;
}
__name(assetBaseRefusal, "assetBaseRefusal");
function availableStateIds(themeRoot) {
  return listContentStates(themeRoot).kinds.flatMap((kind) => kind.states.map((state) => state.id));
}
__name(availableStateIds, "availableStateIds");
function stateExists(themeRoot, id) {
  try {
    return loadContentState(themeRoot, id).state !== null;
  } catch {
    return false;
  }
}
__name(stateExists, "stateExists");
function defaultStateOfKind(themeRoot, kind) {
  try {
    return resolveContentState(themeRoot, void 0, kind).state?.id ?? null;
  } catch {
    return null;
  }
}
__name(defaultStateOfKind, "defaultStateOfKind");
function defaultStateFor(themeRoot, entry) {
  let source;
  try {
    source = hostFs.readFileSync(entry.path, "utf-8");
  } catch {
    return null;
  }
  return defaultStateOfKind(themeRoot, contentKindForTemplateSource(source));
}
__name(defaultStateFor, "defaultStateFor");
function defaultModuleState(themeRoot, directory) {
  let kind = "blog-post";
  if (directory) {
    try {
      const meta = JSON.parse(hostFs.readFileSync(path4.join(directory, "meta.json"), "utf-8"));
      kind = contentKindForModuleContentTypes(meta?.content_types);
    } catch {
    }
  }
  return defaultStateOfKind(themeRoot, kind);
}
__name(defaultModuleState, "defaultModuleState");
function loaderName(roots, entry) {
  if (!roots) return entry.name;
  try {
    return locateTemplate(roots, entry.name) === entry.path ? entry.name : `templates/${entry.name}`;
  } catch {
    return entry.name;
  }
}
__name(loaderName, "loaderName");
function cascadeFor(request) {
  try {
    return resolveThemeRoots({ childThemeRoot: request.themeRoot, parentThemeRoot: request.parentThemeRoot });
  } catch {
    return null;
  }
}
__name(cascadeFor, "cascadeFor");
function spell(request, name) {
  return request.assetBaseOrigin === "serve" ? name : `--${name}`;
}
__name(spell, "spell");
var LISTING_TITLES = {
  template: "Page templates:",
  module: "Modules:",
  section: "Sections:",
  partial: "Partials:"
};
function refused(request, echo, failure, code) {
  const details = {};
  if (failure.param !== void 0) details.param = failure.param;
  if (failure.listingTitle !== void 0) details.available = failure.listing;
  return {
    html: null,
    failure,
    json: {
      ok: false,
      kind: request.target.kind,
      target: request.target.name,
      template: echo.template,
      state: echo.state,
      props: echo.props,
      overrides: echo.overrides,
      out: null,
      html: null,
      assetBase: request.assetBase,
      diagnostics: [
        ...failure.related ?? [],
        { code, message: failure.message, ...Object.keys(details).length > 0 ? { details } : {} }
      ]
    }
  };
}
__name(refused, "refused");
function isPlainObject3(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
__name(isPlainObject3, "isPlainObject");
async function renderTarget(request) {
  const roots = { themeRoot: request.themeRoot, parentThemeRoot: request.parentThemeRoot };
  const { kind } = request.target;
  const props = request.props ?? null;
  const echo = { template: null, state: request.state ?? null, props, overrides: isPlainObject3(request.overrides) ? request.overrides : null };
  const param = spell(request, kind);
  if (!TARGET_KINDS.includes(kind)) {
    return refused(
      request,
      echo,
      { kind: "target-unknown", message: `A render target is one of ${TARGET_KINDS.join(", ")}.`, listing: [], param },
      RENDER_JOB_CODES.TARGET_UNKNOWN
    );
  }
  let entry = null;
  let moduleDirectory = null;
  let renderName = request.target.name;
  if (kind === "template") {
    const templates = listPageTemplates(roots);
    const requestedName = normaliseTemplateName(request.target.name);
    entry = findPageTemplate(templates, request.target.name);
    echo.template = entry?.name ?? requestedName;
    if (!entry) {
      const message = templates.length > 0 ? `There is no page template ${JSON.stringify(requestedName)} in this theme.` : `There is no page template ${JSON.stringify(requestedName)}: this theme has no page templates under templates/.`;
      return refused(
        request,
        echo,
        { kind: "template-unknown", message, param, listing: templates.map((template) => template.name), listingTitle: LISTING_TITLES.template },
        RENDER_JOB_CODES.TEMPLATE_UNKNOWN
      );
    }
  } else if (kind === "module") {
    const resolved = resolveModuleReference(roots, request.target.name);
    if (!resolved.ok) {
      return refused(
        request,
        echo,
        {
          kind: "target-unknown",
          message: `${param} ${JSON.stringify(request.target.name)} names no module: ${resolved.reason}.`,
          param,
          listing: listThemeTargets(roots, "module").map((item) => item.name),
          listingTitle: LISTING_TITLES.module
        },
        RENDER_JOB_CODES.TARGET_UNKNOWN
      );
    }
    moduleDirectory = resolved.directory;
    renderName = resolved.reference;
  } else {
    const where = kind === "section" ? `${SECTIONS_DIRECTORY}/` : `${PARTIALS_DIRECTORY}/`;
    const listing = listThemeTargets(roots, kind).map((item) => item.name);
    const spelling = fileTargetSpellingProblem(request.target.name);
    const known = spelling === null && listing.includes(request.target.name);
    if (!known) {
      const why = spelling !== null ? `${param} takes a file name under ${where}, and ${JSON.stringify(request.target.name)} is not one: ${spelling}.` : `${param} ${JSON.stringify(request.target.name)} names no ${kind}: there is no such file under ${where} in this theme.`;
      return refused(
        request,
        echo,
        { kind: "target-unknown", message: why, param, listing, listingTitle: LISTING_TITLES[kind] },
        RENDER_JOB_CODES.TARGET_UNKNOWN
      );
    }
  }
  if (props !== null && kind !== "module") {
    return refused(
      request,
      echo,
      {
        kind: "props-invalid",
        message: `props apply to ${spell(request, "module")} only: this render's target is ${param} ${request.target.name}, which no props reach in this build.`,
        param: spell(request, "props"),
        listing: []
      },
      RENDER_JOB_CODES.PROPS_INVALID
    );
  }
  if (props !== null && !isPlainObject3(props)) {
    return refused(
      request,
      echo,
      { kind: "props-invalid", message: `${spell(request, "props")} must be a JSON object.`, param: spell(request, "props"), listing: [] },
      RENDER_JOB_CODES.PROPS_INVALID
    );
  }
  let overrides = null;
  if (request.overrides !== void 0 && request.overrides !== null) {
    const problem = overridesShapeProblem(request.overrides);
    if (problem) {
      return refused(
        request,
        echo,
        { kind: "overrides-invalid", message: `${spell(request, "overrides")} could not be used: ${problem}.`, param: spell(request, "overrides"), listing: [] },
        RENDER_JOB_CODES.OVERRIDES_INVALID
      );
    }
    overrides = request.overrides;
  }
  if (refusedAssetBase(request.assetBase) !== null) {
    return refused(
      request,
      echo,
      { kind: "asset-base-refused", message: assetBaseRefusal(request.assetBase, request.assetBaseOrigin), listing: [] },
      DIAGNOSTIC_CODES.ASSET_BASE_URL_INVALID
    );
  }
  let state;
  if (request.state !== void 0) {
    if (!stateExists(request.themeRoot, request.state)) {
      return refused(
        request,
        echo,
        {
          kind: "state-unknown",
          message: `There is no content state ${JSON.stringify(request.state)}. A state is written <kind>/<name>.`,
          param: spell(request, "state"),
          listing: availableStateIds(request.themeRoot),
          listingTitle: "Content states:"
        },
        DIAGNOSTIC_CODES.CONTENT_STATE_UNKNOWN
      );
    }
    state = request.state;
  } else if (kind === "template") {
    state = defaultStateFor(request.themeRoot, entry);
  } else if (kind === "module") {
    state = defaultModuleState(request.themeRoot, moduleDirectory);
  } else if (kind === "section") {
    state = defaultStateOfKind(request.themeRoot, "blog-post");
  } else {
    state = null;
  }
  echo.state = state;
  const cascade = cascadeFor(request);
  let renderer = null;
  try {
    renderer = await createPageRenderer({ childThemeRoot: request.themeRoot, parentThemeRoot: request.parentThemeRoot });
    if (overrides?.preset !== void 0) {
      const presets = renderer.getThemeMetadata().presets;
      if (!presets.includes(overrides.preset)) {
        return refused(
          request,
          echo,
          {
            kind: "overrides-invalid",
            message: `${spell(request, "overrides")} names the preset ${JSON.stringify(overrides.preset)}, which this theme does not have.`,
            param: spell(request, "overrides"),
            listing: presets,
            listingTitle: "Presets:"
          },
          RENDER_JOB_CODES.OVERRIDES_INVALID
        );
      }
    }
    const options = {
      assetBaseUrl: request.assetBase,
      ...request.state !== void 0 ? { state: request.state } : {},
      ...overrides?.preset !== void 0 ? { presetName: overrides.preset } : {},
      ...overrides?.settings !== void 0 ? { themeOverrides: overrides.settings } : {}
    };
    let result;
    switch (kind) {
      case "template":
        result = await renderer.renderPage(loaderName(cascade, entry), options);
        break;
      case "module":
        result = await renderer.renderModule(renderName, props ?? {}, options);
        break;
      case "section":
        result = await renderer.renderSection(`../${SECTIONS_DIRECTORY}/${request.target.name}`, void 0, options);
        break;
      default:
        result = await renderer.renderPartial(request.target.name, options);
        break;
    }
    return {
      html: result.html,
      json: {
        ok: true,
        kind,
        target: request.target.name,
        template: kind === "template" ? entry.name : null,
        state,
        props,
        overrides,
        out: null,
        html: result.html,
        assetBase: request.assetBase,
        diagnostics: result.diagnostics.map(toJsonDiagnostic)
      }
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const code = err instanceof RendererError ? err.code : RENDER_JOB_CODES.RENDER_FAILED;
    const label = kind === "template" ? entry.name : request.target.name;
    return refused(
      request,
      echo,
      {
        kind: "render-failed",
        message: `Rendering ${label} failed: ${message.replace(/\s*\n\s*/g, " ")}`,
        listing: [],
        related: (cascade?.diagnostics ?? []).map(toJsonDiagnostic)
      },
      code
    );
  } finally {
    if (renderer) await renderer.close().catch(() => void 0);
  }
}
__name(renderTarget, "renderTarget");

// src/serve.ts
import fs from "fs";
import http from "http";
import path6 from "path";

// src/fixture-overlay.ts
import path5 from "path";
function overlayPathFor(fixturesRoot, overlayDir, pathname) {
  const relative = path5.relative(fixturesRoot, path5.resolve(pathname));
  if (relative === "") return overlayDir;
  if (relative.startsWith("..") || path5.isAbsolute(relative)) return null;
  return path5.join(overlayDir, relative);
}
__name(overlayPathFor, "overlayPathFor");
function createFixtureOverlay(base, themeRoot, overlayDir) {
  const fixturesRoot = path5.resolve(themeRoot, "fixtures");
  const overlayRoot = path5.resolve(overlayDir);
  const mapped = /* @__PURE__ */ __name((pathname) => overlayPathFor(fixturesRoot, overlayRoot, pathname), "mapped");
  const exists = /* @__PURE__ */ __name((pathname) => pathname !== null && base.existsSync(pathname), "exists");
  const statOf = /* @__PURE__ */ __name((pathname) => {
    try {
      return base.statSync(pathname);
    } catch {
      return null;
    }
  }, "statOf");
  const listing = /* @__PURE__ */ __name((pathname) => {
    try {
      return base.readdirSync(pathname);
    } catch {
      return null;
    }
  }, "listing");
  return {
    existsSync: /* @__PURE__ */ __name((pathname) => exists(mapped(pathname)) || base.existsSync(pathname), "existsSync"),
    readFileSync: /* @__PURE__ */ __name((pathname, encoding) => {
      const overlay = mapped(pathname);
      if (exists(overlay) && statOf(overlay)?.isFile()) return base.readFileSync(overlay, encoding);
      return base.readFileSync(pathname, encoding);
    }, "readFileSync"),
    readdirSync: /* @__PURE__ */ __name((pathname) => {
      const overlay = mapped(pathname);
      const fromOverlay = exists(overlay) && statOf(overlay)?.isDirectory() ? listing(overlay) : null;
      if (!fromOverlay) return base.readdirSync(pathname);
      const fromTheme = listing(pathname) ?? [];
      return [...fromTheme, ...fromOverlay.filter((name) => !fromTheme.includes(name))];
    }, "readdirSync"),
    statSync: /* @__PURE__ */ __name((pathname) => {
      const overlay = mapped(pathname);
      if (exists(overlay)) {
        const stat = statOf(overlay);
        if (stat?.isFile() || !base.existsSync(pathname)) return stat ?? base.statSync(overlay);
      }
      return base.statSync(pathname);
    }, "statSync"),
    realpathSync: {
      native: /* @__PURE__ */ __name((pathname) => {
        try {
          return base.realpathSync.native(pathname);
        } catch (err) {
          if (exists(mapped(pathname))) return path5.resolve(pathname);
          throw err;
        }
      }, "native")
    },
    mkdirSync: /* @__PURE__ */ __name((pathname, options) => base.mkdirSync(pathname, options), "mkdirSync"),
    writeFileSync: /* @__PURE__ */ __name((pathname, data, encoding) => base.writeFileSync(pathname, data, encoding), "writeFileSync")
  };
}
__name(createFixtureOverlay, "createFixtureOverlay");
function installFixtureOverlay(themeRoot, overlayDir) {
  const previous = getHostFs();
  setHostFs(createFixtureOverlay(previous, themeRoot, overlayDir));
  return () => setHostFs(previous);
}
__name(installFixtureOverlay, "installFixtureOverlay");

// src/version.ts
var RENDERER_VERSION = true ? "1.0.102" : "0.0.0-unbundled";

// src/serve.ts
var SERVE_ASSET_BASE = "/theme-assets/";
var SERVE_HOST = "127.0.0.1";
var MAX_BODY_BYTES = 1024 * 1024;
var CONTENT_TYPES = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".eot": "application/vnd.ms-fontobject",
  ".gif": "image/gif",
  ".htm": "text/html; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".mp4": "video/mp4",
  ".otf": "font/otf",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".webm": "video/webm",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};
var TEXT = "text/plain; charset=utf-8";
var JSON_TYPE = "application/json; charset=utf-8";
var HTML = "text/html; charset=utf-8";
function oneLine(message) {
  return message.replace(/\s*[\r\n]+\s*/g, " ").trim();
}
__name(oneLine, "oneLine");
function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
__name(escapeHtml, "escapeHtml");
function themeLabel(themeRoot) {
  try {
    const manifest = JSON.parse(hostFs.readFileSync(resolveSafePath(themeRoot, "theme.json"), "utf-8"));
    if (manifest && typeof manifest.label === "string" && manifest.label.trim()) return manifest.label.trim();
  } catch {
  }
  return path6.basename(path6.resolve(themeRoot));
}
__name(themeLabel, "themeLabel");
function matchesPath(route, pathname) {
  if (route.path === "*") return true;
  if (route.path.endsWith("/*")) return pathname.startsWith(route.path.slice(0, -1));
  return route.path === pathname;
}
__name(matchesPath, "matchesPath");
var TARGET_DESCRIPTIONS = {
  template: "A page template, as /api/list?kind=template lists it. Exactly one of template, module, section, partial.",
  module: "A module, as a template references it (../modules/<name>), or @hubspot/<name>. Exactly one of template, module, section, partial.",
  section: "A file name under sections/. Exactly one of template, module, section, partial.",
  partial: "A file name under templates/partials/. Exactly one of template, module, section, partial."
};
function renderParams(ctx) {
  return [
    ...TARGET_KINDS.map((kind) => ({ name: kind, type: "string", required: false, values: ctx.targets(kind), description: TARGET_DESCRIPTIONS[kind] })),
    { name: "state", type: "string", required: false, values: ctx.targets("state"), description: "The content state to render as, <kind>/<name>. Omitted, the target's default." },
    { name: "props", type: "json", required: false, description: "Field values for a module target, a URL-encoded JSON object. Refused with any other target." },
    { name: "props64", type: "base64-json", required: false, description: "The same as props, base64-encoded; wins over props." },
    { name: "overrides", type: "json", required: false, description: 'A URL-encoded JSON object { "preset"?: string, "settings"?: object }; /api/metadata lists the presets and settings keys.' }
  ];
}
__name(renderParams, "renderParams");
function bodyParams(ctx) {
  return [
    { name: "target", type: "json", required: true, description: `An object with exactly one of ${TARGET_KINDS.join(", ")}, each as GET /render takes it.` },
    { name: "state", type: "string", required: false, values: ctx.targets("state"), description: "The content state to render as, <kind>/<name>." },
    { name: "props", type: "json", required: false, description: "Field values for a module target: a JSON object." },
    { name: "overrides", type: "json", required: false, description: '{ "preset"?: string, "settings"?: object }.' }
  ];
}
__name(bodyParams, "bodyParams");
function renderExamples(ctx, route) {
  const examples = [];
  for (const kind of TARGET_KINDS) {
    const first = ctx.targets(kind)[0];
    if (first !== void 0) examples.push({ method: "GET", path: `${route}?${kind}=${encodeURIComponent(first)}`, status: 200 });
  }
  const template = ctx.targets("template")[0];
  const state = ctx.targets("state")[0];
  if (template !== void 0 && state !== void 0) {
    examples.push({ method: "GET", path: `${route}?template=${encodeURIComponent(template)}&state=${encodeURIComponent(state)}`, status: 200 });
  }
  const module = ctx.targets("module")[0];
  if (module !== void 0) {
    examples.push({ method: "GET", path: `${route}?module=${encodeURIComponent(module)}&props=${encodeURIComponent("{}")}`, status: 200 });
  }
  if (template !== void 0) {
    examples.push({ method: "GET", path: `${route}?template=${encodeURIComponent(template)}&overrides=${encodeURIComponent('{"preset":"default"}')}`, status: 200 });
  }
  if (examples.length === 0) examples.push({ method: "GET", path: `${route}?template=home.html`, status: 404 });
  return examples;
}
__name(renderExamples, "renderExamples");
function postExamples(ctx, route) {
  const examples = [];
  for (const kind of TARGET_KINDS) {
    const first = ctx.targets(kind)[0];
    if (first !== void 0) examples.push({ method: "POST", path: route, body: { target: { [kind]: first } }, status: 200 });
  }
  if (examples.length === 0) examples.push({ method: "POST", path: route, body: { target: { template: "home.html" } }, status: 404 });
  return examples;
}
__name(postExamples, "postExamples");
var ROUTES = [
  {
    method: "GET",
    path: "/",
    description: "An index page: the theme's templates, modules, sections, partials and content states as links.",
    params: /* @__PURE__ */ __name(() => [], "params"),
    returns: "text/html",
    examples: /* @__PURE__ */ __name(() => [{ method: "GET", path: "/", status: 200 }], "examples"),
    handle: /* @__PURE__ */ __name(async (ctx, _request, respond) => respond(200, HTML, indexPage(ctx)), "handle")
  },
  {
    method: "GET",
    path: "/api/index",
    description: "This description: every route, its parameters, what it returns and example requests.",
    params: /* @__PURE__ */ __name(() => [], "params"),
    returns: "application/json: { version, themeRoot, parentThemeRoot, routes }",
    examples: /* @__PURE__ */ __name(() => [{ method: "GET", path: "/api/index", status: 200 }], "examples"),
    handle: /* @__PURE__ */ __name(async (ctx, _request, respond) => respond(200, JSON_TYPE, `${JSON.stringify(apiIndex(ctx), null, 2)}
`), "handle")
  },
  {
    method: "GET",
    path: "/render",
    description: "Render one target to an HTML document. A refusal is plain text naming the parameter and what it may be.",
    params: renderParams,
    returns: "text/html; 400 (a bad parameter), 404 (an unknown template) or 500 (a failed render) as text/plain",
    examples: /* @__PURE__ */ __name((ctx) => renderExamples(ctx, "/render"), "examples"),
    handle: /* @__PURE__ */ __name((ctx, request, respond, serial) => handleGetRender(ctx, request, respond, serial, false), "handle")
  },
  {
    method: "GET",
    path: "/diagnostics",
    description: "The same render as /render, answered as the JSON render --json prints, with html null.",
    params: renderParams,
    returns: "application/json: { ok, kind, target, template, state, props, overrides, out, html, assetBase, diagnostics }",
    examples: /* @__PURE__ */ __name((ctx) => renderExamples(ctx, "/diagnostics"), "examples"),
    handle: /* @__PURE__ */ __name((ctx, request, respond, serial) => handleGetRender(ctx, request, respond, serial, true), "handle")
  },
  {
    method: "POST",
    path: "/api/render",
    description: "The /render route with a JSON body: { target: { template|module|section|partial }, state?, props?, overrides? }.",
    params: bodyParams,
    returns: `text/html, as /render; 400 { error: { code, message, param } } for a body that is not that shape; 413 for a body over ${MAX_BODY_BYTES} bytes`,
    examples: /* @__PURE__ */ __name((ctx) => postExamples(ctx, "/api/render"), "examples"),
    handle: /* @__PURE__ */ __name((ctx, request, respond, serial) => handlePostRender(ctx, request, respond, serial, false), "handle")
  },
  {
    method: "POST",
    path: "/api/diagnostics",
    description: "The /diagnostics route with the /api/render body.",
    params: bodyParams,
    returns: "application/json, as /diagnostics; 400 and 413 as /api/render",
    examples: /* @__PURE__ */ __name((ctx) => postExamples(ctx, "/api/diagnostics"), "examples"),
    handle: /* @__PURE__ */ __name((ctx, request, respond, serial) => handlePostRender(ctx, request, respond, serial, true), "handle")
  },
  {
    method: "GET",
    path: "/api/list",
    description: "What list --json prints: the names render accepts, of one kind or of every kind.",
    params: /* @__PURE__ */ __name(() => [{ name: "kind", type: "string", required: false, values: [...LIST_KINDS], description: "One kind; omitted, every kind." }], "params"),
    returns: "application/json: { kind, items: [{ name, root, file }] }, or { kinds: [...] } without kind",
    examples: /* @__PURE__ */ __name(() => [
      { method: "GET", path: "/api/list", status: 200 },
      ...LIST_KINDS.map((kind) => ({ method: "GET", path: `/api/list?kind=${kind}`, status: 200 }))
    ], "examples"),
    handle: /* @__PURE__ */ __name(async (ctx, request, respond) => {
      const kind = request.query.get("kind");
      if (kind === null || kind === "") {
        respond(200, JSON_TYPE, `${JSON.stringify(listAll(ctx.options))}
`);
        return;
      }
      if (!LIST_KINDS.includes(kind)) {
        badRequest(respond, true, "LIST_KIND_UNKNOWN", `There is no kind ${JSON.stringify(kind)}.`, "kind", [...LIST_KINDS]);
        return;
      }
      respond(200, JSON_TYPE, `${JSON.stringify({ kind, items: listThemeTargets(ctx.options, kind) })}
`);
    }, "handle")
  },
  {
    method: "GET",
    path: "/api/fixtures",
    description: "What fixtures --json prints: every fixture kind, where it is read from, whether the theme has it, the built-in that applies otherwise, and a schema or an example.",
    params: /* @__PURE__ */ __name(() => [], "params"),
    returns: "application/json: { themeRoot, fixturesDirectory, overlay, note, kinds: [{ kind, path, present, embeddedDefault, whenAbsent, description, schema, example, files? }] }",
    examples: /* @__PURE__ */ __name(() => [{ method: "GET", path: "/api/fixtures", status: 200 }], "examples"),
    handle: /* @__PURE__ */ __name(async (ctx, _request, respond) => respond(200, JSON_TYPE, `${JSON.stringify(describeFixtures(ctx.options.themeRoot, ctx.options.fixturesDir ? path6.resolve(ctx.options.fixturesDir) : null))}
`), "handle")
  },
  {
    method: "GET",
    path: "/api/fields",
    description: "What fields --json prints: a module's fields, read from its fields.json.",
    params: /* @__PURE__ */ __name((ctx) => [{ name: "module", type: "string", required: true, values: ctx.targets("module"), description: "A module, as a template references it." }], "params"),
    returns: "application/json: { module, directory, shape, fields, note? }; 400 for an unknown module; 422 for a fields.json that cannot be read",
    examples: /* @__PURE__ */ __name((ctx) => {
      const module = ctx.targets("module")[0];
      return module !== void 0 ? [{ method: "GET", path: `/api/fields?module=${encodeURIComponent(module)}`, status: 200 }] : [{ method: "GET", path: "/api/fields", status: 400 }];
    }, "examples"),
    handle: /* @__PURE__ */ __name(async (ctx, request, respond) => {
      const module = request.query.get("module");
      if (module === null || module === "") {
        badRequest(respond, true, "MODULE_REQUIRED", "Name a module: ?module=<reference>.", "module", ctx.targets("module"));
        return;
      }
      const report = readModuleFields(ctx.options, module);
      if (!report.ok) {
        if (report.unreadable) {
          respond(422, JSON_TYPE, `${JSON.stringify({ error: { code: "FIELDS_UNREADABLE", message: `The module ${JSON.stringify(module)}: ${report.reason}.`, param: "module" } })}
`);
          return;
        }
        badRequest(respond, true, "TARGET_UNKNOWN", `module ${JSON.stringify(module)} names no module: ${report.reason}.`, "module", report.listing);
        return;
      }
      const { ok: _ok, ...fields } = report;
      respond(200, JSON_TYPE, `${JSON.stringify(fields)}
`);
    }, "handle")
  },
  {
    method: "GET",
    path: "/api/metadata",
    description: "What metadata --json prints: the theme's settings, its settings keys, presets and surfaces.",
    params: /* @__PURE__ */ __name(() => [], "params"),
    returns: "application/json: { theme, settingsKeys, fields, presets, defaultPreset, surfaces, manifest }",
    examples: /* @__PURE__ */ __name(() => [{ method: "GET", path: "/api/metadata", status: 200 }], "examples"),
    handle: /* @__PURE__ */ __name(async (ctx, _request, respond, serial) => {
      const metadata = await serial(() => readThemeMetadata(ctx.options));
      respond(200, JSON_TYPE, `${JSON.stringify(metadata)}
`);
    }, "handle")
  },
  {
    method: "GET",
    path: `${SERVE_ASSET_BASE}*`,
    description: "A file from the theme root, then from the parent theme root; never from outside either. Rendered pages load their assets from here.",
    params: /* @__PURE__ */ __name(() => [{ name: "path", type: "path", required: true, description: "The file, relative to the theme root, after /theme-assets/." }], "params"),
    returns: "the file, typed by its extension; 403 for a path outside the theme; 404 when no root has it",
    examples: /* @__PURE__ */ __name((ctx) => [{ method: "GET", path: `${SERVE_ASSET_BASE}${firstThemeFile(ctx.options)}`, status: 200 }], "examples"),
    handle: /* @__PURE__ */ __name(async (ctx, request, respond) => serveThemeAsset(ctx.options, request.pathname.slice(SERVE_ASSET_BASE.length), respond), "handle")
  },
  {
    method: "ANY",
    path: "*",
    description: "Anything else: 404.",
    params: /* @__PURE__ */ __name(() => [], "params"),
    returns: "text/plain 404",
    examples: /* @__PURE__ */ __name(() => [{ method: "GET", path: "/no-such-route", status: 404 }], "examples"),
    handle: /* @__PURE__ */ __name(async (_ctx, _request, respond) => respond(404, TEXT, "Not found. GET /api/index lists the routes.\n"), "handle")
  }
];
function apiIndex(ctx) {
  return {
    version: RENDERER_VERSION,
    themeRoot: ctx.options.themeRoot,
    parentThemeRoot: ctx.options.parentThemeRoot ?? null,
    routes: ROUTES.map((route) => ({
      method: route.method,
      path: route.path,
      description: route.description,
      params: route.params(ctx),
      returns: route.returns,
      examples: route.examples(ctx)
    }))
  };
}
__name(apiIndex, "apiIndex");
function listAll(options) {
  return { kinds: LIST_KINDS.map((kind) => ({ kind, items: listThemeTargets(options, kind) })) };
}
__name(listAll, "listAll");
function firstThemeFile(options) {
  for (const candidate of ["theme.json", "fields.json"]) {
    try {
      if (fs.statSync(resolveSafePath(options.themeRoot, candidate)).isFile()) return candidate;
    } catch {
    }
  }
  return "theme.json";
}
__name(firstThemeFile, "firstThemeFile");
function badRequest(respond, json, code, message, param, available) {
  if (json) {
    respond(400, JSON_TYPE, `${JSON.stringify({ error: { code, message, param, ...available ? { available } : {} } })}
`);
    return;
  }
  const lines = [message, ...available && available.length > 0 ? [`Valid values for ${param}:`, ...available] : []];
  respond(400, TEXT, `${lines.join("\n")}
`);
}
__name(badRequest, "badRequest");
function refusalStatus(outcome) {
  const kind = outcome.failure?.kind;
  if (kind === "template-unknown") return 404;
  if (kind === "render-failed" || kind === void 0) return 500;
  return 400;
}
__name(refusalStatus, "refusalStatus");
function answerOutcome(respond, outcome, json) {
  if (json) {
    respond(outcome.failure ? refusalStatus(outcome) : 200, JSON_TYPE, `${JSON.stringify({ ...outcome.json, html: null })}
`);
    return;
  }
  if (outcome.failure || outcome.html === null) {
    const text = outcome.failure ? failureText(outcome.failure) : "The render produced no document.\n";
    respond(refusalStatus(outcome), TEXT, text);
    return;
  }
  respond(200, HTML, outcome.html);
}
__name(answerOutcome, "answerOutcome");
function runRender(ctx, serial, target, extra) {
  return serial(
    () => renderTarget({
      themeRoot: ctx.options.themeRoot,
      parentThemeRoot: ctx.options.parentThemeRoot,
      target,
      ...extra.state ? { state: extra.state } : {},
      props: extra.props,
      ...extra.overrides !== void 0 ? { overrides: extra.overrides } : {},
      assetBase: SERVE_ASSET_BASE,
      assetBaseOrigin: "serve"
    })
  );
}
__name(runRender, "runRender");
function targetChoices(ctx) {
  return TARGET_KINDS.flatMap((kind) => ctx.targets(kind).map((name) => `${kind}=${name}`));
}
__name(targetChoices, "targetChoices");
async function handleGetRender(ctx, request, respond, serial, json) {
  const named = TARGET_KINDS.filter((kind2) => {
    const value = request.query.get(kind2);
    return value !== null && value !== "";
  });
  if (named.length !== 1) {
    const message = named.length === 0 ? "Name exactly one target: ?template=, ?module=, ?section= or ?partial=." : `Name exactly one target; this request names ${named.map((kind2) => `?${kind2}=`).join(" and ")}.`;
    badRequest(respond, json, "TARGET_REQUIRED", message, TARGET_KINDS.join("|"), targetChoices(ctx));
    return;
  }
  const kind = named[0];
  const propsRead = readPropsParam(request.query);
  if (!propsRead.ok) {
    respond(propsRead.status, JSON_TYPE, `${JSON.stringify(propsRead.body, null, 2)}
`);
    return;
  }
  let overrides;
  const rawOverrides = request.query.get("overrides");
  if (rawOverrides !== null && rawOverrides !== "") {
    try {
      overrides = JSON.parse(rawOverrides);
    } catch {
      badRequest(
        respond,
        json,
        "OVERRIDES_INVALID",
        '?overrides= could not be read: it is not JSON. Send a URL-encoded JSON object { "preset"?: string, "settings"?: object }.',
        "overrides"
      );
      return;
    }
  }
  const state = request.query.get("state") ?? void 0;
  const outcome = await runRender(ctx, serial, { kind, name: request.query.get(kind) }, { state: state || void 0, props: propsRead.props, overrides });
  answerOutcome(respond, outcome, json);
}
__name(handleGetRender, "handleGetRender");
function isPlainObject4(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
__name(isPlainObject4, "isPlainObject");
async function handlePostRender(ctx, request, respond, serial, json) {
  const refuse = /* @__PURE__ */ __name((code, message, param, available) => respond(400, JSON_TYPE, `${JSON.stringify({ error: { code, message, param, ...available ? { available } : {} } })}
`), "refuse");
  let body;
  try {
    body = JSON.parse((request.body ?? Buffer.alloc(0)).toString("utf-8"));
  } catch (err) {
    refuse("REQUEST_BODY_INVALID", `The request body is not JSON (${oneLine(err instanceof Error ? err.message : String(err))}).`, "body");
    return;
  }
  if (!isPlainObject4(body)) {
    refuse("REQUEST_BODY_INVALID", "The request body must be a JSON object: { target, state?, props?, overrides? }.", "body");
    return;
  }
  const unknownKeys = Object.keys(body).filter((key) => !["target", "state", "props", "overrides"].includes(key));
  if (unknownKeys.length > 0) {
    refuse("REQUEST_BODY_INVALID", `The request body carries ${unknownKeys.map((key) => JSON.stringify(key)).join(", ")}; its keys are target, state, props and overrides.`, unknownKeys[0]);
    return;
  }
  const target = body.target;
  const named = isPlainObject4(target) ? TARGET_KINDS.filter((kind) => target[kind] !== void 0) : [];
  if (!isPlainObject4(target) || named.length !== 1 || Object.keys(target).length !== 1 || typeof target[named[0]] !== "string" || target[named[0]] === "") {
    refuse(
      "TARGET_REQUIRED",
      `"target" must be an object with exactly one of ${TARGET_KINDS.map((kind) => JSON.stringify(kind)).join(", ")}, a non-empty string.`,
      "target",
      targetChoices(ctx)
    );
    return;
  }
  if (body.props !== void 0 && body.props !== null && !isPlainObject4(body.props)) {
    refuse(PREVIEW_PROPS_INVALID, '"props" must be a JSON object of field values.', "props");
    return;
  }
  const state = checkContentStateParam(ctx.options.themeRoot, body.state);
  if (!state.ok) {
    respond(state.status, JSON_TYPE, `${JSON.stringify({ error: { ...state.body.error, param: "state" } })}
`);
    return;
  }
  const outcome = await runRender(ctx, serial, { kind: named[0], name: target[named[0]] }, {
    state: state.state,
    props: body.props ?? null,
    overrides: body.overrides ?? void 0
  });
  answerOutcome(respond, outcome, json);
}
__name(handlePostRender, "handlePostRender");
function indexPage(ctx) {
  const label = escapeHtml(themeLabel(ctx.options.themeRoot));
  const section = /* @__PURE__ */ __name((title, kind, empty) => {
    const names = ctx.targets(kind);
    const body = names.length > 0 ? `<ul>
${names.map((name) => `  <li><a href="/render?${kind}=${encodeURIComponent(name)}">${escapeHtml(name)}</a></li>`).join("\n")}
</ul>` : `<p>${empty}</p>`;
    return `<h2>${title}</h2>
${body}`;
  }, "section");
  const states = ctx.targets("state");
  const host = ["template", "section"].map((kind) => ({ kind, name: ctx.targets(kind)[0] })).find((entry) => entry.name !== void 0);
  const stateList = states.length > 0 ? `<ul>
${states.map(
    (state) => host ? `  <li><a href="/render?${host.kind}=${encodeURIComponent(host.name)}&amp;state=${encodeURIComponent(state)}">${escapeHtml(state)}</a></li>` : `  <li>${escapeHtml(state)}</li>`
  ).join("\n")}
</ul>` : "<p>No content states.</p>";
  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${label} \u2014 ThemeSpot preview</title>
<style>body{font-family:system-ui,sans-serif;line-height:1.5;margin:2rem;max-width:48rem;color:#1f2328;background:#fff}a{color:#0b57d0}li{margin:.25rem 0}h2{margin-top:1.5rem}</style>
</head>
<body>
<h1>${label}</h1>
<p>React modules are not drawn in this build: each one shows a placeholder naming the module.</p>
<p>Every route, its parameters and example requests: <a href="/api/index">/api/index</a>.</p>
${section("Page templates", "template", "This theme has no page templates under <code>templates/</code>.")}
${section("Modules", "module", "No HubL modules under <code>modules/</code>.")}
${section("Sections", "section", "No sections under <code>sections/</code>.")}
${section("Partials", "partial", "No partials under <code>templates/partials/</code>.")}
<h2>Content states</h2>
${stateList}
</body>
</html>
`;
}
__name(indexPage, "indexPage");
function serveThemeAsset(options, encoded, respond) {
  let relative;
  try {
    relative = decodeURIComponent(encoded);
  } catch {
    respond(400, TEXT, "Bad request: the asset path is not valid percent-encoding.\n");
    return;
  }
  if (relative === "" || relative.includes("\0")) {
    respond(400, TEXT, "Bad request: no asset path.\n");
    return;
  }
  let rejected = false;
  for (const root of [options.themeRoot, options.parentThemeRoot]) {
    if (!root) continue;
    let candidate;
    try {
      candidate = resolveSafePath(root, relative);
    } catch (err) {
      if (err instanceof RendererError) {
        rejected = true;
        continue;
      }
      throw err;
    }
    let stat;
    try {
      stat = fs.statSync(candidate);
    } catch {
      continue;
    }
    if (!stat.isFile()) continue;
    const contentType = CONTENT_TYPES[path6.extname(candidate).toLowerCase()] ?? "application/octet-stream";
    respond(200, contentType, fs.readFileSync(candidate), { "Cache-Control": "no-cache" });
    return;
  }
  if (rejected) {
    respond(403, TEXT, "Forbidden: that path is outside the theme.\n");
    return;
  }
  respond(404, TEXT, "Not found.\n");
}
__name(serveThemeAsset, "serveThemeAsset");
function allowedMethods(pathname) {
  const methods = /* @__PURE__ */ new Set();
  for (const route of ROUTES) {
    if (route.path === "*" || !matchesPath(route, pathname)) continue;
    if (route.method === "GET") {
      methods.add("GET");
      methods.add("HEAD");
    } else if (route.method === "POST") {
      methods.add("POST");
    }
  }
  return [...methods];
}
__name(allowedMethods, "allowedMethods");
function routeFor(method, pathname) {
  const wanted = method === "HEAD" ? "GET" : method;
  return ROUTES.find((route) => route.path !== "*" && matchesPath(route, pathname) && route.method === wanted) ?? null;
}
__name(routeFor, "routeFor");
function readBody(req, limit) {
  return new Promise((resolve2, reject) => {
    const chunks = [];
    let size = 0;
    let tooLarge = false;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > limit) {
        tooLarge = true;
        chunks.length = 0;
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve2(tooLarge ? null : Buffer.concat(chunks)));
    req.on("error", reject);
  });
}
__name(readBody, "readBody");
function startPreviewServer(options) {
  let queue = Promise.resolve();
  const serial = /* @__PURE__ */ __name((work) => {
    const run = queue.then(work, work);
    queue = run.catch(() => void 0);
    return run;
  }, "serial");
  const restoreFixtures = options.fixturesDir ? installFixtureOverlay(options.themeRoot, path6.resolve(options.fixturesDir)) : null;
  const ctx = {
    options,
    targets: /* @__PURE__ */ __name((kind) => listThemeTargets(options, kind).map((item) => item.name), "targets")
  };
  const catchAll = ROUTES[ROUTES.length - 1];
  const server = http.createServer((req, res) => {
    const respond = /* @__PURE__ */ __name((status, contentType, body, headers = {}) => {
      if (res.headersSent) return;
      res.writeHead(status, {
        "Content-Type": contentType,
        "Content-Length": String(Buffer.byteLength(body)),
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "no-store",
        ...headers
      });
      res.end(req.method === "HEAD" ? void 0 : body);
    }, "respond");
    void (async () => {
      const method = req.method ?? "GET";
      if (method !== "GET" && method !== "HEAD" && method !== "POST") {
        req.resume();
        respond(405, TEXT, "Method not allowed.\n", { Allow: "GET, HEAD, POST" });
        return;
      }
      const rawUrl = req.url ?? "/";
      const queryAt = rawUrl.indexOf("?");
      const pathname = queryAt === -1 ? rawUrl : rawUrl.slice(0, queryAt);
      const query = new URLSearchParams(queryAt === -1 ? "" : rawUrl.slice(queryAt + 1));
      const route = routeFor(method, pathname);
      if (!route) {
        req.resume();
        const allow = allowedMethods(pathname);
        if (allow.length > 0) {
          respond(405, TEXT, `Method not allowed: ${pathname} answers ${allow.join(", ")}.
`, { Allow: allow.join(", ") });
          return;
        }
        await catchAll.handle(ctx, { method, pathname, query, body: null }, respond, serial);
        return;
      }
      let body = null;
      if (method === "POST") {
        body = await readBody(req, MAX_BODY_BYTES);
        if (body === null) {
          respond(413, JSON_TYPE, `${JSON.stringify({ error: { code: "REQUEST_BODY_TOO_LARGE", message: `The request body is over ${MAX_BODY_BYTES} bytes.`, param: "body" } })}
`);
          return;
        }
      } else {
        req.resume();
      }
      await route.handle(ctx, { method, pathname, query, body }, respond, serial);
    })().catch((err) => {
      try {
        respond(500, TEXT, `Internal error: ${oneLine(err instanceof Error ? err.message : String(err))}
`);
      } catch {
        res.destroy();
      }
    });
  });
  return new Promise((resolve2, reject) => {
    const onError = /* @__PURE__ */ __name((err) => {
      server.removeListener("listening", onListening);
      restoreFixtures?.();
      reject(err);
    }, "onError");
    const onListening = /* @__PURE__ */ __name(() => {
      server.removeListener("error", onError);
      server.on("error", (err) => {
        process.stderr.write(`serve: ${oneLine(err instanceof Error ? err.message : String(err))}
`);
      });
      const bound = server.address();
      const address = typeof bound === "object" && bound ? bound.address : SERVE_HOST;
      const port = typeof bound === "object" && bound ? bound.port : options.port;
      resolve2({
        address,
        port,
        url: `http://${address}:${port}/`,
        httpServer: server,
        close: /* @__PURE__ */ __name(() => new Promise((done) => {
          server.close(() => {
            restoreFixtures?.();
            done();
          });
          server.closeAllConnections?.();
        }), "close")
      });
    }, "onListening");
    server.once("error", onError);
    server.once("listening", onListening);
    server.listen(options.port, SERVE_HOST);
  });
}
__name(startPreviewServer, "startPreviewServer");

// src/compare.ts
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { join, resolve } from "path";
import { deflateSync, inflateSync } from "zlib";
var CHANNEL_THRESHOLD = 24;
var HEIGHT_MISMATCH_RATIO = 0.05;
var RANGE_TARGET_PERCENT = 3;
var MAX_RANGES = 5;
var RANGE_MERGE_GAP = 24;
var CROP_PADDING = 16;
var CROP_MAX_HEIGHT = 1600;
var CROP_SEPARATOR = 8;
var PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
var UnsupportedPngError = class extends Error {
  static {
    __name(this, "UnsupportedPngError");
  }
  constructor(message) {
    super(message);
    this.name = "UnsupportedPngError";
  }
};
var crcTable;
function crc32(buffer) {
  if (!crcTable) {
    crcTable = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
      crcTable[n] = c >>> 0;
    }
  }
  let crc = 4294967295;
  for (let i = 0; i < buffer.length; i++) crc = crcTable[(crc ^ buffer[i]) & 255] ^ crc >>> 8;
  return (crc ^ 4294967295) >>> 0;
}
__name(crc32, "crc32");
function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}
__name(paeth, "paeth");
function decodePng(buffer) {
  if (buffer.length < 8 || !buffer.subarray(0, 8).equals(PNG_SIGNATURE)) {
    throw new UnsupportedPngError("not a PNG file (bad signature)");
  }
  let offset = 8;
  let header;
  const idat = [];
  while (offset + 12 <= buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString("latin1", offset + 4, offset + 8);
    if (offset + 12 + length > buffer.length) {
      throw new UnsupportedPngError(`truncated ${type} chunk`);
    }
    const data = buffer.subarray(offset + 8, offset + 8 + length);
    if (type === "IHDR") {
      if (length !== 13) throw new UnsupportedPngError(`IHDR chunk is ${length} bytes; a PNG header is 13`);
      header = {
        width: data.readUInt32BE(0),
        height: data.readUInt32BE(4),
        bitDepth: data[8],
        colourType: data[9],
        interlace: data[12]
      };
    } else if (type === "IDAT") {
      idat.push(data);
    } else if (type === "IEND") {
      break;
    }
    offset += 12 + length;
  }
  if (!header) throw new UnsupportedPngError("no IHDR chunk");
  const { width, height, bitDepth, colourType, interlace } = header;
  if (width === 0 || height === 0) throw new UnsupportedPngError(`image is ${width}x${height}; an empty image cannot be compared`);
  if (bitDepth !== 8 || colourType !== 2 && colourType !== 6 || interlace !== 0) {
    throw new UnsupportedPngError(
      `bit depth ${bitDepth}, colour type ${colourType}${interlace ? ", interlaced" : ""}; only 8-bit RGB or RGBA non-interlaced PNGs (browser screenshots) are supported`
    );
  }
  if (idat.length === 0 || idat.every((chunk) => chunk.length === 0)) throw new UnsupportedPngError("no image data");
  const channels = colourType === 6 ? 4 : 3;
  const stride = width * channels;
  let raw;
  try {
    raw = inflateSync(Buffer.concat(idat));
  } catch (error) {
    throw new UnsupportedPngError(`image data does not inflate (${error instanceof Error ? error.message : String(error)})`);
  }
  if (raw.length < height * (stride + 1)) {
    throw new UnsupportedPngError("image data is shorter than the header says");
  }
  const out = Buffer.alloc(width * height * 4);
  let previous = Buffer.alloc(stride);
  let current = Buffer.alloc(stride);
  for (let y = 0; y < height; y++) {
    const rowStart = y * (stride + 1);
    const filter = raw[rowStart];
    for (let i = 0; i < stride; i++) {
      const a = i >= channels ? current[i - channels] : 0;
      const b = previous[i];
      const c = i >= channels ? previous[i - channels] : 0;
      let value = raw[rowStart + 1 + i];
      switch (filter) {
        case 0:
          break;
        case 1:
          value += a;
          break;
        case 2:
          value += b;
          break;
        case 3:
          value += a + b >> 1;
          break;
        case 4:
          value += paeth(a, b, c);
          break;
        default:
          throw new UnsupportedPngError(`unknown filter type ${filter} on row ${y}`);
      }
      current[i] = value & 255;
    }
    for (let x = 0; x < width; x++) {
      const s = x * channels;
      const d = (y * width + x) * 4;
      out[d] = current[s];
      out[d + 1] = current[s + 1];
      out[d + 2] = current[s + 2];
      out[d + 3] = channels === 4 ? current[s + 3] : 255;
    }
    [previous, current] = [current, previous];
  }
  return { width, height, data: out };
}
__name(decodePng, "decodePng");
function pngChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const typeAndData = Buffer.concat([Buffer.from(type, "latin1"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData), 0);
  return Buffer.concat([length, typeAndData, crc]);
}
__name(pngChunk, "pngChunk");
function encodePng({ width, height, data }) {
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0;
    data.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 6;
  header[10] = 0;
  header[11] = 0;
  header[12] = 0;
  return Buffer.concat([
    PNG_SIGNATURE,
    pngChunk("IHDR", header),
    pngChunk("IDAT", deflateSync(raw)),
    pngChunk("IEND", Buffer.alloc(0))
  ]);
}
__name(encodePng, "encodePng");
var round2 = /* @__PURE__ */ __name((n) => Math.round(n * 100) / 100, "round2");
function findRanges(rowDiffs, width, { mergeGap = RANGE_MERGE_GAP, limit = MAX_RANGES } = {}) {
  const ranges = [];
  let open = null;
  for (let y = 0; y < rowDiffs.length; y++) {
    if (rowDiffs[y] === 0) continue;
    if (open && y - open.yEnd - 1 < mergeGap) {
      open.yEnd = y;
      open.differingPixels += rowDiffs[y];
    } else {
      if (open) ranges.push(open);
      open = { yStart: y, yEnd: y, differingPixels: rowDiffs[y], percent: 0 };
    }
  }
  if (open) ranges.push(open);
  for (const range of ranges) {
    const rows = range.yEnd - range.yStart + 1;
    range.percent = width > 0 ? round2(range.differingPixels / (rows * width) * 100) : 0;
  }
  ranges.sort((a, b) => b.differingPixels - a.differingPixels || a.yStart - b.yStart);
  return ranges.slice(0, limit);
}
__name(findRanges, "findRanges");
function compareImages(reference, render, { threshold = CHANNEL_THRESHOLD } = {}) {
  const width = Math.min(reference.width, render.width);
  const height = Math.min(reference.height, render.height);
  const heightRatio = reference.height > 0 ? render.height / reference.height : null;
  const layoutMismatch = heightRatio === null ? render.height !== reference.height : Math.abs(heightRatio - 1) > HEIGHT_MISMATCH_RATIO;
  const rowDiffs = new Uint32Array(height);
  const mask = new Uint8Array(width * height);
  let differingPixels = 0;
  for (let y = 0; y < height; y++) {
    let rowCount = 0;
    for (let x = 0; x < width; x++) {
      const r = (y * reference.width + x) * 4;
      const s = (y * render.width + x) * 4;
      if (Math.abs(reference.data[r] - render.data[s]) > threshold || Math.abs(reference.data[r + 1] - render.data[s + 1]) > threshold || Math.abs(reference.data[r + 2] - render.data[s + 2]) > threshold || Math.abs(reference.data[r + 3] - render.data[s + 3]) > threshold) {
        mask[y * width + x] = 1;
        rowCount++;
      }
    }
    rowDiffs[y] = rowCount;
    differingPixels += rowCount;
  }
  const area = width * height;
  return {
    reference: { width: reference.width, height: reference.height },
    render: { width: render.width, height: render.height },
    heightRatio: heightRatio === null ? null : Math.round(heightRatio * 1e3) / 1e3,
    layoutMismatch,
    widthMismatch: reference.width !== render.width,
    comparedArea: { width, height },
    uncomparedRows: Math.abs(reference.height - render.height),
    threshold,
    differingPixels,
    differingPercent: area === 0 ? 0 : round2(differingPixels / area * 100),
    ranges: findRanges(rowDiffs, width),
    mask
  };
}
__name(compareImages, "compareImages");
function imagesIdentical(reference, render) {
  return reference.width === render.width && reference.height === render.height && reference.data.equals(render.data);
}
__name(imagesIdentical, "imagesIdentical");
function diffImage(reference, result) {
  const { width, height } = result.comparedArea;
  const data = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const d = (y * width + x) * 4;
      if (result.mask[y * width + x]) {
        data[d] = 230;
        data[d + 1] = 0;
        data[d + 2] = 40;
      } else {
        const r = (y * reference.width + x) * 4;
        const grey = 0.299 * reference.data[r] + 0.587 * reference.data[r + 1] + 0.114 * reference.data[r + 2];
        const faded = Math.round(grey * 0.3 + 255 * 0.7);
        data[d] = faded;
        data[d + 1] = faded;
        data[d + 2] = faded;
      }
      data[d + 3] = 255;
    }
  }
  return { width, height, data };
}
__name(diffImage, "diffImage");
function sideBySide(reference, render, yStart, yEnd) {
  const y0 = Math.max(0, yStart - CROP_PADDING);
  const y1 = Math.min(yEnd + CROP_PADDING, y0 + CROP_MAX_HEIGHT - 1, Math.max(reference.height, render.height) - 1);
  const height = y1 - y0 + 1;
  const width = reference.width + CROP_SEPARATOR + render.width;
  const data = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    data[i * 4] = 214;
    data[i * 4 + 1] = 214;
    data[i * 4 + 2] = 214;
    data[i * 4 + 3] = 255;
  }
  const blit = /* @__PURE__ */ __name((image, left) => {
    for (let y = y0; y <= y1 && y < image.height; y++) {
      image.data.copy(data, ((y - y0) * width + left) * 4, y * image.width * 4, (y + 1) * image.width * 4);
    }
  }, "blit");
  blit(reference, 0);
  for (let y = 0; y < height; y++) {
    for (let x = reference.width; x < reference.width + CROP_SEPARATOR; x++) {
      const d = (y * width + x) * 4;
      data[d] = 255;
      data[d + 1] = 0;
      data[d + 2] = 160;
    }
  }
  blit(render, reference.width + CROP_SEPARATOR);
  return { image: { width, height, data }, y0, y1, truncated: y1 < yEnd + CROP_PADDING && y1 < Math.max(reference.height, render.height) - 1 };
}
__name(sideBySide, "sideBySide");
function writeOutputs(reference, render, result, outDir) {
  mkdirSync(outDir, { recursive: true });
  const outputs = [];
  const diffPath = join(outDir, "diff.png");
  writeFileSync(diffPath, encodePng(diffImage(reference, result)));
  outputs.push({ kind: "diff", path: diffPath });
  result.ranges.forEach((range, index) => {
    const crop = sideBySide(reference, render, range.yStart, range.yEnd);
    const path9 = join(outDir, `range-${index + 1}.png`);
    writeFileSync(path9, encodePng(crop.image));
    outputs.push({ kind: "range", range: index + 1, path: path9, rows: [crop.y0, crop.y1], truncated: crop.truncated });
  });
  return outputs;
}
__name(writeOutputs, "writeOutputs");
var CompareUsageError = class extends Error {
  static {
    __name(this, "CompareUsageError");
  }
};
function parseCompareArgs(argv) {
  const positional = [];
  const options = { out: null, json: false, help: false, threshold: CHANNEL_THRESHOLD };
  let thresholdSeen = false;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--json") options.json = true;
    else if (arg === "--help" || arg === "-h") options.help = true;
    else if (arg === "--out") {
      if (argv[i + 1] === void 0) throw new CompareUsageError("--out needs a directory");
      options.out = argv[++i];
    } else if (arg.startsWith("--out=")) options.out = arg.slice(6);
    else if (arg === "--threshold" || arg.startsWith("--threshold=")) {
      const value = arg === "--threshold" ? argv[++i] : arg.slice("--threshold=".length);
      if (value === void 0) throw new CompareUsageError("--threshold needs a number");
      if (!/^\d{1,3}$/.test(value) || Number(value) > 255) {
        throw new CompareUsageError(`--threshold expects a whole number from 0 to 255, got ${JSON.stringify(value)}`);
      }
      if (thresholdSeen) throw new CompareUsageError("--threshold is given more than once");
      thresholdSeen = true;
      options.threshold = Number(value);
    } else if (arg.startsWith("-")) throw new CompareUsageError(`unknown option ${arg}`);
    else positional.push(arg);
  }
  if (!options.help && positional.length !== 2) throw new CompareUsageError("expected exactly two PNG files: <reference.png> <render.png>");
  return { reference: positional[0], render: positional[1], ...options };
}
__name(parseCompareArgs, "parseCompareArgs");
function formatReport(result, identical, outputs) {
  const lines = [];
  const ref = result.reference;
  const ren = result.render;
  lines.push(`reference ${ref.width}x${ref.height}, render ${ren.width}x${ren.height}, height ratio ${result.heightRatio ?? "n/a"}`);
  if (result.layoutMismatch) {
    const pct = result.heightRatio === null ? "an undefined share" : `${Math.round(Math.abs(result.heightRatio - 1) * 1e3) / 10}%`;
    lines.push(
      `LAYOUT MISMATCH: the render's height differs from the reference by ${pct} (limit 5%). Everything below the first shifted band is offset, so fix layout and spacing before reading the percentages below.`
    );
  }
  if (result.widthMismatch) {
    lines.push("WIDTH MISMATCH: the images were not captured at the same viewport width. Recapture like with like.");
  }
  lines.push(
    `compared area ${result.comparedArea.width}x${result.comparedArea.height}: ${result.differingPercent}% of pixels differ (a pixel differs when any channel differs by more than ${result.threshold})`
  );
  if (result.uncomparedRows) lines.push(`${result.uncomparedRows} rows of the taller image were not compared`);
  if (result.ranges.length === 0) {
    lines.push("no differing ranges");
  } else {
    lines.push(`largest differing ranges (y-start..y-end, share of the range that differs; target under ${RANGE_TARGET_PERCENT}%):`);
    result.ranges.forEach((range, index) => {
      const flag = range.percent >= RANGE_TARGET_PERCENT ? "  over target" : "";
      lines.push(`  ${index + 1}. y ${range.yStart}..${range.yEnd}  ${range.percent}%${flag}`);
    });
  }
  lines.push(identical ? "identical: every pixel is equal" : "not identical (identical means equal dimensions and every channel of every pixel equal)");
  for (const output of outputs) {
    if (output.kind === "diff") lines.push(`diff image: ${output.path}`);
    else lines.push(`range ${output.range} crop (reference | render, rows ${output.rows[0]}..${output.rows[1]}${output.truncated ? ", truncated" : ""}): ${output.path}`);
  }
  return lines.join("\n");
}
__name(formatReport, "formatReport");
function runCompare(argv, io) {
  let args2;
  try {
    args2 = parseCompareArgs(argv);
  } catch (error) {
    if (!(error instanceof CompareUsageError)) throw error;
    io.stderr(`compare: ${error.message}. Run themespot-render compare --help for usage.
`);
    return 2;
  }
  if (args2.help) {
    io.stdout(io.help);
    return 0;
  }
  const images = {};
  for (const key of ["reference", "render"]) {
    let buffer;
    try {
      buffer = readFileSync(resolve(args2[key]));
    } catch (error) {
      const code = error?.code;
      io.stderr(`compare: cannot read ${key} image ${args2[key]} (${typeof code === "string" ? code : error instanceof Error ? error.message : String(error)})
`);
      return 1;
    }
    try {
      images[key] = decodePng(buffer);
    } catch (error) {
      const reason = error instanceof UnsupportedPngError ? error.message : `could not decode (${String(error instanceof Error ? error.message : error).split("\n")[0]})`;
      io.stderr(`compare: unsupported PNG ${args2[key]}: ${reason}
`);
      return 3;
    }
  }
  const result = compareImages(images.reference, images.render, { threshold: args2.threshold });
  const identical = imagesIdentical(images.reference, images.render);
  const outputs = args2.out ? writeOutputs(images.reference, images.render, result, resolve(args2.out)) : [];
  if (args2.json) {
    const { mask: _mask, ...report } = result;
    io.stdout(`${JSON.stringify({ ...report, identical, rangeTargetPercent: RANGE_TARGET_PERCENT, outputs }, null, 2)}
`);
  } else {
    io.stdout(`${formatReport(result, identical, outputs)}
`);
  }
  return 0;
}
__name(runCompare, "runCompare");

// src/cli-commands.ts
var DEFAULT_SERVE_PORT = 3456;
var STANDARD_EXIT = "Exit codes: 0 done (diagnostics may be reported), 1 could not be done, 2 bad arguments.";
var FLAG_HELP = {
  "--theme-root <dir>": ["The theme to work on (a child theme, when it has a parent)."],
  "--parent-theme-root <dir>": [
    "Its parent theme. Without it, a theme whose theme.json extends",
    "a parent renders from its own files and reports",
    "INHERITANCE_PARENT_MISSING."
  ],
  "--template <name>": ["A page template, as templates lists it (home.html,", "blog/post.hubl.html); a leading templates/ is accepted."],
  "--module <ref>": [
    "A module, as a template references it: ../modules/<name> (the",
    "names list --kind module prints), a path inside the theme, or",
    "@hubspot/<name> for one of HubSpot's default modules. render",
    "draws it on its own, with no header or footer."
  ],
  "--section <name>": ["A file name under sections/ (cards.html), as list --kind section", "prints it. Drawn on its own, with no header or footer."],
  "--partial <name>": ["A file name under templates/partials/ (header.html), as list", "--kind partial prints it."],
  "--state <id>": [
    "The content state to render as, written <kind>/<name>",
    "(blog-post/minimal); list --kind state prints them. Omitted, the",
    "target's default."
  ],
  "--props <json|@file>": [
    "Field values for --module: a JSON object, or @file naming a file",
    "that holds one. Refused with any other target: nothing else in",
    "this build reads props."
  ],
  "--overrides <json|@file>": [
    'Settings for this render: { "preset"?: string, "settings"?: object },',
    "or @file. settings are theme settings merged over the defaults;",
    "metadata lists the presets and every settings key."
  ],
  "--fixtures <dir>": [
    "A folder of fixture files read instead of the theme's",
    "fixtures/<same path>, file by file; fixtures lists the files."
  ],
  "--out <file.html>": ["Write the document to this file, creating its folders, and print", "the file's absolute path."],
  "--asset-base <url>": [
    "Where theme assets (images, fonts, scripts) are loaded from.",
    "Default: the file:// URL of --theme-root, which makes the",
    "document machine-specific: it loads its assets only from this",
    "path on this machine, and a file only the parent theme holds does",
    "not resolve from it. Use serve, or pass a base, for anything else."
  ],
  "--kind <kind>": ["list: template, module, section, partial or state. Omitted, every", 'kind, one "<kind><tab><name>" per line.'],
  "--json": ["Print exactly one JSON object instead of text."],
  "--port <n>": [
    `serve: the port on ${SERVE_HOST} (default ${DEFAULT_SERVE_PORT}; 0 picks a free one).`,
    "A port in use is an error; nothing else on it is touched."
  ],
  "--out <dir>": ["compare: write diff.png and a side-by-side crop (reference | render)", "for each of the largest differing ranges."],
  "--threshold <n>": [
    "compare: a pixel differs when any channel differs by more than n",
    "(0-255, default 24). identical is always the threshold-0 answer."
  ],
  "--max-warnings <n>": ["validate: fail on more warnings than n (default: warnings never fail)."],
  "--max-files <n>": ["validate: stop after n files, and fail, saying the walk was truncated."],
  "--preset <name>": ["generate-css: the preset to render the CSS with."],
  "--output <file>": ["generate-css: where to write the stylesheet."],
  "--help": ["Show the help: every command, or the one named."],
  "--version": ["Print the version."]
};
var COMMAND_HELP = {
  render: {
    usage: [
      "themespot-render render --theme-root <dir> (--template <name> | --module <ref> | --section <name> | --partial <name>)",
      "                        [--parent-theme-root <dir>] [--state <id>] [--props <json|@file>]",
      "                        [--overrides <json|@file>] [--fixtures <dir>] [--out <file.html>]",
      "                        [--asset-base <url>] [--json]"
    ],
    summary: [
      "Render exactly one target to a full HTML document: a page template, one module,",
      "one section or one global partial. The document goes to standard output, or to",
      "--out; diagnostics go to standard error, one per line. With --json, one object:",
      "{ ok, kind, target, template, state, props, overrides, out, html, assetBase,",
      "diagnostics }; html is null with --out, template is null for the other kinds."
    ],
    flags: [
      "--theme-root <dir>",
      "--parent-theme-root <dir>",
      "--template <name>",
      "--module <ref>",
      "--section <name>",
      "--partial <name>",
      "--state <id>",
      "--props <json|@file>",
      "--overrides <json|@file>",
      "--fixtures <dir>",
      "--out <file.html>",
      "--asset-base <url>",
      "--json"
    ],
    exitCodes: `${STANDARD_EXIT} A missing or second target, unreadable --props or --overrides, props on anything but --module, an unknown preset and a module, section or partial the theme does not have are 2; an unknown template or state is 1.`
  },
  serve: {
    usage: ["themespot-render serve --theme-root <dir> [--parent-theme-root <dir>] [--port 3456] [--fixtures <dir>]"],
    summary: [
      `Preview the theme at http://${SERVE_HOST}:<port>/ (this machine only), re-read from disk`,
      "on every request. GET /api/index describes every route, its parameters and",
      "example requests: /render and /diagnostics take template, module, section or",
      "partial with state, props and overrides; POST /api/render and /api/diagnostics",
      "take the same as a JSON body; /api/list, /api/fixtures, /api/fields and",
      "/api/metadata answer what the commands print with --json; /theme-assets/<path>",
      "serves the theme's files. Stop it with Ctrl+C."
    ],
    flags: ["--theme-root <dir>", "--parent-theme-root <dir>", "--port <n>", "--fixtures <dir>"],
    exitCodes: STANDARD_EXIT
  },
  list: {
    usage: ["themespot-render list --theme-root <dir> [--parent-theme-root <dir>] [--kind template|module|section|partial|state] [--json]"],
    summary: [
      "Print the names render accepts, one per line: page templates, HubL modules under",
      "modules/, sections, global partials and content states. With --json,",
      "{ kind, items: [{ name, root, file }] }, or { kinds: [...] } without --kind."
    ],
    flags: ["--theme-root <dir>", "--parent-theme-root <dir>", "--kind <kind>", "--json"],
    exitCodes: STANDARD_EXIT
  },
  templates: {
    usage: ["themespot-render templates --theme-root <dir> [--parent-theme-root <dir>] [--json]"],
    summary: [
      "List the page templates, one name per line: .html files under templates/, except",
      "templates/layouts/ and templates/partials/. The same as list --kind template;",
      "with --json, { templates: [{ name, root }] }."
    ],
    flags: ["--theme-root <dir>", "--parent-theme-root <dir>", "--json"],
    exitCodes: STANDARD_EXIT
  },
  fixtures: {
    usage: ["themespot-render fixtures --theme-root <dir> [--fixtures <dir>] [--json]"],
    summary: [
      "Describe the fixture files that stand in for portal data: for each kind, where it",
      "is read from, whether the theme has it, the built-in used otherwise, and a JSON",
      "Schema (content states, CRM object types) or an example. Fixtures are read from",
      "the theme root only; a parent theme's fixtures are not read."
    ],
    flags: ["--theme-root <dir>", "--fixtures <dir>", "--json"],
    exitCodes: STANDARD_EXIT
  },
  fields: {
    usage: ["themespot-render fields --theme-root <dir> --module <ref> [--parent-theme-root <dir>] [--json]"],
    summary: [
      "Print a module's fields, read from its fields.json. A React module's fields are",
      "not read by this build: it answers an empty list and says so."
    ],
    flags: ["--theme-root <dir>", "--parent-theme-root <dir>", "--module <ref>", "--json"],
    exitCodes: STANDARD_EXIT
  },
  metadata: {
    usage: ["themespot-render metadata --theme-root <dir> [--parent-theme-root <dir>] [--json]"],
    summary: [
      "Print the theme's settings: their resolved defaults, every settings key (what",
      "--overrides settings may set), the presets and the surfaces its stylesheets",
      "declare."
    ],
    flags: ["--theme-root <dir>", "--parent-theme-root <dir>", "--json"],
    exitCodes: STANDARD_EXIT
  },
  compare: {
    usage: ["themespot-render compare <reference.png> <render.png> [--out <dir>] [--threshold 24] [--json]"],
    summary: [
      "Compare two screenshots taken at the same viewport, pixel by pixel: 8-bit RGB or",
      "RGBA PNGs, as browsers capture them. Reports the share of pixels that differ,",
      "the largest differing vertical ranges, a height difference over 5% as a layout",
      "mismatch, and identical (equal dimensions, every pixel equal). This build",
      "captures nothing: take the screenshots with any browser tool."
    ],
    flags: ["--out <dir>", "--threshold <n>", "--json"],
    exitCodes: "Exit codes: 0 compared (whatever the result), 1 an image could not be read, 2 bad arguments, 3 a PNG this command cannot decode."
  },
  validate: {
    usage: [
      "themespot-render validate --theme-root <dir> [--parent-theme-root <dir>] [--json]",
      "                          [--max-warnings <n>] [--max-files <n>]"
    ],
    summary: ["Check the theme against HubSpot's template-level upload rules, offline."],
    flags: ["--theme-root <dir>", "--parent-theme-root <dir>", "--json", "--max-warnings <n>", "--max-files <n>"],
    exitCodes: "Exit codes: 0 clean, 1 an error, more warnings than --max-warnings, a truncated walk or bad arguments."
  },
  "generate-css": {
    usage: ["themespot-render generate-css --theme-root <dir> [--preset <name>] [--output <file>]"],
    summary: ["Render the theme's CSS to one resolved stylesheet."],
    flags: ["--theme-root <dir>", "--preset <name>", "--output <file>"],
    exitCodes: "Exit codes: 0 written (CSS diagnostics are printed), 1 no fields.json."
  }
};
var COMMAND_NAMES = Object.keys(COMMAND_HELP);
var NOTES = [
  "React modules are not drawn by this build: each one renders as a placeholder naming the",
  'module, marked data-module-not-rendered="react", and the render reports',
  "REACT_MODULE_NOT_RENDERED; surface and token previews are not part of this build.",
  "Rendered pages may load fonts, icons and placeholder images from the network."
];
function flagLines(flags) {
  const width = 27;
  return flags.flatMap((flag) => {
    const [first, ...rest] = FLAG_HELP[flag] ?? [""];
    const head = `  ${flag}`;
    return [
      head.length + 1 > width ? `${head}
${" ".repeat(width)}${first}` : `${head.padEnd(width)}${first}`,
      ...rest.map((line) => `${" ".repeat(width)}${line}`)
    ];
  });
}
__name(flagLines, "flagLines");
var HEADER = `themespot-render ${RENDERER_VERSION}
Renders HubSpot CMS themes written in HubL to HTML on this machine.
`;
function commandHelp(command2) {
  const help = Object.hasOwn(COMMAND_HELP, command2) ? COMMAND_HELP[command2] : void 0;
  if (!help) return null;
  return [
    HEADER,
    "Usage:",
    ...help.usage.map((line) => `  ${line}`),
    "",
    ...help.summary,
    "",
    "Flags:",
    ...flagLines([...help.flags, "--help"]),
    "",
    ...command2 === "render" || command2 === "serve" ? [...NOTES, ""] : [],
    help.exitCodes,
    ""
  ].join("\n");
}
__name(commandHelp, "commandHelp");
var HELP_TEXT = [
  HEADER,
  "Usage:",
  ...COMMAND_NAMES.flatMap((name) => COMMAND_HELP[name].usage.map((line) => `  ${line}`)),
  "  themespot-render help [<command>] | <command> --help | --version",
  "",
  "Commands:",
  ...COMMAND_NAMES.flatMap((name) => [`  ${name}`, ...COMMAND_HELP[name].summary.map((line) => `      ${line}`)]),
  "  help        Show this help, or one command's: help <command>, or <command> --help.",
  "",
  "Flags:",
  ...flagLines([...Object.keys(FLAG_HELP)]),
  "",
  ...NOTES,
  "",
  "Exit codes for render, serve, list, templates, fixtures, fields and metadata: 0 done",
  "(diagnostics may be reported), 1 could not be done, 2 bad arguments or an unknown",
  "flag. compare: 0 compared, 1 an image could not be read, 2 bad arguments, 3 a PNG it",
  "cannot decode. validate: 0 clean, 1 otherwise.",
  ""
].join("\n");
function runHelpCommand(args2) {
  if (args2.length === 0) {
    process.stdout.write(HELP_TEXT);
    return 0;
  }
  const section = args2.length === 1 ? commandHelp(args2[0]) : null;
  if (section === null) {
    process.stderr.write(`Error: help takes one command name: ${COMMAND_NAMES.join(", ")}.
`);
    return 2;
  }
  process.stdout.write(section);
  return 0;
}
__name(runHelpCommand, "runHelpCommand");
var UsageError = class extends Error {
  static {
    __name(this, "UsageError");
  }
};
function parseFlags(args2, spec) {
  const parsed = /* @__PURE__ */ new Map();
  for (let index = 0; index < args2.length; index++) {
    const arg = args2[index];
    if (!arg.startsWith("--")) throw new UsageError(`unexpected argument ${JSON.stringify(arg)}`);
    const equals = arg.indexOf("=");
    const flag = equals === -1 ? arg : arg.slice(0, equals);
    const kind = spec[flag];
    if (!kind) throw new UsageError(`unknown flag ${flag}`);
    if (parsed.has(flag)) throw new UsageError(`${flag} is given more than once`);
    if (kind === "boolean") {
      if (equals !== -1) throw new UsageError(`${flag} takes no value`);
      parsed.set(flag, true);
      continue;
    }
    const value = equals === -1 ? args2[++index] : arg.slice(equals + 1);
    if (value === void 0 || value === "" || equals === -1 && value.startsWith("--")) {
      throw new UsageError(`${flag} expects a value`);
    }
    parsed.set(flag, value);
  }
  return parsed;
}
__name(parseFlags, "parseFlags");
function stringFlag(flags, flag) {
  const value = flags.get(flag);
  return typeof value === "string" ? value : void 0;
}
__name(stringFlag, "stringFlag");
var PLACEHOLDERS = { "--template": "name", "--module": "ref" };
function requiredFlag(flags, flag) {
  const value = stringFlag(flags, flag);
  if (value === void 0) throw new UsageError(`${flag} <${PLACEHOLDERS[flag] ?? "dir"}> is required`);
  return value;
}
__name(requiredFlag, "requiredFlag");
function usageFailure(error, command2) {
  process.stderr.write(`Error: ${error.message}. Run themespot-render help ${command2} for usage.
`);
  return 2;
}
__name(usageFailure, "usageFailure");
function withUsage(command2, body) {
  try {
    return body();
  } catch (err) {
    if (err instanceof UsageError) return usageFailure(err, command2);
    throw err;
  }
}
__name(withUsage, "withUsage");
function readableDirectory(flag, value) {
  const resolved = path7.resolve(value);
  let isDirectory3 = false;
  try {
    isDirectory3 = fs2.statSync(resolved).isDirectory();
    if (isDirectory3) fs2.readdirSync(resolved);
  } catch {
    isDirectory3 = false;
  }
  if (!isDirectory3) {
    process.stderr.write(`Error: ${flag} ${resolved} is not a readable directory.
`);
    return null;
  }
  return resolved;
}
__name(readableDirectory, "readableDirectory");
function themeRoots(flags) {
  const themeRoot = readableDirectory("--theme-root", requiredFlag(flags, "--theme-root"));
  if (!themeRoot) return null;
  const parentArg = stringFlag(flags, "--parent-theme-root");
  if (parentArg === void 0) return { themeRoot };
  const parentThemeRoot = readableDirectory("--parent-theme-root", parentArg);
  return parentThemeRoot === null ? null : { themeRoot, parentThemeRoot };
}
__name(themeRoots, "themeRoots");
function diagnosticLine(entry) {
  return `${entry.code}: ${entry.message.replace(/\s*\n\s*/g, " ")}
`;
}
__name(diagnosticLine, "diagnosticLine");
function readUtf8(file) {
  return fs2.readFileSync(path7.resolve(file), "utf-8");
}
__name(readUtf8, "readUtf8");
var RENDER_FLAGS = {
  "--theme-root": "value",
  "--parent-theme-root": "value",
  "--template": "value",
  "--module": "value",
  "--section": "value",
  "--partial": "value",
  "--state": "value",
  "--props": "value",
  "--overrides": "value",
  "--fixtures": "value",
  "--out": "value",
  "--asset-base": "value",
  "--json": "boolean",
  "--help": "boolean"
};
async function runRenderCommand(args2) {
  const parsed = withUsage("render", () => {
    const flags2 = parseFlags(args2, RENDER_FLAGS);
    if (flags2.has("--help")) return { help: true };
    requiredFlag(flags2, "--theme-root");
    const named = TARGET_KINDS.filter((kind) => flags2.has(`--${kind}`));
    if (named.length !== 1) {
      throw new UsageError(
        named.length === 0 ? "name exactly one target: --template <name>, --module <ref>, --section <name> or --partial <name>" : `name exactly one target, not ${named.map((kind) => `--${kind}`).join(" and ")}: --template <name>, --module <ref>, --section <name> or --partial <name>`
      );
    }
    const target2 = { kind: named[0], name: stringFlag(flags2, `--${named[0]}`) };
    const read = /* @__PURE__ */ __name((flag) => {
      const raw = stringFlag(flags2, flag);
      if (raw === void 0) return void 0;
      const result2 = readJsonObjectArgument(raw, readUtf8);
      if (!result2.ok) throw new UsageError(`${flag} could not be read: ${result2.reason}`);
      return result2.value;
    }, "read");
    return { help: false, flags: flags2, target: target2, props: read("--props") ?? null, overrides: read("--overrides") };
  });
  if (typeof parsed === "number") return parsed;
  if (parsed.help) {
    process.stdout.write(commandHelp("render"));
    return 0;
  }
  const { flags, target, props, overrides } = parsed;
  const roots = themeRoots(flags);
  if (!roots) return 1;
  const fixturesArg = stringFlag(flags, "--fixtures");
  if (fixturesArg !== void 0) {
    const fixturesDir = readableDirectory("--fixtures", fixturesArg);
    if (!fixturesDir) return 1;
    installFixtureOverlay(roots.themeRoot, fixturesDir);
  }
  const assetBaseFlag = stringFlag(flags, "--asset-base");
  const assetBase = assetBaseFlag ?? `${pathToFileURL(roots.themeRoot).href.replace(/\/+$/, "")}/`;
  const json = flags.has("--json");
  const outArg = stringFlag(flags, "--out");
  const state = stringFlag(flags, "--state");
  const outcome = await renderTarget({
    ...roots,
    target,
    ...state !== void 0 ? { state } : {},
    props,
    ...overrides !== void 0 ? { overrides } : {},
    assetBase,
    assetBaseOrigin: assetBaseFlag === void 0 ? "theme-root" : "flag"
  });
  if (outcome.failure || outcome.html === null) {
    if (outcome.failure) process.stderr.write(failureText(outcome.failure));
    if (json) process.stdout.write(`${JSON.stringify(outcome.json)}
`);
    return outcome.failure && ARGUMENT_FAILURES.has(outcome.failure.kind) ? 2 : 1;
  }
  const result = { ...outcome.json };
  if (outArg !== void 0) {
    const outPath = path7.resolve(outArg);
    try {
      fs2.mkdirSync(path7.dirname(outPath), { recursive: true });
      fs2.writeFileSync(outPath, outcome.html, "utf-8");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      process.stderr.write(`Error: could not write ${outPath}: ${message}
`);
      if (json) {
        process.stdout.write(
          `${JSON.stringify({ ...result, ok: false, html: null, diagnostics: [...result.diagnostics, { code: "OUTPUT_UNWRITABLE", message: `Could not write ${outPath}: ${message}` }] })}
`
        );
      }
      return 1;
    }
    result.out = outPath;
    result.html = null;
  }
  if (json) {
    process.stdout.write(`${JSON.stringify(result)}
`);
    return 0;
  }
  for (const entry of result.diagnostics) process.stderr.write(diagnosticLine(entry));
  process.stdout.write(result.out !== null ? `${result.out}
` : outcome.html);
  return 0;
}
__name(runRenderCommand, "runRenderCommand");
var TEMPLATES_FLAGS = {
  "--theme-root": "value",
  "--parent-theme-root": "value",
  "--json": "boolean",
  "--help": "boolean"
};
function runTemplatesCommand(args2) {
  const flags = withUsage("templates", () => {
    const parsed = parseFlags(args2, TEMPLATES_FLAGS);
    if (!parsed.has("--help")) requiredFlag(parsed, "--theme-root");
    return parsed;
  });
  if (typeof flags === "number") return flags;
  if (flags.has("--help")) {
    process.stdout.write(commandHelp("templates"));
    return 0;
  }
  const roots = themeRoots(flags);
  if (!roots) return 1;
  const templates = listPageTemplates(roots);
  if (flags.has("--json")) {
    process.stdout.write(`${JSON.stringify({ templates: templates.map(({ name, root }) => ({ name, root })) })}
`);
  } else if (templates.length > 0) {
    process.stdout.write(`${templates.map((entry) => entry.name).join("\n")}
`);
  }
  return 0;
}
__name(runTemplatesCommand, "runTemplatesCommand");
var LIST_FLAGS = {
  "--theme-root": "value",
  "--parent-theme-root": "value",
  "--kind": "value",
  "--json": "boolean",
  "--help": "boolean"
};
function runListCommand(args2) {
  const parsed = withUsage("list", () => {
    const flags2 = parseFlags(args2, LIST_FLAGS);
    if (flags2.has("--help")) return { flags: flags2, kind: null };
    requiredFlag(flags2, "--theme-root");
    const kind2 = stringFlag(flags2, "--kind");
    if (kind2 !== void 0 && !LIST_KINDS.includes(kind2)) {
      throw new UsageError(`--kind expects one of ${LIST_KINDS.join(", ")}, got ${JSON.stringify(kind2)}`);
    }
    return { flags: flags2, kind: kind2 ?? null };
  });
  if (typeof parsed === "number") return parsed;
  const { flags, kind } = parsed;
  if (flags.has("--help")) {
    process.stdout.write(commandHelp("list"));
    return 0;
  }
  const roots = themeRoots(flags);
  if (!roots) return 1;
  const json = flags.has("--json");
  if (kind !== null) {
    const items = listThemeTargets(roots, kind);
    if (json) process.stdout.write(`${JSON.stringify({ kind, items })}
`);
    else if (items.length > 0) process.stdout.write(`${items.map((item) => item.name).join("\n")}
`);
    return 0;
  }
  const kinds = LIST_KINDS.map((each) => ({ kind: each, items: listThemeTargets(roots, each) }));
  if (json) {
    process.stdout.write(`${JSON.stringify({ kinds })}
`);
  } else {
    const lines = kinds.flatMap((entry) => entry.items.map((item) => `${entry.kind}	${item.name}`));
    if (lines.length > 0) process.stdout.write(`${lines.join("\n")}
`);
  }
  return 0;
}
__name(runListCommand, "runListCommand");
var FIXTURES_FLAGS = {
  "--theme-root": "value",
  "--fixtures": "value",
  "--json": "boolean",
  "--help": "boolean"
};
function runFixturesCommand(args2) {
  const flags = withUsage("fixtures", () => {
    const parsed = parseFlags(args2, FIXTURES_FLAGS);
    if (!parsed.has("--help")) requiredFlag(parsed, "--theme-root");
    return parsed;
  });
  if (typeof flags === "number") return flags;
  if (flags.has("--help")) {
    process.stdout.write(commandHelp("fixtures"));
    return 0;
  }
  const themeRoot = readableDirectory("--theme-root", requiredFlag(flags, "--theme-root"));
  if (!themeRoot) return 1;
  let overlay = null;
  const fixturesArg = stringFlag(flags, "--fixtures");
  if (fixturesArg !== void 0) {
    overlay = readableDirectory("--fixtures", fixturesArg);
    if (!overlay) return 1;
    installFixtureOverlay(themeRoot, overlay);
  }
  const report = describeFixtures(themeRoot, overlay);
  if (flags.has("--json")) {
    process.stdout.write(`${JSON.stringify(report)}
`);
    return 0;
  }
  const lines = [report.note, ""];
  for (const kind of report.kinds) {
    lines.push(`${kind.kind}: ${kind.present ? "present" : "absent"}, read from ${kind.path}`);
    lines.push(`  ${kind.description}`);
    lines.push(`  Otherwise: ${kind.whenAbsent}.${kind.schema ? " --json carries its JSON Schema." : " --json carries an example."}`);
    for (const file of kind.files ?? []) lines.push(`  ${file.name}: ${file.present ? "present" : "absent"}${file.embeddedDefault ? ", built-in otherwise" : ""}`);
  }
  process.stdout.write(`${lines.join("\n")}
`);
  return 0;
}
__name(runFixturesCommand, "runFixturesCommand");
var FIELDS_FLAGS = {
  "--theme-root": "value",
  "--parent-theme-root": "value",
  "--module": "value",
  "--json": "boolean",
  "--help": "boolean"
};
function fieldLines(fields, depth) {
  return fields.flatMap((field) => [
    `${"  ".repeat(depth)}${field.name} (${field.type})${field.label ? ` ${field.label}` : ""}${field.occurrence ? " [repeated]" : ""}`,
    ...fieldLines(field.children ?? [], depth + 1)
  ]);
}
__name(fieldLines, "fieldLines");
function runFieldsCommand(args2) {
  const flags = withUsage("fields", () => {
    const parsed = parseFlags(args2, FIELDS_FLAGS);
    if (!parsed.has("--help")) {
      requiredFlag(parsed, "--theme-root");
      requiredFlag(parsed, "--module");
    }
    return parsed;
  });
  if (typeof flags === "number") return flags;
  if (flags.has("--help")) {
    process.stdout.write(commandHelp("fields"));
    return 0;
  }
  const roots = themeRoots(flags);
  if (!roots) return 1;
  const module = requiredFlag(flags, "--module");
  const report = readModuleFields(roots, module);
  if (!report.ok) {
    if (report.unreadable) {
      process.stderr.write(`Error: the module ${JSON.stringify(module)}: ${report.reason}.
`);
      return 1;
    }
    const lines2 = [`Error: --module ${JSON.stringify(module)} names no module: ${report.reason}.`];
    if (report.listing.length > 0) lines2.push("Modules:", ...report.listing);
    process.stderr.write(`${lines2.join("\n")}
`);
    return 2;
  }
  const { ok: _ok, ...answer } = report;
  if (flags.has("--json")) {
    process.stdout.write(`${JSON.stringify(answer)}
`);
    return 0;
  }
  const lines = [`${answer.module} (${answer.shape}): ${answer.directory}`];
  if (answer.note) lines.push(answer.note);
  lines.push(...fieldLines(answer.fields, 0));
  process.stdout.write(`${lines.join("\n")}
`);
  return 0;
}
__name(runFieldsCommand, "runFieldsCommand");
var METADATA_FLAGS = {
  "--theme-root": "value",
  "--parent-theme-root": "value",
  "--json": "boolean",
  "--help": "boolean"
};
async function runMetadataCommand(args2) {
  const flags = withUsage("metadata", () => {
    const parsed = parseFlags(args2, METADATA_FLAGS);
    if (!parsed.has("--help")) requiredFlag(parsed, "--theme-root");
    return parsed;
  });
  if (typeof flags === "number") return flags;
  if (flags.has("--help")) {
    process.stdout.write(commandHelp("metadata"));
    return 0;
  }
  const roots = themeRoots(flags);
  if (!roots) return 1;
  const metadata = await readThemeMetadata(roots);
  if (flags.has("--json")) {
    process.stdout.write(`${JSON.stringify(metadata)}
`);
    return 0;
  }
  const lines = [
    `Presets: ${metadata.presets.join(", ")} (default ${metadata.defaultPreset})`,
    `Surfaces: ${metadata.surfaces.join(", ") || "none"}`,
    `Settings keys (${metadata.settingsKeys.length}):`,
    ...metadata.settingsKeys.map((key) => `  ${key}`)
  ];
  process.stdout.write(`${lines.join("\n")}
`);
  return 0;
}
__name(runMetadataCommand, "runMetadataCommand");
function runCompareCommand(args2) {
  return runCompare(args2, {
    stdout: /* @__PURE__ */ __name((text) => process.stdout.write(text), "stdout"),
    stderr: /* @__PURE__ */ __name((text) => process.stderr.write(text), "stderr"),
    help: commandHelp("compare")
  });
}
__name(runCompareCommand, "runCompareCommand");
var SERVE_FLAGS = {
  "--theme-root": "value",
  "--parent-theme-root": "value",
  "--port": "value",
  "--fixtures": "value",
  "--help": "boolean"
};
async function runServeCommand(args2) {
  const parsed = withUsage("serve", () => {
    const flags2 = parseFlags(args2, SERVE_FLAGS);
    let port2 = DEFAULT_SERVE_PORT;
    if (flags2.has("--help")) return { flags: flags2, port: port2 };
    requiredFlag(flags2, "--theme-root");
    const portArg = stringFlag(flags2, "--port");
    if (portArg !== void 0) {
      if (!/^\d{1,5}$/.test(portArg) || Number(portArg) > 65535) {
        throw new UsageError(`--port expects a whole number from 0 to 65535, got ${JSON.stringify(portArg)}`);
      }
      port2 = Number(portArg);
    }
    return { flags: flags2, port: port2 };
  });
  if (typeof parsed === "number") return parsed;
  const { flags, port } = parsed;
  if (flags.has("--help")) {
    process.stdout.write(commandHelp("serve"));
    return 0;
  }
  const roots = themeRoots(flags);
  if (!roots) return 1;
  const fixturesArg = stringFlag(flags, "--fixtures");
  let fixturesDir;
  if (fixturesArg !== void 0) {
    const resolved = readableDirectory("--fixtures", fixturesArg);
    if (!resolved) return 1;
    fixturesDir = resolved;
  }
  try {
    const server = await startPreviewServer({ ...roots, port, ...fixturesDir ? { fixturesDir } : {} });
    process.stdout.write(`Preview: ${server.url}
`);
    return null;
  } catch (err) {
    const code = err?.code;
    if (code === "EADDRINUSE") {
      process.stderr.write(`Error: port ${port} is already in use on ${SERVE_HOST}. Try --port ${port + 1}.
`);
    } else {
      const message = err instanceof Error ? err.message : String(err);
      process.stderr.write(`Error: could not listen on ${SERVE_HOST}:${port}: ${message}
`);
    }
    return 1;
  }
}
__name(runServeCommand, "runServeCommand");

// src/cli.ts
var USAGE = [
  "Usage:",
  "  cli.ts generate-css --theme-root <path> [--preset <name>] [--output <path>]",
  "  cli.ts validate --theme-root <path> [--parent-theme-root <path>] [--json]",
  "                  [--max-warnings <n>] [--max-files <n>]"
].join("\n");
function resolveThemeRoot(args2) {
  const idx = args2.indexOf("--theme-root");
  if (idx !== -1 && args2[idx + 1]) return path8.resolve(args2[idx + 1]);
  if (process.env.THEME_ROOT) return path8.resolve(process.env.THEME_ROOT);
  console.error("Error: --theme-root <path> is required (or set THEME_ROOT env var)");
  process.exit(1);
}
__name(resolveThemeRoot, "resolveThemeRoot");
function optionValue(args2, flag) {
  const idx = args2.indexOf(flag);
  if (idx === -1) return void 0;
  const value = args2[idx + 1];
  if (value === void 0 || value.startsWith("--")) {
    console.error(`Error: ${flag} expects a value.`);
    process.exit(1);
  }
  return value;
}
__name(optionValue, "optionValue");
var args = process.argv.slice(2);
var command = args[0];
var COMMANDS = /* @__PURE__ */ new Set(["generate-css", "validate", "render", "serve", "templates", "list", "fixtures", "fields", "metadata", "compare"]);
function settle(run) {
  Promise.resolve().then(run).then(
    (code) => {
      process.exitCode = code;
    },
    (err) => {
      console.error(err instanceof Error ? err.message : String(err));
      process.exitCode = 1;
    }
  );
}
__name(settle, "settle");
if (COMMANDS.has(command) && args.slice(1).some((arg) => arg === "--help" || command === "compare" && arg === "-h")) {
  process.stdout.write(commandHelp(command) ?? HELP_TEXT);
} else if (command === "help") {
  process.exitCode = runHelpCommand(args.slice(1));
} else if (command === "generate-css") {
  const THEME_ROOT = resolveThemeRoot(args);
  const presetIdx = args.indexOf("--preset");
  const presetName = presetIdx !== -1 ? args[presetIdx + 1] : "default";
  const outputIdx = args.indexOf("--output");
  const outputPath = outputIdx !== -1 ? path8.resolve(args[outputIdx + 1]) : path8.resolve("resolved-theme.css");
  const fieldsJsonPath = path8.join(THEME_ROOT, "fields.json");
  const cssDir = path8.join(THEME_ROOT, "assets", "_hs", "css");
  if (!fs3.existsSync(fieldsJsonPath)) {
    console.error(`fields.json not found at ${fieldsJsonPath}`);
    process.exit(1);
  }
  const fieldsJson = JSON.parse(fs3.readFileSync(fieldsJsonPath, "utf-8"));
  const theme = resolveThemeSettings(fieldsJson);
  console.log("Resolved theme settings.");
  console.log(`Rendering CSS from ${cssDir}...`);
  const cssDiagnostics = renderThemeCssToFile({ theme, cssDir, presetName }, outputPath);
  console.log(`Wrote resolved CSS to ${outputPath}`);
  for (const entry of cssDiagnostics) {
    console.warn(`  ${entry.code}: ${entry.message}`);
  }
} else if (command === "validate") {
  const THEME_ROOT = resolveThemeRoot(args);
  if (!fs3.existsSync(THEME_ROOT)) {
    console.error(`Theme root not found: ${THEME_ROOT}`);
    process.exit(1);
  }
  const parentRootArg = optionValue(args, "--parent-theme-root");
  const maxWarningsArg = optionValue(args, "--max-warnings");
  if (maxWarningsArg !== void 0 && !/^\d+$/.test(maxWarningsArg)) {
    console.error(`Error: --max-warnings expects a non-negative integer, got ${JSON.stringify(maxWarningsArg)}`);
    process.exit(1);
  }
  const maxWarnings = maxWarningsArg === void 0 ? Infinity : Number(maxWarningsArg);
  const maxFilesArg = optionValue(args, "--max-files");
  if (maxFilesArg !== void 0 && !/^[1-9]\d*$/.test(maxFilesArg)) {
    console.error(`Error: --max-files expects a positive integer, got ${JSON.stringify(maxFilesArg)}`);
    process.exit(1);
  }
  const result = validateTheme({
    themeRoot: THEME_ROOT,
    parentThemeRoot: parentRootArg ? path8.resolve(parentRootArg) : void 0,
    maxFiles: maxFilesArg === void 0 ? void 0 : Number(maxFilesArg)
  });
  if (args.includes("--json")) {
    console.log(JSON.stringify({
      themeRoot: THEME_ROOT,
      filesScanned: result.filesScanned,
      truncated: result.truncated,
      counts: result.counts,
      diagnostics: result.diagnostics.map((entry) => ({
        code: entry.code,
        severity: severityOf(entry),
        message: entry.message,
        details: entry.details ?? {}
      }))
    }, null, 2));
  } else {
    console.log(formatValidationReport(result, { themeRoot: THEME_ROOT }));
  }
  if (result.counts.error > 0 || result.counts.warning > maxWarnings || result.truncated) {
    process.exit(1);
  }
} else if (command === "render") {
  process.stdout.on("error", (err) => {
    if (err.code !== "EPIPE") throw err;
  });
  runRenderCommand(args.slice(1)).then(
    (code) => {
      process.exitCode = code;
    },
    (err) => {
      console.error(err instanceof Error ? err.message : String(err));
      process.exitCode = 1;
    }
  );
} else if (command === "templates") {
  process.exitCode = runTemplatesCommand(args.slice(1));
} else if (command === "list") {
  process.exitCode = runListCommand(args.slice(1));
} else if (command === "fixtures") {
  process.exitCode = runFixturesCommand(args.slice(1));
} else if (command === "fields") {
  process.exitCode = runFieldsCommand(args.slice(1));
} else if (command === "metadata") {
  settle(() => runMetadataCommand(args.slice(1)));
} else if (command === "compare") {
  settle(() => runCompareCommand(args.slice(1)));
} else if (command === "serve") {
  runServeCommand(args.slice(1)).then(
    (code) => {
      if (code !== null) process.exitCode = code;
    },
    (err) => {
      console.error(err instanceof Error ? err.message : String(err));
      process.exitCode = 1;
    }
  );
} else if (command === "--help" && args.length === 1) {
  process.stdout.write(HELP_TEXT);
} else if (command === "--version" && args.length === 1) {
  process.stdout.write(`${RENDERER_VERSION}
`);
} else {
  console.error(`Unknown command: ${command}`);
  console.error(USAGE);
  process.exit(1);
}
