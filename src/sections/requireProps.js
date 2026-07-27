/**
 * Dev-only required-prop guard shared by the section library.
 *
 * A section calls this with the props it cannot render without. When one is
 * missing the section renders nothing rather than emitting an empty heading or
 * a broken control, and the omission is reported once in development.
 *
 * Empty strings and empty arrays count as missing: a section with an empty
 * title or no items has nothing to show.
 *
 * @param {string} sectionName Component name, used in the console message.
 * @param {Record<string, unknown>} required Prop name to value.
 * @returns {boolean} `true` when a required prop is missing.
 */
export default function requireProps(sectionName, required) {
  const missing = Object.entries(required)
    .filter(([, value]) => {
      if (value === undefined || value === null || value === '') return true

      return Array.isArray(value) && value.length === 0
    })
    .map(([name]) => name)

  if (missing.length === 0) return false

  // `process.env.NODE_ENV` rather than `import.meta.env.DEV`: this module ships
  // in a shared package, and the latter only exists under Vite.
  if (process.env.NODE_ENV !== 'production') {
    console.error(
      `[${sectionName}] Missing required prop${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}. Section not rendered.`,
    )
  }

  return true
}
