# AGENTS.md

## Operating principles

- Think before coding. Do not assume requirements; surface material uncertainty, tradeoffs, or conflicting evidence before making a consequential choice.
- Simplicity first. Implement the smallest change that fully solves the request. Do not add speculative features, abstractions, dependencies, or configuration.
- Make surgical changes. Touch only files required by the task. Preserve existing behavior and style; clean up only issues introduced by the current change.
- Execute against a goal. State or infer checkable success criteria, then verify the relevant criteria before declaring the work complete.

## Product goal and design authority

Build a library of reusable landing-page section components that can be composed and configured into high-converting product pages for **JustEjari** and **JustConvert**. Favor configurable content and variants over one-off, product-specific page implementations.

`docs/design-system/design.md` is the single source of truth for visual and interaction design. All components and pages must follow its specifications, including tokens, typography, layout, responsive behavior, components, and motion.

- Use `docs/inspiration/` to study patterns and outcomes, not as a design specification to copy verbatim.
- Before introducing a pattern that conflicts with, extends, or is absent from the design system, explain the proposed exception and obtain agreement.
- Once agreed, update `docs/design-system/design.md` in the same change so the decision becomes part of the system before relying on it elsewhere.
- If `docs/design-system/design.md` is unavailable or unclear, do not invent a replacement system. Flag the gap and request direction before making a design decision that depends on it.

When implementing web UI, check these non-negotiables from the system:

- Use the warm token palette: `parchment` for page backgrounds, warm neutrals only, and no white page backgrounds or heavy drop shadows.
- Use Outfit at weight 500 for headlines and values; use Inter for body and UI text. Reserve Inter 600 for status badges.
- Map every interactive control to a defined button or circular-icon-button variant. Primary full-width CTAs use the Sienna Brand Pill treatment; do not invent button styles.
- Use ring elevation by default, the 8pt spacing scale, documented radii, 44×44px minimum interactive hit targets, and `focusBlue` for web keyboard focus.
- Honor `prefers-reduced-motion`; otherwise use the documented press scale (0.96–0.97) and web transition curves. Do not animate typing or data entry.

## Section dossier workflow

Each reusable section lives in `src/sections/<section-id>/`. This folder contains its planning artifacts, implementation code, local styles, and section-local assets. Do not split these artifacts across parallel trees or join them with symlinks.

Start each new section by copying `src/sections/_template/`. Do not add a generic abstraction during dossier setup; establish one only when a completed section demonstrates a concrete need.

Follow this order for every section:

1. Find the section in `docs/inspiration/sections.md` and follow its linked source folder.
2. Read the original prompt and source material. Extract only the section-specific structure, behavior, and useful mechanics; never copy an inspiration wholesale.
3. Translate the selected ideas through `docs/design-system/design.md`, recording any proposed system extension for agreement before implementation.
4. Complete `plan.md` and `prompt.md` in the section folder.
5. Implement the section code and styles in that same folder. Sections ship no imagery — every image a section renders is supplied by page configuration.
6. Write `fixtures.js` and register the section, then review it in the gallery at each documented breakpoint.
7. Verify the documented acceptance checks, then synchronize both Markdown artifacts with the final implementation.

`plan.md` and `prompt.md` are both required before implementation. They must carry the same **Section ID** and **Revision**. If either is missing or their revisions differ, the dossier is not implementation-ready. When an implementation decision changes, update both documents and increment the shared revision before treating the work as complete.

- `plan.md` is the decision record: conversion goal, source extraction, design-system translation, public configuration/variants, responsive and interaction behavior, accessibility, and acceptance checks.
- `prompt.md` is the execution contract: it references the plan, gives precise implementation work, and must not contradict the plan or design system.
- `fixtures.js` is the reviewable proof: sample configurations the gallery renders. It must cover a fully dressed `default`, a `minimal` with required props only, one fixture per documented variant, and at least one invalid configuration marked `expectsNothing: true`. A section without fixtures cannot be reviewed without a full page config, so it is not implementation-complete.

## Section gallery

`npm run dev`, then open `/gallery`. It lists every section in `registry.js` and renders each against its `fixtures.js` at 375, 430, 768, 1024, and 1440.

- Fixtures are discovered automatically from `src/sections/*/fixtures.js`; there is no second registry to keep in sync. A registered section with no fixtures is reported on the index rather than hidden.
- Previews render in an iframe so CSS media queries see a real viewport. A width-constrained `div` would show the desktop layout squeezed and report the wrong breakpoint.
- The gallery displays the iframe's measured width beside the width chips and flags any mismatch. If that reads anything other than the width you selected, the preview is showing the wrong breakpoint — fix that before trusting what you see.
- Gallery chrome deliberately avoids the `--just-*` tokens so tool and output are never confused.

## Page composition contract

Pages are composed from configuration, not hand-written JSX. A finished section is registered once and then driven entirely by page config.

- Each section's `plan.md` **Public configuration** section declares its props as **required**, **optional**, or **variant**. Required means the section is meaningless without it; the section renders nothing and reports the omission in development. Optional means `undefined` renders nothing. A variant is a documented enum with a default.
- Absence of content is the only signal for optional content. Never add a `showEyebrow`-style boolean, and never expose `className` or `style` overrides — that is how the design system leaks.
- Declare spacing on the adjacent-sibling pair rather than on the element, so omitting optional content leaves no residual margin.
- Repeatable content is an array of objects carrying a stable `id`, used as the React key and for any derived DOM ids. Derive `aria-labelledby` ids from `useId()` so a section type can appear more than once on a page.
- Shared content shapes (`Cta`, `Media`, `Brand`, `NavigationItem`) live in `src/sections/types.js`. Reuse them instead of inventing a new shape for the same idea.
- Register a completed section in `src/sections/registry.js` under its section ID. Pages are composed in the consuming product's own department — `justejari/web/src/pages/<product>/page.config.js` — never here. Keep the config JSON-like so a CMS could supply it later, share repeated values with plain constants, and do not build a template-token interpolation layer.

## Project map

A published section library built with React 19 and Vite, consumed by each product's `web/` department. It contains no product page of its own: JustEjari's landing page moved to `justejari/web/` in Phase 2, and this repo is deliberately product-agnostic and asset-free.

- `src/index.js` is the package entry point; `src/ProductPage.jsx` is the page composer. Both are published — `src/dev/`, `src/main.jsx`, and `src/App.jsx` are not.
- `src/main.jsx` configures the dev harness entry point, router, and fonts; `src/App.jsx` defines its routes.
- `src/sections/` is the reusable section library; each section dossier is self-contained in this directory.
- `src/sections/registry.js` maps a config `type` to its section component. Sections are static imports except `legal-document-default`, which is lazy because `react-markdown` and `remark-gfm` cost +47.6 kB gzipped on pages that never render a document. Measure before adding another lazy entry; a section earns one by pulling a heavy dependency most pages do not use, not by being large itself.
- `src/sections/types.js` holds the shared content typedefs; `src/sections/requireProps.js` is the shared required-prop guard.
- `src/sections/_template/` is the starting template for a new section dossier and is not runtime code.
- `src/sections/<section-id>/fixtures.js` supplies the gallery's sample configurations for that section; `src/sections/fixtureMedia.js` builds inline placeholder imagery for them so no fixture introduces an asset file.
- `src/dev/` is the local development harness — the section gallery plus `DemoPage.jsx`, a whole-page composition built from every section's `default` fixture. The gallery checks sections in isolation; the demo page checks what `ProductPage` does around them. It is excluded from the published package and is the only place `import.meta.glob` or other Vite-specific APIs may be used.
- `src/styles/tokens.css` declares the `--just-*` design tokens and nothing else; `src/styles/reset.css` holds the global reset and base element styles; `src/styles/fonts.css` loads Outfit and Inter. A host application embedding a section imports `tokens.css` only — `reset.css` would fight its own global styles.
- `public/` holds dev-harness assets only — currently just `favicon.svg`. Sections ship no imagery: every image a section renders is supplied by page configuration, and fixtures use `fixtureMedia.js` rather than files.
- `docs/design-system/design.md` points at `just-design-system`, the family-level design authority. Read `foundations.md` and `surfaces/web.md` there.
- `docs/inspiration/` is a reference archive. Do not treat nested example projects or copied prompts there as production code unless the task explicitly names them.
- `docs/learnings.md` records reusable project insights; update it only when a task produces a durable, non-obvious learning.

## Development

- Install dependencies: `npm install`
- Start the dev server: `npm run dev`
- Lint: `npm run lint`
- Create a production build: `npm run build`
- Preview a production build: `npm run preview`

There is no automated test suite at present. For code changes, run `npm run lint` and `npm run build`. For visible UI changes, also inspect the affected route in a browser at appropriate viewport sizes.

## Implementation conventions

- Use React function components and the existing client-side React Router setup.
- Build landing pages by composing reusable sections with explicit, product-agnostic configuration; avoid duplicating a section solely for different copy or a minor visual variant.
- Reuse the established font variables: `var(--just-font-heading)` for headings and `var(--just-font-body)` for body text.
- Every design token carries the `--just-` prefix. A bare `--color-*` collides with host application themes; this palette already drifted once because of it. Component-internal custom properties are not tokens — namespace them by section (`--hero-device-offset`, `--how-it-works-step-scroll`) and do not add them to `tokens.css`.
- Prefer CSS in `src/styles/` for shared rules; keep page-specific styling local only when it remains small and readable.
- Reuse installed packages when they directly fit the request. Do not install a package without a clear need. Note which tier a package sits in: `react`, `react-dom`, and `lucide-react` are peer dependencies; `react-markdown`, `remark-gfm`, and `@fontsource/*` are runtime dependencies the package ships with; `react-router-dom`, `gsap`, and `motion` are dev-only and must not be imported from `src/sections/`, `src/index.js`, or `src/ProductPage.jsx`. A section that needs a dev-only package has to promote it to a dependency first, and that is a cost worth weighing.
- Match the formatting and quote/semicolon style of the file being edited. Avoid repository-wide formatting churn.
- Provide meaningful `alt` text for informative images, preserve keyboard access for interactive controls, and respect reduced-motion preferences when adding nonessential animation.

## Change hygiene

- Read the relevant code and nearby documentation before editing; inspect `git status` first and preserve unrelated user changes.
- Do not modify lockfiles, build configuration, dependencies, or generated output unless the task requires it.
- Do not remove or rewrite existing copy, assets, or routes merely to simplify a task.
- In the final handoff, summarize the changed files and report the verification actually run, including any checks that could not be performed.
