import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import requireProps from '../requireProps'
import PaintedBanner from '../painted-banner/PaintedBanner'
import './LegalDocumentDefault.css'

/**
 * Default cross-link map, matching what the `terms-and-privacy-consultant`
 * skill emits: stable filenames with the version and effective date inside the
 * document rather than in the filename.
 */
const DEFAULT_INTERNAL_LINKS = {
  'privacy-policy.md': '/privacy',
  'terms-of-service.md': '/terms',
}

/**
 * Resolves a markdown link to an in-site route, or null when it is not one.
 *
 * Accepts the forms the skill produces and the ones a human might hand-write:
 * `privacy-policy.md`, `./privacy-policy.md`, `/privacy-policy.md`, each
 * optionally carrying a `#fragment`.
 */
function resolveInternalRoute(href, internalLinks) {
  const [path, fragment] = href.split('#')
  const key = path.replace(/^\.?\//, '').toLowerCase()
  const route = internalLinks[key]

  if (!route) return null

  return fragment ? `${route}#${fragment}` : route
}

/**
 * Renders a legal document from its markdown source.
 *
 * All content comes from the document: the heading, the effective and last
 * updated dates, and the version are body content maintained by the
 * `terms-and-privacy-consultant` skill. There is deliberately no `title` prop —
 * a second place to edit the same string is a second place for it to go stale,
 * which is exactly how the previous implementation's hardcoded contact address
 * drifted without anything failing.
 *
 * @import { Media } from '../types'
 *
 * @param {object} props
 * @param {string} props.content Raw markdown. The consuming page performs the
 *   `?raw` import so the document stays in its product's `docs/legal/`.
 * @param {Record<string, string>} [props.internalLinks] Markdown filename to
 *   route. Defaults to the skill's filenames; supply it only when routing those
 *   documents somewhere else.
 * @param {'parchment' | 'ivory'} [props.surface]
 * @param {Media} [props.banner] Decorative painting above the document; the
 *   document's own `h1` rises into its fade. Parchment surface only.
 * @param {string} [props.bannerFocal] Vertical crop position, e.g. `'60%'`.
 * @param {{ title: string, description?: string }} [props.header] Page header in
 *   place of the document's own `h1`: a short title, an optional summary, and a
 *   facts row (version, last updated, legal contact) read from the document.
 * @param {string} [props.id]
 */
export default function LegalDocumentDefault({
  content,
  internalLinks = DEFAULT_INTERNAL_LINKS,
  surface = 'parchment',
  banner,
  bannerFocal,
  header,
  id,
}) {
  // With a header, the facts come from the document itself and its own title
  // and date lines are removed from the body, so nothing is restated in config.
  const parsed = useMemo(() => (header?.title && content ? parseDocument(content) : null), [header?.title, content])
  const body = parsed ? parsed.body : content

  const components = useMemo(
    () => ({
      // react-markdown emits a bare `<table>`, so the scroll container has to be
      // added here. A CSS-only `:has()` rule cannot do it: the table is a direct
      // child of the prose container, and making that container scroll would
      // scroll the whole document instead of the one wide table.
      table({ children }) {
        return (
          <div className="legal-document-default__table-wrap" role="region" tabIndex={0}>
            <table>{children}</table>
          </div>
        )
      },

      a({ href, children }) {
        if (!href) return <>{children}</>

        // Contact addresses render as plain text: selectable and copyable, not
        // clickable. Keeping the address only in the markdown means changing it
        // there changes every page, with no code edit anywhere.
        if (href.toLowerCase().startsWith('mailto:')) {
          return <>{children}</>
        }

        const route = resolveInternalRoute(href, internalLinks)

        if (route) {
          // A plain anchor, not a router Link: a full page load between two
          // legal documents is correct, and it keeps this section — and the
          // library — free of a router dependency.
          return <a href={route}>{children}</a>
        }

        return (
          <a href={href} target="_blank" rel="noreferrer noopener">
            {children}
          </a>
        )
      },
    }),
    [internalLinks],
  )

  if (requireProps('LegalDocumentDefault', { content })) return null

  return (
    <section
      id={id}
      className={`legal-document-default legal-document-default--${banner?.src ? 'parchment legal-document-default--banner' : surface}`}
    >
      {banner?.src ? <PaintedBanner media={banner} focal={bannerFocal} /> : null}
      <div className="legal-document-default__container">
        {parsed ? (
          <header className="legal-document-default__header">
            <h1>{header.title}</h1>
            {header.description ? <p className="legal-document-default__dek">{header.description}</p> : null}
            {parsed.facts.length ? (
              <dl className="legal-document-default__facts">
                {parsed.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </header>
        ) : null}
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {body}
        </ReactMarkdown>
      </div>
    </section>
  )
}

/**
 * Reads the facts the terms-and-privacy skill writes under a document's `h1`
 * (`**Version: 1.4**`, `**Last Updated: 12 August 2026**`) and its legal
 * contact address, and returns the body without the `h1` and those lines.
 * Accepts both `**Label: value**` and `**Label:** value`.
 */
function parseDocument(markdown) {
  const field = (label) =>
    markdown.match(new RegExp(`^\\*\\*${label}:\\s*(?:\\*\\*\\s*)?(.+?)(?:\\*\\*)?\\s*$`, 'mi'))?.[1]?.trim()
  const email = markdown.match(/\blegal@[\w.-]+\.[a-z]{2,}/i)?.[0] ?? markdown.match(/\b[\w.+-]+@[\w.-]+\.[a-z]{2,}/i)?.[0]
  const facts = [
    { label: 'Version', value: field('Version') },
    { label: 'Last updated', value: field('Last Updated') },
    { label: 'Questions', value: email },
  ].filter((fact) => fact.value)
  const body = markdown
    .replace(/^# .*\n/, '')
    .replace(/^\*\*(?:Effective Date|Last Updated|Version):[^\n]*\n/gim, '')
    .trim()

  return { facts, body }
}
