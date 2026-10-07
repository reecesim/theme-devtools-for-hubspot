# Reading the comparison

## The log

`theme-check/log.md`, one row per viewport per iteration, written every iteration:

```
| # | viewport | sizes (design / build) | height ratio | differing % | identical | worst range (y, %) | change made |
| 1 | 1440 | 1440x2400 / 1440x2740 | 1.142 (MISMATCH) | 18.4 | no | 0..820, 41.2 | hero: section padding 120 → 80 to match design |
| 1 | 390 | 390x3900 / 390x5110 | 1.310 (MISMATCH) | 22.0 | no | 0..1500, 37.9 | (same change) |
| 2 | 1440 | 1440x2400 / 1440x2450 | 1.021 | 6.3 | no | 2210..2600, 12.0 | cards: gap 16 → 32, radius 4 → 12 |
```

At the end, report the last row per viewport, whether `identical` was reached, and for each remaining range its cause, seen in its crop.

## Reading the numbers

`compare` prints the two image sizes and the height ratio, a layout or width mismatch when there is one, the share of differing pixels in the area both images share, the largest differing vertical ranges, and `identical` or `not identical`. Read them in that order.

- **Height ratio first.** Above 1 means the build is taller. Over 5% either way is flagged as a layout mismatch, and every band below the first shifted one then differs simply because it moved. Find the band where the crops start to drift apart and fix that band's height (padding, image height, line height, an extra or missing element).
- **Width mismatch** means the two captures were not taken at the same viewport or scale. Recapture; the numbers mean nothing until the widths match.
- **Differing %** is a summary at the default threshold (a pixel differs when a channel differs by more than 24). Two pages can share 5% and look quite different if the 5% is the hero.
- **Ranges** are vertical bands where differing rows cluster, largest first. A range's percentage is the share of its own pixels that differ: a 3% range is a near match, a 40% range is a different design in that band. `compare` marks a range over 3% as over target; that is a reading aid, not the stop condition.
- **`identical`** is judged at threshold 0 and equal dimensions: every channel of every pixel equal. It is the only number that says "matches" on its own; anything short of it needs every remaining range explained.

## Reading a range

`compare --out <dir>` writes `diff.png` (differences in red over a faded reference) and `range-1.png` onwards, each a crop of the design (left) and the build (right) side by side. Look at the crops, not two full pages. Name what differs in words, by region, and its cause:

| What you see in the crop | Usual cause | Where to fix |
| --- | --- | --- |
| Everything below a band shifted down or up | Section padding, image height or an extra element in that band | Section template or module CSS |
| Text in the right place but a different shape | Wrong font family or weight, or the font not loaded | Theme font fields; check the font loads |
| Text wraps at a different point | Font size, letter spacing or content width | Theme text fields, `maximum_content_width` |
| Colour blocks differ | A hard-coded colour, or a token default not set to the design | Theme colour fields |
| Every column full width, one under another, on desktop | No grid CSS in the theme (the local renderer adds none) | Theme stylesheet: `hubl-authoring`, `references/dnd-areas.md`, "Styling the grid" |
| Columns stacked on desktop, or side by side on mobile | Wrong `width` on dnd modules, or module CSS fighting the grid | Template or section; module CSS |
| Images missing or grey | Wrong `get_asset_url` path, or an image default left empty | Template or section passing the image |
| A labelled grey box where the design has a form or menu | The placeholder for `@hubspot/form` or `@hubspot/menu` | Nothing: report it and its effect on the band's height |
| Faint edges along text and shapes only, no shift | Anti-aliasing: an element sits a fraction of a pixel off, or a font loaded differently | Check the fonts loaded in both and the box sizes above it; otherwise name it as the cause |
| A different heading, missing photo, different card count | A field default not set from the design, or content the render does not have | Field defaults; fixtures for account content; otherwise report it |
