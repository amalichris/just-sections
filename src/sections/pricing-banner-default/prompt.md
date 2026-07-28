# Pricing banner default implementation prompt

- **Section ID:** `pricing-banner-default`
- **Revision:** `0.4`
- **Companion plan:** [`plan.md`](plan.md)

## Preflight

1. Confirm this file and `plan.md` use the same Section ID and Revision. Stop if they differ.
2. Read `plan.md` and `docs/design-system/design.md` before editing code.
3. Read the cited inspiration materials only to understand the documented section-specific mechanics. Do not copy their visual system, copy, assets, or unrelated implementation.

## Implement

Build the centered, full-width Just acquisition banner exactly as described in `plan.md`.

- Keep the component and local styles in this folder.
- Require title and a labelled CTA link; default only the anchor ID to `pricing`.
- Treat eyebrow and subtitle as optional and render each only when supplied. Declare the spacing above the title on the eyebrow-to-title pair so an omitted eyebrow leaves no residual margin.
- Use the approved dark CTA Banner pattern and Sienna Brand Pill CTA; do not add cards, billing controls, assets, or variants.
- Apply the documented deeper-Sienna hover state while preserving focus and press behavior.
- Preserve normal anchor behavior, focus visibility, a 44px target, and reduced-motion handling.

## Verify and synchronize

1. Run the relevant lint and build checks.
2. Inspect `/gallery/pricing-banner-default` at 375px, 430px, 768px, 1024px, and 1440px.
3. Check the plan's acceptance criteria.
4. If implementation changes a decision, update both `plan.md` and this file, then increment the shared Revision before completion.
