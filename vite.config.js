import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // Pour GitHub Pages (repo username.github.io)
  assetsInclude: ['**/*.zip'], // Inclure les fichiers .zip comme assets
  build: {
    outDir: 'dist',
  },
})
