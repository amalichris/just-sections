import ProductPage from '../ProductPage'
import { getFixture } from './galleryData'

/**
 * A whole-page smoke test built entirely from section fixtures.
 *
 * The gallery renders sections in isolation, which is what you want while
 * building one. It cannot show what `ProductPage` itself does: landmark slots,
 * section order, and — most easily broken — the spacing between adjacent
 * sections, which the page contract declares on the sibling pair rather than on
 * the element.
 *
 * This page covers that gap without owning any product content. Every prop
 * comes from a section's own `fixtures.js`, so there is no second copy of a
 * headline to drift, and no imagery: `fixtureMedia` generates inline
 * placeholders. That is the whole reason it can live here — the JustEjari page
 * it replaced carried both, and both belong to the product, not the library.
 *
 * `legal-document-default` is deliberately absent. It is a different page type,
 * it is the registry's one lazy section, and a legal document rendered between
 * a hero and a pricing banner would be testing nothing real.
 */

/**
 * Page order, and which landmark each section belongs to.
 *
 * Explicit rather than derived from registry order: this is a page composition,
 * and the sequence a visitor reads is a deliberate choice. A new section does
 * not belong on a demo page automatically — it belongs where it makes sense.
 */
const PAGE = [
  { type: 'header-default', slot: 'header' },
  { type: 'hero-default', id: 'top' },
  { type: 'benefits-default', id: 'benefits' },
  { type: 'how-it-works-default', id: 'how-it-works' },
  { type: 'pricing-banner-default', id: 'pricing' },
  { type: 'faq-default', id: 'faq' },
  { type: 'footer-default', slot: 'footer' },
]

const config = {
  sections: PAGE.flatMap((entry) => {
    const fixture = getFixture(entry.type, 'default')

    // A section whose `default` fixture is missing is a dossier gap, not a
    // reason to render a broken page. The gallery index already reports it.
    if (!fixture) return []

    return [{ ...entry, props: fixture.props }]
  }),
}

export default function DemoPage() {
  return <ProductPage config={config} />
}
