import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useSlideDeck } from '../context/useSlideDeck'

const EASE = [0.22, 1, 0.36, 1]

// ── Orb positions & appearance ─────────────────────────────────────────────
const ORBS = [
  { color: 'rgba(100,155,100,0.48)',  size: '65vmin', cx: 18,  cy: 22,  dur: 24, delay: 0 },
  { color: 'rgba(155,128,208,0.40)',  size: '58vmin', cx: 80,  cy: 70,  dur: 31, delay: -9 },
  { color: 'rgba(115,158,210,0.30)',  size: '52vmin', cx: 38,  cy: -6,  dur: 19, delay: -5 },
  { color: 'rgba(210,168,100,0.26)',  size: '48vmin', cx: 74,  cy: 10,  dur: 27, delay: -14 },
  { color: 'rgba(100,155,100,0.18)',  size: '40vmin', cx: 88,  cy: 88,  dur: 22, delay: -7 },
]

export default function PreShow() {
  const { lang } = useLanguage()
  const { next } = useSlideDeck()
  const [audioOn, setAudioOn] = useState(false)
  const audioRef = useRef(null)   // HTMLAudioElement
  const fadeRef  = useRef(null)   // rAF handle for volume fade

  const fadeTo = (target, duration = 1200) => {
    if (!audioRef.current) return
    const audio = audioRef.current
    const start = audio.volume
    const startTime = performance.now()
    cancelAnimationFrame(fadeRef.current)
    const tick = (now) => {
      const t = Math.min((now - startTime) / duration, 1)
      audio.volume = start + (target - start) * t
      if (t < 1) fadeRef.current = requestAnimationFrame(tick)
    }
    fadeRef.current = requestAnimationFrame(tick)
  }

  const handleAudio = () => {
    if (!audioRef.current) {
      const a = new Audio('/bensound-echoesfromthemountain.mp3')
      a.loop = true
      a.volume = 0
      audioRef.current = a
      a.play().then(() => { fadeTo(0.55, 2000); setAudioOn(true) }).catch(() => {})
      return
    }
    if (audioOn) {
      fadeTo(0, 800)
      setTimeout(() => { try { audioRef.current.pause() } catch {} }, 900)
      setAudioOn(false)
    } else {
      audioRef.current.volume = 0
      audioRef.current.play().then(() => { fadeTo(0.55, 1500); setAudioOn(true) }).catch(() => {})
    }
  }

  // Fade out & pause when leaving the slide
  useEffect(() => () => {
    cancelAnimationFrame(fadeRef.current)
    if (audioRef.current) {
      fadeTo(0, 600)
      setTimeout(() => { try { audioRef.current.pause() } catch {} }, 700)
    }
  }, [])

  return (
    <section
      data-slide-scroll="true"
      className="relative h-screen w-screen overflow-hidden flex flex-col items-center justify-center bg-white"
    >
      {/* ── Animated orbs ─────────────────────────────────────────── */}
      {ORBS.map((o, i) => <Orb key={i} {...o} />)}

      {/* Grain / noise overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
          opacity: 0.015,
        }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" aria-hidden />

      {/* ── Main content ──────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-2xl">

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 28, filter: 'blur(18px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.4 }}
          className="mb-14"
        >
          <p
            className="font-display font-light tracking-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', color: '#1f1d1a' }}
          >
            Phish
            <span style={{ color: '#8aae8a', margin: '0 0.18em' }}>·</span>
            N
            <span style={{ color: '#8aae8a', margin: '0 0.18em' }}>·</span>
            Chips
          </p>
          <p
            className="font-mono uppercase mt-2.5"
            style={{ fontSize: '0.58rem', letterSpacing: '0.6em', color: 'rgba(31,29,26,0.35)' }}
          >
            Challenge 03 · ISEP · 2025/2026
          </p>
        </motion.div>

        {/* Main message */}
        <motion.p
          initial={{ opacity: 0, y: 18, filter: 'blur(14px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.6, ease: EASE, delay: 1.0 }}
          className="font-display font-light text-center leading-tight text-balance"
          style={{
            fontSize: 'clamp(1.5rem, 3.2vw, 2.8rem)',
            color: 'rgba(31,29,26,0.75)',
            maxWidth: '22ch',
          }}
        >
          {lang === 'en'
            ? 'The presentation begins\nin a moment.'
            : 'A apresentação começa\ndentro de momentos.'}
        </motion.p>

        {/* Pulsing dot beneath */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, ease: EASE, delay: 2.2 }}
          className="mt-8 inline-block w-1.5 h-1.5 rounded-full animate-pulse-dim"
          style={{ background: '#8aae8a' }}
        />
      </div>

      {/* ── Bottom controls ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: EASE, delay: 2.2 }}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
      >
        <button
          onClick={handleAudio}
          className="flex items-center gap-2.5 rounded-full px-4 py-2.5 border transition-all duration-300 hover:border-phosphor/60 hover:bg-phosphor/5"
          style={{
            border: `1px solid ${audioOn ? 'rgba(138,174,138,0.5)' : 'rgba(31,29,26,0.15)'}`,
            background: audioOn ? 'rgba(138,174,138,0.06)' : 'transparent',
          }}
        >
          <SpeakerIcon on={audioOn} />
          <span
            className="font-mono uppercase"
            style={{
              fontSize: '0.58rem',
              letterSpacing: '0.4em',
              color: audioOn ? '#4d6b4d' : 'rgba(31,29,26,0.5)',
            }}
          >
            {audioOn
              ? (lang === 'en' ? 'Mute' : 'Silenciar')
              : (lang === 'en' ? 'Sound on' : 'Ligar som')}
          </span>
        </button>

        <button
          onClick={next}
          className="font-mono uppercase opacity-30 hover:opacity-70 transition-opacity duration-300"
          style={{ fontSize: '0.58rem', letterSpacing: '0.4em', color: '#1f1d1a' }}
        >
          {lang === 'en' ? 'Skip →' : 'Saltar →'}
        </button>
      </motion.div>

      {/* Subtle top line */}
      <motion.div
        aria-hidden
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 2.0, ease: EASE, delay: 0.8 }}
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(138,174,138,0.35) 30%, rgba(163,190,220,0.35) 70%, transparent)',
          originX: '50%',
        }}
      />
    </section>
  )
}

// ── Animated blob ─────────────────────────────────────────────────────────
function Orb({ color, size, cx, cy, dur, delay }) {
  return (
    <motion.div
      aria-hidden
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${cx}%`,
        top: `${cy}%`,
        marginLeft: `calc(-${size} / 2)`,
        marginTop: `calc(-${size} / 2)`,
        background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
        filter: 'blur(80px)',
        willChange: 'transform',
      }}
      animate={{
        x: [0, 90, -65, 45, 0],
        y: [0, -75, 55, -35, 0],
        scale: [1, 1.1, 0.94, 1.06, 1],
      }}
      transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

// ── Speaker icon ──────────────────────────────────────────────────────────
function SpeakerIcon({ on }) {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" style={{ color: on ? '#4d6b4d' : 'rgba(31,29,26,0.45)' }}>
      <path d="M2 5 H4 L8 2 V12 L4 9 H2 Z" fill="currentColor" />
      {on && (
        <>
          <path d="M10 4 Q12.5 7 10 10" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          <path d="M11.5 2.5 Q14.5 7 11.5 11.5" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}

// ── Cinematic ambient drone — REMOVED, replaced by MP3 ──────────────────
