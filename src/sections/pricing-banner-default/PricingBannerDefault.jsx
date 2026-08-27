import { useId } from 'react'
import requireProps from '../requireProps'
import './PricingBannerDefault.css'

/**
 * @import { Cta } from '../types'
 *
 * @param {object} props
 * @param {string} props.title Required conversion heading.
 * @param {Cta} props.cta Required acquisition call to action.
 * @param {string} [props.eyebrow] Uppercase label above the title.
 * @param {string} [props.subtitle] Supporting copy below the title.
 * @param {string} [props.id] Section id, defaults to `pricing`.
 */
export default function PricingBannerDefault({
  title,
  cta,
  eyebrow,
  subtitle,
  id = 'pricing',
}) {
  const instanceId = useId().replaceAll(':', '')
  const titleId = `${id}-${instanceId}-title`

  if (requireProps('PricingBannerDefault', { title, cta })) return null

  return (
    <section id={id} className="pricing-banner-default" aria-labelledby={titleId}>
      <div className="pricing-banner-default__content">
        {eyebrow ? <p className="pricing-banner-default__eyebrow">{eyebrow}</p> : null}
        <h2 id={titleId}>{title}</h2>
        {subtitle ? <p className="pricing-banner-default__subtitle">{subtitle}</p> : null}
        <a
          className={`pricing-banner-default__cta${cta.badge ? ' pricing-banner-default__cta--badge' : ''}`}
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
      </div>
    </section>
  )
}
