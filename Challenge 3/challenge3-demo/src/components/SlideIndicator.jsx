import { useSlideDeck } from '../context/useSlideDeck'

export default function SlideIndicator() {
  const { slides, index, goToIndex } = useSlideDeck()
  return (
    <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-2 max-h-[90vh] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
      {slides.map((s, i) => {
        const active = i === index
        return (
          <button
            key={s.id}
            onClick={() => goToIndex(i)}
            aria-label={`Ir para ${s.label || s.id}`}
            className="group flex items-center gap-3 cursor-pointer"
          >
            <span
              className={`font-mono text-[0.65rem] uppercase tracking-widest transition-all duration-500 ${
                active
                  ? 'text-phosphor opacity-100 translate-x-0'
                  : 'text-paper-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              {s.label || s.id}
            </span>
            <span
              className={`block h-px transition-all duration-500 ${
                active
                  ? 'w-10 bg-phosphor'
                  : 'w-4 bg-paper-500 group-hover:w-6 group-hover:bg-paper-300'
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}
