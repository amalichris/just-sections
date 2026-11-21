# Statement reveal plan

- **Section ID:** `statement-reveal`
- **Revision:** `0.4`
- **Status:** Implemented
- **Products / variants:** Product-agnostic landing section

## Goal

Give the reader one uninterrupted statement after the benefits and before pricing.

## Inspiration and design

The supplied image gives the direction for muted, revealed, and accent text. The Philosophy
and Sticky Card Stack entries in the inspiration index give a type-led statement and a
native scroll cover. Use the parchment page surface, Outfit heading, stone-gray muted type (3.31:1), near-black
revealed type, and sienna emphasis (revision 0.3; 0.1-0.2 were near-black with ivory and coral.
Coral is 2.83:1 on parchment, under the 3:1 large-text floor, so the accent moved to sienna, 3.93:1). No media, ghosted duplicate text, or decorative labels.

## Public configuration

`phrases` is a nonempty array of unique `{ id, text, accent? }` entries. Each phrase is
rendered within a single heading, with a space between phrases. `id` defaults to `statement`.

## Behavior

A full-screen panel rises over the preceding section, whichever section it is (revision 0.2; 0.1 pinned only `benefits-list` panels). Keep native scroll. Scrub the
phrase colors from the moment the panel arrives until it releases, and reverse when scrolling
back. Reduced-motion and oversized text use a static readable section. The animation enhances
existing DOM text and adds no controls. Main sections after the statement scroll above the
preceding pinned benefits.

## Acceptance

Check stacking, forward and reverse reveal, no hidden text after zoom or on short screens,
and static reduced-motion presentation. Review in a production landing page at 375, 768,
and 1280px.

**Revision 0.4:** the statement is sized to the screen. Script picks the largest font size at which the heading fills about 90% of the small-viewport height (`100svh` less the stage padding) with no word wider than the line, refitting only when width or `svh` changes. On phones the longest word usually sets the size; on wide screens the height does. The CSS clamp remains the no-script fallback.
