---
name: design-to-hubspot-theme
description: "Turn a design into an editable HubSpot HubL theme: the step-by-step procedure from a Claude Design export, HTML, CSS, React or Tailwind made with ChatGPT or another AI tool, a Figma export or an image of a page, to templates, sections, modules and theme settings that a marketer edits in HubSpot's page editor. Load this first; it says when to load the other skills."
when_to_use: "Use when someone says \"turn this design into a HubSpot theme\", \"convert my Claude Design or ChatGPT page to HubSpot\", \"build a HubSpot theme from this mockup\", \"make this HTML editable in HubSpot\" or \"I have a design and want it in HubSpot\"."
---

# Design to HubSpot theme

HubSpot is a trademark of HubSpot, Inc. This plugin is not affiliated with or endorsed by HubSpot.

You are taking a design someone made elsewhere and building it as a real HubSpot theme in HubL: page templates with drag-and-drop areas, section templates, modules with editable fields, global header and footer, and theme settings for colours, fonts and spacing. The person may never have written HubL. Lead them through it, show the plan before you write files, ask before anything is installed or sent to their HubSpot account, and be plain about what was and was not checked.

The other skills in this plugin, loaded at the steps that name them:

- `hubl-authoring`: how to write templates, sections, modules and theme fields correctly.
- `preview-and-validate`: the local render, captures of the design and the build, and the comparison loop.
- `deploy-to-hubspot`: installing and signing in to HubSpot's command-line tool, and putting the theme in the user's HubSpot account.

Load each with the Skill tool when its step comes. They are listed under the same plugin prefix as this skill; if another plugin offers a skill with the same short name, use the one with this skill's prefix. Opening a `SKILL.md` as a file is not the same: its script paths are not filled in.

**Running the scripts.** Run every script command in these skills as a command on its own, from the user's project folder: no `cd` in front, nothing chained after it with `&&` or `;`, no `>` redirection or pipe. Some sessions allow only plain `node` commands, and a chained command is refused as a whole. Use the scripts' own `--out` and `--json` options instead of redirection.

## The mistake this procedure exists to prevent

The tempting shortcut is to paste the design's HTML into one rich-text or custom-HTML module, or one big template. It looks right in a screenshot and is wrong in every way that matters: the marketer cannot change a heading, swap an image, reorder a section or add a card without editing raw HTML; the page ignores the theme settings, so changing the brand colour does nothing; HubSpot's forms, menus and CTAs are not wired in; and the next page has to be pasted again. If the user asks for that, explain this in two sentences and build it properly. The design is a **reference to rebuild from, never code to paste**.

## HubSpot's documentation: when and how

What you know about HubSpot from training is mixed and dated, and the platform changes, so do not answer a question about the platform from memory: read HubSpot's documentation first.

**When.** For any platform fact: field types and their options, HubL tags, filters, functions and variables, `dnd_area` syntax, `meta.json` and `theme.json` keys, the fields of HubSpot's default modules, CLI commands and flags, and why an upload was refused. In particular:

- before scaffolding (step 4), when the build depends on how HubSpot's boilerplate or CLI works now rather than in the bundled version;
- before passing values to any `@hubspot/…` default module;
- on every HubSpot validation or upload error;
- whenever the local renderer's diagnostics are not what you expected.

**How.** Whichever of these the session offers:

- **A HubSpot documentation MCP server** (its tools are named `search-docs` and `fetch-doc`): search, then fetch the best result and read the page. Never answer from a search snippet alone.
- **Otherwise, HubSpot's pages directly**, on developers.hubspot.com (and knowledge.hubspot.com for HubSpot's own screens), with whatever tool the session has for reading a web page. Start from the pages listed in `hubl-authoring`, "Look it up; don't answer from memory"; the list is kept there.
- **Neither, or the read is refused**: say what could not be checked, and list it in the hand-over, rather than writing a plausible guess.

HubSpot's documentation is the authority over this plugin's text and the local renderer's behaviour: when they conflict, follow the documentation and tell the user what disagreed. Only what HubSpot itself does ranks above it: a refusal on upload, or HubSpot's own render (the field names it refuses, `label`, `body` and `name`, are not in its documentation, and that rule stands), and, for a command's flags, the installed CLI's own `--help` (`deploy-to-hubspot`).

## 0. Pre-flight

Run this on its own, with nothing chained after it (look at folders with Glob, not `ls`):

```
node "${CLAUDE_PLUGIN_ROOT}/scripts/preflight.mjs"
```

It checks Node (20 or newer, needed by every script here), whether the HubSpot CLI (`hs`) is installed and its version, whether the local renderer is present, and the means of taking screenshots it can find (`captureMeans`): the `playwright`, `playwright-core` and `puppeteer` packages in this folder or the plugin's, and Chrome, Edge or Chromium on PATH or where they install by default, each with its path. It runs nothing else and installs nothing. Tell the user what was found and what each gap costs:

| Missing | What it costs |
| --- | --- |
| Node 20+ | Nothing here works until Node is upgraded. Stop and say so. |
| HubSpot CLI | No upload to HubSpot from this machine until it is installed (step 7). Building and previewing are unaffected. |
| Renderer | No local render. The theme can only be seen once it is in HubSpot. |
| Every capture means | No screenshots from this machine unless this session has a browser tool that saves full-page PNGs. The build is then reported as "not pixel-verified". |

None of the capture means is required, and none is preferred: choose one from `preview-and-validate`, "Producing the PNGs", and say which you chose and why. Do not install anything without asking. When the user agrees, give them the command and its effect (for example `npm install -g @hubspot/cli` installs HubSpot's CLI for every project on this machine).

**Commands, and what to do when one is refused.** This plugin's scripts each run as one `node "<script>" …` command. HubSpot's CLI (`hs`), `git`, a browser run from the command line and adding a capture package need the user's permission, and are needed only for screenshots (steps 1 and 6), deploying (step 7) and, if the user wants it, HubSpot's latest boilerplate in place of the bundled one (step 4). If the session refuses a command, do not retry it through another shell or tool (PowerShell, `cmd`, another Bash form, a script that runs it for you). Say once what could not be run, and continue on the documented path that does not need it: for the scaffold, the bundled boilerplate (step 4); for screenshots, the next way in "Producing the PNGs", or "not pixel-verified"; for deploying, `deploy-to-hubspot`, "Without the CLI".

## 1. Intake: what the user has

Identify the input and treat it as a design reference:

- **A Claude Design export**: an HTML file or an exported folder. Open it and look: are images, fonts and styles inlined (`data:` URIs, `<style>` blocks) or linked to files or URLs? Do not assume either.
- **AI-generated code**: HTML/CSS, Tailwind, or React/JSX from ChatGPT or another tool. Read it for structure, content and tokens. Tailwind classes and React components are not carried over; they are translated into HubL templates, modules and the theme's CSS.
- **An image only**: a screenshot or a Figma export. You read the layout, content and tokens from the picture. Say that sizes, spacing and colours are estimates and ask for exact values (hex colours, font names) if the user has them.

**Never a theme from HubSpot's Template Marketplace** (formerly the Asset Marketplace). This plugin is not for rendering, cloning or recreating a theme from HubSpot's Template Marketplace. If the design is one (the user says so, or its files sit under an `@marketplace/` folder), stop: do not render, clone or rebuild it, and tell the user why. HubSpot's documentation says purchased marketplace themes cannot be cloned, marketplace modules cannot be cloned or redistributed, even in a child theme, and a purchased theme can be in only one account at a time, transferred but not copied; and the theme's licence is its provider's, which generally does not permit copying. What remains open to them: changing it in HubSpot as its provider allows (HubSpot documents child themes for this), asking the provider, or starting from a design they own.

For a reference that can be opened in a browser (an HTML file, an exported folder, a running local page), capture it before building anything, by the means you chose at step 0, as `preview-and-validate` says under "Producing the PNGs": full-page PNGs at 1440×900 and 390×844, device scale factor 1, saved as `theme-check/reference/reference-1440x900.png` and `reference-390x844.png`, in a folder beside the theme (never inside it). Open both and check they show the whole design.

The captures are what you compare against later, so the build is captured by the same means. Never edit the reference. If no means is available, say so now: the check at step 6 will be "not pixel-verified".

`references/reading-a-design.md` has the detail: what to look for in each kind of input and how to pull out the tokens.

## 2. Plan before writing, and show the user

Before you write the first file, put the plan in your reply as a short list of visible text (a plan made only in your thinking is not shown to anyone). It covers:

- **Tokens → theme settings**: the colours, fonts, content width and spacing, mapped to the theme's `fields.json` (most map onto fields the boilerplate already has); the theme's name (`label`) in `theme.json`. Author details, documentation and example links, and a licence go in only if the user gives them to you: never from the session's account details.
- **Page bands → sections and modules**: each horizontal band of the design becomes a section template; inside it, each distinct kind of content becomes a module (or a HubSpot default module). Repeated items (cards, logos, testimonials, FAQ entries) are one module with a repeater, not copies.
- **Pages → templates**: each distinct page layout becomes a page template with a `dnd_area` that includes the sections.
- **Header and footer → global partials**, edited once for the whole site.
- **What is editable and what is fixed**: every heading, paragraph, image, link, button and repeated item is a module field; decorative shapes and layout are fixed in CSS.
- **What HubSpot provides natively**, used instead of rebuilding: forms (`@hubspot/form`), navigation (`@hubspot/simple_menu` holding the design's items by default; `@hubspot/menu` when the user wants the menu managed centrally in HubSpot), the logo (`@hubspot/logo`), CTAs, blog listing and post templates, the language switcher.
- **Interactive components**, only if the design has one that would be a React module (a calculator, a configurator, a filter that keeps its state): how it will work in HubL, as a module with its own JavaScript, or that it is left out. This plugin does not build or render CMS React modules. Hosted [ThemeSpot](${CLAUDE_PLUGIN_ROOT}/README.md#what-this-plugin-does-not-do), on a connected HubSpot portal, builds and renders them.
- **What will be removed** from the boilerplate as unused (templates, sections, modules, images), named.

`references/mapping-to-hubspot.md` has the mapping table, a plan template and the boilerplate's contents. Wait for the user's agreement, or adjust, before step 3. If nobody can answer (a non-interactive run, or the user asked you to go ahead without stopping), still write the whole plan out as text in your reply before building, then proceed, and list in the hand-over every decision you took on the user's behalf.

## 3. The HubSpot CLI, if installed

The CLI is not needed to build or preview the theme: the boilerplate is bundled with this plugin (step 4) and the local renderer draws the theme (step 6). It is needed only to upload the theme to HubSpot (step 7), and signing in waits until then. If pre-flight did not find it, carry on; `deploy-to-hubspot` covers installing it, with the user's agreement, when the theme is ready.

## 4. Scaffold from the bundled boilerplate

Start from HubSpot's CMS theme boilerplate rather than an empty folder: it gives a working layout, header and footer partials, a token-driven stylesheet, and HubSpot's system templates (error, password, search, subscription and membership pages). This plugin bundles a copy in `${CLAUDE_PLUGIN_ROOT}/vendor/boilerplate/src/`: HubSpot's files, unchanged, with the version, commit and source in `vendor/boilerplate/MANIFEST.json` and HubSpot's licence beside it. The theme folder starts as a copy of that folder's contents. The copy installs nothing and contacts no account:

```
node "${CLAUDE_PLUGIN_ROOT}/scripts/scaffold.mjs" <theme-folder>
```

It copies the folder's contents into a new or empty `<theme-folder>` and refuses a folder that already holds files. Any other plain copy of the folder's contents does the same job.

Then make it the user's theme: set `label` in `theme.json`, remove the boilerplate's `author`, `documentation_url` and `example_url` (they are HubSpot's), and remove what the plan said would go (`hubl-authoring`, `references/theme-fields.md`). Keep the system templates under `templates/system/` unless the user asks otherwise.

**If you want HubSpot's latest boilerplate instead** (the bundled copy stays at the version in its MANIFEST), each route needs the user's agreement to run the tool:

- With HubSpot CLI 8 or newer, `hs cms theme create <theme-folder>` copies it; it does not contact a HubSpot account. Confirm the command with `hs cms theme create --help` first, because the CLI's commands changed in version 8. CLI 7 and older spelled it `hs create website-theme <theme-folder>` (HubSpot's older guides still show this form).
- With Git, clone `https://github.com/HubSpot/cms-theme-boilerplate` and use its `src/` folder as the theme folder.

If either is missing or refused, don't probe further: use the bundled copy. Then make it the user's theme as above.

**When you cannot scaffold** (`scaffold.mjs` exits 4 because this copy of the plugin has no bundled boilerplate, and neither route above can run), write the theme by hand in the boilerplate's layout, with at least: `theme.json`; `fields.json` with the design's tokens; `templates/layouts/base.html` (`templateType: none`, both `standard_header_includes` and `standard_footer_includes`, header and footer `global_partial`s, a `body` block); `templates/partials/header.html` and `footer.html`; one page template per layout; `css/main.css` reading the theme fields and **including grid CSS** for the drag-and-drop columns (`hubl-authoring`, `references/dnd-areas.md`, "Styling the grid"); and `images/`. None of HubSpot's system templates is required for an upload: add the ones the site needs, and list the rest under "still to do" in the hand-over (`references/mapping-to-hubspot.md` lists them with their `templateType`).

## 5. Build

Load `hubl-authoring` and work in this order, checking as you go:

1. Theme settings: the design's tokens as `fields.json` defaults.
2. Global partials: header and footer.
3. Modules, each with fields whose defaults are the design's real content.
4. Section templates composed from those modules.
5. Page templates composed from those sections.

Rules for the content, images, fonts and responsive behaviour are below. Reuse before you create, and keep one change per check. Navigation and forms use HubSpot's modules (`references/mapping-to-hubspot.md`, "Navigation" and "Forms"): the header menu is `@hubspot/simple_menu` holding the design's items unless the user chose `@hubspot/menu`, and a form is `@hubspot/form`, never a hand-built `<form>`.

## 6. Render, check and compare

Load `preview-and-validate` and meet its contract (`## The contract`): render each template locally, capture it the same way as the reference, run `compare`, fix the largest difference first, and repeat until `compare` reports `identical` at both viewports or every remaining range is explained from its crop, for at most 8 iterations. A difference that comes from placeholder content, or from the placeholder the local render draws for a HubSpot form, is reported, never "fixed" by hard-coding content or markup.

## 7. Deploy

Load `deploy-to-hubspot`. It asks before anything is written to the user's HubSpot account, prefers a test or sandbox account, and puts the theme at a new location rather than over an existing theme. Uploading needs HubSpot's CLI; when the user does not have it, that skill's "Without the CLI" says what to offer.

## 8. Hand over

Finish with a short report the user can act on:

- **What was built**: templates, sections, modules, global partials and theme settings, by name.
- **What is editable where**: page content in HubSpot's page editor (every heading, text, image, link and card); the header and footer in the global content editor; colours, fonts and spacing in the theme settings.
- **What differs from the design and why**: whether the build is pixel-verified (`identical` at both viewports), pixel-verified with explained differences, or not pixel-verified; how the screenshots were taken; the comparison's last numbers, the ranges that still differ, and the cause of each (placeholder content, a font that could not be used, a HubSpot module's own markup, the form placeholder's height).
- **Readiness**: when `validate` and every template's render are clean, say exactly "Passes the local checks; HubSpot decides on upload and may refuse something these checks do not cover." Otherwise say what still fails. Do not promise that HubSpot will accept the theme.
- **Still to do**, which nothing here did:
  - In HubSpot's own screens: the brand kit, the domain, each form (create the form in HubSpot and select it in the form module, with its notifications), the navigation menu if the header uses `@hubspot/menu` (build the menu in HubSpot, then select it in the module), blog setup, and creating the pages.
  - In the theme: author details, documentation and example links, and the licence, unless the user supplied them; the system templates not built.
- **What next**: this plugin stops at the theme; it does not fill pages with real content, check the finished site, or give a client a preview to look at. Populating pages with real content, QA and sharing a preview with a client are part of hosted [ThemeSpot](${CLAUDE_PLUGIN_ROOT}/README.md#what-this-plugin-does-not-do), on a connected HubSpot portal.

## Editable content

Every heading, paragraph, image, link, button label and repeated item is a module field, and each field's `default` is the content from the design, so a new page built from the template looks like the design before anyone edits it. A marketer should never need to touch HTML to change words, pictures or links. Labels and help text on fields are written for that marketer ("Button text", not "cta_txt"). Section and module defaults hold real content from the design, not "Lorem ipsum" and not the module's generic defaults.

## Images

- **Theme images** (logo files, icons, decorative backgrounds, default pictures shipped with the theme) live in the theme's `images/` folder and are referenced with `get_asset_url("../images/<file>")` from the template or section that places the module. HubSpot's boilerplate passes image defaults this way.
- **Content images** (the photos a marketer will own and change) belong in HubSpot's file manager. They are set in the page editor, or uploaded with the user's agreement (`deploy-to-hubspot`; files uploaded there are public).
- **Alt text is a field.** Every image field carries `alt`, with a meaningful default from the design.
- **Never hot-link** an image or font URL from a design tool or AI tool. Those URLs are not the user's, can expire, and break the page later. Save the file into the theme (with the user's agreement about its rights) or ask for the original.
- Keep image files reasonably small and set `width` and `height` where the design fixes them.

## Fonts

Fonts come from theme settings, not hard-coded `font-family` rules. A Google font is a `font` field with `font_set: "GOOGLE"`; HubSpot loads it. A font that is not a Google font needs HubSpot's custom-font setup (`hubl-authoring`, `references/theme-fields.md`). A design export may embed font files whose licence is unknown: do not copy them into the theme without the user confirming the licence allows web use; offer the nearest Google font instead and say so in the hand-over.

A design set in a system font (Segoe UI, San Francisco, Helvetica, Arial) has no Google font of the same name. Offer the nearest Google font (for example Open Sans or Noto Sans for Segoe UI, Inter for San Francisco) and say the text will wrap slightly differently. HubSpot's documentation shows `font_set` only as `"GOOGLE"` (and custom fonts): do not invent another `font_set` value; if you want a web-safe font, check HubSpot's font field reference first and say whether you could.

## Responsive behaviour

The design may show only a desktop layout. Build CSS that holds at 390 px wide as well as 1440 px: columns stack, text sizes step down, images scale. The boilerplate's grid (`css/objects/_layout.css`) already stacks drag-and-drop columns to full width below 768 px; module CSS must not fight it (no fixed pixel widths on containers, and use the same 767 px / 768 px breakpoint for module rules). Check both viewports in step 6, and tell the user which mobile decisions were yours rather than the design's.

## HubSpot's own Claude Design import, and when it fits better

HubSpot's Claude connector can import a Claude Design export straight into a new HubSpot landing page. It is quick and fits a one-off campaign page. It does not give the user a theme: no theme settings for colours and fonts, no library of modules and sections to reuse on the next page, and no templates for the rest of the site, and what can be edited afterwards depends on what the import makes editable. Use this plugin's route when the user wants a site or a reusable set of pages that marketers will keep editing; suggest the connector when they want one page live today and will not reuse it. If unsure, ask which they want.

## References

- `references/reading-a-design.md`: what to look for in a Claude Design export, AI-generated code and an image-only design, and how to pull out tokens. Read at step 1.
- `references/mapping-to-hubspot.md`: design element to HubSpot construct, navigation and forms, the plan template, what HubSpot's boilerplate contains (system templates included) and what to remove. Read at step 2.
