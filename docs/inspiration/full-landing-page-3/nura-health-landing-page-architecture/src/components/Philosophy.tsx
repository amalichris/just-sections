import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(".philo-bg", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Split-text reveals
      const splitLines = (sel: string) => {
        const els = document.querySelectorAll(sel);
        els.forEach((el) => {
          const text = (el as HTMLElement).textContent || "";
          (el as HTMLElement).innerHTML = text
            .split(" ")
            .map(
              (w) =>
                `<span class="word inline-block overflow-hidden align-bottom pr-[0.25em]"><span class="inner inline-block">${w}</span></span>`
            )
            .join(" ");
        });
      };
      splitLines(".philo-line");

      gsap.from(".philo-line .inner", {
        yPercent: 110,
        duration: 1,
        stagger: 0.04,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".philo-block",
          start: "top 75%",
        },
      });

      gsap.from(".philo-meta > *", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".philo-meta",
          start: "top 85%",
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={root}
      className="relative bg-charcoal text-cream py-32 md:py-48 px-6 md:px-10 overflow-hidden"
    >
      {/* Parallax bg */}
      <div className="philo-bg absolute inset-0 -top-20">
        <img
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=2400&q=80"
          alt="Organic texture"
          className="h-[120%] w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/85 to-charcoal" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-16 text-cream/50 font-mono text-xs tracking-widest uppercase">
          <span className="h-px w-10 bg-cream/30" />
          <span>§ 03 — The Manifesto</span>
        </div>

        {/* Headline */}
        <div className="philo-block grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className="font-sans text-5xl md:text-7xl lg:text-8xl tracking-display-2 leading-[0.95]">
              <span className="block text-cream/40 philo-line">
                Modern medicine asks:
              </span>
              <span className="block mt-3 md:mt-5 text-cream philo-line font-serif italic font-light text-6xl md:text-8xl lg:text-9xl">
                <span className="font-sans not-italic font-medium text-cream/80">"</span>What is wrong<span className="font-sans not-italic font-medium text-cream/80">?"</span>
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 flex items-end">
            <h2 className="font-sans text-5xl md:text-7xl lg:text-8xl tracking-display-2 leading-[0.95]">
              <span className="block text-cream philo-line">
                We ask:
              </span>
              <span className="block mt-3 md:mt-5 font-serif italic font-light text-clay philo-line text-6xl md:text-8xl lg:text-9xl">
                What is <span className="font-sans not-italic font-medium text-clay/90">optimal</span>?
              </span>
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="philo-meta mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 max-w-6xl">
          {[
            {
              tag: "01",
              title: "Biology is a system",
              body: "We treat the body as a network of nested rhythms — hormonal, neural, microbial — not a checklist of organs. Optimization means re-tuning the whole instrument.",
            },
            {
              tag: "02",
              title: "Data, not dogma",
              body: "Your protocol is engineered from continuous telemetry, not derived from population averages. Every recommendation is a hypothesis the body tests in real time.",
            },
            {
              tag: "03",
              title: "Compounding returns",
              body: "Like capital, biology responds to consistent input. Our members don't see instant spikes — they see exponential, durable performance over months and years.",
            },
          ].map((b) => (
            <div key={b.tag} className="border-t border-cream/15 pt-6">
              <div className="font-mono text-[10px] tracking-widest text-clay uppercase">
                {b.tag}
              </div>
              <h3 className="mt-4 font-display text-2xl text-cream tracking-tight-2">
                {b.title}
              </h3>
              <p className="mt-3 text-cream/65 text-sm leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="philo-meta mt-24 md:mt-32 max-w-4xl">
          <div className="font-serif italic text-3xl md:text-5xl text-cream/85 leading-snug">
            "We are not a wellness brand. We are an{" "}
            <span className="text-clay">operating system</span> for the second half of
            your life."
          </div>
          <div className="mt-6 flex items-center gap-3 font-mono text-xs tracking-widest text-cream/40 uppercase">
            <div className="h-8 w-8 rounded-full bg-cream/20" />
            <div>
              <div className="text-cream/70">Dr. Lena Marchetti</div>
              <div>Founder, Chief Medical Officer</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
