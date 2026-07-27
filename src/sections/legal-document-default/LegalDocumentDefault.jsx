import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import requireProps from '../requireProps'
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
 * @param {string} [props.id]
 */
export default function LegalDocumentDefault({
  content,
  internalLinks = DEFAULT_INTERNAL_LINKS,
  surface = 'parchment',
  id,
}) {
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
      className={`legal-document-default legal-document-default--${surface}`}
    >
      <div className="legal-document-default__container">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {content}
        </ReactMarkdown>
      </div>
    </section>
  )
}
