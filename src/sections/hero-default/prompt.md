# Default hero implementation prompt

- **Section ID:** `hero-default`
- **Revision:** `0.9`
- **Companion plan:** [`plan.md`](plan.md)

## Preflight

1. Confirm this file and `plan.md` use the same Section ID and Revision.
2. Read `plan.md` and `docs/design-system/design.md` before editing code.
3. Review the cited Finsyc, Kelo, and Nura material only for the documented hero mechanics.

## Implement

Build the default hero exactly as described in `plan.md`.

- Keep the component and CSS in this folder. The JustEjari artwork stays here as the initial composition's assets; the page config chooses which images are used.
- Require `title` only. Do not add a hero CTA or eyebrow.
- Treat `subtitle`, `background`, and `media` as optional: each is rendered only when supplied. Without `background` the hero keeps its parchment backdrop.
- Take image alternatives from `background.alt` and `media.alt` rather than hardcoding product-specific text; decorative artwork passes `''`.
- Use the supplied full-bleed artwork beneath the approved warm glass treatment.
- Give the transparent device mockup the approved Whisper elevation using a subtle silhouette shadow (`0 4px 24px` at 5% black); do not add a rectangular border around the transparent asset.
- Keep the artwork at exactly one viewport height, but use that height only as the hero and content minimum. Place the documented device scale in normal flex flow directly after the subtitle, using the 64px desktop/tablet or 48px mobile gap; let the hero expand intrinsically until that media is contained.
- Keep the following section independent: do not add fixed clearance, viewport formulas, JavaScript measurement, or adjacent-section selectors.
- At 768px and above, when reduced motion is not requested, offset the backdrop downward at 10% of the hero's passed scroll distance (80px maximum) and the phone upward at 6% (56px maximum). Schedule the passive scroll update with `requestAnimationFrame`; do not move copy or header, change layout, pin, snap, smooth, or intercept scrolling.
- Remove both offsets below 768px and under `prefers-reduced-motion`.
- Preserve the semantic `h1` and the documented image alternatives.

## Verify and synchronize

1. Run lint and build checks.
2. Inspect the preview route at desktop, tablet, and mobile widths.
3. Verify bounded depth at desktop/tablet, a static mobile and reduced-motion composition, the viewport-bound artwork, intrinsic phone containment, clear next-section handoff, readable text, and image alternatives.
4. Update this file and `plan.md` together, incrementing Revision if implementation changes a decision.
