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
 * @param {{ width?: number, height?: number, alt?: string }} [options]
 *   `alt` defaults to an empty string, matching how decorative media is
 *   configured. Pass real alt text when the fixture is exercising a section's
 *   informative-image path.
 * @returns {Media}
 */
export default function fixtureMedia(label, options = {}) {
  const { width = 640, height = 400, alt = '' } = options

  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"`,
    ` width="${width}" height="${height}" role="img"><title>${label}</title>`,
    `<rect width="${width}" height="${height}" fill="#F5F4ED"/>`,
    `<rect x="12" y="12" width="${width - 24}" height="${height - 24}" rx="20"`,
    ` fill="#FAF9F5" stroke="#D1CFC5" stroke-width="2"/>`,
    `<text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"`,
    ` font-family="Inter, sans-serif" font-size="${Math.round(width / 20)}"`,
    ` fill="#87867F">${label}</text></svg>`,
  ].join('')

  return { src: `data:image/svg+xml,${encodeURIComponent(svg)}`, alt }
}
