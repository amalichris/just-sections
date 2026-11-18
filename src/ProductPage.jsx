import { Suspense, useEffect } from 'react'
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
 * @typedef {{
 *   title?: string,
 *   description?: string,
 *   canonical?: string,
 *   robots?: string,
 *   structuredData?: Record<string, unknown>,
 * }} PageMeta
 *
 * @typedef {{
 *   sectionId: string,
 *   interaction: string,
 *   itemId?: string,
 * }} SectionInteraction
 *
 * @param {{
 *   config: { sections: SectionEntry[], meta?: PageMeta },
 *   onInteraction?: (event: SectionInteraction) => void,
 * }} props
 */
export default function ProductPage({ config, onInteraction }) {
  const sections = config?.sections ?? []
  usePageMeta(config?.meta)
  const hasCoverHero = sections.some(
    (entry) =>
      entry.type === 'hero-default' &&
      entry.props?.layout === 'optical-cover' &&
      entry.props?.backdrop !== 'painted',
  )

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

    return (
      <Section
        key={entry.id ?? `${entry.type}-${index}`}
        id={entry.id}
        {...entry.props}
        onInteraction={onInteraction}
      />
    )
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
    <div className={`product-page${hasCoverHero ? ' product-page--cover-hero' : ''}`}>
      <Suspense fallback={null}>
        {sectionsIn('header')}
        <main>{sectionsIn('main')}</main>
        {sectionsIn('footer')}
      </Suspense>
    </div>
  )
}

/**
 * Applies a page config's optional `meta` to the document head.
 *
 * Updates the host page's existing `<title>` and description in place rather
 * than adding second copies, so the static HTML keeps working for clients that
 * do not run JavaScript and crawlers that do never see two competing values.
 * Adds a canonical link and JSON-LD only when the config supplies them, and
 * restores everything it changed when the page unmounts. Absence of a field
 * leaves the host's value untouched.
 *
 * @param {PageMeta | undefined} meta
 */
function usePageMeta(meta) {
  const { title, description, canonical, robots, structuredData } = meta ?? {}
  const structuredJson = structuredData ? JSON.stringify(structuredData) : ''

  useEffect(() => {
    if (typeof document === 'undefined') return undefined
    const undo = []

    if (title) {
      const previous = document.title
      document.title = title
      undo.push(() => {
        document.title = previous
      })
    }

    if (description) undo.push(setHeadElement('meta', { name: 'description' }, 'content', description))
    if (canonical) undo.push(setHeadElement('link', { rel: 'canonical' }, 'href', canonical))
    if (robots) undo.push(setHeadElement('meta', { name: 'robots' }, 'content', robots))

    if (structuredJson) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = structuredJson
      document.head.appendChild(script)
      undo.push(() => script.remove())
    }

    return () => undo.forEach((restore) => restore())
  }, [title, description, canonical, robots, structuredJson])
}

function setHeadElement(tag, match, attribute, value) {
  const selector = `${tag}${Object.entries(match).map(([k, v]) => `[${k}="${v}"]`).join('')}`
  const existing = document.head.querySelector(selector)

  if (existing) {
    const previous = existing.getAttribute(attribute)
    existing.setAttribute(attribute, value)

    return () => existing.setAttribute(attribute, previous)
  }

  const element = document.createElement(tag)
  Object.entries(match).forEach(([k, v]) => element.setAttribute(k, v))
  element.setAttribute(attribute, value)
  document.head.appendChild(element)

  return () => element.remove()
}
