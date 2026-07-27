import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".hero-eyebrow > *", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
      })
        .from(
          ".hero-line-1 .word",
          { y: 80, opacity: 0, duration: 1, stagger: 0.06, ease: "expo.out" },
          "-=0.5"
        )
        .from(
          ".hero-line-2 .word",
          { y: 100, opacity: 0, duration: 1.1, stagger: 0.05, ease: "expo.out" },
          "-=0.75"
        )
        .from(
          ".hero-sub",
          { y: 24, opacity: 0, duration: 0.9, ease: "power3.out" },
          "-=0.5"
        )
        .from(
          ".hero-cta > *",
          { y: 24, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
          "-=0.5"
        )
        .from(
          ".hero-meta",
          { opacity: 0, y: 16, duration: 0.8, stagger: 0.08, ease: "power3.out" },
          "-=0.4"
        );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative min-h-[100dvh] w-full overflow-hidden bg-charcoal text-cream"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=2400&q=80"
          alt="Moody forest"
          className="h-full w-full object-cover scale-105"
        />
        {/* Moss-to-black gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-moss/60 to-charcoal" />
        <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/80 via-transparent to-transparent" />
        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)" }} />
      </div>

      {/* Top eyebrow */}
      <div className="absolute top-24 left-6 md:left-12 hero-eyebrow flex items-center gap-3 text-cream/70 font-mono text-xs tracking-widest uppercase">
        <span className="h-px w-10 bg-cream/40" />
        <span>Series 04 · Biological Audit</span>
        <span className="h-1.5 w-1.5 rounded-full bg-clay animate-pulse" />
      </div>

      {/* Side label */}
      <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 hero-meta">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/50 rotate-90 origin-center whitespace-nowrap">
          ◤ 47.6062° N · 122.3321° W
        </div>
        <div className="h-24 w-px bg-gradient-to-b from-transparent via-cream/30 to-transparent" />
      </div>

      {/* Bottom-left content */}
      <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-sans text-cream">
            <span className="hero-line-1 block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-display-2">
              <span className="word inline-block">Nature</span>{" "}
              <span className="word inline-block">is</span>{" "}
              <span className="word inline-block">the</span>
            </span>
            <span className="hero-line-2 block font-serif italic font-light text-clay text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[13rem] tracking-display leading-none -mt-2 md:-mt-4">
              <span className="word inline-block">Algorithm.</span>
            </span>
          </h1>

          <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p className="hero-sub max-w-md text-cream/75 text-base md:text-lg leading-relaxed">
              A clinical boutique rewriting performance medicine. We decode your{" "}
              <span className="font-serif italic text-cream">biology</span> and engineer
              protocols that compound like interest.
            </p>

            <div className="hero-cta flex flex-wrap items-center gap-3">
              <a
                href="#membership"
                className="magnetic-btn magnetic-clay inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Reserve Intake
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
              <a
                href="#features"
                className="magnetic-btn inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3.5 text-sm font-medium text-cream"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-clay" />
                  Watch the Protocol
                </span>
              </a>
            </div>
          </div>

          {/* Hero meta strip */}
          <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-cream/10 rounded-3xl overflow-hidden border border-cream/10">
            {[
              { k: "01", l: "Diagnostic Vessels", v: "847 biomarkers" },
              { k: "02", l: "Mean Onboarding", v: "11.4 days" },
              { k: "03", l: "Members Audited", v: "2,341" },
              { k: "04", l: "Protocol Adherence", v: "94.6%" },
            ].map((m) => (
              <div key={m.k} className="hero-meta bg-charcoal/40 backdrop-blur-md p-5">
                <div className="font-mono text-[10px] tracking-widest text-clay">{m.k}</div>
                <div className="mt-2 text-xs uppercase tracking-wider text-cream/50">{m.l}</div>
                <div className="mt-1 font-display text-xl text-cream">{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom-corner small ID */}
      <div className="hidden md:flex absolute bottom-6 right-8 hero-meta items-center gap-2 font-mono text-[10px] tracking-widest text-cream/40 uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-green-400 pulse-dot" />
        System Operational · 2026.Q1
      </div>
    </section>
  );
}
