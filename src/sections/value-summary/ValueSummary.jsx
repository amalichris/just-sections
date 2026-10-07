import { useId } from 'react'
import requireProps from '../requireProps'
import './ValueSummary.css'

const isText = (value) => typeof value === 'string' && value.trim().length > 0
const isOptionalText = (value) => value === undefined || isText(value)

function hasValidItems(items) {
  if (!Array.isArray(items) || items.length < 1 || items.length > 4) return false
  const ids = new Set()
  return items.every((item) => {
    if (
      !item || !isText(item.id) || ids.has(item.id) ||
      !isText(item.value) || !isText(item.label) || !isOptionalText(item.description)
    ) return false
    ids.add(item.id)
    return true
  })
}

/**
 * Static, page-owned facts with optional qualifications. No number formatting.
 * @param {object} props
 * @param {string} props.title Required heading.
 * @param {{ id: string, value: string, label: string, description?: string }[]} props.items
 * @param {string} [props.eyebrow]
 * @param {string} [props.subtitle]
 * @param {string} [props.id='value-summary']
 */
export default function ValueSummary({ title, items, eyebrow, subtitle, id = 'value-summary' }) {
  const instanceId = useId().replaceAll(':', '')
  const titleId = `${id}-${instanceId}-title`

  if (requireProps('ValueSummary', {
    'a nonblank title': isText(title) ? true : undefined,
    'one to four complete facts with unique ids': hasValidItems(items) ? true : undefined,
    'valid optional copy': isOptionalText(eyebrow) && isOptionalText(subtitle) ? true : undefined,
  })) return null

  return (
    <section id={id} className="value-summary" aria-labelledby={titleId}>
      <div className="value-summary__layout">
        <header className="value-summary__intro">
          {eyebrow ? <p className="value-summary__eyebrow">{eyebrow}</p> : null}
          <h2 id={titleId}>{title}</h2>
          {subtitle ? <p className="value-summary__subtitle">{subtitle}</p> : null}
        </header>
        <dl className={`value-summary__items value-summary__items--${items.length}`}>
          {items.map((item) => (
            <div key={item.id} className="value-summary__item">
              <dt className="value-summary__label">{item.label}</dt>
              <dd className="value-summary__value">{item.value}</dd>
              {item.description ? <dd className="value-summary__description">{item.description}</dd> : null}
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
