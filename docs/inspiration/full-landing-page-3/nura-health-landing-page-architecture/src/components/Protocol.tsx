import { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Dna, ScanLine, HeartPulse, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ── DATA ──────────────────────────────────────────────────────── */
const protocols = [
  {
    id: "P-01",
    icon: Dna,
    eyebrow: "Phase 01 · Intake",
    title: "Decode",
    serif: "your biology.",
    body: "847 biomarkers, a full methylome read, continuous glucose and HRV telemetry. We build your digital twin before we recommend a single intervention.",
    tags: [
      "Whole-genome sequencing",
      "Continuous glucose",
      "HRV baseline",
      "Microbiome v3",
    ],
    bg: "from-[#2E4036] via-[#233029] to-[#1A1A1A]",
    side: "Helix Gear",
    stat: { label: "Biomarkers", value: "847", unit: "mapped" },
  },
  {
    id: "P-02",
    icon: ScanLine,
    eyebrow: "Phase 02 · Map",
    title: "Scan",
    serif: "the terrain.",
    body: "Cross-referenced against a 2,341-member longitudinal cohort, we identify the exact friction points — mitochondrial drag, glycemic volatility, inflammatory load.",
    tags: [
      "Cohort correlation",
      "Friction mapping",
      "Risk modeling",
      "Trajectory forecast",
    ],
    bg: "from-[#1A1A1A] via-[#2a1e17] to-[#0d0d0d]",
    side: "Laser Grid",
    stat: { label: "Cohort size", value: "2,341", unit: "members" },
  },
  {
    id: "P-03",
    icon: HeartPulse,
    eyebrow: "Phase 03 · Engineer",
    title: "Compound",
    serif: "the protocol.",
    body: "A regimen that adapts weekly. Nutrition, supplementation, training, light, sleep architecture — tuned to your data, recalibrated every 14 days by your physician.",
    tags: [
      "Adaptive nutrition",
      "Circadian engineering",
      "Train & recover",
      "Bi-weekly recalibration",
    ],
    bg: "from-[#2E4036] via-[#1e2e24] to-[#0d0d0d]",
    side: "EKG Stream",
    stat: { label: "Recalibration", value: "14", unit: "day cycle" },
  },
];

/* ── SECTION ───────────────────────────────────────────────────── */
export default function Protocol() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setCardRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => {
      cardRefs.current[i] = el;
    },
    []
  );

  /* ── header entrance ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".proto-headline .word", {
        y: 70,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".proto-headline",
          start: "top 82%",
        },
      });
      gsap.from(".proto-sub", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".proto-sub",
          start: "top 88%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ── sticky-stack scroll animation ──
   *  Architecture:
   *  - Container height = numCards × 100vh  →  creates scroll runway
   *  - Each card: position:sticky; top:0    →  stacks in DOM order
   *  - z-index ascends so later cards cover earlier ones
   *  - ScrollTrigger: for card[i], trigger = card[i+1]
   *    start = "top bottom"  (next card enters viewport)
   *    end   = "top top"     (next card covers fully)
   *  - Animation: scale → 0.9, blur → 20px, opacity → 0.5
   *  - Last card has no animation (nothing covers it)
   */
  useEffect(() => {
    const cards = cardRefs.current;
    if (!cards[0]) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        if (!card || i >= protocols.length - 1) return;
        const next = cards[i + 1];
        if (!next) return;

        /* inner rounded panel — we animate this, not the wrapper */
        const panel = card.querySelector(".proto-panel") as HTMLElement;
        if (!panel) return;

        gsap.to(panel, {
          scale: 0.88,
          opacity: 0.4,
          filter: "blur(20px)",
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top bottom",
            end: "top top",
            scrub: 0.4,
          },
        });
      });

      /* fade-up card content on enter */
      cards.forEach((card) => {
        if (!card) return;
        const inner = card.querySelector(".proto-inner");
        if (!inner) return;
        gsap.from(inner, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 70%",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" ref={sectionRef} className="relative bg-cream-2">
      {/* ── Section header ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-24 md:pt-36 pb-16 md:pb-24">
        <div className="flex items-center gap-3 mb-6 text-moss/70 font-mono text-xs tracking-widest uppercase">
          <span className="h-px w-10 bg-moss/30" />
          <span>§ 04 — The Protocol</span>
        </div>
        <h2 className="proto-headline font-sans text-5xl md:text-7xl lg:text-8xl tracking-display-2 max-w-5xl text-charcoal">
          <span className="word inline-block">Three</span>{" "}
          <span className="word inline-block">phases.</span>{" "}
          <span className="word inline-block">One</span>{" "}
          <span className="word inline-block font-serif italic font-light text-clay">
            continuous
          </span>{" "}
          <span className="word inline-block">loop.</span>
        </h2>
        <p className="proto-sub mt-8 max-w-xl text-charcoal/60 text-base md:text-lg leading-relaxed">
          Scroll through the three compounding stages every member moves
          through. Each phase builds on the one before — never isolated, always
          recursive.
        </p>
      </div>

      {/* ── Sticky stack container ── */}
      <div
        className="relative"
        style={{ height: `${protocols.length * 100}vh` }}
      >
        {protocols.map((p, i) => (
          <div
            key={p.id}
            ref={setCardRef(i)}
            className={[
              "sticky top-0 h-screen w-full flex items-center justify-center px-4 md:px-8 py-6",
              "bg-gradient-to-br",
              p.bg,
            ].join(" ")}
            style={{ zIndex: i + 1 }}
          >
            {/* ── Card panel ── */}
            <div
              className={[
                "proto-panel relative w-full max-w-[1360px] h-[90vh] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden",
                "bg-gradient-to-br shadow-2xl",
                p.bg,
              ].join(" ")}
              style={{
                transformOrigin: "center top",
                willChange: "transform, opacity, filter",
              }}
            >
              {/* ambient dot grid */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #F2F0E9 0.8px, transparent 0.8px)",
                  backgroundSize: "28px 28px",
                }}
              />

              {/* inner content wrapper */}
              <div className="proto-inner absolute inset-0 p-6 md:p-10 lg:p-14 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 text-cream">
                {/* ─ Top bar ─ */}
                <div className="md:col-span-12 flex items-center justify-between">
                  <div className="flex items-center gap-3 font-mono text-[10px] md:text-xs tracking-widest uppercase text-cream/60">
                    <span className="h-px w-8 bg-cream/30" />
                    {p.eyebrow}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-3 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400 pulse-dot" />
                      <span className="font-mono text-[10px] tracking-widest text-cream/60 uppercase">
                        Active
                      </span>
                    </div>
                    <span className="font-mono text-[10px] md:text-xs tracking-widest text-cream/40">
                      {p.id} / 03
                    </span>
                  </div>
                </div>

                {/* ─ Left: text ─ */}
                <div className="md:col-span-6 lg:col-span-7 flex flex-col justify-center">
                  <div className="h-11 w-11 md:h-14 md:w-14 rounded-2xl md:rounded-[1.25rem] bg-cream/10 border border-cream/15 flex items-center justify-center mb-5 md:mb-8">
                    <p.icon className="h-5 w-5 md:h-6 md:w-6 text-cream/90" />
                  </div>

                  <h3 className="font-display text-[3.5rem] md:text-7xl lg:text-[5.5rem] tracking-display leading-none text-cream">
                    {p.title}
                  </h3>
                  <div className="font-serif italic text-[3.5rem] md:text-7xl lg:text-[5.5rem] text-clay font-light leading-none mt-0.5">
                    {p.serif}
                  </div>

                  <p className="mt-6 md:mt-8 max-w-md text-cream/65 text-sm md:text-base leading-relaxed">
                    {p.body}
                  </p>

                  <div className="mt-6 md:mt-8 flex flex-wrap gap-1.5 md:gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-cream/15 bg-cream/5 px-3 py-1.5 text-[10px] md:text-xs font-mono tracking-widest uppercase text-cream/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 md:mt-10 flex items-center gap-4">
                    <button className="magnetic-btn magnetic-clay inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium">
                      <span className="relative z-10 flex items-center gap-2">
                        Explore phase
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </button>
                    <span className="font-mono text-[10px] tracking-widest text-cream/35 uppercase">
                      0{i + 1} of 03
                    </span>
                  </div>
                </div>

                {/* ─ Right: artifact ─ */}
                <div className="hidden md:flex md:col-span-6 lg:col-span-5 items-center justify-center">
                  <div className="relative w-full max-w-[380px] aspect-square rounded-[2rem] bg-charcoal/60 border border-cream/10 backdrop-blur-md overflow-hidden shadow-[inset_0_1px_0_rgba(242,240,233,0.08)]">
                    {/* artifact frame chrome */}
                    <div className="absolute top-4 left-5 z-10 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-cream/20" />
                        <span className="h-2 w-2 rounded-full bg-cream/20" />
                        <span className="h-2 w-2 rounded-full bg-cream/20" />
                      </div>
                      <span className="font-mono text-[9px] tracking-widest text-cream/40 uppercase ml-2">
                        ◤ {p.side}
                      </span>
                    </div>
                    <div className="absolute top-4 right-5 z-10 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-clay pulse-dot" />
                      <span className="font-mono text-[9px] tracking-widest text-cream/40 uppercase">
                        live
                      </span>
                    </div>

                    {/* stat readout bottom */}
                    <div className="absolute bottom-4 left-5 right-5 z-10 flex items-end justify-between">
                      <div>
                        <div className="font-mono text-[8px] tracking-widest text-cream/35 uppercase">
                          {p.stat.label}
                        </div>
                        <div className="font-display text-2xl text-cream mt-0.5 leading-none">
                          {p.stat.value}
                          <span className="text-xs text-cream/50 font-mono ml-1.5">
                            {p.stat.unit}
                          </span>
                        </div>
                      </div>
                      <div className="font-mono text-[8px] tracking-widest text-cream/30 uppercase text-right">
                        render.{p.id.toLowerCase().replace("-", "")}
                        <br />
                        60fps · gpu
                      </div>
                    </div>

                    {/* artifact itself */}
                    {i === 0 && <HelixGear />}
                    {i === 1 && <LaserGrid />}
                    {i === 2 && <EKGStream />}
                  </div>
                </div>

                {/* bottom-right hint (first card only) */}
                {i === 0 && (
                  <div className="md:col-span-12 flex justify-end items-end">
                    <span className="font-mono text-[10px] tracking-widest text-cream/25 uppercase flex items-center gap-2">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="animate-bounce"
                      >
                        <path d="M12 5v14M5 12l7 7 7-7" />
                      </svg>
                      scroll to compound
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom spacer — catches momentum after last card */}
      <div className="h-16 md:h-24" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* ARTIFACT 1 — ROTATING DOUBLE-HELIX GEAR                       */
/* ═══════════════════════════════════════════════════════════════ */
function HelixGear() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const ctx = gsap.context(() => {
      const outer = svg.querySelector(".helix-gear-outer");
      const inner = svg.querySelector(".helix-inner");
      const rings = svg.querySelector(".helix-ring-pulse");
      const center = svg.querySelector(".helix-center");

      /* outer gear ring — slow CW */
      if (outer) {
        gsap.to(outer, {
          rotation: 360,
          transformOrigin: "center center",
          duration: 40,
          repeat: -1,
          ease: "none",
        });
      }

      /* inner helix — slow CCW */
      if (inner) {
        gsap.to(inner, {
          rotation: -360,
          transformOrigin: "center center",
          duration: 55,
          repeat: -1,
          ease: "none",
        });
      }

      /* subtle scale pulse on rings */
      if (rings) {
        gsap.to(rings, {
          scale: 1.08,
          transformOrigin: "center center",
          duration: 3,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }

      /* center dot pulse */
      if (center) {
        gsap.to(center, {
          scale: 1.3,
          opacity: 0.6,
          duration: 1.6,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }
    }, svg);

    return () => ctx.revert();
  }, []);

  const TEETH = 36;
  const HELIX_STEPS = 48;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        className="w-[85%] h-[85%]"
        fill="none"
      >
        <defs>
          <radialGradient id="hg-glow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#CC5833" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#CC5833" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#CC5833" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hg-core" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#F2F0E9" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#F2F0E9" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ambient glow */}
        <circle cx="200" cy="200" r="180" fill="url(#hg-glow)" />

        {/* ── OUTER GEAR RING ── */}
        <g className="helix-gear-outer">
          {/* concentric reference circles */}
          <circle
            cx="200"
            cy="200"
            r="165"
            stroke="#F2F0E9"
            strokeOpacity="0.12"
            strokeWidth="0.5"
          />
          <circle
            cx="200"
            cy="200"
            r="145"
            stroke="#F2F0E9"
            strokeOpacity="0.08"
            strokeWidth="0.5"
            strokeDasharray="3 6"
          />

          {/* gear teeth */}
          {Array.from({ length: TEETH }).map((_, i) => {
            const a = (i / TEETH) * Math.PI * 2;
            const inner = 155;
            const outer = 170;
            const x1 = 200 + Math.cos(a) * inner;
            const y1 = 200 + Math.sin(a) * inner;
            const x2 = 200 + Math.cos(a) * outer;
            const y2 = 200 + Math.sin(a) * outer;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#F2F0E9"
                strokeOpacity={i % 3 === 0 ? "0.6" : "0.25"}
                strokeWidth={i % 3 === 0 ? "1.8" : "1"}
                strokeLinecap="round"
              />
            );
          })}

          {/* outer tick-marks */}
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const x = 200 + Math.cos(a) * 175;
            const y = 200 + Math.sin(a) * 175;
            return (
              <circle
                key={`ot-${i}`}
                cx={x}
                cy={y}
                r="1.5"
                fill="#CC5833"
                fillOpacity="0.7"
              />
            );
          })}
        </g>

        {/* ── INNER PULSING RINGS ── */}
        <g className="helix-ring-pulse">
          <circle
            cx="200"
            cy="200"
            r="120"
            stroke="#F2F0E9"
            strokeOpacity="0.15"
            strokeWidth="0.5"
          />
          <circle
            cx="200"
            cy="200"
            r="95"
            stroke="#CC5833"
            strokeOpacity="0.15"
            strokeWidth="0.5"
            strokeDasharray="1 5"
          />
        </g>

        {/* ── DOUBLE HELIX ── */}
        <g className="helix-inner">
          {/* strand A (sine) + strand B (cosine, offset π) */}
          {Array.from({ length: HELIX_STEPS }).map((_, i) => {
            const t = (i / HELIX_STEPS) * Math.PI * 8;
            const y = 55 + (i / HELIX_STEPS) * 290;
            const ampA = 65;
            const xA = 200 + Math.cos(t) * ampA;
            const xB = 200 + Math.cos(t + Math.PI) * ampA;

            /* crossbar only every 4th step */
            const showBar = i % 4 === 0;
            /* leading strand nodes */
            const nodeRadA = i % 4 === 0 ? 3.5 : 2;
            const nodeRadB = i % 4 === 0 ? 3 : 1.5;

            return (
              <g key={i} opacity={0.4 + 0.6 * (1 - Math.abs(i / HELIX_STEPS - 0.5) * 2)}>
                {showBar && (
                  <line
                    x1={xA}
                    y1={y}
                    x2={xB}
                    y2={y}
                    stroke="#CC5833"
                    strokeWidth="0.8"
                    strokeOpacity="0.65"
                  />
                )}
                {/* strand A node */}
                <circle cx={xA} cy={y} r={nodeRadA} fill="#F2F0E9" />
                {/* strand B node */}
                <circle
                  cx={xB}
                  cy={y}
                  r={nodeRadB}
                  fill="#CC5833"
                  fillOpacity="0.85"
                />
              </g>
            );
          })}

          {/* helix center axis */}
          <line
            x1="200"
            y1="55"
            x2="200"
            y2="345"
            stroke="#F2F0E9"
            strokeOpacity="0.06"
            strokeWidth="0.5"
            strokeDasharray="2 6"
          />
        </g>

        {/* ── CENTER CORE ── */}
        <circle cx="200" cy="200" r="18" fill="url(#hg-core)" />
        <circle
          className="helix-center"
          cx="200"
          cy="200"
          r="5"
          fill="#CC5833"
        />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* ARTIFACT 2 — SCANNING LASER-GRID OVER MEDICAL CELLS           */
/* ═══════════════════════════════════════════════════════════════ */
function LaserGrid() {
  const rootRef = useRef<HTMLDivElement>(null);

  // randomised cell states
  const [cells] = useState(() =>
    Array.from({ length: 64 }, () => ({
      alive: Math.random() > 0.55,
      phase: Math.random(),
    }))
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      /* scanning laser beam */
      gsap.to(".laser-beam", {
        yPercent: 850,
        duration: 3.5,
        repeat: -1,
        ease: "none",
      });

      /* secondary horizontal scan */
      gsap.to(".laser-h", {
        xPercent: 800,
        duration: 5,
        repeat: -1,
        ease: "none",
      });

      /* cell pulsing */
      root.querySelectorAll(".cell-active").forEach((el, i) => {
        gsap.to(el, {
          scale: 1.4,
          opacity: 0.5,
          duration: 1 + Math.random() * 1.5,
          yoyo: true,
          repeat: -1,
          delay: i * 0.15,
          ease: "sine.inOut",
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0 flex items-center justify-center">
      <div className="absolute inset-5 md:inset-6 rounded-[1.25rem] overflow-hidden border border-cream/10 bg-charcoal/50">
        {/* grid lines */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: [
              "linear-gradient(rgba(242,240,233,0.6) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(242,240,233,0.6) 1px, transparent 1px)",
            ].join(","),
            backgroundSize: "12.5% 12.5%",
          }}
        />

        {/* cells */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
          {cells.map((c, i) => (
            <div
              key={i}
              className="flex items-center justify-center"
            >
              <div
                className={[
                  "rounded-full transition-all",
                  c.alive
                    ? "cell-active h-3.5 w-3.5 md:h-4 md:w-4 bg-clay shadow-[0_0_10px_#CC5833,0_0_3px_#CC5833]"
                    : "h-1.5 w-1.5 md:h-2 md:w-2 border border-cream/15",
                ].join(" ")}
                style={
                  c.alive
                    ? { animationDelay: `${c.phase * 2}s` }
                    : undefined
                }
              />
            </div>
          ))}
        </div>

        {/* horizontal laser beam */}
        <div className="absolute top-0 inset-x-0 overflow-hidden h-full pointer-events-none">
          <div
            className="laser-beam absolute left-0 right-0 h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, #CC5833 30%, #F2F0E9 50%, #CC5833 70%, transparent)",
              boxShadow: "0 0 20px 4px rgba(204,88,51,0.5), 0 0 60px 8px rgba(204,88,51,0.15)",
            }}
          />
        </div>

        {/* vertical scan (secondary) */}
        <div className="absolute inset-y-0 left-0 overflow-hidden w-full pointer-events-none">
          <div
            className="laser-h absolute top-0 bottom-0 w-[1px]"
            style={{
              background:
                "linear-gradient(transparent, rgba(46,64,54,0.5) 30%, rgba(46,64,54,0.8) 50%, rgba(46,64,54,0.5) 70%, transparent)",
              boxShadow: "0 0 8px 2px rgba(46,64,54,0.3)",
            }}
          />
        </div>

        {/* corner crosshairs */}
        {[
          "top-3 left-3",
          "top-3 right-3",
          "bottom-3 left-3",
          "bottom-3 right-3",
        ].map((pos) => (
          <div key={pos} className={`absolute ${pos}`}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              className="text-cream/30"
            >
              <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="0.5" />
              <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
        ))}

        {/* HUD overlay text */}
        <div className="absolute top-3 left-5 font-mono text-[8px] tracking-widest text-cream/40">
          SCAN:ACTIVE · 8×8 · 0.84Hz
        </div>
        <div className="absolute top-3 right-5 font-mono text-[8px] tracking-widest text-clay/70">
          {cells.filter((c) => c.alive).length}/64 flagged
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* ARTIFACT 3 — PULSING EKG WAVEFORM PATH                        */
/* ═══════════════════════════════════════════════════════════════ */
function EKGStream() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const ctx = gsap.context(() => {
      /* animate all EKG traces via ref-scoped queries */
      const glowPath = svg.querySelector(".ekg-glow") as SVGPathElement | null;
      const mainPath = svg.querySelector(".ekg-trace") as SVGPathElement | null;
      const secPath = svg.querySelector(".ekg-secondary") as SVGPathElement | null;

      /* main trace + glow — continuous sweep */
      [glowPath, mainPath].forEach((p) => {
        if (!p) return;
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(p, {
          strokeDashoffset: 0,
          duration: 3,
          repeat: -1,
          ease: "none",
        });
      });

      /* secondary trace — softer, offset */
      if (secPath) {
        const len = secPath.getTotalLength();
        gsap.set(secPath, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(secPath, {
          strokeDashoffset: 0,
          duration: 4.5,
          repeat: -1,
          ease: "none",
          delay: 0.8,
        });
      }

      /* traveling dot — sweep horizontally in sync with trace */
      const dot = svg.querySelector(".ekg-dot");
      if (dot) {
        gsap.to(dot, {
          attr: { cx: 550 },
          duration: 3,
          repeat: -1,
          ease: "none",
        });
      }

      /* heart-beat scale */
      const heart = svg.querySelector(".ekg-heart");
      if (heart) {
        gsap.to(heart, {
          scale: 1.25,
          duration: 0.15,
          repeat: -1,
          repeatDelay: 0.85,
          yoyo: true,
          ease: "power4.out",
          transformOrigin: "center center",
        });
      }

      /* BPM value pulse */
      const bpm = svg.parentElement?.querySelector(".bpm-value");
      if (bpm) {
        gsap.to(bpm, {
          opacity: 0.5,
          duration: 0.1,
          repeat: -1,
          repeatDelay: 0.9,
          yoyo: true,
        });
      }
    }, svg);

    return () => ctx.revert();
  }, []);

  /* EKG path data — medical PQRST waveform */
  const mainD = [
    "M 0 200",
    "L 40 200",
    /* P wave */
    "Q 55 185, 70 200",
    /* flat */
    "L 100 200",
    /* Q dip */
    "L 110 215",
    /* R spike */
    "L 125 60",
    /* S dip */
    "L 140 240",
    /* return */
    "L 155 200",
    /* ST segment */
    "L 195 200",
    /* T wave */
    "Q 215 155, 235 200",
    /* baseline */
    "L 290 200",
    /* P wave 2 */
    "Q 305 185, 320 200",
    "L 350 200",
    /* Q */
    "L 360 215",
    /* R spike 2 */
    "L 375 70",
    /* S */
    "L 390 240",
    /* return */
    "L 405 200",
    "L 445 200",
    /* T wave 2 */
    "Q 465 160, 485 200",
    "L 550 200",
  ].join(" ");

  /* softer secondary trace */
  const secD = [
    "M 0 200",
    "L 60 200",
    "Q 80 190, 100 200",
    "L 140 200",
    "L 150 170",
    "L 160 220",
    "L 170 195",
    "L 220 200",
    "Q 240 185, 260 200",
    "L 320 200",
    "Q 340 190, 360 200",
    "L 400 200",
    "L 410 175",
    "L 420 215",
    "L 430 198",
    "L 480 200",
    "Q 500 188, 520 200",
    "L 550 200",
  ].join(" ");

  return (
    <div className="absolute inset-0">
      <svg
        ref={svgRef}
        viewBox="0 0 550 400"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <defs>
          <linearGradient id="ekg-grad" x1="0" x2="1">
            <stop offset="0%" stopColor="#CC5833" stopOpacity="0" />
            <stop offset="20%" stopColor="#CC5833" stopOpacity="1" />
            <stop offset="80%" stopColor="#CC5833" stopOpacity="1" />
            <stop offset="100%" stopColor="#CC5833" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ekg-sec" x1="0" x2="1">
            <stop offset="0%" stopColor="#2E4036" stopOpacity="0" />
            <stop offset="30%" stopColor="#2E4036" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#2E4036" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#2E4036" stopOpacity="0" />
          </linearGradient>
          <filter id="ekg-blur">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* horizontal reference lines */}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            x2="550"
            y1={40 + i * 35}
            y2={40 + i * 35}
            stroke="#F2F0E9"
            strokeOpacity="0.06"
            strokeWidth="0.5"
          />
        ))}

        {/* vertical reference lines */}
        {Array.from({ length: 14 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 42}
            x2={i * 42}
            y1="0"
            y2="400"
            stroke="#F2F0E9"
            strokeOpacity="0.04"
            strokeWidth="0.5"
          />
        ))}

        {/* glow behind main trace */}
        <path
          d={mainD}
          stroke="#CC5833"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#ekg-blur)"
          opacity="0.3"
          className="ekg-glow"
          style={{ willChange: "stroke-dashoffset" }}
        />

        {/* main trace */}
        <path
          d={mainD}
          stroke="url(#ekg-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ekg-trace"
          style={{ willChange: "stroke-dashoffset" }}
        />

        {/* secondary trace */}
        <path
          d={secD}
          stroke="url(#ekg-sec)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ekg-secondary"
          style={{ willChange: "stroke-dashoffset" }}
        />

        {/* travelling dot on main trace */}
        <circle className="ekg-dot" cx="0" cy="200" r="5" fill="#CC5833" opacity="0.9" />
        <circle className="ekg-dot" cx="0" cy="200" r="12" fill="#CC5833" opacity="0.15" />

        {/* center heart icon */}
        <g
          className="ekg-heart"
          style={{ transformOrigin: "275px 320px" }}
        >
          <path
            d="M275 340 C275 340 250 320 250 308 C250 298 260 292 270 298 L275 302 L280 298 C290 292 300 298 300 308 C300 320 275 340 275 340Z"
            fill="#CC5833"
            fillOpacity="0.3"
          />
        </g>
      </svg>

      {/* HUD readout row */}
      <div className="absolute bottom-14 left-5 right-5 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-4">
          <div>
            <div className="font-mono text-[8px] tracking-widest text-cream/35 uppercase">
              Heart Rate
            </div>
            <div className="bpm-value font-display text-3xl text-clay leading-none mt-0.5">
              54
              <span className="font-mono text-[10px] text-cream/50 ml-1">
                bpm
              </span>
            </div>
          </div>
          <div className="h-8 w-px bg-cream/10" />
          <div>
            <div className="font-mono text-[8px] tracking-widest text-cream/35 uppercase">
              HRV
            </div>
            <div className="font-display text-xl text-cream/80 leading-none mt-0.5">
              78
              <span className="font-mono text-[10px] text-cream/50 ml-1">
                ms
              </span>
            </div>
          </div>
          <div className="h-8 w-px bg-cream/10" />
          <div>
            <div className="font-mono text-[8px] tracking-widest text-cream/35 uppercase">
              Recovery
            </div>
            <div className="font-display text-xl text-green-400/90 leading-none mt-0.5">
              ↑ 94%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
