import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/**
 * Conta de 0 até `to`, respeitando casas decimais e prefixo/sufixo.
 * Anima quando entra em vista (útil no modo deck onde o slide é montado de cada vez).
 */
export default function CountUp({ to, duration = 1.6, decimals = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.4 })
  const mv = useMotionValue(0)
  const display = useTransform(mv, (v) => v.toFixed(decimals))
  const [text, setText] = useState((0).toFixed(decimals))

  useEffect(() => {
    const unsub = display.on('change', setText)
    return unsub
  }, [display])

  useEffect(() => {
    if (!inView) return
    mv.set(0)
    const controls = animate(mv, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    })
    return controls.stop
  }, [inView, to, duration, mv])

  return <span ref={ref} className={className}>{text}</span>
}
