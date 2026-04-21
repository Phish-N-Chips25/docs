import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useSlideDeck } from '../context/useSlideDeck'

const EASE = [0.22, 1, 0.36, 1]
const STEP_MS = 1100

/**
 * Countdown estilo abertura de Apple Keynote:
 *   5 → 4 → 3 → 2 → 1 → "Phish · N · Chips" → avanço automático.
 * Cada passo: tipografia gigante, anel a contrair, leve "tick" sonoro,
 * pad ambiente (WebAudio) que entra em fade quando o utilizador activa.
 */
export default function Countdown() {
  const { lang } = useLanguage()
  const { next } = useSlideDeck()
  const [step, setStep] = useState(5) // 5..1, depois 0 = "logo", -1 = done
  const [audioOn, setAudioOn] = useState(false)
  const [armed, setArmed] = useState(false) // utilizador interagiu?

  const audioRef = useRef(null)
  const timerRef = useRef(null)

  // Auto-advance entre passos
  useEffect(() => {
    if (step < 0) return
    timerRef.current = setTimeout(() => {
      setStep((s) => {
        if (s > 0) return s - 1
        if (s === 0) {
          // chegou ao logo — segue para o slide seguinte
          next()
          return -1
        }
        return s
      })
    }, step === 0 ? 1800 : STEP_MS)
    return () => clearTimeout(timerRef.current)
  }, [step, next])

  // Som por passo
  useEffect(() => {
    if (!armed || step < 0) return
    if (step === 0) playChime()
    else playTick()
  }, [step, armed])

  // Pad ambiente — WebAudio puro, sem ficheiros
  const startMusic = async () => {
    setArmed(true)
    if (audioRef.current) {
      setAudioOn(true)
      audioRef.current.master.gain.cancelScheduledValues(audioRef.current.ctx.currentTime)
      audioRef.current.master.gain.linearRampToValueAtTime(0.18, audioRef.current.ctx.currentTime + 1.2)
      return
    }
    audioRef.current = createAmbientPad()
    setAudioOn(true)
  }
  const stopMusic = () => {
    if (!audioRef.current) return
    const { ctx, master } = audioRef.current
    master.gain.cancelScheduledValues(ctx.currentTime)
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6)
    setAudioOn(false)
  }
  useEffect(() => () => {
    if (audioRef.current) {
      try { audioRef.current.ctx.close() } catch {}
    }
  }, [])

  const skip = () => { clearTimeout(timerRef.current); setStep(-1); next() }

  return (
    <section
      id="intro"
      data-slide-scroll="true"
      className="relative h-screen w-screen overflow-hidden flex flex-col items-center justify-center px-6"
    >
      {/* Background: orbs that breathe */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(70% 60% at 25% 30%, rgba(138,174,138,0.22), transparent 65%), radial-gradient(55% 55% at 78% 78%, rgba(232,192,138,0.18), transparent 65%)',
            'radial-gradient(70% 60% at 72% 65%, rgba(182,168,212,0.20), transparent 65%), radial-gradient(55% 55% at 22% 22%, rgba(163,190,220,0.22), transparent 65%)',
            'radial-gradient(70% 60% at 25% 30%, rgba(138,174,138,0.22), transparent 65%), radial-gradient(55% 55% at 78% 78%, rgba(232,192,138,0.18), transparent 65%)',
          ],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" aria-hidden />

      {/* Eyebrow no topo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10"
      >
        <span className="w-2 h-2 bg-phosphor rounded-full animate-pulse-dim" />
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.4em] text-paper-400">
          {lang === 'en' ? 'Presentation begins in' : 'A apresentação começa em'}
        </span>
      </motion.div>

      {/* Centro: número/logo */}
      <div className="relative flex items-center justify-center w-full max-w-[700px] aspect-square">
        {/* Anéis concêntricos */}
        <Rings step={step} />

        <AnimatePresence mode="wait">
          {step > 0 && (
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.62, filter: 'blur(28px)', y: 40 }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, scale: 1.45, filter: 'blur(28px)', y: -30 }}
              transition={{ duration: 0.75, ease: EASE }}
              className="font-display font-light leading-none tabular-nums select-none"
              style={{
                fontSize: 'clamp(12rem, 28vmin, 24rem)',
                color: '#1f1d1a',
                textShadow: '0 8px 60px rgba(138,174,138,0.22)',
              }}
            >
              {step}
            </motion.div>
          )}

          {step === 0 && (
            <motion.div
              key="logo"
              initial={{ opacity: 0, scale: 0.94, filter: 'blur(16px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.06, filter: 'blur(12px)' }}
              transition={{ duration: 1.1, ease: EASE }}
              className="text-center"
            >
              <h1 className="font-display font-light text-5xl md:text-7xl lg:text-8xl text-paper-100 leading-[1] tracking-tight">
                Phish<span className="text-phosphor mx-2">·</span>N<span className="text-phosphor mx-2">·</span>Chips
              </h1>
              <p className="mt-6 font-mono text-xs md:text-sm tracking-[0.4em] text-paper-400 uppercase">
                Challenge 03 · ISEP
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Painel inferior — controlo de música + skip */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 z-10">
        <button
          onClick={audioOn ? stopMusic : startMusic}
          className="group flex items-center gap-3 px-4 py-2.5 rounded-full border border-ink-600/60 bg-white/60 backdrop-blur-md hover:border-phosphor/60 hover:bg-white/80 transition-all"
        >
          <SpeakerIcon on={audioOn} />
          <span className="font-mono text-[0.65rem] uppercase tracking-widest text-paper-300 group-hover:text-paper-100 transition-colors">
            {audioOn ? (lang === 'en' ? 'Mute' : 'Silenciar') : (lang === 'en' ? 'Play music' : 'Tocar música')}
          </span>
        </button>

        <button
          onClick={skip}
          className="font-mono text-[0.65rem] uppercase tracking-widest text-paper-400 hover:text-paper-100 transition-colors"
        >
          {lang === 'en' ? 'Skip →' : 'Saltar →'}
        </button>
      </div>
    </section>
  )
}

function Rings({ step }) {
  const t = step > 0 ? step : 0
  return (
    <>
      {/* Expanding pulse wave — fires on each number change */}
      <AnimatePresence>
        {step > 0 && (
          <motion.span
            key={`pulse-${step}`}
            aria-hidden
            className="absolute inset-0 rounded-full"
            initial={{ scale: 0.5, opacity: 0.6 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ border: '1px solid rgba(138,174,138,0.55)' }}
          />
        )}
      </AnimatePresence>

      {/* Static concentric rings that contract as the countdown progresses */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full"
        animate={{
          scale: 1 - (5 - t) * 0.03,
          opacity: step > 0 ? 0.50 : 0.15,
          borderColor: step > 0 ? 'rgba(138,174,138,0.38)' : 'rgba(138,174,138,0.15)',
        }}
        transition={{ duration: 0.85, ease: EASE }}
        style={{ border: '1px solid' }}
      />
      <motion.span
        aria-hidden
        className="absolute inset-[10%] rounded-full"
        animate={{
          scale: 1 - (5 - t) * 0.05,
          opacity: step > 0 ? 0.60 : 0.20,
          borderColor: step > 0 ? 'rgba(138,174,138,0.50)' : 'rgba(138,174,138,0.18)',
        }}
        transition={{ duration: 0.85, ease: EASE }}
        style={{ border: '1px solid' }}
      />
      <motion.span
        aria-hidden
        className="absolute inset-[22%] rounded-full"
        animate={{
          scale: 1 - (5 - t) * 0.07,
          opacity: step > 0 ? 0.75 : 0.28,
          borderColor: step > 0 ? 'rgba(138,174,138,0.65)' : 'rgba(138,174,138,0.22)',
        }}
        transition={{ duration: 0.85, ease: EASE }}
        style={{ border: '1px solid' }}
      />

      {/* Glow behind the number */}
      {step > 0 && (
        <motion.span
          aria-hidden
          key={`glow-${step}`}
          className="absolute inset-[15%] rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ background: 'radial-gradient(circle, rgba(138,174,138,0.12) 0%, transparent 70%)' }}
        />
      )}
    </>
  )
}

/* ───────────── Speaker icon ───────────── */
function SpeakerIcon({ on }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" className="text-paper-300">
      <path d="M2 5 H4 L8 2 V12 L4 9 H2 Z" fill="currentColor" />
      {on && (
        <>
          <path d="M10 4 Q12 7 10 10" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M11.5 2.5 Q14 7 11.5 11.5" stroke="currentColor" strokeWidth="1" fill="none" />
        </>
      )}
    </svg>
  )
}

/* ───────────── WebAudio ───────────── */

let sharedCtx = null
function getCtx() {
  if (!sharedCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext
    sharedCtx = new Ctx()
  }
  if (sharedCtx.state === 'suspended') sharedCtx.resume()
  return sharedCtx
}

function playTick() {
  try {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = 880
    gain.gain.value = 0
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18)
    osc.connect(gain).connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.2)
  } catch {}
}

function playChime() {
  try {
    const ctx = getCtx()
    const notes = [523.25, 659.25, 783.99] // C5 E5 G5 — acorde maior suave
    notes.forEach((f, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = f
      gain.gain.value = 0
      const t0 = ctx.currentTime + i * 0.05
      gain.gain.setValueAtTime(0, t0)
      gain.gain.linearRampToValueAtTime(0.08, t0 + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.6)
      osc.connect(gain).connect(ctx.destination)
      osc.start(t0)
      osc.stop(t0 + 1.7)
    })
  } catch {}
}

/**
 * Pad ambiente: 3 osciladores em harmonia (C3 G3 E4) através de filtro
 * passa-baixo lento e leve LFO de panning. Volume controlado por master.
 */
function createAmbientPad() {
  try {
    const ctx = getCtx()
    const master = ctx.createGain()
    master.gain.value = 0
    master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.5)

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 900
    filter.Q.value = 0.6

    // LFO no filtro — abre e fecha lentamente
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.value = 0.06
    lfoGain.gain.value = 250
    lfo.connect(lfoGain).connect(filter.frequency)
    lfo.start()

    const freqs = [130.81, 196.0, 329.63] // C3 G3 E4
    const oscs = freqs.map((f, i) => {
      const osc = ctx.createOscillator()
      osc.type = i === 0 ? 'triangle' : 'sine'
      osc.frequency.value = f
      // ligeiro detune por oscilador
      osc.detune.value = (i - 1) * 4
      const g = ctx.createGain()
      g.gain.value = 0.5
      osc.connect(g).connect(filter)
      osc.start()
      return osc
    })

    filter.connect(master).connect(ctx.destination)
    return { ctx, master, oscs, lfo, filter }
  } catch {
    return null
  }
}
