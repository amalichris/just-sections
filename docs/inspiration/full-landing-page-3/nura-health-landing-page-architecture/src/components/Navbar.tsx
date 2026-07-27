import { useEffect, useState } from "react";
import gsap from "gsap";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-item", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        delay: 2.2,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4 pointer-events-none">
      <nav
        className={[
          "pointer-events-auto flex items-center justify-between gap-6",
          "rounded-full transition-all duration-500 ease-out",
          "px-3 py-2.5 w-full max-w-5xl",
          scrolled
            ? "bg-cream/70 backdrop-blur-xl border border-moss/15 shadow-[0_8px_32px_rgba(26,26,26,0.08)]"
            : "bg-transparent border border-transparent",
        ].join(" ")}
      >
        {/* Logo */}
        <a href="#" className="nav-item flex items-center gap-2.5 pl-3 pr-2">
          <div className="relative h-8 w-8 rounded-full bg-moss flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-moss to-charcoal" />
            <svg viewBox="0 0 24 24" className="relative h-4 w-4 text-cream" fill="none">
              <path d="M12 2C8 8 4 10 4 14a8 8 0 0016 0c0-4-4-6-8-12z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 8v12M9 14l3 3 3-3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <span
            className={[
              "font-display text-lg font-semibold tracking-tight-2 transition-colors duration-500",
              scrolled ? "text-moss" : "text-cream",
            ].join(" ")}
          >
            Nura<span className="font-serif italic font-light">·</span>Health
          </span>
        </a>

        {/* Center links */}
        <ul className="hidden md:flex items-center gap-1">
          {["Protocol", "Philosophy", "Membership", "Journal"].map((l) => (
            <li key={l} className="nav-item">
              <a
                href={`#${l.toLowerCase()}`}
                className={[
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300",
                  scrolled
                    ? "text-moss hover:bg-moss/10"
                    : "text-cream/90 hover:text-cream hover:bg-cream/10",
                ].join(" ")}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="nav-item flex items-center gap-2 pr-1">
          <a
            href="#membership"
            className={[
              "hidden sm:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium magnetic-btn",
              scrolled
                ? "bg-moss text-cream"
                : "bg-cream/15 text-cream border border-cream/30 backdrop-blur",
            ].join(" ")}
          >
            <span className="relative z-10">Begin Audit</span>
            <svg viewBox="0 0 24 24" className="relative z-10 h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
          <button
            onClick={() => setMobileOpen((s) => !s)}
            aria-label="Menu"
            className={[
              "md:hidden h-10 w-10 rounded-full flex items-center justify-center transition-colors",
              scrolled ? "text-moss bg-moss/10" : "text-cream bg-cream/15",
            ].join(" ")}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="pointer-events-auto absolute top-20 left-4 right-4 md:hidden rounded-3xl bg-cream/95 backdrop-blur-xl border border-moss/15 p-4 shadow-xl">
          <ul className="flex flex-col gap-1">
            {["Protocol", "Philosophy", "Membership", "Journal"].map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-2xl text-moss hover:bg-moss/10 text-base"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
