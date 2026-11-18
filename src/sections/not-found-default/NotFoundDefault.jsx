import { useId } from 'react'
import requireProps from '../requireProps'
import PaintedBanner from '../painted-banner/PaintedBanner'
import './NotFoundDefault.css'

/**
 * @import { Media } from '../types'
 *
 * @param {object} props
 * @param {string} props.title Required page heading, rendered as the page `h1`.
 * @param {string} [props.description] Supporting copy below the title.
 * @param {{ id: string, label: string, href: string }[]} [props.links] Pages
 *   that do exist. Omitted or empty renders no link row.
 * @param {Media} [props.banner] Decorative painting above the title.
 * @param {string} [props.bannerFocal] Vertical crop position, e.g. `'60%'`.
 * @param {string} [props.id] Section id, defaults to `not-found`.
 */
export default function NotFoundDefault({ title, description, links, banner, bannerFocal, id = 'not-found' }) {
  const titleId = `${id}-${useId().replaceAll(':', '')}-title`

  if (requireProps('NotFoundDefault', { title })) return null

  return (
    <section
      id={id}
      className={`not-found-default${banner?.src ? ' not-found-default--banner' : ''}`}
      aria-labelledby={titleId}
    >
      {banner?.src ? <PaintedBanner media={banner} focal={bannerFocal} /> : null}
      <div className="not-found-default__content">
        <h1 id={titleId}>{title}</h1>
        {description ? <p>{description}</p> : null}
        {links?.length ? (
          <nav aria-label="Pages on this site">
            <ul>
              {links.map((link) => (
                <li key={link.id}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </section>
  )
}
