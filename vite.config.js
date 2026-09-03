import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// index.html is the homepage; about/services/why-us are served at those paths by
// vercel.json's cleanUrls. coming-soon.html is kept but not linked to from anywhere.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        services: resolve(__dirname, 'services.html'),
        whyUs: resolve(__dirname, 'why-us.html'),
        comingSoon: resolve(__dirname, 'coming-soon.html'),
      },
    },
  },
})
