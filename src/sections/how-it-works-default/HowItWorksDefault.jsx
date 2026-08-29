import { Fragment, useEffect, useId, useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import requireProps from '../requireProps'
import './HowItWorksDefault.css'

const DESKTOP_QUERY = '(min-width: 1024px)'
const MIN_STEP_COUNT = 3
const MAX_STEP_COUNT = 4
const STEP_NUMBER_STYLES = new Set(['visible', 'hidden'])
const MEDIA_BACKDROPS = new Set(['chianti', 'sky', 'cypress', 'sunflower'])
const MEDIA_VERTICAL_ALIGNMENTS = new Set(['top', 'bottom'])

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

function hasValidSteps(steps) {
  if (
    !Array.isArray(steps) ||
    steps.length < MIN_STEP_COUNT ||
    steps.length > MAX_STEP_COUNT
  )
    return false

  const ids = new Set()

  return steps.every((step) => {
    if (
      step === null ||
      typeof step !== 'object' ||
      !isNonEmptyString(step.id) ||
      ids.has(step.id) ||
      !isNonEmptyString(step.title) ||
      !isNonEmptyString(step.description) ||
      !hasValidMedia(step.media) ||
      !hasValidMediaBackdrop(step.mediaBackdrop) ||
      !hasValidMediaVerticalAlignment(step.mediaVerticalAlignment)
    ) {
      return false
    }

    ids.add(step.id)
    return true
  })
}

function hasValidCta(cta) {
  return (
    cta === undefined ||
    (cta !== null &&
      typeof cta === 'object' &&
      isNonEmptyString(cta.label) &&
      isNonEmptyString(cta.href))
  )
}

function hasValidStepNumberStyle(stepNumberStyle) {
  return STEP_NUMBER_STYLES.has(stepNumberStyle)
}

function hasValidMediaBackdrop(mediaBackdrop) {
  return mediaBackdrop === undefined || MEDIA_BACKDROPS.has(mediaBackdrop)
}

function hasValidMediaVerticalAlignment(mediaVerticalAlignment) {
  return (
    mediaVerticalAlignment === undefined || MEDIA_VERTICAL_ALIGNMENTS.has(mediaVerticalAlignment)
  )
}

function renderTitle(title) {
  return title.split(/\/n|\\n|\n/).map((line, index) => (
    <Fragment key={`${index}-${line}`}>
      {index > 0 ? <br /> : null}
      {line.trim()}
    </Fragment>
  ))
}

/**
 * Desktop and mobile are two different reading contexts here, not one layout at
 * two widths: a pinned section fights touch and stutters at erratic phone
 * scroll speeds, so below 1024px the same steps become tap-driven disclosure.
 * The breakpoint picks the structure rather than restyling one, so neither
 * viewport ships the other's markup, duplicate headings, or duplicate images.
 */
function useIsDesktop() {
  // The viewport does not exist during SSR. Start with the server-safe accordion
  // expression, then select the desktop composition after hydration.
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY)

    function handleChange(event) {
      setIsDesktop(event.matches)
    }

    setIsDesktop(query.matches)
    query.addEventListener('change', handleChange)

    return () => query.removeEventListener('change', handleChange)
  }, [])

  return isDesktop
}

/**
 * @import { Cta, Media } from '../types'
 *
 * @param {object} props
 * @param {string} props.title Required section heading.
 * @param {{ id: string, title: string, description: string, media: Media, mediaBackdrop?: 'chianti' | 'sky' | 'cypress' | 'sunflower', mediaVerticalAlignment?: 'top' | 'bottom' }[]} props.steps
 *   Required ordered steps, three or four. Titles accept `/n`, `\\n`, or a
 *   newline as an explicit line break.
 * @param {string} [props.eyebrow] Uppercase label above the title.
 * @param {string} [props.subtitle] Supporting copy below the title.
 * @param {Cta} [props.cta] Call to action after the final step.
 * @param {'visible' | 'hidden'} [props.stepNumberStyle='visible'] Whether to
 *   show derived step numbers. The rail remains visible on desktop.
 * @param {string} [props.id] Section id, defaults to `how-it-works`.
 */
export default function HowItWorksDefault({
  title,
  steps,
  eyebrow,
  subtitle,
  cta,
  stepNumberStyle = 'visible',
  id = 'how-it-works',
}) {
  const stepsAreValid = hasValidSteps(steps)
  const ctaIsValid = hasValidCta(cta)
  const stepNumberStyleIsValid = hasValidStepNumberStyle(stepNumberStyle)
  const hasStepNumbers = stepNumberStyle === 'visible'
  const isDesktop = useIsDesktop()
  const firstStepId = stepsAreValid ? steps[0].id : null
  const [activeStepId, setActiveStepId] = useState(firstStepId)
  const [openStepId, setOpenStepId] = useState(firstStepId)
  const markerNodes = useRef(new Map())
  const instanceId = useId().replaceAll(':', '')
  const titleId = `${id}-${instanceId}-title`

  useEffect(() => {
    if (!isDesktop || !stepsAreValid) return undefined

    // Nothing in the pinned composition moves, so the observer watches a column
    // of empty markers laid down the scroll track instead. Marker N crossing
    // the middle of the viewport means the reader has scrolled into step N.
    const inBand = new Set()

    // Entries arrive in unspecified order and a fast flick can put more than
    // one marker in the band, so "last intersecting entry wins" could land on a
    // step already scrolled past. Distance to centre is order-independent.
    function resolveActiveStep() {
      const viewportMiddle = window.innerHeight / 2
      let nearestNode = null
      let nearestDistance = Number.POSITIVE_INFINITY

      for (const node of inBand) {
        const rect = node.getBoundingClientRect()
        const distance = Math.abs(rect.top + rect.height / 2 - viewportMiddle)

        if (distance < nearestDistance) {
          nearestDistance = distance
          nearestNode = node
        }
      }

      // Between markers nothing is in the band; holding the current step is the
      // intended reading, not a gap to fill.
      if (nearestNode) setActiveStepId(nearestNode.dataset.stepId)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target)
          else inBand.delete(entry.target)
        }

        resolveActiveStep()
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )

    for (const node of markerNodes.current.values()) {
      if (node) observer.observe(node)
    }

    return () => observer.disconnect()
  }, [isDesktop, steps, stepsAreValid])

  function registerMarker(stepId, node) {
    if (node) markerNodes.current.set(stepId, node)
    else markerNodes.current.delete(stepId)
  }

  /**
   * Clicking a step moves the page to where that step's marker sits at the
   * centre of the viewport — the same position scrolling there would reach, so
   * the section stays a single source of truth for which step is current.
   */
  function goToStep(stepId) {
    const marker = markerNodes.current.get(stepId)
    const scrollTrack = marker?.closest('.how-it-works-default__scroll-track')

    if (!marker || !scrollTrack) return

    const markerRect = marker.getBoundingClientRect()
    const trackRect = scrollTrack.getBoundingClientRect()
    const markerTarget =
      window.scrollY + markerRect.top + markerRect.height / 2 - window.innerHeight / 2
    const trackStart = window.scrollY + trackRect.top
    // The first marker's centre sits half a row into the track, which places its
    // centred viewport target slightly before sticky positioning begins. Clamp
    // that one reverse destination so the pinned composition never releases.
    const target = Math.max(markerTarget, trackStart)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    window.scrollTo({ top: target, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

  function toggleStep(stepId) {
    setOpenStepId((currentStepId) => (currentStepId === stepId ? null : stepId))
  }

  if (
    requireProps('HowItWorksDefault', {
      title,
      steps,
      'three or four complete steps with unique ids': stepsAreValid ? true : undefined,
      ...(cta === undefined
        ? {}
        : { 'cta.label and cta.href when cta is provided': ctaIsValid ? true : undefined }),
      'stepNumberStyle must be visible or hidden': stepNumberStyleIsValid ? true : undefined,
    })
  )
    return null

  const activeIndex = Math.max(
    steps.findIndex((step) => step.id === activeStepId),
    0,
  )
  const activeStep = steps[activeIndex]

  const intro = (
    <header className="how-it-works-default__intro">
      {eyebrow ? <p className="how-it-works-default__eyebrow">{eyebrow}</p> : null}
      <h2 id={titleId}>{title}</h2>
      {subtitle ? <p className="how-it-works-default__subtitle">{subtitle}</p> : null}
    </header>
  )

  const callToAction = cta ? (
    <a
      className="how-it-works-default__cta"
      href={cta.href}
      target={cta.target}
      rel={cta.target === '_blank' ? 'noreferrer noopener' : undefined}
    >
      {cta.label}
    </a>
  ) : null

  function stepNumber(index) {
    return String(index + 1).padStart(2, '0')
  }

  if (isDesktop) {
    return (
      <section
        id={id}
        className={`how-it-works-default${hasStepNumbers ? '' : ' how-it-works-default--without-step-numbers'}`}
        aria-labelledby={titleId}
      >
        <div
          className="how-it-works-default__scroll-track"
          style={{ '--how-it-works-step-count': steps.length }}
        >
          {/* Held still for the length of the track: the reader's scroll changes
              which step is current and nothing else. */}
          <div className="how-it-works-default__pinned">
            <div className="how-it-works-default__layout">
              {intro}

              <div className="how-it-works-default__body">
                <div className="how-it-works-default__track">
                  <ol className="how-it-works-default__steps">
                    {steps.map((step, index) => (
                      <li
                        key={step.id}
                        className={`how-it-works-default__step${
                          index === activeIndex ? ' how-it-works-default__step--active' : ''
                        }`}
                      >
                        <div className="how-it-works-default__step-content">
                          {hasStepNumbers ? (
                            <p className="how-it-works-default__number">{stepNumber(index)}</p>
                          ) : null}
                          <h3>
                            <button
                              type="button"
                              className="how-it-works-default__step-link"
                              aria-current={index === activeIndex ? 'step' : undefined}
                              onClick={() => goToStep(step.id)}
                            >
                              {renderTitle(step.title)}
                            </button>
                          </h3>
                          <p className="how-it-works-default__description">{step.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>

                  {callToAction}
                </div>

                <div className="how-it-works-default__panel">
                  <div
                    className={`how-it-works-default__panel-stage${
                      activeStep.mediaBackdrop
                        ? ` how-it-works-default__panel-stage--${activeStep.mediaBackdrop}`
                        : ''
                    }`}
                  >
                    {steps.map((step, index) => (
                      <img
                        key={step.id}
                        className={[
                          index === activeIndex ? 'how-it-works-default__panel-image--visible' : '',
                          step.mediaVerticalAlignment === 'top'
                            ? 'how-it-works-default__panel-image--top-aligned'
                            : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        src={step.media.src}
                        alt={step.media.alt}
                        width={step.media.width}
                        height={step.media.height}
                        aria-hidden={index !== activeIndex}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Empty markers, one per step, spaced a step's worth of scroll apart.
              They carry no content and are never announced. */}
          <div className="how-it-works-default__markers" aria-hidden="true">
            {steps.map((step) => (
              <span
                key={step.id}
                ref={(node) => {
                  registerMarker(step.id, node)
                }}
                data-step-id={step.id}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id={id}
      className={`how-it-works-default${hasStepNumbers ? '' : ' how-it-works-default--without-step-numbers'}`}
      aria-labelledby={titleId}
    >
      <div className="how-it-works-default__layout">
        {intro}

        <div className="how-it-works-default__body">
          <div className="how-it-works-default__track">
            <ol className="how-it-works-default__steps">
              {steps.map((step, index) => {
                const isOpen = openStepId === step.id
                const triggerId = `${id}-${instanceId}-${step.id}-trigger`
                const panelId = `${id}-${instanceId}-${step.id}-panel`

                return (
                  <li
                    key={step.id}
                    className={`how-it-works-default__step${
                      isOpen ? ' how-it-works-default__step--open' : ''
                    }`}
                  >
                    <h3>
                      <button
                        type="button"
                        className="how-it-works-default__trigger"
                        id={triggerId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggleStep(step.id)}
                      >
                        {hasStepNumbers ? (
                          <span className="how-it-works-default__number">{stepNumber(index)}</span>
                        ) : null}
                        <span className="how-it-works-default__step-title">{renderTitle(step.title)}</span>
                        <span className="how-it-works-default__icon" aria-hidden="true">
                          <Plus size={24} strokeWidth={1.75} />
                        </span>
                      </button>
                    </h3>

                    <div
                      id={panelId}
                      className="how-it-works-default__disclosure"
                      role="region"
                      aria-labelledby={triggerId}
                      aria-hidden={!isOpen}
                    >
                      <div>
                        <p className="how-it-works-default__description">{step.description}</p>
                        <div className="how-it-works-default__inline-media">
                          <div
                            className={`how-it-works-default__inline-media-stage${
                              step.mediaBackdrop
                                ? ` how-it-works-default__inline-media-stage--${step.mediaBackdrop}`
                                : ''
                            }`}
                          >
                            <img
                              className={
                                step.mediaVerticalAlignment === 'top'
                                  ? 'how-it-works-default__inline-media-image--top-aligned'
                                  : undefined
                              }
                              src={step.media.src}
                              alt={step.media.alt}
                              width={step.media.width}
                              height={step.media.height}
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>

            {callToAction}
          </div>
        </div>
      </div>
    </section>
  )
}
