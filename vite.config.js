import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// index.html is the live coming-soon page; the rest are the real site, served at /home,
// /about, /services and /why-us (see vercel.json's cleanUrls).
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        home: resolve(__dirname, 'home.html'),
        about: resolve(__dirname, 'about.html'),
        services: resolve(__dirname, 'services.html'),
        whyUs: resolve(__dirname, 'why-us.html'),
      },
    },
  },
})
