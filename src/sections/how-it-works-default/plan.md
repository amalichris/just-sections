# Default how-it-works plan

- **Section ID:** `how-it-works-default`
- **Revision:** `1.10`
- **Status:** Implemented
- **Products / variants:** Configurable Just landing-page process section; first consumer is the JustEjari page

## Conversion goal

Remove the "how much work is this going to be for me?" objection by showing the whole path — three or four steps, each with the real screen the visitor will see — so the effort reads as small and the outcome as certain. Optional single CTA at the end of the sequence, at the moment the visitor has just been shown that the process is short.

## Inspiration extraction

- **Catalog entries:** [Finsyc — How it Works 01] and [Kelo — How it Works](../../../docs/inspiration/sections.md), under `## How it Works` in `docs/inspiration/sections.md`.
- **Source material:** `docs/inspiration/full-landing-page-1/`, `docs/inspiration/full-landing-page-2/`, and `docs/inspiration/gemini-ideas/Landing Page Design Trends_ Value & Process.pdf`, whose "How it Works" guidance is split explicitly by device context.

**Keep:**

- **Desktop scroll-paced storytelling:** the visitor advances the story with the scroll they were already doing — no clicks, no navigation away (PDF, "Sticky Split-Screen / Scroll-Storytelling"). Taken further than the source: rather than scrolling text past a pinned panel, the whole composition pins and only the current step changes, so the reader never chases moving copy.
- **Mobile progressive disclosure:** an accordion where only step 1 is open, each step's media inline beneath its text, with tap targets sized for a thumb. The PDF is explicit that scroll-storytelling *fails* on mobile — erratic scroll speeds make it stutter and it hijacks touch — and that is the reason for the split behavior, not a shortcut.
- **Sequential framing** with short outcome-shaped step copy ("Connect your accounts in a single click"), not instructions. Derived number labels remain available where they aid wayfinding, but a product may omit them when the copy already reads as a set of capabilities.

**Adapt:**

- **Scroll-scrubbed morphing → discrete cross-fade.** Finsyc/Kelo and the PDF describe graphics that morph continuously under scroll (GSAP/WebGL). A discrete active-step swap driven by `IntersectionObserver` gives the same comprehension at a fraction of the weight, is trivially reduced-motion-safe, and does not fight the browser's scrolling.
- **Click-driven pill tabs (both templates' actual mechanic) → viewport-driven on desktop, accordion on mobile.** Tabs put an extra decision in front of the visitor on desktop and overflow a 375px row on mobile.
- **Bespoke per-step mockups and photographic backdrops → one page-supplied image per step**, on an `ivory` Ring-elevated panel.

**Exclude:** video card backgrounds, glass panels, photographic backdrops, accent greens, icon pulse loops, `AnimatePresence`-style entrance choreography, and all inspiration copy.

**Rejected from the PDF, with reasons:**

- *"System Fonts for Mobile"* — swapping Outfit/Inter for `-apple-system` on mobile. The design system names the two families as non-negotiable identity. The stated goal (no layout shift, fast paint) is already met by the documented preload plus `font-display: swap`.
- *"Sticky CTA Guard"* — a CTA anchored to the bottom of the mobile viewport after the hero. Reasonable CRO, but it is a page-level persistent control, not a property of this section. It belongs in a separate documented pattern; a section that renders page-level fixed furniture would leak out of its own bounds and could stack with another section doing the same.

## Just design-system translation

The section is governed by the approved **Marketing Process Story** landing extension in `docs/design-system/design.md`. Existing tokens still supply its Sienna active status, 200ms fade, typography, Ring panel, focus treatment, press scale, and intrinsic Sienna Brand Pill CTA; the extension records the new pinned scroll-story and responsive accordion expressions as shared design authority.

| Element | Font / size | Color | Notes |
| --- | --- | --- | --- |
| Eyebrow | Inter 12px w500, 1.60, uppercase, 0.12px tracking | `sienna` | Matches the Marketing FAQ eyebrow |
| Title | Outfit 500, 1.10; 36/40/48/64px at 375/430/768/1440px | `nearBlack` | Section heading |
| Subtitle | Inter 400, 1.60; 16/16/18/20px at 375/430/768/1440px | `oliveGray` | Supporting section copy |
| Step number | Inter 12px w500, 1.60, uppercase, 0.12px tracking | `stoneGray`; `sienna` when active | Optional derived `01`, `02`, `03` labels. The desktop rail remains when labels are hidden. |
| Step title | Outfit 20px w500, 1.20 | `nearBlack` | Card Headline |
| Step description | Inter 16px w400, 1.60 | `oliveGray` | Body Standard |
| Progress rail (≥1024px) | 2px wide track + 2px fill | Track `borderCream`, fill `sienna` | Left of the step column; the only chromatic accent in the section body. Marks the current step only and cross-fades between segments. |
| Media panel | — | 8px `ivory` frame, Ring (`0 0 0 1px ringWarm`); optional inner `chianti` (`#8E2441`), `sky` (`#2E74B5`), or `cypress` (`#2D6B48`) backdrop | 20pt outer / 12pt inner radius. Screenshots are horizontally centred and bottom-aligned so the backdrop remains visible above and to both sides. |
| CTA | Inter 16px w500, 44px height | `ivory` on `sienna` | Existing intrinsic Sienna Brand Pill |

Mobile disclosure **reuses the approved Marketing FAQ accordion treatment verbatim** — `borderCream` row dividers, 24px Lucide `Plus` in a 44px hit area, `stoneGray` closed and rotated 45° when open, 200ms `cubic-bezier(0.32, 0.72, 0, 1)` on height and icon rotation, 200ms `ease-out` on opacity, 2px `focusBlue` keyboard outline, 0.97 press scale. The pattern is scoped in `design.md` as "a landing-only control pattern", which is what this is; reusing it beats inventing a second, near-identical control. One deliberate difference: **step 1 is open on first render**, because a process section with everything collapsed shows the visitor nothing.

Worth noting for whoever maintains `design.md`: that treatment is written under a *Marketing FAQ* heading but now serves two sections. If a third one wants it, the heading should be generalised.

Section rhythm matches the existing sections: 96px block padding (128px at ≥768px), `clamp(20px, 4.444vw, 64px)` gutters, 1120px maximum container.

## Public configuration

**Required.** Missing either renders nothing and reports the omission in development.

- `title`: section heading string.
- `steps`: array of **three or four** `{ id, title, description, media }` objects with unique, non-empty ids, in order. Two steps is a sentence, not a process; five is the effort story this section exists to disprove. A title may contain `/n`, `\\n`, or newline characters to request a line break.
  - `media` is the shared `Media` shape and is required per step. Images only for v1 — a step with no visual is a step the visitor has to take on faith.
  - `mediaBackdrop` is optional per step. Omit it for the default `ivory` panel, or choose `chianti`, `sky`, or `cypress` to stage a screenshot against the named page-supplied backdrop.
  - `mediaVerticalAlignment` is optional per step. Omit it or use `bottom` to align the screenshot to the stage bottom; use `top` when the screenshot should meet the stage top. Top alignment preserves the capture’s contained dimensions and exposes the configured backdrop to its left, right, and below.

**Optional.** Absence is the only signal; no `show`-style boolean.

- `eyebrow`: short label string.
- `subtitle`: supporting copy string.
- `cta`: shared `Cta` shape (`{ label, href, target? }`), rendered as a Sienna Brand Pill after the final step. When `target: '_blank'` is supplied, the link opens in a new tab with `rel="noreferrer noopener"`.
- `id`: section id, defaults to `how-it-works`.

**Variants:** `stepNumberStyle` is `visible` (default) or `hidden`. `visible` derives `01`, `02`, and so on from the step order; `hidden` removes the labels while retaining the desktop rail. `mediaBackdrop` on a step is `chianti`, `sky`, or `cypress`; omitted is the default `ivory` panel. `mediaVerticalAlignment` on a step is `bottom` (default) or `top`. Desktop-sticky and mobile-accordion are two responsive expressions of one section, not a configurable choice — letting a page pick would let it pick the arrangement the PDF documents as failing on that device.

When visible, step numbers are derived from array order, never supplied. Panel and accordion DOM ids derive from `useId()` plus the step `id`, so the section can appear twice on one page. No `className`, `style`, layout-ratio, or initial-step overrides.

**Deferred (not v1):** a `media.kind: 'image' | 'video'` extension for the short looping step videos the PDF recommends. There are no video assets yet, and `docs/learnings.md` records that video must be served from Bunny.net rather than Vercel — that hosting decision has to land before the shared `Media` shape commits to video.

## Behavior and responsive design

### ≥1024px — pinned section, scroll advances the step

The whole composition is held still and the reader's scroll changes one thing: which step is current. **Nothing moves.** The intro, the full step list, and the media frame stay exactly where they are for the length of the section; scrolling down advances 1 → 2 → 3, and once the last step has had its turn the section releases and the page scrolls on normally.

| Piece | Behaviour |
| --- | --- |
| Scroll track | `position: relative`, `min-block-size: calc((step-count + 0.5) × --how-it-works-step-scroll + 50dvh)` |
| Pinned composition | `position: sticky; top: 0; block-size: 100dvh`, holding intro, step list, CTA, and media frame |
| Markers | One empty `span` per step, absolutely positioned down the track, spaced `--how-it-works-step-scroll` apart |

`--how-it-works-step-scroll` (currently `70dvh`) is the single tuning knob: it is the scroll distance one step is worth, and the track length derives from it. The extra half-step plus half-viewport in the track length is what gives the final step a full step's worth of dwell before the pin releases — without it, step 3 would activate at the exact moment the section starts scrolling away.

**Scroll position is read from the markers, not the content**, because the content no longer moves. One `IntersectionObserver` with a `-45% 0px -45% 0px` `rootMargin` reports which marker is crossing the middle 10% of the viewport — no scroll listener, no scroll maths, no scrub. Entries arrive in unspecified order and a fast flick can put two markers in the band, so the active step is resolved by whichever candidate's centre is nearest the viewport centre, which is order-independent. Between markers nothing is in the band and the current step holds.

**The composition is centred in the pinned viewport as one block** — intro, step list, CTA, and media frame sized to their content and centred together. Sizing the body to fill the leftover height instead pushes the steps to the bottom of the screen and strands the title alone at the top. Pinned padding is `clamp(40px, 7vh, 96px)` and the intro-to-body gap `clamp(24px, 4vh, 48px)`, so short laptop windows tighten rather than overflow.

**The media frame takes its height from the step list.** Both columns stretch to the taller one, and the step images are positioned out of flow inside the frame — otherwise a tall portrait capture would size the grid row and drive the frame past the viewport. The frame therefore starts and ends level with the steps beside it, and the image fits inside with `object-fit: contain`.

**All three descriptions are visible the whole time**, which is the point of the layout — the reader sees the shape of the whole process at a glance and watches their position move through it. Current position is carried by the two-layer rail and, when labels are visible, the `sienna` step number: a `borderCream` track runs the full list, with the `sienna` fill on the current step only.

Step text never dims. Dimming the other steps is the common treatment, but `design.md` defines no dim state, and with the whole list permanently on screen, dimming two thirds of it would work against the reason it is all shown at once.

Only the media frame changes: a 200ms `ease-out` opacity cross-fade plus an 8px rise on the incoming image. All step images sit stacked in one grid cell; inactive ones are `opacity: 0` and `aria-hidden`.

Under `prefers-reduced-motion` the image swap is instant and unmoved and the rail cross-fade becomes an instant handoff — the media still *changes*, because that is content, not decoration. Pinning itself is scroll position rather than animation and is unaffected. If `IntersectionObserver` is unavailable, step 1 stays current and the section reads as a static, fully legible split layout.

**Steps are also clickable.** Each step title is a native `button` whose hit area is stretched over the whole step block, so the target is the full block while the accessible name stays the step title and each step is a single tab stop. Activating one scrolls the page to the position where that step's marker sits at the viewport centre — the same place scrolling there would land — but does not set active state directly. The `IntersectionObserver` updates the rail, media, and `aria-current` only when the viewport actually reaches the next step, so the indicator never jumps ahead of the scroll. The first marker's centre would place the viewport 15dvh before the sticky track, so that destination alone is clamped to the track start; clicking back to step 1 therefore keeps the composition pinned. The scroll is smooth, or instant under `prefers-reduced-motion`. The current step carries `aria-current="step"`.

The control is the approved Marketing FAQ accordion trigger treatment minus the icon: a flat, transparent button carrying an Outfit 20px w500 heading in `nearBlack`, `focusBlue` keyboard ring, 0.97 press scale. The press scale is applied to the step's content wrapper rather than the step itself, because scaling the step would take its rail segment with it and visibly break the continuous track. The pointer cursor is sufficient hover affordance; hovering does not recolor the rail or step content.

**Scroll is not hijacked.** The steps change at fixed scroll distances, which gives the described stepped feel, but the page never snaps, catches, or takes the scroll position away from the reader. Adding `scroll-snap` to make each step a hard stop is a deliberate further step, not something to slip in.

### < 1024px — accordion

The intro centres within a 624px measure. Steps become an accordion: full-width flat trigger rows carrying the optional step number and title, a 72px minimum row with a 44px icon hit area, and the description plus media revealed in the panel beneath. Step 1 is open on first render; opening a step closes the previously open one; activating the open step closes it. Mobile and tablet media uses a 420px-tall stage wrapped in an 8px `ivory` frame with the warm ring and 20pt outer / 12pt inner radius; its screenshot is contained within 16px side and 44px top backdrop space, centred horizontally and aligned to the bottom. Media uses `loading="lazy"` and reserves its space before expansion, so opening a step does not shove the page.

The optional CTA sits after the last step: intrinsic Sienna Brand Pill, left-aligned under the step column at ≥1024px, centred below 1024px.

Assets are page-supplied; the section ships none. Page authors provide one crop per step, sized for the panel and consistent in aspect across steps so the cross-fade does not jump. No text baked into images — every step instruction is real DOM text, which is both a Retina-crispness and a screen-reader requirement.

## Accessibility

A labelled `section` with an `h2`, and an ordered list of steps so the sequence is conveyed structurally, each step titled with an `h3`.

- **Desktop:** each step title is a native `button` with the step title as its accessible name, one tab stop per step, a `focusBlue` ring drawn around the whole step block, and `aria-current="step"` on the current one. The media frame is a presentational reflection of the text — each step's copy is complete on its own — and its images carry `alt` describing the screen.
- **Mobile:** native `button` triggers with `aria-expanded` and `aria-controls`; each panel is labelled by its trigger and `aria-hidden` while collapsed. Pointer, Enter, and Space all activate. 2px `focusBlue` keyboard outline, 44px minimum targets, 0.97 press scale, both disabled under `prefers-reduced-motion` along with the expansion transition.

Text reflows at 320px; browser text zoom is not blocked.

## Acceptance checks

- [x] Uses the approved Marketing Process Story extension and existing system tokens.
- [x] Requires `title` and three or four complete steps with unique ids and valid media; invalid configuration renders nothing and is reported in development.
- [x] Renders eyebrow, subtitle, and CTA only when supplied, with no residual spacing when omitted.
- [x] At ≥1024px the composition pins and nothing inside it moves; scroll advances the current step and then releases the page.
- [x] Every step description and the media frame are visible for the whole section; only current-step marking and the image change.
- [x] Active step resolves by distance to the viewport centre, so entry order and fast scrolling cannot strand it on a passed step.
- [x] The rail fill marks the current step only, against a track running the whole list.
- [x] The rail cross-fades between segments without scale or position jumps.
- [x] The CTA keeps its intrinsic pill width and is not stretched by the column.
- [x] The media frame is level with the step list, not the full height of the screen.
- [x] Scroll is never snapped, caught, or taken from the reader.
- [x] Clicking a step scrolls to that step's position rather than setting state directly, so click and scroll agree.
- [x] Click navigation leaves active state observer-driven so the rail and media never move ahead of the scroll.
- [x] Clicking from a later step back to step 1 stops at the sticky-track boundary without releasing the composition.
- [x] Hovering a desktop step leaves the progress rail and step content visually unchanged.
- [x] Each desktop step is one tab stop, named by its title, with `aria-current="step"` on the current one and focus ringing the whole block.
- [x] The pinned composition fits short desktop windows without clipping or inner scrolling.
- [x] Below 1024px the accordion opens step 1 by default and keeps at most one step open.
- [x] Reduced motion removes transitions and press scale while still switching step media.
- [x] `aria-expanded`/`aria-controls`, labelled regions, native button activation, and 44px targets in place on the accordion.
- [x] Step titles render `/n`, `\\n`, and newline markers as line breaks; `stepNumberStyle: 'hidden'` removes number labels without removing the desktop rail.
- [x] Optional per-step backdrops stage screenshots bottom-aligned with visible backdrop above and to either side at every breakpoint.
- [x] `cta.target: '_blank'` opens the CTA in a new tab with safe opener isolation.

**Revision 1.1:** added the optional `cta.target` behavior so external acquisition links can explicitly open in a new tab.
- [x] Keyboard operation and focus visibility exercised by hand.
- [x] Reviewed in a browser at 375px, 768px, 1024px, and 1440px, including the sticky hand-off at the 1024px boundary.
- [x] `prompt.md` has the same Section ID and Revision as this plan.

## Implementation notes

**Revision 1.10:** corrected top alignment: keep the same contained image box as bottom-aligned media and move that box to the stage top. The backdrop therefore remains visible only to the left, right, and below the capture.

**Revision 1.9:** corrected top alignment to preserve the same screenshot size as bottom-aligned media. The transparent canvas is shifted upward within the stage so the backdrop remains visible to the left, right, and below the capture.

**Revision 1.8:** corrected top-aligned media placement. A top-aligned capture fills the stage with its transparent canvas so its visible screenshot begins at the intended top backdrop boundary rather than retaining the bottom-aligned inset.

**Revision 1.7:** added the optional `mediaVerticalAlignment` step enum. Screenshots remain bottom-aligned by default; a `top` value keeps the capture at the top of its available stage.

**Revision 1.6:** increased the media frame to the documented 20pt Card outer radius and 12pt Generous inner-stage radius, retaining the 8px `ivory` frame and warm ring.

**Revision 1.5:** increased the outer media-frame radius from 12pt to 16pt while retaining the 8px `ivory` frame and warm ring.

**Revision 1.4:** wrapped every media stage in an 8px `ivory` frame with the warm ring and 12pt outer radius. The screenshot top backdrop field is 44px at every viewport.

**Revision 1.3:** added optional `mediaBackdrop` to Process Story steps. Mobile and tablet frames now reserve a 420px stage; desktop screenshots sit on the bottom of their copy-aligned panel. In every expression, 16px or 24px side space and 44px top space expose the configured backdrop.

**Revision 1.2:** added title-line-break rendering and the `stepNumberStyle` variant. Number labels remain derived when visible; hiding them is a non-breaking configuration choice that leaves the desktop rail intact.

Composed into `src/pages/justejari/page.config.js` under id `how-it-works`, replacing the `preview-placeholder` entry. `src/sections/preview-placeholder/`, its registry entry, and the `AGENTS.md` project-map line describing it were all removed once this section and `benefits-default` were both in place.

**Revision 0.9:** removed the eager active-step mutation from click navigation so the observer changes rail, media, and `aria-current` only when the smooth scroll reaches a new step. Replaced per-segment scale growth with a 200ms opacity handoff, eliminating the distracting rail leap.

**Revision 0.8:** removed the desktop rail hover recolor because the pointer cursor already communicates interactivity, and clamped step 1's click destination to the sticky-track start so reverse navigation no longer briefly releases and shifts the pinned composition.

**Revision 0.7:** recorded the approved Marketing Process Story pattern in `docs/design-system/design.md`, enforced the complete three-or-four-step and optional CTA contracts, and corrected desktop media stacking so the active image wins the cascade and every image fits inside the panel's 24px inset.

**Revision 0.6:** desktop steps are clickable, scrolling the page to that step's marker position rather than setting state directly, so click and scroll share one source of truth. Mobile accordion trigger styles moved from a `.step button` selector onto a `__trigger` class so the new desktop control does not inherit the accordion row's box.

**Revision 0.5:** desktop composition corrected against a browser review of 0.4. The body row had been sized to fill the pinned viewport, which left a dead gap between the title and the steps, stretched the media frame to the full height of the screen, and pulled the CTA pill to the full column width. The composition is now centred as one content-sized block, both columns stretch to the step list, the panel images are positioned out of flow so a portrait capture cannot size the row, and the CTA keeps its intrinsic width. The rail fill also went back to marking the current step alone — cumulative fill read as three lit steps rather than one position.

**Revision 0.4:** desktop mechanic replaced. Revisions 0.2–0.3 scrolled the step text past a pinned panel, which meant the reader chased moving copy and only ever saw one step at a time. The section is now pinned whole: intro, all step descriptions, and the media frame hold still, and scroll advances the current step through them before releasing the page. Step blocks, per-step centring, and the scroll-driven rail animation are gone — the content no longer moves, so scroll position is read from empty markers laid down the track, and the rail fills cumulatively from the current step index.

**Revision 0.3 (superseded):** desktop pacing rebuilt. The first cut pinned the panel at a fixed 96px offset and let steps size to their copy, which made the sticky effect all but invisible and left the observer's tie-break dependent on entry order. Now: section at least `100dvh`, `66vh` step blocks with centred text, a full-viewport sticky panel centring its own card, order-independent nearest-to-centre resolution, a two-layer rail with a scroll-driven fill where supported, and an 8px rise on the incoming image.

**Revision 0.2:** dropped the "Marketing Process Section extension must be agreed first" gate — re-checking each value against `design.md` showed all of them already documented, including sienna as a status accent and the 200ms `fadeTransition`.

**Structure is chosen by `matchMedia`, not by CSS.** The two viewports need different markup, not different styling: desktop has no focusable step controls and one sticky image stack, mobile has native `button` triggers and per-step inline media. Rendering both subtrees and hiding one with CSS would ship duplicate headings and download every step image twice, so a small local `useIsDesktop` hook at the 1024px boundary picks one. The hook stays in this file — a second consumer would justify sharing it; one does not.

The desktop `IntersectionObserver` uses a `-45% 0px -45% 0px` `rootMargin`, so the active step is whichever text block crosses the middle 10% of the viewport. Between steps no entry intersects and the previous step stays active, which is the intended behaviour rather than a gap. Where `IntersectionObserver` is unavailable, step 1 stays active and the section degrades to a static split.

Step screens are page-owned: this library ships no imagery. `fixtures.js` uses generated placeholders from `src/sections/fixtureMedia.js`; step copy in the fixture is preview copy.
