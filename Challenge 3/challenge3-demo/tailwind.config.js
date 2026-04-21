/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        // Paleta light clean — branco puro como base, cinzas neutros
        ink: {
          900: '#ffffff',     // fundo principal (branco puro)
          800: '#f5f5f3',     // cartões / variações de bg
          700: '#e8e8e4',     // separadores fortes
          600: '#d4d4cc',     // borda neutra
          500: '#a8a89e',     // texto muito subtil
        },
        paper: {
          100: '#1f1d1a',     // texto principal (quase preto quente)
          200: '#2e2b25',
          300: '#4f4a40',
          400: '#7a7264',
          500: '#a59c87',
        },
        phosphor: {
          DEFAULT: '#06b6d4', // cyan-500 — accent principal (= família --accent da app)
          bright: '#67e8f9',  // cyan-300 — o --accent exacto da app
          dim: '#22d3ee',     // cyan-400
          dark: '#0891b2',    // cyan-600 — texto sobre fundos claros
        },
        signal: {
          red: '#f87171',     // = --bad da app (vermelho)
          amber: '#fbbf24',   // = LED amarelo da app
          mint: '#4ade80',    // = --ok da app (verde)
          sky: '#a3bedc',     // pastel sky (mantido)
          lavender: '#b6a8d4',// pastel lavender (mantido)
        },
      },
      letterSpacing: {
        widest: '0.3em',
        widen: '0.15em',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'scan': 'scan 3s linear infinite',
        'pulse-dim': 'pulseDim 2.5s ease-in-out infinite',
        'blink': 'blink 1.1s steps(2) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        pulseDim: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.9' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
