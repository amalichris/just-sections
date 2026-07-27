# Inspiration

Reference designs used as source material for landing page trials in this repo. Each entry links to the original template/component (or prompt source) and the local files captured from it.

## Full landing pages

### [full-landing-page-1](full-landing-page-1/) — Finance Management (Finsyc)
Source: https://jiro.build/templates/finance-management/finance-management-landing-page-finsyc

- [full-landing-page-prompt.md](full-landing-page-1/full-landing-page-prompt.md) — full component build prompt (10 files: Header, Metrics, Feature, ...)
- [landing-page-top-section.png](full-landing-page-1/landing-page-top-section.png)
- [landing-page-bottom-section.jpeg](full-landing-page-1/landing-page-bottom-section.jpeg)

### [full-landing-page-2](full-landing-page-2/) — AI Marketing (Kelo)
Source: https://jiro.build/templates/ai-marketing/ai-marketing-landing-page-kelo

- [full-landing-page-prompt.md](full-landing-page-2/full-landing-page-prompt.md) — full component build prompt (8 files: Hero, Features, How it Works, ...)
- [full-landing-page-except-footer.jpeg](full-landing-page-2/full-landing-page-except-footer.jpeg)

### [full-landing-page-3](full-landing-page-3/) — Precision Longevity Medicine (Nura Health)
Prompt source: [@LexnLin](https://x.com/LexnLin) on X · Live build (Arena): https://019c7839-50a1-74bc-97a0-201a156e9331.arena.site/

- [full-landing-page-prompt.md](full-landing-page-3/full-landing-page-prompt.md) — single mega-prompt design brief (not pre-written component files like the other two): full design system (Moss/Clay/Cream/Charcoal palette, Plus Jakarta Sans/Outfit/Cormorant Garamond) plus 6 named sections (Floating Island navbar, Hero, 3-artifact feature dashboard, Philosophy/Manifesto, sticky-stacking Protocol archive, Membership+Footer).
- Note: the live Arena build is a client-rendered, minified single-page bundle with no source map, so clean component source (.tsx files) isn't recoverable from it the way it was for Finsyc/Kelo — see [sections.md](sections.md) for a characterization instead, cross-checked against the live build's actual copy/colors/images.

## Sections

### [hero-section-1](hero-section-1/) — Features 01, Learn.AI
Source: https://jiro.build/components/features/features-01-learnai

- [master-prompt.md](hero-section-1/master-prompt.md) — setup prompt for pasting sections one at a time into a fresh project
- [hero-section-prompt.md](hero-section-1/hero-section-prompt.md) — the section build prompt itself
- [hero-section-code.js](hero-section-1/hero-section-code.js) — extracted component code
- [hero-section.jpeg](hero-section-1/hero-section.jpeg)
