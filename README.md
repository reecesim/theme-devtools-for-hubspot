# Theme Dev Tools for HubSpot, by ThemeSpot

A Claude Code plugin that takes a design (a Claude Design export, HTML, CSS, Tailwind or React from ChatGPT or another AI tool, a Figma export, or an image) to an editable HubSpot theme written in HubL, checks the build against the design on a local renderer, and deploys it with HubSpot's own command-line tool.

HubSpot is a trademark of HubSpot, Inc. This plugin is not affiliated with or endorsed by HubSpot.

## What it does

Ask Claude something like "turn the design in ./design into a HubSpot theme". The plugin's skills lead it through:

1. **Pre-flight**: what this machine has (Node, the HubSpot CLI, the renderer, and any means of taking screenshots: Playwright, Puppeteer, Chrome, Edge or Chromium) and what each missing piece costs. Nothing is installed without asking.
2. **Intake and plan**: reading the design as a reference, then a plan for you to agree: theme settings from the design's colours, fonts and spacing; sections and modules for each band of the page; templates; header and footer; what HubSpot provides natively (forms, menus, CTAs).
3. **Build**: a theme started from HubSpot's CMS theme boilerplate, a copy of which comes with the plugin, with every heading, text, image, link and repeated item as an editable field whose default is the design's content.
4. **Check**: a local render and its diagnostics, then a pixel contract: full-page screenshots of the design and the build at 1440×900 and 390×844, compared with the renderer's `compare`, the largest difference fixed first, repeated until the two are identical or every remaining difference is explained from its crop, for at most eight rounds.
5. **Deploy**: HubSpot's CLI, to a new location in your account, only with your agreement, then creating a page from a template in HubSpot.

## Skills

| Skill | Loaded when |
| --- | --- |
| `design-to-hubspot-theme` | You have a design and want it as a HubSpot theme. The procedure; it loads the others. |
| `hubl-authoring` | Writing or fixing templates, sections, modules, theme fields and HubL. |
| `preview-and-validate` | Rendering, screenshots and comparing the build with the design. |
| `deploy-to-hubspot` | Installing the HubSpot CLI, signing in, uploading the theme. |

## Requirements

- Claude Code.
- Node.js 20 or newer.
- For screenshots, any one of: Playwright or Puppeteer already in your project; `playwright-core` with Chrome or Edge installed (an npm package, no browser download); Chrome, Edge or Chromium on its own, run headless; or a browser tool in your Claude Code session that saves full-page PNGs. None is required, and nothing is added without your agreement. Without any of them the build is reported as not pixel-verified. The pixel comparison itself is the bundled renderer's `compare`, which needs only Node.
- To upload the theme to HubSpot: HubSpot's CLI 8 or newer (`npm install -g @hubspot/cli`) and a HubSpot account with Design Manager access. Building and previewing the theme need neither: HubSpot's boilerplate comes with the plugin.

## Install

From GitHub, in a terminal:

```
claude plugin marketplace add reecesim/theme-devtools-for-hubspot
claude plugin install theme-devtools-for-hubspot@theme-devtools-for-hubspot
```

From a checkout of this repository, without installing:

```
claude --plugin-dir /path/to/theme-devtools-for-hubspot
```

## Scripts

The skills run these with `node`. The renderer's own `--help` lists its commands, and its preview server describes its routes at `/api/index`.

| Script | Purpose | Exit codes |
| --- | --- | --- |
| `scripts/preflight.mjs [--json]` | Reports Node, the HubSpot CLI, the renderer, and each means of taking screenshots it finds (`captureMeans`, with paths). Reads files only. | 0, or 1 when Node is older than 20 |
| `scripts/render.mjs <command> …` | Runs the vendored HubL renderer (`render`, `serve`, `list`, `fields`, `fixtures`, `metadata`, `compare`, `validate` and more: see its `--help`). Its preview server, `serve`, listens on 127.0.0.1 only. | The renderer's own, or 4 when it is not vendored |
| `scripts/scaffold.mjs <theme-folder> [--json]` | Copies the bundled HubSpot CMS theme boilerplate (`vendor/boilerplate/src/`) into a new or empty folder. Refuses a folder that already holds files; overwrites nothing. | 0, 1 when refused (nothing copied) or when a copy fails part-way (check the folder before trying again), 2 for bad arguments, 4 when the boilerplate is not bundled |

Tests: `node --test` in `scripts/`.

## What this plugin does not do

- It renders HubL locally as an approximation; HubSpot's own render is the authority. The local render uses the theme's defaults and sample or design-supplied fixtures, not your real pages, posts or HubDB rows, and does not draw CMS React modules.
- No MCP server, no account, no telemetry. The skills run this plugin's scripts with `node`; HubSpot's CLI (`hs`), `git`, and a browser or capture package for screenshots run only when you allow them. No script makes a network call; a capture tool loads only the pages you point it at. Pages the renderer draws, written to a file or shown by its preview server, may load web fonts, icon scripts and placeholder images from the network when they are opened in a browser. To answer questions about HubSpot, Claude reads HubSpot's documentation on developers.hubspot.com and knowledge.hubspot.com, through your session's web tool or a HubSpot documentation MCP server if you have one, as your permissions allow.
- It does not create, publish or change pages in HubSpot; you do that in HubSpot's page editor.
- No React (CMS React) theme guidance.
- This plugin is not for rendering, cloning or recreating a theme from HubSpot's Template Marketplace (formerly the Asset Marketplace), and its skills refuse one as the design to build from. HubSpot's documentation says purchased marketplace themes cannot be cloned, marketplace modules cannot be cloned or redistributed, even in a child theme, and a purchased theme can be in only one account at a time, transferred but not copied. A marketplace theme's licence is its provider's, and it generally does not permit copying.

Hosted [ThemeSpot](https://themespot.app), on a connected HubSpot portal, does these, which this plugin does not:

- populating pages with real content, QA, and sharing a preview with a client;
- previewing the theme on the portal's own pages, posts and HubDB rows;
- building and rendering CMS React modules;
- keeping the theme's source in managed Git with CI, where a client can see it, and deploying from there, with no HubSpot CLI on your machine.

## Privacy

- The plugin runs on your machine, inside your Claude Code session. It has no service, no account and no telemetry.
- It collects, stores and sends nothing to the plugin's author.
- The only traffic it causes to leave your machine:
  - HubSpot documentation pages Claude reads (developers.hubspot.com and knowledge.hubspot.com, or a HubSpot documentation MCP server if you have one);
  - web fonts, icon scripts and placeholder images that rendered preview pages load when you open them in a browser;
  - your own theme files, sent to your own HubSpot account when you run HubSpot's CLI to upload them;
  - whatever a capture tool you choose to install (Playwright, Puppeteer or a browser) does when it runs;
  - downloads you agree to: HubSpot's CLI from npm, or HubSpot's latest boilerplate from GitHub.
- Your Claude Code session's own traffic is Claude Code's, under its terms, not this plugin's.
- Data retention: none by the plugin's author, who receives nothing.
- Privacy questions: the repository's GitHub Issues, or GitHub's private vulnerability reporting for anything sensitive (see "Support and security").

## Support and security

- Support: open an issue at https://github.com/reecesim/theme-devtools-for-hubspot/issues.
- Security: report a vulnerability privately with GitHub's private vulnerability reporting, at https://github.com/reecesim/theme-devtools-for-hubspot/security/advisories/new, not in a public issue. `SECURITY.md` says the same.

## Licence

Copyright 2026 Reece Sim. This plugin, including the bundled renderer in `vendor/renderer/`, is licensed under the Apache License, Version 2.0 (see `LICENSE` and `NOTICE`). The renderer's third-party notices are in `vendor/renderer/NOTICE`. The copy of HubSpot's CMS theme boilerplate in `vendor/boilerplate/` is Copyright 2020 HubSpot, Inc., also under the Apache License, Version 2.0 (`vendor/boilerplate/LICENSE`), and is included unchanged; `vendor/boilerplate/MANIFEST.json` records the commit it was copied from.
