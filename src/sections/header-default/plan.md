# Default header plan

- **Section ID:** `header-default`
- **Revision:** `0.7`
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

**Proposed exception, agreed for JustConvert:** a CTA may supply `badge` instead of relying on the pill treatment, so the header can render a fixed external asset — Apple's official App Store badge — unmodified. A badge CTA drops the glass-pill/Sienna-pill chrome entirely (no background, border, backdrop-filter, or hover/scroll recoloring) at every header state; only the 44px minimum target, focusBlue outline, and 0.97 press scale still apply. This does not invent a new button style — it is the documented case where the system defers to a brand-owned external asset it cannot restyle. Worth recording upstream in `just-design-system/surfaces/web.md` §8–9 the next time that repo is touched, since any future product linking to the App Store needs the same allowance.

## Public configuration

**Required.** Missing either of these renders nothing and reports the omission in development.

- `brand`: `Brand` — `{ label, href }`. Supplies the wordmark text and its link target, so the header carries no product-specific copy.
- `cta`: `Cta` — `{ label, href, badge? }`. When `cta.badge` (a `Media`) is supplied, the header renders that image in place of the pill — this is the documented exception for a fixed external asset such as Apple's official App Store badge (see § Just design-system translation). `label` still supplies the accessible name when no badge is given.

**Optional.** Absence of the value is the only signal; there is no `show`-style boolean.

- `navigation`: array of `{ label, targetId }`, where each `targetId` names the `id` of a section declared in the page config. Omitted or empty, no link list is rendered and the wordmark and CTA keep their positions.
- `id`: element id. Unset by default; the header is not a navigation anchor.

There are no variants and no production navigation, brand, or CTA defaults.

## Behavior and responsive design

The header is fixed. On desktop/tablet it is capped at 1120px with 24–64px responsive gutters; at rest it is an unboxed row over the hero, with links centered between wordmark and CTA. Scrolling down to 64px morphs it into a floating, rounded-full glass pill; it returns to the unboxed state only at 32px or less, preventing flicker. Fragment links use document smooth scrolling and the global 96px header offset. Below 768px, the header has a 12px safe-area-aware top inset and 20px safe-area-aware side insets; links stay hidden and the unboxed wordmark/Sienna CTA row remains. At 16px scroll, a dedicated full-width ivory glass rail fades in behind it; at 4px or less it fades out. This rail is a stable header layer, separate from desktop pill styling, to prevent compositing flashes.

## Accessibility

Use semantic `header`, `nav`, and list markup. Every link is at least 44px high. Keyboard focus uses a 2px focusBlue outline. Reduced-motion users receive instant state changes and non-animated fragment jumps.

## Acceptance checks

- [x] Follows `docs/design-system/design.md`, including the approved landing extensions.
- [x] Exposes only the documented configuration.
- [x] Keeps the wordmark and CTA visible at desktop and mobile widths.
- [x] Supports stable desktop/tablet pill morph, mobile glass-rail morph without flashing, fragment navigation, keyboard focus, and reduced motion.
- [x] `prompt.md` has the same Section ID and Revision as this plan.
- [x] A `cta.badge` renders as an unstyled image link at every header state (resting, hover, scrolled, mobile) with no pill chrome or recoloring.
- [x] In the scrolled glass-pill state, a badge CTA sits as far from the pill's right edge as the wordmark sits from its left edge.

## Implementation notes

The consuming route owns the fragment targets and must supply the required content configuration.
