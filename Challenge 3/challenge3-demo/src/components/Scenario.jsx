import Section from './Section'
import { useLanguage } from '../context/LanguageContext'

export default function Scenario() {
  const { t } = useLanguage()
  const walls = t('scenario.walls')

  return (
    <Section
      id="scenario"
      eyebrow={t('scenario.eyebrow')}
      title={t('scenario.title')}
      lead={t('scenario.lead')}
    >
      {/* Etiqueta a ligar o texto às duas paredes */}
      <div className="flex items-center gap-3 mb-8">
        <span className="w-6 h-px bg-paper-400" />
        <span className="eyebrow-muted">{t('scenario.bridgeLabel')}</span>
      </div>
      <p className="font-display font-light text-2xl md:text-4xl text-paper-100 max-w-4xl text-balance mb-16 leading-[1.15]">
        {t('scenario.bridge')}
      </p>

      {/* Duas paredes lado a lado */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
        {walls.map((wall, i) => (
          <div key={i} className="forensic-card p-8 md:p-10 group">
            <div className="flex items-center justify-between mb-8">
              <span className="term-tag">{wall.tag}</span>
              <span className="font-mono text-[0.7rem] text-paper-500 tabular-nums">0{i + 1} / 02</span>
            </div>
            <h3 className="font-display font-light text-3xl md:text-4xl text-paper-100 mb-5 leading-tight">
              {wall.title}
            </h3>
            <p className="text-paper-300 text-lg leading-relaxed text-pretty">{wall.body}</p>

            {/* Linha decorativa animada no hover */}
            <div className="mt-8 h-px bg-ink-600 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-0 bg-phosphor transition-all duration-700 group-hover:w-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Nota final */}
      <div className="max-w-3xl ml-auto">
        <p className="font-mono text-sm text-paper-400 italic leading-relaxed border-l-2 border-phosphor/40 pl-6">
          {t('scenario.note')}
        </p>
      </div>
    </Section>
  )
}
