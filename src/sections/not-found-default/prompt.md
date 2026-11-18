# Not found implementation prompt

- **Section ID:** `not-found-default`
- **Revision:** `1.0`
- **Companion plan:** [`plan.md`](plan.md)

## Preflight

1. Confirm this file and `plan.md` use the same Section ID and Revision.
2. Read `plan.md` and `just-design-system/surfaces/web.md` §9 "Painted banner".

## Implement

Build `NotFoundDefault.jsx` and `.css` as the plan describes, using `../painted-banner/PaintedBanner`
for the banner. No new dependencies.

## Verify and synchronize

`npm run lint`, `npm run build`, and the gallery fixtures at 375, 768 and 1440.
