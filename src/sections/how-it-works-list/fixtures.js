import fixtureMedia from '../fixtureMedia'

/**
 * Gallery fixtures for how-it-works-list.
 *
 * The photo is a 4:5 placeholder so the 1:1 crop below 1024px is visible as a
 * crop.
 */
const photo = fixtureMedia('Photo', {
  width: 960,
  height: 1200,
  alt: 'A hand holding a phone',
  variant: 'photo',
})
const badge = fixtureMedia('Store badge', { width: 120, height: 40, alt: 'Download on the store' })

const steps = [
  {
    id: 'verify',
    title: 'Verify your email',
    description: 'Enter your work email and the six-digit code we send to it.',
  },
  {
    id: 'receive',
    title: 'Get your code',
    description: 'Your personal code arrives in the same inbox a moment later.',
  },
  {
    id: 'redeem',
    title: 'Redeem it',
    description: 'Open the link on your phone. The store confirms it and the app is yours.',
  },
]

export default [
  {
    id: 'default',
    label: 'Default',
    note: 'Photo, eyebrow, subtitle and a CTA. At 1024px+: steps beside a 4:5 photo. At 768px+: labels in their own 64px column; below 768px they stack above the title. Dividers above every row and after the last.',
    props: {
      eyebrow: 'How it works',
      title: 'Three steps, two minutes',
      subtitle: 'No account, no password, nothing to install first.',
      steps,
      cta: { label: 'Get started', href: '#top' },
      media: photo,
    },
  },
  {
    id: 'edge-to-edge-stacked',
    label: 'Edge to edge (mobile + tablet)',
    note: "mediaOnMobile and mediaOnTablet: 'edge-to-edge'. Below 1024px the photo spans the full viewport width with square corners; the steps keep their gutters.",
    props: {
      title: 'Three steps, two minutes',
      steps,
      cta: { label: 'Get started', href: '#top' },
      media: photo,
      mediaOnMobile: 'edge-to-edge',
      mediaOnTablet: 'edge-to-edge',
    },
  },
  {
    id: 'hidden-on-mobile',
    label: 'Hidden on mobile',
    note: "mediaOnMobile: 'hidden'. Below 768px the section ends at the CTA with no leftover gap; tablet and desktop still show the photo.",
    props: {
      title: 'Three steps, two minutes',
      steps,
      cta: { label: 'Get started', href: '#top' },
      media: photo,
      mediaOnMobile: 'hidden',
    },
  },
  {
    id: 'minimal',
    label: 'Minimal (required only)',
    note: 'Title and three steps. Without a photo the column is 624px and centred. No residual space where the eyebrow, subtitle and CTA would have been.',
    props: {
      title: 'Three steps, two minutes',
      steps,
    },
  },
  {
    id: 'four-steps',
    label: 'Four steps',
    note: 'The maximum. Labels run 01 to 04.',
    props: {
      title: 'Four steps',
      steps: [
        ...steps,
        {
          id: 'open',
          title: 'Open the app',
          description: 'Set up your preferences once and you are done.',
        },
      ],
      media: photo,
    },
  },
  {
    id: 'badge-cta',
    label: 'Badge CTA',
    note: 'A page-supplied badge replaces the pill; it takes no pill chrome or hover recolouring.',
    props: {
      title: 'Three steps, two minutes',
      steps,
      cta: { label: 'Download on the store', href: '#top', badge },
    },
  },
  {
    id: 'too-few-steps',
    label: 'Two steps',
    note: 'Below the three-step minimum. Must render nothing.',
    expectsNothing: true,
    props: { title: 'Too few', steps: steps.slice(0, 2) },
  },
  {
    id: 'duplicate-ids',
    label: 'Duplicate step ids',
    note: 'Step ids must be unique. Must render nothing.',
    expectsNothing: true,
    props: { title: 'Duplicates', steps: [...steps.slice(0, 2), { ...steps[2], id: 'verify' }] },
  },
  {
    id: 'unknown-tablet-treatment',
    label: 'Unknown mediaOnTablet',
    note: "Only 'contained', 'edge-to-edge' and 'hidden' are valid. Must render nothing.",
    expectsNothing: true,
    props: { title: 'Invalid', steps, media: photo, mediaOnTablet: 'full-bleed' },
  },
]
