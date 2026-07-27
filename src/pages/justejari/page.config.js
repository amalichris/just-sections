// Every asset a section renders is page-owned content. Sections ship no imagery,
// so swapping any of these never touches the section library.
import heroBackground from "./assets/hero-bg-1.png";
import appMockup from "./assets/justejari-home-screen-mockup.png";

// Placeholder UI fragments. Swap each one for a real product capture.
import benefitContracts from "./assets/benefit-1-contracts.svg";
import benefitGenerate from "./assets/benefit-2-generate.svg";
import benefitFields from "./assets/benefit-3-fields.svg";
import stepOpen from "./assets/step-1-open.svg";
import stepFill from "./assets/step-2-fill.svg";
import stepPdf from "./assets/step-3-pdf.svg";

/**
 * JustEjari landing page configuration.
 *
 * The shape stays JSON-like so the same data could later come from a CMS. It
 * is a JS module rather than JSON so it can import hashed assets, carry
 * comments, and share values through plain constants — there is deliberately
 * no template-token interpolation layer.
 *
 * Omitting an optional key omits the element. Each section documents which of
 * its props are required in its dossier `plan.md`.
 */

const PRODUCT_NAME = "JustEjari";

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
        eyebrow: "What you get",
        title: "A rental contract you can hand over today.",
        subtitle:
          "Preview copy. Final wording states one outcome per card, in the tenant's or landlord's own words.",
        items: [
          {
            id: "contracts",
            title: "A finished contract in minutes, not an evening",
            description:
              "Answer a short set of questions and get a complete rental contract, ready to print or send.",
            media: {
              src: benefitContracts,
              alt: "Placeholder for a capture of the JustEjari contract list",
            },
            proof: {
              quote:
                "Preview quote. A real customer line belongs here, making the same claim as this card.",
              attribution: "Preview attribution",
            },
          },
          {
            id: "generate",
            title: "Export a PDF that looks official",
            description:
              "One tap turns your answers into a formatted document with every clause in place.",
            media: {
              src: benefitGenerate,
              alt: "Placeholder for a capture of a generated contract PDF",
            },
          },
          {
            id: "fields",
            title: "Details you enter once",
            description:
              "Your property and party details carry across contracts, so the second one is faster than the first.",
            media: {
              src: benefitFields,
              alt: "Placeholder for a capture of the contract detail fields",
            },
          },
        ],
      },
    },
    {
      type: "how-it-works-default",
      id: "how-it-works",
      props: {
        eyebrow: "How it works",
        title: "Three steps, start to signature.",
        subtitle:
          "Preview copy. Each step names what the visitor does and what they get back.",
        steps: [
          {
            id: "open",
            title: "Open it inside Telegram",
            description:
              "No new app, no separate account. JustEjari runs in the chat app you already have open.",
            media: {
              src: stepOpen,
              alt: "Placeholder for the JustEjari start screen inside Telegram",
            },
          },
          {
            id: "fill",
            title: "Fill in the details once",
            description:
              "Property, parties, dates, and rent. Short questions in plain language, in the order you would say them out loud.",
            media: {
              src: stepFill,
              alt: "Placeholder for the contract detail form",
            },
          },
          {
            id: "pdf",
            title: "Generate the PDF",
            description:
              "Your contract is formatted and ready to send, print, or sign.",
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
        eyebrow: "Simple from the start",
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
        privacyHref: "#privacy",
        termsHref: "#terms",
        surface: "parchment",
      },
    },
  ],
};
