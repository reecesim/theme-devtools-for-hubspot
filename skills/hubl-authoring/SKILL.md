---
name: hubl-authoring
description: "Write HubL for HubSpot CMS themes correctly: choosing a template, section or module and reusing before creating, which edits reach existing pages, drag-and-drop area grammar and the 12-column rules, module fields.json and meta.json, the field names HubSpot refuses, theme fields.json and theme.json, the templateType annotation, html= quoting, the context-default pattern for sections, HubL syntax, control flow and escaping, the required standard_header_includes and standard_footer_includes, and what HubSpot's validation errors mean."
when_to_use: "Load before writing or editing any .html, fields.json, meta.json or theme.json in a HubSpot theme, and when someone asks how to write HubL, build a module or section, add a dnd_area, set theme colours and fonts, or fix a HubL error."
---

# Writing HubL theme source

You write the files of a HubSpot CMS theme on disk: HTML + HubL templates, section templates, global partials, modules (folders ending in `.module`) and the theme's own `fields.json` and `theme.json`. HubSpot's rules for these files are specific, and it rejects files that break them. Read this before you touch any of them, and read the reference file for an area the moment a task reaches it.

## The golden rules

1. **Edit, don't regenerate.** To change an existing file, make the smallest edit with a unique snippet of the current text. Read the file first so the snippet matches exactly. A focused edit is less to get wrong than a rewrite and cannot disturb the rest of the file.
2. **`html=` is a HubL string literal.** Inside a `dnd_module`, the `html=` value is a quoted string. Wrap it in single quotes when the HTML contains double quotes: `html='<h1 class="hero">Title</h1>'`. Never wrap a plain string in `{{ }}`: `html={{ "<h1>..</h1>" }}` is a parse error. `{{ }}` is only for expressions (see "Sections take their content from `context`" below).
3. **One change, then check.** After a change, check it with the local renderer (`preview-and-validate` skill, `render --json`) and read its diagnostics. Fix the first problem and check again. Never retry by guessing; change one thing at a time. After two failures, isolate: cut the file back to a minimal version that works, then add one block back at a time until the culprit shows.
4. **Write HubL as it appears in the file**: real quotes, real newlines, no backslash escaping. You are writing a file, not a JSON string.

## Decide what to build before you touch source

Most requests are not a new module. Decompose top-down and reuse at every level before creating anything:

- A whole page or page type → a **template** that includes existing section templates.
- A page region → a **section** composed from modules that already exist.
- A genuinely new kind of content unit that no existing module produces → a **new module** (the rarest outcome).

Search the theme (Glob and Grep over `modules/`, `sections/`, `templates/`) for existing modules and sections first and prefer reuse. HubSpot's own default modules (`@hubspot/rich_text`, `@hubspot/linked_image`, `@hubspot/form`, `@hubspot/menu`, `@hubspot/simple_menu`, `@hubspot/logo`, `@hubspot/cta`, `@hubspot/button`, `@hubspot/video`, `@hubspot/social_follow`) count as existing modules. If a request spans several artefacts, state the decomposition in one line before building. Two sections that differ only in colour, a decorative slot or media kind should be **one section with a `context` parameter**, not two files: duplicating a section when a parameter would do is the commonest source of library sprawl.

## Where does this template live?

State the placement before writing. There are two legitimate homes:

- **In the theme** (the default): inside the theme folder, so bound to that theme. Build on what the theme already has: extend its base layout (`templates/layouts/base.html` in HubSpot's boilerplate), include its partials and section templates, read design tokens from `theme.*` rather than hard-coding them, follow its folders (`templates/`, `templates/layouts/`, `templates/partials/`, `sections/`, `modules/`, `css/`, `js/`, `images/`), and copy the annotation header of a sibling file.
- **Standalone**: a template outside any theme, only for an explicit one-off page or experiment, and say why. Make it genuinely self-contained, with both `standard_header_includes` and `standard_footer_includes`; do not depend silently on a theme's layout, partials, section templates, assets or `theme.*` tokens.

## What an edit affects: the propagation model

Different artefacts propagate differently. Know which one you are touching before you tell the user what will change:

- **Module source (`module.html`, `module.css`, `module.js`, `fields.json`)**: modules are **referenced** by pages, not copied. An edit shows on **every page** that uses the module. Search the theme for `path="../modules/<name>"` to see the templates and sections that place it, and state the blast radius. Pages that editors built in HubSpot may use it too; local files cannot show those.
- **Theme CSS, theme fields and global partials (header, footer)**: site-wide. Every page.
- **Template files**: the markup around the `dnd_area` (includes, head, structure) renders live, so those edits reach **every page built on the template**. The drag-and-drop content inside is only a default: each page keeps its own copy of it.
- **Section templates**: **presets, stamped on insert**. When a page is created from a template, or a section is added to a page, the page gets its own copy of the section at that moment, with no ongoing link. Editing a section template changes **nothing on existing pages**, only new pages and future insertions. Never tell the user a section-template edit will restyle pages already built with it; that needs each page edited in HubSpot's page editor.
- **Exception**: a page whose drag-and-drop content has never been edited still shows its template's current defaults, so template and section-template edits show through on such a page until it is first edited.

## Clone the nearest existing file; don't write from blank

To create a module, section or template, start from the closest existing one: copy it, rename it and adapt it. You inherit a correct annotation header, a valid dnd structure and a working field shape instead of rebuilding them from memory. A copy that already works and is then edited beats a blank file.

In a theme scaffolded from HubSpot's boilerplate, the first sources are `modules/card.module` (repeated items), `modules/button.module` (a link plus text), `sections/*.html` and `templates/*.html`. When nothing in the theme is close, HubSpot's CLI writes its own starting files locally without touching any HubSpot account: `hs cms module create <name> <dest> --module-label "<Label>" --content-types SITE_PAGE,LANDING_PAGE` and `hs cms template create <name> <dest> --template-type page-template` (check `--help` first; see `deploy-to-hubspot` for installing the CLI).

Boilerplate modules still carry the older `host_template_types` key in `meta.json`. HubSpot says modules using it keep working, and that `content_types` is the name to use: write `content_types` in new modules and don't spread the old key.

## Compose from the module's field schema

Before you place a module in a section or template, read its `fields.json`. It lists every field, its type, its help text and its default, and it is authoritative for what content belongs in each slot. Then compose deliberately:

- **Fill the content slots the section's purpose calls for** with real, context-appropriate content. A pricing FAQ's accordion holds actual pricing questions, not the module's generic "First accordion title" default. A section left on raw defaults ships hollow and reads as unfinished.
- **Inherit style, behaviour and layout** from the module's defaults unless the section's role needs a specific treatment. Pass down what the context changes; don't re-specify every field.

## Field names HubSpot refuses: `label`, `body` and `name`

Never name a field `label`, `body` or `name`, in a module's `fields.json` or the theme's `fields.json`, at any depth: a top-level field, a field inside a group or repeater, and a group or repeater itself. HubSpot's upload refused each of these when tested on 2026-10-06, with `field name cannot be '<name>'`. HubSpot's documentation does not list them (its fields reference says only that a name cannot contain spaces or special characters): the list comes from observed refusals and may not be complete.

Name the field for what it holds: `item_label`, `body_text` (or `body_font` for a theme font), `business_name`. Rename before the theme is in use: renaming a field after editors have saved content drops the saved value.

The local `validate` reports each of these names as `FIELD_NAME_RESERVED`, with the field's path and a suggested name.

In the local renderer a field named `items`, `keys`, `values` or `get` is shadowed by a built-in method, so a loop over it draws none of its content; HubSpot's behaviour for these names is not documented; avoid them.

`references/module-fields.md` has the detail and what else changes with a rename.

## dnd areas in 30 seconds

A page template wraps its body in a `dnd_area`. What can contain what is strict, and HubSpot rejects anything else:

- `dnd_area` → `dnd_section`
- `dnd_section` → `dnd_module` or `dnd_column` (**never `dnd_row` directly**: "dnd_row cannot be a descendant of dnd_section")
- `dnd_column` → `dnd_row`
- `dnd_row` → `dnd_module` or `dnd_column`

`dnd_module` and `dnd_column` sit on a 12-column grid with `offset` (start, 0–11) and `width` (span).

**The simplest multi-column layout, and the one to reach for first, is bare `dnd_module`s directly in a `dnd_section`, each with non-overlapping `offset`/`width`:**

- Two columns: `offset=0, width=6` and `offset=6, width=6`.
- Three cards: `offset=0, width=4`, `offset=4, width=4`, `offset=8, width=4`.

Two rules cause most failures:

- **Don't mix a full-width (`width=12`) module with narrower modules as flat siblings in one section**: the 12-wide one overlaps the others ("overlaps with … spanning columns 1 to 12"). Put a full-width heading in its own section and the cards in the next section.
- **`dnd_row` is never a direct child of `dnd_section`.** For a nested grid go `dnd_section → dnd_column(offset/width) → dnd_row → dnd_module`.

A module cannot contain a drag-and-drop area; use repeated fields inside the module instead. See `references/dnd-areas.md` for layouts that work.

## The templateType annotation

Every template file starts with an annotation comment as its very first bytes. A template with a `dnd_area` must declare a page type:

```
<!--
  templateType: page
  isAvailableForNewContent: true
  label: Home
  screenshotPath: ../images/template-previews/home.png
-->
```

Other values you will meet: `section` (section templates), `global_partial` (header and footer), `blog_listing` and `blog_post` (blog templates), and `none` (the boilerplate's `templates/layouts/base.html`, a layout that is never offered as a page template on its own). HubSpot documents this block as an HTML comment at the top of the file and documents no HubL-comment (`{# … #}`) form. Never reformat, move or re-delimit an existing annotation block: edit its values (`label`, `screenshotPath`, `isAvailableForNewContent`) and nothing else. The comment reaching the published HTML is HubSpot's intended behaviour and harmless.

## Sections take their content from `context`

A section template (`templateType: section`) begins and ends with exactly one `dnd_section`. Templates include it with `include_dnd_partial`, optionally passing values in `context`, and the section reads each value with a literal fallback:

```
{% dnd_module
  path="@hubspot/rich_text",
  html={{ context.content or '<h2>Provide more detail here.</h2>' }}
%}
{% end_dnd_module %}
```

Here `{{ }}` is right because `context.content or '...'` is an *expression*. The fallback uses single quotes so its HTML can use double quotes. This is the one place `html=` takes `{{ }}`. HubSpot's own examples write the same fallback with `||`; both forms appear in HubSpot's code.

```
{% include_dnd_partial path="../sections/hero.html" context={ "content": "<h1>Plan your week in minutes</h1>" } %}
```

## Brand colours, fonts and spacing go through the theme fields

A boilerplate theme is token-driven: `css/theme-overrides.css` reads everything from `theme.*` (`theme.global_colors.primary.color`, `theme.text.h1.font`, `theme.spacing.*`) with `{% set %}`. Those tokens are defined in the theme's **`fields.json`**, each with a `default`. To restyle the brand, change the token `default`: it is the single source of truth the whole theme already reads.

**Do not** hard-code a hex value into `theme-overrides.css` (`{% set primary_color = "#0056CC" %}`), and do not add a new stylesheet full of `!important`. Both bypass the token system, fight the cascade and leave the real tokens lying. A reviewer should see a brand change as a `default` edit, not a parallel stylesheet. `references/theme-fields.md` covers writing theme fields and `theme.json`.

The theme `fields.json` is long. Search it for the field name (for example `"primary"`), read that window, and edit the `default` with a unique snippet.

Two caveats to state to the user:

- A `fields.json` `default` is the value used when the account's theme settings have **not** overridden it. Once someone saves theme settings in HubSpot, the live value comes from there and won't move from a default edit alone. Say so rather than layering CSS on top to force it.
- A field with `inherited_value` takes its default from another field or from the account's brand settings (the boilerplate's primary colour inherits `brand_settings.primaryColor`). Keep that when the account's brand kit should win; remove it when the design's value must be the default.

## Editing template logic, not just dnd

The rules above cover *placing* content in dnd trees. The moment a task touches template logic (a `{% for %}` over a repeated field, an `{% if %}` on a module value, a template that `{% extends %}` a layout, a macro, escaping, or a built-in such as `content.*` or `page_meta.*`), work from `references/hubl-language.md`. Don't write the language from memory; its common traps are listed there.

## Reading errors and diagnostics

Two sources report problems: the local renderer's diagnostics (`preview-and-validate`) and HubSpot's own validation when files are uploaded (`deploy-to-hubspot`). HubSpot's render is the authority; the local one is an approximation. Read the first error, fix it, check again.

- A problem reported against a *different* file (an included partial or section) is that file's own issue, not a fault in the file you edited. Don't chase it unless the task is that file.
- A section template on its own has no `dnd_area` around its `dnd_section`; it only gets one when a template includes it. Check a section through a template that includes it.

`references/validation-errors.md` lists the common errors and their fixes.

## See what the local renderer reads

Two renderer commands show what the local render works from, so you check instead of guessing:

- `node "${CLAUDE_PLUGIN_ROOT}/scripts/render.mjs" fields --theme-root <theme-folder> --module ../modules/<name>` prints a theme module's fields as the renderer reads them from its `fields.json` (name, type, label, default). Run it before passing a value to a module or reading `module.<field>`. It answers only for the theme's own modules: for HubSpot's default modules, HubSpot's documentation is the reference (below).
- `node "${CLAUDE_PLUGIN_ROOT}/scripts/render.mjs" fixtures --theme-root <theme-folder>` lists the files that stand in for what HubSpot keeps in the account (menus read with `menu()`, blog posts, HubDB rows, forms read with `form()`, blog and dynamic-page content) and the shape of each. When a template reads one of those, that is where its local content comes from (`preview-and-validate`, "Fixtures").

## Look it up; don't answer from memory

HubSpot's developer documentation is the authority for field types, HubL tags, filters, functions and variables, and it changes. When a question turns on a platform fact and the documentation is reachable, read it before answering:

- Start at developers.hubspot.com/docs. The pages you will use most: the HubL reference (filters, functions, tags, variables, and the drag-and-drop area tags) under `/docs/cms/reference/hubl/`, module and theme field types at `/docs/cms/reference/fields/module-theme-fields`, module `meta.json` at `/docs/cms/reference/modules/configuration`, and HubSpot's default modules and their fields at `/docs/cms/reference/modules/default-modules`.
- Before passing field values to a HubSpot default module (`@hubspot/simple_menu`, `@hubspot/menu`, `@hubspot/form`, …), check its fields on that page. The local renderer's code is not documentation of HubSpot's modules; don't infer field names or shapes from it.
- If this session has HubSpot's developer MCP server, use its `search-docs` tool and then `fetch-doc` on the best result.
- Say when something could not be checked, rather than writing a plausible guess.

## Reference

- `references/dnd-areas.md`: section, column, row and module grammar, section parameters, and two-column, card and nested layouts that work. Read before writing any `dnd_area`.
- `references/module-fields.md`: a complete small module (`meta.json`, `fields.json`, `module.html`), the field names HubSpot refuses and how to rename one, the value shape each field type produces (objects and repeated lists included), and passing values when you place a module. Read before creating or changing a module.
- `references/theme-fields.md`: writing the theme's `fields.json` and `theme.json`, reading `theme.*` in CSS, and inherited values. Read before setting brand colours, fonts or spacing.
- `references/hubl-language.md`: HubL syntax, control flow, `extends`/`block` composition, macros, escaping, built-in variables and the required includes. Read whenever a task goes beyond a flat dnd tree.
- `references/validation-errors.md`: the common HubSpot validation and upload errors and their fixes. Read when an error message is not obvious, and after any refused upload.
