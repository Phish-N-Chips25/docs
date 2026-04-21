import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../i18n/translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'pt'
    return localStorage.getItem('pnc-lang') || 'pt'
  })

  useEffect(() => {
    localStorage.setItem('pnc-lang', lang)
    document.documentElement.lang = lang === 'pt' ? 'pt-PT' : 'en'
  }, [lang])

  const toggle = () => setLang(l => (l === 'pt' ? 'en' : 'pt'))

  // t(path) — acede a chaves como t('hero.title')
  const t = (path) => {
    const parts = path.split('.')
    let cur = translations[lang]
    for (const p of parts) {
      if (cur == null) return path
      cur = cur[p]
    }
    return cur == null ? path : cur
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
