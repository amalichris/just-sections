# Move-in calculator plan

- **Section ID:** `move-in-calculator`
- **Revision:** `1.1`
- **Status:** Approved
- **Products / variants:** JustEjari `/move-in-costs` (web PRD-002). No variants

## Conversion goal

Give someone about to rent their own answer to "how much cash do I need to move in" in seconds,
with no sign-up, then introduce the product through an optional closing card. Shareable links
carry the visitor's inputs so a result can be sent to a partner or friend.

## Inspiration extraction

No `docs/inspiration/` entry. The source is the owner-approved prototype iterated on 2026-11-08
and 2026-11-18 (claude.ai artifact "Move-in Cost Calculator", version 7).

- **Keep:** typed hero rent value with preset chips, filter-track choices, grouped result with
  composition bar, monthly costs split from one-time costs, 12-month chart with a fixed detail
  panel, plan comparison rows, sticky total bar under 1024px, query-string share link.
- **Adapt:** every market figure and fee label moves into the `assumptions` prop so a fee change
  is a page-config edit. The prototype's eyebrow above the title is dropped.
- **Exclude:** a floating tooltip on the year chart (it overflowed its card), broker-to-tenant
  sending (v2), analytics.

## Just design-system translation

Implements `just-design-system/surfaces/web.md` §9 "Marketing Tool Calculator" (approved
2026-11-18), which records every pattern below. Tokens come from `tokens.css`; the five
Mediterranean pigments are added there from foundations §2.3.

- Page: `parchment`; cards `ivory`, 24px landing radius, Ring elevation; 1120px container,
  20px mobile gutter.
- Type: Outfit 500 for the title, values and card headings; Inter 400/500 for UI; eyebrows are
  Label uppercase. No Inter 600.
- Inputs: foundations §14 standalone fields (ivory, Whisper, 12px), `focusBlue` focus border.
- Choices: Warm Sand filter track, Dark Charcoal selected segment; preset chips are Warm Sand
  pills with a 44px hit area.
- Buttons: "Copy breakdown" Sienna Brand Pill, "Copy link" and the closing-card link Warm Sand
  Pill, monthly-rent fix a Sienna Text Button. Sienna appears nowhere else.
- Money categories: rent `openSky`, refundable deposits `freshOlive`, one-time fees
  `apricotClay`, monthly bills `marigold`. Fills sit next to written labels and values with
  `nearBlack` text; they never mark controls, focus or navigation.
- Icons: Lucide `Copy`, `Link`, `ChevronDown` at 16px.
- Motion: chart segments use the web spring (400ms) only after a tap; typing is instant;
  reduced motion removes transitions and press scale.

## Public configuration

**Required.** Missing either renders nothing and reports the omission in development.

- `title`: page heading, rendered as the page's `h1`. The section opens the page; compose it
  directly after the header with no hero.
- `assumptions`: market figures.
  - `currency` string; `rentPresets` number[]; `defaultRent` number
  - `chequeOptions` number[] (each must divide 12); `defaultCheques` number
  - `depositPercent` `{ unfurnished, furnished }`; `agentFeePercent`; `vatPercent`
  - `utilityDeposit` `{ label, apartment, villa }`
  - `connectionFee`, `registrationFee` `{ label, amount, note? }`
  - `housingFee` `{ label, percent, note? }` — monthly fee = annual rent × percent / 12
  - `utilityEstimates` `{ label, apartment: number[5], villa: number[5] }` indexed studio, 1, 2, 3, 4+

**Optional.** Absence is the only signal.

- `subtitle`: copy below the title.
- `aside`: `{ title, body?, cta: Cta }` closing card after the comparison. Needs `title` and `cta`.
- `disclaimer`: string[] fine print.
- `shareUrl`: absolute page URL. Enables "Copy link" and the visible share URL. Omitted, neither renders.
- `id`: defaults to `calculator`.

**Query string.** On load the section reads `rent`, `cheques`, `type` (`apartment`|`villa`),
`beds` (0–4), `furnished` (`1`), `agent` (`0`). Invalid values fall back to defaults.

## Behavior and responsive design

- Defaults: `defaultRent`, `defaultCheques`, apartment, unfurnished, 1 bedroom, agent.
- Furnishing sets the deposit default and property type plus bedrooms set the utility estimate,
  until the visitor edits that field.
- Rent under 25,000 shows the monthly-rent hint with a "Use {annual}" Text Button.
- 1024+: inputs 7/12 left, result 5/12 sticky right; monthly rows beside the marigold summary;
  year detail panel 288px beside the chart; no total bar.
- 768–1023: single column; controls pair; result top splits total and composition; line items in
  two columns; year detail below the chart; total bar shows while the result is off screen.
- Under 768: everything one column; "per year" suffix hidden; chart labels on the move-in and
  selected month only.
- Year chart: hover previews a month, tap or focus selects it, leaving returns to the selection.
  Other bars dim to 35% while previewing or focused. Changing cheques resets to the move-in month.
- Plan rows: tap selects. On hover-capable pointers a breakdown card shows above the row.

## Accessibility

- One `h1` (title); `h2` per card. Choices are `button`s with `aria-pressed` in labelled groups.
- Total and year detail are `aria-live="polite"`.
- Year bars are focusable `role="button"` with full `aria-label`s; Left and Right arrows move
  between months.
- 44×44px targets; `focusBlue` outline on keyboard focus.
- Reduced motion: no transitions, no press scale.

## Acceptance checks

- [x] Follows `docs/design-system/design.md` with no unapproved exceptions.
- [x] Exposes only the documented configuration.
- [x] Works at 375, 768, 1024 and 1440.
- [x] Keyboard path, arrow keys on the chart, reduced motion.
- [x] 44×44px minimum interactive targets; no imagery.
- [x] Visually reviewed in the gallery and on JustEjari `/move-in-costs`.
- [x] `prompt.md` has the same Section ID and Revision.

## Implementation notes

- Static registry import: no heavy dependency, so it does not earn a lazy entry.
- The intro's top padding (128px, 104px under 768px) clears the fixed `header-default`, matching
  the legal pages. Added in v1.16.1 after the first consumer check.
- Copy failure is silent: the share URL stays visible as selectable text.
