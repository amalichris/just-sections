// Every asset a section renders is page-owned content. Sections ship no imagery,
// so swapping any of these never touches the section library.
import heroBackground from "../../../docs/media-backgrounds/hero-dubai-2.webp";
import appMockup from "./assets/justejari-home-screen-mockup.png";

// Placeholder UI fragments. Swap each one for a real product capture.
import benefitContracts from "./assets/benefit-1-contracts.svg";
import benefitGenerate from "./assets/benefit-2-generate.svg";
import benefitFields from "./assets/benefit-3-fields.svg";
import stepOpen from "./assets/step-1-open.svg";
import stepFill from "./assets/step-2-fill.svg";
import stepPdf from "./assets/step-3-pdf.svg";

/**
 * Demo page configuration for the dev harness.
 *
 * A copy of JustEjari's real page config, taken 2026-07-28. It lives in
 * `src/dev/` and is not published — the library itself stays product-agnostic
 * and asset-free, and nothing here reaches a consumer.
 *
 * Why a real page rather than fixtures: fixtures are written to exercise a
 * section's contract, so they run short and generic, and a section can look
 * fine against them while falling apart under real copy lengths and real
 * imagery. Refining a section is easier when the page around it looks like
 * production.
 *
 * This is a snapshot, deliberately. It will drift from the live JustEjari page
 * and that is fine — it is a rig for looking at sections, not a second source
 * of truth for anyone's marketing copy. Re-copy it when it stops being useful.
 *
 * Note the hero copy is a placeholder in the source config too; it was never
 * written. The imagery around it is real.
 */

const PRODUCT_NAME = "JustEjari";
const ROUTES = { privacy: "/privacy", terms: "/terms" };

// Replace this preview-safe fallback with the live JustEjari Mini App URL when
// it is available.
const justEjariUrl = "#pricing";

export default {
  sections: [
    {
      type: "header-default",
      slot: "header",
      props: {
        brand: { label: PRODUCT_NAME, href: "#top" },
        navigation: [
          { label: "Benefits", targetId: "benefits" },
          { label: "How it works", targetId: "how-it-works" },
          { label: "Pricing", targetId: "pricing" },
        ],
        cta: { label: "Explore preview", href: "#benefits" },
      },
    },
    {
      type: "hero-default",
      id: "top",
      props: {
        title: "JustEjari landing preview",
        subtitle: "A reusable hero and header composition.",
        background: { src: heroBackground, alt: "" },
        media: {
          src: appMockup,
          alt: "JustEjari Contracts home screen showing a rental contract list",
        },
      },
    },
    {
      type: "benefits-default",
      id: "benefits",
      props: {
        eyebrow: "",
        title: "A rental contract you can hand over today.",
        subtitle:
          "Preview copy. Final wording states one outcome per card, in the tenant's or landlord's own words.",
        items: [
          {
            id: "contracts",
            title: "Draft your contracts right from your phone",
            description:
              "Input core property details, rent amounts, and cheque schedules through clean, structured forms. No desktop needed, no broken Word templates.",
            media: {
              src: benefitContracts,
              alt: "Placeholder for a capture of the JustEjari contract list",
            },
            mediaBackdrop: "chianti",
            proof: {
              quote:
                "Custom Addendum Builder",
              attribution: "Coming Soon",
            },
          },
          {
            id: "generate",
            title: "Formatted to official DLD standards",
            description:
              "One tap turns your answers into a formatted document with every clause in place.",
            media: {
              src: benefitGenerate,
              alt: "Placeholder for a capture of a generated contract PDF",
            },
            mediaBackdrop: "sky",
          },
          {
            id: "fields",
            title: "Send a link, skip the manual data entry",
            description:
              "Generate a secure web link for tenants or landlords to enter their own personal details and upload IDs directly—no copy-pasting required.",
            media: {
              src: benefitFields,
              alt: "Placeholder for a capture of the contract detail fields",
            },
            mediaBackdrop: "cypress",
          },
        ],
      },
    },
    {
      type: "how-it-works-default",
      id: "how-it-works",
      props: {
        eyebrow: "",
        title: "Three steps, start to signature.",
        subtitle:
          "Preview copy. Each step names what the visitor does and what they get back.",
        steps: [
          {
            id: "open",
            title: "Start directly inside Telegram",
            description:
              "No new app, no separate account. JustEjari runs in the chat app you already have open.",
            media: {
              src: stepOpen,
              alt: "Placeholder for the JustEjari start screen inside Telegram",
            },
          },
          {
            id: "fill",
            title: "Send links to collect party details",
            description:
              "Share a secure link via WhatsApp or Telegram with one tap. The landlord and tenant submit their own legal names and IDs directly into the web form.",
            media: {
              src: stepFill,
              alt: "Placeholder for the contract detail form",
            },
          },
          {
            id: "pdf",
            title: "Complete vault with shared access",
            description:
              "Download your DLD-compliant PDF contract alongside all attached Emirates IDs, Title Deeds, and passports in one tidy package, then generate a shared link for both parties.",
            media: {
              src: stepPdf,
              alt: "Placeholder for the finished contract PDF",
            },
          },
        ],
        cta: { label: "Open JustEjari", href: justEjariUrl },
      },
    },
    {
      type: "pricing-banner-default",
      id: "pricing",
      props: {
        eyebrow: "",
        title: "Start with 3 PDF generations free.",
        subtitle:
          "Create real contracts and see the full workflow before deciding what comes next.",
        cta: { label: "Open JustEjari", href: justEjariUrl },
      },
    },
    {
      type: "faq-default",
      id: "faq",
      props: {
        eyebrow: "",
        title: "Questions answered",
        subtitle: "",
        surface: "parchment",
        items: [
          {
            id: "create",
            question: "What does JustEjari create?",
            answer:
              "This preview answer is temporary. A production page supplies its own product-specific explanation of the documents JustEjari can help prepare.",
          },
          {
            id: "account",
            question: "Do I need another account?",
            answer:
              "This preview answer is temporary. It demonstrates the space available for a concise explanation of account and access requirements.",
          },
          {
            id: "documents",
            question: "Which documents can I upload?",
            answer:
              "This preview answer is temporary. Final FAQ copy will name the supported document types and any relevant upload limits.",
          },
          {
            id: "editing",
            question: "Can I edit a contract after generating it?",
            answer:
              "This preview answer is temporary. Final product copy will explain the available editing and regeneration flow.",
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
