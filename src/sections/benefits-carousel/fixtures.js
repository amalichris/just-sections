import fixtureMedia from '../fixtureMedia'

/**
 * Gallery fixtures for benefits-carousel.
 *
 * - `capture()` stands in for a device screenshot contained on a colour field
 *   (fixtureMedia's `screen` variant, so no inset card reads as a second frame).
 * - `photo()` stands in for a page-supplied backdrop image filling the panel.
 *   It uses the `photo` variant, which draws no edge of its own: the default
 *   `panel` placeholder draws an inset bordered card that reads as padding
 *   and a frame the section does not render.
 */
const capture = (label) =>
  fixtureMedia(label, { width: 1080, height: 1440, alt: '', variant: 'screen' })
const photo = (label) => fixtureMedia(label, { width: 1200, height: 1200, alt: '', variant: 'photo' })

const colourItems = [
  {
    id: 'exchange-rates',
    title: 'Live currency conversion',
    description:
      'Rates refresh on their own, so the number in front of you is the number you will actually pay.',
    mediaBackdrop: 'chianti',
    media: capture('Capture 1'),
  },
  {
    id: 'time-zones',
    title: 'World clock',
    description: 'See every city you care about on one screen before you send the invite.',
    mediaBackdrop: 'sky',
    media: capture('Capture 2'),
  },
  {
    id: 'units',
    title: 'Unit conversion',
    description: 'Weight, volume, temperature and length, converted without leaving the page.',
    mediaBackdrop: 'cypress',
    media: capture('Capture 3'),
  },
  {
    id: 'offline',
    title: 'Works offline',
    description: 'The last known values stay on the device, so a dead zone does not stop you.',
    mediaBackdrop: 'sunflower',
    media: capture('Capture 4'),
  },
  {
    id: 'history',
    title: 'Conversion history',
    description: 'Every conversion is kept, so you can go back to one instead of redoing it.',
    mediaBackdrop: 'charcoal',
    media: capture('Capture 5'),
  },
]

const photoItems = [
  {
    id: 'travel',
    title: 'Travel ready',
    description: 'A backdrop photograph on its own, with nothing laid over it.',
    mediaBackdropImage: photo('Backdrop photo'),
  },
  {
    id: 'on-the-go',
    title: 'Answers on the go',
    description: 'A backdrop photograph with a device capture contained on top of it.',
    mediaBackdropImage: photo('Backdrop photo'),
    media: capture('Capture over photo'),
  },
]

const twelveItems = [
  ...colourItems,
  ...photoItems,
  { ...colourItems[0], id: 'favourites', title: 'Favourites' },
  { ...colourItems[1], id: 'widgets', title: 'Home screen widgets' },
  { ...colourItems[2], id: 'calculator', title: 'Built-in calculator' },
  { ...colourItems[3], id: 'search', title: 'Search by alias' },
  {
    ...colourItems[4],
    id: 'long-copy',
    title: 'A deliberately long feature title that has to wrap across lines',
    description:
      'A deliberately long description, to check the text panel stays bottom-aligned and the stage grows to the tallest card instead of clipping it. The card height must not change when you switch to this item and back.',
  },
]

export default [
  {
    id: 'default',
    label: 'Default',
    note: 'Twelve items, every optional prop, all five colour fields and both photo modes. At 768px+: the tab row scrolls sideways, arrows are disabled at the ends, the counter tracks the tab, the card never changes height. Use Tab to reach the selected tab, then Left/Right/Home/End. Below 768px: an accordion with the first item open.',
    props: {
      eyebrow: 'Features',
      title: 'Everything in one place',
      subtitle: 'Pick a feature to see it. Each one answers a question you already have.',
      items: twelveItems,
    },
  },
  {
    id: 'minimal',
    label: 'Minimal (required only)',
    note: 'Title and three items only. No residual space where the eyebrow and subtitle would have been.',
    props: {
      title: 'Everything in one place',
      items: colourItems.slice(0, 3),
    },
  },
  {
    id: 'media-backdrops',
    label: 'Colour backdrops',
    note: 'One item per mediaBackdrop token: chianti, sky, cypress, sunflower, charcoal. Each capture is contained, centred, 44px from the top and seated on the bottom edge.',
    props: {
      title: 'Colour backdrops',
      items: colourItems,
    },
  },
  {
    id: 'top-aligned-media',
    label: 'Top-aligned media',
    note: "The second item sets mediaVerticalAlignment: 'top': its capture sits on the panel's top edge with the 44px backdrop space below it, at every width (card, accordion stage and rail frame). The other items stay on the bottom edge.",
    props: {
      title: 'Top-aligned media',
      layoutOnMobile: 'rail',
      items: [
        colourItems[0],
        { ...colourItems[1], mediaVerticalAlignment: 'top' },
        { ...colourItems[2], mediaVerticalAlignment: 'bottom' },
      ],
    },
  },
  {
    id: 'photo-backdrops',
    label: 'Photo backdrops',
    note: 'mediaBackdropImage alone fills the panel; with media, the capture sits over the photo.',
    props: {
      title: 'Photo backdrops',
      items: [...photoItems, { ...photoItems[0], id: 'travel-2', title: 'Another photo' }],
    },
  },
  {
    id: 'mobile-rail',
    label: 'Mobile rail',
    note: "layoutOnMobile: 'rail'. Below 768px: a horizontal scroll rail instead of the accordion. Cards clamp(240px, 68vw, 300px) with a 16px gap and a peek of the next card, 3:4 frames, title and description underneath, snapping to the left gutter. The first card lines up with the heading; the last card keeps the same gutter on the right. From 768px it is the tabs and card, unchanged.",
    props: {
      eyebrow: 'Features',
      title: 'Everything in one place',
      subtitle: 'Swipe through the features on a phone.',
      items: twelveItems,
      layoutOnMobile: 'rail',
    },
  },
  {
    id: 'missing-title',
    label: 'Missing title',
    note: 'Must render nothing and report the missing title.',
    expectsNothing: true,
    props: { items: colourItems.slice(0, 3) },
  },
  {
    id: 'too-few-items',
    label: 'Two items',
    note: 'Below the three-item minimum. Must render nothing.',
    expectsNothing: true,
    props: { title: 'Too few', items: colourItems.slice(0, 2) },
  },
  {
    id: 'too-many-items',
    label: 'Thirteen items',
    note: 'Above the twelve-item maximum. Must render nothing.',
    expectsNothing: true,
    props: {
      title: 'Too many',
      items: [...twelveItems, { ...colourItems[0], id: 'thirteenth', title: 'Thirteenth' }],
    },
  },
  {
    id: 'colour-without-media',
    label: 'Colour field without media',
    note: 'A colour backdrop with nothing on it is an empty rectangle. Must render nothing.',
    expectsNothing: true,
    props: {
      title: 'Empty field',
      items: [
        ...colourItems.slice(0, 2),
        { id: 'empty', title: 'Empty', description: 'No media.', mediaBackdrop: 'sky' },
      ],
    },
  },
  {
    id: 'both-backdrops',
    label: 'Both backdrop fields',
    note: 'Exactly one backdrop per item. Must render nothing.',
    expectsNothing: true,
    props: {
      title: 'Both',
      items: [...colourItems.slice(0, 2), { ...photoItems[1], mediaBackdrop: 'chianti' }],
    },
  },
  {
    id: 'unknown-media-alignment',
    label: 'Unknown mediaVerticalAlignment',
    note: "Only 'bottom' and 'top' are valid. Must render nothing.",
    expectsNothing: true,
    props: {
      title: 'Invalid alignment',
      items: [...colourItems.slice(0, 2), { ...colourItems[2], mediaVerticalAlignment: 'middle' }],
    },
  },
  {
    id: 'unknown-mobile-layout',
    label: 'Unknown layoutOnMobile',
    note: "Only 'accordion' and 'rail' are valid. Must render nothing.",
    expectsNothing: true,
    props: { title: 'Invalid', items: colourItems.slice(0, 3), layoutOnMobile: 'grid' },
  },
]
