import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
import {
  HUBSPOT_MODULE_PREFIX
} from "./chunk-7ICA6BQD.mjs";
import {
  RendererError,
  hostFs,
  resolveSafePath
} from "./chunk-TILBP2YO.mjs";
import {
  __name
} from "./chunk-PPQVNGDG.mjs";

// src/page-content.ts
import path2 from "path";

// src/layout-sections.ts
import path from "path";
function createLayoutCollector() {
  return { areas: {}, stack: [], reports: [] };
}
__name(createLayoutCollector, "createLayoutCollector");
function gridNumber(value, fallback) {
  if (value === null || value === void 0 || value === "") return fallback;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}
__name(gridNumber, "gridNumber");
function layoutWidth(value) {
  return gridNumber(value, 12);
}
__name(layoutWidth, "layoutWidth");
function layoutOffset(value) {
  return gridNumber(value, 0);
}
__name(layoutOffset, "layoutOffset");
function layoutNode(input) {
  const node = {
    cells: [],
    cssClass: input.cssClass ?? "",
    cssId: "",
    cssStyle: ""
  };
  if (input.label !== void 0) node.label = input.label;
  node.name = input.name;
  node.params = input.params ?? {};
  node.rowMetaData = [];
  node.rows = [];
  if (input.styles !== void 0) node.styles = input.styles;
  node.type = input.type;
  node.w = input.w;
  node.x = input.x;
  return node;
}
__name(layoutNode, "layoutNode");
function namingFrame(lc) {
  for (let i = lc.stack.length - 1; i >= 0; i -= 1) {
    const frame = lc.stack[i];
    if (frame.kind === "area" || frame.kind === "partial") return frame;
  }
  return void 0;
}
__name(namingFrame, "namingFrame");
function nextLayoutName(lc, kind) {
  const frame = namingFrame(lc);
  if (!frame) return `${kind}-1`;
  const index = frame.sequence += 1;
  return `${frame.prefix}-${kind}-${index}`;
}
__name(nextLayoutName, "nextLayoutName");
function cellTarget(lc) {
  for (let i = lc.stack.length - 1; i >= 0; i -= 1) {
    const frame = lc.stack[i];
    if (frame.kind === "partial") continue;
    return frame;
  }
  return void 0;
}
__name(cellTarget, "cellTarget");
function containerFor(lc, from) {
  for (let i = from; i >= 0; i -= 1) {
    const frame = lc.stack[i];
    if (frame.kind === "partial") continue;
    return frame;
  }
  return void 0;
}
__name(containerFor, "containerFor");
function placeCell(row, node, reporters) {
  const requested = node.x;
  let offset = requested;
  while (Object.prototype.hasOwnProperty.call(row, String(offset))) offset += 1;
  if (offset !== requested) {
    node.x = offset;
    reporters?.onCollision?.(requested, offset, node);
  }
  row[String(offset)] = node;
}
__name(placeCell, "placeCell");
function addCell(lc, node, reporters) {
  const target = cellTarget(lc);
  if (!target) return;
  if (target.kind === "section" || target.kind === "row") {
    placeCell(target.cells, node, reporters);
    return;
  }
  const row = {};
  placeCell(row, node, reporters);
  target.container.rows.push(row);
  target.container.rowMetaData.push({ cssClass: "dnd-row" });
}
__name(addCell, "addCell");
function openLayoutArea(lc, name, label) {
  const node = layoutNode({ name, type: "cell", w: 12, x: 0, label });
  lc.areas[name] = node;
  const frame = { kind: "area", container: node, prefix: name, sequence: 0 };
  lc.stack.push(frame);
  return frame;
}
__name(openLayoutArea, "openLayoutArea");
function layoutAreaFrame(lc, fallbackName) {
  for (let i = lc.stack.length - 1; i >= 0; i -= 1) {
    if (lc.stack[i].kind === "area") return lc.stack[i];
  }
  const node = layoutNode({ name: fallbackName, type: "cell", w: 12, x: 0, label: "" });
  lc.areas[fallbackName] = node;
  const frame = { kind: "area", container: node, prefix: fallbackName, sequence: 0 };
  lc.stack.unshift(frame);
  return frame;
}
__name(layoutAreaFrame, "layoutAreaFrame");
function openLayoutPartial(lc) {
  const owner = namingFrame(lc);
  const sequenceBefore = owner?.sequence ?? 0;
  const index = owner ? owner.sequence += 1 : 1;
  const prefix = `${owner?.prefix ?? "dnd_area"}-dnd_partial-${index}`;
  const host = cellTarget(lc);
  const frame = {
    kind: "partial",
    prefix,
    sequence: 0,
    restore: {
      container: host?.container,
      rows: host?.container?.rows.length ?? 0,
      rowMetaData: host?.container?.rowMetaData.length ?? 0,
      cells: host?.cells,
      cellKeys: host?.cells ? Object.keys(host.cells) : [],
      owner,
      sequence: sequenceBefore,
      reports: lc.reports.length
    }
  };
  lc.stack.push(frame);
  return frame;
}
__name(openLayoutPartial, "openLayoutPartial");
function abandonLayoutPartial(lc, frame) {
  const index = lc.stack.lastIndexOf(frame);
  if (index !== -1) lc.stack.splice(index);
  const restore = frame.restore;
  if (!restore) return [];
  if (restore.container) {
    restore.container.rows.length = restore.rows;
    restore.container.rowMetaData.length = restore.rowMetaData;
  }
  if (restore.cells) {
    const kept = new Set(restore.cellKeys);
    for (const key of Object.keys(restore.cells)) {
      if (!kept.has(key)) delete restore.cells[key];
    }
  }
  if (restore.owner) restore.owner.sequence = restore.sequence;
  return lc.reports.splice(restore.reports);
}
__name(abandonLayoutPartial, "abandonLayoutPartial");
function openLayoutSection(lc, meta) {
  const frame = { kind: "section", cells: {}, meta, sequence: 0 };
  lc.stack.push(frame);
  return frame;
}
__name(openLayoutSection, "openLayoutSection");
function openLayoutRow(lc, meta) {
  const frame = { kind: "row", cells: {}, meta, sequence: 0 };
  lc.stack.push(frame);
  return frame;
}
__name(openLayoutRow, "openLayoutRow");
function openLayoutColumn(lc, input, reporters) {
  const node = layoutNode({
    name: nextLayoutName(lc, "column"),
    type: "cell",
    w: input.w,
    x: input.x,
    params: { css_class: input.cssClass },
    styles: input.styles
  });
  addCell(lc, node, reporters);
  const frame = { kind: "column", container: node, sequence: 0 };
  lc.stack.push(frame);
  return frame;
}
__name(openLayoutColumn, "openLayoutColumn");
function addLayoutModule(lc, input, reporters) {
  const node = layoutNode({
    name: nextLayoutName(lc, "module"),
    type: "custom_widget",
    w: input.w,
    x: input.x,
    params: input.params,
    styles: input.styles && Object.keys(input.styles).length > 0 ? input.styles : void 0
  });
  addCell(lc, node, reporters);
  return node;
}
__name(addLayoutModule, "addLayoutModule");
function closeLayoutFrame(lc, frame, reporters) {
  const index = lc.stack.lastIndexOf(frame);
  if (index === -1) return;
  lc.stack.splice(index, 1);
  if (frame.kind !== "section" && frame.kind !== "row") return;
  const target = containerFor(lc, index - 1);
  if (!target) return;
  if (target.kind === "section" || target.kind === "row") {
    reporters?.onFlatten?.({
      kind: frame.kind,
      into: target.kind,
      cells: Object.keys(frame.cells).length,
      styles: frame.meta?.styles
    });
    for (const node of Object.values(frame.cells)) placeCell(target.cells, node, reporters);
    return;
  }
  target.container.rows.push(frame.cells);
  target.container.rowMetaData.push(frame.meta);
}
__name(closeLayoutFrame, "closeLayoutFrame");
function layoutSectionsOf(lc) {
  return lc.areas;
}
__name(layoutSectionsOf, "layoutSectionsOf");
function layoutLength(value) {
  if (typeof value === "number") return Number.isFinite(value) ? { units: "px", value } : null;
  if (typeof value !== "string") return null;
  const match = /^\s*(-?\d*\.?\d+)\s*(px|rem|em|%|vh|vw|vmin|vmax|ch|ex|pt|pc|cm|mm|in)?\s*$/i.exec(value);
  if (!match) return null;
  const parsed = Number(match[1]);
  if (!Number.isFinite(parsed)) return null;
  return { units: (match[2] ?? "px").toLowerCase(), value: parsed };
}
__name(layoutLength, "layoutLength");
function layoutPadding(padding) {
  if (!padding || typeof padding !== "object") return null;
  const source = padding;
  const out = {};
  for (const side of ["top", "right", "bottom", "left"]) {
    const length = layoutLength(source[side]);
    if (length) out[side] = length;
  }
  return Object.keys(out).length > 0 ? { padding: out } : null;
}
__name(layoutPadding, "layoutPadding");
function layoutColour(value) {
  if (!value) return null;
  if (typeof value === "object") {
    const source = value;
    if (typeof source.r === "number") {
      return {
        r: Number(source.r) || 0,
        g: Number(source.g) || 0,
        b: Number(source.b) || 0,
        a: Number.isFinite(Number(source.a)) ? Number(source.a) : 1
      };
    }
    if (typeof source.color === "string") return layoutColour(source.color);
    return null;
  }
  if (typeof value !== "string") return null;
  const hex = value.trim().replace(/^#/, "");
  const expanded = hex.length === 3 || hex.length === 4 ? hex.split("").map((character) => character + character).join("") : hex;
  if (!/^[0-9a-f]{6}([0-9a-f]{2})?$/i.test(expanded)) return null;
  const channel = /* @__PURE__ */ __name((at) => parseInt(expanded.slice(at, at + 2), 16), "channel");
  return {
    r: channel(0),
    g: channel(2),
    b: channel(4),
    a: expanded.length === 8 ? Number((channel(6) / 255).toFixed(3)) : 1
  };
}
__name(layoutColour, "layoutColour");
var DND_VERTICAL_POSITIONS = /* @__PURE__ */ new Set(["TOP", "MIDDLE", "BOTTOM"]);
var DND_FLEXBOX_POSITIONS = /* @__PURE__ */ new Set([
  "TOP_LEFT",
  "TOP_CENTER",
  "TOP_RIGHT",
  "MIDDLE_LEFT",
  "MIDDLE_CENTER",
  "MIDDLE_RIGHT",
  "BOTTOM_LEFT",
  "BOTTOM_CENTER",
  "BOTTOM_RIGHT"
]);
function layoutFlexboxPositioning(kwargs) {
  const explicit = String(kwargs.flexbox_positioning ?? "").trim().toUpperCase();
  if (explicit) return DND_FLEXBOX_POSITIONS.has(explicit) ? explicit : null;
  const horizontal = String(kwargs.horizontal_alignment ?? "").trim().toUpperCase();
  if (!horizontal) return null;
  const vertical = String(kwargs.vertical_alignment ?? "").trim().toUpperCase();
  const token = `${DND_VERTICAL_POSITIONS.has(vertical) ? vertical : "TOP"}_${horizontal}`;
  return DND_FLEXBOX_POSITIONS.has(token) ? token : null;
}
__name(layoutFlexboxPositioning, "layoutFlexboxPositioning");
function layoutStyles(kwargs, options = {}) {
  const styles = {};
  const backgroundColor = layoutColour(kwargs.background_color);
  if (backgroundColor) styles.backgroundColor = backgroundColor;
  const backgroundImage = kwargs.background_image;
  if (backgroundImage && typeof backgroundImage === "object") {
    const imageUrl = backgroundImage.imageUrl;
    if (typeof imageUrl === "string" && imageUrl.trim()) {
      const stored = { imageUrl: imageUrl.trim() };
      const size = backgroundImage.backgroundSize;
      const position = backgroundImage.backgroundPosition;
      if (typeof size === "string" && size.trim()) stored.backgroundSize = size.trim();
      if (typeof position === "string" && position.trim()) stored.backgroundPosition = position.trim();
      styles.backgroundImage = stored;
    }
  }
  const padding = kwargs.padding;
  if (padding && typeof padding === "object") {
    const source = padding;
    const hasBreakpoints = "default" in source || "mobile" in source;
    const breakpoints = {};
    const base = layoutPadding(hasBreakpoints ? source.default : source);
    const mobile = layoutPadding(source.mobile);
    if (base) breakpoints.default = base;
    if (mobile) breakpoints.mobile = mobile;
    if (Object.keys(breakpoints).length > 0) styles.breakpointStyles = breakpoints;
  }
  if (options.section) styles.forceFullWidthSection = Boolean(kwargs.full_width);
  const maxWidth = layoutLength(kwargs.max_width);
  if (maxWidth && maxWidth.units === "px") styles.maxWidthSectionCentering = maxWidth.value;
  const alignment = String(kwargs.vertical_alignment ?? "").trim().toUpperCase();
  if (DND_VERTICAL_POSITIONS.has(alignment)) styles.verticalAlignment = alignment;
  const positioning = layoutFlexboxPositioning(kwargs);
  if (positioning) styles.flexboxPositioning = positioning;
  return styles;
}
__name(layoutStyles, "layoutStyles");
function layoutCssClass(structural, kwargs) {
  const extra = typeof kwargs.class === "string" ? kwargs.class.trim() : "";
  return extra ? `${structural} ${extra}` : structural;
}
__name(layoutCssClass, "layoutCssClass");
function stripModuleSuffix(reference) {
  return reference.endsWith(".module") ? reference.slice(0, -".module".length) : reference;
}
__name(stripModuleSuffix, "stripModuleSuffix");
function portalRootFor(themeRoots, root) {
  for (const [project, themes] of Object.entries(themeRoots.projects ?? {})) {
    for (const [themeName, themePath] of Object.entries(themes)) {
      if (path.resolve(themePath) === path.resolve(root)) return `@projects/${project}/${themeName}`;
    }
  }
  return `/${path.basename(root)}`;
}
__name(portalRootFor, "portalRootFor");
function portalModulePath(reference, themeRoots, resolvedDir) {
  const raw = String(reference ?? "").trim();
  if (!raw) return "";
  if (raw.startsWith("@") || raw.startsWith("/")) return stripModuleSuffix(raw);
  if (resolvedDir) {
    for (const root of themeRoots.roots) {
      const relative2 = path.relative(root, resolvedDir).replace(/\\/g, "/");
      if (relative2 && !relative2.startsWith("..") && !path.isAbsolute(relative2)) {
        return `${portalRootFor(themeRoots, root)}/${stripModuleSuffix(relative2)}`;
      }
    }
  }
  const relative = raw.replace(/^(?:\.\.\/)+/, "").replace(/^\.\//, "").replace(/\\/g, "/");
  return `${portalRootFor(themeRoots, themeRoots.themeRoot)}/${stripModuleSuffix(relative)}`;
}
__name(portalModulePath, "portalModulePath");
var LAYOUT_MODULE_FIXED_PARAMS = Object.freeze({
  child_css: {},
  css: {},
  css_class: "dnd-module",
  schema_version: 2,
  smart_objects: [],
  smart_type: "NOT_SMART",
  wrap_field_tag: "div"
});
var LAYOUT_MODULE_NON_PARAMS = /* @__PURE__ */ new Set([
  "path",
  "offset",
  "width",
  "horizontal_alignment",
  "flexbox_positioning",
  "_positional",
  "padding",
  "background_color",
  "background_image",
  "vertical_alignment",
  "max_width",
  "full_width"
]);
function layoutModuleParams(kwargs, modulePath) {
  const params = { ...LAYOUT_MODULE_FIXED_PARAMS, path: modulePath };
  for (const [key, value] of Object.entries(kwargs)) {
    if (LAYOUT_MODULE_NON_PARAMS.has(key)) continue;
    params[key] = value;
  }
  return params;
}
__name(layoutModuleParams, "layoutModuleParams");

// src/page-content.ts
var PAGE_GAP_REASONS = /* @__PURE__ */ new Set([
  "module-unknown",
  "module-removed",
  "module-theme-unavailable"
]);
function createPageBindingState(binding) {
  return {
    binding,
    consumedAreas: /* @__PURE__ */ new Set(),
    boundWidgets: /* @__PURE__ */ new Set(),
    records: [],
    reportedGaps: /* @__PURE__ */ new Set(),
    globalDepth: 0
  };
}
__name(createPageBindingState, "createPageBindingState");
function summarisePageRecords(records, templateDrawn) {
  const gaps = [];
  let drawn = 0;
  for (const record of records) {
    if (record.gap === null) {
      drawn += 1;
      continue;
    }
    gaps.push({ path: record.path, ...record.instance ? { instance: record.instance } : {}, reason: record.gap });
  }
  return { templateDrawn, modules: { total: records.length, drawn, gaps } };
}
__name(summarisePageRecords, "summarisePageRecords");
function isPlainRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
__name(isPlainRecord, "isPlainRecord");
function normalisePortalPath(value) {
  return normaliseRootPath(value).replace(/\.module$/, "");
}
__name(normalisePortalPath, "normalisePortalPath");
function normaliseRootPath(value) {
  return value.trim().replace(/\\/g, "/").replace(/\/{2,}/g, "/").replace(/^\/+/, "").replace(/\/+$/, "");
}
__name(normaliseRootPath, "normaliseRootPath");
function pageRootBinding(root, dir, themeId, themeName) {
  const portalRoot = normaliseRootPath(String(root ?? ""));
  if (!portalRoot) return null;
  return {
    portalRoot,
    root: String(root).trim(),
    dir,
    themeId: typeof themeId === "string" && themeId.trim() ? themeId.trim() : null,
    themeName: typeof themeName === "string" && themeName.trim() ? themeName.trim() : null
  };
}
__name(pageRootBinding, "pageRootBinding");
var NON_FIELD_PARAMS = /* @__PURE__ */ new Set([
  ...Object.keys(LAYOUT_MODULE_FIXED_PARAMS),
  "path",
  "module_id"
]);
function moduleNodeProps(params) {
  const props = {};
  for (const [key, value] of Object.entries(params)) {
    if (NON_FIELD_PARAMS.has(key)) continue;
    props[key] = value;
  }
  return props;
}
__name(moduleNodeProps, "moduleNodeProps");
function widgetProps(widget) {
  if (!isPlainRecord(widget)) return {};
  if (isPlainRecord(widget.body)) return moduleNodeProps(widget.body);
  if (isPlainRecord(widget.params)) return moduleNodeProps(widget.params);
  const props = moduleNodeProps(widget);
  for (const key of ["id", "name", "label", "order", "type", "smart_type", "styles", "deleted_at"]) delete props[key];
  return props;
}
__name(widgetProps, "widgetProps");
function themeClasses(cssClass, structural) {
  if (typeof cssClass !== "string") return "";
  return cssClass.split(/\s+/).filter((token) => token && token !== structural).join(" ");
}
__name(themeClasses, "themeClasses");
function storedLength(value) {
  if (typeof value === "number") return Number.isFinite(value) ? `${value}px` : null;
  if (typeof value === "string") return value.trim() || null;
  if (!isPlainRecord(value)) return null;
  const numeric = Number(value.value);
  if (!Number.isFinite(numeric)) return null;
  const units = typeof value.units === "string" && value.units.trim() ? value.units.trim() : "px";
  return `${numeric}${units}`;
}
__name(storedLength, "storedLength");
function storedPadding(breakpoint) {
  if (!isPlainRecord(breakpoint) || !isPlainRecord(breakpoint.padding)) return null;
  const out = {};
  for (const side of ["top", "right", "bottom", "left"]) {
    const length = storedLength(breakpoint.padding[side]);
    if (length !== null) out[side] = length;
  }
  return Object.keys(out).length > 0 ? out : null;
}
__name(storedPadding, "storedPadding");
function kwargsFromStoredStyles(styles, cssClass, structural) {
  const kwargs = {};
  const extra = themeClasses(cssClass, structural);
  if (extra) kwargs.class = extra;
  if (!isPlainRecord(styles)) return kwargs;
  if (styles.backgroundColor) kwargs.background_color = styles.backgroundColor;
  if (isPlainRecord(styles.backgroundImage)) kwargs.background_image = styles.backgroundImage;
  if (isPlainRecord(styles.breakpointStyles)) {
    const base = storedPadding(styles.breakpointStyles.default);
    const mobile = storedPadding(styles.breakpointStyles.mobile);
    if (base || mobile) {
      kwargs.padding = {
        ...base ? { default: base } : {},
        ...mobile ? { mobile } : {}
      };
    }
  }
  if (styles.forceFullWidthSection === true) kwargs.full_width = true;
  if (typeof styles.maxWidthSectionCentering === "number") kwargs.max_width = styles.maxWidthSectionCentering;
  if (typeof styles.verticalAlignment === "string") kwargs.vertical_alignment = styles.verticalAlignment;
  if (typeof styles.flexboxPositioning === "string") kwargs.flexbox_positioning = styles.flexboxPositioning;
  return kwargs;
}
__name(kwargsFromStoredStyles, "kwargsFromStoredStyles");
function columnKwargs(node) {
  const params = isPlainRecord(node.params) ? node.params : {};
  const cssClass = typeof node.cssClass === "string" && node.cssClass ? node.cssClass : typeof params.css_class === "string" ? params.css_class : "";
  return {
    ...kwargsFromStoredStyles(node.styles, cssClass, "dnd-column"),
    width: gridNumber2(node.w, 12),
    offset: gridNumber2(node.x, 0)
  };
}
__name(columnKwargs, "columnKwargs");
function gridNumber2(value, fallback) {
  if (value === null || value === void 0 || value === "") return fallback;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}
__name(gridNumber2, "gridNumber");
function cellsInOrder(row, handlers, where) {
  const cells = [];
  for (const [key, node] of Object.entries(row)) {
    if (!isPlainRecord(node)) {
      handlers.invalid(`${where} \u203A cell ${JSON.stringify(key)}`, "is not a layout node");
      continue;
    }
    cells.push({ node, x: gridNumber2(node.x, gridNumber2(key, 0)) });
  }
  return cells.sort((a, b) => a.x - b.x).map((entry) => entry.node);
}
__name(cellsInOrder, "cellsInOrder");
function renderPageArea(area, handlers, areaName) {
  const rows = Array.isArray(area.rows) ? area.rows : [];
  const meta = Array.isArray(area.rowMetaData) ? area.rowMetaData : [];
  const parts = [];
  rows.forEach((row, index) => {
    if (!isPlainRecord(row)) {
      handlers.invalid(`${areaName} row ${index}`, "is not an object of cells keyed by offset");
      return;
    }
    const rowMeta = isPlainRecord(meta[index]) ? meta[index] : {};
    parts.push(
      handlers.section(
        kwargsFromStoredStyles(rowMeta.styles, rowMeta.cssClass, "dnd-section"),
        () => renderCells(row, handlers, `${areaName} row ${index}`)
      )
    );
  });
  return parts.join("\n");
}
__name(renderPageArea, "renderPageArea");
function renderCells(row, handlers, where) {
  const parts = [];
  for (const node of cellsInOrder(row, handlers, where)) {
    if (node.type === "custom_widget") {
      parts.push(handlers.module(node));
      continue;
    }
    if (node.type === "cell") {
      parts.push(handlers.column(columnKwargs(node), () => renderColumnRows(node, handlers, `${where} \u203A ${String(node.name ?? "column")}`)));
      continue;
    }
    handlers.invalid(`${where} \u203A ${String(node.name ?? "?")}`, `has type ${JSON.stringify(node.type ?? null)}, not a cell or a custom_widget`);
  }
  return parts.join("\n");
}
__name(renderCells, "renderCells");
function renderColumnRows(column, handlers, where) {
  const rows = Array.isArray(column.rows) ? column.rows : [];
  const meta = Array.isArray(column.rowMetaData) ? column.rowMetaData : [];
  const parts = [];
  rows.forEach((row, index) => {
    if (!isPlainRecord(row)) {
      handlers.invalid(`${where} row ${index}`, "is not an object of cells keyed by offset");
      return;
    }
    const rowMeta = isPlainRecord(meta[index]) ? meta[index] : {};
    parts.push(
      handlers.row(
        kwargsFromStoredStyles(rowMeta.styles, rowMeta.cssClass, "dnd-row"),
        () => renderCells(row, handlers, `${where} row ${index}`)
      )
    );
  });
  return parts.join("\n");
}
__name(renderColumnRows, "renderColumnRows");
function moduleDirUnder(root, relative) {
  const cleaned = relative.replace(/\\/g, "/").replace(/^\/+/, "");
  if (!cleaned) return null;
  const candidates = cleaned.endsWith(".module") ? [cleaned] : [cleaned, `${cleaned}.module`];
  for (const candidate of candidates) {
    let resolved;
    try {
      resolved = resolveSafePath(root, candidate);
    } catch (err) {
      if (err instanceof RendererError) continue;
      throw err;
    }
    try {
      if (hostFs.existsSync(resolved) && hostFs.statSync(resolved).isDirectory()) return resolved;
    } catch {
    }
  }
  return null;
}
__name(moduleDirUnder, "moduleDirUnder");
function matchRoot(roots, modulePath) {
  const normalised = normaliseRootPath(modulePath);
  return roots.filter((root) => normalised.startsWith(`${root.portalRoot}/`)).sort((a, b) => b.portalRoot.length - a.portalRoot.length).map((root) => ({ root, rest: normalised.slice(root.portalRoot.length + 1) }));
}
__name(matchRoot, "matchRoot");
function singleRootThemeRoots(dir, projects = {}) {
  return { themeRoot: dir, roots: [dir], projects, diagnostics: [] };
}
__name(singleRootThemeRoots, "singleRootThemeRoots");
function resolvePageModule(binding, cascade, modulePath, resolveInCascade) {
  for (const { root, rest } of matchRoot(binding.cascadeRoots, modulePath)) {
    const dir = moduleDirUnder(root.dir, rest);
    if (dir) return { dir, themeRoots: cascade };
  }
  const cascaded = resolveInCascade(cascade, modulePath);
  if (cascaded) return { dir: cascaded, themeRoots: cascade };
  for (const { root, rest } of matchRoot(binding.extraRoots, modulePath)) {
    const dir = moduleDirUnder(root.dir, rest);
    if (dir) return { dir, themeRoots: singleRootThemeRoots(root.dir, cascade.projects), root };
  }
  return null;
}
__name(resolvePageModule, "resolvePageModule");
function isHubspotModulePath(modulePath) {
  return normaliseRootPath(modulePath).startsWith(HUBSPOT_MODULE_PREFIX);
}
__name(isHubspotModulePath, "isHubspotModulePath");
function lookupModuleInfo(modules, modulePath) {
  const wanted = normalisePortalPath(modulePath);
  if (!wanted) return null;
  for (const entry of modules) {
    if (isPlainRecord(entry) && typeof entry.path === "string" && normalisePortalPath(entry.path) === wanted) {
      return entry;
    }
  }
  return null;
}
__name(lookupModuleInfo, "lookupModuleInfo");
function themeSupplied(binding, info) {
  const id = typeof info.themeId === "string" ? info.themeId.trim() : "";
  const name = typeof info.themeName === "string" ? info.themeName.trim() : "";
  return binding.suppliedThemes.some(
    (theme) => id !== "" && theme.themeId === id || name !== "" && theme.themeName === name
  );
}
__name(themeSupplied, "themeSupplied");
function unresolvedGapReason(binding, info) {
  if (info && (info.themeId || info.themeName) && !themeSupplied(binding, info)) return "module-theme-unavailable";
  return "module-unknown";
}
__name(unresolvedGapReason, "unresolvedGapReason");
function gapThemeLabel(binding, info) {
  if (!info) return null;
  if (typeof info.themeName === "string" && info.themeName.trim()) return info.themeName.trim();
  const id = typeof info.themeId === "string" ? info.themeId.trim() : "";
  if (!id) return null;
  const supplied = binding.suppliedThemes.find((theme) => theme.themeId === id && theme.themeName);
  return supplied?.themeName ?? id;
}
__name(gapThemeLabel, "gapThemeLabel");
function gapCardText(themeLabel) {
  return themeLabel ? `Module from ${themeLabel} \xB7 can't be drawn here` : "Unrecognised module";
}
__name(gapCardText, "gapCardText");
function routedModuleGap(html) {
  const trimmed = html.trimStart();
  if (trimmed.startsWith("<!-- MODULE_SHAPE_UNRECOGNISED")) return "module-shape-unrecognised";
  const placeholder = /^<div class="themespot-module-placeholder"[^>]*>/.exec(trimmed);
  if (!placeholder) return null;
  const reason = /\sdata-module-reason="([^"]*)"/.exec(placeholder[0]);
  if (reason) return reason[1];
  if (/\sdata-module-error="/.test(placeholder[0])) return "module-render-failed";
  return null;
}
__name(routedModuleGap, "routedModuleGap");
function safeInstanceName(name) {
  return typeof name === "string" && /^[A-Za-z0-9_][\w-]*$/.test(name) ? name : null;
}
__name(safeInstanceName, "safeInstanceName");
function snakeCase(key) {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1_$2").replace(/([A-Z])([A-Z][a-z])/g, "$1_$2").toLowerCase();
}
__name(snakeCase, "snakeCase");
function pageContentFields(content) {
  const out = { ...content };
  for (const [key, value] of Object.entries(content)) {
    const snake = snakeCase(key);
    if (snake !== key && !(snake in out)) out[snake] = value;
  }
  if ("url" in out && !("absolute_url" in out)) out.absolute_url = out.url;
  return out;
}
__name(pageContentFields, "pageContentFields");
function normaliseRootDir(dir) {
  try {
    return resolveSafePath(dir, ".");
  } catch {
    return path2.resolve(dir);
  }
}
__name(normaliseRootDir, "normaliseRootDir");

export {
  createLayoutCollector,
  layoutWidth,
  layoutOffset,
  openLayoutArea,
  layoutAreaFrame,
  openLayoutPartial,
  abandonLayoutPartial,
  openLayoutSection,
  openLayoutRow,
  openLayoutColumn,
  addLayoutModule,
  closeLayoutFrame,
  layoutSectionsOf,
  layoutStyles,
  layoutCssClass,
  portalModulePath,
  layoutModuleParams,
  PAGE_GAP_REASONS,
  createPageBindingState,
  summarisePageRecords,
  isPlainRecord,
  normalisePortalPath,
  normaliseRootPath,
  pageRootBinding,
  moduleNodeProps,
  widgetProps,
  kwargsFromStoredStyles,
  columnKwargs,
  gridNumber2 as gridNumber,
  renderPageArea,
  moduleDirUnder,
  singleRootThemeRoots,
  resolvePageModule,
  isHubspotModulePath,
  lookupModuleInfo,
  unresolvedGapReason,
  gapThemeLabel,
  gapCardText,
  routedModuleGap,
  safeInstanceName,
  pageContentFields,
  normaliseRootDir
};
