# Theme Dev Tools for HubSpot, by ThemeSpot

A Claude Code plugin that takes a design (a Claude Design export, HTML, CSS, Tailwind or React from ChatGPT or another AI tool, a Figma export, or an image) to an editable HubSpot theme written in HubL, checks the build against the design on a local renderer, and deploys it with HubSpot's own command-line tool.

HubSpot is a trademark of HubSpot, Inc. This plugin is not affiliated with or endorsed by HubSpot.

## What it does

Ask Claude something like "turn the design in ./design into a HubSpot theme". The plugin's skills lead it through:

1. **Pre-flight**: what this machine has (Node, the HubSpot CLI, the renderer, and any means of taking screenshots: Playwright, Puppeteer, Chrome, Edge or Chromium) and what each missing piece costs. Nothing is installed without asking.
2. **Intake and plan**: reading the design as a reference, then a plan for you to agree: theme settings from the design's colours, fonts and spacing; sections and modules for each band of the page; templates; header and footer; what HubSpot provides natively (forms, menus, CTAs).
3. **Build**: a theme scaffolded from HubSpot's CMS theme boilerplate, with every heading, text, image, link and repeated item as an editable field whose default is the design's content.
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
- To scaffold and deploy: HubSpot's CLI 8 or newer (`npm install -g @hubspot/cli`) and a HubSpot account with Design Manager access.

## Try it from a folder

```
claude --plugin-dir /path/to/theme-devtools-for-hubspot
```

## Scripts

The skills run these with `node`. The renderer's own `--help` lists its commands, and its preview server describes its routes at `/api/index`.

| Script | Purpose | Exit codes |
| --- | --- | --- |
| `scripts/preflight.mjs [--json]` | Reports Node, the HubSpot CLI, the renderer, and each means of taking screenshots it finds (`captureMeans`, with paths). Reads files only. | 0, or 1 when Node is older than 20 |
| `scripts/render.mjs <command> …` | Runs the vendored HubL renderer (`render`, `serve`, `list`, `fields`, `fixtures`, `metadata`, `compare`, `validate` and more: see its `--help`). | The renderer's own, or 4 when it is not vendored |

Tests: `node --test` in `scripts/`.

## What it does not do

- It renders HubL locally as an approximation; HubSpot's own render is the authority. The local render uses the theme's defaults and sample or design-supplied fixtures, not your real pages, posts or HubDB rows, and does not draw CMS React modules.
- No MCP server, no account, no telemetry. No script makes a network call; a capture tool loads only the pages you point it at. Pages the renderer draws, written to a file or shown by its preview server, may load web fonts, icon scripts and placeholder images from the network when they are opened in a browser.
- It does not create, publish or change pages in HubSpot; you do that in HubSpot's page editor.
- No React (CMS React) theme guidance.

## Licence

Copyright 2026 Reece Sim. This plugin, including the bundled renderer in `vendor/renderer/`, is licensed under the Apache License, Version 2.0 (see `LICENSE` and `NOTICE`). The renderer's third-party notices are in `vendor/renderer/NOTICE`.
