import { lazy } from 'react'
import BenefitsDefault from './benefits-default/BenefitsDefault'
import FaqDefault from './faq-default/FaqDefault'
import FooterDefault from './footer-default/FooterDefault'
import HeaderDefault from './header-default/HeaderDefault'
import HeroDefault from './hero-default/HeroDefault'
import HowItWorksDefault from './how-it-works-default/HowItWorksDefault'
import PricingBannerDefault from './pricing-banner-default/PricingBannerDefault'

/**
 * `legal-document-default` is the one lazy section.
 *
 * It pulls in `react-markdown` and `remark-gfm`, which measured at +47.6 kB
 * gzipped — more than half the bundle a landing page needs in total, for a
 * section that only legal and support pages ever render. Every other section is
 * a static import: they are small, a landing page renders several of them
 * above the fold, and splitting those would trade bytes for a flash of nothing.
 *
 * This supersedes the earlier "imports stay static" rule, which was correct
 * while every section was small. Measure before adding another lazy entry — a
 * section earns one by pulling a heavy dependency that most pages do not use,
 * not by being large on its own.
 *
 * `ProductPage` supplies the Suspense boundary.
 */
const LegalDocumentDefault = lazy(() => import('./legal-document-default/LegalDocumentDefault'))

/**
 * Maps the `type` of a page-config entry to its section component.
 *
 * Add a section here once its dossier is implementation-complete.
 */
const sectionRegistry = {
  'header-default': HeaderDefault,
  'hero-default': HeroDefault,
  'benefits-default': BenefitsDefault,
  'how-it-works-default': HowItWorksDefault,
  'pricing-banner-default': PricingBannerDefault,
  'faq-default': FaqDefault,
  'legal-document-default': LegalDocumentDefault,
  'footer-default': FooterDefault,
}

export default sectionRegistry
