# TODO — Graduate the section library into the product repos

**Status (2026-08-26): Phases 0–3 complete except T3.4.** Priorities changed: JustConvert is
now the first live site on this shared foundation, not JustEjari (see T3.4 below — its old
"wait for JustEjari to prove itself in production" gate is retired). What remains is T3.4 itself,
deployment configuration for JustEjari in dashboards we do not control from here, one motion
cleanup blocked upstream (T4.1, outside the gate), and this file's own retirement.

The goal was to turn a personal landing-page trial into a shared, versioned section library
consumed by each product's `web/` department, and to collapse four diverging `design.md`
copies into one layered design system. Both happened.

---

## Done

Brief by design. The reasoning lives where it is useful now: `docs/learnings.md` for
reusable insights, each section's `plan.md` for its own decisions, `web/AGENTS.md` in
JustEjari for department rules, and git history for everything else.

### Phase 0 — Reconcile the design system ✅

Split the shared `design.md` into three layers and gave the top two their own repo,
`~/Programming/just-design-system`: `foundations.md` (platform-agnostic brand truth) plus
`surfaces/{web,ios,miniapp}.md`. Each product's `docs/design-system/` now keeps only its own
component specs. Adopted `--just-*` as the family token namespace.

Full git history could not be preserved across three source repositories, so provenance is
recorded in the new repo's `README.md` and `CHANGELOG.md`.

### Phase 1 — Make this repo a publishable library ✅

Split `index.css` into `tokens.css` / `reset.css` / `fonts.css`; applied `--just-*`
throughout; replaced the one Vite-only API in library code; evicted every product asset;
built the section gallery; configured the package manifest; built `legal-document-default`;
renamed the repo. Tagged `v0.1.0` on `main`.

Worth remembering: the gallery previews in an **iframe** because a width-constrained `div`
does not trigger media queries, and it displays the measured width so a wrong breakpoint
cannot pass silently. `legal-document-default` is the registry's one lazy section — it costs
+47.6 kB gzipped and only legal pages render it.

### Phase 2 — Create the JustEjari `web/` department ✅ (except T2.5 dashboard steps)

`justejari/web/` composes the landing page and both legal pages from configuration against
`just-sections@v0.1.0`, and implements no sections. The Mini App stopped serving public web
pages: its legal pages, its trial landing page (~2,200 lines), and three orphaned
dependencies were removed.

The page config needed **no rewriting** — a config names sections by `type` string and the
registry resolves them, so it moved verbatim. That is the composition contract working.

This repo now serves `/` from a fixture-built demo page in `src/dev/`, so `ProductPage`
still gets a whole-page check without the library owning product content.

### Phase 3 — Downstream consumers ✅ (except T3.4)

Source map, root `AGENTS.md`, and tree snapshot updated for two departments. Five section
dossiers re-synced with the moved page, both documents each, shared revisions bumped.

---

## Open

### T2.5 — Finish the deployment

The web project builds and renders on its `*.vercel.app` URL. **Everything below is dashboard
or DNS work.** Nothing here needs a code change; the repo side is done.

Verified 2026-07-28 — these are facts, not assumptions:

- `justejari.ae` and `www` resolve to Vercel (`216.198.79.1`) but **no project claims them**.
  Port 80 answers `X-Vercel-Error: DEPLOYMENT_NOT_FOUND` and there is no TLS certificate, so
  HTTPS fails the handshake outright.
- `app.justejari.ae` has **no DNS record at all** — confirmed against the local resolver,
  Cloudflare, and Google.

So nothing has ever been served on either domain. There is no live traffic to protect, no
downtime window, and no ordering constraint.

**Remaining steps:**

1. **Attach `justejari.ae` + `www`** to the web Vercel project.
2. **Create DNS for `app.justejari.ae`** and attach it to the app project. Until it exists,
   `isMiniAppContext()`'s `app.` hostname check never fires — the Mini App works only because
   Telegram supplies `initData`.
3. **Set `PUBLIC_PARTY_LINK_BASE_URL=https://app.justejari.ae`** in the Supabase Edge Function
   environment. One variable drives both `partyUrl()` and `vaultUrl()`.
4. **Repoint BotFather** at the `app.` URL once it resolves.
5. **Confirm** a freshly issued party link opens on `app.justejari.ae`, and that an apex
   `/p/` URL redirects there.

**Then, after 2026-08-27:** delete the `/p/:token` and `/v/:token` redirects from
`web/vercel.json`. They exist only for links already sent to recipients before the cutover —
party links expire after 3 days, vault invitations after 30, so 31 days clears every one.
See `web/AGENTS.md` § Domains.

### T3.4 — Build JustConvert's web department on just-sections

**Status: open, in progress — JustConvert is now the first live consumer.** The original gate
("wait until JustEjari has run in production for a while") is retired: priorities changed, and
JustConvert goes live on this foundation first. JustEjari's `web/` department is left exactly as
it is — a working, decoupled page config pinned to a git tag — and stays ready to deploy
whenever T2.5's DNS work lands. Going second does not mean it is at risk; nothing here touches it.

Unlike the original framing, this is not a migration of a hand-rolled landing page — JustConvert's
`web/` currently has **no landing page**; `/` redirects to `/support`
(`docs/architecture/web-architecture.md` documents that redirect as the intended target, which
this work supersedes and must update in the same change).

Legal filenames are already converged — `docs/legal/privacy-policy.md` and
`terms-of-service.md` already match JustEjari's convention. That part of this task is done; the
line above describing `20260520_..._v2-1.md` names was stale.

**Then do:**

- `justconvert/web/src/styles/web-public.css` declares the same palette under
  `--public-color-*` (verified identical hex values, lines 24–39). Point it at
  `just-sections/styles/tokens.css` and delete the local palette.
- Add `just-sections` as a pinned dependency and build
  `src/pages/justconvert/page.config.js` composing header/hero/benefits/how-it-works/
  pricing-banner/faq/footer from real product-brief content, mirroring JustEjari's pattern.
- Resolve the CTA contract gap: sections render every `Cta` as the Sienna Brand Pill text
  button; JustConvert needs its primary CTA to be Apple's official App Store badge image
  instead. Needs a design decision before implementation (see conversation/plan.md once
  agreed) — do not invent a one-off button style for it.
- Wire `/` to the composed page, replacing the redirect to `/support`, and update
  `web-architecture.md` accordingly.

**Outcome:** one palette definition across both products, one legal-document filename
convention, and a real JustConvert landing page. This is the payoff — until it lands, the
family design system is still theoretical.

### T4.1 — Tokenize motion in `tokens.css`

**Gate status: blocked on `just-design-system`.** `tokens.css` may not originate a value — its
own header says to propose to foundations first — and `surfaces/web.md` §7 publishes motion as a
table of CSS strings rather than named tokens. Until that table becomes tokens, there is nothing
here to bind to.

**The problem.** `tokens.css` tokenizes every color and every font, and no motion value. The
family curve and its durations are pasted as literals through the section stylesheets instead:

| Literal | Count | Where |
|---|---|---|
| `cubic-bezier(0.32, 0.72, 0, 1)` | 21 | `header-default` 10, `how-it-works-default` 6, `pricing-banner-default` 3, `faq-default` 2 |
| `200ms ease-out` | 14 | across the same section stylesheets |
| `100ms ease-out` | 7 | across the same section stylesheets |

42 motion literals. Changing the family curve means editing every one of them here, and the same
again in every other consumer. That is precisely the drift `--just-*` was adopted to stop; it
just was never applied to motion.

**Then do:**

- Add `--just-ease-spatial`, `--just-duration-spatial`, and `--just-duration-disclosure` to
  `tokens.css`, transcribed with their `surfaces/web.md` §7 source, next to the existing
  `--just-transition-*` values.
- Replace all 42 literals with those tokens. Behaviour must not change — the values are
  identical. This is a naming change, and a diff that alters a single rendered frame is wrong.
- Leave the per-section `prefers-reduced-motion` blocks alone. They are already correct.

**Outcome:** the family curve becomes changeable in one place, and motion stops being the one
part of the design system this repo still hard-codes.

**Worth knowing:** this repo's motion is otherwise fully compliant — correct curve, correct
durations, per-section reduced-motion handling, and no scripted animation at all. This task is
about where the values live, not what they are.

**Raised by** AmaliLabs PRD-001 (terminal holding page), which hit the same gap from the other
side and had to transcribe the values into its own `index.css`. It filed seven motion proposals
to `just-design-system` — see `amalilabs/docs/design-system/design.md` § Proposals; this is #7,
and it is the prerequisite for this task.

**Not part of the verification gate below** — it does not block retiring this file. If `TODO.md`
is retired first, move this task to `docs/learnings.md`.

### Verification gate

The migration is done when all of these hold:

- [ ] Exactly one file in `~/Programming` defines the brand palette — waits on T3.4
- [ ] `just-design-system/surfaces/` holds `web.md`, `ios.md`, `miniapp.md`; a second app on
      any surface could be built to brand without reading an existing product's source
- [ ] Neither product's `docs/design-system/` contains a surface convention — only its own
      component specs. **JustEjari done**; JustConvert waits on T3.4
- [x] `grep -rn 'var(--' just-sections/src | grep -v 'var(--just-'` → empty
- [x] `npm pack --dry-run` ships no dev harness, docs, or assets — 52 files, 53.7 kB
- [x] `find just-sections/src/sections -name '*.png' -o -name '*.svg'` → empty
- [x] `/gallery` renders every registered section — 8 of 8
- [ ] `justejari/web` builds and **deploys** — builds and deploys on Vercel; the apex half
      waits on T2.5
- [ ] Both products serve `/terms` and `/privacy` from their `web/` department.
      **JustEjari done**, verified at the DOM: one `h1` per page from the document, zero
      `mailto:` links, cross-links resolving to routes, no stray `.md` hrefs. JustConvert
      waits on T3.4
- [x] No legal page component remains in `justejari/app/`
- [x] `justejari.md` source map lists both departments, dated
- [ ] Neither product's design doc contains a color hex value — JustEjari done; JustConvert
      waits on T3.4

### Closing task — retire this file

**Do this last, once the gate above is green.** Delete `TODO.md`. `README.md` has already
been rewritten as the repo's real entry point, so nothing here needs to move into it — this
file just stops being true.

---

## Open questions

1. ~~**Repo hosting.** Public or private?~~ **Answered: public** (2026-07-27). It started
   private; T2.5's first deploy failed on `Permission denied (publickey)`, and public was
   chosen over a read-only PAT.

   Every commit was scanned before flipping: no secrets, no `.env` ever tracked, and the only
   real addresses are `chris@justejari.ae` and `chris@amalilabs.com`, both already published
   in the live legal documents. What is deliberately exposed: this file, `docs/inspiration/`,
   and every section dossier's `plan.md` / `prompt.md`.

   Note that repo visibility is unrelated to `package.json`'s `"private": true`, which only
   blocks `npm publish`. Consumers install from the git tag, so that flag stays.

2. **`just-design-system` as a skill.** It sits in `skills/` without a `SKILL.md`, so it is
   not a functioning skill. Now that it is docs-only at family level, does it stay a passive
   doc repo, or get a real `SKILL.md` that maintains itself the way `product-docs` does?

3. ~~**Versioning discipline.**~~ **Answered (2026-07-28):** the `publish-just-sections` skill
   owns the release workflow, the version policy, and the per-consumer checklist;
   `CHANGELOG.md` exists with `v0.1.0` recorded. Release types mirror the App Store skill's
   shape — no release / patch / feature / major — and a section prop change is always at least
   a **feature** release, because `requireProps` turns a drifted page config into a silently
   absent section in a production build.

   Still true: **nothing enforces it.** The skill is a procedure, not a gate — no CI check
   fails if someone tags without a CHANGELOG entry, or edits a prop and ships a patch. Worth
   revisiting if that starts happening.

4. **`just-ios-kit` — when?** `surfaces/ios.md` documents the shared iOS conventions, but the
   code still lives in `justconvert/ios/…/DesignSystem/`. The symmetric move is a Swift
   package holding `Theme`, `Typography`, `Spacing`, `Motion`, `Haptics`,
   `PressScaleButtonStyle`, `CircularIconButtonStyle`, and `SheetContentHeightKey`.

   **Recommendation: document now, extract later.** The doc is what a second iOS app needs to
   start; the package is what stops two apps drifting. With one iOS app there is nothing to
   drift from, and extracting against a single consumer risks baking JustConvert's
   assumptions into the shared API.

   Deliberately the opposite call from web, where extraction happened immediately — two web
   consumers already existed, so the shared API was constrained by reality from the start.
