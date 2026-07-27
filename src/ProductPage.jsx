import { Suspense } from 'react'
import sectionRegistry from './sections/registry'
import './ProductPage.css'

/**
 * Renders a landing page from its config module.
 *
 * A config lists its sections once, in page order. `slot` places an entry in
 * the page's landmark structure and defaults to `main`; `id` is the anchor
 * other sections link to and is passed through to the section, which supplies
 * its own default when the config omits it.
 *
 * @typedef {{
 *   type: string,
 *   id?: string,
 *   slot?: 'header' | 'main' | 'footer',
 *   props?: Record<string, unknown>,
 * }} SectionEntry
 *
 * @param {{ config: { sections: SectionEntry[] } }} props
 */
export default function ProductPage({ config }) {
  const sections = config?.sections ?? []

  function renderSection(entry, index) {
    const Section = sectionRegistry[entry.type]

    if (!Section) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          `[ProductPage] No section registered for type "${entry.type}". Entry skipped.`,
        )
      }

      return null
    }

    return <Section key={entry.id ?? `${entry.type}-${index}`} id={entry.id} {...entry.props} />
  }

  function sectionsIn(slot) {
    return sections.filter((entry) => (entry.slot ?? 'main') === slot).map(renderSection)
  }

  // One boundary for the whole page rather than one per section: the only lazy
  // section is `legal-document-default`, and a page carrying it is a legal page
  // whose document *is* the content. A `null` fallback keeps the surrounding
  // header and footer painted while it resolves, with no layout-shifting
  // skeleton to swap out.
  return (
    <div className="product-page">
      <Suspense fallback={null}>
        {sectionsIn('header')}
        <main>{sectionsIn('main')}</main>
        {sectionsIn('footer')}
      </Suspense>
    </div>
  )
}
