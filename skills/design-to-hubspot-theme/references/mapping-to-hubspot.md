# Mapping a design to HubSpot

## Design element → HubSpot construct

| In the design | Build it as | Notes |
| --- | --- | --- |
| Colours, fonts, content width, section spacing, button style | Theme fields (`fields.json`) read by the theme CSS | Mostly fields the boilerplate already has; change their defaults. |
| Site header: logo, navigation, a button | Global partial (`templates/partials/header.html`) with `@hubspot/logo`, `@hubspot/simple_menu` (or `@hubspot/menu`) and a button module | Edited once for the whole site in the global content editor. Which menu module: "Navigation" below. |
| Site footer | Global partial (`templates/partials/footer.html`) | Same. |
| A band of the page (hero, features, testimonials, pricing, call to action) | A section template in `sections/`, included in page templates with `include_dnd_partial` | One file per kind of band. Variants that differ only in colour or image side are one section with a `context` parameter. |
| Heading plus paragraph text | `@hubspot/rich_text`, or text fields in a custom module | Use a custom module when the text has a fixed structure (eyebrow, heading, subheading) that the design styles specifically. |
| A single image | `@hubspot/linked_image`, or an image field in a custom module | Alt text always a field. |
| A button or link | A custom module with a `link` field and a `text` field (the boilerplate's `button.module`), or `@hubspot/button` / `@hubspot/cta` | HubSpot CTAs bring tracking; ask whether the user uses them. |
| Cards, features, logos, team members, FAQ entries, testimonials | One module with a repeater (a `group` with `occurrence`) | Never three copies of the same module for three cards when the cards are one unit; separate modules in a section are fine when each card should move independently in the editor. |
| A contact or sign-up form | `@hubspot/form` | The form itself is built in HubSpot's forms tool. Never a hand-built `<form>`: "Forms" below. |
| A blog list or article page | The boilerplate's blog templates (`blog-index.html`, `blog-post.html`), restyled | Blog settings and posts are set up in HubSpot. |
| Video | `@hubspot/video`, or an embed field | |
| Social links | `@hubspot/social_follow`, or the boilerplate's `social-follow.module` | |
| Tabs, accordions, sliders | A custom module with a repeater and a small `module.js` | Keep scripts small and dependency-free. |
| Decorative shapes, background patterns | CSS in the theme or module, images in `images/` | Not editable, by design. |
| A page layout | A page template in `templates/` with a `dnd_area` that includes the sections | One template per distinct layout, not per page. |

## Navigation

HubSpot has two menu modules, and they differ in where the items come from:

| Module | Its items | Use it when |
| --- | --- | --- |
| `@hubspot/simple_menu` (the default) | Its `menu_tree` field holds the items, so the theme gives it the design's items and editors change them in HubSpot | Unless the user asks otherwise: the menu is editable, starts with the design's items, and the local render draws them. |
| `@hubspot/menu` | Its `id` field takes the ID of a navigation menu built in HubSpot's navigation settings; the theme cannot supply the items | The user wants navigation managed centrally in HubSpot's settings. Put "build the menu in HubSpot and select it in the menu module" under "still to do". |

The design's items go into `menu_tree` in the header partial. A dropdown is an item with `children`:

```
{% module "main_navigation"
  path="@hubspot/simple_menu",
  orientation="horizontal",
  menu_tree=[
    { "linkLabel": "Features", "linkUrl": "/features", "linkTarget": null, "type": "URL_LINK", "children": [] },
    { "linkLabel": "Resources", "linkUrl": null, "linkTarget": null, "type": "NO_LINK", "children": [
      { "linkLabel": "Guides", "linkUrl": "/guides", "linkTarget": null, "type": "URL_LINK", "children": [] },
      { "linkLabel": "Webinars", "linkUrl": "/webinars", "linkTarget": null, "type": "URL_LINK", "children": [] }
    ] },
    { "linkLabel": "Contact", "linkUrl": "/contact", "linkTarget": null, "type": "URL_LINK", "children": [] }
  ]
%}
```

Each item has `linkLabel` (the text), `linkUrl` (a path such as `/pricing`, an `https://` address, `mailto:` or `tel:`; the local render draws any other scheme as plain text), `linkTarget` (`"_blank"` opens a new tab), `type` (`URL_LINK` for a link, `NO_LINK` for an item without one) and `children`. Use the design's own labels and links.

The local render draws these items in HubSpot's menu markup: a wrapper with `hs-menu-wrapper` and `hs-menu-flow-horizontal` (or `hs-menu-flow-vertical`) holding a `ul`; each item an `li` with `hs-menu-item` and `hs-menu-depth-1`, `hs-menu-depth-2` and so on; an item with children also has `hs-item-has-children` and holds a nested `ul` with `hs-menu-children-wrapper`. Showing and hiding the dropdown (on hover, on keyboard focus, behind a mobile toggle) is the theme's CSS and JavaScript to write against those classes, for example:

```css
.hs-menu-wrapper .hs-menu-children-wrapper { display: none; }
.hs-menu-wrapper .hs-item-has-children:hover > .hs-menu-children-wrapper,
.hs-menu-wrapper .hs-item-has-children:focus-within > .hs-menu-children-wrapper { display: block; }
```

Style the classes, never the element: the local render's wrapper is a `<nav>`, HubSpot's is a `<div>` inside its module wrapper, and HubSpot adds classes the local render does not (`flyouts`, `active-branch`, `active`). Check the menu again in HubSpot after upload: HubSpot's real markup is the authority. `@hubspot/menu` is drawn locally as a labelled placeholder.

## Forms

A form in the design (contact, sign-up, demo request) is HubSpot's form module, `@hubspot/form`. Never hand-build a `<form>`: it is not connected to HubSpot's forms tool, so its submissions are not recorded there and editors cannot change its fields. The module's `form` field selects a form by its `form_id`; the form, its fields and its notifications are created in HubSpot.

```
{% dnd_module path="@hubspot/form" %}
{% end_dnd_module %}
```

Leave the form unselected unless the user gives you a form's ID; then pass `form={ "form_id": "<id>", "response_type": "inline", "message": "Thanks, we'll be in touch." }`. Style it through the theme's CSS. The local render shows a placeholder for the form, so that band's height differs from the design: report the difference, never "fix" it with fixed markup. Put "create the form in HubSpot and select it in the module" under "still to do".

## The plan to show the user

```
Theme: <name> (from HubSpot's CMS theme boilerplate)

Theme settings
- Colours: primary #…, secondary #…, accent #…, text #…, background #…
- Fonts: headings <family> <weight>, body <family>
- Content width … px; section padding … px

Global partials
- Header: logo, menu (simple menu with the design's <n> items: …), "<button text>" button
- Footer: …

Modules (new)
- <name>: fields <field: type, …>
- <name> (repeater, <n> items by default): …

Sections
- <name>: <modules>, background <token>

Templates
- <name>.html: <section>, <section>, …

Uses HubSpot's own: form (<which>), menu, logo, …

Removing from the boilerplate: <templates>, <sections>, <modules>, <images>

Not in this build: <anything out of scope, and why>
```

Keep it to what the design shows. Ask about anything that changes the scope (a blog, multiple languages, more page types than the design shows).

## What HubSpot's boilerplate contains

`hs cms theme create` copies HubSpot's `cms-theme-boilerplate`. At the time of writing it holds:

- `theme.json`, `fields.json` (the theme settings) and a placeholder `license.txt`.
- `templates/layouts/base.html`: the shell (`<head>`, both required includes, header and footer global partials, a `body` block). Every page template extends it.
- `templates/partials/header.html`, `header-no-navigation.html`, `footer.html`: global partials.
- Page templates: `home.html`, `about.html`, `contact.html`, `pricing.html`, `landing-page.html`, `hubdb.html`, `qa-test.html`, and the blog templates `blog-index.html` and `blog-post.html`.
- `templates/system/`: HubSpot's system templates (below). Keep these; HubSpot uses them for system pages.
- `sections/`: `hero-banner.html`, `call-to-action.html`, `cards.html`, `multi-column-content.html`, `multi-row-content.html`, `pricing.html`.
- `modules/`: `button`, `card`, `menu`, `pricing-card`, `social-follow`.
- `css/main.css` (pulls in the files under `css/` with HubL `include`), `css/theme-overrides.css` (reads the theme fields), `css/templates/` for blog and system pages, `js/main.js`.
- `images/`: placeholders, icons and template and section preview images.

The list can change: look at what was actually created before you name removals.

### HubSpot's system templates

Each is a template whose annotation declares one of these `templateType` values. In HubSpot, they are chosen for their purpose in the website settings' system pages.

| Page | `templateType` | Note |
| --- | --- | --- |
| 404 and 500 error pages | `error_page` | Both use the same type. |
| Password prompt | `password_prompt_page` | |
| Search results | `search_results_page` | |
| Email subscription preferences | `email_subscription_preferences_page` | Must contain `{% email_subscriptions "email_subscriptions" %}`. |
| Email backup unsubscribe | `email_backup_unsubscribe_page` | Must contain `{% email_simple_subscription "email_simple_subscription" %}`. |
| Email unsubscribe confirmation | `email_subscriptions_confirmation_page` | |
| Membership login, registration, password reset, reset request | `membership_login_page`, `membership_register_page`, `membership_reset_page`, `membership_reset_request_page` | Only for accounts with HubSpot's memberships feature. |

None of them is required for an upload. When you build without the boilerplate, add the ones the site needs and list the rest under "still to do" in the hand-over.

## What to remove, and how

Remove what the plan does not use so the user's editors see only what belongs to their site:

- Page templates the design has no use for (`hubdb.html`, `qa-test.html`, `pricing.html` if there is no pricing page). Removing a template from the theme folder is safe before the theme is in HubSpot; once pages use a template, it is not.
- Sections and modules nothing includes any more (search for `include_dnd_partial` and `path="../modules/…"` before deleting).
- Placeholder images that nothing references, and preview images of removed templates and sections.

Keep: `templates/layouts/base.html`, the header and footer partials (restyled), `templates/system/`, `css/` structure, `fields.json`, `theme.json`. Replace the preview images (`screenshotPath`, `screenshot_path`) of the templates you keep with captures of the built theme if you have them, or remove the annotation line.
