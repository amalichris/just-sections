import fixtureMedia from '../fixtureMedia'

/**
 * Gallery fixtures for `hero-default`.
 *
 * See `plan.md` for the authoritative prop contract. The hero is one viewport
 * high as a minimum and expands intrinsically, so check the bottom edge at each
 * width — the next section must follow in normal flow with no fixed clearance.
 */
export default [
  {
    id: 'default',
    label: 'Default',
    note: 'Title, subtitle, backdrop, and device media. Parallax separates backdrop and device from 768px up.',
    props: {
      title: 'A rental contract you can hand over today',
      subtitle: 'A reusable hero and header composition.',
      background: fixtureMedia('Backdrop', { width: 1440, height: 900 }),
      media: fixtureMedia('Device', {
        width: 640,
        height: 1300,
        alt: 'Placeholder for a product screen capture',
      }),
    },
  },
  {
    id: 'minimal',
    label: 'Minimal (required only)',
    note: 'Title alone. No subtitle, backdrop, or device — omitting them must leave no gaps.',
    props: {
      title: 'A rental contract you can hand over today',
    },
  },
  {
    id: 'no-media',
    label: 'Copy only, with backdrop',
    note: 'Backdrop but no device. The hero should still fill one viewport without a hole where the device sits.',
    props: {
      title: 'A rental contract you can hand over today',
      subtitle: 'A reusable hero and header composition.',
      background: fixtureMedia('Backdrop', { width: 1440, height: 900 }),
    },
  },
  {
    id: 'badge-cta',
    label: 'Badge CTA',
    note: 'cta.badge replaces the Sienna Brand Pill with a page-supplied image (e.g. an App Store badge), placed directly below the subtitle.',
    props: {
      title: 'One app for currency, time, and units',
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
      background: fixtureMedia('Backdrop', { width: 1440, height: 900 }),
      media: fixtureMedia('Device', {
        width: 640,
        height: 1300,
        alt: 'Placeholder for a product screen capture',
      }),
    },
  },
  {
    id: 'long-title',
    label: 'Long title',
    note: 'Stress test for the fluid clamp: the hero must expand rather than clip, and text must reflow at 320px.',
    props: {
      title: 'A complete rental contract, formatted and ready to hand over, in the time it takes to make coffee',
      subtitle:
        'Longer supporting copy that wraps across several lines at narrow widths and should never be truncated or overlapped by the device media below it.',
      background: fixtureMedia('Backdrop', { width: 1440, height: 900 }),
      media: fixtureMedia('Device', { width: 640, height: 1300 }),
    },
  },
  {
    id: 'missing-required',
    label: 'Missing required prop',
    note: 'No `title`. Must render nothing and report the omission in the console.',
    expectsNothing: true,
    props: {
      subtitle: 'A subtitle cannot stand in for the headline.',
    },
  },
]
