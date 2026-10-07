# Section rhythm audit — 2026-10-07

Read every registered section’s root layout, padding, surface and responsive rules against the shared web surface (§4 and §9). Gallery checks prove individual sections; the product demos prove composition. This audit changes no section contracts.

| Section | Existing rhythm | Decision |
|---|---|---|
| `header-default` | Fixed navigation over hero; distinct mobile rail | Retain; not a content block |
| `hero-default` | Full viewport, media determines bottom; header clearance | Retain; no generic spacing override |
| `benefits-default` | 96/128 block padding; 100dvh minimum from 1024 | Keep viewport composition on desktop; ordinary block below 1024 |
| `benefits-showcase` | 96/128 below desktop; pinned rail and scroll runway on desktop | Retain pinned runway; ordinary block below 1024 |
| `benefits-carousel` | 96/128 block padding; controls/media are internal | Ordinary parchment block |
| `benefits-list` | 96/128 block padding; 40/48 intro-to-list gap | Ordinary parchment block |
| `value-summary` | 96/128 block padding; 40/48 intro-to-values gap | Ordinary parchment block |
| `how-it-works-default` | 96/128 below desktop; sticky steps and scroll runway on desktop | Retain pinned runway; ordinary block below 1024 |
| `how-it-works-list` | 96/128 block padding; optional contained or full-bleed photo | Ordinary parchment block; keep media treatment |
| `story-default` | 96/128 block padding; letter or split photo | Ordinary parchment block; keep reading measure |
| `pricing-banner-default` | Inverse band or inset card; card has zero outer block padding | Retain; adjacent sections supply card clearance |
| `faq-default` | 96/128 block padding; parchment or ivory | Ordinary block only for parchment; surface transition keeps both sides |
| `legal-document-default` | 96/128 outer padding, editorial content spacing | Retain; legal pages are not marketing composition |
| `footer-default` | Compact legal/navigation landmark | Retain |

## Proposed shared rule — awaiting agreement

Within `ProductPage > main`, ordinary parchment blocks that are actual adjacent siblings share one standard block of whitespace. Keep the first block’s bottom padding; remove the next block’s top padding. Below 1024 all ordinary blocks listed above participate. At 1024+ omit the viewport bento and pinned showcase/process blocks from both sides of the selector. Never bridge a surface change, CTA card, hero, legal section or another element.

Use rendered sibling selectors, not configuration indexes or wrappers, so a missing/invalid section leaves no phantom gap. Standalone gallery sections retain their padding. No `style`, `className`, spacing props, new tokens, motion or content rewrite.

## Evidence

- Initial code audit: all ordinary blocks follow 96/128px per side. Adjacent same-surface blocks therefore sum to 192/256px.
- New section galleries: all five actual iframe widths matched selected widths; no horizontal overflow.
- Further composition and consumer production-review outcomes will be recorded in verification.md before release.
