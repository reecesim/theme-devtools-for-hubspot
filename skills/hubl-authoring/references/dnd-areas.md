# dnd areas: grammar and layouts that work

## What can contain what (strict: HubSpot rejects anything else)

- `dnd_area` → `dnd_section`
- `dnd_section` → `dnd_module` or `dnd_column` (**not `dnd_row`**)
- `dnd_column` → `dnd_row`
- `dnd_row` → `dnd_module` or `dnd_column`

A `dnd_section` is a full-width band. `dnd_module` and `dnd_column` position on the 12-column grid with `offset` (0–11) and `width`. A lone `dnd_module` in a section spans the full width. A module cannot contain a `dnd_area`.

**You do not need columns or rows for a simple multi-column layout.** Place `dnd_module`s directly in the section with non-overlapping `offset`/`width`. Reach for `dnd_column` / `dnd_row` only for a genuinely nested grid (a column that itself stacks rows), and remember `dnd_row` lives inside `dnd_column`, never directly in `dnd_section`.

## Section parameters you will use

- `background_color`: a string (`"#F7F7F7"`, `"rgb(255,255,255)"`, `"rgba(0,0,0,.25)"`) or an object `{ r: 255, g: 0, b: 0, a: 1 }`.
- `background_image`: an object such as `{ 'backgroundPosition': 'MIDDLE_CENTER', 'backgroundSize': 'cover', 'imageUrl': get_asset_url('../images/banner.jpg') }`.
- `padding` and `margin`: objects such as `{ 'top': 80, 'bottom': 80 }`.
- `max_width` (pixels), `full_width` (boolean), `vertical_alignment` (`TOP`, `MIDDLE`, `BOTTOM`).
- On a `dnd_module`: `horizontal_alignment` (`LEFT`, `CENTER`, `RIGHT`). `flexbox_positioning` is deprecated; use `horizontal_alignment` with the section's `vertical_alignment`.

Check HubSpot's drag-and-drop area tag reference before using a parameter not listed here.

## The 12-column rule

Every section is 12 columns wide. `offset` is where an element starts (0–11); `width` is how many columns it spans. Flat siblings in a section must not overlap and should sum to 12 or less.

- Full width: `offset=0, width=12` (or omit both on a lone module).
- Two equal columns: `offset=0, width=6` and `offset=6, width=6`.
- Three cards: `offset=0, width=4`, `offset=4, width=4`, `offset=8, width=4`.

**The overlap error** ("… overlaps with … spanning columns 1 to 12") means two flat siblings occupy the same columns. The classic cause is a full-width `width=12` module (a heading, say) placed beside narrower modules in the SAME section. Fix: give each a non-colliding `offset`/`width`, and put a full-width heading in its OWN section with the narrower modules in the next section.

## A complete page template

```
<!--
  templateType: page
  isAvailableForNewContent: true
  label: Home
-->
{% extends "./layouts/base.html" %}

{% block body %}
{% dnd_area "main" label="Main section" %}

  {% include_dnd_partial path="../sections/hero.html" %}

  {% dnd_section padding={ 'top': 80, 'bottom': 80 } %}
    {% dnd_module path="@hubspot/rich_text", html='<h2 style="text-align:center;">What you get</h2>' %}
    {% end_dnd_module %}
  {% end_dnd_section %}

  {% dnd_section padding={ 'top': 0, 'bottom': 80 } %}
    {% dnd_module path="../modules/feature-card", offset=0, width=4, heading="Plan" %}{% end_dnd_module %}
    {% dnd_module path="../modules/feature-card", offset=4, width=4, heading="Share" %}{% end_dnd_module %}
    {% dnd_module path="../modules/feature-card", offset=8, width=4, heading="Review" %}{% end_dnd_module %}
  {% end_dnd_section %}

{% end_dnd_area %}
{% endblock body %}
```

The template extends the layout, which owns `<html>`, `<head>`, the header and footer partials and both required includes. Module paths are relative to the template file and leave off the `.module` suffix.

## Works: a single full-width heading

```
{% dnd_section background_color="#0f172a", vertical_alignment="MIDDLE" %}
  {% dnd_module
    path="@hubspot/rich_text",
    html='<h1 style="text-align:center;color:#ffffff;">Build better themes</h1>'
  %}
  {% end_dnd_module %}
{% end_dnd_section %}
```

A lone module in the section: no columns needed, spans 12.

## Works: two columns, image left, text right

```
{% dnd_section vertical_alignment="MIDDLE" %}
  {% dnd_module
    path="@hubspot/linked_image",
    img={ "src": get_asset_url("../images/team.png"), "alt": "Our team", "loading": "lazy" },
    offset=0,
    width=6
  %}
  {% end_dnd_module %}
  {% dnd_module
    path="@hubspot/rich_text",
    html='<h2>About us</h2><p>What makes the product worth choosing.</p>',
    offset=6,
    width=6
  %}
  {% end_dnd_module %}
{% end_dnd_section %}
```

Two modules, each with explicit `offset`/`width` summing to 12: no overlap. HubSpot's boilerplate home template uses exactly this pattern.

## Works: a heading above three cards

Use two sections: the heading full-width in its own, the three cards flat in the next. No columns or rows needed.

```
{% dnd_section background_color="#f8fafc" %}
  {% dnd_module
    path="@hubspot/rich_text",
    html='<div style="text-align:center;"><h2>What you get</h2></div>',
    offset=0,
    width=12
  %}
  {% end_dnd_module %}
{% end_dnd_section %}

{% dnd_section background_color="#f8fafc" %}
  {% dnd_module path="../modules/card", offset=0, width=4 %}{% end_dnd_module %}
  {% dnd_module path="../modules/card", offset=4, width=4 %}{% end_dnd_module %}
  {% dnd_module path="../modules/card", offset=8, width=4 %}{% end_dnd_module %}
{% end_dnd_section %}
```

Keeping the heading and the cards in separate sections is what avoids the "width=12 overlaps width=4" trap.

## When you genuinely need nested columns

Only then reach for the `dnd_column → dnd_row` chain. `dnd_row` goes inside `dnd_column`, never directly in `dnd_section`:

```
{% dnd_section %}
  {% dnd_column offset=0, width=6 %}
    {% dnd_row %}
      {% dnd_module path="@hubspot/rich_text", html='<h3>Top</h3>' %}{% end_dnd_module %}
    {% end_dnd_row %}
    {% dnd_row %}
      {% dnd_module path="@hubspot/rich_text", html='<h3>Bottom</h3>' %}{% end_dnd_module %}
    {% end_dnd_row %}
  {% end_dnd_column %}
{% end_dnd_section %}
```

## Long HTML: `module_attribute`

When a field value is long or awkward to quote, set it with a `module_attribute` block instead of an argument:

```
{% dnd_module path="@hubspot/rich_text" %}
  {% module_attribute "html" %}
    <h2>Pricing that grows with you</h2>
    <p>Start on the free plan and move up when "free" stops being enough.</p>
  {% end_module_attribute %}
{% end_dnd_module %}
```

## Styling the grid

A drag-and-drop area renders as HubSpot's grid markup: each section is a `.dnd-section` holding a `.row-fluid`, and each module or column is a `span1` to `span12` element (`span4` for `width=4`) with the class `dnd-module` or `dnd-column`. The theme's CSS lays that grid out. HubSpot's boilerplate does it in `css/objects/_layout.css`; the local renderer adds no grid CSS of its own, so a theme without it shows every column full width. When the theme was not scaffolded from the boilerplate, add grid CSS to its main stylesheet:

```css
.row-fluid { display: flex; flex-wrap: wrap; width: 100%; }
.row-fluid [class*="span"] { width: 100%; min-height: 1px; box-sizing: border-box; }

@media (min-width: 768px) {
  .row-fluid { flex-wrap: nowrap; }
  .row-fluid > .span1 { width: 8.3333%; }
  .row-fluid > .span2 { width: 16.6667%; }
  .row-fluid > .span3 { width: 25%; }
  .row-fluid > .span4 { width: 33.3333%; }
  .row-fluid > .span5 { width: 41.6667%; }
  .row-fluid > .span6 { width: 50%; }
  .row-fluid > .span7 { width: 58.3333%; }
  .row-fluid > .span8 { width: 66.6667%; }
  .row-fluid > .span9 { width: 75%; }
  .row-fluid > .span10 { width: 83.3333%; }
  .row-fluid > .span11 { width: 91.6667%; }
  .row-fluid > .span12 { width: 100%; }
  .dnd-section .dnd-column,
  .dnd-section .dnd-module { padding: 0 14px; }
}

.dnd-section > .row-fluid { max-width: {{ theme.spacing.maximum_content_width ~ 'px' }}; margin: 0 auto; }
```

Columns stack to full width below 768 px, the same breakpoint the boilerplate uses. The gutter comes from the padding; match it to the design's gap between cards. The last rule centres each section's content at the theme's content width (use the field name your theme has).

## Including a section template

A page composes sections by including section templates, not by inlining everything:

```
{% include_dnd_partial path="../sections/hero-banner.html" %}
{% include_dnd_partial path="../sections/hero-banner.html" context={ "content": "<h1>Home page</h1>" } %}
```

A section template begins and ends with exactly one `dnd_section`, and declares `templateType: section` in its annotation:

```
<!--
  templateType: section
  label: Hero
  description: "Heading, text and a button on the left, an image on the right."
  isAvailableForNewContent: true
-->
{% dnd_section vertical_alignment="MIDDLE" %}
  …
{% end_dnd_section %}
```

Prefer composing existing section templates over hand-building large dnd trees in a page template. A section template is only available in the theme that holds it.
