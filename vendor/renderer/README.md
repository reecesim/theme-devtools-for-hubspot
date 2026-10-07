# themespot-render

A command-line renderer for HubSpot CMS themes written in HubL. It turns a theme
folder on your machine into HTML pages, with no HubSpot account involved. It
needs Node.js 20 or later and nothing else: `themespot-render.mjs` is one file
with its dependencies inside it.

## Commands

    node themespot-render.mjs list --theme-root ./my-theme [--kind module]
    node themespot-render.mjs render --theme-root ./my-theme --template home.html --out home.html
    node themespot-render.mjs render --theme-root ./my-theme --module ../modules/card --props '{"title":"Hi"}'
    node themespot-render.mjs serve --theme-root ./my-theme
    node themespot-render.mjs compare design.png build.png --out ./diff
    node themespot-render.mjs fixtures --theme-root ./my-theme
    node themespot-render.mjs fields --theme-root ./my-theme --module ../modules/card
    node themespot-render.mjs metadata --theme-root ./my-theme
    node themespot-render.mjs templates --theme-root ./my-theme
    node themespot-render.mjs validate --theme-root ./my-theme
    node themespot-render.mjs generate-css --theme-root ./my-theme --output theme.css
    node themespot-render.mjs help render

`list` prints the names `render` accepts: page templates, modules, sections,
global partials and content states. `render` draws exactly one of them
(`--template`, `--module`, `--section` or `--partial`); `--props` gives a module
field values, `--overrides` sets theme settings or a preset, `--state` renders
as a blog post, listing or dynamic page. `serve` previews the theme at
http://127.0.0.1:3456/, re-rendered from disk on every request, and
`GET /api/index` describes every route with examples. `compare` diffs two
screenshots pixel by pixel. `fixtures` describes the files that stand in for
portal data; `--fixtures <dir>` reads a folder of them instead of the theme's.
`fields` prints a module's fields and `metadata` the theme's settings and presets.
`--json` prints one JSON object; `help <command>` prints that command's help.

## What is not drawn

React modules are not rendered by this build. Each one appears as a placeholder
naming the module, marked `data-module-not-rendered="react"`, and the render
reports `REACT_MODULE_NOT_RENDERED`. HubSpot default modules whose output comes
from a portal (forms, `@hubspot/menu`, blog listings) appear as labelled
placeholders; `@hubspot/simple_menu` draws the menu items the template passes.
Portal data comes from sample fixtures. A module, partial or global partial the
theme names but does not have is reported by name.

A page rendered to a file loads the theme's assets through `file://` URLs, so it
displays correctly only on the machine that rendered it. Use `serve`, or
`--asset-base <url>`, for anything else.

## Network use

Rendered pages may load web fonts, icon scripts and placeholder images from the
network when they are opened in a browser.

## Licence

This build is licensed under the Apache License, Version 2.0: see `LICENSE`.
The copyright notice and third-party notices are in `NOTICE`.
