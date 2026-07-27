import { useId, useState } from 'react'
import { Plus } from 'lucide-react'
import requireProps from '../requireProps'
import './FaqDefault.css'

/**
 * @param {object} props
 * @param {string} props.title Required section heading.
 * @param {{ id: string, question: string, answer: string }[]} props.items
 *   Required accordion entries, one or more, each with a unique `id`.
 * @param {string} [props.eyebrow] Uppercase label above the title.
 * @param {string} [props.subtitle] Supporting copy below the title.
 * @param {'parchment' | 'ivory'} [props.surface='parchment'] Section surface.
 * @param {string} [props.id] Section id, defaults to `faq`.
 */
export default function FaqDefault({
  title,
  items,
  eyebrow,
  subtitle,
  surface = 'parchment',
  id = 'faq',
}) {
  const [openItemId, setOpenItemId] = useState(null)
  const instanceId = useId().replaceAll(':', '')
  const titleId = `${id}-${instanceId}-title`

  function toggleItem(itemId) {
    setOpenItemId((currentItemId) => (currentItemId === itemId ? null : itemId))
  }

  if (requireProps('FaqDefault', { title, items })) return null

  const surfaceClass = surface === 'ivory' ? 'faq-default--ivory' : 'faq-default--parchment'

  return (
    <section id={id} className={`faq-default ${surfaceClass}`} aria-labelledby={titleId}>
      <div className="faq-default__layout">
        <header className="faq-default__intro">
          {eyebrow ? <p className="faq-default__eyebrow">{eyebrow}</p> : null}
          <h2 id={titleId}>{title}</h2>
          {subtitle ? <p className="faq-default__subtitle">{subtitle}</p> : null}
        </header>

        <div className="faq-default__accordion">
          {items.map((item) => {
            const isOpen = openItemId === item.id
            const questionId = `${id}-${instanceId}-${item.id}-question`
            const answerId = `${id}-${instanceId}-${item.id}-answer`

            return (
              <article key={item.id} className={`faq-default__item${isOpen ? ' faq-default__item--open' : ''}`}>
                <h3>
                  <button
                    type="button"
                    id={questionId}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggleItem(item.id)}
                  >
                    <span>{item.question}</span>
                    <span className="faq-default__icon" aria-hidden="true">
                      <Plus size={24} strokeWidth={1.75} />
                    </span>
                  </button>
                </h3>

                <div
                  id={answerId}
                  className="faq-default__answer"
                  role="region"
                  aria-labelledby={questionId}
                  aria-hidden={!isOpen}
                >
                  <div>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
