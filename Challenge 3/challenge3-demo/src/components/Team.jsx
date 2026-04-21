import Section from './Section'
import { useLanguage } from '../context/LanguageContext'
import { teamMembers } from '../data/team'

export default function Team() {
  const { t, lang } = useLanguage()

  return (
    <Section
      id="team"
      eyebrow={t('team.eyebrow')}
      title={t('team.title')}
    >
      <p className="font-mono text-sm text-paper-400 uppercase tracking-widest mb-10">
        {t('team.affiliation')}
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
        {teamMembers.map((m, i) => (
          <div
            key={m.number}
            className="group border border-ink-600 p-6 md:p-8 hover:border-phosphor/60 transition-all hover:-translate-y-1 duration-300"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-[0.7rem] text-paper-500 tabular-nums">
                0{i + 1} / 0{teamMembers.length}
              </span>
              <div className="w-1.5 h-1.5 bg-ink-600 group-hover:bg-phosphor transition-colors" />
            </div>

            <h3 className="font-display font-light text-xl md:text-2xl text-paper-100 mb-3 leading-tight">
              {m.name}
            </h3>

            <p className="font-mono text-[0.7rem] text-phosphor uppercase tracking-widest mb-5 leading-relaxed">
              {m.role[lang]}
            </p>

            <div className="pt-5 border-t border-ink-600">
              <a
                href={`mailto:${m.email}`}
                className="font-mono text-xs text-paper-400 hover:text-phosphor transition-colors break-all"
              >
                {m.email}
              </a>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
