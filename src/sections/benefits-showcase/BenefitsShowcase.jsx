import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import requireProps from '../requireProps'
import './BenefitsShowcase.css'

const DESKTOP_QUERY = '(min-width: 1024px)'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const MIN_ITEM_COUNT = 3
const MAX_ITEM_COUNT = 8
const MEDIA_BACKDROPS = new Set(['chianti', 'sky', 'cypress', 'sunflower', 'charcoal'])

function isNonEmptyString(value) {
  return typeof value === 'string' && value.length > 0
}

function hasValidMedia(media) {
  return (
    media !== null &&
    typeof media === 'object' &&
    isNonEmptyString(media.src) &&
    typeof media.alt === 'string'
  )
}

/**
 * Every card declares exactly one media field, and which one it declares
 * decides whether the contained capture is required.
 *
 * A colour field with no capture on it is an empty coloured rectangle, so
 * `media` is required there. An image field can be a finished 4:5 composition
 * on its own, so `media` is optional there — that is the path where a page
 * author exports the whole frame from Figma and drops it in.
 */
function hasValidMediaField(item) {
  const hasBackdrop = item.mediaBackdrop !== undefined
  const hasBackdropImage = item.mediaBackdropImage !== undefined

  if (hasBackdrop === hasBackdropImage) return false

  if (hasBackdrop) {
    return MEDIA_BACKDROPS.has(item.mediaBackdrop) && hasValidMedia(item.media)
  }

  return (
    hasValidMedia(item.mediaBackdropImage) &&
    (item.media === undefined || hasValidMedia(item.media))
  )
}

function hasValidItems(items) {
  if (!Array.isArray(items) || items.length < MIN_ITEM_COUNT || items.length > MAX_ITEM_COUNT)
    return false

  const ids = new Set()

  return items.every((item) => {
    if (
      item === null ||
      typeof item !== 'object' ||
      !isNonEmptyString(item.id) ||
      ids.has(item.id) ||
      !isNonEmptyString(item.mediaHeadline) ||
      !isNonEmptyString(item.title) ||
      !isNonEmptyString(item.description) ||
      !hasValidMediaField(item)
    ) {
      return false
    }

    ids.add(item.id)
    return true
  })
}

/**
 * Tracks a media query after mount.
 *
 * The viewport does not exist during SSR, so every query starts `false` and the
 * section renders its server-safe expression — the plain scroll rail — until
 * hydration selects the real mode.
 */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const list = window.matchMedia(query)

    function handleChange(event) {
      setMatches(event.matches)
    }

    setMatches(list.matches)
    list.addEventListener('change', handleChange)

    return () => list.removeEventListener('change', handleChange)
  }, [query])

  return matches
}

/**
 * Drives the desktop rail from page scroll position.
 *
 * The section lays down a scroll track taller than the viewport and pins a
 * `100dvh` composition inside it. Scrolling through the extra height translates
 * the rail horizontally by an equal number of pixels, then the pin releases and
 * the page carries on.
 *
 * Native scroll only: no `wheel` listener, no `preventDefault`, no scroll
 * snapping. The scrollbar stays truthful, trackpad momentum is untouched, Page
 * Down and Find-in-page behave, and a reader who wants to leave the section
 * cannot be trapped in it. `surfaces/web.md` prohibits wheel interception for
 * the sibling pinned pattern and the same reasoning applies here.
 *
 * The 1:1 pixel ratio is deliberate and is not a tuning knob. An accelerated or
 * eased ratio makes the section feel heavier or lighter than the page around
 * it, and there is no correct value to pick.
 */
function useRailScroll(enabled) {
  const trackRef = useRef(null)
  const viewportRef = useRef(null)
  const railRef = useRef(null)
  const [overflow, setOverflow] = useState(0)
  const [progress, setProgress] = useState(0)

  // How far the rail has to travel is a property of the rendered DOM, not of
  // configuration. Measuring it means a rail that already fits reports zero and
  // the section simply does not pin — three cards at 1024px must not produce a
  // pinned screen that scrolls past nothing.
  const measure = useCallback(() => {
    const viewport = viewportRef.current
    const rail = railRef.current

    if (!viewport || !rail) return

    setOverflow(Math.max(0, rail.scrollWidth - viewport.clientWidth))
  }, [])

  // Layout effect so the first measurement lands before paint: measuring in a
  // passive effect shows one frame of an unpinned rail at the wrong height.
  useLayoutEffect(() => {
    if (!enabled) {
      setOverflow(0)
      setProgress(0)
      return undefined
    }

    measure()

    const rail = railRef.current
    if (!rail || typeof ResizeObserver === 'undefined') return undefined

    const observer = new ResizeObserver(measure)
    observer.observe(rail)

    return () => observer.disconnect()
  }, [enabled, measure])

  useEffect(() => {
    if (!enabled || overflow <= 0) return undefined

    let frame = 0

    function update() {
      frame = 0

      const track = trackRef.current
      if (!track) return

      // Distance scrolled past the moment the track's top met the viewport top.
      // Negative before the section pins, which clamps to 0.
      const scrolled = -track.getBoundingClientRect().top

      setProgress(Math.min(1, Math.max(0, scrolled / overflow)))
    }

    function handleScroll() {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [enabled, overflow])

  return { trackRef, viewportRef, railRef, overflow, progress }
}

/**
 * @import { Media } from '../types'
 *
 * @param {object} props
 * @param {string} props.title Required section heading.
 * @param {{
 *   id: string,
 *   mediaHeadline: string,
 *   title: string,
 *   description: string,
 *   mediaBackdrop?: 'chianti' | 'sky' | 'cypress' | 'sunflower' | 'charcoal',
 *   mediaBackdropImage?: Media,
 *   media?: Media,
 * }[]} props.items
 *   Required, three to eight. Each item declares exactly one media field:
 *   `mediaBackdrop` (a colour token, which makes `media` required) or
 *   `mediaBackdropImage` (a 4:5 composition filling the frame, which makes
 *   `media` optional).
 * @param {string} [props.eyebrow] Uppercase label above the title.
 * @param {string} [props.subtitle] Supporting copy below the title.
 * @param {string} [props.id] Section id, defaults to `benefits-showcase`.
 */
export default function BenefitsShowcase({
  title,
  items,
  eyebrow,
  subtitle,
  id = 'benefits-showcase',
}) {
  const itemsAreValid = hasValidItems(items)
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY)

  // Reduced motion removes the pin entirely rather than shortening it. A
  // stationary viewport translating its content under an unchanged scroll
  // gesture is exactly the vestibular pattern the preference exists to
  // suppress, so the rail falls back to the plain scroll container.
  const canPin = itemsAreValid && isDesktop && !prefersReducedMotion
  const { trackRef, viewportRef, railRef, overflow, progress } = useRailScroll(canPin)
  const isPinned = canPin && overflow > 0

  const instanceId = useId().replaceAll(':', '')
  const titleId = `${id}-${instanceId}-title`

  if (
    requireProps('BenefitsShowcase', {
      title,
      items,
      'three to eight complete items with unique ids and exactly one media field each':
        itemsAreValid ? true : undefined,
    })
  )
    return null

  return (
    <section id={id} className="benefits-showcase" aria-labelledby={titleId}>
      <div
        ref={trackRef}
        className={`benefits-showcase__scroll-track${
          isPinned ? ' benefits-showcase__scroll-track--pinned' : ''
        }`}
        style={isPinned ? { '--benefits-showcase-overflow': `${overflow}px` } : undefined}
      >
        <div
          className={`benefits-showcase__pinned${
            isPinned ? ' benefits-showcase__pinned--active' : ''
          }`}
        >
          <div className="benefits-showcase__layout">
            <header className="benefits-showcase__intro">
              {eyebrow ? <p className="benefits-showcase__eyebrow">{eyebrow}</p> : null}
              <h2 id={titleId}>{title}</h2>
              {subtitle ? <p className="benefits-showcase__subtitle">{subtitle}</p> : null}
            </header>

            {/* Focusable and named only while it is genuinely a scroll
                container. In pinned mode page scroll is the only thing that
                moves the rail, so a tab stop here would be a dead control. */}
            <div
              ref={viewportRef}
              className={`benefits-showcase__viewport${
                isPinned ? ' benefits-showcase__viewport--pinned' : ''
              }`}
              role={isPinned ? undefined : 'group'}
              aria-label={isPinned ? undefined : title}
              tabIndex={isPinned ? undefined : 0}
            >
              <ul
                ref={railRef}
                className="benefits-showcase__rail"
                style={
                  isPinned
                    ? {
                        transform: `translate3d(calc(${progress} * var(--benefits-showcase-overflow) * -1), 0, 0)`,
                      }
                    : undefined
                }
              >
                {items.map((item, index) => (
                  <li key={item.id} className="benefits-showcase__card">
                    <div
                      className={`benefits-showcase__frame${
                        item.mediaBackdrop
                          ? ` benefits-showcase__frame--${item.mediaBackdrop}`
                          : ''
                      }`}
                    >
                      {item.mediaBackdropImage ? (
                        <>
                          <img
                            className="benefits-showcase__backdrop-image"
                            src={item.mediaBackdropImage.src}
                            alt={item.mediaBackdropImage.alt}
                            width={item.mediaBackdropImage.width}
                            height={item.mediaBackdropImage.height}
                            loading={index === 0 ? 'eager' : 'lazy'}
                            decoding="async"
                          />
                          {/* A page-supplied photograph has unknowable
                              contrast, so the headline gets a guaranteed
                              ground. Colour fields do not need one. */}
                          <div className="benefits-showcase__scrim" aria-hidden="true" />
                        </>
                      ) : null}

                      <p className="benefits-showcase__media-headline">{item.mediaHeadline}</p>

                      {item.media ? (
                        <img
                          className="benefits-showcase__media"
                          src={item.media.src}
                          alt={item.media.alt}
                          width={item.media.width}
                          height={item.media.height}
                          loading={index === 0 ? 'eager' : 'lazy'}
                          decoding="async"
                        />
                      ) : null}
                    </div>

                    <h3>{item.title}</h3>
                    <p className="benefits-showcase__description">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            {isPinned ? (
              <div className="benefits-showcase__progress" aria-hidden="true">
                <span style={{ transform: `scaleX(${Math.max(progress, 0.02)})` }} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
