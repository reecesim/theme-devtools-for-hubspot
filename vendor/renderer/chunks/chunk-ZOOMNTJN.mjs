import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
import {
  EMBEDDED_FIXTURES
} from "./chunk-S62FVW6S.mjs";
import {
  DIAGNOSTIC_CODES,
  SCOPE_CONTEXT_VARIABLE,
  diagnostic,
  hexToRgb,
  wrapScopedInstance
} from "./chunk-W5TSNL56.mjs";
import {
  HUBSPOT_MODULE_PREFIX,
  builtinDefaultModule,
  defaultModuleDisplayName,
  defaultModulePlaceholderSource,
  hubspotDefaultModuleDir,
  hubspotDefaultModuleSlug,
  isMalformedHubspotDefaultModuleRef,
  portalDataRequirement
} from "./chunk-7ICA6BQD.mjs";
import {
  RendererError,
  hostFs,
  resolveSafePath
} from "./chunk-TILBP2YO.mjs";
import {
  __name
} from "./chunk-PPQVNGDG.mjs";

// src/module-loader.ts
import path5 from "path";

// src/theme-roots.ts
import path2 from "path";

// src/theme-metadata-validator.ts
import path from "path";
var PATH_KEY_RE = /(^|_)(path|file|filename|filepath|src|asset|image|icon|template|partial|module|extends)(_|$)/i;
var SAFE_SCHEME_RE = /^(?:[a-z][a-z0-9+.-]*:|#|\{\{|theme\.|@hubspot\/)/i;
function shouldValidatePathValue(key, value) {
  const trimmed = value.trim();
  if (!trimmed || SAFE_SCHEME_RE.test(trimmed)) return false;
  if (key === "property_value_paths" || key === "controlling_field_path") return false;
  if (PATH_KEY_RE.test(key)) return true;
  return trimmed.startsWith("../") || trimmed.startsWith("..\\") || trimmed.includes("/../") || trimmed.includes("\\..\\");
}
__name(shouldValidatePathValue, "shouldValidatePathValue");
function validateReference(themeRoots, sourceFile, keyPath, value) {
  if (value.startsWith("@projects/") || value.startsWith("@marketplace/")) return;
  const sourceDir = path.dirname(sourceFile);
  const absoluteSourceDir = path.resolve(sourceDir);
  const candidate = path.isAbsolute(value) ? value : path.resolve(absoluteSourceDir, value);
  const root = themeRoots.roots.find((themeRoot) => {
    const relative = path.relative(path.resolve(themeRoot), absoluteSourceDir);
    return relative === "" || !relative.startsWith("..") && !path.isAbsolute(relative);
  }) ?? themeRoots.themeRoot;
  resolveSafePath(root, candidate, { reference: value, sourceFile: `${sourceFile}:${keyPath}` });
}
__name(validateReference, "validateReference");
function validateThemeMetadataPaths(themeRoots, sourceFile, value) {
  function walk(node, keyPath) {
    if (typeof node === "string") {
      const key = keyPath.split(".").pop() ?? "";
      if (shouldValidatePathValue(key, node)) validateReference(themeRoots, sourceFile, keyPath, node);
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((child, index) => walk(child, `${keyPath}[${index}]`));
      return;
    }
    if (node && typeof node === "object") {
      for (const [key, child] of Object.entries(node)) {
        walk(child, keyPath ? `${keyPath}.${key}` : key);
      }
    }
  }
  __name(walk, "walk");
  walk(value, "");
}
__name(validateThemeMetadataPaths, "validateThemeMetadataPaths");

// src/theme-roots.ts
var PROJECT_REF_RE = /^@projects\/([^/]+)\/([^/]+)(?:\/(.*))?$/;
var MARKETPLACE_REF_PREFIX = "@marketplace/";
function parseProjectThemeRef(ref) {
  const match = ref.match(PROJECT_REF_RE);
  if (!match) return null;
  return { project: match[1], themeName: match[2], rest: match[3] ?? "" };
}
__name(parseProjectThemeRef, "parseProjectThemeRef");
function isMarketplaceThemeRef(ref) {
  return ref.startsWith(MARKETPLACE_REF_PREFIX);
}
__name(isMarketplaceThemeRef, "isMarketplaceThemeRef");
function themeNameFromRef(ref) {
  const segments = ref.split("/").filter(Boolean);
  return segments[segments.length - 1] ?? ref;
}
__name(themeNameFromRef, "themeNameFromRef");
function readThemeManifestSource(themeRoot) {
  const filePath = resolveSafePath(themeRoot, "theme.json");
  if (!hostFs.existsSync(filePath)) return null;
  return { filePath, source: hostFs.readFileSync(filePath, "utf-8") };
}
__name(readThemeManifestSource, "readThemeManifestSource");
function readThemeManifest(themeRoot, diagnostics) {
  const manifest = readThemeManifestSource(themeRoot);
  if (!manifest) return null;
  let value;
  try {
    value = JSON.parse(manifest.source);
  } catch (err) {
    diagnostics.push(manifestUnreadableDiagnostic(themeRoot, manifest.filePath, err));
    return null;
  }
  if (!value || typeof value !== "object") {
    diagnostics.push(manifestUnreadableDiagnostic(themeRoot, manifest.filePath));
    return null;
  }
  return { filePath: manifest.filePath, value };
}
__name(readThemeManifest, "readThemeManifest");
function manifestUnreadableDiagnostic(themeRoot, themeJsonPath, err) {
  const reason = err instanceof Error ? err.message : "it is not a JSON object";
  return diagnostic(
    DIAGNOSTIC_CODES.THEME_MANIFEST_FALLBACK,
    `Theme '${path2.basename(themeRoot)}' has a theme.json the renderer could not read (${themeJsonPath}): ${reason}. It is treated as declaring nothing, so any parent it names with 'extends' is absent from the cascade and the inheritance checks could not run against it. Fix the JSON to restore theme metadata and parent resolution.`,
    { themeRoot, themeJsonPath, reason }
  );
}
__name(manifestUnreadableDiagnostic, "manifestUnreadableDiagnostic");
function readDeclaredExtends(themeRoot, diagnostics) {
  const manifest = readThemeManifest(themeRoot, diagnostics);
  if (!manifest) return null;
  const ref = typeof manifest.value.extends === "string" ? manifest.value.extends.trim() : "";
  return ref ? { ref, filePath: manifest.filePath } : null;
}
__name(readDeclaredExtends, "readDeclaredExtends");
function describeSearchedPaths(projects) {
  const searched = [];
  for (const [project, themes] of Object.entries(projects)) {
    for (const [themeName, themePath] of Object.entries(themes)) {
      searched.push(`@projects/${project}/${themeName} -> ${themePath}`);
    }
  }
  return searched;
}
__name(describeSearchedPaths, "describeSearchedPaths");
function parentMissingDiagnostic(input) {
  const { extendsRef, childThemeRoot, themeJsonPath, projects, marketplace } = input;
  const childName = path2.basename(childThemeRoot);
  const parentName = themeNameFromRef(extendsRef);
  const searched = describeSearchedPaths(projects);
  const searchedText = searched.length > 0 ? `Searched: ${searched.join("; ")}. The parentThemeRoot option was not set.` : "Searched: nothing \u2014 no parentThemeRoot was supplied and the projects registry was empty.";
  const remedy = marketplace ? `HubSpot does not allow the source of a marketplace theme to be downloaded, so the renderer cannot fetch it. Copy the installed theme's files out of the portal into a local folder and pass parentThemeRoot: '/absolute/path/to/${parentName}'.` : `Pass parentThemeRoot: '/absolute/path/to/${parentName}', or register it as projects: { '${input.project ?? "<project>"}': { '${parentName}': '/absolute/path/to/${parentName}' } }. If you do not have the parent locally, run \`hs cms fetch ${parentName}\` first.`;
  return diagnostic(
    DIAGNOSTIC_CODES.INHERITANCE_PARENT_MISSING,
    `Child theme '${childName}' extends '${extendsRef}' but that parent theme was not supplied to the renderer, so only the child's own files are in the cascade. ${searchedText} ${remedy}`,
    {
      extendsRef,
      parentTheme: parentName,
      childTheme: childName,
      childThemeRoot,
      themeJsonPath,
      searched,
      variant: marketplace ? "marketplace" : "custom"
    }
  );
}
__name(parentMissingDiagnostic, "parentMissingDiagnostic");
function tooDeepDiagnostic(input) {
  const { parentThemeRoot, grandparentRef, parentThemeJsonPath, childThemeRoot } = input;
  const parentName = path2.basename(parentThemeRoot);
  const grandparentName = themeNameFromRef(grandparentRef);
  return diagnostic(
    DIAGNOSTIC_CODES.INHERITANCE_TOO_DEEP,
    `Parent theme '${parentName}' itself extends '${grandparentRef}'. HubSpot child themes inherit one level only, so the renderer resolves the child against '${parentName}' and never looks in '${grandparentName}' \u2014 anything only '${grandparentName}' defines will be missing. Flatten the chain so '${parentName}' owns what the child inherits, or render against '${grandparentName}' directly.`,
    {
      parentTheme: parentName,
      parentThemeRoot,
      grandparentTheme: grandparentName,
      grandparentRef,
      parentThemeJsonPath,
      childThemeRoot
    }
  );
}
__name(tooDeepDiagnostic, "tooDeepDiagnostic");
function resolveThemeRoots(options) {
  const diagnostics = [];
  const childThemeRoot = options.childThemeRoot ? resolveSafePath(options.childThemeRoot, ".") : void 0;
  let parentThemeRoot = options.parentThemeRoot ? resolveSafePath(options.parentThemeRoot, ".") : void 0;
  const projects = normaliseProjects(options.projects);
  if (childThemeRoot && !parentThemeRoot) {
    const manifest = readThemeManifest(childThemeRoot, diagnostics);
    if (manifest) {
      const themeJson = manifest.value;
      validateThemeMetadataPaths({
        themeRoot: childThemeRoot,
        childThemeRoot,
        parentThemeRoot,
        roots: [childThemeRoot, parentThemeRoot].filter((root) => Boolean(root)),
        projects,
        diagnostics
      }, manifest.filePath, themeJson);
      const extendsRef = typeof themeJson.extends === "string" ? themeJson.extends.trim() : "";
      if (extendsRef) {
        const parsed = parseProjectThemeRef(extendsRef);
        if (parsed) parentThemeRoot = projects[parsed.project]?.[parsed.themeName];
        if (!parentThemeRoot) {
          diagnostics.push(parentMissingDiagnostic({
            extendsRef,
            childThemeRoot,
            themeJsonPath: manifest.filePath,
            projects,
            project: parsed?.project,
            marketplace: isMarketplaceThemeRef(extendsRef)
          }));
        }
      }
    }
  }
  const themeRoot = childThemeRoot ?? (options.themeRoot ? resolveSafePath(options.themeRoot, ".") : parentThemeRoot);
  if (!themeRoot) {
    throw new Error("themeRoot or childThemeRoot is required");
  }
  if (parentThemeRoot && parentThemeRoot !== themeRoot) {
    const grandparent = readDeclaredExtends(parentThemeRoot, diagnostics);
    if (grandparent) {
      diagnostics.push(tooDeepDiagnostic({
        parentThemeRoot,
        grandparentRef: grandparent.ref,
        parentThemeJsonPath: grandparent.filePath,
        childThemeRoot
      }));
    }
  }
  const roots = [childThemeRoot ?? themeRoot, parentThemeRoot].filter((root) => Boolean(root)).map((root) => resolveSafePath(root, "."));
  return {
    themeRoot: resolveSafePath(themeRoot, "."),
    childThemeRoot,
    parentThemeRoot,
    roots: Array.from(new Set(roots)),
    projects,
    diagnostics
  };
}
__name(resolveThemeRoots, "resolveThemeRoots");
function normaliseProjects(projects) {
  const out = {};
  for (const [project, themes] of Object.entries(projects ?? {})) {
    out[project] = {};
    for (const [themeName, themePath] of Object.entries(themes ?? {})) {
      out[project][themeName] = resolveSafePath(themePath, ".");
    }
  }
  return out;
}
__name(normaliseProjects, "normaliseProjects");
function resolveProjectPath(ref, roots) {
  const parsed = parseProjectThemeRef(ref);
  if (!parsed) return null;
  const root = roots.projects[parsed.project]?.[parsed.themeName] ?? (roots.parentThemeRoot && parsed.themeName === path2.basename(roots.parentThemeRoot) ? roots.parentThemeRoot : void 0) ?? (roots.childThemeRoot && parsed.themeName === path2.basename(roots.childThemeRoot) ? roots.childThemeRoot : void 0);
  return root ? resolveSafePath(root, parsed.rest, { reference: ref, sourceFile: "theme project reference" }) : null;
}
__name(resolveProjectPath, "resolveProjectPath");
function resolveInThemeCascade(roots, relativePath) {
  for (const root of roots.roots) {
    let candidate;
    try {
      candidate = resolveSafePath(root, relativePath);
    } catch (err) {
      if (err instanceof RendererError) continue;
      throw err;
    }
    if (hostFs.existsSync(candidate)) return candidate;
  }
  return null;
}
__name(resolveInThemeCascade, "resolveInThemeCascade");
function createThemeAssetResolver(themeRoot, roots) {
  return (assetPath) => {
    const projectResolved = resolveProjectPath(assetPath, roots);
    if (projectResolved) return projectResolved;
    const cascaded = resolveInThemeCascade(roots, assetPath);
    if (cascaded) return cascaded;
    let candidate;
    try {
      candidate = resolveSafePath(themeRoot, assetPath, { reference: assetPath, sourceFile: "get_asset_url" });
    } catch (err) {
      if (err instanceof RendererError) return null;
      throw err;
    }
    return hostFs.existsSync(candidate) ? candidate : null;
  };
}
__name(createThemeAssetResolver, "createThemeAssetResolver");
function themeRelativeDirectory(filePath, roots) {
  const dir = path2.dirname(path2.resolve(filePath));
  for (const root of roots.roots) {
    const relative = path2.relative(root, dir);
    if (relative.startsWith("..") || path2.isAbsolute(relative)) continue;
    return relative.split(path2.sep).join("/");
  }
  return null;
}
__name(themeRelativeDirectory, "themeRelativeDirectory");
var TEMPLATE_SEARCH_SUBDIRECTORIES = ["templates", "sections", "helpers", "partials"];
function searchPathsUnder(root, subdirs) {
  return [...subdirs.map((subdir) => path2.join(root, subdir)), root];
}
__name(searchPathsUnder, "searchPathsUnder");
function buildSearchPaths(roots, subdirs) {
  return roots.roots.flatMap((root) => searchPathsUnder(root, subdirs));
}
__name(buildSearchPaths, "buildSearchPaths");
function locateTemplate(roots, name) {
  for (const root of roots.roots) {
    for (const searchPath of searchPathsUnder(root, TEMPLATE_SEARCH_SUBDIRECTORIES)) {
      const base = path2.resolve(searchPath);
      const lexical = path2.resolve(base, name);
      if (lexical !== base && !lexical.startsWith(base + path2.sep)) continue;
      let candidate;
      try {
        candidate = resolveSafePath(root, lexical);
      } catch (err) {
        if (err instanceof RendererError) continue;
        throw err;
      }
      if (!hostFs.existsSync(candidate)) continue;
      try {
        if (hostFs.statSync(candidate).isDirectory()) continue;
      } catch {
        continue;
      }
      return candidate;
    }
  }
  return null;
}
__name(locateTemplate, "locateTemplate");

// src/fixtures.ts
import path3 from "path";

// src/fixture-contract.ts
function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
__name(isPlainObject, "isPlainObject");
function hasType(value, type) {
  switch (type) {
    case "non-empty-string":
      return typeof value === "string" && value.trim() !== "";
    case "object":
      return isPlainObject(value);
    case "list":
      return Array.isArray(value);
    case "boolean":
      return typeof value === "boolean";
    case "number":
      return typeof value === "number";
    case "any":
      return true;
  }
}
__name(hasType, "hasType");
function tableProblem(document, fields) {
  for (const field of fields) {
    const dot = field.key.indexOf(".");
    const holder = dot === -1 ? document : document[field.key.slice(0, dot)];
    const key = dot === -1 ? field.key : field.key.slice(dot + 1);
    if (!isPlainObject(holder)) continue;
    if (!(key in holder)) {
      if (field.required) return field.problem;
      continue;
    }
    if (!hasType(holder[key], field.type)) return field.problem;
  }
  return null;
}
__name(tableProblem, "tableProblem");
var CONTENT_STATE_FIELDS = [
  { key: "label", type: "non-empty-string", required: true, problem: "`label` must be a non-empty string", description: "What the state shows, in plain words." },
  { key: "content", type: "object", required: true, problem: "`content` must be an object", description: "The page, as `content` reads in a template." },
  { key: "blog", type: "object", required: false, problem: "`blog` must be an object when present", description: "The blog: `{ id, posts, topics }`, posts serialised with topic ids." },
  { key: "group", type: "object", required: false, problem: "`group` must be an object when present", description: "The blog as `group` reads on a blog route." },
  { key: "request", type: "object", required: false, problem: "`request` must be an object when present", description: "The route facts: path, domain, full_url, query." },
  { key: "tag", type: "object", required: false, problem: "`tag` must be an object when present", description: "Set only where the portal sets it." },
  { key: "is_in_editor", type: "boolean", required: false, problem: "`is_in_editor` must be true or false", description: "Whether the page renders as the editor shows it." },
  { key: "contents", type: "list", required: false, problem: "`contents` must be a list of posts when present", description: "A listing route's page of posts." },
  { key: "current_page_num", type: "number", required: false, problem: "`current_page_num` must be a number when present", description: "A listing route's page number." },
  { key: "next_page_num", type: "number", required: false, problem: "`next_page_num` must be a number when present", description: "Absent on the last page." },
  { key: "last_page_num", type: "number", required: false, problem: "`last_page_num` must be a number when present", description: "A listing's page count." },
  { key: "blog.posts", type: "list", required: false, problem: "`blog.posts` must be a list when present", description: "What the blog functions answer with on this route." },
  { key: "blog.topics", type: "list", required: false, problem: "`blog.topics` must be a list when present", description: "The topics the posts name by id." },
  { key: "dynamicPage", type: "object", required: false, problem: "`dynamicPage` must be an object when present", description: "A HubDB dynamic page: `{ tableId, row }` or `{ tableId, rows }`." },
  { key: "dynamicPage.rows", type: "list", required: false, problem: "`dynamicPage.rows` must be a list when present", description: "The table's rows, on its listing page." }
];
var DYNAMIC_PAGE_REQUIRED = "a hubdb-dynamic-page state needs `dynamicPage` (`tableId`, with `row` or `rows`)";
function contentStateShapeProblem(document, kind) {
  if (!isPlainObject(document)) return "the file is not a JSON object";
  const problem = tableProblem(document, CONTENT_STATE_FIELDS);
  if (problem) return problem;
  if (kind === "hubdb-dynamic-page" && !isPlainObject(document.dynamicPage)) return DYNAMIC_PAGE_REQUIRED;
  return null;
}
__name(contentStateShapeProblem, "contentStateShapeProblem");
var CRM_OBJECT_FIXTURE_FIELDS = [
  { key: "records", type: "list", required: true, problem: "it has no `records` array", description: "The records: `{ id, properties }` each. A record that is not an object is skipped." },
  { key: "objectTypeId", type: "any", required: false, problem: "", description: "The object type id (`2-1234567`); one of the names a template may use." },
  { key: "name", type: "any", required: false, problem: "", description: "The object type name (`p_projects`); one of the names a template may use." },
  { key: "fullyQualifiedName", type: "any", required: false, problem: "", description: "The fully qualified name; one of the names a template may use." },
  { key: "labels", type: "any", required: false, problem: "", description: "`{ singular, plural }`." },
  { key: "primaryDisplayProperty", type: "any", required: false, problem: "", description: "The property shown as the record name." },
  { key: "properties", type: "any", required: false, problem: "", description: "The property definitions, as the schemas API returns them." }
];
function crmObjectFixtureProblem(parsed) {
  if (!isPlainObject(parsed)) return CRM_OBJECT_FIXTURE_FIELDS[0].problem;
  return tableProblem(parsed, CRM_OBJECT_FIXTURE_FIELDS);
}
__name(crmObjectFixtureProblem, "crmObjectFixtureProblem");
var SCHEMA_DIALECT = "https://json-schema.org/draft/2020-12/schema";
function schemaForType(type) {
  switch (type) {
    case "non-empty-string":
      return { type: "string", pattern: "\\S" };
    case "object":
      return { type: "object" };
    case "list":
      return { type: "array" };
    case "boolean":
      return { type: "boolean" };
    case "number":
      return { type: "number" };
    case "any":
      return {};
  }
}
__name(schemaForType, "schemaForType");
function schemaFromTable(title, fields, extraRequired = []) {
  const properties = {};
  const required = [];
  for (const field of fields) {
    const dot = field.key.indexOf(".");
    const property = { ...schemaForType(field.type), description: field.description };
    if (dot === -1) {
      properties[field.key] = { ...properties[field.key] ?? {}, ...property };
      if (field.required) required.push(field.key);
      continue;
    }
    const parent = field.key.slice(0, dot);
    const holder = properties[parent] ??= {};
    const nested = holder.properties ?? {};
    nested[field.key.slice(dot + 1)] = property;
    holder.properties = nested;
  }
  return {
    $schema: SCHEMA_DIALECT,
    title,
    type: "object",
    required: [...required, ...extraRequired],
    properties
  };
}
__name(schemaFromTable, "schemaFromTable");
function contentStateSchema(kind) {
  return schemaFromTable(`A ${kind} content state`, CONTENT_STATE_FIELDS, kind === "hubdb-dynamic-page" ? ["dynamicPage"] : []);
}
__name(contentStateSchema, "contentStateSchema");
function crmObjectFixtureSchema() {
  return schemaFromTable("A CRM object type and its records", CRM_OBJECT_FIXTURE_FIELDS);
}
__name(crmObjectFixtureSchema, "crmObjectFixtureSchema");
var MENUS_EXAMPLE = [
  {
    id: "1001",
    name: "Main menu",
    tree: {
      children: [
        { label: "Home", url: "/", pageId: 101, contentGroupId: null, linkTarget: null, slug: "", pageTitle: "Home", level: 0, activeBranch: false, activeNode: false, children: [] }
      ]
    }
  }
];
var FORMS_EXAMPLE = [
  {
    id: "contact",
    guid: "00000000-0000-4000-8000-000000000001",
    name: "Contact form",
    submitText: "Send",
    formFieldGroups: [
      {
        fields: [
          {
            name: "email",
            label: "Email",
            fieldType: "text",
            required: true,
            hidden: false,
            labelHidden: false,
            placeholder: "you@example.com",
            description: "",
            defaultValue: "",
            options: [],
            validation: { name: "" }
          }
        ]
      }
    ]
  }
];
var BRAND_SETTINGS_EXAMPLE = {
  name: "Example brand",
  primaryLogo: { src: "https://example.com/logo.png", alt: "Example brand", width: 200, height: 60 },
  logos: [{ src: "https://example.com/logo.png", alt: "Example brand", width: 200, height: 60 }],
  primaryFavicon: { src: "https://example.com/favicon.ico" },
  favicons: [{ src: "https://example.com/favicon.ico" }],
  primaryColor: { color: "#1f6feb", label: "Primary" },
  secondaryColor: { color: "#f6f8fa", label: "Secondary" },
  colors: [{ color: "#1f6feb", label: "Primary" }, { color: "#f6f8fa", label: "Secondary" }]
};
var SUBSCRIPTION_TYPES_EXAMPLE = [
  { id: "1", name: "Newsletter", description: "The monthly newsletter", active: true }
];
var UNTYPED_FIXTURE_KINDS = {
  "blog-posts.json": {
    fileType: "list",
    description: "Blog posts: what blog_recent_posts, blog_recent_tag_posts, blog_popular_posts and blog_by_id answer when no content state supplies posts."
  },
  "menu.json": {
    fileType: "object",
    description: "One navigation tree, { children: [...] }: what menu() answers when menus.json has no menu with the id asked for."
  },
  "menus.json": {
    fileType: "list",
    description: "Menus by id, [{ id, name, tree: { children } }]: menu(<id>) answers the matching tree.",
    whenAbsent: "no menus by id: menu(<id>) answers from menu.json",
    authoredExample: MENUS_EXAMPLE
  },
  "form.json": {
    fileType: "object",
    description: "One form definition, with formFieldGroups: what form() draws when forms.json has no form with the id asked for."
  },
  "forms.json": {
    fileType: "list",
    description: "Forms by id or guid: form(form_to_use=<id>) draws the matching form.",
    whenAbsent: "no forms by id: form() draws form.json",
    authoredExample: FORMS_EXAMPLE
  },
  "hubdb-rows.json": {
    fileType: "list",
    description: "HubDB rows: what hubdb_table_rows and the other HubDB functions answer when no content state supplies rows."
  },
  "brand-settings.json": {
    fileType: "object",
    description: "Brand settings: logos, favicons and colours, read through brand_settings.",
    whenAbsent: "brand_settings with an empty logo and favicon",
    authoredExample: BRAND_SETTINGS_EXAMPLE
  },
  "subscription-types.json": {
    fileType: "list",
    description: "Email subscription types, read through subscription_types.",
    whenAbsent: "an empty subscription_types list",
    authoredExample: SUBSCRIPTION_TYPES_EXAMPLE
  }
};
function exampleFromEmbedded(embedded, fileType) {
  if (fileType === "list") return Array.isArray(embedded) && embedded.length > 0 ? [structuredClone(embedded[0])] : null;
  if (!isPlainObject(embedded)) return null;
  const example = {};
  for (const [key, value] of Object.entries(embedded)) {
    example[key] = Array.isArray(value) ? structuredClone(value.slice(0, 1)) : structuredClone(value);
  }
  return example;
}
__name(exampleFromEmbedded, "exampleFromEmbedded");

// src/fixtures.ts
function loadFixture(themeRoot, filename, fallback) {
  if (themeRoot) {
    try {
      return JSON.parse(hostFs.readFileSync(path3.join(themeRoot, "fixtures", filename), "utf-8"));
    } catch {
    }
  }
  const embedded = EMBEDDED_FIXTURES[filename];
  if (embedded !== void 0) {
    return structuredClone(embedded);
  }
  return fallback;
}
__name(loadFixture, "loadFixture");
var CRM_OBJECT_FIXTURE_DIRECTORY = "crm-objects";
function codeUnitOrder(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}
__name(codeUnitOrder, "codeUnitOrder");
function asText(value) {
  if (typeof value === "string" || value instanceof String || typeof value === "number") return String(value);
  return null;
}
__name(asText, "asText");
function readCrmObjectFixture(parsed) {
  if (crmObjectFixtureProblem(parsed) !== null) return null;
  const records = parsed.records;
  return {
    ...parsed,
    records: records.filter(
      (record) => record !== null && typeof record === "object" && !Array.isArray(record)
    )
  };
}
__name(readCrmObjectFixture, "readCrmObjectFixture");
function answersObjectType(fixture, stem, wanted) {
  return [fixture.objectTypeId, fixture.name, fixture.fullyQualifiedName, stem].map(asText).some((key) => key !== null && key.trim().toLowerCase() === wanted);
}
__name(answersObjectType, "answersObjectType");
function loadCrmObjectFixture(themeRoot, objectType) {
  const problems = [];
  const wanted = asText(objectType)?.trim().toLowerCase() ?? "";
  if (wanted === "") return { match: null, problems };
  if (themeRoot) {
    const directory = path3.join(themeRoot, "fixtures", CRM_OBJECT_FIXTURE_DIRECTORY);
    let names = [];
    try {
      names = hostFs.readdirSync(directory);
    } catch {
    }
    for (const name of names.filter((entry) => entry.toLowerCase().endsWith(".json")).sort(codeUnitOrder)) {
      const file = `fixtures/${CRM_OBJECT_FIXTURE_DIRECTORY}/${name}`;
      let text;
      try {
        text = hostFs.readFileSync(path3.join(directory, name), "utf-8");
      } catch {
        continue;
      }
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch (err) {
        problems.push({ file, reason: "not-json", detail: err instanceof Error ? err.message : String(err) });
        continue;
      }
      const fixture = readCrmObjectFixture(parsed);
      if (!fixture) {
        problems.push({ file, reason: "not-a-fixture", detail: crmObjectFixtureProblem(parsed) ?? "it is not a fixture" });
        continue;
      }
      if (answersObjectType(fixture, name.slice(0, -".json".length), wanted)) {
        return { match: { fixture, file, source: "theme" }, problems };
      }
    }
  }
  const prefix = `${CRM_OBJECT_FIXTURE_DIRECTORY}/`;
  for (const key of Object.keys(EMBEDDED_FIXTURES).filter((entry) => entry.startsWith(prefix)).sort(codeUnitOrder)) {
    const fixture = readCrmObjectFixture(EMBEDDED_FIXTURES[key]);
    if (fixture && answersObjectType(fixture, key.slice(prefix.length, -".json".length), wanted)) {
      return { match: { fixture: structuredClone(fixture), file: `fixtures/${key}`, source: "renderer" }, problems };
    }
  }
  return { match: null, problems };
}
__name(loadCrmObjectFixture, "loadCrmObjectFixture");

// src/module-field-schema.ts
var FIELD_SCHEMA_DIR = "field-schemas";
var FIELD_SCHEMA_SUFFIX = ".schema.json";
var ASSET_PLACEHOLDER_MARKER = "themespot-asset-placeholder";
var LEGACY_ASSET_STUB_MARKER = "asset-stub";
var UNEVALUABLE_DEFAULT_MARKERS = Object.freeze([
  ASSET_PLACEHOLDER_MARKER,
  LEGACY_ASSET_STUB_MARKER
]);
function isUnevaluableDefaultMarker(value) {
  return typeof value === "string" && UNEVALUABLE_DEFAULT_MARKERS.includes(value);
}
__name(isUnevaluableDefaultMarker, "isUnevaluableDefaultMarker");
function moduleFieldSchemaBasename(modulePath, moduleDir) {
  const source = moduleDir ?? modulePath;
  const segments = source.replace(/\\/g, "/").split("/").filter(Boolean);
  const last = segments[segments.length - 1];
  if (!last || last === "." || last === "..") return null;
  return last;
}
__name(moduleFieldSchemaBasename, "moduleFieldSchemaBasename");
function moduleFieldSchemaRelativePath(basename) {
  return `${FIELD_SCHEMA_DIR}/${basename}${FIELD_SCHEMA_SUFFIX}`;
}
__name(moduleFieldSchemaRelativePath, "moduleFieldSchemaRelativePath");
function themeGeneratesFieldSchemas(themeRoots) {
  return resolveInThemeCascade(themeRoots, FIELD_SCHEMA_DIR) !== null;
}
__name(themeGeneratesFieldSchemas, "themeGeneratesFieldSchemas");
function readModuleFieldSchemaDefaults(themeRoots, modulePath, moduleDir) {
  const basename = moduleFieldSchemaBasename(modulePath, moduleDir);
  if (basename === null) {
    return {
      found: false,
      defaults: {},
      unevaluable: [],
      markers: [],
      absence: "unnamed-reference",
      basename: ""
    };
  }
  const relative = moduleFieldSchemaRelativePath(basename);
  const file = resolveInThemeCascade(themeRoots, relative);
  if (file === null) {
    return {
      found: false,
      defaults: {},
      unevaluable: [],
      markers: [],
      absence: themeGeneratesFieldSchemas(themeRoots) ? "missing-from-schema-dir" : "no-schema-dir",
      basename
    };
  }
  const unreadable = /* @__PURE__ */ __name((reason) => ({
    found: false,
    defaults: {},
    unevaluable: [],
    markers: [],
    absence: "unreadable",
    file,
    basename,
    reason
  }), "unreadable");
  let parsed;
  try {
    parsed = JSON.parse(hostFs.readFileSync(file, "utf-8"));
  } catch (err) {
    return unreadable(err instanceof Error ? err.message : String(err));
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return unreadable("the file is not a field-schema object");
  }
  const schema = parsed;
  const hasContent = Array.isArray(schema.contentFields);
  const hasStyle = Array.isArray(schema.styleFields);
  if (!hasContent && !hasStyle) {
    return unreadable("the object carries neither a contentFields nor a styleFields array");
  }
  const raw = fieldDefaultsFromGeneratedSchemaFields([
    ...hasContent ? schema.contentFields : [],
    ...hasStyle ? schema.styleFields : []
  ]);
  const unevaluable = [];
  const markers = [];
  const defaults = {};
  for (const [name, value] of Object.entries(raw)) {
    const found = unevaluableMarkersIn(value);
    if (found.length > 0) {
      unevaluable.push(name);
      for (const marker of found) {
        if (!markers.includes(marker)) markers.push(marker);
      }
      continue;
    }
    defaults[name] = value;
  }
  return { found: true, defaults, unevaluable, markers, file, basename };
}
__name(readModuleFieldSchemaDefaults, "readModuleFieldSchemaDefaults");
function unevaluableMarkersIn(value, found = []) {
  if (isUnevaluableDefaultMarker(value)) {
    if (!found.includes(value)) found.push(value);
  } else if (Array.isArray(value)) {
    for (const item of value) unevaluableMarkersIn(item, found);
  } else if (value && typeof value === "object") {
    for (const item of Object.values(value)) unevaluableMarkersIn(item, found);
  }
  return found;
}
__name(unevaluableMarkersIn, "unevaluableMarkersIn");
function fieldDefaultsFromFieldList(fields) {
  return flattenFieldList(fields, false);
}
__name(fieldDefaultsFromFieldList, "fieldDefaultsFromFieldList");
function fieldDefaultsFromGeneratedSchemaFields(fields) {
  return flattenFieldList(fields, true);
}
__name(fieldDefaultsFromGeneratedSchemaFields, "fieldDefaultsFromGeneratedSchemaFields");
function flattenFieldList(fields, repeaterFromArrayDefault) {
  const defaults = {};
  if (!Array.isArray(fields)) return defaults;
  for (const field of fields) {
    if (!field || !field.name) continue;
    const repeated = Boolean(field.occurrence) || repeaterFromArrayDefault && Boolean(field.children) && Array.isArray(field.default);
    if (repeated && field.default !== void 0) {
      defaults[field.name] = field.default;
    } else if (field.children && !field.occurrence) {
      const childDefaults = flattenFieldList(field.children, repeaterFromArrayDefault);
      if (Object.keys(childDefaults).length > 0) {
        defaults[field.name] = childDefaults;
      }
    } else if (field.default !== void 0) {
      defaults[field.name] = field.default;
    }
  }
  return defaults;
}
__name(flattenFieldList, "flattenFieldList");

// src/gradient.ts
function gradientDirection(sideOrCorner) {
  if (!sideOrCorner || typeof sideOrCorner !== "object") return "to bottom";
  const v = sideOrCorner.verticalSide?.toLowerCase();
  const h = sideOrCorner.horizontalSide?.toLowerCase();
  const parts = [];
  if (v) parts.push(v);
  if (h) parts.push(h);
  return parts.length > 0 ? `to ${parts.join(" ")}` : "to bottom";
}
__name(gradientDirection, "gradientDirection");
function synthesiseGradientCss(obj) {
  if (!obj || typeof obj !== "object") return;
  if (Array.isArray(obj)) {
    for (const item of obj) synthesiseGradientCss(item);
    return;
  }
  if (Array.isArray(obj.colors) && obj.side_or_corner && !obj.css) {
    const direction = gradientDirection(obj.side_or_corner);
    const stops = obj.colors.map((stop) => {
      const c = stop?.color;
      if (!c) return null;
      return `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a ?? 1})`;
    }).filter(Boolean);
    if (stops.length > 0) {
      obj.css = `background-image: linear-gradient(${direction}, ${stops.join(", ")})`;
    }
  }
  for (const val of Object.values(obj)) {
    if (val && typeof val === "object") synthesiseGradientCss(val);
  }
}
__name(synthesiseGradientCss, "synthesiseGradientCss");

// src/field-css.ts
var SIDES = ["top", "right", "bottom", "left"];
var BOXES = ["padding", "margin"];
var CSS_KEYWORD_RE = /^[a-z][a-z-]*$/i;
var CSS_UNITS_RE = /^(?:[a-z]+|%)$/i;
function lengthToken(value) {
  let amount;
  let units;
  if (typeof value === "number" || typeof value === "string") {
    amount = value;
  } else if (value && typeof value === "object" && !Array.isArray(value)) {
    amount = value.value;
    units = value.units;
  } else {
    return null;
  }
  if (amount === null || amount === void 0 || amount === "") return null;
  const numeric = Number(amount);
  if (!Number.isFinite(numeric)) return null;
  if (units === null || units === void 0 || units === "") return `${numeric}px`;
  const spelling = String(units).trim();
  if (!CSS_UNITS_RE.test(spelling)) return null;
  return `${numeric}${spelling}`;
}
__name(lengthToken, "lengthToken");
function borderSideColour(side) {
  const raw = side.color;
  let colour = "";
  let opacity = side.opacity;
  if (typeof raw === "string") {
    colour = raw.trim();
  } else if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const nested = raw;
    colour = typeof nested.color === "string" ? nested.color.trim() : "";
    if (nested.opacity !== null && nested.opacity !== void 0) opacity = nested.opacity;
  }
  if (!colour) return null;
  const rgb = hexToRgb(colour);
  if (!rgb) return CSS_KEYWORD_RE.test(colour) ? colour : null;
  const percentage = Number(opacity);
  const alpha = Number.isFinite(percentage) ? percentage / 100 : 1;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}
__name(borderSideColour, "borderSideColour");
function borderSideCss(side, value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const parts = [];
  const record = value;
  const width = lengthToken(record.width);
  if (width !== null) parts.push(width);
  const style = typeof record.style === "string" ? record.style.trim() : "";
  if (style && CSS_KEYWORD_RE.test(style)) parts.push(style);
  const colour = borderSideColour(record);
  if (colour !== null) parts.push(colour);
  if (parts.length === 0) return null;
  return `border-${side}: ${parts.join(" ")}`;
}
__name(borderSideCss, "borderSideCss");
function declarations(parts) {
  return parts.length > 0 ? `${parts.join("; ")};` : "";
}
__name(declarations, "declarations");
function spacingFieldCss(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return "";
  const record = value;
  const parts = [];
  for (const box of BOXES) {
    const group = record[box];
    if (!group || typeof group !== "object" || Array.isArray(group)) continue;
    for (const side of SIDES) {
      const token = lengthToken(group[side]);
      if (token === null) continue;
      parts.push(`${box}-${side}: ${token}`);
    }
  }
  return declarations(parts);
}
__name(spacingFieldCss, "spacingFieldCss");
function borderFieldCss(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return "";
  const record = value;
  const parts = [];
  for (const side of SIDES) {
    const declaration = borderSideCss(side, record[side]);
    if (declaration !== null) parts.push(declaration);
  }
  return declarations(parts);
}
__name(borderFieldCss, "borderFieldCss");
function isSpacingFieldValue(node) {
  return BOXES.some((box) => {
    const group = node[box];
    if (!group || typeof group !== "object" || Array.isArray(group)) return false;
    return SIDES.some((side) => {
      const length = group[side];
      if (typeof length === "number") return true;
      return Boolean(length) && typeof length === "object" && !Array.isArray(length) && "value" in length;
    });
  });
}
__name(isSpacingFieldValue, "isSpacingFieldValue");
function isBorderFieldValue(node) {
  return SIDES.some((side) => {
    const value = node[side];
    if (!value || typeof value !== "object" || Array.isArray(value)) return false;
    const record = value;
    return "width" in record || "style" in record || "color" in record;
  });
}
__name(isBorderFieldValue, "isBorderFieldValue");
function synthesiseSpacingAndBorderCss(value, seen = /* @__PURE__ */ new WeakSet()) {
  if (!value || typeof value !== "object") return;
  if (seen.has(value)) return;
  seen.add(value);
  if (Array.isArray(value)) {
    for (const item of value) synthesiseSpacingAndBorderCss(item, seen);
    return;
  }
  const node = value;
  if (isSpacingFieldValue(node)) {
    node.css = spacingFieldCss(node);
  } else if (isBorderFieldValue(node)) {
    node.css = borderFieldCss(node);
  }
  for (const child of Object.values(node)) {
    if (child && typeof child === "object") synthesiseSpacingAndBorderCss(child, seen);
  }
}
__name(synthesiseSpacingAndBorderCss, "synthesiseSpacingAndBorderCss");

// src/base64.ts
function encodeBase64Utf8(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}
__name(encodeBase64Utf8, "encodeBase64Utf8");
function decodeBase64Utf8(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}
__name(decodeBase64Utf8, "decodeBase64Utf8");

// src/content-links.ts
function isPlainObject2(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}
__name(isPlainObject2, "isPlainObject");
function isContentUrl(value) {
  return isPlainObject2(value) && value.type === "CONTENT" && ("href" in value || "content_id" in value);
}
__name(isContentUrl, "isContentUrl");
function isUnresolvableContentId(id) {
  if (id === null || id === void 0) return true;
  if (typeof id === "number") return !Number.isFinite(id) || id <= 0;
  if (typeof id === "string") {
    const trimmed = id.trim();
    if (trimmed === "") return true;
    if (/^-?\d+$/.test(trimmed)) return Number(trimmed) <= 0;
    return false;
  }
  return false;
}
__name(isUnresolvableContentId, "isUnresolvableContentId");
function joinKey(base, key) {
  return base ? `${base}.${key}` : key;
}
__name(joinKey, "joinKey");
function resolveContentLinks(value, basePath = "") {
  const unresolved = [];
  const ancestors = /* @__PURE__ */ new Set();
  const visit = /* @__PURE__ */ __name((node, at) => {
    if (node === null || typeof node !== "object") return node;
    if (ancestors.has(node)) return node;
    if (Array.isArray(node)) {
      ancestors.add(node);
      let copy2 = null;
      node.forEach((entry, index) => {
        const next = visit(entry, `${at}[${index}]`);
        if (next !== entry) {
          copy2 ??= node.slice();
          copy2[index] = next;
        }
      });
      ancestors.delete(node);
      return copy2 ?? node;
    }
    if (!isPlainObject2(node)) return node;
    if (isContentUrl(node) && isUnresolvableContentId(node.content_id)) {
      unresolved.push({ path: at, contentId: node.content_id, href: node.href });
      return node.href === "" ? node : { ...node, href: "" };
    }
    ancestors.add(node);
    let copy = null;
    for (const [key, entry] of Object.entries(node)) {
      const next = visit(entry, joinKey(at, key));
      if (next !== entry) {
        copy ??= { ...node };
        copy[key] = next;
      }
    }
    ancestors.delete(node);
    return copy ?? node;
  }, "visit");
  return { value: visit(value, basePath), unresolved };
}
__name(resolveContentLinks, "resolveContentLinks");
function findUnresolvableContentLinks(value, basePath = "") {
  return resolveContentLinks(value, basePath).unresolved;
}
__name(findUnresolvableContentLinks, "findUnresolvableContentLinks");
function describeContentId(id) {
  return id === void 0 ? "absent" : JSON.stringify(id);
}
__name(describeContentId, "describeContentId");

// src/provenance.ts
import path4 from "path";

// src/provenance-attributes.ts
var PROVENANCE_ATTRIBUTES = {
  kind: "data-themespot-kind",
  themeId: "data-themespot-theme-id",
  runtime: "data-themespot-runtime",
  file: "data-themespot-file",
  instance: "data-themespot-instance",
  global: "data-themespot-global",
  dnd: "data-themespot-dnd"
};
var PROVENANCE_ATTRIBUTE_NAMES = Object.values(PROVENANCE_ATTRIBUTES);

// src/provenance.ts
var HUBSPOT_THEME_ID = "@hubspot";
function createProvenanceContext(themeRoots, ids = {}, extraRoots = []) {
  const roots = extraRoots.map((entry) => ({
    root: path4.resolve(entry.root),
    themeId: entry.themeId && entry.themeId.trim() ? entry.themeId.trim() : null
  }));
  const primary = themeRoots.childThemeRoot ?? themeRoots.themeRoot;
  for (const root of themeRoots.roots) {
    const isParent = themeRoots.parentThemeRoot !== void 0 && root === themeRoots.parentThemeRoot && root !== primary;
    const id = isParent ? ids.parentThemeId : root === primary ? ids.themeId : void 0;
    const resolved = path4.resolve(root);
    if (roots.some((entry) => entry.root === resolved)) continue;
    roots.push({ root: resolved, themeId: id && id.trim() ? id.trim() : null });
  }
  for (const [project, themes] of Object.entries(themeRoots.projects ?? {})) {
    for (const [themeName, root] of Object.entries(themes)) {
      if (roots.some((entry) => entry.root === path4.resolve(root))) continue;
      roots.push({ root: path4.resolve(root), themeId: `@projects/${project}/${themeName}` });
    }
  }
  return { roots, files: [], globalDepth: 0, dndAreas: [] };
}
__name(createProvenanceContext, "createProvenanceContext");
function provenanceFileFor(context, absolutePath) {
  if (!absolutePath) return null;
  const resolved = path4.resolve(absolutePath);
  for (const { root, themeId } of context.roots) {
    const relative = path4.relative(root, resolved);
    if (relative === "" || relative.startsWith("..") || path4.isAbsolute(relative)) continue;
    const file = relative.split(path4.sep).join("/");
    return { file, themeId: file.startsWith("@hubspot/") ? HUBSPOT_THEME_ID : themeId };
  }
  return null;
}
__name(provenanceFileFor, "provenanceFileFor");
function currentProvenanceFile(context) {
  return context.files[context.files.length - 1] ?? null;
}
__name(currentProvenanceFile, "currentProvenanceFile");
function withProvenanceFile(context, file, render, options = {}) {
  if (!context) return render();
  if (file) context.files.push(file);
  if (options.global) context.globalDepth += 1;
  try {
    return render();
  } finally {
    if (options.global) context.globalDepth -= 1;
    if (file) context.files.pop();
  }
}
__name(withProvenanceFile, "withProvenanceFile");
function withProvenanceDndArea(context, name, render) {
  if (!context) return render();
  context.dndAreas.push(name);
  try {
    return render();
  } finally {
    context.dndAreas.pop();
  }
}
__name(withProvenanceDndArea, "withProvenanceDndArea");
function structuralProvenance(context, kind, overrides = {}) {
  const file = currentProvenanceFile(context);
  return {
    kind,
    runtime: "hubl",
    themeId: file?.themeId ?? null,
    file: file?.file ?? null,
    global: context.globalDepth > 0,
    dnd: context.dndAreas[context.dndAreas.length - 1] ?? null,
    ...overrides
  };
}
__name(structuralProvenance, "structuralProvenance");
function escapeAttribute(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
__name(escapeAttribute, "escapeAttribute");
function provenanceAttributes(provenance) {
  const pairs = [
    [PROVENANCE_ATTRIBUTES.kind, provenance.kind],
    [PROVENANCE_ATTRIBUTES.themeId, provenance.themeId],
    [PROVENANCE_ATTRIBUTES.runtime, provenance.runtime],
    [PROVENANCE_ATTRIBUTES.file, provenance.file],
    [PROVENANCE_ATTRIBUTES.instance, provenance.instance],
    [PROVENANCE_ATTRIBUTES.global, provenance.global ? "true" : null],
    [PROVENANCE_ATTRIBUTES.dnd, provenance.dnd]
  ];
  return pairs.filter((pair) => typeof pair[1] === "string" && pair[1] !== "").map(([name, value]) => ` ${name}="${escapeAttribute(value)}"`).join("");
}
__name(provenanceAttributes, "provenanceAttributes");
var SKIPPED_RAW_ELEMENTS = /* @__PURE__ */ new Set(["style", "script", "noscript", "template", "title", "textarea"]);
var SKIPPED_VOID_ELEMENTS = /* @__PURE__ */ new Set(["link", "meta", "base"]);
var KIND_ATTRIBUTE_RE = new RegExp(`\\s${PROVENANCE_ATTRIBUTES.kind}\\s*=`, "i");
function endOfTag(html, start) {
  let quote = null;
  for (let i = start + 1; i < html.length; i++) {
    const c = html[i];
    if (quote) {
      if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'") quote = c;
    else if (c === ">") return i + 1;
  }
  return -1;
}
__name(endOfTag, "endOfTag");
function stampFirstElementWith(html, attributes) {
  if (!attributes) return html;
  let i = 0;
  while (i < html.length) {
    const c = html[i];
    if (c === " " || c === "\n" || c === "\r" || c === "	" || c === "\f") {
      i++;
      continue;
    }
    if (c !== "<") return html;
    if (html.startsWith("<!--", i)) {
      const close = html.indexOf("-->", i + 4);
      if (close < 0) return html;
      i = close + 3;
      continue;
    }
    if (html[i + 1] === "!" || html[i + 1] === "?") {
      const close = html.indexOf(">", i);
      if (close < 0) return html;
      i = close + 1;
      continue;
    }
    const nameMatch = /^<([a-zA-Z][a-zA-Z0-9:-]*)/.exec(html.slice(i, i + 64));
    if (!nameMatch) return html;
    const name = nameMatch[1].toLowerCase();
    const tagEnd = endOfTag(html, i);
    if (tagEnd < 0) return html;
    if (SKIPPED_VOID_ELEMENTS.has(name)) {
      i = tagEnd;
      continue;
    }
    if (SKIPPED_RAW_ELEMENTS.has(name)) {
      const close = html.toLowerCase().indexOf(`</${name}`, tagEnd);
      if (close < 0) return html;
      const closeEnd = html.indexOf(">", close);
      if (closeEnd < 0) return html;
      i = closeEnd + 1;
      continue;
    }
    const tag = html.slice(i, tagEnd);
    if (KIND_ATTRIBUTE_RE.test(tag)) return html;
    const selfClosing = tag.endsWith("/>");
    const insertAt = selfClosing ? tagEnd - 2 : tagEnd - 1;
    return html.slice(0, insertAt) + attributes + html.slice(insertAt);
  }
  return html;
}
__name(stampFirstElementWith, "stampFirstElementWith");
function stampFirstElement(html, provenance) {
  return provenance ? stampFirstElementWith(html, provenanceAttributes(provenance)) : html;
}
__name(stampFirstElement, "stampFirstElement");
function extractProvenanceAttributes(openingTag) {
  let out = "";
  for (const name of PROVENANCE_ATTRIBUTE_NAMES) {
    const match = new RegExp(`\\s${name}="([^"]*)"`).exec(openingTag);
    if (match) out += ` ${name}="${match[1]}"`;
  }
  return out;
}
__name(extractProvenanceAttributes, "extractProvenanceAttributes");

// src/module-loader.ts
var MODULE_SHAPE_UNRECOGNISED = DIAGNOSTIC_CODES.MODULE_SHAPE_UNRECOGNISED;
function activeForeignRoot(collector) {
  const frames = collector.foreignRoots;
  return frames && frames.length > 0 ? frames[frames.length - 1] : null;
}
__name(activeForeignRoot, "activeForeignRoot");
function withForeignRoot(collector, frame, render) {
  if (!frame) return render();
  (collector.foreignRoots ??= []).push(frame);
  try {
    return render();
  } finally {
    collector.foreignRoots.pop();
  }
}
__name(withForeignRoot, "withForeignRoot");
function foreignAssetReference(collector, reference) {
  const frame = activeForeignRoot(collector);
  if (!frame || typeof reference !== "string") return reference;
  const value = reference.trim();
  if (value === "" || value.startsWith("//") || /^[a-z][a-z0-9+.-]*:/i.test(value)) return reference;
  const relative = value.replace(/^(?:\.\.?\/)+/, "");
  let target = null;
  try {
    target = resolveInThemeCascade(frame.themeRoots, relative) ?? resolveSafePath(frame.dir, relative);
  } catch {
    target = null;
  }
  return target ? `file://${target.replace(/\\/g, "/")}` : reference;
}
__name(foreignAssetReference, "foreignAssetReference");
var REACT_ENTRY_FILES = ["index.tsx", "index.ts", "index.jsx", "index.js"];
var HUBL_TEMPLATE_FILES = ["module.hubl.html", "module.html"];
var HUBL_CSS_FILES = ["module.hubl.css", "module.css"];
function isDir(p) {
  try {
    return hostFs.statSync(p).isDirectory();
  } catch {
    return false;
  }
}
__name(isDir, "isDir");
function classifyModuleDir(dir) {
  if (!dir || !isDir(dir)) return "unrecognised";
  if (REACT_ENTRY_FILES.some((f) => hostFs.existsSync(path5.join(dir, f)))) return "react";
  if (HUBL_TEMPLATE_FILES.some((f) => hostFs.existsSync(path5.join(dir, f)))) return "hubl";
  return "unrecognised";
}
__name(classifyModuleDir, "classifyModuleDir");
var MODULE_DIR_SUFFIX = ".module";
function withModuleSuffix(candidate) {
  if (!candidate || candidate.endsWith(MODULE_DIR_SUFFIX)) return [candidate];
  return [candidate, `${candidate}${MODULE_DIR_SUFFIX}`];
}
__name(withModuleSuffix, "withModuleSuffix");
function resolveModuleDir(themeRoots, modulePath) {
  const defaultModuleDir = hubspotDefaultModuleDir(modulePath);
  if (defaultModuleDir !== null) {
    const found = resolveInThemeCascade(themeRoots, defaultModuleDir);
    return found && isDir(found) ? found : null;
  }
  for (const projectRef of withModuleSuffix(modulePath)) {
    const projectResolved = resolveProjectPath(projectRef, themeRoots);
    if (projectResolved && isDir(projectResolved)) return projectResolved;
  }
  const stripUp = modulePath.replace(/^(?:\.\.\/)+/, "");
  const relatives = [
    path5.join("templates", modulePath),
    path5.join("templates/partials", modulePath),
    path5.join("templates/layouts", modulePath),
    stripUp,
    modulePath
  ];
  for (const relative of relatives) {
    for (const candidate of withModuleSuffix(relative)) {
      try {
        const found = resolveInThemeCascade(themeRoots, candidate);
        if (found && isDir(found)) return found;
      } catch (err) {
        if (!(err instanceof RendererError)) throw err;
      }
    }
  }
  return null;
}
__name(resolveModuleDir, "resolveModuleDir");
var NAMESPACED_MODULE_PREFIXES = [HUBSPOT_MODULE_PREFIX, "@projects/", "@marketplace/"];
function isPlainModulePath(modulePath) {
  if (typeof modulePath !== "string") return false;
  const trimmed = modulePath.trim();
  if (trimmed === "" || trimmed.includes("{{") || trimmed.includes("{%")) return false;
  return !NAMESPACED_MODULE_PREFIXES.some((prefix) => trimmed.startsWith(prefix));
}
__name(isPlainModulePath, "isPlainModulePath");
function findHublTemplate(moduleDir) {
  for (const name of HUBL_TEMPLATE_FILES) {
    const p = path5.join(moduleDir, name);
    if (hostFs.existsSync(p)) return p;
  }
  return null;
}
__name(findHublTemplate, "findHublTemplate");
function cssCommentText(message) {
  return message.replace(/\*\//g, "* /").replace(/[\r\n]+/g, " ").trim();
}
__name(cssCommentText, "cssCommentText");
function sealStyleElement(css) {
  return css.replace(/<\/(style)/gi, "<\\/$1");
}
__name(sealStyleElement, "sealStyleElement");
function renderModuleStaticCss(moduleDir, env, moduleContext, preprocess) {
  for (const name of HUBL_CSS_FILES) {
    const cssPath = path5.join(moduleDir, name);
    if (!hostFs.existsSync(cssPath)) continue;
    const raw = hostFs.readFileSync(cssPath, "utf-8");
    if (!name.endsWith(".hubl.css")) return { css: raw };
    try {
      return { css: env.renderString(preprocess(raw), moduleContext) };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        css: `/* === ${name} \u2014 RENDER ERROR === */
/* ${cssCommentText(message)} */
`,
        error: { file: name, message }
      };
    }
  }
  return { css: "" };
}
__name(renderModuleStaticCss, "renderModuleStaticCss");
function unwrapModuleFieldsKwarg(props) {
  const fields = props?.fields;
  if (!fields || typeof fields !== "object" || Array.isArray(fields)) return props;
  const { fields: _dropped, ...rest } = props;
  return { ...fields, ...rest };
}
__name(unwrapModuleFieldsKwarg, "unwrapModuleFieldsKwarg");
function collectModuleAssets(moduleDir, collector) {
  if (collector.modulesWithAssetsCollected.has(moduleDir)) return;
  collector.modulesWithAssetsCollected.add(moduleDir);
  const metaPath = path5.join(moduleDir, "meta.json");
  if (hostFs.existsSync(metaPath)) {
    try {
      const meta = JSON.parse(hostFs.readFileSync(metaPath, "utf-8"));
      for (const [key, links] of [
        ["css_assets", collector.cssLinks],
        ["js_assets", collector.jsLinks]
      ]) {
        for (const asset of Array.isArray(meta?.[key]) ? meta[key] : []) {
          if (!asset || asset.autoload === false || typeof asset.path !== "string") continue;
          const link = foreignAssetReference(collector, asset.path);
          if (!links.includes(link)) links.push(link);
        }
      }
    } catch {
    }
  }
  const scriptPath = path5.join(moduleDir, "module.js");
  if (!hostFs.existsSync(scriptPath)) return;
  try {
    const source = hostFs.readFileSync(scriptPath, "utf-8");
    if (source.trim()) collector.moduleScripts.push(source);
  } catch {
  }
}
__name(collectModuleAssets, "collectModuleAssets");
function moduleInstanceName(moduleNumber) {
  return `module_${moduleNumber}`;
}
__name(moduleInstanceName, "moduleInstanceName");
function renderHublModule(opts) {
  const { env, collector, themeRoots, moduleDir, builtin, modulePath, props, contextCtx, moduleNumber, preprocess } = opts;
  let template;
  let fieldDefaults;
  if (moduleDir === null) {
    if (!builtin) return moduleShapeUnrecognisedStub(modulePath);
    template = preprocess(builtin.source);
    fieldDefaults = builtin.fieldDefaults;
  } else {
    const templatePath = findHublTemplate(moduleDir);
    if (!templatePath) {
      return moduleShapeUnrecognisedStub(modulePath);
    }
    template = preprocess(
      hostFs.readFileSync(templatePath, "utf-8").replace(/^<!--[\s\S]*?-->\s*/m, ""),
      themeRelativeDirectory(templatePath, themeRoots)
    );
    fieldDefaults = extractHublModuleDefaults(moduleDir, themeRoots);
  }
  const mergedProps = emulateContentLinks(
    collector,
    modulePath,
    deepMergeObjects(fieldDefaults, unwrapModuleFieldsKwarg(props))
  );
  synthesiseGradientCss(mergedProps);
  synthesiseSpacingAndBorderCss(mergedProps);
  const instanceName = opts.instanceName ?? moduleInstanceName(moduleNumber);
  const moduleContext = {
    ...contextCtx,
    module: mergedProps,
    name: instanceName,
    [SCOPE_CONTEXT_VARIABLE]: instanceName,
    module_id: String(moduleNumber),
    is_in_editor: false
  };
  let body;
  try {
    body = env.renderString(template, moduleContext);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    collector.diagnostics.push(
      diagnostic(DIAGNOSTIC_CODES.HUBL_MODULE_ERROR, `HubL module failed to render: ${modulePath} \u2014 ${msg}`, {
        modulePath,
        moduleDir
      })
    );
    return modulePlaceholder(modulePath, { error: msg });
  }
  if (moduleDir !== null) collectModuleAssets(moduleDir, collector);
  const staticCss = moduleDir === null ? { css: "" } : renderModuleStaticCss(moduleDir, env, moduleContext, preprocess);
  if (staticCss.error) {
    const key = `${moduleDir}::${staticCss.error.file}`;
    if (!collector.reportedModuleStylesheetErrors.has(key)) {
      collector.reportedModuleStylesheetErrors.add(key);
      collector.diagnostics.push(
        diagnostic(
          DIAGNOSTIC_CODES.CSS_RENDER_ERROR,
          `Module stylesheet failed to render: ${modulePath}/${staticCss.error.file} \u2014 ${staticCss.error.message}. The rules it generates are absent from this render; a RENDER ERROR marker stands in their place.`,
          { modulePath, moduleDir, sourceFile: staticCss.error.file, error: staticCss.error.message }
        )
      );
    }
  }
  const moduleCss = staticCss.css;
  if (moduleCss.trim()) {
    collector.moduleStyles.push(moduleCss);
    body += `
<style>${sealStyleElement(moduleCss)}</style>`;
  }
  if (collector.scopedInstances.has(instanceName)) {
    return wrapScopedInstance(instanceName, body);
  }
  return body;
}
__name(renderHublModule, "renderHublModule");
function escapeAttr(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
__name(escapeAttr, "escapeAttr");
function escapeHtmlText(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
__name(escapeHtmlText, "escapeHtmlText");
function modulePlaceholder(modulePath, extras = {}) {
  const label = placeholderLabel(modulePath, extras.label);
  const attrs = [`class="themespot-module-placeholder"`, `data-module-path="${escapeAttr(modulePath)}"`];
  if (extras.props !== void 0) {
    attrs.push(`data-module-props="${encodeBase64Utf8(JSON.stringify(extras.props))}"`);
  }
  if (extras.instance !== void 0) {
    attrs.push(`data-module-instance="${escapeAttr(extras.instance)}"`);
  }
  if (extras.notRendered !== void 0) attrs.push(`data-module-not-rendered="${escapeAttr(extras.notRendered)}"`);
  if (extras.error !== void 0) attrs.push(`data-module-error="${escapeAttr(extras.error)}"`);
  if (extras.reason !== void 0) attrs.push(`data-module-reason="${escapeAttr(extras.reason)}"`);
  const kind = extras.kind ?? "Module";
  if (extras.text !== void 0) {
    return `<div ${attrs.join(" ")} style="${PLACEHOLDER_STYLE}">${escapeHtmlText(extras.text)}</div>`;
  }
  if (extras.sourceFramed) {
    const clause = extras.note !== void 0 ? ` ${extras.note}` : "";
    return `<div ${attrs.join(" ")} style="${PLACEHOLDER_STYLE}">${escapeAttr(kind)}: ${escapeAttr(label)}${escapeAttr(clause)}</div>`;
  }
  const suffix = extras.note !== void 0 ? ` \u2014 ${extras.note}` : extras.error !== void 0 ? " \u2014 HubL render failed" : "";
  return `<div ${attrs.join(" ")} style="${PLACEHOLDER_STYLE}">[${escapeAttr(kind)}: ${escapeAttr(label)}${escapeAttr(suffix)}]</div>`;
}
__name(modulePlaceholder, "modulePlaceholder");
function placeholderLabel(modulePath, label) {
  return label ?? modulePath.split("/").pop() ?? modulePath;
}
__name(placeholderLabel, "placeholderLabel");
function reactModuleNotRenderedText(label) {
  return `${label}: React module, not drawn. This build has no React renderer; ThemeSpot renders React modules with a connected HubSpot account.`;
}
__name(reactModuleNotRenderedText, "reactModuleNotRenderedText");
var PLACEHOLDER_STYLE = [
  "display:block",
  "box-sizing:border-box",
  "margin:8px 0",
  "padding:12px 16px",
  "background:#f1f3f4",
  "border:1px dashed #9aa0a6",
  "border-radius:6px",
  "color:#3c4043",
  "font:500 13px/1.45 ui-sans-serif,system-ui,-apple-system,sans-serif",
  "text-align:center",
  "position:relative",
  "z-index:0",
  "overflow-wrap:anywhere"
].join(";");
function builtinRenderContext(opts) {
  return {
    brand: loadFixture(opts.themeRoots.themeRoot, "brand-settings.json", null)
  };
}
__name(builtinRenderContext, "builtinRenderContext");
function renderHubspotDefaultModule(opts, moduleDir) {
  const { collector, modulePath } = opts;
  const slug = hubspotDefaultModuleSlug(modulePath);
  if (slug === null) {
    if (!isMalformedHubspotDefaultModuleRef(modulePath)) return null;
    if (moduleDir !== null) return null;
    collector.diagnostics.push(
      diagnostic(
        DIAGNOSTIC_CODES.HUBSPOT_DEFAULT_MODULE_UNAVAILABLE,
        `'${modulePath}' is not a usable HubSpot default-module reference: ${HUBSPOT_MODULE_PREFIX} names exactly one module slug (@hubspot/rich_text), so there is no source to fetch for this reference and nothing was rendered.`,
        { modulePath, slug: null, moduleDir: null, reason: "malformed-reference" }
      )
    );
    return modulePlaceholder(modulePath, {
      kind: "HubSpot default module",
      label: modulePath,
      note: "not a valid reference",
      reason: "default-module-reference-malformed"
    });
  }
  const portalData = portalDataRequirement(modulePath);
  if (portalData) {
    collector.diagnostics.push(
      diagnostic(
        DIAGNOSTIC_CODES.HUBSPOT_DEFAULT_MODULE_NEEDS_PORTAL_DATA,
        `HubSpot default module '${slug}' renders ${portalData.needs}, which an offline render does not have. A labelled placeholder is shown in its place; loading the module source would not change that.`,
        { modulePath, slug, needs: portalData.needs, hydrated: moduleDir !== null }
      )
    );
    return modulePlaceholder(modulePath, {
      kind: "HubSpot module",
      label: defaultModuleDisplayName(slug),
      note: defaultModulePlaceholderSource(slug),
      sourceFramed: true,
      reason: "portal-data-required"
    });
  }
  const shape = moduleDir ? classifyModuleDir(moduleDir) : "unrecognised";
  if (shape === "hubl" && moduleDir) {
    return renderHublModule({ ...opts, moduleDir });
  }
  if (shape === "react") return null;
  const builtinEntry = builtinDefaultModule(modulePath);
  if (builtinEntry) {
    const { builtin } = builtinEntry;
    const unwrappedProps = unwrapModuleFieldsKwarg(opts.props);
    if (builtin.rendersFrom && !builtin.rendersFrom(unwrappedProps, builtinRenderContext(opts))) {
      collector.diagnostics.push(
        diagnostic(
          DIAGNOSTIC_CODES.HUBSPOT_DEFAULT_MODULE_NEEDS_PORTAL_DATA,
          `HubSpot default module '${slug}' renders ${builtin.needsWithout}, which an offline render does not have, and this template set no value of its own. A labelled placeholder is shown in its place.`,
          { modulePath, slug, needs: builtin.needsWithout, hydrated: false, reason: "builtin-needs-content" }
        )
      );
      return modulePlaceholder(modulePath, {
        kind: "HubSpot module",
        label: defaultModuleDisplayName(slug),
        note: defaultModulePlaceholderSource(slug),
        sourceFramed: true,
        reason: "portal-data-required"
      });
    }
    if (!collector.approximatedDefaultModules.has(slug)) {
      collector.approximatedDefaultModules.add(slug);
      collector.diagnostics.push(
        diagnostic(
          DIAGNOSTIC_CODES.HUBSPOT_DEFAULT_MODULE_APPROXIMATED,
          `HubSpot default module '${slug}' rendered from this renderer's built-in equivalent of HubSpot's source, which no theme ships. The content is the theme's own; the surrounding markup is equivalent rather than identical. Hydrate ${hubspotDefaultModuleDir(modulePath)}/ to render HubSpot's own source instead.`,
          { modulePath, slug }
        )
      );
    }
    return renderHublModule({
      ...opts,
      moduleDir: null,
      builtin: { source: builtin.source, fieldDefaults: { ...builtin.fieldDefaults ?? {} } }
    });
  }
  const expectedDir = hubspotDefaultModuleDir(modulePath);
  const detail = moduleDir ? `its source directory (${expectedDir}) holds neither module.html nor an index.tsx` : `its source is not in this theme \u2014 hydrate ${expectedDir}/ (what \`hs cms fetch ${expectedDir}\` writes) to render it`;
  collector.diagnostics.push(
    diagnostic(
      DIAGNOSTIC_CODES.HUBSPOT_DEFAULT_MODULE_UNAVAILABLE,
      `HubSpot default module '${slug}' could not be rendered: ${detail}.`,
      { modulePath, slug, moduleDir, expectedDir }
    )
  );
  return modulePlaceholder(modulePath, {
    kind: "HubSpot default module",
    label: slug,
    note: "source not loaded",
    reason: "default-module-source-missing"
  });
}
__name(renderHubspotDefaultModule, "renderHubspotDefaultModule");
function moduleShapeUnrecognisedStub(modulePath) {
  return `<!-- ${MODULE_SHAPE_UNRECOGNISED}: ${modulePath} is neither a React module (index.tsx) nor a HubL module (module.hubl.html + meta.json) -->`;
}
__name(moduleShapeUnrecognisedStub, "moduleShapeUnrecognisedStub");
function routeModuleRender(opts) {
  return routeModuleRenderWithProvenance(opts).html;
}
__name(routeModuleRender, "routeModuleRender");
function moduleProvenance(collector, modulePath, moduleDir, runtime, instance, hubspotDefault) {
  const context = collector.provenance;
  if (!context) return null;
  const located = provenanceFileFor(context, moduleDir);
  const file = located?.file ?? (hubspotDefault ? hubspotDefaultModuleDir(modulePath) : null) ?? modulePath.replace(/^(?:\.\.\/)+/, "");
  const themeId = hubspotDefault || file.startsWith("@hubspot/") ? HUBSPOT_THEME_ID : located?.themeId ?? null;
  return {
    kind: "module",
    ...runtime !== null ? { runtime } : {},
    themeId,
    file,
    instance,
    global: context.globalDepth > 0,
    dnd: context.dndAreas[context.dndAreas.length - 1] ?? null
  };
}
__name(moduleProvenance, "moduleProvenance");
function routeModuleRenderWithProvenance(opts, stampRoot = () => true) {
  const { collector, modulePath, moduleNumber } = opts;
  const moduleDir = opts.resolvedModuleDir !== void 0 ? opts.resolvedModuleDir : resolveModuleDir(opts.themeRoots, modulePath);
  let runtime = "hubl";
  let hubspotDefault = false;
  const html = routeResolvedModule(opts, moduleDir, (resolved) => {
    runtime = resolved.runtime;
    hubspotDefault = resolved.hubspotDefault;
  });
  const instance = opts.instanceName ?? moduleInstanceName(moduleNumber);
  const provenance = moduleProvenance(collector, modulePath, moduleDir, runtime, instance, hubspotDefault);
  return { html: stampRoot(runtime) ? stampFirstElement(html, provenance) : html, provenance };
}
__name(routeModuleRenderWithProvenance, "routeModuleRenderWithProvenance");
function routeResolvedModule(opts, moduleDir, report) {
  const { collector, themeRoots, modulePath, props, renderModuleFn, attrs = {}, moduleNumber } = opts;
  const asDefaultModule = renderHubspotDefaultModule(opts, moduleDir);
  if (asDefaultModule !== null) {
    report({ runtime: "hubl", hubspotDefault: true });
    return asDefaultModule;
  }
  if (moduleDir === null && collector.reactModulePolicy === "not-rendered" && isPlainModulePath(modulePath)) {
    report({ runtime: null, hubspotDefault: false });
    const instance2 = opts.instanceName ?? moduleInstanceName(moduleNumber);
    const scope = themeRoots.parentThemeRoot !== void 0 && themeRoots.roots.length > 1 ? "the theme or its parent" : "the theme";
    collector.diagnostics.push(
      diagnostic(
        DIAGNOSTIC_CODES.MODULE_NOT_FOUND,
        `Module "${modulePath}" was not found: no module directory at that path exists in ${scope}, so nothing was drawn in its place. Check the path, and that the module directory is in the theme.`,
        { modulePath, instance: instance2, reason: "module-unknown" }
      )
    );
    return modulePlaceholder(modulePath, { instance: instance2, reason: "module-unknown", note: "not found" });
  }
  const shape = moduleDir ? classifyModuleDir(moduleDir) : "react";
  if (shape === "hubl" && moduleDir) {
    report({ runtime: "hubl", hubspotDefault: false });
    return renderHublModule({ ...opts, moduleDir });
  }
  if (shape === "unrecognised") {
    collector.diagnostics.push(
      diagnostic(
        DIAGNOSTIC_CODES.MODULE_SHAPE_UNRECOGNISED,
        `${modulePath} is neither a React module (index.tsx) nor a HubL module (module.hubl.html + meta.json)`,
        { modulePath, moduleDir }
      )
    );
    return moduleShapeUnrecognisedStub(modulePath);
  }
  collector.reactModules.push(modulePath);
  report({ runtime: "react", hubspotDefault: false });
  const mergedProps = emulateContentLinks(
    collector,
    modulePath,
    deepMergeObjects(
      reactModuleFieldDefaults({ collector, themeRoots, modulePath, moduleDir }),
      props
    )
  );
  if (renderModuleFn) {
    try {
      return renderModuleFn(modulePath, mergedProps, attrs);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      collector.diagnostics.push(
        diagnostic(DIAGNOSTIC_CODES.MODULE_RENDER_ERROR, `Module failed to render: ${modulePath} \u2014 ${msg}`, {
          modulePath
        })
      );
      return `<!-- Module render error: ${msg} -->`;
    }
  }
  const instance = opts.instanceName ?? moduleInstanceName(moduleNumber);
  if (collector.reactModulePolicy === "not-rendered" && moduleDir !== null && shape === "react") {
    const label = placeholderLabel(modulePath);
    collector.diagnostics.push(
      diagnostic(
        DIAGNOSTIC_CODES.REACT_MODULE_NOT_RENDERED,
        `React module "${label}" was not drawn because this build has no React renderer. A placeholder marks its place.`,
        { modulePath, instance, reason: "no-bridge-in-build" }
      )
    );
    return modulePlaceholder(modulePath, {
      props: mergedProps,
      instance,
      notRendered: "react",
      text: reactModuleNotRenderedText(label)
    });
  }
  return modulePlaceholder(modulePath, { props: mergedProps, instance });
}
__name(routeResolvedModule, "routeResolvedModule");
function emulateContentLinks(collector, modulePath, props) {
  const { value, unresolved } = resolveContentLinks(props);
  for (const link of unresolved) {
    const key = `${modulePath} ${link.path}`;
    if (collector.reportedContentLinks.has(key)) continue;
    collector.reportedContentLinks.add(key);
    const href = typeof link.href === "string" && link.href !== "" ? ` ("${link.href}")` : "";
    collector.diagnostics.push(
      diagnostic(
        DIAGNOSTIC_CODES.CONTENT_LINK_UNRESOLVED,
        `Module '${modulePath}' field '${link.path}' is a CONTENT link with content_id ${describeContentId(link.contentId)}, which names no page. HubSpot resolves a CONTENT link by content_id and ignores its href${href}, so the live page renders it with an empty href \u2014 and so does this preview. Point it at a real page, or ship an internal default as EXTERNAL with a relative href until the page exists.`,
        {
          modulePath,
          fieldPath: link.path,
          contentId: link.contentId ?? null,
          ignoredHref: typeof link.href === "string" ? link.href : null
        }
      )
    );
  }
  return value;
}
__name(emulateContentLinks, "emulateContentLinks");
function readModuleFieldSchema(themeRoots, modulePath, moduleDir) {
  return readModuleFieldSchemaDefaults(
    themeRoots,
    modulePath,
    moduleDir === void 0 ? resolveModuleDir(themeRoots, modulePath) : moduleDir
  );
}
__name(readModuleFieldSchema, "readModuleFieldSchema");
function reactModuleFieldDefaults(opts) {
  const { collector, themeRoots, modulePath, moduleDir } = opts;
  const cacheKey = `${modulePath}\0${moduleDir ?? ""}`;
  let schema = collector.moduleFieldSchemas.get(cacheKey);
  if (!schema) {
    schema = readModuleFieldSchema(themeRoots, modulePath, moduleDir);
    collector.moduleFieldSchemas.set(cacheKey, schema);
  }
  const firstTime = !collector.reportedModuleFieldSchemas.has(modulePath);
  if (firstTime) collector.reportedModuleFieldSchemas.add(modulePath);
  if (schema.found) {
    if (schema.unevaluable.length > 0 && firstTime) {
      collector.diagnostics.push(
        diagnostic(
          DIAGNOSTIC_CODES.REACT_MODULE_FIELD_DEFAULT_UNEVALUABLE,
          `React module '${modulePath}' has ${schema.unevaluable.length} field(s) whose default the field-schema build could not evaluate \u2014 an asset import, recorded as the sentinel ${schema.markers.map((marker) => `'${marker}'`).join(" / ")}. They are left unset rather than pointed at a URL that cannot load: ${schema.unevaluable.join(", ")}. The Node reference render fills them from the module's own fields.tsx (its fields export, or the file itself when the entry exports none) and withdraws this record when it has filled every one; a surface that has only the placeholder shows them unset.`,
          {
            modulePath,
            moduleDir,
            schemaPath: moduleFieldSchemaRelativePath(schema.basename),
            fields: schema.unevaluable,
            markers: schema.markers
          }
        )
      );
    }
    return schema.defaults;
  }
  if (schema.absence === "no-schema-dir") return {};
  if (firstTime) {
    const expected = schema.basename ? moduleFieldSchemaRelativePath(schema.basename) : null;
    const message = schema.absence === "unnamed-reference" ? `Module reference '${modulePath}' ends in no name, so there is no module directory to file a field schema under and none was looked for. Reference a module by its directory (path="../components/modules/PlanGrid"); this render's props are the template's own.` : schema.absence === "unreadable" ? `React module '${modulePath}' has a field schema at ${expected} that could not be read (${schema.reason}), so no theme defaults were merged into its props. Re-run the theme's field-schema build to regenerate it.` : `React module '${modulePath}' has no generated field schema. This theme generates them, so ${expected} was expected and is absent \u2014 the module's placeholder therefore carries only the parameters the template passed, and a surface that has nothing but the placeholder renders the module's empty state. Re-run the theme's field-schema build, or check that the schema is named after the module directory (${schema.basename}).`;
    collector.diagnostics.push(
      diagnostic(DIAGNOSTIC_CODES.REACT_MODULE_FIELD_SCHEMA_UNAVAILABLE, message, {
        modulePath,
        moduleDir,
        expectedSchemaPath: expected,
        reason: schema.absence,
        detail: schema.reason
      })
    );
  }
  return {};
}
__name(reactModuleFieldDefaults, "reactModuleFieldDefaults");
function extractHublModuleDefaults(moduleDir, themeRoots) {
  const fieldsPath = resolveSafePath(moduleDir, "fields.json");
  if (!hostFs.existsSync(fieldsPath)) return {};
  try {
    const fields = JSON.parse(hostFs.readFileSync(fieldsPath, "utf-8"));
    validateThemeMetadataPaths(themeRoots ?? resolveThemeRoots({ themeRoot: moduleDir }), fieldsPath, fields);
    return fieldDefaultsFromFieldList(fields);
  } catch (err) {
    if (err instanceof RendererError) throw err;
    return {};
  }
}
__name(extractHublModuleDefaults, "extractHublModuleDefaults");
function deepMergeObjects(base, override) {
  const result = { ...base };
  for (const [key, val] of Object.entries(override)) {
    if (val === void 0) continue;
    if (val !== null && typeof val === "object" && !Array.isArray(val) && result[key] !== null && typeof result[key] === "object" && !Array.isArray(result[key])) {
      result[key] = deepMergeObjects(result[key], val);
    } else {
      result[key] = val;
    }
  }
  return result;
}
__name(deepMergeObjects, "deepMergeObjects");

export {
  synthesiseGradientCss,
  synthesiseSpacingAndBorderCss,
  validateThemeMetadataPaths,
  resolveThemeRoots,
  resolveProjectPath,
  resolveInThemeCascade,
  createThemeAssetResolver,
  themeRelativeDirectory,
  TEMPLATE_SEARCH_SUBDIRECTORIES,
  buildSearchPaths,
  locateTemplate,
  contentStateShapeProblem,
  contentStateSchema,
  crmObjectFixtureSchema,
  UNTYPED_FIXTURE_KINDS,
  exampleFromEmbedded,
  loadFixture,
  CRM_OBJECT_FIXTURE_DIRECTORY,
  loadCrmObjectFixture,
  FIELD_SCHEMA_DIR,
  FIELD_SCHEMA_SUFFIX,
  encodeBase64Utf8,
  decodeBase64Utf8,
  findUnresolvableContentLinks,
  describeContentId,
  createProvenanceContext,
  provenanceFileFor,
  currentProvenanceFile,
  withProvenanceFile,
  withProvenanceDndArea,
  structuralProvenance,
  provenanceAttributes,
  stampFirstElementWith,
  stampFirstElement,
  extractProvenanceAttributes,
  MODULE_SHAPE_UNRECOGNISED,
  activeForeignRoot,
  withForeignRoot,
  foreignAssetReference,
  classifyModuleDir,
  resolveModuleDir,
  unwrapModuleFieldsKwarg,
  moduleInstanceName,
  renderHublModule,
  modulePlaceholder,
  routeModuleRender,
  routeModuleRenderWithProvenance,
  emulateContentLinks,
  readModuleFieldSchema,
  extractHublModuleDefaults,
  deepMergeObjects
};
