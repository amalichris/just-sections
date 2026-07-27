import requireProps from '../requireProps'
import './FooterDefault.css'

/**
 * Legal-only footer. Adding a CTA, newsletter, social links, or product
 * navigation requires a separate documented design-system pattern.
 *
 * @param {object} props
 * @param {string} props.productName Required name used in the copyright notice.
 * @param {string} [props.privacyHref] Destination for the Privacy link.
 * @param {string} [props.termsHref] Destination for the Terms link. With neither
 *   href supplied the legal navigation is not rendered.
 * @param {'parchment' | 'ivory'} [props.surface='parchment'] Section surface.
 * @param {string} [props.id] Optional element id.
 */
export default function FooterDefault({
  productName,
  privacyHref,
  termsHref,
  surface = 'parchment',
  id,
}) {
  const year = new Date().getFullYear()

  if (requireProps('FooterDefault', { productName })) return null

  const surfaceClass = surface === 'ivory' ? 'footer-default--ivory' : 'footer-default--parchment'

  return (
    <footer id={id} className={`footer-default ${surfaceClass}`}>
      <div className="footer-default__inner">
        <p>© {year} {productName}. All rights reserved.</p>

        {privacyHref || termsHref ? (
          <nav aria-label="Legal">
            {privacyHref ? <a href={privacyHref}>Privacy</a> : null}
            {termsHref ? <a href={termsHref}>Terms</a> : null}
          </nav>
        ) : null}
      </div>
    </footer>
  )
}
