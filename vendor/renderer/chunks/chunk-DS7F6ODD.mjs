import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
import {
  CRM_OBJECT_FIXTURE_DIRECTORY,
  TEMPLATE_SEARCH_SUBDIRECTORIES,
  activeForeignRoot,
  buildSearchPaths,
  createProvenanceContext,
  createThemeAssetResolver,
  currentProvenanceFile,
  foreignAssetReference,
  loadCrmObjectFixture,
  loadFixture,
  locateTemplate,
  moduleInstanceName,
  modulePlaceholder,
  provenanceAttributes,
  provenanceFileFor,
  resolveInThemeCascade,
  resolveModuleDir,
  resolveProjectPath,
  resolveThemeRoots,
  routeModuleRender,
  routeModuleRenderWithProvenance,
  stampFirstElement,
  structuralProvenance,
  themeRelativeDirectory,
  withForeignRoot,
  withProvenanceDndArea,
  withProvenanceFile
} from "./chunk-ZOOMNTJN.mjs";
import {
  HostFsLoader,
  SET_TARGET,
  colorVariant,
  convertRgb,
  createGetAssetUrlGlobal,
  createGetAssetVersionGlobal,
  endOfStringLiteral,
  normalizeHublOperators,
  parenthesiseNestedDictLiterals
} from "./chunk-ZH4AFS5M.mjs";
import {
  DIAGNOSTIC_CODES,
  ScopeCssExtension,
  diagnostic,
  escapeJavaScriptString,
  escapeJinjavaBraces,
  fileSizeFormat,
  formatJavaDatePattern,
  formatNamedDateStyle,
  formatNumberForLocale,
  formatTimeComponent,
  logarithm,
  md5,
  nthRoot,
  parseHublDateTime,
  toFiniteNumber,
  unescapeHtmlEntities,
  urlDecode,
  wordWrap
} from "./chunk-W5TSNL56.mjs";
import {
  require_nunjucks
} from "./chunk-RZIZEC7B.mjs";
import {
  abandonLayoutPartial,
  addLayoutModule,
  closeLayoutFrame,
  createLayoutCollector,
  createPageBindingState,
  gapCardText,
  gapThemeLabel,
  gridNumber,
  isHubspotModulePath,
  isPlainRecord,
  layoutAreaFrame,
  layoutCssClass,
  layoutModuleParams,
  layoutOffset,
  layoutSectionsOf,
  layoutStyles,
  layoutWidth,
  lookupModuleInfo,
  moduleNodeProps,
  openLayoutArea,
  openLayoutColumn,
  openLayoutPartial,
  openLayoutRow,
  openLayoutSection,
  pageContentFields,
  portalModulePath,
  renderPageArea,
  resolvePageModule,
  routedModuleGap,
  safeInstanceName,
  singleRootThemeRoots,
  unresolvedGapReason,
  widgetProps
} from "./chunk-SECO6OCJ.mjs";
import {
  MENU_LINK_UNSAFE_FILTER,
  defaultModuleDisplayName,
  defaultModulePlaceholderSource,
  isSourceFramedDefaultModule,
  isUnsafeMenuLinkUrl
} from "./chunk-7ICA6BQD.mjs";
import {
  RendererError,
  hostFs,
  resolveSafePath
} from "./chunk-TILBP2YO.mjs";
import {
  __name,
  __toESM
} from "./chunk-PPQVNGDG.mjs";

// src/hubl-engine.ts
var import_nunjucks = __toESM(require_nunjucks(), 1);
import path from "path";

// src/hubl-content-values.ts
var BLOG_POST_WRAPPER_MARKER_SOURCE = String.raw`\{%-?\s*(?:end_)?blog_post_wrapper\s*-?%\}`;
var ANY_BLOG_POST_WRAPPER_MARKER = new RegExp(BLOG_POST_WRAPPER_MARKER_SOURCE, "g");
var LEADING_BLOG_POST_WRAPPER_MARKER = new RegExp(`^(\\s*${BLOG_POST_WRAPPER_MARKER_SOURCE})`);
function wrapMetaFieldHtml(field, cosType, body) {
  const id = field.replace(/[^\w-]/g, "");
  return `<span id="hs_cos_wrapper_${id}" class="hs_cos_wrapper hs_cos_wrapper_meta_field hs_cos_wrapper_type_${cosType}" style="" data-hs-cos-general-type="meta_field" data-hs-cos-type="${cosType}">${body}</span>`;
}
__name(wrapMetaFieldHtml, "wrapMetaFieldHtml");
var META_FIELD = /* @__PURE__ */ Symbol("themespot.metaField");
var HublMetaFieldText = class extends String {
  static {
    __name(this, "HublMetaFieldText");
  }
  constructor(raw, field, cosType = "text") {
    super(raw);
    Object.defineProperty(this, META_FIELD, { value: { field, cosType }, enumerable: false });
  }
  get field() {
    return this[META_FIELD].field;
  }
  get cosType() {
    return this[META_FIELD].cosType;
  }
  get raw() {
    return String.prototype.valueOf.call(this);
  }
  toString() {
    return this.raw;
  }
  valueOf() {
    return this.raw;
  }
  printed() {
    return wrapMetaFieldHtml(this.field, this.cosType, this.raw.replace(ANY_BLOG_POST_WRAPPER_MARKER, ""));
  }
  serialised() {
    const raw = this.raw;
    const marker = LEADING_BLOG_POST_WRAPPER_MARKER.exec(raw);
    if (!marker) return wrapMetaFieldHtml(this.field, this.cosType, raw);
    return marker[1] + wrapMetaFieldHtml(this.field, this.cosType, raw.slice(marker[0].length));
  }
  toJSON() {
    return this.serialised();
  }
};
function plainHublValue(value) {
  return value instanceof HublMetaFieldText ? value.raw : value;
}
__name(plainHublValue, "plainHublValue");
function wrapMetaFieldValue(value, field, cosType = "text") {
  if (value instanceof HublMetaFieldText) return value;
  if (typeof value !== "string" || value.length === 0) return value;
  return new HublMetaFieldText(value, field, cosType);
}
__name(wrapMetaFieldValue, "wrapMetaFieldValue");
var WRAPPED_CONTENT_FIELDS = {
  name: "text",
  post_summary: "text",
  post_body: "rich_text"
};
function withBlogAuthorAlias(post) {
  if (post.blog_author !== void 0 || post.blog_post_author === void 0) return post;
  return { ...post, blog_author: post.blog_post_author };
}
__name(withBlogAuthorAlias, "withBlogAuthorAlias");
function topicId(slugOrName) {
  let hash = 2166136261;
  for (let i = 0; i < slugOrName.length; i++) {
    hash ^= slugOrName.charCodeAt(i);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return 4e11 + hash;
}
__name(topicId, "topicId");
function slugOf(name) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
__name(slugOf, "slugOf");
function normaliseTopicList(list) {
  if (!Array.isArray(list)) return [];
  return list.map((entry) => {
    if (typeof entry === "string") {
      const slug = slugOf(entry);
      return { id: topicId(slug || entry), name: entry, slug };
    }
    if (entry && typeof entry === "object") {
      const topic = entry;
      if (topic.id !== void 0 && topic.id !== null) return { ...topic };
      const key = String(topic.slug ?? topic.name ?? "");
      return { ...topic, id: topicId(key) };
    }
    return { id: topicId(String(entry)), name: String(entry), slug: slugOf(String(entry)) };
  });
}
__name(normaliseTopicList, "normaliseTopicList");
function toPostBean(post, options = {}) {
  const bean = { ...post };
  if ("topic_list" in post || !("tag_list" in post)) bean.topic_list = normaliseTopicList(post.topic_list);
  if ("tag_list" in post) bean.tag_list = normaliseTopicList(post.tag_list);
  Object.defineProperty(bean, "toJSON", {
    enumerable: false,
    value() {
      return serialisePostBean(this, options);
    }
  });
  return bean;
}
__name(toPostBean, "toPostBean");
function serialisePostBean(bean, options) {
  const out = { ...bean };
  const htmlTitle = bean.html_title;
  if (htmlTitle !== void 0 && htmlTitle !== null && String(htmlTitle) !== "") {
    out.title = htmlTitle;
  } else {
    const name = String(plainHublValue(bean.name ?? bean.label ?? ""));
    out.title = name ? `${name} | ${options.blogTitle || "Blog"}` : "";
  }
  out.topic_list = normaliseTopicList(bean.topic_list).map((topic) => topic.id);
  if ("tag_list" in bean) out.tag_list = normaliseTopicList(bean.tag_list).map((topic) => topic.id);
  return out;
}
__name(serialisePostBean, "serialisePostBean");
function bindContentBean(content, options) {
  const base = options.postBean ? toPostBean(withBlogAuthorAlias(content), { blogTitle: options.blogTitle }) : { ...content };
  for (const [field, cosType] of Object.entries(WRAPPED_CONTENT_FIELDS)) {
    if (field in base) base[field] = wrapMetaFieldValue(base[field], field, cosType);
  }
  return base;
}
__name(bindContentBean, "bindContentBean");
var PRINTING_INSTALLED = /* @__PURE__ */ Symbol.for("themespot.metaFieldPrinting");
function installMetaFieldPrinting(runtime) {
  const target = runtime;
  if (!target || target[PRINTING_INSTALLED]) return;
  const original = target.suppressValue;
  target.suppressValue = /* @__PURE__ */ __name(function suppressMetaFieldValue(value, autoescape) {
    return original.call(this, value instanceof HublMetaFieldText ? value.printed() : value, autoescape);
  }, "suppressMetaFieldValue");
  target[PRINTING_INSTALLED] = true;
}
__name(installMetaFieldPrinting, "installMetaFieldPrinting");

// src/hubl-engine.ts
var PREVIEW_BLOG_ROOT = "/blog";
var dndArgsStore = /* @__PURE__ */ new Map();
var dndArgsCounter = 0;
var dndArgsCallers = /* @__PURE__ */ new Map();
function resetDndArgsStore() {
  dndArgsStore.clear();
  dndArgsCallers.clear();
  dndArgsCounter = 0;
}
__name(resetDndArgsStore, "resetDndArgsStore");
function preprocessHublFromFile(template, file, callerDir, callerRoot) {
  const first = dndArgsCounter + 1;
  const preprocessed = preprocessHubl(template, callerDir, callerRoot);
  if (file) {
    for (let index = first; index <= dndArgsCounter; index++) dndArgsCallers.set(index, file);
  }
  return preprocessed;
}
__name(preprocessHublFromFile, "preprocessHublFromFile");
function themeRelativeFile(filePath, roots) {
  const dir = themeRelativeDirectory(filePath, roots);
  if (dir === null) return null;
  const base = path.basename(filePath);
  return dir ? `${dir}/${base}` : base;
}
__name(themeRelativeFile, "themeRelativeFile");
function findTopLevelKeywordPositions(expr, keywords) {
  const hits = [];
  const isWord = /* @__PURE__ */ __name((c) => /[A-Za-z0-9_$]/.test(c), "isWord");
  let i = 0;
  let depth = 0;
  let quote = null;
  while (i < expr.length) {
    const c = expr[i];
    if (quote) {
      if (c === "\\" && i + 1 < expr.length) {
        i += 2;
        continue;
      }
      if (c === quote) quote = null;
      i++;
      continue;
    }
    if (c === '"' || c === "'") {
      quote = c;
      i++;
      continue;
    }
    if (c === "(" || c === "[" || c === "{") {
      depth++;
      i++;
      continue;
    }
    if (c === ")" || c === "]" || c === "}") {
      depth--;
      i++;
      continue;
    }
    if (depth === 0) {
      const prev = i === 0 ? " " : expr[i - 1];
      if (!isWord(prev)) {
        let matched = false;
        for (const kw of keywords) {
          if (expr.startsWith(kw, i) && (i + kw.length === expr.length || !isWord(expr[i + kw.length]))) {
            hits.push({ keyword: kw, pos: i, len: kw.length });
            i += kw.length;
            matched = true;
            break;
          }
        }
        if (matched) continue;
      }
    }
    i++;
  }
  return hits;
}
__name(findTopLevelKeywordPositions, "findTopLevelKeywordPositions");
function wrapChainedTernaries(expr) {
  const tokens = findTopLevelKeywordPositions(expr, ["if", "else"]);
  const ifCount = tokens.filter((t) => t.keyword === "if").length;
  if (ifCount < 2) return expr;
  const firstElse = tokens.find((t) => t.keyword === "else");
  if (!firstElse) return expr;
  const splitAt = firstElse.pos + firstElse.len;
  const before = expr.slice(0, splitAt);
  const after = expr.slice(splitAt);
  const afterTokens = findTopLevelKeywordPositions(after, ["if"]);
  if (afterTokens.length < 1) return expr;
  const trailing = after.replace(/^(\s*)/, "");
  const leadingWs = after.slice(0, after.length - trailing.length);
  const innerWrapped = wrapChainedTernaries(trailing.trimEnd());
  const trailingWs = trailing.length > trailing.trimEnd().length ? trailing.slice(trailing.trimEnd().length) : "";
  return `${before}${leadingWs}(${innerWrapped})${trailingWs}`;
}
__name(wrapChainedTernaries, "wrapChainedTernaries");
var SET_ASSIGNMENT_HEAD = String.raw`\{%-?\s*set\s+${SET_TARGET}(?:\s*,\s*${SET_TARGET})*\s*=(?!=)\s*`;
function normalizeChainedTernaries(template) {
  let out = template.replace(
    /\{\{([\s\S]*?)\}\}/g,
    (_match, body) => `{{${wrapChainedTernaries(body)}}}`
  );
  out = out.replace(
    new RegExp(`(${SET_ASSIGNMENT_HEAD})([\\s\\S]*?)(\\s*-?%\\})`, "g"),
    (_match, head, value, tail) => `${head}${wrapChainedTernaries(value)}${tail}`
  );
  return out;
}
__name(normalizeChainedTernaries, "normalizeChainedTernaries");
var ABSENT_OPERAND_SEED = {
  "~": "''",
  "+": "0",
  "-": "0",
  "*": "0",
  "/": "0",
  "%": "0"
};
function guardAbsentOperand(name, operator) {
  return `(${name} if ${name} is not none else ${ABSENT_OPERAND_SEED[operator]})`;
}
__name(guardAbsentOperand, "guardAbsentOperand");
function normalizeSelfReferentialAccumulators(template) {
  return template.replace(
    /(\{%-?\s*set\s+)([A-Za-z_][A-Za-z0-9_]*)(\s*=(?!=)\s*)\2(\s*)([+\-*/%~])/g,
    (_match, head, name, equals, gap, operator) => `${head}${name}${equals}${guardAbsentOperand(name, operator)}${gap}${operator}`
  );
}
__name(normalizeSelfReferentialAccumulators, "normalizeSelfReferentialAccumulators");
var HUBL_REGION_SOURCE = String.raw`(\{\{-?|\{%-?)([\s\S]*?)(-?\}\}|-?%\})`;
var MACRO_SIGNATURE_SOURCE = String.raw`\{%-?\s*macro\s+[A-Za-z_$][\w$]*\s*\(([^)]*)\)\s*-?%\}`;
var MACRO_BOUNDARY_SOURCE = String.raw`\{%-?\s*(macro|endmacro)\b[\s\S]*?-?%\}`;
var OPERAND_CHARS = new Set(Object.keys(ABSENT_OPERAND_SEED));
function omittableMacroParameters(signature) {
  const names = [];
  let depth = 0;
  let start = 0;
  let i = 0;
  const take = /* @__PURE__ */ __name((raw) => {
    const name = /^\s*([A-Za-z_$][\w$]*)\s*$/.exec(raw);
    if (name) names.push(name[1]);
  }, "take");
  while (i < signature.length) {
    const ch = signature[i];
    if (ch === '"' || ch === "'") {
      i = endOfStringLiteral(signature, i);
      continue;
    }
    if (ch === "(" || ch === "[" || ch === "{") {
      depth++;
      i++;
      continue;
    }
    if (ch === ")" || ch === "]" || ch === "}") {
      depth--;
      i++;
      continue;
    }
    if (depth === 0 && ch === ",") {
      take(signature.slice(start, i));
      start = i + 1;
    }
    i++;
  }
  take(signature.slice(start));
  return names;
}
__name(omittableMacroParameters, "omittableMacroParameters");
function macroParameterScopes(template) {
  const scopes = [];
  const signatures = new RegExp(MACRO_SIGNATURE_SOURCE, "g");
  let signature;
  while ((signature = signatures.exec(template)) !== null) {
    const params = omittableMacroParameters(signature[1]);
    if (params.length === 0) continue;
    const bodyStart = signature.index + signature[0].length;
    const boundaries = new RegExp(MACRO_BOUNDARY_SOURCE, "g");
    boundaries.lastIndex = bodyStart;
    let depth = 0;
    let boundary;
    while ((boundary = boundaries.exec(template)) !== null) {
      if (boundary[1] === "macro") {
        depth++;
        continue;
      }
      if (depth > 0) {
        depth--;
        continue;
      }
      scopes.push({ start: bodyStart, end: boundary.index, params });
      break;
    }
  }
  return scopes;
}
__name(macroParameterScopes, "macroParameterScopes");
function normalizeMacroParameterOperands(template) {
  const scopes = macroParameterScopes(template);
  if (scopes.length === 0) return template;
  const edits = /* @__PURE__ */ new Map();
  for (const scope of scopes) {
    const params = new Set(scope.params);
    const regions = new RegExp(HUBL_REGION_SOURCE, "g");
    regions.lastIndex = scope.start;
    let region;
    while ((region = regions.exec(template)) !== null) {
      if (region.index >= scope.end) break;
      const body = region[2];
      const base = region.index + region[1].length;
      let i = 0;
      while (i < body.length) {
        const ch = body[i];
        if (ch === '"' || ch === "'") {
          i = endOfStringLiteral(body, i);
          continue;
        }
        if (!/[A-Za-z_$]/.test(ch) || i > 0 && /[\w$.]/.test(body[i - 1])) {
          i++;
          continue;
        }
        let end = i;
        while (end < body.length && /[\w$]/.test(body[end])) end++;
        const name = body.slice(i, end);
        if (!params.has(name)) {
          i = end;
          continue;
        }
        if (precededByFilterPipe(body, i)) {
          i = end;
          continue;
        }
        const operator = adjacentOperator(body, i, end);
        if (operator) {
          edits.set(base + i, { length: name.length, text: guardAbsentOperand(name, operator) });
        }
        i = end;
      }
    }
  }
  if (edits.size === 0) return template;
  let out = "";
  let cursor = 0;
  for (const position of [...edits.keys()].sort((a, b) => a - b)) {
    const edit = edits.get(position);
    out += template.slice(cursor, position) + edit.text;
    cursor = position + edit.length;
  }
  return out + template.slice(cursor);
}
__name(normalizeMacroParameterOperands, "normalizeMacroParameterOperands");
function precededByFilterPipe(body, start) {
  let i = start - 1;
  while (i >= 0 && /\s/.test(body[i])) i--;
  return i >= 0 && body[i] === "|";
}
__name(precededByFilterPipe, "precededByFilterPipe");
function adjacentOperator(body, start, end) {
  if (body[end] === "." || body[end] === "[" || body[end] === "(") return null;
  let after = end;
  while (after < body.length && /\s/.test(body[after])) after++;
  if (OPERAND_CHARS.has(body[after])) {
    const rest = body.slice(after + 1).trim();
    if (rest !== "") return body[after];
  }
  let before = start - 1;
  while (before >= 0 && /\s/.test(body[before])) before--;
  if (before >= 0 && OPERAND_CHARS.has(body[before])) return body[before];
  return null;
}
__name(adjacentOperator, "adjacentOperator");
var INTERPOLATION_FILTER = "_themespot_interp";
function decodeStringLiteralEscapes(raw) {
  return raw.replace(
    /\\([\s\S])/g,
    (_match, ch) => ch === "n" ? "\n" : ch === "t" ? "	" : ch === "r" ? "\r" : ch
  );
}
__name(decodeStringLiteralEscapes, "decodeStringLiteralEscapes");
function liftStringInterpolations(inner) {
  const pattern = /\{\{([\s\S]*?)\}\}/g;
  const parts = [];
  let last = 0;
  let match;
  while ((match = pattern.exec(inner)) !== null) {
    if (match.index > last) {
      parts.push(JSON.stringify(decodeStringLiteralEscapes(inner.slice(last, match.index))));
    }
    const body = match[1].trim();
    parts.push(body === "" ? '""' : `(${body}|${INTERPOLATION_FILTER})`);
    last = match.index + match[0].length;
  }
  if (parts.length === 0) return null;
  if (last < inner.length) {
    parts.push(JSON.stringify(decodeStringLiteralEscapes(inner.slice(last))));
  }
  return `(${parts.join(" + ")})`;
}
__name(liftStringInterpolations, "liftStringInterpolations");
function normalizeSetInterpolations(template) {
  return template.replace(
    new RegExp(`(${SET_ASSIGNMENT_HEAD})([\\s\\S]*?)(\\s*-?%\\})`, "g"),
    (match, head, value, tail) => {
      let out = "";
      let i = 0;
      let changed = false;
      while (i < value.length) {
        const ch = value[i];
        if (ch !== '"' && ch !== "'") {
          out += ch;
          i++;
          continue;
        }
        const end = endOfStringLiteral(value, i);
        const inner = value.slice(i + 1, end - 1);
        const lifted = inner.includes("{{") ? liftStringInterpolations(inner) : null;
        if (lifted === null) {
          out += value.slice(i, end);
        } else {
          out += lifted;
          changed = true;
        }
        i = end;
      }
      return changed ? `${head}${out}${tail}` : match;
    }
  );
}
__name(normalizeSetInterpolations, "normalizeSetInterpolations");
function normalizeUnlessBlocks(template) {
  return template.replace(
    /(\{%-?)\s*unless\s+([\s\S]*?)(-?%\})/g,
    (_match, open, condition, close) => `${open} if not (${condition.trim()}) ${close}`
  ).replace(
    /(\{%-?)\s*endunless\s*(-?%\})/g,
    (_match, open, close) => `${open} endif ${close}`
  );
}
__name(normalizeUnlessBlocks, "normalizeUnlessBlocks");
function endOfLiteralArgument(expr, start) {
  const ch = expr[start];
  if (ch === '"' || ch === "'") return endOfStringLiteral(expr, start);
  const rest = expr.slice(start);
  const literal = /^(?:-?\d+(?:\.\d+)?|true|false|none|null|True|False|None)\b/.exec(rest);
  return literal ? start + literal[0].length : start;
}
__name(endOfLiteralArgument, "endOfLiteralArgument");
function parenthesiseTestArguments(expr) {
  let out = "";
  let i = 0;
  while (i < expr.length) {
    const ch = expr[i];
    if (ch === '"' || ch === "'") {
      const end = endOfStringLiteral(expr, i);
      out += expr.slice(i, end);
      i = end;
      continue;
    }
    const precedingIsWord = i > 0 && /[\w$.]/.test(expr[i - 1]);
    if (!precedingIsWord) {
      const match = /^is\s+(not\s+)?([A-Za-z_][A-Za-z0-9_]*)\s+/.exec(expr.slice(i));
      if (match) {
        const argStart = i + match[0].length;
        const argEnd = endOfLiteralArgument(expr, argStart);
        if (argEnd > argStart) {
          out += `is ${match[1] ? "not " : ""}${match[2]}(${expr.slice(argStart, argEnd)})`;
          i = argEnd;
          continue;
        }
      }
    }
    out += ch;
    i++;
  }
  return out;
}
__name(parenthesiseTestArguments, "parenthesiseTestArguments");
function normalizeTestArguments(template) {
  return template.replace(
    /(\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\})/g,
    (region) => parenthesiseTestArguments(region)
  );
}
__name(normalizeTestArguments, "normalizeTestArguments");
function stripTrailingLiteralCommas(region) {
  if (!region.includes(",")) return region;
  let out = "";
  let i = 0;
  while (i < region.length) {
    const ch = region[i];
    if (ch === '"' || ch === "'") {
      const end = endOfStringLiteral(region, i);
      out += region.slice(i, end);
      i = end;
      continue;
    }
    if (ch === ",") {
      let j = i + 1;
      while (j < region.length && /\s/.test(region[j])) j++;
      if (region[j] === "}" || region[j] === "]") {
        i += 1;
        continue;
      }
    }
    out += ch;
    i += 1;
  }
  return out;
}
__name(stripTrailingLiteralCommas, "stripTrailingLiteralCommas");
function normalizeTrailingLiteralCommas(template) {
  return template.replace(/(\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\})/g, (region) => stripTrailingLiteralCommas(region));
}
__name(normalizeTrailingLiteralCommas, "normalizeTrailingLiteralCommas");
function normalizePrintInterpolations(template) {
  if (!template.includes("{{")) return template;
  let out = "";
  let i = 0;
  while (i < template.length) {
    const start = template.indexOf("{{", i);
    if (start === -1) {
      out += template.slice(i);
      break;
    }
    out += template.slice(i, start);
    let j = start + 2;
    let quote = null;
    let end = -1;
    while (j < template.length) {
      const c = template[j];
      if (quote) {
        if (c === "\\") {
          j += 2;
          continue;
        }
        if (c === quote) quote = null;
        j++;
        continue;
      }
      if (c === '"' || c === "'") {
        quote = c;
        j++;
        continue;
      }
      if (c === "}" && template[j + 1] === "}") {
        end = j;
        break;
      }
      if (c === "{" && template[j + 1] === "%") break;
      j++;
    }
    if (end === -1) {
      out += "{{";
      i = start + 2;
      continue;
    }
    const body = template.slice(start + 2, end);
    out += body.includes("{{") ? `{{${liftInterpolationsInRegion(body)}}}` : `{{${body}}}`;
    i = end + 2;
  }
  return out;
}
__name(normalizePrintInterpolations, "normalizePrintInterpolations");
function liftInterpolationsInRegion(body) {
  let out = "";
  let i = 0;
  while (i < body.length) {
    const ch = body[i];
    if (ch !== '"' && ch !== "'") {
      out += ch;
      i++;
      continue;
    }
    const end = endOfStringLiteral(body, i);
    const inner = body.slice(i + 1, end - 1);
    const lifted = inner.includes("{{") ? liftStringInterpolations(inner) : null;
    out += lifted ?? body.slice(i, end);
    i = end;
  }
  return out;
}
__name(liftInterpolationsInRegion, "liftInterpolationsInRegion");
var PROTECTED_MASK_ROOT = "__themespot_protected_";
var PROTECTED_MASK_SUFFIX = "__";
var protectedMaskCounter = 0;
function nextProtectedMaskPrefix() {
  const salt = `${(++protectedMaskCounter).toString(36)}${Math.random().toString(36).slice(2, 8)}`;
  return `${PROTECTED_MASK_ROOT}${salt}_`;
}
__name(nextProtectedMaskPrefix, "nextProtectedMaskPrefix");
var PROTECTED_OPEN_PATTERN = /\{%-?\s*(raw|verbatim)\s*-?%\}/y;
function endOfHublComment(template, start) {
  const end = template.indexOf("#}", start + 2);
  return end === -1 ? -1 : end + 2;
}
__name(endOfHublComment, "endOfHublComment");
function endOfRawBlock(template, bodyStart, tagName) {
  const close = `end${tagName}`;
  const count = /* @__PURE__ */ __name((openPattern) => {
    const scan = new RegExp(`${openPattern}|\\{%\\s*(${close})\\s*%\\}`, "g");
    scan.lastIndex = bodyStart;
    let level = 1;
    let match;
    while ((match = scan.exec(template)) !== null) {
      level += match[1] === close ? -1 : 1;
      if (level === 0) return match.index + match[0].length;
    }
    return -1;
  }, "count");
  const permissive = count(`\\{%-?\\s*${tagName}\\s*-?%\\}`);
  return permissive === -1 ? count(`\\{%\\s*${tagName}\\s*%\\}`) : permissive;
}
__name(endOfRawBlock, "endOfRawBlock");
function maskProtectedRegions(template) {
  const regions = [];
  const prefix = nextProtectedMaskPrefix();
  if (!template.includes("{")) return { masked: template, regions, prefix };
  let out = "";
  let plain = 0;
  let i = 0;
  while (i < template.length) {
    if (template[i] !== "{") {
      i++;
      continue;
    }
    let end = -1;
    if (template[i + 1] === "#") {
      end = endOfHublComment(template, i);
    } else if (template[i + 1] === "%") {
      PROTECTED_OPEN_PATTERN.lastIndex = i;
      const open = PROTECTED_OPEN_PATTERN.exec(template);
      if (open !== null) end = endOfRawBlock(template, i + open[0].length, open[1]);
    }
    if (end === -1) {
      i++;
      continue;
    }
    out += template.slice(plain, i) + `${prefix}${regions.length}${PROTECTED_MASK_SUFFIX}`;
    regions.push(template.slice(i, end));
    plain = end;
    i = end;
  }
  return { masked: out + template.slice(plain), regions, prefix };
}
__name(maskProtectedRegions, "maskProtectedRegions");
function restoreProtectedRegions(template, mask) {
  if (mask.regions.length === 0) return template;
  const pattern = new RegExp(`${mask.prefix}(\\d+)${PROTECTED_MASK_SUFFIX}`, "g");
  return template.replace(pattern, (match, index) => mask.regions[Number(index)] ?? match);
}
__name(restoreProtectedRegions, "restoreProtectedRegions");
function storeTagArgs(raw, mask) {
  const index = ++dndArgsCounter;
  dndArgsStore.set(index, restoreProtectedRegions(raw, mask));
  return index;
}
__name(storeTagArgs, "storeTagArgs");
var MACRO_SCOPE_OPEN = "_themespot_macro_scope";
var MACRO_SCOPE_CLOSE = "_themespot_end_macro_scope";
var MACRO_SCOPE_CLOSERS = {
  endmacro: "macro",
  endcall: "call"
};
function scopeMacroBodies(template) {
  const boundary = /\{%(-?)\s*(macro|endmacro|call|endcall)\b([\s\S]*?)(-?)%\}/g;
  const open = [];
  const inserts = [];
  let match;
  while ((match = boundary.exec(template)) !== null) {
    const [tag, lead, keyword, , trail] = match;
    const opener = MACRO_SCOPE_CLOSERS[keyword];
    if (opener === void 0) {
      open.push(keyword);
      inserts.push({ at: match.index + tag.length, text: `{% ${MACRO_SCOPE_OPEN} ${trail}%}` });
      continue;
    }
    if (open.pop() !== opener) return template;
    inserts.push({ at: match.index, text: `{%${lead} ${MACRO_SCOPE_CLOSE} %}` });
  }
  if (open.length > 0 || inserts.length === 0) return template;
  let out = "";
  let cursor = 0;
  for (const insert of inserts) {
    out += template.slice(cursor, insert.at) + insert.text;
    cursor = insert.at;
  }
  return out + template.slice(cursor);
}
__name(scopeMacroBodies, "scopeMacroBodies");
var UNKNOWN_TAG_OPEN = "_themespot_unknown";
var UNKNOWN_TAG_CLOSE = "_themespot_end_unknown";
var SET_SYNC_TAG = "_themespot_set_sync";
var LOAD_TRANSLATIONS_BOUND_GLOBAL = "_themespot_load_translations_from";
var LOAD_TRANSLATIONS_ROOTED_GLOBAL = "_themespot_load_translations_in";
function translationRootKey(dir) {
  return dir.replace(/\\/g, "/");
}
__name(translationRootKey, "translationRootKey");
function owningExtraRoot(filePath, cascade, extraDirs) {
  if (extraDirs.length === 0) return null;
  const resolved = path.resolve(filePath);
  const holds = /* @__PURE__ */ __name((root) => {
    const relative = path.relative(root, resolved);
    return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
  }, "holds");
  let best = null;
  for (const dir of cascade.roots) {
    if (holds(dir) && (!best || dir.length > best.dir.length)) best = { dir, extra: false };
  }
  for (const dir of extraDirs) {
    if (holds(dir) && (!best || dir.length > best.dir.length)) best = { dir, extra: true };
  }
  return best?.extra ? best.dir : null;
}
__name(owningExtraRoot, "owningExtraRoot");
var NUNJUCKS_TAGS = [
  "raw",
  "verbatim",
  "if",
  "ifAsync",
  "for",
  "asyncEach",
  "asyncAll",
  "block",
  "extends",
  "include",
  "set",
  "macro",
  "call",
  "import",
  "from",
  "filter",
  "switch",
  "endraw",
  "endverbatim",
  "endif",
  "endfor",
  "endeach",
  "endall",
  "endblock",
  "endset",
  "endmacro",
  "endcall",
  "endfilter",
  "endswitch",
  "case",
  "default",
  "else",
  "elif",
  "elseif"
];
var PREPROCESSED_HUBL_TAGS = ["unless", "endunless", "do"];
var THEMESPOT_INTERNAL_TAGS = [
  SET_SYNC_TAG,
  MACRO_SCOPE_OPEN,
  MACRO_SCOPE_CLOSE,
  UNKNOWN_TAG_OPEN,
  UNKNOWN_TAG_CLOSE
];
var ENGINE_EXTENSION_TAGS = [
  "payment",
  "subscription",
  "dnd_area",
  "dnd_section",
  "dnd_column",
  "dnd_row",
  "dnd_module",
  "include_dnd_partial",
  "global_partial",
  "module_attribute",
  "require_css",
  "require_js",
  "require_head",
  "scope_css",
  "widget_block",
  "widget_attribute",
  "content_attribute",
  "module",
  "module_block",
  "raw_html"
];
var ENGINE_EXTENSION_END_TAGS = [
  "end_dnd_area",
  "end_dnd_section",
  "end_dnd_column",
  "end_dnd_row",
  "end_dnd_module",
  "end_module_attribute",
  "end_module_block",
  "end_widget_block",
  "end_widget_attribute",
  "end_content_attribute",
  "end_require_css",
  "end_require_js",
  "end_require_head",
  "end_scope_css"
];
var NUNJUCKS_BLOCK_OPENERS = [
  "if",
  "ifAsync",
  "for",
  "asyncEach",
  "asyncAll",
  "block",
  "macro",
  "call",
  "filter",
  "switch"
];
var NUNJUCKS_BLOCK_CLOSERS = [
  "endif",
  "endfor",
  "endeach",
  "endall",
  "endblock",
  "endset",
  "endmacro",
  "endcall",
  "endfilter",
  "endswitch"
];
var BLOCK_OPENER_TAGS = /* @__PURE__ */ new Set([
  ...NUNJUCKS_BLOCK_OPENERS,
  ...ENGINE_EXTENSION_END_TAGS.map((tag) => tag.slice("end_".length)),
  MACRO_SCOPE_OPEN
]);
var BLOCK_CLOSER_TAGS = /* @__PURE__ */ new Set([
  ...NUNJUCKS_BLOCK_CLOSERS,
  ...ENGINE_EXTENSION_END_TAGS,
  MACRO_SCOPE_CLOSE
]);
var BLOCK_BRANCH_TAGS = /* @__PURE__ */ new Set(["else", "elif", "elseif", "case", "default"]);
var knownHublTags = null;
function knownHublTagNames() {
  if (knownHublTags === null) {
    knownHublTags = /* @__PURE__ */ new Set([
      ...NUNJUCKS_TAGS,
      ...PREPROCESSED_HUBL_TAGS,
      ...THEMESPOT_INTERNAL_TAGS,
      ...ENGINE_EXTENSION_TAGS,
      ...ENGINE_EXTENSION_END_TAGS,
      ...FIELD_RENDER_WIDGET_TAGS
    ]);
  }
  return knownHublTags;
}
__name(knownHublTagNames, "knownHublTagNames");
function scanHublTags(template) {
  const pattern = /\{%-?\s*([A-Za-z_][A-Za-z0-9_]*)([\s\S]*?)-?%\}/g;
  const tags = [];
  let match;
  while ((match = pattern.exec(template)) !== null) {
    tags.push({
      start: match.index,
      end: match.index + match[0].length,
      name: match[1],
      args: match[2]
    });
  }
  return tags;
}
__name(scanHublTags, "scanHublTags");
function closesUnknownTag(name, opener) {
  return name === `end${opener}` || name === `end_${opener}`;
}
__name(closesUnknownTag, "closesUnknownTag");
function opensKnownBlock(tag) {
  if (tag.name === "set") return !tag.args.includes("=");
  return BLOCK_OPENER_TAGS.has(tag.name);
}
__name(opensKnownBlock, "opensKnownBlock");
function rewriteUnknownTags(template, mask) {
  const known = knownHublTagNames();
  const tags = scanHublTags(template);
  if (!tags.some((tag) => !known.has(tag.name))) return template;
  const closedBy = /* @__PURE__ */ new Map();
  const closers = /* @__PURE__ */ new Set();
  for (let i = 0; i < tags.length; i++) {
    if (known.has(tags[i].name) || closers.has(i)) continue;
    const opener = tags[i].name;
    let depth = 1;
    let blockDepth = 0;
    for (let j = i + 1; j < tags.length; j++) {
      const name = tags[j].name;
      if (blockDepth === 0 && BLOCK_BRANCH_TAGS.has(name)) break;
      if (opensKnownBlock(tags[j])) {
        blockDepth++;
        continue;
      }
      if (BLOCK_CLOSER_TAGS.has(name)) {
        if (blockDepth === 0) break;
        blockDepth--;
        continue;
      }
      if (known.has(name) || closers.has(j)) continue;
      if (name === opener) {
        depth++;
        continue;
      }
      if (!closesUnknownTag(name, opener)) continue;
      depth--;
      if (depth > 0) continue;
      if (blockDepth === 0) {
        closedBy.set(i, j);
        closers.add(j);
      }
      break;
    }
  }
  let out = "";
  let cursor = 0;
  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];
    if (known.has(tag.name)) continue;
    out += template.slice(cursor, tag.start);
    cursor = tag.end;
    if (closers.has(i)) {
      out += `{% ${UNKNOWN_TAG_CLOSE} %}`;
      continue;
    }
    const index = storeTagArgs(tag.args.trim(), mask);
    const isBlock = closedBy.has(i);
    out += `{% ${UNKNOWN_TAG_OPEN} "${tag.name}", ${index}, ${isBlock} %}`;
    if (!isBlock) out += `{% ${UNKNOWN_TAG_CLOSE} %}`;
  }
  return out + template.slice(cursor);
}
__name(rewriteUnknownTags, "rewriteUnknownTags");
var DO_APPEND_GLOBAL = "_themespot_do_append";
function bracketsBalanced(source) {
  let depth = 0;
  let i = 0;
  while (i < source.length) {
    const ch = source[i];
    if (ch === '"' || ch === "'") {
      i = endOfStringLiteral(source, i);
      continue;
    }
    if (ch === "(" || ch === "[" || ch === "{") depth++;
    else if (ch === ")" || ch === "]" || ch === "}") {
      depth--;
      if (depth < 0) return false;
    }
    i++;
  }
  return depth === 0;
}
__name(bracketsBalanced, "bracketsBalanced");
function guardAppendExpression(expr) {
  const call = /^([\s\S]+?)\.push\(([\s\S]*)\)$/.exec(expr.trim());
  if (call === null) return expr;
  const [, receiver, args] = call;
  if (!bracketsBalanced(receiver) || !bracketsBalanced(args)) return expr;
  return `${DO_APPEND_GLOBAL}(${receiver}, [${args}], ${JSON.stringify(receiver.trim())})`;
}
__name(guardAppendExpression, "guardAppendExpression");
var RECURSIVE_FOR_PREFIX = "_themespot_recur";
var RECURSIVE_FOR_DEGRADED_GLOBAL = "_themespot_recursive_for_degraded";
function splitForClause(head) {
  let depth = 0;
  let i = 0;
  while (i < head.length) {
    const ch = head[i];
    if (ch === '"' || ch === "'") {
      i = endOfStringLiteral(head, i);
      continue;
    }
    if (ch === "(" || ch === "[" || ch === "{") {
      depth++;
      i++;
      continue;
    }
    if (ch === ")" || ch === "]" || ch === "}") {
      depth--;
      i++;
      continue;
    }
    if (depth === 0 && /\s/.test(ch)) {
      const keyword = /^\s+in\s+/.exec(head.slice(i));
      if (keyword !== null) {
        const targets = head.slice(0, i).trim();
        const sequence = head.slice(i + keyword[0].length).trim();
        if (targets === "" || sequence === "") return null;
        return { targets, sequence };
      }
    }
    i++;
  }
  return null;
}
__name(splitForClause, "splitForClause");
function readRecursiveFor(args) {
  const stripped = /^([\s\S]*?)\srecursive\s*$/.exec(args);
  if (stripped === null) return null;
  return splitForClause(stripped[1]);
}
__name(readRecursiveFor, "readRecursiveFor");
function endOfCallArguments(expr, open) {
  let depth = 0;
  let i = open;
  while (i < expr.length) {
    const ch = expr[i];
    if (ch === '"' || ch === "'") {
      i = endOfStringLiteral(expr, i);
      continue;
    }
    if (ch === "(" || ch === "[" || ch === "{") depth++;
    else if (ch === ")" || ch === "]" || ch === "}") {
      depth--;
      if (depth === 0) return i;
    }
    i++;
  }
  return -1;
}
__name(endOfCallArguments, "endOfCallArguments");
function hasTopLevelComma(args) {
  let depth = 0;
  let i = 0;
  while (i < args.length) {
    const ch = args[i];
    if (ch === '"' || ch === "'") {
      i = endOfStringLiteral(args, i);
      continue;
    }
    if (ch === "(" || ch === "[" || ch === "{") depth++;
    else if (ch === ")" || ch === "]" || ch === "}") depth--;
    else if (ch === "," && depth === 0) return true;
    i++;
  }
  return false;
}
__name(hasTopLevelComma, "hasTopLevelComma");
function rewriteLoopReferences(expr, selfVar, depthVar, atLoopLevel) {
  if (!atLoopLevel) return expr;
  let out = "";
  let cursor = 0;
  let i = 0;
  while (i < expr.length) {
    const ch = expr[i];
    if (ch === '"' || ch === "'") {
      i = endOfStringLiteral(expr, i);
      continue;
    }
    if (!expr.startsWith("loop", i) || /[\w$.]/.test(expr[i - 1] ?? "")) {
      i++;
      continue;
    }
    const rest = expr.slice(i + "loop".length);
    const call = /^\s*\(/.exec(rest);
    if (call !== null) {
      const open = i + "loop".length + call[0].length - 1;
      const close = endOfCallArguments(expr, open);
      const args = close === -1 ? "" : expr.slice(open + 1, close).trim();
      if (close !== -1 && args !== "" && !hasTopLevelComma(args)) {
        out += expr.slice(cursor, i) + `${selfVar}(${args}, ${depthVar} + 1, ${selfVar})`;
        cursor = close + 1;
        i = close + 1;
        continue;
      }
    } else {
      const depth0 = /^\.depth0(?![\w$])/.exec(rest);
      const depth = /^\.depth(?![\w$])/.exec(rest);
      const matched = depth0 ?? depth;
      if (matched !== null) {
        out += expr.slice(cursor, i) + (depth0 !== null ? `(${depthVar} - 1)` : depthVar);
        cursor = i + "loop".length + matched[0].length;
        i = cursor;
        continue;
      }
    }
    i++;
  }
  return out + expr.slice(cursor);
}
__name(rewriteLoopReferences, "rewriteLoopReferences");
var RECURSIVE_BODY_BOUNDARY_OPENERS = /* @__PURE__ */ new Set(["for", "macro", "call"]);
var RECURSIVE_BODY_BOUNDARY_CLOSERS = /* @__PURE__ */ new Set(["endfor", "endmacro", "endcall"]);
function mapRecursiveBodyExpressions(body, transform) {
  const pattern = /(\{\{-?)([\s\S]*?)(-?\}\})|(\{%-?)([\s\S]*?)(-?%\})/g;
  let out = "";
  let cursor = 0;
  let nestingDepth = 0;
  let match;
  while ((match = pattern.exec(body)) !== null) {
    const isTag = match[4] !== void 0;
    const [openDelim, expr, closeDelim] = isTag ? [match[4], match[5], match[6]] : [match[1], match[2], match[3]];
    const name = isTag ? /^\s*([A-Za-z_][A-Za-z0-9_]*)/.exec(expr)?.[1] ?? "" : "";
    if (RECURSIVE_BODY_BOUNDARY_CLOSERS.has(name)) nestingDepth--;
    out += body.slice(cursor, match.index) + openDelim + transform(expr, nestingDepth) + closeDelim;
    cursor = match.index + match[0].length;
    if (RECURSIVE_BODY_BOUNDARY_OPENERS.has(name)) nestingDepth++;
  }
  return out + body.slice(cursor);
}
__name(mapRecursiveBodyExpressions, "mapRecursiveBodyExpressions");
function rewriteRecursiveForLoops(template) {
  if (!/\srecursive\s*-?%\}/.test(template)) return template;
  let result = template;
  let sequence = 0;
  const ceiling = (result.match(/\srecursive\s*-?%\}/g) ?? []).length + 1;
  for (let pass = 0; pass < ceiling; pass++) {
    const tags = scanHublTags(result);
    let index = -1;
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].name === "for" && readRecursiveFor(tags[i].args) !== null) index = i;
    }
    if (index === -1) break;
    result = rewriteOneRecursiveFor(result, tags, index, ++sequence);
  }
  return result;
}
__name(rewriteRecursiveForLoops, "rewriteRecursiveForLoops");
function rewriteOneRecursiveFor(template, tags, index, n) {
  const open = tags[index];
  const clause = readRecursiveFor(open.args);
  const openTag = template.slice(open.start, open.end);
  const lead = openTag.startsWith("{%-") ? "-" : "";
  const trail = openTag.endsWith("-%}") ? "-" : "";
  let depth = 0;
  let closeIndex = -1;
  for (let i = index; i < tags.length; i++) {
    if (tags[i].name === "for") depth++;
    else if (tags[i].name === "endfor" && --depth === 0) {
      closeIndex = i;
      break;
    }
  }
  if (closeIndex === -1) {
    return template.slice(0, open.start) + `{{${lead} ${RECURSIVE_FOR_DEGRADED_GLOBAL}(${JSON.stringify(clause.sequence)}) }}{% for ${clause.targets} in ${clause.sequence} ${trail}%}` + template.slice(open.end);
  }
  const close = tags[closeIndex];
  const closeTag = template.slice(close.start, close.end);
  const closeLead = closeTag.startsWith("{%-") ? "-" : "";
  const closeTrail = closeTag.endsWith("-%}") ? "-" : "";
  const macroVar = `${RECURSIVE_FOR_PREFIX}_${n}`;
  const seqVar = `${RECURSIVE_FOR_PREFIX}_seq_${n}`;
  const depthVar = `${RECURSIVE_FOR_PREFIX}_depth_${n}`;
  const selfVar = `${RECURSIVE_FOR_PREFIX}_self_${n}`;
  const body = mapRecursiveBodyExpressions(
    template.slice(open.end, close.start),
    (expr, nestingDepth) => rewriteLoopReferences(expr, selfVar, depthVar, nestingDepth === 0)
  );
  let after = close.end;
  if (closeTrail === "") {
    if (template.startsWith("\r\n", after)) after += 2;
    else if (template[after] === "\n") after += 1;
  }
  return template.slice(0, open.start) + `{%${lead} macro ${macroVar}(${seqVar}, ${depthVar}, ${selfVar}) %}{% for ${clause.targets} in ${seqVar} ${trail}%}` + body + `{%${closeLead} endfor %}{% endmacro %}{{ ${macroVar}(${clause.sequence}, 1, ${macroVar}) ${closeTrail}}}` + template.slice(after);
}
__name(rewriteOneRecursiveFor, "rewriteOneRecursiveFor");
var LOAD_TRANSLATIONS_GLOBAL = "load_translations";
function bindTranslationCallsToCaller(template, callerDir, callerRoot) {
  const head = callerRoot ? `${LOAD_TRANSLATIONS_ROOTED_GLOBAL}(${JSON.stringify(translationRootKey(callerRoot))}, ${JSON.stringify(callerDir)}` : `${LOAD_TRANSLATIONS_BOUND_GLOBAL}(${JSON.stringify(callerDir)}`;
  const bind = /* @__PURE__ */ __name((region) => {
    let out2 = "";
    let i = 0;
    while (i < region.length) {
      const ch = region[i];
      if (ch === '"' || ch === "'") {
        const end = endOfStringLiteral(region, i);
        out2 += region.slice(i, end);
        i = end;
        continue;
      }
      if (!region.startsWith(LOAD_TRANSLATIONS_GLOBAL, i) || i > 0 && /[\w$.]/.test(region[i - 1]) || /[\w$]/.test(region[i + LOAD_TRANSLATIONS_GLOBAL.length] ?? "")) {
        out2 += ch;
        i++;
        continue;
      }
      let open = i + LOAD_TRANSLATIONS_GLOBAL.length;
      while (open < region.length && /\s/.test(region[open])) open++;
      if (region[open] !== "(") {
        out2 += ch;
        i++;
        continue;
      }
      let firstArg = open + 1;
      while (firstArg < region.length && /\s/.test(region[firstArg])) firstArg++;
      if (region[firstArg] === ")") {
        out2 += `${head})`;
        i = firstArg + 1;
      } else {
        out2 += `${head}, `;
        i = firstArg;
      }
    }
    return out2;
  }, "bind");
  const pattern = /(\{\{-?)([\s\S]*?)(-?\}\})|(\{%-?)([\s\S]*?)(-?%\})/g;
  let out = "";
  let cursor = 0;
  let match;
  while ((match = pattern.exec(template)) !== null) {
    const isTag = match[4] !== void 0;
    const [openDelim, expr, closeDelim] = isTag ? [match[4], match[5], match[6]] : [match[1], match[2], match[3]];
    out += template.slice(cursor, match.index) + openDelim + bind(expr) + closeDelim;
    cursor = match.index + match[0].length;
  }
  return out + template.slice(cursor);
}
__name(bindTranslationCallsToCaller, "bindTranslationCallsToCaller");
function unbindTranslationCalls(text) {
  const literal = '"(?:[^"\\\\]|\\\\.)*"';
  return text.replace(
    new RegExp(`${LOAD_TRANSLATIONS_ROOTED_GLOBAL}\\(\\s*${literal}\\s*,\\s*${literal}\\s*(?:,\\s*)?`, "g"),
    `${LOAD_TRANSLATIONS_GLOBAL}(`
  ).replace(
    new RegExp(`${LOAD_TRANSLATIONS_BOUND_GLOBAL}\\(\\s*${literal}\\s*(?:,\\s*)?`, "g"),
    `${LOAD_TRANSLATIONS_GLOBAL}(`
  );
}
__name(unbindTranslationCalls, "unbindTranslationCalls");
function preprocessHubl(template, callerDir, callerRoot) {
  const mask = maskProtectedRegions(template);
  let result = normalizePrintInterpolations(mask.masked);
  if (callerDir != null) result = bindTranslationCallsToCaller(result, callerDir, callerRoot);
  result = normalizeUnlessBlocks(result);
  result = normalizeSetInterpolations(result);
  result = normalizeHublOperators(result);
  result = normalizeChainedTernaries(result);
  result = normalizeSelfReferentialAccumulators(result);
  result = normalizeMacroParameterOperands(result);
  result = normalizeTestArguments(result);
  result = normalizeTrailingLiteralCommas(result);
  result = result.replace(
    /\{%\s*import\s+"([^"]+)"\s*%\}/g,
    '{% include "$1" %}'
  );
  result = result.replace(/\.append\(/g, ".push(");
  result = result.replace(
    /\{%\s*do\s+([\s\S]*?)%\}/g,
    (_match, body) => {
      const trimmed = body.trim();
      let depth = 0;
      let topLevelIfIdx = -1;
      for (let i = 0; i < trimmed.length; i++) {
        const c = trimmed[i];
        if (c === "(" || c === "[" || c === "{") depth++;
        else if (c === ")" || c === "]" || c === "}") depth--;
        else if (depth === 0 && trimmed.slice(i).match(/^\s+if\s+/)) {
          topLevelIfIdx = i;
        }
      }
      if (topLevelIfIdx >= 0) {
        const expr = trimmed.substring(0, topLevelIfIdx).trim();
        const afterIf = trimmed.substring(topLevelIfIdx).replace(/^\s+if\s+/, "").trim();
        return `{% if ${afterIf} %}{% set _do_result = ${guardAppendExpression(expr)} %}{% endif %}`;
      }
      return `{% set _do_result = ${guardAppendExpression(trimmed)} %}`;
    }
  );
  const dndTags = [
    "dnd_area",
    "dnd_section",
    "dnd_column",
    "dnd_row",
    "dnd_module",
    "include_dnd_partial",
    "global_partial",
    "module_attribute",
    "module_block",
    "module",
    "raw_html",
    ...STORE_PARSED_WIDGET_TAGS
  ];
  for (const tag of dndTags) {
    result = result.replace(
      new RegExp(`\\{%\\s*${tag}\\b([\\s\\S]*?)%\\}`, "g"),
      (_match, argsStr) => {
        const cleaned = argsStr.trim().replace(
          /=\s*\{\{([\s\S]*?)\}\}/g,
          "=($1)"
        );
        const idx = storeTagArgs(cleaned, mask);
        return `{% ${tag} ${idx} %}`;
      }
    );
  }
  result = scopeMacroBodies(result);
  result = result.replace(
    /\{%\s*set\s+([A-Za-z_$][\w$]*)\s*=\s*([\s\S]*?)\s*%\}/g,
    (match, name, _value) => {
      if (name === "_do_result") return match;
      return `${match}{% ${SET_SYNC_TAG} "${name}", ${name} %}`;
    }
  );
  result = rewriteRecursiveForLoops(result);
  result = rewriteUnknownTags(result, mask);
  return restoreProtectedRegions(result, mask);
}
__name(preprocessHubl, "preprocessHubl");
function javaStringForm(value, nested = false) {
  if (value === null || value === void 0) return nested ? "null" : "";
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) {
    return `[${value.map((entry) => javaStringForm(entry, true)).join(", ")}]`;
  }
  if (typeof value === "object") {
    return `{${Object.entries(value).map(([key, entry]) => `${key}=${javaStringForm(entry, true)}`).join(", ")}}`;
  }
  return String(value);
}
__name(javaStringForm, "javaStringForm");
var DND_REFERENCE_ARG_RE = /^[A-Za-z_$][\w$]*(?:\.[\w$]+|\[[^\]]+\])*$/;
function reportSerialisedDndArg(serialisation, spelling, argument, source, delivered, valueIsComplex) {
  const { tagName, collector } = serialisation;
  source = unbindTranslationCalls(source);
  const key = `${tagName}:${argument}:${spelling}:${source}`;
  if (collector.serialisedDndArgs.has(key)) return;
  collector.serialisedDndArgs.add(key);
  const cause = spelling === "bare-reference" ? `A bare reference is not resolved: HubSpot bakes this tag into the drag-and-drop layout at upload time, where there is no render context, so the module receives the ${source.length} characters "${source}" as a string.` : spelling === "interpolated-boolean" ? `The interpolation resolves and HubSpot then serialises the RESULT, so the module receives the string "${delivered}" \u2014 which is truthy even when it reads "false".` : `The interpolation resolves to a list or dict and HubSpot then serialises the RESULT, so the module receives the string "${delivered}", fails its own \`Array.isArray\`/lookup, and drops to its defaults.`;
  const fix = valueIsComplex ? `Write the literal in the tag (\`${argument}=[\u2026]\` / \`${argument}={\u2026}\`): a literal keeps its structure and its expression LEAVES \u2014 bare variables and \`get_asset_url()\` calls alike \u2014 do evaluate. That is the only portable spelling for a complex value.` : `Resolve it above the tree and pass \`${argument}={{ \u2026 }}\`: an interpolated scalar survives intact.`;
  collector.diagnostics.push(
    diagnostic(
      DIAGNOSTIC_CODES.DND_ARGUMENT_SERIALISED,
      `{% ${tagName} %} was given \`${argument}=${source}\`. ${cause} ${fix}`,
      { tag: tagName, argument, spelling, source, delivered }
    )
  );
}
__name(reportSerialisedDndArg, "reportSerialisedDndArg");
function parseDndArgs(rawStr, env, ctx, serialisation) {
  if (!rawStr) return {};
  if (!rawStr.includes("=")) {
    const trimmed = rawStr.trim().replace(/^["']|["']$/g, "");
    return { _positional: trimmed };
  }
  const kwargs = parseSimpleKwargs(rawStr);
  const sources = serialisation ? parseSimpleKwargs(rawStr, { raw: true }) : {};
  for (const [key, val] of Object.entries(kwargs)) {
    if (typeof val !== "string") continue;
    const source = typeof sources[key] === "string" ? sources[key] : val;
    if (val.startsWith("(") && val.endsWith(")")) {
      const expr = val.slice(1, -1).trim();
      try {
        try {
          const dumped = env.renderString(`{{ (${expr}) | dump }}`, ctx).trim();
          if (dumped && dumped !== "null" && dumped !== "undefined") {
            const parsed = JSON.parse(dumped);
            if (parsed && typeof parsed === "object") {
              if (serialisation) {
                const delivered = javaStringForm(parsed);
                kwargs[key] = delivered;
                reportSerialisedDndArg(
                  serialisation,
                  "interpolated-collection",
                  key,
                  `{{ ${expr} }}`,
                  delivered,
                  true
                );
                continue;
              }
              kwargs[key] = parsed;
              continue;
            }
            if (serialisation && typeof parsed === "boolean") {
              reportSerialisedDndArg(
                serialisation,
                "interpolated-boolean",
                key,
                `{{ ${expr} }}`,
                parsed ? "true" : "false",
                false
              );
            }
          }
        } catch {
        }
        const rendered = env.renderString(`{{ ${expr} }}`, ctx).trim();
        kwargs[key] = rendered;
      } catch {
        const parts = expr.split(/\bor\b/);
        let resolved = false;
        for (let i = parts.length - 1; i >= 0 && !resolved; i--) {
          const part = parts[i].trim();
          const strMatch = part.match(/^"([\s\S]*)"$/);
          if (strMatch) {
            kwargs[key] = strMatch[1];
            resolved = true;
            break;
          }
          try {
            const rendered = env.renderString(`{{ ${part} }}`, ctx).trim();
            if (rendered) {
              kwargs[key] = rendered;
              resolved = true;
            }
          } catch {
          }
        }
        if (!resolved) kwargs[key] = "";
      }
      continue;
    }
    if (val.startsWith("[") || val.startsWith("{")) {
      try {
        const rendered = env.renderString(`{{ (${parenthesiseNestedDictLiterals(val)}) | dump }}`, ctx).trim();
        if (rendered && rendered !== "null" && rendered !== "undefined") {
          kwargs[key] = JSON.parse(rendered);
        }
      } catch {
      }
      continue;
    }
    if (val.includes("{{") && val.includes("}}")) {
      kwargs[key] = val.replace(/\{\{([\s\S]*?)\}\}/g, (whole, body) => {
        const expr = body.trim();
        if (expr === "") return "";
        try {
          return env.renderString(`{{ ${expr} }}`, ctx);
        } catch {
          return whole;
        }
      });
      continue;
    }
    if (serialisation) {
      if (!/^["'[{]/.test(source) && DND_REFERENCE_ARG_RE.test(source)) {
        let valueIsComplex = false;
        try {
          const dumped = env.renderString(`{{ (${source}) | dump }}`, ctx).trim();
          if (dumped && dumped !== "null" && dumped !== "undefined") {
            const probe = JSON.parse(dumped);
            valueIsComplex = probe !== null && typeof probe === "object";
          }
        } catch {
        }
        reportSerialisedDndArg(
          serialisation,
          "bare-reference",
          key,
          source,
          source,
          valueIsComplex
        );
      }
      continue;
    }
    if (/^[A-Za-z_$][\w$]*(?:\.[\w$]+|\[[^\]]+\])*$/.test(val)) {
      try {
        const dumped = env.renderString(`{{ (${val}) | dump }}`, ctx).trim();
        if (dumped && dumped !== "null" && dumped !== "undefined") {
          const parsed = JSON.parse(dumped);
          if (parsed !== void 0) {
            kwargs[key] = parsed;
          }
        }
      } catch {
      }
    }
  }
  return kwargs;
}
__name(parseDndArgs, "parseDndArgs");
function parseSimpleKwargs(raw, options = {}) {
  const result = {};
  const s = raw.trim();
  let i = 0;
  function skipWs() {
    while (i < s.length && /[\s,]/.test(s[i])) i++;
  }
  __name(skipWs, "skipWs");
  function readKey() {
    const start = i;
    while (i < s.length && /\w/.test(s[i])) i++;
    return i > start ? s.substring(start, i) : null;
  }
  __name(readKey, "readKey");
  function readValue() {
    const start = i;
    let depth = 0;
    let quote = null;
    while (i < s.length) {
      const c = s[i];
      if (quote) {
        if (c === "\\") {
          i += 2;
          continue;
        }
        if (c === quote) quote = null;
        i++;
        continue;
      }
      if (c === '"' || c === "'") {
        quote = c;
        i++;
        continue;
      }
      if (c === "(" || c === "[" || c === "{") {
        depth++;
        i++;
        continue;
      }
      if (c === ")" || c === "]" || c === "}") {
        depth--;
        i++;
        continue;
      }
      if ((c === "," || /\s/.test(c)) && depth === 0) {
        let j = i + 1;
        while (j < s.length && /\s/.test(s[j])) j++;
        let k = j;
        while (k < s.length && /\w/.test(s[k])) k++;
        if (k > j) {
          let l = k;
          while (l < s.length && /\s/.test(s[l])) l++;
          if (l < s.length && s[l] === "=") break;
        }
      }
      i++;
    }
    return s.substring(start, i).replace(/,\s*$/, "").trim();
  }
  __name(readValue, "readValue");
  while (i < s.length) {
    skipWs();
    if (i >= s.length) break;
    const savedPos = i;
    const key = readKey();
    if (!key) {
      i++;
      continue;
    }
    skipWs();
    if (i >= s.length || s[i] !== "=") {
      i = savedPos + 1;
      continue;
    }
    i++;
    while (i < s.length && /\s/.test(s[i])) i++;
    const val = readValue();
    result[key] = options.raw ? val : parseValue(val);
  }
  return result;
}
__name(parseSimpleKwargs, "parseSimpleKwargs");
function decodeQuoteEscapes(inner) {
  if (!inner.includes("\\")) return inner;
  let out = "";
  for (let i = 0; i < inner.length; i++) {
    if (inner[i] === "\\") {
      const next = inner[i + 1];
      if (next === "'" || next === '"') {
        out += next;
        i++;
        continue;
      }
      if (next === "\\") {
        out += "\\\\";
        i++;
        continue;
      }
    }
    out += inner[i];
  }
  return out;
}
__name(decodeQuoteEscapes, "decodeQuoteEscapes");
function parseValue(str) {
  const s = str.trim();
  if (s === "True" || s === "true") return true;
  if (s === "False" || s === "false") return false;
  if (s === "None" || s === "null") return null;
  if (/^-?\d+$/.test(s)) return parseInt(s, 10);
  if (/^-?\d+\.\d+$/.test(s)) return parseFloat(s);
  if (s.startsWith('"') && s.endsWith('"') || s.startsWith("'") && s.endsWith("'")) {
    return decodeQuoteEscapes(s.slice(1, -1));
  }
  try {
    const jsonified = s.replace(/\bTrue\b/g, "true").replace(/\bFalse\b/g, "false").replace(/\bNone\b/g, "null");
    return JSON.parse(jsonified);
  } catch {
    return s;
  }
}
__name(parseValue, "parseValue");
var PreprocessingLoader = class extends HostFsLoader {
  static {
    __name(this, "PreprocessingLoader");
  }
  themeRoots;
  extraRootDirs;
  activeForeignRoot = /* @__PURE__ */ __name(() => null, "activeForeignRoot");
  constructor(searchPaths, themeRoots, extraRootDirs = []) {
    super(searchPaths, { noCache: true });
    this.themeRoots = themeRoots;
    this.extraRootDirs = extraRootDirs;
  }
  searchPathsFor(name) {
    const frame = this.activeForeignRoot();
    if (!frame) return super.searchPathsFor(name);
    return buildSearchPaths(frame.themeRoots, TEMPLATE_SEARCH_SUBDIRECTORIES).map((searchPath) => path.normalize(searchPath));
  }
  transform(source, fullPath) {
    const body = source.replace(/^<!--[\s\S]*?-->\s*/m, "");
    const extraRoot = owningExtraRoot(fullPath, this.themeRoots, this.extraRootDirs);
    if (extraRoot) {
      const roots = singleRootThemeRoots(extraRoot);
      return preprocessHublFromFile(body, themeRelativeFile(fullPath, roots), themeRelativeDirectory(fullPath, roots), extraRoot);
    }
    return preprocessHublFromFile(body, themeRelativeFile(fullPath, this.themeRoots), themeRelativeDirectory(fullPath, this.themeRoots));
  }
};
function buildBrandSettingsGlobal(brand) {
  if (!brand || typeof brand !== "object") return { favicon: { src: "" } };
  const primaryLogo = brand.primaryLogo ?? brand.logos?.[0];
  const primaryFavicon = brand.primaryFavicon ?? brand.favicons?.[0];
  return {
    ...brand,
    favicon: primaryFavicon ?? { src: "" },
    logo: primaryLogo ?? { src: "" }
  };
}
__name(buildBrandSettingsGlobal, "buildBrandSettingsGlobal");
function resolveKeyedForm(themeRoot, requested) {
  if (requested == null || requested === "") return null;
  const forms = loadFixture(themeRoot, "forms.json", []);
  if (!Array.isArray(forms) || forms.length === 0) return null;
  const wanted = String(requested);
  return forms.find((f) => f && (String(f.guid) === wanted || String(f.id) === wanted)) ?? null;
}
__name(resolveKeyedForm, "resolveKeyedForm");
var CRM_OBJECTS_DEFAULT_LIMIT = 100;
var CRM_OBJECTS_MAX_LIMIT = 100;
function crmText(value) {
  if (typeof value === "string" || value instanceof String || typeof value === "number") return String(value);
  return null;
}
__name(crmText, "crmText");
function readCrmQuery(query, feature) {
  const result = { notApplied: [] };
  if (query === void 0 || query === null || query === "") return result;
  if (Array.isArray(query)) {
    result.notApplied.push(`[${query.map((entry) => String(entry)).join(",")}]`);
    return result;
  }
  const text = crmText(query);
  if (text === null) {
    result.notApplied.push(String(query));
    return result;
  }
  if (/^\s*\d+\s*$/.test(text)) {
    if (feature === "crm_object") result.id = text.trim();
    else result.notApplied.push(text.trim());
    return result;
  }
  for (const raw of text.split("&")) {
    const clause = raw.trim();
    if (clause === "") continue;
    const equals = clause.indexOf("=");
    const key = (equals === -1 ? clause : clause.slice(0, equals)).trim().toLowerCase();
    const value = equals === -1 ? "" : clause.slice(equals + 1).trim();
    if (key === "limit" && /^\d+$/.test(value)) {
      if (feature === "crm_objects") result.limit = Math.min(Number(value), CRM_OBJECTS_MAX_LIMIT);
      continue;
    }
    if (feature === "crm_object" && key === "hs_object_id" && value !== "") {
      result.id = value;
      continue;
    }
    result.notApplied.push(clause);
  }
  return result;
}
__name(readCrmQuery, "readCrmQuery");
function crmPropertyNames(properties) {
  const names = Array.isArray(properties) ? properties.map((entry) => String(entry)) : crmText(properties)?.split(",") ?? [];
  const trimmed = names.map((name) => name.trim()).filter((name) => name !== "");
  return trimmed.length > 0 ? trimmed : null;
}
__name(crmPropertyNames, "crmPropertyNames");
function crmRecordId(record) {
  return record.id ?? record.properties?.hs_object_id ?? null;
}
__name(crmRecordId, "crmRecordId");
function crmObjectResult(record, names) {
  const values = record.properties && typeof record.properties === "object" && !Array.isArray(record.properties) ? record.properties : {};
  const result = { id: crmRecordId(record) };
  for (const key of names ?? Object.keys(values)) {
    if (key === "id" || !Object.prototype.hasOwnProperty.call(values, key)) continue;
    result[key] = values[key];
  }
  return result;
}
__name(crmObjectResult, "crmObjectResult");
function crmObjectFixturePathFor(objectType) {
  const text = crmText(objectType)?.trim() ?? "";
  const name = /^[A-Za-z0-9_][A-Za-z0-9_.-]*$/.test(text) ? text : "<objectTypeId-or-fqn>";
  return `fixtures/${CRM_OBJECT_FIXTURE_DIRECTORY}/${name}.json`;
}
__name(crmObjectFixturePathFor, "crmObjectFixturePathFor");
function positiveInteger(value) {
  const n = Number(value);
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : null;
}
__name(positiveInteger, "positiveInteger");
function listingPost(post) {
  return {
    ...post,
    id: post.id,
    name: post.name ?? post.label,
    label: post.label ?? post.name,
    slug: post.slug ?? "",
    absolute_url: post.absolute_url ?? post.absoluteUrl,
    absoluteUrl: post.absoluteUrl ?? post.absolute_url,
    featured_image: post.featured_image ?? post.featuredImage,
    featured_image_alt_text: post.featured_image_alt_text ?? post.featuredImageAltText,
    featured_image_width: post.featured_image_width ?? post.featuredImageWidth,
    featured_image_height: post.featured_image_height ?? post.featuredImageHeight,
    featuredImage: post.featuredImage ?? post.featured_image,
    featuredImageAltText: post.featuredImageAltText ?? post.featured_image_alt_text,
    featuredImageWidth: post.featuredImageWidth ?? post.featured_image_width,
    featuredImageHeight: post.featuredImageHeight ?? post.featured_image_height,
    topic_list: post.topic_list ?? [],
    tag_list: post.tag_list ?? post.topic_list ?? [],
    topicNames: post.topicNames ?? (post.topic_list ?? []).map((t) => typeof t === "string" ? t : t?.name),
    publish_date: post.publish_date,
    publish_date_localized: post.publish_date_localized ?? "",
    meta_description: post.meta_description ?? "",
    post_body: post.post_body ?? "",
    post_summary: post.post_summary ?? "",
    post_list_content: post.post_list_content ?? "",
    comment_count: post.comment_count ?? 0,
    blog_post_author: post.blog_post_author ?? null,
    blog_author: post.blog_author ?? null,
    language: post.language ?? { languageTag: "en", textDirection: { value: "ltr" } }
  };
}
__name(listingPost, "listingPost");
var TRANSLATIONS_MESSAGES_FILE = "messages.json";
function localeTagCandidates(tag) {
  const raw = typeof tag === "string" ? tag.trim().toLowerCase() : "";
  if (!raw) return [];
  const language = raw.split(/[-_]/)[0];
  return language && language !== raw ? [raw, language] : [raw];
}
__name(localeTagCandidates, "localeTagCandidates");
function translationProbes(dir, entries, tags) {
  const probes = [];
  const push = /* @__PURE__ */ __name((candidate) => {
    if (!probes.includes(candidate)) probes.push(candidate);
  }, "push");
  const spellings = /* @__PURE__ */ __name((name) => {
    const onDisk = entries.get(name);
    return onDisk && onDisk !== name ? [name, onDisk] : [name];
  }, "spellings");
  for (const tag of tags) {
    for (const folder of spellings(tag)) push(path.join(dir, folder, TRANSLATIONS_MESSAGES_FILE));
    for (const file of spellings(`${tag}.json`)) push(path.join(dir, file));
  }
  return probes;
}
__name(translationProbes, "translationProbes");
function directoryExists(dir) {
  try {
    return hostFs.existsSync(dir) && hostFs.statSync(dir).isDirectory();
  } catch {
    return false;
  }
}
__name(directoryExists, "directoryExists");
function localeDirectoryEntries(dir) {
  const entries = /* @__PURE__ */ new Map();
  let names;
  try {
    names = hostFs.readdirSync(dir);
  } catch {
    return entries;
  }
  for (const name of names) {
    const key = name.toLowerCase();
    if (!entries.has(key)) entries.set(key, name);
  }
  return entries;
}
__name(localeDirectoryEntries, "localeDirectoryEntries");
function createHublEngine(options) {
  const { theme, renderModule, pageMeta, presetName = "default" } = options;
  const themeRoots = options.themeRoots ?? resolveThemeRoots(options);
  const themeRoot = themeRoots.themeRoot;
  const loader = new PreprocessingLoader(
    buildSearchPaths(themeRoots, TEMPLATE_SEARCH_SUBDIRECTORIES),
    themeRoots,
    (options.page?.extraRoots ?? []).map((root) => root.dir)
  );
  const env = new import_nunjucks.default.Environment(loader, {
    autoescape: false,
    throwOnUndefined: false,
    trimBlocks: true,
    lstripBlocks: true
  });
  import_nunjucks.default.installJinjaCompat();
  installMetaFieldPrinting(import_nunjucks.default.runtime);
  const collector = {
    cssLinks: [],
    jsLinks: [],
    moduleStyles: [],
    sectionCounter: 0,
    rowCounter: 0,
    columnCounter: 0,
    moduleCounter: 0,
    dndScopes: [],
    dndAreaNames: /* @__PURE__ */ new Set(),
    layout: createLayoutCollector(),
    diagnostics: options.themeRoots ? [] : [...themeRoots.diagnostics],
    reactModules: [],
    scopedInstances: /* @__PURE__ */ new Set(),
    approximatedDefaultModules: /* @__PURE__ */ new Set(),
    rejectedDndLengths: /* @__PURE__ */ new Set(),
    serialisedDndArgs: /* @__PURE__ */ new Set(),
    reportedModuleStylesheetErrors: /* @__PURE__ */ new Set(),
    moduleScripts: [],
    inlineScripts: [],
    headMarkup: [],
    modulesWithAssetsCollected: /* @__PURE__ */ new Set(),
    reportedModuleFieldSchemas: /* @__PURE__ */ new Set(),
    reportedContentLinks: /* @__PURE__ */ new Set(),
    moduleFieldSchemas: /* @__PURE__ */ new Map(),
    provenance: options.stampProvenance === false ? void 0 : createProvenanceContext(
      themeRoots,
      { themeId: options.themeId, parentThemeId: options.parentThemeId },
      (options.page?.extraRoots ?? []).map((root) => ({ root: root.dir, themeId: root.themeId }))
    ),
    page: options.page ? createPageBindingState(options.page) : void 0,
    reactModulePolicy: options.reactModulePolicy
  };
  loader.activeForeignRoot = () => activeForeignRoot(collector);
  const templateContext = options.templateContext ?? {};
  const builtinBodyClasses = templateContext.builtin_body_classes ?? "hs-content-page";
  const contentState = options.contentState ?? null;
  env.addGlobal("theme", theme);
  env.addGlobal("html_lang", "en");
  env.addGlobal("html_lang_dir", "");
  const pageFields = options.page?.content && isPlainRecord(options.page.content) ? pageContentFields(options.page.content) : null;
  env.addGlobal(
    "page_meta",
    pageMeta ?? {
      html_title: typeof pageFields?.html_title === "string" ? pageFields.html_title : "Preview",
      meta_description: typeof pageFields?.meta_description === "string" ? pageFields.meta_description : ""
    }
  );
  env.addGlobal(
    "brand_settings",
    buildBrandSettingsGlobal(loadFixture(themeRoot, "brand-settings.json", null))
  );
  env.addGlobal("builtin_body_classes", builtinBodyClasses);
  env.addGlobal("standard_header_includes", "");
  env.addGlobal("standard_footer_includes", "");
  env.addGlobal("theme_preset", { name: presetName });
  env.addGlobal("is_in_editor", contentState?.is_in_editor === true);
  env.addGlobal("rendered_with_grids", false);
  env.addGlobal("context", {});
  env.addGlobal("scaffold_content", {});
  env.addGlobal("color_variant", colorVariant);
  env.addGlobal("base_size", options.baseSize ?? 16);
  env.addGlobal("year", (/* @__PURE__ */ new Date()).getFullYear());
  env.addGlobal("site_settings", {});
  env.addGlobal("account", {});
  env.addGlobal("portal_id", 0);
  env.addGlobal("language", "en");
  env.addGlobal("local_dt", "");
  env.addGlobal("widget", {});
  const blogTitle = typeof contentState?.group?.public_title === "string" ? contentState.group.public_title : void 0;
  env.addGlobal("blog", contentState?.blog ?? {});
  const pageWidgets = options.page && Object.keys(options.page.widgets).length > 0 ? options.page.widgets : null;
  env.addGlobal(
    "content",
    pageFields || pageWidgets ? bindContentBean(
      {
        ...contentState?.content ?? {},
        ...pageWidgets ? { widgets: pageWidgets } : {},
        ...pageFields ?? {}
      },
      { postBean: contentState?.kind === "blog-post", blogTitle }
    ) : contentState ? bindContentBean(contentState.content, { postBean: contentState.kind === "blog-post", blogTitle }) : {}
  );
  if (contentState?.group) env.addGlobal("group", contentState.group);
  if (contentState?.tag) env.addGlobal("tag", contentState.tag);
  env.addGlobal("dynamic_page_hubdb_row", contentState?.dynamicPage?.row ?? void 0);
  env.addGlobal("dynamic_page_hubdb_table_id", contentState?.dynamicPage?.tableId ?? void 0);
  env.addGlobal("dynamic_page_crm_object", contentState?.dynamicPage?.crmObject ?? void 0);
  const tier3Stub = /* @__PURE__ */ __name((feature, message = `${feature} is not supported by the offline renderer \u2014 remove or replace it for a faithful render`, details = {}) => {
    collector.diagnostics.push(diagnostic(DIAGNOSTIC_CODES.HUBL_GLOBAL_UNIMPLEMENTED, message, { feature, ...details }));
    return new import_nunjucks.default.runtime.SafeString(`<!-- ${feature} not rendered: unsupported HubL feature -->`);
  }, "tier3Stub");
  for (const feature of ["crm_associations", "oembed", "related_blog_posts"]) {
    env.addGlobal(feature, () => tier3Stub(feature));
  }
  env.addExtension("PaymentTag", new UnsupportedTagExtension(collector, "payment"));
  env.addExtension("SubscriptionTag", new UnsupportedTagExtension(collector, "subscription"));
  const appendNoOps = /* @__PURE__ */ new Set();
  env.addGlobal(DO_APPEND_GLOBAL, (receiver, values, label) => {
    if (Array.isArray(receiver)) {
      receiver.push(...values ?? []);
      return "";
    }
    if (!appendNoOps.has(label)) {
      appendNoOps.add(label);
      collector.diagnostics.push(
        diagnostic(
          DIAGNOSTIC_CODES.HUBL_DO_NO_OP,
          `\`{% do ${label}.append(\u2026) %}\` was ignored: \`${label}\` is not a list at that point in the template. HubSpot renders this as a silent no-op, so the page still renders \u2014 but the template is appending to something it has not defined yet.`,
          { receiver: label }
        )
      );
    }
    return "";
  });
  const degradedRecursiveLoops = /* @__PURE__ */ new Set();
  env.addGlobal(RECURSIVE_FOR_DEGRADED_GLOBAL, (sequence) => {
    if (!degradedRecursiveLoops.has(sequence)) {
      degradedRecursiveLoops.add(sequence);
      collector.diagnostics.push(
        diagnostic(
          DIAGNOSTIC_CODES.HUBL_FOR_RECURSIVE_DEGRADED,
          `\`{% for \u2026 in ${sequence} recursive %}\` rendered its first level only: the loop's \`{% endfor %}\` could not be found, so the recursion could not be rewritten. The rest of the page is unaffected \u2014 check that the loop is closed and correctly nested.`,
          { sequence }
        )
      );
    }
    return "";
  });
  env.addGlobal("request", {
    cookies: {},
    domain: "preview.localhost",
    full_url: "http://localhost:3456/",
    path: "/",
    path_and_query: "/",
    query: "",
    query_dict: {},
    referrer: "",
    remote_ip: "127.0.0.1",
    scheme: "http",
    search_engine: "",
    search_keyword: "",
    headers: {},
    ...contentState?.request ?? {}
  });
  env.addGlobal("request_contact", {
    is_logged_in: false,
    list_memberships: {}
  });
  const cascadeAssetResolver = createThemeAssetResolver(themeRoot, themeRoots);
  const foreignAssetResolvers = /* @__PURE__ */ new Map();
  env.addGlobal("get_asset_url", createGetAssetUrlGlobal((assetPath) => {
    const frame = activeForeignRoot(collector);
    if (!frame) return cascadeAssetResolver(assetPath);
    let resolver = foreignAssetResolvers.get(frame.dir);
    if (!resolver) {
      resolver = createThemeAssetResolver(frame.dir, frame.themeRoots);
      foreignAssetResolvers.set(frame.dir, resolver);
    }
    return resolver(assetPath);
  }));
  env.addGlobal(
    "get_asset_version",
    createGetAssetVersionGlobal((error) => collector.diagnostics.push(error))
  );
  env.addGlobal("require_css", (url) => {
    const link = url ? foreignAssetReference(collector, url) : url;
    if (link && !collector.cssLinks.includes(link)) collector.cssLinks.push(link);
    return "";
  });
  env.addGlobal("require_js", (url) => {
    const link = url ? foreignAssetReference(collector, url) : url;
    if (link && !collector.jsLinks.includes(link)) collector.jsLinks.push(link);
    return "";
  });
  const reportedMissingTranslations = /* @__PURE__ */ new Set();
  const cascadeTranslationScope = { themeRoots, themeRoot, label: null };
  const extraRootTranslationScopes = /* @__PURE__ */ new Map();
  for (const root of options.page?.extraRoots ?? []) {
    extraRootTranslationScopes.set(translationRootKey(root.dir), {
      themeRoots: singleRootThemeRoots(root.dir, themeRoots.projects),
      themeRoot: root.dir,
      label: root.root || root.portalRoot
    });
  }
  const resolveLocalesDirectory = /* @__PURE__ */ __name((callerDir, localesPath, scope) => {
    const raw = typeof localesPath === "string" ? localesPath : String(localesPath ?? "");
    const callerRelative = callerDir !== null && /^\.\.?\//.test(raw.trim());
    const lookedFor = path.posix.normalize(
      callerRelative ? path.posix.join(callerDir, raw.trim()) : raw.replace(/^\.\.\//, "")
    );
    const rootName = scope?.label ? `the root of ${scope.label}` : "the theme root";
    const resolvedFrom = callerRelative ? `${callerDir === "" ? rootName : `${callerDir}/`}, the directory of the template that called it` : rootName;
    if (lookedFor.startsWith("..")) return { lookedFor, resolvedFrom, directory: null };
    if (scope === null) return { lookedFor, resolvedFrom: "a theme root this render was not given", directory: null };
    try {
      const cascaded = resolveInThemeCascade(scope.themeRoots, lookedFor);
      if (cascaded) return { lookedFor, resolvedFrom, directory: cascaded };
      return {
        lookedFor,
        resolvedFrom,
        directory: resolveSafePath(scope.themeRoot, lookedFor, { reference: localesPath, sourceFile: "load_translations" })
      };
    } catch (err) {
      if (err instanceof RendererError) return { lookedFor, resolvedFrom, directory: null };
      throw err;
    }
  }, "resolveLocalesDirectory");
  const loadTranslations = /* @__PURE__ */ __name((callerDir, localesPath, lang, fallback, scope = cascadeTranslationScope) => {
    const { lookedFor, resolvedFrom, directory } = resolveLocalesDirectory(callerDir, localesPath, scope);
    const tags = [...localeTagCandidates(lang), ...localeTagCandidates(fallback)];
    const found = directory !== null && directoryExists(directory);
    const base = directory ?? lookedFor;
    const probes = found ? translationProbes(directory, localeDirectoryEntries(directory), tags) : [];
    const unreadable = [];
    for (const file of probes) {
      if (!hostFs.existsSync(file)) continue;
      try {
        return JSON.parse(hostFs.readFileSync(file, "utf-8"));
      } catch {
        unreadable.push(path.relative(base, file));
      }
    }
    const probed = probes.map((file) => path.relative(base, file));
    const scopeKey = scope === cascadeTranslationScope ? "" : `${scope?.label ?? "<unknown root>"}::`;
    const key = `${scopeKey}${lookedFor}|${lang ?? ""}|${fallback ?? ""}`;
    if (!reportedMissingTranslations.has(key)) {
      reportedMissingTranslations.add(key);
      const missingDirectory = !found;
      const writtenPath = typeof localesPath === "string" ? `"${localesPath}"` : localesPath == null ? null : String(localesPath);
      collector.diagnostics.push(
        diagnostic(
          DIAGNOSTIC_CODES.HUBL_TRANSLATIONS_UNRESOLVED,
          (writtenPath === null ? `load_translations() was called without a locales path, so it returned an empty object and every \`.message\` a template reads from it is empty. ` : `load_translations(${writtenPath}, "${lang ?? ""}", "${fallback ?? ""}") found no translations and returned an empty object, so every \`.message\` a template reads from it is empty. `) + (missingDirectory ? `${lookedFor} is not a directory in ${scope?.label ? `the theme at ${scope.label}` : "this theme"} \u2014 the path was resolved from ${resolvedFrom}. ` : probed.length ? `Looked for ${probed.join(", ")} under ${lookedFor}, resolved from ${resolvedFrom}. ` : `Neither a language nor a fallback was named, so there was nothing to look for. `) + (unreadable.length ? `${unreadable.join(", ")} exists but is not valid JSON \u2014 fix the file. ` : "") + `HubSpot's layout is a folder per locale holding messages.json (${lookedFor}/${tags[0] ?? "en"}/messages.json).`,
          {
            sourceFile: lookedFor,
            localesPath: typeof localesPath === "string" ? localesPath : null,
            callerDir,
            lang: lang ?? null,
            fallback: fallback ?? null,
            ...missingDirectory ? {} : { probed },
            ...unreadable.length ? { unreadable } : {},
            ...scope?.label ? { themeRoot: scope.label } : {}
          }
        )
      );
    }
    return {};
  }, "loadTranslations");
  env.addGlobal(
    "load_translations",
    (localesPath, lang, fallback) => loadTranslations(null, localesPath, lang, fallback)
  );
  env.addGlobal(
    LOAD_TRANSLATIONS_BOUND_GLOBAL,
    (callerDir, localesPath, lang, fallback) => loadTranslations(typeof callerDir === "string" ? callerDir : null, localesPath, lang, fallback)
  );
  env.addGlobal(
    LOAD_TRANSLATIONS_ROOTED_GLOBAL,
    (rootKey, callerDir, localesPath, lang, fallback) => loadTranslations(
      typeof callerDir === "string" ? callerDir : null,
      localesPath,
      lang,
      fallback,
      typeof rootKey === "string" ? extraRootTranslationScopes.get(translationRootKey(rootKey)) ?? null : null
    )
  );
  env.addGlobal("resize_image_url", (src, ..._rest) => src == null ? "" : String(src));
  const reportedBlogUrlAssumptions = /* @__PURE__ */ new Set();
  const stateBlogRoot = typeof contentState?.group?.absolute_url === "string" && contentState.group.absolute_url.trim() !== "" ? contentState.group.absolute_url.trim().replace(/\/+$/, "") : null;
  const blogRoot = stateBlogRoot ?? PREVIEW_BLOG_ROOT;
  const blogUrlAssumption = /* @__PURE__ */ __name((fn, answer) => {
    if (stateBlogRoot !== null) return answer;
    if (!reportedBlogUrlAssumptions.has(fn)) {
      reportedBlogUrlAssumptions.add(fn);
      collector.diagnostics.push(
        diagnostic(
          DIAGNOSTIC_CODES.HUBL_GLOBAL_UNIMPLEMENTED,
          `${fn}() answered from an assumed blog root of "${PREVIEW_BLOG_ROOT}" \u2014 the real root is the blog listing page configured in the portal, which an offline render cannot read. The link shape is right; the prefix is a guess.`,
          { feature: fn, assumedBlogRoot: PREVIEW_BLOG_ROOT }
        )
      );
    }
    return answer;
  }, "blogUrlAssumption");
  const blogSlug = /* @__PURE__ */ __name((value) => encodeURIComponent(String(value ?? "").trim()), "blogSlug");
  env.addGlobal(
    "blog_tag_url",
    (_groupId, slug) => blogUrlAssumption("blog_tag_url", `${blogRoot}/tag/${blogSlug(slug)}`)
  );
  env.addGlobal(
    "blog_author_url",
    (_groupId, slug) => blogUrlAssumption("blog_author_url", `${blogRoot}/author/${blogSlug(slug)}`)
  );
  env.addGlobal("blog_page_link", (page) => {
    const n = Number(page);
    const target = Number.isFinite(n) && n > 1 ? `${blogRoot}/page/${Math.floor(n)}` : blogRoot;
    return blogUrlAssumption("blog_page_link", target);
  });
  env.addGlobal("blog_all_posts_url", (_blog) => blogUrlAssumption("blog_all_posts_url", blogRoot));
  env.addGlobal("blog_by_id", (id) => {
    if (contentState?.group) return { ...contentState.group };
    return {
      id: id ?? null,
      absolute_url: blogUrlAssumption("blog_by_id", blogRoot),
      public_title: "Blog",
      html_title: "Blog"
    };
  });
  const blogPostFixture = /* @__PURE__ */ __name(() => loadFixture(themeRoot, "blog-posts.json", []), "blogPostFixture");
  const asPostBean = /* @__PURE__ */ __name((post) => toPostBean(post, { blogTitle }), "asPostBean");
  const stateTopics = Array.isArray(contentState?.blog?.topics) ? contentState.blog.topics : null;
  const topicsById = new Map(
    (stateTopics ?? []).filter((topic) => topic && typeof topic === "object").map((topic) => [String(topic.id), topic])
  );
  const resolveTopics = /* @__PURE__ */ __name((list) => Array.isArray(list) ? list.map(
    (entry) => entry !== null && typeof entry === "object" ? entry : topicsById.get(String(entry)) ?? { id: entry, name: String(entry), slug: String(entry) }
  ) : list, "resolveTopics");
  const statePostBean = /* @__PURE__ */ __name((post) => {
    const read = listingPost(withBlogAuthorAlias({ ...post, topic_list: resolveTopics(post.topic_list) ?? [] }));
    if ("tag_list" in post) read.tag_list = resolveTopics(post.tag_list);
    else read.tag_list = read.topic_list;
    return asPostBean(read);
  }, "statePostBean");
  const statePosts = Array.isArray(contentState?.blog?.posts) ? contentState.blog.posts : null;
  const topicSlugs = /* @__PURE__ */ __name((tags) => new Set((Array.isArray(tags) ? tags : [tags]).filter((tag) => tag !== null && tag !== void 0).map((tag) => String(tag))), "topicSlugs");
  env.addGlobal("blog_tags", (_blog, limit = 250) => {
    const cap = Number.isFinite(Number(limit)) && Number(limit) > 0 ? Math.floor(Number(limit)) : 250;
    if (stateTopics) return stateTopics.slice(0, cap).map((topic) => ({ ...topic }));
    const seen = /* @__PURE__ */ new Map();
    for (const post of blogPostFixture()) {
      for (const topic of asPostBean(post).topic_list ?? []) {
        const key = String(topic.slug ?? topic.name ?? "");
        if (key && !seen.has(key)) seen.set(key, topic);
      }
    }
    return [...seen.values()].slice(0, cap);
  });
  let reportedContentByIdMiss = false;
  env.addGlobal("content_by_id", (id) => {
    const wanted = String(id ?? "");
    if (contentState && String(contentState.content?.id ?? "") === wanted && wanted !== "") {
      return bindContentBean(contentState.content, { postBean: contentState.kind === "blog-post", blogTitle });
    }
    const statePost = statePosts?.find((candidate) => String(candidate?.id ?? "") === wanted);
    if (statePost) return statePostBean(statePost);
    const post = blogPostFixture().find((candidate) => String(candidate?.id ?? "") === wanted);
    if (post) return asPostBean(post);
    if (!reportedContentByIdMiss) {
      reportedContentByIdMiss = true;
      collector.diagnostics.push(
        diagnostic(
          DIAGNOSTIC_CODES.HUBL_GLOBAL_UNIMPLEMENTED,
          `content_by_id(${JSON.stringify(wanted)}) found nothing: offline, only the previewed page, its blog's posts and the posts in blog-posts.json can be looked up by id, so it answered null.`,
          { feature: "content_by_id", id: wanted }
        )
      );
    }
    return null;
  });
  env.addGlobal("blog_recent_posts", (_groupId, count = 3) => {
    if (statePosts) return statePosts.slice(0, count).map(statePostBean);
    const posts = blogPostFixture();
    return posts.slice(0, count).map((post) => asPostBean({
      id: post.id,
      title: post.name ?? post.label,
      name: post.name ?? post.label,
      label: post.label ?? post.name,
      slug: post.slug ?? "",
      absolute_url: post.absolute_url ?? post.absoluteUrl,
      absoluteUrl: post.absoluteUrl ?? post.absolute_url,
      featured_image: post.featured_image ?? post.featuredImage,
      featured_image_alt: post.featured_image_alt_text ?? post.featuredImageAltText,
      featured_image_alt_text: post.featured_image_alt_text ?? post.featuredImageAltText,
      featured_image_width: post.featured_image_width ?? post.featuredImageWidth ?? 800,
      featured_image_height: post.featured_image_height ?? post.featuredImageHeight ?? 450,
      featuredImage: post.featuredImage ?? post.featured_image,
      featuredImageAltText: post.featuredImageAltText ?? post.featured_image_alt_text,
      featuredImageWidth: post.featuredImageWidth ?? post.featured_image_width ?? 800,
      featuredImageHeight: post.featuredImageHeight ?? post.featured_image_height ?? 450,
      topic_list: post.topic_list ?? (post.topicNames ?? []).map((t) => ({ name: t })),
      tag_list: post.tag_list ?? post.topic_list ?? [],
      topicNames: post.topicNames ?? (post.topic_list ?? []).map((t) => t.name),
      publish_date: post.publish_date,
      publish_date_localized: post.publish_date_localized ?? "",
      post_body: post.post_body ?? "",
      post_summary: post.post_summary ?? "",
      comment_count: post.comment_count ?? 0,
      blog_post_author: post.blog_post_author ?? null,
      blog_author: post.blog_author ?? { display_name: "Preview Author", avatar: "" },
      ...post.html_title !== void 0 ? { html_title: post.html_title } : {}
    }));
  });
  env.addGlobal("blog_recent_tag_posts", (_blogId, tag, count = 3) => {
    if (statePosts) {
      const wanted = topicSlugs(tag);
      return statePosts.map(statePostBean).filter((post) => (post.topic_list ?? []).some((topic) => wanted.has(String(topic?.slug ?? "")))).slice(0, count);
    }
    const posts = blogPostFixture();
    return posts.slice(0, count).map((post) => asPostBean({
      id: post.id,
      title: post.name ?? post.label,
      name: post.name ?? post.label,
      label: post.label ?? post.name,
      slug: post.slug ?? "",
      absolute_url: post.absolute_url ?? post.absoluteUrl,
      absoluteUrl: post.absoluteUrl ?? post.absolute_url,
      featured_image: post.featured_image ?? post.featuredImage,
      featured_image_alt_text: post.featured_image_alt_text ?? post.featuredImageAltText,
      featured_image_width: post.featured_image_width ?? post.featuredImageWidth ?? 800,
      featured_image_height: post.featured_image_height ?? post.featuredImageHeight ?? 450,
      featuredImage: post.featuredImage ?? post.featured_image,
      featuredImageAltText: post.featuredImageAltText ?? post.featured_image_alt_text,
      featuredImageWidth: post.featuredImageWidth ?? post.featured_image_width ?? 800,
      featuredImageHeight: post.featuredImageHeight ?? post.featured_image_height ?? 450,
      topic_list: post.topic_list ?? [],
      tag_list: post.tag_list ?? post.topic_list ?? [],
      topicNames: post.topicNames ?? (post.topic_list ?? []).map((t) => t.name),
      publish_date: post.publish_date,
      publish_date_localized: post.publish_date_localized ?? "",
      post_body: post.post_body ?? "",
      blog_author: post.blog_author ?? null,
      ...post.html_title !== void 0 ? { html_title: post.html_title } : {}
    }));
  });
  if (contentState?.kind === "blog-listing") {
    const source = Array.isArray(contentState.contents) ? contentState.contents : statePosts ?? blogPostFixture();
    const contents = Array.isArray(contentState.contents) || statePosts ? source.map(statePostBean) : source.map((post) => asPostBean(listingPost(post)));
    const currentPage = positiveInteger(contentState.current_page_num) ?? 1;
    const lastPage = positiveInteger(contentState.last_page_num) ?? currentPage;
    const nextPage = positiveInteger(contentState.next_page_num);
    contents.total_count = statePosts?.length ?? contents.length;
    contents.total_page_count = lastPage;
    env.addGlobal("contents", contents);
    env.addGlobal("current_page_num", currentPage);
    if (nextPage !== null) env.addGlobal("next_page_num", nextPage);
    env.addGlobal("last_page_num", lastPage);
    env.addGlobal("previous_page_num", currentPage > 1 ? currentPage - 1 : 0);
  }
  env.addGlobal("business_unit", () => ({}));
  env.addGlobal("module_id", () => `module_${++collector.moduleCounter}`);
  const menuFixture = loadFixture(themeRoot, "menu.json", { children: [] });
  const keyedMenus = loadFixture(themeRoot, "menus.json", []);
  const resolveMenu = /* @__PURE__ */ __name((menuId) => {
    if (Array.isArray(keyedMenus) && keyedMenus.length > 0 && menuId != null && menuId !== "") {
      const wanted = String(menuId);
      const hit = keyedMenus.find((entry) => entry && String(entry.id) === wanted);
      if (hit && hit.tree) return hit.tree;
    }
    return menuFixture;
  }, "resolveMenu");
  env.addGlobal("menu", (menuId, _rootType) => resolveMenu(menuId));
  env.addGlobal("simple_menu", (menuId, _orientation) => resolveMenu(menuId));
  env.addGlobal("form", (kwargs) => {
    const formFixture = resolveKeyedForm(themeRoot, kwargs?.form_to_use) ?? loadFixture(themeRoot, "form.json", { formFieldGroups: [], submitText: "Submit" });
    const formId = kwargs?.form_to_use ?? formFixture.guid ?? "preview-form";
    const submitText = formFixture.submitText ?? "Submit";
    const fields = [];
    if (formFixture.formFieldGroups) {
      for (const group of formFixture.formFieldGroups) {
        if (group.fields) {
          for (const f of group.fields) {
            if (!f.hidden) fields.push(f);
          }
        }
      }
    } else if (formFixture.fields) {
      fields.push(...formFixture.fields);
    }
    const fieldHtml = fields.map((f) => {
      const requiredAttr = f.required ? " required" : "";
      const labelRequired = f.required ? '<span class="hs-form-required">*</span>' : "";
      const fieldType = f.fieldType ?? f.type ?? "text";
      const placeholder = f.placeholder ?? "";
      const description = f.description ? `<legend class="hs-field-desc">${f.description}</legend>` : "";
      let inputTag;
      if (fieldType === "textarea") {
        inputTag = `<textarea id="${f.name}" name="${f.name}" class="hs-input" placeholder="${placeholder}"${requiredAttr}></textarea>`;
      } else if (fieldType === "select") {
        const options2 = (f.options ?? []).map(
          (o) => `<option value="${o.value}"${o.selected ? " selected" : ""}>${o.label}</option>`
        ).join("");
        inputTag = `<select id="${f.name}" name="${f.name}" class="hs-input"${requiredAttr}><option value="" disabled selected>Please select</option>${options2}</select>`;
      } else if (fieldType === "checkbox") {
        const options2 = (f.options ?? []).map(
          (o) => `<li><label class="hs-form-checkbox-display"><input type="checkbox" name="${f.name}" value="${o.value}" class="hs-input"><span>${o.label}</span></label></li>`
        ).join("");
        inputTag = `<ul class="inputs-list">${options2}</ul>`;
      } else if (fieldType === "radio") {
        const options2 = (f.options ?? []).map(
          (o) => `<li><label class="hs-form-radio-display"><input type="radio" name="${f.name}" value="${o.value}" class="hs-input"><span>${o.label}</span></label></li>`
        ).join("");
        inputTag = `<ul class="inputs-list">${options2}</ul>`;
      } else {
        const inputType = f.validation?.name === "email" ? "email" : fieldType === "phonenumber" ? "tel" : "text";
        inputTag = `<input type="${inputType}" id="${f.name}" name="${f.name}" class="hs-input" placeholder="${placeholder}"${requiredAttr}>`;
      }
      const labelHtml = f.labelHidden ? "" : `<label class="hs-form-label" for="${f.name}"><span>${f.label}</span>${labelRequired}</label>`;
      return `<div class="hs-form-field">${labelHtml}${description}<div class="input">${inputTag}</div></div>`;
    }).join("\n");
    return `<form id="hsForm_${formId}" class="hs-form-private hsForm_${formId} hs-form stacked" data-form-id="${formId}" data-portal-id="${formFixture.portalId ?? 0}" novalidate>
${fieldHtml}
<div class="hs_submit hs-submit"><div class="hs-field-desc" style="display:none"></div><div class="actions"><input type="submit" class="hs-button primary large" value="${submitText}"></div></div>
</form>`;
  });
  env.addGlobal("subscription_types", loadFixture(themeRoot, "subscription-types.json", []));
  const stateRows = Array.isArray(contentState?.dynamicPage?.rows) ? contentState.dynamicPage.rows : null;
  const tableRows = /* @__PURE__ */ __name(() => stateRows ?? loadFixture(themeRoot, "hubdb-rows.json", []), "tableRows");
  env.addGlobal("hubdb_table_rows", (_tableId) => {
    return tableRows();
  });
  env.addGlobal("hubdb_table_row", (_tableId, rowId) => {
    const rows = tableRows();
    const stateRow = contentState?.dynamicPage?.row;
    if (rowId !== void 0) {
      return rows.find((r) => r.hs_id === rowId) ?? (stateRow && stateRow.hs_id === rowId ? stateRow : null);
    }
    if (stateRow) return stateRow;
    return rows[0] ?? null;
  });
  const reportedCrmFixtureProblems = /* @__PURE__ */ new Set();
  const reportedCrmQueries = /* @__PURE__ */ new Set();
  const crmFixtureFor = /* @__PURE__ */ __name((objectType) => {
    const lookup = loadCrmObjectFixture(themeRoot, objectType);
    for (const problem of lookup.problems) {
      if (reportedCrmFixtureProblems.has(problem.file)) continue;
      reportedCrmFixtureProblems.add(problem.file);
      collector.diagnostics.push(
        diagnostic(
          DIAGNOSTIC_CODES.CRM_OBJECT_FIXTURE_INVALID,
          `${problem.file} is not a CRM object fixture (${problem.detail}), so it answered no crm_objects or crm_object call. A fixture is a JSON object with a \`records\` array of \`{ "id", "properties" }\`.`,
          { file: problem.file, reason: problem.reason }
        )
      );
    }
    return lookup.match;
  }, "crmFixtureFor");
  const crmStub = /* @__PURE__ */ __name((feature, objectType) => {
    const fixturePath = crmObjectFixturePathFor(objectType);
    return tier3Stub(
      feature,
      `${feature} is not supported by the offline renderer without a fixture for ${JSON.stringify(crmText(objectType) ?? null)} \u2014 create ${fixturePath} in the theme to preview its records, or remove or replace it for a faithful render`,
      { objectType: crmText(objectType), fixturePath }
    );
  }, "crmStub");
  const reportCrmQuery = /* @__PURE__ */ __name((feature, objectType, match, ignored, reason) => {
    if (ignored.length === 0) return;
    const key = `${feature}\0${crmText(objectType)}\0${reason}\0${ignored.join("&")}`;
    if (reportedCrmQueries.has(key)) return;
    reportedCrmQueries.add(key);
    const call = `${feature}(${JSON.stringify(crmText(objectType))}, \u2026)`;
    collector.diagnostics.push(
      diagnostic(
        DIAGNOSTIC_CODES.CRM_OBJECT_QUERY_NOT_APPLIED,
        reason === "id-not-in-fixture" ? `${call} asked for a record ${match.file} does not have (${ignored.join(", ")}), so its first record stood in. Add a record with that id to the fixture to preview it.` : `${call} was answered from ${match.file} without applying ${ignored.join(", ")}: offline, only limit= (and crm_object's record id) is applied to fixture records.`,
        { feature, objectType: crmText(objectType), file: match.file, ignored, reason }
      )
    );
  }, "reportCrmQuery");
  env.addGlobal("crm_objects", (objectType, query, properties) => {
    const match = crmFixtureFor(objectType);
    if (!match) return crmStub("crm_objects", objectType);
    const parsed = readCrmQuery(query, "crm_objects");
    reportCrmQuery("crm_objects", objectType, match, parsed.notApplied, "clause-not-applied");
    const names = crmPropertyNames(properties);
    const records = match.fixture.records;
    const results = records.slice(0, parsed.limit ?? CRM_OBJECTS_DEFAULT_LIMIT).map((record) => crmObjectResult(record, names));
    return { results, total: records.length, has_more: results.length < records.length, offset: results.length };
  });
  env.addGlobal("crm_object", (objectType, query, properties) => {
    const match = crmFixtureFor(objectType);
    if (!match) return crmStub("crm_object", objectType);
    const parsed = readCrmQuery(query, "crm_object");
    reportCrmQuery("crm_object", objectType, match, parsed.notApplied, "clause-not-applied");
    const records = match.fixture.records;
    let record;
    if (parsed.id !== void 0) {
      record = records.find((candidate) => String(crmRecordId(candidate)) === parsed.id);
      if (!record) reportCrmQuery("crm_object", objectType, match, [`hs_object_id=${parsed.id}`], "id-not-in-fixture");
    }
    record ??= records[0];
    return record ? crmObjectResult(record, crmPropertyNames(properties)) : null;
  });
  env.addFilter("sanitize_html", (val, mode) => {
    if (mode === "STRIP") return String(val).replace(/<[^>]*>/g, "");
    return String(val);
  });
  env.addFilter(
    "escape_attr",
    (val) => String(val).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
  );
  env.addFilter("escape_url", (val) => encodeURI(String(val)));
  env.addFilter(
    "escape_html",
    (val) => String(val ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
  );
  env.addFilter("convert_rgb", convertRgb);
  env.addFilter("format_date", (val, format) => {
    if (!val) return "";
    const d = new Date(val);
    if (isNaN(d.getTime())) return String(val);
    const styles = {
      short: "short",
      medium: "medium",
      long: "long",
      full: "full"
    };
    const dateStyle = styles[String(format ?? "medium").toLowerCase()] ?? "long";
    try {
      return formatNamedDateStyle(d, dateStyle);
    } catch {
      return String(val);
    }
  });
  env.addFilter("format_datetime", (val, format) => {
    if (!val) return "";
    try {
      const d = new Date(val);
      if (isNaN(d.getTime())) return String(val);
      if (format === "MMMM yyyy") {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return `${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
      }
      if (typeof format === "string" && !["short", "medium", "long", "full"].includes(format.toLowerCase())) {
        const patterned = formatJavaDatePattern(d, format);
        if (patterned !== null) return patterned;
      }
      return formatNamedDateStyle(d, "long");
    } catch {
      return String(val);
    }
  });
  env.addFilter("dump", (val) => JSON.stringify(val));
  env.addFilter("wordcount", (val) => {
    if (!val || typeof val !== "string") return 0;
    return val.trim().split(/\s+/).length;
  });
  env.addFilter("regex_replace", (val, pattern, replacement = "", flags = "g") => {
    try {
      return String(val).replace(new RegExp(pattern, flags), replacement);
    } catch {
      return String(val);
    }
  });
  env.addFilter("cut", (val, toRemove = "") => String(val).split(String(toRemove)).join(""));
  env.addFilter("xmlattr", (val, autospace = true) => {
    if (!val || typeof val !== "object") return "";
    const parts = [];
    for (const [rawName, rawValue] of Object.entries(val)) {
      if (rawValue == null || rawValue === false) continue;
      if (!/^[^\s"'<>=/]+$/.test(rawName)) continue;
      parts.push(`${rawName}="${escapeHtmlAttribute(String(rawValue))}"`);
    }
    if (parts.length === 0) return "";
    return new import_nunjucks.default.runtime.SafeString(`${autospace ? " " : ""}${parts.join(" ")}`);
  });
  env.addFilter(
    "slugify",
    (val) => String(val).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
  );
  env.addFilter("format_currency_value", (val, ...args) => {
    const opts = args.find((a) => a && typeof a === "object" && a.__keywords) ?? {};
    const locale = opts.locale ?? "en-GB";
    const currency = opts.currency ?? "GBP";
    const num = Number(val);
    if (!Number.isFinite(num)) return String(val);
    try {
      return new Intl.NumberFormat(locale, { style: "currency", currency }).format(num);
    } catch {
      return `\xA3${num.toFixed(2)}`;
    }
  });
  env.addFilter("between_times", (start, end, unit = "seconds") => {
    const a = new Date(start).getTime();
    const b = new Date(end).getTime();
    if (Number.isNaN(a) || Number.isNaN(b)) return 0;
    const ms = b - a;
    const per = {
      milliseconds: 1,
      seconds: 1e3,
      minutes: 6e4,
      hours: 36e5,
      days: 864e5,
      weeks: 6048e5
    };
    const divisor = per[String(unit)] ?? 1e3;
    return Math.floor(ms / divisor);
  });
  env.addFilter("pprint", (val) => {
    try {
      return JSON.stringify(val, null, 2);
    } catch {
      return String(val);
    }
  });
  env.addFilter("truncatehtml", (val, length = 255, ellipsis = "\u2026") => {
    const text = String(val).replace(/<[^>]*>/g, "");
    return text.length <= length ? text : `${text.slice(0, length).trimEnd()}${ellipsis}`;
  });
  const keywordArgs = /* @__PURE__ */ __name((args) => args.find((arg) => arg && typeof arg === "object" && arg.__keywords) ?? {}, "keywordArgs");
  const positionalArgs = /* @__PURE__ */ __name((args) => args.filter((arg) => !(arg && typeof arg === "object" && arg.__keywords)), "positionalArgs");
  const asSequence = /* @__PURE__ */ __name((val) => Array.isArray(val) ? val : val == null ? [] : [val], "asSequence");
  const lookupAttribute = /* @__PURE__ */ __name((subject, attributePath) => {
    let cursor = subject;
    for (const segment of String(attributePath).split(".")) {
      if (cursor == null) return void 0;
      cursor = cursor[segment];
    }
    return cursor;
  }, "lookupAttribute");
  const membershipKey = /* @__PURE__ */ __name((value) => {
    if (value === null) return "null";
    if (value === void 0) return "undefined";
    if (typeof value === "object") {
      try {
        return `object:${JSON.stringify(value)}`;
      } catch {
        return `object:${String(value)}`;
      }
    }
    return `${typeof value}:${String(value)}`;
  }, "membershipKey");
  const uniqueBy = /* @__PURE__ */ __name((items, key) => {
    const seen = /* @__PURE__ */ new Set();
    const out = [];
    for (const item of items) {
      const token = membershipKey(key(item));
      if (seen.has(token)) continue;
      seen.add(token);
      out.push(item);
    }
    return out;
  }, "uniqueBy");
  const arithmetic = /* @__PURE__ */ __name((val, operand, apply) => {
    const a = toFiniteNumber(val);
    const b = toFiniteNumber(operand);
    if (a === null || b === null) return val;
    const result = apply(a, b);
    return Number.isFinite(result) ? result : val;
  }, "arithmetic");
  env.addFilter("add", (val, addend) => arithmetic(val, addend, (a, b) => a + b));
  env.addFilter("divide", (val, divisor) => arithmetic(val, divisor, (a, b) => a / b));
  env.addFilter("multiply", (val, factor) => arithmetic(val, factor, (a, b) => a * b));
  env.addFilter("divisible", (val, divisor) => {
    const a = toFiniteNumber(val);
    const b = toFiniteNumber(divisor);
    if (a === null || b === null || b === 0) return false;
    return a % b === 0;
  });
  env.addFilter("log", (val, base) => {
    const n = toFiniteNumber(val);
    if (n === null) return val;
    const b = base === void 0 ? void 0 : toFiniteNumber(base) ?? void 0;
    const result = logarithm(n, b);
    return Number.isFinite(result) ? result : val;
  });
  env.addFilter("root", (val, degree) => {
    const n = toFiniteNumber(val);
    if (n === null) return val;
    const d = degree === void 0 ? void 0 : toFiniteNumber(degree) ?? void 0;
    const result = nthRoot(n, d);
    return Number.isFinite(result) ? result : val;
  });
  env.addFilter("format_number", (val, ...args) => {
    const kwargs = keywordArgs(args);
    const [locale, maxDecimalDigits] = positionalArgs(args);
    const n = toFiniteNumber(val);
    if (n === null) return val == null ? "" : String(val);
    const digits = toFiniteNumber(kwargs.maxDecimalDigits ?? maxDecimalDigits);
    return formatNumberForLocale(n, kwargs.locale ?? locale, digits ?? void 0);
  });
  env.addFilter("filesizeformat", (val, ...args) => {
    const kwargs = keywordArgs(args);
    const [binaryPositional] = positionalArgs(args);
    const n = toFiniteNumber(val);
    if (n === null) return val == null ? "" : String(val);
    return fileSizeFormat(n, Boolean(kwargs.binary ?? binaryPositional ?? false));
  });
  env.addFilter("map", /* @__PURE__ */ __name(function mapFilter(val, ...args) {
    const kwargs = keywordArgs(args);
    const [name, ...rest] = positionalArgs(args);
    const items = asSequence(val);
    if (typeof kwargs.attribute === "string") {
      return items.map((item) => lookupAttribute(item, kwargs.attribute));
    }
    if (typeof name !== "string") return items;
    const registered = env.filters[name];
    if (typeof registered === "function") {
      const filterThis = this ?? env;
      const forwarded = [...rest];
      const innerKwargs = { ...kwargs };
      delete innerKwargs.attribute;
      if (Object.keys(innerKwargs).length > 1) forwarded.push(innerKwargs);
      return items.map((item) => registered.call(filterThis, item, ...forwarded));
    }
    return items.map((item) => lookupAttribute(item, name));
  }, "mapFilter"));
  env.addFilter("unique", (val, ...args) => {
    const kwargs = keywordArgs(args);
    const [attribute] = positionalArgs(args);
    const by = kwargs.attr ?? kwargs.attribute ?? attribute;
    return uniqueBy(
      asSequence(val),
      (item) => typeof by === "string" ? lookupAttribute(item, by) : item
    );
  });
  env.addFilter("intersect", (val, other) => {
    const otherKeys = new Set(asSequence(other).map(membershipKey));
    return uniqueBy(asSequence(val).filter((item) => otherKeys.has(membershipKey(item))), (item) => item);
  });
  env.addFilter(
    "union",
    (val, other) => uniqueBy([...asSequence(val), ...asSequence(other)], (item) => item)
  );
  env.addFilter("difference", (val, other) => {
    const otherKeys = new Set(asSequence(other).map(membershipKey));
    return uniqueBy(asSequence(val).filter((item) => !otherKeys.has(membershipKey(item))), (item) => item);
  });
  env.addFilter("attr", (val, attributeName) => lookupAttribute(val, attributeName));
  const TRUTHY_WORDS = /* @__PURE__ */ new Set(["true", "yes", "on", "y", "t", "1"]);
  env.addFilter("bool", (val) => {
    if (typeof val === "boolean") return val;
    if (typeof val === "number") return Number.isFinite(val) && val !== 0;
    if (typeof val === "string") return TRUTHY_WORDS.has(val.trim().toLowerCase());
    return false;
  });
  env.addFilter("fromjson", (val) => {
    if (typeof val !== "string") return val;
    try {
      return JSON.parse(val);
    } catch {
      return val;
    }
  });
  env.addFilter("md5", (val) => md5(val == null ? "" : String(val)));
  env.addFilter(
    "wordwrap",
    (val, width = 79) => wordWrap(val == null ? "" : String(val), toFiniteNumber(width) ?? 79)
  );
  env.addFilter("escape_jinjava", (val) => escapeJinjavaBraces(val == null ? "" : String(val)));
  env.addFilter(
    "escape_js",
    (val) => escapeJinjavaBraces(escapeJavaScriptString(val == null ? "" : String(val)))
  );
  env.addFilter("unescape_html", (val) => unescapeHtmlEntities(val == null ? "" : String(val)));
  env.addFilter("urldecode", (val) => {
    if (val && typeof val === "object" && !Array.isArray(val)) {
      return Object.fromEntries(
        Object.entries(val).map(([key, value]) => [key, urlDecode(String(value ?? ""))])
      );
    }
    return urlDecode(val == null ? "" : String(val));
  });
  env.addFilter(
    "strtotime",
    (val, format) => parseHublDateTime(val, typeof format === "string" ? format : void 0) ?? val
  );
  env.addFilter("unixtimestamp", (val) => {
    const parsed = parseHublDateTime(val);
    return parsed ? parsed.getTime() : val;
  });
  env.addFilter("format_time", (val, ...args) => {
    const kwargs = keywordArgs(args);
    const [format, timeZone, locale] = positionalArgs(args);
    const parsed = parseHublDateTime(val);
    if (!parsed) return val;
    return formatTimeComponent(
      parsed,
      kwargs.format ?? format ?? "medium",
      kwargs.timeZone ?? timeZone,
      kwargs.locale ?? locale
    );
  });
  const passThroughFilter = /* @__PURE__ */ __name((value) => value, "passThroughFilter");
  const resolveRegisteredFilter = env.getFilter.bind(env);
  const alreadyReportedMissing = /* @__PURE__ */ __name((name) => collector.diagnostics.some(
    (entry) => entry.code === DIAGNOSTIC_CODES.HUBL_FILTER_UNSUPPORTED && entry.details?.filter === name
  ), "alreadyReportedMissing");
  const META_FIELD_TRANSPARENT_FILTERS = /* @__PURE__ */ new Set([
    "default",
    "d",
    "safe",
    "tojson",
    "dump",
    "pprint",
    INTERPOLATION_FILTER
  ]);
  const rawTextFilters = /* @__PURE__ */ new Map();
  const rawTextFilter = /* @__PURE__ */ __name((name, filter) => {
    let wrapped = rawTextFilters.get(name);
    if (!wrapped || wrapped.__themespotFilter !== filter) {
      wrapped = /* @__PURE__ */ __name(function rawTextFilterCall(value, ...rest) {
        return filter.call(this, plainHublValue(value), ...rest);
      }, "rawTextFilterCall");
      wrapped.__themespotFilter = filter;
      rawTextFilters.set(name, wrapped);
    }
    return wrapped;
  }, "rawTextFilter");
  env.getFilter = (name) => {
    if (typeof env.filters[name] === "function") {
      const filter = resolveRegisteredFilter(name);
      return META_FIELD_TRANSPARENT_FILTERS.has(name) ? filter : rawTextFilter(name, filter);
    }
    if (!alreadyReportedMissing(name)) {
      collector.diagnostics.push(
        diagnostic(
          DIAGNOSTIC_CODES.HUBL_FILTER_UNSUPPORTED,
          `HubL filter \`${name}\` is not implemented by this renderer. Its input was passed through unchanged.`,
          { filter: name }
        )
      );
    }
    return passThroughFilter;
  };
  env.addTest("string_containing", (val, substr) => {
    const text = plainHublValue(val);
    return typeof text === "string" && text.includes(substr);
  });
  env.addTest("string", (val) => typeof plainHublValue(val) === "string");
  env.addTest("mapping", (val) => {
    return val !== null && typeof val === "object" && !Array.isArray(val) && !(val instanceof HublMetaFieldText);
  });
  const equalTo = /* @__PURE__ */ __name((val, other) => plainHublValue(val) === plainHublValue(other), "equalTo");
  env.addTest("equalto", equalTo);
  env.addTest("eq", equalTo);
  env.addTest(
    "string_startingwith",
    (val, prefix) => typeof val === "string" && val.startsWith(String(prefix))
  );
  env.addTest("truthy", (val) => {
    if (val === null || val === void 0 || val === false || val === "" || val === 0) return false;
    if (Array.isArray(val)) return val.length > 0;
    if (typeof val === "object") return Object.keys(val).length > 0;
    return Boolean(val);
  });
  env.addTest("containing", (collection, item) => {
    if (typeof collection === "string") return collection.includes(String(item));
    if (Array.isArray(collection)) return collection.includes(item);
    if (collection !== null && typeof collection === "object") {
      return Object.prototype.hasOwnProperty.call(collection, String(item));
    }
    return false;
  });
  const isNone = /* @__PURE__ */ __name((val) => val === null || val === void 0, "isNone");
  env.addTest("null", isNone);
  env.addTest("none", isNone);
  env.addTest("boolean", (val) => typeof val === "boolean");
  env.addTest("sequence", (val) => {
    if (Array.isArray(val) || typeof val === "string") return true;
    return val !== null && typeof val === "object";
  });
  env.addTest(
    "float",
    (val) => typeof val === "number" && Number.isFinite(val) && !Number.isInteger(val)
  );
  env.addTest("integer", (val) => typeof val === "number" && Number.isInteger(val));
  const memberOf = /* @__PURE__ */ __name((collection, item) => {
    if (typeof collection === "string") return collection.includes(String(item));
    const wanted = membershipKey(item);
    return asSequence(collection).some((candidate) => membershipKey(candidate) === wanted);
  }, "memberOf");
  env.addTest(
    "containingall",
    (collection, items) => asSequence(items).every((item) => memberOf(collection, item))
  );
  env.addTest("within", (val, collection) => memberOf(collection, val));
  const greaterOrEqual = /* @__PURE__ */ __name((val, other) => val >= other, "greaterOrEqual");
  const lessOrEqual = /* @__PURE__ */ __name((val, other) => val <= other, "lessOrEqual");
  env.addTest("gte", greaterOrEqual);
  env.addTest("lte", lessOrEqual);
  env.addFilter("split", (val, separator = "", limit) => {
    const parts = String(val ?? "").split(String(separator));
    if (typeof limit !== "number" || limit <= 0 || limit >= parts.length) return parts;
    return [...parts.slice(0, limit - 1), parts.slice(limit - 1).join(String(separator))];
  });
  const escapeForScriptContext = /* @__PURE__ */ __name((json) => json.replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029"), "escapeForScriptContext");
  env.addFilter("tojson", (val) => escapeForScriptContext(JSON.stringify(val ?? null)));
  env.addFilter(
    "escapejson",
    (val) => escapeForScriptContext(JSON.stringify(String(val ?? "")).slice(1, -1))
  );
  env.addFilter("render", (val) => val == null ? "" : String(val));
  env.addFilter(INTERPOLATION_FILTER, (val) => {
    if (val === null || val === void 0) return "";
    return val instanceof HublMetaFieldText ? val.printed() : val;
  });
  env.addFilter(MENU_LINK_UNSAFE_FILTER, (val) => isUnsafeMenuLinkUrl(plainHublValue(val)));
  env.addExtension("DndAreaTag", new DndAreaExtension(env, collector));
  env.addExtension("DndSectionTag", new DndSectionExtension(env, collector));
  env.addExtension("DndColumnTag", new DndColumnExtension(env, collector));
  env.addExtension("DndRowTag", new DndRowExtension(env, collector));
  env.addExtension("DndModuleTag", new DndModuleExtension(env, collector, themeRoot, renderModule, themeRoots));
  env.addExtension("IncludeDndPartialTag", new IncludeDndPartialExtension(env, collector, themeRoot, themeRoots));
  env.addExtension("GlobalPartialTag", new GlobalPartialExtension(env, themeRoot, options.renderGlobalPartials !== false, themeRoots, collector));
  env.addExtension("ModuleAttributeTag", new ModuleAttributeExtension(env));
  env.addExtension("RequireCssBlockTag", new RequireCssBlockExtension(env, collector));
  env.addExtension("RequireJsBlockTag", new RequireJsBlockExtension(env, collector));
  env.addExtension("RequireHeadBlockTag", new RequireHeadBlockExtension(collector));
  env.addExtension("RawHtmlTag", new RawHtmlExtension());
  env.addExtension(
    "ScopeCssTag",
    new ScopeCssExtension({
      renderToken: collector,
      onScoped: /* @__PURE__ */ __name((scopeId) => collector.scopedInstances.add(scopeId), "onScoped"),
      onDiagnostic: /* @__PURE__ */ __name((error) => collector.diagnostics.push(error), "onDiagnostic")
    })
  );
  for (const tag of FIELD_RENDER_WIDGET_TAGS) {
    env.addExtension(`ModuleFieldTag:${tag}`, new ModuleFieldTagExtension(env, collector, tag));
  }
  env.addExtension("WidgetBlockTag", new WidgetBlockExtension(env));
  env.addExtension("ModuleTag", new ModuleTagExtension(env, collector, themeRoot, renderModule, themeRoots));
  env.addExtension("ModuleBlockTag", new ModuleBlockExtension(env, collector, themeRoot, renderModule, themeRoots));
  env.addExtension("SetSyncTag", new SetSyncExtension());
  env.addExtension("MacroScopeTag", new MacroScopeExtension());
  env.addExtension("UnknownTag", new UnknownTagExtension(collector));
  if (collector.page) {
    const pageState = collector.page;
    const moduleDeps = { env, collector, themeRoots, themeRoot, renderModule };
    pageState.renderArea = (area, contextCtx, areaName) => renderPageArea(
      area,
      {
        section: /* @__PURE__ */ __name((kwargs, renderBody) => renderDndSectionMarkup(collector, kwargs, renderBody), "section"),
        row: /* @__PURE__ */ __name((kwargs, renderBody) => renderDndRowMarkup(collector, kwargs, renderBody), "row"),
        column: /* @__PURE__ */ __name((kwargs, renderBody) => renderDndColumnMarkup(collector, kwargs, renderBody), "column"),
        module: /* @__PURE__ */ __name((node) => renderPageModuleNode(moduleDeps, node, contextCtx), "module"),
        invalid: /* @__PURE__ */ __name((where, detail) => collector.diagnostics.push(
          diagnostic(
            DIAGNOSTIC_CODES.PAGE_LAYOUT_INVALID,
            `The page's stored layout at ${where} ${detail}, so it was skipped. The rest of the area renders.`,
            { where, detail }
          )
        ), "invalid")
      },
      areaName
    );
  }
  return { env, collector, themeRoots };
}
__name(createHublEngine, "createHublEngine");
function finishPageBinding(collector) {
  const page = collector.page;
  if (!page) return void 0;
  const unboundWidgets = Object.keys(page.binding.widgets).filter((key) => !page.boundWidgets.has(key));
  if (unboundWidgets.length > 0) {
    collector.diagnostics.push(
      diagnostic(
        DIAGNOSTIC_CODES.PAGE_WIDGET_UNBOUND,
        `The page holds values for ${unboundWidgets.length === 1 ? "a fixed module" : "fixed modules"} ${unboundWidgets.map((key) => JSON.stringify(key)).join(", ")} that no \`{% module %}\` or \`{% module_block %}\` on this render claimed, so ${unboundWidgets.length === 1 ? "it is" : "they are"} not drawn. A template that dropped the module leaves its old values behind; HubSpot does not draw them either.`,
        { widgets: unboundWidgets }
      )
    );
  }
  const unbound = Object.keys(page.binding.layoutSections).filter((key) => !page.consumedAreas.has(key));
  if (unbound.length > 0) {
    collector.diagnostics.push(
      diagnostic(
        DIAGNOSTIC_CODES.PAGE_LAYOUT_UNBOUND,
        `The page holds content for ${unbound.length === 1 ? "a drag-and-drop area" : "drag-and-drop areas"} ${unbound.map((key) => JSON.stringify(key)).join(", ")} that the template does not declare, so ${unbound.length === 1 ? "it is" : "they are"} not on this render. HubSpot draws a page's areas through its template, so the live page does not show them either.`,
        { areas: unbound }
      )
    );
  }
  return page.records;
}
__name(finishPageBinding, "finishPageBinding");
function renderHublStringWithCollector(options, template, ctx = {}) {
  resetDndArgsStore();
  const { env, collector } = createHublEngine(options);
  const preprocessed = preprocessHubl(template);
  const html = env.renderString(preprocessed, ctx);
  const pageModules = finishPageBinding(collector);
  return {
    html,
    diagnostics: collector.diagnostics,
    cssLinks: collector.cssLinks,
    jsLinks: collector.jsLinks,
    moduleScripts: collector.moduleScripts,
    inlineScripts: collector.inlineScripts,
    headMarkup: collector.headMarkup,
    reactModules: collector.reactModules,
    layoutSections: layoutSectionsOf(collector.layout),
    ...pageModules ? { pageModules } : {}
  };
}
__name(renderHublStringWithCollector, "renderHublStringWithCollector");
function renderHublString(options, template, ctx = {}) {
  return renderHublStringWithCollector(options, template, ctx).html;
}
__name(renderHublString, "renderHublString");
function renderTemplateWithCollector(options, templatePath) {
  resetDndArgsStore();
  const { env, collector, themeRoots } = createHublEngine(options);
  const ctx = options.templateContext ?? {};
  const templateFile = collector.provenance ? provenanceFileFor(collector.provenance, locateTemplate(themeRoots, templatePath)) : null;
  const html = withProvenanceFile(collector.provenance, templateFile, () => env.render(templatePath, ctx));
  const pageModules = finishPageBinding(collector);
  return {
    html,
    diagnostics: collector.diagnostics,
    cssLinks: collector.cssLinks,
    jsLinks: collector.jsLinks,
    moduleScripts: collector.moduleScripts,
    inlineScripts: collector.inlineScripts,
    headMarkup: collector.headMarkup,
    reactModules: collector.reactModules,
    layoutSections: layoutSectionsOf(collector.layout),
    ...pageModules ? { pageModules } : {}
  };
}
__name(renderTemplateWithCollector, "renderTemplateWithCollector");
function renderPageScaffoldWithCollector(options) {
  resetDndArgsStore();
  const { env, collector } = createHublEngine(options);
  const ctx = options.templateContext ?? {};
  const stored = collector.page?.binding.layoutSections ?? {};
  const areas = Object.keys(stored).map((key) => {
    const area = stored[key];
    const label = isPlainRecord(area) && typeof area.label === "string" ? area.label : "";
    return renderDndAreaMarkup(collector, key, { label }, () => "", ctx);
  });
  const header = env.renderString("{{ standard_header_includes }}", ctx);
  const footer = env.renderString("{{ standard_footer_includes }}", ctx);
  const html = `${header}<main class="themespot-page-scaffold">
${areas.join("\n")}
</main>${footer}`;
  const pageModules = finishPageBinding(collector);
  return {
    html,
    diagnostics: collector.diagnostics,
    cssLinks: collector.cssLinks,
    jsLinks: collector.jsLinks,
    moduleScripts: collector.moduleScripts,
    inlineScripts: collector.inlineScripts,
    headMarkup: collector.headMarkup,
    reactModules: collector.reactModules,
    layoutSections: layoutSectionsOf(collector.layout),
    pageModules: pageModules ?? []
  };
}
__name(renderPageScaffoldWithCollector, "renderPageScaffoldWithCollector");
function renderTemplate(options, templatePath) {
  return renderTemplateWithCollector(options, templatePath).html;
}
__name(renderTemplate, "renderTemplate");
var DndBlockExtension = class {
  static {
    __name(this, "DndBlockExtension");
  }
  env;
  collector;
  argumentsAreSerialisedAtUpload = true;
  constructor(env, collector) {
    this.env = env;
    this.collector = collector;
  }
  parse(parser, nodes) {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    const body = parser.parseUntilBlocks(this.endTag);
    parser.advanceAfterBlockEnd();
    return new nodes.CallExtension(this, "run", args, [body]);
  }
  getKwargs(context, args) {
    const first = args.length > 1 ? args[0] : void 0;
    if (typeof first === "number") {
      const rawStr = dndArgsStore.get(first) ?? "";
      return parseDndArgs(
        rawStr,
        this.env,
        context.ctx ?? {},
        this.argumentsAreSerialisedAtUpload ? { tagName: this.tags[0], collector: this.collector } : void 0
      );
    }
    return extractKwargs(args);
  }
  rawArgs(args) {
    const first = args.length > 1 ? args[0] : void 0;
    return typeof first === "number" ? dndArgsStore.get(first) ?? "" : "";
  }
};
function dndScopeName(raw) {
  const cleaned = String(raw ?? "").replace(/[^\w-]/g, "");
  return cleaned || "dnd_area";
}
__name(dndScopeName, "dndScopeName");
function dndAreaNameFromArgs(rawArgs, kwargs) {
  if (typeof kwargs._positional === "string" && kwargs._positional.trim()) {
    return kwargs._positional;
  }
  const leading = /^\s*(["'])([\s\S]*?)\1\s*,?/.exec(rawArgs);
  return leading ? leading[2] : "";
}
__name(dndAreaNameFromArgs, "dndAreaNameFromArgs");
function claimDndAreaName(collector, base) {
  if (!collector.dndAreaNames.has(base)) {
    collector.dndAreaNames.add(base);
    return base;
  }
  for (let ordinal = 2; ; ordinal += 1) {
    const candidate = `${base}-${ordinal}`;
    if (!collector.dndAreaNames.has(candidate)) {
      collector.dndAreaNames.add(candidate);
      return candidate;
    }
  }
}
__name(claimDndAreaName, "claimDndAreaName");
function dndAreaFrame(collector) {
  for (let i = collector.dndScopes.length - 1; i >= 0; i -= 1) {
    const frame = collector.dndScopes[i];
    if (frame.area) return frame;
  }
  const implicit = {
    name: claimDndAreaName(collector, "dnd_area"),
    rows: 0,
    columns: 0,
    partials: 0,
    area: { rowNumber: 0, moduleNumber: 0, css: [], mobileCss: [], rendersStyleBlock: false }
  };
  collector.dndScopes.unshift(implicit);
  return implicit;
}
__name(dndAreaFrame, "dndAreaFrame");
function dndOwnerScope(collector) {
  const top = collector.dndScopes[collector.dndScopes.length - 1];
  if (top) return top;
  return dndAreaFrame(collector);
}
__name(dndOwnerScope, "dndOwnerScope");
function withDndScope(collector, scope, render) {
  collector.dndScopes.push(scope);
  try {
    return render();
  } finally {
    const index = collector.dndScopes.lastIndexOf(scope);
    if (index !== -1) collector.dndScopes.splice(index, 1);
  }
}
__name(withDndScope, "withDndScope");
function dndChildScope(name) {
  return { name, rows: 0, columns: 0, partials: 0 };
}
__name(dndChildScope, "dndChildScope");
function layoutAreaFor(collector) {
  return layoutAreaFrame(collector.layout, dndAreaFrame(collector).name);
}
__name(layoutAreaFor, "layoutAreaFor");
function withLayoutFrame(collector, frame, render) {
  try {
    return render();
  } finally {
    closeLayoutFrame(collector.layout, frame, layoutReporters(collector));
  }
}
__name(withLayoutFrame, "withLayoutFrame");
function reportLayout(collector, record) {
  collector.diagnostics.push(record);
  collector.layout.reports.push(record);
}
__name(reportLayout, "reportLayout");
function layoutReporters(collector) {
  return {
    onCollision: /* @__PURE__ */ __name((requested, placed, node) => {
      const tagName = node.type === "custom_widget" ? "dnd_module" : "dnd_column";
      reportLayout(
        collector,
        diagnostic(
          DIAGNOSTIC_CODES.DND_HIERARCHY_VIOLATION,
          `Two drag-and-drop cells asked for offset ${requested} in the same row, so {% ${tagName} %} "${node.name}" was stored at offset ${placed} instead. HubSpot keys a row by offset: give each cell in a row its own \`offset\`, adding up to 12 with its \`width\`.`,
          { tag: tagName, name: node.name, requestedOffset: requested, storedOffset: placed }
        )
      );
    }, "onCollision"),
    onFlatten: /* @__PURE__ */ __name(({ kind, into, cells, styles }) => {
      const styled = styles && Object.keys(styles).length > 0;
      reportLayout(
        collector,
        diagnostic(
          DIAGNOSTIC_CODES.DND_HIERARCHY_VIOLATION,
          `A {% dnd_${kind} %} was written directly inside a {% dnd_${into} %}, which HubSpot's stored layout cannot nest, so its ${cells} cell${cells === 1 ? "" : "s"} joined the {% dnd_${into} %}'s own row` + (styled ? ` and its own styling (${Object.keys(styles).sort().join(", ")}) was discarded` : "") + ". Put the row inside a {% dnd_column %}, which is the level HubSpot stores rows at.",
          { kind, into, cells, discardedStyles: styled ? Object.keys(styles).sort() : [] }
        )
      );
    }, "onFlatten")
  };
}
__name(layoutReporters, "layoutReporters");
function withdrawLayoutReports(collector, withdrawn) {
  for (const record of withdrawn) {
    const index = collector.diagnostics.lastIndexOf(record);
    if (index !== -1) collector.diagnostics.splice(index, 1);
  }
}
__name(withdrawLayoutReports, "withdrawLayoutReports");
function dndAreaStyleBlock(area) {
  const parts = [];
  if (area.css.length > 0) parts.push(area.css.join(""));
  if (area.mobileCss.length > 0) parts.push(`@media (max-width: 767px){${area.mobileCss.join("")}}`);
  return parts.length > 0 ? `<style>${parts.join("")}</style>` : "";
}
__name(dndAreaStyleBlock, "dndAreaStyleBlock");
var DndAreaExtension = class extends DndBlockExtension {
  static {
    __name(this, "DndAreaExtension");
  }
  tags = ["dnd_area"];
  endTag = "end_dnd_area";
  argumentsAreSerialisedAtUpload = false;
  run(context, ...args) {
    const body = args[args.length - 1];
    const kwargs = this.getKwargs(context, args);
    return new import_nunjucks.default.runtime.SafeString(
      renderDndAreaMarkup(
        this.collector,
        dndAreaNameFromArgs(this.rawArgs(args), kwargs),
        kwargs,
        () => typeof body === "function" ? body() : "",
        context.ctx ?? {}
      )
    );
  }
};
function claimPageArea(collector, claimedName, rawName) {
  const page = collector.page;
  if (!page || page.globalDepth > 0) return null;
  for (const key of [claimedName, rawName.trim()]) {
    if (!key || page.consumedAreas.has(key)) continue;
    if (!Object.prototype.hasOwnProperty.call(page.binding.layoutSections, key)) continue;
    page.consumedAreas.add(key);
    const stored = page.binding.layoutSections[key];
    if (isPlainRecord(stored)) return stored;
    collector.diagnostics.push(
      diagnostic(
        DIAGNOSTIC_CODES.PAGE_LAYOUT_INVALID,
        `The page's stored content for drag-and-drop area ${JSON.stringify(key)} is not a layout node, so the area renders empty rather than as the template's default content, which is not this page's.`,
        { where: key, detail: "is not a layout node" }
      )
    );
    return {};
  }
  return null;
}
__name(claimPageArea, "claimPageArea");
function renderDndAreaMarkup(collector, rawName, kwargs, renderBody, contextCtx) {
  const scope = {
    name: claimDndAreaName(collector, dndScopeName(rawName)),
    rows: 0,
    columns: 0,
    partials: 0,
    area: { rowNumber: 0, moduleNumber: 0, css: [], mobileCss: [], rendersStyleBlock: true }
  };
  const layoutFrame = openLayoutArea(
    collector.layout,
    scope.name,
    typeof kwargs.label === "string" ? kwargs.label : ""
  );
  const stored = claimPageArea(collector, scope.name, rawName);
  const renderArea = collector.page?.renderArea;
  const render = stored && renderArea ? () => renderArea(stored, contextCtx, scope.name) : renderBody;
  const bodyContent = withProvenanceDndArea(
    collector.provenance,
    scope.name,
    () => withDndScope(collector, scope, () => withLayoutFrame(collector, layoutFrame, render))
  );
  const areaProvenance = collector.provenance ? provenanceAttributes(structuralProvenance(collector.provenance, "page", { dnd: scope.name })) : "";
  const areaClass = typeof kwargs.class === "string" ? kwargs.class.trim() : "";
  const className = `container-fluid${areaClass ? " " + areaClass : ""}`;
  return `${dndAreaStyleBlock(scope.area)}<div class="${escapeHtmlAttribute(className)}"${areaProvenance}>
  <div class="row-fluid-wrapper">
    <div class="row-fluid">
      <div class="span12 widget-span widget-type-cell" data-widget-type="cell" data-x="0" data-w="12">
        ${bodyContent}
      </div>
    </div>
  </div>
</div>`;
}
__name(renderDndAreaMarkup, "renderDndAreaMarkup");
var DND_LENGTH_RE = /^-?[\d.]+(?:px|rem|em|%|vh|vw|vmin|vmax|ch|ex|pt|pc|cm|mm|in)?$|^auto$/i;
function dndLength(value, onReject) {
  if (typeof value === "number") return Number.isFinite(value) ? `${value}px` : null;
  if (typeof value !== "string") return null;
  const text = value.trim();
  if (text === "") return null;
  if (!DND_LENGTH_RE.test(text)) {
    onReject?.(text);
    return null;
  }
  return /^-?[\d.]+$/.test(text) ? `${text}px` : text;
}
__name(dndLength, "dndLength");
var DND_UNSAFE_CSS_VALUE_RE = /[;{}<>"'\\@]|\/\*|\*\//;
function isSafeCssValue(text) {
  if (DND_UNSAFE_CSS_VALUE_RE.test(text)) return false;
  let depth = 0;
  for (const character of text) {
    if (character === "(") depth += 1;
    else if (character === ")") {
      depth -= 1;
      if (depth < 0) return false;
    }
  }
  return depth === 0;
}
__name(isSafeCssValue, "isSafeCssValue");
var DND_COLOUR_RE = /^#[0-9a-f]{3,8}$|^[a-z][\w-]*(?:\([\s\S]*\))?$/i;
function dndColour(value, onReject) {
  if (!value) return null;
  const literal = /* @__PURE__ */ __name((text) => {
    const trimmed = text.trim();
    if (!trimmed) return null;
    if (!isSafeCssValue(trimmed) || !DND_COLOUR_RE.test(trimmed)) {
      onReject?.(trimmed);
      return null;
    }
    return trimmed;
  }, "literal");
  if (typeof value === "string") return literal(value);
  if (typeof value !== "object") return null;
  if (typeof value.color === "string" && value.color.trim()) return literal(value.color);
  if (typeof value.r !== "number") return null;
  return `rgba(${Number(value.r) || 0},${Number(value.g) || 0},${Number(value.b) || 0},${Number.isFinite(Number(value.a)) ? Number(value.a) : 1})`;
}
__name(dndColour, "dndColour");
function dndBackgroundImageUrl(value, onReject) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/[<>{};\\"]|\/\*|\*\//.test(trimmed)) {
    onReject?.(trimmed);
    return null;
  }
  return trimmed.replace(
    /[ ()']/g,
    (character) => ({ " ": "%20", "(": "%28", ")": "%29", "'": "%27" })[character] ?? character
  );
}
__name(dndBackgroundImageUrl, "dndBackgroundImageUrl");
function dndPaddingDeclarations(padding, onReject) {
  if (!padding || typeof padding !== "object") return "";
  let out = "";
  for (const side of ["top", "right", "bottom", "left"]) {
    const length = dndLength(padding[side], onReject);
    if (length !== null) out += `padding-${side}: ${length} !important;`;
  }
  return out;
}
__name(dndPaddingDeclarations, "dndPaddingDeclarations");
function dndLengthRejectReporter(collector, tagName) {
  return (value) => {
    const key = `${tagName}:${value}`;
    if (collector.rejectedDndLengths.has(key)) return;
    collector.rejectedDndLengths.add(key);
    collector.diagnostics.push(
      diagnostic(
        DIAGNOSTIC_CODES.HUBL_GLOBAL_UNIMPLEMENTED,
        `{% ${tagName} %} was given "${value}" as a layout length, which is not one, so that declaration was dropped. HubSpot layout values are numbers of pixels, optionally with a CSS unit.`,
        { feature: `${tagName} length`, value }
      )
    );
  };
}
__name(dndLengthRejectReporter, "dndLengthRejectReporter");
function dndValueRejectReporter(collector, tagName, kind) {
  return (value) => {
    const key = `${tagName}:${kind}:${value}`;
    if (collector.rejectedDndLengths.has(key)) return;
    collector.rejectedDndLengths.add(key);
    collector.diagnostics.push(
      diagnostic(
        DIAGNOSTIC_CODES.HUBL_GLOBAL_UNIMPLEMENTED,
        `{% ${tagName} %} was given "${value}" as a ${kind}, which cannot be written into a CSS rule safely, so that declaration was dropped.`,
        { feature: `${tagName} ${kind}`, value }
      )
    );
  };
}
__name(dndValueRejectReporter, "dndValueRejectReporter");
var DND_VERTICAL_ALIGNMENT = {
  TOP: "flex-start",
  MIDDLE: "center",
  BOTTOM: "flex-end"
};
function dndElementStyling(kwargs, name, options = {}) {
  const {
    fullWidth = false,
    verticalAlignment = "self",
    onReject,
    onRejectColour,
    onRejectImage
  } = options;
  const rules = [];
  let background = "";
  const backgroundColour = dndColour(kwargs.background_color, onRejectColour);
  if (backgroundColour) background += `background-color: ${backgroundColour} !important;`;
  const backgroundImage = kwargs.background_image;
  if (backgroundImage && typeof backgroundImage === "object") {
    const imageUrl = dndBackgroundImageUrl(backgroundImage.imageUrl, onRejectImage);
    if (imageUrl) {
      background += `background-image: url('${imageUrl}') !important;`;
      background += `background-size: ${String(backgroundImage.backgroundSize ?? "cover").toLowerCase() === "contain" ? "contain" : String(backgroundImage.backgroundSize ?? "cover").toLowerCase() === "auto" ? "auto" : "cover"} !important;`;
      const position = String(backgroundImage.backgroundPosition ?? "MIDDLE_CENTER").toLowerCase().replace(/[^a-z_]/g, "").replace(/_/g, " ").replace(/\bmiddle\b/, "center");
      background += `background-position: ${position || "center center"} !important;`;
      background += "background-repeat: no-repeat !important;";
    }
  }
  if (background) rules.push({ type: "background-layers", declarations: background });
  const padding = kwargs.padding;
  if (padding && typeof padding === "object") {
    const hasBreakpoints = "default" in padding || "mobile" in padding;
    const base = dndPaddingDeclarations(hasBreakpoints ? padding.default : padding, onReject);
    const mobile = dndPaddingDeclarations(padding.mobile, onReject);
    if (base || mobile) rules.push({ type: "padding", declarations: base, mobile });
  }
  const alignment = DND_VERTICAL_ALIGNMENT[String(kwargs.vertical_alignment ?? "").toUpperCase()];
  if (alignment) {
    rules.push(
      verticalAlignment === "children" ? {
        type: "vertical-alignment",
        target: " > .row-fluid",
        declarations: `display: flex !important;align-items: ${alignment} !important;`
      } : {
        type: "vertical-alignment",
        declarations: `display: flex !important;flex-direction: column !important;justify-content: ${alignment} !important;`
      }
    );
  }
  const maxWidth = dndLength(kwargs.max_width, onReject);
  if (maxWidth) {
    rules.push({
      type: "max-width-section-centering",
      declarations: `max-width: ${maxWidth} !important;margin-left: auto !important;margin-right: auto !important;`
    });
  }
  if (fullWidth) {
    rules.push({
      type: "force-full-width-section",
      target: " > .row-fluid",
      declarations: "max-width: none !important;"
    });
  }
  const styling = { classes: [], css: [], mobileCss: [] };
  for (const rule of rules) {
    const className = `${name}-${rule.type}`;
    styling.classes.push(className);
    const selector = `.${className}${rule.target ?? ""}`;
    if (rule.declarations) styling.css.push(`${selector}{${rule.declarations}}`);
    if (rule.mobile) styling.mobileCss.push(`${selector}{${rule.mobile}}`);
  }
  return styling;
}
__name(dndElementStyling, "dndElementStyling");
function fileDndStyles(collector, styling) {
  const { area } = dndAreaFrame(collector);
  if (area.rendersStyleBlock) {
    area.css.push(...styling.css);
    area.mobileCss.push(...styling.mobileCss);
    return "";
  }
  return dndAreaStyleBlock({ ...area, css: styling.css, mobileCss: styling.mobileCss });
}
__name(fileDndStyles, "fileDndStyles");
function dndClassAttribute(base, styling, extra = "") {
  const classes = [...base, ...styling.classes];
  const trimmed = extra.trim();
  if (trimmed) classes.push(trimmed);
  return escapeHtmlAttribute(classes.join(" "));
}
__name(dndClassAttribute, "dndClassAttribute");
var DndSectionExtension = class extends DndBlockExtension {
  static {
    __name(this, "DndSectionExtension");
  }
  tags = ["dnd_section"];
  endTag = "end_dnd_section";
  run(context, ...args) {
    const body = args[args.length - 1];
    const kwargs = this.getKwargs(context, args);
    return new import_nunjucks.default.runtime.SafeString(
      renderDndSectionMarkup(this.collector, kwargs, () => typeof body === "function" ? body() : "")
    );
  }
};
function renderDndSectionMarkup(collector, kwargs, renderBody) {
  collector.sectionCounter += 1;
  const owner = dndOwnerScope(collector);
  const { area } = dndAreaFrame(collector);
  const name = `${owner.name}-row-${owner.rows}`;
  owner.rows += 1;
  const rowNumber = area.rowNumber += 1;
  const styling = dndElementStyling(kwargs, name, {
    fullWidth: Boolean(kwargs.full_width),
    verticalAlignment: "children",
    onReject: dndLengthRejectReporter(collector, "dnd_section"),
    onRejectColour: dndValueRejectReporter(collector, "dnd_section", "colour"),
    onRejectImage: dndValueRejectReporter(collector, "dnd_section", "background image")
  });
  const styleBlock = fileDndStyles(collector, styling);
  const classAttr = dndClassAttribute(
    ["row-fluid-wrapper", "row-depth-1", `row-number-${rowNumber}`, "dnd-section"],
    styling,
    typeof kwargs.class === "string" ? kwargs.class : ""
  );
  layoutAreaFor(collector);
  const layoutFrame = openLayoutSection(collector.layout, {
    cssClass: layoutCssClass("dnd-section", kwargs),
    styles: layoutStyles(kwargs, { section: true })
  });
  const bodyContent = withDndScope(
    collector,
    dndChildScope(name),
    () => withLayoutFrame(collector, layoutFrame, renderBody)
  );
  const sectionProvenance = collector.provenance ? provenanceAttributes(structuralProvenance(collector.provenance, "section")) : "";
  return `${styleBlock}<div class="${classAttr}"${sectionProvenance}>
  <div class="row-fluid">
    ${bodyContent}
  </div>
</div>`;
}
__name(renderDndSectionMarkup, "renderDndSectionMarkup");
var DndColumnExtension = class extends DndBlockExtension {
  static {
    __name(this, "DndColumnExtension");
  }
  tags = ["dnd_column"];
  endTag = "end_dnd_column";
  run(context, ...args) {
    const body = args[args.length - 1];
    const kwargs = this.getKwargs(context, args);
    return new import_nunjucks.default.runtime.SafeString(
      renderDndColumnMarkup(this.collector, kwargs, () => typeof body === "function" ? body() : "")
    );
  }
};
function renderDndColumnMarkup(collector, kwargs, renderBody) {
  collector.columnCounter += 1;
  const width = kwargs.width ?? 12;
  const offset = kwargs.offset ?? 0;
  const owner = dndOwnerScope(collector);
  const name = `${owner.name}-column-${owner.columns}`;
  owner.columns += 1;
  const styling = dndElementStyling(kwargs, name, {
    onReject: dndLengthRejectReporter(collector, "dnd_column"),
    onRejectColour: dndValueRejectReporter(collector, "dnd_column", "colour"),
    onRejectImage: dndValueRejectReporter(collector, "dnd_column", "background image")
  });
  const styleBlock = fileDndStyles(collector, styling);
  const classAttr = dndClassAttribute(
    [`span${width}`, "widget-span", "widget-type-cell", "dnd-column"],
    styling
  );
  layoutAreaFor(collector);
  const layoutFrame = openLayoutColumn(
    collector.layout,
    {
      w: layoutWidth(width),
      x: layoutOffset(offset),
      styles: layoutStyles(kwargs),
      cssClass: layoutCssClass("dnd-column", kwargs)
    },
    layoutReporters(collector)
  );
  const bodyContent = withDndScope(
    collector,
    dndChildScope(name),
    () => withLayoutFrame(collector, layoutFrame, renderBody)
  );
  return `${styleBlock}<div class="${classAttr}" data-widget-type="cell" data-x="${offset}" data-w="${width}">
  ${bodyContent}
</div>`;
}
__name(renderDndColumnMarkup, "renderDndColumnMarkup");
var DndRowExtension = class extends DndBlockExtension {
  static {
    __name(this, "DndRowExtension");
  }
  tags = ["dnd_row"];
  endTag = "end_dnd_row";
  run(context, ...args) {
    const body = args[args.length - 1];
    const kwargs = this.getKwargs(context, args);
    return new import_nunjucks.default.runtime.SafeString(
      renderDndRowMarkup(this.collector, kwargs, () => typeof body === "function" ? body() : "")
    );
  }
};
function renderDndRowMarkup(collector, kwargs, renderBody) {
  collector.rowCounter += 1;
  const owner = dndOwnerScope(collector);
  const { area } = dndAreaFrame(collector);
  const name = `${owner.name}-row-${owner.rows}`;
  owner.rows += 1;
  const rowNumber = area.rowNumber += 1;
  const styling = dndElementStyling(kwargs, name, {
    verticalAlignment: "children",
    onReject: dndLengthRejectReporter(collector, "dnd_row"),
    onRejectColour: dndValueRejectReporter(collector, "dnd_row", "colour"),
    onRejectImage: dndValueRejectReporter(collector, "dnd_row", "background image")
  });
  const styleBlock = fileDndStyles(collector, styling);
  const classAttr = dndClassAttribute(
    ["row-fluid-wrapper", "row-depth-1", `row-number-${rowNumber}`, "dnd-row"],
    styling
  );
  layoutAreaFor(collector);
  const rowStyles = layoutStyles(kwargs);
  const layoutFrame = openLayoutRow(collector.layout, {
    cssClass: layoutCssClass("dnd-row", kwargs),
    ...Object.keys(rowStyles).length > 0 ? { styles: rowStyles } : {}
  });
  const bodyContent = withDndScope(
    collector,
    dndChildScope(name),
    () => withLayoutFrame(collector, layoutFrame, renderBody)
  );
  return `${styleBlock}<div class="${classAttr}">
  <div class="row-fluid">
    ${bodyContent}
  </div>
</div>`;
}
__name(renderDndRowMarkup, "renderDndRowMarkup");
function dndModuleWrapper(width, offset, wrapperName, provenance, inner) {
  return `<div class="span${width} widget-span widget-type-custom_widget dnd-module" data-widget-type="custom_widget" data-x="${offset}" data-w="${width}">
  <div id="hs_cos_wrapper_${escapeHtmlAttribute(wrapperName)}" class="hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_module" data-hs-cos-general-type="widget" data-hs-cos-type="module"${provenance}>
    ${inner}
  </div>
</div>`;
}
__name(dndModuleWrapper, "dndModuleWrapper");
function recordPageModule(collector, record, assigned) {
  const page = collector.page;
  if (!page) return;
  page.records.push(record);
  if (!assigned || record.gap === null) return;
  const key = `${record.path} ${record.gap}`;
  if (page.reportedGaps.has(key)) return;
  page.reportedGaps.add(key);
  const why = record.gap === "module-removed" ? "the content mirror reports that its module was removed from the theme it belonged to" : record.gap === "module-theme-unavailable" ? `it belongs to ${assigned.themeLabel ?? "a theme"}, whose source was not supplied to this render` : record.path ? "no theme supplied to this render holds a module at that path" : "the stored node names no module path";
  collector.diagnostics.push(
    diagnostic(
      DIAGNOSTIC_CODES.PAGE_MODULE_NOT_DRAWN,
      `Page module ${JSON.stringify(record.path)} could not be drawn: ${why}. A placeholder card stands in its place, so the layout around it is the page's own.`,
      {
        modulePath: record.path,
        instance: record.instance,
        reason: record.gap,
        ...assigned.info?.themeId ? { themeId: assigned.info.themeId } : {},
        ...assigned.info?.themeName ? { themeName: assigned.info.themeName } : {}
      }
    )
  );
}
__name(recordPageModule, "recordPageModule");
function renderPageModuleNode(deps, node, contextCtx) {
  const { env, collector, themeRoots, themeRoot, renderModule } = deps;
  const binding = collector.page.binding;
  const params = isPlainRecord(node.params) ? node.params : {};
  const modulePath = typeof params.path === "string" ? params.path.trim() : "";
  const props = moduleNodeProps(params);
  const width = gridNumber(node.w, 12);
  const offset = gridNumber(node.x, 0);
  const n = ++collector.moduleCounter;
  const areaFrame = dndAreaFrame(collector);
  const moduleNumber = areaFrame.area.moduleNumber += 1;
  const nodeName = typeof node.name === "string" ? node.name.trim() : "";
  const safeName = safeInstanceName(nodeName);
  const instanceName = safeName ?? moduleInstanceName(n);
  const wrapperName = safeName ?? `${areaFrame.name}-module-${moduleNumber}`;
  layoutAreaFor(collector);
  addLayoutModule(
    collector.layout,
    {
      w: layoutWidth(width),
      x: layoutOffset(offset),
      params: layoutModuleParams(props, modulePath),
      styles: isPlainRecord(node.styles) ? node.styles : void 0
    },
    layoutReporters(collector)
  );
  const info = lookupModuleInfo(binding.modules, modulePath);
  let gap = null;
  let resolved = null;
  if (!modulePath) gap = "module-unknown";
  else if (info?.removed === true) gap = "module-removed";
  else {
    resolved = resolvePageModule(binding, themeRoots, modulePath, resolveModuleDir);
    if (!resolved && !isHubspotModulePath(modulePath)) gap = unresolvedGapReason(binding, info);
  }
  const recordInstance = nodeName || instanceName;
  if (gap !== null) {
    const themeLabel = gapThemeLabel(binding, info);
    const context = collector.provenance;
    const provenance = context ? {
      kind: "module",
      themeId: info?.themeId ?? null,
      instance: instanceName,
      global: context.globalDepth > 0,
      dnd: context.dndAreas[context.dndAreas.length - 1] ?? null
    } : null;
    const card = stampFirstElement(
      modulePlaceholder(modulePath, { instance: instanceName, reason: gap, text: gapCardText(themeLabel) }),
      provenance
    );
    recordPageModule(collector, { path: modulePath, instance: recordInstance, gap }, { info, themeLabel });
    return dndModuleWrapper(width, offset, wrapperName, provenance ? provenanceAttributes(provenance) : "", card);
  }
  const frame = resolved?.root ? {
    dir: resolved.root.dir,
    portalRoot: resolved.root.portalRoot,
    themeRoots: resolved.themeRoots,
    assets: binding.assetsForRoot?.(resolved.root.dir) ?? null
  } : null;
  const routed = withForeignRoot(
    collector,
    frame,
    () => routeModuleRenderWithProvenance(
      {
        env,
        collector,
        themeRoots: resolved?.themeRoots ?? themeRoots,
        themeRoot,
        modulePath,
        props,
        contextCtx,
        moduleNumber: n,
        preprocess: frame ? (template, callerDir) => preprocessHubl(template, callerDir, callerDir == null ? null : frame.dir) : preprocessHubl,
        renderModuleFn: renderModule,
        attrs: {},
        resolvedModuleDir: resolved ? resolved.dir : null,
        instanceName
      },
      (runtime) => runtime === "react"
    )
  );
  recordPageModule(collector, { path: modulePath, instance: recordInstance, gap: routedModuleGap(routed.html) }, null);
  const html = frame?.assets ? frame.assets.html(routed.html) : routed.html;
  return dndModuleWrapper(
    width,
    offset,
    wrapperName,
    routed.provenance ? provenanceAttributes(routed.provenance) : "",
    html
  );
}
__name(renderPageModuleNode, "renderPageModuleNode");
function resolveThemeFilePath(themeRoots, themeRoot, relativePath) {
  const projectResolved = resolveProjectPath(relativePath, themeRoots);
  if (projectResolved) return projectResolved;
  return resolveInThemeCascade(themeRoots, relativePath) ?? resolveSafePath(themeRoot, relativePath);
}
__name(resolveThemeFilePath, "resolveThemeFilePath");
function computeLoaderRelativeName(filePath, themeRoots) {
  const subdirs = ["templates", "sections", "helpers", "partials"];
  for (const root of themeRoots.roots) {
    for (const subdir of subdirs) {
      const base = path.join(root, subdir);
      const rel2 = path.relative(base, filePath).replace(/\\/g, "/");
      if (rel2 && !rel2.startsWith("..") && !path.isAbsolute(rel2)) return rel2;
    }
    const rel = path.relative(root, filePath).replace(/\\/g, "/");
    if (rel && !rel.startsWith("..") && !path.isAbsolute(rel)) return rel;
  }
  return null;
}
__name(computeLoaderRelativeName, "computeLoaderRelativeName");
var DndModuleExtension = class extends DndBlockExtension {
  static {
    __name(this, "DndModuleExtension");
  }
  tags = ["dnd_module"];
  endTag = "end_dnd_module";
  themeRoot;
  renderModuleFn;
  themeRoots;
  constructor(env, collector, themeRoot, renderModuleFn, themeRoots) {
    super(env, collector);
    this.themeRoot = themeRoot;
    this.renderModuleFn = renderModuleFn;
    this.themeRoots = themeRoots ?? resolveThemeRoots({ themeRoot });
  }
  run(context, ...args) {
    const body = args[args.length - 1];
    const bodyContent = typeof body === "function" ? body() : "";
    const kwargs = this.getKwargs(context, args);
    const modulePath = kwargs.path ?? "";
    const width = kwargs.width ?? 12;
    const offset = kwargs.offset ?? 0;
    const n = ++this.collector.moduleCounter;
    const areaFrame = dndAreaFrame(this.collector);
    const areaName = areaFrame.name;
    const moduleNumber = areaFrame.area.moduleNumber += 1;
    const dndParams = /* @__PURE__ */ new Set(["path", "offset", "width", "horizontal_alignment", "flexbox_positioning", "_positional"]);
    const moduleProps = {};
    for (const [key, val] of Object.entries(kwargs)) {
      if (!dndParams.has(key)) moduleProps[key] = val;
    }
    const moduleAttributes = {};
    const attrRegex = /<!-- module_attribute:(.*?) -->([\s\S]*?)<!-- end_module_attribute -->/g;
    let match;
    while ((match = attrRegex.exec(bodyContent)) !== null) {
      moduleAttributes[match[1].trim()] = match[2].trim();
    }
    const mergedProps = { ...moduleProps, ...moduleAttributes };
    layoutAreaFor(this.collector);
    const moduleStyles = layoutStyles(kwargs);
    addLayoutModule(
      this.collector.layout,
      {
        w: layoutWidth(width),
        x: layoutOffset(offset),
        params: layoutModuleParams(
          { ...kwargs, ...moduleAttributes },
          portalModulePath(modulePath, this.themeRoots, resolveModuleDir(this.themeRoots, modulePath))
        ),
        styles: moduleStyles
      },
      layoutReporters(this.collector)
    );
    const { html: renderedModule, provenance } = routeModuleRenderWithProvenance({
      env: this.env,
      collector: this.collector,
      themeRoots: this.themeRoots,
      themeRoot: this.themeRoot,
      modulePath,
      props: mergedProps,
      contextCtx: context.ctx ?? {},
      moduleNumber: n,
      preprocess: preprocessHubl,
      renderModuleFn: this.renderModuleFn,
      attrs: moduleAttributes
    }, (runtime) => runtime === "react");
    const wrapperProvenance = provenance ? provenanceAttributes(provenance) : "";
    return new import_nunjucks.default.runtime.SafeString(
      dndModuleWrapper(width, offset, `${areaName}-module-${moduleNumber}`, wrapperProvenance, renderedModule)
    );
  }
};
function includingFile(collector, storeIndex) {
  const recorded = storeIndex === void 0 ? void 0 : dndArgsCallers.get(storeIndex);
  if (recorded) return recorded;
  return collector.provenance ? currentProvenanceFile(collector.provenance)?.file ?? null : null;
}
__name(includingFile, "includingFile");
function reportMissingPartial(collector, roots, missing) {
  const { tag, partialPath, includedFrom } = missing;
  const reported = collector.reportedMissingPartials ??= /* @__PURE__ */ new Set();
  const key = `${tag}|${partialPath}|${includedFrom ?? ""}`;
  if (reported.has(key)) return;
  reported.add(key);
  const where = includedFrom ? ` in ${includedFrom}` : "";
  const scope = roots.parentThemeRoot !== void 0 && roots.roots.length > 1 ? "this theme or its parent" : "this theme";
  collector.diagnostics.push(
    diagnostic(
      DIAGNOSTIC_CODES.HUBL_PARTIAL_NOT_FOUND,
      `{% ${tag} %}${where} names "${partialPath}", which is not a file in ${scope}, so nothing was rendered in its place. Check the path and the file name.`,
      {
        tag,
        path: partialPath,
        includedFrom,
        ...includedFrom ? { sourceFile: includedFrom } : {}
      }
    )
  );
}
__name(reportMissingPartial, "reportMissingPartial");
var IncludeDndPartialExtension = class {
  static {
    __name(this, "IncludeDndPartialExtension");
  }
  tags = ["include_dnd_partial"];
  env;
  collector;
  themeRoot;
  themeRoots;
  constructor(env, collector, themeRoot, themeRoots) {
    this.env = env;
    this.collector = collector;
    this.themeRoot = themeRoot;
    this.themeRoots = themeRoots ?? resolveThemeRoots({ themeRoot });
  }
  parse(parser, nodes) {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtension(this, "run", args);
  }
  run(context, ...args) {
    const first = args.length > 0 ? args[0] : void 0;
    let partialPath;
    let partialContext;
    const storeIndex = typeof first === "number" ? first : void 0;
    if (typeof first === "number") {
      const rawStr = dndArgsStore.get(first) ?? "";
      const kwargs = parseDndArgs(rawStr, this.env, context.ctx ?? {});
      partialPath = kwargs.path ?? "";
      if (kwargs.context && typeof kwargs.context === "object") {
        partialContext = kwargs.context;
      }
    } else {
      const kwargs = extractKwargs(args);
      partialPath = kwargs.path ?? (typeof first === "string" ? first : "");
      if (kwargs.context && typeof kwargs.context === "object") {
        partialContext = kwargs.context;
      }
    }
    if (!partialPath) return "";
    const renderCtx = partialContext ? { ...context.ctx ?? {}, context: partialContext } : context.ctx ?? {};
    const owner = dndOwnerScope(this.collector);
    owner.partials += 1;
    const scope = dndChildScope(`${owner.name}-dnd_partial-${owner.partials}`);
    layoutAreaFor(this.collector);
    let layoutFrame = openLayoutPartial(this.collector.layout);
    const foreign = activeForeignRoot(this.collector);
    const roots = foreign ? foreign.themeRoots : this.themeRoots;
    const rootDir = foreign ? foreign.dir : this.themeRoot;
    try {
      const loaderFile = this.collector.provenance ? provenanceFileFor(
        this.collector.provenance,
        locateTemplate(roots, partialPath) ?? locateTemplate(roots, partialPath.replace(/^(?:\.\.\/)+/, ""))
      ) : null;
      const rendered = this.renderAsSection(
        loaderFile,
        () => withDndScope(
          this.collector,
          scope,
          () => withLayoutFrame(this.collector, layoutFrame, () => this.env.render(partialPath, renderCtx))
        )
      );
      return new import_nunjucks.default.runtime.SafeString(rendered);
    } catch {
      withdrawLayoutReports(this.collector, abandonLayoutPartial(this.collector.layout, layoutFrame));
      layoutFrame = openLayoutPartial(this.collector.layout);
      const resolvedPath = resolveThemeFilePath(roots, rootDir, path.join("templates", partialPath));
      if (!hostFs.existsSync(resolvedPath)) {
        withdrawLayoutReports(this.collector, abandonLayoutPartial(this.collector.layout, layoutFrame));
        if (locateTemplate(roots, partialPath) === null && locateTemplate(roots, partialPath.replace(/^(?:\.\.\/)+/, "")) === null) {
          reportMissingPartial(this.collector, roots, {
            tag: "include_dnd_partial",
            partialPath,
            includedFrom: includingFile(this.collector, storeIndex)
          });
        }
        return new import_nunjucks.default.runtime.SafeString(`<!-- partial not found: ${partialPath} -->`);
      }
      let template = hostFs.readFileSync(resolvedPath, "utf-8");
      template = template.replace(/^<!--[\s\S]*?-->\s*/m, "");
      template = preprocessHublFromFile(
        template,
        themeRelativeFile(resolvedPath, roots),
        themeRelativeDirectory(resolvedPath, roots),
        foreign ? owningExtraRoot(resolvedPath, this.themeRoots, [foreign.dir]) : null
      );
      try {
        const fallbackFile = this.collector.provenance ? provenanceFileFor(this.collector.provenance, resolvedPath) : null;
        const rendered = this.renderAsSection(
          fallbackFile,
          () => withDndScope(
            this.collector,
            scope,
            () => withLayoutFrame(this.collector, layoutFrame, () => this.env.renderString(template, renderCtx))
          )
        );
        return new import_nunjucks.default.runtime.SafeString(rendered);
      } catch (err) {
        withdrawLayoutReports(this.collector, abandonLayoutPartial(this.collector.layout, layoutFrame));
        const msg = err instanceof Error ? err.message : String(err);
        return new import_nunjucks.default.runtime.SafeString(`<!-- partial error (${partialPath}): ${msg} -->`);
      }
    }
  }
  renderAsSection(file, render) {
    const context = this.collector.provenance;
    return withProvenanceFile(context, file, () => {
      const html = render();
      return context ? stampFirstElement(html, structuralProvenance(context, "section")) : html;
    });
  }
};
var GlobalPartialExtension = class {
  static {
    __name(this, "GlobalPartialExtension");
  }
  tags = ["global_partial"];
  env;
  themeRoot;
  renderPartials;
  themeRoots;
  collector;
  constructor(env, themeRoot, renderPartials, themeRoots, collector) {
    this.env = env;
    this.themeRoot = themeRoot;
    this.renderPartials = renderPartials;
    this.themeRoots = themeRoots ?? resolveThemeRoots({ themeRoot });
    this.collector = collector;
  }
  parse(parser, nodes) {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtension(this, "run", args);
  }
  run(context, ...args) {
    const first = args.length > 0 ? args[0] : void 0;
    let kwargs;
    const storeIndex = typeof first === "number" ? first : void 0;
    if (typeof first === "number") {
      const rawStr = dndArgsStore.get(first) ?? "";
      kwargs = parseDndArgs(rawStr, this.env, context.ctx ?? {});
    } else {
      kwargs = extractKwargs(args);
    }
    const partialPath = kwargs.path ?? "";
    const type = kwargs.type ?? "CONTENT";
    if (!this.renderPartials) {
      const context2 = this.collector?.provenance;
      const stamp = context2 ? provenanceAttributes(structuralProvenance(context2, "global", { file: String(partialPath), global: true, dnd: null })) : "";
      return new import_nunjucks.default.runtime.SafeString(
        `<!-- global_partial: ${partialPath} (${type}) -->
<div class="themespot-global-partial-placeholder" data-partial-path="${partialPath}" data-partial-type="${type}"${stamp}></div>`
      );
    }
    const stripUpSegments = partialPath.replace(/^(?:\.\.\/)+/, "");
    const candidateRelatives = [
      path.join("templates", partialPath),
      path.join("templates", stripUpSegments),
      path.join("templates/layouts", partialPath),
      path.join("partials", path.basename(partialPath)),
      stripUpSegments
    ];
    const roots = this.currentRoots();
    const resolvedPath = candidateRelatives.map((relative) => {
      try {
        return resolveInThemeCascade(roots, relative);
      } catch (err) {
        if (err instanceof RendererError) return null;
        throw err;
      }
    }).find((candidate) => Boolean(candidate));
    if (!resolvedPath) {
      if (this.collector && partialPath) {
        reportMissingPartial(this.collector, roots, {
          tag: "global_partial",
          partialPath: String(partialPath),
          includedFrom: includingFile(this.collector, storeIndex)
        });
      }
      return new import_nunjucks.default.runtime.SafeString(
        `<!-- global_partial not found: ${partialPath} (${type}) -->`
      );
    }
    const page = this.collector?.page;
    if (page) page.globalDepth += 1;
    try {
      return this.renderPartialFile(resolvedPath, partialPath, type, context);
    } finally {
      if (page) page.globalDepth -= 1;
    }
  }
  renderPartialFile(filePath, partialPath, type, context) {
    const provenance = this.collector?.provenance;
    if (!provenance) return this.renderPartialFileUnstamped(filePath, partialPath, type, context);
    return withProvenanceFile(provenance, provenanceFileFor(provenance, filePath), () => {
      const rendered = String(this.renderPartialFileUnstamped(filePath, partialPath, type, context));
      return new import_nunjucks.default.runtime.SafeString(
        stampFirstElement(rendered, structuralProvenance(provenance, "global", { dnd: null }))
      );
    }, { global: true });
  }
  renderPartialFileUnstamped(filePath, partialPath, type, context) {
    try {
      const relativeName = this.computeLoaderRelativeName(filePath);
      if (relativeName) {
        const rendered2 = this.env.render(relativeName, context.ctx ?? {});
        return new import_nunjucks.default.runtime.SafeString(rendered2);
      }
      let template = hostFs.readFileSync(filePath, "utf-8");
      template = template.replace(/^<!--[\s\S]*?-->\s*/m, "");
      const foreign = this.collector ? activeForeignRoot(this.collector) : null;
      template = preprocessHublFromFile(
        template,
        themeRelativeFile(filePath, this.currentRoots()),
        themeRelativeDirectory(filePath, this.currentRoots()),
        foreign ? owningExtraRoot(filePath, this.themeRoots, [foreign.dir]) : null
      );
      const rendered = this.env.renderString(template, context.ctx ?? {});
      return new import_nunjucks.default.runtime.SafeString(rendered);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return new import_nunjucks.default.runtime.SafeString(
        `<!-- global_partial error (${partialPath}, ${type}): ${msg} -->`
      );
    }
  }
  computeLoaderRelativeName(filePath) {
    return computeLoaderRelativeName(filePath, this.currentRoots());
  }
  currentRoots() {
    const foreign = this.collector ? activeForeignRoot(this.collector) : null;
    return foreign ? foreign.themeRoots : this.themeRoots;
  }
};
var SetSyncExtension = class {
  static {
    __name(this, "SetSyncExtension");
  }
  tags = ["_themespot_set_sync"];
  parse(parser, nodes) {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtension(this, "run", args);
  }
  run(context, ...args) {
    const positional = args.filter(
      (a) => !(a && typeof a === "object" && a.__keywords)
    );
    const [name, value] = positional;
    if (typeof name === "string" && context && context.ctx) {
      recordMacroScopeWrite(context, name);
      context.ctx[name] = value;
    }
    return "";
  }
};
var MACRO_SCOPE_STACK = /* @__PURE__ */ Symbol("themespot.macroScopeStack");
function recordMacroScopeWrite(context, name) {
  const stack = context[MACRO_SCOPE_STACK];
  if (!stack || stack.length === 0) return;
  const frame = stack[stack.length - 1];
  if (frame.has(name)) return;
  const ctx = context.ctx;
  frame.set(
    name,
    Object.prototype.hasOwnProperty.call(ctx, name) ? { present: true, value: ctx[name] } : { present: false, value: void 0 }
  );
}
__name(recordMacroScopeWrite, "recordMacroScopeWrite");
function restoreMacroScope(ctx, frame) {
  for (const [name, prior] of frame) {
    if (prior.present) ctx[name] = prior.value;
    else delete ctx[name];
  }
}
__name(restoreMacroScope, "restoreMacroScope");
var MacroScopeExtension = class {
  static {
    __name(this, "MacroScopeExtension");
  }
  tags = [MACRO_SCOPE_OPEN];
  parse(parser, nodes) {
    const tok = parser.nextToken();
    parser.advanceAfterBlockEnd(tok.value);
    const body = parser.parseUntilBlocks(MACRO_SCOPE_CLOSE);
    parser.advanceAfterBlockEnd();
    return new nodes.CallExtension(this, "run", null, [body]);
  }
  run(context, body) {
    if (!context || !context.ctx) return new import_nunjucks.default.runtime.SafeString(body());
    const stack = context[MACRO_SCOPE_STACK] ?? (context[MACRO_SCOPE_STACK] = []);
    const frame = /* @__PURE__ */ new Map();
    stack.push(frame);
    try {
      return new import_nunjucks.default.runtime.SafeString(body());
    } finally {
      const depth = stack.lastIndexOf(frame);
      if (depth >= 0) {
        for (let i = stack.length - 1; i >= depth; i--) {
          restoreMacroScope(context.ctx, stack[i]);
        }
        stack.length = depth;
      }
    }
  }
};
var ModuleAttributeExtension = class {
  static {
    __name(this, "ModuleAttributeExtension");
  }
  tags = ["module_attribute"];
  env;
  constructor(env) {
    this.env = env;
  }
  parse(parser, nodes) {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    const body = parser.parseUntilBlocks("end_module_attribute");
    parser.advanceAfterBlockEnd();
    return new nodes.CallExtension(this, "run", args, [body]);
  }
  run(context, ...args) {
    const body = args[args.length - 1];
    const bodyContent = typeof body === "function" ? body() : "";
    const first = args.length > 1 ? args[0] : void 0;
    let name;
    if (typeof first === "number") {
      const rawStr = dndArgsStore.get(first) ?? "";
      const trimmed = rawStr.trim().replace(/^["']|["']$/g, "");
      name = trimmed || "content";
    } else {
      name = typeof first === "string" ? first : "content";
    }
    return new import_nunjucks.default.runtime.SafeString(
      `<!-- module_attribute:${name} -->${bodyContent}<!-- end_module_attribute -->`
    );
  }
};
var ModuleTagExtension = class {
  static {
    __name(this, "ModuleTagExtension");
  }
  tags = ["module"];
  env;
  collector;
  themeRoot;
  renderModuleFn;
  themeRoots;
  constructor(env, collector, themeRoot, renderModuleFn, themeRoots) {
    this.env = env;
    this.collector = collector;
    this.themeRoot = themeRoot;
    this.renderModuleFn = renderModuleFn;
    this.themeRoots = themeRoots ?? resolveThemeRoots({ themeRoot });
  }
  parse(parser, nodes) {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtension(this, "run", args);
  }
  run(context, ...args) {
    const first = args.length > 0 ? args[0] : void 0;
    let kwargs;
    let rawStr = "";
    if (typeof first === "number") {
      rawStr = dndArgsStore.get(first) ?? "";
      kwargs = parseDndArgs(rawStr, this.env, context.ctx ?? {});
    } else {
      kwargs = extractKwargs(args);
    }
    const modulePath = kwargs.path ?? "";
    if (!modulePath) {
      return new import_nunjucks.default.runtime.SafeString(`<!-- module: no path -->`);
    }
    const dndParams = /* @__PURE__ */ new Set(["path", "overrideable", "_positional"]);
    const moduleProps = {};
    for (const [key, val] of Object.entries(kwargs)) {
      if (!dndParams.has(key)) moduleProps[key] = val;
    }
    const widget = claimPageWidget(this.collector, moduleTagName(rawStr, kwargs, args));
    if (widget) Object.assign(moduleProps, widget.props);
    const n = ++this.collector.moduleCounter;
    const rendered = routeModuleRender({
      env: this.env,
      collector: this.collector,
      themeRoots: this.themeRoots,
      themeRoot: this.themeRoot,
      modulePath,
      props: moduleProps,
      contextCtx: context.ctx ?? {},
      moduleNumber: n,
      preprocess: preprocessHubl,
      renderModuleFn: this.renderModuleFn,
      ...widget?.instanceName ? { instanceName: widget.instanceName } : {}
    });
    if (widget) {
      recordPageModule(
        this.collector,
        { path: String(modulePath), instance: widget.name, gap: routedModuleGap(rendered) },
        null
      );
    }
    return new import_nunjucks.default.runtime.SafeString(rendered);
  }
};
function moduleTagName(rawArgs, kwargs, args) {
  const leading = /^\s*(["'])([\s\S]*?)\1/.exec(rawArgs);
  return leading ? leading[2].trim() : positionalTagName(kwargs, args);
}
__name(moduleTagName, "moduleTagName");
function moduleBlockTagName(rawArgs, kwargs, args) {
  const leading = /^\s*(?:module\s+)?(["'])([\s\S]*?)\1/.exec(rawArgs);
  return leading ? leading[2].trim() : positionalTagName(kwargs, args);
}
__name(moduleBlockTagName, "moduleBlockTagName");
function positionalTagName(kwargs, args) {
  if (typeof kwargs._positional === "string" && kwargs._positional.trim()) return kwargs._positional.trim();
  for (const value of args) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}
__name(positionalTagName, "positionalTagName");
function claimPageWidget(collector, name) {
  const page = collector.page;
  if (!page || !name || page.globalDepth > 0 || page.boundWidgets.has(name)) return null;
  if (!Object.prototype.hasOwnProperty.call(page.binding.widgets, name)) return null;
  page.boundWidgets.add(name);
  return { name, props: widgetProps(page.binding.widgets[name]), instanceName: safeInstanceName(name) };
}
__name(claimPageWidget, "claimPageWidget");
var ModuleBlockExtension = class {
  static {
    __name(this, "ModuleBlockExtension");
  }
  tags = ["module_block"];
  env;
  collector;
  themeRoot;
  renderModuleFn;
  themeRoots;
  constructor(env, collector, themeRoot, renderModuleFn, themeRoots) {
    this.env = env;
    this.collector = collector;
    this.themeRoot = themeRoot;
    this.renderModuleFn = renderModuleFn;
    this.themeRoots = themeRoots ?? resolveThemeRoots({ themeRoot });
  }
  parse(parser, nodes) {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    const body = parser.parseUntilBlocks("end_module_block");
    parser.advanceAfterBlockEnd();
    return new nodes.CallExtension(this, "run", args, [body]);
  }
  run(context, ...args) {
    const body = args[args.length - 1];
    const bodyContent = typeof body === "function" ? body() : "";
    const first = args.length > 1 ? args[0] : void 0;
    let kwargs;
    let rawStr = "";
    if (typeof first === "number") {
      rawStr = dndArgsStore.get(first) ?? "";
      kwargs = parseDndArgs(rawStr, this.env, context.ctx ?? {});
    } else {
      kwargs = extractKwargs(args);
    }
    const modulePath = kwargs.path ?? "";
    if (!modulePath) {
      return new import_nunjucks.default.runtime.SafeString(`<!-- module_block: no path -->`);
    }
    const dndParams = /* @__PURE__ */ new Set(["path", "overrideable", "_positional", "module"]);
    const moduleProps = {};
    for (const [key, val] of Object.entries(kwargs)) {
      if (!dndParams.has(key)) moduleProps[key] = val;
    }
    const moduleAttributes = {};
    const attrRegex = /<!-- module_attribute:(.*?) -->([\s\S]*?)<!-- end_module_attribute -->/g;
    let match;
    while ((match = attrRegex.exec(bodyContent)) !== null) {
      moduleAttributes[match[1].trim()] = match[2].trim();
    }
    const widget = claimPageWidget(this.collector, moduleBlockTagName(rawStr, kwargs, args.slice(0, -1)));
    const mergedProps = { ...moduleProps, ...moduleAttributes, ...widget?.props ?? {} };
    const n = ++this.collector.moduleCounter;
    const rendered = routeModuleRender({
      env: this.env,
      collector: this.collector,
      themeRoots: this.themeRoots,
      themeRoot: this.themeRoot,
      modulePath,
      props: mergedProps,
      contextCtx: context.ctx ?? {},
      moduleNumber: n,
      preprocess: preprocessHubl,
      renderModuleFn: this.renderModuleFn,
      attrs: moduleAttributes,
      ...widget?.instanceName ? { instanceName: widget.instanceName } : {}
    });
    if (widget) {
      recordPageModule(
        this.collector,
        { path: String(modulePath), instance: widget.name, gap: routedModuleGap(rendered) },
        null
      );
    }
    return new import_nunjucks.default.runtime.SafeString(rendered);
  }
};
function widgetText(value) {
  return value == null ? "" : String(value);
}
__name(widgetText, "widgetText");
function escapeHtmlAttribute(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
__name(escapeHtmlAttribute, "escapeHtmlAttribute");
function widgetAttr(name, value) {
  const text = widgetText(value);
  return text === "" ? "" : ` ${name}="${escapeHtmlAttribute(text)}"`;
}
__name(widgetAttr, "widgetAttr");
function widgetImage(params) {
  const img = '<img class="hs-image-widget"' + widgetAttr("src", params.src) + widgetAttr("alt", params.alt) + widgetAttr("width", params.width) + widgetAttr("height", params.height) + widgetAttr("loading", params.loading) + widgetAttr("style", params.style) + ">";
  const href = widgetText(params.link);
  if (href === "") return img;
  return `<a class="hs-image-link"${widgetAttr("href", href)}${widgetAttr("target", params.target)}>${img}</a>`;
}
__name(widgetImage, "widgetImage");
function widgetFirstValue(...values) {
  for (const value of values) {
    if (widgetText(value).trim() !== "") return value;
  }
  return "";
}
__name(widgetFirstValue, "widgetFirstValue");
function widgetHeading(level, value) {
  const requested = widgetText(level).toLowerCase();
  const tag = /^h[1-6]$/.test(requested) ? requested : "h1";
  const text = widgetText(value);
  return text === "" ? "" : `<${tag}>${escapeHtmlAttribute(text)}</${tag}>`;
}
__name(widgetHeading, "widgetHeading");
var FONT_AWESOME_SET_RE = /^fontawesome[-_]?(\d+)(?:\.\d+){0,2}$/i;
var FONT_AWESOME_CDN_RELEASE = {
  "4": { release: "4.7.0", stylesheet: "css/font-awesome.min.css", script: null, families: false },
  "5": { release: "5.15.4", stylesheet: "css/all.min.css", script: "js/all.min.js", families: true },
  "6": { release: "6.5.2", stylesheet: "css/all.min.css", script: "js/all.min.js", families: true }
};
var FONT_AWESOME_DEFAULT_MAJOR = "5";
var FONT_AWESOME_V4_PREFIX = "fa";
function fontAwesomeMajor(major) {
  return FONT_AWESOME_CDN_RELEASE[major] ?? FONT_AWESOME_CDN_RELEASE[FONT_AWESOME_DEFAULT_MAJOR];
}
__name(fontAwesomeMajor, "fontAwesomeMajor");
var FONT_AWESOME_STYLE_PREFIX = {
  SOLID: "fas",
  REGULAR: "far",
  LIGHT: "fal",
  THIN: "fat",
  DUOTONE: "fad",
  BRANDS: "fab"
};
var FONT_AWESOME_BRAND_SLUGS = /* @__PURE__ */ new Set([
  "facebook",
  "facebook-f",
  "facebook-square",
  "facebook-messenger",
  "twitter",
  "twitter-square",
  "x-twitter",
  "instagram",
  "instagram-square",
  "linkedin",
  "linkedin-in",
  "youtube",
  "youtube-square",
  "vimeo",
  "vimeo-v",
  "vimeo-square",
  "pinterest",
  "pinterest-p",
  "pinterest-square",
  "tiktok",
  "snapchat",
  "snapchat-ghost",
  "whatsapp",
  "whatsapp-square",
  "telegram",
  "telegram-plane",
  "discord",
  "slack",
  "slack-hash",
  "github",
  "github-square",
  "gitlab",
  "bitbucket",
  "stack-overflow",
  "codepen",
  "npm",
  "node-js",
  "dribbble",
  "dribbble-square",
  "behance",
  "behance-square",
  "medium",
  "medium-m",
  "tumblr",
  "tumblr-square",
  "reddit",
  "reddit-alien",
  "reddit-square",
  "flickr",
  "vk",
  "weibo",
  "weixin",
  "spotify",
  "soundcloud",
  "apple",
  "app-store",
  "google",
  "google-play",
  "google-plus-g",
  "google-plus-square",
  "android",
  "windows",
  "microsoft",
  "amazon",
  "ebay",
  "etsy",
  "shopify",
  "wordpress",
  "wordpress-simple",
  "hubspot",
  "salesforce",
  "mailchimp",
  "stripe",
  "stripe-s",
  "paypal",
  "cc-visa",
  "cc-mastercard",
  "cc-amex",
  "cc-paypal",
  "cc-stripe",
  "yelp",
  "tripadvisor",
  "xing",
  "xing-square",
  "skype",
  "twitch"
]);
var FONT_AWESOME_CDN_BASE = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome";
function fontAwesomeStylesheetUrl(major) {
  const { release, stylesheet } = fontAwesomeMajor(major);
  return `${FONT_AWESOME_CDN_BASE}/${release}/${stylesheet}`;
}
__name(fontAwesomeStylesheetUrl, "fontAwesomeStylesheetUrl");
function fontAwesomeScriptUrl(major) {
  const { release, script } = fontAwesomeMajor(major);
  return script === null ? null : `${FONT_AWESOME_CDN_BASE}/${release}/${script}`;
}
__name(fontAwesomeScriptUrl, "fontAwesomeScriptUrl");
var FONT_AWESOME_INHERIT_FILL_CSS = ":where(.themespot-icon){fill:currentColor}:where(.themespot-icon svg path){fill:inherit}";
function fontAwesomeIconRuntimeMarkup(major) {
  const src = fontAwesomeScriptUrl(major);
  if (src === null) return null;
  return [
    `<style data-themespot-icon-css>${FONT_AWESOME_INHERIT_FILL_CSS}</style>`,
    `<script defer src="${escapeHtmlAttribute(src)}" data-auto-replace-svg="nest"></script>`
  ];
}
__name(fontAwesomeIconRuntimeMarkup, "fontAwesomeIconRuntimeMarkup");
function iconWidgetBody(params, collector) {
  const set = widgetText(params.icon_set).trim();
  const major = FONT_AWESOME_SET_RE.exec(set)?.[1];
  if (set !== "" && major === void 0) return null;
  const name = widgetText(params.name).trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  if (name === "") return null;
  const requestedStyle = widgetText(params.style).trim().toUpperCase();
  const resolvedMajor = major ?? FONT_AWESOME_DEFAULT_MAJOR;
  const prefix = !fontAwesomeMajor(resolvedMajor).families ? FONT_AWESOME_V4_PREFIX : FONT_AWESOME_BRAND_SLUGS.has(name) ? "fab" : FONT_AWESOME_STYLE_PREFIX[requestedStyle] ?? "fas";
  const runtime = fontAwesomeIconRuntimeMarkup(resolvedMajor);
  if (runtime !== null) {
    for (const entry of runtime) {
      if (!collector.headMarkup.includes(entry)) collector.headMarkup.push(entry);
    }
  } else {
    const stylesheet = fontAwesomeStylesheetUrl(resolvedMajor);
    if (!collector.cssLinks.includes(stylesheet)) collector.cssLinks.push(stylesheet);
  }
  const runtimeMarker = runtime !== null ? " data-themespot-fa-runtime" : "";
  const classes = ["themespot-icon", prefix, `fa-${name}`];
  const extra = widgetText(params.extra_classes).trim();
  if (extra) classes.push(extra);
  const height = widgetText(params.height).trim();
  const style = /^\d+(?:\.\d+)?$/.test(height) ? ` style="font-size: ${height}px;"` : "";
  const decorative = widgetText(params.purpose).trim().toLowerCase() === "decorative";
  const title = widgetText(params.title).trim();
  const a11y = decorative || title === "" ? ' aria-hidden="true"' : ` role="img" aria-label="${escapeHtmlAttribute(title)}"`;
  return `<i class="${escapeHtmlAttribute(classes.join(" "))}"${runtimeMarker}${style}${a11y}></i>`;
}
__name(iconWidgetBody, "iconWidgetBody");
var WIDGET_TAG_SPECS = {
  text: { bare: true },
  boolean: { bare: true },
  choice: { bare: true },
  rich_text: { body: /* @__PURE__ */ __name((params) => widgetText(params.html), "body") },
  linked_image: { body: widgetImage },
  logo: { body: widgetImage },
  header: {
    body: /* @__PURE__ */ __name((params) => widgetHeading(
      widgetFirstValue(params.heading_level, params.header_tag),
      widgetFirstValue(params.header, params.value)
    ), "body")
  },
  section_header: {
    body: /* @__PURE__ */ __name((params) => widgetHeading(params.heading_level, params.header) + (widgetText(params.subheader) === "" ? "" : `<p>${escapeHtmlAttribute(widgetText(params.subheader))}</p>`), "body")
  },
  form: { needs: "a form definition from the portal" },
  cta: { needs: "a call-to-action defined in the portal" },
  menu: { needs: "a menu tree from the portal" },
  post_listing: { needs: "blog posts from the portal" },
  post_filter: { needs: "blog tags, authors and dates from the portal" },
  blog_comments: { needs: "blog comments from the portal" },
  blog_subscribe: { needs: "a blog subscription form from the portal" },
  rss_listing: { needs: "an RSS feed fetched at render time" },
  email_subscriptions: { needs: "the subscription types defined in the portal" },
  email_subscriptions_confirmation: { needs: "the subscription types defined in the portal" },
  email_simple_subscription: { needs: "the subscription types defined in the portal" },
  member_login: { needs: "HubSpot's membership login form" },
  member_register: { needs: "HubSpot's membership registration form" },
  password_reset: { needs: "HubSpot's membership password-reset form" },
  password_reset_request: { needs: "HubSpot's membership password-reset request form" },
  related_blog_posts: { needs: "blog posts from the portal" },
  simple_menu: { needs: "a rendered navigation tree" },
  page_footer: { needs: "the portal's footer content" },
  password_prompt: { needs: "HubSpot's password-protection form" },
  gallery: { needs: "HubSpot's gallery player" },
  icon: { body: iconWidgetBody, needs: "an icon from HubSpot's hosted icon sets" },
  video_player: { needs: "HubSpot's hosted video player" },
  editor_placeholder: {
    silent: "HubSpot draws this affordance inside its page editor and nowhere else, so a rendered page has nothing here either"
  }
};
var FIELD_RENDER_WIDGET_TAGS = Object.keys(WIDGET_TAG_SPECS);
var STORE_PARSED_WIDGET_TAGS = FIELD_RENDER_WIDGET_TAGS;
function widgetPositionalLabel(raw) {
  const trimmed = raw.trim();
  const quote = trimmed[0];
  if (quote !== '"' && quote !== "'") return null;
  const end = endOfStringLiteral(trimmed, 0);
  return trimmed.slice(1, end - 1);
}
__name(widgetPositionalLabel, "widgetPositionalLabel");
var WIDGET_ARGS_MARKER = "__themespot_widget_args__";
function widgetValueNode(text, nodes, lineno, colno) {
  const trimmed = text.trim();
  if (/^(?:True|true)$/.test(trimmed)) return new nodes.Literal(lineno, colno, true);
  if (/^(?:False|false)$/.test(trimmed)) return new nodes.Literal(lineno, colno, false);
  if (/^(?:None|none|null)$/.test(trimmed)) return new nodes.Literal(lineno, colno, null);
  if (/^-?\d+(?:\.\d+)?$/.test(trimmed)) return new nodes.Literal(lineno, colno, Number(trimmed));
  const quote = trimmed[0];
  if ((quote === '"' || quote === "'") && endOfStringLiteral(trimmed, 0) === trimmed.length) {
    const inner = trimmed.slice(1, -1);
    const lifted = inner.includes("{{") ? liftStringInterpolations(inner) : null;
    if (lifted === null) {
      return new nodes.Literal(lineno, colno, decodeStringLiteralEscapes(inner));
    }
    return parseExpressionSource(lifted, nodes, lineno, colno) ?? new nodes.Literal(lineno, colno, decodeStringLiteralEscapes(inner));
  }
  return parseExpressionSource(trimmed, nodes, lineno, colno) ?? new nodes.Literal(lineno, colno, trimmed);
}
__name(widgetValueNode, "widgetValueNode");
function parseExpressionSource(source, nodes, lineno, colno) {
  try {
    const root = import_nunjucks.default.parser.parse(`{{ ${source} }}`, [], {});
    const output = (root.children ?? []).find(
      (child) => child instanceof nodes.Output && (child.children ?? []).length > 0
    );
    return output ? output.children[0] : null;
  } catch {
    return null;
  }
}
__name(parseExpressionSource, "parseExpressionSource");
function widgetArgumentNodes(raw, nodes, lineno, colno) {
  const pairs = Object.entries(parseSimpleKwargs(raw, { raw: true })).map(
    ([key, text]) => new nodes.Pair(
      lineno,
      colno,
      new nodes.Literal(lineno, colno, key),
      widgetValueNode(String(text), nodes, lineno, colno)
    )
  );
  return new nodes.NodeList(lineno, colno, [
    new nodes.Literal(lineno, colno, WIDGET_ARGS_MARKER),
    new nodes.Literal(lineno, colno, widgetPositionalLabel(raw)),
    new nodes.Dict(lineno, colno, pairs)
  ]);
}
__name(widgetArgumentNodes, "widgetArgumentNodes");
function widgetStoreIndex(args) {
  for (const child of args?.children ?? []) {
    if (typeof child?.value === "number") return child.value;
  }
  return null;
}
__name(widgetStoreIndex, "widgetStoreIndex");
function hsCosWrapper(type, name, body) {
  return `<span id="hs_cos_wrapper_${escapeHtmlAttribute(name)}" class="hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_${escapeHtmlAttribute(type)}" data-hs-cos-general-type="widget" data-hs-cos-type="${escapeHtmlAttribute(type)}">${body}</span>`;
}
__name(hsCosWrapper, "hsCosWrapper");
var ModuleFieldTagExtension = class {
  static {
    __name(this, "ModuleFieldTagExtension");
  }
  tags;
  env;
  collector;
  tagName;
  spec;
  constructor(env, collector, tagName) {
    this.env = env;
    this.collector = collector;
    this.tagName = tagName;
    this.spec = WIDGET_TAG_SPECS[tagName];
    this.tags = [tagName];
  }
  parse(parser, nodes) {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    const index = widgetStoreIndex(args);
    if (index === null) return new nodes.CallExtension(this, "run", args);
    return new nodes.CallExtension(
      this,
      "run",
      widgetArgumentNodes(dndArgsStore.get(index) ?? "", nodes, tok.lineno, tok.colno)
    );
  }
  run(context, ...args) {
    if (this.spec.silent !== void 0) {
      this.reportSilentRender(this.spec.silent);
      return new import_nunjucks.default.runtime.SafeString("");
    }
    const ctx = context && context.ctx || {};
    const built = args[0] === WIDGET_ARGS_MARKER;
    const params = built ? args[2] ?? {} : extractKwargs(args);
    const label = built ? args[1] : args.find((arg) => typeof arg === "string") ?? null;
    if (this.spec.bare) return this.runLegacyFieldTag(ctx, label, params);
    if (this.spec.body) {
      const rendered = this.spec.body(params, this.collector);
      if (rendered !== null) {
        return new import_nunjucks.default.runtime.SafeString(
          hsCosWrapper(this.tagName, label ?? widgetText(ctx.name), rendered)
        );
      }
    }
    this.collector.diagnostics.push(
      diagnostic(
        DIAGNOSTIC_CODES.HUBL_GLOBAL_UNIMPLEMENTED,
        `The '${this.tagName}' widget renders ${this.spec.needs}, which an offline render does not have. A labelled placeholder is shown in its place.`,
        { feature: this.tagName, needs: this.spec.needs }
      )
    );
    const body = isSourceFramedDefaultModule(this.tagName) ? `HubSpot module: ${escapeHtmlAttribute(defaultModuleDisplayName(this.tagName))} ${escapeHtmlAttribute(defaultModulePlaceholderSource(this.tagName))}` : `[HubSpot widget: ${escapeHtmlAttribute(this.tagName)} \u2014 needs ${escapeHtmlAttribute(this.spec.needs ?? "live portal data")}]`;
    return new import_nunjucks.default.runtime.SafeString(hsCosWrapper(this.tagName, label ?? widgetText(ctx.name), body));
  }
  reportSilentRender(reason) {
    const reported = this.collector.diagnostics.some(
      (entry) => entry.code === DIAGNOSTIC_CODES.HUBL_WIDGET_EDITOR_ONLY && entry.details?.feature === this.tagName
    );
    if (reported) return;
    this.collector.diagnostics.push(
      diagnostic(
        DIAGNOSTIC_CODES.HUBL_WIDGET_EDITOR_ONLY,
        `The '${this.tagName}' widget rendered nothing, which is correct: ${reason}. Nothing is missing from the page.`,
        { feature: this.tagName }
      )
    );
  }
  runLegacyFieldTag(ctx, label, params) {
    const name = label ?? params.name ?? "";
    const module = ctx.module || {};
    const fallback = params.value !== void 0 ? params.value : params.default;
    const resolved = name && module[name] !== void 0 ? module[name] : fallback;
    return new import_nunjucks.default.runtime.SafeString(widgetText(resolved));
  }
};
var WidgetBlockExtension = class {
  static {
    __name(this, "WidgetBlockExtension");
  }
  tags = ["widget_block", "widget_attribute", "content_attribute"];
  env;
  constructor(env) {
    this.env = env;
  }
  parse(parser, nodes) {
    const tok = parser.nextToken();
    const tagName = tok.value;
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tagName);
    const body = parser.parseUntilBlocks(`end_${tagName}`);
    parser.advanceAfterBlockEnd();
    return new nodes.CallExtension(this, "run", args, [body]);
  }
  run(context, ...args) {
    const body = args[args.length - 1];
    const bodyContent = typeof body === "function" ? body() : "";
    const sig = args.slice(0, -1);
    const kwargs = extractKwargs(sig);
    const name = sig.find((a) => typeof a === "string") ?? kwargs.name ?? "";
    const module = context.ctx && context.ctx.module || {};
    const value = name ? module[name] : void 0;
    if (value !== void 0 && value !== null && value !== "") {
      return new import_nunjucks.default.runtime.SafeString(String(value));
    }
    return new import_nunjucks.default.runtime.SafeString(bodyContent);
  }
};
var UnsupportedTagExtension = class {
  static {
    __name(this, "UnsupportedTagExtension");
  }
  tags;
  collector;
  feature;
  constructor(collector, feature) {
    this.collector = collector;
    this.feature = feature;
    this.tags = [feature];
  }
  parse(parser, nodes) {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtension(this, "run", args);
  }
  run(_context, ..._args) {
    this.collector.diagnostics.push(
      diagnostic(
        DIAGNOSTIC_CODES.HUBL_GLOBAL_UNIMPLEMENTED,
        `${this.feature} is not supported by the offline renderer \u2014 remove or replace it for a faithful render`,
        { feature: this.feature }
      )
    );
    return new import_nunjucks.default.runtime.SafeString(
      `<!-- ${this.feature} not rendered: unsupported HubL feature -->`
    );
  }
};
var RequireCssBlockExtension = class {
  static {
    __name(this, "RequireCssBlockExtension");
  }
  tags = ["require_css"];
  env;
  collector;
  constructor(env, collector) {
    this.env = env;
    this.collector = collector;
  }
  parse(parser, nodes) {
    const tok = parser.nextToken();
    parser.advanceAfterBlockEnd(tok.value);
    const body = parser.parseUntilBlocks("end_require_css");
    parser.advanceAfterBlockEnd();
    return new nodes.CallExtension(this, "run", null, [body]);
  }
  run(_context, body) {
    const content = typeof body === "function" ? body() : "";
    if (content.trim()) {
      this.collector.moduleStyles.push(content);
    }
    return new import_nunjucks.default.runtime.SafeString(content);
  }
};
var RequireJsBlockExtension = class {
  static {
    __name(this, "RequireJsBlockExtension");
  }
  tags = ["require_js"];
  env;
  collector;
  constructor(env, collector) {
    this.env = env;
    this.collector = collector;
  }
  parse(parser, nodes) {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    const body = parser.parseUntilBlocks("end_require_js");
    parser.advanceAfterBlockEnd();
    return new nodes.CallExtension(this, "run", args, [body]);
  }
  run(context, ...args) {
    const body = args[args.length - 1];
    const content = typeof body === "function" ? body() : "";
    if (content.trim()) {
      const kwargs = extractKwargs(args.slice(0, -1));
      const position = String(kwargs.position ?? "").trim().toLowerCase();
      this.collector.inlineScripts.push({
        source: content,
        position: position === "head" ? "head" : "footer"
      });
    }
    return new import_nunjucks.default.runtime.SafeString("");
  }
};
var RequireHeadBlockExtension = class {
  static {
    __name(this, "RequireHeadBlockExtension");
  }
  tags = ["require_head"];
  collector;
  constructor(collector) {
    this.collector = collector;
  }
  parse(parser, nodes) {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    const body = parser.parseUntilBlocks("end_require_head");
    parser.advanceAfterBlockEnd();
    return new nodes.CallExtension(this, "run", args, [body]);
  }
  run(_context, ...args) {
    const body = args[args.length - 1];
    const content = typeof body === "function" ? body() : "";
    const foreign = activeForeignRoot(this.collector);
    if (content.trim()) this.collector.headMarkup.push(foreign?.assets ? foreign.assets.html(content) : content);
    return new import_nunjucks.default.runtime.SafeString("");
  }
};
var RawHtmlExtension = class {
  static {
    __name(this, "RawHtmlExtension");
  }
  tags = ["raw_html"];
  parse(parser, nodes) {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    const index = widgetStoreIndex(args);
    if (index === null) return new nodes.CallExtension(this, "run", args);
    return new nodes.CallExtension(
      this,
      "run",
      widgetArgumentNodes(dndArgsStore.get(index) ?? "", nodes, tok.lineno, tok.colno)
    );
  }
  run(context, ...args) {
    const ctx = context && context.ctx || {};
    const built = args[0] === WIDGET_ARGS_MARKER;
    const params = built ? args[2] ?? {} : extractKwargs(args);
    const label = built ? args[1] : args.find((arg) => typeof arg === "string") ?? null;
    const name = label ?? params.name ?? "";
    const module = ctx.module || {};
    const fallback = params.value !== void 0 ? params.value : params.default;
    const resolved = name && module[name] !== void 0 ? module[name] : fallback;
    return new import_nunjucks.default.runtime.SafeString(
      hsCosWrapper("raw_html", String(name || widgetText(ctx.name)), widgetText(resolved))
    );
  }
};
var UnknownTagExtension = class {
  static {
    __name(this, "UnknownTagExtension");
  }
  tags = [UNKNOWN_TAG_OPEN];
  collector;
  reported = /* @__PURE__ */ new Set();
  constructor(collector) {
    this.collector = collector;
  }
  parse(parser, nodes) {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    const body = parser.parseUntilBlocks(UNKNOWN_TAG_CLOSE);
    parser.advanceAfterBlockEnd();
    return new nodes.CallExtension(this, "run", args, [body]);
  }
  run(_context, ...args) {
    const body = args[args.length - 1];
    const content = typeof body === "function" ? body() : "";
    const [name, storeIndex, isBlock] = args;
    const tagName = String(name ?? "unknown");
    if (!this.reported.has(tagName)) {
      this.reported.add(tagName);
      this.collector.diagnostics.push(
        diagnostic(
          DIAGNOSTIC_CODES.HUBL_TAG_UNSUPPORTED,
          `\`{% ${tagName} %}\` is not implemented by the offline renderer. A labelled placeholder is shown where it sits, and the rest of the template renders normally.`,
          {
            tag: tagName,
            form: isBlock ? "block" : "self-closing",
            args: dndArgsStore.get(storeIndex) ?? ""
          }
        )
      );
    }
    return new import_nunjucks.default.runtime.SafeString(
      `<span class="themespot-unsupported-tag" data-themespot-hubl-tag="${escapeHtmlAttribute(tagName)}">[HubL tag not rendered: ${escapeHtmlAttribute(tagName)}]</span>${content}`
    );
  }
};
function extractKwargs(args) {
  if (args.length === 0) return {};
  const last = args[args.length - 1];
  if (last && typeof last === "object" && !Array.isArray(last) && typeof last !== "function") {
    if (last.__keywords) return last;
  }
  if (args.length >= 2) {
    const secondLast = args[args.length - 2];
    if (secondLast && typeof secondLast === "object" && secondLast.__keywords) {
      return secondLast;
    }
  }
  return {};
}
__name(extractKwargs, "extractKwargs");

export {
  PREVIEW_BLOG_ROOT,
  findTopLevelKeywordPositions,
  wrapChainedTernaries,
  parenthesiseTestArguments,
  stripTrailingLiteralCommas,
  normalizePrintInterpolations,
  maskProtectedRegions,
  restoreProtectedRegions,
  knownHublTagNames,
  preprocessHubl,
  parseSimpleKwargs,
  buildBrandSettingsGlobal,
  createHublEngine,
  renderHublStringWithCollector,
  renderHublString,
  renderTemplateWithCollector,
  renderPageScaffoldWithCollector,
  renderTemplate,
  fontAwesomeStylesheetUrl,
  fontAwesomeScriptUrl
};
