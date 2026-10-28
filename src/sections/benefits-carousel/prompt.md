# Benefits carousel implementation prompt

- **Section ID:** `benefits-carousel`
- **Revision:** `0.8`
- **Companion plan:** [`plan.md`](plan.md)

## Preflight

1. Confirm this file and `plan.md` use the same Section ID and Revision. Stop if they differ.
2. Read `plan.md` and the design system's `surfaces/web.md` §9 *Marketing Features Carousel* before editing code.
3. The Aura source is for mechanics only. Do not copy its surface, dots, peek or icon.

## Implement

- `BenefitsCarousel.jsx` and `BenefitsCarousel.css` in this folder; register as `benefits-carousel`.
- Validate 3–12 unique items. `presentation` is `card` (default) or `unframed`. Card keeps the existing exactly-one-backdrop contract. Unframed requires `media` and forbids both backdrops. Reject unknown values with `requireProps`.
- Render the tab/card view and the accordion together; CSS switches at 768px. One `activeId` drives both.
- Tabs are pills: Warm Sand Pill unselected, `nearBlack`/`ivory` selected, Inter 16px w500.
- Tabs follow the WAI-ARIA tabs pattern with a roving tab index and Left/Right/Home/End. Reveal the selected tab by scrolling the row, never with `scrollIntoView`.
- Stack all cards in one grid cell; inactive cards are `inert`, hidden and faded over 200ms.
- The accordion reuses the FAQ trigger, icon and disclosure rules.
- `layoutOnMobile: 'rail'` renders a full-width snap-scroll rail instead of the accordion below 768px, reusing the Benefits Showcase mobile rail sizing and its trailing-gutter spacer. Validate the value.
- Backdrop photos fill their container with `cover`; no Ring on mobile frames or stages.
- An item's optional `mediaVerticalAlignment` is `bottom` (default) or `top`; validate it. `top` adds `benefits-carousel__media--top-aligned`, which moves the 44px space below the image and uses `object-position: center top` in the card, accordion stage and rail frame.
- Optional `titleOnMobile`, `subtitleOnMobile` and `items[].descriptionOnMobile` replace their defaults below 768px; validate each as a non-empty string when set. Render the heading and subtitle alternatives side by side (`benefits-carousel__copy--wide` / `--mobile`) and let CSS choose; the rail and accordion use `descriptionOnMobile ?? description`, and the rail's name uses `titleOnMobile ?? title`.
- Fire `onInteraction({ sectionId, interaction: 'item_selected', itemId })` only when the active item changes to a different one.
- Unframed removes card/media fill, Ring, radius and inset, adds a 48px desktop gap and vertically centers copy. Contain complete screenshots in a 560px desktop stage, 420px accordion stage or existing 3:4 rail stage. Default object position is top; explicit top/bottom remains available. Keep the shared tallest-slide grid and all controls. Preserve description paragraph breaks only in unframed mode.
- Add unframed accordion/rail fixtures with portrait, landscape and square media plus long copy; add invalid presentation, missing-media and forbidden-backdrop fixtures.
- No new dependencies; Lucide icons only.

## Verify and synchronize

1. `npm run lint` and `npm run build`.
2. Review every fixture in `/gallery/benefits-carousel` at 375, 430, 768, 1024 and 1440.
3. Keyboard pass and reduced-motion check as listed in the plan.
4. If a decision changes, update both files and increment the shared Revision.


## Card media hover — revision 0.7

Approved in PRD-002 and the shared Features carousel media hover extension. In card
presentation only, scale foreground/backdrop images to 1.025 on their media container's
hover, with 350ms cubic-bezier(0.32, 0.72, 0, 1). Gate both transition and transform on
hover:hover, pointer:fine and prefers-reduced-motion:no-preference. Bottom/top foreground
anchors follow attachment; backdrops center. Containers stay still and clip overflow.
Reverse immediately from the current scale on leave; no delay, bounce, cursor, click
behavior, focus stop, or touch-scroll handler. Touch-only and reduced-motion remain
static. Unframed and hero remain unchanged. Reuse existing photo, alignment, rail and
unframed fixtures; verify pointer interruption and eligibility changes in production CSS.


## Mixed screen artwork — revision 0.8 (approved 2026-10-28)

Optional per-item `mediaLayout`: `standard` (default), `wide-screen`, or `phone-screen`.
Optional `mediaOnMobile: Media` supplies a native picture source below 768px. Both are
card-only; unknown layouts, malformed media and unframed combinations render nothing.
No existing consumer configuration needs migration. No product names, assets or alt selectors
belong in library CSS. `picture` uses display:contents and foreground hover still reaches img.

Wide-screen: centered complete media, 24px insets; desktop 35/65 split and 600px minimum
height; tablet 768–1023 stacks text over a minimum 520px media area. Mobile rail card is
1.6× standard width (384–480px, 108.8vw), same 320–400px frame height as standard cards,
16px insets. Native rail scroll reveals the wider-than-viewport card; no page overflow.
Center hover anchor; existing fine-pointer/reduced-motion gates remain unchanged.

Artwork contract: wide transparent canvas 600×400, screen 560×393.943 centered. Phone
canvas 400×600, screen 360 wide; phone-screen mobile source has zero top canvas padding.
The mobile phone inset is half the frame height minus half the displayed wide screen height
(.656572 × available wide canvas width). This aligns visible top edges without rescaling
phones or leaving a gap at the bottom. Normal desktop artwork remains unchanged. Top-attached
sheets and backdrop photos retain existing placement. These are artwork proportions, not
hardware styling; the consumer owns screen corner masks and exports. Alternate media
must preserve the base canvas aspect ratio. Accordion keeps its existing stage height;
phone top-edge matching applies only to rails.

Acceptance: review default + mixed-screen fixtures at 375/430/768/1024/1440, validate
unknown layout/media rejection, stable stage, no body overflow, keyboard tabs and rail,
complete wide screens and existing pointer/reduced-motion behavior; build/lint/package audit.
