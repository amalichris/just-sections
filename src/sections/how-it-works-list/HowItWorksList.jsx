import { useId } from 'react'
import requireProps from '../requireProps'
import './HowItWorksList.css'

const MIN_STEP_COUNT = 3
const MAX_STEP_COUNT = 4
const MEDIA_STACKED_TREATMENTS = new Set(['contained', 'edge-to-edge', 'hidden'])

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
  if (!Array.isArray(steps) || steps.length < MIN_STEP_COUNT || steps.length > MAX_STEP_COUNT)
    return false

  const ids = new Set()

  return steps.every((step) => {
    if (
      step === null ||
      typeof step !== 'object' ||
      !isNonEmptyString(step.id) ||
      ids.has(step.id) ||
      !isNonEmptyString(step.title) ||
      !isNonEmptyString(step.description)
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
      isNonEmptyString(cta.href) &&
      (cta.badge === undefined || hasValidMedia(cta.badge)))
  )
}

/**
 * Marketing Steps List: three or four ordered, text-only steps, with an
 * optional photo beside them (Marketing Split Photo) and an optional CTA.
 *
 * Use it for a flow whose steps have no screen worth showing — claiming,
 * verifying, redeeming. When every step has a real product image,
 * `how-it-works-default` (Process Story) is the right section.
 *
 * @import { Cta, Media } from '../types'
 *
 * @param {object} props
 * @param {string} props.title Required section heading.
 * @param {{ id: string, title: string, description: string }[]} props.steps
 *   Required, three or four, each with a unique `id`. Step labels (`01`, `02`…)
 *   derive from order.
 * @param {string} [props.eyebrow] Uppercase label above the title.
 * @param {string} [props.subtitle] Supporting copy below the title.
 * @param {Cta} [props.cta] Intrinsic Sienna Brand Pill below the list.
 * @param {Media} [props.media] One photo beside the steps; cropped with `cover`
 *   to 4:5 at 1024px and above, 1:1 below.
 * @param {'contained' | 'edge-to-edge' | 'hidden'} [props.mediaOnMobile='contained']
 *   How `media` renders below 768px: inside the page gutters, across the full
 *   viewport width with square corners, or not at all.
 * @param {'contained' | 'edge-to-edge' | 'hidden'} [props.mediaOnTablet='contained']
 *   The same choice from 768px to 1023px, where the layout is still stacked.
 *   Independent of `mediaOnMobile`.
 * @param {string} [props.id] Section id, defaults to `how-it-works`.
 */
export default function HowItWorksList({
  title,
  steps,
  eyebrow,
  subtitle,
  cta,
  media,
  mediaOnMobile = 'contained',
  mediaOnTablet = 'contained',
  id = 'how-it-works',
}) {
  const instanceId = useId().replaceAll(':', '')
  const titleId = `${id}-${instanceId}-title`

  if (
    requireProps('HowItWorksList', {
      title,
      steps,
      'three or four complete steps with unique ids': hasValidSteps(steps) ? true : undefined,
      'a complete cta when one is given': hasValidCta(cta) ? true : undefined,
      'a media object with src and alt when one is given':
        media === undefined || hasValidMedia(media) ? true : undefined,
      "mediaOnMobile of 'contained', 'edge-to-edge' or 'hidden'":
        MEDIA_STACKED_TREATMENTS.has(mediaOnMobile) ? true : undefined,
      "mediaOnTablet of 'contained', 'edge-to-edge' or 'hidden'":
        MEDIA_STACKED_TREATMENTS.has(mediaOnTablet) ? true : undefined,
    })
  )
    return null

  return (
    <section id={id} className="how-it-works-list" aria-labelledby={titleId}>
      <div className={`how-it-works-list__layout${media ? ' how-it-works-list__layout--with-media' : ''}`}>
        <div className="how-it-works-list__content">
          <header className="how-it-works-list__intro">
            {eyebrow ? <p className="how-it-works-list__eyebrow">{eyebrow}</p> : null}
            <h2 id={titleId}>{title}</h2>
            {subtitle ? <p className="how-it-works-list__subtitle">{subtitle}</p> : null}
          </header>

          <ol className="how-it-works-list__steps">
            {steps.map((step, index) => (
              <li key={step.id} className="how-it-works-list__step">
                {/* Order is already conveyed by the ordered list. */}
                <span className="how-it-works-list__label" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="how-it-works-list__step-copy">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          {cta ? (
            <a
              className={`how-it-works-list__cta${cta.badge ? ' how-it-works-list__cta--badge' : ''}`}
              href={cta.href}
              target={cta.target}
              rel={cta.target === '_blank' ? 'noreferrer noopener' : undefined}
            >
              {cta.badge ? (
                <img
                  src={cta.badge.src}
                  alt={cta.badge.alt}
                  width={cta.badge.width}
                  height={cta.badge.height}
                />
              ) : (
                cta.label
              )}
            </a>
          ) : null}
        </div>

        {media ? (
          <div className={`how-it-works-list__photo how-it-works-list__photo--mobile-${mediaOnMobile} how-it-works-list__photo--tablet-${mediaOnTablet}`}>
            <img
              src={media.src}
              alt={media.alt}
              width={media.width}
              height={media.height}
              srcSet={media.srcSet}
              sizes={media.sizes}
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}
