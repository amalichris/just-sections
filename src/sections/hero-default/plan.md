# Default hero plan

- **Section ID:** `hero-default`
- **Revision:** `1.5`
- **Status:** Implemented
- **Products / variants:** Configurable Just landing-page hero; initial JustEjari composition, extended with an optional CTA for JustConvert

## Conversion goal

Establish a clear landing-page opening and make the product visible above the first content section. For JustEjari the header carries the primary action and the hero stays CTA-free; the CTA is optional precisely so a product whose primary action belongs in the hero — JustConvert's App Store badge, read immediately after the promise — can supply one without every consumer paying for it.

## Inspiration extraction

- **Catalog entries:** Finsyc — Header 01 (hero body); Kelo — Hero (nav); Nura Health — Hero.
- **Source material:** `docs/inspiration/full-landing-page-1/full-landing-page-prompt.md`, `docs/inspiration/full-landing-page-2/full-landing-page-prompt.md`, and `docs/inspiration/full-landing-page-3/nura-health-landing-page-architecture/src/components/Hero.tsx`.
- **Keep:** full-viewport visual field, centered product-led content, and a device/artifact crossing the fold.
- **Adapt:** supplied local imagery, warm glass, Just typography, and an optional single CTA.
- **Exclude:** source video, dashboard simulations, eyebrow/meta content, CTA clusters (more than one CTA), and non-Just visual tokens.

## Just design-system translation

The hero uses Outfit 500 for the title and Inter 400 for the subtitle, following the approved Marketing Landing Typography extension. The approved Landing Hero Warm Glass Backdrop places the supplied artwork beneath an ivory 48% overlay with a 12px blur. `nearBlack` and `oliveGray` retain text contrast; no image color becomes a UI token. The phone mockup uses the approved Whisper shadow treatment, adapted as a silhouette `drop-shadow` because the asset has transparency; a rectangular border is intentionally omitted. The same approved hero extension supplies restrained backdrop/phone depth on larger viewports without moving the reading layer.

The optional CTA reuses `pricing-banner-default`'s Sienna Brand Pill treatment exactly (44px height, 24px intrinsic padding, deeper-Sienna hover, focusBlue outline, 0.97 press scale) rather than inventing a hero-specific button. **Proposed exception, agreed for JustConvert:** as in `header-default` and `pricing-banner-default`, the CTA may supply `badge` to render a fixed external asset — Apple's official App Store badge — unmodified, dropping the pill chrome and recoloring while keeping the 44px target, focusBlue outline, and press scale. Same rationale as `header-default`'s exception above; worth recording upstream in `just-design-system/surfaces/web.md` at the same time as that one.

## Public configuration

**Required.** Missing it renders nothing and reports the omission in development.

- `title`: hero headline string.

**Optional.** Absence of the value is the only signal; there is no `show`-style boolean.

- `subtitle`: supporting copy below the headline.
- `cta`: `Cta` — `{ label, href, badge?, target? }`. Renders a single Sienna Brand Pill action directly below the subtitle. When `cta.badge` (a `Media`) is supplied, the hero renders that image in place of the pill — see § Just design-system translation. When `target: '_blank'` is supplied, the link opens in a new tab with `rel="noreferrer noopener"`. Omitted, the hero has no CTA, as JustEjari's composition uses.
- `background`: `Media` — `{ src, alt, width?, height? }` for the full-bleed artwork beneath the warm glass treatment. Omitted, the hero keeps its parchment backdrop. Decorative artwork passes `alt: ''`.
- `media`: `Media` for the product image following the copy in normal flow. Supply intrinsic `width` and `height` when available so the browser can reserve its aspect ratio before the image loads; the hero image is eagerly fetched with high priority because it is the likely LCP element.
- `id`: section id, defaults to `top`.

Both images are supplied by the page, so the section carries no product-specific asset or alternative text. The two approved JustEjari assets remain in this dossier as the initial composition's source. There is no eyebrow, navigation, or layout variant, and never more than one CTA.

## Behavior and responsive design

The artwork field is exactly one viewport high: `100dvh` on desktop/tablet and `100svh` on mobile. The hero and its content use that height as a minimum rather than a fixed height, so copy wrapping and the configured phone determine any additional flow height. The phone is a normal flex item directly after the subtitle, with a 64px desktop/tablet gap and a 24px mobile gap; its width is `clamp(540px, 72vw, 640px)` at tablet widths (768–1023px), `clamp(480px, 40vw, 600px)` on desktop, and `min(calc(100% - 40px), 360px)` on mobile.

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
- [x] Requires only documented title; subtitle, cta, background, and media are all optional.
- [x] Has no eyebrow and never renders more than one CTA.
- [x] A `cta.badge` renders as an unstyled image link with no pill chrome or hover recoloring.
- [x] `cta.target: '_blank'` opens the CTA in a new tab with safe opener isolation.

**Revision 1.2:** added the optional `cta.target` behavior so external acquisition links can explicitly open in a new tab.
- [x] Keeps the artwork at one viewport height while the hero grows intrinsically to contain its configured phone.
- [x] Keeps the following section clear without fixed reserves, runtime measurement, or cross-section coupling.
- [x] Keeps parallax decorative, bounded, and limited to backdrop/phone layers at 768px and above.
- [x] Leaves mobile, reduced-motion, copy, header, layout, and native scrolling unchanged.
- [x] Uses documented alternative text and composition clearance.
- [x] Emits supplied intrinsic image dimensions and marks the in-flow device image eager/high-priority for LCP discovery.
- [x] `prompt.md` has the same Section ID and Revision as this plan.

**Revision 1.3:** added optional intrinsic media dimensions and eager/high-priority loading for the in-flow device image so page-supplied hero media can reserve space and receive LCP priority.

**Revision 1.4:** enlarged the device presentation at tablet and desktop widths and removed the mobile device's additional 48px top gap at the user's direction.

**Revision 1.5:** restored a 24px mobile gap between the supporting copy and device media at the user's direction.

## Implementation notes

The section following the hero on `/` — the gallery's fixture-built demo page — demonstrates the intrinsic-flow contract with a solid parchment surface. “Real size” is visual rather than physical because browser zoom and display density vary.

**Revision 1.1:** added the optional `cta` prop (and its `badge` exception) so JustConvert's hero can carry its own primary action; JustEjari's composition is unaffected because it omits the prop.

**Revision 1.0:** increased the device width at tablet widths to keep the product mockup visually anchored against the full-bleed backdrop; desktop and mobile sizing remain unchanged.

**Revision 0.8:** replaced the fixed-height hero and implied next-section reserve with an intrinsic flow box whose minimum is one viewport. The backdrop remains viewport-bound while the hero expands to contain the configured phone, keeping every following section independent.

**Revision 0.7:** added the approved desktop/tablet hero depth treatment. The decorative backdrop follows scroll 10% more slowly (80px maximum) while the foreground phone travels 6% faster (56px maximum); mobile, reduced motion, reading content, and native page scroll remain unchanged.
