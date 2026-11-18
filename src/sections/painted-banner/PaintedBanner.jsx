import './PaintedBanner.css'

/**
 * Shared internal piece, not a registered section: a full-bleed painting that
 * fades into the page over its bottom 55%, so the following heading can sit in
 * the fade. Used by `legal-document-default` and `not-found-default`.
 * Implements just-design-system surfaces/web.md §9 "Painted banner".
 *
 * @import { Media } from '../types'
 *
 * @param {{ media: Media, focal?: string }} props `focal` is the vertical crop
 *   position, e.g. `'40%'`; defaults to center.
 */
export default function PaintedBanner({ media, focal }) {
  return (
    <div className="painted-banner" aria-hidden="true">
      <img
        src={media.src}
        srcSet={media.srcSet}
        sizes={media.sizes ?? '100vw'}
        alt=""
        width={media.width}
        height={media.height}
        fetchPriority="high"
        decoding="async"
        style={focal ? { objectPosition: `center ${focal}` } : undefined}
      />
      <div className="painted-banner__fade" />
    </div>
  )
}
