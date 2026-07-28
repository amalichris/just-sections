# Changelog

Every released version of `just-sections`. Entries describe what a **consumer** experiences,
not what the diff looks like.

Consumers install from a git tag, so nothing here reaches a live page until that consumer's
`package.json` and lockfile are moved onto the new tag. See the `publish-just-sections` skill.

---

## v0.1.0 — 2026-07-27

First release. The library became installable and product-agnostic.

### Sections

Eight sections, all driven by page configuration:

- `header-default` — wordmark, same-page navigation, and a CTA. Emits no `h1`.
- `hero-default` — title, optional subtitle, page-supplied backdrop and device media.
- `benefits-default` — anchor-plus-two bento. Exactly three items, each with required media.
- `how-it-works-default` — sticky desktop step composition, mobile accordion.
- `pricing-banner-default` — single acquisition banner, no plans or billing.
- `faq-default` — single-open accordion.
- `legal-document-default` — renders a supplied markdown string. The registry's one lazy
  section: it pulls `react-markdown` and `remark-gfm`, +47.6 kB gzipped, which a landing page
  never needs.
- `footer-default` — copyright and legal links.

### Tokens

- All custom properties carry the `--just-` prefix. A bare `--color-*` collides with a host
  application's own theme; this palette already drifted once because of it.
- Stylesheets are separate export paths: `styles/tokens.css`, `styles/reset.css`,
  `styles/fonts.css`. A host embedding one section imports `tokens.css` only — `reset.css`
  would fight its existing global styles.

### Notes for consumers

- The package ships **source, not a build**. Consumers are Vite, so no compile step is needed;
  a Next.js consumer would add `transpilePackages: ['just-sections']`.
- Sections ship **no imagery**. Every image a section renders is supplied by page config.
- Required props are enforced by `requireProps`: a section with one missing renders nothing and
  logs in development. In a production build that is a silently absent section, so a page
  config that drifts from a section's contract fails quietly.
- npm pins `git+ssh://` in the lockfile for GitHub dependencies regardless of how the spec is
  written, and CI has no SSH key. A consumer needs a git URL rewrite in its install command
  before its first deploy — see `docs/learnings.md`.

### Internal

Not part of the published surface: the section gallery, the demo page, and each section's
`plan.md` / `prompt.md` dossier.
