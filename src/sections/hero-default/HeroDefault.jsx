import { useEffect, useId, useRef } from 'react'
import requireProps from '../requireProps'
import './HeroDefault.css'

const PARALLAX_QUERY = '(min-width: 768px) and (prefers-reduced-motion: no-preference)'
const BACKDROP_RATE = 0.1
const BACKDROP_OFFSET_MAX = 80
const DEVICE_RATE = 0.06
const DEVICE_OFFSET_MAX = 56

/**
 * @import { Media } from '../types'
 *
 * @param {object} props
 * @param {string} props.title Required hero headline.
 * @param {string} [props.subtitle] Supporting copy below the headline.
 * @param {Media} [props.background] Full-bleed artwork beneath the warm glass
 *   overlay. Omitted, the hero keeps its parchment backdrop.
 * @param {Media} [props.media] Product image following the copy in normal flow.
 * @param {string} [props.id] Section id, defaults to `top`.
 */
export default function HeroDefault({ title, subtitle, background, media, id = 'top' }) {
  const heroRef = useRef(null)
  const instanceId = useId().replaceAll(':', '')
  const titleId = `${id}-${instanceId}-title`

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return undefined

    const parallaxQuery = window.matchMedia(PARALLAX_QUERY)
    let frameId = null

    function clearOffsets() {
      hero.style.removeProperty('--hero-backdrop-offset')
      hero.style.removeProperty('--hero-device-offset')
      delete hero.dataset.parallax
    }

    function updateOffsets() {
      frameId = null

      if (!parallaxQuery.matches) {
        clearOffsets()
        return
      }

      const heroBounds = hero.getBoundingClientRect()
      const passedDistance = Math.min(Math.max(-heroBounds.top, 0), heroBounds.height)
      const backdropOffset = Math.min(
        Math.round(passedDistance * BACKDROP_RATE * 100) / 100,
        BACKDROP_OFFSET_MAX,
      )
      const deviceOffset = Math.min(
        Math.round(passedDistance * DEVICE_RATE * 100) / 100,
        DEVICE_OFFSET_MAX,
      )

      hero.style.setProperty('--hero-backdrop-offset', `${backdropOffset}px`)
      hero.style.setProperty('--hero-device-offset', `${-deviceOffset}px`)
      if (!hero.dataset.parallax) hero.dataset.parallax = 'active'
    }

    function scheduleUpdate() {
      if (frameId === null) frameId = window.requestAnimationFrame(updateOffsets)
    }

    updateOffsets()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    parallaxQuery.addEventListener('change', scheduleUpdate)

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      parallaxQuery.removeEventListener('change', scheduleUpdate)
      clearOffsets()
    }
  }, [])

  if (requireProps('HeroDefault', { title })) return null

  return (
    <section ref={heroRef} id={id} className="hero-default" aria-labelledby={titleId}>
      <div className="hero-default__backdrop" aria-hidden="true">
        {background ? <img src={background.src} alt={background.alt} /> : null}
        <div className="hero-default__glass" />
      </div>

      <div className="hero-default__content">
        <h1 id={titleId}>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
        {media ? <img className="hero-default__device" src={media.src} alt={media.alt} /> : null}
      </div>
    </section>
  )
}
