# just-sections

A library of reusable landing-page section components for the Just product family. Pages are
composed from configuration, not hand-written JSX.

Consumers install it from a git tag and drive it entirely with data:

```jsx
import { ProductPage } from 'just-sections'
import 'just-sections/styles/tokens.css'
import config from './page.config'

<ProductPage config={config} />
```

Today's consumer is JustEjari's `web/` department. JustConvert is next.

## Install

```bash
npm i git+https://github.com/amalichris/just-sections.git#v0.1.0
```

The package ships **source, not a build** — consumers are Vite, so no compile step is needed.
A future Next.js consumer would add `transpilePackages: ['just-sections']`.

Two things bite in CI and only in CI, both documented in `docs/learnings.md`:

- npm rewrites GitHub dependencies to `git+ssh://` in the lockfile no matter how the spec is
  written, so a build container with no SSH key fails even against this public repo. Rewrite
  the URL at the git layer before installing.
- A page importing markdown across a directory boundary with `?raw` needs
  `server.fs.allow: ['..']`. The symptom is inverted — the dev server 403s while the
  production build succeeds.

## Develop

```bash
npm install
npm run dev
```

| Route | What it is |
| ----- | ---------- |
| `/gallery` | Every registered section against its fixtures, at 375 / 430 / 768 / 1024 / 1440 |
| `/` | A full demo page, rendered the way a consumer renders one |

The gallery checks sections in isolation; `/` checks what `ProductPage` does around them —
landmark slots, section order, and the spacing declared on adjacent-sibling pairs.

The demo page runs on real content: `src/dev/demo/` holds a snapshot of JustEjari's page
config and its imagery. That is deliberate. Fixtures are written to exercise a prop contract,
so they run short and generic — a hero looks fine with a six-word headline and a grey
rectangle, and quite different with a real one and a photograph. Refining a section against
production-like copy catches what neither the fixtures nor the build will.

It is dev-only. `src/dev/` is excluded from the published package, so the **library itself
ships no imagery and no product content** — `fixtures.js` uses inline placeholders generated
by `src/sections/fixtureMedia.js`. The snapshot will drift from the live JustEjari page, which
is fine: it is a rig for looking at sections, not a source of truth for anyone's copy.

Previews render in an **iframe**, because a width-constrained `div` does not trigger media
queries. The gallery shows the iframe's measured width beside the width chips — if that
disagrees with the width you picked, the preview is lying and nothing you see is trustworthy.

## Adding a section

1. Copy `src/sections/_template/` to `src/sections/<section-id>/`.
2. Write `plan.md` (the decision record) and `prompt.md` (the execution contract). Both carry
   the same **Section ID** and **Revision**; if they disagree, the dossier is not ready.
3. Implement the component and its CSS in that folder.
4. Write `fixtures.js` — a dressed `default`, a `minimal` with required props only, one per
   variant, and at least one invalid config marked `expectsNothing: true`.
5. Register it in `src/sections/registry.js` and review it in the gallery at every width.

See [AGENTS.md](AGENTS.md) for the full workflow and the page composition contract.

## Layout

```
src/
  index.js                # Package entry point
  ProductPage.jsx         # Renders a page from its config
  sections/               # One self-contained dossier per section
    registry.js           # config `type` → component
    types.js              # Shared content shapes (Cta, Media, Brand, NavigationItem)
    requireProps.js       # Required-prop guard
    fixtureMedia.js       # Inline placeholder imagery for fixtures
  styles/
    tokens.css            # --just-* design tokens, nothing else
    reset.css             # Global reset — standalone sites only
    fonts.css             # Outfit + Inter
  dev/                    # Gallery + demo page. Not published
    demo/                 # Snapshot of a real page config + its assets
  main.jsx, App.jsx       # Dev harness entry. Not published
docs/
  learnings.md            # Durable, non-obvious insights
  design-system/design.md # Pointer to the just-design-system repo
  inspiration/            # Reference archive, not production code
```

A host embedding a single section imports `tokens.css` only — `reset.css` would fight its own
global styles.

## Design authority

`~/Programming/just-design-system` is the family-level source of truth: `foundations.md` for
tokens, type, spacing, and motion; `surfaces/web.md` for how a landing page is built. This
repo restates none of it.
