import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
import {
  DIAGNOSTIC_CODES,
  ScopeCssExtension,
  diagnostic,
  hexToRgb
} from "./chunk-W5TSNL56.mjs";
import {
  require_nunjucks
} from "./chunk-RZIZEC7B.mjs";
import {
  hostFs,
  resolveSafePath
} from "./chunk-TILBP2YO.mjs";
import {
  __name,
  __toESM
} from "./chunk-PPQVNGDG.mjs";

// src/css-renderer.ts
var import_nunjucks2 = __toESM(require_nunjucks(), 1);
import path2 from "path";

// src/hostfs-loader.ts
var import_nunjucks = __toESM(require_nunjucks(), 1);
import path from "path";
var HostFsLoader = class extends import_nunjucks.default.Loader {
  static {
    __name(this, "HostFsLoader");
  }
  searchPaths;
  noCache;
  pathsToNames;
  constructor(searchPaths = ["."], options = {}) {
    super();
    const paths = Array.isArray(searchPaths) ? searchPaths : [searchPaths];
    this.searchPaths = paths.map((searchPath) => path.normalize(searchPath));
    this.noCache = Boolean(options.noCache);
    this.pathsToNames = {};
  }
  transform(source, _fullPath) {
    return source;
  }
  searchPathsFor(_name) {
    return this.searchPaths;
  }
  resolve(from, to) {
    return path.resolve(path.dirname(from), to);
  }
  isRelative(filename) {
    return filename.indexOf("./") === 0 || filename.indexOf("../") === 0;
  }
  getSource(name) {
    let fullPath = null;
    for (const searchPath of this.searchPathsFor(name)) {
      const basePath = path.resolve(searchPath);
      const candidate = path.resolve(searchPath, name);
      const inside = candidate === basePath || candidate.startsWith(basePath + path.sep);
      if (!inside) continue;
      if (!hostFs.existsSync(candidate)) continue;
      try {
        if (hostFs.statSync(candidate).isDirectory()) continue;
      } catch {
        continue;
      }
      fullPath = candidate;
      break;
    }
    if (!fullPath) return null;
    this.pathsToNames[fullPath] = name;
    const source = {
      src: this.transform(hostFs.readFileSync(fullPath, "utf-8"), fullPath),
      path: fullPath,
      noCache: this.noCache
    };
    this.emit("load", name, source);
    return source;
  }
};

// src/hubl-operators.ts
function endOfStringLiteral(expr, start) {
  const quote = expr[start];
  let i = start + 1;
  while (i < expr.length) {
    if (expr[i] === "\\") {
      i += 2;
      continue;
    }
    if (expr[i] === quote) return i + 1;
    i++;
  }
  return expr.length;
}
__name(endOfStringLiteral, "endOfStringLiteral");
var SET_TARGET = String.raw`[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\[[^\]]*\])*`;
function parenthesiseNestedDictLiterals(expr) {
  if (!expr.includes("{")) return expr;
  let out = "";
  let quote = null;
  const containers = [];
  const wrapped = [];
  for (let i = 0; i < expr.length; i++) {
    const c = expr[i];
    if (quote) {
      out += c;
      if (c === "\\") {
        if (i + 1 < expr.length) out += expr[++i];
        continue;
      }
      if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'") {
      quote = c;
      out += c;
      continue;
    }
    if (c === "{" || c === "[" || c === "(") {
      const needsWrap = c === "{" && containers[containers.length - 1] === "{";
      if (needsWrap) out += "(";
      containers.push(c);
      wrapped.push(needsWrap);
      out += c;
      continue;
    }
    if (c === "}" || c === "]" || c === ")") {
      out += c;
      containers.pop();
      if (wrapped.pop()) out += ")";
      continue;
    }
    out += c;
  }
  return out;
}
__name(parenthesiseNestedDictLiterals, "parenthesiseNestedDictLiterals");
function rewriteJsLogicalOperators(expr) {
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
    if (ch === "&" && expr[i + 1] === "&") {
      out += " and ";
      i += 2;
      continue;
    }
    if (ch === "|" && expr[i + 1] === "|") {
      out += " or ";
      i += 2;
      continue;
    }
    if (ch === "!" && expr[i + 1] !== "=") {
      const end = endOfUnaryOperand(expr, i + 1);
      if (end === i + 1) {
        out += ch;
        i++;
        continue;
      }
      out += ` not (${rewriteJsLogicalOperators(expr.slice(i + 1, end))})`;
      i = end;
      continue;
    }
    out += ch;
    i++;
  }
  return out;
}
__name(rewriteJsLogicalOperators, "rewriteJsLogicalOperators");
function endOfUnaryOperand(expr, start) {
  let i = start;
  while (i < expr.length && /\s/.test(expr[i])) i++;
  if (expr[i] === "!" && expr[i + 1] !== "=") return endOfUnaryOperand(expr, i + 1);
  if (expr[i] === '"' || expr[i] === "'") return endOfStringLiteral(expr, i);
  const closeFor = { "(": ")", "[": "]", "{": "}" };
  const skipGroup = /* @__PURE__ */ __name((from) => {
    const close = closeFor[expr[from]];
    if (!close) return from;
    let depth = 0;
    let j = from;
    while (j < expr.length) {
      const c = expr[j];
      if (c === '"' || c === "'") {
        j = endOfStringLiteral(expr, j);
        continue;
      }
      if (closeFor[c]) depth++;
      else if (c === ")" || c === "]" || c === "}") {
        depth--;
        if (depth === 0) return j + 1;
      }
      j++;
    }
    return expr.length;
  }, "skipGroup");
  if (closeFor[expr[i]]) return skipGroup(i);
  if (!/[A-Za-z_$]/.test(expr[i] ?? "")) return start;
  while (i < expr.length && /[\w$]/.test(expr[i])) i++;
  for (; ; ) {
    if (expr[i] === "." && /[A-Za-z_$]/.test(expr[i + 1] ?? "")) {
      i += 2;
      while (i < expr.length && /[\w$]/.test(expr[i])) i++;
      continue;
    }
    if (expr[i] === "[" || expr[i] === "(") {
      const after = skipGroup(i);
      if (after === i) break;
      i = after;
      continue;
    }
    break;
  }
  return i;
}
__name(endOfUnaryOperand, "endOfUnaryOperand");
function conditionalOperatorPositions(expr) {
  const hits = [];
  let depth = 0;
  let i = 0;
  while (i < expr.length) {
    const ch = expr[i];
    if (ch === '"' || ch === "'") {
      i = endOfStringLiteral(expr, i);
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
    if (depth === 0 && (ch === "?" || ch === ":")) hits.push({ ch, pos: i });
    i++;
  }
  return hits;
}
__name(conditionalOperatorPositions, "conditionalOperatorPositions");
function mapBracketGroups(expr, fn) {
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
    if (ch === "(" || ch === "[" || ch === "{") {
      const close = ch === "(" ? ")" : ch === "[" ? "]" : "}";
      let depth = 0;
      let j = i;
      while (j < expr.length) {
        const c = expr[j];
        if (c === '"' || c === "'") {
          j = endOfStringLiteral(expr, j);
          continue;
        }
        if (c === "(" || c === "[" || c === "{") depth++;
        else if (c === ")" || c === "]" || c === "}") {
          depth--;
          if (depth === 0) break;
        }
        j++;
      }
      if (j >= expr.length) {
        out += expr.slice(i);
        break;
      }
      out += ch + fn(expr.slice(i + 1, j)) + close;
      i = j + 1;
      continue;
    }
    out += ch;
    i++;
  }
  return out;
}
__name(mapBracketGroups, "mapBracketGroups");
function rewriteBracketGroupContents(inner) {
  let out = "";
  let start = 0;
  let depth = 0;
  let i = 0;
  while (i < inner.length) {
    const ch = inner[i];
    if (ch === '"' || ch === "'") {
      i = endOfStringLiteral(inner, i);
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
      out += `${rewriteListElement(inner.slice(start, i))},`;
      start = i + 1;
    }
    i++;
  }
  return out + rewriteListElement(inner.slice(start));
}
__name(rewriteBracketGroupContents, "rewriteBracketGroupContents");
var KEYWORD_ARGUMENT_PREFIX = /^\s*[A-Za-z_$][\w$]*\s*=(?!=)/;
function rewriteListElement(element) {
  const keyword = KEYWORD_ARGUMENT_PREFIX.exec(element);
  if (keyword) {
    return keyword[0] + rewriteConditionalOperator(element.slice(keyword[0].length));
  }
  const [first] = conditionalOperatorPositions(element);
  if (first && first.ch === ":") {
    const key = element.slice(0, first.pos);
    const value = element.slice(first.pos + 1);
    return `${rewriteConditionalOperator(key)}:${rewriteConditionalOperator(value)}`;
  }
  return rewriteConditionalOperator(element);
}
__name(rewriteListElement, "rewriteListElement");
function rewriteConditionalOperator(expr) {
  const withGroups = mapBracketGroups(expr, rewriteBracketGroupContents);
  const hits = conditionalOperatorPositions(withGroups);
  const question = hits.find((hit) => hit.ch === "?");
  if (!question) return withGroups;
  let pending = 0;
  let colon = -1;
  for (const hit of hits) {
    if (hit.pos <= question.pos) continue;
    if (hit.ch === "?") {
      pending++;
      continue;
    }
    if (pending > 0) {
      pending--;
      continue;
    }
    colon = hit.pos;
    break;
  }
  if (colon === -1) return withGroups;
  const condition = withGroups.slice(0, question.pos).trim();
  const whenTrue = withGroups.slice(question.pos + 1, colon).trim();
  const whenFalse = withGroups.slice(colon + 1).trim();
  return `(${rewriteConditionalOperator(whenTrue)} if ${rewriteConditionalOperator(condition)} else ${rewriteConditionalOperator(whenFalse)})`;
}
__name(rewriteConditionalOperator, "rewriteConditionalOperator");
function mapHublRegions(template, fn) {
  return template.replace(
    /(\{\{-?)([\s\S]*?)(-?\}\})|(\{%-?)([\s\S]*?)(-?%\})/g,
    (_match, printOpen, printBody, printClose, blockOpen, blockBody, blockClose) => printOpen !== void 0 ? `${printOpen}${fn(printBody, "print")}${printClose}` : `${blockOpen}${fn(blockBody, "block")}${blockClose}`
  );
}
__name(mapHublRegions, "mapHublRegions");
var CONDITION_STATEMENT_HEAD = /^(\s*(?:if|elif|elseif)\s+)/;
function normalizeHublOperators(template) {
  return mapHublRegions(template, (body, kind) => {
    const logical = rewriteJsLogicalOperators(body);
    if (kind === "print") return rewriteConditionalOperator(logical);
    const assignment = new RegExp(`^(\\s*set\\s+${SET_TARGET}(?:\\s*,\\s*${SET_TARGET})*\\s*=(?!=)\\s*)`).exec(logical);
    if (assignment) {
      return assignment[1] + rewriteConditionalOperator(logical.slice(assignment[1].length));
    }
    const condition = CONDITION_STATEMENT_HEAD.exec(logical);
    if (condition) {
      return condition[1] + rewriteConditionalOperator(logical.slice(condition[1].length));
    }
    return logical;
  });
}
__name(normalizeHublOperators, "normalizeHublOperators");

// src/css-renderer.ts
function preprocessCssHubl(source) {
  return normalizeHublOperators(source);
}
__name(preprocessCssHubl, "preprocessCssHubl");
function colorVariant(hexColor, amount) {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  l = Math.max(0, Math.min(1, l + amount / 100));
  const hue2rgb = /* @__PURE__ */ __name((p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }, "hue2rgb");
  let rr, gg, bb;
  if (s === 0) {
    rr = gg = bb = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    rr = hue2rgb(p, q, h + 1 / 3);
    gg = hue2rgb(p, q, h);
    bb = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = /* @__PURE__ */ __name((n) => Math.round(n * 255).toString(16).padStart(2, "0"), "toHex");
  return `#${toHex(rr)}${toHex(gg)}${toHex(bb)}`;
}
__name(colorVariant, "colorVariant");
var DEFAULT_SETTINGS_FILE_ORDER = [
  "_layout.hubl.css",
  "_typography.hubl.css",
  "_colors.hubl.css",
  "_button.hubl.css",
  "_forms.hubl.css",
  "_cards.hubl.css",
  "_section-colors.hubl.css",
  "_tags.hubl.css",
  "_borders.hubl.css",
  "_icons.hubl.css",
  "_shadows.hubl.css",
  "_transitions.hubl.css",
  "_zindex.hubl.css",
  "_focus.hubl.css"
];
var CSS_AT_IMPORT = /@import\s+(?:url\()?\s*['"]([^'"]+)['"]\s*\)?\s*;/g;
function stripCssBlockComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, "");
}
__name(stripCssBlockComments, "stripCssBlockComments");
function parseCssImports(source) {
  const withoutBlockComments = stripCssBlockComments(source);
  const imports = [];
  CSS_AT_IMPORT.lastIndex = 0;
  let match;
  while ((match = CSS_AT_IMPORT.exec(withoutBlockComments)) !== null) {
    imports.push(match[1]);
  }
  return imports;
}
__name(parseCssImports, "parseCssImports");
var CSS_HUBL_INCLUDE = /\{%-?\s*include\s+(?:"([^"]+)"|'([^']+)')\s*-?%\}/g;
var CSS_HUBL_IMPORT = /\{%-?\s*import\s+(?:"([^"]+)"|'([^']+)')\s*-?%\}/g;
function isInsideDir(dir, filePath) {
  const base = path2.resolve(dir);
  const candidate = path2.resolve(filePath);
  return candidate === base || candidate.startsWith(base + path2.sep);
}
__name(isInsideDir, "isInsideDir");
function parseCssPartRefs(source) {
  const stripped = stripCssBlockComments(source);
  const hits = [];
  for (const pattern of [CSS_AT_IMPORT, CSS_HUBL_INCLUDE]) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(stripped)) !== null) {
      const ref = match[1] ?? match[2];
      if (ref) hits.push({ index: match.index, ref });
    }
  }
  hits.sort((a, b) => a.index - b.index);
  return hits.map((hit) => hit.ref);
}
__name(parseCssPartRefs, "parseCssPartRefs");
function stripCssHublIncludes(source) {
  return source.replace(CSS_HUBL_INCLUDE, "");
}
__name(stripCssHublIncludes, "stripCssHublIncludes");
function inlineCssHublRefs(source, fileDir, rootDir, options, depth = 0) {
  if (depth > 8) return options.includes ? stripCssHublIncludes(source) : source;
  const splice = /* @__PURE__ */ __name((_match, doubleQuoted, singleQuoted) => {
    const ref = doubleQuoted ?? singleQuoted;
    let target;
    try {
      target = resolveSafePath(rootDir, path2.resolve(fileDir, ref));
    } catch {
      return "";
    }
    if (!hostFs.existsSync(target)) return "";
    try {
      const nested = hostFs.readFileSync(target, "utf-8");
      return inlineCssHublRefs(nested, path2.dirname(target), rootDir, options, depth + 1);
    } catch {
      return "";
    }
  }, "splice");
  let out = source.replace(CSS_HUBL_IMPORT, splice);
  if (options.includes) out = out.replace(CSS_HUBL_INCLUDE, splice);
  return out;
}
__name(inlineCssHublRefs, "inlineCssHublRefs");
function getSettingsFileOrder(settingsDir) {
  const variablesPath = resolveSafePath(settingsDir, "_variables.hubl.css");
  if (hostFs.existsSync(variablesPath)) {
    try {
      const source = hostFs.readFileSync(variablesPath, "utf-8");
      const imports = parseCssImports(source);
      if (imports.length > 0) {
        return imports.map((file) => resolveSafePath(settingsDir, file));
      }
    } catch {
    }
  }
  return DEFAULT_SETTINGS_FILE_ORDER.map(
    (file) => resolveSafePath(settingsDir, file)
  );
}
__name(getSettingsFileOrder, "getSettingsFileOrder");
var CSS_ENTRY_FILES = ["main.hubl.css", "main.css"];
function getCssFileOrder(cssDir) {
  return walkCssAssembly(cssDir).ordered;
}
__name(getCssFileOrder, "getCssFileOrder");
function walkCssAssembly(cssDir) {
  for (const entry of CSS_ENTRY_FILES) {
    const entryPath = path2.join(cssDir, entry);
    if (!hostFs.existsSync(entryPath)) continue;
    const assembly = resolveCssImportGraph(entryPath, cssDir);
    if (assembly.ordered.length > 0) return assembly;
  }
  return { ordered: getFallbackCssFileOrder(cssDir), barrels: [] };
}
__name(walkCssAssembly, "walkCssAssembly");
function resolveCssImportGraph(entryPath, rootDir) {
  const ordered = [];
  const barrels = [];
  const visited = /* @__PURE__ */ new Set();
  const walk = /* @__PURE__ */ __name((filePath) => {
    if (visited.has(filePath)) return;
    visited.add(filePath);
    let source;
    try {
      source = hostFs.readFileSync(filePath, "utf-8");
    } catch {
      return;
    }
    const fileDir = path2.dirname(filePath);
    for (const ref of parseCssPartRefs(source)) {
      let target;
      try {
        target = resolveSafePath(rootDir, path2.resolve(fileDir, ref));
      } catch {
        continue;
      }
      walk(target);
    }
    if (cssFileHasOwnRules(source)) ordered.push(filePath);
    else barrels.push(filePath);
  }, "walk");
  walk(entryPath);
  return { ordered, barrels };
}
__name(resolveCssImportGraph, "resolveCssImportGraph");
function cssFileHasOwnRules(source) {
  const stripped = stripCssHublIncludes(source).replace(/\/\*[\s\S]*?\*\//g, "").replace(/\{#[\s\S]*?#\}/g, "").replace(/@import\s+(?:url\()?\s*['"][^'"]+['"]\s*\)?\s*;/g, "");
  return stripped.trim().length > 0;
}
__name(cssFileHasOwnRules, "cssFileHasOwnRules");
function getFallbackCssFileOrder(cssDir) {
  const settingsDir = path2.join(cssDir, "settings");
  const settingsFiles = getSettingsFileOrder(settingsDir);
  const genericFiles = [
    path2.join(cssDir, "generic", "_reset.css"),
    path2.join(cssDir, "generic", "_normalize.css")
  ];
  const objectFiles = [
    path2.join(cssDir, "objects", "_layout.css")
  ];
  const elementFiles = [
    path2.join(cssDir, "elements", "_typography.hubl.css"),
    path2.join(cssDir, "elements", "_buttons.hubl.css"),
    path2.join(cssDir, "elements", "_cards.hubl.css"),
    path2.join(cssDir, "elements", "_forms.hubl.css")
  ];
  const componentFiles = [
    path2.join(cssDir, "components", "_header.hubl.css"),
    path2.join(cssDir, "components", "_footer.hubl.css"),
    path2.join(cssDir, "components", "_menu.hubl.css"),
    path2.join(cssDir, "components", "_default-modules.css")
  ];
  const presetFiles = [
    path2.join(cssDir, "presets", "_onyx.hubl.css")
  ];
  return [
    ...settingsFiles,
    ...genericFiles,
    ...objectFiles,
    ...elementFiles,
    ...componentFiles,
    ...presetFiles
  ];
}
__name(getFallbackCssFileOrder, "getFallbackCssFileOrder");
function getCascadedCssFileOrder(cssDirs) {
  const orderSource = [...cssDirs].reverse().find((dir) => hostFs.existsSync(dir)) ?? cssDirs[0];
  const assembly = walkCssAssembly(orderSource);
  const cascade = /* @__PURE__ */ __name((files) => files.map((filePath) => path2.relative(orderSource, filePath)).map((relativePath) => {
    for (const cssDir of cssDirs) {
      const candidate = resolveSafePath(cssDir, relativePath);
      if (hostFs.existsSync(candidate)) return candidate;
    }
    return resolveSafePath(cssDirs[0], relativePath);
  }), "cascade");
  return { ordered: cascade(assembly.ordered), barrels: cascade(assembly.barrels) };
}
__name(getCascadedCssFileOrder, "getCascadedCssFileOrder");
function resolveDeclaredCssAssets(cssDirs, cssAssets) {
  return cssAssets.map((asset) => {
    for (const cssDir of cssDirs) {
      const candidate = resolveSafePath(cssDir, asset);
      if (hostFs.existsSync(candidate)) return candidate;
    }
    return resolveSafePath(cssDirs[0], asset);
  });
}
__name(resolveDeclaredCssAssets, "resolveDeclaredCssAssets");
function wcagLuminance({ r, g, b }) {
  const channel = /* @__PURE__ */ __name((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  }, "channel");
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}
__name(wcagLuminance, "wcagLuminance");
function colorContrast(c1, c2, standard = "AA") {
  const rgb1 = hexToRgb(c1);
  const rgb2 = hexToRgb(c2);
  if (!rgb1 || !rgb2) return false;
  const l1 = wcagLuminance(rgb1);
  const l2 = wcagLuminance(rgb2);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  const threshold = String(standard).toUpperCase() === "AAA" ? 7 : 4.5;
  return ratio >= threshold;
}
__name(colorContrast, "colorContrast");
function convertRgb(value) {
  const rgb = hexToRgb(value);
  return rgb ? `${rgb.r},${rgb.g},${rgb.b}` : String(value ?? "");
}
__name(convertRgb, "convertRgb");
var ASSUMED_ASSET_VERSION = "0";
function createGetAssetUrlGlobal(resolve) {
  return (assetPath) => {
    const reference = typeof assetPath === "string" ? assetPath : String(assetPath ?? "");
    if (reference === "") return "";
    if (/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(reference) || /^data:/i.test(reference)) return reference;
    const resolved = resolve?.(reference) ?? null;
    if (resolved === null) return reference;
    return `file://${resolved.replace(/\\/g, "/")}`;
  };
}
__name(createGetAssetUrlGlobal, "createGetAssetUrlGlobal");
function createGetAssetVersionGlobal(onDiagnostic) {
  const reported = /* @__PURE__ */ new Set();
  return (assetPath) => {
    const asset = String(assetPath ?? "");
    if (!reported.has(asset)) {
      reported.add(asset);
      onDiagnostic(
        diagnostic(
          DIAGNOSTIC_CODES.HUBL_GLOBAL_UNIMPLEMENTED,
          `get_asset_version("${asset}") answered "${ASSUMED_ASSET_VERSION}" \u2014 the real value is the version of that default module installed in the portal, which an offline render cannot read. Rules guarded on any other version are omitted from the output.`,
          { feature: "get_asset_version", asset, assumedVersion: ASSUMED_ASSET_VERSION }
        )
      );
    }
    return ASSUMED_ASSET_VERSION;
  };
}
__name(createGetAssetVersionGlobal, "createGetAssetVersionGlobal");
function createNunjucksEnv(cssDirs, globals, onDiagnostic, resolveAsset) {
  const env = new import_nunjucks2.default.Environment(
    new HostFsLoader(cssDirs),
    { autoescape: false, throwOnUndefined: false }
  );
  import_nunjucks2.default.installJinjaCompat();
  env.addExtension(
    "ScopeCssTag",
    new ScopeCssExtension({
      renderToken: env,
      onScoped: /* @__PURE__ */ __name(() => {
      }, "onScoped"),
      onDiagnostic
    })
  );
  for (const [key, value] of Object.entries(globals)) {
    env.addGlobal(key, value);
  }
  env.addGlobal("color_variant", colorVariant);
  env.addGlobal("color_contrast", colorContrast);
  env.addGlobal("get_asset_version", createGetAssetVersionGlobal(onDiagnostic));
  env.addGlobal("get_asset_url", createGetAssetUrlGlobal(resolveAsset));
  env.addFilter("convert_rgb", convertRgb);
  env.addFilter("color_variant", colorVariant);
  return env;
}
__name(createNunjucksEnv, "createNunjucksEnv");
var HUBL_DELIMITERS = [
  ["{{", "}}"],
  ["{%", "%}"],
  ["{#", "#}"]
];
function containsHubl(source) {
  return HUBL_DELIMITERS.some(([open, close]) => {
    const start = source.indexOf(open);
    return start !== -1 && source.indexOf(close, start + open.length) !== -1;
  });
}
__name(containsHubl, "containsHubl");
function isHublStylesheet(filePath, source) {
  return filePath.endsWith(".hubl.css") || containsHubl(source);
}
__name(isHublStylesheet, "isHublStylesheet");
function resolveThemeCssFiles(options) {
  return resolveThemeCssAssembly(options).ordered;
}
__name(resolveThemeCssFiles, "resolveThemeCssFiles");
function resolveThemeCssCoverage(options) {
  const assembly = resolveThemeCssAssembly(options);
  return [...assembly.ordered, ...assembly.barrels];
}
__name(resolveThemeCssCoverage, "resolveThemeCssCoverage");
function resolveThemeCssAssembly(options) {
  const { cssDir, cssDirs = [cssDir], cssAssets } = options;
  const assembly = cssAssets && cssAssets.length > 0 ? { ordered: resolveDeclaredCssAssets(cssDirs, cssAssets), barrels: [] } : getCascadedCssFileOrder(cssDirs);
  const exists = /* @__PURE__ */ __name((filePath) => hostFs.existsSync(filePath), "exists");
  return { ordered: assembly.ordered.filter(exists), barrels: assembly.barrels.filter(exists) };
}
__name(resolveThemeCssAssembly, "resolveThemeCssAssembly");
function cssRelativePath(filePath, cssDirs) {
  const owningDir = cssDirs.find((dir) => isInsideDir(dir, filePath));
  if (!owningDir) return path2.basename(filePath);
  const relative = path2.relative(owningDir, filePath).replace(/\\/g, "/");
  return relative || path2.basename(filePath);
}
__name(cssRelativePath, "cssRelativePath");
function cssRenderErrorDiagnostic(filePath, cssDirs, message) {
  const sourceFile = cssRelativePath(filePath, cssDirs);
  return diagnostic(
    DIAGNOSTIC_CODES.CSS_RENDER_ERROR,
    `Theme stylesheet failed to render: ${sourceFile} \u2014 ${message}`,
    { sourceFile, error: message }
  );
}
__name(cssRenderErrorDiagnostic, "cssRenderErrorDiagnostic");
function renderThemeCssWithDiagnostics(options) {
  const { theme, cssDir, cssDirs = [cssDir], presetName = "default", cssAssets, baseSize, resolveAsset } = options;
  const globals = {
    theme,
    base_size: baseSize ?? 16,
    theme_preset: { name: presetName }
  };
  const diagnostics = [];
  const env = createNunjucksEnv(cssDirs, globals, (error) => diagnostics.push(error), resolveAsset);
  const files = resolveThemeCssFiles({ cssDir, cssDirs, cssAssets });
  const parts = [];
  for (const filePath of files) {
    const raw = hostFs.readFileSync(filePath, "utf-8");
    if (!isHublStylesheet(filePath, raw)) {
      parts.push(`/* === ${path2.basename(filePath)} === */
${raw}`);
      continue;
    }
    const fileDir = path2.dirname(filePath);
    const owningDir = cssDirs.find((dir) => isInsideDir(dir, filePath)) ?? fileDir;
    const assembled = inlineCssHublRefs(stripCssHublIncludes(raw), fileDir, owningDir, { includes: false });
    const preprocessed = preprocessCssHubl(assembled);
    try {
      const rendered = env.renderString(preprocessed, globals);
      parts.push(`/* === ${path2.basename(filePath)} === */
${rendered}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      parts.push(
        `/* === ${path2.basename(filePath)} \u2014 RENDER ERROR === */
/* ${message} */
`
      );
      diagnostics.push(cssRenderErrorDiagnostic(filePath, cssDirs, message));
    }
  }
  return { css: parts.join("\n\n"), diagnostics };
}
__name(renderThemeCssWithDiagnostics, "renderThemeCssWithDiagnostics");
function renderThemeCss(options) {
  return renderThemeCssWithDiagnostics(options).css;
}
__name(renderThemeCss, "renderThemeCss");
function renderHublCssFile(filePath, options) {
  return renderHublCssFileWithDiagnostics(filePath, options).css;
}
__name(renderHublCssFile, "renderHublCssFile");
function renderHublCssFileWithDiagnostics(filePath, options) {
  const raw = hostFs.readFileSync(filePath, "utf-8");
  if (!isHublStylesheet(filePath, raw)) return { css: raw, diagnostics: [] };
  const fileDir = path2.dirname(filePath);
  const source = inlineCssHublRefs(raw, fileDir, fileDir, { includes: true });
  const globals = {
    theme: options.theme,
    base_size: options.baseSize ?? 16,
    theme_preset: { name: options.presetName ?? "default" }
  };
  const diagnostics = [];
  const env = createNunjucksEnv([fileDir], globals, (error) => diagnostics.push(error), options.resolveAsset);
  try {
    return { css: env.renderString(preprocessCssHubl(source), globals), diagnostics };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    diagnostics.push(cssRenderErrorDiagnostic(filePath, [fileDir], message));
    return { css: raw, diagnostics };
  }
}
__name(renderHublCssFileWithDiagnostics, "renderHublCssFileWithDiagnostics");
function renderThemeCssToFile(options, outputPath) {
  const { css, diagnostics } = renderThemeCssWithDiagnostics(options);
  const dir = path2.dirname(outputPath);
  if (!hostFs.existsSync(dir)) hostFs.mkdirSync(dir, { recursive: true });
  hostFs.writeFileSync(outputPath, css, "utf-8");
  return diagnostics;
}
__name(renderThemeCssToFile, "renderThemeCssToFile");

export {
  HostFsLoader,
  endOfStringLiteral,
  SET_TARGET,
  parenthesiseNestedDictLiterals,
  rewriteJsLogicalOperators,
  rewriteConditionalOperator,
  normalizeHublOperators,
  colorVariant,
  parseCssImports,
  CSS_ENTRY_FILES,
  getCssFileOrder,
  colorContrast,
  convertRgb,
  ASSUMED_ASSET_VERSION,
  createGetAssetUrlGlobal,
  createGetAssetVersionGlobal,
  containsHubl,
  resolveThemeCssFiles,
  resolveThemeCssCoverage,
  renderThemeCssWithDiagnostics,
  renderThemeCss,
  renderHublCssFile,
  renderHublCssFileWithDiagnostics,
  renderThemeCssToFile
};
