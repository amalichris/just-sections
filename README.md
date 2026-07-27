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
  main.jsx                    # Router + font imports
  index.css                   # Reset + design tokens
  App.jsx                     # Routes
  pages/JustEjariPreview.jsx  # Current preview page
  sections/                   # Reusable section library (one dossier per section)
docs/
  design-system/design.md     # Authoritative design system
  inspiration/                # Reference archive
```

See [AGENTS.md](AGENTS.md) for the section dossier workflow and design authority.
