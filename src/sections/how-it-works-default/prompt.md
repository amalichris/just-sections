# Default how-it-works implementation prompt

- **Section ID:** `how-it-works-default`
- **Revision:** `1.0`
- **Companion plan:** [`plan.md`](plan.md)

## Preflight

1. Confirm this file and `plan.md` use the same Section ID and Revision. Stop if they differ.
2. Read `plan.md`, the approved Marketing Process Story extension in `docs/design-system/design.md`, and the existing `../faq-default/` accordion implementation before editing code. If a change would exceed that pattern, stop and raise it rather than inventing a value.
3. Read the cited Finsyc/Kelo entries and the Gemini trend PDF only for the documented sticky-scroll and progressive-disclosure mechanics. Do not copy their palette, video, glass, photography, or copy.

## Implement

Build the configurable process section described in `plan.md`.

- Keep the component and local CSS in this folder. There are no section-local assets; page config supplies every image.
- Require `title` and three or four complete steps with unique ids via `requireProps`. Each step requires non-empty title and description plus shared `media` with a non-empty `src` and string `alt`; a supplied CTA requires both label and href. Invalid configuration renders nothing and reports the omission in development. Treat `eyebrow`, `subtitle`, and `cta` as optional and render each only when supplied, declaring spacing on the adjacent-sibling pair.
- Reuse the shared `Media` and `Cta` typedefs from `../types.js`. Do not add a video shape.
- Derive step numbers from array order and DOM ids from `useId()` plus each step's `id`.
- Desktop: pin the whole composition with `position: sticky` inside a taller scroll track. Nothing inside the pinned area may move as the reader scrolls — the intro, every step description, and the media frame hold still, and only the current-step marking and the displayed image change.
- Read scroll position from empty marker elements laid down the track, not from the content, which no longer moves. One `IntersectionObserver` with a centred `rootMargin` band, resolved by nearest-to-viewport-centre so entry order cannot decide it. No scroll listener, no scroll maths, no animation library — `motion` and `gsap` are installed but neither is warranted here.
- Derive track length from `--how-it-works-step-scroll`; keep the trailing half-step plus half-viewport so the last step holds before the pin releases. That custom property is the only pacing knob — do not scatter magic viewport values.
- Centre the composition in the pinned viewport as one content-sized block. Do not size the body to fill the leftover height — that strands the title and stretches the frame down the screen.
- Let both columns stretch to the step list and position the step images out of flow inside the frame, so a tall portrait capture cannot size the grid row.
- Fill the rail on the current step only, against a track running the whole list. Cross-fade segment opacity with the standard 200ms fade; do not grow, collapse, or translate rail segments.
- Keep the CTA at its intrinsic pill width (`justify-self: start`); a grid column will otherwise stretch it full width.
- Make each desktop step clickable by scrolling the page to that step's marker position. Do not set active state in the click handler: the observer must update the rail, media, and `aria-current` only when the smooth scroll reaches the step, so content cannot jump ahead of position. Clamp the first step's destination to the sticky-track start so reverse navigation cannot briefly release the composition. Use a native `button` on the step title with its hit area stretched over the block, `aria-current="step"` on the current step, and the press scale on the content wrapper. Keep the pointer cursor as the only hover affordance; do not recolor the rail or step content on hover.
- Keep the mobile accordion trigger styles on the `__trigger` class rather than a `.step button` selector, so the desktop control does not inherit them.
- Do not add `scroll-snap`, wheel/keyboard interception, or anything else that takes scroll position from the reader.
- Render all step images stacked in the frame and explicitly size them to the frame's 24px inset, cross-fading opacity with only the current image visible and the rest `aria-hidden`. Keep the visible-state selector strong enough to override the base hidden state. Keep the media change working under `prefers-reduced-motion`; remove only the transition and the rise.
- Mobile: single-open accordion with step 1 open on first render, using the FAQ's row, `Plus`, focus, press, and transition treatment. Keep open-step state internal.
- Do not add tabs, a variant enum, autoplay, a progress scrubber, page-level fixed CTAs, or dependencies.
- Register the section in `src/sections/registry.js` and cover it in `fixtures.js`, keeping the header nav `targetId` in sync with any page that composes it under id `how-it-works`.
- Supply non-production preview copy and placeholder media only for visual verification. This library ships no imagery: fixtures use `src/sections/fixtureMedia.js`, and a consuming page supplies real assets from its own department.

## Verify and synchronize

1. Run `npm run lint` and `npm run build`.
2. Inspect `/gallery/how-it-works-default` at 375px, 430px, 768px, 1024px, and 1440px, and confirm text reflows at 320px. The sticky desktop behavior needs a real viewport — the gallery renders each fixture in an iframe for exactly this reason.
3. Verify: the panel pins and tracks the centred step on desktop; the accordion opens step 1 by default and keeps one step open; keyboard activation, focus visibility, and 44px targets on every trigger; reduced motion drops transitions and press scale while media still switches.
4. Check the plan's acceptance criteria.
5. If implementation changes a decision, update `plan.md` and this file together and increment the shared Revision.
