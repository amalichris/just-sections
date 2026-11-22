import { useEffect, useId, useRef } from 'react'
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
 * Page-owned facts with optional qualifications; values ink in as they are read.
 * No number formatting.
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
  const rootRef = useRef(null)

  // Values sit in muted gray and switch to ink as each crosses a reading line
  // at 60% of the screen, reversing on scroll back. Script only mutes what it
  // can also reveal, so no-script and reduced motion stay in full ink.
  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined
    const items = Array.from(root.querySelectorAll('.value-summary__item'))
    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)')
    let frame

    function update() {
      frame = undefined
      root.toggleAttribute('data-motion', motion.matches)
      const line = document.documentElement.clientHeight * 0.6
      for (const item of items) item.toggleAttribute('data-inked', item.getBoundingClientRect().top < line)
    }

    function schedule() {
      if (frame === undefined) frame = window.requestAnimationFrame(update)
    }

    motion.addEventListener('change', schedule)
    window.addEventListener('resize', schedule)
    window.addEventListener('scroll', schedule, { passive: true })
    update()

    return () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame)
      motion.removeEventListener('change', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('scroll', schedule)
      root.removeAttribute('data-motion')
      for (const item of items) item.removeAttribute('data-inked')
    }
  }, [items])

  if (requireProps('ValueSummary', {
    'a nonblank title': isText(title) ? true : undefined,
    'one to four complete facts with unique ids': hasValidItems(items) ? true : undefined,
    'valid optional copy': isOptionalText(eyebrow) && isOptionalText(subtitle) ? true : undefined,
  })) return null

  return (
    <section ref={rootRef} id={id} className="value-summary" aria-labelledby={titleId}>
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
