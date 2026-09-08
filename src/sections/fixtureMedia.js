/**
 * Builds a labelled placeholder `Media` object for section fixtures.
 *
 * Returns an inline SVG data URI rather than referencing a file, because
 * sections ship no imagery — every image a section renders is supplied by page
 * configuration. A fixture that imported a real asset would put one back into
 * the library and defeat that rule.
 *
 * Fixtures only. Never use this in a page config: a real page supplies real
 * product captures.
 *
 * @import { Media } from './types'
 *
 * @param {string} label Text drawn on the placeholder, so a gallery entry
 *   identifies which slot it is filling.
 * @param {{ width?: number, height?: number, alt?: string, variant?: 'panel' | 'screen' }} [options]
 *   `alt` defaults to an empty string, matching how decorative media is
 *   configured. Pass real alt text when the fixture is exercising a section's
 *   informative-image path.
 *
 *   `variant` selects the placeholder's shape. `panel` (the default) draws an
 *   inset ivory card on a parchment ground — right for a section whose frame
 *   holds a bounded illustration. `screen` draws a full-bleed interface stand-in
 *   with no inset and no border, for a section that seats a device capture
 *   against its frame's edges: there, `panel`'s inset card reads as a second
 *   frame the section does not actually render, which misleads a reviewer about
 *   the treatment being reviewed.
 * @returns {Media}
 */
export default function fixtureMedia(label, options = {}) {
  const { width = 640, height = 400, alt = '', variant = 'panel' } = options

  const svg =
    variant === 'screen' ? screenPlaceholder(label, width, height) : panelPlaceholder(label, width, height)

  return { src: `data:image/svg+xml,${encodeURIComponent(svg)}`, alt, width, height }
}

function panelPlaceholder(label, width, height) {
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"`,
    ` width="${width}" height="${height}" role="img"><title>${label}</title>`,
    `<rect width="${width}" height="${height}" fill="#F5F4ED"/>`,
    `<rect x="12" y="12" width="${width - 24}" height="${height - 24}" rx="20"`,
    ` fill="#FAF9F5" stroke="#D1CFC5" stroke-width="2"/>`,
    `<text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"`,
    ` font-family="Inter, sans-serif" font-size="${Math.round(width / 20)}"`,
    ` fill="#87867F">${label}</text></svg>`,
  ].join('')
}

/**
 * A flat interface stand-in: status row, title, a value block, and list rows.
 * Enough structure that a reviewer can see where a frame crops the capture,
 * which a blank rectangle cannot show.
 */
function screenPlaceholder(label, width, height) {
  const pad = Math.round(width * 0.08)
  const inner = width - pad * 2
  const rows = [0, 1, 2, 3].map((index) => {
    const y = Math.round(height * 0.52) + index * Math.round(height * 0.09)
    return (
      `<rect x="${pad}" y="${y}" width="${inner}" height="${Math.round(height * 0.06)}" rx="8" fill="#F5F4ED"/>` +
      `<rect x="${pad + 12}" y="${y + Math.round(height * 0.02)}" width="${Math.round(inner * 0.42)}" height="${Math.round(height * 0.018)}" rx="4" fill="#D1CFC5"/>`
    )
  })

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"`,
    ` width="${width}" height="${height}" role="img"><title>${label}</title>`,
    `<rect width="${width}" height="${height}" fill="#FAF9F5"/>`,
    // Status row.
    `<rect x="${pad}" y="${Math.round(height * 0.035)}" width="${Math.round(inner * 0.18)}" height="${Math.round(height * 0.014)}" rx="4" fill="#D1CFC5"/>`,
    `<rect x="${width - pad - Math.round(inner * 0.22)}" y="${Math.round(height * 0.035)}" width="${Math.round(inner * 0.22)}" height="${Math.round(height * 0.014)}" rx="4" fill="#D1CFC5"/>`,
    // Screen title.
    `<rect x="${pad}" y="${Math.round(height * 0.1)}" width="${Math.round(inner * 0.62)}" height="${Math.round(height * 0.035)}" rx="6" fill="#C2C0B6"/>`,
    // Value block.
    `<rect x="${pad}" y="${Math.round(height * 0.18)}" width="${inner}" height="${Math.round(height * 0.26)}" rx="16" fill="#F5F4ED"/>`,
    `<text x="50%" y="${Math.round(height * 0.31)}" text-anchor="middle" dominant-baseline="middle"`,
    ` font-family="Inter, sans-serif" font-size="${Math.round(width / 14)}"`,
    ` fill="#87867F">${label}</text>`,
    ...rows,
    `</svg>`,
  ].join('')
}
