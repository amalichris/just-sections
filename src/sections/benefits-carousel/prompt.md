# Benefits carousel implementation prompt

- **Section ID:** `benefits-carousel`
- **Revision:** `0.3`
- **Companion plan:** [`plan.md`](plan.md)

## Preflight

1. Confirm this file and `plan.md` use the same Section ID and Revision. Stop if they differ.
2. Read `plan.md` and the design system's `surfaces/web.md` §9 *Marketing Features Carousel* before editing code.
3. The Aura source is for mechanics only. Do not copy its surface, dots, peek or icon.

## Implement

- `BenefitsCarousel.jsx` and `BenefitsCarousel.css` in this folder; register as `benefits-carousel`.
- Validate with the Benefits Showcase media-field rule (exactly one backdrop; a colour requires `media`) and 3–12 items with unique ids; guard with `requireProps`.
- Render the tab/card view and the accordion together; CSS switches at 768px. One `activeId` drives both.
- Tabs are pills: Warm Sand Pill unselected, `nearBlack`/`ivory` selected, Inter 16px w500.
- Tabs follow the WAI-ARIA tabs pattern with a roving tab index and Left/Right/Home/End. Reveal the selected tab by scrolling the row, never with `scrollIntoView`.
- Stack all cards in one grid cell; inactive cards are `inert`, hidden and faded over 200ms.
- The accordion reuses the FAQ trigger, icon and disclosure rules.
- `layoutOnMobile: 'rail'` renders a full-width snap-scroll rail instead of the accordion below 768px, reusing the Benefits Showcase mobile rail sizing and its trailing-gutter spacer. Validate the value.
- Backdrop photos fill their container with `cover`; no Ring on mobile frames or stages.
- Fire `onInteraction({ sectionId, interaction: 'item_selected', itemId })` only when the active item changes to a different one.
- No new dependencies; Lucide icons only.

## Verify and synchronize

1. `npm run lint` and `npm run build`.
2. Review every fixture in `/gallery/benefits-carousel` at 375, 430, 768, 1024 and 1440.
3. Keyboard pass and reduced-motion check as listed in the plan.
4. If a decision changes, update both files and increment the shared Revision.
