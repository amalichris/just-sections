# Default FAQ plan

- **Section ID:** `faq-default`
- **Revision:** `0.4`
- **Status:** Implemented
- **Products / variants:** Configurable Just landing-page FAQ; initial JustEjari preview fixture

## Conversion goal

Resolve common product questions in place, reducing uncertainty before a visitor continues to the next landing-page action.

## Inspiration extraction

- **Catalog entry:** Kelo — FAQ in `docs/inspiration/sections.md`.
- **Source material:** `docs/inspiration/full-landing-page-2/full-landing-page-prompt.md` and the user-supplied JustEjari FAQ reference image.
- **Keep:** concise question-and-answer disclosure and a single-open accordion interaction.
- **Adapt:** a wide, minimal intro-and-list composition, warm Just typography and tokens, plus icon, and no initial open item.
- **Exclude:** source imagery, glass panel, rounded card, shadow, chevron, centered header, copied copy, and hover image zoom.

## Just design-system translation

The approved Marketing FAQ extension defines a flat parchment treatment by default, with an optional ivory surface configured by the consuming page. Neither surface adds a card, image, glass, radius, or elevation treatment. The eyebrow is Inter 12px w500 uppercase in `sienna`; title is Outfit 500 in `nearBlack` at 36/40/48/64px across 375/430/768/1440px; subtitle is Inter 400 in `oliveGray` at 16/16/18/20px. Questions use Outfit 20px w500, answers use Inter 16px w400, and `borderCream` separates rows. The 24px Lucide Plus sits inside a 44px area, uses `stoneGray` while closed, rotates 45° on opening, and receives normal focus and press feedback.

## Public configuration

**Required.** Missing either of these renders nothing and reports the omission in development.

- `title`: section heading string.
- `items`: array of one or more unique `{ id, question, answer }` objects. An empty array counts as missing.

**Optional.** Absence of the value is the only signal; there is no `show`-style boolean.

- `eyebrow`: short label string.
- `subtitle`: supporting copy string.
- `id`: section id, defaults to `faq`.

**Variant.**

- `surface`: `parchment` or `ivory`; defaults to `parchment`.

The 12px space above the title belongs to the eyebrow-to-title pair, so omitting the eyebrow leaves no residual margin. The component owns the current open item; it exposes no variants, initial-open state, CTA, search, categories, image, or rich-answer content.

## Behavior and responsive design

All items are closed at first render. Opening an item closes any previously open answer; activating the open item closes it. At less than 1024px, the intro stacks above the accordion: the eyebrow, title, and subtitle are centered inside a 624px maximum intro measure, while the left-aligned accordion is centered and capped at the same 624px width. At 1024px and above, the layout uses a left-aligned intro column and right accordion column within a 1120px maximum container and 20–64px responsive gutters. Rows have 24px vertical visual padding within a 72px minimum trigger.

The answer height, opacity, and Plus rotation use a 200ms `cubic-bezier(0.32, 0.72, 0, 1)` transition, except opacity, which uses 200ms ease-out. Reduced motion removes transitions and press scaling. The section has no assets or loading state.

## Accessibility

Use a labelled `section` and `h2`, then an `h3` and native button for every question. Buttons expose `aria-expanded` and `aria-controls`; each answer region is labelled by its question and is `aria-hidden` while collapsed. Buttons support native pointer, Enter, and Space activation, maintain a 44px icon hit area and 72px row target, and show a 2px `focusBlue` outline for keyboard focus.

## Acceptance checks

- [x] Follows the approved Marketing FAQ design-system extension with no card or decorative treatment, and supports the documented parchment/ivory surface variant.
- [x] Requires only the documented content configuration and defaults `id` to `faq`.
- [x] Starts fully collapsed and keeps at most one answer open.
- [x] Uses documented question/answer type, colors, dividers, focus, press, motion, and reduced-motion behavior.
- [x] Centers the one-column introduction while keeping its 624px accordion content left-aligned and constrained.
- [x] Uses the two-column layout at desktop widths, with left-aligned intro text and a 624px maximum accordion column.
- [x] `prompt.md` has the same Section ID and Revision as this plan.

## Implementation notes

The `/justejari` fixture is deliberately non-production content for visual review. A consuming page supplies final FAQ copy.
