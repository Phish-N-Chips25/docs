import { motion } from 'framer-motion'
import { useSlideDeck } from '../context/useSlideDeck'

export default function SlideHints() {
  const { index, total, prev, next } = useSlideDeck()
  const isFirst = index === 0
  const isLast = index === total - 1

  return (
    <>
      {/* Contador */}
      <div className="fixed left-6 lg:left-12 bottom-6 z-40 font-mono text-[0.65rem] tracking-widest text-paper-400 tabular-nums">
        <span className="text-phosphor">{String(index + 1).padStart(2, '0')}</span>
        <span className="mx-2 opacity-50">/</span>
        <span>{String(total).padStart(2, '0')}</span>
      </div>

      {/* Hint teclas */}
      <div className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-40 items-center gap-3 font-mono text-[0.65rem] uppercase tracking-widest text-paper-400">
        <KeyHint disabled={isFirst} onClick={prev} label="←" />
        <span className="opacity-60">usa as setas</span>
        <KeyHint disabled={isLast} onClick={next} label="→" />
      </div>

      {/* Setas grandes (mobile/extra) */}
      <button
        onClick={prev}
        aria-label="Anterior"
        disabled={isFirst}
        className={`fixed left-3 top-1/2 -translate-y-1/2 z-40 md:hidden p-3 transition-opacity ${
          isFirst ? 'opacity-20 pointer-events-none' : 'opacity-70 active:opacity-100'
        }`}
      >
        <Chevron dir="left" />
      </button>
      <button
        onClick={next}
        aria-label="Próximo"
        disabled={isLast}
        className={`fixed right-3 top-1/2 -translate-y-1/2 z-40 md:hidden p-3 transition-opacity ${
          isLast ? 'opacity-20 pointer-events-none' : 'opacity-70 active:opacity-100'
        }`}
      >
        <Chevron dir="right" />
      </button>

      {/* Barra de progresso muito fina no topo */}
      <div className="fixed top-0 left-0 right-0 h-px bg-ink-700 z-40">
        <motion.div
          className="h-full bg-phosphor"
          initial={false}
          animate={{ width: `${((index + 1) / total) * 100}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </>
  )
}

function KeyHint({ label, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`min-w-[2rem] h-7 px-2 border border-ink-600 flex items-center justify-center transition-all ${
        disabled
          ? 'opacity-30 pointer-events-none'
          : 'hover:border-phosphor hover:text-phosphor'
      }`}
    >
      {label}
    </button>
  )
}

function Chevron({ dir }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" className="text-paper-200">
      {dir === 'left' ? (
        <path d="M14 4 L7 11 L14 18" stroke="currentColor" strokeWidth="1.5" fill="none" />
      ) : (
        <path d="M8 4 L15 11 L8 18" stroke="currentColor" strokeWidth="1.5" fill="none" />
      )}
    </svg>
  )
}
