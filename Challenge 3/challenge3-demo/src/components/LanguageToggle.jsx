import { useLanguage } from '../context/LanguageContext'

export default function LanguageToggle({ className = '' }) {
  const { lang, setLang } = useLanguage()

  const btn = (code, label) => {
    const active = lang === code
    return (
      <button
        key={code}
        onClick={() => setLang(code)}
        className={`px-2 py-1 font-mono text-[0.7rem] uppercase tracking-widest transition-colors ${
          active ? 'text-phosphor' : 'text-paper-400 hover:text-paper-100'
        }`}
        aria-pressed={active}
      >
        {label}
      </button>
    )
  }

  return (
    <div
      className={`inline-flex items-center border border-ink-600 divide-x divide-ink-600 ${className}`}
      role="group"
      aria-label="Language"
    >
      {btn('pt', 'PT')}
      {btn('en', 'EN')}
    </div>
  )
}
