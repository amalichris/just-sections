// Every asset a section renders is page-owned content. Sections ship no imagery,
// so swapping any of these never touches the section library.
import heroBackground from "../../../../docs/media-backgrounds/hero-dubai-2.webp";

/**
 * Demo page configuration for the dev harness.
 *
 * A copy of JustEjari's editorial landing config (web PRD-005), taken
 * 2026-11-20. It lives in `src/dev/` and is not published — the library itself
 * stays product-agnostic and asset-free, and nothing here reaches a consumer.
 *
 * Why a real page rather than fixtures: fixtures are written to exercise a
 * section's contract, so they run short and generic, and a section can look
 * fine against them while falling apart under real copy lengths and real
 * imagery. The editorial sections also depend on each other: the statement
 * covers the benefit panels, which only a page shows.
 *
 * This is a snapshot, deliberately. It will drift from the live JustEjari page
 * and that is fine — it is a rig for looking at sections, not a second source
 * of truth for anyone's marketing copy. Re-copy it when it stops being useful.
 */

const PRODUCT_NAME = "JustEjari";
const ROUTES = { privacy: "/privacy", terms: "/terms" };
const justEjariUrl = "#pricing";

export default {
  sections: [
    {
      type: "header-default",
      slot: "header",
      props: {
        brand: { label: PRODUCT_NAME, href: "#top" },
        navigation: [
          { label: "The app", targetId: "app-features" },
          { label: "Pricing", targetId: "pricing" },
          { label: "FAQ", targetId: "faq" },
        ],
        cta: { label: "Open JustEjari", href: justEjariUrl },
      },
    },
    {
      type: "hero-default",
      id: "top",
      props: {
        title: "Dubai tenancy contracts from your phone",
        layout: "editorial",
        background: { src: heroBackground, width: 1536, height: 1024, alt: "" },
      },
    },
    {
      type: "benefits-list",
      id: "app-features",
      props: {
        title: "From start to finish",
        subtitle: "Prepare, collect, generate and hand back. Without a chat thread.",
        items: [
          { id: "overview", tone: "chianti", title: "Every contract, and what it still needs.", description: "Drafts, finished contracts and revisions in one list. Section progress shows what is missing. Contracts waiting on you come first." },
          { id: "prepare", tone: "sky", title: "Section by section, from your phone.", description: "Fill in property, tenancy and terms. Upload an Emirates ID, passport or title deed, then check the extracted values before they become contract data." },
          { id: "parties", tone: "cypress", title: "The tenant and landlord fill in their own.", description: "Send each a private link. It opens in any browser, works once and expires after three days. Each party sees only their own request. You get notified when they reply." },
          { id: "generate", tone: "sunflower", title: "One PDF. Contract and addendum.", description: "Generate the DLD contract and addendum together, with the rent schedule, additional clauses and inventory. Need a change? Unlock it and generate a new revision." },
          { id: "vault", tone: "charcoal", title: "Hand back the finished documents. Not by chat.", description: "Give each party a separate vault link. They verify with a six-digit code sent to their email, then download the contract and its documents. You can revoke access anytime." },
        ],
      },
    },
    {
      type: "statement-reveal",
      props: {
        phrases: [
          { id: "link", text: "A broker who sends a link" },
          { id: "photos", text: "instead of asking for photographs" },
          { id: "told", text: "has already told the client" },
          { id: "rest", text: "how the rest of it will go.", accent: true },
        ],
      },
    },
    {
      type: "pricing-banner-default",
      id: "pricing",
      props: {
        title: "Pay per contract.",
        subtitle: "You pay when the contract and addendum are ready. Nothing before that.",
        cta: { label: "Open JustEjari", href: justEjariUrl },
        offer: {
          trial: "3 free generations",
          trialDescription: "Your first three contracts and addenda cost nothing.",
          unit: "Per generation",
          price: "AED 79",
          description: "One PDF with the contract and addendum. Revisions are free.",
          terms: "Plus 5% VAT. No subscription, no monthly fee.",
        },
      },
    },
    {
      type: "faq-default",
      id: "faq",
      props: {
        title: "Questions answered",
        surface: "parchment",
        items: [
          {
            id: "cost",
            question: "What does it cost?",
            answer: "Your first three generations are free. After that, each generation costs AED 79 plus 5% VAT and produces one PDF with the contract and addendum. There is no subscription. Unlocking a contract and generating a new revision is free.",
          },
        ],
      },
    },
    {
      type: "footer-default",
      slot: "footer",
      props: {
        productName: PRODUCT_NAME,
        privacyHref: ROUTES.privacy,
        termsHref: ROUTES.terms,
        surface: "parchment",
      },
    },
  ],
};
