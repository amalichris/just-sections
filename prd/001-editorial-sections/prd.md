# PRD-001: Editorial sections and page rhythm

**Status:** draft (composition-spacing agreement pending)
**Author:** Codex
**Created:** 2026-10-07
**Last updated:** 2026-10-07
**Depends on:** none

## 1 · Problem

Our library offers rich product imagery but lacks a simple text-led benefits section and an at-a-glance summary of an offer. Consecutive parchment sections also accumulate two blocks of whitespace, which can make related content feel disconnected.

## 2 · Solution overview

Add `benefits-list` and `value-summary`, inspired by the structure of [Claude Startups](https://claude.com/programs/startups), translated through the Just design system. Audit every existing section for page rhythm; preserve deliberate hero, pinned storytelling, inverse CTA and legal spacing. Keep existing consumer configurations valid and roll both products onto the new minor release.

### Visitor flow

1. The visitor scrolls from product imagery to a benefits heading and reads outcome titles with explanations in divider rows. Optional decorative Lucide icons reinforce the rows; all content is visible without interaction.
2. The visitor scans a summary heading followed by prominent values and their labels; optional descriptions qualify the claims.
3. The visitor continues to the page’s existing CTA and FAQ. These new sections add no competing controls.

## 3 · Scope

### In scope
- Two product-agnostic sections, complete dossiers, gallery fixtures, guards, static rendering and registry entries.
- Repo-local PRD Architect skill link and a PRD/tasks template aligned with the existing dossier workflow.
- Shared design-system documentation for the approved section patterns.
- Audit of every registered section’s rhythm. Proposed ordinary parchment adjacency rule: one marketing block of space, scoped to `ProductPage`; standalone section spacing stays unchanged. Awaiting agreement.
- Dev-only composition proof using existing product facts and copy.
- Minor release and both consumer dependency/lockfile upgrades; preserve unrelated working changes.

### Out of scope
- New customer claims, testimonials, partner offers, media, backend, analytics events or dependencies.
- Replacing existing consumer carousels, changing CTA destinations or rewriting product copy.
- App changes, legal content, deployment configuration, or a new spacing prop/configuration system.

## 4 · Page composition

### 4.1 · Route

| Route | Config module | New or existing |
|---|---|---|
| `/gallery/benefits-list` | `src/sections/benefits-list/fixtures.js` | New section preview |
| `/gallery/value-summary` | `src/sections/value-summary/fixtures.js` | New section preview |
| `/`, `/demo/justconvert` | `src/dev/demo/{product}/page.config.js` | Existing dev-only composition rigs |
| Consumer routes | Release skill’s [consumer checklist](../../.skills/publish-just-sections/references/consumers.md) and current consumer route manifests | Existing; upgrade dependency |

### 4.2 · Sections used

| Order | Section `type` | Slot | New to the library? |
|---|---|---|---|
| As configured | Existing registry entries | Existing slots | Existing, audited |
| Page-owned | `benefits-list` | main | New; [plan](../../src/sections/benefits-list/plan.md), [prompt](../../src/sections/benefits-list/prompt.md) |
| Page-owned | `value-summary` | main | New; [plan](../../src/sections/value-summary/plan.md), [prompt](../../src/sections/value-summary/prompt.md) |

No fixed ordering is imposed by the library. The dev rigs demonstrate a compact value summary after the hero and text benefits alongside existing image-led sections.

### 4.3 · Config changes

| Config | Change | Reason |
|---|---|---|
| `src/sections/registry.js`, `src/index.js` | Register/export the two sections | Available to page configuration and direct imports |
| Dev demo configurations | Add both sections using existing preview content/facts | Exercise real copy lengths and adjacency |
| Consumer manifests and lockfiles | Pin the release tag and matching SHA | Make the library available without forcing page edits |
| `src/ProductPage.css` | Proposed adjacency rule; see rhythm audit | Eliminate duplicate whitespace only for compatible rendered neighbors |

No database or API changes. No migration required. Config is static JavaScript data, not remote user-generated content. There are no auth, network-mutation, optimistic, or loading states; invalid config renders nothing and reports through `requireProps` in development. Each dossier specifies nested validation, optional-content omission, long-copy behavior and instance-safe labels.

### 4.4 · Library dependency

**Requires a `just-sections` release:** yes
**Target version:** `v1.12.0` (confirm remote tags before release)

New sections are additive; existing prop contracts remain valid. Follow the [release skill](../../.skills/publish-just-sections/SKILL.md). Confirm the installed versions and lockfile commit SHA, then lint/build/static-check where supported and review production routes in available browsers. Report unavailable engines rather than claiming coverage.

### 4.5 · Content and assets

No new image assets. Fixture copy is illustrative; demo values reuse current product facts. Live consumer copy/configurations retain their current content. Design authority is [the pointer](../../docs/design-system/design.md), resolving to the shared `just-design-system` foundations and web surface; no local replacement system.

## 5 · Responsive behavior

| Width | Behavior |
|---|---|
| 375 | Benefits stack title above explanation; summary values stack with horizontal dividers; 36px intro |
| 430 | Same layout as 375; 40px intro |
| 768 | Benefits use title/explanation columns; summary 2–3 columns, four items use 2×2; 48px intro |
| 1024 | Benefits retain columns; all summary values form one row; 48px intro |
| 1440 | Same layouts as 1024 inside 1120px container; 64px intro |

All rows expand with copy, no clipping, horizontal body overflow or animation. Invalid fixtures leave no phantom section for adjacency rules.

## 6 · Accessibility

- Label each section with its `h2`, using `useId()` so repeated instances have distinct DOM ids. Benefits have `h3` row titles; summary uses a semantic description list with label/value pairs.
- New sections have no controls, no added tab stops and no motion; optional icons are decorative (`aria-hidden`).
- Keep existing controls’ keyboard access, focusBlue outlines and reduced-motion behavior intact.
- Support 320px text reflow and long value labels. All section styles work with a host importing tokens only, independent of reset.css.

## 7 · Performance budget

| Metric | Budget | Measured |
|---|---|---|
| Lighthouse Performance | Existing routes should not regress; no claim without measurement | Not measured |
| LCP (mobile, throttled) | No new above-fold imagery or network requests | Not measured |
| CLS | No JS-dependent layout or delayed content | Verify stable static rendering |
| Added JS (gzipped) | < 5 kB for the two sections | Pending build comparison |
| Added image weight | 0 kB | No shipped imagery |

## 8 · Acceptance checks

- [ ] GIVEN complete configuration WHEN each section renders THEN its documented content appears in order at all five gallery widths.
- [ ] GIVEN optional content is absent WHEN minimal fixtures render THEN no empty nodes or residual optional-content spacing appears.
- [ ] GIVEN missing required fields, duplicate ids or malformed nested data WHEN rendered THEN the whole invalid section renders nothing and reports in development.
- [ ] GIVEN repeated section types WHEN composed THEN `aria-labelledby` references unique existing headings.
- [ ] GIVEN long titles/values WHEN rendered at 320px THEN the document does not scroll horizontally.
- [ ] GIVEN a consumer imports tokens without reset WHEN rendered THEN lists, margins, type and layout remain correct.
- [ ] GIVEN the accepted rhythm rule WHEN compatible parchment sections are adjacent THEN one block of separation remains; omitted invalid sections do not create gaps, and isolated/excluded sections retain spacing.
- [ ] GIVEN the release WHEN both consumers install it THEN manifest pins, lockfile SHAs and on-disk versions match the tag, builds pass and route-review evidence is recorded.
- [ ] GIVEN the package WHEN packed THEN no dev rig, docs tree, product images, dependencies or secrets enter the published surface.
