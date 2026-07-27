import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Activity, CalendarCheck2, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const auditItems = [
  {
    label: "Epigenetic Age",
    sub: "Biological vs. Chronological",
    value: "31.2",
    unit: "yrs",
    delta: "−4.8",
    detail: "Methylation clock within 96th percentile for cohort.",
  },
  {
    label: "Microbiome Score",
    sub: "Diversity index, Shannon H'",
    value: "4.21",
    unit: "H'",
    delta: "+0.62",
    detail: "Phylum balance: Firmicutes 42%, Bacteroidetes 38%.",
  },
  {
    label: "Cortisol Optimization",
    sub: "Diurnal slope, AUC",
    value: "−18%",
    unit: "AUC",
    delta: "−7.4%",
    detail: "AM/PM ratio normalized. Recovery score 8.4/10.",
  },
  {
    label: "HRV Baseline",
    sub: "rMSSD, 7-day rolling",
    value: "78",
    unit: "ms",
    delta: "+12",
    detail: "Parasympathetic tone in optimal range.",
  },
];

const telemetryMessages = [
  "Optimizing Circadian Rhythm...",
  "Sampling lipid panel · 247 metabolites indexed",
  "Correlating HRV with sleep architecture...",
  "Cross-referencing methylome with cohort baseline",
  "Adapting supplement timing to cortisol curve",
  "Mitochondrial efficiency: 94.2% · within tolerance",
  "Compounding adherence signal: 18 day streak",
];

const days = ["S", "M", "T", "W", "T", "F", "S"];

export default function Features() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feat-headline .word", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.05,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".feat-headline",
          start: "top 80%",
        },
      });
      gsap.from(".feat-card", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".feat-grid",
          start: "top 75%",
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={root}
      className="relative bg-cream py-24 md:py-36 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6 text-moss/70 font-mono text-xs tracking-widest uppercase">
              <span className="h-px w-10 bg-moss/30" />
              <span>§ 02 — Diagnostic Surface</span>
            </div>
            <h2 className="feat-headline font-sans text-5xl md:text-7xl tracking-display-2 text-charcoal max-w-3xl">
              <span className="word inline-block">A</span>{" "}
              <span className="word inline-block font-serif italic font-light text-clay">living</span>{" "}
              <span className="word inline-block">instrument</span>
              <br />
              <span className="word inline-block">for</span>{" "}
              <span className="word inline-block">human</span>{" "}
              <span className="word inline-block font-serif italic font-light text-clay">optimization.</span>
            </h2>
          </div>
          <p className="max-w-sm text-charcoal/65 text-base leading-relaxed">
            Three functional surfaces, continuously recalibrating. Each module is
            a real artifact from the Nura operating system — not a mock.
          </p>
        </div>

        {/* Cards grid */}
        <div className="feat-grid grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AuditIntelligenceCard />
          <NeuralStreamCard />
          <RegimenCard />
        </div>
      </div>
    </section>
  );
}

/* CARD 1 — DIAGNOSTIC SHUFFLER */
function AuditIntelligenceCard() {
  const [stack, setStack] = useState(auditItems);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStack((prev) => {
        const next = [...prev];
        const popped = next.pop()!;
        next.unshift(popped);
        return next;
      });
      setActive((a) => (a + 1) % auditItems.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="feat-card group relative rounded-[2.5rem] bg-moss text-cream p-8 md:p-10 min-h-[560px] overflow-hidden flex flex-col">
      {/* bg ornament */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-clay/20 blur-3xl" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #F2F0E9 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-cream/50">
            <Brain className="h-3 w-3" />
            Module 01
          </div>
          <h3 className="mt-3 font-display text-2xl md:text-3xl tracking-tight-2">
            Audit <span className="font-serif italic font-light">Intelligence</span>
          </h3>
        </div>
        <span className="font-mono text-[10px] tracking-widest text-cream/50">
          v.4.1
        </span>
      </div>

      {/* Shuffling stack */}
      <div className="relative flex-1 mt-10">
        <div className="relative h-[280px]">
          {stack.slice(0, 3).map((item, i) => {
            const isTop = i === 0;
            return (
              <div
                key={item.label}
                className="absolute inset-x-0 spring-bounce"
                style={{
                  top: i * 14,
                  transform: `scale(${1 - i * 0.05})`,
                  zIndex: 10 - i,
                  opacity: 1 - i * 0.35,
                }}
              >
                <div
                  className={[
                    "rounded-3xl p-5 border",
                    isTop
                      ? "bg-cream text-charcoal border-cream shadow-2xl"
                      : "bg-cream/5 border-cream/15 backdrop-blur-sm",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={[
                        "font-mono text-[10px] tracking-widest uppercase",
                        isTop ? "text-clay" : "text-cream/50",
                      ].join(" ")}
                    >
                      {item.sub}
                    </div>
                    <div
                      className={[
                        "font-mono text-[10px] tracking-widest",
                        isTop ? "text-moss" : "text-cream/40",
                      ].join(" ")}
                    >
                      {item.delta}
                    </div>
                  </div>
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <div
                        className={[
                          "font-display text-4xl tracking-tight-2",
                          isTop ? "text-charcoal" : "text-cream",
                        ].join(" ")}
                      >
                        {item.value}
                        <span
                          className={[
                            "ml-1 text-sm font-sans font-normal",
                            isTop ? "text-charcoal/40" : "text-cream/40",
                          ].join(" ")}
                        >
                          {item.unit}
                        </span>
                      </div>
                      <div
                        className={[
                          "mt-1 text-sm font-medium",
                          isTop ? "text-moss" : "text-cream/80",
                        ].join(" ")}
                      >
                        {item.label}
                      </div>
                    </div>
                    {isTop && (
                      <button className="h-9 w-9 rounded-full bg-moss text-cream flex items-center justify-center magnetic-btn">
                        <ArrowUpRight className="relative z-10 h-4 w-4" />
                      </button>
                    )}
                  </div>
                  {isTop && (
                    <p className="mt-3 text-xs text-charcoal/60 leading-relaxed border-t border-charcoal/10 pt-3">
                      {item.detail}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer row */}
      <div className="relative mt-6 flex items-center justify-between text-cream/60 font-mono text-[10px] tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-clay pulse-dot" />
          Streaming · 3s
        </div>
        <div className="flex gap-1">
          {auditItems.map((_, i) => (
            <span
              key={i}
              className={[
                "h-1 w-6 rounded-full transition-all",
                i === auditItems.length - 1 - active ? "bg-clay" : "bg-cream/15",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* CARD 2 — NEURAL STREAM (Typewriter) */
function NeuralStreamCard() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [logs, setLogs] = useState<string[]>([
    "[09:14:02] session.init → user.04a",
    "[09:14:05] biometric.fetch → 412 signals",
    "[09:14:08] cohort.match → n=2,341",
  ]);

  useEffect(() => {
    const msg = telemetryMessages[msgIdx];
    let i = 0;
    setTyped("");
    const id = setInterval(() => {
      i++;
      setTyped(msg.slice(0, i));
      if (i >= msg.length) {
        clearInterval(id);
        setTimeout(() => {
          setLogs((l) =>
            [
              `[${new Date().toISOString().slice(11, 19)}] ${msg} ✓`,
              ...l,
            ].slice(0, 6)
          );
          setMsgIdx((idx) => (idx + 1) % telemetryMessages.length);
        }, 900);
      }
    }, 35);
    return () => clearInterval(id);
  }, [msgIdx]);

  return (
    <div className="feat-card group relative rounded-[2.5rem] bg-cream border border-charcoal/8 p-8 md:p-10 min-h-[560px] overflow-hidden flex flex-col shadow-[0_30px_60px_-30px_rgba(26,26,26,0.15)]">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-moss/70">
            <Activity className="h-3 w-3" />
            Module 02
          </div>
          <h3 className="mt-3 font-display text-2xl md:text-3xl tracking-tight-2 text-charcoal">
            Neural <span className="font-serif italic font-light text-clay">Stream</span>
          </h3>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-moss/20 bg-cream px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 pulse-dot" />
          <span className="font-mono text-[10px] tracking-widest text-moss uppercase">
            Live Feed
          </span>
        </div>
      </div>

      {/* Live waveform */}
      <div className="mt-6 h-16 rounded-2xl bg-moss/5 border border-moss/10 overflow-hidden relative">
        <svg viewBox="0 0 400 60" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wf" x1="0" x2="1">
              <stop offset="0" stopColor="#2E4036" stopOpacity="0" />
              <stop offset="0.5" stopColor="#2E4036" stopOpacity="1" />
              <stop offset="1" stopColor="#2E4036" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 30 Q 20 10, 40 30 T 80 30 T 120 30 T 160 30 T 200 30 T 240 30 T 280 30 T 320 30 T 360 30 T 400 30"
            stroke="url(#wf)"
            strokeWidth="1.5"
            fill="none"
            className="ekg-path"
          />
        </svg>
      </div>

      {/* Typewriter line */}
      <div className="mt-6 min-h-[60px]">
        <div className="font-mono text-[10px] tracking-widest uppercase text-charcoal/40 mb-1.5">
          ▸ active.task
        </div>
        <div className="font-mono text-base md:text-lg text-charcoal">
          {typed}
          <span className="inline-block w-2.5 h-5 bg-clay align-middle ml-0.5 cursor-blink" />
        </div>
      </div>

      {/* Log stream */}
      <div className="mt-6 flex-1 rounded-2xl bg-charcoal p-5 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px] tracking-widest text-cream/50 uppercase">
            ◤ console
          </span>
          <span className="font-mono text-[10px] text-cream/30">
            tail -f nura.log
          </span>
        </div>
        <ul className="space-y-1.5 font-mono text-[11px] text-cream/75 leading-relaxed">
          {logs.map((l, i) => (
            <li
              key={l + i}
              className="truncate"
              style={{ opacity: 1 - i * 0.12 }}
            >
              {l}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex items-center justify-between font-mono text-[10px] tracking-widest uppercase text-charcoal/40">
        <span>↑ {telemetryMessages.length} queued</span>
        <span>{msgIdx + 1}/{telemetryMessages.length}</span>
      </div>
    </div>
  );
}

/* CARD 3 — REGIMEN SCHEDULER */
function RegimenCard() {
  const [active, setActive] = useState<number | null>(null);
  const [cursorStep, setCursorStep] = useState(0); // 0 hidden, 1-7 move, 8 click, 9 move to save
  const [showSaved, setShowSaved] = useState(false);

  // Reset loop
  useEffect(() => {
    const cycle = () => {
      setActive(null);
      setShowSaved(false);
      setCursorStep(0);
      const positions = [
        { day: 2, delay: 600 },
        { day: 4, delay: 900 },
        { day: 5, delay: 1100 },
      ];
      let total = 0;
      positions.forEach(({ day, delay }, idx) => {
        setTimeout(() => {
          setCursorStep(idx + 1);
          setActive(day);
        }, total + delay);
        total += delay;
      });
      // Click save
      setTimeout(() => setCursorStep(8), total + 600);
      setTimeout(() => setShowSaved(true), total + 1000);
      setTimeout(() => setCursorStep(9), total + 1100);
    };
    cycle();
    const id = setInterval(cycle, 7000);
    return () => clearInterval(id);
  }, []);

  // active cursor (day index 0-6) or null
  const activeDayCursor =
    cursorStep >= 1 && cursorStep <= 7 ? cursorStep - 1 : null;
  const isOnSave = cursorStep === 8 || cursorStep === 9;

  return (
    <div className="feat-card group relative rounded-[2.5rem] bg-clay text-cream p-8 md:p-10 min-h-[560px] overflow-hidden flex flex-col">
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 10%, #F2F0E9 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-moss/40 blur-3xl" />

      <div className="relative flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-cream/70">
            <CalendarCheck2 className="h-3 w-3" />
            Module 03
          </div>
          <h3 className="mt-3 font-display text-2xl md:text-3xl tracking-tight-2">
            Adaptive <span className="font-serif italic font-light">Regimen</span>
          </h3>
        </div>
        <span className="font-mono text-[10px] tracking-widest text-cream/50">
          WK 16
        </span>
      </div>

      {/* Week grid */}
      <div className="relative mt-10">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[10px] tracking-widest text-cream/60 uppercase">
            ◤ 16 · Mar
          </span>
          <span className="font-mono text-[10px] text-cream/60">
            {active !== null ? "saving..." : "idle"}
          </span>
        </div>

        <div className="relative">
          <div className="grid grid-cols-7 gap-2.5">
            {days.map((d, i) => {
              const isActive = active === i;
              const isPast = active !== null && i < active;
              const cursorHere = activeDayCursor === i;
              return (
                <div
                  key={i}
                  className={[
                    "relative rounded-2xl border aspect-square flex flex-col items-center justify-center transition-all duration-500 spring-bounce",
                    isActive
                      ? "bg-cream text-charcoal border-cream scale-105"
                      : isPast
                      ? "bg-cream/20 border-cream/30 text-cream"
                      : "bg-cream/5 border-cream/15 text-cream/50",
                  ].join(" ")}
                >
                  <span className="font-mono text-[9px] tracking-widest opacity-70">
                    {d}
                  </span>
                  <span className="font-display text-sm mt-0.5">
                    {14 + i}
                  </span>
                  {isActive && (
                    <span className="absolute -top-1.5 -right-1.5 h-3 w-3 rounded-full bg-clay border-2 border-charcoal" />
                  )}
                  {cursorHere && (
                    <div
                      className="absolute -top-5 -right-5 pointer-events-none transition-all duration-500 ease-out"
                      style={{
                        transform:
                          cursorStep === 8
                            ? "translate(40px, 60px) scale(0.85)"
                            : "translate(0, 0) scale(1)",
                        opacity: showSaved ? 0 : 1,
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
                        <path
                          d="M5 3 L5 17 L9 13 L11.5 19 L13.5 18 L11 12 L17 12 Z"
                          fill="white"
                          stroke="#1A1A1A"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* SVG Cursor for save button step */}
          {isOnSave && !showSaved && (
            <div
              className="absolute right-2 -bottom-1 pointer-events-none transition-all duration-500 ease-out"
              style={{ transform: "translate(0,0)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
                <path
                  d="M5 3 L5 17 L9 13 L11.5 19 L13.5 18 L11 12 L17 12 Z"
                  fill="white"
                  stroke="#1A1A1A"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}

          {/* Save bar */}
          <div className="mt-8 flex items-center justify-between">
            <div>
              <div className="font-mono text-[10px] tracking-widest text-cream/60 uppercase">
                next.dose
              </div>
              <div className="font-display text-lg mt-0.5">
                L-Theanine · 200mg
              </div>
            </div>
            <button
              className={[
                "relative rounded-full px-5 py-2.5 text-xs font-mono tracking-widest uppercase transition-all duration-500",
                showSaved
                  ? "bg-cream text-moss"
                  : "bg-cream/15 border border-cream/30 text-cream",
              ].join(" ")}
            >
              {showSaved ? "✓ Saved" : "Save"}
            </button>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-2">
            {[
              { k: "Adherence", v: "94%" },
              { k: "Streak", v: "16d" },
              { k: "Doses", v: "112" },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-2xl bg-cream/5 border border-cream/15 p-3"
              >
                <div className="font-mono text-[9px] tracking-widest text-cream/50 uppercase">
                  {s.k}
                </div>
                <div className="font-display text-lg mt-0.5">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
