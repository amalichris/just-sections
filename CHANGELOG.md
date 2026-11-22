# Changelog

Every released version of `just-sections`. Entries describe what a **consumer** experiences,
not what the diff looks like.

Consumers install from a git tag, so nothing here reaches a live page until that consumer's
`package.json` and lockfile are moved onto the new tag. See the `publish-just-sections` skill.

---

## v1.27.1 — 2026-11-22

### Sections

- `faq-default`: from 1024px the intro and accordion split one third to two thirds at every
  width (a 4/8 twelve-column split). Previously fixed tracks drifted towards 50/50 between
  1024 and 1200px. The accordion keeps its 624px cap on the right. No configuration change.

## v1.27.0 — 2026-11-22

### Sections

- `statement-reveal`: no longer covers the preceding section or pins itself. It sits in normal
  page flow at one screen height and reveals word by word: each word switches straight from
  stone gray to its colour, starting once the section's top reaches 60% of the screen and
  completing as the section fills the screen. Type is set at 80% of the fitted size, with
  `text-wrap: pretty`. No configuration change; reduced motion stays static.
- `value-summary`: values wait in stone gray and switch to ink as each fact crosses a reading
  line at 60% of the screen; facts in one row switch left to right 120ms apart. Titles,
  labels and descriptions are never muted. No configuration change; no-script and reduced
  motion show full ink.
- `faq-default`: below 1024px the eyebrow, title and subtitle are left-aligned on the
  accordion's left edge instead of centred. No configuration change.

### Internal

- Design system records the statement and value-summary motion; JustEjari demo gains the
  pricing value summary.

## v1.26.1 — 2026-11-21

### Sections

- `statement-reveal`: the statement is sized to fill the screen. The largest size at which it
  takes about 90% of the screen height with no word wider than the line; on phones roughly
  double the previous size. No configuration change; without script the old size applies.

## v1.26.0 — 2026-11-20

### Sections

- `header-default`: the navigation link for the section in view is highlighted (full strength,
  2px underline) and marked `aria-current="location"`. Current means the last linked section
  whose top has passed 40% of the viewport; nothing is current over the hero. No configuration
  change. Links stay hidden below 768px as before.

### Internal

- JustEjari demo navigation gains Pricing.

## v1.25.1 — 2026-11-20

### Sections

- `statement-reveal`: light presentation. Parchment surface, stone-gray type before reveal,
  near-black once revealed, sienna emphasis (coral is under 3:1 on parchment). No configuration
  change.

## v1.25.0 — 2026-11-20

### Sections

- `benefits-carousel`: optional `items[].label`, a shorter tab-pill text. Omitted, the pill shows
  `title` as before; the card heading always shows `title`.

## v1.24.1 — 2026-11-20

### Sections

- `statement-reveal`: the panel now rises over whichever section precedes it (for example
  `benefits-carousel`), not only `benefits-list` color panels. No configuration change.

## v1.24.0 — 2026-11-20

Supersedes v1.23.0, which was tagged with an earlier version of these changes and then reverted
on `main`. Do not pin v1.23.0.

### Sections

- `hero-default`: optional `editorial` layout. A display-size, left-aligned title is the whole
  hero. With a `background`, the hero fills one screen: the painting above, the title rising into
  its fade at the bottom.
- `benefits-list`: optional item tones make the list a grid of solid-color text panels.
- `statement-reveal`: new full-screen scroll reveal with native scrolling and a static reduced-motion layout.
- `pricing-banner-default`: optional `offer` displays trial and one-time pricing alongside the acquisition CTA.

### Internal

- JustEjari demo snapshot re-copied from the editorial landing config.

## v1.22.0 — 2026-11-19

### Sections

- `move-in-calculator`: optional interaction events for the initial estimate source, the first
  meaningful adjustment, and successful clipboard copies. Consumers can receive them through
  `ProductPage.onInteraction`. The callback receives fixed labels for the source, input group or
  copy format.

## v1.21.0 — 2026-11-18

### Sections

- `hero-default`: optional `backdrop` (`glass`, the default and unchanged, or `painted`).
  `painted` shows the background without blur under a parchment veil that fades into the page,
  with no parallax and no pinned optical cover. `ProductPage` no longer marks a painted
  optical-cover hero as a cover hero.

## v1.20.0 — 2026-11-18

### Sections

- `legal-document-default`: optional `header` (`{ title, description? }`). A short page title,
  a summary and a facts row (Version, Last updated, Questions) read from the document, in place
  of the document's own `h1` and date lines. Configs without `header` render as before.

## v1.19.0 — 2026-11-18

### Sections

- New `not-found-default`: required `title` (page `h1`); optional `description`, `links`
  (`{ id, label, href }`), `banner` (`Media`), `bannerFocal`, `id`.
- `legal-document-default`: optional `banner` (`Media`) and `bannerFocal`. A full-bleed painting
  runs under the fixed header and the document's own `h1` rises into its fade.
- `move-in-calculator`: optional `background` (`Media`), a painted backdrop behind the header and
  title under a parchment veil, fading into the page before the tool.
- `footer-default`: optional `brand` wordmark above the copyright. Visual refresh for every
  consumer: `borderWarm` top rule, 40px block padding (32px on mobile), legal links in near-black
  Inter 500, 24px apart. No configuration changes needed.
- `header-default`: the `static` position stacks above a following section's backdrop.
- `ProductPage`: page `meta.robots` (for example `noindex` on a not-found page).

### Internal

- Shared `painted-banner` piece (not a registered section) used by the legal and not-found
  sections. Implements web §9 "Painted banner".

## v1.18.0 — 2026-11-18

### Sections

- `ProductPage`: optional page `meta` (`title`, `description`, `canonical`, `structuredData`)
  in a page config. It updates the host's existing title and description in place and adds a
  canonical link and JSON-LD only when supplied, restoring them on unmount. Configs without
  `meta` behave exactly as before. See README.

## v1.17.2 — 2026-11-18

### Sections

- `move-in-calculator`: the total bar under 1024px now shows only while the inputs are on
  screen and the result card is not, so it no longer covers later sections or the footer. After
  a tap it briefly reads how the total moved ("AED 25,000 less than before"), and a small
  rent / deposits / fees bar sits under the total. No configuration changes.

## v1.17.1 — 2026-11-18

### Sections

- `move-in-calculator`: the share link now carries the full breakdown. Besides rent, cheques,
  property, bedrooms, furnishing and agent, it adds `deposit`, `fee`, `extras`, `utilities` and
  `other` whenever they differ from their defaults, and a shared link restores all of them.
  When `shareUrl` is set, the address bar follows the current breakdown (no history entries).
  No configuration changes.

## v1.17.0 — 2026-11-18

### Sections

- `header-default`: optional `position` variant, `fixed` (default, unchanged) or `static`.
  `static` sits in normal flow at the top of the page and scrolls away, with no glass pill or
  mobile rail. Existing configs are unaffected.
- `move-in-calculator`: intro top padding returns to 48px (24px under 768px) for use after a
  static header. Pages using it should set `position: 'static'` on their `header-default`.

## v1.16.1 — 2026-11-18

### Sections

- `move-in-calculator`: the title now clears the fixed `header-default` (128px top padding,
  104px under 768px), matching the legal pages. No configuration changes.

## v1.16.0 — 2026-11-18

### Sections

- New `move-in-calculator`: a tool-first rental cost calculator that owns the page `h1`.
  Required `title` and `assumptions` (every market figure and fee label comes from page
  config); optional `subtitle`, `aside`, `disclaimer`, `shareUrl`, `id`. Reads shared inputs
  from the query string. Implements web §9 "Marketing Tool Calculator". No existing section
  changes; no page-config edits needed.

### Tokens

- Adds the five foundations §2.3 pigments: `--just-color-apricot-clay`, `--just-color-open-sky`,
  `--just-color-marigold`, `--just-color-fresh-olive`, `--just-color-warm-limestone`. Additive
  only: no existing token changes, so nothing already rendered repaints.

## v1.15.1 — 2026-10-28

### Sections

- Wide-screen media keeps its center hover anchor when fine-pointer hover is enabled.
  Existing bottom-attached media keeps its bottom anchor. No configuration changes.

## v1.15.0 — 2026-10-28

### Sections

- `benefits-carousel`: optional `mediaLayout` (`standard`, `wide-screen`, `phone-screen`)
  and `mediaOnMobile` artwork support mixed portrait and landscape screens. Wide cards use
  1.6× mobile rail width, centered media, stacked tablet copy and a 65% desktop media area.
  Phone mobile artwork can align its screen edge with the wide screen without changing scale.
  Default card and unframed configurations retain their appearance; no migration required.
  Existing keyboard, native scrolling, fine-pointer hover and reduced-motion behavior remain.

### Internal

- Dossier revision 0.8 and mixed-screen/invalid configuration gallery fixtures.

## v1.14.1 — 2026-10-26

### Sections

- `benefits-carousel`: framed media gently scales 2.5% when hovered with a fine pointer.
  The 350ms existing web curve follows each screenshot's top/bottom attachment;
  photo backdrops scale from the center. Containers and controls remain fixed.
  Touch-only input, reduced motion and unframed presentation remain static.
  No config migration, new props, JavaScript, or dependencies.

### Internal

- PRD-002, dossier revision 0.7 and shared motion documentation. Both registered
  product consumers roll to this patch; production promotion remains separate.

## v1.14.0 — 2026-10-21

### Sections

- `benefits-carousel`: opt into `presentation: 'unframed'` for screenshots and working notes
  on the page background. Left-aligned copy is vertically centered beside complete contained
  media, without card fill, Ring, radius, or media backdrop. Tabs, arrows, stable stage,
  mobile accordion/rail, keyboard access, and reduced motion retain their existing behavior.
  Unframed items require `media` and omit both backdrop fields. Existing configs keep the
  default card treatment and need no edits.

### Internal

- Revision 0.6 dossier, portrait/landscape/square fixtures, unframed accordion and rail,
  and invalid-media/presentation fixtures.
- Build-story Site adopts this release. JustConvert and JustEjari remain on v1.13.1;
  their production upgrades are deferred because this release targets the build-story Site.

## v1.13.1 — 2026-10-09

### Sections

- `header-default`: mobile keeps its original height and visible controls while an ivory
  background fades into the page, replacing the blurred rail and bottom rule. Desktop's
  scrolled glass pill gains a subtle upper rim. Opaque fallbacks support reduced transparency,
  increased contrast, and unavailable backdrop filtering; reduced motion disables press scale.
  No props or page-config changes are required.

### Internal

- Header plan and prompt synchronized at revision 0.12; shared web design authority records
  the final gradient treatment.

## v1.13.0 — 2026-10-09

### Sections

- `hero-default`: optional `layout: 'optical-cover'` centers media-free copy slightly above
  midpoint in a full-screen hero, preserves explicit headline line breaks, and lets subsequent
  ProductPage sections cover it during native scroll. Reduced motion uses normal flow.
  Existing page configs retain their previous sizing, typography and parallax.

### Internal

- Revision 1.7 dossier and optical-cover fixture; design-system extension recorded.
- JustEjari adopts the variant; JustConvert remains on v1.12.0 because this release is
  scoped to JustEjari's selected composition and its default hero is unchanged.

## v1.12.0 — 2026-10-07

### Sections

- New `benefits-list`: text-led outcome rows with always-visible explanations, optional
  decorative Check/Document icons, and responsive title/explanation columns. Requires `title`
  and a nonempty `items` array; all existing section contracts remain valid.
- New `value-summary`: one to four static page-owned facts, each with a value, label and optional
  qualification. Requires `title` and `items`; values stack on mobile, form a row on larger
  screens, and four facts use 2×2 on tablet. Neither section adds imagery, controls or motion.

### Internal

- Complete dossiers, fixtures and gallery coverage for both sections; dev-only product rigs
  demonstrate composition. PRD-001 coordinates the work, retaining dossiers as section contracts.
- Repo-local PRD Architect skill link and PRD/tasks templates. Shared web design authority records
  both new patterns. A full section rhythm audit is recorded; composition-spacing changes remain
  proposed pending agreement, so existing section spacing is unchanged in this release.
- Package and lockfile root version metadata synchronized; no dependencies changed.

---

## v1.11.0 — 2026-09-25

### Sections

- `pricing-banner-default`: new optional `frame` — `band` (default, unchanged) or `card`. With
  `card`, the same centred content sits in an inset 24px-radius `darkSurface` card with a
  `ringWarm` Ring, capped at 1120px, on the parchment page inside the page gutters. The section
  has no block padding in this frame, so place it between padded marketing sections. Any other
  value renders the band. Existing page configs render exactly as before.

### Tokens

- New dark-appearance palette tokens from foundations §2: `--just-color-umber`,
  `--just-color-walnut`, `--just-color-cocoa`, `--just-color-pebble` and
  `--just-color-error-on-dark`. Additions only: no existing value changed, and nothing repaints.
  Web still renders light (foundations §2.2).

### Internal

- `pricing-banner-default` dossier revision 0.7 and a `card-frame` gallery fixture. The
  JustConvert demo snapshot uses the card frame. Design system: `surfaces/web.md` §9 Marketing
  CTA Banner (2026-09-25).

---

## v1.10.0 — 2026-09-24

### Sections

- `benefits-carousel`: new optional `titleOnMobile`, `subtitleOnMobile` and per-item
  `descriptionOnMobile`. Below 768px they replace the title, subtitle and the item's description
  in the accordion or rail; from 768px the defaults show. Both versions are in the server HTML
  and CSS picks one, so there is no hydration swap. Existing page configs render exactly as
  before. An empty string makes the section render nothing.

### Internal

- `benefits-carousel` dossier revision 0.5: new `mobile-copy` and `empty-mobile-copy` gallery
  fixtures. Design system: `surfaces/web.md` §9 Marketing Features Carousel (2026-09-24).

---

## v1.9.0 — 2026-09-24

### Sections

- `benefits-carousel`: new optional per-item `mediaVerticalAlignment` — `bottom` (default, unchanged)
  or `top`. With `top`, the contained `media` sits on the panel's top edge and the 44px backdrop
  space moves below it, in the card, the accordion stage and the rail frame, as Process Story
  steps already allow. Existing page configs render exactly as before. Any other value makes the
  section render nothing, like every other invalid item field.

### Internal

- `benefits-carousel` dossier revision 0.4: new `top-aligned-media` and
  `unknown-media-alignment` gallery fixtures. Design system: `surfaces/web.md` §9 Marketing
  Features Carousel (2026-09-24).

---

## v1.8.0 — 2026-09-19

### Sections

- `benefits-carousel` (new): three to twelve features, one split card at a time, chosen from a
  row of pill tabs with prev/next buttons. Each item takes exactly one backdrop,
  `mediaBackdrop` (`chianti` | `sky` | `cypress` | `sunflower` | `charcoal`, which makes `media`
  required) or `mediaBackdropImage` (fills the panel edge to edge), plus an optional contained
  `media`. Below 768px `layoutOnMobile` chooses `accordion` (default) or `rail`, a
  `benefits-showcase`-style horizontal scroll rail. Emits `item_selected` through
  `onInteraction` when a reader picks a different item.
- `story-default` (new): title, prose `body` (blank lines separate paragraphs), optional
  `eyebrow`, optional `signature` (`name`, `role`, round `avatar`) and optional `media` photo.
  With a photo it is a text-and-photo split; without one a 624px letter column. Photos sit
  plainly on the page; `mediaCorners` is `rounded` (default) or `square`.
- `how-it-works-list` (new): three or four text-only steps numbered `01`–`04`, with optional
  `eyebrow`, `subtitle`, `cta` (badge supported) and `media` photo.
- `story-default` and `how-it-works-list`: `mediaOnMobile` (below 768px) and `mediaOnTablet`
  (768–1023px) each take `contained` (default), `edge-to-edge` (full viewport width, square
  corners) or `hidden`.

No existing section changed. Every existing page config stays valid.

### Breaking

### Internal

- Dossiers for the three sections (`benefits-carousel` 0.3, `story-default` 0.3,
  `how-it-works-list` 0.3), gallery fixtures, and inspiration catalog entries for the three
  aura.com sources.
- `fixtureMedia` gains a `photo` placeholder variant with no drawn edge, for sections that set a
  photograph plainly on the page.
- Design authority: `just-design-system` `surfaces/web.md` §9 (Features Carousel, Story, Steps
  List, Split Photo).

## v1.7.0 — 2026-09-15

### Sections

- `faq-default`: hosts can now observe answer opens through the optional `ProductPage`
  `onInteraction` callback. Events carry only the section id, `item_opened` interaction name,
  and stable item id; initial render and closing an answer emit nothing. Existing consumers need
  no configuration change.

### Breaking

### Internal

- `faq-default` `plan.md`/`prompt.md` at Revision 0.9; the interaction callback remains outside
  page config so consumer configuration stays JSON-like.

## v1.6.1 — 2026-09-08

### Sections

- `benefits-showcase`: `mediaHeadline` is now **optional** per card. A card that omits it
  renders no overlaid headline and no scrim, so a rail of finished `mediaBackdropImage`
  compositions can run as pure imagery with the `h3` and description below. A dressed showcase
  still carries a headline on every card; the section just no longer refuses to render without
  one.
- `benefits-showcase`: a rail short enough that it never pins is now **centred** at 1024px and
  above, with its intro centred to match, instead of packing against the left inset. The
  shared left edge between heading, first card, and progress indicator only applies once the
  rail actually pins and scrolls.
- `benefits-showcase`: fixed a missing trailing gutter on the scroll rail — iOS Safari drops
  the end padding of a flex scroll container, leaving the last card flush against the viewport
  edge. The leading and trailing insets now match at every width.

### Breaking

### Internal

- `benefits-showcase` `plan.md`/`prompt.md` at Revision 0.7; added a `no-headline` gallery
  fixture.

## v1.6.0 — 2026-09-08

### Sections

- New section `benefits-showcase`: a horizontal rail of three to eight portrait media cards
  arguing product breadth, as a sibling to `benefits-default`'s three-outcome depth argument. A
  page may use either or both. Below 1024px it is a native snap-scroll rail with a card peek;
  at 1024px and above it pins and advances 1:1 with page scroll, releasing once exhausted (a
  rail that already fits does not pin). Every card declares one of two media fields — a
  `mediaBackdrop` colour token with a required screenshot, or a full-bleed
  `mediaBackdropImage` composed whole with an optional screenshot laid over it. See its
  `plan.md` for the full contract.
- `benefits-default`: card radius 20px → 24px, adopting the new Marketing Landing Card Radius
  (see `just-design-system/surfaces/web.md` §4). Visual only, no prop change.
- `how-it-works-default`: media panel radius 20px → 24px, on both the desktop pinned panel and
  the mobile/tablet inline-media frame, for the same reason. Visual only, no prop change.

### Breaking

### Internal

- `fixtureMedia.js` gained an opt-in `screen` variant for gallery fixtures whose section seats a
  device capture flush against its frame; the default `panel` placeholder would otherwise read
  as a second frame the section does not render.
- Catalogued the Aura inspiration behind `benefits-showcase` in `docs/inspiration/sections.md`.
- Promoted the 24px landing card radius from a scoped exception on `benefits-showcase` to the
  documented **Marketing Landing Card Radius** in `just-design-system/surfaces/web.md` §4, once
  the same 20px-for-a-landing-card pattern turned up on two more sections.

## v1.5.0 — 2026-08-29

### Sections

- `how-it-works-default`: steps may now select a fourth media backdrop, `sunflower`
  (`#E8B314`), alongside `chianti`, `sky`, and `cypress`. Omitted still means the default
  `ivory` panel, so existing configurations render unchanged.

### Breaking

### Internal

- `how-it-works-default` dossier at Revision 1.12; the gallery's "Media backdrops" fixture now
  shows all four backdrops across four steps.
- Recorded `sunflower` in the Marketing Process Story extension in
  `just-design-system/surfaces/web.md`.

## v1.4.1 — 2026-08-27

### Sections

- `how-it-works-default`: the responsive desktop/mobile selection is now safe during server
  rendering. Pages using the section no longer fail when the server has no `window` object.

### Breaking

### Internal

## v1.4.0 — 2026-08-27

### Sections

- `how-it-works-default`: titles may now request explicit line breaks; the optional
  `stepNumberStyle: 'hidden'` variant omits derived number labels while preserving the desktop
  rail. Steps may optionally select an `ivory`, `chianti`, `sky`, or `cypress` media backdrop
  and choose bottom (default) or top media alignment. Existing configurations continue to
  render unchanged.

### Breaking

### Internal

- JustConvert demo snapshot now uses the Process Story composition and page-owned responsive
  media frames. JustConvert is the rollout target; JustEjari remains explicitly deferred.

## v1.3.0 — 2026-08-27

### Sections

- `hero-default`: optional `media.srcSet` / `media.sizes` and the same fields on
  `background` enable responsive image selection. Existing `src` configurations still work;
  intrinsic dimensions and eager/high-priority device loading are unchanged.
- `header-default`: server rendering no longer reads `window`. CSS still selects the mobile
  presentation, and the existing scroll thresholds initialize after hydration.

### Breaking

### Internal

- Hero and header dossiers synchronized; responsive-media gallery fixture added.
- JustConvert is the rollout target. JustEjari stays on its existing pin, explicitly deferred.

## v1.2.6 — 2026-08-27

### Sections

- `legal-document-default`: the rounded table wrapper now carries a continuous 1px `borderWarm`
  perimeter around its corners, so the 16px-radius corners no longer read as bare where the
  collapsed cell grid was clipped by the rounding. No page-config change.

### Breaking

### Internal

## v1.2.5 — 2026-08-27

### Sections

- `legal-document-default`: tables now stay at the 680px legal-document measure when their
  content can shrink, while genuinely wide tables continue to scroll inside the rounded wrapper.

### Breaking

### Internal

## v1.2.4 — 2026-08-27

### Sections

- `legal-document-default`: the rounded table wrapper is now the sole horizontal scroll owner,
  so the warm grid is clipped to one continuous 16px outer shape while wide tables remain
  independently scrollable. Tables retain the legal document measure when their content can
  shrink to fit.

### Breaking

### Internal

## v1.2.3 — 2026-08-27

### Sections

- `legal-document-default`: the table scroll container now uses the shared 16px section-container
  radius while retaining square cells, the warm grid, and internal horizontal scrolling.

### Breaking

### Internal

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
