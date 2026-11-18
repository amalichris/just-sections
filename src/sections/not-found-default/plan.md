# Not found plan

- **Section ID:** `not-found-default`
- **Revision:** `1.0`
- **Status:** Approved
- **Products / variants:** JustEjari `*` route (web PRD-003). No variants

## Conversion goal

Turn a dead link into a short way back: say plainly that nothing is here, then offer the pages
that do exist.

## Inspiration extraction

chriseder.de `NotFound.jsx`: painting banner, headline in the fade, a row of links between an
ink top rule and a light bottom rule.

- **Keep:** banner with headline in the fade; link row between two rules.
- **Adapt:** Just tokens and type (Outfit 500 title, Inter links) instead of the editorial serif.
- **Exclude:** labeled facts; links stand alone.

## Just design-system translation

Implements web §9 "Painted banner" through the shared `painted-banner` piece. Title Outfit 500,
description `textSecondary`, links Inter 500 `nearBlack` underlined in `ringWarm`, hover
`textSecondary`. Rules: `nearBlack` top, `borderWarm` bottom. Parchment page.

## Public configuration

**Required.** Missing it renders nothing and reports the omission in development.

- `title`: rendered as the page `h1`.

**Optional.** Absence is the only signal.

- `description`: copy below the title.
- `links`: array of `{ id, label, href }`. Omitted or empty renders no link row.
- `banner`: `Media`, decorative painting (`alt: ''`). Without it the content clears the fixed header with 160px top padding.
- `bannerFocal`: vertical crop position, e.g. `'60%'`.
- `id`: defaults to `not-found`.

## Behavior and responsive design

Content is a 760px column with 20px gutters. The banner is `clamp(340px, 52vw, 640px)` tall and
the content rises into its fade by `clamp(64px, 9vw, 150px)`. Links wrap on narrow screens.

## Accessibility

One `h1`. Links in a labelled `nav`, 44px targets, `focusBlue` outline. Banner `aria-hidden`.

## Acceptance checks

- [x] Follows the design system with no unapproved exceptions.
- [x] Exposes only the documented configuration.
- [x] Works at 375, 768 and 1280.
- [x] `prompt.md` has the same Section ID and Revision.

## Implementation notes

The page that uses it should set page `meta.robots` to `noindex`. Hosts serving the SPA with a
200 status make this a soft 404; the meta tag keeps it out of search results.
