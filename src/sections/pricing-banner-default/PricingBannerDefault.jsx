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
 * @param {'band' | 'card'} [props.frame='band'] Full-width band, or an inset
 *   card on the page background.
 * @param {{ trial: string, trialDescription: string, price: string, unit: string, description: string, terms?: string }} [props.offer]
 * @param {string} [props.id] Section id, defaults to `pricing`.
 */
export default function PricingBannerDefault({
  title,
  cta,
  eyebrow,
  subtitle,
  offer,
  frame = 'band',
  id = 'pricing',
}) {
  const instanceId = useId().replaceAll(':', '')
  const titleId = `${id}-${instanceId}-title`

  const validOffer = offer === undefined || (
    offer && [offer.trial, offer.trialDescription, offer.price, offer.unit, offer.description]
      .every((value) => typeof value === 'string' && value.trim()) &&
    (offer.terms === undefined || (typeof offer.terms === 'string' && offer.terms.trim()))
  )
  if (requireProps('PricingBannerDefault', { title, cta, 'complete offer': validOffer || undefined })) return null

  // Any value other than `card` falls back to the band, so a typo never
  // removes the page's closing call to action.
  const frameClass = frame === 'card' ? ' pricing-banner-default--card' : ''

  return (
    <section id={id} className={`pricing-banner-default${frameClass}${offer ? ' pricing-banner-default--offer' : ''}`} aria-labelledby={titleId}>
      <div className="pricing-banner-default__content">
        <div className="pricing-banner-default__intro">
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
        {offer ? (
          <div className="pricing-banner-default__offer">
            <div className="pricing-banner-default__trial">
              <h3>{offer.trial}</h3>
              <p>{offer.trialDescription}</p>
            </div>
            <div className="pricing-banner-default__paid">
              <p className="pricing-banner-default__unit">{offer.unit}</p>
              <p className="pricing-banner-default__price">{offer.price}</p>
              <p>{offer.description}</p>
              {offer.terms ? <p className="pricing-banner-default__terms">{offer.terms}</p> : null}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
