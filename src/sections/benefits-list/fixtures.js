const items = [
  { id: 'ready', title: 'Ready when you need it', description: 'Keep the tools you use close at hand, without starting from scratch each time.', icon: 'check' },
  { id: 'details', title: 'Your details, in one place', description: 'Review the information that matters before taking the next step.', icon: 'document' },
  { id: 'focus', title: 'Room to focus', description: 'A clear workflow lets you spend your attention on the job you came to do.' },
]

export default [
  { id: 'default', label: 'Default', props: { eyebrow: 'Everyday benefits', title: 'Less to manage. More to get done.', subtitle: 'Three practical ways to make the next task easier.', items } },
  { id: 'minimal', label: 'Minimal (required only)', props: { title: 'Ready for the next task', items: items.map(({ id, title, description }) => ({ id, title, description })) } },
  { id: 'check-icon', label: 'Check icons', props: { title: 'Practical benefits', items: items.map((item) => ({ ...item, icon: 'check' })) } },
  { id: 'document-icon', label: 'Document icons', props: { title: 'Details in order', items: items.map((item) => ({ ...item, icon: 'document' })) } },
  { id: 'long-copy', label: 'Long copy', props: { title: 'Make room for the details that matter across more than one place and more than one task', items: [{ id: 'long', title: 'An unusually long benefit title that should wrap naturally without squeezing the explanation beside it', description: 'A deliberately longer explanation checks that the row expands with its content. ReferenceABC12345678901234567890123456789012345678901234567890 must wrap without horizontal page scrolling. Nothing is shortened or hidden.' }] } },
  { id: 'missing-title', label: 'Missing title', expectsNothing: true, props: { items } },
  { id: 'blank-title', label: 'Whitespace title', expectsNothing: true, props: { title: '   ', items } },
  { id: 'duplicate-ids', label: 'Duplicate ids', expectsNothing: true, props: { title: 'Invalid', items: [items[0], items[0]] } },
  { id: 'missing-description', label: 'Incomplete item', expectsNothing: true, props: { title: 'Invalid', items: [{ id: 'missing', title: 'Missing explanation' }] } },
  { id: 'unknown-icon', label: 'Unknown icon', expectsNothing: true, props: { title: 'Invalid', items: [{ ...items[0], icon: 'unknown' }] } },
  { id: 'empty-items', label: 'Empty items', expectsNothing: true, props: { title: 'Invalid', items: [] } },
  { id: 'invalid-subtitle', label: 'Malformed optional copy', expectsNothing: true, props: { title: 'Invalid', items, subtitle: null } },
]
