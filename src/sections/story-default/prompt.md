# Story implementation prompt

- **Section ID:** `story-default`
- **Revision:** `0.3`
- **Companion plan:** [`plan.md`](plan.md)

## Preflight

1. Confirm this file and `plan.md` use the same Section ID and Revision. Stop if they differ.
2. Read `plan.md` and the design system's `surfaces/web.md` §9 *Marketing Story* and *Marketing Split Photo*.
3. The Aura source is for layout only. Do not add overlays or full-bleed photos.

## Implement

- `StoryDefault.jsx` and `StoryDefault.css` in this folder; register as `story-default`.
- Split `body` on blank lines into paragraphs; an empty result counts as a missing body.
- Validate `signature` (name required) and `media` (`src` and string `alt`) when given; guard with `requireProps`.
- `media` present selects the split layout; absent selects the 624px letter column.
- Photo and avatar sit plainly on the page: no ring, border, padding or elevation. `mediaCorners` (`rounded` default, `square`) sets the photo's radius; validate it.
- `mediaOnMobile` (below 768px) and `mediaOnTablet` (768–1023px): `contained` default, `edge-to-edge` (cancel the section's own gutter with a negative inline margin, not `100vw`, which includes a classic scrollbar; square corners) or `hidden` (`display: none`). Validate both.

## Verify and synchronize

1. `npm run lint` and `npm run build`.
2. Review every fixture in `/gallery/story-default` at 375, 430, 768, 1024 and 1440.
3. If a decision changes, update both files and increment the shared Revision.
