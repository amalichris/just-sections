# Benefits carousel plan

- **Section ID:** `benefits-carousel`
- **Revision:** `0.4`
- **Status:** Implemented
- **Products / variants:** Configurable Just landing-page feature section; `mediaBackdrop` variant per item. First expected consumer is JustConvert's main landing page

## Conversion goal

Answer "would I actually use this?" one feature at a time. `benefits-default` weighs three outcomes against each other and `benefits-showcase` scans a run of problems; this section gives each feature a full-width card and lets the reader choose which to look at. It carries no CTA.

## Inspiration extraction

- **Catalog entry:** `docs/inspiration/sections.md` → Features → *Aura — Digital protection for everything that matters*.
- **Source material:** the live section at `https://www.aura.com` (`section.section_safetyhp-digital`), measured at 375, 768 and 1440.

| | 1440 | 768 | 375 |
| --- | --- | --- | --- |
| Card | 1120×600, 560/560 split, 24px radius | 672×600, 336/336 | — |
| Type | 32px title, 18px body, text bottom-aligned | same | — |
| Selection | Title tab row, 40px arrows, 12 × 8px dots, peek of next slide | same | 12-item accordion, 343×240 image above the text |

- **Keep:** split card with text bottom-aligned; a title row that names every feature; prev/next; the accordion switch on mobile.
- **Adapt:** Aura's dark surface becomes an ivory card on parchment; dots become the tab row (a named destination, and 44px targets); the slide-with-peek becomes a 200ms fade in a fixed-height stage.
- **Exclude:** the per-card icon (would need an icon-by-name lookup), the peek, and Aura's accessibility: its arrows are unlabelled `<a>` elements and its dots are 8×8px.

## Just design-system translation

Implements **Marketing Features Carousel** (`surfaces/web.md` §9), agreed with the user on 2026-09-18 and recorded in the design system in the same change.

- Card: `ivory`, 24px Marketing Landing Card Radius, Ring elevation, `min-height: 560px`, 50/50 split from 768px.
- Tabs are pills: Warm Sand Pill (unselected, `charcoalWarm`) and `nearBlack` with `ivory` text (selected — the `surfaceInverse` role foundations §2.1 names for selected chips). Inter 16px w500 (foundations' pill-label size), 24px horizontal padding, 44px minimum height.
- Arrows: Navigation circular icon button (40px `ivory`, Ring, `charcoalWarm` Lucide chevrons at 16px, 44px hit area).
- Media panel: the Benefits Showcase backdrop rule (colour token or backdrop image, exactly one) with the Process Story stage placement (contained, centred, 24px sides, 44px top, bottom edge).
- Accordion: the Marketing FAQ trigger, divider, Plus, focus, press and 200ms disclosure; 420px media stage.
- Mobile rail: the Benefits Showcase Rail's mobile mechanics (full-width snap scroller, `clamp(240px, 68vw, 300px)` cards, 16px gap, 3:4 frames with the caption beneath).
- Backdrop photos fill their panel or frame edge to edge; mobile frames and stages carry no Ring.

## Public configuration

| Prop | Kind | Notes |
| --- | --- | --- |
| `title` | required | Section heading; also labels the tab list |
| `items` | required | 3–12 `{ id, title, description, mediaBackdrop? , mediaBackdropImage?, media? }` with unique ids |
| `items[].mediaBackdrop` | variant | `chianti` \| `sky` \| `cypress` \| `sunflower` \| `charcoal`; makes `media` required |
| `items[].mediaBackdropImage` | optional | `Media`, filled with `cover`; makes `media` optional. Exactly one of the two backdrop fields |
| `items[].media` | optional | `Media`, contained over the backdrop |
| `items[].mediaVerticalAlignment` | variant | `bottom` (default) \| `top`; top seats `media` on the panel's top edge with the 44px space below it, at every width. Any other value renders nothing |
| `eyebrow`, `subtitle` | optional | Intro copy |
| `layoutOnMobile` | variant | `accordion` (default) \| `rail`, below 768px; any other value renders nothing. Tablet and desktop always use the tabs |
| `id` | optional | Defaults to `benefits-carousel` |
| `onInteraction` | optional | `{ sectionId, interaction: 'item_selected', itemId }` when a reader makes a different item active |

Invalid or incomplete items render nothing and are reported in development.

## Behavior and responsive design

- **768px+:** intro, tab row, card stage, controls. Every card sits in one grid cell, so the stage is as tall as the tallest card and never jumps. The tab row scrolls horizontally when it overflows; selecting an item scrolls only the row (never the page) to reveal its tab. Arrows are disabled at the ends; the counter reads `n / total`.
- **Below 768px, `accordion`:** single-open accordion, first item open, description above a 420px media stage.
- **Below 768px, `rail`:** native horizontal scroll with snapping and a peek, first card on the gutter, trailing gutter kept by a flex spacer (iOS Safari drops end padding). No selection state and no `onInteraction` events.
- Both expressions are rendered and CSS picks one, so server output is identical at every width. One `activeId` drives both; if the accordion closes every item the card view shows the first.
- No autoplay. Reduced motion removes the fade, disclosure and press transitions.

## Accessibility

- WAI-ARIA tabs: `role="tablist"` named by the section heading, `role="tab"` with `aria-selected` and `aria-controls`, roving `tabIndex`, Left/Right/Home/End with automatic activation. Inactive panels are `inert` and hidden.
- Arrows are labelled buttons ("Previous", "Next") controlling the current panel; the counter is `aria-hidden` because the tabs announce position.
- Accordion triggers are buttons in `h3` with `aria-expanded`; closed regions are `inert`.
- The rail's scroll container is focusable (`tabIndex=0`), `role="group"` and named by the section title, with a `focusBlue` ring; each card has an `h3`.
- All controls: 2px `focusBlue` focus ring, 44×44px targets, 0.97 press scale.

## Acceptance checks

- [x] Follows the design system with no unapproved exceptions.
- [x] Exposes only the documented configuration and variants.
- [x] Works at 375, 430, 768, 1024 and 1440 with no horizontal page overflow.
- [x] Keyboard: Home/End/Arrow keys move focus and selection; arrows disable at the ends.
- [x] Invalid fixtures (2 items, 13 items, colour without media, both backdrops, no title, unknown `layoutOnMobile`, unknown `mediaVerticalAlignment`) render nothing.
- [x] `mediaVerticalAlignment: 'top'` seats the capture on the top edge in the card, accordion stage and rail frame; other items stay on the bottom edge.
- [x] Mobile rail: full width, first card on the heading's edge, 20px trailing gutter, no page overflow; hidden from 768px.
- [x] Reviewed in the gallery.
- [x] `prompt.md` has the same Section ID and Revision as this plan.

## Implementation notes

- **0.2:** tabs became pills (user request, 2026-09-19). Dark Charcoal only exists at 8pt, so the selected pill uses `nearBlack` (`surfaceInverse`, "selected chips"); labels moved from 14px to foundations' 16px pill-label size.
- **0.4:** added per-item `mediaVerticalAlignment: 'top'` (JustConvert request, 2026-09-24, for a converter-picker sheet that reads only from the top), mirroring Process Story's top alignment. Design system: `surfaces/web.md` §9 Marketing Features Carousel, updated the same day.
- **0.3:** added `layoutOnMobile: 'rail'` (user request, 2026-09-19; a tablet option was considered and dropped). Backdrop photos confirmed edge to edge; mobile frames and stages lost their Ring, and the gallery's photo placeholder switched to `fixtureMedia`'s `photo` variant, because the default `panel` placeholder's own inset border had read as padding and a frame.
