/**
 * Shared prop shapes for the section library.
 *
 * Types only — this module has no runtime export. Sections import it via
 * `@import` in their JSDoc so every section describes the same content shapes.
 *
 * Conventions every section follows:
 * - Required props are the ones without which the section is meaningless. A
 *   section renders nothing when one is missing.
 * - Optional props default to `undefined` and are rendered with `value ? x : null`
 *   so an empty string cannot emit a stray node. Absence is the only signal —
 *   sections never take a `showEyebrow`-style boolean.
 * - Repeatable content is an array of objects carrying a stable `id`, used as
 *   the React key and for any derived DOM ids.
 */

/**
 * A link styled as one of the design system's button variants.
 * @typedef {{ label: string, href: string }} Cta
 */

/**
 * An image supplied by the page rather than the section. `alt` is required:
 * pass descriptive text for informative imagery and `''` for decorative
 * imagery so it is hidden from assistive technology.
 * @typedef {{ src: string, alt: string }} Media
 */

/**
 * A product wordmark and the target it links to.
 * @typedef {{ label: string, href: string }} Brand
 */

/**
 * A same-page navigation entry. `targetId` names the `id` of a section
 * declared in the page config.
 * @typedef {{ label: string, targetId: string }} NavigationItem
 */

export {}
