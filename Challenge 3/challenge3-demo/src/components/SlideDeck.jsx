import { AnimatePresence, motion } from 'framer-motion'
import { useSlideDeck } from '../context/useSlideDeck'
import SlideHints from './SlideHints'
import SlideIndicator from './SlideIndicator'

// Curva "Apple-style": expo out — entrada decisiva mas suave
const EASE = [0.22, 1, 0.36, 1]

const variants = {
  enter: (dir) => ({
    opacity: 0,
    y: dir > 0 ? 80 : -80,
    scale: 0.97,
    rotateX: dir > 0 ? 4 : -4,
    filter: 'blur(18px)',
  }),
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.0,
      ease: EASE,
      opacity: { duration: 0.7, ease: EASE },
      filter: { duration: 0.85, ease: EASE },
    },
  },
  exit: (dir) => ({
    opacity: 0,
    y: dir > 0 ? -50 : 50,
    scale: 1.03,
    rotateX: dir > 0 ? -2 : 2,
    filter: 'blur(20px)',
    transition: { duration: 0.6, ease: EASE },
  }),
}

function DeckStage() {
  const { slide, direction, index } = useSlideDeck()
  const Component = slide.component
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div
          key={slide.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{ transformPerspective: 1200 }}
          className="absolute inset-0 will-change-transform"
        >
          <Component />
        </motion.div>
      </AnimatePresence>

      <SlideIndicator />
      <SlideHints />

      {/* Vinheta subtil para profundidade */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(120% 80% at 50% 50%, transparent 65%, rgba(31,29,26,0.10) 100%)',
        }}
      />

      <span className="sr-only" aria-live="polite">Slide {index + 1}</span>
    </div>
  )
}

export default function SlideDeck() {
  return <DeckStage />
}
