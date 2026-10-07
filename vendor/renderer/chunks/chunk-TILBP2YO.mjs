import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
import {
  __name
} from "./chunk-PPQVNGDG.mjs";

// src/host-fs-default.ts
import fs from "fs";
var defaultHostFs = {
  existsSync: /* @__PURE__ */ __name((pathname) => fs.existsSync(pathname), "existsSync"),
  readFileSync: /* @__PURE__ */ __name((pathname, encoding) => fs.readFileSync(pathname, encoding), "readFileSync"),
  readdirSync: /* @__PURE__ */ __name((pathname) => fs.readdirSync(pathname), "readdirSync"),
  statSync: /* @__PURE__ */ __name((pathname) => fs.statSync(pathname), "statSync"),
  realpathSync: { native: /* @__PURE__ */ __name((pathname) => fs.realpathSync.native(pathname), "native") },
  mkdirSync: /* @__PURE__ */ __name((pathname, options) => {
    fs.mkdirSync(pathname, options);
  }, "mkdirSync"),
  writeFileSync: /* @__PURE__ */ __name((pathname, data, encoding) => fs.writeFileSync(pathname, data, encoding ?? "utf-8"), "writeFileSync")
};

// src/host-fs.ts
var active = defaultHostFs;
function setHostFs(implementation) {
  active = implementation;
}
__name(setHostFs, "setHostFs");
function getHostFs() {
  return active;
}
__name(getHostFs, "getHostFs");
var hostFs = {
  existsSync: /* @__PURE__ */ __name((pathname) => active.existsSync(pathname), "existsSync"),
  readFileSync: /* @__PURE__ */ __name((pathname, encoding) => active.readFileSync(pathname, encoding), "readFileSync"),
  readdirSync: /* @__PURE__ */ __name((pathname) => active.readdirSync(pathname), "readdirSync"),
  statSync: /* @__PURE__ */ __name((pathname) => active.statSync(pathname), "statSync"),
  realpathSync: { native: /* @__PURE__ */ __name((pathname) => active.realpathSync.native(pathname), "native") },
  mkdirSync: /* @__PURE__ */ __name((pathname, options) => active.mkdirSync(pathname, options), "mkdirSync"),
  writeFileSync: /* @__PURE__ */ __name((pathname, data, encoding) => active.writeFileSync(pathname, data, encoding), "writeFileSync")
};

// src/safe-path.ts
import path from "path";
var THEME_REJECTED_PATH_TRAVERSAL = "THEME_REJECTED_PATH_TRAVERSAL";
var RendererError = class extends Error {
  static {
    __name(this, "RendererError");
  }
  code;
  details;
  constructor(code, message, details) {
    super(message);
    this.name = "RendererError";
    this.code = code;
    this.details = details;
  }
};
var realRootCache = /* @__PURE__ */ new Map();
function realpathExisting(pathname) {
  return hostFs.realpathSync.native(pathname);
}
__name(realpathExisting, "realpathExisting");
function getRealRoot(themeRoot) {
  const resolvedRoot = path.resolve(themeRoot);
  let realRoot = realRootCache.get(resolvedRoot);
  if (!realRoot) {
    try {
      realRoot = realpathExisting(resolvedRoot);
    } catch {
      realRoot = resolveWithNearestExistingParent(resolvedRoot);
    }
    realRootCache.set(resolvedRoot, realRoot);
  }
  return realRoot;
}
__name(getRealRoot, "getRealRoot");
function isInside(root, candidate) {
  const relative = path.relative(root, candidate);
  return relative === "" || !relative.startsWith("..") && !path.isAbsolute(relative);
}
__name(isInside, "isInside");
function resolveWithNearestExistingParent(candidate) {
  const missingSegments = [];
  let current = candidate;
  while (!hostFs.existsSync(current)) {
    const parent = path.dirname(current);
    if (parent === current) break;
    missingSegments.unshift(path.basename(current));
    current = parent;
  }
  const realParent = realpathExisting(current);
  return missingSegments.length > 0 ? path.join(realParent, ...missingSegments) : realParent;
}
__name(resolveWithNearestExistingParent, "resolveWithNearestExistingParent");
function resolveSafePath(themeRoot, candidate, context = {}) {
  const realRoot = getRealRoot(themeRoot);
  const resolvedCandidate = path.isAbsolute(candidate) ? path.resolve(candidate) : path.resolve(realRoot, candidate);
  let realCandidate;
  try {
    realCandidate = realpathExisting(resolvedCandidate);
  } catch {
    realCandidate = resolveWithNearestExistingParent(resolvedCandidate);
  }
  if (!isInside(realRoot, realCandidate)) {
    const reference = context.reference ?? candidate;
    const source = context.sourceFile ? ` in ${context.sourceFile}` : "";
    throw new RendererError(
      THEME_REJECTED_PATH_TRAVERSAL,
      `${THEME_REJECTED_PATH_TRAVERSAL}: rejected theme path reference ${JSON.stringify(reference)}${source}`,
      {
        themeRoot: realRoot,
        candidate: resolvedCandidate,
        resolvedPath: realCandidate,
        reference,
        sourceFile: context.sourceFile
      }
    );
  }
  return realCandidate;
}
__name(resolveSafePath, "resolveSafePath");

export {
  setHostFs,
  getHostFs,
  hostFs,
  RendererError,
  resolveSafePath
};
