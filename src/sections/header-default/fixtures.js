import fixtureMedia from '../fixtureMedia'

/**
 * Gallery fixtures for `header-default`.
 *
 * Copy is product-neutral on purpose: the gallery exercises the section, not
 * any one product's page. See `plan.md` for the authoritative prop contract.
 */
export default [
  {
    id: 'default',
    label: 'Default',
    note: 'Wordmark, three nav items, and a CTA. Nav collapses below the tablet breakpoint.',
    props: {
      brand: { label: 'Acme', href: '#top' },
      navigation: [
        { label: 'Benefits', targetId: 'benefits' },
        { label: 'How it works', targetId: 'how-it-works' },
        { label: 'Pricing', targetId: 'pricing' },
      ],
      cta: { label: 'Get started', href: '#pricing' },
    },
  },
  {
    id: 'minimal',
    label: 'Minimal (required only)',
    note: 'No navigation. Omitting it must leave no residual spacing beside the wordmark.',
    props: {
      brand: { label: 'Acme', href: '#top' },
      cta: { label: 'Get started', href: '#pricing' },
    },
  },
  {
    id: 'long-labels',
    label: 'Long labels',
    note: 'Stress test: does the nav wrap, truncate, or push the CTA off the container?',
    props: {
      brand: { label: 'Acme Contract Studio', href: '#top' },
      navigation: [
        { label: 'What you get', targetId: 'benefits' },
        { label: 'How it works, step by step', targetId: 'how-it-works' },
        { label: 'Pricing and plans', targetId: 'pricing' },
      ],
      cta: { label: 'Start your first contract', href: '#pricing' },
    },
  },
  {
    id: 'badge-cta',
    label: 'Badge CTA',
    note: 'cta.badge replaces the pill with a page-supplied image (e.g. an App Store badge). No chrome, background, or recoloring at any header state.',
    props: {
      brand: { label: 'Acme', href: '#top' },
      navigation: [
        { label: 'Benefits', targetId: 'benefits' },
        { label: 'How it works', targetId: 'how-it-works' },
      ],
      cta: {
        label: 'Download on the App Store',
        href: '#top',
        badge: fixtureMedia('App Store badge', {
          width: 120,
          height: 40,
          alt: 'Download on the App Store',
        }),
      },
    },
  },
  {
    id: 'missing-required',
    label: 'Missing required prop',
    note: 'No `cta`. Must render nothing and report the omission in the console.',
    expectsNothing: true,
    props: {
      brand: { label: 'Acme', href: '#top' },
    },
  },
]
