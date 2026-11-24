# PRD-003: Acquisition links

**Status:** approved for implementation; develop only
**Author:** Codex
**Created:** 2026-11-24
**Last updated:** 2026-11-24
**Depends on:** move-in-calculator dossier revision 1.6

## 1 · Problem

Copied estimate links currently concatenate a second question mark when shareUrl already contains attribution.

## 2 · Solution overview

Merge estimate parameters into the configured public share URL without changing existing props or visual behavior.

### Visitor flow

1. Visitor sees the existing calculator/page.
2. They follow or copy a link.
3. The same destination/estimate works with accepted acquisition labels.

## 3 · Scope

One backwards-compatible internal URL merge fix, dossier revision, patch release and calculator consumer pin. No prop/token/visual change. JustConvert stays on its current version because it does not consume the calculator.

### In scope

The approved changes above.

### Out of scope

Native/product identities, backend/schema changes, production-main release and unrelated content.

## 4 · Page composition

Existing calculator and fixtures only.

### 4.1 · Route

Existing routes; no new public endpoint.

### 4.2 · Sections used

Existing move-in-calculator and current page sections; no new visual section.

### 4.3 · Config changes

Existing shareUrl becomes query-safe, no new or changed prop.

### 4.4 · Library dependency

Patch v1.27.2; no API change. Existing calculator values and callback contract remain.

### 4.5 · Content and assets

No new imagery or visible copy. Public consumer updates its data-flow/privacy docs; library stays provider-neutral.

## 5 · Responsive behavior

No visual change; existing documented breakpoints and native copy/link behavior preserved. Smoke 320/375/768/1280 and existing 1024/1440 checks where applicable.

## 6 · Accessibility

No new controls, changed labels or motion. Existing native clipboard success/failure and keyboard behavior remain. Failure never reports a successful copy.

## 7 · Performance budget

No new dependency/image/network call. URL operation is synchronous; added helper gzip under 5 kB. Existing page budgets remain; no invented Lighthouse result.

## 8 · Acceptance checks

GIVEN a plain or query-bearing shareUrl, WHEN copying an estimate, THEN all configured tags and current estimate values appear in one valid URL, fragments remain, and plain URLs remain backwards-compatible. Invalid URL fallback remains usable. Run lint/build/pack and a clipboard browser fixture. Dossier plan/prompt revisions match. Release patch on develop with immutable tag; no main promotion. Verify consumer lock SHA and production preview in Chromium/Firefox where available.
