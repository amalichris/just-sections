# PRD-002: Benefits media hover

**Status:** in-progress
**Author:** Codex
**Created:** 2026-10-26
**Last updated:** 2026-10-26
**Depends on:** existing benefits-carousel

---

## 1 · Problem

The JustConvert benefits panels are static while a visitor inspects the screenshots.
The owner selected a small pointer-driven zoom to give these media areas a restrained
response. This is a presentation refinement, with no measured conversion claim.

## 2 · Solution overview

Add a CSS-only 2.5% media zoom in the existing framed carousel. Reuse the established
web motion curve, fixed clipped containers, and screenshot attachment. No new props,
JavaScript, dependency, imagery, navigation, or interactive semantics.

### Visitor flow

1. A visitor reaches the benefits and sees its normal resting screenshot.
2. With a hover-capable fine pointer, entering the media area enlarges only the image
   to 1.025 over 350ms using cubic-bezier(0.32, 0.72, 0, 1).
3. Leaving returns from the current scale, including during an interrupted entrance.
4. On touch-only input or with reduced motion, the screenshot stays still. Tablet
   pointers behave like desktop pointers; there is no width-based substitute effect.

## 3 · Scope

### In scope
- Default card media in desktop panels, mobile accordion stages and rails, gated by input capability.
- Bottom/top anchors, centered backdrop images, fixed stage and overflow clipping.
- Dossier revision 0.7, shared design authority, patch release and both registered consumers.

### Out of scope
- Unframed zoom (complete-image contract), hero effects, bounce, parallax, scroll-triggered
  animation, touch/tap zoom, new props, new dependencies, backend or data changes.

---

## 4 · Page composition

### 4.1 · Route

| Route | Config module | New or existing |
|---|---|---|
| /gallery/frame/benefits-carousel/:fixtureId | src/sections/benefits-carousel/fixtures.js | Existing fixture rig |
| JustConvert / and /emirates | Consumer page/campaign configs | Existing |
| JustEjari /, /terms, /privacy | Consumer configs | Existing; regression checks |

### 4.2 · Sections used

| Order | Section type | Slot | New to the library? |
|---|---|---|---|
| Existing position | benefits-carousel | main | No; modify its CSS only |

Technical contract: ../../src/sections/benefits-carousel/plan.md and prompt.md revision 0.7.
Canonical authority: ../../../just-design-system/surfaces/web.md, Features carousel media hover;
foundations.md §11 and §15. Both card and unframed validation contracts stay intact.

### 4.3 · Config changes

| Config | Change | Reason |
|---|---|---|
| Consumer page configs | None | Existing behavior gains input-gated styling |
| Consumer package manifests/locks | Pin v1.14.1 and verify tag SHA | Adopt the shared CSS |

### 4.4 · Library dependency

**Requires a just-sections release:** yes
**Target version:** v1.14.1, patch: no prop/variant/token changes.

### 4.5 · Content and assets

| Asset | Path | Status |
|---|---|---|
| Existing screenshot/photo/top-aligned/unframed fixtures | src/sections/benefits-carousel/fixtures.js | Existing; reuse |
| Product screenshots | Consumer-owned | Unchanged |

No migration required. No API, server, access-control, persistence or loading/error-state changes.

---

## 5 · Responsive behavior

| Width | Behavior |
|---|---|
| 375 / 430 | Existing accordion/rail; zoom only with hover + fine pointer; touch remains static |
| 768 | Existing tabs/card; same capability gate |
| 1024 | Same as 768 |
| 1440 | Same as 768 |

Use parent-media hover, not whole-card hover. Foreground transform-origin center bottom,
top-aligned center top; backdrop center. Transform only, no reflow. Scope all rules to
card presentation. No cursor change, focus stop or keyboard action on noninteractive images.
Reduced-motion eligibility lives in the same media query as hover eligibility, so removing
eligibility resets to the ordinary untransformed state immediately.

## 6 · Accessibility

- Existing headings, labels, alt text and keyboard controls unchanged.
- No hover-only content; no fake button/link semantics.
- Reduced motion: no media transform or transition, even during a hover.
- Native touch scrolling retained; no pointer handlers or event interception.

## 7 · Performance budget

| Metric | Budget | Measured |
|---|---|---|
| Lighthouse Performance / mobile LCP | No new network/JS/image work | No new Lighthouse run required for transform-only CSS |
| CLS | No layout shift from transform | Check media bounds and page overflow |
| Added JS (gzipped) | 0 kB | CSS-only implementation |
| Added image weight | 0 kB | No assets added |

## 8 · Acceptance checks

- [ ] Given card media and a hover-capable fine pointer with motion allowed, entering
  the media area scales images to 1.025 with the specified duration/curve; leaving
  returns to 1 without waiting for a previous transition to complete.
- [ ] Given bottom/top foreground or backdrop media, its anchor is bottom/top/center
  respectively; the colored stage, text and controls do not scale.
- [ ] Given touch-only input, reduced motion, or unframed presentation, no image zoom
  or zoom transition occurs. Ordinary touch rail scrolling still works.
- [ ] Existing fixtures render correctly or reject invalid configurations at all five
  gallery widths; no new page overflow, broken images or keyboard regression.
- [ ] Lint, production build and pack review pass. No added runtime dependencies/dev code/assets.
- [ ] Annotated v1.14.1 is pushed; both registered consumers adopt matching lock SHAs,
  build and receive production-preview route checks. Report browser limitations honestly.
