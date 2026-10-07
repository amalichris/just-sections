# Value summary plan

- **Section ID:** `value-summary`
- **Revision:** `0.1`
- **Status:** Implemented
- **Products / variants:** Product-agnostic Just landing sections; no section variants

## Conversion goal

Make an offer or product scope scannable through page-owned facts and qualifications. Values must be supported by the consumer’s claims authority; never fabricate performance statistics.

## Inspiration extraction

Catalog: `docs/inspiration/sections.md` → Claude Startups; source folder `docs/inspiration/claude-startups/` with read-only source notes for https://claude.com/programs/startups (reviewed 2026-10-07).

- **Keep:** the offer summary’s prominent values, short labels, fine dividers and calm static presentation.
- **Adapt:** Just fonts, palette, standard gutters, heading ramp and responsive stacking; consumer-owned facts and content.
- **Exclude:** Claude assets/copy, serif typography, white section backgrounds, scroll reveals and count-up motion.

## Just design-system translation

Approved by the user’s request to add the two proposed patterns on 2026-10-07; recorded in `just-design-system/surfaces/web.md` §9 before code. Use foundations and web authority via `docs/design-system/design.md`.

Parchment page, nearBlack headings/values, oliveGray body, sienna eyebrow, borderWarm dividers. No card fill, radius, elevation or hover treatment on these plain text sections. Use standard marketing block padding (96px / 128px), gutters and 1120px container. Intro follows the approved 36/40/48/64px landing ramp with Outfit 500; supporting copy follows 16/16/18/20px Inter 400. Explicitly reset local heading/list/paragraph margins so host reset is not required.

## Public configuration

| Prop | Kind | Notes |
|---|---|---|
| `title` | required | Nonblank heading string |
| `items` | required | One to four `{ id, value, label, description? }` objects; unique nonblank ids and nonblank value/label strings |
| `items[].description` | optional | Nonblank qualification/explanation when supplied |
| `eyebrow` | optional | Nonblank uppercase label when supplied |
| `subtitle` | optional | Nonblank supporting copy when supplied |
| `id` | optional | Anchor; defaults to `value-summary` |

No section variants, numeric animation, number formatting, links, CTA, media, className or style overrides. Values are strings so units and qualifiers remain page-owned; numeric values must be formatted by the config author, not this section.

## Behavior and responsive design

Below 768px values stack with horizontal dividers and 24px padding. From 768px one to three items form a row; four items use 2×2 with dividers. From 1024px all items form a single row. Grid count derives from validated array length via section-local count classes, never style overrides. Values use Outfit 32px / 40px from 768px / 48px from 1200px, weight 500, line-height 1.1. Labels use Inter 16px and optional descriptions Inter 14px, oliveGray, line-height 1.6. Label precedes value in semantic `dl` source order; CSS displays the value above its label. Text wraps, including unbroken values; no truncation.

No interaction, motion, requests, skeletons or optimistic state. Invalid/missing configuration renders nothing and reports using `requireProps` in development. Lists grow with content; all optional spacing belongs to adjacent rendered elements.

## Accessibility

Labelled section, `h2` id derived from `useId()`. Semantic description list: dt label, dd value and optional qualifying description. No controls or tab stops, so hit-target/focus requirements do not arise. Preserve text reflow at 320px, no hidden content and no duplicated heading ids.

## Acceptance checks

- [x] Uses approved canonical pattern and existing tokens.
- [x] Valid required and optional content renders; malformed nested fields, duplicate ids and whitespace-only required strings render nothing.
- [x] Default, minimal, one/two/three/four item counts, long copy and invalid fixtures exist.
- [x] Gallery reviewed at 375, 430, 768, 1024 and 1440; measured iframe width matches each choice.
- [x] 320px has no horizontal overflow; repeated instances have distinct labels.
- [x] Host imports tokens only; section does not depend on reset.css.
- [x] Lint and production build pass.
- [x] Section ID and Revision match prompt.md.

## Implementation notes

PRD-001 coordinates release and page rhythm. This plan and its prompt own the section’s contract; the PRD references them rather than duplicating technical design.

Verified 2026-10-07: five gallery widths matched; no body overflow; long-copy 320px reflow, tokens-only host and repeated-instance SSR checks passed. No controls or motion were added.
