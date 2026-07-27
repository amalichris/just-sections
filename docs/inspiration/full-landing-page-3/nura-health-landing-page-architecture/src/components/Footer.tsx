import { ArrowUpRight } from "lucide-react";

const Instagram = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const Twitter = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);
const Linkedin = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative bg-charcoal text-cream rounded-t-[4rem] px-6 md:px-10 pt-20 md:pt-28 pb-10 overflow-hidden">
      {/* Top marquee */}
      <div className="absolute -top-6 left-0 right-0 overflow-hidden border-y border-cream/10 py-4">
        <div className="marquee-track flex gap-12 whitespace-nowrap font-serif italic text-3xl md:text-5xl text-cream/30 font-light">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12 shrink-0">
              <span>Nature is the algorithm</span>
              <span>·</span>
              <span>Decode your biology</span>
              <span>·</span>
              <span className="text-clay/60">Nura · est. 2024</span>
              <span>·</span>
              <span>Engineering the second half of life</span>
              <span>·</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Big CTA */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20 md:mb-24">
          <div className="md:col-span-8">
            <div className="flex items-center gap-3 mb-6 text-cream/50 font-mono text-xs tracking-widest uppercase">
              <span className="h-px w-10 bg-cream/30" />
              <span>§ 06 — The door is open</span>
            </div>
            <h2 className="font-sans text-5xl md:text-7xl lg:text-8xl tracking-display-2 leading-[0.95]">
              Ready to{" "}
              <span className="font-serif italic font-light text-clay">rewrite</span>{" "}
              your <br className="hidden md:block" />
              biological contract?
            </h2>
          </div>
          <div className="md:col-span-4 flex flex-col items-start md:items-end justify-end gap-3">
            <a
              href="#membership"
              className="magnetic-btn magnetic-clay inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium"
            >
              <span className="relative z-10 flex items-center gap-2">
                Reserve intake
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
            <a
              href="#"
              className="magnetic-btn inline-flex items-center gap-2 rounded-full border border-cream/20 px-6 py-3.5 text-sm font-medium text-cream"
            >
              <span className="relative z-10">Speak with admissions</span>
            </a>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 pb-12 border-b border-cream/10">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-cream/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-cream" fill="none">
                  <path d="M12 2C8 8 4 10 4 14a8 8 0 0016 0c0-4-4-6-8-12z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 8v12M9 14l3 3 3-3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <span className="font-display text-lg font-semibold tracking-tight-2">
                Nura<span className="font-serif italic font-light">·</span>Health
              </span>
            </div>
            <p className="mt-5 text-cream/55 text-sm max-w-sm leading-relaxed">
              A clinical boutique operating from Seattle, Lisbon and Singapore. We
              design and run long-horizon biological protocols for a small cohort of
              members.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 rounded-full border border-cream/15 flex items-center justify-center text-cream/70 hover:text-cream hover:bg-cream/10 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            {
              t: "Protocol",
              l: ["Intake", "Mapping", "Engineering", "Recalibration"],
            },
            {
              t: "Practice",
              l: ["Philosophy", "Clinical team", "Advisors", "Journal"],
            },
            {
              t: "Members",
              l: ["Foundations", "Performance", "Longevity", "FAQ"],
            },
          ].map((col) => (
            <div key={col.t}>
              <div className="font-mono text-[10px] tracking-widest text-cream/40 uppercase mb-4">
                {col.t}
              </div>
              <ul className="space-y-2.5">
                {col.l.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-cream/75 text-sm hover:text-cream transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase">
            <span className="h-2 w-2 rounded-full bg-green-400 pulse-dot" />
            <span className="text-cream/80">System Operational</span>
            <span className="text-cream/40">·</span>
            <span className="text-cream/40">All regions</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] tracking-widest uppercase text-cream/40">
            <span>© 2026 Nura Health, PBC</span>
            <a href="#" className="hover:text-cream/70">Privacy</a>
            <a href="#" className="hover:text-cream/70">Terms</a>
            <a href="#" className="hover:text-cream/70">HIPAA Notice</a>
            <a href="#" className="hover:text-cream/70">Press</a>
          </div>
        </div>

        {/* Final signature */}
        <div className="mt-20 text-center">
          <div className="font-serif italic text-7xl md:text-9xl text-cream/10 leading-none select-none">
            Nura
          </div>
        </div>
      </div>
    </footer>
  );
}
