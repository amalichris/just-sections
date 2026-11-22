# Statement reveal implementation prompt

- **Section ID:** `statement-reveal`
- **Revision:** `0.5`
- **Companion plan:** [plan.md](plan.md)

Use the approved motion direction and existing design tokens. Register the section, render
the statement once in a heading, and tie activation to native scrolling. Verify full cover,
forward and reverse phrase progression, and the static presentation on reduced motion.

Revision 0.2: pin whichever `section` precedes the statement while the panel covers it, not only `benefits-list` panels.

Revision 0.3: parchment surface, near-black revealed type, stone-gray unrevealed type, sienna accent.

Revision 0.4: fit the heading's font size to the screen (binary search; ~90% of `100svh` minus stage padding; no word overflow; whole-word wrapping while fitted). Refit on width or `svh` change only.

Revision 0.5: remove the sticky stage, the 172svh scroll track and the pinning of the preceding section. Wrap each word in `.statement-reveal__word` and toggle `data-revealed` on the first N words from the section's progress between its top at 60% of the viewport height and its top reaching the viewport top, so the reveal completes exactly when the section fills the screen; unrevealed words are stone gray, revealed words their full phrase colour, nothing in between. Set the heading at 80% of the fitted size.
