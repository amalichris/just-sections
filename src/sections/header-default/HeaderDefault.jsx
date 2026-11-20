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
 * @param {'fixed' | 'static'} [props.position='fixed'] `fixed` follows the
 *   page and morphs into the glass pill on scroll; `static` sits at the top of
 *   the page in normal flow and scrolls away with it.
 * @param {string} [props.id] Optional element id.
 */
export default function HeaderDefault({ brand, cta, navigation, position = 'fixed', id }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeTargetId, setActiveTargetId] = useState(null)
  const targetKey = navigation?.map(({ targetId }) => targetId).join(' ') ?? ''

  // The last section whose top has passed a line 40% down the viewport is
  // current; nothing is above the first one (the hero). Tops, not full rects:
  // a section pinned under a later cover keeps a rect that spans the viewport.
  useEffect(() => {
    const targetIds = targetKey ? targetKey.split(' ') : []
    if (!targetIds.length) return undefined
    let frame

    const update = () => {
      frame = undefined
      const line = window.innerHeight * 0.4
      const current = targetIds.findLast((targetId) => {
        const top = document.getElementById(targetId)?.getBoundingClientRect().top
        return top !== undefined && top <= line
      })
      setActiveTargetId(current ?? null)
    }
    const schedule = () => {
      if (frame === undefined) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [targetKey])

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

  // Any value other than `static` keeps the fixed header, so a typo never
  // changes how an existing page behaves.
  const isStatic = position === 'static'
  const stateClass = isStatic
    ? ' header-default--static'
    : isScrolled
      ? ' header-default--scrolled'
      : ''

  return (
    <header id={id} className={`header-default${stateClass}`}>
      <nav className="header-default__nav" aria-label="Primary navigation">
        <a className="header-default__wordmark" href={brand.href}>
          {brand.label}
        </a>

        {navigation?.length ? (
          <ul className="header-default__links">
            {navigation.map(({ label, targetId }) => (
              <li key={targetId}>
                <a href={`#${targetId}`} aria-current={targetId === activeTargetId ? 'location' : undefined}>
                  {label}
                </a>
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
