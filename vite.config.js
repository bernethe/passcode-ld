import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/passcode-ld/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src/',
    },
  },
  root: './',
  build: {
    outDir: './build'
  }
})
