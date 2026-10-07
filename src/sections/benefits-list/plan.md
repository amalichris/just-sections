# Benefits list plan

- **Section ID:** `benefits-list`
- **Revision:** `0.1`
- **Status:** Implemented
- **Products / variants:** Product-agnostic Just landing sections; no section variants

## Conversion goal

Explain what the visitor gains, through short outcomes and always-visible supporting copy. The page’s existing CTA owns conversion.

## Inspiration extraction

Catalog: `docs/inspiration/sections.md` → Claude Startups; source folder `docs/inspiration/claude-startups/` with read-only source notes for https://claude.com/programs/startups (reviewed 2026-10-07).

- **Keep:** the For founders on the frontier section’s divider rows, title/explanation columns, restrained optional icons and visible copy.
- **Adapt:** Just fonts, palette, standard gutters, heading ramp and responsive stacking; consumer-owned facts and content.
- **Exclude:** Claude assets/copy, serif typography, white section backgrounds, scroll reveals and count-up motion.

## Just design-system translation

Approved by the user’s request to add the two proposed patterns on 2026-10-07; recorded in `just-design-system/surfaces/web.md` §9 before code. Use foundations and web authority via `docs/design-system/design.md`.

Parchment page, nearBlack headings/values, oliveGray body, sienna eyebrow, borderWarm dividers. No card fill, radius, elevation or hover treatment on these plain text sections. Use standard marketing block padding (96px / 128px), gutters and 1120px container. Intro follows the approved 36/40/48/64px landing ramp with Outfit 500; supporting copy follows 16/16/18/20px Inter 400. Explicitly reset local heading/list/paragraph margins so host reset is not required.

## Public configuration

| Prop | Kind | Notes |
|---|---|---|
| `title` | required | Nonblank heading string |
| `items` | required | Nonempty array of `{ id, title, description, icon? }`; unique nonblank ids; nonblank title and description |
| `items[].icon` | optional | `check` (Lucide Check, 16px) or `document` (FileText, 20px); omitted renders no icon; unknown name invalidates section |
| `eyebrow` | optional | Nonblank when present; uppercase label |
| `subtitle` | optional | Nonblank when present; supporting copy |
| `id` | optional | Anchor; defaults to `benefits` |

No section variants, CTA, imagery, arbitrary icon component, className or style overrides. Icon names are JSON-like data and map to static imports. Optional strings can be undefined; malformed supplied strings invalidate the configuration.

## Behavior and responsive design

Below 768px each row stacks its title and explanation with an 8px gap. From 768px use two columns (2:3) with a 48px gap, preserving source order. Rows have top dividers and the list a closing divider; 24px vertical padding, 32px at 1024px+. Intro is left-aligned at every width, maximum 624px; rows span the 1120px container. Body is Inter 16px / 18px from 768px, line-height 1.6. Row titles use Outfit 20px / 25px from 1024px. Optional icons occupy only the title group and disappear with their gap when omitted.

No interaction, motion, requests, skeletons or optimistic state. Invalid/missing configuration renders nothing and reports using `requireProps` in development. Lists grow with content; all optional spacing belongs to adjacent rendered elements.

## Accessibility

Labelled section, `h2` id derived from `useId()`. Semantic unordered list, h3 per row, decorative icons hidden from assistive technology. No controls or tab stops, so hit-target/focus requirements do not arise. Preserve text reflow at 320px, no hidden content and no duplicated heading ids.

## Acceptance checks

- [x] Uses approved canonical pattern and existing tokens.
- [x] Valid required and optional content renders; malformed nested fields, duplicate ids and whitespace-only required strings render nothing.
- [x] Default, minimal, both icon names, long copy and invalid fixtures exist.
- [x] Gallery reviewed at 375, 430, 768, 1024 and 1440; measured iframe width matches each choice.
- [x] 320px has no horizontal overflow; repeated instances have distinct labels.
- [x] Host imports tokens only; section does not depend on reset.css.
- [x] Lint and production build pass.
- [x] Section ID and Revision match prompt.md.

## Implementation notes

PRD-001 coordinates release and page rhythm. This plan and its prompt own the section’s contract; the PRD references them rather than duplicating technical design.

Verified 2026-10-07: five gallery widths matched; no body overflow; long-copy 320px reflow, tokens-only host and repeated-instance SSR checks passed. No controls or motion were added.
