# How it works list plan

- **Section ID:** `how-it-works-list`
- **Revision:** `0.3`
- **Status:** Implemented
- **Products / variants:** Configurable Just landing-page steps section. First expected consumer is the JustConvert Emirates campaign page (claim mechanics)

## Conversion goal

Answer "how does this work, and is it safe?" for a flow whose steps have no screen worth showing: verify, receive, redeem. `how-it-works-default` (Process Story) needs a product image per step and pins on scroll; this is the plain, fast-reading alternative. An optional CTA can close the section.

## Inspiration extraction

- **Catalog entry:** `docs/inspiration/sections.md` → How it Works → *Aura — Get started in 3 steps*.
- **Source material:** screenshot supplied by the user and the live section at `https://www.aura.com` (`section.section_safetyhp-start`), measured at 375, 768 and 1440.

| | 1440 | 768 | 375 |
| --- | --- | --- | --- |
| Layout | Text 450 / photo 540, gap 130; photo stretched to the text height, `cover`, 24px radius | Stacked; photo full-bleed 768×705 | Stacked; photo full-bleed 375×345 |
| Steps | "Step N" label column, 24px title, 18px body, divider rows | same | Label above a 20px title, 16px body |
| Heading | 44px | 44px | 28px |

- **Keep:** divided rows, a label column beside title and body, one static photo, a closing CTA.
- **Adapt:** labels derive from order as `01`–`04` (language-neutral, Process Story's number treatment); the photo stays inside the container (Marketing Split Photo); without a photo the list becomes a 624px column.
- **Exclude:** full-bleed photos below desktop, and Aura's markup — its steps are bare `div`s with no list or heading semantics.

## Just design-system translation

Implements **Marketing Steps List** and **Marketing Split Photo** (`surfaces/web.md` §9), agreed on 2026-09-18.

- Rows: `borderCream` dividers, 24px / 32px vertical padding.
- Label: Inter 12 w500 uppercase `stoneGray`, 64px column at 768px+.
- Title Outfit 20px / 25px at 1024px+; body Inter 16px / 18px at 1024px+ in `oliveGray`.
- CTA: intrinsic Sienna Brand Pill, or a page-supplied badge without pill chrome (as `pricing-banner-default` does).

## Public configuration

| Prop | Kind | Notes |
| --- | --- | --- |
| `title` | required | Section heading |
| `steps` | required | 3–4 `{ id, title, description }` with unique ids |
| `eyebrow`, `subtitle` | optional | Intro copy |
| `cta` | optional | `Cta`, including `badge` |
| `media` | optional | One `Media` photo; its presence selects the split layout |
| `mediaOnMobile` | variant | `contained` (default) \| `edge-to-edge` \| `hidden`, below 768px; any other value renders nothing |
| `mediaOnTablet` | variant | Same values, 768–1023px; independent of `mediaOnMobile` |
| `id` | optional | Defaults to `how-it-works` |

## Behavior and responsive design

- With `media`: steps beside a 4:5 photo at 1024px+, stacked text-first with a 1:1 photo below.
- Stacked (below 1024px), `mediaOnMobile` and `mediaOnTablet` choose per breakpoint: inside the gutters, edge to edge with square corners, or hidden with no leftover gap.
- Without `media`: a 624px column centred in the container.
- Rows are not controls. Only the CTA animates (press scale, hover), and reduced motion removes that.

## Accessibility

Steps are an `ol` with an `h3` per step; the visible `01` label is `aria-hidden` because list order already conveys it. The CTA has a 44px target and `focusBlue` ring.

## Acceptance checks

- [x] Follows the design system with no unapproved exceptions.
- [x] Exposes only the documented configuration.
- [x] Works at 375, 430, 768, 1024 and 1440 with no horizontal page overflow.
- [x] Invalid fixtures (two steps, duplicate ids, unknown `mediaOnTablet`) render nothing.
- [x] Reviewed in the gallery.
- [x] `prompt.md` has the same Section ID and Revision as this plan.

## Implementation notes

- **0.3:** added `mediaOnMobile` and `mediaOnTablet` (user request, 2026-09-19).
- **0.2:** the photo loses its Ring and sits plainly on the page, following the revised Marketing Split Photo rule (from the `story-default` review, 2026-09-19).
- The no-photo 624px column was added during implementation: a text-only list across the full 1120px container ran far past a readable measure. Recorded in `surfaces/web.md` in the same change.
