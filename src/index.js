/**
 * Public entry point for the section library.
 *
 * A consumer composes pages from configuration:
 *
 *   import { ProductPage } from 'just-sections'
 *   import 'just-sections/styles/tokens.css'
 *   import config from './page.config'
 *
 *   <ProductPage config={config} />
 *
 * Stylesheets are separate export paths rather than side-effect imports here,
 * so a host application can take `tokens.css` without also taking the global
 * reset. See `styles/reset.css` for why that distinction matters.
 *
 * Section components are exported individually for the rare case a consumer
 * renders one directly, but the configuration path is the supported one — it is
 * what keeps a page free of hand-written JSX.
 */

export { default as ProductPage } from './ProductPage'
export { default as sectionRegistry } from './sections/registry'
export { default as requireProps } from './sections/requireProps'

export { default as BenefitsDefault } from './sections/benefits-default/BenefitsDefault'
export { default as FaqDefault } from './sections/faq-default/FaqDefault'
export { default as FooterDefault } from './sections/footer-default/FooterDefault'
export { default as HeaderDefault } from './sections/header-default/HeaderDefault'
export { default as HeroDefault } from './sections/hero-default/HeroDefault'
export { default as HowItWorksDefault } from './sections/how-it-works-default/HowItWorksDefault'
export { default as PricingBannerDefault } from './sections/pricing-banner-default/PricingBannerDefault'

/**
 * `LegalDocumentDefault` is intentionally not re-exported here.
 *
 * The registry loads it lazily because it pulls in `react-markdown` and
 * `remark-gfm` (+47.6 kB gzipped), which a landing page never needs. A static
 * re-export from this barrel would put that back into every consumer's initial
 * chunk for anyone whose bundler does not tree-shake it out.
 *
 * Render it through page configuration, like every other section. If you truly
 * need the component directly, import it from its own path and accept the cost:
 *
 *   import LegalDocumentDefault from 'just-sections/src/sections/legal-document-default/LegalDocumentDefault'
 */
