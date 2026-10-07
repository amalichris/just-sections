const items = [
  { id: 'tools', value: '7', label: 'Everyday tools', description: 'One focused place to work.' },
  { id: 'currencies', value: '120', label: 'Currencies', description: 'Reference rates for everyday prices.' },
  { id: 'cities', value: '588', label: 'Cities', description: 'Keep the places that matter side by side.' },
]
const minimal = items.map(({ id, value, label }) => ({ id, value, label }))

export default [
  { id: 'default', label: 'Default', props: { eyebrow: 'At a glance', title: 'The essentials, together.', subtitle: 'A few facts to help you decide.', items } },
  { id: 'minimal', label: 'Minimal (required only)', props: { title: 'The essentials', items: minimal } },
  { id: 'one-value', label: 'One value', props: { title: 'Included', items: minimal.slice(0, 1) } },
  { id: 'two-values', label: 'Two values', props: { title: 'At a glance', items: minimal.slice(0, 2) } },
  { id: 'four-values', label: 'Four values', props: { title: 'At a glance', items: [...items, { id: 'privacy', value: 'No ads', label: 'No advertising profile', description: 'Your work stays the focus.' }] } },
  { id: 'long-copy', label: 'Long values and labels', props: { title: 'An offer summary with enough room for the qualifications that matter', items: [{ id: 'long', value: 'ReferenceABC123456789012345678901234567890', label: 'A longer label that must wrap naturally', description: 'This qualification is deliberately long enough to check that facts grow with their copy rather than hiding the detail that makes the offer accurate.' }, ...items.slice(0, 2)] } },
  { id: 'missing-items', label: 'Missing items', expectsNothing: true, props: { title: 'Invalid' } },
  { id: 'blank-value', label: 'Whitespace value', expectsNothing: true, props: { title: 'Invalid', items: [{ ...items[0], value: '  ' }] } },
  { id: 'duplicate-ids', label: 'Duplicate ids', expectsNothing: true, props: { title: 'Invalid', items: [items[0], items[0]] } },
  { id: 'too-many', label: 'Five values', expectsNothing: true, props: { title: 'Invalid', items: [...items, { id: 'four', value: '4', label: 'Four' }, { id: 'five', value: '5', label: 'Five' }] } },
  { id: 'invalid-description', label: 'Malformed qualification', expectsNothing: true, props: { title: 'Invalid', items: [{ ...items[0], description: null }] } },
  { id: 'invalid-items', label: 'Wrong items type', expectsNothing: true, props: { title: 'Invalid', items: 'facts' } },
]
