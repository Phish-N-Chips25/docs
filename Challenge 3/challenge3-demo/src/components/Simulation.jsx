import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Simulação cinematográfica do sistema completo.
 * Encenação em 5 actos, ~22s de loop com replay manual.
 *
 * Acto 1 — Phishing chega ao endpoint Windows
 * Acto 2 — Movimento lateral (logs Sysmon a streamar)
 * Acto 3 — LNIAGIA: Classical detector + Dual Sentinel emitem veredicto
 * Acto 4 — Atacante físico tenta passar a porta; câmara captura
 * Acto 5 — RNAAPIA: ArcFace compara contra galeria → ACESSO NEGADO
 */

const ACTS_PT = [
  { id: 1, label: "Identidade validada em segundos", range: [0, 4] },
  { id: 2, label: "Risco digital detectado em tempo real", range: [4, 8.5] },
  {
    id: 3,
    label: "Alerta com contexto para decisao rapida",
    range: [8.5, 13.5],
  },
  { id: 4, label: "Tentativa de acesso fisico suspeita", range: [13.5, 17] },
  { id: 5, label: "Acao automatica: acesso bloqueado", range: [17, 22] },
];

const ACTS_EN = [
  { id: 1, label: "Identity verified in seconds", range: [0, 4] },
  { id: 2, label: "Digital risk detected in real time", range: [4, 8.5] },
  { id: 3, label: "Actionable alert with clear context", range: [8.5, 13.5] },
  { id: 4, label: "Suspicious physical access attempt", range: [13.5, 17] },
  { id: 5, label: "Automatic response: access denied", range: [17, 22] },
];

const TOTAL = 22;
const FPS = 60;

const LOG_LINES = [
  { t: 4.2, text: "EID:1 ProcessCreate  powershell.exe -enc JABzAD0..." },
  { t: 4.8, text: "EID:3 NetConn   192.168.10.4 → 10.0.5.21:445" },
  { t: 5.4, text: 'EID:1 ProcessCreate  cmd.exe /c "net use \\\\HR-FS01"' },
  { t: 6.0, text: "EID:11 FileCreate  C:\\Users\\Public\\svc.exe" },
  { t: 6.7, text: "EID:7 ImageLoaded  mimilib.dll  → lsass.exe" },
  { t: 7.3, text: "EID:1 ProcessCreate  rundll32 → suspicious DLL" },
  { t: 7.9, text: "EID:22 DnsQuery  c2.attacker[.]ru" },
];

export default function Simulation() {
  const { lang } = useLanguage();
  const ACTS = lang === "en" ? ACTS_EN : ACTS_PT;
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(true);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const offsetRef = useRef(0);

  // Loop principal
  useEffect(() => {
    if (!playing) {
      startRef.current = null;
      return;
    }
    const tick = (ts) => {
      if (startRef.current == null)
        startRef.current = ts - offsetRef.current * 1000;
      const elapsed = (ts - startRef.current) / 1000;
      if (elapsed >= TOTAL) {
        setTime(TOTAL);
        setPlaying(false);
        offsetRef.current = TOTAL;
        return;
      }
      setTime(elapsed);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  const replay = () => {
    offsetRef.current = 0;
    startRef.current = null;
    setTime(0);
    setPlaying(true);
  };

  const togglePlay = () => {
    if (time >= TOTAL) return replay();
    offsetRef.current = time;
    startRef.current = null;
    setPlaying((p) => !p);
  };

  const currentAct =
    ACTS.find((a) => time >= a.range[0] && time < a.range[1]) ||
    ACTS[ACTS.length - 1];

  return (
    <section
      id="simulation"
      data-slide-scroll="true"
      className="relative h-screen w-screen overflow-hidden flex flex-col justify-center px-6 lg:px-16 pt-20"
    >
      <div
        className="absolute inset-0 bg-grid opacity-[0.05] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(184,255,58,0.05), transparent 70%)",
        }}
      />

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
        }}
        className="relative mx-auto max-w-[1400px] w-full"
      >
        <Reveal>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-px bg-phosphor" />
            <span className="eyebrow">
              {lang === "en"
                ? "Live demo · simulation"
                : "Demo ao vivo · simulação"}
            </span>
          </div>
        </Reveal>
        <Reveal>
          <h2 className="display-lg text-3xl md:text-5xl lg:text-6xl text-paper-100 max-w-4xl text-balance mb-2">
            {lang === "en"
              ? "A 22-second attack.\nTwo walls answer."
              : "Um ataque de 22 segundos.\nDuas paredes respondem."}
          </h2>
        </Reveal>

        {/* Stage da simulação */}
        <Reveal>
          <div className="mt-8 grid lg:grid-cols-[1.4fr_1fr] gap-6">
            <div className="forensic-card p-4 md:p-6 aspect-[16/10] lg:aspect-auto lg:min-h-[440px] relative overflow-hidden">
              <SimStage time={time} lang={lang} />
              <ActLabel act={currentAct} />
            </div>

            <div className="flex flex-col gap-4">
              <LogPanel time={time} lang={lang} />
              <VerdictPanel time={time} lang={lang} />
            </div>
          </div>
        </Reveal>

        {/* Controlos + timeline */}
        <Reveal>
          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="w-10 h-10 border border-phosphor/40 text-phosphor flex items-center justify-center hover:bg-phosphor/10 transition-colors"
              aria-label={playing ? "Pausar" : "Reproduzir"}
            >
              {time >= TOTAL ? (
                <ReplayIcon />
              ) : playing ? (
                <PauseIcon />
              ) : (
                <PlayIcon />
              )}
            </button>
            <div className="flex-1">
              <div className="relative h-1 bg-ink-700">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-phosphor"
                  style={{ width: `${(time / TOTAL) * 100}%` }}
                />
                {ACTS.map((a) => (
                  <span
                    key={a.id}
                    className="absolute top-1/2 -translate-y-1/2 w-px h-3 bg-paper-500/60"
                    style={{ left: `${(a.range[0] / TOTAL) * 100}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 font-mono text-[0.65rem] text-paper-500 tabular-nums">
                <span className="text-phosphor">{time.toFixed(1)}s</span>
                <span>{TOTAL.toFixed(0)}s</span>
              </div>
            </div>
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
}

/* ───────────────────────────── Stage SVG ───────────────────────────── */

function SimStage({ time, lang }) {
  // Posições normalizadas
  const phishProg = clamp01((time - 0.3) / 3.0); // email → endpoint (acto 1)
  const lateralProg = clamp01((time - 4) / 4); // endpoint → server (acto 2)
  const detectFlash = time >= 8.5 && time < 13.5;
  const intruderProg = clamp01((time - 13.5) / 3.5); // intruder → door (acto 4)
  const scanActive = time >= 17 && time < 22;
  const denyFlash = time >= 19.5;

  return (
    <svg viewBox="0 0 800 500" className="w-full h-full block" aria-hidden>
      <defs>
        <linearGradient id="wireGrad" x1="0" x2="1">
          <stop offset="0" stopColor="#8aae8a" stopOpacity="0" />
          <stop offset="0.5" stopColor="#8aae8a" stopOpacity="0.9" />
          <stop offset="1" stopColor="#8aae8a" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="alertGlow">
          <stop offset="0" stopColor="#d98a8a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#d98a8a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="scanGlow">
          <stop offset="0" stopColor="#8aae8a" stopOpacity="0.45" />
          <stop offset="1" stopColor="#8aae8a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Linha divisória vertical: digital | physical */}
      <line
        x1="400"
        y1="40"
        x2="400"
        y2="460"
        stroke="#cfc6b1"
        strokeDasharray="4 6"
      />
      <text
        x="200"
        y="32"
        textAnchor="middle"
        className="fill-paper-400"
        style={{ font: "500 10px JetBrains Mono", letterSpacing: "0.25em" }}
      >
        {lang === "en" ? "DIGITAL WALL" : "PAREDE DIGITAL"}
      </text>
      <text
        x="600"
        y="32"
        textAnchor="middle"
        className="fill-paper-400"
        style={{ font: "500 10px JetBrains Mono", letterSpacing: "0.25em" }}
      >
        {lang === "en" ? "PHYSICAL WALL" : "PAREDE FÍSICA"}
      </text>

      {/* ───── Lado digital ───── */}
      {/* Atacante */}
      <g transform="translate(50, 220)">
        <Hooded color="#d98a8a" />
        <text
          x="22"
          y="80"
          textAnchor="middle"
          className="fill-paper-400"
          style={{ font: "10px JetBrains Mono" }}
        >
          attacker
        </text>
      </g>

      {/* Wire phishing */}
      <Wire
        from={[100, 235]}
        to={[210, 235]}
        progress={phishProg}
        color="#d98a8a"
      />
      {phishProg > 0 && phishProg < 1 && (
        <g transform={`translate(${100 + (210 - 100) * phishProg}, 235)`}>
          <rect
            x="-10"
            y="-7"
            width="20"
            height="14"
            fill="#d98a8a"
            opacity="0.95"
          />
          <text
            x="0"
            y="-12"
            textAnchor="middle"
            className="fill-signal-red"
            style={{ font: "600 9px JetBrains Mono" }}
          >
            ✉ phish
          </text>
        </g>
      )}

      {/* Endpoint Windows */}
      <g transform="translate(210, 200)">
        <Endpoint compromised={time > 3.3} />
        <text
          x="40"
          y="105"
          textAnchor="middle"
          className="fill-paper-300"
          style={{ font: "10px JetBrains Mono" }}
        >
          HR-WS-04
        </text>
      </g>

      {/* Wire lateral */}
      <Wire
        from={[290, 235]}
        to={[360, 100]}
        progress={lateralProg}
        color="#e8c08a"
        dashed
      />

      {/* Servidor / FS */}
      <g transform="translate(310, 70)">
        <Server alert={time > 7.5} />
        <text
          x="30"
          y="68"
          textAnchor="middle"
          className="fill-paper-300"
          style={{ font: "10px JetBrains Mono" }}
        >
          HR-FS01
        </text>
      </g>

      {/* Stream de logs (linhas a sair do endpoint) */}
      {time > 4 && time < 13 && <LogStream t={time} />}

      {/* Detector — círculo concêntrico que pulsa quando detecta */}
      <g transform="translate(120, 380)">
        <DetectorBadge
          label="LNIAGIA"
          sublabel="cyber-anomaly + DualSentinel"
          active={detectFlash}
          verdict={time > 11 ? "malicious" : null}
        />
      </g>

      {/* ───── Lado físico ───── */}
      {/* Intruso a aproximar-se */}
      <g transform={`translate(${440 + intruderProg * 120}, 220)`}>
        <Hooded color="#d98a8a" />
        <text
          x="22"
          y="80"
          textAnchor="middle"
          className="fill-paper-400"
          style={{ font: "10px JetBrains Mono" }}
        >
          intruder
        </text>
      </g>

      {/* Câmara */}
      <g transform="translate(640, 100)">
        <Camera scanning={scanActive} />
        <text
          x="30"
          y="68"
          textAnchor="middle"
          className="fill-paper-300"
          style={{ font: "10px JetBrains Mono" }}
        >
          cam-01
        </text>
      </g>

      {/* Cone do scan */}
      {scanActive && (
        <g opacity="0.7">
          <motion.path
            d={`M 670 130 L 600 290 L 740 290 Z`}
            fill="url(#scanGlow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <line
            x1="670"
            y1="130"
            x2="600"
            y2="290"
            stroke="#8aae8a"
            strokeOpacity="0.5"
          />
          <line
            x1="670"
            y1="130"
            x2="740"
            y2="290"
            stroke="#8aae8a"
            strokeOpacity="0.5"
          />
        </g>
      )}

      {/* Porta */}
      <g transform="translate(680, 320)">
        <rect
          x="0"
          y="0"
          width="60"
          height="100"
          fill="none"
          stroke="#cfc6b1"
          strokeWidth="2"
        />
        <rect x="0" y="0" width="60" height="100" fill="#f7f3ec" />
        <circle
          cx="50"
          cy="50"
          r="3"
          fill={denyFlash ? "#d98a8a" : "#cfc6b1"}
        />
        {denyFlash && (
          <motion.rect
            x="-4"
            y="-4"
            width="68"
            height="108"
            fill="none"
            stroke="#d98a8a"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        )}
        <text
          x="30"
          y="118"
          textAnchor="middle"
          className={denyFlash ? "fill-signal-red" : "fill-paper-400"}
          style={{ font: "600 10px JetBrains Mono", letterSpacing: "0.15em" }}
        >
          {denyFlash ? (lang === "en" ? "DENIED" : "NEGADO") : "DOOR"}
        </text>
      </g>

      {/* Detector RNAAPIA */}
      <g transform="translate(560, 410)">
        <DetectorBadge
          label="RNAAPIA"
          sublabel="ArcFace"
          active={scanActive}
          verdict={denyFlash ? "denied" : null}
        />
      </g>
    </svg>
  );
}

/* ───────────────────────────── Building blocks ───────────────────────────── */

function Hooded({ color = "#d98a8a" }) {
  return (
    <g>
      <circle cx="22" cy="20" r="14" fill="#efe9dc" stroke={color} />
      <path
        d="M2 60 Q22 30 42 60 L42 70 L2 70 Z"
        fill="#efe9dc"
        stroke={color}
      />
    </g>
  );
}

function Endpoint({ compromised }) {
  return (
    <g>
      <rect
        x="0"
        y="0"
        width="80"
        height="60"
        fill="#ffffff"
        stroke={compromised ? "#d98a8a" : "#cfc6b1"}
        strokeWidth="1.5"
      />
      <rect x="6" y="6" width="68" height="40" fill="#f7f3ec" />
      <rect x="32" y="50" width="16" height="6" fill="#cfc6b1" />
      {compromised && (
        <>
          <motion.rect
            x="6"
            y="6"
            width="68"
            height="40"
            fill="#d98a8a"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.28, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <text
            x="40"
            y="32"
            textAnchor="middle"
            className="fill-signal-red"
            style={{ font: "700 11px JetBrains Mono" }}
          >
            !
          </text>
        </>
      )}
    </g>
  );
}

function Server({ alert }) {
  return (
    <g>
      <rect
        x="0"
        y="0"
        width="60"
        height="50"
        fill="#ffffff"
        stroke={alert ? "#e8c08a" : "#cfc6b1"}
        strokeWidth="1.5"
      />
      {[8, 20, 32].map((y) => (
        <g key={y}>
          <line x1="6" y1={y} x2="36" y2={y} stroke="#cfc6b1" />
          <circle cx="50" cy={y} r="2" fill={alert ? "#e8c08a" : "#cfc6b1"} />
        </g>
      ))}
    </g>
  );
}

function Camera({ scanning }) {
  return (
    <g>
      <rect
        x="0"
        y="0"
        width="60"
        height="40"
        fill="#ffffff"
        stroke={scanning ? "#8aae8a" : "#cfc6b1"}
        strokeWidth="1.5"
      />
      <circle cx="30" cy="20" r="10" fill="#f7f3ec" stroke="#cfc6b1" />
      <circle cx="30" cy="20" r="4" fill={scanning ? "#8aae8a" : "#cfc6b1"} />
      {scanning && (
        <motion.circle
          cx="30"
          cy="20"
          r="6"
          fill="none"
          stroke="#8aae8a"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: [0.8, 0], scale: [1, 2] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      )}
    </g>
  );
}

function Wire({ from, to, progress, color, dashed }) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#cfc6b1"
        strokeWidth="1"
        strokeDasharray={dashed ? "3 4" : undefined}
      />
      {progress > 0 && (
        <line
          x1={x1}
          y1={y1}
          x2={x1 + (x2 - x1) * progress}
          y2={y1 + (y2 - y1) * progress}
          stroke={color}
          strokeWidth="1.8"
        />
      )}
    </g>
  );
}

function LogStream({ t }) {
  const dots = [];
  for (let i = 0; i < 8; i++) {
    const start = 4 + i * 0.5;
    const local = (t - start) / 1.5;
    if (local <= 0 || local >= 1) continue;
    const x = 250 + (130 - 250) * local + 70;
    const y = 240 + (380 - 240) * local;
    dots.push(
      <rect
        key={i}
        x={x - 2}
        y={y - 2}
        width="4"
        height="4"
        fill="#8aae8a"
        opacity={1 - local}
      />,
    );
  }
  return <g>{dots}</g>;
}

function DetectorBadge({ label, sublabel, active, verdict }) {
  const color =
    verdict === "malicious" || verdict === "denied"
      ? "#d98a8a"
      : active
        ? "#8aae8a"
        : "#cfc6b1";
  return (
    <g>
      <rect
        x="0"
        y="0"
        width="200"
        height="56"
        rx="10"
        fill="#ffffff"
        stroke={color}
        strokeWidth="1.5"
      />
      <text
        x="12"
        y="22"
        className="fill-paper-200"
        style={{ font: "600 11px JetBrains Mono", letterSpacing: "0.2em" }}
      >
        {label}
      </text>
      <text
        x="12"
        y="40"
        className="fill-paper-400"
        style={{ font: "10px JetBrains Mono" }}
      >
        {sublabel}
      </text>
      <circle cx="180" cy="28" r="6" fill={color}>
        {active && (
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur="1s"
            repeatCount="indefinite"
          />
        )}
      </circle>
      {verdict && (
        <text
          x="180"
          y="50"
          textAnchor="middle"
          className="fill-signal-red"
          style={{ font: "700 8px JetBrains Mono", letterSpacing: "0.2em" }}
        >
          {verdict === "malicious" ? "ALERT" : "DENY"}
        </text>
      )}
    </g>
  );
}

function ActLabel({ act }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={act.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="absolute left-4 bottom-4 right-4 flex items-center gap-3 pointer-events-none"
      >
        <span className="font-mono text-[0.7rem] text-phosphor tabular-nums">
          ACT {String(act.id).padStart(2, "0")}
        </span>
        <span className="block w-6 h-px bg-phosphor/60" />
        <span className="font-mono text-[0.7rem] text-paper-200 truncate">
          {act.label}
        </span>
      </motion.div>
    </AnimatePresence>
  );
}

/* ───────────────────────────── Side panels ───────────────────────────── */

function LogPanel({ time, lang }) {
  const visible = useMemo(() => LOG_LINES.filter((l) => time >= l.t), [time]);
  return (
    <div className="forensic-card p-4 flex-1 min-h-[200px] overflow-hidden flex flex-col">
      <div className="eyebrow-muted mb-3">
        {lang === "en" ? "Sysmon stream" : "Stream Sysmon"}
      </div>
      <div className="font-mono text-[0.7rem] text-paper-300 leading-relaxed space-y-1 overflow-hidden">
        <AnimatePresence initial={false}>
          {visible.slice(-7).map((l, idx) => (
            <motion.div
              key={`${l.t}-${idx}`}
              initial={{ opacity: 0, x: -8, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.45, ease: EASE }}
              className="truncate"
            >
              <span className="text-phosphor mr-2 tabular-nums">
                [{l.t.toFixed(1)}]
              </span>
              {l.text}
            </motion.div>
          ))}
        </AnimatePresence>
        {visible.length === 0 && (
          <div className="text-paper-500 italic">
            {lang === "en" ? "waiting for events…" : "à espera de eventos…"}
          </div>
        )}
      </div>
    </div>
  );
}

function VerdictPanel({ time, lang }) {
  const sentinel = time >= 11;
  const arc = time >= 19.5;
  return (
    <div className="forensic-card p-4 min-h-[200px]">
      <div className="eyebrow-muted mb-3">
        {lang === "en" ? "Verdicts" : "Veredictos"}
      </div>

      <Verdict
        title="LNIAGIA · cyber-anomaly + DualSentinel"
        active={sentinel}
        label={
          sentinel ? "MALICIOUS" : lang === "en" ? "analyzing…" : "a analisar…"
        }
        rationale={
          sentinel
            ? lang === "en"
              ? "Lateral SMB + LSASS access + C2 DNS — T1021.002 + T1003.001"
              : "SMB lateral + acesso LSASS + DNS C2 — T1021.002 + T1003.001"
            : null
        }
        bad={sentinel}
      />

      <div className="my-3 h-px bg-ink-600" />

      <Verdict
        title="RNAAPIA · ArcFace"
        active={arc}
        label={
          arc
            ? lang === "en"
              ? "NOT IN GALLERY · cos 0.31"
              : "FORA DA GALERIA · cos 0.31"
            : lang === "en"
              ? "idle"
              : "inactivo"
        }
        rationale={
          arc
            ? lang === "en"
              ? "Below threshold 0.75 → access denied"
              : "Abaixo do limiar 0.75 → acesso negado"
            : null
        }
        bad={arc}
      />
    </div>
  );
}

function Verdict({ title, label, rationale, active, bad }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="font-mono text-[0.7rem] text-paper-200">{title}</span>
        <motion.span
          key={label}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className={`font-mono text-[0.65rem] tracking-widest ${
            bad
              ? "text-signal-red"
              : active
                ? "text-phosphor"
                : "text-paper-500"
          }`}
        >
          {label}
        </motion.span>
      </div>
      <AnimatePresence>
        {rationale && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-mono text-[0.65rem] text-paper-400 mt-1 leading-relaxed"
          >
            → {rationale}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────────── Helpers / icons ───────────────────────────── */

function clamp01(n) {
  return Math.max(0, Math.min(1, n));
}

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12">
      <path d="M3 2 L10 6 L3 10 Z" fill="currentColor" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12">
      <rect x="3" y="2" width="2" height="8" fill="currentColor" />
      <rect x="7" y="2" width="2" height="8" fill="currentColor" />
    </svg>
  );
}
function ReplayIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M11 3 A4.5 4.5 0 1 0 12.5 7" />
      <polyline points="11,1 11,3 9,3" />
    </svg>
  );
}

function Reveal({ children, className = "" }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.8, ease: EASE },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
