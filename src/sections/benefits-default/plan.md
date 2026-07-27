# Default benefits plan

- **Section ID:** `benefits-default`
- **Revision:** `0.4`
- **Status:** Implemented
- **Products / variants:** Configurable Just landing-page value/benefit section; first consumer is the JustEjari page

## Conversion goal

Answer "what does this do for me, and how do I profit from it?" in a single scan. The section moves a visitor from category recognition to a concrete, self-interested outcome ("I would get X back"), and hands the decision forward: it carries no CTA of its own, because `pricing-banner-default` owns the page's primary acquisition moment.

This section replaces the `features` preview fixture. It is deliberately **not** named `features-default`: the content contract is one benefit per card stated as an outcome, with the feature named only as the mechanism. `AGENTS.md`'s project map still calls this "the features section" and should be corrected to `benefits-default` in the implementing change.

## Inspiration extraction

- **Catalog entries:** [Kelo — Features](../../../docs/inspiration/sections.md), [Finsyc — Feature 01], [Nura Health — Precision Micro-UI Dashboard], all under `## Features` in `docs/inspiration/sections.md`.
- **Source material:** `docs/inspiration/full-landing-page-2/` (Kelo bento), `docs/inspiration/full-landing-page-1/` (Finsyc cards), and `docs/inspiration/gemini-ideas/Landing Page Design Trends_ Value & Process.pdf` — a trend brief on below-the-hero value and process sections, including its desktop/mobile treatment of each.

**Keep:**

- Asymmetric bento with one **anchor cell at two-thirds width** carrying the highest-value benefit, flanked by smaller secondary cells (PDF, "Desktop Approach: The Multi-Dimensional Bento Grid").
- **Real, high-fidelity UI fragments** per card — a tight crop of the actual product at the exact point of value — instead of abstract 3D illustration or icon-plus-lorem cards.
- **Structural social proof:** the customer quote lives inside the card whose claim it supports, not in a testimonial wall at the bottom of the page.
- **Outcome-driven copy discipline:** specific and objection-handling ("replaces your weekly status meeting"), 5th-to-7th-grade reading level, no category boilerplate. This is a constraint on the page config that supplies the copy, and is recorded here so the config author inherits it.

**Adapt:**

- **Hover-revealed trust micro-copy → always-visible proof line.** The PDF has the proof fade in on hover. Hover-only content does not exist for touch or keyboard users, i.e. for most of the traffic this section is optimized for, so the proof renders unconditionally.
- **Per-cell bespoke live widgets → static UI stills.** Kelo's and Nura Health's cells each run their own animated mini-demo. That is per-cell code, which is incompatible with a section driven entirely by page config; the same evidentiary job is done by a crisp product crop supplied as `media`.
- **Surface treatment:** dark/white bento surfaces become a `parchment` section with `ivory` Ring-elevated cards.

**Exclude:** accent greens and cyans, glassmorphism, video card backgrounds, hairline-divider bento with no card surface, count-up number animation, parallax lift on hover, and all inspiration copy.

**Deliberate divergence from the PDF:** no card hover state at all. The cards are not links or controls, the proof line is already visible, and a hover-only scale would be decoration advertising an interaction that does not exist — which the design system rules out twice ("no decoration for decoration's sake", "every interactive surface maps to a defined button variant"). The card earns attention through content, not motion.

## Just design-system translation

The section is governed by the approved **Marketing Benefits Bento** landing extension in `docs/design-system/design.md`. Its typography, colors, spacing, radii, and Ring elevation compose existing tokens; the extension records the new anchor-plus-two responsive pattern and its strict three-item content contract as shared design authority.

The one interaction that would have conflicted with the system — a hover treatment on a non-interactive card — was removed rather than invented.

| Element | Font / size | Color | Notes |
| --- | --- | --- | --- |
| Eyebrow | Inter 12px w500, 1.60, uppercase, 0.12px tracking | `sienna` | Same restrained brand label as the Marketing FAQ |
| Title | Outfit 500, 1.10; 36/40/48/64px at 375/430/768/1440px | `nearBlack` | Section heading |
| Subtitle | Inter 400, 1.60; 16/16/18/20px at 375/430/768/1440px | `oliveGray` | Supporting section copy |
| Card surface | — | `ivory`, Ring (`0 0 0 1px ringWarm`) | 20pt radius, 24px padding (20px below 768px) |
| Card media frame | — | `parchment` behind the image | 12pt radius, `overflow: hidden`, 16:10 aspect, `object-fit: cover`, `object-position: top left`. 12pt (§5 "Generous") rather than the 16pt card value, which sits nearly flush inside a 20pt card and reads as a mistake. |
| Card title | Outfit 20px w500, 1.20 (anchor card: 25px at ≥1024px) | `nearBlack` | Card Headline / Sheet Title, both existing scale steps |
| Card body | Inter 16px w400, 1.60 | `oliveGray` | Body Standard |
| Proof quote | Inter 14px w400, 1.43 | `charcoalWarm` | Caption; preceded by a 1px `borderCream` rule with 16px above and below |
| Proof attribution | Inter 12px w500, 1.60 | `stoneGray` | Label |

Grid: `1120px` maximum container, 96px block padding (128px at ≥768px), `clamp(20px, 4.444vw, 64px)` gutters, and a 12px grid gap (the documented card-to-card value) at every breakpoint. Cards are non-interactive: no hover, no press scale, no focus ring, no shadow beyond the Ring. Nothing in the section animates, so `prefers-reduced-motion` has nothing to disable.

## Public configuration

**Required.** Missing either renders nothing and reports the omission in development.

- `title`: section heading string.
- `items`: array of **exactly three** `{ id, title, description, media, proof? }` objects with unique, non-empty ids. Fewer than three cannot fill the anchor-plus-two grid; more than three cannot be shown on mobile without hiding a benefit from the majority of traffic, which the section will not do. A fourth benefit is a signal to cut copy or to add a distinct section, not to extend this grid.
  - `media` is the shared `Media` shape and is **required per item** — the section's whole argument is that the visitor sees the real product before signing up. A card with no image is not this section.
  - `proof` is optional per item: `{ quote, attribution }`. When supplied, both values are required.

**Optional.** Absence is the only signal; no `show`-style boolean.

- `eyebrow`: short label string.
- `subtitle`: supporting copy string.
- `id`: section id, defaults to `benefits`.

**Variants:** none. The anchor is always `items[0]`; ordering is the only layout control the page has, which keeps the config JSON-like and the layout decision editorial.

Spacing above the title belongs to the eyebrow-to-title pair and spacing above the subtitle to the title-to-subtitle pair, so an omitted eyebrow leaves no residual margin. The section exposes no CTA, no `className`, no `style`, and no column overrides. `aria-labelledby` ids derive from `useId()` so the section can appear twice on one page.

## Behavior and responsive design

| Breakpoint | Layout |
| --- | --- |
| < 768px | Single column. Intro centered within a 624px measure. Three identical cards stacked in order, 16:10 media each. |
| 768–1023px | Two columns. Anchor spans both columns; items 2 and 3 sit side by side beneath it. Intro still centered at 624px. |
| ≥ 1024px | Three columns × two rows. Anchor spans columns 1–2 and both rows; items 2 and 3 fill column 3, one row each. Intro left-aligned. The section fills the viewport: `min-block-size: 100dvh` with content centred. |

`min-block-size` rather than `height`, deliberately: the anchor card grows with its copy and its media, so a long benefit must be allowed to push the section past one screen instead of clipping or scrolling inside it. At short desktop window heights the section is simply as tall as its content.

The anchor's media frame grows with its cell and keeps the same 16:10 crop, so a single supplied asset works at every breakpoint. Images use intrinsic `width`/`height` to reserve space, `loading="lazy"` (the section sits below the fold), and `decoding="async"`. Page authors supply a tight UI crop, not a full dashboard screenshot: at mobile widths a full screenshot degrades into unreadable pixels, which is exactly the failure the PDF calls out under "Text Hierarchy Over Imagery". No text baked into images — every benefit claim is real DOM text.

There is no loading, empty, or error state: `items` is static config, and a missing required prop renders nothing.

## Accessibility

A labelled `section` with an `h2` intro title; each card is an `article` with an `h3` title. Proof uses `blockquote` + `cite`. Informative UI crops carry descriptive `alt` text naming what the fragment shows; an image that is purely a repeat of adjacent text takes `alt=""`. Nothing in the section is focusable, so there are no tab stops, hit targets, or focus rings to satisfy — and nothing is hidden behind hover or pointer input. Text reflows at 320px and browser text zoom is not blocked.

## Acceptance checks

- [x] Uses the approved Marketing Benefits Bento extension and existing system tokens.
- [x] Requires `title` and exactly three complete items with unique ids and valid media; invalid configuration renders nothing and is reported in development.
- [x] Renders eyebrow, subtitle, and per-card proof only when supplied, with no residual spacing when omitted.
- [x] Anchor-plus-two grid at ≥1024px, anchor-over-pair at 768–1023px, single stack below 768px.
- [x] Proof line is visible without hover or pointer input.
- [x] Cards have no hover, press, focus, or motion treatment.
- [x] Every image has `alt` text and no baked-in text.
- [x] Reviewed in a browser at 375px, 768px, 1024px, and 1440px.
- [x] `prompt.md` has the same Section ID and Revision as this plan.

## Implementation notes

Composed into `src/pages/justejari/page.config.js` under id `benefits`, replacing the `features` `preview-placeholder` entry; the header nav item was renamed from "Features" to "Benefits" and repointed so label, target, and section agree. `preview-placeholder` and its registry entry were deleted once `how-it-works-default` landed alongside this section, and the `AGENTS.md` project-map line describing it was removed.

**Revision 0.4:** recorded the approved Marketing Benefits Bento pattern in `docs/design-system/design.md` and made the public contract executable. The section now renders nothing and reports the issue in development unless it receives exactly three complete items with unique ids, valid shared media, and complete proof when proof is supplied.

**Revision 0.3:** the section fills the desktop viewport (`min-block-size: 100dvh`, content centred at ≥1024px), matching the hero's full-height treatment so the page reads as a sequence of screens rather than a continuous scroll.

**Revision 0.2:** initially treated the section as a composition of existing values. Revision 0.4 supersedes that decision by documenting the anchor-plus-two layout itself as an approved landing pattern, not merely its tokens.

Page config supplies placeholder SVG UI skeletons from `src/pages/justejari/assets/`. They are page-owned, so real captures swap in without touching this section. Card copy in the fixture is preview copy, not final product wording.

Invalid item counts and incomplete nested fields are render guards. The section does not silently drop content or render an odd grid; page authors must cut or move additional benefits explicitly.
