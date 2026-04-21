import { useLanguage } from '../../context/LanguageContext'

/**
 * Recria a Fig. 4 do artigo: pipeline open-set em tempo real.
 * Fotos enrolled + webcam → ArcFace embeddings → centróides → cosine → decisão
 */
export default function OpenSetDiagram() {
  const { lang } = useLanguage()

  const l = lang === 'pt'
    ? {
        enrolled: 'Fotos registadas',
        enrolledSub: 'pessoas_permitidas/',
        webcam: 'Stream webcam',
        webcamSub: 'tempo real',
        arcface1: 'ArcFace embeddings',
        arcface1Sub: 'original + flip horizontal',
        detect: 'Detecção InsightFace',
        detectSub: 'buffalo_sc · 640×640',
        arcface2: 'ArcFace embedding',
        arcface2Sub: '512-d · L2-normalizado',
        centroid: 'Centróide por identidade',
        centroidSub: 'média · L2-normalize',
        cosine: 'Similaridade cosseno',
        cosineSub: 'vs. todos os centróides',
        threshold: 'score ≥ 0.75',
        yes: 'Sim',
        no: 'Não',
        granted: 'PERMITIDO',
        grantedSub: 'nome + score',
        denied: 'NEGADO',
        deniedSub: 'desconhecido',
      }
    : {
        enrolled: 'Enrolled photos',
        enrolledSub: 'authorized_people/',
        webcam: 'Webcam stream',
        webcamSub: 'real-time',
        arcface1: 'ArcFace embeddings',
        arcface1Sub: 'original + horizontal flip',
        detect: 'InsightFace detection',
        detectSub: 'buffalo_sc · 640×640',
        arcface2: 'ArcFace embedding',
        arcface2Sub: '512-d · L2-normalized',
        centroid: 'Centroid per identity',
        centroidSub: 'mean · L2-normalize',
        cosine: 'Cosine similarity',
        cosineSub: 'vs. all centroids',
        threshold: 'score ≥ 0.75',
        yes: 'Yes',
        no: 'No',
        granted: 'GRANTED',
        grantedSub: 'name + score',
        denied: 'DENIED',
        deniedSub: 'unknown',
      }

  return (
    <svg
      viewBox="0 0 900 680"
      className="w-full h-auto max-h-[680px]"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Open-set face recognition pipeline"
    >
      <defs>
        <marker id="arrow-p2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#8aae8a" />
        </marker>
      </defs>

      {/* Coluna esquerda: fotos enrolled → centróides */}
      <Block x={70} y={20} w={260} h={56} title={l.enrolled} subtitle={l.enrolledSub} tone="neutral" />
      <Conn x1={200} y1={76} x2={200} y2={116} />
      <Block x={70} y={116} w={260} h={56} title={l.arcface1} subtitle={l.arcface1Sub} tone="phosphor" />
      <Conn x1={200} y1={172} x2={200} y2={212} />
      <Block x={70} y={212} w={260} h={56} title={l.centroid} subtitle={l.centroidSub} tone="phosphor" />

      {/* Coluna direita: webcam → embedding */}
      <Block x={570} y={20} w={260} h={56} title={l.webcam} subtitle={l.webcamSub} tone="neutral" />
      <Conn x1={700} y1={76} x2={700} y2={116} />
      <Block x={570} y={116} w={260} h={56} title={l.detect} subtitle={l.detectSub} tone="neutral" />
      <Conn x1={700} y1={172} x2={700} y2={212} />
      <Block x={570} y={212} w={260} h={56} title={l.arcface2} subtitle={l.arcface2Sub} tone="phosphor" />

      {/* Convergência para o cosine */}
      <path d="M 200 268 Q 200 320 330 350" fill="none" stroke="#8aae8a" strokeOpacity="0.6" strokeWidth="1" markerEnd="url(#arrow-p2)" />
      <path d="M 700 268 Q 700 320 570 350" fill="none" stroke="#8aae8a" strokeOpacity="0.6" strokeWidth="1" markerEnd="url(#arrow-p2)" />

      {/* Cosine similarity — o coração */}
      <g>
        <rect x={330} y={336} width={240} height={72} fill="#eef5e6" stroke="#8aae8a" strokeWidth="1.5" />
        <text x={450} y={366} textAnchor="middle" fontSize="14" fill="#0891b2" className="font-sans" fontWeight="500">
          {l.cosine}
        </text>
        <text x={450} y={385} textAnchor="middle" fontSize="10" fill="#c9c3b3" className="font-mono" letterSpacing="0.5">
          {l.cosineSub}
        </text>
        <text x={450} y={399} textAnchor="middle" fontSize="10" fill="#8aae8a" className="font-mono" letterSpacing="0.5">
          {l.threshold}
        </text>
      </g>

      {/* Branches: sim / não */}
      <path d="M 400 408 Q 400 460 280 470" fill="none" stroke="#40d9a4" strokeOpacity="0.7" strokeWidth="1.2" markerEnd="url(#arrow-p2)" />
      <text x={280} y={450} fontSize="10" fill="#40d9a4" className="font-mono" letterSpacing="1.5">
        {l.yes.toUpperCase()}
      </text>

      <path d="M 500 408 Q 500 460 620 470" fill="none" stroke="#d98a8a" strokeOpacity="0.7" strokeWidth="1.2" markerEnd="url(#arrow-p2)" />
      <text x={580} y={450} fontSize="10" fill="#d98a8a" className="font-mono" letterSpacing="1.5">
        {l.no.toUpperCase()}
      </text>

      {/* Resultado: PERMITIDO */}
      <g>
        <rect x={130} y={485} width={260} height={62} fill="none" stroke="#40d9a4" strokeWidth="1.5" />
        <rect x={130} y={485} width={5} height={62} fill="#40d9a4" />
        <text x={260} y={515} textAnchor="middle" fontSize="16" fill="#40d9a4" className="font-mono" letterSpacing="3" fontWeight="500">
          {l.granted}
        </text>
        <text x={260} y={533} textAnchor="middle" fontSize="10" fill="#40d9a4" className="font-mono" opacity="0.7">
          {l.grantedSub}
        </text>
      </g>

      {/* Resultado: NEGADO */}
      <g>
        <rect x={510} y={485} width={260} height={62} fill="none" stroke="#d98a8a" strokeWidth="1.5" />
        <rect x={510} y={485} width={5} height={62} fill="#d98a8a" />
        <text x={640} y={515} textAnchor="middle" fontSize="16" fill="#d98a8a" className="font-mono" letterSpacing="3" fontWeight="500">
          {l.denied}
        </text>
        <text x={640} y={533} textAnchor="middle" fontSize="10" fill="#d98a8a" className="font-mono" opacity="0.7">
          {l.deniedSub}
        </text>
      </g>
    </svg>
  )

  function Block({ x, y, w, h, title, subtitle, tone }) {
    const colors = {
      neutral: { bg: '#ffffff', border: '#cfc6b1', title: '#1f1d1a', sub: '#5a5648' },
      phosphor: { bg: '#ecfeff', border: '#06b6d4', title: '#0891b2', sub: '#4f4a40' },
    }
    const c = colors[tone]
    return (
      <g>
        <rect x={x} y={y} width={w} height={h} fill={c.bg} stroke={c.border} strokeWidth="1" />
        <text x={x + w / 2} y={y + h / 2 - 2} textAnchor="middle" fontSize="12" fill={c.title} className="font-sans" fontWeight="500">
          {title}
        </text>
        <text x={x + w / 2} y={y + h / 2 + 14} textAnchor="middle" fontSize="10" fill={c.sub} className="font-mono" letterSpacing="0.5">
          {subtitle}
        </text>
      </g>
    )
  }

  function Conn({ x1, y1, x2, y2 }) {
    return (
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#8aae8a" strokeOpacity="0.6" strokeWidth="1" markerEnd="url(#arrow-p2)" />
    )
  }
}
