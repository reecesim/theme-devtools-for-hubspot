# Decoding HubSpot validation errors

HubSpot validates HubL when files reach it, and the HubSpot CLI prints the errors it gets back when an upload fails. The local renderer reports its own diagnostics in a similar spirit (`preview-and-validate` explains its output). Either way:

- Work one error at a time: fix the first, check again, repeat. Don't change several things between checks.
- An error names a file and usually a line. If that file is a *different* one from the file you edited (an included partial or section), it is that file's own issue. Don't chase it unless the task is that file.
- HubSpot's render is the authority. When the local check and HubSpot disagree, believe HubSpot and note the difference for the user.

## The common errors and their fixes

### "field name cannot be '<name>'"

HubSpot's upload refused a `fields.json` (a module's or the theme's) because a field is named `label`, `body` or `name`. These were refused at any depth when tested on 2026-10-06: a top-level field, a field inside a group or repeater, and a group itself. HubSpot does not document the list; it comes from observed refusals and may not be complete.

1. Rename the field for what it holds (`item_label`, `body_text`, `body_font`, `business_name`) and every use of it: `module.html` reads, repeater `default` rows, `sorting_label_field`, and `dnd_module` arguments in templates and sections (`module-fields.md`, "Field names HubSpot refuses").
2. Before uploading again, run the local `validate` (`preview-and-validate`): it lists every one as `FIELD_NAME_RESERVED`. Without the renderer, search every `fields.json` in the theme for all three, groups included (`"name": "label"`, `"name": "body"`, `"name": "name"`). HubSpot reports one refusal at a time, so a second one you have not fixed only shows on the next upload.

### "dnd_row cannot be a descendant of dnd_section"

The nesting is wrong. A `dnd_section` may contain only `dnd_module` or `dnd_column`, **not `dnd_row`**. `dnd_row` only lives inside a `dnd_column`. For simple columns, drop the row and column entirely and place `dnd_module`s straight in the section with `offset`/`width`. For a nested grid: `dnd_section → dnd_column(offset/width) → dnd_row → dnd_module`.

### "… overlaps with … spanning columns 1 to 12"

Two dnd siblings occupy the same columns. Give each an explicit non-colliding `offset`/`width` (`offset=0, width=6` and `offset=6, width=6`). The usual cause: a full-width `width=12` module placed as a flat sibling beside narrower `width=4` modules in the same section. Put the full-width element (a section heading, say) in its OWN section, and the narrower modules together in the next section.

### "dnd_section must be within a dnd_area"

A `dnd_section` sits outside any `dnd_area`. In a page template, wrap the sections in `{% dnd_area "main" %} … {% end_dnd_area %}`. A section template (`templateType: section`) is the exception by design: its single `dnd_section` gets its `dnd_area` from the template that includes it with `include_dnd_partial`, so check it through such a template.

### "syntax error at position … encountered 'text', expected '}'"

Almost always a mis-quoted `html=` value. An `html=` value is a HubL string literal:

- Right: `html='<h1 class="hero">Title</h1>'` (single-quoted, inner double quotes fine).
- Wrong: `html={{ "<h1>..</h1>" }}`: never wrap a plain string in `{{ }}`.
- `{{ }}` is only for expressions, for example a section fallback: `html={{ context.heading or '<h1>Default</h1>' }}`.
- If the HTML contains both kinds of quote, move it into a `{% module_attribute "html" %} … {% end_module_attribute %}` block instead.

### A template with a `dnd_area` that HubSpot will not treat as a page template

The annotation is missing, mistyped or not the very first bytes of the file. It must come first:

```
<!--
  templateType: page
  isAvailableForNewContent: true
  label: Home
-->
```

When editing, never move or remove this header.

### "Passed #null into convert_rgb"

A colour value reached `convert_rgb` empty. Guard it: wrap the rule in `{% if module.styles.background.color.color %}` before calling the filter, or give the field a default colour. It is often raised by an included module against its own defaults; check which file the error names.

### "The object id hasn't been provided for the selected payment(s)"

A payment link in a section (often a pricing section from the boilerplate) has no payment configured. It comes from that section, not your edit. Remove the section if the design has no payments, or leave it to be set up in HubSpot.

## Structure HubSpot expects

- Each module is a folder whose name ends in `.module` (`modules/hero.module/`): HubSpot's documentation stores modules that way when developing locally.
- `theme.json` and `fields.json` sit at the root of the theme folder: HubSpot's documentation calls both necessary for a theme.

## When the message isn't enough

Isolate. Cut the file back to a minimal version that works (the annotation and one simple module), confirm it is clean, then add one block back at a time and check again until the failing block shows itself. This beats re-reading a long error list after rewriting the whole file.
