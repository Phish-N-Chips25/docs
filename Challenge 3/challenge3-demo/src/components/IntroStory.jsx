import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useSlideDeck } from '../context/useSlideDeck'

const EASE = [0.22, 1, 0.36, 1]

// ── Perspectiva do analista SOC — 7 beats cinematográficos ──────────────────
// Cada frame: headline curta que aterra como um título de ecrã,
// subtítulo que surge depois (câmara a revelar mais), tint de mood.
const FRAMES_PT = [
  {
    text: '08:30 da manhã.\nO analista chega ao trabalho.',
    sub: 'Antes do dashboard, antes dos alertas — o sistema precisa de saber quem ele é.',
    tint: 'rgba(138,174,138,0.06)',
  },
  {
    text: 'Não é uma password.',
    sub: 'Passwords podem ser roubadas. O que não pode ser roubado é o rosto dele.',
    tint: 'rgba(163,190,220,0.07)',
  },
  {
    text: 'Autenticado.',
    sub: 'InsightFace confirma: similaridade cosseno 0.83. Acima do threshold 0.70. A porta abre.',
    tint: 'rgba(138,174,138,0.09)',
  },
  {
    text: 'O dashboard carrega.',
    sub: '45 eventos Sysmon em janela. O TransformerAE reconstruiu o comportamento normal. Desvio detectado.',
    tint: 'rgba(232,192,138,0.08)',
  },
  {
    text: 'Não é ruído.',
    sub: 'AUC 0.991. O autoencoder por evento confirma: três eventos são cirurgicamente anómalos.',
    tint: 'rgba(217,138,138,0.09)',
  },
  {
    text: 'T1059. Execution.',
    sub: 'O RAG consultou 3.463 técnicas. O Qwen 2.5 fundamentou o veredicto em evidências reais.',
    tint: 'rgba(182,168,212,0.09)',
  },
  {
    text: 'Isto é o Challenge 3.',
    sub: '',
    tint: 'rgba(138,174,138,0.05)',
  },
]

const FRAMES_EN = [
  {
    text: '08:30 A.M.\nThe SOC analyst arrives.',
    sub: 'Before the dashboard, before the alerts — the system needs to know who they are.',
    tint: 'rgba(138,174,138,0.06)',
  },
  {
    text: 'Not a password.',
    sub: 'Passwords can be stolen. What cannot be stolen is their face.',
    tint: 'rgba(163,190,220,0.07)',
  },
  {
    text: 'Authenticated.',
    sub: 'InsightFace confirms: cosine similarity 0.83. Above threshold 0.70. The door opens.',
    tint: 'rgba(138,174,138,0.09)',
  },
  {
    text: 'The dashboard loads.',
    sub: '45 Sysmon events in a window. The TransformerAE reconstructed normal behaviour. Deviation detected.',
    tint: 'rgba(232,192,138,0.08)',
  },
  {
    text: "It's not noise.",
    sub: 'AUC 0.991. The per-event autoencoder confirms: three events are surgically anomalous.',
    tint: 'rgba(217,138,138,0.09)',
  },
  {
    text: 'T1059. Execution.',
    sub: 'The RAG queried 3,463 techniques. Qwen 2.5 grounded the verdict in real evidence.',
    tint: 'rgba(182,168,212,0.09)',
  },
  {
    text: 'This is Challenge 3.',
    sub: '',
    tint: 'rgba(138,174,138,0.05)',
  },
]

// Tempo por frame — cada beat respira antes de avançar
const FRAME_HOLD_MS = [6500, 6000, 6000, 6500, 6000, 6500, 0]

export default function IntroStory() {
  const { lang } = useLanguage()
  const { next } = useSlideDeck()
  const FRAMES = lang === 'en' ? FRAMES_EN : FRAMES_PT
  const [i, setI] = useState(0)

  const advance = useCallback(() => {
    setI((v) => {
      if (v >= FRAMES.length - 1) { next(); return v }
      return v + 1
    })
  }, [FRAMES.length, next])

  // Auto-advance timer — cada frame tem o seu próprio tempo de respiração
  useEffect(() => {
    if (i >= FRAMES.length - 1) return
    const ms = FRAME_HOLD_MS[i] ?? 6000
    const t = setTimeout(advance, ms)
    return () => clearTimeout(t)
  }, [i, advance, FRAMES.length])

  // Keyboard: Space / ArrowRight / Enter to advance
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === ' ' || e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault()
        advance()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [advance])

  const frame = FRAMES[i]
  const isLast = i === FRAMES.length - 1
  const titleLines = frame.text.split('\n')

  return (
    <section
      id="story"
      data-slide-scroll="true"
      className="relative h-screen w-screen overflow-hidden flex flex-col justify-center px-8 lg:px-20 cursor-pointer select-none"
      onClick={advance}
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Per-frame mood tint — cross-fades smoothly */}
      <AnimatePresence>
        <motion.div
          key={`tint-${i}`}
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
          style={{ background: frame.tint }}
        />
      </AnimatePresence>

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" aria-hidden />

      {/* ── Main body ─────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-[1100px] w-full z-10">

        {/* Frame counter / REC badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`badge-${i}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center gap-3 mb-10 md:mb-14"
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full animate-pulse-dim"
              style={{ background: '#d98a8a' }}
            />
            <span
              className="font-mono uppercase"
              style={{ fontSize: '0.60rem', letterSpacing: '0.45em', color: 'rgba(31,29,26,0.38)' }}
            >
              {`${String(i + 1).padStart(2, '0')} / ${String(FRAMES.length).padStart(2, '0')}`}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Main text */}
        <AnimatePresence mode="wait">
          <motion.div key={`frame-${i}`} className="mb-10 md:mb-14">
            {titleLines.map((line, li) => (
              <motion.h1
                key={li}
                initial={{ opacity: 0, y: 56, filter: 'blur(28px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -24, filter: 'blur(18px)' }}
                transition={{ duration: 1.6, ease: EASE, delay: li * 0.22 }}
                className="font-display font-light leading-[1.0] tracking-tight text-balance block"
                style={{ fontSize: 'clamp(2.8rem, 8.5vw, 7.5rem)', color: '#1f1d1a' }}
              >
                {line}
              </motion.h1>
            ))}

            {frame.sub && (
              <motion.p
                initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 1.2, ease: EASE, delay: 1.4 }}
                className="font-sans mt-6 md:mt-8 max-w-2xl leading-relaxed"
                style={{ fontSize: 'clamp(1rem, 1.9vw, 1.35rem)', color: 'rgba(31,29,26,0.48)' }}
              >
                {frame.sub}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex items-center gap-2 mt-6">
          {FRAMES.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={(e) => { e.stopPropagation(); setI(idx) }}
              aria-label={`Frame ${idx + 1}`}
              animate={{
                width: idx === i ? 28 : 8,
                opacity: idx <= i ? 1 : 0.22,
              }}
              transition={{ duration: 0.4, ease: EASE }}
              className="rounded-full"
              style={{
                height: '3px',
                background: idx === i ? '#8aae8a' : idx < i ? 'rgba(31,29,26,0.32)' : 'rgba(31,29,26,0.10)',
              }}
            />
          ))}
        </div>

        {/* CTA on last frame */}
        <AnimatePresence>
          {isLast && (
            <motion.button
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
              onClick={(e) => { e.stopPropagation(); next() }}
              className="group mt-10 inline-flex items-center gap-3 border px-5 py-3 transition-colors hover:bg-phosphor/10"
              style={{
                fontSize: '0.68rem',
                fontFamily: 'var(--font-mono, monospace)',
                textTransform: 'uppercase',
                letterSpacing: '0.35em',
                color: '#8aae8a',
                borderColor: 'rgba(138,174,138,0.40)',
              }}
            >
              <span>{lang === 'en' ? 'Begin' : 'Começar'}</span>
              <motion.span
                aria-hidden
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.3, repeat: Infinity, ease: EASE }}
              >→</motion.span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* "Click to advance" hint — only first frame */}
      <AnimatePresence>
        {i === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.32 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, delay: 3.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono uppercase pointer-events-none whitespace-nowrap"
            style={{ fontSize: '0.52rem', letterSpacing: '0.5em', color: '#1f1d1a' }}
          >
            {lang === 'en' ? 'Click · Space to advance' : 'Clique · Space para avançar'}
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  )
}
