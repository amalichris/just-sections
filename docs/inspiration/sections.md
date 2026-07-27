# Section Catalog

A breakdown of every section captured in [inspiration](index.md), grouped by section type so similar sections can be compared side by side. Sources: Finsyc (finance-management template, [full-landing-page-1](full-landing-page-1/)), Kelo (AI-marketing template, [full-landing-page-2](full-landing-page-2/)), Learn.AI/Fluently ([hero-section-1](hero-section-1/)), and Nura Health (precision-longevity-medicine template, prompt by [@LexnLin](https://x.com/LexnLin), [full-landing-page-3](full-landing-page-3/)).

Nura Health's characteristics below are verified against its real component source (`nura-health-landing-page-architecture/`) — an earlier pass had guessed some copy/numbers from the live build's minified JS bundle (no source map was available at the time), and those guesses turned out wrong in a few places (e.g. Membership pricing, several headlines) once the real source arrived; this version has been corrected against it.

## Navbar

Both Finsyc and Kelo bundle their navbar into the same component file as their hero body (Learn.AI has no navbar at all — it's a mid-page section). Broken out separately here since they're conceptually distinct pieces of UI.

### Finsyc — Header 01 (nav)
Nav sits directly in the hero's video-bg area, no pill/floating treatment — just a plain row: logo left, inline text links center (`Home, Features, Pricing, About, Blogs`, with "Home" bold/full-opacity and the rest at 80% opacity until hover), and on the right a **glass pill CTA button** (`bg-white/10 backdrop-blur-sm border-white/40`) that reverses icon↔text order on hover via `layout` + spring. Fades/slides in from `y:-20` on mount (0.2s delay).
Copy: *"Get Started"*.

### Kelo — Hero (nav)
Nav is a **fully separate floating rounded-full glass pill** (`bg-white/5 backdrop-blur-xl border-white/10`), absolutely centered and offset from the top (`top-6`, `max-w-5xl`), distinct from the hero content below it. Logo left, nav links center-absolute (`Features, Solutions, Pricing, About` with an underline-grow hover effect), "Log in" text button + solid white pill "Get Started" button right (scales up on hover/down on click). Fades/slides in from `y:-20, opacity:0` (0.8s).
Copy: *"Log in"* · *"Get Started"*.

### Nura Health — Floating Island (nav)
A fixed pill container, but with a state Finsyc/Kelo don't have: it **morphs on scroll** — transparent with cream text over the hero, transitioning to a `bg-cream/70 backdrop-blur-xl` glass pill with moss-green (`#2E4036`) text and a subtle `border-moss/15` once scrolled past 60px. CTA reads *"Begin Audit"*.

**How they differ:** Finsyc's nav is unboxed and sits flush in the hero's top padding; Kelo's is a distinct floating capsule detached from the page edges but stays visually constant; Nura Health's is the only one that changes appearance based on scroll position (transparent → glass), rather than being static once mounted. Both Finsyc and Kelo use a translucent-glass CTA, Finsyc's with the icon-reversing hover trick reused across its whole template.

## Hero

### Finsyc — Header 01 (hero body)
Full-viewport (`min-h-[800px] lg:min-h-[900px]`) hero with an autoplay/loop MP4 background video and a logo marquee below the fold. Colors: `#042718` deep green-black text/CTA over white. Fonts: Inter (body), Onest (headline), Playfair Display italic (accent word). Motion: staggered fade/slide-up entrance, infinite linear marquee (`x: ["0%","-50%"]`, 25s) of partner logos with gradient-mask fade-out edges.
Copy: *"Control Your Money with **AI-Powered** Insights"* · *"Get 14-days free trial"*.

### Kelo — Hero (hero body)
Black, `min-h-[110vh]` hero with a slow-motion (`playbackRate=0.6`) video bg. Instead of a marquee, the hero image is a **fully simulated SaaS dashboard mockup** — sidebar nav, an SVG line chart that draws in (`pathLength` animation, 2s), animated bar-height growth, legend — inside a `rounded-[40px]` glass panel. Motion: staggered container/item variants (staggerChildren 0.1, delayChildren 0.6).
Copy: *"Let AI take your sales to the **next level**"* · *"Get 14 Days Free Trial"* · *"No Credit Card Required"*.

### Learn.AI — Hero *(lives in `hero-section-1/`; template itself is titled "Features 01 Learn.AI"; no navbar)*
All-white canvas with two soft ambient blur blobs (`#E6F8F2`, `#00B782`@5%, blur 100–120px). Oversized two-tone Syne headline (`#1E332D` + `#00B782` accent span) over a muted Inter paragraph. A **floating product screenshot** rises in on scroll (`y:120→0`), followed by a bordered card of **10 inline-SVG messaging-platform logos** (Skype, Slack, Zoom, Meet, Teams, WhatsApp, Telegram, Discord, Google Chat, Messenger) that cascade in via spring stagger. Bottom badge has a continuous `animate-ping` dot. Flag: imports `lucide-react` icons it never renders.
Copy: *"Get AI feedback on your **real-life** calls"* · *"Fluently supports every meeting platform"*.

### Nura Health — Hero *("Nature is the Algorithm")*
100dvh, full-bleed moody dark-forest photo (Unsplash) under a layered Moss (`#2E4036`)-to-charcoal gradient + radial vignette — photographic, not video, unlike Finsyc/Kelo. Content is pushed to the bottom-left, not centered. Typographic contrast is the headline device: "Nature is the" in bold sans (Plus Jakarta Sans/Outfit) vs. "**Algorithm.**" in massive serif italic (Cormorant Garamond, up to `text-[13rem]`) — a two-typeface clash rather than a two-tone color clash. A vertical side label mid-right shows literal geo-coordinates (`47.6062° N · 122.3321° W`) as a clinical-instrument flourish. GSAP timeline staggers eyebrow → headline word-by-word → subhead → CTAs → meta strip in sequence (vs. Finsyc/Kelo's framer-motion variants).

Below the CTAs, a **4-column "hero meta strip"** (numbered 01–04, `bg-charcoal/40 backdrop-blur-md` tiles) does double duty as this template's Metrics section rather than being a separate one: *Diagnostic Vessels* (847 biomarkers) · *Mean Onboarding* (11.4 days) · *Members Audited* (2,341) · *Protocol Adherence* (94.6%).
Copy: *"Nature is the **Algorithm.**"* · *"A clinical boutique rewriting performance medicine. We decode your biology and engineer protocols that compound like interest."* · *"Reserve Intake"* · *"Watch the Protocol"*.

**How they differ:** Finsyc sells trust via a real product screenshot + endless logo marquee; Kelo sells sophistication via a self-animating fake analytics dashboard; Learn.AI leads with a single floating screenshot plus a staggered icon-cascade card; Nura Health is the only one built on a full-bleed photographic background (not video, not a product mockup) and a serif/sans typographic clash instead of a color-based two-tone headline. Kelo's dashboard mockup, Learn.AI's icon-grid cascade, and Nura Health's photo+serif-clash hero are each unique to their own template.

## Features

### Finsyc — Feature 01
White bg, 2×2 grid of cards, each with a looping **video background at 50% opacity** behind an SVG UI mockup that parallax-lifts on hover (`group-hover:translate-y-[-10px]`). Icon chips tinted `#198F38`. Fonts: Onest/Inter/Playfair italic accent.
Copy: *"Master Your Money with Smart **features**"* · cards: "Smart Expense Tracking", "Predictive Analytics", "Security By Design", "Instant Fast Transfers".

### Kelo — Features
White bg, asymmetric **bento grid** (2×2 large + 2×1 + two 1×1 cells) with hairline dividers, accent `#00bc7d`. Each cell runs a live mini-demo: clickable tabs driving a randomized animated bar chart, a fake terminal/GraphQL block with a blinking cursor, and counter-rotating dashed orbit rings (`spin_10s` / `spin_15s_reverse`) around an avatar stack with a live "Alex is editing…" cursor badge.
Copy: *"Engineered for Unrivaled Performance"*.

### Nura Health — Precision Micro-UI Dashboard
Three "functional surfaces" instead of cards-with-icons, each with real underlying data rather than placeholder copy: **(1) Diagnostic Shuffler** (`AuditIntelligenceCard`) — cycles through 4 detailed biomarker readouts (Epigenetic Age 31.2yrs, Microbiome Score 4.21 H', Cortisol Optimization −18% AUC, HRV Baseline 78ms — each with its own sub-label, value, delta, and one-line clinical detail) via `unshift(pop())` array rotation every 3s with a spring-bounce (`cubic-bezier(0.34, 1.56, 0.64, 1)`); **(2) Neural Stream** — a telemetry-typewriter live feed cycling through 7 lines (*"Optimizing Circadian Rhythm..."*, *"Sampling lipid panel · 247 metabolites indexed"*, *"Correlating HRV with sleep architecture..."*, *"Mitochondrial efficiency: 94.2% · within tolerance"*, etc.) with a blinking clay-colored (`#CC5833`) cursor and a pulsing "Live Feed" dot; **(3) Adaptive Regimen** — a mock-cursor protocol scheduler: a weekly S–S grid where an automated SVG cursor visibly moves to a day, clicks (scale-down), activates it, moves to a "Save" button (which morphs to "✓ Saved"), and a mini 3-stat readout (Adherence 94%, Streak 16d, Doses 112).
Copy: *"A **living** instrument for human optimization."* · *"Three functional surfaces, continuously recalibrating. Each module is a real artifact from the Nura operating system — not a mock."*

**How they differ:** Finsyc reuses its video-bg motif inside feature cards; Kelo builds three bespoke "live" widget demos (chart/terminal/orbit-avatars); Nura Health goes further still — its 3 artifacts are the only ones in the set simulating actual *user interaction* (a self-clicking cursor completing a task), not just live-updating data.

## How it Works

### Finsyc — How it Works 01
Horizontal pill tab-bar (4 steps) driving an `AnimatePresence mode="wait"` swap between a left text column and a right **video-backed** UI card that scales/translates on step change. Click-driven (not scroll). Accent `#198F38`.
Copy: *"Manage your finances in **4 simple** steps"* · steps: "Connect Your Accounts", "Monitor Every Transaction", "Smart Budgeting Goals", "AI-Powered Optimization".

### Kelo — How it Works
Same tabbed-pill mechanic, but each of the 4 phases (Discovery/Outreach/Workflows/Insights) gets an entirely **bespoke mini-mockup** (stagger-in match cards, typing-line skeletons, workflow node chain, stat tiles) rather than one reused card. Right-side visual is a **photographic background** (train/desert/landscape stock photos) behind a floating frosted-glass card that bobs (`y:[0,-10,0]`, 4s loop). Active tab icon pulses (`scale:[1,1.1,1]`). Accent `#00bc7d`.
Copy: *"AI-Powered Sales Automation"* · *"Start Automating Now"*.

**How they differ:** Finsyc reuses one video-backed card across all 4 steps; Kelo builds a unique mockup per step and swaps the backdrop for photography instead of video.

## Why Choose Us / Trust

### Finsyc — Why Choose Us 01
Two-column: sticky left heading + pill tags, right column is a **10-item benefit list that scroll-scrubs upward** (`useScroll`/`useTransform`, y: 0%→-65%) inside a 300vh track, with a spring-driven vertical progress bar (`useSpring` on `scaleY`). Accent `#138E5F`. This is the only section in either template using scroll-linked (not viewport-triggered) motion — a genuine "scrollytelling" rail.
Copy: *"Take full control of your financial growth with **intelligent** tools"*.

*(No equivalent section exists in Kelo or Learn.AI.)*

## Philosophy / Manifesto

### Nura Health — Philosophy
High-contrast Charcoal (`#1A1A1A`) section with a parallaxing organic-texture photo (Unsplash), no product UI at all — purely typographic. A two-column before/after headline sets up the brand's positioning (reactive vs. proactive medicine), followed by a 3-column numbered manifesto (`01`–`03`): *"Biology is a system"* (nested rhythms, not a checklist of organs), *"Data, not dogma"* (continuous telemetry over population averages), *"Compounding returns"* (durable performance over months/years, not instant spikes) — explicitly framing the brand around systems-thinking and long-horizon compounding rather than quick fixes.
Copy: *"Modern medicine asks: **"What is wrong?"**"* vs. *"We ask: **What is optimal?**"*

*(No equivalent section exists in Finsyc, Kelo, or Learn.AI — none of them have a pure-manifesto, no-UI statement section.)*

## Sticky Card Stack

### Nura Health — Protocol (Sticky Stacking Archive)
Vertical stack of 3 full-screen cards using GSAP `ScrollTrigger`: as a new card scrolls into view, the card beneath it scales down to 0.9, blurs to 20px, and fades to 0.5 opacity — a "depth stack" rather than Finsyc's Why-Choose-Us horizontal-list scroll-scrub. Each card carries a unique bespoke artifact: a rotating double-helix gear, a scanning laser-grid over a cell grid, and a pulsing EKG waveform path (`M0,50 L50,50 L60,50 L70,20 L80,80...`).

**How it relates:** this is the closest thing in the set to Finsyc's Why Choose Us 01 (both use scroll-driven, not viewport-triggered, motion) but the mechanic is opposite — Finsyc scrubs a list *past* a fixed viewport, Nura Health *stacks and recedes* full-screen cards as you scroll through them. No equivalent in Kelo or Learn.AI.

## Metrics

### Finsyc — Metrics with logo 01
Pale-cyan (`#F6FDFF`) bg, 3 tinted cards (`#D2DDEA`/`#EBE3D2`/`#D4E5CD`), each with a brand logo hue-rotated to green and an animated count-up number (0→42/34/26%) triggered on viewport entry.
Copy: *"Smarter financial setup for scaling **growth**"* · *"Try for Free"*.

### Finsyc — Metrics with Testimonial
Combines a metrics band (glassmorphic `bg-white/40 backdrop-blur-md` stat cards: 250K+, 84%, 500M+; headline reveals **letter-by-letter** via color stagger) with an infinite-loop testimonial carousel where the active card gets the hero's video background + blur fade. Auto-advances every 5s.
Copy: *"Trusted by people **who take** control of their finances"*.

### Kelo — Metric
A white stat card **floats over a full-bleed vintage-train-interior photo** (unlike Finsyc's flat colored cards). 4-column grid, each cell numbered (`001`–`004`) with a tiny custom `MiniBarChart` glyph instead of Finsyc's count-up animation — numbers here are static text.
Copy: *"Real Systems. Real Results."* · "1500+ Hours Saved…", "94% Average Error Reduction…", "312% Average ROI…", "3X Average Output…".

### Nura Health — Hero meta strip *(lives inside Hero, not a standalone section — see [Hero](#header--hero) above)*
4-column numbered tile grid (`01`–`04`) directly under the hero CTAs: *Diagnostic Vessels* (847 biomarkers), *Mean Onboarding* (11.4 days), *Members Audited* (2,341), *Protocol Adherence* (94.6%). No count-up or chart glyph — plain static text on glass tiles.

**How they differ:** Finsyc animates the numbers themselves (count-up, letter-stagger) in a dedicated section; Kelo keeps numbers static but pairs them with photography and per-stat mini bar-charts, also as a dedicated section; Nura Health is the only one that doesn't get its own metrics section at all — it folds the stats directly into the hero as a meta strip, and the numbers lean clinical/precise (biomarker counts, onboarding days, adherence %) rather than business-outcome metrics, consistent with its "clinical boutique" positioning.

## Pricing

### Finsyc — Pricing 01
3 tiers (Starter $19 / Pro $49 / Business $99) with a Monthly/Yearly toggle ("Save 23%" badge). The **hovered/active** card gets a looping video fill + blur overlay and lifts (`y:-10`) — the same video-in-card trick used in Feature 01 and the testimonial carousel.
Copy: *"Choose the **plan** that fits your financial goals"* · *"Get 14-days free trial"*.

### Kelo — Pricing
3 tiers (Pro $50 / Premium $80 / Enterprise $150), **no monthly/yearly toggle**. Differentiation is structural, not interactive: the Enterprise card breaks to a dark, full-bleed photographic background (`black/70` overlay) while the other two stay light gray (`#f7f7f8`). Green glow blur (`#00bc7d`) under CTA buttons.
Copy: *"Simple, Unified Pricing for Smarter Workflows"* · *"Get in Touch"*.

### Nura Health — Membership
3 tiers: **Foundations** ($490/mo) → **Performance** ($1,240/mo) → **Longevity** ($3,800/mo). The middle card ("Performance", `accent: true`) is the one that "pops" — Moss (`#2E4036`) background with a Clay (`#CC5833`) button — same permanent-styling-over-interaction approach as Kelo's dark Enterprise card, but applied to the *middle* tier rather than the top one. Each tier pairs a sans title with its own serif accent line ("essentials." / "the protocol." / "the long game.") echoing the Hero/Protocol headline device, and each has its own CTA verb rather than a shared button label: *"Begin Foundations"* → *"Reserve Intake"* → *"Speak with admissions"*. Feature lists escalate from an annual blood panel + quarterly consults, to whole-genome sequencing + bi-weekly recalibration + concierge trainer, to full-body MRI/DEXA + monthly CMO consults + a personal on-call medical team.

**How they differ:** Finsyc differentiates its top tier via hover/active state (video reveal); Kelo differentiates its top tier via permanent visual styling (dark photo card); Nura Health also uses permanent styling but breaks the *middle* tier instead of the top, and is the only one of the three with fully bespoke per-tier persona copy rather than a generic feature checklist.

## Integration

### Finsyc — Integration 01
Custom **SVG hub-and-spoke diagram**: 8 real-brand cards (Plaid, Stripe, PayPal, Visa/Mastercard, QuickBooks, Xero, Coinbase) arranged around a pulsing central "Finsyc" seal, connected by dashed Bezier paths with `<animateMotion>` traveling dots (3.5s loop) and breathing glow rings. Accent `#138E5F`.
Copy: *"Connect all your financial tools in **one place**"* · *"Bank-level security."*

### Kelo — Integration
Plain 4-column grid of 8 pastel-tinted brand icon tiles (Framer, Gmail, Notion, Vercel, Discord, Dropbox, Airtable, Shopify) via `simpleicons.org`, each popping green on hover. Simple `whileInView` stagger fade-up — no diagram, no motion path.
Copy: *"Works With Your Entire Tech Stack"* · *"See all integrations"*.

**How they differ:** Finsyc is the only orbit/diagram-style integration display in the set; Kelo is the plainest, relying on per-brand tinted backgrounds rather than layout or animation for visual interest.

## Blog

### Finsyc — Blog 01
2 large asymmetric cards with alternating image-top/image-bottom layout and colored tag pills (AI → sky, Innovation → green, Tech → amber). Simple `whileInView` fade-up, image scales on hover. The least-animated, plainest section in the Finsyc template.
Copy: *"Insights to help you **manage** money smarter"* · "How to take control of your monthly spending".

*(No equivalent section exists in Kelo or Learn.AI.)*

## FAQ

### Kelo — FAQ
Narrow (`max-w-[620px]`) single-column accordion on a frosted glass panel (`bg-white/40 backdrop-blur-2xl`) layered over a cropped background photo that zooms further on hover. `AnimatePresence` height/opacity expand-collapse, chevron rotates 180°.
Copy: *"Curious about something?"* · e.g. "Do I need experience?"

*(No equivalent section exists in Finsyc or Learn.AI.)*

## CTA / Footer

### Finsyc — CTA with Footer 01
Full-bleed video background continues from the header into the footer, with two pill CTAs (solid black + glass secondary) using the same hover icon-flip pattern. Footer has a newsletter glass-capsule input, 3 link columns, and a **giant edge-to-edge kinetic wordmark** ("Finsyc", up to `text-[424px]`) that slides up into view on scroll.
Copy: *"Take full control of your **finances** today"* · *"Book a demo"*.

### Kelo — Footer
Black footer in a light-gray outer wrapper. Newsletter bar has real **email-validation state logic** (button morphs to "✓ Subscribed!" or shakes red on invalid input) — the only footer with functional form validation rather than static markup. 5-column link grid includes leftover unbranded placeholder text ("Shopify"/"Salehstore"), suggesting unedited template filler.
Copy: *"Subscribe to our news later"* · *"© 2026 Kelo. All right Reserved"*.

### Nura Health — Footer
Deep Charcoal (`#1A1A1A`), `rounded-t-[4rem]` — continues the global oversized-radius system rather than going flat/square like the other two footers. Distinguishing feature: a **"System Operational" status indicator with a pulsing green dot** (`#22c55e`), a literal uptime/status-page motif borrowed into a marketing footer — reinforcing the "clinical instrument" brand identity rather than being a generic link/newsletter block.

**How they differ:** Finsyc's footer is a polished, on-brand typographic showpiece (giant wordmark reveal); Kelo's is functionally richer (real validation) but visually plainer and has unedited placeholder copy; Nura Health's is the only one to borrow a "system status" UI motif (pulsing operational dot) as its distinguishing footer element rather than a wordmark or newsletter form.
