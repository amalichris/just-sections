/**
 * Gallery fixtures for `footer-default`.
 *
 * Legal navigation only — copyright plus Privacy and Terms. A CTA, newsletter,
 * social links, or product navigation needs its own documented pattern. See
 * `plan.md` for the authoritative prop contract.
 */
export default [
  {
    id: 'default',
    label: 'Default (parchment)',
    note: 'Copyright left, legal links right from tablet up; stacked on mobile. The year is derived at render time.',
    props: {
      productName: 'Acme',
      privacyHref: '/privacy',
      termsHref: '/terms',
    },
  },
  {
    id: 'ivory',
    label: 'Ivory surface',
    note: 'The `surface` variant. Both surfaces stay flat with a single borderCream divider.',
    props: {
      productName: 'Acme',
      privacyHref: '/privacy',
      termsHref: '/terms',
      surface: 'ivory',
    },
  },
  {
    id: 'minimal',
    label: 'Minimal (required only)',
    note: 'With neither href supplied, the legal navigation is not rendered at all — the copyright must not be left hanging beside an empty slot.',
    props: {
      productName: 'Acme',
    },
  },
  {
    id: 'privacy-only',
    label: 'One legal link',
    note: 'Only `privacyHref`. The row must not reserve space for the missing Terms link.',
    props: {
      productName: 'Acme',
      privacyHref: '/privacy',
    },
  },
  {
    id: 'missing-required',
    label: 'Missing required prop',
    note: 'No `productName`. Must render nothing and report the omission.',
    expectsNothing: true,
    props: {
      privacyHref: '/privacy',
      termsHref: '/terms',
    },
  },
]
