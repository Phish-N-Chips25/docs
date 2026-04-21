import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Wrapper de secção pensado para o modo "deck": ocupa o viewport,
 * permite scroll interno se o conteúdo transbordar e anima
 * cabeçalho + conteúdo com cascata estilo Keynote.
 * Mostra um indicador de scroll animado quando há mais conteúdo abaixo.
 */
export default function Section({ id, eyebrow, title, lead, children, className = '' }) {
  const titleLines = title ? title.split('\n') : []
  const sectionRef = useRef(null)
  const [canScroll, setCanScroll] = useState(false)
  const [atBottom, setAtBottom] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const update = () => {
      const overflow = el.scrollHeight > el.clientHeight + 24
      const bottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 64
      setCanScroll(overflow)
      setAtBottom(bottom)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', update)
      ro.disconnect()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id={id}
      data-slide-scroll="true"
      className={`relative h-screen w-screen overflow-y-auto overflow-x-hidden ${className}`}
    >
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
        }}
        className="relative mx-auto min-h-screen max-w-[1400px] w-full flex flex-col justify-center px-6 lg:px-16 pt-24 md:pt-28 pb-20"
      >
        {eyebrow && (
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-px bg-phosphor" />
              <span className="eyebrow">{eyebrow}</span>
            </div>
          </Reveal>
        )}
        {title && (
          <h2 className="display-lg text-4xl md:text-6xl lg:text-7xl text-paper-100 max-w-5xl text-balance mb-8">
            {titleLines.map((line, i) => (
              <Reveal as="span" key={i} className="block">
                {line}
              </Reveal>
            ))}
          </h2>
        )}
        {lead && (
          <Reveal>
            <p className="font-sans text-lg md:text-xl text-paper-300 max-w-3xl leading-relaxed mb-12 text-pretty">
              {lead}
            </p>
          </Reveal>
        )}
        <Reveal>{children}</Reveal>
      </motion.div>

      {/* Scroll indicator — only when more content is below */}
      <AnimatePresence>
        {canScroll && !atBottom && (
          <motion.div
            key="scroll-hint"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed bottom-14 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-1.5"
          >
            <span
              className="font-mono uppercase"
              style={{ fontSize: '0.50rem', letterSpacing: '0.45em', color: 'rgba(31,29,26,0.38)' }}
            >
              scroll
            </span>
            <motion.svg
              width="14" height="9" viewBox="0 0 14 9"
              className="text-phosphor"
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export function Reveal({ children, className = '', as = 'div' }) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      variants={{
        hidden: { opacity: 0, y: 26, rotateX: 8, filter: 'blur(8px)' },
        show: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.9, ease: EASE },
        },
      }}
      style={{ transformPerspective: 900 }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
