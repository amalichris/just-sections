import BenefitsDefault from './benefits-default/BenefitsDefault'
import FaqDefault from './faq-default/FaqDefault'
import FooterDefault from './footer-default/FooterDefault'
import HeaderDefault from './header-default/HeaderDefault'
import HeroDefault from './hero-default/HeroDefault'
import HowItWorksDefault from './how-it-works-default/HowItWorksDefault'
import PricingBannerDefault from './pricing-banner-default/PricingBannerDefault'

/**
 * Maps the `type` of a page-config entry to its section component.
 *
 * Imports stay static: a landing page ships as one bundle, so there is nothing
 * to gain from lazy imports and no reason to introduce Suspense boundaries.
 * Add a section here once its dossier is implementation-complete.
 */
const sectionRegistry = {
  'header-default': HeaderDefault,
  'hero-default': HeroDefault,
  'benefits-default': BenefitsDefault,
  'how-it-works-default': HowItWorksDefault,
  'pricing-banner-default': PricingBannerDefault,
  'faq-default': FaqDefault,
  'footer-default': FooterDefault,
}

export default sectionRegistry
