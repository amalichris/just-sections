import { useEffect, useState } from 'react'
import requireProps from '../requireProps'
import './HeaderDefault.css'

/**
 * @import { Brand, Cta, NavigationItem } from '../types'
 *
 * @param {object} props
 * @param {Brand} props.brand Required product wordmark and its link target.
 * @param {Cta} props.cta Required top-of-page call to action.
 * @param {NavigationItem[]} [props.navigation] Same-page links. Omitted or
 *   empty renders no link list; the wordmark and CTA keep their positions.
 * @param {string} [props.id] Optional element id.
 */
export default function HeaderDefault({ brand, cta, navigation, id }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)')

    const updateScrolledState = () => {
      const mobile = mobileQuery.matches
      const enterThreshold = mobile ? 16 : 64
      const exitThreshold = mobile ? 4 : 32

      setIsScrolled((wasScrolled) => {
        if (window.scrollY >= enterThreshold) return true
        if (window.scrollY <= exitThreshold) return false

        return wasScrolled
      })
    }

    updateScrolledState()
    window.addEventListener('scroll', updateScrolledState, { passive: true })
    mobileQuery.addEventListener('change', updateScrolledState)

    return () => {
      window.removeEventListener('scroll', updateScrolledState)
      mobileQuery.removeEventListener('change', updateScrolledState)
    }
  }, [])

  if (requireProps('HeaderDefault', { brand, cta })) return null

  return (
    <header
      id={id}
      className={`header-default${isScrolled ? ' header-default--scrolled' : ''}`}
    >
      <nav className="header-default__nav" aria-label="Primary navigation">
        <a className="header-default__wordmark" href={brand.href}>
          {brand.label}
        </a>

        {navigation?.length ? (
          <ul className="header-default__links">
            {navigation.map(({ label, targetId }) => (
              <li key={targetId}>
                <a href={`#${targetId}`}>{label}</a>
              </li>
            ))}
          </ul>
        ) : null}

        <a
          className={`header-default__cta${cta.badge ? ' header-default__cta--badge' : ''}`}
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
      </nav>
    </header>
  )
}
