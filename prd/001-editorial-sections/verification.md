# Verification — PRD-001

## Library

- `npm run lint` and `npm run build`: pass.
- 29 transient SSR checks: all 24 fixtures, optional content omission, unique labels on repeated instances, and an invalid section omitted from composition. All pass. Expected development guard messages were observed.
- In-app Chromium gallery: `benefits-list` and `value-summary` default at 375, 430, 768, 1024, 1440; measured iframe widths equal selected widths. No horizontal page overflow.
- Four-value summary at 768: 2×2, all labels/qualifications visible. Long-copy fixtures at 320: no horizontal overflow.
- Tokens-only host with browser defaults, no reset.css and no application JavaScript: both sections render, headings/lists/margins remain local; 320px has no horizontal overflow. Repeated headings have distinct labels.
- Production preview: both product rigs render via ProductPage; full-page review at 1440 preserves hero/media and pinned scroll behavior. Further rhythm validation pending agreement.
- Development main bundle: 101.71 kB gzip at v1.11.0 baseline, 103.76 kB with the two new sections, all fixtures and both demo additions (+2.05 kB). This is a harness measurement, not a Lighthouse result or a pure runtime attribution.
- `npm pack --dry-run --json --cache /tmp/just-sections-npm-cache`: 82 files, no src/dev, docs tree, prd tree, skills or image files. Dossier Markdown/fixtures remain in the existing published section tree. No new dependencies or secrets.

## Browser limits

Firefox is running locally but computer-use access was denied. Firefox rendering is unverified; Chromium production checks do not substitute for it.

## Release and consumers

Pending release tag, lockfile SHA confirmation and production route checks. Consumer working changes must remain uncommitted except for the requested dependency pin updates.
