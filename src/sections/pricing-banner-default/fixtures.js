import fixtureMedia from '../fixtureMedia'

/**
 * Gallery fixtures for `pricing-banner-default`.
 *
 * A full-width `darkSurface` band with centred content at every breakpoint —
 * a content-led pause, not a second hero. See `plan.md` for the prop contract.
 */
export default [
  {
    id: 'default',
    label: 'Default',
    note: 'Eyebrow in coral, title in ivory, subtitle in warm silver, CTA as a Sienna Brand Pill. Minimum block size 440px mobile / 480px desktop.',
    props: {
      eyebrow: 'Simple from the start',
      title: 'Start with 3 PDF generations free.',
      subtitle: 'Create real contracts and see the full workflow before deciding what comes next.',
      cta: { label: 'Get started', href: '#top' },
    },
  },
  {
    id: 'minimal',
    label: 'Minimal (required only)',
    note: 'Title and CTA alone. The band must stay vertically balanced without the eyebrow and subtitle.',
    props: {
      title: 'Start with 3 PDF generations free.',
      cta: { label: 'Get started', href: '#top' },
    },
  },
  {
    id: 'long-copy',
    label: 'Long copy',
    note: 'The band expands for text reflow rather than clipping or scrolling.',
    props: {
      eyebrow: 'Simple from the start',
      title: 'Start with three PDF generations free, then decide what comes next.',
      subtitle:
        'Create real contracts and see the full workflow end to end before you pay for anything. No card, no trial timer, and nothing expires while you are still deciding.',
      cta: { label: 'Start your first contract', href: '#top' },
    },
  },
  {
    id: 'badge-cta',
    label: 'Badge CTA',
    note: 'cta.badge replaces the Sienna Brand Pill with a page-supplied image (e.g. an App Store badge). No pill chrome or hover recoloring.',
    props: {
      eyebrow: 'Available now',
      title: 'One app for currency, time, and units.',
      subtitle: 'No ads. No account. No tracking.',
      cta: {
        label: 'Download on the App Store',
        href: '#top',
        badge: fixtureMedia('App Store badge', {
          width: 135,
          height: 40,
          alt: 'Download on the App Store',
        }),
      },
    },
  },
  {
    id: 'missing-required',
    label: 'Missing required prop',
    note: 'No `cta`. An acquisition band without its action must render nothing and report it.',
    expectsNothing: true,
    props: {
      title: 'Start with 3 PDF generations free.',
    },
  },
]
