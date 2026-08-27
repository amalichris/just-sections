# Legal document implementation prompt

- **Section ID:** `legal-document-default`
- **Revision:** `1.2`
- **Companion plan:** [`plan.md`](plan.md)

## Preflight

1. Confirm this file and `plan.md` use the same Section ID and Revision. Stop if they differ.
2. Read `plan.md`, then `just-design-system/foundations.md` and `surfaces/web.md` §2 and §4,
   before editing code.
3. There is no inspiration folder for this section. The prior art is
   `justejari/app/src/components/LegalMarkdown.jsx` and the two `TermsPage.jsx` files — read
   them for the mechanics named in the plan, and carry across nothing else.

## Implement

Build the section exactly as described in `plan.md`.

- Render `content` with `react-markdown` and `remark-gfm`. GFM is required, not optional —
  JustConvert's privacy policy has 38 tables.
- Render every `mailto:` link as its text content, unlinked. **Do not** accept an address list,
  and do not add a `linkEmails` boolean — that is the `showEyebrow` anti-pattern the section
  contract forbids. If this needs to change, it changes here for everyone, with a `CHANGELOG.md`
  entry in `just-design-system`.
- Rewrite links matching `internalLinks` to plain `<a href>` anchors, preserving any `#fragment`.
  Accept `name.md`, `./name.md`, and `/name.md`. **Do not** use a router `Link`: that would add a
  router to the peer dependencies of every consumer.
- Everything else is external — new tab, `rel="noreferrer noopener"`.
- Do not add a `title` prop. All content, including the heading and version block, comes from
  the document.
- Wrap tables so they scroll inside their own container. The page body must never scroll
  horizontally.
- Use the shared legal table treatment: square corners, `warmSand` header cells, `ivory` body
  cells, 1px `borderWarm` grid lines, 14px Inter text, and 10px vertical / 12px horizontal cell
  padding. Keep the table surface on the cells so the grid remains visible inside the focusable
  horizontal-scroll container.
- Style the prose by targeting elements inside `.legal-document-default__container`. The section
  owns no markup class names beyond its container, because react-markdown produces the markup.

## Verify and synchronize

1. `npm run lint` and `npm run build`.
2. Review every fixture in the gallery at 375, 768, and 1024. Specifically confirm:
   - cross-links resolve to routes, and a `#fragment` survives the rewrite
   - both mailto addresses render as plain text, not as links
   - the external link carries `target="_blank"` and `rel="noreferrer noopener"`
   - the tables fixture does not cause horizontal page scroll at 375
   - the `missing-required` fixture renders nothing and logs
3. Check the plan's acceptance criteria.
4. If implementation changes a decision, update both `plan.md` and this file, then increment the
   shared Revision before completion.
