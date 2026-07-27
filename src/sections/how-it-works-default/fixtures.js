import fixtureMedia from '../fixtureMedia'

const step = (id, title, description) => ({
  id,
  title,
  description,
  media: fixtureMedia(title.split(' ').slice(0, 2).join(' '), { width: 640, height: 1000 }),
})

const THREE = [
  step('open', 'Open it inside Telegram', 'No new app, no separate account. It runs in the chat app you already have open.'),
  step('fill', 'Fill in the details once', 'Property, parties, dates, and rent — short questions in plain language.'),
  step('pdf', 'Generate the PDF', 'Your contract is formatted and ready to send, print, or sign.'),
]

/**
 * Gallery fixtures for `how-it-works-default`.
 *
 * Desktop-sticky and mobile-accordion are two responsive expressions of one
 * section, not a variant — check both by switching viewport, not by switching
 * fixture. See `plan.md` for the authoritative prop contract.
 */
export default [
  {
    id: 'default',
    label: 'Default (3 steps)',
    note: 'At 1024px+ the composition pins and viewport-centred markers drive the active step. Below that it becomes a single-open accordion with step one open.',
    props: {
      eyebrow: 'How it works',
      title: 'Three steps, start to signature.',
      subtitle: 'Each step names what the visitor does and what they get back.',
      steps: THREE,
      cta: { label: 'Get started', href: '#pricing' },
    },
  },
  {
    id: 'four-steps',
    label: 'Four steps',
    note: 'The documented upper bound. The scroll track length derives from `--how-it-works-step-scroll`, so the last step must still hold before the pin releases.',
    props: {
      eyebrow: 'How it works',
      title: 'Four steps, start to signature.',
      steps: [
        ...THREE,
        step('send', 'Send it for signature', 'Share the finished document straight from the chat you are already in.'),
      ],
      cta: { label: 'Get started', href: '#pricing' },
    },
  },
  {
    id: 'minimal',
    label: 'Minimal (required only)',
    note: 'No eyebrow, subtitle, or CTA. Omitting the CTA must leave no residual space below the final step.',
    props: {
      title: 'Three steps, start to signature.',
      steps: THREE,
    },
  },
  {
    id: 'wrong-step-count',
    label: 'Wrong step count',
    note: 'Two steps. The section takes three or four, so this must render nothing and report it.',
    expectsNothing: true,
    props: {
      title: 'Three steps, start to signature.',
      steps: THREE.slice(0, 2),
    },
  },
]
