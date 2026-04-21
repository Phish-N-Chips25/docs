import Section from './Section'
import CountUp from './CountUp'
import { useLanguage } from '../context/LanguageContext'

export default function Results() {
  const { t } = useLanguage()
  const metrics = t('results.metrics')
  const sentinel = t('results.sentinelMetrics')
  const tableClosed = t('results.tableClosed')
  const tableOpen = t('results.tableOpen')

  return (
    <Section
      id="results"
      eyebrow={t('results.eyebrow')}
      title={t('results.title')}
      lead={t('results.lead')}
    >
      {/* Hero metrics */}
      <div className="mb-10">
        <p className="text-paper-300 text-lg mb-10 max-w-3xl">{t('results.faceSubtitle')}</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-ink-600">
          {metrics.map((m, i) => (
            <MetricCell key={i} metric={m} last={i === metrics.length - 1} />
          ))}
        </div>
      </div>

      {/* Tabela A — Classificação closed-set */}
      <ResultsTable
        caption={t('results.tableClosedCaption')}
        note={t('results.tableClosedNote')}
        headers={tableClosed.headers}
        rows={tableClosed.rows}
        highlightLast={false}
      />

      {/* Tabela B — Verificação biométrica open-set */}
      <ResultsTable
        caption={t('results.tableOpenCaption')}
        note={t('results.tableOpenNote')}
        headers={tableOpen.headers}
        rows={tableOpen.rows}
        highlightLast
        isFinal={(row) => row[0].includes('★') || row[0].includes('ArcFace')}
      />

      {/* Pipeline numbers */}
      <div>
        <h3 className="eyebrow-muted mb-3">{t('results.sentinelTitle')}</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-ink-600">
          {sentinel.map((m, i) => (
            <div key={i} className="p-6 md:p-8 border-r border-ink-600 last:border-r-0">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-display font-light text-4xl md:text-5xl text-paper-100 tabular-nums leading-none">
                  <CountUp to={parseFloat(m.value) || 0} decimals={m.value.includes('.') ? 1 : 0} />
                </span>
                <span className="font-mono text-sm text-phosphor">{m.unit}</span>
              </div>
              <p className="font-mono text-xs text-paper-400 uppercase tracking-widest leading-snug">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function ResultsTable({ caption, note, headers, rows, highlightLast = false, isFinal = () => false }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-4 h-px bg-phosphor" />
        <span className="eyebrow">{caption}</span>
      </div>
      {note && (
        <p className="font-mono text-xs text-paper-400 mb-4 leading-relaxed max-w-3xl">{note}</p>
      )}
      <div className="overflow-x-auto border border-ink-600">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-ink-800 border-b border-ink-700">
              {headers.map((h, i) => (
                <th key={i} className="p-4 font-mono text-[0.7rem] uppercase tracking-widest text-paper-400">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const final = isFinal(row)
              return (
                <tr
                  key={i}
                  className={`border-b border-ink-600 last:border-b-0 ${final ? 'bg-phosphor/5' : ''}`}
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`p-4 ${
                        j === 0
                          ? `font-sans ${final ? 'text-phosphor-dark font-medium' : 'text-paper-100'}`
                          : 'font-mono text-sm tabular-nums text-paper-300'
                      } ${
                        highlightLast && j === row.length - 1
                          ? final ? 'text-paper-400 italic' : 'text-paper-400 italic'
                          : ''
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function MetricCell({ metric, last }) {
  const accentMap = {
    accuracy: 'text-phosphor',
    biometric: metric.value === '0.00' ? 'text-phosphor' : 'text-signal-amber',
    config: 'text-paper-100',
  }
  const accent = accentMap[metric.kind] || 'text-paper-100'

  return (
    <div className={`p-6 md:p-10 border-ink-600 ${!last ? 'border-r border-b lg:border-b-0' : ''} ${metric.kind === 'biometric' && metric.value !== '0.00' ? 'bg-signal-amber/5' : ''} ${metric.value === '0.00' ? 'bg-phosphor/5' : ''}`}>
      <div className="flex items-baseline gap-2 mb-4">
        <span className={`font-display font-light text-5xl md:text-7xl tabular-nums leading-none ${accent}`}>
          <CountUp to={parseFloat(metric.value) || 0} decimals={metric.value.includes('.') ? 2 : 0} />
        </span>
        {metric.unit && (
          <span className={`font-mono text-xl ${accent} opacity-70`}>{metric.unit}</span>
        )}
      </div>
      <p className="font-mono text-xs text-paper-400 uppercase tracking-widest leading-snug">
        {metric.label}
      </p>
    </div>
  )
}
