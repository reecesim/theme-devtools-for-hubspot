# Theme fields and theme.json

A theme is one folder with two JSON files at its root: `theme.json` (what the theme is) and `fields.json` (the theme settings a marketer can change in HubSpot's theme editor: colours, fonts, spacing, buttons). The theme's CSS reads those settings through `theme.*`, so one change in the theme editor restyles every page.

## theme.json

HubSpot documents these properties: `label`, `preview_path`, `screenshot_path`, `enable_domain_stylesheets`, `version`, `author` (`name`, `email`, `url`), `documentation_url`, `license`, `example_url` and `is_available_for_new_content`. HubSpot's boilerplate also sets `responsive_breakpoints`; leave that as the boilerplate has it unless you have checked HubSpot's documentation for it.

For a theme built from a design, set the theme's name and leave out what only the user can supply:

```json
{
  "label": "Northwind",
  "preview_path": "./templates/home.html",
  "screenshot_path": "./images/template-previews/home.png",
  "enable_domain_stylesheets": false,
  "version": "1.0",
  "is_available_for_new_content": true
}
```

- **Author, documentation and example links**: the boilerplate's `author`, `documentation_url` and `example_url` are HubSpot's. Remove them. Write the user's own only when the user gives them to you. Never take them from the session's account details (a signed-in email address, or a company guessed from its domain), and never invent them.
- **Licence**: write no licence on the user's behalf. Leave `license` out (and the boilerplate's placeholder `license.txt` unedited) unless the user gives you their licence: an SPDX identifier in `license`, or their text in `license.txt`.
- List whatever is left out under "still to do" in the hand-over.
- `preview_path` must name a template that exists.

## fields.json: start from the boilerplate's, change the defaults

The boilerplate's `fields.json` is long, but `css/theme-overrides.css` already reads every field in it. For a design, the safe route is to keep its structure and change the `default` values to the design's tokens, then add a field only for a token the design needs and the boilerplate lacks. Rewriting it from scratch means rewriting `theme-overrides.css` too.

The groups you will change most:

| Design token | Boilerplate field | Read in CSS as |
| --- | --- | --- |
| Main brand colour | `global_colors.primary` (color) | `theme.global_colors.primary.color` |
| Secondary / background colour | `global_colors.secondary` (color) | `theme.global_colors.secondary.color` |
| Body font | `global_fonts.primary` (font) | `theme.global_fonts.primary` |
| Heading font | `global_fonts.secondary` (font) | `theme.global_fonts.secondary` |
| Content width | `spacing.maximum_content_width` (number, px) | `theme.spacing.maximum_content_width` |
| Section padding | `spacing.vertical_spacing` (number, px) | `theme.spacing.vertical_spacing` |
| Heading sizes | `text.h1.font` … `text.h6.font` (font) | `theme.text.h1.font.size` |
| Buttons | `buttons.*` (font, color, border, spacing, number) | `theme.buttons.border.border.css` |

Theme fields support these types: `boolean`, `border`, `choice`, `color`, `font`, `image`, `number` and `spacing`, inside `group`s. Module-only types (rich text, links, repeaters) don't belong here.

## Writing fields

A colour and a font, in the shape the boilerplate uses:

```json
{
  "label": "Global colors",
  "name": "global_colors",
  "type": "group",
  "children": [
    {
      "label": "Primary",
      "name": "primary",
      "type": "color",
      "visibility": { "hidden_subfields": { "opacity": true } },
      "default": { "color": "#1F4E79" }
    },
    {
      "label": "Accent",
      "name": "accent",
      "type": "color",
      "visibility": { "hidden_subfields": { "opacity": true } },
      "default": { "color": "#F2A541" }
    }
  ]
}
```

```json
{
  "label": "Primary",
  "name": "primary",
  "type": "font",
  "visibility": { "hidden_subfields": { "size": true, "styles": true } },
  "default": { "font": "Inter", "font_set": "GOOGLE", "fallback": "sans-serif" }
}
```

A `font` field with `font_set: "GOOGLE"` names a Google font, and HubSpot loads it for the page. HubSpot's documentation shows no other `font_set` value apart from custom fonts, so do not write one from guesswork: for a system font in the design (Segoe UI, Helvetica, Arial), pick the nearest Google font with the user. A font that is not a Google font needs HubSpot's custom-font setup (a `fonts/` folder with the font files and a `font.json`, listed under `custom_fonts` in `theme.json`); follow HubSpot's "Add custom fonts to a theme" page and check the font's licence allows web use before adding its files.

Keep `name`s lower case with underscores. Renaming or deleting a field that pages or theme settings already use loses the values saved against it; add a new field instead when a theme is already in use.

**Never name a theme field or group `label`, `body` or `name`.** HubSpot's upload refused each of these names when tested on 2026-10-06 (one `field name cannot be 'body'` came from a body-text font field called `body` inside a group of fonts), and a group with one of these names is refused too. The natural names for body text are the trap here: call the font `body_font`, and a group of text settings `text` or `typography`. HubSpot's documentation does not list these names; the list comes from observed refusals and may not be complete (`module-fields.md`, "Field names HubSpot refuses").

## Reading theme fields in CSS

A CSS file in the theme can contain HubL, and `theme.*` holds the settings. Read tokens into variables at the top, then use them, as `theme-overrides.css` does:

```
{% set primary_color = theme.global_colors.primary.color %}
{% set accent_color = theme.global_colors.accent.color %}
{% set container_width = theme.spacing.maximum_content_width ~ 'px' %}
{% set h1_font = theme.text.h1.font %}

.dnd-section > .row-fluid {
  max-width: {{ container_width }};
}

h1,
.h1 {
  {{ h1_font.style }};
  color: {{ h1_font.color }};
  font-size: {{ h1_font.size ~ h1_font.size_unit }};
}

.button--accent {
  background-color: {{ accent_color }};
}
```

`.style` prints the font's family and style declarations; size and colour are printed separately. `color`, `font`, `border`, `spacing` and `gradient` values also have a `.css` property. Templates and modules can read `theme.*` too, but prefer a CSS class driven by the theme stylesheet over inline styles.

## Inherited values

`inherited_value` makes a field take its *default* from another field or from the account's brand settings:

```json
"inherited_value": {
  "property_value_paths": { "color": "brand_settings.primaryColor" }
}
```

The boilerplate's primary colour does this, and its heading fonts inherit their family from `global_fonts.secondary`. With `default_value_path` set, the field's own `default` is ignored. Once someone overrides the field in the theme settings or on a page, the link to the source is cut. For a theme built from a design: keep heading-font inheritance (one change to the heading font then restyles every heading), and decide with the user whether the account's brand kit or the design's colours should win, removing `inherited_value` from the colour fields if the design's colours must.

## Defaults versus saved settings

A `default` is only what applies until someone saves theme settings in HubSpot. After that, the saved value wins and a new default changes nothing on the live site. Tell the user when a change they expect will not show for that reason.
