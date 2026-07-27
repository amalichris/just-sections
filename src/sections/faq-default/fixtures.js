const ITEMS = [
  {
    id: 'create',
    question: 'What does this create?',
    answer:
      'A complete rental contract as a formatted PDF, with every clause in place and ready to print, send, or sign.',
  },
  {
    id: 'account',
    question: 'Do I need another account?',
    answer:
      'No. It runs inside the chat app you already use, so there is no separate signup and no new password to remember.',
  },
  {
    id: 'documents',
    question: 'Which documents can I upload?',
    answer:
      'Passports, Emirates IDs, and title deeds. Details are read once and carried across every contract you create afterwards.',
  },
  {
    id: 'editing',
    question: 'Can I edit a contract after generating it?',
    answer:
      'Yes. Reopen the contract, change any answer, and regenerate the PDF. The original stays available until you replace it.',
  },
]

/**
 * Gallery fixtures for `faq-default`.
 *
 * Deliberately flat: no card, image, glass, radius, or elevation on either
 * surface. See `plan.md` for the authoritative prop contract.
 */
export default [
  {
    id: 'default',
    label: 'Default (parchment)',
    note: 'Check the Plus rotates 45° on open, the focus outline is 2px focusBlue, and the two-column split appears at 1024px.',
    props: {
      eyebrow: 'Questions',
      title: 'Questions answered',
      subtitle: 'The things people ask before their first contract.',
      items: ITEMS,
    },
  },
  {
    id: 'ivory',
    label: 'Ivory surface',
    note: 'The `surface` variant. Still flat — no card treatment, no elevation.',
    props: {
      eyebrow: 'Questions',
      title: 'Questions answered',
      subtitle: 'The things people ask before their first contract.',
      surface: 'ivory',
      items: ITEMS,
    },
  },
  {
    id: 'minimal',
    label: 'Minimal (required only)',
    note: 'Title and one item. No eyebrow or subtitle — the intro block must not leave residual spacing.',
    props: {
      title: 'Questions answered',
      items: [ITEMS[0]],
    },
  },
  {
    id: 'empty-items',
    label: 'Empty items array',
    note: 'An empty array counts as missing. Must render nothing and report it.',
    expectsNothing: true,
    props: {
      title: 'Questions answered',
      items: [],
    },
  },
]
