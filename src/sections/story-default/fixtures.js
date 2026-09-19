import fixtureMedia from '../fixtureMedia'

/**
 * Gallery fixtures for story-default.
 *
 * Both images use fixtureMedia's `photo` variant, a full-bleed tonal field with
 * no edge of its own: the section sets photos plainly on the page, and a
 * placeholder that drew its own border would look like a frame it does not
 * render. The photo is 4:5 so the 1:1 crop below 1024px is visible as a crop.
 * The avatar is square; the section masks it to a circle.
 */
const photo = fixtureMedia('Photo', {
  width: 960,
  height: 1200,
  alt: 'A person at a window seat',
  variant: 'photo',
})
const avatar = fixtureMedia('A', { width: 96, height: 96, alt: '', variant: 'photo' })

const body = [
  'I moved to a new city a few years ago, and it slowly became home. The small tools I leaned on in those first months are the ones I still use every day.',
  'This product started as one of those tools. It does one job, it does it offline, and it never asks who you are.',
  'So this is a thank-you, written by the person who built it rather than by a marketing team.',
].join('\n\n')

export default [
  {
    id: 'default',
    label: 'Default',
    note: 'Photo, eyebrow and a full signature with avatar. Both images sit plainly on the page: no ring, border or padding. The photo has 24px rounded corners (the default). At 1024px+: text and a 4:5 photo side by side, vertically centred. Below: text first, then a 1:1 photo inside the page gutters, never full-bleed.',
    props: {
      eyebrow: 'Why we are doing this',
      title: 'A small thank-you',
      body,
      signature: { name: 'Alex Morgan', role: 'Founder', avatar },
      media: photo,
    },
  },
  {
    id: 'square-corners',
    label: 'Square corners',
    note: "mediaCorners: 'square'. The same photo with no corner radius.",
    props: {
      title: 'A small thank-you',
      body,
      signature: { name: 'Alex Morgan', role: 'Founder', avatar },
      media: photo,
      mediaCorners: 'square',
    },
  },
  {
    id: 'edge-to-edge-stacked',
    label: 'Edge to edge (mobile + tablet)',
    note: "mediaOnMobile and mediaOnTablet: 'edge-to-edge'. Below 1024px the photo spans the full viewport width with square corners and no side gutter; the text keeps its gutters. At 1024px+ nothing changes.",
    props: {
      title: 'A small thank-you',
      body,
      signature: { name: 'Alex Morgan', role: 'Founder', avatar },
      media: photo,
      mediaOnMobile: 'edge-to-edge',
      mediaOnTablet: 'edge-to-edge',
    },
  },
  {
    id: 'hidden-on-mobile',
    label: 'Hidden on mobile, edge to edge on tablet',
    note: "mediaOnMobile: 'hidden', mediaOnTablet: 'edge-to-edge'. Below 768px there is no photo and no leftover gap under the signature; 768 to 1023px it runs edge to edge.",
    props: {
      title: 'A small thank-you',
      body,
      signature: { name: 'Alex Morgan', role: 'Founder', avatar },
      media: photo,
      mediaOnMobile: 'hidden',
      mediaOnTablet: 'edge-to-edge',
    },
  },
  {
    id: 'letter',
    label: 'Letter (no photo)',
    note: 'No photo: a single 624px column centred in the container, text left-aligned. The signature has no avatar, so the name sits at the left edge.',
    props: {
      eyebrow: 'Why we are doing this',
      title: 'A small thank-you',
      body,
      signature: { name: 'Alex Morgan', role: 'Founder' },
    },
  },
  {
    id: 'minimal',
    label: 'Minimal (required only)',
    note: 'Title and a single paragraph. No residual space above the title or below the body.',
    props: {
      title: 'A small thank-you',
      body: 'This product started as a tool its maker needed. Now it is yours too.',
    },
  },
  {
    id: 'missing-body',
    label: 'Missing body',
    note: 'Must render nothing and report the missing body.',
    expectsNothing: true,
    props: { title: 'A small thank-you', body: '\n\n' },
  },
  {
    id: 'signature-without-name',
    label: 'Signature without name',
    note: 'A signature must carry a name. Must render nothing.',
    expectsNothing: true,
    props: { title: 'A small thank-you', body, signature: { role: 'Founder' } },
  },
  {
    id: 'unknown-corners',
    label: 'Unknown mediaCorners',
    note: "Only 'rounded' and 'square' are valid. Must render nothing.",
    expectsNothing: true,
    props: { title: 'A small thank-you', body, media: photo, mediaCorners: 'circle' },
  },
  {
    id: 'unknown-mobile-treatment',
    label: 'Unknown mediaOnMobile',
    note: "Only 'contained', 'edge-to-edge' and 'hidden' are valid. Must render nothing.",
    expectsNothing: true,
    props: { title: 'A small thank-you', body, media: photo, mediaOnMobile: 'full-bleed' },
  },
]
