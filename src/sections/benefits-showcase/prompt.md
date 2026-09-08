# Benefits showcase implementation prompt

- **Section ID:** `benefits-showcase`
- **Revision:** `0.6`
- **Companion plan:** [`plan.md`](plan.md)

## Preflight

1. Confirm this file and `plan.md` use the same Section ID and Revision. Stop if they differ.
2. Read `plan.md`, then `just-design-system/foundations.md` and `just-design-system/surfaces/web.md` §4–§9 before editing code.
3. Read the inspiration only for the documented mechanics in the plan's extraction table. Do not copy its palette, typography, copy, or carousel controls.

## Implement

Build `BenefitsShowcase.jsx` and `BenefitsShowcase.css` in this folder, exactly as `plan.md` describes.

### Structure

One DOM tree at every breakpoint. Do not branch the markup on viewport — the cards are identical everywhere and only the mechanism that moves them changes. CSS selects the layout; JavaScript selects the mode.

```
section[aria-labelledby]
└ div.__scroll-track                    static below 1024px, tall and relative when pinned
  └ div.__pinned                        sticky 100dvh when pinned, static otherwise
    └ div.__layout
      ├ header.__intro                  eyebrow? / h2 / subtitle?
      ├ div.__viewport                  scroll container when not pinned, overflow-hidden when pinned
      │ └ ul.__rail                      translated when pinned
      │   └ li.__card × n
      │     ├ div.__frame               3:4, ring, 24px radius (Marketing Landing
      │     │                         Card Radius), overflow hidden
      │     │ ├ img.__backdrop-image?   object-fit cover
      │     │ ├ div.__scrim?            only with a backdrop image
      │     │ ├ p.__media-headline
      │     │ └ img.__media?            object-fit contain, bottom-seated
      │     ├ h3
      │     └ p.__description
      └ div.__progress                  pinned mode only, aria-hidden. Same
                                        container inset as the intro and rail —
                                        never `min(100%, 1120px)`, which goes
                                        edge to edge below 1120px
```

### Validation

Use the shared `requireProps` guard. Reject, rendering nothing:

- missing or empty `title`
- `items` that is not an array of 3–8 entries
- any item missing a non-empty unique `id`, `mediaHeadline`, `title`, or `description`
- an item that supplies both `mediaBackdrop` and `mediaBackdropImage`, or neither
- an item with `mediaBackdrop` whose `mediaBackdrop` is not one of `chianti`, `sky`, `cypress`, `sunflower`, `charcoal`
- an item with `mediaBackdrop` and no `media`
- any supplied `media` or `mediaBackdropImage` that is not `{ src: non-empty string, alt: string }`

### The desktop pin

```
overflow  = rail.scrollWidth - viewport.clientWidth
track     = 100dvh + overflow + 20dvh
progress  = clamp(-track.getBoundingClientRect().top / overflow, 0, 1)
transform = translate3d(calc(progress * -overflow), 0, 0)
```

Non-negotiable:

- **No `wheel` listener, no `preventDefault`, no scroll snapping in pinned mode.** Native scroll drives a transform. `surfaces/web.md` §9 prohibits wheel interception for the sibling pinned pattern and the same reasoning applies here.
- Register scroll `{ passive: true }` and throttle with `requestAnimationFrame`.
- Recompute `overflow` with a `ResizeObserver` on the rail.
- Pin only when desktop **and** motion is allowed **and** `overflow > 0`. A rail that already fits renders as a static row — three cards at 1024px must not produce a pinned screen that scrolls past nothing.
- Under `prefers-reduced-motion: reduce` do not pin at any width; fall back to the native scroll container. Watch the media query live, do not read it once.

### Accessibility

- `tabindex="0"` and `role="group"` with an accessible name go on the viewport **only when it is actually a scroll container**. A focusable element that cannot scroll is a dead tab stop.
- Never `aria-hidden` a card for being off-screen. Every card stays in the accessibility tree at all times.
- `mediaHeadline` is a `p`, not a heading. Two headings per card would corrupt the document outline.
- Derive `aria-labelledby` from `useId()` so the section can appear twice on one page.
- 2px `focusBlue` `:focus-visible` outline on the scroll container.

### Constraints

- Section-local custom properties are namespaced `--benefits-showcase-*` and do not go in `tokens.css`. Only `--just-*` tokens are tokens.
- No new dependency. No `className` or `style` prop. No CTA. No arrow or dot controls.
- Ship no imagery. `fixtures.js` uses `fixtureMedia()` with `variant: 'screen'` for captures.

## Fixtures

Cover: a dressed `default`; a `minimal` with required props only that also proves the no-pin path; every `mediaBackdrop` member; a photographic field with and without a contained capture; the maximum item count; and invalid configurations marked `expectsNothing: true` for a missing title, too few items, both fields supplied, neither field supplied, and a colour field with no `media`.

## Verify and synchronize

1. `npm run lint` and `npm run build`.
2. Review in `/gallery` at 375, 430, 768, 1024, and 1440. Confirm the gallery's measured width matches the selected chip before trusting the preview.
3. At 1024+ confirm: the pin engages, the rail advances 1:1, it releases, scrolling up reverses it, and the page never traps.
4. Confirm reduced motion removes the pin at every width.
5. Register in `src/sections/registry.js`.
6. Record the **Marketing Benefits Showcase Rail** extension in `just-design-system/surfaces/web.md` §9 and add the catalog entry to `docs/inspiration/sections.md`.
7. Check the plan's acceptance list. If a decision changed, update both documents and increment the shared Revision.
