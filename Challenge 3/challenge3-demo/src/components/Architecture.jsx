import Section from './Section'
import SystemOverviewDiagram from './diagrams/SystemOverviewDiagram'
import { useLanguage } from '../context/LanguageContext'

export default function Architecture() {
  const { t } = useLanguage()
  const m1 = t('architecture.module1')
  const m2 = t('architecture.module2')
  const m3 = t('architecture.module3')

  return (
    <Section
      id="architecture"
      eyebrow={t('architecture.eyebrow')}
      title={t('architecture.title')}
      lead={t('architecture.lead')}
    >
      {/* Diagrama em destaque */}
      <div className="forensic-card p-6 md:p-12 mb-16">
        <SystemOverviewDiagram />
      </div>

      {/* Três cartões de pilar */}
      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        <ModuleCard data={m1} accent="phosphor" />
        <ModuleCard data={m2} accent="amber" />
        <ModuleCard data={m3} accent="rose" />
      </div>
    </Section>
  )
}

function ModuleCard({ data, accent }) {
  const accentClasses = {
    phosphor: 'text-phosphor border-phosphor/40',
    amber: 'text-signal-amber border-signal-amber/40',
    rose: 'text-signal-red border-signal-red/40',
  }

  return (
    <div className="forensic-card p-8 md:p-10">
      <div className="flex items-baseline justify-between mb-8">
        <span className={`font-mono text-[0.7rem] uppercase tracking-widest ${accentClasses[accent]}`}>
          {data.tag}
        </span>
        <span className="font-display font-light text-6xl text-paper-500/40 tabular-nums leading-none">
          {data.number}
        </span>
      </div>

      <h3 className="font-display font-light text-3xl md:text-4xl text-paper-100 mb-6 leading-tight text-balance">
        {data.title}
      </h3>

      <p className="text-paper-300 text-base leading-relaxed mb-10 text-pretty">
        {data.desc}
      </p>

      {/* Stack chips */}
      <div className="flex flex-wrap gap-2 pt-6 border-t border-ink-600">
        {data.stack.map((item) => (
          <span
            key={item}
            className="font-mono text-[0.7rem] uppercase tracking-widest px-2.5 py-1 border border-ink-600 text-paper-300"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
