import sectionRegistry from '../sections/registry'

/**
 * Discovers section fixtures for the gallery.
 *
 * `import.meta.glob` is Vite-only, which is fine: everything under `src/dev/`
 * is the local development harness and is excluded from the published package.
 * The library itself must stay bundler-agnostic — see `requireProps.js`.
 *
 * Auto-discovery rather than a hand-maintained list: a registry that had to be
 * edited twice per section is a registry that goes stale. `registry.js` remains
 * the source of truth for which sections exist; this only finds their fixtures.
 */
const fixtureModules = import.meta.glob('../sections/*/fixtures.js', { eager: true })

const fixturesBySection = Object.fromEntries(
  Object.entries(fixtureModules).map(([path, module]) => [
    path.replace('../sections/', '').replace('/fixtures.js', ''),
    module.default ?? [],
  ]),
)

/**
 * Every registered section, in registry order, with its fixtures attached.
 *
 * A section registered without a `fixtures.js` still appears, carrying an empty
 * array — the gallery surfaces that as a gap to fill rather than hiding it.
 */
export const sections = Object.keys(sectionRegistry).map((id) => ({
  id,
  fixtures: fixturesBySection[id] ?? [],
}))

export function getSection(sectionId) {
  return sections.find((section) => section.id === sectionId) ?? null
}

export function getFixture(sectionId, fixtureId) {
  const section = getSection(sectionId)

  if (!section) return null

  return section.fixtures.find((fixture) => fixture.id === fixtureId) ?? section.fixtures[0] ?? null
}

/**
 * Widths worth checking, from `just-design-system/surfaces/web.md`.
 *
 * 375 and 430 are the two mobile ramp stops, 768 is the tablet breakpoint, 1024
 * is where sections switch to multi-column and sticky composition, and 1440 is
 * the top of the documented type ramp.
 */
export const VIEWPORTS = [
  { width: 375, label: '375', note: 'Mobile' },
  { width: 430, label: '430', note: 'Mobile large' },
  { width: 768, label: '768', note: 'Tablet' },
  { width: 1024, label: '1024', note: 'Desktop' },
  { width: 1440, label: '1440', note: 'Desktop large' },
]
