# Statement reveal plan

- **Section ID:** `statement-reveal`
- **Revision:** `0.1`
- **Status:** Implemented
- **Products / variants:** Product-agnostic landing section

## Goal

Give the reader one uninterrupted statement after the benefits and before pricing.

## Inspiration and design

The supplied image gives the direction for muted, revealed, and accent text. The Philosophy
and Sticky Card Stack entries in the inspiration index give a type-led statement and a
native scroll cover. Use a near-black surface, Outfit heading, warm muted type, ivory
revealed type, and coral emphasis. No media, ghosted duplicate text, or decorative labels.

## Public configuration

`phrases` is a nonempty array of unique `{ id, text, accent? }` entries. Each phrase is
rendered within a single heading, with a space between phrases. `id` defaults to `statement`.

## Behavior

A full-screen panel rises over the preceding colored benefits. Keep native scroll. Scrub the
phrase colors from the moment the panel arrives until it releases, and reverse when scrolling
back. Reduced-motion and oversized text use a static readable section. The animation enhances
existing DOM text and adds no controls. Main sections after the statement scroll above the
preceding pinned benefits.

## Acceptance

Check stacking, forward and reverse reveal, no hidden text after zoom or on short screens,
and static reduced-motion presentation. Review in a production landing page at 375, 768,
and 1280px.
