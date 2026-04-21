import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site: https://phish-n-chips25.github.io/challenge3-pitch/
// Vercel / domínio próprio / user-page (phish-n-chips25.github.io) -> base: '/'
// Project page no GitHub Pages -> base: '/challenge3-pitch/'
const isGhPages = process.env.DEPLOY_TARGET === 'gh-pages'
export default defineConfig({
  plugins: [react()],
  base: isGhPages ? '/challenge3-pitch/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
  server: {
    port: 5173,
    open: true,
  },
})
