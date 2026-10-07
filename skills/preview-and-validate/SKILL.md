---
name: preview-and-validate
description: "Render a HubL theme on this machine and prove it matches the design in pixels: the bundled renderer (its help and its preview server's route index are the reference) and its diagnostics, the pixel contract (full-page screenshots of the design and the build at desktop and mobile widths, compared until identical or every difference is explained), the ways to take those screenshots with what the machine has, a capped fix-and-compare loop, and fixtures that put the design's content into the render."
when_to_use: "Use when someone asks to preview or render a template, see what the theme looks like, take a screenshot, compare the build with the design, check it matches, or find why a page looks different from the mockup."
---

# Preview and validate

You check a HubL theme on this machine without sending anything to HubSpot: render it with the bundled renderer, read its diagnostics, then prove in pixels that it matches the design. Quote paths exactly as written. Run each command on its own from the project folder: no `cd` in front, nothing chained after it, no `>` redirection or pipe (some sessions allow only plain commands and refuse a chained one whole). Use the commands' own `--out` and `--json` options instead.

## What the local render is, and is not

The local render is an approximation of HubSpot's HubL rendering. It is useful for templates, modules, sections, drag-and-drop areas, partials, theme fields and CSS. HubSpot's own render is the authority: when they disagree, HubSpot is right, and you say so. Known differences:

- It renders the defaults in templates, sections and fields, and sample stand-ins (fixtures) for what HubSpot keeps in the account: menus read with `menu()`, blog posts, HubDB rows, blog and dynamic-page content. "Fixtures" below says how to give it the design's content instead. HubSpot modules whose output comes from an account (`@hubspot/form`, `@hubspot/menu`, blog listings) appear as labelled placeholders whatever the fixtures hold.
- HubSpot's default modules (`@hubspot/rich_text` and the like) are drawn by the renderer's own stand-ins: the content is the theme's, the surrounding markup is equivalent rather than identical. `@hubspot/simple_menu` draws the items the template passes in `menu_tree`, with HubSpot's menu class names; with no items it draws an empty `<nav>`.
- A field named `items`, `keys`, `values` or `get` is shadowed by a built-in method in this renderer, so a loop over it draws none of its content, with no diagnostic. Don't use those names (`hubl-authoring`, "Field names HubSpot refuses").
- CMS React modules are not drawn; each shows a labelled placeholder.
- It does not add HubSpot's own layout stylesheet. The drag-and-drop markup carries HubSpot's grid classes (`row-fluid`, `span1` to `span12`), but only the theme's CSS lays them out. A theme without grid CSS shows every column full width, one under another. Give the theme grid CSS, as HubSpot's boilerplate does in `css/objects/_layout.css` (`hubl-authoring`, `references/dnd-areas.md`, "Styling the grid").
- The rendered document wraps the template's output in the renderer's own page shell (its own `<head>` and a `<title>` of "Preview"); a layout's `<!doctype>`, `<html>`, `<head>` and `<body>` end up nested inside it. Browsers draw it normally; read the HTML with that in mind.
- Pages may load fonts and placeholder images from the network, so a render without a connection can differ.

When the user asks to see the theme with their real pages, posts or HubDB rows, say what the local render cannot do: it draws the theme's defaults and fixtures, never the account's content, and it draws no CMS React modules. Previewing the theme on the portal's own content is part of hosted [ThemeSpot](${CLAUDE_PLUGIN_ROOT}/README.md#what-this-plugin-does-not-do), on a connected HubSpot portal.

## The renderer

Every renderer command goes through the launcher, which forwards arguments and exit codes:

```
node "${CLAUDE_PLUGIN_ROOT}/scripts/render.mjs" <command> [options]
```

- **Read its help first.** `node "${CLAUDE_PLUGIN_ROOT}/scripts/render.mjs" --help` lists every command, flag, output shape and exit code, and `help <command>` gives one command's. The help is the reference, and this skill does not repeat it.
- **Serve and read the route index.** Start `node "${CLAUDE_PLUGIN_ROOT}/scripts/render.mjs" serve --theme-root <theme-folder> --port 0` as a background process (port 0 picks a free port), take the URL from its `Preview:` line, and stop it when you finish. Then read `<url>/api/index`: it lists every route, its parameters and example requests for this theme. If the session has no HTTP tool, `node -e "fetch('<url>/api/index').then(r => r.text()).then(console.log)"` prints it.
- **Discover names; don't guess them.** `list` prints every template, module, section, partial and content state `render` accepts; `fields --module <ref>` a module's fields as the renderer reads them; `fixtures` the files that stand in for account data; `metadata` the theme's settings and presets.
- **Diagnostics** come from `render --json` (or the server's `/diagnostics`); read them before any pixels, as below.
- **`validate`** runs offline checks over the theme's files. They are a subset of what HubSpot checks, and `validate` renders nothing (a template with a HubL syntax error passes it), so render every template as well. When `validate` and every render are clean, say exactly this about readiness: "Passes the local checks; HubSpot decides on upload and may refuse something these checks do not cover."
- **`render --out <file.html>`** writes a document whose theme assets load from `file://` paths on this machine. A browser on this machine draws it fully; anything elsewhere needs `serve`.

**Exit 4 from the launcher** means the renderer is not vendored in this copy of the plugin. Say so plainly. There is then no local render: the theme can only be seen in HubSpot, after `deploy-to-hubspot` (with the user's agreement), where its preview can be captured and compared in the same way.

## Reading diagnostics

`render --json` and `/diagnostics` return a list of `{ code, message, details }`. Read every diagnostic before looking at pixels: a template that rendered with diagnostics may look right and still be wrong. Work through them in order, one fix per check, as `hubl-authoring` says. A render still exits 0 (`ok: true`) with any of these except `RENDER_FAILED`. The codes you will meet:

| Code | Meaning | What to do |
| --- | --- | --- |
| `RENDER_FAILED` (`ok: false`, exit 1) | The template could not render: a HubL syntax error (an unclosed `{% if %}` shows as "unknown block tag: endblock"), or an `{% include %}` / `{% extends %}` file that does not exist ("template not found: <path>"). The message carries the file, line and column. | Fix it before anything else; nothing useful was rendered. |
| `MODULE_NOT_FOUND` | A module path names no `.module` folder in the theme; nothing was drawn in its place. | Fix the path: relative to the file that places the module, without the `.module` suffix. |
| `HUBL_PARTIAL_NOT_FOUND` | An `include_dnd_partial` or `global_partial` names a file the theme does not have; nothing was rendered in its place. | Fix the path or create the file. |
| `DND_HIERARCHY_VIOLATION` | A `dnd_row` directly in a `dnd_section`, or two cells in one row asking for the same `offset` (the overlap HubSpot rejects). The renderer repairs the layout to keep going; HubSpot will not. | Fix the nesting or the `offset`/`width` (`hubl-authoring`, `references/dnd-areas.md`). |
| `HUBSPOT_DEFAULT_MODULE_APPROXIMATED` | An `@hubspot/…` module (`rich_text`, `simple_menu` and others) was drawn by the renderer's stand-in. | Informational. Expect small markup differences from HubSpot. |
| `HUBSPOT_DEFAULT_MODULE_NEEDS_PORTAL_DATA` | `@hubspot/form` or `@hubspot/menu`: its content lives in the HubSpot account, so a labelled placeholder is drawn. | Not a defect; keep the module. Report the placeholder's effect on its band's height, judge the bands below by eye, and put "create the form in HubSpot and select it in the module" (or "build the menu in HubSpot and select it") in the hand-over. |
| `HUBSPOT_DEFAULT_MODULE_UNAVAILABLE` | An `@hubspot/…` module the renderer has no stand-in for (seen for `text`, and for a mistyped `@hubspot/` path) is shown as a labelled placeholder box. | Check the path is a real HubSpot module. Keep HubSpot's module if it is the right choice; do not swap it for hand-built markup to match pixels. The message suggests `hs cms fetch` to draw it from HubSpot's source: that reads from the user's account, so ask first, and keep the fetched folder out of any upload. Usually it is simpler to check that module in HubSpot. |
| `REACT_MODULE_NOT_RENDERED`, `SSR_BRIDGE_UNAVAILABLE` | A CMS React module, which this renderer does not draw: a placeholder names it. | Out of scope for a HubL theme; if you did not mean a React module, check the path. |
| `INHERITANCE_PARENT_MISSING` | The theme extends a parent theme that was not given. | Pass `--parent-theme-root`. |

`validate` adds its own codes:

| Code | Severity | Meaning | What to do |
| --- | --- | --- | --- |
| `FIELD_NAME_RESERVED` | error | A field, group or repeater named `label`, `body` or `name`, at any depth, in a module's or the theme's `fields.json`. The message gives the field path and a suggested name (`details.fieldPath`, `details.suggestedName` in `--json`). | Rename it and every use of it (`hubl-authoring`, "Field names HubSpot refuses"). Fix every one listed before any upload. |
| `TEMPLATE_REQUIRED_VARIABLE_MISSING` | warning | A page or blog template (by its `templateType`) without `standard_header_includes` or `standard_footer_includes` (the message names which), in the file and in everything it extends or includes. It counts only the printed form, `{{ standard_header_includes }}`; a template that uses `{% import %}` is not judged. | Add the missing one, printed, to the template or the layout it extends. Treat it as a fix, not a warning to leave. |
| `FIELD_REQUIRED_NO_DEFAULT` | error | A field marked `required` with no `default`. HubSpot's boilerplate, as bundled, has one: `payment_link` in `modules/pricing-card.module/fields.json`, a payment field shown when the card's button target is "Use a payment link", the default. | In the theme's own modules, give the field a default or make it optional. For the boilerplate's `pricing-card` (and what places it: `sections/pricing.html`, `templates/qa-test.html`), remove it if the design has no pricing cards; otherwise do not change HubSpot's file silently: check HubSpot's documentation for the payment field, and tell the user what `validate` reported and what you did. Whether HubSpot's upload refuses the untouched module was not checked (`hubl-authoring`, `references/validation-errors.md`, has the related page error about payments). |
| `HUBSPOT_INTERNAL_MODULE` | info | A note about a HubSpot-shipped module. | Informational. |

The renderer does **not** report these, so check them yourself by reading the files:

- a field name passed to a module that its `fields.json` does not define, or a value of the wrong shape (a string where the field is an image object);
- a `theme.*` path that does not exist in the theme's `fields.json` (it prints nothing);
- `html={{ "…" }}` around a plain string, which HubSpot rejects;
- a field named `items`, `keys`, `values` or `get` (the loop over it draws nothing locally);
- a fixture file of the wrong shape (it can draw nothing, with no diagnostic).

When a section or card you expected is missing from the render and there is no diagnostic, suspect one of these first.

A diagnostic that raises a question about HubSpot itself (what fields a default module takes or what markup it draws, whether an `@hubspot/…` path exists, what a HubL tag, filter, function or variable does) is answered from HubSpot's documentation, not from the renderer's source or its stand-ins' output: the stand-ins approximate HubSpot's modules and do not describe them. `design-to-hubspot-theme`, "HubSpot's documentation: when and how", says when to look and how.

## The contract

Before you say the build matches, you must have compared pixels. Produce full-page PNGs of the design and of the build at 1440×900 and 390×844, device scale factor 1, fonts loaded, lazy images loaded, animations off. Run `compare` on each pair. Fix the largest difference first. Repeat until `compare` reports `identical` (it is judged at threshold 0 and equal dimensions), or every remaining range is explained from its crop, for at most 8 iterations. A build you have not captured after your last change is not verified.

## Producing the PNGs

The contract fixes what the files must be; how you make them is your choice, from what this machine and session have. Pre-flight (`design-to-hubspot-theme`, step 0) reports each capture means it found, with its path. Nothing is required, and you ask before any install: never install Playwright, Puppeteer or a browser without the user's agreement, and say what the install downloads. `references/capture-options.md` has the exact script or commands for each route; read it before the first capture.

- **Playwright or Puppeteer already installed in the project**: a short Node script that sets the viewport and device scale factor 1, turns animations off, waits for `document.fonts.ready`, scrolls so lazy images load, and takes a `fullPage` screenshot.
- **`playwright-core` with this machine's Chrome or Edge**: the same script, launching the installed browser. Adding it is an npm package only, with no browser download, and still needs the user's yes.
- **Chrome, Edge or Chromium on its own, headless**: no package at all. Chrome can lay a page out wider than the window it is given (at least 500 px wide, on Windows), so the page goes through a small frame page that gives it its exact width, and its height is measured first. The reference has the frame page, the two commands and the flags that were checked.
- **A browser tool in this session**, only if it can save a full-page PNG at exactly those viewports with device scale factor 1. A tool that saves only the visible part of the page can help you look; it cannot close the loop.
- **None of these**: say "not pixel-verified", give the user the `serve` URL to look at themselves, and stop. Do not claim a match.

Capture the design and the build by the same means with the same settings, and name the files by viewport: `reference-1440x900.png`, `render-390x844.png`. Before comparing, check each file: its width is exactly 1440 or 390 (a 2880-wide image was taken at device scale factor 2), and open it to see that fonts and images loaded and nothing is cut off.

## The loop

Keep everything the loop produces beside the theme, never inside it, so it is never uploaded:

```
project/
  design/          the user's reference (never edited)
  theme/           the HubL theme
  theme-check/
    reference/     reference-1440x900.png, reference-390x844.png
    iteration-1/   render-1440x900.png, render-390x844.png, desktop/ and mobile/ (compare output)
    log.md
```

1. **Reference captures**, once at the start (`design-to-hubspot-theme`, step 1). For an image-only design the image is the reference: it was not captured the same way, so `identical` is out of reach and every range has to be explained by eye; say so.
2. **Render** the template as it stands now: with `serve` running, or as a file with `node "${CLAUDE_PLUGIN_ROOT}/scripts/render.mjs" render --theme-root <theme-folder> --template <name> --out theme-check/iteration-N/render.html` (add `--fixtures <dir>` when you use design fixtures).
3. **Capture** it at both viewports into `theme-check/iteration-N/`.
4. **Compare** each viewport's pair: `node "${CLAUDE_PLUGIN_ROOT}/scripts/render.mjs" compare theme-check/reference/reference-1440x900.png theme-check/iteration-N/render-1440x900.png --out theme-check/iteration-N/desktop`, and the same for 390×844 into `mobile`.
5. **List the differences by region**, top to bottom, from the ranges and your own look at their crops: "hero: heading wraps to three lines, design has two; cards: gap 16 px, design 32 px".
6. **Fix the largest first**, layout before detail: a height difference shifts everything below it, so fix the band that causes it before reading other numbers. One cause per iteration keeps the effect of each change visible.
7. **Log** the iteration in `theme-check/log.md`, one row per viewport, every iteration, even if you stop after one. `references/visual-loop.md` has the format and how to read the ranges.
8. **Repeat** from step 2.

One iteration is a render, a capture, a comparison and a fix. Stop when `compare` reports `identical` at both viewports, or when every remaining range is explained, or after 8 iterations; at the cap, still explain every remaining range rather than stopping on the count alone.

- **"Explained" has to be earned.** Open every range crop `compare` wrote (`range-1.png` onwards) at both viewports of the last iteration, and write one line per range naming the cause you saw in it. A range you have not opened is not explained, so it is one more iteration. When `compare` lists no ranges but does not say `identical`, the remaining differences are below its default threshold: run it again with `--threshold 0` and a fresh `--out` folder to see where they are, and explain those.
- **Placeholder content is reported, never hard-coded.** A difference caused by content the render does not have (a photo nobody supplied, a form's placeholder) is reported. Content the design shows belongs in a field, with the design's content as its default, or in a fixture when it comes from the account (below), never in fixed markup.
- **Never edit the reference** or recapture it differently to bring the numbers down. Never hide a region of the build, or raise the threshold, to remove a difference.
- **Compare like with like**: desktop with desktop, mobile with mobile, the same page, captured the same way.
- **The numbers say where; the crops say why.** Say what you saw.

Report the outcome in one of three ways: **pixel-verified** (`identical` at both viewports), **pixel-verified with explained differences** (each remaining range and its cause, with the latest numbers and the crops' paths), or **not pixel-verified** (and why). Never declare a match without a capture of the current build, taken after your last change.

## Fixtures

Run `fixtures --json`; write the design's real content into the files it names, or into a directory outside the theme passed with `--fixtures`, so the render carries the design's content rather than placeholders. A `fixtures/` folder inside the theme is uploaded by `hs cms upload` with everything else: keep design fixtures outside the theme, or delete the folder before upload.

- Fixtures stand in for what HubSpot keeps in the account: menus read with `menu()`, blog posts (`blog_recent_posts` and the like), HubDB rows, forms read with `form()`, brand settings, and the content of blog post, blog listing and dynamic pages (each a `--state`). `fixtures --json` gives each file's path and a JSON Schema or an example: match it exactly, because a fixture of the wrong shape can draw nothing with no diagnostic.
- A directory such as `theme-check/fixtures/` passed with `--fixtures` to `render` or `serve` is read file by file in place of the theme's; a file it lacks falls back to the renderer's own sample.
- Fixtures do not fill `@hubspot/form` or `@hubspot/menu`: those stay labelled placeholders. Content the marketer edits on the page (headings, text, images, cards) belongs in fields, never in fixtures.

## References

- `references/capture-options.md`: each way to produce the PNGs, with the exact Playwright and Puppeteer script, the headless browser commands and frame page, what was checked about each, and what to say when there is none. Read before the first capture.
- `references/visual-loop.md`: the log format, how to read the comparison and its ranges, and the usual cause of each kind of difference. Read before the first iteration.
