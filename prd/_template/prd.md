# PRD-{number}: {Feature Name}

**Status:** draft | in-review | approved | in-progress | done
**Author:** {agent or human}
**Created:** {YYYY-MM-DD}
**Last updated:** {YYYY-MM-DD}
**Depends on:** PRD-{n} _(or "none")_

> **Template note (delete when filling):** This library owns reusable sections. Keep each section’s technical contract in its
> co-located `plan.md` and `prompt.md`; this PRD coordinates changes across dossiers,
> shared design authority, page composition, and consumer releases.

---

## 1 · Problem

_What is the page failing to do? Who bounces, or fails to convert, and where? 2–3 sentences._

## 2 · Solution overview

_One paragraph: what changes on the page, and what a visitor does differently after it ships._

### Visitor flow

_What the visitor sees and does, in order, from arrival to the action you want. Number each
step. Describe the page, not the code._

1. Visitor arrives at … and sees …
2. Scrolling to … they read …
3. …

## 3 · Scope

### In scope
- …

### Out of scope
- …

---

## 4 · Page composition

### 4.1 · Route

| Route | Config module | New or existing |
|---|---|---|
| `/{path}` | `src/dev/demo/{product}/page.config.js` | 🆕 new \| ✏️ existing |

### 4.2 · Sections used

_Every section this page renders, in page order. For each new section, link its dossier for configuration, validation, states, layout, and accessibility._

| Order | Section `type` | Slot | New to the library? |
|---|---|---|---|
| 1 | `header-default` | header | existing |
| 2 | `{section-id}` | main | 🆕 **requires a just-sections release** |

### 4.3 · Config changes

_What changes in the page config. Props, not markup._

| Config | Change | Reason |
|---|---|---|
| `{name}.config.js` | {which section entry, which prop} | {why} |

### 4.4 · Library dependency

**Requires a `just-sections` release:** yes | no
**Target version:** `v{x.y.z}` _(or "current pin, no change")_

_If yes, this PRD cannot ship until that version is tagged. State what the library must add._

### 4.5 · Content and assets

_Product copy and imagery belong to consumers. Fixtures use `fixtureMedia.js`; sections ship no imagery._

| Asset | Path | Status |
|---|---|---|
| {name} | `assets/{file}` | 🆕 needed \| existing \| placeholder to replace |

---

## 5 · Responsive behavior

_What changes at each documented width. "Same as 1024" is a valid answer — say it explicitly
rather than leaving a row blank._

| Width | Behavior |
|---|---|
| 375 | |
| 768 | |
| 1024 | |
| 1440 | |

## 6 · Accessibility

- Heading order, and which element is the page's single `h1`
- Keyboard path through every interactive control
- `alt` text for each informative image; `''` for decorative
- Reduced-motion behavior for anything animated

## 7 · Performance budget

_Landing pages are measured on first paint, not feature count._

| Metric | Budget | Measured |
|---|---|---|
| Lighthouse Performance | ≥ 90 | |
| LCP (mobile, throttled) | < 2.5s | |
| CLS | < 0.1 | |
| Added JS (gzipped) | < {n} kB | |
| Added image weight | < {n} kB | |

## 8 · Acceptance checks

_Checkable statements. Each becomes a task in `tasks.md`._

- [ ] …
