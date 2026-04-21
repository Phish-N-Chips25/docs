import Section from './Section'
import DualSentinelDiagram from './diagrams/DualSentinelDiagram'
import { useLanguage } from '../context/LanguageContext'

export default function AnomalyDetection() {
  const { t } = useLanguage()
  const mitigations = t('anomaly.mitigations')
  const prefilter = t('anomaly.prefilterStat')
  const compareHeaders = t('anomaly.compareHeaders')
  const compareRows = t('anomaly.compareRows')
  const highlights = t('anomaly.approachBHighlights')

  return (
    <Section
      id="anomaly"
      eyebrow={t('anomaly.eyebrow')}
      title={t('anomaly.title')}
      lead={t('anomaly.lead')}
    >
      {/* ─── Tabela comparativa: dois pipelines paralelos ──────────────── */}
      <div className="forensic-card p-5 md:p-8 mb-16">
        <div className="mb-6">
          <h3 className="font-display font-light text-2xl md:text-3xl text-paper-100 mb-3 leading-tight">
            {t('anomaly.compareTitle')}
          </h3>
          <p className="text-paper-300 leading-relaxed max-w-3xl">
            {t('anomaly.compareSubtitle')}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-ink-600">
                {compareHeaders.map((h, i) => (
                  <th
                    key={i}
                    className={`text-left py-3 px-3 font-mono text-xs uppercase tracking-wider ${
                      i === 0
                        ? 'text-paper-400'
                        : i === 1
                          ? 'text-paper-100'
                          : 'text-phosphor-dark'
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row, i) => (
                <tr key={i} className="border-b border-ink-600/50 last:border-0">
                  <td className="py-3 px-3 text-paper-400 font-mono text-xs uppercase tracking-wider align-top">
                    {row[0]}
                  </td>
                  <td className="py-3 px-3 text-paper-200 leading-snug align-top">{row[1]}</td>
                  <td className="py-3 px-3 text-phosphor-dark/90 leading-snug align-top">
                    {row[2]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── Abordagem A — cyber-anomaly-detection ─────────────────────── */}
      <div className="mb-20">
        <div className="mb-10">
          <span className="term-tag mb-5 inline-block">{t('anomaly.approachATag')}</span>
          <h3 className="font-display font-light text-3xl md:text-5xl text-paper-100 mb-4 leading-tight text-balance">
            {t('anomaly.approachATitle')}
          </h3>
          <p className="text-paper-300 text-lg max-w-3xl leading-relaxed">
            {t('anomaly.approachALead')}
          </p>
        </div>

        {/* Camadas 01 e 02 lado-a-lado */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-10">
          {/* Camada 01 — Sequências */}
          <div className="forensic-card p-5 md:p-7 h-full flex flex-col">
            <span className="term-tag self-start mb-6 !border-paper-400/40 !text-paper-400">
              {t('anomaly.classicalTag')}
            </span>
            <h4 className="font-display font-light text-2xl md:text-3xl text-paper-100 mb-5 leading-tight">
              {t('anomaly.classicalTitle')}
            </h4>
            <p className="text-paper-300 leading-relaxed mb-8">{t('anomaly.classicalBody')}</p>

            <div className="mt-auto grid grid-cols-2 gap-4 pt-6 border-t border-ink-600">
              <div>
                <div className="eyebrow-muted mb-3">+</div>
                <ul className="space-y-1.5">
                  {t('anomaly.classicalPros').map((p, i) => (
                    <li key={i} className="text-paper-300 text-sm leading-snug">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="eyebrow-muted mb-3 !text-signal-red">−</div>
                <ul className="space-y-1.5">
                  {t('anomaly.classicalCons').map((c, i) => (
                    <li key={i} className="text-paper-300 text-sm leading-snug">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Camada 02 — Eventos */}
          <div className="forensic-card p-5 md:p-7 h-full flex flex-col">
            <span className="term-tag self-start mb-6 !border-paper-400/40 !text-paper-400">
              {t('anomaly.sentinelTag')}
            </span>
            <h4 className="font-display font-light text-2xl md:text-3xl text-paper-100 mb-5 leading-tight">
              {t('anomaly.sentinelTitle')}
            </h4>
            <p className="text-paper-300 leading-relaxed mb-8">{t('anomaly.sentinelBody')}</p>

            <div className="mt-auto pt-6 border-t border-ink-600">
              <div className="flex items-baseline gap-4">
                <span className="font-display font-light text-5xl md:text-6xl text-phosphor-dark tabular-nums leading-none">
                  {prefilter.value}
                </span>
                <span className="text-paper-300 text-sm leading-tight">{prefilter.label}</span>
              </div>
              <p className="mt-3 font-mono text-xs text-paper-400 leading-relaxed">
                {prefilter.detail}
              </p>
            </div>
          </div>
        </div>

        {/* Camada 03 — RAG/Qwen attribution */}
        <div className="mb-6">
          <h4 className="font-display font-light text-2xl md:text-4xl text-paper-100 mb-4 leading-tight text-balance">
            {t('anomaly.mitigationTitle')}
          </h4>
          <p className="text-paper-300 text-lg max-w-3xl leading-relaxed mb-10">
            {t('anomaly.mitigationLead')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
          {mitigations.map((m) => (
            <div
              key={m.n}
              className="border border-ink-600 p-6 hover:border-phosphor/50 transition-colors group"
            >
              <div className="font-display font-light text-4xl text-phosphor/60 tabular-nums mb-5 leading-none group-hover:text-phosphor transition-colors">
                {m.n}
              </div>
              <h5 className="font-sans font-medium text-paper-100 mb-3 leading-snug">{m.title}</h5>
              <p className="text-paper-400 text-sm leading-relaxed">{m.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Abordagem B — DualSentinel ────────────────────────────────── */}
      <div>
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="term-tag">{t('anomaly.approachBTag')}</span>
            <span className="w-2 h-2 bg-phosphor animate-pulse-dim rounded-full" />
          </div>
          <h3 className="font-display font-light text-3xl md:text-5xl text-phosphor-dark mb-4 leading-tight text-balance">
            {t('anomaly.approachBTitle')}
          </h3>
          <p className="text-paper-300 text-lg max-w-3xl leading-relaxed">
            {t('anomaly.approachBLead')}
          </p>
        </div>

        {/* Pipeline diagram */}
        <div className="forensic-card p-5 md:p-8 mb-8 border-phosphor/40 bg-phosphor/5">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-4 h-px bg-phosphor" />
            <span className="eyebrow">{t('anomaly.approachBPipelineCaption')}</span>
          </div>
          <DualSentinelDiagram />
        </div>

        {/* Highlights */}
        <div className="grid md:grid-cols-3 gap-3">
          {highlights.map((h, i) => (
            <div
              key={i}
              className="border border-phosphor/30 p-6 hover:border-phosphor/70 transition-colors"
            >
              <h5 className="font-sans font-medium text-phosphor-dark mb-3 leading-snug">
                {h.title}
              </h5>
              <p className="text-paper-300 text-sm leading-relaxed">{h.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
