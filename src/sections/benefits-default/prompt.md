# Default benefits implementation prompt

- **Section ID:** `benefits-default`
- **Revision:** `0.4`
- **Companion plan:** [`plan.md`](plan.md)

## Preflight

1. Confirm this file and `plan.md` use the same Section ID and Revision. Stop if they differ.
2. Read `plan.md` and the approved Marketing Benefits Bento extension in `docs/design-system/design.md` before editing code. If a change would exceed that pattern, stop and raise it rather than inventing a value.
3. Read the cited Kelo/Finsyc/Nura Health entries and the Gemini trend PDF only for the documented bento and social-proof mechanics. Do not copy their palette, glass, video, live widgets, or copy.

## Implement

Build the configurable benefits section described in `plan.md`.

- Keep the component and local CSS in this folder. There are no section-local assets; page config supplies every image.
- Require `title` and exactly three complete items with unique ids via `requireProps`. Each item requires non-empty title and description plus shared `media` with a non-empty `src` and string `alt`; a supplied proof requires both quote and attribution. Invalid configuration renders nothing and reports the omission in development. Treat `eyebrow` and `subtitle` as optional and render each only when supplied, declaring their spacing on the adjacent-sibling pair.
- Use the shared `Media` typedef from `../types.js` for item media. Add a `proof` shape only if it is genuinely reusable; otherwise document it inline in this section's JSDoc.
- Build the grid with CSS Grid: three columns × two rows at ≥1024px with `items[0]` spanning columns 1–2 and both rows; two columns at 768–1023px with the anchor spanning both; one column below 768px.
- Cards are non-interactive `article` elements: Ring elevation, 20pt radius, `ivory`. No hover, press scale, focus ring, transition, or drop shadow.
- Render the proof line unconditionally when supplied, as `blockquote` + `cite` beneath a `borderCream` rule.
- Do not add a CTA, icons, variants, a carousel, animation, or dependencies.
- Register the section in `src/sections/registry.js` and compose it in `src/pages/justejari/page.config.js` under id `benefits`, keeping the header nav label and `targetId` in sync.
- Supply non-production preview copy and placeholder media only for visual verification. Page-owned assets live in `src/pages/justejari/assets/`, never in this folder.

## Verify and synchronize

1. Run `npm run lint` and `npm run build`.
2. Inspect `/justejari` at 375px, 768px, 1024px, and 1440px, and confirm text reflows at 320px.
3. Confirm the proof line is readable without hover, images reserve their space before loading, and no benefit is hidden at any breakpoint.
4. Check the plan's acceptance criteria.
5. If implementation changes a decision, update `plan.md` and this file together and increment the shared Revision.
