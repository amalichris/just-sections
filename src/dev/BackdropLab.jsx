import { useState } from 'react'
import { Link } from 'react-router-dom'
import './gallery.css'
import './backdropLab.css'
import './backdrops.css'

import benefitContracts from './demo/assets/benefit-1-contracts.svg'
import benefitGenerate from './demo/assets/benefit-2-generate.svg'
import benefitFields from './demo/assets/benefit-3-fields.svg'
import stepOpen from './demo/assets/step-1-open.svg'
import stepFill from './demo/assets/step-2-fill.svg'
import stepPdf from './demo/assets/step-3-pdf.svg'

/**
 * Candidate backdrops for the six media spots.
 *
 * Exploration only. These are not section variants: adding one would change
 * `plan.md`, `prompt.md`, the shared revision, and — because a backdrop
 * introduces colour the system does not have — `design.md` too. None of that
 * is worth spending before the technique is settled, so this route exists to
 * settle it.
 */
const SPOTS = [
  { spot: 'Benefits — card 1', media: benefitContracts },
  { spot: 'Benefits — card 2', media: benefitGenerate },
  { spot: 'Benefits — card 3', media: benefitFields },
  { spot: 'How it works — step 1', media: stepOpen },
  { spot: 'How it works — step 2', media: stepFill },
  { spot: 'How it works — step 3', media: stepPdf },
]

const GROUPS = [
  {
    id: 'paper',
    name: 'Paper garden',
    lede: 'A little like a beautiful book cover: quiet paper at the centre, oversized cut forms at the edge. The product is mounted, not fogged over.',
    variants: [
      { id: 'citrus', name: 'Citrus', hue: 'sunflower · sienna · parchment' },
      { id: 'mulberry', name: 'Mulberry', hue: 'chianti · coral · parchment' },
      { id: 'herbarium', name: 'Herbarium', hue: 'cypress · warm sand · parchment' },
    ],
  },
  {
    id: 'sunroom',
    name: 'Sunroom',
    lede: 'Light passes through translucent colour, then pools on a warm wall. More atmospheric than a gradient, but still composed enough to hold a product image.',
    variants: [
      { id: 'apricot-window', name: 'Apricot window', hue: 'sienna · coral · ivory' },
      { id: 'blue-hour', name: 'Blue hour', hue: 'sky · wisteria · ivory' },
      { id: 'olive-light', name: 'Olive light', hue: 'cypress · sunflower · ivory' },
    ],
  },
  {
    id: 'marquetry',
    name: 'Marquetry',
    lede: 'Inlaid shapes rather than digital geometry — the colour is deliberate, tactile, and positioned around the UI instead of behind every pixel of it.',
    variants: [
      { id: 'ribbon', name: 'Ribbon', hue: 'wisteria · sky · ivory' },
      { id: 'terracotta', name: 'Terracotta', hue: 'poppy · chianti · warm sand' },
      { id: 'night-garden', name: 'Night garden', hue: 'cypress · near black · sunflower' },
    ],
  },
  {
    id: 'rhythm',
    name: 'Ivory rhythm',
    lede: 'The tile reference reduced to its useful ingredients: one solid field, generous ivory marks, and a measured repeat. No simulated material, no geometry trying to be clever.',
    variants: [
      { id: 'sienna-stripes', name: 'Sienna stripes', hue: 'sienna · ivory' },
      { id: 'marine-arches', name: 'Marine arches', hue: 'sky · ivory' },
      { id: 'cypress-bands', name: 'Cypress bands', hue: 'cypress · ivory' },
    ],
  },
]

const SHAPES = [
  { id: 'wide', label: '16:10 — benefits', ratio: '16 / 10' },
  { id: 'portrait', label: 'Portrait — how it works', ratio: '10 / 16' },
]

export default function BackdropLab() {
  const [shape, setShape] = useState('wide')
  const [showProduct, setShowProduct] = useState(true)
  const [mount, setMount] = useState(true)

  const activeShape = SHAPES.find((option) => option.id === shape)

  return (
    <div className="gallery lab">
      <header className="gallery__masthead">
        <Link className="gallery__back" to="/gallery">
          ← Section gallery
        </Link>
        <h1 className="gallery__title">Backdrop lab</h1>
        <p className="gallery__lede">
          Candidate backdrops for the six media spots, in four studies, on JustConvert&rsquo;s
          App Store palette. Pure CSS — no asset files, no per-viewport exports. Development only;
          nothing here is wired into a section, and the hues are <code>--lab-*</code> rather than{' '}
          <code>--just-*</code> because one product&rsquo;s brand colours are not family tokens yet.
        </p>
      </header>

      <div className="lab__controls">
        <div className="lab__control">
          <span className="lab__control-label">Frame</span>
          <div className="lab__chips">
            {SHAPES.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`lab__chip${shape === option.id ? ' lab__chip--on' : ''}`}
                onClick={() => setShape(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="lab__control">
          <span className="lab__control-label">Card</span>
          <div className="lab__chips">
            <button
              type="button"
              className={`lab__chip${showProduct ? ' lab__chip--on' : ''}`}
              onClick={() => setShowProduct((value) => !value)}
            >
              {showProduct ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        <div className="lab__control">
          <span className="lab__control-label">Product mount</span>
          <div className="lab__chips">
            <button
              type="button"
              className={`lab__chip${mount ? ' lab__chip--on' : ''}`}
              onClick={() => setMount((value) => !value)}
            >
              {mount ? 'Paper' : 'Bare'}
            </button>
          </div>
        </div>
      </div>

      {GROUPS.map((group) => (
        <section key={group.id} className="lab__group">
          <h2 className="lab__group-title">{group.name}</h2>
          <p className="lab__group-lede">{group.lede}</p>

          <div className="lab__grid">
            {group.variants.map((variant, index) => {
              const slot = SPOTS[index % SPOTS.length]

              return (
                <figure key={variant.id} className="lab__item">
                  <div
                    className={`lab__frame${mount ? ' lab__frame--mounted' : ''}`}
                    style={{ '--lab-frame-ratio': activeShape.ratio }}
                  >
                    <div className={`bd bd--${variant.id}`} />

                    {showProduct && (
                      <div className="lab__product">
                        <img src={slot.media} alt="" />
                      </div>
                    )}
                  </div>

                  <figcaption className="lab__caption">
                    <div className="lab__caption-head">
                      <span className="lab__name">{variant.name}</span>
                      <span className={`lab__tag lab__tag--${group.id}`}>{group.name}</span>
                    </div>
                    <p className="lab__spot">
                      {slot.spot} · {variant.hue}
                    </p>
                  </figcaption>
                </figure>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
