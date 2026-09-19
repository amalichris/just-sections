import { useId } from 'react'
import requireProps from '../requireProps'
import './StoryDefault.css'

const MEDIA_CORNERS = new Set(['rounded', 'square'])
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

function hasValidSignature(signature) {
  return (
    signature === undefined ||
    (signature !== null &&
      typeof signature === 'object' &&
      isNonEmptyString(signature.name) &&
      (signature.role === undefined || isNonEmptyString(signature.role)) &&
      (signature.avatar === undefined || hasValidMedia(signature.avatar)))
  )
}

/** Blank lines separate paragraphs; single newlines stay inside one. */
function toParagraphs(body) {
  return typeof body === 'string'
    ? body
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
    : []
}

/**
 * Marketing Story: a prose section with an optional signature and an optional
 * photo. Carries founder notes and any "why" passage that must read as a
 * person talking rather than a feature list.
 *
 * With `media` it uses the Marketing Split Photo layout; without it the text
 * is a single 624px letter column.
 *
 * @import { Media } from '../types'
 *
 * @param {object} props
 * @param {string} props.title Required section heading.
 * @param {string} props.body Required prose. Blank lines separate paragraphs.
 * @param {string} [props.eyebrow] Uppercase label above the title.
 * @param {{ name: string, role?: string, avatar?: Media }} [props.signature]
 *   Who is speaking. `name` is required when a signature is given; the avatar
 *   renders as a 48px circle.
 * @param {Media} [props.media] One photo beside the text; cropped with `cover`
 *   to 4:5 at 1024px and above, 1:1 below. Set plainly on the page, with no
 *   frame or border.
 * @param {'rounded' | 'square'} [props.mediaCorners='rounded'] Corner treatment
 *   of `media`: the 24px Marketing Landing Card Radius, or none.
 * @param {'contained' | 'edge-to-edge' | 'hidden'} [props.mediaOnMobile='contained']
 *   How `media` renders below 768px: inside the page gutters, across the full
 *   viewport width with square corners, or not at all.
 * @param {'contained' | 'edge-to-edge' | 'hidden'} [props.mediaOnTablet='contained']
 *   The same choice from 768px to 1023px, where the layout is still stacked.
 *   Independent of `mediaOnMobile`.
 * @param {string} [props.id] Section id, defaults to `story`.
 */
export default function StoryDefault({
  title,
  body,
  eyebrow,
  signature,
  media,
  mediaCorners = 'rounded',
  mediaOnMobile = 'contained',
  mediaOnTablet = 'contained',
  id = 'story',
}) {
  const instanceId = useId().replaceAll(':', '')
  const titleId = `${id}-${instanceId}-title`
  const paragraphs = toParagraphs(body)

  if (
    requireProps('StoryDefault', {
      title,
      body: paragraphs.length > 0 ? body : undefined,
      'a signature with a name when one is given': hasValidSignature(signature) ? true : undefined,
      'a media object with src and alt when one is given':
        media === undefined || hasValidMedia(media) ? true : undefined,
      "mediaCorners of 'rounded' or 'square'": MEDIA_CORNERS.has(mediaCorners) ? true : undefined,
      "mediaOnMobile of 'contained', 'edge-to-edge' or 'hidden'":
        MEDIA_STACKED_TREATMENTS.has(mediaOnMobile) ? true : undefined,
      "mediaOnTablet of 'contained', 'edge-to-edge' or 'hidden'":
        MEDIA_STACKED_TREATMENTS.has(mediaOnTablet) ? true : undefined,
    })
  )
    return null

  return (
    <section id={id} className="story-default" aria-labelledby={titleId}>
      <div className={`story-default__layout${media ? ' story-default__layout--with-media' : ''}`}>
        <div className="story-default__content">
          {eyebrow ? <p className="story-default__eyebrow">{eyebrow}</p> : null}
          <h2 id={titleId}>{title}</h2>

          <div className="story-default__body">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {signature ? (
            <div className="story-default__signature">
              {signature.avatar ? (
                <img
                  className="story-default__avatar"
                  src={signature.avatar.src}
                  alt={signature.avatar.alt}
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                />
              ) : null}
              <p>
                <span className="story-default__name">{signature.name}</span>
                {signature.role ? <span className="story-default__role">{signature.role}</span> : null}
              </p>
            </div>
          ) : null}
        </div>

        {media ? (
          <div
            className={`story-default__photo story-default__photo--${mediaCorners} story-default__photo--mobile-${mediaOnMobile} story-default__photo--tablet-${mediaOnTablet}`}
          >
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
