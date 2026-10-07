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

- Library `v1.12.0` is an annotated tag at `1be4c85bc32850f70685cf0dd64ea1dd4efbf3aa`, pushed to main. Shared design patterns committed/pushed separately as `e89722c`.
- JustEjari: `df59857`, pushed to develop. JustConvert: `624543f`, pushed to dev. Only web/package.json and web/package-lock.json were committed in each product; all other working changes remain unstaged.
- Both manifest tags, resolved lockfile SHA and installed node_modules versions match v1.12.0. Comparison against pre-roll snapshots confirms every unrelated lockfile field stayed unchanged, including JustConvert’s libc metadata. JustEjari used npm install; JustConvert used npm ci per its documented lockfile quirk.
- JustEjari production build passes. Chromium production preview: /, /terms, /privacy at 375/768/1280; one h1 per page, no horizontal overflow, legal emails are plain text and document cross-links use route paths.
- JustConvert build/lint and 17 test:static checks pass. Chromium production preview: /, /terms, /privacy and /emirates at 375/768/1440; no horizontal overflow, legal emails plain text, correct cross-links. All six generated HTML pages also inspected at 375 with scripts removed; visible content and single h1 remain. This is a script-free copy of production output, not a browser setting change.
- Vite’s ordinary preview does not mirror Vercel’s /emirates/verify and /emirates/success file rewrites; serving homepage HTML there produced a preview-only hydration warning. A temporary /tmp preview config applied the existing Vercel rewrites, after which the campaign hydrated without errors. Direct entry to verification/success without route state returns to /emirates as designed; no email was submitted or access redeemed. The correct 404 artifact rendered; /support returned HTTP 308 to https://www.getjustconvert.com/#faq. No routing/config changes were made to either product.
- Firefox access was denied by the environment; that engine remains unverified. Lighthouse was not run. Branch pushes were confirmed; hosted deployment status was not checked.

## Remaining decision

Composition spacing remains proposed in rhythm-audit.md and was not included in v1.12.0. The asynchronous question asks whether adjacent ordinary parchment blocks should share one 96px/128px gap rather than sum to 192px/256px. Preserve excluded section patterns and standalone spacing. No response has arrived; do not treat elapsed time as approval.
