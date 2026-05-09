import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/nerc-rc-study-guide/',
  build: {
    outDir: '../docs',
    emptyOutDir: true,
  },
})
