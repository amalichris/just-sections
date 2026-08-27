# Legal document plan

- **Section ID:** `legal-document-default`
- **Revision:** `1.1`
- **Status:** Implemented
- **Products / variants:** JustEjari and JustConvert, both surfaces (`parchment` default, `ivory`)

## Conversion goal

None. This section exists to make a legal document readable and trustworthy, not to move
anyone toward an action. Its measures of success are legibility, an accurate document outline,
and cross-links that resolve — a CTA here would undermine all three.

## Inspiration extraction

Not sourced from `docs/inspiration/`. The source is the two existing implementations, which had
already converged by copy-paste:

- `justejari/app/src/pages/TermsPage.jsx` + `components/LegalMarkdown.jsx`
- `justconvert/web/src/pages/TermsPage.jsx`

Both use the same structure and the same `public-page__shell` / `public-legal__content` class
names. They differ only in details.

- **Keep:** markdown rendered from the product's own `docs/legal/`, GFM enabled, cross-links
  between legal documents rewritten to routes, an empty-content guard.
- **Adapt:** the cross-link map becomes configuration with a default, rather than a hardcoded
  filename list. Mailto handling generalises from one hardcoded address to all addresses.
- **Exclude:** the hardcoded `mailto:chris@amalilabs.com` branch (dead since the contact address
  changed on 23 July 2026 — see JustEjari's `docs/legal/changelog.md`), the `trackStaticPageView`
  analytics call, which is a route concern, and the router `Link`, which would make the whole
  library depend on a router.

## Just design-system translation

Editorial typography and the 680px measure come from `just-design-system/surfaces/web.md` §2
and §4; tokens from `foundations.md` §2 and §3.

| Element | Treatment |
| --- | --- |
| Surface | `parchment` (default) or `ivory`, both flat — no card, radius, or elevation |
| `h1` | Outfit 500, 36px, 1.30 |
| `h2` / `h3` / `h4`+ | Outfit 500 at 32 / 25 / 20px |
| Body | Inter 400, 16px, 1.60, `oliveGray` |
| Links | `sienna`, `nearBlack` on hover, 2px `focusBlue` focus ring |
| Tables | Ivory surface with Ring elevation, 16px radius, parchment header row, warm divider, 14px Inter headers, 15px Inter body, 14px desktop / 12px mobile cell padding |
| Page padding | 96px block on mobile, 128px from 768px; 20 / 24 / 64px inline |

The table treatment is a shared legal-page pattern rather than a consumer override. It reuses the
same ivory surface, warm ring, parchment surface, and warm divider language used by the public
Just pages while keeping the section’s existing focusable horizontal-scroll wrapper.

## Public configuration

**Required.** Missing it renders nothing and reports the omission in development.

- `content`: the document as a raw markdown string. The consuming page performs the `?raw`
  import so the document stays in its product's `docs/legal/`.

**Optional.** Absence of the value is the only signal; there is no `show`-style boolean.

- `internalLinks`: map of markdown filename to route. Defaults to
  `{ 'privacy-policy.md': '/privacy', 'terms-of-service.md': '/terms' }`, matching what the
  `terms-and-privacy-consultant` skill emits. Supply it only when routing those documents
  elsewhere.
- `id`: element id.

**Variant.**

- `surface`: `parchment` or `ivory`; defaults to `parchment`.

**There is deliberately no `title` prop.** The document supplies its own `#` heading, effective
date, last-updated date, and version as body content, all maintained by the skill. A title prop
would be a second place to edit the same string, and the previous implementation demonstrated
exactly how that fails: it hardcoded a contact address that went stale silently when the
document changed.

## Behavior and responsive design

The section renders markdown and nothing else. There is no interactive state, no animation, and
therefore no reduced-motion behavior to accommodate.

- **Links.** A `mailto:` link renders as plain text — selectable and copyable, not clickable, so
  the address lives only in the document. A link matching `internalLinks` becomes a plain anchor
  to that route, preserving any `#fragment`; accepted forms are `name.md`, `./name.md`, and
  `/name.md`. Everything else is an external link opening in a new tab with
  `rel="noreferrer noopener"`.
- **Tables.** GFM tables are a primary path, not an edge case — JustConvert's privacy policy
  carries 38 of them. Each table scrolls inside its own container so a wide table never pushes
  the page into horizontal scroll.
- **Responsive.** One column at every width; only the measure and page padding change. The
  680px editorial measure is narrower than the 1120px landing container by design.

## Accessibility

- The document's `#` heading renders as the page `h1`. A page composing this section must not
  also emit an `h1` — a header wordmark should be a `div` or `p`.
- Heading order comes from the document. The skill produces a correct outline; this section does
  not remap levels for visual size.
- Links keep their underline. Focus is a 2px `focusBlue` outline with a 2px offset.
- Rendering an email as plain text removes a click target. That is the intended trade: the
  address remains selectable and copyable, and it stays maintained in exactly one place.

## Acceptance checks

- [x] Follows the design system with no unapproved exceptions.
- [x] Exposes only the documented configuration and variants.
- [x] Works at the required desktop and mobile viewports.
- [x] Cross-links resolve to routes; mailto links render as plain text; external links open in a
      new tab.
- [x] GFM tables render and scroll within their container at 375px.
- [x] Empty `content` renders nothing and reports the omission.
- [x] Has been visually reviewed in the gallery.
- [x] `prompt.md` has the same Section ID and Revision as this plan.

## Implementation notes

`remark-gfm` was added as a dependency. It is not optional: JustEjari's current documents use no
GFM features at all, but JustConvert's privacy policy has 38 tables and its terms have 7. Without
the plugin those render as raw pipe characters — a silent content failure in a legal document.

Internal links are plain `<a>` elements rather than router `Link`s. A full page load between two
legal documents is correct behavior, and the alternative would add a router to the peer
dependencies of every consumer of this library.
