import { motion } from 'framer-motion'
import Logo from './Logo'
import { useLanguage } from '../context/LanguageContext'

const EASE = [0.22, 1, 0.36, 1]

export default function Footer() {
  const { t } = useLanguage()

  return (
    <section
      id="footer"
      data-slide-scroll="true"
      className="relative h-screen w-screen overflow-y-auto flex flex-col px-6 lg:px-16"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(50% 40% at 50% 50%, rgba(138,174,138,0.14), transparent 70%)',
        }}
      />

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
        className="relative mx-auto my-auto max-w-[1400px] w-full py-24"
      >
        <Reveal>
          <div className="eyebrow mb-6">— Fim da apresentação</div>
        </Reveal>

        <Reveal>
          <h2 className="display-lg text-5xl md:text-7xl lg:text-8xl text-paper-100 mb-12 text-balance">
            Obrigado.
          </h2>
        </Reveal>

        <Reveal>
        <div className="grid md:grid-cols-4 gap-8 mb-10 pt-10 border-t border-ink-600">
          <div>
            <Logo className="h-5 w-auto mb-4 text-paper-100" />
            <p className="font-mono text-xs text-paper-400 leading-relaxed">
              {t('footer.project')}<br />
              <span className="text-phosphor">{t('footer.disciplines')}</span>
            </p>
          </div>

          <div>
            <div className="eyebrow-muted mb-3">Links</div>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/Phish-N-Chips25/Challange-3"
                  className="font-mono text-xs text-paper-300 hover:text-phosphor transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  → {t('footer.repo')}
                </a>
              </li>
              <li>
                <a
                  href="https://phish-n-chips25.github.io/"
                  className="font-mono text-xs text-paper-300 hover:text-phosphor transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  → phish-n-chips25.github.io
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="eyebrow-muted mb-3">Institution</div>
            <p className="font-mono text-xs text-paper-300 leading-relaxed">
              ISEP / IPP<br />
              Porto · Portugal
            </p>
          </div>

          <div>
            <div className="eyebrow-muted mb-3">Built with</div>
            <p className="font-mono text-xs text-paper-300">{t('footer.built')}</p>
          </div>
        </div>
        </Reveal>

        <Reveal>
          <div className="pt-8 border-t border-ink-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="font-mono text-[0.7rem] text-paper-500 tabular-nums tracking-widest">
              © 2025/26 · PHISH-N-CHIPS · CHALLENGE 03
            </p>
            <p className="font-mono text-[0.7rem] text-paper-500 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 bg-phosphor animate-pulse-dim" />
              <span className="tracking-widest">SYSTEM ONLINE</span>
            </p>
          </div>
        </Reveal>
      </motion.div>
    </section>
  )
}

function Reveal({ children, className = '' }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
        show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
