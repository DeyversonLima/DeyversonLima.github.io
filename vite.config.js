import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// User site (deyversonlima.github.io) serves from root.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
