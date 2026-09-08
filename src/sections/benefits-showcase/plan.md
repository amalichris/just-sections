# Benefits showcase plan

- **Section ID:** `benefits-showcase`
- **Revision:** `0.7`
- **Status:** Implemented
- **Products / variants:** Configurable Just landing-page breadth section; `mediaBackdrop` variant per card. First expected consumer is JustConvert

## Conversion goal

Answer "how much does this actually cover?" — the breadth question, not the top-three question.

`benefits-default` argues depth: three outcomes, one anchored above the rest, each earning a full card. This section argues **coverage**: a run of six-to-eight named problems, each answered by the feature that solves it, scanned in sequence rather than weighed against each other. A visitor leaves believing the product handles their case even if their case was not one of the three the page chose to lead with.

It carries no CTA. `pricing-banner-default` still owns the page's acquisition moment.

This section does not replace `benefits-default` and is not a variant of it. They make different arguments and a page may reasonably run both.

## Inspiration extraction

- **Catalog entry:** to be added to `docs/inspiration/sections.md` under `## Features` as *Aura — What does Aura help protect me from?*
- **Source material:** `docs/inspiration/just-sections_benefits-section_insp.jpeg` and the live section at `https://www.aura.com` (`section.section_safetyhp-help`), inspected at 375, 768 and 1440.

Measured from the live implementation:

| | 375px | 768px | 1440px |
| --- | --- | --- | --- |
| Card width | 256 | 380 | 357 |
| Media frame | 256×321 (4:5) | 380×521 (3:4) | 357×490 (3:4) |
| Gap | 16 | 24 | 24 |
| Track | 343 (peek) | 672 | 1120 |

**Keep:**

- **Portrait media frame.** The single mechanic worth taking. A phone screenshot in a portrait frame gets roughly 2.8× the vertical space it gets in `benefits-default`'s 16:10 frame at the same card width (321px versus 114px at 375px). This is the problem the section exists to solve.
- **Equal-weight cards.** No anchor cell. An anchor requires a wide cell, and a two-thirds-width portrait phone is absurd — dropping the anchor is what makes portrait media possible, and it also removes the "exactly three" ceiling.
- **Two-tier copy: problem on the media, answer below it.** Aura overlays the fear ("Unsafe websites") on the image and names the feature underneath ("Safe browsing"). The strongest device in the reference: it states the reader's problem in their words before naming the product's vocabulary.
- **A rail rather than a grid.** With eight cards a grid is a wall. The rail is load-bearing here, not decoration.
- **Desktop track width of 1120px**, which is already our marketing landing container. 3 × 357 + 2 × 24 = 1119.

**Adapt:**

- **Baked-in backdrop → an explicit media field, colour or photograph.** Aura composes everything into one asset (natural 1439×1799, `object-fit: cover`) so the phone bleeds off the frame's bottom edge. We take the *bleed* but not the *baking*: the field is declared, either as a `mediaBackdrop` colour token with the screenshot contained and seated on the bottom edge — the treatment `Marketing Process Story` already approves — or as a full-bleed `mediaBackdropImage`. Splitting field from subject means a page author supplies a screenshot and a photograph rather than a pre-composited illustration, and the section keeps control of the frame.
- **Photographic cards keep their photograph as the whole field.** Aura's "Unsafe websites" card is a photograph with no device mockup on it at all, while "Phishing, scam calls & texts" is a phone over a warm gradient. Both are the same slot filled differently, so the contained screenshot is optional when the field is an image and required when the field is a colour — a colour field with nothing on it is an empty rectangle.
- **Arrow-driven carousel → native scroll everywhere.** See "Behavior" below. Aura's arrows are the only affordance on mobile, with no pagination dots; the peek does the work and the arrows are redundant.
- **Dark canvas → `parchment`.** Aura is near-black with `#bababa` body copy. Ours is the warm palette throughout.
- **Card-as-image → media frame plus caption on the page.** Aura's card has no surface: the image *is* the card and the copy sits on the page background. We keep that, and put Ring elevation on the media frame so the section still carries the system's signature containment without a redundant card box around a caption.

**Exclude:** the near-black canvas, `#bababa` text, Basel Grotesk, the prev/next arrow pair, the `is-disabled` arrow states, and all inspiration copy.

**Explicitly not copied — Aura's accessibility.** The live section sets `aria-hidden="true"` on every off-screen slide, gives the carousel no `role` and no `aria-label`, has no live region, and renders no pagination on mobile. Cards four through eight are invisible to a screen reader. Our rail keeps every card in the accessibility tree at all times; nothing is hidden because it is off-screen.

## Just design-system translation

This section needs one new approved extension, **Marketing Benefits Showcase Rail**, recorded in `just-design-system/surfaces/web.md` §9 in the same change. Everything inside it composes existing tokens; what is new is the pattern — a horizontal rail of portrait media cards, and the desktop scroll-driven pin that advances it.

Three points where an approved treatment already existed and was reused rather than invented:

- **The media stage.** `Marketing Process Story` already specifies a screenshot contained, horizontally centred, and aligned to the panel bottom on a `chianti` / `sky` / `cypress` / `sunflower` backdrop, with side and top space keeping the field visible. The showcase's media frame is that treatment in a portrait aspect. This is a direct fix for `benefits-default`'s `object-fit: contain` plus `padding: 12%`, which insets on all four sides and can never let the subject fill the frame.
- **The desktop pin.** `Marketing Process Story` already pins a composition inside a taller scroll track at 1024px and above. The showcase uses the same mechanism, and the same prohibition applies: **no wheel interception, no `preventDefault`, no scroll snapping on desktop.** Native scroll drives a transform; it does not get hijacked. Scrollbar position, trackpad momentum, keyboard paging, and Find-in-page all keep working.
- **The progress indicator.** `Marketing Process Story`'s desktop rail already uses `sienna` for the active segment, so a `sienna` fill on a `warmSand` track is consistent with "sienna is reserved for CTA, brand moments, and status accents" rather than a dilution of it.

| Element | Font / size | Color / surface | Notes |
| --- | --- | --- | --- |
| Eyebrow | Inter 12px w500, 1.60, uppercase, 0.12px tracking | `sienna` | Same restrained brand label as every other marketing section |
| Title | Outfit 500, 1.10; 36/40/48/64px at 375/430/768/1440px | `nearBlack` | Marketing landing ramp, section title row |
| Subtitle | Inter 400, 1.60; 16/16/18/20px | `oliveGray` | Marketing landing ramp, section description row |
| Media frame | — | `mediaBackdrop` token or full-bleed `mediaBackdropImage`; Ring (`0 0 0 1px ringWarm`); **24px radius** (Marketing Landing Card Radius) | 3:4, `overflow: hidden` |
| Capture | — | 12px radius, top corners only | 24px colour field each side, flush bottom, `cover` anchored top |
| Media headline | Outfit 500, 1.20; 20px below 1024px, 25px at 1024px+ | `ivory`, or `nearBlack` on `sunflower` | Card Headline / Sheet Title, both existing scale steps |
| Headline scrim | — | `nearBlack` 0 → 62%, top 55% of the frame | Photographic fields only; see below |
| Card title | Outfit 20px w500, 1.20 | `nearBlack` | Card Headline |
| Card body | Inter 16px w400, 1.60 | `oliveGray` | Body Standard |
| Progress track | — | `warmSand`, 2px, 99pt capsule | Desktop pinned mode only; inset to the container, 24px clear above it |
| Progress fill | — | `sienna` | Desktop pinned mode only |

Grid: 1120px maximum container for the intro and for the rail's inline insets, `clamp(20px, 4.444vw, 64px)` page gutters, 96px block padding (128px at 768px and above). Card gap 16px below 768px, 24px at 768px and above — the 8pt rhythm, widened from the 12px card-to-card value because a rail needs the gap to read as separation between peers rather than as grid tightening.

When the rail pins, the intro, the rail's first card, and the progress indicator all take the same container inset, so heading, card and indicator share one left edge and the indicator ends where the container ends rather than running to the viewport edge. That shared left edge is a property of the pinned, scrolling rail. A rail short enough that it never pins renders as a static row with no progress indicator, and there is no scroll for the heading's left edge to track; at 1024px and above that row is centred and the intro stays centred with it, matching every sibling marketing section. Below 1024px the rail is always a left-packed snap scroller with a visible peek regardless of length. Intro-to-rail rhythm matches the sibling sections: 48px below 768px and 64px above it. Inside the desktop pin it becomes `clamp(24px, 4vh, 48px)`, the same reduction `Marketing Process Story` already applies to its own pinned layout, so a short window compresses the rhythm instead of overflowing the pin.

Every spacing value is a listed step on the 8pt scale and every type step is an existing scale entry or a row of the marketing landing ramp. The capture's top corners use 12pt Generous and the progress track 99pt Capsule, both documented.

**Radius — 24px on the media frame.** This is the documented **Marketing Landing Card Radius** (`surfaces/web.md` §4), not the 20pt in-app Card step from `foundations.md` §5. It started as a scoped exception on this section and was promoted to a named landing-wide radius once `benefits-default` and `how-it-works-default` turned out to use the same 20pt step for the same kind of surface — the outer Ring-elevated card of a marketing section. All three now use 24px; foundations §5 and every in-app surface are unaffected. Negative heading tracking (`-0.04em` on the section title, `-0.02em` on card headlines) follows the convention every existing section in this library already uses; it is not recorded in `foundations.md`, and normalising it belongs to the whole library rather than to this section.

### Media headline contrast

When a card carries a media headline it sits on the backdrop, so its colour is determined by the backdrop rather than left to page configuration:

| Backdrop | Hex | Headline colour | Contrast |
| --- | --- | --- | --- |
| `chianti` | `#8E2441` | `ivory` | ~8:1 |
| `sky` | `#2E74B5` | `ivory` | ~4.9:1 |
| `cypress` | `#2D6B48` | `ivory` | ~5.6:1 |
| `sunflower` | `#E8B314` | `nearBlack` | ~9:1 |
| `charcoal` | `#30302E` (`darkSurface`) | `ivory` | ~13:1 |
| `mediaBackdropImage` | page-supplied | `ivory` over a scrim | guaranteed by the scrim |

Every card declares a field, and where a headline is present the field determines its colour — page configuration never picks it. For the five colour tokens the contrast is known here and fixed.

A photograph's contrast is not knowable here, so a photographic field that carries a `mediaHeadline` gets a **headline scrim**: a `nearBlack` gradient from transparent to 62% over the top 55% of the frame, with the headline in `ivory` above it. That is what makes an arbitrary page-supplied photograph safe to put text on; where it renders it is not configurable. It exists only to give the headline a ground, so a card with no `mediaHeadline` renders no scrim and shows its frame image unshaded. `Landing Hero Warm Glass Backdrop` already establishes that full-bleed marketing imagery may sit under a warm overlay so foreground text stays legible; this is the same principle applied to a card, using a top-anchored gradient rather than a full-frame wash so the photograph below stays readable as a photograph.

## Public configuration

**Required.** Missing any of these renders nothing and reports the omission in development.

- `title`: section heading string.
- `items`: array of **three to eight** `{ id, title, description, mediaHeadline?, mediaBackdrop?, mediaBackdropImage?, media? }` objects with unique, non-empty ids.
  - Below three there is no breadth to argue and `benefits-default` is the better section. Above eight the rail is longer than a reader will follow and the content is a feature table, not a showcase.
  - `title` — the feature that answers it.
  - `description` — one or two sentences of body copy.

**Required per item — the media field.** Exactly one of:

- `mediaBackdrop` — one of `chianti`, `sky`, `cypress`, `sunflower`, `charcoal`. The section paints the field; `media` is then **required**, because a colour field with nothing on it is an empty rectangle.
- `mediaBackdropImage` — a `Media` filling the frame edge to edge (`object-fit: cover`). `media` is then **optional**: supply it to put a device capture over the artwork, omit it when the artwork is already the whole card.

Supplying both, or neither, is invalid and renders nothing.

**Optional per item.**

- `media` — the shared `Media` shape: a device or interface capture, contained horizontally and seated on the frame's bottom edge. Required alongside `mediaBackdrop`, optional alongside `mediaBackdropImage`.
- `mediaHeadline` — the problem, in the reader's words, overlaid on the media. It is the section's strongest device and a dressed showcase should carry one on every card. It is optional rather than required so a page whose frame images are finished compositions can run the rail as pure imagery: omit it and the card renders no headline `p` and no scrim. Omitting it on some cards but not others is allowed but reads as unfinished — treat that as a copy gap, not a layout control.

### One frame ratio, one asset spec

The media frame is **3:4 at every viewport**. It does not change ratio at any breakpoint and takes no art-directed per-breakpoint sources.

That is a deliberate constraint in favour of the page author. A single ratio means one asset per card, composed once, correct everywhere — so a fully designed frame can be exported from Figma at 3:4 and dropped straight in as `mediaBackdropImage` with `media` omitted. Recommended export is **1200×1600** (2× a 600×800 frame). `benefits-default`'s `mediaSources` map exists because its frame ratio and crop shift between breakpoints; nothing here needs one, and adding one would reintroduce the problem this ratio avoids.

**Why 3:4 and not 4:5 or 9:16.** Measured on the eight-card fixture, with the card width the desktop clamp actually produces:

| Frame ratio | Frame at 1440×900 | Visible capture | Pinned layout | Budget | Fits |
| --- | --- | --- | --- | --- | --- |
| 4:5 | 288×360 | 240×252 (0.95) | 684px | 828px | yes |
| **3:4** | **288×384** | **240×276 (0.87)** | **708px** | **828px** | **yes** |
| 9:16 | 288×512 | 240×404 (0.59) | 836px | 828px | **no** |

4:5 leaves the visible capture almost square, which is what stops it reading as a phone. 9:16 gives a genuinely phone-shaped capture but the card no longer fits the pinned `100dvh` viewport — it overflows at 1440×900 and by 91px at 1280×800, and it fails at every card width the clamp can produce, so it is not recoverable by tuning. 3:4 is the tallest ratio that fits the pin, and it is also the ratio the reference uses at desktop.

The capture is a crop, not the whole screen: it is anchored at its own top and runs off the frame's lower edge, so a 0.87 window shows the top of a phone screenshot rather than a squashed whole one.

The one thing that must not be composed into the asset is text. When a card carries a `mediaHeadline` it is always real DOM text over the frame — it has to be readable by assistive technology, resizable by browser zoom, and translatable — never baked into the image.

**Optional.** Absence is the only signal; no `show`-style boolean.

- `eyebrow`: short label string.
- `subtitle`: supporting copy string.
- `id`: section id, defaults to `benefits-showcase`.

**Variants:** `mediaBackdrop` per item, five documented members, no default. The section exposes no CTA, no `className`, no `style`, no card-width or scroll-speed override, and no way to turn the desktop pin on or off — that is decided by measurement, not configuration.

Spacing above the title belongs to the eyebrow-to-title pair and above the subtitle to the title-to-subtitle pair, so an omitted eyebrow leaves no residual margin. `aria-labelledby` ids derive from `useId()` so the section can appear twice on one page.

## Behavior and responsive design

One DOM tree at every breakpoint. The cards are identical everywhere; only the mechanism that moves them changes, so no viewport ships the other's markup, duplicate headings, or duplicate images.

| Breakpoint | Rail |
| --- | --- |
| < 768px | Native horizontal scroll, `scroll-snap-type: x mandatory`, cards `clamp(240px, 68vw, 300px)` with a peek of the next card, 16px gap |
| 768–1023px | Same, cards `clamp(300px, 44vw, 360px)`, 24px gap |
| ≥ 1024px | Pinned; page scroll drives horizontal translation. Cards `clamp(240px, min(24vw, 32dvh), 340px)`, 24px gap |

### The desktop pin

The section renders a tall scroll track containing a `position: sticky` viewport one `100dvh` high. As the page scrolls through the track, the rail is translated horizontally by an equal number of pixels, then the pin releases and the page continues.

```
overflow  = rail.scrollWidth - viewport.clientWidth
track     = 100dvh + overflow + 20dvh          (the 20dvh is dwell on the last card)
progress  = clamp(-track.getBoundingClientRect().top / overflow, 0, 1)
transform = translate3d(calc(progress * -overflow), 0, 0)
```

Four properties this buys, all of which wheel interception would cost:

- **1:1 scroll ratio.** One pixel down is one pixel left. Nothing is accelerated, eased, or tuned, so there is no knob to get wrong and the section cannot feel heavier or lighter than the page around it.
- **Native scroll throughout.** No `wheel` listener, no `preventDefault`, no scroll snapping. The scrollbar stays truthful, trackpad momentum is untouched, Page Down and Find-in-page behave, and the section cannot trap a reader who wants to leave it.
- **Measured, not configured.** `overflow` is read from the DOM, so a short rail that already fits produces `overflow <= 0` and the section does not pin at all — it renders as a static row. Three cards at 1024px do not create a pointless pinned screen.
- **Reversible.** Scrolling up runs the rail backwards through exactly the same positions.

The scroll handler is `requestAnimationFrame`-throttled and registered `{ passive: true }`; `overflow` is recomputed by a `ResizeObserver` on the rail.

A 2px progress bar below the rail shows position through the run. It exists only in pinned mode, is not interactive, and is `aria-hidden` — every card it describes is already in the DOM.

### Reduced motion

Under `prefers-reduced-motion: reduce` the desktop pin is **not used at all**. The rail falls back to the same native horizontal scroll the small breakpoints use, and the section is its own height. A pinned viewport that translates content under a stationary scroll gesture is precisely the vestibular pattern the preference exists to suppress, so it is removed rather than shortened. Nothing else in the section animates.

### Media

The frame is 4:5 at every viewport, `overflow: hidden`, 20pt radius, Ring elevation.

- **`mediaBackdropImage`** fills the frame: `object-fit: cover`, `object-position: center`. A frame composed at 4:5 lands exactly, and an off-ratio asset is cropped rather than letterboxed.
- **`media`** is `object-fit: cover` with `object-position: center top`, horizontally centred with **24px of colour field visible down each side**, **flush to the frame's bottom edge**, and a 12px radius on its **top corners only**. It is anchored at its own top and clipped by the frame at the bottom, so a tall capture runs off the lower edge rather than ending there — which is why the bottom corners need no radius, and why the field reads as something the screen is sitting on rather than a box it floats in.

  This is the direct correction of `benefits-default`'s `contain` plus `padding: 12%`, which insets on all four sides and can never let the subject reach an edge. `cover` anchored to the top rather than `contain` is what makes the bleed real: a contained capture letterboxes itself back inside the frame and ignores the space it is given. The documented asset is a portrait capture; a landscape one will be cropped at the sides.

  The width is set explicitly rather than left to `auto` plus `justify-self: stretch`. A replaced element with an intrinsic ratio is never stretched by grid alignment, so `auto` sizes the capture to its own ratio and `cover` never engages at all.

- **The media headline** carries the frame's inset itself — 24px from the top and 24px from each side, so its distance from the frame's top edge matches its distance from the left. The gap down to the capture is 32px below 1024px and 24px at 1024px and above: below the breakpoint the card is wide relative to the frame and the headline would otherwise crowd the top of the screen.

Images carry intrinsic `width`/`height`, `loading="lazy"` (the section is below the fold) and `decoding="async"`. The first card's images load eagerly.

No loading, empty, or error state: `items` is static config, and invalid configuration renders nothing.

## Accessibility

- A labelled `section` with an `h2` intro title. The rail is a `ul`; each card is an `li` with an `h3` card title. The media headline is a `p`, not a heading — it is the problem statement, and promoting it would put two headings per card into the document outline.
- **Every card stays in the accessibility tree at all times.** Nothing is `aria-hidden` for being off-screen. This is the explicit correction of the reference implementation.
- When the rail is a native scroll container (below 1024px, and at any width under reduced motion) it takes `tabindex="0"` and `role="group"` with an accessible name, so a keyboard user can reach it and arrow through it. It receives a 2px `focusBlue` `:focus-visible` outline.
- When the rail is pinned it is **not** focusable and not a scroll container: page scroll is the only thing that moves it, and a tab stop that cannot be scrolled would be a dead control. The `tabindex` is applied conditionally on the actual mode, not the breakpoint.
- Nothing else in the section is focusable — the cards are not links or controls — so there are no hit targets or press states to satisfy, and no hover-only content.
- Every image carries `alt`. Informative captures describe what the fragment shows; a capture that only repeats its adjacent text takes `alt=""`. No text is baked into images: every claim is real DOM text.
- Text reflows at 320px and browser text zoom is not blocked.

## Acceptance checks

- [ ] Uses the Marketing Benefits Showcase Rail extension and existing system tokens; the extension is recorded in `surfaces/web.md` in this change.
- [ ] Requires `title` and three-to-eight complete items with unique ids; invalid configuration renders nothing and is reported in development.
- [ ] Each item declares exactly one media field; both or neither is invalid. `media` is required with a colour field and optional with an image field.
- [ ] Renders eyebrow and subtitle only when supplied, with no residual spacing when omitted.
- [ ] Media headline uses `ivory` on `chianti` / `sky` / `cypress` / `charcoal` and `nearBlack` on `sunflower`.
- [ ] A photographic field with a headline renders the headline scrim; a colour field, and any card with no `mediaHeadline`, does not.
- [ ] A card with no `mediaHeadline` renders no headline `p` and no scrim; a card with one renders both text and (over an image) the scrim.
- [ ] The rail keeps an equal leading and trailing gutter while it scrolls, including on iOS Safari where flex end padding is dropped.
- [ ] At 1024px and above a rail that does not pin is centred, and the intro is centred with it; a rail that pins keeps the shared left edge.
- [x] Media frame is 3:4 at every viewport, with no per-breakpoint sources.
- [x] A capture keeps 24px of colour field down each side, is centred, sits flush on the frame's bottom edge, is rounded on its top corners only, and is clipped rather than letterboxed; a backdrop image covers the frame.
- [x] The media headline sits 24px from the frame's top and sides, with a 32px gap to the capture below 1024px and 24px above it.
- [x] Every spacing value is a listed 8pt step and every type step an existing scale entry or landing-ramp row. The 24px media-frame radius is the one documented exception.
- [x] Heading, first card and progress indicator share one left edge; the indicator stays inside the container at every width.
- [ ] Below 1024px the rail is a native snap scroller with a visible peek.
- [ ] At 1024px and above the rail pins and advances 1:1 with page scroll, then releases.
- [ ] A rail that already fits does not pin.
- [ ] No `wheel` listener, no `preventDefault`, no scroll snapping in pinned mode.
- [ ] Under `prefers-reduced-motion: reduce` the pin is absent at every width.
- [ ] The scroll container is focusable and named only when it is actually scrollable.
- [ ] No card is `aria-hidden` at any scroll position.
- [ ] Reviewed in the gallery at 375, 430, 768, 1024, and 1440.
- [ ] `prompt.md` has the same Section ID and Revision as this plan.

## Implementation notes

**Revision 0.2.** Removed the frame's inset around the capture and moved it onto the media headline, so the capture is flush to the frame's side and bottom edges with only its top corners rounded. The treatment also changed from `contain`/bottom-anchored to `cover`/top-anchored: with the inset gone, a contained portrait capture would have letterboxed itself back to the same size and the change would have had no visible effect.

**Revision 0.3.** Frame ratio moved from 4:5 to 3:4 on the measurements above. The capture keeps 24px of colour field down each side and sits flush on the frame's bottom edge with only its top corners rounded; the media headline moved to an even 24px top-and-side inset. `fixtureMedia` gained an opt-in `screen` variant, because its default `panel` placeholder draws an inset ivory card that reads as a second frame inside a colour field and made the treatment impossible to review honestly.

**Revision 0.4.** Design-system audit. Intro-to-rail gap moved from 40/48 to the siblings' 48/64, with a pinned-mode reduction copied from `Marketing Process Story`; the headline-to-capture gap moved from 40px to 32px, a listed step. Both previous values were legal 8pt derivations but not entries on the documented scale. The audit found no other divergence.

**Revision 0.5.** Media frame radius 20px → 24px, recorded as a landing-only exception. The progress indicator moved to the container inset with 24px of clearance above it — it previously used `min(100%, 1120px)`, which below 1120px resolves to the full viewport and put the indicator edge to edge against the page gutter. Fixed an alignment bug found in the same pass: the desktop intro combined a 1120px box with an inset-sized padding, double-insetting the heading so it began 160px to the right of the rail's first card at 1440px. Worst-case pinned headroom at 1280×800 is 27px.

**Revision 0.6.** The 24px radius exception was promoted to a named **Marketing Landing Card Radius** in `surfaces/web.md` §4, on the strength of the same value already existing twice more under the old 20pt Card step: `benefits-default__card` and `how-it-works-default`'s media panel (both breakpoints). All three moved to 24px in the same change; foundations §5 and every in-app surface are untouched. This section's own value did not change — only its documentation status did, from exception to shared pattern.

**Revision 0.7.** Three corrections from the JustConvert integration, where the rail runs three cards of finished frame compositions with no overlaid copy:

- **`mediaHeadline` is now optional.** It was required on the argument that "a card with no headline is a screenshot with a caption". That holds for a screenshot on a colour field; it does not hold for a `mediaBackdropImage` that is a finished composition. A card that omits it renders no headline `p` and, because the scrim exists only to give that text a ground, no scrim. A dressed showcase still carries one on every card — the plan says so — but the section no longer refuses to render without it.
- **A non-pinning rail is centred at ≥1024px.** The shared left edge between heading, first card, and progress indicator is a property of the pinned, scrolling rail. When the rail is short enough that it never pins there is no scroll to anchor and no indicator, so the static row and its intro centre like every sibling marketing section. The left-edge treatment now scopes to `benefits-showcase__pinned--active`.
- **Trailing rail gutter is a flex spacer, not `padding-inline-end`.** iOS Safari drops the end padding of a flex scroll container from its scrollable region, so the last card sat flush against the viewport edge. The leading inset stays as `padding-inline-start`; the trailing inset is a zero-width `::after` flex item, which is always inside the scroll width. Both are removed in the centred non-pinning case.

**Known constraint, and how the pin defends against it.** The pinned composition must clear a caption whose height *grows as the card narrows*, because a narrower card wraps the description onto another line. Narrowing the card is therefore not a way to make the composition fit — measured, it made it 4px taller. The pin buys its headroom from chrome instead: `padding-block: clamp(24px, 4vh, 72px)`, tighter than the sibling pinned pattern's. At 1280×800 the eight-card fixture measures 634px against a 736px budget with a two-line description, and 685px with a three-line one. Below roughly 700px of viewport height the composition will still compress; `Marketing Process Story` carries the same constraint and it is accepted rather than engineered around.

**Relationship to `benefits-default`.** The two sections are siblings, not successors. `benefits-default` keeps its 16:10 frame, its anchor, and its exactly-three contract. Its own mobile media problem — a 16:10 frame plus `object-fit: contain` and `padding: 12%`, leaving ~114px of usable subject height at 375px — is real but out of scope here and should be fixed in that section's dossier.
