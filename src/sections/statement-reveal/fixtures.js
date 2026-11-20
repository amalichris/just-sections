export default [
  {
    id: 'default',
    label: 'Statement with emphasis',
    props: {
      phrases: [
        { id: 'opening', text: 'Work brings people together.' },
        { id: 'emphasis', text: 'Give them one place to collaborate', accent: true },
        { id: 'finish', text: 'from the first draft to the handover.' },
      ],
    },
  },
  { id: 'minimal', label: 'Single phrase', props: { phrases: [{ id: 'one', text: 'Start here.' }] } },
  { id: 'empty', label: 'Missing phrases', expectsNothing: true, props: { phrases: [] } },
]
