import { useId, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import requireProps from '../requireProps'
import './BenefitsCarousel.css'

const MIN_ITEM_COUNT = 3
const MAX_ITEM_COUNT = 12
const MEDIA_BACKDROPS = new Set(['chianti', 'sky', 'cypress', 'sunflower', 'charcoal'])
const MOBILE_LAYOUTS = new Set(['accordion', 'rail'])
const MEDIA_VERTICAL_ALIGNMENTS = new Set(['bottom', 'top'])
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

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

/**
 * Every item declares exactly one backdrop, and which one decides whether the
 * contained image is required — the rule `benefits-showcase` already uses.
 *
 * A colour field with nothing on it is an empty coloured rectangle, so `media`
 * is required there. A backdrop image can stand on its own, so `media` is
 * optional over it.
 */
function hasValidMediaField(item) {
  const hasBackdrop = item.mediaBackdrop !== undefined
  const hasBackdropImage = item.mediaBackdropImage !== undefined

  if (hasBackdrop === hasBackdropImage) return false
  if (
    item.mediaVerticalAlignment !== undefined &&
    !MEDIA_VERTICAL_ALIGNMENTS.has(item.mediaVerticalAlignment)
  )
    return false

  if (hasBackdrop) {
    return MEDIA_BACKDROPS.has(item.mediaBackdrop) && hasValidMedia(item.media)
  }

  return (
    hasValidMedia(item.mediaBackdropImage) &&
    (item.media === undefined || hasValidMedia(item.media))
  )
}

function hasValidItems(items) {
  if (!Array.isArray(items) || items.length < MIN_ITEM_COUNT || items.length > MAX_ITEM_COUNT)
    return false

  const ids = new Set()

  return items.every((item) => {
    if (
      item === null ||
      typeof item !== 'object' ||
      !isNonEmptyString(item.id) ||
      ids.has(item.id) ||
      !isNonEmptyString(item.title) ||
      !isNonEmptyString(item.description) ||
      !hasValidMediaField(item)
    ) {
      return false
    }

    ids.add(item.id)
    return true
  })
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches
}

function MediaPanel({ item, className, eager }) {
  return (
    <div className={`${className}${item.mediaBackdrop ? ` ${className}--${item.mediaBackdrop}` : ''}`}>
      {item.mediaBackdropImage ? (
        <img
          className="benefits-carousel__backdrop-image"
          src={item.mediaBackdropImage.src}
          alt={item.mediaBackdropImage.alt}
          width={item.mediaBackdropImage.width}
          height={item.mediaBackdropImage.height}
          srcSet={item.mediaBackdropImage.srcSet}
          sizes={item.mediaBackdropImage.sizes}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      ) : null}

      {item.media ? (
        <img
          className={`benefits-carousel__media${
            item.mediaVerticalAlignment === 'top' ? ' benefits-carousel__media--top-aligned' : ''
          }`}
          src={item.media.src}
          alt={item.media.alt}
          width={item.media.width}
          height={item.media.height}
          srcSet={item.media.srcSet}
          sizes={item.media.sizes}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      ) : null}
    </div>
  )
}

/**
 * Marketing Features Carousel: three to twelve unordered features, one split
 * card at a time, chosen from a tab row with prev/next buttons. Below 768px
 * the same items render as a single-open accordion or, with
 * `layoutOnMobile: 'rail'`, a horizontal scroll rail like `benefits-showcase`.
 *
 * Every expression a page asks for is rendered and CSS selects one per
 * breakpoint, so server output is identical at every viewport and hydration
 * never swaps markup. One piece of state drives the tabs and the accordion, so
 * a reader who resizes keeps their place.
 *
 * @import { Media } from '../types'
 *
 * @param {object} props
 * @param {string} props.title Required section heading; also names the tab list.
 * @param {{
 *   id: string,
 *   title: string,
 *   description: string,
 *   mediaBackdrop?: 'chianti' | 'sky' | 'cypress' | 'sunflower' | 'charcoal',
 *   mediaBackdropImage?: Media,
 *   media?: Media,
 *   mediaVerticalAlignment?: 'bottom' | 'top',
 * }[]} props.items
 *   Required, three to twelve. Each item declares exactly one backdrop:
 *   `mediaBackdrop` (a colour token, which makes `media` required) or
 *   `mediaBackdropImage` (filled with `cover`, which makes `media` optional).
 *   `media` is contained, centred and seated on the panel's bottom edge, or on
 *   its top edge with `mediaVerticalAlignment: 'top'`.
 * @param {string} [props.eyebrow] Uppercase label above the title.
 * @param {string} [props.subtitle] Supporting copy below the title.
 * @param {'accordion' | 'rail'} [props.layoutOnMobile='accordion'] Below 768px:
 *   a single-open accordion, or a native horizontal scroll rail of portrait
 *   cards with a peek of the next one.
 * @param {string} [props.id] Section id, defaults to `benefits-carousel`.
 * @param {(event: { sectionId: string, interaction: 'item_selected', itemId: string }) => void}
 *   [props.onInteraction] Called when a reader makes a different item active.
 */
export default function BenefitsCarousel({
  title,
  items,
  eyebrow,
  subtitle,
  layoutOnMobile = 'accordion',
  id = 'benefits-carousel',
  onInteraction,
}) {
  const itemsAreValid = hasValidItems(items)
  const [activeId, setActiveId] = useState(() => (itemsAreValid ? items[0].id : null))
  const tabListRef = useRef(null)
  const tabRefs = useRef(new Map())
  const instanceId = useId().replaceAll(':', '')
  const titleId = `${id}-${instanceId}-title`

  if (
    requireProps('BenefitsCarousel', {
      title,
      items,
      'three to twelve complete items with unique ids and exactly one backdrop each':
        itemsAreValid ? true : undefined,
      "layoutOnMobile of 'accordion' or 'rail'": MOBILE_LAYOUTS.has(layoutOnMobile) ? true : undefined,
    })
  )
    return null

  // The accordion may close every item; the card view always shows one.
  const selectedIndex = Math.max(
    0,
    items.findIndex((item) => item.id === activeId),
  )
  const selectedId = items[selectedIndex].id

  function select(itemId) {
    if (itemId === activeId) return

    setActiveId(itemId)
    onInteraction?.({ sectionId: id, interaction: 'item_selected', itemId })
  }

  // Scrolls the tab row only. `scrollIntoView` would also scroll the page
  // whenever the row is partly off-screen vertically.
  function revealTab(itemId) {
    const row = tabListRef.current
    const tab = tabRefs.current.get(itemId)
    if (!row || !tab) return

    // The row is positioned, so a tab's offset is measured from the row itself.
    const start = tab.offsetLeft
    const end = start + tab.offsetWidth
    const behavior = prefersReducedMotion() ? 'auto' : 'smooth'

    if (start < row.scrollLeft) {
      row.scrollTo({ left: start, behavior })
    } else if (end > row.scrollLeft + row.clientWidth) {
      row.scrollTo({ left: end - row.clientWidth, behavior })
    }
  }

  function selectIndex(index, { focus = false } = {}) {
    const item = items[index]
    select(item.id)
    revealTab(item.id)
    if (focus) tabRefs.current.get(item.id)?.focus()
  }

  function handleTabKeyDown(event) {
    const last = items.length - 1
    const nextIndex = {
      ArrowRight: Math.min(selectedIndex + 1, last),
      ArrowLeft: Math.max(selectedIndex - 1, 0),
      Home: 0,
      End: last,
    }[event.key]

    if (nextIndex === undefined) return

    event.preventDefault()
    selectIndex(nextIndex, { focus: true })
  }

  function toggleAccordionItem(itemId) {
    if (itemId === activeId) {
      setActiveId(null)
    } else {
      select(itemId)
    }
  }

  const tabId = (itemId) => `${id}-${instanceId}-${itemId}-tab`
  const panelId = (itemId) => `${id}-${instanceId}-${itemId}-panel`

  return (
    <section
      id={id}
      className={`benefits-carousel benefits-carousel--mobile-${layoutOnMobile}`}
      aria-labelledby={titleId}
    >
      <div className="benefits-carousel__layout">
        <header className="benefits-carousel__intro">
          {eyebrow ? <p className="benefits-carousel__eyebrow">{eyebrow}</p> : null}
          <h2 id={titleId}>{title}</h2>
          {subtitle ? <p className="benefits-carousel__subtitle">{subtitle}</p> : null}
        </header>

        <div className="benefits-carousel__cards">
          <div
            ref={tabListRef}
            className="benefits-carousel__tabs"
            role="tablist"
            aria-labelledby={titleId}
            onKeyDown={handleTabKeyDown}
          >
            {items.map((item, index) => {
              const isSelected = item.id === selectedId

              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    if (node) tabRefs.current.set(item.id, node)
                    else tabRefs.current.delete(item.id)
                  }}
                  type="button"
                  role="tab"
                  id={tabId(item.id)}
                  className={`benefits-carousel__tab${isSelected ? ' benefits-carousel__tab--selected' : ''}`}
                  aria-selected={isSelected}
                  aria-controls={panelId(item.id)}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => selectIndex(index)}
                >
                  {item.title}
                </button>
              )
            })}
          </div>

          {/* Every card shares one grid cell, so the stage is as tall as the
              tallest card and never jumps when the selection changes. */}
          <div className="benefits-carousel__stage">
            {items.map((item, index) => {
              const isSelected = item.id === selectedId

              return (
                <div
                  key={item.id}
                  id={panelId(item.id)}
                  className={`benefits-carousel__card${isSelected ? ' benefits-carousel__card--selected' : ''}`}
                  role="tabpanel"
                  aria-labelledby={tabId(item.id)}
                  inert={!isSelected}
                >
                  <div className="benefits-carousel__text">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <MediaPanel item={item} className="benefits-carousel__panel" eager={index === 0} />
                </div>
              )
            })}
          </div>

          <div className="benefits-carousel__controls">
            <button
              type="button"
              className="benefits-carousel__arrow"
              aria-label="Previous"
              aria-controls={panelId(selectedId)}
              disabled={selectedIndex === 0}
              onClick={() => selectIndex(selectedIndex - 1)}
            >
              <span aria-hidden="true">
                <ChevronLeft size={16} strokeWidth={2} />
              </span>
            </button>
            <span className="benefits-carousel__position" aria-hidden="true">
              {selectedIndex + 1} / {items.length}
            </span>
            <button
              type="button"
              className="benefits-carousel__arrow"
              aria-label="Next"
              aria-controls={panelId(selectedId)}
              disabled={selectedIndex === items.length - 1}
              onClick={() => selectIndex(selectedIndex + 1)}
            >
              <span aria-hidden="true">
                <ChevronRight size={16} strokeWidth={2} />
              </span>
            </button>
          </div>
        </div>

        {layoutOnMobile === 'rail' ? (
          // Focusable and named so keyboard users can scroll it; below 768px
          // three cards always overflow, so it is always a real scroller.
          <div
            className="benefits-carousel__rail-viewport"
            role="group"
            aria-label={title}
            tabIndex={0}
          >
            <ul className="benefits-carousel__rail">
              {items.map((item, index) => (
                <li key={item.id} className="benefits-carousel__rail-card">
                  <MediaPanel item={item} className="benefits-carousel__rail-frame" eager={index === 0} />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {layoutOnMobile === 'accordion' ? (
          <div className="benefits-carousel__accordion">
            {items.map((item, index) => {
              const isOpen = item.id === activeId
              const triggerId = `${id}-${instanceId}-${item.id}-trigger`
              const regionId = `${id}-${instanceId}-${item.id}-region`

              return (
                <article
                  key={item.id}
                  className={`benefits-carousel__item${isOpen ? ' benefits-carousel__item--open' : ''}`}
                >
                  <h3>
                    <button
                      type="button"
                      id={triggerId}
                      aria-expanded={isOpen}
                      aria-controls={regionId}
                      onClick={() => toggleAccordionItem(item.id)}
                    >
                      <span>{item.title}</span>
                      <span className="benefits-carousel__icon" aria-hidden="true">
                        <Plus size={24} strokeWidth={1.75} />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={regionId}
                    className="benefits-carousel__region"
                    role="region"
                    aria-labelledby={triggerId}
                    inert={!isOpen}
                  >
                    <div>
                      <p>{item.description}</p>
                      <MediaPanel item={item} className="benefits-carousel__stage-mobile" eager={index === 0} />
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        ) : null}
      </div>
    </section>
  )
}
