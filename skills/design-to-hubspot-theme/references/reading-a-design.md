# Reading a design

The design is a reference to rebuild from. Read it for four things: **structure** (the bands of the page, top to bottom, and what repeats), **content** (the actual words, images and links), **tokens** (colours, fonts, sizes, spacing, widths) and **behaviour** (what moves, opens, slides or changes at small widths). Write them down; they become the plan.

## A Claude Design export

An export is usually one HTML file or a folder with an HTML file and assets. Before planning:

- Open the HTML and look at how assets arrive. Search for `data:` (inlined images or fonts), `<style>` blocks (inlined CSS), `<link rel="stylesheet" href=…>`, `<script src=…>`, `<img src=…>` and `url(` in CSS. Note which are local files, which are inlined and which are remote URLs.
- Inlined images (`data:image/...`) can be decoded and saved as theme image files; say you did so in the hand-over.
- Remote URLs (a design tool's CDN, an image service) are not the user's. Do not reference them from the theme. Ask for the originals or save copies with the user's agreement about rights.
- Fonts: look for `@font-face` and font `<link>`s. A Google Fonts link names fonts you can set in theme fields. Embedded font files have an unknown licence until the user confirms it.
- Scripts: note any interaction (menus, sliders, tabs, accordions). It becomes a module's `module.js` or is dropped and noted; a design tool's own runtime scripts are never copied.

## AI-generated code (ChatGPT and other tools)

- **Plain HTML/CSS**: the most direct reference. Read the sections, the content and the CSS custom properties or repeated values (they are the tokens). Do not copy the stylesheet wholesale: rewrite what the design needs into the theme's CSS and module CSS, driven by theme fields.
- **Tailwind**: the classes are the design tokens in disguise. `bg-slate-900`, `text-4xl`, `py-24`, `max-w-6xl`, `gap-8`, `md:grid-cols-3` tell you colour, size, spacing, width and the responsive behaviour. Translate them into theme fields and ordinary CSS. Do not load Tailwind's CDN script in the theme.
- **React / JSX**: components and their props are a good guide to modules and fields (a `<FeatureCard title image href />` component is a module with those fields; a `.map()` over an array is a repeater). JSX does not run in a HubL theme. To capture it, the user runs it themselves (for example their own `npm run dev`) and gives you the local URL; don't install its dependencies without asking.
- Generated code often has placeholder content ("Lorem ipsum", stock image URLs). Ask the user for real content or keep clearly marked placeholders, and say which in the hand-over.

## An image-only design (screenshot, Figma export)

- Work from the picture: list the bands, the content, the visible colours and the type hierarchy.
- Sizes and colours read from pixels are estimates. Ask for the real values if the user has them (hex colours, font names and weights, content width), and say which are estimates.
- There is nothing to capture in a browser: the image itself is the reference. Put it at the expected viewport width in your notes (most exports are 1440 px wide; check the pixel width), and expect no `identical` from `compare`: the image was not captured the way the build is, so every remaining range has to be explained by eye (see `preview-and-validate`, "The loop").
- A mobile version may not exist. Ask, or design a sensible stacking and say it was your decision.

## Pulling out tokens

Collect, from CSS variables, repeated values or the picture:

- **Colours**: a primary brand colour, a secondary or accent, text colour, background colour(s), and any surface colour for cards. Five or six named colours is typical; twenty distinct hexes usually means near-duplicates to merge.
- **Fonts**: the heading family and weight, the body family, and the sizes of h1 to h4 and body text at desktop and mobile.
- **Spacing**: the vertical padding of a section, the gap between cards, the maximum content width (often 1140 to 1280 px).
- **Shapes**: corner radius on buttons, cards and images; border and shadow styles.
- **Buttons**: primary and secondary styles, with hover states if the design shows them.

Map each token to a theme field (see `hubl-authoring`, `references/theme-fields.md`). A value used once in one place is usually not a token; keep it in that module's CSS.
