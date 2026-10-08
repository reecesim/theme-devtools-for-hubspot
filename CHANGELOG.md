# Changelog

## 0.4.0

- The HubSpot personal access key can be entered in the plugin's configuration (`/plugin configure theme-devtools-for-hubspot@theme-devtools-for-hubspot`), with the numeric account ID it belongs to. Both options are optional. The key is a sensitive option: Claude Code masks it, keeps it in the system's secure credential store, and substitutes it only into the environment of the plugin's MCP server, so it never appears in the chat, a file Claude can read, or a command line.
- New `hubspot-cli` MCP server (`scripts/hubspot-cli-server.mjs`, no dependencies), declared in `plugin.json`. It runs HubSpot's CLI with `--use-env` for five tools: `hs_version`, `hs_cms_list`, `hs_cms_upload`, `hs_cms_fetch` and `hs_filemanager_upload`. `hs` is found on PATH and its package's JavaScript entry run with Node, without a shell. It refuses any argument that starts with `-`, offers no `cms lint` (it does not accept `--use-env`; it stays on the `hs account auth` route), `--clean`, `watch`, `--remove`, `theme preview` or `account` command, stops a command after 10 minutes, and replaces the key with `[redacted]` in everything it returns. Without both values, every tool but `hs_version` refuses, runs nothing, and names `/plugin configure` and `hs account auth`.
- `deploy-to-hubspot` has two sign-in routes: the plugin's configuration, after which every CLI command runs through the `hubspot-cli` tools with no `--account`; or `hs account auth` in the user's own terminal, after which `hs` runs through Bash with `--account`, as before. `hs_version` says which applies. A key is entered in exactly two places, HubSpot's own sign-in prompt or the plugin's configuration dialog, and never in the chat, a file or a command line. Steps 3 to 6 name the tool and the command for each route. What one yes covers, and asking before anything that writes to the account, apply to the tools unchanged.
- The README has a Configure section, names both routes under Requirements, lists the server under Scripts, and says the plugin never reads a key from `~/.hscli/config.yml` or any other file.
- `preflight.mjs` and the server share `scripts/lib/hubspot-cli.mjs` to find the CLI. Bundles renderer 1.0.102, unchanged.

## 0.3.2

- HubSpot's CMS theme boilerplate is bundled: `vendor/boilerplate/src/` is HubSpot's `src/` at v3.14.2 (commit 656aaeb), unchanged, with HubSpot's licence beside it and a MANIFEST of every file's size and sha256. The new `scripts/scaffold.mjs` copies it into a new or empty theme folder, so building and previewing a theme no longer need HubSpot's CLI or Git. `hs cms theme create` and a clone of HubSpot's repository stay as the way to get HubSpot's latest boilerplate instead.
- The entry skill, `design-to-hubspot-theme`, says when and how to read HubSpot's documentation: for any platform fact, rather than from memory, and in particular before scaffolding, before passing values to a HubSpot default module, on every validation or upload error, and when the local renderer's diagnostics are unexpected; through a HubSpot documentation MCP server (`search-docs`, then `fetch-doc`) when the session has one, and otherwise from developers.hubspot.com directly. The documentation wins over this plugin's text and the local render, and the agent says when they disagreed.
- `preview-and-validate`: a diagnostic that raises a question about a HubSpot default module or a HubL construct is answered from HubSpot's documentation, not from the renderer. It also lists `FIELD_REQUIRED_NO_DEFAULT`, which `validate` reports once on the untouched bundled boilerplate (the pricing card's `payment_link`), and says not to change HubSpot's file silently.
- `deploy-to-hubspot` has a "Without the CLI" section. HubSpot's documentation gives no way to upload a theme folder or a zip of one from HubSpot's own screens, so uploading still needs the CLI; the skill says so and what to offer. Pre-flight and the entry skill no longer say the CLI is needed to scaffold.
- Where the free tool stops (the hand-over's "what next", a request to see the account's real content, an interactive component that would be a React module, no CLI or a source a client should see), the skills say what this plugin cannot do, then name hosted ThemeSpot in one sentence that links to the README's "What this plugin does not do", which holds the only link.
- The README has an Install section (from GitHub with `claude plugin marketplace add` and `claude plugin install`, or from a checkout with `--plugin-dir`), says what the plugin runs and that Claude reads HubSpot's documentation from the web, and its "What this plugin does not do" section lists what hosted ThemeSpot does instead.
- Not for themes from HubSpot's Template Marketplace: the entry skill's intake step refuses one as the design to build from and says why (HubSpot's documentation on cloning, child themes and single-account purchases, and the provider's licence), and the README says the same.
- The README has a Privacy section (what runs, what leaves the machine, no retention, where to ask) and a Support and security section; `SECURITY.md` points vulnerability reports to GitHub's private vulnerability reporting.
- Bundles renderer 1.0.102 (was 1.0.101). Its source and commands are unchanged; the build is now readable, code-split JavaScript instead of one minified file: the entry `vendor/renderer/themespot-render.mjs` and the modules it loads in `vendor/renderer/chunks/`, with no source comments and every file under 256 KiB. `scripts/render.mjs` runs the same entry, and the chunks load relative to it.

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
