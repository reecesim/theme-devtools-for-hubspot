# Module fields, meta, and reading a schema before you set values

A module is a folder ending in `.module` holding:

- `module.html`: the HubL and markup. Reads its values from `module.*`.
- `fields.json`: the field schema, which is what the page editor shows and the shape of `module.*`.
- `meta.json`: label, icon, `is_available_for_new_content`, `global`, and `content_types`, the list of where the module may be used (`ANY`, `SITE_PAGE`, `LANDING_PAGE`, `BLOG_POST`, `BLOG_LISTING`, `EMAIL`, …). **`content_types` is the current key; `host_template_types` is the older name.** HubSpot keeps honouring the old name, but write `content_types` in new or edited metadata. A wrong or empty `content_types` makes the module unavailable in the editor where you expect it.
- `module.css` / `module.js`: optional styling and behaviour.

## Field names HubSpot refuses

HubSpot's upload refuses a `fields.json` that has a field named `label`, `body` or `name`, and prints `field name cannot be '<name>'`. Each was refused when tested on 2026-10-06, wherever it stood: a top-level field, a field inside a group, a field inside a repeater, and a group itself. The same holds for the theme's `fields.json`. HubSpot's documentation does not list these names: the list comes from observed refusals and may not be complete.

| Instead of | Write |
| --- | --- |
| `label` (a card's or menu item's text) | `item_label`, `link_label` |
| `body` (a block of text) | `body_text` (`body_font` for a theme font) |
| `name` (a person, plan or company) | `business_name`, `plan_name`, `person_name` |

A rename reaches everything that uses the field: `module.<field>` reads in `module.html` (and loop reads such as `card.<field>`), the keys of a repeater's `default` rows, a `sorting_label_field` path, and every template or section that passes the field as a `dnd_module` argument. Search the theme for the old name before checking again. Renaming a field after editors have saved content drops the saved value, so settle names before the theme is in use.

The local `validate` (`preview-and-validate`) reports each reserved name as `FIELD_NAME_RESERVED`, with the field's path and a suggested name.

In the local renderer a field named `items`, `keys`, `values` or `get` is shadowed by a built-in method, so a loop over it draws none of its content; HubSpot's behaviour for these names is not documented; avoid them.

## A complete small module

`modules/feature-card.module/meta.json` (the shape `hs cms module create` writes):

```json
{
  "label": "Feature card",
  "css_assets": [],
  "external_js": [],
  "global": false,
  "help_text": "",
  "content_types": ["SITE_PAGE", "LANDING_PAGE"],
  "js_assets": [],
  "other_assets": [],
  "smart_type": "NOT_SMART",
  "tags": [],
  "is_available_for_new_content": true
}
```

`modules/feature-card.module/fields.json`: every visible piece of content is a field, with the design's content as its default:

```json
[
  {
    "name": "image",
    "label": "Image",
    "type": "image",
    "responsive": true,
    "resizable": true,
    "show_loading": true,
    "default": { "src": "", "alt": "", "loading": "lazy" }
  },
  {
    "name": "heading",
    "label": "Heading",
    "type": "text",
    "default": "Plan"
  },
  {
    "name": "body_text",
    "label": "Text",
    "type": "richtext",
    "default": "<p>Lay out the week in one view and move things with a drag.</p>"
  },
  {
    "name": "link",
    "label": "Link",
    "type": "link",
    "supported_types": ["EXTERNAL", "CONTENT"],
    "default": {
      "url": { "content_id": null, "type": "EXTERNAL", "href": "" },
      "open_in_new_tab": false,
      "no_follow": false
    }
  },
  {
    "name": "link_text",
    "label": "Link text",
    "type": "text",
    "default": "Learn more"
  }
]
```

`modules/feature-card.module/module.html`:

```
<article class="feature-card">
  {% if module.image.src %}
    <img class="feature-card__image" src="{{ module.image.src|escape_url }}" alt="{{ module.image.alt|escape_attr }}"
      {% if module.image.width %}width="{{ module.image.width|escape_attr }}" height="{{ module.image.height|escape_attr }}"{% endif %}
      {% if module.image.loading != "disabled" %}loading="{{ module.image.loading|escape_attr }}"{% endif %}>
  {% endif %}
  {% if module.heading %}<h3 class="feature-card__heading">{{ module.heading|escape_html }}</h3>{% endif %}
  {% if module.body_text %}<div class="feature-card__body">{{ module.body_text|sanitize_html }}</div>{% endif %}
  {% if module.link.url.href and module.link_text %}
    {% set rel = (module.link.open_in_new_tab ? "noopener " : "") ~ (module.link.no_follow ? "nofollow" : "") %}
    <a class="feature-card__link" href="{{ module.link.url.href|escape_url }}"
      {% if module.link.open_in_new_tab %}target="_blank"{% endif %}
      {% if rel|trim %}rel="{{ rel|trim }}"{% endif %}>{{ module.link_text|escape_html }}</a>
  {% endif %}
</article>
```

Each field is printed only when it has a value, so an editor can empty a slot without leaving broken markup. The image default has an empty `src`; the template that places the module passes the design's image (see "Setting values when you place a module" below).

## Read the schema before you set a module's values

Before you place a `dnd_module` and pass field values, read the module's `fields.json` to confirm the fields exist and what shape each takes. A value for a field the schema doesn't define is dropped at best and an error at worst.

A field reference in `module.html` mirrors the `fields.json` path. A `text` field named `heading` at the top level is `module.heading`; a field `alignment` inside a group `styles` is `module.styles.alignment`.

## Field types and the value each produces

The commonest cause of broken module output is **treating an object or list field as a string**: it prints something useless or errors. Know the shape before you read it.

**Strings** (print directly, escaping for the context):

- `text`: `{{ module.heading|escape_html }}`.
- `richtext`: HTML; print with `{{ module.body_text|sanitize_html }}` (as HubSpot's boilerplate does) rather than escaping it.
- `choice`: the selected value (a list when the field allows several).

**Scalars:**

- `boolean`: `{% if module.show_cta %}`.
- `number`: `{{ module.columns }}`.
- `date` and `datetime`: a Unix epoch timestamp; format it with `format_datetime`.

**Objects** (read a property, never the field itself):

- `image`: `module.image.src`, `.alt`, `.width`, `.height`, `.loading`.
- `link`: `module.link.url.href`, `module.link.url.type`, `module.link.open_in_new_tab`, `module.link.no_follow`.
- `url`: `module.url_field.href`.
- `color`: `module.bg.color` (hex), `module.bg.opacity`, and `module.bg.css`.
- `font`: `module.heading_font.font`, `.size`, `.size_unit`, `.color`, and `.css`; HubSpot's boilerplate also prints `.style` for the family and weight.
- `alignment`: `module.align.horizontal_align`, `module.align.vertical_align`.
- `spacing`, `border`, `gradient`, `backgroundimage`: each has a `.css` property you can drop straight into a rule.
- `icon`, `menu`, `simplemenu`, `form`, `cta`, `page`, `blog`, `logo`, `file`, `video`, `embed`, `hubdbtable`, `hubdbrow`: each has its own shape or returns an id; read the field type reference before using one.
- `group`: nests fields; reference by dotted path (`module.styles.alignment`).

The type strings are exactly as written above (`backgroundimage`, not `background_image`; `simplemenu`, not `simple_menu`). HubSpot's field type reference is at developers.hubspot.com/docs/cms/reference/fields/module-theme-fields.

**Lists: loop them, never print them directly.** A field or group with `occurrence` (a repeater) comes back as a list:

```json
{
  "name": "cards",
  "label": "Cards",
  "type": "group",
  "occurrence": { "min": 1, "max": 6, "default": 3, "sorting_label_field": "cards.title" },
  "children": [
    { "name": "title", "label": "Title", "type": "text", "default": "Plan" },
    { "name": "text", "label": "Text", "type": "richtext", "default": "<p>Lay out the week.</p>" }
  ],
  "default": [
    { "title": "Plan", "text": "<p>Lay out the week.</p>" },
    { "title": "Share", "text": "<p>Send it to the team.</p>" },
    { "title": "Review", "text": "<p>See what moved.</p>" }
  ]
}
```

```
{% for card in module.cards %}
  <article class="card">
    <h3>{{ card.title|escape_html }}</h3>
    {{ card.text|sanitize_html }}
  </article>
{% endfor %}
```

Printing `{{ module.cards }}` renders nothing useful. Give a repeater a `default` list with one entry per item in the design, so the page looks right before anyone edits it.

## Setting values when you place a module

Pass field values as named arguments on the `dnd_module`, matching the schema:

```
{% dnd_module
  path="../modules/feature-card",
  offset=0,
  width=4,
  heading="Plan",
  image={ "src": get_asset_url("../images/plan.png"), "alt": "A weekly plan on a laptop screen", "loading": "lazy", "width": 480, "height": 320 },
  link={ "url": { "type": "EXTERNAL", "href": "https://example.com/plan" }, "open_in_new_tab": false, "no_follow": false }
%}
{% end_dnd_module %}
```

`heading` is a top-level `text` field; an object field takes an object of the same shape as its `default`; a field inside a group follows the `fields.json` nesting exactly, for example `styles={ "alignment": { "alignment": { "horizontal_align": "CENTER" } } }`. Passing a theme image with `get_asset_url` from the template is how HubSpot's boilerplate gives an image field a default that lives in the theme.

## Module CSS

Static styles go in `module.css`. Styles that depend on field values go in `module.html`, wrapped so they reach the page head and apply to this instance only:

```
{% require_css %}
  <style>
    {% scope_css %}
      .feature-card { {{ module.styles.spacing.css }} }
    {% end_scope_css %}
  </style>
{% end_require_css %}
```

## Colour filters

`{{ colour|convert_rgb }}` turns a hex value into `r, g, b` for use in `rgba(...)`. Passing an empty colour produces "Passed #null into convert_rgb": guard it with an `{% if %}` (or a default) before the filter, as the boilerplate's card module does with `{% if module.styles.card.background.color.color %}`.
