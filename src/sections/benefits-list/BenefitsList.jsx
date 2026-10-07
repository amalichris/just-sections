import { useId } from 'react'
import { Check, FileText } from 'lucide-react'
import requireProps from '../requireProps'
import './BenefitsList.css'

const ICONS = { check: Check, document: FileText }
const isText = (value) => typeof value === 'string' && value.trim().length > 0
const isOptionalText = (value) => value === undefined || isText(value)

function hasValidItems(items) {
  if (!Array.isArray(items) || items.length === 0) return false
  const ids = new Set()
  return items.every((item) => {
    if (
      !item || !isText(item.id) || ids.has(item.id) ||
      !isText(item.title) || !isText(item.description) ||
      (item.icon !== undefined && (typeof item.icon !== 'string' || !Object.hasOwn(ICONS, item.icon)))
    ) return false
    ids.add(item.id)
    return true
  })
}

/**
 * Plain, always-visible outcome rows. No imagery or controls are required.
 * @param {object} props
 * @param {string} props.title Required heading.
 * @param {{ id: string, title: string, description: string, icon?: 'check' | 'document' }[]} props.items
 * @param {string} [props.eyebrow]
 * @param {string} [props.subtitle]
 * @param {string} [props.id='benefits']
 */
export default function BenefitsList({ title, items, eyebrow, subtitle, id = 'benefits' }) {
  const instanceId = useId().replaceAll(':', '')
  const titleId = `${id}-${instanceId}-title`

  if (requireProps('BenefitsList', {
    'a nonblank title': isText(title) ? true : undefined,
    'complete items with unique ids and supported icons': hasValidItems(items) ? true : undefined,
    'valid optional copy': isOptionalText(eyebrow) && isOptionalText(subtitle) ? true : undefined,
  })) return null

  return (
    <section id={id} className="benefits-list" aria-labelledby={titleId}>
      <div className="benefits-list__layout">
        <header className="benefits-list__intro">
          {eyebrow ? <p className="benefits-list__eyebrow">{eyebrow}</p> : null}
          <h2 id={titleId}>{title}</h2>
          {subtitle ? <p className="benefits-list__subtitle">{subtitle}</p> : null}
        </header>
        <ul className="benefits-list__items">
          {items.map((item) => {
            const Icon = item.icon === undefined ? undefined : ICONS[item.icon]
            return (
              <li key={item.id} className="benefits-list__item">
                <div className="benefits-list__title">
                  {Icon ? <Icon size={item.icon === 'check' ? 16 : 20} aria-hidden="true" /> : null}
                  <h3>{item.title}</h3>
                </div>
                <p className="benefits-list__description">{item.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
