# [Section name] implementation prompt

- **Section ID:** `[kebab-case-section-id]`
- **Revision:** `0.1`
- **Companion plan:** [`plan.md`](plan.md)

## Preflight

1. Confirm this file and `plan.md` use the same Section ID and Revision. Stop if they differ.
2. Read `plan.md` and `docs/design-system/design.md` before editing code.
3. Read the cited inspiration materials only to understand the documented section-specific mechanics. Do not copy their visual system, copy, assets, or unrelated implementation.

## Implement

Build the section exactly as described in `plan.md`.

- Keep the component, local styles, and section-local assets in this folder.
- Implement the documented configuration and variants without speculative props or abstractions.
- Follow the Just design system for tokens, typography, elevation, controls, responsive layout, accessibility, and reduced motion.
- Do not add a registry, page composer, dependency, or global abstraction unless the task explicitly requires one.

## Verify and synchronize

1. Run the relevant lint and build checks.
2. Visually inspect the documented target route at desktop and mobile sizes.
3. Check the plan's acceptance criteria.
4. If implementation changes a decision, update both `plan.md` and this file, then increment the shared Revision before completion.
