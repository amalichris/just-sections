import { useEffect, useId, useRef } from 'react'
import requireProps from '../requireProps'
import './StatementReveal.css'

function validPhrases(phrases) {
  return Array.isArray(phrases) && phrases.length > 0 &&
    phrases.every((phrase) => phrase && typeof phrase.id === 'string' && phrase.id.trim() &&
      typeof phrase.text === 'string' && phrase.text.trim()) &&
    new Set(phrases.map(({ id }) => id)).size === phrases.length
}

/**
 * Full-screen editorial statement enhanced by native scroll progress.
 * @param {{ id?: string, phrases: { id: string, text: string, accent?: boolean }[] }} props
 */
export default function StatementReveal({ id = 'statement', phrases }) {
  const rootRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined
    const stage = root.firstElementChild
    const previous = root.previousElementSibling
    // Whatever section precedes the statement stays pinned while the panel covers it.
    const benefits = previous?.matches('section') ? previous : null
    const parts = Array.from(stage.querySelectorAll('.statement-reveal__phrase'))
    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)')
    const heading = stage.querySelector('h2')
    let frame
    let fittedFor

    // Small-viewport height: stable while a mobile browser bar shows or hides,
    // so scrolling never re-fits the text.
    function smallViewportHeight() {
      const probe = document.createElement('div')
      probe.style.cssText = 'position:fixed;top:0;height:100svh;visibility:hidden;pointer-events:none'
      document.body.append(probe)
      const height = probe.offsetHeight
      probe.remove()
      return height
    }

    // Largest size at which the statement fills ~90% of the screen's free
    // height without any word overflowing the line. Widths and heights only
    // change on resize, so this runs once per viewport size.
    function fit() {
      const width = heading.clientWidth
      const screen = smallViewportHeight()
      const key = `${width}x${screen}`
      if (key === fittedFor || !width) return
      fittedFor = key
      const padding = parseFloat(getComputedStyle(stage).paddingTop) + parseFloat(getComputedStyle(stage).paddingBottom)
      const available = (screen - padding) * 0.9
      heading.style.fontSize = ''
      root.setAttribute('data-fit', '')
      let low = 24
      let high = 320
      while (high - low > 1) {
        const size = (low + high) / 2
        heading.style.fontSize = `${size}px`
        if (heading.scrollHeight <= available && heading.scrollWidth <= heading.clientWidth) low = size
        else high = size
      }
      heading.style.fontSize = `${Math.floor(low)}px`
    }

    function update() {
      frame = undefined
      fit()
      const viewport = document.documentElement.clientHeight
      const stageHeight = stage.offsetHeight
      const active = motion.matches && stageHeight <= viewport + 1
      root.toggleAttribute('data-reveal', active)
      if (!active) return

      if (benefits) {
        const top = viewport - benefits.offsetHeight
        benefits.style.setProperty('--benefits-cover-top', `${top}px`)
      }

      const distance = root.offsetHeight - stageHeight
      const progress = Math.min(1, Math.max(0, -root.getBoundingClientRect().top / distance))
      for (const [index, part] of parts.entries()) {
        const amount = Math.min(1, Math.max(0, progress * parts.length - index))
        part.style.setProperty('--phrase-progress', `${Math.round(amount * 100)}%`)
      }
    }

    function schedule() {
      if (frame === undefined) frame = window.requestAnimationFrame(update)
    }

    const observer = new ResizeObserver(schedule)
    observer.observe(stage)
    if (benefits) observer.observe(benefits)
    motion.addEventListener('change', schedule)
    window.addEventListener('resize', schedule)
    window.addEventListener('scroll', schedule, { passive: true })
    update()

    return () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame)
      observer.disconnect()
      motion.removeEventListener('change', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('scroll', schedule)
      root.removeAttribute('data-reveal')
      root.removeAttribute('data-fit')
      heading.style.removeProperty('font-size')
      benefits?.style.removeProperty('--benefits-cover-top')
    }
  }, [phrases])

  if (requireProps('StatementReveal', {
    'phrases with nonblank text and unique ids': validPhrases(phrases) || undefined,
  })) return null

  return (
    <section ref={rootRef} id={id} className="statement-reveal" aria-labelledby={titleId}>
      <div className="statement-reveal__stage">
        <h2 id={titleId}>
          {phrases.map(({ id: phraseId, text, accent }, index) => (
            <span key={phraseId} className={accent ? 'statement-reveal__phrase statement-reveal__phrase--accent' : 'statement-reveal__phrase'}>
              {index > 0 ? ' ' : null}{text}
            </span>
          ))}
        </h2>
      </div>
    </section>
  )
}
