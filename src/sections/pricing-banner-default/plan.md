# Pricing banner default plan

- **Section ID:** `pricing-banner-default`
- **Revision:** `0.5`
- **Status:** Implemented
- **Products / variants:** Configurable Just landing-page acquisition banner; initial JustEjari composition, extended for JustConvert's App Store CTA

## Conversion goal

Give JustEjari landing visitors a clear, low-friction reason to open the Mini App without presenting plans or billing: begin with three free PDF generations.

## Inspiration extraction

- **Catalog entries:** Finsyc — Pricing 01; Kelo — Pricing.
- **Source material:** `docs/inspiration/full-landing-page-1/full-landing-page-prompt.md`, `docs/inspiration/full-landing-page-2/full-landing-page-prompt.md`, and the user-supplied pricing-banner reference image.
- **Keep:** a concise pricing-adjacent conversion promise and primary action.
- **Adapt:** a single centered banner rather than tier cards, with Just warm tokens and typography.
- **Exclude:** plans, prices, billing toggle, feature lists, card treatments, imagery, and hover effects.

## Just design-system translation

The approved Marketing CTA Banner extension defines the full-width `darkSurface` field, `coral` Inter eyebrow, `ivory` Outfit title, `warmSilver` Inter subtitle, and Sienna Brand Pill CTA. The CTA is 44px high with 24px intrinsic horizontal padding, `focusBlue` focus treatment, Whisper elevation, a deeper-Sienna hover state, and 0.97 press feedback. No imagery, custom button treatment, or decoration is used.

**Proposed exception, agreed for JustConvert:** as in `header-default`, a CTA may supply `badge` to render a fixed external asset — Apple's official App Store badge — unmodified in place of the pill: no dark-surface pill background, border, or hover recoloring, only the 44px target, focusBlue outline, and 0.97 press scale remain. Same rationale as `header-default`'s § Just design-system translation; not a new button style.

## Public configuration

**Required.** Missing either of these renders nothing and reports the omission in development.

- `title`: conversion heading string.
- `cta`: `Cta` — `{ label, href, badge? }`. When `cta.badge` (a `Media`) is supplied, the banner renders that image in place of the pill.

**Optional.** Absence of the value is the only signal; there is no `show`-style boolean.

- `eyebrow`: uppercase label above the title.
- `subtitle`: supporting copy below the title.
- `id`: section id, defaults to `pricing`.

The 16px space above the title belongs to the eyebrow-to-title pair, so omitting the eyebrow leaves no residual margin. There are no variants, optional CTA states, plan data, billing controls, or assets.

## Behavior and responsive design

The section is centered at all viewport widths with a 960px maximum content measure and a 640px subtitle measure. It has a 440px minimum block size with 20px mobile gutters, then a 480px minimum block size with responsive 24–64px gutters at 768px and up; it grows for text reflow and never uses viewport height. Typography is eyebrow 12px; title 36/40/48/64px and subtitle 16/16/18/20px at 375/430/768/1440px. The initial JustEjari content uses “Simple from the start,” “Start with 3 PDF generations free.”, and a CTA labeled “Open JustEjari.”

## Accessibility

The section is labelled by its `h2`. Its CTA is a native link with a 44px minimum target and visible `focusBlue` focus. The content has no images or motion beyond press feedback; reduced motion disables the transition and scale.

## Acceptance checks

- [x] Follows the approved Marketing CTA Banner design-system extension.
- [x] Exposes only the documented configuration and no billing UI.
- [x] Centers and reflows at 375px, 430px, 768px, and 1440px without viewport-height sizing.
- [x] Uses a 44px CTA link with keyboard focus and reduced-motion handling.
- [x] `prompt.md` has the same Section ID and Revision as this plan.
- [x] A `cta.badge` renders as an unstyled image link with no pill chrome or hover recoloring.

## Implementation notes

The CTA href is page-supplied and this library has no opinion about its value. JustEjari's page config, now in that product's `web/` department, still carries `#pricing` as a preview-safe placeholder because the live Mini App URL was not available when the page was written — replacing it is a change there, not here.
