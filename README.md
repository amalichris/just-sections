# landing-page-trials

A library of reusable landing-page section components, composed into high-converting product
pages for JustEjari and JustConvert.

## Stack

- React 19 + Vite
- Outfit (headings) + Inter (body) via Fontsource
- GSAP + Motion
- React Router
- React Markdown
- Lucide Icons

## Setup

```bash
npm install
npm run dev
```

## Structure

```
src/
  main.jsx                    # Router + stylesheet imports
  App.jsx                     # Routes
  styles/tokens.css           # --just-* design tokens, nothing else
  styles/reset.css            # Global reset + base elements (standalone sites only)
  styles/fonts.css            # Outfit + Inter
  pages/JustEjariPreview.jsx  # Current preview page
  pages/justejari/            # Page config + every asset the page supplies
  sections/                   # Reusable section library (one dossier per section, no assets)
docs/
  design-system/design.md     # Pointer to the just-design-system repo
  inspiration/                # Reference archive
```

See [AGENTS.md](AGENTS.md) for the section dossier workflow and design authority.
