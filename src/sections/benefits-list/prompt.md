# Benefits list implementation prompt

- **Section ID:** `benefits-list`
- **Revision:** `0.1`
- **Companion plan:** [plan.md](plan.md)

## Preflight

Read the plan, cited inspiration notes and canonical foundations/web surface. Confirm the accepted pattern is recorded in the shared authority and both dossier revisions match before code.

## Implement

Implement the exact public configuration and responsive behavior in plan.md in this folder. Use React useId, shared requireProps, local CSS and static Lucide Check/FileText imports only. Reject malformed config as a whole, including duplicate ids and whitespace-only strings. Omitted optional content renders no node and no spacing. Use standard marketing tokens and heading ramp, with local margin/list resets independent of host reset.css. No imagery, new dependencies, controls, motion or arbitrary style props.

## Verify and synchronize

Create fixtures for every documented case; register and export the component. Run lint/build, review the gallery at 375/430/768/1024/1440, verify iframe widths, long-copy reflow at 320px, repeated labels and tokens-only rendering. Record actual outcomes in the plan. If implementation changes a decision, increment both revisions before completion.
