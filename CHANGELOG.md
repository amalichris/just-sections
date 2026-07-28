# Changelog

Every released version of `just-sections`. Entries describe what a **consumer** experiences,
not what the diff looks like.

Consumers install from a git tag, so nothing here reaches a live page until that consumer's
`package.json` and lockfile are moved onto the new tag. See the `publish-just-sections` skill.

---

## v1.0.0 — 2026-07-28

The section contract is declared stable. **No runtime change from v0.1.0** — every section,
prop, and token is byte-identical. This release is a statement about what consumers may rely
on, not a change to what they render.

### What stability means

- A section's **required** props will not be added to, renamed, or removed inside `1.x`. A page
  config valid against `1.0.0` stays valid against every later `1.y.z`.
- New props arrive **optional** with a documented default, so they land in a minor release and
  need no page-config edit.
- Variant enums only gain members inside `1.x`; an existing variant value keeps its meaning.
- Token *values* may change in a minor (a repaint is not a contract break); token *names* may
  not.

### Versioning from here

Standard semver replaces the pre-1.0 scheme, so the digit that moves for a given change is
different than it was for `v0.1.0`:

- **Patch** (`1.0.Z`) — a fix inside a section, no prop change.
- **Minor** (`1.Y.0`) — a new section, a new optional prop, a new variant member, a token value
  change. Never requires a page-config edit.
- **Major** (`X.0.0`) — a required-prop change, a prop rename or removal, a token rename, or a
  section removal. Requires a page-config edit, spelled out under `### Breaking`.

Previously a prop change of any kind was a feature release in the middle digit. It is now a
major. `AGENTS.md` and the `publish-just-sections` skill were updated in the same commit.

### Notes for consumers

- Upgrading from `v0.1.0` needs only the tag bump and `npm install`. No page config changes.
- Everything under **Notes for consumers** in `v0.1.0` still holds — source not build, no
  shipped imagery, `requireProps` failing silently in production, and the CI git-URL rewrite.

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
