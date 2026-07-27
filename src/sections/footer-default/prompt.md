# Default legal footer implementation prompt

- **Section ID:** `footer-default`
- **Revision:** `0.4`
- **Companion plan:** [`plan.md`](plan.md)

## Preflight

1. Confirm this file and `plan.md` use the same Section ID and Revision.
2. Read `plan.md` and `docs/design-system/design.md` before editing code.
3. Use the cited reference only for the documented quiet legal-footer structure.

## Implement

Build the configurable legal footer in `plan.md`.

- Keep the component and CSS in this folder.
- Require product name; derive the current year at render time.
- Treat the Privacy and Terms destinations as optional. Render each link only when its href is supplied, and drop the legal navigation entirely when neither is.
- Use only the documented configurable parchment/ivory surface (default parchment), divider, Caption typography, and legal links.
- Do not add a CTA, newsletter, social links, product navigation, imagery, or dependencies. A richer footer is a separate section with its own documented design-system pattern.

## Verify and synchronize

1. Run lint and build checks.
2. Inspect the preview route at desktop and mobile widths.
3. Verify layout, targets, focus, press feedback, and reduced motion.
4. Update this file and `plan.md` together, incrementing Revision if implementation changes a decision.
