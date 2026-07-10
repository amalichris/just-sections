import { useRef, useEffect } from 'react'
import { ArrowRight, Zap, Layers, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import gsap from 'gsap'
import ReactMarkdown from 'react-markdown'

const md = `
## Everything wired up

- **Outfit** for headings, **Inter** for body
- Lucide icons, GSAP, Motion, React Router, Markdown
`

export default function Home() {
  const gsapRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      gsapRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
  }, [])

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '4rem 1.5rem' }}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ fontSize: '2.5rem', marginBottom: '1rem' }}
      >
        Landing Trials
      </motion.h1>

      <div ref={gsapRef} style={{ opacity: 0 }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          {[Zap, Layers, Sparkles].map((Icon, i) => (
            <div
              key={i}
              style={{
                padding: '1rem',
                borderRadius: 12,
                background: '#fff',
                border: '1px solid #e5e5e5',
              }}
            >
              <Icon size={24} />
            </div>
          ))}
        </div>

        <div style={{ lineHeight: 1.7 }}>
          <ReactMarkdown>{md}</ReactMarkdown>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            marginTop: '2rem',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            background: '#1a1a1a',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          Get started <ArrowRight size={16} />
        </motion.button>
      </div>
    </div>
  )
}
