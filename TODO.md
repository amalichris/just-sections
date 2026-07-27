# TODO — Graduate the section library into the product repos

Status: **Phase 0 and Phase 1 complete (2026-07-27).** Phase 2 is ready to start.

Phase 1 landed on branch `restructure/library-portability` (4 commits over a baseline commit).
Deviations and discoveries worth carrying forward:

- **T1.2** also namespaced two component-internal custom properties by section
  (`--step-*` → `--how-it-works-step-*`). Design tokens take `--just-`; component internals take
  their section id. Both rules are now in `AGENTS.md`.
- **T1.5** the gallery previews in an iframe. A width-constrained `div` does not trigger media
  queries. The first implementation was still wrong — the global reset's `border-box` let a 1px
  border eat 2px, so the 768 chip rendered at 766px and `min-width: 768px` was false. Fixed, and
  the gallery now displays the measured width so it cannot regress silently.
- **T1.7** `remark-gfm` is required, not optional: JustConvert's privacy policy has 38 tables.
- **T1.7** `legal-document-default` is the registry's one lazy section (+47.6 kB gzipped
  otherwise, on every landing page). `ProductPage` supplies the Suspense boundary.
- **T1.8** the package is renamed but the **directory and git remote are not** — see that task.

- `~/Programming/just-design-system` created and committed — foundations + three surface docs.
- JustConvert docs reduced to product specs, committed on branch `docs/design-system-layering`.
- JustEjari `docs/design-system/design.md` reduced to product specs — **left uncommitted**, its
  working tree had 32 files of unrelated in-progress work.
- T0.1 deviation: full git history could not be preserved across three source repositories, so
  provenance is recorded in the new repo's `README.md` and `CHANGELOG.md` instead of via
  `git subtree`.

## Goal

Turn this trial repo into a shared, versioned section library consumed by each product's
`web/` department, and collapse the four diverging `design.md` copies into one layered
design system.

Target layout:

```
~/Programming/
├── skills/                  ← cross-product SOPs (exists, unchanged)
├── just-design-system/      ← family design authority (docs only, no code)
├── just-sections/           ← this repo, graduated: React section library
├── 08_justejari/justejari/  ← docs/ + app/ + web/   (web/ is NEW)
└── 02_justconvert/justconvert/ ← docs/ + web/ + ios/ + backend/ + …
```

Two rules govern every task below:

1. **Import, don't copy.** A doc or token value has exactly one home. Everything else
   points at it.
2. **Never delete.** Superseded files become pointer files. The user removes them after
   verifying the replacement works.

---

## Design system: the three-layer split

Evidence for the split (verified 2026-07-27):

| Copy | Lines | Actual content |
|---|---|---|
| `skills/just-design-system/design.md` | 689 | foundations + landing surface |
| `landing-page-trials/docs/design-system/design.md` | 689 | byte-identical vendored copy |
| `justejari/docs/design-system/design.md` | 673 | foundations + Mini App surface |
| `justconvert/docs/design-system/design.md` | 201 | foundations only ("Brand Foundation") |

Each copy is `shared foundations + one surface`. Factor that apart:

**Layer 1 — Family foundations.** `just-design-system/foundations.md`
Palette, type families + scale, 8pt spacing, radii, elevation, motion curves,
brand do's/don'ts. Platform-agnostic — no CSS, no SwiftUI, no component anatomy.
Consumed by every product on every surface.

**Layer 2 — Surface systems.** One doc per surface, **all at family level**. Extends Layer 1,
never restates it. Each opens with "Foundations: see `foundations.md`" and describes how the
Just brand becomes an app on that surface — independent of which product.

| Surface | Doc | Covers |
|---|---|---|
| Landing / marketing web | `just-design-system/surfaces/web.md` | Section components, glass treatments, web focus + motion |
| iOS | `just-design-system/surfaces/ios.md` | SwiftUI theme, button styles, sheets, haptics, motion |
| Telegram Mini App | `just-design-system/surfaces/miniapp.md` | Telegram theme params, safe areas, dense mobile forms, haptics |

**Layer 3 — Implementations.** Code. Shared implementations live in family packages;
product-specific components stay in the product.

| Implementation | Home |
|---|---|
| `tokens.css` + section components | `just-sections/` — family package |
| SwiftUI theme, button styles, motion, haptics | `just-ios-kit/` — family package (see Open question 4) |
| JustConvert onboarding modifiers, top-bar views | `justconvert/ios/…/DesignSystem/` — product-specific |
| JustEjari Mini App screens and styles | `justejari/app/src/` — product-specific |

### The placement test

For any design artifact, ask: **would a second app on this same surface need it?**

- Yes → family level (`just-design-system/` for docs, a family package for code)
- No → the product that owns it

This is uniform across surfaces. There is no special case for web.

Evidence this is right, from `justconvert/ios/JustConvert/DesignSystem/` (verified 2026-07-27):

| Reusable on any Just iOS app | JustConvert-only |
|---|---|
| `Theme.swift`, `Typography.swift`, `Spacing.swift` | `OnboardingBlinkingCursorModifier.swift` |
| `Motion.swift`, `Haptics.swift` | `OnboardingDigitNudgeModifier.swift` |
| `PressScaleButtonStyle.swift`, `CircularIconButtonStyle.swift` | `OnboardingPulseModifier.swift` |
| `SheetContentHeightKey.swift` | `TopBarEditModeButtonView.swift` |
| ~244 lines | ~262 lines |

`PressScaleButtonStyle` and `CircularIconButtonStyle` implement rules the shared design system
already mandates — the circular-icon-button variant and the 0.96–0.97 press scale. Family-level
iOS design content already exists; it is just trapped as Swift inside one product.

---

## Phase 0 — Reconcile the design system

Blocks everything else. Do not start Phase 1 until this is committed.

### T0.1 — Scaffold `just-design-system` as a real repo

**Do:** Promote `~/Programming/skills/just-design-system/` (currently a bare folder holding
one `design.md`, with no `SKILL.md`, so it is not a functioning skill) into a standalone
git repo at `~/Programming/just-design-system/`. Structure:

```
just-design-system/
├── foundations.md
├── surfaces/
│   ├── web.md
│   ├── ios.md
│   └── miniapp.md
├── README.md          ← what each layer is, who consumes it, how to propose a change
└── CHANGELOG.md       ← every token or rule change, dated
```

**Outcome:** A repo whose README states the three-layer model and names each consumer.
The old `skills/just-design-system/design.md` becomes a pointer file naming the new repo.

**Verify:** `git log` shows the original `design.md` history preserved (use `git subtree`
or `git mv` + init, not a fresh copy).

### T0.2 — Write `foundations.md`

**Do:** Start from JustConvert's 201-line "Brand Foundation" — it is already the right
shape and scope. Reconcile its token values against the palette blocks in the other three
copies. Resolve every conflict explicitly; note each resolution in `CHANGELOG.md`.

Known reconciliations needed:
- `--color-coral`, `--color-dark-surface`, `--color-warm-silver` are each declared twice in
  this repo's `src/index.css`. Keep one.
- JustConvert web uses `--public-color-*`; this repo uses bare `--color-*`. Same hex values.
  See T0.3 for the naming decision.

**Outcome:** One document, ~200-250 lines, containing only what is true on every surface of
every product. If a rule mentions CSS, SwiftUI, hover, or haptics, it belongs in Layer 2.

**Verify:** Grep `foundations.md` for `css`, `swiftui`, `hover`, `haptic`, `px` — near-zero
hits. Spacing and type scale express as unitless scale steps plus a base.

### T0.3 — Decide the token namespace

**Do:** Adopt `--just-*` across the family: `--just-color-sienna`, `--just-font-heading`,
`--just-space-4`, `--just-radius-lg`. Record it in `foundations.md`.

Rationale: this repo's bare `--color-*` will collide inside any host app, and JustConvert
already diverged to `--public-color-*` to dodge exactly that. `--just-` is unambiguous,
greppable, and marks family ownership. The rename is mechanical.

**Outcome:** A naming rule in `foundations.md` and a rename table (old → new) for the two
existing prefixes, so T1.2 and the JustConvert migration are lookup jobs, not judgment calls.

### T0.4 — Write `surfaces/web.md`

**Correction (2026-07-27):** a web surface doc already exists —
`justconvert/docs/design-system/design-web.md`, 193 lines, and by its headings it is almost
entirely family-reusable (scope, inheritance, web typography, semantic HTML mapping, layout,
breakpoints, accessibility, page patterns). It has no landing *section components*. So this
task is a **merge of two lineages**:

- **Base:** `design-web.md` — take wholesale, it is already surface-level and product-neutral.
- **Add:** the landing section components from this repo's 689-line `design.md`, which
  `design-web.md` lacks entirely.

Where the two conflict, `design-web.md` wins on layout/typography/breakpoints (it is the
newer, deliberately-split lineage) and the trial doc wins on section component anatomy (it is
the only source). Log every conflict resolution in `CHANGELOG.md`.

**Do:** Move the landing-only sections out of this repo's 689-line `design.md`:
Marketing Landing Typography, Marketing Benefits Bento, Marketing Process Story,
Marketing CTA Banner, Marketing FAQ, Default Legal Footer, Landing Hero Warm Glass Backdrop,
Landing Header Glass Pill CTA, Landing Mobile Glass Rail. Add the web-specific interaction
rules currently embedded in the foundations text: `focusBlue` keyboard focus, web transition
curves, press scale 0.96–0.97, `prefers-reduced-motion`, 44×44px hit targets.

**Outcome:** `surfaces/web.md` opens with a foundations pointer and contains only landing
surface material. Every "*(approved extension)*" marker is preserved — that provenance is
how a future exception gets reviewed.

**Verify:** No color hex, type scale, or spacing value is restated here. Anything numeric
that isn't component geometry should be a reference to a foundations token.

### T0.5 — Write `surfaces/ios.md`

**Correction (2026-07-27):** an iOS surface doc already exists —
`justconvert/docs/design-system/design-app.md`, 686 lines. This task is a **split**, not an
extraction from Swift.

**Do:** Divide `design-app.md` by the placement test. Roughly lines 1–170 are family-level
iOS surface; the rest is JustConvert product detail.

| Goes to `surfaces/ios.md` (family) | Stays with JustConvert (product) |
|---|---|
| Screen Padding, App Typography Rules | §11 Components (11.1–11.16: ConvertSheet, UnitRow, InputCard, OutputCard, UnitPill, Keypad, Sidebar, SearchField, History, Onboarding, Subscription) |
| §7 Button Variants (Warm Sand, Dark Charcoal, Sienna Brand, Sienna Brand Pill, Near Black) | §10 Icon Reference → Converter Categories |
| §8 Haptic Feedback | §12 Number Formatting |
| §9 Animation Constants + Animation Rules | `component-specs.json` |
| Circular Icon Buttons (from §11.11) | |
| §13 Accessibility, §14 Do's & Don'ts (App Interaction) | |

Cross-check each retained rule against the SwiftUI source in
`justconvert/ios/JustConvert/DesignSystem/` — `Theme.swift`, `Typography.swift`,
`Spacing.swift`, `Motion.swift`, `Haptics.swift`, `PressScaleButtonStyle.swift`,
`CircularIconButtonStyle.swift`, `SheetContentHeightKey.swift`. Where doc and code disagree,
that is a real conflict — resolve it deliberately and log it in `CHANGELOG.md`.

**Outcome:** A second Just iOS app can be built to brand from this doc alone, without reading
JustConvert's source.

**Verify:** No JustConvert component name (`ConvertSheet`, `InputCard`, `UnitRow`,
`Converter*`, `Onboarding*`) appears in `surfaces/ios.md`.

### T0.6 — Write `surfaces/miniapp.md`

**Do:** Extract the Mini App conventions from `justejari/docs/design-system/design.md` (673
lines) — Telegram theme params, safe-area handling, dense mobile form patterns, and anything
else that would apply to a second Telegram Mini App. Fold in
`justejari/docs/design-system/haptics-guidelines.md` if its rules are surface-general rather
than JustEjari-specific; if it is already general, move it wholesale and leave a pointer.

**Outcome:** The Mini App surface is documented independently of JustEjari's features.

### T0.7 — Reduce the product design docs to product specs

**Do:** With foundations at Layer 1 and surface conventions at Layer 2, each product's
`docs/design-system/` keeps only what is unique to that product:

- **JustEjari** keeps Upload Status Cards, Uploaded Document Preview, Document Vault Actions,
  `component-specs.json`, and the wireframe HTML/PDFs. Everything else becomes a pointer.
  Rename `design.md` → `component-specs.md` if that better describes what remains.
- **JustConvert**'s 201-line doc is pure foundations, so after T0.2 it retains nothing.
  Replace it with a pointer file. This is the correct outcome, not a mistake — JustConvert's
  iOS component specs have not been written yet, and now there is an obvious place for them.

**Outcome:** Neither product repo restates a token value or a surface convention. Both open
with pointers to `foundations.md` and the relevant surface doc.

**Verify:** `grep -c '#[0-9a-fA-F]\{6\}'` on both product design docs returns 0.

### T0.8 — Replace the vendored copy in this repo

**Do:** `docs/design-system/design.md` here becomes a pointer to `just-design-system`.
Update the `docs/design-system/design.md` references in `AGENTS.md` and `CLAUDE.md` to name
`foundations.md` and `surfaces/web.md` explicitly — the current text points at a single file
that will no longer be authoritative.

**Outcome:** Zero copies of foundations content in this repo.

### T0.9 — Note the JustEjari landing docs

**Do:** No move required. `justejari/docs/landing-page/` (thoughts.md,
thoughts-consolidated.md, 2026-07-08_justejari-dream-landing.md, Landing Page Design
Analysis.pdf) and `justejari/docs/design-system/landing/` (blueprint.md, animations.md) are
**product-specific landing intent** — what JustEjari's landing page should say and do. That
is company-level product truth, not family design system. It stays.

**Outcome:** A line in `justejari/docs/design-system/miniapp.md` or the root `AGENTS.md`
distinguishing the two: `landing/` = this product's landing intent;
`just-design-system/surfaces/web.md` = how any landing page is built.

---

## Phase 1 — Make this repo a publishable library

All work stays in this repo. `npm run dev` must keep working throughout.

### T1.1 — Split `src/index.css` into three files

**Do:** Break `src/index.css` (64 lines, currently tokens + reset + base element styles) into:

```
src/styles/
├── tokens.css   ← :root custom properties ONLY. Always safe for any host to import.
├── reset.css    ← the * reset, html/body rules, section[id] scroll-margin,
│                  prefers-reduced-motion block. Standalone sites only.
└── fonts.css    ← the @fontsource imports currently in src/main.jsx
```

**Outcome:** A host app embedding a section imports `tokens.css` and the section's own CSS,
and nothing touches its `body` background or global box-sizing. A standalone landing site
imports all three.

**Verify:** `tokens.css` contains no selector other than `:root`.

### T1.2 — Apply the `--just-*` namespace

**Do:** Rename every custom property per the T0.3 table, across `tokens.css` and all seven
section CSS files. Mechanical — `sed` it, then grep for stragglers.

**Verify:** `grep -rn 'var(--' src/ | grep -v 'var(--just-'` returns nothing.

### T1.3 — Replace `import.meta.env.DEV`

**Do:** Swap for `process.env.NODE_ENV !== 'production'` in `src/sections/requireProps.js:26`
and `src/pages/ProductPage.jsx:28`.

**Why:** `import.meta.env` is Vite-only. Both consumers are Vite today, so this is not
urgent — but a shared package must not assume its consumer's bundler, and this is the only
place the library does.

**Verify:** `grep -rn 'import.meta' src/` returns nothing.

### T1.4 — Evict product assets from the library

**Do:** `src/sections/hero-default/assets/` holds `hero-bg-1.png` and
`justejari-home-screen-mockup.png`, both imported by `src/pages/justejari/page.config.js:1-2`.
These are JustEjari content sitting in shared code. Move them to the page's own assets
folder alongside the six SVGs already there.

Then audit every remaining `src/sections/*/assets/` folder. The rule: **a section ships no
imagery.** If a section needs a decorative shape, inline it as SVG in the component.

**Outcome:** `find src/sections -name '*.png' -o -name '*.jpg' -o -name '*.svg'` is empty.
The library becomes asset-free, which is what makes it publishable without a build step.

### T1.5 — Build the section gallery (answers "can I still work on sections here?")

**Do:** Yes — and make it better than today. Add a dev-only gallery so a section can be
built and viewed without a full page config.

- Each section dossier gains `fixtures.js` exporting representative props, including one
  fixture per documented variant and one minimal fixture (required props only). This keeps
  the dossier self-contained per `AGENTS.md`.
- Add `src/dev/Gallery.jsx`: reads `sections/registry.js`, renders every registered section
  against its fixtures, one per route plus an index. Add a viewport-width switcher
  (375 / 768 / 1280) so responsive checks don't need devtools.
- Route it at `/gallery` in `src/App.jsx`, alongside the existing `/justejari` preview.

**Outcome:** `npm run dev` → `localhost:5173/gallery` lists every section. Building a new
section means: copy `_template/`, write `plan.md` + `prompt.md`, implement, add `fixtures.js`,
register it, and it appears in the gallery. Full-page verification still lives at the
JustEjari preview route until Phase 2 moves it.

**Verify:** Every key in `sectionRegistry` renders in the gallery. A section with a missing
required prop renders nothing and logs — confirm the `requireProps` path via the minimal
fixture.

### T1.6 — Configure the package manifest

**Do:** Update `package.json`:

```jsonc
{
  "name": "just-sections",
  "private": false,
  "version": "0.1.0",
  "type": "module",
  "files": ["src/sections", "src/styles"],   // dev harness is NOT published
  "exports": {
    ".": "./src/sections/index.js",
    "./registry": "./src/sections/registry.js",
    "./styles/tokens.css": "./src/styles/tokens.css",
    "./styles/reset.css": "./src/styles/reset.css",
    "./styles/fonts.css": "./src/styles/fonts.css"
  },
  "peerDependencies": { "react": "^19", "react-dom": "^19", "lucide-react": "^1" }
}
```

Move `react`, `react-dom`, and `lucide-react` from `dependencies` to `peerDependencies` +
`devDependencies`. Drop `gsap`, `motion`, `react-markdown`, and `react-router-dom` from the
published surface — verified 2026-07-27 that no section imports any of them; the router is
used only by `src/main.jsx` and `src/App.jsx`, which are dev harness.

Add `src/sections/index.js` re-exporting each section, `ProductPage`, `types.js`, and
`requireProps.js`.

**Outcome:** The package ships source, not a build. Consumers are Vite, so no compile step
is needed; a future Next.js consumer adds `transpilePackages: ['just-sections']`.

**Verify:** `npm pack --dry-run` lists only `src/sections/**`, `src/styles/**`,
`package.json`, `README.md`. No `dist/`, no `node_modules/`, no `src/dev/`, no `docs/`.

### T1.7 — Build the `legal-document-default` section

**Decision (2026-07-27):** legal pages move into the `web/` department, adopt the landing
breakpoints and shared footer, and keep rendering markdown from each product's own
`docs/legal/`. A legal page becomes a **page config**, not a component.

Evidence this is right: `justejari/app/src/pages/TermsPage.jsx` and
`justconvert/web/src/pages/TermsPage.jsx` are already near-identical copies — same structure,
same `public-page__shell` / `public-legal__content` class names, same `PublicSiteFooter`. They
were copy-pasted between products and have drifted only in details. JustConvert already hosts
them in `web/`; **JustEjari is the anomaly**, serving legal pages out of the Mini App.

**Do:** Add a section whose only job is rendering a supplied markdown string.

```js
// web/src/pages/<product>/terms.config.js
import termsContent from '../../../../docs/legal/terms-of-service.md?raw'

export default {
  sections: [
    { type: 'header-default',  slot: 'header', props: { /* … */ } },
    { type: 'legal-document-default', props: { content: termsContent } },
    { type: 'footer-default', slot: 'footer', props: { productName: 'JustEjari', privacyHref: '/privacy', termsHref: '/terms' } },
  ],
}
```

**Public configuration.** Required: `content` (raw markdown string — the page does the `?raw`
import, exactly as it already imports images). Optional: `internalLinks`, overriding the default
cross-link map. Variant: `surface` (`parchment` | `ivory`), default `parchment`.

#### All content lives in the legal document — nothing else

There is **no `title` prop.** The document supplies its own heading: JustEjari's file opens with
`# JustEjari - Terms of Service`, followed by its effective date, last-updated date, and version
as body content. Passing a title through page config would create a second place to edit the
same string, and the two would drift the way the contact email already did.

The consequence is that the legal document is the single source for its own heading, dates, and
version. The `terms-and-privacy-consultant` skill maintains all of it. Nothing in the web
department restates any of it.

**Single `h1` per page.** The document's `#` heading renders as the page `h1`, per
`surfaces/web.md` §3. Confirm `header-default` does not also emit an `h1` on these routes — a
wordmark in the header should be a `div` or `p`, not a heading. Check this when wiring the
route, not after.

#### The `terms-and-privacy-consultant` skill defines the contract

The skill (`skills/terms-and-privacy-consultant/SKILL.md` §"Save all outputs") writes to fixed,
stable paths:

```
docs/legal/terms-of-service.md
docs/legal/privacy-policy.md
docs/legal/changelog.md
```

Version and effective date live **inside** the document (`**Version: 1.3**`,
`**Last Updated: 23 July 2026**`) and in `changelog.md` — deliberately not in the filename. The
skill also writes cross-links as plain relative filenames; JustEjari's docs currently contain
exactly `](privacy-policy.md)` and `](terms-of-service.md)`.

Three consequences:

1. **`internalLinks` ships a default and is only an override.** The section defaults to
   `{ 'privacy-policy.md': '/privacy', 'terms-of-service.md': '/terms' }`, matching the skill's
   output. A page supplies the prop only if it routes those documents somewhere else.
2. **JustConvert's dated filenames are legacy, not a competing convention.**
   `20260520_terms-of-service_v2-1.md` predates the skill. Do not design around it — it
   converges on the plain names the next time those documents are regenerated. Track that as
   part of T3.4.
3. **Page configs are near-identical across products.** Only the product name, title, and
   routes differ. That is the signal the section is at the right altitude.

#### Drop from the shared version

- **The hardcoded email address.** `LegalMarkdown.jsx:33` strips
  `mailto:chris@amalilabs.com` — but the current documents contain only `chris@justejari.ae`.
  The branch is dead code and has been since the 23 July 2026 changelog entry changed the
  contact address. This is precisely why a shared component must not hardcode content: it went
  stale silently and nothing failed.

  **Keep the behavior, drop the address.** Render **every** `mailto:` link as plain text — the
  link's text content, unlinked. No address list, no configuration. The address then lives only
  in the legal document, which is the point: change it in the markdown and every page follows.

  Emails stay selectable and copyable, just not clickable. This is one rule in one component,
  so reversing it later is a single change with a `CHANGELOG.md` entry — not a prop. Do not add
  a `linkEmails` boolean; that is the `showEyebrow` anti-pattern the section contract forbids.
- **Analytics.** `justconvert/web/src/pages/TermsPage.jsx` calls `trackStaticPageView` — a route
  concern, not a section concern. It stays in the page.

**Keep** JustEjari's empty-content fallback: `content` is required, so an empty string renders
nothing and reports the omission via `requireProps`.

**Layout.** Use the editorial content width — 680px — inside the standard landing shell, per
`just-design-system/surfaces/web.md` §4. This is not a conflict with the 1120px landing
container; the surface doc already scopes both. Breakpoints follow the family 1024px standard,
which is the documented migration away from JustConvert's legacy 992px.

**Generality.** Do not build "a Terms page" and "a Privacy page". The skill emits a third
document — `changelog.md` — on every update, so a third page already exists whether or not it
is routed. One section, N page configs.

Decide separately whether `changelog.md` is public. It is a genuine transparency asset (it
records what changed in the legal terms and when), but it is written for an internal audience —
JustEjari's entries carry "Review Recommendations" addressed to the operator. If it goes
public, that section of each entry should be dropped at generation time, which is a change to
the skill rather than to this section.

**Verify:**

- Both products' Terms and Privacy render from their own `docs/legal/`, at 375 / 768 / 1280.
- Cross-links between the two documents resolve to routes, not to `.md` files.
- `chris@justejari.ae` renders as plain text on both pages — not a link, still selectable.
- Exactly one `h1` per page, supplied by the document.
- Changing the contact email in `docs/legal/terms-of-service.md` changes what the page shows,
  with no code edit anywhere.
- `justejari/app/src/assets/legalDocuments/` is already an empty leftover directory — remove it
  once the migration lands.

### T1.8 — Rename the repo

**Done:** `package.json` `name` is `just-sections@0.1.0`.

**Still yours to do, deliberately left undone:**

1. **Rename the directory** `~/Programming/landing-page-trials` → `~/Programming/just-sections`.
   Not done automatically — moving the working directory out from under an open editor breaks
   its state, and the path appears in your Claude Code project history.
2. **Rename the GitHub repo** and update the remote. `package.json` `repository` still points at
   `amalichris/landing-page-trials`; update it in the same change.
3. **Merge to `main`, then tag `v0.1.0`.** Not tagged yet on purpose: a git-tag install resolves
   against the default branch, so tagging a feature-branch commit would publish work that is not
   on `main`.

Until then consumers can install from the branch:
`npm i github:amalichris/landing-page-trials#restructure/library-portability`

---

## Phase 2 — Create the JustEjari `web/` department

### T2.1 — Scaffold the department

**Do:** Create `justejari/web/` per `skills/project-restructuring/references/target-structure.md`.
JustEjari currently has exactly one department (`app/`); this is its second.

```
justejari/web/
├── prd/_template/{prd.md,tasks.md}   ← copy from app/prd/_template/, then adapt to
│                                       landing work: sections touched, page config
│                                       changes, responsive breakpoints, Lighthouse budget
├── src/
│   ├── pages/justejari/{page.config.js,assets/}
│   ├── App.jsx
│   └── main.jsx
├── public/
├── AGENTS.md
├── CLAUDE.md
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

**Outcome:** A department that owns page config, product assets, routes, and deploy config —
and no section implementations.

### T2.2 — Move the JustEjari page in

**Do:** Move `src/pages/justejari/page.config.js` and `src/pages/justejari/assets/` (six
SVGs plus the two PNGs relocated in T1.4) into `justejari/web/src/pages/justejari/`. Use
`git mv` where history is worth keeping.

Add `just-sections` to `web/package.json` as
`"just-sections": "github:amalichris/just-sections#v0.1.0"`. Rewrite the config's section
imports to come from the package.

Replace the placeholder in `page.config.js:28` — `justEjariUrl = "#pricing"` — with the real
Mini App URL, or leave it with the existing TODO comment if the URL still isn't live.

**Outcome:** `npm run dev` in `justejari/web/` renders the full landing page from the
published library.

**Verify:** Page renders identically to the current `/justejari` preview at 375 / 768 / 1280.
Compare against a screenshot taken before the move.

### T2.3 — Write the department AGENTS.md and CLAUDE.md

**Do:** Follow the department template in `target-structure.md`. The context section points
at:
- `../../docs/product/product-brief.md`
- `../../docs/landing-page/` — this product's landing intent
- `just-design-system/foundations.md` and `surfaces/web.md` — how it's built

State the boundary explicitly, because it is the whole point of the split:

> This department composes pages from configuration. It does not implement sections.
> A new section or a change to an existing one is a `just-sections` change, released as a
> version bump. Never fork a section into this repo.

**Outcome:** An agent working in `justejari/web/` knows to edit config, and knows a section
change means switching repos.

### T2.4 — Move JustEjari's legal pages out of the Mini App

**Do:** JustEjari currently serves `/terms` and `/privacy` from `app/` — the Telegram Mini App
department. They are public web pages and belong in `web/`. Move them:

- Delete `app/src/pages/TermsPage.jsx`, `app/src/pages/PrivacyPage.jsx`, and
  `app/src/components/LegalMarkdown.jsx` **only after** the `web/` equivalents render
  correctly. Their behavior is absorbed by `legal-document-default` (T1.7).
- Create `web/src/pages/justejari/terms.config.js` and `privacy.config.js`, each importing
  from `../../../../docs/legal/`.
- Route them in `web/src/App.jsx`.
- Remove the empty leftover `app/src/assets/legalDocuments/` directory.
- `app/src/components/PublicSiteFooter.jsx` is superseded by `footer-default`. Check whether
  anything else in the Mini App still uses it before removing.

**Watch for:** anything in the Mini App that links to `/terms` or `/privacy` — those routes now
live on a different deploy. If the Mini App and landing site are on different domains, those
links must become absolute URLs.

**Verify:** Both routes render from `docs/legal/` with working cross-links between them. The
Mini App still builds with the pages removed.

### T2.5 — Deployment

**Do:** New Vercel project, Root Directory `web/`. The legal pages import company docs via
`?raw` across the department boundary, so this is **mandatory, not optional**:

- `server.fs.allow: ['..']` in `web/vite.config.js` — without it the dev server 403s on
  `../docs/legal/*.md` while the production build succeeds, which is easy to miss.
- Enable "Include source files outside of the Root Directory" in the Vercel project settings —
  without it the build cannot see `../docs/` and fails only on Vercel, not locally.

Installing from a git dependency also requires the build environment to reach GitHub — verify
the first deploy resolves `just-sections`.

**Verify:** Preview deploy renders the landing page and both legal pages, and every CTA
resolves.

---

## Phase 3 — Downstream consumers

Per the restructuring skill's Phase 3: these break silently. Nothing warns you.

### T3.1 — Update the JustEjari source map

**Do:** `skills/product-docs/references/justejari.md` states "the single department `app/`"
(line 11) and maps every path under `app/`. Add the `web/` department, add
`just-design-system` as the design authority, correct the design-system entry (line 15)
which currently sends readers to the now-split `docs/design-system/design.md`, and bump the
"verified against the local repo on" date.

### T3.2 — Update the JustEjari root AGENTS.md

**Do:** Add `web/` to the structure block with its stack and deploy target. Add rows to the
"Read Depending on Task" table for landing work and for the design system split.

### T3.3 — Regenerate the tree snapshot

**Do:** `python3 ~/Programming/skills/tools/project-tree.py . --save archive` in
`justejari/`.

### T3.4 — Migrate JustConvert's web department

**Do:** Last, and only after JustEjari has run in production for a while.
`justconvert/web/src/styles/web-public.css` declares the same palette under
`--public-color-*` (verified identical hex values, lines 24-39). Point it at
`just-sections/styles/tokens.css`, migrate its hand-rolled sections to library sections, and
delete the local palette.

Also converge its legal documents onto the skill's convention. JustConvert currently has
`docs/legal/20260520_privacy-policy_v2-1.md` and `20260520_terms-of-service_v2-1.md`; the
`terms-and-privacy-consultant` skill writes `privacy-policy.md` and `terms-of-service.md` with
the version and date inside the document. Regenerating or renaming lets JustConvert's legal
page configs drop their `internalLinks` override and match JustEjari's exactly.

**Outcome:** One palette definition across both products, and one legal-document filename
convention. This is the payoff — until it lands, the family design system is still theoretical.

---

## Verification gate

The migration is done when all of these hold:

- [ ] Exactly one file in `~/Programming` defines the brand palette
- [ ] `just-design-system/surfaces/` holds `web.md`, `ios.md`, `miniapp.md`; a second app on
      any surface could be built to brand without reading an existing product's source
- [ ] Neither product's `docs/design-system/` contains a surface convention — only its own
      component specs
- [ ] `grep -rn 'var(--' just-sections/src | grep -v 'var(--just-'` → empty
- [ ] `npm pack --dry-run` in `just-sections` ships no dev harness, docs, or assets
- [ ] `find just-sections/src/sections -name '*.png' -o -name '*.svg'` → empty
- [ ] `localhost:5173/gallery` renders every registered section
- [ ] `justejari/web` builds and deploys, rendering identically to the pre-split preview
- [ ] Both products serve `/terms` and `/privacy` from their `web/` department, rendering their
      own `docs/legal/` markdown, with cross-links between the two documents working
- [ ] No legal page component remains in `justejari/app/`
- [ ] `justejari.md` source map lists both departments, dated today
- [ ] Neither product's design doc contains a color hex value

## Open questions

1. **Repo hosting.** Does `just-sections` go public on GitHub, or private? Private git
   dependencies need a token in the Vercel build environment — worth confirming before T2.4.
2. **`just-design-system` as a skill.** It currently sits in `skills/` without a `SKILL.md`.
   Once it is docs-only at family level, does it stay a passive doc repo, or does it get a
   real SKILL.md that maintains itself the way `product-docs` does?
3. **Versioning discipline.** Git tags give real pinning, but nothing forces a bump. Worth a
   `CHANGELOG.md` in `just-sections` and a rule that any section prop change is a minor
   version.
4. **`just-ios-kit` — when?** `surfaces/ios.md` (T0.5) documents the shared iOS conventions,
   but the code still lives in `justconvert/ios/…/DesignSystem/`. The symmetric move is a
   Swift package holding `Theme`, `Typography`, `Spacing`, `Motion`, `Haptics`,
   `PressScaleButtonStyle`, `CircularIconButtonStyle`, and `SheetContentHeightKey` — mirroring
   what `just-sections` does for web.

   **Recommendation: document now, extract later.** The doc is what a second iOS app actually
   needs to start; the package is what stops the two apps drifting. With one iOS app there is
   nothing to drift from, and extracting a Swift package against a single consumer risks
   baking JustConvert's assumptions into the shared API. Do T0.5 in Phase 0, and open the
   package when the second iOS app is real — at that point you extract against two known
   consumers, which is when the right API is visible.

   This is deliberately the opposite call from web, where `just-sections` gets extracted
   immediately. The difference: two web consumers already exist (JustEjari's new `web/` and
   JustConvert's existing one), so the shared API is already constrained by reality.
