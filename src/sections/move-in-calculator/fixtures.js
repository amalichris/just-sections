/**
 * Gallery fixtures for `move-in-calculator`.
 *
 * See `plan.md` for the authoritative prop contract. Figures are sample
 * assumptions for review, not a product's verified market data — the consuming
 * page config supplies its own.
 */
const assumptions = {
  currency: 'AED',
  rentPresets: [60000, 85000, 100000, 150000, 250000],
  defaultRent: 100000,
  chequeOptions: [1, 2, 4, 6, 12],
  defaultCheques: 2,
  depositPercent: { unfurnished: 5, furnished: 10 },
  agentFeePercent: 5,
  vatPercent: 5,
  utilityDeposit: { label: 'Utility deposit', apartment: 2000, villa: 4000 },
  connectionFee: { label: 'Utility connection', amount: 130, note: 'Approximate' },
  registrationFee: { label: 'Contract registration', amount: 220, note: 'Estimate' },
  housingFee: { label: 'Housing fee', percent: 5, note: '5% of annual rent, split over 12 bills' },
  utilityEstimates: {
    label: 'Electricity and water',
    apartment: [350, 550, 800, 1100, 1400],
    villa: [900, 900, 1300, 1800, 2500],
  },
}

export default [
  {
    id: 'default',
    label: 'Default',
    note: 'Fully dressed. Check the sticky result at 1024+, the total bar under 1024 once the result scrolls away, the year detail panel beside the chart at 1024+ and below it under 1024, and the plan hover card on a pointer.',
    props: {
      title: 'What it costs to move in',
      subtitle: 'Rent, deposits and fees due before you get the keys, and the bills that follow every month.',
      assumptions,
      aside: {
        title: 'Renting through a broker?',
        body: 'Brokers can prepare the tenancy contract from their phone.',
        cta: { label: 'Learn more', href: '#' },
      },
      disclaimer: ['Estimate based on common rental practice. Not a quotation.'],
      shareUrl: 'https://example.com/move-in-costs',
    },
  },
  {
    id: 'minimal',
    label: 'Minimal (required only)',
    note: 'No subtitle, closing card, fine print or Copy link. The title must sit directly above the tool and the page must end after the comparison card with no residual gap.',
    props: {
      title: 'What it costs to move in',
      assumptions,
    },
  },
  {
    id: 'missing-required',
    label: 'Missing assumptions',
    note: 'Must render nothing and report the omission in the console.',
    expectsNothing: true,
    props: { title: 'What it costs to move in' },
  },
]
