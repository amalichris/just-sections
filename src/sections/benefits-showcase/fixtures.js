import fixtureMedia from '../fixtureMedia'

/**
 * Gallery fixtures for benefits-showcase.
 *
 * Two placeholder shapes, because the section has two media modes and they must
 * be reviewable apart:
 *
 * - `capture()` stands in for a device screenshot laid on a colour field. It
 *   uses fixtureMedia's `screen` variant: the default `panel` placeholder draws
 *   an inset ivory card with a border, which inside a colour field reads as a
 *   second frame the section does not render and misleads review of the very
 *   treatment being reviewed.
 * - `composition()` stands in for a finished 3:4 frame exported whole, the path
 *   where `mediaBackdropImage` carries the card on its own.
 */
const capture = (label) =>
  fixtureMedia(label, { width: 420, height: 700, alt: '', variant: 'screen' })
const composition = (label) => fixtureMedia(label, { width: 1200, height: 1600, alt: '' })

const colourItems = [
  {
    id: 'exchange-rates',
    mediaHeadline: 'Guessing the exchange rate',
    title: 'Live currency conversion',
    description:
      'Rates refresh on their own, so the number in front of you is the number you will actually pay.',
    mediaBackdrop: 'chianti',
    media: capture('Capture 1'),
  },
  {
    id: 'time-zones',
    mediaHeadline: 'Booking across time zones',
    title: 'World clock',
    description: 'See every city you care about on one screen before you send the invite.',
    mediaBackdrop: 'sky',
    media: capture('Capture 2'),
  },
  {
    id: 'units',
    mediaHeadline: 'Recipes in the wrong units',
    title: 'Unit conversion',
    description: 'Weight, volume, temperature and length, converted without leaving the page.',
    mediaBackdrop: 'cypress',
    media: capture('Capture 3'),
  },
  {
    id: 'offline',
    mediaHeadline: 'No signal when you need it',
    title: 'Works offline',
    description: 'The last known rates stay on the device, so a dead zone does not stop you.',
    mediaBackdrop: 'sunflower',
    media: capture('Capture 4'),
  },
  {
    id: 'history',
    mediaHeadline: 'Losing the number you just worked out',
    title: 'Conversion history',
    description: 'Every conversion is kept, so you can go back to one instead of redoing it.',
    mediaBackdrop: 'charcoal',
    media: capture('Capture 5'),
  },
]

const photographicItem = {
  id: 'travel',
  mediaHeadline: 'Arriving somewhere unfamiliar',
  title: 'Travel ready',
  description:
    'A finished 3:4 frame supplied whole, with no separate capture laid over it.',
  mediaBackdropImage: composition('Composed frame'),
}

export default [
  {
    id: 'default',
    label: 'Default',
    note: 'Six cards, every optional prop supplied, all five colour fields plus one photographic field. Below 1024px scroll the rail sideways and check the peek. At 1024px and above scroll the page: the section should pin, advance one pixel left per pixel down, hold on the last card, then release. Scrolling back up should reverse it exactly.',
    props: {
      eyebrow: 'Coverage',
      title: 'What does it actually handle?',
      subtitle:
        'Preview copy. Each card names a problem in the reader’s words, then the feature that answers it.',
      items: [...colourItems, photographicItem],
    },
  },
  {
    id: 'minimal',
    label: 'Minimal (required only, no pin)',
    note: 'No eyebrow, no subtitle — check for residual spacing where they would have been. Three cards also exercise the no-pin path: at 1024px and above this rail already fits, so the section must render as a static row with no progress bar and no tall scroll track. Nothing should scroll past nothing.',
    props: {
      title: 'What does it actually handle?',
      items: colourItems.slice(0, 3),
    },
  },
  {
    id: 'media-backdrops',
    label: 'Colour fields (all five)',
    note: 'One card per documented mediaBackdrop member, in order: chianti, sky, cypress, sunflower, charcoal. Check the media headline is ivory on all of them except sunflower, which must be nearBlack. Check each capture keeps 24px of colour field down both sides, sits flush on the frame’s bottom edge, and is rounded on its top corners only — not floating inset on all four sides.',
    props: {
      title: 'Colour field variants',
      items: colourItems,
    },
  },
  {
    id: 'photographic-fields',
    label: 'Photographic fields',
    note: 'Three composed frames: the first carries a capture over the artwork, the other two are the artwork alone. Every one must show the headline scrim — a top-anchored fade that guarantees the ivory headline a ground regardless of what the artwork looks like. Compare against the colour-field fixture, which must not show a scrim.',
    props: {
      title: 'Composed frame variants',
      items: [
        { ...photographicItem, id: 'with-capture', media: capture('Capture over art') },
        { ...photographicItem, id: 'art-only' },
        {
          ...photographicItem,
          id: 'art-only-2',
          mediaHeadline: 'A longer problem statement that wraps onto a second line',
          title: 'Wrapped headline',
        },
      ],
    },
  },
  {
    id: 'max-items',
    label: 'Maximum items (eight)',
    note: 'The longest rail the contract allows. At 1024px and above this is the deepest pin the section can produce — confirm the scroll length still feels proportionate and that the progress bar reaches full width exactly as the last card settles.',
    props: {
      eyebrow: 'Coverage',
      title: 'What does it actually handle?',
      items: [
        ...colourItems,
        photographicItem,
        { ...colourItems[0], id: 'seventh', title: 'Seventh card' },
        { ...colourItems[1], id: 'eighth', title: 'Eighth card' },
      ],
    },
  },
  {
    id: 'missing-title',
    label: 'Invalid — no title',
    note: 'Must render nothing and report the omission in the console.',
    expectsNothing: true,
    props: {
      items: colourItems.slice(0, 3),
    },
  },
  {
    id: 'too-few-items',
    label: 'Invalid — two items',
    note: 'Below three there is no breadth to argue and benefits-default is the right section. Must render nothing.',
    expectsNothing: true,
    props: {
      title: 'What does it actually handle?',
      items: colourItems.slice(0, 2),
    },
  },
  {
    id: 'both-media-fields',
    label: 'Invalid — both media fields',
    note: 'An item may declare a colour field or a composed frame, never both. Must render nothing.',
    expectsNothing: true,
    props: {
      title: 'What does it actually handle?',
      items: [
        ...colourItems.slice(0, 2),
        { ...colourItems[2], mediaBackdropImage: composition('Composed frame') },
      ],
    },
  },
  {
    id: 'no-media-field',
    label: 'Invalid — no media field',
    note: 'An item with neither mediaBackdrop nor mediaBackdropImage has no frame to render. Must render nothing.',
    expectsNothing: true,
    props: {
      title: 'What does it actually handle?',
      items: [
        ...colourItems.slice(0, 2),
        {
          id: 'fieldless',
          mediaHeadline: 'No field declared',
          title: 'Fieldless',
          description: 'Neither media field supplied.',
          media: capture('Capture'),
        },
      ],
    },
  },
  {
    id: 'colour-field-without-media',
    label: 'Invalid — colour field, no capture',
    note: 'A colour field with nothing on it is an empty coloured rectangle, so media is required alongside mediaBackdrop. Must render nothing.',
    expectsNothing: true,
    props: {
      title: 'What does it actually handle?',
      items: [
        ...colourItems.slice(0, 2),
        {
          id: 'empty-field',
          mediaHeadline: 'Colour field with no capture',
          title: 'Empty field',
          description: 'mediaBackdrop supplied without media.',
          mediaBackdrop: 'chianti',
        },
      ],
    },
  },
]
