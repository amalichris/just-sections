# Default FAQ implementation prompt

- **Section ID:** `faq-default`
- **Revision:** `0.5`
- **Companion plan:** [`plan.md`](plan.md)

## Preflight

1. Confirm this file and `plan.md` use the same Section ID and Revision.
2. Read `plan.md` and `docs/design-system/design.md` before editing code.
3. Use the cited Kelo reference only for the documented disclosure mechanic; do not copy its image, glass treatment, copy, or styling.

## Implement

Build the configurable FAQ section described in `plan.md`.

- Keep the component and local CSS in this folder.
- Require title and a non-empty item list; keep open-item state internal.
- Treat eyebrow and subtitle as optional and render each only when supplied. Declare the spacing above the title on the eyebrow-to-title pair so an omitted eyebrow leaves no residual margin.
- Use the approved Marketing FAQ pattern: flat configurable parchment/ivory surface (default parchment), typography, divider, Lucide Plus, native semantic controls, and motion behavior. Center the one-column introduction and constrain both it and the left-aligned accordion to 624px; restore left-aligned introduction text in the desktop split.
- Do not add a CTA, search, categories, assets, rich-answer formatting, variants, or dependencies.
- Add only non-production sample content to the JustEjari preview for responsive visual verification.

## Verify and synchronize

1. Run lint and build checks.
2. Inspect `/gallery/faq-default` at 375px, 430px, 768px, 1024px, and 1440px.
3. Verify exclusive expansion, Plus rotation, keyboard behavior, focus visibility, 44px targets, and reduced motion.
4. Update this file and `plan.md` together, incrementing Revision if implementation changes a decision.
