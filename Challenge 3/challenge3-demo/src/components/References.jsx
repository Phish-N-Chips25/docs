import Section from './Section'
import { useLanguage } from '../context/LanguageContext'
import { references } from '../data/references'

export default function References() {
  const { t } = useLanguage()
  const cats = t('references.categories')

  const columns = [
    { key: 'classical', label: cats.classical, items: references.classical },
    { key: 'llm', label: cats.llm, items: references.llm },
    { key: 'vision', label: cats.vision, items: references.vision },
  ]

  return (
    <Section
      id="references"
      eyebrow={t('references.eyebrow')}
      title={t('references.title')}
      lead={t('references.lead')}
    >
      <div className="grid lg:grid-cols-3 gap-10 md:gap-12">
        {columns.map((col) => (
          <div key={col.key}>
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-phosphor/30">
              <span className="w-2 h-2 bg-phosphor" />
              <h3 className="font-mono text-sm text-phosphor uppercase tracking-widest">
                {col.label}
              </h3>
            </div>

            <ol className="space-y-6">
              {col.items.map((ref) => (
                <li key={ref.id} className="group">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="font-mono text-[0.7rem] text-paper-500 tabular-nums shrink-0">
                      [{ref.id}]
                    </span>
                    <span className="font-mono text-xs text-paper-400">{ref.authors}</span>
                  </div>
                  <p className="font-sans text-paper-200 text-sm leading-snug mb-1.5 pl-[calc(0.7rem+1rem)]">
                    {ref.title}
                  </p>
                  <p className="font-mono text-[0.7rem] text-paper-500 italic pl-[calc(0.7rem+1rem)]">
                    {ref.venue} · {ref.year}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </Section>
  )
}
