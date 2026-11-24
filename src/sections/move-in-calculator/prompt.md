# Move-in calculator implementation prompt

- **Section ID:** `move-in-calculator`
- **Revision:** `1.7`
- **Companion plan:** [`plan.md`](plan.md)

## Preflight

1. Confirm this file and `plan.md` use the same Section ID and Revision. Stop if they differ.
2. Read `plan.md`, `docs/design-system/design.md`, and `just-design-system/surfaces/web.md` §9
   "Marketing Tool Calculator" before editing code.

## Implement

Build `MoveInCalculator.jsx` and `MoveInCalculator.css` in this folder exactly as `plan.md`
describes.

- All figures and fee labels come from `assumptions`; nothing market-specific is hard-coded
  beyond the generic UI copy in the plan.
- Category colors resolve through `--mic-rent`, `--mic-back`, `--mic-fees`, `--mic-bills`, set
  from the pigment tokens in `tokens.css`.
- The year breakdown is a fixed panel, never a floating tooltip.
- Animate chart segments only for 450ms after a control tap; never on typing.
- No new dependencies. Icons from `lucide-react`.
- Report provider-neutral interactions through the existing `ProductPage` callback described in the plan.

## Verify and synchronize

1. `npm run lint` and `npm run build`.
2. Review every fixture in the gallery at 375, 768, 1024 and 1440.
3. Check the plan's acceptance criteria.
4. If a decision changes, update both files and increment the shared Revision.

## Query-safe share URLs (revision 1.7)

The existing absolute shareUrl may include configured query parameters and a fragment. Merge the current estimate parameters with URLSearchParams.set rather than concatenating another question mark. Preserve configured tags and fragments; estimate values replace any defaults. No prop, visible text, style or interaction-signal change. Host configurations own acquisition policy; the section remains provider-neutral. Verify plain URLs and query/fragment fixtures, clipboard success/failure and restored estimate values.
