import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useSlideDeck } from '../context/useSlideDeck'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Cinematic reveal entre o "Cenário" e a "Arquitectura".
 * Estilo trailer Marvel: letterbox preto, camera virtual a fazer push-in,
 * planos sequenciais, soundtrack orquestral sintetizado em WebAudio,
 * skip e auto-advance.
 *
 * Cenas:
 *   0  Title card  "The Architecture" + tagline
 *   1  Push-in num blueprint do edifício
 *   2  Zoom digital  → endpoints + LNIAGIA assina logs
 *   3  Pan físico    → câmara + RNAAPIA assina rosto
 *   4  Pull-back     → ambos se unem em "DETEÇÃO DE ANOMALIAS" (cyber-anomaly + DualSentinel)
 */
const SCENES = [
  { dur: 3.4 }, // 0 title
  { dur: 4.0 }, // 1 blueprint
  { dur: 5.0 }, // 2 digital
  { dur: 5.0 }, // 3 physical
  { dur: 4.6 }, // 4 union
]
const TOTAL = SCENES.reduce((a, s) => a + s.dur, 0)

export default function CinematicReveal() {
  const { lang } = useLanguage()
  const { next } = useSlideDeck()
  const reduce = useReducedMotion()
  const [scene, setScene] = useState(0)
  const [t, setT] = useState(0) // segundos desde início
  const [audioOn, setAudioOn] = useState(false)
  const audioRef = useRef(null)
  const startRef = useRef(performance.now())

  // Loop de tempo
  useEffect(() => {
    let raf
    const tick = (now) => {
      const elapsed = (now - startRef.current) / 1000
      setT(elapsed)
      let acc = 0
      let s = 0
      for (let i = 0; i < SCENES.length; i++) {
        acc += SCENES[i].dur
        if (elapsed < acc) { s = i; break }
        s = i
      }
      setScene(s)
      if (elapsed >= TOTAL) {
        if (audioRef.current) stopMusic()
        next()
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [next])

  // Música cinemática (acorde que cresce + swell por cena)
  const startMusic = () => {
    if (audioRef.current) return
    audioRef.current = createCinematicScore()
    setAudioOn(true)
  }
  const stopMusic = () => {
    if (!audioRef.current) return
    try {
      const { ctx, master } = audioRef.current
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8)
      setTimeout(() => { try { ctx.close() } catch {} }, 1000)
    } catch {}
    audioRef.current = null
    setAudioOn(false)
  }
  useEffect(() => () => stopMusic(), [])

  // "Hit" musical em cada mudança de cena
  useEffect(() => {
    if (audioOn && scene > 0) playHit(scene)
  }, [scene, audioOn])

  const skip = () => { if (audioRef.current) stopMusic(); next() }
  const sceneT = t - SCENES.slice(0, scene).reduce((a, s) => a + s.dur, 0)
  const sceneP = Math.min(1, sceneT / SCENES[scene].dur)

  return (
    <section
      data-slide-scroll="true"
      className="relative h-screen w-screen overflow-hidden bg-white text-paper-100"
    >
      {/* Letterbox bars */}
      <motion.div
        className="absolute top-0 left-0 right-0 bg-ink-800 z-30 pointer-events-none"
        initial={{ height: '50%' }}
        animate={{ height: '8%' }}
        transition={{ duration: 1.0, ease: EASE }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-ink-800 z-30 pointer-events-none"
        initial={{ height: '50%' }}
        animate={{ height: '8%' }}
        transition={{ duration: 1.0, ease: EASE }}
      />

      {/* Vinheta subtil */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background:
            'radial-gradient(120% 70% at 50% 50%, transparent 50%, rgba(31,29,26,0.06) 100%)',
        }}
      />
      <FilmGrain />

      {/* Palco */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {scene === 0 && <TitleCard key="title" lang={lang} p={sceneP} />}
          {scene === 1 && <BlueprintScene key="blue" lang={lang} p={sceneP} reduce={reduce} />}
          {scene === 2 && <DigitalScene key="dig" lang={lang} p={sceneP} reduce={reduce} />}
          {scene === 3 && <PhysicalScene key="phy" lang={lang} p={sceneP} reduce={reduce} />}
          {scene === 4 && <UnionScene key="uni" lang={lang} p={sceneP} reduce={reduce} />}
        </AnimatePresence>
      </div>

      {/* HUD: progresso + skip + audio */}
      <div className="absolute top-4 right-4 z-40 flex items-center gap-4">
        {!audioOn && (
          <button
            onClick={startMusic}
            className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-paper-300 hover:text-phosphor-dark px-3 py-1.5 rounded-full border border-ink-600 bg-white hover:border-phosphor/60 transition-colors"
          >
            ♪ {lang === 'en' ? 'Score on' : 'Ligar som'}
          </button>
        )}
        <button
          onClick={skip}
          className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-paper-300 hover:text-phosphor-dark px-3 py-1.5 rounded-full border border-ink-600 bg-white hover:border-phosphor/60 transition-colors"
        >
          {lang === 'en' ? 'Skip →' : 'Saltar →'}
        </button>
      </div>

      {/* Barra de tempo de filme */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-40 w-[60%] h-px bg-ink-700">
        <motion.div
          className="h-full bg-phosphor"
          style={{ width: `${(t / TOTAL) * 100}%` }}
        />
      </div>

      {/* Marcadores de cena */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-6 font-mono text-[0.55rem] uppercase tracking-[0.4em] text-paper-400">
        <span className={scene === 0 ? 'text-phosphor' : ''}>I · Title</span>
        <span className={scene === 1 ? 'text-phosphor' : ''}>II · Site</span>
        <span className={scene === 2 ? 'text-phosphor' : ''}>III · Digital</span>
        <span className={scene === 3 ? 'text-phosphor' : ''}>IV · Physical</span>
        <span className={scene === 4 ? 'text-phosphor' : ''}>V · Dual</span>
      </div>
    </section>
  )
}

/* ─────────────────────────────  CENA 0 — TITLE  ───────────────────────────── */
function TitleCard({ lang, p }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: 'blur(8px)' }}
      transition={{ duration: 0.8, ease: EASE }}
      className="text-center px-6"
    >
      <motion.p
        initial={{ opacity: 0, letterSpacing: '0.5em' }}
        animate={{ opacity: 0.7, letterSpacing: '0.4em' }}
        transition={{ duration: 1.4, ease: EASE }}
        className="font-mono text-[0.65rem] md:text-xs uppercase text-phosphor-dark mb-8"
      >
        {lang === 'en' ? 'A system in two acts' : 'Um sistema em dois actos'}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30, filter: 'blur(20px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
        className="font-display font-light text-6xl md:text-8xl lg:text-9xl tracking-tight"
      >
        {lang === 'en' ? 'The Architecture' : 'A Arquitectura'}
      </motion.h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.8, ease: EASE, delay: 1.0 }}
        className="mx-auto mt-10 h-px w-40 bg-phosphor origin-center"
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: p > 0.55 ? 0.85 : 0 }}
        transition={{ duration: 0.6 }}
        className="mt-6 font-sans text-base md:text-lg text-paper-300"
      >
        {lang === 'en' ? 'Two walls. One brain. Zero blind spots.' : 'Duas paredes. Um cérebro. Zero pontos cegos.'}
      </motion.p>
    </motion.div>
  )
}

/* ─────────────────────────────  CENA 1 — BLUEPRINT  ───────────────────────────── */
function BlueprintScene({ lang, p }) {
  // camera: dolly-in lento sobre planta do edifício
  const scale = 1 + p * 0.6
  const ty = p * -40
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.4, filter: 'blur(12px)' }}
      transition={{ duration: 0.7, ease: EASE }}
      className="absolute inset-0"
    >
      <motion.svg
        viewBox="0 0 1000 600"
        className="w-full h-full"
        style={{
          transform: `scale(${scale}) translateY(${ty}px)`,
          transformOrigin: '50% 55%',
        }}
      >
        <defs>
          <pattern id="grid-blue" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" stroke="#8aae8a" strokeOpacity="0.18" strokeWidth="0.5" fill="none" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="1000" height="600" fill="url(#grid-blue)" />

        {/* Edifício — paredes desenhadas progressivamente */}
        <motion.path
          d="M 200 460 L 200 200 L 500 120 L 800 200 L 800 460 Z"
          fill="none" stroke="#8aae8a" strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.9 }}
          transition={{ duration: 2.4, ease: EASE }}
        />
        {/* Divisões internas */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: p > 0.35 ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          stroke="#8aae8a" strokeOpacity="0.5" strokeDasharray="4 4"
        >
          <line x1="500" y1="120" x2="500" y2="460" />
          <line x1="200" y1="320" x2="800" y2="320" />
        </motion.g>

        {/* Labels DIGITAL / PHYSICAL */}
        <motion.text
          x="350" y="290" textAnchor="middle"
          className="fill-phosphor-dark font-mono"
          fontSize="14" letterSpacing="6"
          initial={{ opacity: 0 }}
          animate={{ opacity: p > 0.5 ? 1 : 0 }}
        >DIGITAL</motion.text>
        <motion.text
          x="650" y="290" textAnchor="middle"
          className="fill-phosphor-dark font-mono"
          fontSize="14" letterSpacing="6"
          initial={{ opacity: 0 }}
          animate={{ opacity: p > 0.6 ? 1 : 0 }}
        >PHYSICAL</motion.text>

        {/* Pontos de scan a piscar */}
        {[[280, 230], [420, 230], [580, 230], [720, 230], [280, 400], [420, 400], [580, 400], [720, 400]].map(([x, y], i) => (
          <motion.circle
            key={i} cx={x} cy={y} r="3"
            fill="#8aae8a"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.4] }}
            transition={{ duration: 1.4, delay: 0.6 + i * 0.08, repeat: Infinity, repeatType: 'reverse' }}
          />
        ))}
      </motion.svg>

      <CornerLabel side="left">
        <span className="text-phosphor">SCENE II</span> · {lang === 'en' ? 'survey the perimeter' : 'reconhecimento do perímetro'}
      </CornerLabel>
    </motion.div>
  )
}

/* ─────────────────────────────  CENA 2 — DIGITAL  ───────────────────────────── */
function DigitalScene({ lang, p }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.2 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -120, filter: 'blur(12px)' }}
      transition={{ duration: 0.8, ease: EASE }}
      className="absolute inset-0"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full">
        {/* Coluna esquerda: endpoints */}
        <g transform="translate(120, 180)">
          {[0, 1, 2].map((i) => (
            <motion.g
              key={i}
              transform={`translate(0, ${i * 90})`}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.15 }}
            >
              <rect width="140" height="70" rx="6" fill="#f5f5f3" stroke="#8aae8a" strokeOpacity="0.6" />
              <rect x="10" y="10" width="120" height="40" fill="#ffffff" />
              <text x="70" y="35" textAnchor="middle" className="fill-phosphor font-mono" fontSize="10">endpoint-{i + 1}</text>
              <circle cx="125" cy="60" r="3" fill="#8aae8a">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </motion.g>
          ))}
        </g>

        {/* Stream de logs (linhas a correr) */}
        <g>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const start = 0.1 + i * 0.18
            const local = (p - start) / 0.7
            if (local <= 0 || local >= 1) return null
            const x = 270 + local * 260
            const y = 215 + (i % 3) * 90
            return (
              <g key={i}>
                <rect x={x} y={y - 3} width="40" height="2" fill="#8aae8a" opacity={1 - local * 0.5} />
                <text x={x} y={y - 8} className="fill-phosphor font-mono" fontSize="8" opacity={0.7 * (1 - local)}>
                  {hashCode(i)}
                </text>
              </g>
            )
          })}
        </g>

        {/* Cérebro LNIAGIA central */}
        <motion.g
          transform="translate(580, 220)"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: p > 0.25 ? 1 : 0, scale: p > 0.25 ? 1 : 0.7 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <motion.circle
            cx="80" cy="80" r="78"
            fill="none" stroke="#8aae8a" strokeOpacity="0.3" strokeWidth="1"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <circle cx="80" cy="80" r="60" fill="#f5f5f3" stroke="#8aae8a" strokeWidth="1.5" />
          <text x="80" y="70" textAnchor="middle" className="fill-phosphor-dark font-mono" fontSize="11" letterSpacing="3">LNIAGIA</text>
          <text x="80" y="88" textAnchor="middle" className="fill-paper-300 font-mono" fontSize="8">log + LLM judge</text>
          <text x="80" y="105" textAnchor="middle" className="fill-paper-400 font-mono" fontSize="7" letterSpacing="2">SENTINEL · 01</text>
        </motion.g>

        {/* Veredicto MALICIOUS */}
        <motion.g
          transform="translate(800, 240)"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: p > 0.6 ? 1 : 0, x: p > 0.6 ? 0 : -20 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <rect x="0" y="0" width="120" height="40" rx="20" fill="#d98a8a" />
          <text x="60" y="25" textAnchor="middle" className="fill-paper-100 font-mono" fontSize="11" letterSpacing="3" fontWeight="700">MALICIOUS</text>
        </motion.g>
      </svg>

      <CornerLabel side="left">
        <span className="text-phosphor">SCENE III</span> · {lang === 'en' ? 'the digital sentinel reads every log' : 'o sentinela digital lê cada log'}
      </CornerLabel>
    </motion.div>
  )
}

/* ─────────────────────────────  CENA 3 — PHYSICAL  ───────────────────────────── */
function PhysicalScene({ lang, p }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.2 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: 120, filter: 'blur(12px)' }}
      transition={{ duration: 0.8, ease: EASE }}
      className="absolute inset-0"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full">
        {/* Câmara */}
        <motion.g
          transform="translate(120, 240)"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <rect x="0" y="0" width="100" height="60" rx="6" fill="#f5f5f3" stroke="#8aae8a" />
          <circle cx="50" cy="30" r="20" fill="#ffffff" stroke="#8aae8a" />
          <motion.circle
            cx="50" cy="30" r="8" fill="#8aae8a"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          <text x="50" y="78" textAnchor="middle" className="fill-paper-300 font-mono" fontSize="9">CAM·01</text>
        </motion.g>

        {/* Cone de scan animado */}
        <motion.path
          d="M 220 270 L 460 200 L 460 360 Z"
          fill="#8aae8a" fillOpacity="0.08" stroke="#8aae8a" strokeOpacity="0.4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
        />
        {/* Linha de scan */}
        <motion.line
          x1="460" x2="460" y1="200" y2="360"
          stroke="#8aae8a" strokeWidth="2" strokeOpacity="0.7"
          initial={{ x1: 240, x2: 240 }}
          animate={{ x1: [240, 460, 240], x2: [240, 460, 240] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Rosto descoberto */}
        <motion.g
          transform="translate(490, 200)"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: p > 0.2 ? 1 : 0, scale: p > 0.2 ? 1 : 0.8 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <rect x="0" y="0" width="160" height="200" fill="#f5f5f3" stroke="#8aae8a" strokeOpacity="0.4" />
          {/* face wireframe */}
          <ellipse cx="80" cy="100" rx="48" ry="62" fill="none" stroke="#8aae8a" strokeOpacity="0.7" />
          <line x1="80" y1="60" x2="80" y2="160" stroke="#8aae8a" strokeOpacity="0.4" />
          <line x1="40" y1="100" x2="120" y2="100" stroke="#8aae8a" strokeOpacity="0.4" />
          <circle cx="64" cy="90" r="3" fill="#8aae8a" />
          <circle cx="96" cy="90" r="3" fill="#8aae8a" />
          <path d="M 60 130 Q 80 145 100 130" fill="none" stroke="#8aae8a" strokeWidth="1.5" />
          {/* feature points scanning */}
          {[[55, 75], [105, 75], [80, 110], [65, 135], [95, 135]].map(([x, y], i) => (
            <motion.circle
              key={i} cx={x} cy={y} r="2" fill="#e8c08a"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.4] }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1, repeat: Infinity, repeatType: 'reverse' }}
            />
          ))}
          <text x="80" y="190" textAnchor="middle" className="fill-paper-400 font-mono" fontSize="8" letterSpacing="2">UNKNOWN · 0.31</text>
        </motion.g>

        {/* RNAAPIA cérebro */}
        <motion.g
          transform="translate(720, 220)"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: p > 0.45 ? 1 : 0, scale: p > 0.45 ? 1 : 0.7 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <motion.circle
            cx="80" cy="80" r="78"
            fill="none" stroke="#8aae8a" strokeOpacity="0.3"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <circle cx="80" cy="80" r="60" fill="#f5f5f3" stroke="#8aae8a" strokeWidth="1.5" />
          <text x="80" y="70" textAnchor="middle" className="fill-phosphor-dark font-mono" fontSize="11" letterSpacing="3">RNAAPIA</text>
          <text x="80" y="88" textAnchor="middle" className="fill-paper-300 font-mono" fontSize="8">open-set face</text>
          <text x="80" y="105" textAnchor="middle" className="fill-paper-400 font-mono" fontSize="7" letterSpacing="2">SENTINEL · 02</text>
        </motion.g>

        {/* Veredicto DENIED */}
        <motion.g
          transform="translate(420, 460)"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: p > 0.7 ? 1 : 0, y: p > 0.7 ? 0 : 20 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <rect x="0" y="0" width="160" height="40" rx="20" fill="#d98a8a" />
          <text x="80" y="25" textAnchor="middle" className="fill-paper-100 font-mono" fontSize="11" letterSpacing="3" fontWeight="700">ACCESS · DENIED</text>
        </motion.g>
      </svg>

      <CornerLabel side="left">
        <span className="text-phosphor">SCENE IV</span> · {lang === 'en' ? 'the physical sentinel watches every face' : 'o sentinela físico observa cada rosto'}
      </CornerLabel>
    </motion.div>
  )
}

/* ─────────────────────────────  CENA 4 — UNION  ───────────────────────────── */
function UnionScene({ lang, p }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
      transition={{ duration: 0.9, ease: EASE }}
      className="absolute inset-0 flex flex-col items-center justify-center"
    >
      <svg viewBox="0 0 1000 500" className="w-full max-w-5xl">
        {/* Dois círculos a aproximarem-se */}
        <motion.circle
          cx={300 + p * 80} cy="220" r="85"
          fill="none" stroke="#8aae8a" strokeWidth="1.5"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <text x={300 + p * 80} y="220" textAnchor="middle" className="fill-phosphor-dark font-mono" fontSize="13" letterSpacing="3">LNIAGIA</text>

        <motion.circle
          cx={700 - p * 80} cy="220" r="85"
          fill="none" stroke="#8aae8a" strokeWidth="1.5"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
        />
        <text x={700 - p * 80} y="220" textAnchor="middle" className="fill-phosphor-dark font-mono" fontSize="13" letterSpacing="3">RNAAPIA</text>

        {/* Linha de fusão */}
        <motion.line
          x1={300 + p * 80} y1="220" x2={700 - p * 80} y2="220"
          stroke="#e8c08a" strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: p > 0.4 ? 1 : 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        />

        {/* Flash central no momento de união */}
        {p > 0.7 && (
          <motion.circle
            cx="500" cy="220" r="0" fill="#8aae8a"
            initial={{ r: 0, opacity: 1 }}
            animate={{ r: 220, opacity: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
          />
        )}
      </svg>

      <motion.h2
        initial={{ opacity: 0, letterSpacing: '0.6em' }}
        animate={{ opacity: p > 0.5 ? 1 : 0, letterSpacing: '0.3em' }}
        transition={{ duration: 1.2, ease: EASE }}
        className="font-display font-light text-5xl md:text-7xl mt-2 text-paper-100"
      >
        {lang === 'en' ? 'ANOMALY DETECTION' : 'DETEÇÃO DE ANOMALIAS'}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: p > 0.75 ? 0.8 : 0 }}
        transition={{ duration: 0.8 }}
        className="mt-4 font-mono text-xs text-phosphor uppercase tracking-[0.4em]"
      >
        {lang === 'en' ? 'cyber-anomaly + DualSentinel · two approaches.' : 'cyber-anomaly + DualSentinel · duas abordagens.'}
      </motion.p>
    </motion.div>
  )
}

/* ─────────────────────────────  HELPERS  ───────────────────────────── */
function CornerLabel({ children, side = 'left' }) {
  return (
    <div
      className={`absolute z-30 ${side === 'left' ? 'left-8' : 'right-8'} bottom-16 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-paper-400`}
    >
      {children}
    </div>
  )
}

function FilmGrain() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.025] z-25 pointer-events-none" aria-hidden>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  )
}

function hashCode(i) {
  const codes = ['0xA1F2', '0x9E0C', '0x77B3', '0xC4D5', '0x1E88', '0x60AC']
  return codes[i % codes.length]
}

/* ─────────────────────────────  WEBAUDIO score  ───────────────────────────── */
function createCinematicScore() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    const ctx = new Ctx()
    if (ctx.state === 'suspended') ctx.resume()

    const master = ctx.createGain()
    master.gain.value = 0
    master.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 1.5)

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 600
    filter.Q.value = 0.7
    filter.frequency.linearRampToValueAtTime(2400, ctx.currentTime + 18)

    // Drone grave + 5ª + 3ª maior — acorde épico (D F# A)
    const freqs = [73.42, 110.0, 146.83, 185.0]
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator()
      osc.type = i < 2 ? 'sawtooth' : 'triangle'
      osc.frequency.value = f
      osc.detune.value = (i - 1) * 5
      const g = ctx.createGain()
      g.gain.value = 0.25 - i * 0.03
      osc.connect(g).connect(filter)
      osc.start()
    })

    // LFO no filtro — respiração orquestral
    const lfo = ctx.createOscillator()
    const lfoG = ctx.createGain()
    lfo.frequency.value = 0.08
    lfoG.gain.value = 400
    lfo.connect(lfoG).connect(filter.frequency)
    lfo.start()

    filter.connect(master).connect(ctx.destination)
    return { ctx, master }
  } catch {
    return null
  }
}

function playHit(scene) {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    const ctx = new Ctx()
    const t0 = ctx.currentTime
    // tambor: oscilador sine que cai rapidamente em frequência
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(120 - scene * 8, t0)
    osc.frequency.exponentialRampToValueAtTime(40, t0 + 0.4)
    gain.gain.setValueAtTime(0.0001, t0)
    gain.gain.exponentialRampToValueAtTime(0.5, t0 + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.6)
    osc.connect(gain).connect(ctx.destination)
    osc.start(t0)
    osc.stop(t0 + 0.7)
    setTimeout(() => { try { ctx.close() } catch {} }, 800)
  } catch {}
}
