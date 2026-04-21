import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Wrapper para uma página/slide. Garante altura de viewport,
 * scroll interno se o conteúdo for grande, e animação stagger
 * dos filhos (use <SlideItem> para os blocos a animar).
 */
export default function Slide({ id, children, className = '', align = 'center' }) {
  const justify =
    align === 'top'
      ? 'justify-start pt-24 md:pt-28'
      : align === 'bottom'
      ? 'justify-end pb-24'
      : 'justify-center'

  return (
    <section
      id={id}
      data-slide-scroll="true"
      className={`relative h-screen w-screen overflow-y-auto overflow-x-hidden flex flex-col ${justify} px-6 lg:px-16 ${className}`}
    >
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.08, delayChildren: 0.12 },
          },
        }}
        className="relative mx-auto max-w-[1400px] w-full"
      >
        {children}
      </motion.div>
    </section>
  )
}

export function SlideItem({ children, className = '', as = 'div', delay = 0 }) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      variants={{
        hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
        show: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.9, ease: EASE, delay },
        },
      }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
