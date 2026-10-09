# Default header plan

- **Section ID:** `header-default`
- **Revision:** `0.12`
- **Status:** Implemented
- **Products / variants:** Configurable Just landing-page header; initial JustEjari composition, extended for JustConvert's App Store CTA

## Conversion goal

Keep the primary JustEjari action reachable while giving visitors direct, smooth access to the configured landing-page sections.

## Inspiration extraction

- **Catalog entries:** Finsyc — Header 01 (nav); Kelo — Hero (nav); Nura Health — Floating Island (nav).
- **Source material:** `docs/inspiration/full-landing-page-1/full-landing-page-prompt.md`, `docs/inspiration/full-landing-page-2/full-landing-page-prompt.md`, and `docs/inspiration/full-landing-page-3/nura-health-landing-page-architecture/src/components/Navbar.tsx`.
- **Keep:** left/center/right desktop structure, centered fragment links, and scroll-state navigation morph.
- **Adapt:** Just typography, warm glass, Sienna Brand Pill, native fragment scrolling, and no mobile menu.
- **Exclude:** source branding/copy, video treatments, hover icon swaps, login action, and mount animation.

## Just design-system translation

The header follows the approved Marketing Landing Typography extension: 20px wordmark at mobile/tablet, 24px at desktop, and 16px for links and CTA labels. It uses 44px interaction targets, focusBlue keyboard outlines, and a 0.97 press scale. Desktop/tablet starts with the approved Landing Header Glass Pill CTA; hovering it changes it to Sienna, and after a deliberate scroll it becomes the Sienna Brand Pill with a deeper-Sienna hover state. Mobile uses the Sienna Brand Pill from page load; its dedicated glass rail appears only when content begins scrolling behind the header. State changes use the documented 200ms web curve and are disabled for reduced motion.

**Proposed exception, agreed for JustConvert:** a CTA may supply `badge` instead of relying on the pill treatment, so the header can render a fixed external asset — Apple's official App Store badge — unmodified. A badge CTA drops the glass-pill/Sienna-pill chrome entirely (no background, border, backdrop-filter, or hover/scroll recoloring) at every header state; only the 44px minimum target, focusBlue outline, and 0.97 press scale still apply. This does not invent a new button style — it is the documented case where the system defers to a brand-owned external asset it cannot restyle. Recorded in `just-design-system/surfaces/web.md` §8 alongside the approved header refinement.

**Glass refinement, agreed 2026-10-09:** the scrolled desktop/tablet pill adds a subtle ivory upper inset rim over its warm outer ring. The mobile background uses only an ivory tint gradient (88% at the top, 64% near the controls, transparent at the lower edge), contained within the original header height, with no extension below it. The wordmark and CTA stay visible; no mobile blur layers or backdrop filter remain. Keep desktop fill and blur, scroll thresholds, CTA treatments, and props. Unsupported backdrop filtering, reduced transparency, or increased contrast uses opaque ivory with no filter or gradient and fully opaque link labels. Material variables remain section-local; no dependency or refraction shader is introduced.

## Public configuration

**Required.** Missing either of these renders nothing and reports the omission in development.

- `brand`: `Brand` — `{ label, href }`. Supplies the wordmark text and its link target, so the header carries no product-specific copy.
- `cta`: `Cta` — `{ label, href, badge?, target? }`. When `cta.badge` (a `Media`) is supplied, the header renders that image in place of the pill — this is the documented exception for a fixed external asset such as Apple's official App Store badge (see § Just design-system translation). `label` still supplies the accessible name when no badge is given. When `target: '_blank'` is supplied, the link opens in a new tab with `rel="noreferrer noopener"`.

**Optional.** Absence of the value is the only signal; there is no `show`-style boolean.

- `navigation`: array of `{ label, targetId }`, where each `targetId` names the `id` of a section declared in the page config. Omitted or empty, no link list is rendered and the wordmark and CTA keep their positions.
- `id`: element id. Unset by default; the header is not a navigation anchor.

There are no variants and no production navigation, brand, or CTA defaults.

## Behavior and responsive design

The header renders without browser globals and starts with the same unscrolled state on the server and client. CSS media queries own viewport appearance; the effect reads `matchMedia` only to choose the existing scroll thresholds.

The header is fixed. On desktop/tablet it is capped at 1120px with 24–64px responsive gutters; at rest it is an unboxed row over the hero, with links centered between wordmark and CTA. Scrolling down to 64px morphs it into a floating, rounded-full glass pill; it returns to the unboxed state only at 32px or less, preventing flicker. Fragment links use document smooth scrolling and the global 96px header offset. Below 768px, the header has a 12px safe-area-aware top inset and 20px safe-area-aware side insets; links stay hidden and the unboxed wordmark/Sienna CTA row remains. At 16px scroll, a dedicated full-width ivory glass rail fades in behind it; at 4px or less it fades out. This rail is a stable header layer, separate from desktop pill styling, to prevent compositing flashes. Its background stays within the original header height and ends at the header edge. The warm tint fades toward page content without filtering it. A single decorative pseudo-element fades in on scroll-state changes; controls remain visible. The background cannot intercept pointer input, and is hidden on desktop. Opaque fallback states use a solid ivory background within the same bounds.

## Accessibility

Use semantic `header`, `nav`, and list markup. Every link is at least 44px high. Keyboard focus uses a 2px focusBlue outline. Reduced-motion users receive instant state changes, no press scale, and non-animated fragment jumps. Reduced-transparency and increased-contrast preferences use opaque ivory glass surfaces without filters or a gradient; unsupported backdrop filtering uses the same fallback. Badge assets retain their original appearance.

## Acceptance checks

- [x] Follows `docs/design-system/design.md`, including the approved landing extensions.
- [x] Exposes only the documented configuration.
- [x] Keeps the wordmark and CTA visible at desktop and mobile widths.
- [x] Supports stable desktop/tablet pill morph, mobile glass-rail morph without flashing, fragment navigation, keyboard focus, and reduced motion.
- [x] `prompt.md` has the same Section ID and Revision as this plan.
- [x] A `cta.badge` renders as an unstyled image link at every header state (resting, hover, scrolled, mobile) with no pill chrome or recoloring.
- [x] `cta.target: '_blank'` opens the CTA in a new tab with safe opener isolation.

**Revision 0.8:** added the optional `cta.target` behavior so external acquisition links can explicitly open in a new tab.
- [x] In the scrolled glass-pill state, a badge CTA sits as far from the pill's right edge as the wordmark sits from its left edge.

- [x] Desktop/tablet scrolled pill has a restrained ivory upper rim and warm outer ring.
- [x] Mobile scrolled background fades its tint within the original header height with no blur, bottom rule, or blocked content clicks; controls stay visible.
- [x] Unsupported filtering, reduced transparency, and increased contrast use opaque surfaces; badge CTAs remain unstyled.
- [x] Reduced motion disables transitions and CTA press scale.

**Revision 0.12:** final user choice removes the experimental mobile blur layers and retains only the warm background gradient within the original header height, with persistent controls; documented in the canonical web surface.

## Implementation notes

The consuming route owns the fragment targets and must supply the required content configuration.

## Verification — Revision 0.12

Lint and production build pass. Mobile preview measured at 375px: original 68px header (12px top + 44px control + 12px bottom), decorative background bottom inset 0px, no backdrop filter, and persistent controls. Background opacity is 0 at the top and 1 in the scrolled state; the configured fragment CTA reaches its target. No new props or dependencies. Desktop glass treatment and existing opaque preference fallbacks are retained. Safari/Firefox and native preference propagation were not tested.
