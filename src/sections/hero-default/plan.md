# Default hero plan

- **Section ID:** `hero-default`
- **Revision:** `0.9`
- **Status:** Implemented
- **Products / variants:** Configurable Just landing-page hero; initial JustEjari composition

## Conversion goal

Establish a clear JustEjari landing-page opening and make the product visible above the first content section while the header carries the primary action.

## Inspiration extraction

- **Catalog entries:** Finsyc — Header 01 (hero body); Kelo — Hero (nav); Nura Health — Hero.
- **Source material:** `docs/inspiration/full-landing-page-1/full-landing-page-prompt.md`, `docs/inspiration/full-landing-page-2/full-landing-page-prompt.md`, and `docs/inspiration/full-landing-page-3/nura-health-landing-page-architecture/src/components/Hero.tsx`.
- **Keep:** full-viewport visual field, centered product-led content, and a device/artifact crossing the fold.
- **Adapt:** supplied local imagery, warm glass, Just typography, and no hero CTA.
- **Exclude:** source video, dashboard simulations, eyebrow/meta content, CTA clusters, and non-Just visual tokens.

## Just design-system translation

The hero uses Outfit 500 for the title and Inter 400 for the subtitle, following the approved Marketing Landing Typography extension. The approved Landing Hero Warm Glass Backdrop places the supplied artwork beneath an ivory 48% overlay with a 12px blur. `nearBlack` and `oliveGray` retain text contrast; no image color becomes a UI token. The phone mockup uses the approved Whisper shadow treatment, adapted as a silhouette `drop-shadow` because the asset has transparency; a rectangular border is intentionally omitted. The same approved hero extension supplies restrained backdrop/phone depth on larger viewports without moving the reading layer.

## Public configuration

**Required.** Missing it renders nothing and reports the omission in development.

- `title`: hero headline string.

**Optional.** Absence of the value is the only signal; there is no `show`-style boolean.

- `subtitle`: supporting copy below the headline.
- `background`: `Media` — `{ src, alt }` for the full-bleed artwork beneath the warm glass treatment. Omitted, the hero keeps its parchment backdrop. Decorative artwork passes `alt: ''`.
- `media`: `Media` for the product image following the copy in normal flow.
- `id`: section id, defaults to `top`.

Both images are supplied by the page, so the section carries no product-specific asset or alternative text. The two approved JustEjari assets remain in this dossier as the initial composition's source. There is no eyebrow, CTA, navigation, or layout variant.

## Behavior and responsive design

The artwork field is exactly one viewport high: `100dvh` on desktop/tablet and `100svh` on mobile. The hero and its content use that height as a minimum rather than a fixed height, so copy wrapping and the configured phone determine any additional flow height. The phone is a normal flex item directly after the subtitle, with a 64px desktop/tablet gap or 48px mobile gap; its width remains `clamp(320px, 24vw, 340px)` on larger screens and `min(calc(100% - 40px), 360px)` on mobile.

When the phone extends below the artwork field, the hero grows intrinsically until its untransformed media box is contained. The next composed section therefore begins after the phone and needs only its standard section padding—no fixed reserve, viewport formula, JavaScript measurement, or knowledge of the hero. Parallax transforms do not participate in layout; because the phone only moves upward, the untransformed flow box remains the safe maximum extent.

At 768px and above, when reduced motion is not requested, scroll creates one bounded depth separation while the hero is leaving the viewport:

- the decorative backdrop offsets downward at 10% of the distance scrolled through the hero, capped at 80px;
- the phone offsets upward at 6%, capped at 56px;
- the headline, subtitle, and header retain their normal document scroll rate.

The effect updates through one passive scroll listener scheduled with `requestAnimationFrame`. It does not pin, snap, smooth, or intercept the page scroll and does not change layout. Below 768px and under `prefers-reduced-motion`, both offsets are removed and the composition is fully static.

## Accessibility

The background image is decorative and has empty alternative text. The phone mockup uses the alternative text “JustEjari Contracts home screen showing a rental contract list.” The title is the sole `h1`; all content remains readable without the image.

## Acceptance checks

- [x] Uses the approved design-system hero extension and warm token text.
- [x] Requires only documented title and subtitle inputs.
- [x] Has no eyebrow or hero CTA.
- [x] Keeps the artwork at one viewport height while the hero grows intrinsically to contain its configured phone.
- [x] Keeps the following section clear without fixed reserves, runtime measurement, or cross-section coupling.
- [x] Keeps parallax decorative, bounded, and limited to backdrop/phone layers at 768px and above.
- [x] Leaves mobile, reduced-motion, copy, header, layout, and native scrolling unchanged.
- [x] Uses documented alternative text and composition clearance.
- [x] `prompt.md` has the same Section ID and Revision as this plan.

## Implementation notes

The section following the hero on `/` — the gallery's fixture-built demo page — demonstrates the intrinsic-flow contract with a solid parchment surface. “Real size” is visual rather than physical because browser zoom and display density vary.

**Revision 0.8:** replaced the fixed-height hero and implied next-section reserve with an intrinsic flow box whose minimum is one viewport. The backdrop remains viewport-bound while the hero expands to contain the configured phone, keeping every following section independent.

**Revision 0.7:** added the approved desktop/tablet hero depth treatment. The decorative backdrop follows scroll 10% more slowly (80px maximum) while the foreground phone travels 6% faster (56px maximum); mobile, reduced motion, reading content, and native page scroll remain unchanged.
