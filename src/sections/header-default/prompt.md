# Default header implementation prompt

- **Section ID:** `header-default`
- **Revision:** `0.8`
- **Companion plan:** [`plan.md`](plan.md)

## Preflight

1. Confirm this file and `plan.md` use the same Section ID and Revision.
2. Read `plan.md` and `docs/design-system/design.md` before editing code.
3. Review the cited Finsyc, Kelo, and Nura sources only for the documented header mechanics.

## Implement

Build the fixed landing header described in `plan.md`.

- Keep the component and CSS in this folder.
- Require `brand` and `cta`; do not add product copy defaults, a menu, or additional actions. The wordmark comes from `brand.label` — no product name is hardcoded.
- Treat `navigation` as optional: omitted or empty, render no link list. The grid must keep the wordmark left and the CTA right without it.
- Render standard fragment anchors from `targetId` values.
- Use the approved Glass Pill CTA only on desktop/tablet; morph to the defined Sienna Brand Pill at 64px down-scroll and return at 32px up-scroll.
- Keep mobile unboxed with safe-area-aware 12px top and 20px horizontal insets; mobile CTA is Sienna from page load.
- On hover, change the desktop/tablet resting glass CTA to Sienna; use the documented deeper-Sienna hover state once the CTA is already Sienna.
- At 16px mobile scroll, fade in the approved full-width glass rail behind the controls and clear it at 4px or less. Do not reuse or reset desktop pill styles on mobile.
- Apply the approved marketing type scale: 20/24px wordmark and 16px header controls.
- Preserve 44px targets, focusBlue focus treatment, press scale, and reduced-motion behavior.
- When `cta.badge` is supplied, render that image (44px height, auto width) in place of the label and strip the pill chrome — no background, border, backdrop-filter, or hover/scroll recoloring — at every header state. Keep focusBlue outline and the 0.97 press scale.
- When `cta.target` is `_blank`, pass it through to the link and pair it with `rel="noreferrer noopener"`.
- In the scrolled glass-pill state, give a badge CTA 14px extra right margin (the difference between the nav's 6px padding and the wordmark's 20px left inset) so it doesn't sit flush against the pill edge the way a self-padded text pill wouldn't.

## Verify and synchronize

1. Run lint and build checks.
2. Inspect the preview route at desktop, tablet, and mobile widths.
3. Verify anchor targets, top/scrolled states, focus handling, and reduced motion.
4. Update this file and `plan.md` together, incrementing Revision if implementation changes a decision.
