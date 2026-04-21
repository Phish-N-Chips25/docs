export default function Logo({ className = 'h-6 w-auto', withText = true }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-full w-auto" aria-hidden="true">
        <g
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 16 L12 11 L22 11 L26 16 L22 21 L12 21 Z" />
          <path d="M26 16 L30 12 M26 16 L30 20" />
          <circle cx="14" cy="15" r="1" fill="currentColor" />
          <path d="M17 14 L20 14 M17 18 L20 18" />
        </g>
      </svg>
      {withText && (
        <span className="font-mono text-[0.7rem] uppercase tracking-widest">
          Phish<span className="text-phosphor">·</span>N<span className="text-phosphor">·</span>Chips
        </span>
      )}
    </div>
  )
}
