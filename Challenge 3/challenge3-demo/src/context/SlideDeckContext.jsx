import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react'

export const SlideDeckContext = createContext(null)

/**
 * Provider que controla a navegação tipo "Keynote":
 *   - Setas ←/→/↑/↓, PageUp/PageDown, Space, Home/End
 *   - Wheel (debounced)
 *   - Swipe touch
 *   - goTo(id) público para a navbar
 */
export function SlideDeckProvider({ slides, children }) {
  const ids = useMemo(() => slides.map(s => s.id), [slides])
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1 = avança, -1 = recua
  const lockRef = useRef(false)

  const total = slides.length

  const go = useCallback((next) => {
    setIndex((cur) => {
      const clamped = Math.max(0, Math.min(total - 1, next))
      if (clamped === cur) return cur
      setDirection(clamped > cur ? 1 : -1)
      return clamped
    })
  }, [total])

  const next = useCallback(() => go(indexRef.current + 1), [go])
  const prev = useCallback(() => go(indexRef.current - 1), [go])

  // ref espelho para callbacks estáveis
  const indexRef = useRef(0)
  useEffect(() => { indexRef.current = index }, [index])

  const goToId = useCallback((id) => {
    const i = ids.indexOf(id)
    if (i >= 0) go(i)
  }, [ids, go])

  // Lock para impedir saltos múltiplos durante a animação
  const withLock = useCallback((fn) => {
    if (lockRef.current) return
    lockRef.current = true
    fn()
    setTimeout(() => { lockRef.current = false }, 750)
  }, [])

  // Teclado
  useEffect(() => {
    const onKey = (e) => {
      // Ignora se o foco está num input/textarea
      const tag = (e.target && e.target.tagName) || ''
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault()
          withLock(next)
          break
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault()
          withLock(prev)
          break
        case 'Home':
          e.preventDefault()
          withLock(() => go(0))
          break
        case 'End':
          e.preventDefault()
          withLock(() => go(total - 1))
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, go, total, withLock])

  // Wheel — apenas faz scroll interno, nunca muda de slide
  useEffect(() => {
    const onWheel = (e) => {
      // Se o evento ocorre dentro de um contentor scrollável, deixar o browser tratar
      let node = e.target
      while (node && node !== document.body) {
        if (node.dataset && node.dataset.slideScroll === 'true') {
          return // browser faz scroll normal dentro do slide
        }
        node = node.parentNode
      }
      // Fora de um slide scrollável, impede o scroll da página mas não muda slide
      e.preventDefault()
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])

  // Touch swipe
  useEffect(() => {
    let startY = 0
    let startX = 0
    let active = false
    const onStart = (e) => {
      const t = e.touches[0]
      startY = t.clientY
      startX = t.clientX
      active = true
    }
    const onEnd = (e) => {
      if (!active) return
      active = false
      const t = e.changedTouches[0]
      const dy = t.clientY - startY
      const dx = t.clientX - startX
      if (Math.abs(dy) < 60 && Math.abs(dx) < 60) return
      withLock(() => {
        if (Math.abs(dy) > Math.abs(dx)) {
          dy < 0 ? next() : prev()
        } else {
          dx < 0 ? next() : prev()
        }
      })
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
  }, [next, prev, withLock])

  const value = useMemo(() => ({
    index,
    total,
    direction,
    slide: slides[index],
    slides,
    next: () => withLock(next),
    prev: () => withLock(prev),
    goToId,
    goToIndex: (i) => withLock(() => go(i)),
  }), [index, total, direction, slides, next, prev, goToId, go, withLock])

  return (
    <SlideDeckContext.Provider value={value}>
      {children}
    </SlideDeckContext.Provider>
  )
}

