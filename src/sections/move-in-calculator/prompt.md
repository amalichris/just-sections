# Move-in calculator implementation prompt

- **Section ID:** `move-in-calculator`
- **Revision:** `1.1`
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

## Verify and synchronize

1. `npm run lint` and `npm run build`.
2. Review every fixture in the gallery at 375, 768, 1024 and 1440.
3. Check the plan's acceptance criteria.
4. If a decision changes, update both files and increment the shared Revision.
