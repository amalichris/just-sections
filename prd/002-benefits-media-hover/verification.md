# PRD-002 verification — 26 October 2026

## Library

- Production build and lint passed; package dry-run lists 82 files, with no dev harness,
  docs directory, product image assets or new runtime dependencies.
- Chromium production preview: all 21 gallery fixtures at 375/430/768/1024/1440
  (105 checks) passed render-versus-invalid, loaded-image and overflow checks.
- Fine-pointer hover observed on actual production CSS: intermediate scale 1.00637,
  settled scale 1.025, return to identity after pointer leave. No JS animation.
- Computed transition 0.35s cubic-bezier(0.32,0.72,0,1); bottom origin 256px 516px,
  top-aligned origin 256px 0px. Unframed transform none and transition duration 0s.
- Touch-only and Reduce Motion safeguards reviewed in production CSS: the entire
  transform/transition rule exists only inside hover:hover + pointer:fine +
  prefers-reduced-motion:no-preference. They were not dynamically emulated; OS preference
  switching and physical touch hardware remain unverified. Narrow viewport checks are
  responsive checks, not proof of a coarse pointer.
- Firefox computer-use access was denied. Firefox rendering remains unverified.

## Consumers

Both consumers installed v1.14.1 using npm ci. Installed versions and lockfile resolved
SHAs match annotated tag commit a4087941db32b3ac365f0e36a048dce2a7ebef68. Only the root
spec and just-sections version/resolved fields changed; platform metadata was preserved.

- JustConvert commit 60b94da pushed to dev. Build/lint/17 static checks pass, including
  server-rendered content and hosting checks. Chromium production preview tested /,
  /emirates, /emirates/verify, /emirates/success, /terms, /privacy and unmatched path at
  375/768/1440 (21 checks): one h1, no overflow, broken loaded images or Markdown links.
  The unmatched-path preview used Vite's homepage SPA fallback and emitted hydration
  warnings; production 404 output/routing is covered separately by static tests.
  A subsequent /emirates check produced no new errors. /support returns 308 to canonical FAQ.
- JustConvert production hover measured 1.025 while the stage remained untransformed.
  Home/ArrowRight move tab focus and selection together; mobile rail keyboard scrolling
  works without page overflow. This is not a physical touch test.
- JustEjari commit 7d05b6e pushed to develop. Production build passes. Chromium preview
  /, /terms, /privacy at 375/768/1280 (9 checks) passes one-h1/overflow/image/Markdown-link
  checks. Legal pages have no mailto links. Initial checks preceded lazy content; rerun
  after awaiting visible h1 passed all nine. No legal content changed.
- Firefox access was denied. Coarse-pointer and reduced-motion guards were inspected in
  compiled CSS but physical touch and dynamic OS preference switching remain unverified.
- Build-story Site is not a registered repo consumer and uses excluded unframed media;
  no external Site was republished. No production-site promotion was performed.

Both Vercel staging deployments completed successfully: JustConvert dev 60b94da and JustEjari develop 7d05b6e. Verified through GitHub Vercel commit statuses on 2026-10-26.
