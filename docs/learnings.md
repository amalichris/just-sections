# Learnings

Working notes on decisions and technical approach for this project, as they come up. Not a spec — update/replace entries as decisions change.

## Making optional section content actually optional

Config-driven sections only work if omitting a key omits the element *cleanly*. The JSX half is easy (`value ? <el/> : null`, never `&&`, so an empty string can't emit a stray node). The half that bites is CSS.

**Declare spacing on the pair, not on the element.** The sections originally spaced their content stacks with `margin-top` on each child (`h2 { margin-top: 16px }`). That reads fine until the eyebrow above it is omitted — the title keeps a margin sized for a sibling that no longer exists, and the whole block sits 16px low.

A uniform `gap` is not the fix here: the design system specifies *different* spacing per pair (16px eyebrow→title, 24px title→subtitle, 32px subtitle→CTA), and `gap` can only express one value. Adjacent-sibling selectors express exactly what's intended:

```css
.section__eyebrow + h2 { margin-top: 16px; }
```

Every pair that is actually present gets its documented spacing; an absent child leaves no residue. Worth applying to any stack where a middle child can disappear — and worth *not* applying where the optional element already carries its own top margin and is last in the stack, since there the existing rule is already omission-safe.

**Corollary:** don't add a `showEyebrow` boolean to "solve" this. A flag that can disagree with the content it gates is a bug waiting to happen; presence of the content is the flag.

## Hero background video

Full-bleed autoplay/loop video hero is a current design trend (seen in both [Finsyc](inspiration/full-landing-page-1/) and [Kelo](inspiration/full-landing-page-2/) inspiration templates — see [sections.md](inspiration/sections.md#hero)). It's a strong eye-catcher but has to load instantly and coexist cleanly with the hero title and product image — it can't be the thing users wait on.

**Hosting split:** site is hosted on Vercel; video should be hosted/served from **Bunny.net** instead of Vercel's own static hosting.
- **Why:** Vercel bills bandwidth for anything served from the app/public folder and isn't optimized for heavy binary assets — video eats the bandwidth quota fast without benefiting from edge caching the way JS/HTML does. Bunny (plain CDN storage, or Bunny Stream for adaptive bitrate + auto-generated posters) is far cheaper per GB and purpose-built for video delivery.
- **Tradeoff:** one more service to manage (separate upload step, CORS headers, no same-origin simplicity), but worth it for the bandwidth savings on a heavy asset like this.
- **How to apply:** app/UI code lives in Vercel; the hero's `<video src>` (and any other large media) points at a Bunny URL. Keep the two decoupled — don't route video through a Vercel API route or serverless function.

**Loading-fast pattern** (stolen from Finsyc's `Header 01` component, see [sections.md](inspiration/sections.md#hero)):
1. Text and product image paint immediately; the video mounts one tick later (`isMounted` state gate) so the headline/CTA animate in over a plain background first, then the video fades in behind them — no flash of missing content, no blocking on video download.
2. Video is decorative only — mark it `aria-hidden`, and keep the headline/CTA/product image as real DOM text and an optimized image (Next `<Image priority>` or equivalent) so those are what count for LCP and perceived speed, not the video.
3. Keep the file tiny: short loop (4–8s), no audio track, encoded at actual hero resolution (not 4K), `muted autoplay playsInline loop`. Bunny Stream can transcode/serve adaptive bitrate instead of hand-compressing one fixed file.
4. Add `rel="preconnect"` to the Bunny CDN domain in the document head so the connection is warm before the video request fires (same trick the inspiration templates use for Google Fonts).
5. Skip video entirely below a mobile breakpoint — swap to a static poster/gradient. Saves data/battery; mobile hero video is rarely worth the weight.

## Prompting Seedance to animate a background image

Source images: the "Premium AI Backgrounds" Figma collection (gradients + AI-generated backgrounds — see memory reference, designer [@uixhassan](https://x.com/uixhassan)). Goal is subtle ambient motion, not an obvious "video" — it should read as a living gradient, not a clip.

**Principles:**
- Describe the *motion*, not the content — the image already defines what's there; the prompt should only add movement (drift, pulse, flow, zoom), not redescribe the scene.
- Ask for restraint explicitly. I2V models default to more motion than a background needs — always specify slow/subtle/minimal, or it'll over-animate and become distracting.
- Lock the camera unless you specifically want a slow push-in. No pan/tilt/orbit/parallax — those read as "video," not "living image."
- Loops aren't guaranteed natively — generate the shortest useful clip (4–6s) and force a seamless loop in post by crossfading the last ~0.5–1s into the first (ffmpeter/editor blend), rather than trusting the model's own loop point.
- Add negative/exclusion terms: no morphing shapes, no new objects appearing, no flicker, no color-palette shift, no warping of straight lines/gradient bands, no text.

**Example prompts:**
- Flat gradient background: *"Subtle ambient motion: slow, gentle color gradient drift diagonally across the frame. Static camera, no zoom, no objects, no shapes forming or morphing. Calm, minimal, cinemagraph-style. Maintain exact original color palette. Seamless loop, 5 seconds."*
- Abstract AI/glow background (orbs, nebula-like, light streaks): *"Gentle drifting light and soft pulsing glow, extremely slow and minimal movement. Static camera, no zoom, no camera shake. Ambient loopable motion only — no new elements appearing, no flicker, no warping. 5 second loop."*
- Adding only a slow push-in instead of internal motion: *"Almost imperceptible camera zoom in, roughly 2–3% over 6 seconds, linear easing. Background contents otherwise completely static — no drift, no morphing, no parallax."*

**Workflow:** generate a few seeds per background and pick the calmest result (over-animated ones get rejected first), then run the winning clip through the same optimization pipeline above (trim, compress, no audio, upload to Bunny) before it goes anywhere near the hero.

## Consuming this library from a CI build

Two failures here look like configuration mistakes and are not. Both share a shape worth
recognising: **they succeed on a laptop and fail only in CI**, so a green local build proves
nothing about either.

**npm rewrites GitHub git dependencies to SSH, and the lockfile wins.** Declaring
`"just-sections": "git+https://github.com/..."` does not produce an HTTPS install. npm
normalises any GitHub dependency to `git+ssh://git@github.com/...` in `package-lock.json`
via `hosted-git-info`, and the lockfile is what the install actually reads. GitHub serves
anonymous traffic over HTTPS only, so a build container with no SSH key fails with
`Permission denied (publickey)` — **including on a public repository.** Regenerating the
lockfile from scratch does not help; it re-derives the same SSH URL.

The fix is to rewrite the URL at the git layer, before npm runs:

```
git config --global url."https://github.com/".insteadOf "ssh://git@github.com/" && npm install
```

Keep it in `vercel.json`'s `installCommand`, not the dashboard field, so recreating the
project does not silently lose it. If the repo is private, the rewrite carries a token
instead: `url."https://$GH_PAT@github.com/".insteadOf ...`.

To test a keyless environment without one, disable SSH and watch the URL still resolve:
`GIT_SSH_COMMAND=/bin/false git ls-remote ssh://git@github.com/<owner>/<repo>.git <tag>`.
It fails without the rewrite and succeeds with it.

**Cross-boundary `?raw` imports need `server.fs.allow`, and the symptom is inverted.** A page
config importing `../../docs/legal/*.md?raw` from outside the Vite root 403s in the *dev
server* while the *production build* succeeds. The instinct is to distrust the build; the
build is fine. Set `server.fs.allow: ['..']` in `vite.config.js`. Vercel needs the matching
"Include source files outside of the Root Directory" setting, which fails the other way
round — only in CI.
