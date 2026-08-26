import fixtureMedia from '../fixtureMedia'

const item = (id, title, description, proof, mediaBackdrop) => ({
  id,
  title,
  description,
  media: fixtureMedia(title.split(' ').slice(0, 2).join(' '), { width: 800, height: 500 }),
  ...(proof ? { proof } : {}),
  ...(mediaBackdrop ? { mediaBackdrop } : {}),
})

/**
 * Gallery fixtures for `benefits-default`.
 *
 * The section takes exactly three items; `items[0]` is the anchor and spans the
 * grid. See `plan.md` for the authoritative prop contract.
 */
export default [
  {
    id: 'default',
    label: 'Default',
    note: 'Three benefits with an anchor. Check the grid at 768px (anchor over a two-card row) and 1024px (anchor spans two of three columns and both rows).',
    props: {
      eyebrow: 'What you get',
      title: 'A rental contract you can hand over today.',
      subtitle: 'One outcome per card, in the reader’s own words.',
      items: [
        item(
          'contracts',
          'A finished contract in minutes, not an evening',
          'Answer a short set of questions and get a complete rental contract, ready to print or send.',
          {
            quote: 'It took me four minutes for a contract that used to eat a whole evening.',
            attribution: 'Preview attribution',
          },
          'chianti',
        ),
        item(
          'generate',
          'Export a PDF that looks official',
          'One tap turns your answers into a formatted document with every clause in place.',
          undefined,
          'sky',
        ),
        item(
          'fields',
          'Details you enter once',
          'Property and party details carry across contracts, so the second one is faster than the first.',
          undefined,
          'cypress',
        ),
      ],
    },
  },
  {
    id: 'minimal',
    label: 'Minimal (required only)',
    note: 'No eyebrow, subtitle, or proof. Omitting them must leave no residual spacing above the grid or inside a card.',
    props: {
      title: 'A rental contract you can hand over today.',
      items: [
        item('contracts', 'A finished contract in minutes', 'Answer a short set of questions.'),
        item('generate', 'Export a PDF that looks official', 'One tap formats every clause.'),
        item('fields', 'Details you enter once', 'Details carry across contracts.'),
      ],
    },
  },
  {
    id: 'all-proof',
    label: 'Proof on every card',
    note: 'Each card carries a quote. Dividers and baselines should stay aligned across cards of differing copy length.',
    props: {
      eyebrow: 'What you get',
      title: 'A rental contract you can hand over today.',
      items: [
        item('contracts', 'A finished contract in minutes, not an evening', 'Answer a short set of questions and get a complete rental contract.', {
          quote: 'It took me four minutes for a contract that used to eat a whole evening.',
          attribution: 'Broker, Business Bay',
        }),
        item('generate', 'Export a PDF that looks official', 'One tap turns your answers into a formatted document.', {
          quote: 'The landlord accepted it without a single question.',
          attribution: 'Broker, JLT',
        }),
        item('fields', 'Details you enter once', 'Property and party details carry across contracts.', {
          quote: 'The second contract took half the time of the first.',
          attribution: 'Broker, Marina',
        }),
      ],
    },
  },
  {
    id: 'invalid-media-backdrop',
    label: 'Invalid media backdrop',
    note: 'A backdrop outside the documented enum must render nothing and report it.',
    expectsNothing: true,
    props: {
      title: 'A rental contract you can hand over today.',
      items: [
        item('contracts', 'A finished contract in minutes', 'Answer a short set of questions.', undefined, 'violet'),
        item('generate', 'Export a PDF that looks official', 'One tap formats every clause.'),
        item('fields', 'Details you enter once', 'Details carry across contracts.'),
      ],
    },
  },
  {
    id: 'wrong-item-count',
    label: 'Wrong item count',
    note: 'Two items. The section takes exactly three, so this must render nothing and report it.',
    expectsNothing: true,
    props: {
      title: 'A rental contract you can hand over today.',
      items: [
        item('contracts', 'A finished contract in minutes', 'Answer a short set of questions.'),
        item('generate', 'Export a PDF that looks official', 'One tap formats every clause.'),
      ],
    },
  },
]
