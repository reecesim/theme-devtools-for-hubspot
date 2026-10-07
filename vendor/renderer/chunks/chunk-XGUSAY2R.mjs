import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
import {
  createHublEngine,
  preprocessHubl,
  renderHublStringWithCollector,
  renderPageScaffoldWithCollector,
  renderTemplateWithCollector
} from "./chunk-DS7F6ODD.mjs";
import {
  contentStateShapeProblem,
  createProvenanceContext,
  createThemeAssetResolver,
  decodeBase64Utf8,
  emulateContentLinks,
  encodeBase64Utf8,
  extractProvenanceAttributes,
  locateTemplate,
  provenanceAttributes,
  provenanceFileFor,
  resolveInThemeCascade,
  resolveModuleDir,
  resolveThemeRoots,
  routeModuleRender,
  stampFirstElementWith,
  synthesiseGradientCss,
  synthesiseSpacingAndBorderCss,
  validateThemeMetadataPaths
} from "./chunk-ZOOMNTJN.mjs";
import {
  EMBEDDED_FIXTURES
} from "./chunk-S62FVW6S.mjs";
import {
  renderHublCssFileWithDiagnostics,
  renderThemeCssWithDiagnostics,
  resolveThemeCssCoverage
} from "./chunk-ZH4AFS5M.mjs";
import {
  DIAGNOSTIC_CODES,
  diagnostic
} from "./chunk-W5TSNL56.mjs";
import {
  isPlainRecord,
  normaliseRootDir,
  normaliseRootPath,
  pageRootBinding,
  summarisePageRecords
} from "./chunk-SECO6OCJ.mjs";
import {
  RendererError,
  hostFs,
  resolveSafePath
} from "./chunk-TILBP2YO.mjs";
import {
  __name
} from "./chunk-PPQVNGDG.mjs";

// src/page-renderer.ts
import path4 from "path";

// src/settings-resolver.ts
var FONT_DEFAULTS = {
  font: "",
  font_set: "DEFAULT",
  fallback: "sans-serif",
  size: 16,
  size_unit: "px",
  color: "#000000",
  styles: {
    "font-weight": "400",
    "font-style": "normal"
  },
  variant: "400"
};
var COLOR_DEFAULTS = {
  color: "",
  opacity: 100
};
function resolvePropertyPath(root, path5) {
  const parts = path5.replace(/^theme\./, "").split(".");
  let current = root;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return void 0;
    current = current[part];
  }
  return current;
}
__name(resolvePropertyPath, "resolvePropertyPath");
function extractFieldDefault(field) {
  const { type } = field;
  const def = field.default;
  const inheritedProps = new Set(
    Object.keys(field.inherited_value?.property_value_paths ?? {})
  );
  switch (type) {
    case "group":
      return resolveGroup(field.children || []);
    case "font": {
      const merged = {};
      for (const [k, v] of Object.entries(FONT_DEFAULTS)) {
        if (inheritedProps.has(k)) continue;
        merged[k] = k === "styles" ? { ...v } : v;
      }
      if (def) {
        for (const [k, v] of Object.entries(def)) {
          if (k === "styles") {
            merged.styles = { ...merged.styles ?? FONT_DEFAULTS.styles, ...v };
          } else {
            merged[k] = v;
          }
        }
      }
      if (!merged.styles) merged.styles = { ...FONT_DEFAULTS.styles };
      if (merged.variant && merged.variant !== FONT_DEFAULTS.variant) {
        const v = String(merged.variant);
        const isItalic = v.endsWith("italic");
        const weight = isItalic ? v.replace("italic", "") : v;
        if (weight) merged.styles["font-weight"] = weight;
        if (isItalic) merged.styles["font-style"] = "italic";
      }
      return merged;
    }
    case "color": {
      const merged = {};
      for (const [k, v] of Object.entries(COLOR_DEFAULTS)) {
        if (!inheritedProps.has(k)) merged[k] = v;
      }
      if (def) Object.assign(merged, def);
      return merged;
    }
    case "choice":
    case "number":
    case "boolean":
    case "text":
    case "url":
    case "image":
    case "spacing":
    case "alignment":
      return def ?? null;
    case "gradient":
    case "border":
    case "background":
    case "logo":
    case "richtext":
    case "menu":
    case "simple_menu":
    case "form":
    case "hubdb_table":
    case "blog":
    case "link":
    case "cta":
    case "icon":
    case "video":
      return compositeFieldDefault(type, def);
    default:
      return def ?? null;
  }
}
__name(extractFieldDefault, "extractFieldDefault");
function borderSide() {
  return { width: { value: 0, units: "px" }, style: "solid", color: { color: "", opacity: 100 } };
}
__name(borderSide, "borderSide");
function compositeFieldDefault(type, def) {
  switch (type) {
    case "richtext":
      return def ?? "";
    case "menu":
    case "simple_menu":
      return def ?? [];
    case "gradient": {
      const merged = {
        colors: [],
        side_or_corner: { type: "SIDE_OR_CORNER", verticalSide: "BOTTOM", horizontalSide: null },
        css: "",
        ...def ?? {}
      };
      synthesiseGradientCss(merged);
      return merged;
    }
    case "link":
      return { url: { type: "EXTERNAL", href: "", content_id: null }, open_in_new_tab: false, no_follow: false, ...def ?? {} };
    case "icon":
      return { name: "", type: "SOLID", unicode: "", ...def ?? {} };
    case "background":
      return { type: "color", color: { color: "", opacity: 100 }, ...def ?? {} };
    case "logo":
      return { src: "", alt: "", width: null, height: null, href: "", override_inherited_src: false, ...def ?? {} };
    case "border":
      return def ?? { top: borderSide(), bottom: borderSide(), left: borderSide(), right: borderSide() };
    case "form":
      return def ?? { form_id: "", response_type: "inline", message: "" };
    case "hubdb_table":
    case "blog":
    case "cta":
    case "video":
    default:
      return def ?? {};
  }
}
__name(compositeFieldDefault, "compositeFieldDefault");
function resolveGroup(fields) {
  const result = {};
  for (const field of fields) {
    result[field.name] = extractFieldDefault(field);
  }
  return result;
}
__name(resolveGroup, "resolveGroup");
function applyInheritedValues(fields, root, overriddenLeafProps = /* @__PURE__ */ new Set(), currentPath = []) {
  for (const field of fields) {
    if (field.type === "group" && field.children) {
      applyInheritedValues(field.children, root, overriddenLeafProps, [...currentPath, field.name]);
      continue;
    }
    const inherited = field.inherited_value?.property_value_paths;
    if (!inherited) continue;
    const targetPath = [...currentPath, field.name];
    let target = root;
    for (let i = 0; i < targetPath.length - 1; i++) {
      if (target[targetPath[i]] == null) return;
      target = target[targetPath[i]];
    }
    const fieldKey = targetPath[targetPath.length - 1];
    const currentValue = target[fieldKey];
    const explicitDefaults = new Set(Object.keys(field.default ?? {}));
    const leafPathStr = targetPath.join(".");
    for (const [prop, sourcePath] of Object.entries(inherited)) {
      if (explicitDefaults.has(prop)) continue;
      if (overriddenLeafProps.has(`${leafPathStr}.${prop}`)) continue;
      const resolvedValue = resolvePropertyPath(root, sourcePath);
      if (resolvedValue === void 0) continue;
      if (typeof currentValue === "object" && currentValue !== null) {
        currentValue[prop] = resolvedValue;
      }
    }
  }
}
__name(applyInheritedValues, "applyInheritedValues");
function collectOverrideLeafPaths(obj, path5, out) {
  if (obj == null) return;
  if (typeof obj !== "object" || Array.isArray(obj)) {
    out.add(path5.join("."));
    return;
  }
  for (const key of Object.keys(obj)) {
    collectOverrideLeafPaths(obj[key], [...path5, key], out);
  }
}
__name(collectOverrideLeafPaths, "collectOverrideLeafPaths");
function mergeThemeFields(parentFields, childFields) {
  const byName = /* @__PURE__ */ new Map();
  const order = [];
  for (const field of parentFields ?? []) {
    byName.set(field.name, clone(field));
    order.push(field.name);
  }
  for (const child of childFields ?? []) {
    if (!byName.has(child.name)) {
      byName.set(child.name, clone(child));
      order.push(child.name);
      continue;
    }
    byName.set(child.name, mergeField(byName.get(child.name), child));
  }
  return order.map((name) => byName.get(name));
}
__name(mergeThemeFields, "mergeThemeFields");
function mergeField(parent, child) {
  const merged = { ...parent, ...clone(child) };
  if (parent.children || child.children) {
    merged.children = mergeThemeFields(parent.children ?? [], child.children ?? []);
  }
  return merged;
}
__name(mergeField, "mergeField");
function clone(value) {
  return JSON.parse(JSON.stringify(value));
}
__name(clone, "clone");
function fontFieldStyle(font) {
  const declarations = [];
  const family = typeof font.font === "string" ? font.font.trim() : "";
  if (family) {
    const fallback = typeof font.fallback === "string" ? font.fallback.trim() : "";
    declarations.push(`font-family: ${fallback ? `${family}, ${fallback}` : family}`);
  }
  const styles = font.styles;
  if (styles && typeof styles === "object") {
    for (const [property, value] of Object.entries(styles)) {
      if (value === null || value === void 0 || String(value).trim() === "") continue;
      declarations.push(`${property}: ${String(value).trim()}`);
    }
  }
  return declarations.join("; ");
}
__name(fontFieldStyle, "fontFieldStyle");
function applySynthesisedFontStyles(node) {
  if (!node || typeof node !== "object" || Array.isArray(node)) return;
  const isFontField = typeof node.font === "string" && node.styles && typeof node.styles === "object";
  if (isFontField) {
    node.style = fontFieldStyle(node);
    return;
  }
  for (const value of Object.values(node)) applySynthesisedFontStyles(value);
}
__name(applySynthesisedFontStyles, "applySynthesisedFontStyles");
function resolveThemeSettings(fieldsJson, overrides) {
  const theme = resolveGroup(fieldsJson);
  const overriddenLeafProps = /* @__PURE__ */ new Set();
  if (overrides) {
    collectOverrideLeafPaths(overrides, [], overriddenLeafProps);
    deepMerge(theme, overrides);
  }
  applyInheritedValues(fieldsJson, theme, overriddenLeafProps);
  applySynthesisedFontStyles(theme);
  synthesiseSpacingAndBorderCss(theme);
  return theme;
}
__name(resolveThemeSettings, "resolveThemeSettings");
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key]) && target[key] && typeof target[key] === "object") {
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}
__name(deepMerge, "deepMerge");

// src/ssr-bridge-default.core.ts
async function loadDefaultSsrBridgeFactory() {
  return null;
}
__name(loadDefaultSsrBridgeFactory, "loadDefaultSsrBridgeFactory");

// src/theme-manifest.ts
import path from "path";
function asString(value) {
  return typeof value === "string" && value.length > 0 ? value : void 0;
}
__name(asString, "asString");
function asNumber(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : void 0;
}
__name(asNumber, "asNumber");
function asStringArray(value) {
  if (!Array.isArray(value)) return void 0;
  const out = value.filter((v) => typeof v === "string");
  return out.length > 0 ? out : void 0;
}
__name(asStringArray, "asStringArray");
function loadThemeManifest(themeRoot) {
  const name = path.basename(path.resolve(themeRoot));
  const themeJsonPath = resolveSafePath(themeRoot, "theme.json");
  if (!hostFs.existsSync(themeJsonPath)) {
    return { name, raw: {}, source: "fallback" };
  }
  let raw;
  try {
    raw = JSON.parse(hostFs.readFileSync(themeJsonPath, "utf-8"));
  } catch {
    return { name, raw: {}, source: "fallback" };
  }
  const breakpoints = Array.isArray(raw.responsive_breakpoints) ? raw.responsive_breakpoints.filter((b) => b && typeof b.name === "string").map((b) => ({ name: b.name, mediaQuery: asString(b.mediaQuery), previewWidth: b.previewWidth })) : void 0;
  return {
    name,
    label: asString(raw.label),
    version: asString(raw.version),
    screenshotPath: asString(raw.screenshot_path),
    extends: asString(raw.extends),
    cssAssets: asStringArray(raw.css_assets),
    baseSize: asNumber(raw.base_size),
    tokenPrefix: asString(raw.token_prefix),
    responsiveBreakpoints: breakpoints,
    raw,
    source: "theme.json"
  };
}
__name(loadThemeManifest, "loadThemeManifest");

// src/theme-fields.ts
function loadMergedFieldsJson(themeRoots) {
  if (!themeRoots.parentThemeRoot || !themeRoots.childThemeRoot) {
    const fieldsPath = resolveSafePath(themeRoots.themeRoot, "fields.json");
    const fields = JSON.parse(hostFs.readFileSync(fieldsPath, "utf-8"));
    validateThemeMetadataPaths(themeRoots, fieldsPath, fields);
    return fields;
  }
  const parentFieldsPath = resolveSafePath(themeRoots.parentThemeRoot, "fields.json");
  const childFieldsPath = resolveSafePath(themeRoots.childThemeRoot, "fields.json");
  const parentFields = hostFs.existsSync(parentFieldsPath) ? JSON.parse(hostFs.readFileSync(parentFieldsPath, "utf-8")) : [];
  const childFields = hostFs.existsSync(childFieldsPath) ? JSON.parse(hostFs.readFileSync(childFieldsPath, "utf-8")) : [];
  validateThemeMetadataPaths(themeRoots, parentFieldsPath, parentFields);
  validateThemeMetadataPaths(themeRoots, childFieldsPath, childFields);
  return mergeThemeFields(parentFields, childFields);
}
__name(loadMergedFieldsJson, "loadMergedFieldsJson");

// src/asset-urls.ts
var SCHEME_RE = /^[a-zA-Z][a-zA-Z0-9+.-]*:/;
var FILE_SCHEME_RE = /^file:\/\//i;
var SINGLE_URL_ATTRIBUTES = /* @__PURE__ */ new Set(["src", "poster"]);
var HREF_ATTRIBUTES = /* @__PURE__ */ new Set(["href", "xlink:href"]);
var HREF_ASSET_ELEMENTS = /* @__PURE__ */ new Set(["use", "image"]);
var SRCSET_ATTRIBUTES = /* @__PURE__ */ new Set(["srcset", "imagesrcset"]);
var MODULE_PROPS_ATTRIBUTE = "data-module-props";
var ASSET_LINK_RELS = /* @__PURE__ */ new Set([
  "stylesheet",
  "icon",
  "shortcut",
  "apple-touch-icon",
  "apple-touch-startup-image",
  "mask-icon",
  "fluid-icon",
  "manifest",
  "preload",
  "prefetch",
  "modulepreload"
]);
var UNSAFE_BASE_CHARS_RE = /["'<>()`\s]/;
function sealNonce() {
  const cryptoApi = globalThis.crypto;
  const bytes = new Uint8Array(16);
  if (cryptoApi && typeof cryptoApi.getRandomValues === "function") {
    cryptoApi.getRandomValues(bytes);
  } else {
    for (let index = 0; index < bytes.length; index++) bytes[index] = Math.floor(Math.random() * 256);
  }
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}
__name(sealNonce, "sealNonce");
function splitTail(value) {
  const at = value.search(/[?#]/);
  if (at < 0) return { path: value, tail: "" };
  return { path: value.slice(0, at), tail: value.slice(at) };
}
__name(splitTail, "splitTail");
function isPreservedAssetUrl(reference) {
  const value = reference.trim();
  if (value === "") return true;
  if (value.startsWith("#")) return true;
  if (value.startsWith("//")) return true;
  if (FILE_SCHEME_RE.test(value)) return false;
  return SCHEME_RE.test(value);
}
__name(isPreservedAssetUrl, "isPreservedAssetUrl");
function normaliseReference(rawPath) {
  const stripped = rawPath.replace(/^\/+/, "").replace(/^(?:\.\.?\/+)+/, "");
  const segments = [];
  for (const segment of stripped.split("/")) {
    if (segment === "" || segment === ".") continue;
    if (segment === "..") {
      if (segments.length === 0) return { reason: "escapes-base" };
      segments.pop();
      continue;
    }
    segments.push(segment);
  }
  if (segments.length === 0) return { reason: "empty" };
  return { path: segments.join("/") };
}
__name(normaliseReference, "normaliseReference");
function normaliseRootPath2(value) {
  return value.replace(/\\/g, "/").replace(/\/+$/, "");
}
__name(normaliseRootPath2, "normaliseRootPath");
function fileUrlToThemeRelativePath(url, themeRoots) {
  if (!FILE_SCHEME_RE.test(url)) return null;
  let pathname = url.slice("file://".length);
  if (/^\/[A-Za-z]:/.test(pathname)) pathname = pathname.slice(1);
  try {
    pathname = decodeURI(pathname);
  } catch {
  }
  const candidate = normaliseRootPath2(pathname);
  const roots = [...themeRoots].map(normaliseRootPath2).filter(Boolean).sort((a, b) => b.length - a.length);
  for (const root of roots) {
    if (candidate.startsWith(`${root}/`)) return candidate.slice(root.length + 1);
  }
  const lowered = candidate.toLowerCase();
  for (const root of roots) {
    const loweredRoot = root.toLowerCase();
    if (lowered.startsWith(`${loweredRoot}/`)) return candidate.slice(root.length + 1);
  }
  return null;
}
__name(fileUrlToThemeRelativePath, "fileUrlToThemeRelativePath");
function encodeAssetPath(relativePath) {
  return relativePath.replace(/\s/g, (char) => encodeURIComponent(char));
}
__name(encodeAssetPath, "encodeAssetPath");
function joinAssetUrl(baseUrl, relativePath, tail = "") {
  const { path: basePath, tail: baseTail } = splitTail(baseUrl.trim());
  const prefix = basePath.replace(/\/+$/, "");
  return `${prefix}/${encodeAssetPath(relativePath)}${tail || baseTail}`;
}
__name(joinAssetUrl, "joinAssetUrl");
function parseSrcset(value) {
  const candidates = [];
  let index = 0;
  const length = value.length;
  const isSpace = /* @__PURE__ */ __name((char) => /\s/.test(char), "isSpace");
  while (index < length) {
    while (index < length && (isSpace(value[index]) || value[index] === ",")) index++;
    if (index >= length) break;
    const start = index;
    while (index < length && !isSpace(value[index])) index++;
    let url = value.slice(start, index);
    let descriptor = "";
    if (url.endsWith(",")) {
      url = url.replace(/,+$/, "");
    } else {
      const descriptorStart = index;
      while (index < length && value[index] !== ",") index++;
      descriptor = value.slice(descriptorStart, index).trim();
      if (index < length) index++;
    }
    if (url) candidates.push({ url, descriptor });
  }
  return candidates;
}
__name(parseSrcset, "parseSrcset");
var ENCODED_QUOTES = ["&quot;", "&#34;", "&apos;", "&#39;"];
function peelEncodedQuotes(value) {
  for (const quote of ENCODED_QUOTES) {
    if (value.length > quote.length * 2 - 1 && value.startsWith(quote) && value.endsWith(quote)) {
      return { inner: value.slice(quote.length, value.length - quote.length), open: quote, close: quote };
    }
  }
  return { inner: value, open: "", close: "" };
}
__name(peelEncodedQuotes, "peelEncodedQuotes");
var CSS_URL_RE = /url\(\s*(?:"([^"]*)"|'([^']*)'|([^()'"\s]*))\s*\)/gi;
var HTML_BLOCK_RE = /<(script|style)\b([^>]*)>([\s\S]*?)(<\/\1\s*>)/gi;
var HTML_TAG_RE = /<([a-zA-Z][a-zA-Z0-9:-]*)((?:"[^"]*"|'[^']*'|[^"'>])*)>/g;
var HTML_ATTR_RE = /([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/g;
var ASSET_EXTENSION_RE = /\.(?:png|jpe?g|gif|svg|webp|avif|ico|bmp|tiff?|woff2?|ttf|otf|eot|mp4|webm|ogg|ogv|mov|m4v|mp3|wav|pdf)$/i;
function looksLikeAssetReference(value) {
  const trimmed = value.trim();
  if (trimmed === "") return false;
  const { path: path5 } = splitTail(trimmed);
  if (/\s/.test(path5)) return false;
  if (!path5.includes("/")) return false;
  return ASSET_EXTENSION_RE.test(path5);
}
__name(looksLikeAssetReference, "looksLikeAssetReference");
function linkRelTokens(attributeText) {
  HTML_ATTR_RE.lastIndex = 0;
  let match;
  while ((match = HTML_ATTR_RE.exec(attributeText)) !== null) {
    if (match[1].toLowerCase() !== "rel") continue;
    const value = match[2] ?? match[3] ?? match[4] ?? "";
    return value.toLowerCase().split(/\s+/).filter(Boolean);
  }
  return [];
}
__name(linkRelTokens, "linkRelTokens");
function shouldRewriteHref(tagName, relTokens) {
  const tag = tagName.toLowerCase();
  if (HREF_ASSET_ELEMENTS.has(tag)) return true;
  if (tag === "link") return relTokens().some((token) => ASSET_LINK_RELS.has(token));
  return false;
}
__name(shouldRewriteHref, "shouldRewriteHref");
function newAssetTarget(base) {
  return {
    ...base ? { base } : {},
    references: [],
    seenReferences: /* @__PURE__ */ new Set(),
    unresolved: [],
    seenUnresolved: /* @__PURE__ */ new Set()
  };
}
__name(newAssetTarget, "newAssetTarget");
function trimmedBaseUrl(value) {
  return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
__name(trimmedBaseUrl, "trimmedBaseUrl");
function createAssetUrlRewriter(context = {}) {
  const trimmedBase = trimmedBaseUrl(context.baseUrl);
  const invalidBaseUrl = trimmedBase && UNSAFE_BASE_CHARS_RE.test(trimmedBase) ? trimmedBase : void 0;
  const baseUrl = invalidBaseUrl ? void 0 : trimmedBase;
  const themeRoots = context.themeRoots ?? [];
  const primary = newAssetTarget(baseUrl);
  const nonce = sealNonce();
  const sealOpen = `<!--themespot-asset-root:${nonce}-->`;
  const sealClose = `<!--/themespot-asset-root:${nonce}-->`;
  function copySealedRegions(source, rewrite) {
    let out = "";
    let cursor = 0;
    for (; ; ) {
      const open = source.indexOf(sealOpen, cursor);
      if (open < 0) break;
      const close = source.indexOf(sealClose, open + sealOpen.length);
      if (close < 0) break;
      out += rewrite(source.slice(cursor, open)) + source.slice(open + sealOpen.length, close);
      cursor = close + sealClose.length;
    }
    out += rewrite(source.slice(cursor));
    return out.split(sealOpen).join("").split(sealClose).join("");
  }
  __name(copySealedRegions, "copySealedRegions");
  const roots = (context.roots ?? []).filter((root) => root && typeof root.dir === "string" && normaliseRootPath2(root.dir) !== "").map((root) => {
    const own = trimmedBaseUrl(root.baseUrl);
    const ownInvalid = own && UNSAFE_BASE_CHARS_RE.test(own) ? own : void 0;
    const ownValid = ownInvalid ? void 0 : own;
    const base = ownValid ?? baseUrl;
    return {
      ...newAssetTarget(base),
      label: typeof root.label === "string" && root.label.trim() ? root.label.trim() : root.dir,
      dir: normaliseRootPath2(root.dir),
      fallback: ownValid === void 0 && base !== void 0,
      ...ownInvalid ? { invalidBaseUrl: ownInvalid } : {}
    };
  });
  const activeRoots = roots.filter((root) => root.base !== void 0);
  function recordReference(target, reference) {
    if (target.seenReferences.has(reference)) return;
    target.seenReferences.add(reference);
    target.references.push(reference);
  }
  __name(recordReference, "recordReference");
  function recordUnresolved(target, reference, reason, origin) {
    const key = `${origin}:${reference}`;
    if (target.seenUnresolved.has(key)) return;
    target.seenUnresolved.add(key);
    target.unresolved.push({ reference, reason, origin });
  }
  __name(recordUnresolved, "recordUnresolved");
  function routeFileUrl(rawPath, scope) {
    if (activeRoots.length === 0) {
      const fromFileUrl = fileUrlToThemeRelativePath(rawPath, themeRoots);
      return { target: scope, resolved: fromFileUrl === null ? { reason: "outside-theme-root" } : { path: fromFileUrl } };
    }
    const candidates = [
      ...activeRoots.map((root) => ({ dir: root.dir, target: root })),
      ...themeRoots.map(normaliseRootPath2).filter(Boolean).map((dir) => ({ dir, target: primary }))
    ].sort((a, b) => b.dir.length - a.dir.length);
    for (const candidate of candidates) {
      const relative = fileUrlToThemeRelativePath(rawPath, [candidate.dir]);
      if (relative !== null) return { target: candidate.target, resolved: { path: relative } };
    }
    return { target: scope, resolved: { reason: "outside-theme-root" } };
  }
  __name(routeFileUrl, "routeFileUrl");
  function resolve(raw, origin, scope) {
    const reference = raw.trim();
    if (isPreservedAssetUrl(reference)) return null;
    const { path: rawPath, tail } = splitTail(reference);
    let target = scope;
    let resolved;
    if (FILE_SCHEME_RE.test(rawPath)) {
      const routed = routeFileUrl(rawPath, scope);
      target = routed.target;
      resolved = routed.resolved;
    } else {
      resolved = normaliseReference(rawPath);
    }
    recordReference(target, reference);
    if (!target.base) return null;
    if (!("path" in resolved)) {
      recordUnresolved(target, reference, resolved.reason, origin);
      return null;
    }
    return joinAssetUrl(target.base, resolved.path, tail);
  }
  __name(resolve, "resolve");
  function passesFor(scope) {
    function rewriteCssSource(source, origin = "css") {
      if (!source) return source;
      let changed = false;
      const rewritten = source.replace(
        CSS_URL_RE,
        (match, doubleQuoted, singleQuoted, bare) => {
          const quote = doubleQuoted !== void 0 ? '"' : singleQuoted !== void 0 ? "'" : "";
          const rawValue = doubleQuoted ?? singleQuoted ?? bare ?? "";
          const { inner, open, close } = quote ? { inner: rawValue, open: "", close: "" } : peelEncodedQuotes(rawValue);
          const resolved = resolve(inner, origin, scope);
          if (resolved === null) return match;
          changed = true;
          return `url(${quote}${open}${resolved}${close}${quote})`;
        }
      );
      return changed ? rewritten : source;
    }
    __name(rewriteCssSource, "rewriteCssSource");
    function rewriteAttributes(tagName, attributeText) {
      if (!attributeText) return attributeText;
      let changed = false;
      const rewritten = attributeText.replace(
        HTML_ATTR_RE,
        (match, name, doubleQuoted, singleQuoted, bare) => {
          const lowered = name.toLowerCase();
          const rawValue = doubleQuoted ?? singleQuoted ?? bare ?? "";
          const quote = doubleQuoted !== void 0 ? '"' : singleQuoted !== void 0 ? "'" : "";
          let nextValue = null;
          if (HREF_ATTRIBUTES.has(lowered)) {
            if (!shouldRewriteHref(tagName, () => linkRelTokens(attributeText))) return match;
            nextValue = resolve(rawValue, "markup", scope);
          } else if (SINGLE_URL_ATTRIBUTES.has(lowered)) {
            nextValue = resolve(rawValue, "markup", scope);
          } else if (SRCSET_ATTRIBUTES.has(lowered)) {
            const candidates = parseSrcset(rawValue);
            if (candidates.length === 0) return match;
            let candidateChanged = false;
            const rebuilt = candidates.map(({ url, descriptor }) => {
              const resolved = resolve(url, "markup", scope);
              if (resolved !== null) candidateChanged = true;
              const finalUrl = resolved ?? url;
              return descriptor ? `${finalUrl} ${descriptor}` : finalUrl;
            }).join(", ");
            nextValue = candidateChanged ? rebuilt : null;
          } else if (lowered === "style") {
            const rewrittenStyle = rewriteCssSource(rawValue, "markup");
            nextValue = rewrittenStyle === rawValue ? null : rewrittenStyle;
          } else if (lowered === MODULE_PROPS_ATTRIBUTE) {
            nextValue = rewriteModulePropsAttribute(rawValue);
          }
          if (nextValue === null) return match;
          changed = true;
          return `${name}=${quote}${nextValue}${quote}`;
        }
      );
      return changed ? rewritten : attributeText;
    }
    __name(rewriteAttributes, "rewriteAttributes");
    function rewriteModulePropsAttribute(encoded) {
      if (!scope.base || encoded === "") return null;
      let parsed;
      try {
        parsed = JSON.parse(decodeBase64Utf8(encoded));
      } catch {
        return null;
      }
      const rewritten = rewritePropsUnderBase(parsed);
      if (rewritten === parsed) return null;
      return encodeBase64Utf8(JSON.stringify(rewritten));
    }
    __name(rewriteModulePropsAttribute, "rewriteModulePropsAttribute");
    function rewriteTags(source) {
      if (!source) return source;
      let changed = false;
      const rewritten = source.replace(
        HTML_TAG_RE,
        (match, tagName, attributeText) => {
          const nextAttributes = rewriteAttributes(tagName, attributeText);
          if (nextAttributes === attributeText) return match;
          changed = true;
          return `<${tagName}${nextAttributes}>`;
        }
      );
      return changed ? rewritten : source;
    }
    __name(rewriteTags, "rewriteTags");
    function rewritePropString(value) {
      if (!looksLikeAssetReference(value)) return value;
      return resolve(value, "props", scope) ?? value;
    }
    __name(rewritePropString, "rewritePropString");
    function rewritePropsUnderBase(value) {
      if (typeof value === "string") return rewritePropString(value);
      if (Array.isArray(value)) {
        let changed = false;
        const out = value.map((entry) => {
          const next = rewritePropsUnderBase(entry);
          if (next !== entry) changed = true;
          return next;
        });
        return changed ? out : value;
      }
      if (value && typeof value === "object") {
        const candidate = value;
        if (candidate.constructor !== Object || typeof candidate.toJSON === "function") return value;
        let changed = false;
        const out = {};
        for (const [key, entry] of Object.entries(value)) {
          const next = rewritePropsUnderBase(entry);
          if (next !== entry) changed = true;
          out[key] = next;
        }
        return changed ? out : value;
      }
      return value;
    }
    __name(rewritePropsUnderBase, "rewritePropsUnderBase");
    function rewriteProps(value) {
      if (!scope.base) return value;
      return rewritePropsUnderBase(value);
    }
    __name(rewriteProps, "rewriteProps");
    function rewriteHtmlSource(source) {
      if (!source) return source;
      const hasSeals = source.includes(sealOpen) || source.includes(sealClose);
      if (scope !== primary) {
        const rewritten = hasSeals ? copySealedRegions(source, rewriteUnsealedHtml) : rewriteUnsealedHtml(source);
        return `${sealOpen}${rewritten}${sealClose}`;
      }
      return hasSeals ? copySealedRegions(source, rewriteUnsealedHtml) : rewriteUnsealedHtml(source);
    }
    __name(rewriteHtmlSource, "rewriteHtmlSource");
    function rewriteUnsealedHtml(source) {
      if (!source) return source;
      let changed = false;
      const parts = [];
      let cursor = 0;
      HTML_BLOCK_RE.lastIndex = 0;
      let match;
      while ((match = HTML_BLOCK_RE.exec(source)) !== null) {
        const [full, name, attributeText, body, closeTag] = match;
        const before = source.slice(cursor, match.index);
        const rewrittenBefore = rewriteTags(before);
        if (rewrittenBefore !== before) changed = true;
        parts.push(rewrittenBefore);
        const nextAttributes = rewriteAttributes(name, attributeText);
        const nextBody = name.toLowerCase() === "style" ? rewriteCssSource(body, "css") : body;
        if (nextAttributes !== attributeText || nextBody !== body) changed = true;
        parts.push(`<${name}${nextAttributes}>${nextBody}${closeTag}`);
        cursor = match.index + full.length;
      }
      const rest = source.slice(cursor);
      const rewrittenRest = rewriteTags(rest);
      if (rewrittenRest !== rest) changed = true;
      parts.push(rewrittenRest);
      return changed ? parts.join("") : source;
    }
    __name(rewriteUnsealedHtml, "rewriteUnsealedHtml");
    return {
      html: rewriteHtmlSource,
      css: /* @__PURE__ */ __name((source) => rewriteCssSource(source, "css"), "css"),
      props: rewriteProps
    };
  }
  __name(passesFor, "passesFor");
  function report() {
    return {
      ...baseUrl ? { baseUrl } : {},
      ...invalidBaseUrl ? { invalidBaseUrl } : {},
      references: [...primary.references],
      unresolved: [...primary.unresolved],
      ...roots.length > 0 ? {
        roots: roots.map((root) => ({
          label: root.label,
          dir: root.dir,
          ...root.base ? { baseUrl: root.base } : {},
          fallback: root.fallback,
          ...root.invalidBaseUrl ? { invalidBaseUrl: root.invalidBaseUrl } : {},
          references: [...root.references],
          unresolved: [...root.unresolved]
        }))
      } : {}
    };
  }
  __name(report, "report");
  const views = /* @__PURE__ */ new Map();
  function forRoot(dir) {
    const wanted = normaliseRootPath2(String(dir ?? ""));
    if (!wanted) return null;
    const root = activeRoots.find((entry) => entry.dir === wanted) ?? activeRoots.find((entry) => entry.dir.toLowerCase() === wanted.toLowerCase());
    if (!root) return null;
    let view = views.get(root);
    if (!view) {
      view = { ...passesFor(root), forRoot, report };
      views.set(root, view);
    }
    return view;
  }
  __name(forRoot, "forRoot");
  return { ...passesFor(primary), forRoot, report };
}
__name(createAssetUrlRewriter, "createAssetUrlRewriter");

// src/content-fixtures.ts
import path2 from "path";
var contentFixtureContract = 1;
var CONTENT_FIXTURE_KINDS = {
  "blog-post": ["full", "minimal", "editor"],
  "blog-listing": ["index", "topic", "page-2", "empty"],
  "hubdb-dynamic-page": ["row", "listing"]
};
var KIND_ORDER = ["blog-post", "blog-listing", "hubdb-dynamic-page"];
var CONTENT_FIXTURE_DIRECTORY = "content";
var STATE_NAME = /^[a-z0-9][a-z0-9-]{0,63}$/;
function isContentFixtureKind(value) {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(CONTENT_FIXTURE_KINDS, value);
}
__name(isContentFixtureKind, "isContentFixtureKind");
function defaultContentStateId(kind) {
  return `${kind}/${CONTENT_FIXTURE_KINDS[kind][0]}`;
}
__name(defaultContentStateId, "defaultContentStateId");
function parseContentStateId(id) {
  const slash = id.indexOf("/");
  if (slash === -1) return null;
  const kind = id.slice(0, slash);
  const name = id.slice(slash + 1);
  if (!isContentFixtureKind(kind) || !STATE_NAME.test(name)) return null;
  return { kind, name };
}
__name(parseContentStateId, "parseContentStateId");
function contentFixtureFile(kind, name) {
  return `${CONTENT_FIXTURE_DIRECTORY}/${kind}/${name}.json`;
}
__name(contentFixtureFile, "contentFixtureFile");
function themeFixturePath(themeRoot, kind, name) {
  return path2.join(themeRoot, "fixtures", CONTENT_FIXTURE_DIRECTORY, kind, `${name}.json`);
}
__name(themeFixturePath, "themeFixturePath");
function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
__name(isPlainObject, "isPlainObject");
function shapeProblem(document, kind) {
  return contentStateShapeProblem(document, kind);
}
__name(shapeProblem, "shapeProblem");
function toState(document, kind, name, source) {
  const state = {
    id: `${kind}/${name}`,
    kind,
    name,
    label: String(document.label).trim(),
    source,
    required: CONTENT_FIXTURE_KINDS[kind].includes(name),
    content: document.content,
    request: isPlainObject(document.request) ? document.request : {},
    is_in_editor: document.is_in_editor === true
  };
  if (isPlainObject(document.blog)) state.blog = document.blog;
  if (isPlainObject(document.group)) state.group = document.group;
  if (isPlainObject(document.tag)) state.tag = document.tag;
  if (Array.isArray(document.contents)) state.contents = document.contents;
  for (const key of ["current_page_num", "next_page_num", "last_page_num"]) {
    if (typeof document[key] === "number") state[key] = document[key];
  }
  if (isPlainObject(document.dynamicPage)) state.dynamicPage = document.dynamicPage;
  return state;
}
__name(toState, "toState");
function embeddedDocument(kind, name) {
  const embedded = EMBEDDED_FIXTURES[contentFixtureFile(kind, name)];
  return isPlainObject(embedded) ? structuredClone(embedded) : null;
}
__name(embeddedDocument, "embeddedDocument");
function readThemeDocument(themeRoot, kind, name) {
  if (!themeRoot) return { status: "missing" };
  const file = themeFixturePath(themeRoot, kind, name);
  let text;
  try {
    if (!hostFs.existsSync(file)) return { status: "missing" };
    text = hostFs.readFileSync(file, "utf-8");
  } catch {
    return { status: "missing" };
  }
  let document;
  try {
    document = JSON.parse(text);
  } catch (err) {
    return { status: "invalid", reason: `it is not valid JSON (${err instanceof Error ? err.message : String(err)})` };
  }
  const problem = shapeProblem(document, kind);
  if (problem) return { status: "invalid", reason: problem };
  return { status: "ok", document };
}
__name(readThemeDocument, "readThemeDocument");
function invalidFixtureDiagnostic(kind, name, reason, fellBack) {
  const file = `fixtures/${contentFixtureFile(kind, name)}`;
  return diagnostic(
    DIAGNOSTIC_CODES.CONTENT_FIXTURE_INVALID,
    `The theme's content fixture ${file} could not be used: ${reason}. ` + (fellBack ? "The preview shows the renderer's own version of this state instead." : "This state is not one the renderer ships, so there is nothing to show in its place."),
    { file, kind, state: name, reason, fellBack }
  );
}
__name(invalidFixtureDiagnostic, "invalidFixtureDiagnostic");
function loadContentState(themeRoot, id) {
  const parsed = parseContentStateId(id);
  if (!parsed) return { state: null, diagnostics: [] };
  const { kind, name } = parsed;
  const diagnostics = [];
  const theme = readThemeDocument(themeRoot, kind, name);
  if (theme.status === "ok") return { state: toState(theme.document, kind, name, "theme"), diagnostics };
  const embedded = embeddedDocument(kind, name);
  if (theme.status === "invalid") diagnostics.push(invalidFixtureDiagnostic(kind, name, theme.reason, embedded !== null));
  if (!embedded) return { state: null, diagnostics };
  return { state: toState(embedded, kind, name, "embedded"), diagnostics };
}
__name(loadContentState, "loadContentState");
function themeExtraStateNames(themeRoot, kind) {
  if (!themeRoot) return [];
  const dir = path2.join(themeRoot, "fixtures", CONTENT_FIXTURE_DIRECTORY, kind);
  let entries;
  try {
    if (!hostFs.existsSync(dir) || !hostFs.statSync(dir).isDirectory()) return [];
    entries = hostFs.readdirSync(dir);
  } catch {
    return [];
  }
  const required = new Set(CONTENT_FIXTURE_KINDS[kind]);
  return entries.filter((entry) => entry.endsWith(".json")).map((entry) => entry.slice(0, -".json".length)).filter((name) => STATE_NAME.test(name) && !required.has(name)).sort();
}
__name(themeExtraStateNames, "themeExtraStateNames");
function listContentStates(themeRoot) {
  const kinds = KIND_ORDER.map((kind) => {
    const names = [...CONTENT_FIXTURE_KINDS[kind], ...themeExtraStateNames(themeRoot, kind)];
    const states = [];
    for (const name of names) {
      const { state } = loadContentState(themeRoot, `${kind}/${name}`);
      if (!state) continue;
      states.push({
        id: state.id,
        kind,
        name,
        label: state.label,
        source: state.source,
        required: state.required
      });
    }
    return { kind, defaultState: defaultContentStateId(kind), states };
  });
  return { contract: contentFixtureContract, kinds };
}
__name(listContentStates, "listContentStates");
function unknownContentStateError(themeRoot, requested) {
  const available = listContentStates(themeRoot).kinds.flatMap(
    (kind) => kind.states.map((state) => ({ id: state.id, label: state.label, source: state.source }))
  );
  return new RendererError(
    DIAGNOSTIC_CODES.CONTENT_STATE_UNKNOWN,
    `There is no content state ${JSON.stringify(requested)}. A state is written <kind>/<name>; this theme has: ${available.map((state) => `${state.id} (${state.label})`).join(", ")}.`,
    { requested, available }
  );
}
__name(unknownContentStateError, "unknownContentStateError");
function resolveContentState(themeRoot, requested, fallbackKind) {
  if (typeof requested === "string" && requested !== "") {
    const loaded = loadContentState(themeRoot, requested);
    if (!loaded.state) throw unknownContentStateError(themeRoot, requested);
    return loaded;
  }
  if (!fallbackKind) return { state: null, diagnostics: [] };
  return loadContentState(themeRoot, defaultContentStateId(fallbackKind));
}
__name(resolveContentState, "resolveContentState");
function contentKindForTemplateSource(source) {
  const annotation = /^\s*<!--([\s\S]*?)-->/.exec(source)?.[1] ?? "";
  if (/^\s*dynamicPageDataSourceType\s*:\s*\S+/m.test(annotation)) return "hubdb-dynamic-page";
  const templateType = /templateType:\s*(\w+)/.exec(source)?.[1] ?? "";
  if (templateType === "blog_post") return "blog-post";
  if (templateType === "blog_listing") return "blog-listing";
  return null;
}
__name(contentKindForTemplateSource, "contentKindForTemplateSource");
function contentKindForModuleContentTypes(contentTypes) {
  const types = Array.isArray(contentTypes) ? contentTypes.map((type) => String(type).toUpperCase()) : [];
  if (types.includes("BLOG_POST")) return "blog-post";
  if (types.includes("BLOG_LISTING")) return "blog-listing";
  return "blog-post";
}
__name(contentKindForModuleContentTypes, "contentKindForModuleContentTypes");

// src/specimen.ts
import path3 from "path";
var SPECIMEN_TEXT_FILES = [
  "components/theme/text.tsx",
  "components/theme/text.ts",
  "components/theme/text.jsx",
  "components/theme/text.js"
];
var SPECIMEN_PROSE_FILES = [
  "components/theme/prose.ts",
  "components/theme/prose.tsx",
  "components/theme/prose.js",
  "components/theme/prose.jsx"
];
var PROSE_TONE_TYPE = "ProseTone";
var ROLE_TYPE_SUFFIX = /Role$/;
function declaredSurfaces(css) {
  const found = [];
  const seen = /* @__PURE__ */ new Set();
  const pattern = /data-themespot-surface\s*[~|^$*]?=\s*["']?([A-Za-z0-9_-]+)/g;
  let match;
  while ((match = pattern.exec(css)) !== null) {
    const name = match[1];
    if (name === "inherit" || seen.has(name)) continue;
    seen.add(name);
    found.push(name);
  }
  const canvas = found.indexOf("canvas");
  if (canvas > 0) found.unshift(...found.splice(canvas, 1));
  return found;
}
__name(declaredSurfaces, "declaredSurfaces");
function stripComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:'"])\/\/[^\n]*/g, "$1");
}
__name(stripComments, "stripComments");
function readStringUnion(code, start) {
  let i = start;
  const skipSpace = /* @__PURE__ */ __name((from) => {
    let at = from;
    while (at < code.length && /\s/.test(code[at])) at++;
    return at;
  }, "skipSpace");
  i = skipSpace(i);
  if (code[i] === "|") i++;
  const members = [];
  for (; ; ) {
    i = skipSpace(i);
    const quote = code[i];
    if (quote !== "'" && quote !== '"') return null;
    const close = code.indexOf(quote, i + 1);
    if (close < 0 || code.slice(i + 1, close).includes("\n")) return null;
    members.push(code.slice(i + 1, close));
    i = close + 1;
    const next = skipSpace(i);
    if (code[next] === "|") {
      i = next + 1;
      continue;
    }
    const ended = next >= code.length || code[next] === ";" || code.slice(i, next).includes("\n");
    return ended ? members : null;
  }
}
__name(readStringUnion, "readStringUnion");
function stringUnionTypes(source) {
  const code = stripComments(source);
  const found = [];
  const pattern = /(^|[;\n}])\s*(export\s+)?(?:declare\s+)?type\s+([A-Za-z_$][\w$]*)\s*=/g;
  let match;
  while ((match = pattern.exec(code)) !== null) {
    const members = readStringUnion(code, match.index + match[0].length);
    if (members) found.push({ name: match[3], members, exported: Boolean(match[2]) });
  }
  return found;
}
__name(stringUnionTypes, "stringUnionTypes");
function roleUnion(source) {
  return stringUnionTypes(source).find((type) => type.exported && ROLE_TYPE_SUFFIX.test(type.name)) ?? null;
}
__name(roleUnion, "roleUnion");
function reExportSources(source, name) {
  const code = stripComments(source);
  const named = /export\s+(?:type\s+)?\{([^}]*)\}\s*from\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = named.exec(code)) !== null) {
    for (const entry of match[1].split(",")) {
      const parts = entry.trim().replace(/^type\s+/, "").split(/\s+as\s+/);
      const imported = parts[0]?.trim();
      const exported = (parts[1] ?? parts[0])?.trim();
      if (exported === name && imported) return [{ specifier: match[2], importedName: imported }];
    }
  }
  const stars = [];
  const star = /export\s+(?:type\s+)?\*\s+from\s*['"]([^'"]+)['"]/g;
  while ((match = star.exec(code)) !== null) stars.push({ specifier: match[1], importedName: name });
  return stars;
}
__name(reExportSources, "reExportSources");
function findPackageDir(fromDir, name) {
  let dir = path3.resolve(fromDir);
  for (; ; ) {
    if (hostFs.existsSync(path3.join(dir, "node_modules", name, "package.json"))) return path3.join(dir, "node_modules", name);
    const parent = path3.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}
__name(findPackageDir, "findPackageDir");
function typesTarget(target) {
  if (typeof target === "string") {
    if (/\.d\.m?ts$/.test(target)) return target;
    if (/\.m?js$/.test(target)) return target.replace(/\.(m?)js$/, ".d.$1ts");
    return null;
  }
  if (!target || typeof target !== "object" || Array.isArray(target)) return null;
  const conditions = target;
  if (typeof conditions.types === "string") return conditions.types;
  for (const condition of ["import", "default", "module", "require"]) {
    if (condition in conditions) {
      const found = typesTarget(conditions[condition]);
      if (found) return found;
    }
  }
  return null;
}
__name(typesTarget, "typesTarget");
var SOURCE_CANDIDATE_SUFFIXES = [".ts", ".tsx", ".d.ts", ".mts", ".d.mts", ".js", ".jsx", ".mjs"];
function resolveTypeSource(specifier, fromFile) {
  if (specifier.startsWith(".")) {
    const base = path3.resolve(path3.dirname(fromFile), specifier);
    const stem = base.replace(/\.(m?[jt]sx?)$/, "");
    const candidates = [
      ...SOURCE_CANDIDATE_SUFFIXES.map((suffix) => `${stem}${suffix}`),
      base,
      ...SOURCE_CANDIDATE_SUFFIXES.map((suffix) => path3.join(base, `index${suffix}`))
    ];
    return candidates.find((candidate) => hostFs.existsSync(candidate) && hostFs.statSync(candidate).isFile()) ?? null;
  }
  const segments = specifier.split("/");
  const packageName = specifier.startsWith("@") ? segments.slice(0, 2).join("/") : segments[0];
  const subpath = specifier.slice(packageName.length);
  const packageDir = findPackageDir(path3.dirname(fromFile), packageName);
  if (!packageDir) return null;
  let packageJson;
  try {
    packageJson = JSON.parse(hostFs.readFileSync(path3.join(packageDir, "package.json"), "utf-8"));
  } catch {
    return null;
  }
  const key = subpath ? `.${subpath}` : ".";
  const exportsField = packageJson?.exports;
  let declared = null;
  if (exportsField && typeof exportsField === "object" && !Array.isArray(exportsField)) {
    declared = typesTarget(exportsField[key]);
  } else if (!subpath) {
    declared = typeof packageJson?.types === "string" ? packageJson.types : typeof packageJson?.typings === "string" ? packageJson.typings : null;
  }
  if (!declared) return null;
  const file = path3.join(packageDir, declared);
  return hostFs.existsSync(file) ? file : null;
}
__name(resolveTypeSource, "resolveTypeSource");
function resolveStringUnion(file, typeName, depth = 0, seen = /* @__PURE__ */ new Set()) {
  if (depth > 6 || seen.has(`${file}#${typeName}`)) return null;
  seen.add(`${file}#${typeName}`);
  let source;
  try {
    source = hostFs.readFileSync(file, "utf-8");
  } catch {
    return null;
  }
  const declared = stringUnionTypes(source).find((type) => type.name === typeName);
  if (declared) return { ...declared, file };
  for (const reExport of reExportSources(source, typeName)) {
    const next = resolveTypeSource(reExport.specifier, file);
    const found = next ? resolveStringUnion(next, reExport.importedName, depth + 1, seen) : null;
    if (found) return found;
  }
  return null;
}
__name(resolveStringUnion, "resolveStringUnion");
function escapeSpecimenText(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
__name(escapeSpecimenText, "escapeSpecimenText");
var PROSE_SAMPLE_HTML = [
  "<h2>A heading two in rich text</h2>",
  '<p>Body copy an editor wrote, with <a href="#specimen">a link</a>, <strong>strong words</strong> and <em>emphasis</em>. A second sentence gives the paragraph a line to wrap.</p>',
  "<h3>A heading three</h3>",
  "<ul><li>A list item</li><li>Another list item</li></ul>",
  "<blockquote><p>A quotation set off from the copy around it.</p></blockquote>"
].join("");
var ROLE_SAMPLE_TEXT = "Sphinx of black quartz, judge my vow";
function roleBlock(roles) {
  if (roles.samples.length === 0) return "";
  const rows = roles.samples.map(
    ({ role, html }) => `<div class="themespot-specimen__row"><div class="themespot-specimen__meta"><code>${escapeSpecimenText(role)}</code><span class="themespot-specimen__metrics" data-themespot-specimen-metrics></span></div><div class="themespot-specimen__sample" data-themespot-specimen-sample>${html}</div></div>`
  ).join("");
  return `<div class="themespot-specimen__roles">${rows}</div>`;
}
__name(roleBlock, "roleBlock");
function toneBlock(tones) {
  if (tones.classes.length === 0) return "";
  const blocks = tones.classes.map(
    ({ tone, className }) => `<div class="themespot-specimen__tone"><div class="themespot-specimen__meta"><code>prose: ${escapeSpecimenText(tone)}</code></div><div class="${escapeSpecimenText(className)}" data-themespot-specimen-prose>${PROSE_SAMPLE_HTML}</div><dl class="themespot-specimen__prose-metrics" data-themespot-specimen-prose-metrics></dl></div>`
  ).join("");
  return `<div class="themespot-specimen__tones">${blocks}</div>`;
}
__name(toneBlock, "toneBlock");
function sourceLine(label, file, typeName, count, note) {
  if (!file) return `<li>${label}: <em>no file</em>${note ? ` \u2014 ${escapeSpecimenText(note)}` : ""}</li>`;
  const union = typeName ? ` (<code>${escapeSpecimenText(typeName)}</code>, ${count})` : "";
  return `<li>${label}: <code>${escapeSpecimenText(file)}</code>${union}${note ? ` \u2014 ${escapeSpecimenText(note)}` : ""}</li>`;
}
__name(sourceLine, "sourceLine");
function buildSpecimenBody(input) {
  const { roles, tones, surfaces } = input;
  const intro = `<header class="themespot-specimen__intro"><h1 class="themespot-specimen__title">Type specimen</h1><ul class="themespot-specimen__sources">` + sourceLine("Text roles", roles.file, roles.typeName, roles.samples.length, roles.note) + sourceLine("Prose tones", tones.file, tones.typeName, tones.classes.length, tones.note) + `<li>Surfaces: ${surfaces.length > 0 ? surfaces.map((surface) => `<code>${escapeSpecimenText(surface)}</code>`).join(" ") : "<em>none declared \u2014 shown on the page background</em>"}</li></ul><p class="themespot-specimen__legend">Beside each sample: font size / line height \xB7 colour, measured in this browser after fonts load.</p></header>`;
  const bands = (surfaces.length > 0 ? surfaces : [null]).map((surface) => {
    const attr = surface ? ` data-themespot-surface="${escapeSpecimenText(surface)}"` : "";
    const label = surface ? `Surface: ${escapeSpecimenText(surface)}` : "Page background";
    return `<section class="themespot-specimen__surface"${attr}><h2 class="themespot-specimen__label">${label}</h2>` + roleBlock(roles) + toneBlock(tones) + `</section>`;
  }).join("");
  return `<main class="themespot-specimen" data-themespot-specimen>${intro}${bands}</main>
${SPECIMEN_MEASURE_SCRIPT}`;
}
__name(buildSpecimenBody, "buildSpecimenBody");
function specimenStyles(tokenPrefix = "--themespot--") {
  return `<style id="themespot-specimen-styles">
  .themespot-specimen { margin: 0; }
  .themespot-specimen__intro { font: 13px/1.5 system-ui, -apple-system, "Segoe UI", sans-serif; padding: 24px; }
  .themespot-specimen__title { font: 600 18px/1.3 system-ui, -apple-system, "Segoe UI", sans-serif; margin: 0 0 8px; }
  .themespot-specimen__sources { margin: 0 0 8px; padding-left: 18px; }
  .themespot-specimen__legend { margin: 0; opacity: 0.7; }
  .themespot-specimen__surface {
    background-color: var(--color-background, var(${tokenPrefix}surface__backgroundColor, #fff));
    color: var(--color-foreground, var(${tokenPrefix}surface__textColor, inherit));
    padding: 24px;
    border-top: 1px dashed rgba(127,127,127,0.35);
  }
  .themespot-specimen__label, .themespot-specimen__meta, .themespot-specimen__prose-metrics {
    font: 11px/1.5 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    letter-spacing: 0; text-transform: none;
  }
  .themespot-specimen__label { font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.6; margin: 0 0 16px; }
  .themespot-specimen__row { display: grid; grid-template-columns: 220px 1fr; gap: 16px; align-items: baseline; padding: 8px 0; }
  .themespot-specimen__meta { display: flex; flex-direction: column; gap: 2px; opacity: 0.75; }
  .themespot-specimen__meta code { font: inherit; }
  .themespot-specimen__sample > * { margin: 0; }
  .themespot-specimen__tones { display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 32px; margin-top: 24px; }
  .themespot-specimen__prose-metrics { display: grid; grid-template-columns: max-content 1fr; gap: 0 12px; margin: 12px 0 0; opacity: 0.75; }
  .themespot-specimen__prose-metrics dt, .themespot-specimen__prose-metrics dd { margin: 0; }
</style>`;
}
__name(specimenStyles, "specimenStyles");
var SPECIMEN_MEASURE_SCRIPT = `<script>
(function () {
  function px(value) {
    var n = parseFloat(value);
    if (!isFinite(n)) return value;
    return String(Math.round(n * 100) / 100) + 'px';
  }
  // Computed colours arrive in whatever space the theme wrote them in
  // (oklab from a color-mix, rgb from a hex), so each is painted onto one
  // canvas pixel and read back as sRGB: every number on the page is a hex.
  var probe = document.createElement('canvas');
  probe.width = 1;
  probe.height = 1;
  var ctx = probe.getContext('2d', { willReadFrequently: true });
  function hex(channel) { return ('0' + channel.toString(16)).slice(-2); }
  function colour(value) {
    if (!ctx) return value;
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#000';
    ctx.fillStyle = value;
    ctx.fillRect(0, 0, 1, 1);
    var d = ctx.getImageData(0, 0, 1, 1).data;
    var out = '#' + hex(d[0]) + hex(d[1]) + hex(d[2]);
    return d[3] === 255 ? out : out + ' @ ' + (Math.round((d[3] / 255) * 100) / 100);
  }
  function metrics(el) {
    var style = getComputedStyle(el);
    var lh = style.lineHeight === 'normal' ? 'normal' : px(style.lineHeight);
    return px(style.fontSize) + ' / ' + lh + ' \\u00b7 ' + colour(style.color);
  }
  function measure() {
    document.querySelectorAll('[data-themespot-specimen-sample]').forEach(function (sample) {
      var target = sample.firstElementChild || sample;
      var out = sample.parentElement && sample.parentElement.querySelector('[data-themespot-specimen-metrics]');
      if (out) out.textContent = metrics(target);
    });
    document.querySelectorAll('[data-themespot-specimen-prose]').forEach(function (prose) {
      var list = prose.parentElement && prose.parentElement.querySelector('[data-themespot-specimen-prose-metrics]');
      if (!list) return;
      list.textContent = '';
      var seen = {};
      prose.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,blockquote,a,strong').forEach(function (el) {
        var tag = el.tagName.toLowerCase();
        if (el.parentElement && el.parentElement.tagName.toLowerCase() === 'blockquote') tag = 'blockquote ' + tag;
        if (seen[tag]) return;
        seen[tag] = true;
        var dt = document.createElement('dt');
        dt.textContent = tag;
        var dd = document.createElement('dd');
        dd.textContent = metrics(el);
        list.appendChild(dt);
        list.appendChild(dd);
      });
    });
    document.documentElement.setAttribute('data-themespot-specimen', 'measured');
  }
  var ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  ready.then(measure, measure);
})();
</script>`;
function specimenUnavailableHtml(themeRoot) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><title>Specimen unavailable</title></head>
<body style="font:15px/1.55 system-ui,-apple-system,'Segoe UI',sans-serif;padding:2rem;max-width:760px;margin:0 auto">
<h1 style="font-size:1.4rem">Specimen unavailable: this theme has no <code>components/theme/text.tsx</code> or <code>components/theme/prose.ts</code></h1>
<p><code>/?specimen</code> is generated from the theme's own type grammar, read from those two files at request time:</p>
<ul>
<li><code>components/theme/text.tsx</code> \u2014 an exported string-union type whose name ends in <code>Role</code> (<code>export type TextRole = 'eyebrow' | 'h2' | 'body'</code>) names the text roles. Each is rendered through the file's exported <code>Text</code> component (<code>&lt;Text role="h2"&gt;</code>) or its <code>textClass(role)</code>.</li>
<li><code>components/theme/prose.ts</code> \u2014 its exported <code>proseClass</code>, once per member of <code>ProseTone</code>, declared there or re-exported through it from another module, such as a UI library's <code>styles</code> entry.</li>
</ul>
<p>Either file on its own is enough. Surfaces are read from the <code>data-themespot-surface</code> selectors in the theme's stylesheets.</p>
<p>Theme root: <code>${escapeSpecimenText(themeRoot)}</code></p>
<p><a href="/">Back to the index</a></p>
</body></html>`;
}
__name(specimenUnavailableHtml, "specimenUnavailableHtml");
function specimenBridgeUnavailableHtml(reason) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><title>Specimen unavailable</title></head>
<body style="font:15px/1.55 system-ui,-apple-system,'Segoe UI',sans-serif;padding:2rem;max-width:760px;margin:0 auto">
<h1 style="font-size:1.4rem">Specimen unavailable: React SSR is not running</h1>
<p>The specimen evaluates the theme's <code>components/theme/text.tsx</code> and <code>prose.ts</code> through the renderer's SSR bridge, and this renderer has none: ${escapeSpecimenText(reason)}</p>
</body></html>`;
}
__name(specimenBridgeUnavailableHtml, "specimenBridgeUnavailableHtml");

// src/page-renderer.ts
var BASE_LAYOUT_CSS_ORIGIN = "base-layout-css-scan";
function attributeToBaseLayout(entry, layout) {
  return new RendererError(
    entry.code,
    `Base layout ${layout}: ${entry.message}`,
    { ...entry.details, origin: BASE_LAYOUT_CSS_ORIGIN, originTemplate: layout }
  );
}
__name(attributeToBaseLayout, "attributeToBaseLayout");
async function createPageRenderer(options) {
  const {
    presetName: defaultPresetName = "default",
    renderModules = true,
    renderGlobalPartials = true,
    themeOverrides: instanceThemeOverrides
  } = options;
  const themeRoots = resolveThemeRoots(options);
  const { themeRoot } = themeRoots;
  const themeManifest = loadThemeManifest(themeRoots.themeRoot);
  const fieldsJson = loadMergedFieldsJson(themeRoots);
  const defaultTheme = resolveThemeSettings(fieldsJson);
  const themeAssetResolver = createThemeAssetResolver(themeRoots.themeRoot, themeRoots);
  const cssLayout = resolveThemeCssLayout(themeRoots, themeManifest);
  const cssDir = cssLayout.cssDir;
  const cssDirs = cssLayout.cssDirs;
  const presetsDir = cssDirs.find((dir) => hostFs.existsSync(path4.join(dir, "presets"))) ? path4.join(cssDirs.find((dir) => hostFs.existsSync(path4.join(dir, "presets"))), "presets") : path4.join(cssDir, "presets");
  const presets = hostFs.existsSync(presetsDir) ? hostFs.readdirSync(presetsDir).filter((f) => f.endsWith(".hubl.css") && f.startsWith("_")).map((f) => f.replace(/^_/, "").replace(/\.hubl\.css$/, "")) : [];
  const allPresets = ["default", ...presets.filter((p) => p !== "default")];
  let pipelineCoveredPaths = null;
  function isPipelineCoveredCss(filePath) {
    if (path4.basename(filePath).toLowerCase() === THEMESPOT_BUNDLE_CSS) return true;
    if (!pipelineCoveredPaths) {
      pipelineCoveredPaths = new Set(
        resolveThemeCssCoverage({ cssDir, cssDirs, cssAssets: themeManifest.cssAssets }).map((covered) => path4.resolve(covered).toLowerCase())
      );
    }
    return pipelineCoveredPaths.has(path4.resolve(filePath).toLowerCase());
  }
  __name(isPipelineCoveredCss, "isPipelineCoveredCss");
  const cssCache = /* @__PURE__ */ new Map();
  function resolveForRequest(presetName, overrides) {
    const mergedOverrides = mergeOverrides(instanceThemeOverrides, overrides);
    const theme = mergedOverrides ? resolveThemeSettings(fieldsJson, mergedOverrides) : defaultTheme;
    const cacheKey = `${presetName}::${mergedOverrides ? JSON.stringify(mergedOverrides) : ""}`;
    let rendered = cssCache.get(cacheKey);
    if (rendered === void 0) {
      rendered = renderThemeCssWithDiagnostics({
        theme,
        cssDir,
        cssDirs,
        presetName,
        cssAssets: themeManifest.cssAssets,
        baseSize: themeManifest.baseSize,
        resolveAsset: themeAssetResolver
      });
      if (cssCache.size > 64) cssCache.clear();
      cssCache.set(cacheKey, rendered);
    }
    const fontLinks = buildGoogleFontLinks(theme);
    return { theme, css: rendered.css, cssDiagnostics: rendered.diagnostics, fontLinks };
  }
  __name(resolveForRequest, "resolveForRequest");
  function resolveTemplateAsset(assetPath) {
    const fromUrl = fileUrlToPath(assetPath);
    if (fromUrl) return hostFs.existsSync(fromUrl) ? fromUrl : null;
    const stripped = assetPath.replace(/^(?:\.\.?\/)+/, "");
    let resolved = null;
    try {
      resolved = resolveInThemeCascade(themeRoots, stripped) ?? resolveSafePath(themeRoot, stripped);
    } catch {
      resolved = null;
    }
    return resolved && hostFs.existsSync(resolved) ? resolved : null;
  }
  __name(resolveTemplateAsset, "resolveTemplateAsset");
  const assetThemeRoots = [
    ...themeRoots.roots,
    themeRoots.themeRoot,
    themeRoots.childThemeRoot,
    themeRoots.parentThemeRoot,
    ...Object.values(themeRoots.projects ?? {}).flatMap((themes) => Object.values(themes))
  ].filter((root) => typeof root === "string" && root.length > 0);
  function createRequestAssetRewriter(request, page) {
    const roots = page ? pageAssetRoots() : [];
    return createAssetUrlRewriter({
      baseUrl: request?.assetBaseUrl ?? options.assetBaseUrl,
      themeRoots: assetThemeRoots,
      ...roots.length > 0 ? { roots } : {}
    });
  }
  __name(createRequestAssetRewriter, "createRequestAssetRewriter");
  function pageAssetRoots() {
    return (options.extraThemes ?? []).filter((extra) => extra && typeof extra.root === "string" && normaliseRootPath(extra.root) !== "" && extra.dir).map((extra) => ({
      dir: normaliseRootDir(extra.dir),
      label: extra.root.trim(),
      ...typeof extra.assetBaseUrl === "string" ? { baseUrl: extra.assetBaseUrl } : {}
    }));
  }
  __name(pageAssetRoots, "pageAssetRoots");
  function withRootAssets(page, assets) {
    return { ...page, assetsForRoot: /* @__PURE__ */ __name((dir) => assets.forRoot(dir), "assetsForRoot") };
  }
  __name(withRootAssets, "withRootAssets");
  function foreignStylesheet(assets) {
    const roots = pageAssetRoots();
    return (filePath, css, element) => {
      const owner = owningAssetRoot(roots, filePath);
      if (!owner) return null;
      const view = assets.forRoot(owner.dir);
      if (!view) return null;
      const relative = path4.relative(owner.dir, path4.resolve(filePath)).split(path4.sep).join("/");
      return view.html(element(rebaseInlineCssUrls(css, `/${relative}`)));
    };
  }
  __name(foreignStylesheet, "foreignStylesheet");
  function owningAssetRoot(roots, filePath) {
    const resolved = path4.resolve(filePath);
    let owner = null;
    for (const root of roots) {
      const relative = path4.relative(root.dir, resolved);
      if (relative === "" || relative.startsWith("..") || path4.isAbsolute(relative)) continue;
      if (!owner || root.dir.length > owner.dir.length) owner = root;
    }
    return owner;
  }
  __name(owningAssetRoot, "owningAssetRoot");
  function foreignScriptSource(assets) {
    const roots = pageAssetRoots();
    return (link) => {
      const filePath = fileUrlToPath(link);
      if (!filePath) return null;
      const owner = owningAssetRoot(roots, filePath);
      if (!owner || assets.forRoot(owner.dir)) return null;
      return path4.relative(owner.dir, path4.resolve(filePath)).split(path4.sep).join("/");
    };
  }
  __name(foreignScriptSource, "foreignScriptSource");
  const MAX_NAMED_ASSET_REFERENCES = 5;
  function assetDiagnostics(rewriter) {
    const report = rewriter.report();
    return [...pageAssetDiagnostics(report), ...(report.roots ?? []).flatMap(rootAssetDiagnostics)];
  }
  __name(assetDiagnostics, "assetDiagnostics");
  function pageAssetDiagnostics(report) {
    if (report.invalidBaseUrl) {
      return [
        diagnostic(
          DIAGNOSTIC_CODES.ASSET_BASE_URL_INVALID,
          `assetBaseUrl ${JSON.stringify(report.invalidBaseUrl)} was refused: it contains a character that could break out of an attribute or a <style> block (a quote, angle bracket, parenthesis, backtick, or whitespace). Asset references were left relative; supply a base without those characters.`,
          { assetBaseUrl: report.invalidBaseUrl }
        )
      ];
    }
    if (report.baseUrl) {
      return report.unresolved.map(
        (entry) => diagnostic(
          DIAGNOSTIC_CODES.ASSET_URL_UNRESOLVED,
          `Asset reference "${entry.reference}" could not be resolved against the asset base URL "${report.baseUrl}" (${entry.reason}); it was left as it was and will not load.`,
          { reference: entry.reference, reason: entry.reason, origin: entry.origin, assetBaseUrl: report.baseUrl }
        )
      );
    }
    if (report.references.length === 0) return [];
    const sample = report.references.slice(0, MAX_NAMED_ASSET_REFERENCES);
    return [
      diagnostic(
        DIAGNOSTIC_CODES.ASSET_BASE_URL_MISSING,
        `No assetBaseUrl was supplied, so ${report.references.length} theme-relative asset reference${report.references.length === 1 ? "" : "s"} (${sample.join(", ")}${report.references.length > sample.length ? ", \u2026" : ""}) were emitted unchanged. They resolve against whatever page hosts the output, which in a sandboxed preview frame is not the theme.`,
        { referenceCount: report.references.length, references: sample }
      )
    ];
  }
  __name(pageAssetDiagnostics, "pageAssetDiagnostics");
  function rootAssetDiagnostics(root) {
    const out = [];
    const sample = root.references.slice(0, MAX_NAMED_ASSET_REFERENCES);
    const named = `${sample.join(", ")}${root.references.length > sample.length ? ", \u2026" : ""}`;
    if (root.invalidBaseUrl) {
      out.push(
        diagnostic(
          DIAGNOSTIC_CODES.ASSET_BASE_URL_INVALID,
          `The assetBaseUrl ${JSON.stringify(root.invalidBaseUrl)} supplied for theme root ${root.label} was refused: it contains a character that could break out of an attribute or a <style> block (a quote, angle bracket, parenthesis, backtick, or whitespace). ` + (root.baseUrl ? `Its asset references were joined onto the render's assetBaseUrl ${JSON.stringify(root.baseUrl)} instead, which serves the template's theme. ` : "Its asset references were left relative. ") + "Supply a base without those characters.",
          {
            themeRoot: root.label,
            assetBaseUrl: root.invalidBaseUrl,
            ...root.baseUrl ? { fallbackAssetBaseUrl: root.baseUrl } : {}
          }
        )
      );
    }
    if (!root.baseUrl) return out;
    for (const entry of root.unresolved.slice(0, MAX_NAMED_ASSET_REFERENCES)) {
      out.push(
        diagnostic(
          DIAGNOSTIC_CODES.ASSET_URL_UNRESOLVED,
          `Asset reference "${entry.reference}" from theme root ${root.label} could not be resolved against the asset base URL "${root.baseUrl}" (${entry.reason}); it was left as it was and will not load.`,
          {
            reference: entry.reference,
            reason: entry.reason,
            origin: entry.origin,
            assetBaseUrl: root.baseUrl,
            themeRoot: root.label
          }
        )
      );
    }
    const omitted = root.unresolved.slice(MAX_NAMED_ASSET_REFERENCES);
    if (omitted.length > 0) {
      const omittedSample = omitted.slice(0, MAX_NAMED_ASSET_REFERENCES).map((entry) => entry.reference);
      out.push(
        diagnostic(
          DIAGNOSTIC_CODES.ASSET_URL_UNRESOLVED,
          `${omitted.length} further asset reference${omitted.length === 1 ? "" : "s"} from theme root ${root.label} could not be resolved against the asset base URL "${root.baseUrl}" (${omittedSample.join(", ")}${omitted.length > omittedSample.length ? ", \u2026" : ""}); ${omitted.length === 1 ? "it was" : "they were"} left as written and will not load.`,
          {
            assetBaseUrl: root.baseUrl,
            themeRoot: root.label,
            omittedCount: omitted.length,
            references: omittedSample
          }
        )
      );
    }
    if (root.fallback && !root.invalidBaseUrl && root.references.length > 0) {
      out.push(
        diagnostic(
          DIAGNOSTIC_CODES.ASSET_BASE_URL_MISSING,
          `Theme root ${root.label} was supplied without an assetBaseUrl of its own, so ${root.references.length} asset reference${root.references.length === 1 ? "" : "s"} its modules named (${named}) ${root.references.length === 1 ? "was" : "were"} joined onto the render's assetBaseUrl ${JSON.stringify(root.baseUrl)} instead. That base serves the template's theme; they load only if it serves ${root.label}'s files too. Supply the root's own assetBaseUrl.`,
          {
            themeRoot: root.label,
            fallbackAssetBaseUrl: root.baseUrl,
            referenceCount: root.references.length,
            references: sample
          }
        )
      );
    }
    return out;
  }
  __name(rootAssetDiagnostics, "rootAssetDiagnostics");
  function themeAssetUrl(filePath) {
    for (const root of themeRoots.roots) {
      const relative = path4.relative(root, filePath);
      if (relative === "" || relative.startsWith("..") || path4.isAbsolute(relative)) continue;
      return `/${relative.replace(/\\/g, "/")}`;
    }
    return null;
  }
  __name(themeAssetUrl, "themeAssetUrl");
  let defaultRender = resolveForRequest(defaultPresetName);
  const standingDiagnostics = [...themeRoots.diagnostics];
  let bridgeUnavailableDiagnostic = null;
  let ssrBridge = null;
  let reactModulePolicy;
  const bridgeDisabledByConfiguration = /* @__PURE__ */ __name((reason) => reason === "no-bridge-in-build" ? diagnostic(
    DIAGNOSTIC_CODES.SSR_BRIDGE_UNAVAILABLE,
    "This build has no React renderer, so React modules appear as placeholders.",
    { reason }
  ) : diagnostic(
    DIAGNOSTIC_CODES.SSR_BRIDGE_UNAVAILABLE,
    "React SSR is not available in this build \u2014 React modules render as placeholders. Their structure and fields are shown; their markup is not.",
    { reason }
  ), "bridgeDisabledByConfiguration");
  const disabledReason = /* @__PURE__ */ __name((policy) => policy === "not-rendered" ? "no-bridge-in-build" : "disabled-by-configuration", "disabledReason");
  if (renderModules && options.createSsrBridge === null) {
    reactModulePolicy = options.reactModulePolicy ?? "host-may-finish";
    bridgeUnavailableDiagnostic = bridgeDisabledByConfiguration(disabledReason(reactModulePolicy));
  } else if (renderModules) {
    try {
      const factory = options.createSsrBridge === void 0 ? await loadDefaultSsrBridgeFactory() : options.createSsrBridge;
      if (factory === null) {
        reactModulePolicy = options.reactModulePolicy ?? "not-rendered";
        bridgeUnavailableDiagnostic = bridgeDisabledByConfiguration(disabledReason(reactModulePolicy));
      } else {
        ssrBridge = await factory({ themeRoot, themeRoots });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      bridgeUnavailableDiagnostic = diagnostic(
        DIAGNOSTIC_CODES.SSR_BRIDGE_UNAVAILABLE,
        `SSR bridge unavailable \u2014 React modules will render as placeholders: ${msg}`,
        { reason: "bridge-failed-to-start" }
      );
    }
  }
  function bridgeDiagnostics(reactModules) {
    if (!bridgeUnavailableDiagnostic || reactModules.length === 0) return [];
    return [bridgeUnavailableDiagnostic];
  }
  __name(bridgeDiagnostics, "bridgeDiagnostics");
  function makeEngineOptions(theme, presetName, overrides) {
    return {
      themeRoot,
      childThemeRoot: themeRoots.childThemeRoot,
      parentThemeRoot: themeRoots.parentThemeRoot,
      projects: themeRoots.projects,
      themeRoots,
      theme,
      presetName,
      renderGlobalPartials,
      baseSize: themeManifest.baseSize,
      themeId: options.themeId,
      parentThemeId: options.parentThemeId,
      stampProvenance: options.stampProvenance,
      reactModulePolicy,
      ...overrides
    };
  }
  __name(makeEngineOptions, "makeEngineOptions");
  function templateProvenanceAttributes(templatePath) {
    if (options.stampProvenance === false) return "";
    const context = createProvenanceContext(themeRoots, { themeId: options.themeId, parentThemeId: options.parentThemeId });
    const located = provenanceFileFor(context, locateTemplate(themeRoots, templatePath));
    return provenanceAttributes({
      kind: "template",
      runtime: "hubl",
      themeId: located?.themeId ?? null,
      file: located?.file ?? templatePath
    });
  }
  __name(templateProvenanceAttributes, "templateProvenanceAttributes");
  function collectBaseLayoutCss(engineOpts) {
    const candidates = ["layouts/base.hubl.html", "layouts/base.html"];
    const layout = candidates.find(
      (candidate) => resolveInThemeCascade(themeRoots, path4.join("templates", candidate))
    );
    if (!layout) return { cssLinks: [], diagnostics: [] };
    try {
      const rendered = renderTemplateWithCollector(
        { ...engineOpts, renderGlobalPartials: false },
        layout
      );
      return {
        cssLinks: rendered.cssLinks,
        diagnostics: rendered.diagnostics.map((entry) => attributeToBaseLayout(entry, layout))
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return {
        cssLinks: [],
        diagnostics: [
          diagnostic(
            DIAGNOSTIC_CODES.CSS_RENDER_ERROR,
            `Base layout ${layout}: could not be evaluated for its require_css links, so this preview is missing the layout's stylesheets \u2014 ${msg}`,
            { origin: BASE_LAYOUT_CSS_ORIGIN, originTemplate: layout, sourceFile: layout }
          )
        ]
      };
    }
  }
  __name(collectBaseLayoutCss, "collectBaseLayoutCss");
  function buildStandaloneRequireCss(engineOpts, cssLinks, theme, presetName) {
    const layout = collectBaseLayoutCss(engineOpts);
    const required = buildRequireCssMarkup(
      [...layout.cssLinks, ...cssLinks, THEME_DIST_STYLESHEET],
      { theme, baseSize: themeManifest.baseSize, presetName, resolveAsset: themeAssetResolver },
      resolveTemplateAsset,
      isPipelineCoveredCss,
      themeAssetUrl
    );
    return {
      markup: required.markup,
      diagnostics: [...layout.diagnostics, ...required.diagnostics]
    };
  }
  __name(buildStandaloneRequireCss, "buildStandaloneRequireCss");
  function resolveRequestState(request, fallbackKind) {
    return resolveContentState(themeRoot, request?.state, fallbackKind);
  }
  __name(resolveRequestState, "resolveRequestState");
  function hublModuleContentKind(modulePath) {
    try {
      const dir = resolveModuleDir(themeRoots, modulePath);
      if (!dir) return null;
      const metaPath = path4.join(dir, "meta.json");
      if (!hostFs.existsSync(metaPath)) return null;
      const meta = JSON.parse(hostFs.readFileSync(metaPath, "utf-8"));
      return contentKindForModuleContentTypes(meta?.content_types);
    } catch {
      return null;
    }
  }
  __name(hublModuleContentKind, "hublModuleContentKind");
  const THEME_DIST_STYLESHEET = "assets/dist/theme.css";
  async function hydrateModulePlaceholders(html, propsOverrides, engineDiagnostics = [], render) {
    if (!ssrBridge) return { html, css: "", islands: [], sharedStates: {}, diagnostics: [], hydrated: [], filledFieldDefaults: {} };
    const placeholderRegex = /<div class="themespot-module-placeholder"\s+data-module-path="([^"]+)"\s+data-module-props="([^"]*)"[^>]*>\s*\[Module:[^\]]*\]\s*<\/div>/g;
    const replacements = [];
    const overrideReport = {
      diagnostics: [],
      reportedContentLinks: new Set(
        engineDiagnostics.filter((entry) => entry.code === DIAGNOSTIC_CODES.CONTENT_LINK_UNRESOLVED).map((entry) => `${entry.details?.modulePath} ${entry.details?.fieldPath}`)
      )
    };
    let match;
    let isFirstModule = true;
    while ((match = placeholderRegex.exec(html)) !== null) {
      const modulePath = match[1];
      const propsBase64 = match[2];
      let props = {};
      try {
        props = JSON.parse(decodeBase64Utf8(propsBase64));
      } catch {
      }
      if (isFirstModule && propsOverrides && Object.keys(propsOverrides).length > 0) {
        props = { ...props, ...emulateContentLinks(overrideReport, modulePath, propsOverrides) };
        isFirstModule = false;
      }
      const openingTag = match[0].slice(0, match[0].indexOf(">") + 1);
      replacements.push({ fullMatch: match[0], modulePath, props, provenance: extractProvenanceAttributes(openingTag) });
    }
    if (replacements.length === 0) return { html, css: "", islands: [], sharedStates: {}, diagnostics: [], hydrated: [], filledFieldDefaults: {} };
    const allCss = [];
    const allIslands = [];
    const allSharedStates = {};
    const diagnostics = [...overrideReport.diagnostics];
    const hydratedModules = [];
    const filledFieldDefaults = {};
    const moduleReports = replacements.map(() => []);
    const rendered = await Promise.all(
      replacements.map(async ({ modulePath, props, provenance }, moduleIndex) => {
        try {
          const result2 = await ssrBridge.renderModule(modulePath, props, {
            state: render?.state,
            theme: render?.theme,
            presetName: render?.presetName,
            diagnostics: moduleReports[moduleIndex]
          });
          if (result2.css) allCss.push(result2.css);
          let moduleHtml = result2.html;
          if (result2.islands && result2.islands.length > 0) {
            const prefix = `m${moduleIndex}-`;
            for (const island of result2.islands) {
              if (!island.id) continue;
              const namespacedId = `${prefix}${island.id}`;
              moduleHtml = moduleHtml.split(`id="${island.id}"`).join(`id="${namespacedId}"`);
              island.id = namespacedId;
            }
            allIslands.push(...result2.islands);
          }
          if (result2.sharedStates) Object.assign(allSharedStates, result2.sharedStates);
          hydratedModules.push(modulePath);
          if (Array.isArray(result2.filledFieldDefaults) && result2.filledFieldDefaults.length > 0) {
            const known = filledFieldDefaults[modulePath] ?? [];
            for (const name of result2.filledFieldDefaults) {
              if (typeof name === "string" && !known.includes(name)) known.push(name);
            }
            filledFieldDefaults[modulePath] = known;
          }
          return stampFirstElementWith(moduleHtml, provenance);
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          diagnostics.push(
            diagnostic(DIAGNOSTIC_CODES.MODULE_RENDER_ERROR, `Module failed to render: ${modulePath} \u2014 ${msg}`, {
              modulePath
            })
          );
          return `<!-- Module SSR error (${modulePath}): ${msg} -->`;
        }
      })
    );
    let result = html;
    for (let i = 0; i < replacements.length; i++) {
      result = result.replace(replacements[i].fullMatch, rendered[i]);
    }
    const seenReports = /* @__PURE__ */ new Set();
    for (const report of moduleReports.flat()) {
      const key = `${report.code}\0${report.message}`;
      if (seenReports.has(key)) continue;
      seenReports.add(key);
      diagnostics.push(report);
    }
    return {
      html: result,
      css: allCss.join("\n"),
      islands: allIslands,
      sharedStates: allSharedStates,
      diagnostics,
      hydrated: hydratedModules,
      filledFieldDefaults
    };
  }
  __name(hydrateModulePlaceholders, "hydrateModulePlaceholders");
  async function withdrawFilledSchemaHoles(diagnostics, pass) {
    if (!ssrBridge || pass.hydrated.length === 0) return diagnostics;
    const holes = diagnostics.filter(
      (entry) => entry.code === DIAGNOSTIC_CODES.REACT_MODULE_FIELD_DEFAULT_UNEVALUABLE
    );
    if (holes.length === 0) return diagnostics;
    const hydratedSet = new Set(pass.hydrated);
    const filled = /* @__PURE__ */ new Set();
    for (const hole of holes) {
      const modulePath = typeof hole.details?.modulePath === "string" ? hole.details.modulePath : "";
      if (!modulePath || !hydratedSet.has(modulePath) || filled.has(modulePath)) continue;
      const dropped = Array.isArray(hole.details?.fields) ? hole.details.fields : [];
      if (dropped.length === 0) continue;
      const reported = new Set(pass.filledFieldDefaults[modulePath] ?? []);
      if (dropped.every((name) => reported.has(name))) filled.add(modulePath);
    }
    if (filled.size === 0) return diagnostics;
    return diagnostics.filter(
      (entry) => entry.code !== DIAGNOSTIC_CODES.REACT_MODULE_FIELD_DEFAULT_UNEVALUABLE || !filled.has(typeof entry.details?.modulePath === "string" ? entry.details.modulePath : "")
    );
  }
  __name(withdrawFilledSchemaHoles, "withdrawFilledSchemaHoles");
  function wrapInDocument(bodyHtml, moduleCss = "", islands = [], sharedStates = {}, wrapOptions) {
    const assets = wrapOptions?.assets;
    const rewriteMarkup = /* @__PURE__ */ __name((markup) => assets ? assets.html(markup) : markup, "rewriteMarkup");
    const body = rewriteMarkup(bodyHtml);
    const moduleStyles = rewriteMarkup(moduleCss);
    const requireCssMarkup = rewriteMarkup(wrapOptions?.requireCss ?? "");
    const themeScriptMarkup = rewriteMarkup(wrapOptions?.themeScripts ?? "");
    const headScriptMarkup = rewriteMarkup(wrapOptions?.headScripts ?? "");
    const requireHeadMarkup = rewriteMarkup(wrapOptions?.headMarkup ?? "");
    const hydrationScripts = islands.length > 0 ? buildHydrationScripts(islands, sharedStates, assets) : "";
    const previewNavScript = wrapOptions?.previewNavigation ? buildPreviewNavigationScript(wrapOptions.previewNavigation.templates) : "";
    const css = wrapOptions?.themeCss ?? defaultRender.css;
    const fonts = wrapOptions?.fontLinks ?? defaultRender.fontLinks;
    const surfaceAttr = wrapOptions?.surfaceScheme ? ` data-themespot-surface="${escapeAttr(wrapOptions.surfaceScheme)}"` : "";
    const presetAttr = wrapOptions?.presetName ? ` data-preset="${escapeAttr(wrapOptions.presetName)}"` : "";
    const themeAttr = wrapOptions?.themeMode === "dark" ? ' data-themespot-theme="dark"' : "";
    const multiSurfaceStyles = wrapOptions?.multiSurface ? buildMultiSurfaceStyles(themeManifest.tokenPrefix ?? "--themespot--") : "";
    const editorAttr = wrapOptions?.inEditor ? ' class="hs-inline-edit"' : "";
    return `<!DOCTYPE html>
<html lang="en"${themeAttr}${editorAttr}>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Preview</title>
  ${fonts}
  <style id="themespot-theme-css">${css}</style>
  <!-- Empty injection hook: external tooling (Studio, agents) may write
       CSS-var overrides here without a server round-trip. -->
  <style id="themespot-theme-css-override"></style>
  ${multiSurfaceStyles}
  ${wrapOptions?.chromeStyles ?? ""}
  ${requireCssMarkup}
  ${moduleStyles}
  ${requireHeadMarkup}
  ${headScriptMarkup}
</head>
<body class="body-wrapper theme-overrides" style="margin:0"${surfaceAttr}${presetAttr}${wrapOptions?.bodyProvenance ?? ""}>
  ${body}
  ${themeScriptMarkup}
  ${hydrationScripts}
  ${previewNavScript}
</body>
</html>`;
  }
  __name(wrapInDocument, "wrapInDocument");
  function getRequestRender(request) {
    const presetName = request?.presetName ?? defaultPresetName;
    const overrides = request?.themeOverrides;
    if (!overrides && presetName === defaultPresetName) return { ...defaultRender, presetName };
    const r = resolveForRequest(presetName, overrides);
    return { ...r, presetName };
  }
  __name(getRequestRender, "getRequestRender");
  async function renderPage(templatePath, request) {
    return (await renderTemplateDocument(templatePath, request)).result;
  }
  __name(renderPage, "renderPage");
  async function renderTemplateDocument(templatePath, request, page) {
    ssrBridge?.resetCssCache();
    const assets = createRequestAssetRewriter(request, page);
    const { theme, css, cssDiagnostics, fontLinks, presetName } = getRequestRender(request);
    const { context: baseTemplateContext, diagnostics: templateContextDiagnostics, contentKind } = buildTemplateContext(themeRoots, templatePath);
    const { state, diagnostics: stateDiagnostics } = resolveRequestState(request, contentKind);
    const templateContext = templateContextForState(baseTemplateContext, state);
    const engineOpts = makeEngineOptions(theme, presetName, {
      templateContext,
      contentState: state,
      ...page ? { page: withRootAssets(page, assets) } : {}
    });
    const { html: bodyHtml, diagnostics: bodyDiagnostics, cssLinks, jsLinks, moduleScripts, inlineScripts, headMarkup, reactModules, layoutSections, pageModules } = renderTemplateWithCollector(engineOpts, templatePath);
    const hydrated = await hydrateModulePlaceholders(bodyHtml, void 0, [], { state, theme, presetName });
    const requireCss = buildRequireCssMarkup(
      [...cssLinks, THEME_DIST_STYLESHEET],
      { theme, baseSize: themeManifest.baseSize, presetName, resolveAsset: themeAssetResolver },
      resolveTemplateAsset,
      isPipelineCoveredCss,
      themeAssetUrl,
      page ? foreignStylesheet(assets) : void 0
    );
    const html = wrapInDocument(hydrated.html, hydrated.css, hydrated.islands, hydrated.sharedStates, {
      themeCss: assets.css(css),
      fontLinks,
      surfaceScheme: request?.surfaceScheme,
      presetName,
      themeMode: extractThemeMode(theme),
      previewNavigation: request?.previewNavigation,
      requireCss: requireCss.markup,
      themeScripts: buildThemeScriptMarkup(
        jsLinks,
        moduleScripts,
        inlineScripts,
        themeAssetUrl,
        resolveTemplateAsset,
        page ? foreignScriptSource(assets) : void 0
      ),
      headScripts: buildHeadScriptMarkup(inlineScripts),
      headMarkup: buildHeadMarkup(headMarkup),
      assets,
      inEditor: state?.is_in_editor === true,
      bodyProvenance: templateProvenanceAttributes(templatePath)
    });
    return {
      result: {
        html,
        diagnostics: [
          ...standingDiagnostics,
          ...templateContextDiagnostics,
          ...stateDiagnostics,
          ...cssDiagnostics,
          ...requireCss.diagnostics,
          ...bridgeDiagnostics(reactModules),
          ...await withdrawFilledSchemaHoles(bodyDiagnostics, hydrated),
          ...hydrated.diagnostics,
          ...assetDiagnostics(assets)
        ],
        layoutSections
      },
      pageModules
    };
  }
  __name(renderTemplateDocument, "renderTemplateDocument");
  async function renderScaffoldDocument(page, request) {
    ssrBridge?.resetCssCache();
    const assets = createRequestAssetRewriter(request, page);
    const { theme, css, cssDiagnostics, fontLinks, presetName } = getRequestRender(request);
    const { state, diagnostics: stateDiagnostics } = resolveRequestState(request, null);
    const engineOpts = makeEngineOptions(theme, presetName, { contentState: state, page: withRootAssets(page, assets) });
    const rendered = renderPageScaffoldWithCollector(engineOpts);
    const hydrated = await hydrateModulePlaceholders(rendered.html, void 0, [], { state, theme, presetName });
    const requireCss = buildRequireCssMarkup(
      [...rendered.cssLinks, THEME_DIST_STYLESHEET],
      { theme, baseSize: themeManifest.baseSize, presetName, resolveAsset: themeAssetResolver },
      resolveTemplateAsset,
      isPipelineCoveredCss,
      themeAssetUrl,
      foreignStylesheet(assets)
    );
    const html = wrapInDocument(hydrated.html, hydrated.css, hydrated.islands, hydrated.sharedStates, {
      themeCss: assets.css(css),
      fontLinks,
      surfaceScheme: request?.surfaceScheme,
      presetName,
      themeMode: extractThemeMode(theme),
      previewNavigation: request?.previewNavigation,
      requireCss: requireCss.markup,
      themeScripts: buildThemeScriptMarkup(
        rendered.jsLinks,
        rendered.moduleScripts,
        rendered.inlineScripts,
        themeAssetUrl,
        resolveTemplateAsset,
        foreignScriptSource(assets)
      ),
      headScripts: buildHeadScriptMarkup(rendered.inlineScripts),
      headMarkup: buildHeadMarkup(rendered.headMarkup),
      assets,
      inEditor: state?.is_in_editor === true
    });
    return {
      result: {
        html,
        diagnostics: [
          ...standingDiagnostics,
          ...stateDiagnostics,
          ...cssDiagnostics,
          ...requireCss.diagnostics,
          ...bridgeDiagnostics(rendered.reactModules),
          ...await withdrawFilledSchemaHoles(rendered.diagnostics, hydrated),
          ...hydrated.diagnostics,
          ...assetDiagnostics(assets)
        ],
        layoutSections: rendered.layoutSections
      },
      pageModules: rendered.pageModules ?? []
    };
  }
  __name(renderScaffoldDocument, "renderScaffoldDocument");
  function cascadePortalRoots() {
    const roots = [
      options.portalRoot ? pageRootBinding(options.portalRoot, themeRoots.childThemeRoot ?? themeRoots.themeRoot, options.themeId) : null,
      options.parentPortalRoot && themeRoots.parentThemeRoot ? pageRootBinding(options.parentPortalRoot, themeRoots.parentThemeRoot, options.parentThemeId) : null
    ];
    return roots.filter((root) => root !== null);
  }
  __name(cascadePortalRoots, "cascadePortalRoots");
  function pageBinding(entry) {
    const extraRoots = (options.extraThemes ?? []).map((extra) => pageRootBinding(extra.root, normaliseRootDir(extra.dir), extra.themeId, extra.themeName)).filter((root) => root !== null);
    const supplied = [
      { themeId: options.themeId?.trim() || null, themeName: null },
      ...themeRoots.parentThemeRoot ? [{ themeId: options.parentThemeId?.trim() || null, themeName: null }] : [],
      ...extraRoots.map((root) => ({ themeId: root.themeId, themeName: root.themeName }))
    ];
    return {
      layoutSections: isPlainRecord(entry.layoutSections) ? entry.layoutSections : {},
      widgets: isPlainRecord(entry.widgets) ? entry.widgets : {},
      content: isPlainRecord(entry.content) ? entry.content : void 0,
      modules: Array.isArray(entry.modules) ? entry.modules : [],
      cascadeRoots: cascadePortalRoots(),
      extraRoots,
      suppliedThemes: supplied.filter((theme) => theme.themeId !== null || theme.themeName !== null)
    };
  }
  __name(pageBinding, "pageBinding");
  function locatePageTemplate(templatePath) {
    const normalised = normaliseRootPath(templatePath);
    const candidates = [templatePath, normalised];
    for (const root of cascadePortalRoots()) {
      if (normalised.startsWith(`${root.portalRoot}/`)) {
        candidates.push(normalised.slice(root.portalRoot.length + 1));
      }
    }
    for (const candidate of candidates) {
      if (candidate && locateTemplate(themeRoots, candidate)) return candidate;
    }
    return null;
  }
  __name(locatePageTemplate, "locatePageTemplate");
  async function renderPageContent(entry, request) {
    const page = pageBinding(entry);
    const requested = typeof entry.templatePath === "string" ? entry.templatePath.trim() : "";
    const templatePath = requested ? locatePageTemplate(requested) : null;
    let reason;
    let failure;
    if (!requested) {
      reason = "the page names no template";
    } else if (!templatePath) {
      reason = `its template ${JSON.stringify(requested)} resolves to no file in the theme supplied`;
    } else {
      try {
        const drawn = await renderTemplateDocument(templatePath, request, page);
        return { ...drawn.result, page: summarisePageRecords(drawn.pageModules ?? [], true) };
      } catch (err) {
        if (err instanceof RendererError && err.code === DIAGNOSTIC_CODES.CONTENT_STATE_UNKNOWN) throw err;
        failure = err instanceof Error ? err.message : String(err);
        reason = `its template ${JSON.stringify(requested)} failed to render`;
      }
    }
    const scaffold = await renderScaffoldDocument(page, request);
    const notDrawn = diagnostic(
      DIAGNOSTIC_CODES.PAGE_TEMPLATE_NOT_DRAWN,
      `The page's template was not drawn \u2014 ${reason}${failure ? ` (${failure})` : ""} \u2014 so its ${Object.keys(page.layoutSections).length} drag-and-drop area(s) are shown in a neutral scaffold, without the template's header, footer or layout around them.`,
      { templatePath: requested || null, reason, ...failure ? { error: failure } : {} }
    );
    return {
      ...scaffold.result,
      diagnostics: [notDrawn, ...scaffold.result.diagnostics],
      page: summarisePageRecords(scaffold.pageModules, false)
    };
  }
  __name(renderPageContent, "renderPageContent");
  async function renderString(template, ctx = {}, request) {
    const assets = createRequestAssetRewriter(request);
    const { theme, presetName } = getRequestRender(request);
    const { state, diagnostics: stateDiagnostics } = resolveRequestState(request, null);
    const engineOpts = makeEngineOptions(theme, presetName, { contentState: state });
    const { html, diagnostics, reactModules, layoutSections } = renderHublStringWithCollector(engineOpts, template, ctx);
    const rewritten = assets.html(html);
    return {
      html: rewritten,
      diagnostics: [
        ...standingDiagnostics,
        ...stateDiagnostics,
        ...bridgeDiagnostics(reactModules),
        ...diagnostics,
        ...assetDiagnostics(assets)
      ],
      layoutSections
    };
  }
  __name(renderString, "renderString");
  async function renderGlobalPartialBlock(partialPath, type, engineOpts, render) {
    const hublSrc = `{% global_partial path="${partialPath}" type="${type}" %}`;
    const {
      html: rawHtml,
      diagnostics: engineDiagnostics,
      reactModules,
      cssLinks,
      jsLinks,
      moduleScripts,
      inlineScripts,
      headMarkup
    } = renderHublStringWithCollector(engineOpts, hublSrc);
    const hydrated = await hydrateModulePlaceholders(rawHtml, void 0, [], render);
    return {
      ...hydrated,
      diagnostics: [
        ...await withdrawFilledSchemaHoles(engineDiagnostics, hydrated),
        ...hydrated.diagnostics
      ],
      reactModules,
      cssLinks,
      jsLinks,
      moduleScripts,
      inlineScripts,
      headMarkup
    };
  }
  __name(renderGlobalPartialBlock, "renderGlobalPartialBlock");
  async function frameWithGlobalPartials(bodyHtml, bodyCss, bodyIslands, bodySharedStates, bodyCssLinks, bodyScripts, engineOpts, enabled, render) {
    if (!enabled) {
      return {
        html: bodyHtml,
        css: bodyCss,
        islands: bodyIslands,
        sharedStates: bodySharedStates,
        diagnostics: [],
        reactModules: [],
        cssLinks: bodyCssLinks,
        ...bodyScripts
      };
    }
    const [header, footer] = await Promise.all([
      renderGlobalPartialBlock("../partials/header.hubl.html", "HEADER", engineOpts, render),
      renderGlobalPartialBlock("../partials/footer.hubl.html", "FOOTER", engineOpts, render)
    ]);
    return {
      html: `${header.html}
${bodyHtml}
${footer.html}`,
      css: [header.css, bodyCss, footer.css].filter(Boolean).join("\n"),
      islands: [...header.islands, ...bodyIslands, ...footer.islands],
      sharedStates: { ...header.sharedStates, ...bodySharedStates, ...footer.sharedStates },
      diagnostics: [...header.diagnostics, ...footer.diagnostics],
      reactModules: [...header.reactModules, ...footer.reactModules],
      cssLinks: [...header.cssLinks, ...bodyCssLinks, ...footer.cssLinks],
      jsLinks: [...header.jsLinks, ...bodyScripts.jsLinks, ...footer.jsLinks],
      moduleScripts: [...header.moduleScripts, ...bodyScripts.moduleScripts, ...footer.moduleScripts],
      inlineScripts: [...header.inlineScripts, ...bodyScripts.inlineScripts, ...footer.inlineScripts],
      headMarkup: [...header.headMarkup, ...bodyScripts.headMarkup, ...footer.headMarkup]
    };
  }
  __name(frameWithGlobalPartials, "frameWithGlobalPartials");
  async function renderModuleDirect(modulePath, props, request) {
    ssrBridge?.resetCssCache();
    const assets = createRequestAssetRewriter(request);
    const { theme, css, cssDiagnostics, fontLinks, presetName } = getRequestRender(request);
    const { state, diagnostics: stateDiagnostics } = resolveRequestState(
      request,
      hublModuleContentKind(modulePath) ?? "blog-post"
    );
    const bridgeRender = { state: request?.state ? state : void 0, theme, presetName };
    const engineOpts = makeEngineOptions(theme, presetName, { contentState: state });
    const { env, collector } = createHublEngine(engineOpts);
    const routed = routeModuleRender({
      env,
      collector,
      themeRoots,
      themeRoot,
      modulePath,
      props,
      contextCtx: {},
      moduleNumber: ++collector.moduleCounter,
      preprocess: preprocessHubl
    });
    const reactPass = await hydrateModulePlaceholders(routed, void 0, [], bridgeRender);
    const result = {
      html: reactPass.html,
      css: reactPass.css,
      islands: reactPass.islands,
      sharedStates: reactPass.sharedStates
    };
    const moduleDiagnostics = [
      ...await withdrawFilledSchemaHoles(collector.diagnostics, reactPass),
      ...reactPass.diagnostics
    ];
    const moduleReactModules = [...collector.reactModules];
    const moduleBody = request?.multiSurface ? SURFACE_PREVIEW_ORDER.map(({ surface, label }) => `
          <section class="themespot-preview-surface" data-themespot-surface="${surface}">
            <header class="themespot-preview-surface__label">${label}</header>
            <div class="themespot-preview-surface__body">${result.html}</div>
          </section>
        `).join("") : result.html;
    const framed = await frameWithGlobalPartials(
      moduleBody,
      result.css,
      result.islands,
      result.sharedStates ?? {},
      collector.cssLinks,
      {
        jsLinks: collector.jsLinks,
        moduleScripts: collector.moduleScripts,
        inlineScripts: collector.inlineScripts,
        headMarkup: collector.headMarkup
      },
      engineOpts,
      request?.includeGlobalPartials === true,
      bridgeRender
    );
    const requireCss = buildStandaloneRequireCss(engineOpts, framed.cssLinks, theme, presetName);
    const html = wrapInDocument(framed.html, framed.css, framed.islands, framed.sharedStates, {
      themeCss: assets.css(css),
      fontLinks,
      inEditor: state?.is_in_editor === true,
      surfaceScheme: request?.multiSurface ? void 0 : request?.surfaceScheme,
      presetName,
      themeMode: extractThemeMode(theme),
      multiSurface: request?.multiSurface,
      previewNavigation: request?.previewNavigation,
      assets,
      requireCss: requireCss.markup,
      themeScripts: buildThemeScriptMarkup(framed.jsLinks, framed.moduleScripts, framed.inlineScripts, themeAssetUrl, resolveTemplateAsset),
      headScripts: buildHeadScriptMarkup(framed.inlineScripts),
      headMarkup: buildHeadMarkup(framed.headMarkup)
    });
    return {
      html,
      diagnostics: [
        ...standingDiagnostics,
        ...stateDiagnostics,
        ...cssDiagnostics,
        ...requireCss.diagnostics,
        ...bridgeDiagnostics([...moduleReactModules, ...framed.reactModules]),
        ...moduleDiagnostics,
        ...framed.diagnostics,
        ...assetDiagnostics(assets)
      ]
    };
  }
  __name(renderModuleDirect, "renderModuleDirect");
  async function renderSection(sectionPath, modulePropsOverrides, request) {
    ssrBridge?.resetCssCache();
    const assets = createRequestAssetRewriter(request);
    const { theme, css, cssDiagnostics, fontLinks, presetName } = getRequestRender(request);
    const hublTemplate = `{% include_dnd_partial path="${sectionPath}" %}`;
    const { state, diagnostics: stateDiagnostics } = resolveRequestState(request, "blog-post");
    const bridgeRender = { state, theme, presetName };
    const engineOpts = makeEngineOptions(theme, presetName, { contentState: state });
    const {
      html: bodyHtml,
      diagnostics: bodyDiagnostics,
      reactModules,
      cssLinks,
      jsLinks,
      moduleScripts,
      inlineScripts,
      headMarkup,
      layoutSections
    } = renderHublStringWithCollector(engineOpts, hublTemplate);
    const hydrated = await hydrateModulePlaceholders(bodyHtml, modulePropsOverrides, bodyDiagnostics, bridgeRender);
    const framed = await frameWithGlobalPartials(
      hydrated.html,
      hydrated.css,
      hydrated.islands,
      hydrated.sharedStates,
      cssLinks,
      { jsLinks, moduleScripts, inlineScripts, headMarkup },
      engineOpts,
      request?.includeGlobalPartials === true,
      bridgeRender
    );
    const requireCss = buildStandaloneRequireCss(engineOpts, framed.cssLinks, theme, presetName);
    const html = wrapInDocument(framed.html, framed.css, framed.islands, framed.sharedStates, {
      themeCss: assets.css(css),
      fontLinks,
      inEditor: state?.is_in_editor === true,
      surfaceScheme: request?.surfaceScheme,
      presetName,
      themeMode: extractThemeMode(theme),
      previewNavigation: request?.previewNavigation,
      assets,
      requireCss: requireCss.markup,
      themeScripts: buildThemeScriptMarkup(framed.jsLinks, framed.moduleScripts, framed.inlineScripts, themeAssetUrl, resolveTemplateAsset),
      headScripts: buildHeadScriptMarkup(framed.inlineScripts),
      headMarkup: buildHeadMarkup(framed.headMarkup)
    });
    return {
      html,
      diagnostics: [
        ...standingDiagnostics,
        ...stateDiagnostics,
        ...cssDiagnostics,
        ...requireCss.diagnostics,
        ...bridgeDiagnostics([...reactModules, ...framed.reactModules]),
        ...await withdrawFilledSchemaHoles(bodyDiagnostics, hydrated),
        ...hydrated.diagnostics,
        ...framed.diagnostics,
        ...assetDiagnostics(assets)
      ],
      layoutSections
    };
  }
  __name(renderSection, "renderSection");
  async function renderPartial(partialFile, request) {
    ssrBridge?.resetCssCache();
    const assets = createRequestAssetRewriter(request);
    const { theme, css, cssDiagnostics, fontLinks, presetName } = getRequestRender(request);
    const { state, diagnostics: stateDiagnostics } = resolveRequestState(request, null);
    const engineOpts = makeEngineOptions(theme, presetName, { contentState: state });
    const type = /footer/i.test(partialFile) ? "FOOTER" : "HEADER";
    const block = await renderGlobalPartialBlock(`../partials/${partialFile}`, type, engineOpts, { state, theme, presetName });
    const requireCss = buildStandaloneRequireCss(engineOpts, block.cssLinks, theme, presetName);
    const html = wrapInDocument(block.html, block.css, block.islands, block.sharedStates, {
      themeCss: assets.css(css),
      fontLinks,
      surfaceScheme: request?.surfaceScheme,
      presetName,
      themeMode: extractThemeMode(theme),
      previewNavigation: request?.previewNavigation,
      assets,
      requireCss: requireCss.markup,
      themeScripts: buildThemeScriptMarkup(block.jsLinks, block.moduleScripts, block.inlineScripts, themeAssetUrl, resolveTemplateAsset),
      headScripts: buildHeadScriptMarkup(block.inlineScripts),
      headMarkup: buildHeadMarkup(block.headMarkup)
    });
    return {
      html,
      diagnostics: [
        ...standingDiagnostics,
        ...stateDiagnostics,
        ...cssDiagnostics,
        ...requireCss.diagnostics,
        ...bridgeDiagnostics(block.reactModules),
        ...block.diagnostics,
        ...assetDiagnostics(assets)
      ]
    };
  }
  __name(renderPartial, "renderPartial");
  const themeSurfacesByRender = /* @__PURE__ */ new Map();
  function getThemeSurfaces(request) {
    const { css, presetName } = getRequestRender(request);
    const key = `${presetName}::${request?.themeOverrides ? JSON.stringify(request.themeOverrides) : ""}`;
    let surfaces = themeSurfacesByRender.get(key);
    if (!surfaces) {
      const sources = [css];
      const dist = resolveInThemeCascade(themeRoots, THEME_DIST_STYLESHEET);
      if (dist) {
        try {
          sources.push(hostFs.readFileSync(dist, "utf-8"));
        } catch {
        }
      }
      surfaces = declaredSurfaces(sources.join("\n"));
      if (themeSurfacesByRender.size > 64) themeSurfacesByRender.clear();
      themeSurfacesByRender.set(key, surfaces);
    }
    return [...surfaces];
  }
  __name(getThemeSurfaces, "getThemeSurfaces");
  function findSpecimenSource(candidates) {
    for (const relative of candidates) {
      const absolute = resolveInThemeCascade(themeRoots, relative);
      if (absolute && hostFs.existsSync(absolute)) return { relative, absolute };
    }
    return null;
  }
  __name(findSpecimenSource, "findSpecimenSource");
  async function renderSpecimen(request) {
    const textSource = findSpecimenSource(SPECIMEN_TEXT_FILES);
    const proseSource = findSpecimenSource(SPECIMEN_PROSE_FILES);
    if (!textSource && !proseSource) {
      return { status: 404, html: specimenUnavailableHtml(themeRoot), diagnostics: [] };
    }
    const loadSource = ssrBridge?.loadThemeSourceModule;
    if (!loadSource) {
      const reason = bridgeUnavailableDiagnostic?.message ?? "the bridge in use cannot evaluate theme source files.";
      return {
        status: 503,
        html: specimenBridgeUnavailableHtml(reason),
        diagnostics: bridgeUnavailableDiagnostic ? [bridgeUnavailableDiagnostic] : []
      };
    }
    const specimenDiagnostics = [];
    const sourceFailed = /* @__PURE__ */ __name((file, err) => {
      const message = err instanceof Error ? err.message : String(err);
      specimenDiagnostics.push(
        diagnostic(
          DIAGNOSTIC_CODES.SPECIMEN_SOURCE_FAILED,
          `${file} could not be evaluated for the specimen, so what it declares is missing from it \u2014 ${message}`,
          { file, error: message }
        )
      );
    }, "sourceFailed");
    const roles = { file: textSource?.relative ?? null, samples: [] };
    if (textSource) {
      let source = "";
      try {
        source = hostFs.readFileSync(textSource.absolute, "utf-8");
      } catch {
      }
      const union = roleUnion(source);
      if (!union) {
        roles.note = "it exports no string-union type named \u2026Role, so it declares no text roles";
      } else {
        roles.typeName = union.name;
        try {
          const loaded = await loadSource(textSource.absolute);
          const Text = loaded.exports.Text;
          const textClass = loaded.exports.textClass;
          if (typeof Text === "function" || Text !== null && typeof Text === "object") {
            roles.samples = union.members.map((role) => ({
              role,
              html: loaded.renderToStaticMarkup(Text, { role }, ROLE_SAMPLE_TEXT)
            }));
          } else if (typeof textClass === "function") {
            roles.samples = union.members.map((role) => ({
              role,
              html: `<p class="${escapeSpecimenText(String(textClass(role)))}">${ROLE_SAMPLE_TEXT}</p>`
            }));
          } else {
            roles.note = `it declares ${union.name} but exports neither Text nor textClass to render a role with`;
          }
        } catch (err) {
          roles.samples = [];
          roles.note = "it could not be evaluated (see the diagnostics)";
          sourceFailed(textSource.relative, err);
        }
      }
    }
    const tones = { file: proseSource?.relative ?? null, classes: [] };
    if (proseSource) {
      const union = resolveStringUnion(proseSource.absolute, PROSE_TONE_TYPE);
      try {
        const loaded = await loadSource(proseSource.absolute);
        const proseClass = loaded.exports.proseClass;
        if (typeof proseClass !== "function") {
          tones.note = "it exports no proseClass";
        } else if (!union) {
          tones.note = `no ${PROSE_TONE_TYPE} string union is declared in or re-exported through it, so only proseClass() with no tone is shown`;
          tones.classes = [{ tone: "default", className: String(proseClass()) }];
        } else {
          tones.typeName = PROSE_TONE_TYPE;
          tones.classes = union.members.map((tone) => ({ tone, className: String(proseClass({ tone })) }));
        }
      } catch (err) {
        tones.classes = [];
        tones.note = "it could not be evaluated (see the diagnostics)";
        sourceFailed(proseSource.relative, err);
      }
    }
    const assets = createRequestAssetRewriter(request);
    const { theme, css, cssDiagnostics, fontLinks, presetName } = getRequestRender(request);
    const engineOpts = makeEngineOptions(theme, presetName);
    const requireCss = buildStandaloneRequireCss(engineOpts, [], theme, presetName);
    const html = wrapInDocument(
      buildSpecimenBody({ roles, tones, surfaces: getThemeSurfaces(request) }),
      "",
      [],
      {},
      {
        themeCss: assets.css(css),
        fontLinks,
        presetName,
        themeMode: extractThemeMode(theme),
        assets,
        requireCss: requireCss.markup,
        chromeStyles: specimenStyles(themeManifest.tokenPrefix ?? "--themespot--")
      }
    );
    return {
      status: 200,
      html,
      diagnostics: [
        ...standingDiagnostics,
        ...cssDiagnostics,
        ...requireCss.diagnostics,
        ...specimenDiagnostics,
        ...assetDiagnostics(assets)
      ]
    };
  }
  __name(renderSpecimen, "renderSpecimen");
  async function getModuleFieldMetadata(modulePath) {
    if (!ssrBridge) {
      throw new Error("SSR bridge not available \u2014 module rendering is disabled");
    }
    return ssrBridge.getModuleFieldMetadata(modulePath);
  }
  __name(getModuleFieldMetadata, "getModuleFieldMetadata");
  function getThemeMetadata() {
    return {
      theme: defaultRender.theme,
      fields: fieldsJson,
      presets: allPresets,
      defaultPreset: defaultPresetName,
      manifest: themeManifest
    };
  }
  __name(getThemeMetadata, "getThemeMetadata");
  async function close() {
    if (ssrBridge) await ssrBridge.close();
  }
  __name(close, "close");
  return {
    renderPage,
    renderPageContent,
    renderString,
    renderModule: renderModuleDirect,
    renderSection,
    renderPartial,
    renderSpecimen,
    getThemeSurfaces,
    getModuleFieldMetadata,
    getThemeMetadata,
    getResolvedCss: /* @__PURE__ */ __name((request) => createRequestAssetRewriter(request).css(getRequestRender(request).css), "getResolvedCss"),
    viteMiddleware: ssrBridge?.viteMiddleware ?? null,
    close
  };
}
__name(createPageRenderer, "createPageRenderer");
function escapeAttr(str) {
  return String(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
__name(escapeAttr, "escapeAttr");
function extractThemeMode(theme) {
  return theme?.group_foundation?.theme_mode;
}
__name(extractThemeMode, "extractThemeMode");
function buildPreviewNavigationScript(templates) {
  const templatesJson = JSON.stringify(templates);
  return `<script>
(function () {
  var templates = ${templatesJson};
  function findTemplate(href) {
    var trimmed = href.replace(/^\\/+/, '').replace(/\\/+$/, '').split('?')[0].split('#')[0];
    if (!trimmed) trimmed = 'home';
    var candidates = [trimmed + '.hubl.html', trimmed.replace(/\\//g, '-') + '.hubl.html'];
    var first = trimmed.split('/')[0];
    candidates.push(first + '.hubl.html');
    for (var i = 0; i < candidates.length; i++) {
      if (templates.indexOf(candidates[i]) !== -1) return candidates[i];
    }
    // Fallback: the first template whose name starts with "<first>-"
    // (e.g. "/blog" \u2192 "blog-listing.hubl.html", "/services" \u2192 "service-page.hubl.html"
    // if naming matches). First match wins, so adjust menu data when the
    // implicit pick is wrong.
    for (var j = 0; j < templates.length; j++) {
      if (templates[j].indexOf(first + '-') === 0) return templates[j];
    }
    return null;
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href) return;
    if (href[0] === '#' || href[0] === '?') return;
    if (/^(https?:|mailto:|tel:|javascript:|data:)/i.test(href)) return;
    var match = findTemplate(href);
    if (match) {
      e.preventDefault();
      window.location.href = '?template=' + encodeURIComponent(match);
    }
  }, true);
})();
</script>`;
}
__name(buildPreviewNavigationScript, "buildPreviewNavigationScript");
var SURFACE_PREVIEW_ORDER = [
  { surface: "canvas", label: "Section 1 \u2014 Canvas" },
  { surface: "subtle", label: "Section 2 \u2014 Subtle" },
  { surface: "accent", label: "Section 3 \u2014 Accent" },
  { surface: "emphasis", label: "Section 4 \u2014 Emphasis" },
  { surface: "primary", label: "Section 5 \u2014 Primary accent" },
  { surface: "complementary", label: "Section 6 \u2014 Complementary" }
];
function buildMultiSurfaceStyles(tokenPrefix = "--themespot--") {
  return `<style id="themespot-preview-surface-styles">
  .themespot-preview-surface {
    background-color: var(--color-background, var(${tokenPrefix}surface__backgroundColor, #fff));
    color: var(--color-foreground, var(${tokenPrefix}surface__textColor, inherit));
    padding: 24px 0;
    border-bottom: 1px dashed rgba(127,127,127,0.3);
  }
  .themespot-preview-surface:last-child { border-bottom: none; }
  .themespot-preview-surface__label {
    font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    opacity: 0.55;
    padding: 0 24px 12px;
  }
  .themespot-preview-surface__body > * { margin-top: 0; margin-bottom: 0; }
</style>`;
}
__name(buildMultiSurfaceStyles, "buildMultiSurfaceStyles");
function mergeOverrides(a, b) {
  if (!a && !b) return void 0;
  if (!a) return b;
  if (!b) return a;
  const out = JSON.parse(JSON.stringify(a));
  function walk(target, source) {
    for (const key of Object.keys(source)) {
      if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key]) && target[key] && typeof target[key] === "object" && !Array.isArray(target[key])) {
        walk(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  __name(walk, "walk");
  walk(out, b);
  return out;
}
__name(mergeOverrides, "mergeOverrides");
function buildTemplateContext(themeRoots, templatePath) {
  const fullPath = locateTemplate(themeRoots, templatePath);
  if (!fullPath) {
    resolveSafePath(themeRoots.themeRoot, path4.join("templates", templatePath));
    return unreadableTemplateContext(templatePath, "it resolves to no file in the theme");
  }
  let src;
  try {
    src = hostFs.readFileSync(fullPath, "utf-8");
  } catch (err) {
    const code = err?.code;
    const cause = typeof code === "string" ? code : "the host filesystem gave no error code";
    return unreadableTemplateContext(templatePath, `reading it failed (${cause})`);
  }
  return { context: {}, diagnostics: [], contentKind: contentKindForTemplateSource(src) };
}
__name(buildTemplateContext, "buildTemplateContext");
function unreadableTemplateContext(templatePath, reason) {
  return {
    context: {},
    contentKind: null,
    diagnostics: [
      diagnostic(
        DIAGNOSTIC_CODES.TEMPLATE_CONTEXT_UNREADABLE,
        `Template ${JSON.stringify(templatePath)} could not be read to detect its templateType, so it renders with no page context (no blog post \`content\`, no listing \`contents\`) \u2014 ${reason}.`,
        { templatePath, reason }
      )
    ]
  };
}
__name(unreadableTemplateContext, "unreadableTemplateContext");
function templateContextForState(base, state) {
  if (state?.kind === "blog-post") {
    return { ...base, builtin_body_classes: `blog-post hs-content-id-${state.content.id ?? "preview"} hs-blog-post` };
  }
  if (state?.kind === "blog-listing") {
    const id = state.group?.id ?? state.content.id ?? "preview";
    return { ...base, builtin_body_classes: `blog-listing hs-content-id-${id} hs-blog-listing` };
  }
  return base;
}
__name(templateContextForState, "templateContextForState");
function buildHydrationScripts(islands, sharedStates = {}, assets) {
  if (islands.length === 0) return "";
  const rewrite = /* @__PURE__ */ __name((value) => assets ? assets.props(value) : value, "rewrite");
  const islandData = JSON.stringify(
    islands.filter((i) => i.modulePath).map((i) => ({
      id: i.id,
      modulePath: i.modulePath,
      props: rewrite(i.props),
      hydrateOn: i.hydrateOn,
      identifierPrefix: i.identifierPrefix,
      sharedStateID: i.sharedStateID,
      moduleId: i.moduleId,
      moduleName: i.moduleName,
      supplementalFieldValues: rewrite(i.supplementalFieldValues),
      resolvedDataDependencies: rewrite(i.resolvedDataDependencies)
    }))
  );
  const sharedStateScript = Object.keys(sharedStates).length > 0 ? `<script>window.__hsSSInit = Object.assign(window.__hsSSInit || {}, ${JSON.stringify(rewrite(sharedStates))});</script>` : `<script>window.__hsSSInit = window.__hsSSInit || {};</script>`;
  return [
    sharedStateScript,
    `<script type="application/json" id="__themespot_islands__">${islandData}</script>`,
    `<script type="module" src="/@id/__x00__virtual:themespot-island-hydrate"></script>`
  ].join("\n  ");
}
__name(buildHydrationScripts, "buildHydrationScripts");
function buildGoogleFontLinks(theme) {
  const fonts = /* @__PURE__ */ new Set();
  function findGoogleFonts(obj) {
    if (!obj || typeof obj !== "object") return;
    if (obj.font_set === "GOOGLE" && obj.font) {
      fonts.add(obj.font);
    }
    for (const val of Object.values(obj)) {
      if (val && typeof val === "object") findGoogleFonts(val);
    }
  }
  __name(findGoogleFonts, "findGoogleFonts");
  findGoogleFonts(theme);
  if (fonts.size === 0) return "";
  const links = Array.from(fonts).map((font) => {
    const family = font.replace(/ /g, "+");
    return `<link href="https://fonts.googleapis.com/css2?family=${family}:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet">`;
  });
  return [
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    ...links
  ].join("\n  ");
}
__name(buildGoogleFontLinks, "buildGoogleFontLinks");
var THEMESPOT_BUNDLE_CSS = "main.hubl.css";
var THEMESPOT_CSS_DIR = path4.join("assets", "_hs", "css");
var HUBSPOT_CSS_DIR = "css";
function resolveThemeCssLayout(themeRoots, manifest) {
  const build = /* @__PURE__ */ __name((subdir) => ({
    cssDir: resolveSafePath(themeRoots.themeRoot, subdir),
    cssDirs: themeRoots.roots.map((root) => resolveSafePath(root, subdir))
  }), "build");
  const themespot = build(THEMESPOT_CSS_DIR);
  if (themespot.cssDirs.some((dir) => hostFs.existsSync(dir))) {
    return { ...themespot, convention: "themespot" };
  }
  const hubspot = build(HUBSPOT_CSS_DIR);
  if (hubspot.cssDirs.some((dir) => hostFs.existsSync(dir))) {
    return { ...hubspot, convention: "hubspot" };
  }
  return { ...themespot, convention: "themespot" };
}
__name(resolveThemeCssLayout, "resolveThemeCssLayout");
function buildThemeScriptMarkup(jsLinks, moduleScripts, inlineScripts, assetUrl, resolveAsset, rootScript) {
  const parts = [];
  const seen = /* @__PURE__ */ new Set();
  for (const link of jsLinks ?? []) {
    if (!link) continue;
    if (/^https?:\/\//i.test(link)) {
      if (seen.has(link)) continue;
      seen.add(link);
      parts.push(`<script src="${escapeAttr(link)}"></script>`);
      continue;
    }
    const filePath = resolveAsset(link);
    const key = filePath ?? link;
    if (seen.has(key)) continue;
    seen.add(key);
    const url = rootScript?.(link) ?? (filePath ? assetUrl(filePath) : null);
    parts.push(`<script src="${escapeAttr(url ?? link)}"></script>`);
  }
  const seenModuleScripts = /* @__PURE__ */ new Set();
  for (const source of moduleScripts ?? []) {
    if (seenModuleScripts.has(source)) continue;
    seenModuleScripts.add(source);
    parts.push(inlineScriptElement(source));
  }
  for (const entry of inlineScripts ?? []) {
    if (entry.position !== "footer") continue;
    parts.push(inlineScriptElement(entry.source));
  }
  return parts.join("\n  ");
}
__name(buildThemeScriptMarkup, "buildThemeScriptMarkup");
function inlineScriptElement(source) {
  return `<script>${source.replace(/<\/(script)/gi, "<\\/$1")}</script>`;
}
__name(inlineScriptElement, "inlineScriptElement");
function buildHeadScriptMarkup(inlineScripts) {
  return (inlineScripts ?? []).filter((entry) => entry.position === "head").map((entry) => inlineScriptElement(entry.source)).join("\n  ");
}
__name(buildHeadScriptMarkup, "buildHeadScriptMarkup");
function buildHeadMarkup(headMarkup) {
  const seen = /* @__PURE__ */ new Set();
  const parts = [];
  for (const entry of headMarkup ?? []) {
    const source = entry.trim();
    if (!source || seen.has(source)) continue;
    seen.add(source);
    parts.push(source);
  }
  return parts.join("\n  ");
}
__name(buildHeadMarkup, "buildHeadMarkup");
function buildRequireCssMarkup(cssLinks, ctx, resolveAsset, pipelineCovered, assetUrl, rootStylesheet) {
  const diagnostics = [];
  if (!cssLinks || cssLinks.length === 0) return { markup: "", diagnostics };
  const parts = [];
  const seen = /* @__PURE__ */ new Set();
  for (const link of cssLinks) {
    if (!link) continue;
    if (/^https?:\/\//i.test(link)) {
      parts.push(`<link rel="stylesheet" href="${escapeAttr(link)}">`);
      continue;
    }
    const filePath = resolveAsset(link);
    if (!filePath || seen.has(filePath)) continue;
    if (pipelineCovered(filePath)) continue;
    seen.add(filePath);
    try {
      const rendered = renderHublCssFileWithDiagnostics(filePath, ctx);
      diagnostics.push(...rendered.diagnostics);
      const stylesheetUrl = assetUrl(filePath);
      const element = /* @__PURE__ */ __name((css) => `<style data-themespot-template-css="${escapeAttr(path4.basename(filePath))}">${css}</style>`, "element");
      parts.push(
        rootStylesheet?.(filePath, rendered.css, element) ?? element(stylesheetUrl ? rebaseInlineCssUrls(rendered.css, stylesheetUrl) : rendered.css)
      );
    } catch (err) {
      diagnostics.push(
        diagnostic(
          DIAGNOSTIC_CODES.CSS_RENDER_ERROR,
          `Template stylesheet could not be read: ${path4.basename(filePath)} \u2014 ${err instanceof Error ? err.message : String(err)}`,
          { sourceFile: path4.basename(filePath) }
        )
      );
    }
  }
  return { markup: parts.join("\n  "), diagnostics };
}
__name(buildRequireCssMarkup, "buildRequireCssMarkup");
var CSS_URL_REFERENCE = /url\(\s*(?:"([^"]*)"|'([^']*)'|([^()'"\s]+))\s*\)/g;
function rebaseInlineCssUrls(css, stylesheetUrl) {
  return css.replace(
    CSS_URL_REFERENCE,
    (whole, doubleQuoted, singleQuoted, bare) => {
      const quote = doubleQuoted !== void 0 ? '"' : singleQuoted !== void 0 ? "'" : "";
      const reference = (doubleQuoted ?? singleQuoted ?? bare ?? "").trim();
      if (reference === "" || reference.startsWith("/") || reference.startsWith("#") || reference.startsWith("//") || /^[a-z][a-z0-9+.-]*:/i.test(reference)) {
        return whole;
      }
      const resolved = new URL(reference, `http://theme.invalid${stylesheetUrl}`);
      return `url(${quote}${resolved.pathname}${resolved.search}${resolved.hash}${quote})`;
    }
  );
}
__name(rebaseInlineCssUrls, "rebaseInlineCssUrls");
function fileUrlToPath(url) {
  if (!url.startsWith("file://")) return null;
  let p = url.slice("file://".length);
  if (/^\/[A-Za-z]:/.test(p)) p = p.slice(1);
  try {
    return decodeURI(p);
  } catch {
    return p;
  }
}
__name(fileUrlToPath, "fileUrlToPath");

export {
  resolveThemeSettings,
  createAssetUrlRewriter,
  CONTENT_FIXTURE_KINDS,
  CONTENT_FIXTURE_DIRECTORY,
  contentFixtureFile,
  loadContentState,
  listContentStates,
  unknownContentStateError,
  resolveContentState,
  contentKindForTemplateSource,
  contentKindForModuleContentTypes,
  BASE_LAYOUT_CSS_ORIGIN,
  createPageRenderer,
  buildTemplateContext
};
