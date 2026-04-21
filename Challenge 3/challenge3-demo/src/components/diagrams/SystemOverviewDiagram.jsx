import { useLanguage } from '../../context/LanguageContext'

/**
 * Visão de alto nível: duas paredes de defesa (digital/físico).
 * Desenho editorial mais que técnico — para a secção Architecture.
 */
export default function SystemOverviewDiagram() {
  const { lang } = useLanguage()

  const l = lang === 'pt'
    ? {
        threat: 'AMEAÇA',
        threatSub: 'cyber-física',
        digital: 'CAMADA DIGITAL',
        digitalSub: 'logs, processos, rede',
        physical: 'CAMADA FÍSICA',
        physicalSub: 'pessoas, acessos, câmaras',
        module1: 'Módulo 01',
        module2: 'Módulo 02',
        m1Name: 'Detecção de anomalias',
        m2Name: 'Reconhecimento facial',
        defended: 'VISIBILIDADE',
        defendedSub: 'sobre ambas as dimensões',
      }
    : {
        threat: 'THREAT',
        threatSub: 'cyber-physical',
        digital: 'DIGITAL LAYER',
        digitalSub: 'logs, processes, network',
        physical: 'PHYSICAL LAYER',
        physicalSub: 'people, access, cameras',
        module1: 'Module 01',
        module2: 'Module 02',
        m1Name: 'Anomaly detection',
        m2Name: 'Face recognition',
        defended: 'VISIBILITY',
        defendedSub: 'across both dimensions',
      }

  return (
    <svg viewBox="0 0 900 480" className="w-full h-auto max-h-[480px]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr-dim" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#5a5648" />
        </marker>
        <linearGradient id="threatGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d98a8a" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#d98a8a" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Ameaça central */}
      <g>
        <rect x={350} y={20} width={200} height={72} fill="url(#threatGrad)" stroke="#d98a8a" strokeWidth="1.5" />
        <text x={450} y={50} textAnchor="middle" fontSize="14" fill="#d98a8a" className="font-mono" letterSpacing="4" fontWeight="500">
          {l.threat}
        </text>
        <text x={450} y={70} textAnchor="middle" fontSize="11" fill="#d98a8a" className="font-mono" opacity="0.7" letterSpacing="1">
          {l.threatSub}
        </text>
      </g>

      {/* Setas de ameaça para ambas as camadas */}
      <line x1={400} y1={92} x2={220} y2={160} stroke="#d98a8a" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3 4" markerEnd="url(#arr-dim)" />
      <line x1={500} y1={92} x2={680} y2={160} stroke="#d98a8a" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3 4" markerEnd="url(#arr-dim)" />

      {/* Camada digital (esquerda) */}
      <g>
        <rect x={70} y={170} width={320} height={76} fill="#ffffff" stroke="#cfc6b1" strokeWidth="1" />
        <text x={86} y={196} fontSize="10" fill="#5a5648" className="font-mono" letterSpacing="2">
          {l.digital}
        </text>
        <text x={86} y={220} fontSize="14" fill="#1f1d1a" className="font-sans" fontWeight="500">
          {l.digitalSub}
        </text>
      </g>

      {/* Camada física (direita) */}
      <g>
        <rect x={510} y={170} width={320} height={76} fill="#ffffff" stroke="#cfc6b1" strokeWidth="1" />
        <text x={526} y={196} fontSize="10" fill="#5a5648" className="font-mono" letterSpacing="2">
          {l.physical}
        </text>
        <text x={526} y={220} fontSize="14" fill="#1f1d1a" className="font-sans" fontWeight="500">
          {l.physicalSub}
        </text>
      </g>

      {/* Conexões para módulos */}
      <line x1={230} y1={246} x2={230} y2={290} stroke="#8aae8a" strokeOpacity="0.5" strokeWidth="1" />
      <line x1={670} y1={246} x2={670} y2={290} stroke="#8aae8a" strokeOpacity="0.5" strokeWidth="1" />

      {/* Módulo 1 */}
      <g>
        <rect x={70} y={290} width={320} height={90} fill="#eef5e6" stroke="#8aae8a" strokeWidth="1" />
        <text x={86} y={314} fontSize="10" fill="#8aae8a" className="font-mono" letterSpacing="2">
          {l.module1}
        </text>
        <text x={86} y={345} fontSize="20" fill="#0891b2" className="font-display" fontWeight="300">
          {l.m1Name}
        </text>
        <text x={86} y={368} fontSize="10" fill="#c9c3b3" className="font-mono" letterSpacing="1">
          LNIAGIA · cyber-anomaly + DualSentinel
        </text>
      </g>

      {/* Módulo 2 */}
      <g>
        <rect x={510} y={290} width={320} height={90} fill="#eef5e6" stroke="#8aae8a" strokeWidth="1" />
        <text x={526} y={314} fontSize="10" fill="#8aae8a" className="font-mono" letterSpacing="2">
          {l.module2}
        </text>
        <text x={526} y={345} fontSize="20" fill="#0891b2" className="font-display" fontWeight="300">
          {l.m2Name}
        </text>
        <text x={526} y={368} fontSize="10" fill="#c9c3b3" className="font-mono" letterSpacing="1">
          RNAAPIA · ArcFace open-set
        </text>
      </g>

      {/* Convergência final: visibilidade */}
      <line x1={230} y1={380} x2={400} y2={430} stroke="#8aae8a" strokeOpacity="0.4" strokeWidth="1" />
      <line x1={670} y1={380} x2={500} y2={430} stroke="#8aae8a" strokeOpacity="0.4" strokeWidth="1" />

      <g>
        <rect x={350} y={430} width={200} height={40} fill="none" stroke="#8aae8a" strokeWidth="1" />
        <text x={450} y={452} textAnchor="middle" fontSize="11" fill="#8aae8a" className="font-mono" letterSpacing="3">
          {l.defended}
        </text>
        <text x={450} y={465} textAnchor="middle" fontSize="9" fill="#5a5648" className="font-mono">
          {l.defendedSub}
        </text>
      </g>
    </svg>
  )
}
