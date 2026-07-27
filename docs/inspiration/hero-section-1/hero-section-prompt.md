# Features 01 Learn.AI

## 1. Overview

A clean, white-background "Fluently" AI English-tutor features section centered on a large two-tone Syne headline and a floating product screenshot, capped by a unified card containing 10 brand-colored messaging-platform icons that animate up in a staggered spring cascade.

## 2. Tech stack

- **React** (functional component, `"use client"`, `useState`).
- **Framer Motion** — `motion`, `Variants` (staggered reveal + spring entrance + whileInView).
- **lucide-react** — imported (`Check, MessageSquare, BookOpen, Mic, Award, Sparkles, Smile, ArrowUpRight`) but NOT rendered in the final markup. FLAG: these imports are unused; the visible icons are all inline custom brand SVGs. You may omit lucide-react entirely.
- **Tailwind CSS** utility classes throughout.
- Inline custom brand-logo SVG components (Skype, Slack, Zoom, Google Meet, Teams, WhatsApp, Telegram, Discord, Google Chat, Messenger).

## 3. Fonts & global styles

Loaded via `<link>` tags rendered inside the component (preconnect + stylesheet):

- `https://fonts.googleapis.com` (preconnect)
- `https://fonts.gstatic.com` (preconnect, crossOrigin anonymous)
- `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap`

Font families:

- **Syne** (`'Syne, sans-serif'`) — headline.
- **Inter** (`'Inter, sans-serif'`) — paragraph. Note: `font-inter` / `font-sans` utility classes are also used on the affirmation text and labels; treat Inter as the body font. FLAG: `font-inter` is a custom utility — map it to `font-family: Inter, sans-serif`.

Color tokens (exact hex):

- Page / card background: `#FFFFFF` (white)
- Headline text: `#1E332D` (dark green-charcoal)
- Brand green accent: `#00B782` (used for "real-life" span, hover states, ping dot)
- Paragraph text: `#6F6F6F`
- Platform label text: `#8F8D8D`
- Card border: `#EBEBEB`; icon-bubble border: `#EAEAEA`
- Glow tints: `#E6F8F2` (top-left), `#00B782` at 5% opacity (bottom-right)

No global resets — the component sets no `body`/`html`/`*` styles.

## 4. Section container

Outer wrapper: `div` — `w-full bg-white flex flex-col items-center justify-center`.

Inner `<section>`:

- `w-full max-w-[1440px]`
- Padding: `px-4 md:px-6 py-16 md:py-[120px]`
- `flex flex-col items-center mx-auto my-auto relative bg-white`

Two ambient glow `div`s (absolute, `pointer-events-none`, behind content):

- Top-left: `absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-[#E6F8F2] rounded-full blur-[100px] opacity-30`
- Bottom-right: `absolute bottom-[10%] right-[10%] w-[300px] h-[300px] bg-[#00B782]/5 rounded-full blur-[120px] opacity-25`

Content sits above glows via `z-10` on the header group.

## 5. Structure — section by section

### 5a. Header text group

Wrapper: `w-full flex flex-col items-center justify-center self-stretch z-10`.

**Headline** `<h2 id="features-heading">`:

- Classes: `text-center tracking-normal text-[#1E332D]`
- Responsive font-size: `text-[32px] sm:text-[48px] md:text-[60px] lg:text-[74px]`
- Responsive line-height: `leading-[38px] sm:leading-[54px] md:leading-[68px] lg:leading-[76px]`
- Inline style: `alignSelf: stretch; fontFamily: 'Syne, sans-serif'; fontStyle: normal; fontWeight: 500`
- Copy (verbatim, with `<br />` and accent span):
  `Get AI feedback on` `<br />` `your ` `<span className="text-[#00B782]">real-life</span>` ` calls`

**Paragraph** `<p id="features-paragraph">`:

- Classes: `text-center mt-6 text-[#6F6F6F] text-sm sm:text-base md:text-[18px] leading-relaxed`
- Inline style: `width: 100%; maxWidth: 499px; fontFamily: 'Inter, sans-serif'; fontStyle: normal; fontWeight: 400`
- Copy (verbatim): `Connect Fluently to your online calls to fix mistakes in your grammar, pronunciation, and vocabulary.`

### 5b. Product screenshot showcase

Wrapper: `w-full max-w-5xl mt-8 md:mt-[60px] mb-2 relative flex items-center justify-center px-2`.

`motion.div`:

- `initial={{ opacity: 0, y: 120 }}` → `whileInView={{ opacity: 1, y: 0 }}`
- `viewport={{ once: true, amount: 0.15 }}`
- `transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}`
- `className="w-full flex items-center justify-center"`

`<img>`:

- src: `https://cdn.jiro.build/Learn.AI/Image/show%20app.png`
- alt: `AI English Tutoring Interface`
- `className="w-full h-auto max-h-[620px] object-contain select-none hover:scale-[1.01] transition-transform duration-500"`
- `referrerPolicy="no-referrer"`

### 5c. Integrations badge card

Outer wrapper: `w-full flex flex-col items-center justify-center mt-6 md:mt-0`.

Card `motion.div id="integrations-container"`:

- Framer: `variants={containerVariants}` `initial="hidden"` `whileInView="visible"` `viewport={{ once: true, amount: 0.15 }}`
- Classes: `w-full max-w-5xl bg-white border border-[#EBEBEB] py-5 px-3 md:py-7 md:px-8 rounded-[18px] shadow-[0_8px_30px_rgb(0,0,0,0.015)] grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-x-1 gap-y-6 md:gap-x-2 transition-all`

Each item `motion.div` (`variants={childVariants}`, `id=integration-{slug}-{index}`):

- `className="flex flex-col items-center justify-center group cursor-pointer"`
- Icon bubble: `w-14 h-14 bg-white border border-[#EAEAEA] rounded-[18px] flex items-center justify-center transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.015)] group-hover:scale-108 group-hover:border-[#00B782]/35 group-hover:shadow-[0_8px_20px_rgba(0,183,130,0.08)]`
  - FLAG: `group-hover:scale-108` is non-standard Tailwind — intended ≈ `scale(1.08)`; define via arbitrary `group-hover:scale-[1.08]` or a custom util.
  - Inner icon wrapper: `scale-90 flex items-center justify-center`; each brand SVG is `w-10 h-10`.
- Label `<span>`: `mt-3 text-[10px] font-bold text-[#8F8D8D] group-hover:text-[#00B782] transition-colors uppercase tracking-wider text-center font-sans`

Integration list (order, verbatim names):

1. Skype · 2. Slack · 3. Zoom · 4. Google Meet · 5. Teams · 6. WhatsApp · 7. Telegram · 8. Discord · 9. Google Chat · 10. Messenger

### 5d. Affirmation badge

`div id="affirmation-badge"`: `mt-10 flex items-center justify-center gap-3`.

- Pulsing dot: outer `span` `relative flex h-3 w-3`; ping layer `animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B782] opacity-75`; solid dot `relative inline-flex rounded-full h-3 w-3 bg-[#00B782]`.
- Text `span`: `text-[16px] font-normal text-[#1E332D] font-inter tracking-wide`
- Copy (verbatim): `Fluently supports every meeting platform`

## 6. Assets (every URL)

- Product screenshot: `https://cdn.jiro.build/Learn.AI/Image/show%20app.png`
- All 10 platform logos are inline SVG (no external URL). Each rendered at `w-10 h-10`. Key gradient/path details to reproduce exactly:

Skype — dual circular gradient logo with mask; signature mask path:

```
M179.903 104.187a75.715 75.715 0 0 0-38.567 10.55c19.535-32.94 11.499-75.273-18.749-98.764C92.34-7.52 49.337-4.827 22.255 22.255-4.826 49.336-7.519 92.34 15.973 122.587c23.491 30.248 65.823 38.284 98.765 18.749-17.49 29.642-12.843 67.344 11.322 91.852 24.166 24.508 61.798 29.685 91.684 12.613 29.886-17.071 44.542-52.118 35.705-85.382-8.836-33.265-38.95-56.418-73.37-56.409l-.176.177Z
```

Slack — 4 rounded-bar groups, fills `#36c5f0 #2eb67d #ecb22e #e01e5a`, viewBox `0 0 2447.6 2452.5`.
Zoom — solid rounded square gradient `zoom__a` (stops `#0845BF`→`#4F90EE`) + white camera glyph, viewBox `0 0 256 256`.
Google Meet — multi-color flat logo (`#00832D #0066DA #E94235 #2684FC #00AC47 #FFBA00`), viewBox `0 0 622 512`, clipPath.
Teams — purple radial-gradient logo, viewBox `4 4 36 38`, many `microsoft_teams__*` gradients.
WhatsApp — single `#25D366` fill, viewBox `0 0 360 362`, fillRule evenodd.
Telegram — gradient `telegram__a` (`#2AABEE`→`#229ED9`) + white plane, viewBox `0 0 256 256`.
Discord — single `#5865F2` fill, viewBox `0 0 256 199`.
Google Chat — three greens `#00AC47 #5BB974 #00832D`, viewBox `0 0 96 100`, clipPath.
Messenger — radial gradient `messenger__a` (`#09F`→`#A033FF`→`#FF5280`→`#FF7061`) + white bolt, viewBox `0 0 256 256`.

## 7. Animations

**containerVariants** (parent stagger):

```
hidden:  { opacity: 0 }
visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
```

**childVariants** (each icon cell — spring pop-in):

```
hidden:  { opacity: 0, y: 24, scale: 0.92 }
visible: { opacity: 1, y: 0, scale: 1,
           transition: { type: "spring", stiffness: 100, damping: 14 } }
```

- Screenshot: enters from `y: 120 → 0`, fade in, `duration: 1.0`, easing `cubic-bezier(0.16, 1, 0.3, 1)`; triggers on scroll into view (`once: true, amount: 0.15`).
- Integrations card + children: same `whileInView` trigger; children cascade at 0.08s stagger via spring.
- Hover: image `hover:scale-[1.01]` over `duration-500`; icon bubble scales up + green border/shadow over `duration-300`; label color shifts to `#00B782`.
- Affirmation dot: continuous Tailwind `animate-ping` ripple.

## 8. Responsive

- **Base (mobile)**: heading 32px / lh 38px; paragraph `text-sm`; section `px-4 py-16`; screenshot margin `mt-8`; integrations grid `grid-cols-3`; integrations wrapper `mt-6`.
- **sm (≥640px)**: heading 48px / lh 54px; paragraph `text-base`; integrations grid `grid-cols-5`.
- **md (≥768px)**: heading 60px / lh 68px; paragraph 18px; section `px-6 py-[120px]`; screenshot `mt-[60px]`; card `py-7 px-8 gap-x-2`; integrations wrapper `mt-0`.
- **lg (≥1024px)**: heading 74px / lh 76px; integrations grid `grid-cols-10` (single row).
- Section caps at `max-w-[1440px]`; screenshot & card cap at `max-w-5xl`; paragraph caps at 499px.

## 9. Key design principles (≤5)

- All-white airy canvas with two soft mint/green ambient blurs for depth without clutter.
- Strong type hierarchy: oversized two-tone Syne headline (`#1E332D` + `#00B782` accent) over muted Inter body.
- Single brand-green accent (`#00B782`) drives every interactive/highlight state.
- Soft, consistent rounding (`rounded-[18px]`) and ultra-subtle shadows for a premium, lightweight card feel.
- Scroll-triggered motion: screenshot rises, icons cascade in a staggered spring — playful but restrained.

## 10. Common mistakes to avoid

- Do NOT render lucide-react icons — they are imported but unused; the only icons are the 10 inline brand SVGs.
- Keep exactly 10 integrations, in the listed order, no duplicates.
- Preserve the `<br />` line break and the `<span className="text-[#00B782]">real-life</span>` in the headline.
- Use the exact responsive font-size AND matching line-height pairs; don't let them drift.
- Reproduce `group-hover:scale-108` intent as ~`scale(1.08)` (it is non-standard) and keep the inner-icon `scale-90` wrapper.
- Keep glow divs `pointer-events-none` and behind content (`z-10` on header).
- Use `referrerPolicy="no-referrer"` on the screenshot img.

## 11. Page title

Features 01 Learn.AI

## Integration (build-safety — do not skip)

- Add this section as a **new** component file with a unique name. Don't edit or overwrite any existing file except to add its import and render it.
- Render it **after** all existing sections; keep every previously built section exactly as-is — never replace or remove them.
- If no project exists, create a minimal React + Tailwind app; if one exists, use it as-is — don't re-scaffold or change the Tailwind/build config or version.
- Keep it self-contained: scope its fonts and any resets to this section; never set global `body`/`html`/`*` styles or a global font.
- Install only the libraries this section names.
