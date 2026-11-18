import fixtureMedia from '../fixtureMedia'

/**
 * Gallery fixtures for `not-found-default`. See `plan.md` for the contract.
 */
export default [
  {
    id: 'default',
    label: 'Default',
    note: 'Banner, title, description and links. The title must sit in the fade; links wrap on mobile.',
    props: {
      title: 'No one lives at this address.',
      description: 'There is no page here. It may have moved, or the link has a typo.',
      banner: fixtureMedia('Painting', { width: 1536, height: 1024, alt: '' }),
      links: [
        { id: 'home', label: 'Home', href: '#' },
        { id: 'tool', label: 'A tool', href: '#' },
        { id: 'privacy', label: 'Privacy', href: '#' },
      ],
    },
  },
  {
    id: 'minimal',
    label: 'Minimal (required only)',
    note: 'Title only, no banner. The title clears the fixed header; nothing below it leaves a gap.',
    props: { title: 'Page not found' },
  },
  {
    id: 'missing-required',
    label: 'Missing title',
    note: 'Must render nothing and report the omission in the console.',
    expectsNothing: true,
    props: { description: 'No title supplied.' },
  },
]
