# Move-in calculator plan

- **Section ID:** `move-in-calculator`
- **Revision:** `1.7`
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
  sending (v2), provider-specific analytics.

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
- `background`: `Media`, decorative painting (`alt: ''`) behind the header and title, under a parchment veil
  (40% → 30% → 40% → solid), fading fully into the page before the tool. It reaches 160px above the
  section so it runs behind a static `header-default`. The subtitle switches to `textEmphasis` over it.
- `id`: defaults to `calculator`.
- `onInteraction`: optional callback supplied by `ProductPage`. Receives `{ sectionId, interaction, itemId }`.
  `estimate_loaded` carries `default` or `shared`. `estimate_adjusted` carries the input group
  of the first deliberate change to a valid estimate, after a tap or 450 ms of settled typing.
  `estimate_copied` carries `link` or `breakdown` after clipboard success. No input values,
  amounts, query strings or copied material are passed.

**Query string.** The link always carries the latest breakdown. `rent`, `cheques`, `type`
(`apartment`|`villa`), `beds` (0–4), `furnished` (`0`|`1`) and `agent` (`0`|`1`) are always
written; `deposit` (%), `fee` (%), `extras`, `utilities` and `other` (amounts) only when they
differ from their defaults. On load every key is read back; invalid values fall back to
defaults, and a shared `deposit` or `utilities` counts as an edit, so it is not overwritten by
the furnishing or bedroom defaults. When `shareUrl` is set, the address bar is kept in sync with
`history.replaceState` (debounced 300ms, no history entries), so copying the browser URL and
"Copy link" give the same result.

## Behavior and responsive design

- Defaults: `defaultRent`, `defaultCheques`, apartment, unfurnished, 1 bedroom, agent.
- Furnishing sets the deposit default and property type plus bedrooms set the utility estimate,
  until the visitor edits that field.
- Rent under 25,000 shows the monthly-rent hint with a "Use {annual}" Text Button.
- 1024+: inputs 7/12 left, result 5/12 sticky right; monthly rows beside the marigold summary;
  year detail panel 288px beside the chart; no total bar.
- 768–1023: single column; controls pair; result top splits total and composition; line items in
  two columns; year detail below the chart; total bar as described below.
- Total bar (under 1024px): shown only while the inputs card is on screen and the result card
  is not, the moment when a change happens out of sight. Past the result it stays hidden, so it
  never covers the later sections or the footer. After a tap that changes the total, its label
  reads "AED X less than before" or "more than before" for 2.5s, then returns to "Cash to move
  in"; typing never triggers it. A 3px rent / comes back / fees line runs along its bottom edge,
  decorative only. The bar is not a live region: the result total already announces changes.
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
- Compose it after `header-default` with `position: 'static'`: the header sits in flow and scrolls
  away, so the intro keeps its own 48px top padding (24px under 768px). v1.16.1 briefly cleared a
  fixed header with 128px; v1.17.0 returns to the static composition the owner chose.
- Copy failure is silent: the share URL stays visible as selectable text.

- Verify the optional interaction callback reports the initial source once, the first valid adjustment once, and only successful clipboard copies.

## Query-safe share URLs (revision 1.7)

The existing absolute shareUrl may include configured query parameters and a fragment. Merge the current estimate parameters with URLSearchParams.set rather than concatenating another question mark. Preserve configured tags and fragments; estimate values replace any defaults. No prop, visible text, style or interaction-signal change. Host configurations own acquisition policy; the section remains provider-neutral. Verify plain URLs and query/fragment fixtures, clipboard success/failure and restored estimate values.
