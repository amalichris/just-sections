# Story plan

- **Section ID:** `story-default`
- **Revision:** `0.3`
- **Status:** Implemented
- **Products / variants:** Configurable Just landing-page prose section. First expected consumer is the JustConvert Emirates campaign page (founder note)

## Conversion goal

Answer "why are they doing this?" in a person's voice. On a campaign page it is the trust answer to "what's the catch?"; on a product page it can carry any short "why" passage. It carries no CTA.

## Inspiration extraction

- **Catalog entry:** `docs/inspiration/sections.md` → Story → *Aura — Proven fastest, most reliable fraud alerts*.
- **Source material:** the live section at `https://www.aura.com` (`section.section_safetyhp-services`), measured at 375, 768 and 1440.

| | 1440 | 768 | 375 |
| --- | --- | --- | --- |
| Layout | Text 451 / photo 545, side by side | Stacked; photo full-bleed 768×768 | Stacked; 28px title; photo full-bleed square |
| Overlays | Three PNG chat bubbles overflowing the photo's right edge | Bubbles overflow the viewport | First bubble only |

- **Keep:** text column beside one photograph; stacking text-first below desktop.
- **Adapt:** the photo stays inside the landing container at every width (Marketing Split Photo); a no-photo expression becomes a letter column for founder notes.
- **Exclude:** the chat-bubble overlays (the user chose none; pre-launch they would also read as fabricated testimonials) and the full-bleed photo below desktop.

## Just design-system translation

Implements **Marketing Story** and **Marketing Split Photo** (`surfaces/web.md` §9), agreed on 2026-09-18.

- Title on the landing ramp (36/40/48/64px, Outfit 500), body Inter 16px / 18px at 768px+ in `charcoalWarm`, eyebrow in `sienna`.
- Photo: 4:5 at 1024px+, 1:1 below, `cover`, plain on the page (no frame, border, padding or elevation). Corners follow `mediaCorners`: 24px Marketing Landing Card Radius or square.
- Signature: 48px circular avatar, plain on the page with no ring; name Inter 16 w500 `nearBlack`, role Inter 14 `oliveGray`.

## Public configuration

| Prop | Kind | Notes |
| --- | --- | --- |
| `title` | required | Section heading |
| `body` | required | Prose; blank lines separate paragraphs |
| `eyebrow` | optional | Uppercase label |
| `signature` | optional | `{ name, role?, avatar?: Media }`; `name` required inside it |
| `media` | optional | One `Media` photo; its presence selects the split layout |
| `mediaCorners` | variant | `rounded` (default, 24px) \| `square`; any other value renders nothing |
| `mediaOnMobile` | variant | `contained` (default) \| `edge-to-edge` \| `hidden`, below 768px; any other value renders nothing |
| `mediaOnTablet` | variant | Same values, 768–1023px; independent of `mediaOnMobile` |
| `id` | optional | Defaults to `story` |

## Behavior and responsive design

- With `media`: text and photo side by side at 1024px+, vertically centred; stacked text-first below.
- Stacked (below 1024px), `mediaOnMobile` and `mediaOnTablet` choose per breakpoint: inside the gutters, edge to edge with square corners, or hidden with no leftover gap.
- Without `media`: a 624px column, left-aligned, centred in the container.
- No interaction and no motion.

## Accessibility

One `h2`; paragraphs as `p`; the avatar carries page-supplied `alt` (normally `""` because the name is beside it); the photo carries page-supplied `alt`.

## Acceptance checks

- [x] Follows the design system with no unapproved exceptions.
- [x] Exposes only the documented configuration.
- [x] Works at 375, 430, 768, 1024 and 1440 with no horizontal page overflow.
- [x] Invalid fixtures (empty body, signature without name, unknown `mediaCorners`, unknown `mediaOnMobile`) render nothing.
- [x] Edge to edge reaches both screen edges at 375, 768 and 1023 with no horizontal overflow; 1024px+ is unchanged.
- [x] Reviewed in the gallery.
- [x] `prompt.md` has the same Section ID and Revision as this plan.

## Implementation notes

- **0.2:** photo and avatar lose their Ring and sit plainly on the page (user review, 2026-09-19); added the `mediaCorners` variant. Gallery fixtures use `fixtureMedia`'s new `photo` placeholder, because the default `panel` placeholder draws its own inset border and read as a frame the section does not render.
- **0.3:** added `mediaOnMobile` and `mediaOnTablet` (user request, 2026-09-19).
