import { Fragment, useEffect, useId, useRef } from 'react'
import requireProps from '../requireProps'
import './StatementReveal.css'

function validPhrases(phrases) {
  return Array.isArray(phrases) && phrases.length > 0 &&
    phrases.every((phrase) => phrase && typeof phrase.id === 'string' && phrase.id.trim() &&
      typeof phrase.text === 'string' && phrase.text.trim()) &&
    new Set(phrases.map(({ id }) => id)).size === phrases.length
}

/**
 * Full-screen editorial statement, revealed word by word as it scrolls past.
 * @param {{ id?: string, phrases: { id: string, text: string, accent?: boolean }[] }} props
 */
export default function StatementReveal({ id = 'statement', phrases }) {
  const rootRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined
    const stage = root.firstElementChild
    const words = Array.from(stage.querySelectorAll('.statement-reveal__word'))
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
      // Set below the fitted maximum so the statement keeps an editorial margin.
      heading.style.fontSize = `${Math.floor(low * 0.8)}px`
    }

    function update() {
      frame = undefined
      fit()
      const active = motion.matches
      root.toggleAttribute('data-reveal', active)
      if (!active) return

      // The muted statement shows first; the reveal starts once the section's
      // top has climbed to 60% of the screen and completes as the section fills
      // the screen (its top reaching the top of the viewport).
      const start = document.documentElement.clientHeight * 0.6
      const progress = Math.min(1, Math.max(0, 1 - root.getBoundingClientRect().top / start))
      // Each word switches straight from gray to its real color, never between.
      const revealed = Math.round(progress * words.length)
      for (const [index, word] of words.entries()) {
        word.toggleAttribute('data-revealed', index < revealed)
      }
    }

    function schedule() {
      if (frame === undefined) frame = window.requestAnimationFrame(update)
    }

    const observer = new ResizeObserver(schedule)
    observer.observe(stage)
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
      for (const word of words) word.removeAttribute('data-revealed')
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
              {index > 0 ? ' ' : null}
              {text.trim().split(/\s+/).map((word, wordIndex) => (
                <Fragment key={wordIndex}>
                  {wordIndex > 0 ? ' ' : null}
                  <span className="statement-reveal__word">{word}</span>
                </Fragment>
              ))}
            </span>
          ))}
        </h2>
      </div>
    </section>
  )
}
