import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const EASE = [0.22, 1, 0.36, 1]

export default function Hero() {
  const { t } = useLanguage()
  const titleLines = t('hero.title').split('\n')

  return (
    <section
      id="hero"
      data-slide-scroll="true"
      className="relative h-screen w-screen overflow-hidden flex flex-col justify-center px-6 lg:px-16"
    >
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(60% 50% at 30% 40%, rgba(103,232,249,0.12), transparent 70%), radial-gradient(40% 40% at 80% 80%, rgba(103,232,249,0.07), transparent 70%)',
        }}
      />

      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
        className="absolute left-6 lg:left-16 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-transparent via-phosphor/40 to-transparent"
        aria-hidden
      />

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
        }}
        className="relative mx-auto max-w-[1400px] w-full"
      >
        <Reveal className="flex items-center gap-3 mb-10">
          <span className="w-2 h-2 bg-phosphor animate-pulse-dim" />
          <span className="eyebrow">{t('hero.eyebrow')}</span>
        </Reveal>

        <h1 className="display-xl text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] text-paper-100 max-w-[6ch] sm:max-w-none text-balance mb-12">
          {titleLines.map((line, i) => (
            <Reveal as="span" key={i} className="block">
              {line}
            </Reveal>
          ))}
        </h1>

        <Reveal>
          <p className="font-sans text-lg md:text-2xl text-paper-300 max-w-3xl leading-relaxed text-pretty mb-16">
            {t('hero.subtitle')}
          </p>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 pt-8 border-t border-ink-600 max-w-4xl">
            <MetaItem label="Paper" value="IEEE-format" />
            <MetaItem label="Pillars" value="03" />
            <MetaItem label="Datasets" value="LMD · OTRF · Splunk · VGGFace2" />
            <MetaItem label="Team" value="Phish-N-Chips" />
          </div>
        </Reveal>
      </motion.div>
    </section>
  )
}

function Reveal({ children, className = '', as = 'div' }) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      variants={{
        hidden: { opacity: 0, y: 32, filter: 'blur(10px)' },
        show: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 1.0, ease: EASE },
        },
      }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}

function MetaItem({ label, value }) {
  return (
    <div>
      <div className="eyebrow-muted mb-2">{label}</div>
      <div className="font-mono text-sm text-paper-100">{value}</div>
    </div>
  )
}
