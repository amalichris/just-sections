import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ArrowUpRight, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  {
    name: "Foundations",
    serif: "essentials.",
    price: "$490",
    period: "/month",
    desc: "A clinical baseline for those beginning their biological audit.",
    features: [
      "Annual blood panel (84 biomarkers)",
      "Quarterly physician consults",
      "Adaptive nutrition framework",
      "Nura mobile app access",
    ],
    cta: "Begin Foundations",
    accent: false,
  },
  {
    name: "Performance",
    serif: "the protocol.",
    price: "$1,240",
    period: "/month",
    desc: "Our flagship membership. Continuous data, weekly recalibration.",
    features: [
      "Whole-genome sequencing + methylome",
      "Continuous glucose & HRV monitor",
      "Bi-weekly physician recalibration",
      "Concierge trainer + sleep coach",
      "Compounding trajectory forecast",
    ],
    cta: "Reserve Intake",
    accent: true,
  },
  {
    name: "Longevity",
    serif: "the long game.",
    price: "$3,800",
    period: "/month",
    desc: "Decade-scale optimization with full biomedical integration.",
    features: [
      "Full-body MRI + DEXA + CAC score",
      "Monthly CMO consultation",
      "Personal on-call medical team",
      "Cellular age reversal trials",
      "Estate & family protocol planning",
    ],
    cta: "Speak with admissions",
    accent: false,
  },
];

export default function Membership() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".memb-head .word", {
        y: 70,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".memb-head",
          start: "top 80%",
        },
      });
      gsap.from(".memb-card", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".memb-grid",
          start: "top 75%",
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="membership"
      ref={root}
      className="relative bg-cream py-24 md:py-36 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6 text-moss/70 font-mono text-xs tracking-widest uppercase">
              <span className="h-px w-10 bg-moss/30" />
              <span>§ 05 — Membership</span>
            </div>
            <h2 className="memb-head font-sans text-5xl md:text-7xl lg:text-8xl tracking-display-2 max-w-4xl text-charcoal">
              <span className="word inline-block">Choose</span>{" "}
              <span className="word inline-block">your</span>{" "}
              <span className="word inline-block font-serif italic font-light text-clay">depth</span>{" "}
              <span className="word inline-block">of</span>{" "}
              <span className="word inline-block">audit.</span>
            </h2>
          </div>
          <p className="max-w-sm text-charcoal/65 text-base leading-relaxed">
            All memberships include lifetime access to your digital twin and the
            cumulative learnings of the Nura cohort.
          </p>
        </div>

        <div className="memb-grid grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={[
                "memb-card relative rounded-[2.5rem] p-8 md:p-10 flex flex-col",
                t.accent
                  ? "bg-moss text-cream shadow-[0_40px_80px_-30px_rgba(46,64,54,0.6)] lg:scale-[1.03] lg:-translate-y-2"
                  : "bg-cream-2 border border-charcoal/8 text-charcoal",
              ].join(" ")}
            >
              {t.accent && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-clay text-cream px-3.5 py-1 font-mono text-[10px] tracking-widest uppercase">
                  <Sparkles className="h-3 w-3" />
                  Most Compounding
                </div>
              )}

              <div>
                <div
                  className={[
                    "font-mono text-[10px] tracking-widest uppercase",
                    t.accent ? "text-cream/60" : "text-moss/60",
                  ].join(" ")}
                >
                  Tier
                </div>
                <h3 className="mt-2 font-display text-3xl md:text-4xl tracking-tight-2">
                  {t.name}
                </h3>
                <div
                  className={[
                    "font-serif italic text-3xl md:text-4xl font-light",
                    t.accent ? "text-clay" : "text-clay/80",
                  ].join(" ")}
                >
                  {t.serif}
                </div>
              </div>

              <div className="mt-8 flex items-baseline gap-2">
                <span className="font-display text-5xl md:text-6xl tracking-display-2">
                  {t.price}
                </span>
                <span
                  className={[
                    "font-mono text-sm",
                    t.accent ? "text-cream/60" : "text-charcoal/50",
                  ].join(" ")}
                >
                  {t.period}
                </span>
              </div>

              <p
                className={[
                  "mt-5 text-sm leading-relaxed",
                  t.accent ? "text-cream/70" : "text-charcoal/65",
                ].join(" ")}
              >
                {t.desc}
              </p>

              <ul className="mt-8 space-y-3 flex-1">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className={[
                      "flex items-start gap-3 text-sm",
                      t.accent ? "text-cream/85" : "text-charcoal/75",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "mt-0.5 h-5 w-5 rounded-full flex items-center justify-center shrink-0",
                        t.accent ? "bg-clay/20" : "bg-moss/10",
                      ].join(" ")}
                    >
                      <Check
                        className={[
                          "h-3 w-3",
                          t.accent ? "text-clay" : "text-moss",
                        ].join(" ")}
                        strokeWidth={3}
                      />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={[
                  "magnetic-btn mt-10 inline-flex items-center justify-between gap-2 rounded-full px-6 py-3.5 text-sm font-medium",
                  t.accent
                    ? "magnetic-clay text-cream"
                    : "bg-charcoal text-cream",
                ].join(" ")}
              >
                <span className="relative z-10">{t.cta}</span>
                <ArrowUpRight className="relative z-10 h-4 w-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Guarantees */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { k: "01", l: "Cohort-vetted", v: "Every protocol" },
            { k: "02", l: "Privacy", v: "HIPAA + on-device ML" },
            { k: "03", l: "Cancellation", v: "Month-to-month" },
            { k: "04", l: "Onboarding", v: "11.4 day mean" },
          ].map((g) => (
            <div
              key={g.k}
              className="rounded-2xl border border-charcoal/8 p-5"
            >
              <div className="font-mono text-[10px] tracking-widest text-clay">
                {g.k}
              </div>
              <div className="mt-2 font-mono text-[10px] tracking-widest uppercase text-charcoal/50">
                {g.l}
              </div>
              <div className="mt-1 font-display text-base text-charcoal">
                {g.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
