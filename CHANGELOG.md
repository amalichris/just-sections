# Changelog

Every released version of `just-sections`. Entries describe what a **consumer** experiences,
not what the diff looks like.

Consumers install from a git tag, so nothing here reaches a live page until that consumer's
`package.json` and lockfile are moved onto the new tag. See the `publish-just-sections` skill.

---

## v1.2.2 — 2026-08-27

### Sections

- `legal-document-default`: legal tables now match the established square warm grid: `warmSand`
  header cells, `ivory` body cells, 1px `borderWarm` lines, and compact 10px/12px cell padding.

### Breaking

### Internal

## v1.2.1 — 2026-08-27

### Sections

- `legal-document-default`: legal-document tables now use the shared ivory surface, warm Ring
  elevation, 16px radius, parchment header row, warm dividers, and the established responsive
  table typography and cell spacing. The existing focusable horizontal-scroll behavior is
  unchanged.

### Breaking

### Internal

## v1.2.0 — 2026-08-27

### Sections

- `benefits-default`: benefit media accepts optional mobile, tablet, and desktop source URLs,
  and item titles can request intentional line breaks with `/n`, `\\n`, or a newline. Existing
  configs continue to use `media.src` as the fallback.
- `faq-default`: answer strings preserve newlines and support safe root-relative, HTTPS, and
  `mailto:` Markdown-style links that open in a new tab.
- `header-default`, `hero-default`, `how-it-works-default`, `pricing-banner-default`: CTA
  links accept optional `target: '_blank'` and emit safe opener isolation. Supplied media can
  also carry intrinsic `width` and `height` values so the browser can reserve image space.

### Internal

- The dev harness now includes a JustConvert composition snapshot for reviewing the shared
  sections against real copy and responsive product media.

---

## v1.1.1 — 2026-08-26

### Sections

- `header-default`: in the scrolled glass-pill state, a `cta.badge` now sits 20px from the
  pill's right edge — matching the wordmark's left inset — instead of the bare 6px the nav's
  own padding left it with. A text-label CTA supplies that spacing itself via its pill padding;
  a badge has none of its own, so it needed the difference made up separately. No prop change,
  nothing for a page config to do.

---

## v1.1.0 — 2026-08-26

### Sections

- `header-default`, `hero-default`, `pricing-banner-default`: `cta` accepts an optional
  `badge` (a `Media`). When supplied, the section renders that image in place of the Sienna
  Brand Pill / glass pill — the documented exception for a fixed external asset a page cannot
  restyle, such as Apple's official App Store badge. No pill background, border, backdrop
  filter, or hover/scroll recoloring applies to a badge CTA at any section state; the 44px
  minimum target, `focusBlue` focus outline, and 0.97 press scale still do. Existing configs
  are unaffected — omit `badge` and the pill renders exactly as before.
- `hero-default`: gains an entirely new optional `cta` prop (`{ label, href, badge? }`),
  rendered directly below the subtitle as a Sienna Brand Pill (or a badge, per above). JustEjari's
  composition omits it and is unaffected — the hero's primary action stays in the header there.
- `benefits-default`: each item accepts an optional `mediaBackdrop` — `chianti`, `sky`, or
  `cypress` — giving that card's media frame a page-supplied color behind a contained image
  instead of the default tight `parchment` crop. Omitted, a card renders exactly as before.

### Internal

- `src/dev/`: added `BackdropLab.jsx` at `/backdrops`, an exploration surface for candidate
  media backdrop colors. Not a section variant and not published.

---

## v1.0.1 — 2026-07-28

### Sections

- `header-default`, `hero-default`: the frosted-glass blur was missing in production builds.
  Nothing a page config needs to change — upgrade and rebuild.

The source declared `backdrop-filter` before `-webkit-backdrop-filter`. The CSS minifier treats
the two as duplicate declarations of one property and keeps the **last**, so every production
build shipped only the `-webkit-` version and dropped the standard one. Firefox does not
support `-webkit-backdrop-filter`, so the header pill and hero glass rendered as flat
translucent panels there instead of frosted — the page behind stayed sharp.

It survived review because the dev server does not minify: both declarations are present under
`npm run dev`, so the effect looks correct locally in every browser and only breaks in a built
deploy. Reordering the pairs so the prefixed property comes first fixes it; verified by
counting both properties in the built CSS (5 of each, previously 0 unprefixed).

`-webkit-font-smoothing` and `-moz-osx-font-smoothing` in `reset.css` have no unprefixed
counterpart and are unaffected. Any future prefixed property must be declared **before** its
standard form.

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
