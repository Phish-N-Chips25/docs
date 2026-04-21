import Section from './Section'
import OpenSetDiagram from './diagrams/OpenSetDiagram'
import { useLanguage } from '../context/LanguageContext'

export default function FaceRecognition() {
  const { t } = useLanguage()
  const rows = t('face.comparisonRows')

  return (
    <Section
      id="face"
      eyebrow={t('face.eyebrow')}
      title={t('face.title')}
      lead={t('face.lead')}
    >
      {/* Closed-set vs Open-set — lado a lado */}
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-8">
          <div className="forensic-card p-5 md:p-7">
          <span className="term-tag mb-6 inline-block !border-paper-400/40 !text-paper-400">
            {t('face.closedTag')}
          </span>
          <h3 className="font-display font-light text-2xl md:text-3xl text-paper-100 mb-5 leading-tight">
            {t('face.closedTitle')}
          </h3>
          <p className="text-paper-300 leading-relaxed">{t('face.closedBody')}</p>
        </div>

        <div className="forensic-card p-5 md:p-7 border-phosphor/40 bg-phosphor/5">
          <div className="flex items-center justify-between mb-6">
            <span className="term-tag">{t('face.openTag')}</span>
            <span className="w-2 h-2 bg-phosphor animate-pulse-dim rounded-full" />
          </div>
          <h3 className="font-display font-light text-2xl md:text-3xl text-phosphor-dark mb-5 leading-tight">
            {t('face.openTitle')}
          </h3>
          <p className="text-paper-300 leading-relaxed">{t('face.openBody')}</p>
        </div>
      </div>

      {/* Diagrama open-set */}
      <div className="forensic-card p-5 md:p-8 mb-8">
        <OpenSetDiagram />
      </div>

      {/* Comparison table */}
      <div className="mb-8">
        <h3 className="font-display font-light text-3xl md:text-4xl text-paper-100 mb-6 leading-tight text-balance">
          {t('face.comparisonTitle')}
        </h3>

        <div className="border border-ink-600 overflow-hidden">
          <div className="hidden md:grid grid-cols-12 bg-ink-800 border-b border-ink-700">
            <div className="col-span-3 p-5 eyebrow-muted">Criterion</div>
            <div className="col-span-4 p-5 eyebrow-muted">Closed-set</div>
            <div className="col-span-4 p-5 eyebrow-muted">Open-set</div>
            <div className="col-span-1 p-5 eyebrow-muted text-right">✓</div>
          </div>
          {rows.map((r, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 md:grid-cols-12 border-b border-ink-600 last:border-b-0 ${
                i % 2 === 1 ? 'bg-ink-800/60' : ''
              }`}
            >
              <div className="col-span-3 p-5 font-mono text-xs uppercase tracking-widest text-paper-400">
                {r.k}
              </div>
              <div className={`col-span-4 p-5 text-sm ${r.winner === 'closed' ? 'text-phosphor' : 'text-paper-300'}`}>
                {r.closed}
              </div>
              <div className={`col-span-4 p-5 text-sm ${r.winner === 'open' ? 'text-phosphor' : 'text-paper-300'}`}>
                {r.open}
              </div>
              <div className="col-span-1 p-5 text-right font-mono text-xs text-phosphor">
                {r.winner === 'open' ? 'OPEN' : 'CLOSED'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Demo placeholder for CV video */}
      <div className="forensic-card p-5 md:p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-4 h-px bg-phosphor" />
          <span className="eyebrow">{t('face.demoCaption')}</span>
        </div>
        <div className="aspect-video bg-ink-800 rounded-xl border border-dashed border-ink-700 flex flex-col items-center justify-center p-8 relative overflow-hidden">
          {/* Grid de fundo no placeholder */}
          <div className="absolute inset-0 bg-grid opacity-30" />

          {/* Icon + texto */}
          <svg width="64" height="64" viewBox="0 0 64 64" className="text-paper-500 mb-6 relative">
            <rect x="6" y="10" width="52" height="44" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M 6 44 L 22 34 L 32 40 L 42 30 L 58 42" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
          <p className="font-display font-light text-xl text-paper-300 relative">{t('face.demoPlaceholder')}</p>
          <p className="font-mono text-xs text-paper-500 mt-3 relative">{t('face.demoHint')}</p>

          {/* Para substituir: colocar um <video> aqui:
              <video src="/demos/face-recognition.mp4" controls className="absolute inset-0 w-full h-full object-cover" />
          */}
        </div>
      </div>

      {/* Limitation note */}
      <div className="border-l-2 border-signal-red/60 pl-6 py-3 max-w-3xl">
        <div className="eyebrow-muted !text-signal-red mb-2">{t('face.limitationTitle')}</div>
        <p className="text-paper-300 leading-relaxed">{t('face.limitationBody')}</p>
      </div>
    </Section>
  )
}
