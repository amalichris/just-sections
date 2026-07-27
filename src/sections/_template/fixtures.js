// import fixtureMedia from '../fixtureMedia'

/**
 * Gallery fixtures for <section-id>.
 *
 * Required before a section is implementation-complete. The gallery reads this
 * file so the section can be built and reviewed without a full page config, and
 * it doubles as executable documentation of the prop contract in `plan.md`.
 *
 * Cover at minimum:
 *
 * 1. `default`  — every optional prop supplied. What the section looks like fully dressed.
 * 2. `minimal`  — required props only. Proves omitting optional content leaves no residual spacing.
 * 3. one per documented variant.
 * 4. at least one invalid configuration with `expectsNothing: true`.
 *
 * Fixture fields:
 *
 * - `id`             stable slug, used in the gallery URL
 * - `label`          shown on the fixture chip
 * - `note`           what to look at in this fixture — the reviewer's instruction
 * - `expectsNothing` true when the section must render nothing and report it
 * - `props`          passed straight to the section
 *
 * Keep copy product-neutral. The gallery exercises the section, not a product's
 * page. Use `fixtureMedia()` for imagery — sections ship no asset files.
 */
export default [
  {
    id: 'default',
    label: 'Default',
    note: 'Describe what a reviewer should check here.',
    props: {
      // title: 'Section heading',
    },
  },
  {
    id: 'minimal',
    label: 'Minimal (required only)',
    note: 'Optional content omitted. Check for residual spacing where it would have been.',
    props: {
      // title: 'Section heading',
    },
  },
  {
    id: 'missing-required',
    label: 'Missing required prop',
    note: 'Must render nothing and report the omission in the console.',
    expectsNothing: true,
    props: {},
  },
]
