# How it works list implementation prompt

- **Section ID:** `how-it-works-list`
- **Revision:** `0.3`
- **Companion plan:** [`plan.md`](plan.md)

## Preflight

1. Confirm this file and `plan.md` use the same Section ID and Revision. Stop if they differ.
2. Read `plan.md` and the design system's `surfaces/web.md` §9 *Marketing Steps List* and *Marketing Split Photo*.
3. The Aura source is for layout only. Do not copy its markup or full-bleed photos.

## Implement

- `HowItWorksList.jsx` and `HowItWorksList.css` in this folder; register as `how-it-works-list`.
- Validate 3–4 steps with unique ids, an optional complete `cta` (badge included), and an optional `media`; guard with `requireProps`.
- Render steps as an `ol` with an `h3` each; derive `01`–`04` labels from order and hide them from assistive technology.
- `media` present selects the split layout; absent selects the 624px column.
- `mediaOnMobile` (below 768px) and `mediaOnTablet` (768–1023px): `contained` default, `edge-to-edge` (cancel the section's own gutter with a negative inline margin, not `100vw`, which includes a classic scrollbar; square corners) or `hidden` (`display: none`). Validate both.
- Reuse the Sienna Brand Pill CTA rules from `how-it-works-default` and the badge treatment from `pricing-banner-default`.

## Verify and synchronize

1. `npm run lint` and `npm run build`.
2. Review every fixture in `/gallery/how-it-works-list` at 375, 430, 768, 1024 and 1440.
3. If a decision changes, update both files and increment the shared Revision.
