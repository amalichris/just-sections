# Default hero implementation prompt

- **Section ID:** `hero-default`
- **Revision:** `1.6`
- **Companion plan:** [`plan.md`](plan.md)

## Preflight

1. Confirm this file and `plan.md` use the same Section ID and Revision.
2. Read `plan.md` and `docs/design-system/design.md` before editing code.
3. Review the cited Finsyc, Kelo, and Nura material only for the documented hero mechanics.

## Implement

Build the default hero exactly as described in `plan.md`.

- Keep the component and CSS in this folder. The JustEjari artwork stays here as the initial composition's assets; the page config chooses which images are used.
- Require `title` only. Do not add an eyebrow or more than one CTA.
- Treat `subtitle`, `cta`, `background`, and `media` as optional: each is rendered only when supplied. Without `background` the hero keeps its parchment backdrop. Without `cta`, the hero renders no CTA, matching JustEjari's composition.
- Place `cta` directly after the subtitle (or after the title if no subtitle), reusing `pricing-banner-default`'s Sienna Brand Pill treatment exactly rather than inventing a hero-specific button. When `cta.badge` is supplied, render that image (44px height, auto width) in place of the label and strip the pill chrome — no background, border, or hover recoloring. Keep focusBlue outline and the 0.97 press scale in both cases.
- When `cta.target` is `_blank`, pass it through to the link and pair it with `rel="noreferrer noopener"`.
- Take image alternatives from `background.alt` and `media.alt` rather than hardcoding product-specific text; decorative artwork passes `''`.
- Use the supplied full-bleed artwork beneath the approved warm glass treatment.
- Give the transparent device mockup the approved Whisper elevation using a subtle silhouette shadow (`0 4px 24px` at 5% black); do not add a rectangular border around the transparent asset.
- Keep the artwork at exactly one viewport height, but use that height only as the hero and content minimum. Place the device in normal flex flow directly after the subtitle, using a 64px desktop/tablet gap and a 24px mobile gap; use `clamp(540px, 72vw, 640px)` for the device at tablet widths (768–1023px), `clamp(480px, 40vw, 600px)` on desktop, and retain the documented mobile clamp; let the hero expand intrinsically until that media is contained.
- Pass through optional `media.width` and `media.height` attributes for the background, CTA badge, and device image. The in-flow device image must use eager loading, `fetchPriority="high"`, and asynchronous decoding because it is the likely LCP element.
- Forward optional `srcSet` and `sizes` from both `media` and `background` to their images. Keep `src` as fallback, retain intrinsic dimensions and device fetch priority, and do not add manual preloads.
- Keep the following section independent: do not add fixed clearance, viewport formulas, JavaScript measurement, or adjacent-section selectors.
- At 768px and above, when reduced motion is not requested, offset the backdrop downward at 10% of the hero's passed scroll distance (80px maximum) and the phone upward at 6% (56px maximum). Schedule the passive scroll update with `requestAnimationFrame`; do not move copy or header, change layout, pin, snap, smooth, or intercept scrolling.
- Remove both offsets below 768px and under `prefers-reduced-motion`.
- Preserve the semantic `h1` and the documented image alternatives.

## Verify and synchronize

1. Run lint and build checks.
2. Inspect the preview route at desktop, tablet, and mobile widths.
3. Verify bounded depth at desktop/tablet, a static mobile and reduced-motion composition, the viewport-bound artwork, intrinsic phone containment, clear next-section handoff, readable text, and image alternatives.
4. Update this file and `plan.md` together, incrementing Revision if implementation changes a decision.
