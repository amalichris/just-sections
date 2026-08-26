import { useId } from 'react'
import requireProps from '../requireProps'
import './BenefitsDefault.css'

const REQUIRED_ITEM_COUNT = 3
const MEDIA_BACKDROPS = new Set(['chianti', 'sky', 'cypress'])

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

function hasValidProof(proof) {
  return (
    proof === undefined ||
    (proof !== null &&
      typeof proof === 'object' &&
      isNonEmptyString(proof.quote) &&
      isNonEmptyString(proof.attribution))
  )
}

function hasValidMediaBackdrop(mediaBackdrop) {
  return mediaBackdrop === undefined || MEDIA_BACKDROPS.has(mediaBackdrop)
}

function hasValidItems(items) {
  if (!Array.isArray(items) || items.length !== REQUIRED_ITEM_COUNT) return false

  const ids = new Set()

  return items.every((item) => {
    if (
      item === null ||
      typeof item !== 'object' ||
      !isNonEmptyString(item.id) ||
      ids.has(item.id) ||
      !isNonEmptyString(item.title) ||
      !isNonEmptyString(item.description) ||
      !hasValidMedia(item.media) ||
      !hasValidProof(item.proof) ||
      !hasValidMediaBackdrop(item.mediaBackdrop)
    ) {
      return false
    }

    ids.add(item.id)
    return true
  })
}

/**
 * @import { Media } from '../types'
 *
 * @typedef {{ quote: string, attribution: string }} Proof
 *
 * @param {object} props
 * @param {string} props.title Required section heading.
 * @param {{ id: string, title: string, description: string, media: Media, proof?: Proof, mediaBackdrop?: 'chianti' | 'sky' | 'cypress' }[]} props.items
 *   Required benefit cards, exactly three. `items[0]` is the anchor and takes
 *   two thirds of the grid; the other two flank it. Every card carries media:
 *   the section's argument is that the visitor sees the real product.
 * @param {string} [props.eyebrow] Uppercase label above the title.
 * @param {string} [props.subtitle] Supporting copy below the title.
 * @param {string} [props.id] Section id, defaults to `benefits`.
 */
export default function BenefitsDefault({
  title,
  items,
  eyebrow,
  subtitle,
  id = 'benefits',
}) {
  const instanceId = useId().replaceAll(':', '')
  const titleId = `${id}-${instanceId}-title`
  const itemsAreValid = hasValidItems(items)

  if (
    requireProps('BenefitsDefault', {
      title,
      items,
      'exactly three complete items with unique ids': itemsAreValid ? true : undefined,
    })
  )
    return null

  return (
    <section id={id} className="benefits-default" aria-labelledby={titleId}>
      <div className="benefits-default__layout">
        <header className="benefits-default__intro">
          {eyebrow ? <p className="benefits-default__eyebrow">{eyebrow}</p> : null}
          <h2 id={titleId}>{title}</h2>
          {subtitle ? <p className="benefits-default__subtitle">{subtitle}</p> : null}
        </header>

        <div className="benefits-default__grid">
          {items.map((item, index) => (
            <article
              key={item.id}
              className={`benefits-default__card${index === 0 ? ' benefits-default__card--anchor' : ''}`}
            >
              <div
                className={`benefits-default__media${item.mediaBackdrop ? ` benefits-default__media--${item.mediaBackdrop}` : ''}`}
              >
                <img
                  src={item.media.src}
                  alt={item.media.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h3>{item.title}</h3>
              <p className="benefits-default__description">{item.description}</p>

              {item.proof ? (
                <figure className="benefits-default__proof">
                  <blockquote>{item.proof.quote}</blockquote>
                  <figcaption>{item.proof.attribution}</figcaption>
                </figure>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
