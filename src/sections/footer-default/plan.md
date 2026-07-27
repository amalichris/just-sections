# Default legal footer plan

- **Section ID:** `footer-default`
- **Revision:** `0.4`
- **Status:** Implemented
- **Products / variants:** Configurable Just landing-page legal footer

## Conversion goal

Finish a landing page with concise ownership and legal navigation without competing with its primary conversion action.

## Inspiration extraction

- **Reference:** user-supplied JustConvert legal-footer image.
- **Catalog entries:** Finsyc — CTA with Footer 01; Kelo — Footer; Nura Health — Footer.
- **Keep:** a quiet legal row separated from the page by a single divider.
- **Adapt:** parchment, warm divider, Caption legal type, and responsive Just spacing.
- **Exclude:** video, newsletter, CTAs, social links, wordmark treatment, dark surfaces, status indicators, and product navigation.

## Just design-system translation

The approved Default Legal Footer pattern uses a flat parchment surface by default, with an optional ivory surface configured by the consuming page, and one `borderCream` divider. Copyright and legal links use Inter Caption 14px w400 in `oliveGray`; links become `nearBlack` on hover. Legal links preserve 44px hit areas, focusBlue focus, and a 0.97 press scale.

## Public configuration

**Required.** Missing it renders nothing and reports the omission in development.

- `productName`: string used in the copyright notice.

**Optional.** Absence of the value is the only signal; there is no `show`-style boolean.

- `privacyHref`: destination for the fixed Privacy label.
- `termsHref`: destination for the fixed Terms label. With neither href supplied, the legal navigation is not rendered.
- `id`: element id. Unset by default; the footer is not a navigation anchor.

**Variant.**

- `surface`: `parchment` or `ivory`; defaults to `parchment`.

The component derives the current year at render time. There are no variants. This section stays legal-only: a CTA, newsletter, social links, or product navigation requires a separate section with its own documented design-system pattern.

## Behavior and responsive design

Desktop/tablet places copyright on the left and legal links on the right within the 1120px container and 24–64px gutters. Mobile stacks copyright above the legal-link row with 20px gutters. The footer has no entrance or continuous animation; only hover, focus, and press feedback apply to links.

## Accessibility

Use semantic `footer` and a named legal `nav`. All links retain 44px minimum targets and visible focus rings. Reduced-motion users receive no link transition or press animation. The component has no images.

## Acceptance checks

- [x] Follows the documented Default Legal Footer pattern and supports the documented parchment/ivory surface variant.
- [x] Requires only the documented legal configuration.
- [x] Works as a desktop row and mobile stack.
- [x] Meets link target, focus, and reduced-motion behavior.
- [x] `prompt.md` has the same Section ID and Revision as this plan.

## Implementation notes

Preview fragment URLs are non-production placeholders. Consuming pages supply real legal destinations.
