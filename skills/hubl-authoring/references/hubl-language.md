# HubL language: syntax, control flow and template composition

The dnd, quoting and token rules cover *placing* content. This covers the language you edit when you change template logic, a module's markup or a section's behaviour. Read it before you touch anything beyond a flat dnd tree.

## Delimiters and comments

- `{{ expression }}`: output. Prints a value: `{{ module.heading }}`, `{{ content.absolute_url }}`.
- `{% tag %}`: logic. Does something: `{% if %}`, `{% for %}`, `{% set %}`, `{% dnd_module %}`.
- `{# comment #}`: not rendered and not sent to the page. Use this, not `<!-- -->`, for a note that shouldn't reach the browser. (The template annotation at the top of a file is the one HTML comment HubSpot reads.)

`html=` on a `dnd_module` takes a string literal, not `{{ }}`, unless the value is an expression (see the main skill). Everywhere else, output goes in `{{ }}`.

## Variables

`{% set price = 49 %}`, `{% set sizes = ["small", "large"] %}`, `{% set card = { "title": "Plan" } %}`. Variables hold strings, numbers, booleans, lists and dictionaries.

**Variable names take underscores, never hyphens.** `{% set call_to_action %}` is fine; `{% set call-to-action %}` is a parse error, because HubL reads the `-` as subtraction.

Join strings with `~`: `{{ module.size ~ "px" }}`. A conditional value can use the ternary form HubSpot's boilerplate uses: `{% set attr = module.image.loading != "disabled" ? 'loading="lazy"' : "" %}`.

## Control flow

```
{% if module.layout == "wide" %}
  …
{% elif module.layout == "narrow" %}
  …
{% else %}
  …
{% endif %}
```

```
{% for card in module.cards %}
  <article>{{ card.title|escape_html }}</article>
{% endfor %}
```

Inside a `for`, the `loop` object is available: `loop.index` (1-based), `loop.index0` (0-based), `loop.first`, `loop.last`, `loop.length`. Use `loop.first` / `loop.last` for edge styling rather than counting by hand.

Trim surrounding whitespace with `-`: `{%- if x -%}` … `{%- endif -%}`. Use it only when stray whitespace actually breaks layout.

## Template composition: extends, block, include, global_partial, module

Most page templates don't repeat the `<html>`/`<head>`/`<body>` shell; they **extend a layout** and fill named blocks:

```
{% extends "./layouts/base.html" %}
{% block body %}
  {% dnd_area "main" %} … {% end_dnd_area %}
{% endblock body %}
```

- `{% extends "path" %}`: inherit a layout. The child overrides only the blocks it names; everything else (the `<head>`, the includes, the wrapper) comes from the layout.
- `{% block name %} … {% endblock %}`: a slot the layout defines and a child fills. When you edit a template that `extends`, you are editing inside its blocks: **do not** add a second `<html>` or `<head>`; the layout owns those.
- `{% include "path" %}`: pull in a partial's output.
- `{% global_partial path="../partials/header.html" %}`: include a global partial (header, footer: content shared and edited site-wide in HubSpot's global content editor). **Never put a `global_partial` in `<head>`**: HubSpot says that produces invalid HTML. For shared `<head>` content use a global module with `{% require_head %}`.
- `{% module "logo" path="@hubspot/logo" label="Logo" %}`: place a module outside a drag-and-drop area, for example inside a header partial. The first argument is a name that must be unique in the file.

Before editing a template, know whether it is a **layout** (owns the shell), a **page template that extends one** (owns blocks), or a **partial or section** (owns a fragment). Editing the wrong layer is how the shell gets duplicated or lost.

## Required includes: a page cannot work without these

A layout, or any template that writes its own `<html>`, MUST carry both, or the page renders without HubSpot's CSS, scripts, tracking and editor support:

- `{{ standard_header_includes }}`: the last thing in `<head>`. Emits HubSpot's required CSS and meta tags, attached stylesheets, and everything queued with `require_css` and `require_head`.
- `{{ standard_footer_includes }}`: just before `</body>`. Emits the tracking code, the footer HTML from settings, and everything queued with `require_js`.

A partial, or a page template that `extends` a layout, does **not** repeat these: the layout provides them. If `require_css` or `require_js` assets don't load, a missing include is the first thing to check.

## Macros

```
{% macro price_tag(amount, currency="£") %}
  <span class="price">{{ currency }}{{ amount }}</span>
{% endmacro %}
{{ price_tag(49) }}
```

Import from another file with `{% import "../partials/macros.html" as ui %}` then `{{ ui.price_tag(49) }}`. A macro that calls itself must have a case that stops.

## Escaping: pick the filter for the context

Escape a value according to where it lands. Getting this wrong is a security hole, not a cosmetic bug:

- Text in the page body: `{{ value|escape_html }}`.
- Inside an HTML attribute: `{{ value|escape_attr }}`.
- A URL in `href` or `src`: `{{ value|escape_url }}`.
- Rich text field content: `{{ module.body_text|sanitize_html }}`, which keeps the editor's markup and strips what is unsafe.
- `{{ value|safe }}` turns escaping off: only for content you fully trust, never for anything a visitor or the CRM could set.

## The `default` trap: prefer `or`

`{{ x|default("Fallback") }}` fires **only when `x` is undefined**. An empty string, `0` or `false` passes straight through and prints nothing. For a fallback that also covers empty values, pass the second argument, `{{ x|default("Fallback", true) }}`, or use the `or` idiom the sections already use: `{{ context.heading or '<h2>Default</h2>' }}`. `or` catches empty and undefined alike; reach for it first.

## Filters and functions you'll reach for

- `get_asset_url("../images/logo.svg")`: the public URL of a theme file, from a path relative to the current file. Always wrap theme asset paths in it.
- `require_css(get_asset_url("../css/extra.css"))` / `require_js(...)`: add a stylesheet or script once per page. Both depend on the standard includes to emit anything.
- `convert_rgb`: hex to `"255, 255, 255"` for `rgba(…)`. Passing an empty colour raises "Passed #null into convert_rgb"; guard it with an `{% if %}`.
- `color_variant(colour, -40)`: a darker or lighter shade of a colour (the boilerplate uses it for link hover states).
- `truncate(140)` for plain text, `truncatehtml` (closes the tags it cuts) and `striptags`.
- `format_datetime(content.publish_date, "long")`: format a date (`short`, `medium`, `long`, `full` or a pattern). `datetimeformat` is the deprecated spelling.

## Built-in variables: read the right one

- `content.*`: the page or post: `content.absolute_url`, `content.name`, `content.publish_date`, and on blog posts `content.post_body` and `content.featured_image`.
- `page_meta.*`: use these in `<head>`: `page_meta.html_title` in `<title>`, `page_meta.meta_description` in the description meta tag, `page_meta.canonical_url`. They are correct on dynamic and listing pages where `content.*` may not be.
- `request.*`: `request.path`, `request.domain`, `request.query`.
- Globals: `hub_id`, `site_settings`, `year`, `builtin_body_classes` (put it on the body wrapper, as the boilerplate does), and the editor flags `is_in_editor` and `is_in_page_editor`.

**Prerendering trap:** HubSpot serves a static, prerendered copy of a page when it can. Reading `contact`, `request_contact`, `account`, `company`, `owner`, `local_dt`, `request.cookies`, `request.headers`, `request.query`, `request.query_dict`, `request.full_url`, `request.path_and_query`, `request.referrer` or `request.remote_ip`, or calling `personalization_token()` or `today()`, stops that page being prerendered. Don't use them in a theme template unless the task needs per-visitor output; a script in the browser can often do the same job.
