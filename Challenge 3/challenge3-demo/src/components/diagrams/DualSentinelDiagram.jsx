import { useLanguage } from '../../context/LanguageContext'

/**
 * Recria a Fig. 1/2 do artigo: pipeline Dual Sentinel.
 * Logs → Parser → ATT&CK tagger → SLM Analyst → LLM Judge → Verdict
 */
export default function DualSentinelDiagram() {
  const { lang } = useLanguage()

  const labels = lang === 'pt'
    ? {
        input: 'Logs Sysmon / ETW',
        inputSub: 'CSV · EVTX',
        parse: 'Parse + windowing',
        parseSub: '60s · 17 features',
        tagger: 'Heuristic Scorer',
        taggerSub: 'ATT&CK + smart feats + baseline + KB hybrid',
        evidence: 'Evidence Pack',
        evidenceSub: 'regras · features · hits KB (Chroma+BM25 RRF)',
        slm: 'SLM Analyst',
        slmSub: 'Phi-3 Medium · 14B · JSON-only',
        preFilter: 'Pré-filtro determinístico',
        preFilterSub: '−35% das janelas · zero sinais',
        hypothesis: 'Hipótese + pre-score',
        llm: 'LLM Judge',
        llmSub: 'Llama 3.2 · cita evidência',
        verdict: 'Veredicto final',
        verdictSub: 'score · técnicas · unsupported_claims',
        malicious: 'Malicious',
        suspicious: 'Suspicious',
        normal: 'Normal',
      }
    : {
        input: 'Sysmon / ETW logs',
        inputSub: 'CSV · EVTX',
        parse: 'Parse + windowing',
        parseSub: '60s · 17 features',
        tagger: 'Heuristic Scorer',
        taggerSub: 'ATT&CK + smart feats + baseline + KB hybrid',
        evidence: 'Evidence Pack',
        evidenceSub: 'rules · features · KB hits (Chroma+BM25 RRF)',
        slm: 'SLM Analyst',
        slmSub: 'Phi-3 Medium · 14B · JSON-only',
        preFilter: 'Deterministic pre-filter',
        preFilterSub: '−35% windows · zero signals',
        hypothesis: 'Hypothesis + pre-score',
        llm: 'LLM Judge',
        llmSub: 'Llama 3.2 · cites evidence',
        verdict: 'Final verdict',
        verdictSub: 'score · techniques · unsupported_claims',
        malicious: 'Malicious',
        suspicious: 'Suspicious',
        normal: 'Normal',
      }

  return (
    <svg
      viewBox="0 0 900 720"
      className="w-full h-auto max-h-[720px]"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Dual Sentinel pipeline"
    >
      <defs>
        <marker
          id="arrow-phosphor"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#8aae8a" />
        </marker>
        <marker
          id="arrow-dim"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#5a5648" />
        </marker>
      </defs>

      {/* Linha vertical central */}
      <line x1="450" y1="20" x2="450" y2="640" stroke="#cfc6b1" strokeWidth="1" strokeDasharray="3 5" />

      {/* Bloco 1: Input */}
      <Block x={300} y={20} w={300} h={54} title={labels.input} subtitle={labels.inputSub} tone="neutral" />
      <Connector x1={450} y1={74} x2={450} y2={94} />

      {/* Bloco 2: Parse */}
      <Block x={300} y={94} w={300} h={54} title={labels.parse} subtitle={labels.parseSub} tone="neutral" />
      <Connector x1={450} y1={148} x2={450} y2={168} />

      {/* Bloco 3: Tagger */}
      <Block x={300} y={168} w={300} h={54} title={labels.tagger} subtitle={labels.taggerSub} tone="neutral" />
      <Connector x1={450} y1={222} x2={450} y2={242} />

      {/* Bloco 4: Evidence Pack (destacado - phosphor) */}
      <Block x={280} y={242} w={340} h={60} title={labels.evidence} subtitle={labels.evidenceSub} tone="phosphor" />

      {/* Linha Evidence → SLM e → Judge (ambas recebem) */}
      <Connector x1={450} y1={302} x2={450} y2={332} />

      {/* Branch: Pré-filtro esquerda */}
      <path
        d="M 300 272 Q 120 272 120 382"
        fill="none"
        stroke="#5a5648"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <Block x={20} y={356} w={200} h={54} title={labels.preFilter} subtitle={labels.preFilterSub} tone="muted" small />
      <path
        d="M 120 410 Q 120 560 430 560"
        fill="none"
        stroke="#5a5648"
        strokeWidth="1"
        strokeDasharray="4 4"
      />

      {/* Bloco 5: SLM Analyst */}
      <Block x={280} y={332} w={340} h={62} title={labels.slm} subtitle={labels.slmSub} tone="analyst" />
      <Connector x1={450} y1={394} x2={450} y2={430} />

      {/* Etiqueta: Hypothesis */}
      <g>
        <rect x={340} y={402} width={220} height={22} fill="#f0f7ed" stroke="#8aae8a" strokeOpacity="0.4" />
        <text x={450} y={417} textAnchor="middle" className="font-mono" fontSize="10" fill="#8aae8a" letterSpacing="1">
          {labels.hypothesis}
        </text>
      </g>

      {/* Evidence re-feed arrow (curva à direita) */}
      <path
        d="M 620 272 Q 800 272 800 461 Q 800 475 620 475"
        fill="none"
        stroke="#5a5648"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <text x={820} y={372} className="font-mono" fontSize="9" fill="#5a5648" letterSpacing="1">
        evidence
      </text>
      <text x={820} y={386} className="font-mono" fontSize="9" fill="#5a5648" letterSpacing="1">
        re-sent
      </text>

      {/* Bloco 6: LLM Judge */}
      <Block x={280} y={430} w={340} h={62} title={labels.llm} subtitle={labels.llmSub} tone="judge" />
      <Connector x1={450} y1={492} x2={450} y2={528} />

      {/* Bloco 7: Final Verdict */}
      <Block x={300} y={528} w={300} h={54} title={labels.verdict} subtitle={labels.verdictSub} tone="phosphor" />

      {/* Branches finais: Malicious / Suspicious / Normal */}
      <Connector x1={380} y1={582} x2={220} y2={630} />
      <Connector x1={450} y1={582} x2={450} y2={630} />
      <Connector x1={520} y1={582} x2={680} y2={630} />

      <VerdictChip x={140} y={630} label={labels.malicious} tone="red" />
      <VerdictChip x={390} y={630} label={labels.suspicious} tone="amber" />
      <VerdictChip x={610} y={630} label={labels.normal} tone="mint" />
    </svg>
  )
}

function Block({ x, y, w, h, title, subtitle, tone = 'neutral', small = false }) {
  const colors = {
    neutral: { bg: '#ffffff', border: '#cfc6b1', title: '#1f1d1a', sub: '#5a5648' },
    phosphor: { bg: '#ecfeff', border: '#06b6d4', title: '#0891b2', sub: '#4f4a40' },
    analyst: { bg: '#0f1512', border: '#40d9a4', title: '#40d9a4', sub: '#c9c3b3' },
    judge: { bg: '#15110a', border: '#e8c08a', title: '#e8c08a', sub: '#c9c3b3' },
    muted: { bg: '#0e1012', border: '#cfc6b1', title: '#5a5648', sub: '#5a5648' },
  }
  const c = colors[tone]
  const titleSize = small ? 11 : 13
  const subSize = small ? 9 : 10

  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={c.bg} stroke={c.border} strokeWidth="1" />
      <text
        x={x + w / 2}
        y={y + (subtitle ? h / 2 - 2 : h / 2 + 4)}
        textAnchor="middle"
        fontSize={titleSize}
        fill={c.title}
        className="font-sans"
        fontWeight="500"
      >
        {title}
      </text>
      {subtitle && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 14}
          textAnchor="middle"
          fontSize={subSize}
          fill={c.sub}
          className="font-mono"
          letterSpacing="0.5"
        >
          {subtitle}
        </text>
      )}
    </g>
  )
}

function Connector({ x1, y1, x2, y2 }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#8aae8a"
      strokeOpacity="0.6"
      strokeWidth="1"
      markerEnd="url(#arrow-phosphor)"
    />
  )
}

function VerdictChip({ x, y, label, tone }) {
  const colors = {
    red: '#d98a8a',
    amber: '#e8c08a',
    mint: '#40d9a4',
  }
  const color = colors[tone]
  const w = 160
  const h = 38
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={color} strokeWidth="1.5" />
      <rect x={x} y={y} width={4} height={h} fill={color} />
      <text
        x={x + w / 2 + 2}
        y={y + h / 2 + 4}
        textAnchor="middle"
        fontSize="11"
        fill={color}
        className="font-mono"
        letterSpacing="1.5"
      >
        {label.toUpperCase()}
      </text>
    </g>
  )
}
