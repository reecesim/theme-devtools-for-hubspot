# Changelog

## 0.3.1

- Renamed: the plugin is `theme-devtools-for-hubspot`, listed as "Theme Dev Tools for HubSpot, by ThemeSpot" (it was `theme-devkit-for-hubspot`). Its skills keep their names; their namespace follows the plugin name. The renderer's command, `themespot-render`, is unchanged.
- The plugin is in Reece Sim's name: `author` in `plugin.json`, a new root `NOTICE` (the copyright, the Apache-2.0 statement, where `skills/hubl-authoring/` comes from, and a pointer to the renderer's notices) and the README's Licence section.
- Bundles renderer 1.0.101 (was 1.0.100), with the same commands. The names it writes into rendered pages (data attributes, CSS custom properties and class names) now use `themespot`, its NOTICE is in Reece Sim's name, and its `package.json` is no longer marked private.
- The README says that rendered pages may load web fonts, icon scripts and placeholder images from the network.
- `plugin.json` has no `homepage` or `repository` yet: they are filled in when the public repository exists.

## 0.3.0

- Bundles renderer 1.0.100 (was 1.0.98). Its `--help` and its preview server's `/api/index` are now the reference for its commands and routes; the skills no longer repeat them. New commands: `list`, `fields`, `fixtures`, `metadata` and `compare`, and `render` draws one module, section or partial as well as a template.
- States the pixel check as a contract: full-page screenshots of the design and the build at 1440×900 and 390×844, compared until `compare` reports them identical or every remaining range is explained from its crop, for at most eight rounds. A build not captured after the last change is not verified.
- No capture tool is required. Pre-flight reports each means of taking screenshots it finds (Playwright, Puppeteer, Chrome, Edge, Chromium) with its path, and the guidance gives the exact script or commands for each, including headless Chrome or Edge with no package at all. Nothing is installed without asking. The plugin's own capture and comparison scripts are removed: the renderer's `compare` replaces the comparison.
- Fixtures: the design's content (menus, blog posts, HubDB rows, blog and dynamic-page content) can be written into fixture files kept outside the theme, so the render carries it instead of samples.

## 0.2.0

- Warns about the field names HubSpot's upload refuses (`label`, `body` and `name`, at any depth); the bundled renderer's `validate` now reports them, and the plugin's own examples no longer use them.
- Reports a finished theme as "passes the local checks" rather than promising an upload, and walks through fixing a refused upload one error at a time.
- Builds navigation with HubSpot's simple menu holding the design's items, which the local render now draws; uses HubSpot's form module for forms; lists HubSpot's system templates.
- Leaves the theme's author, links and licence for you to supply, and does not retry a refused command through another tool. The local render now names a missing module or partial, and `validate` warns about a page template without HubSpot's required includes.

## 0.1.0

- First release: four skills that take a design to an editable HubSpot HubL theme, check it against the design on a bundled local renderer, and deploy it with HubSpot's CLI.
- Scripts for a pre-flight check, full-page screenshots and pixel comparison.
