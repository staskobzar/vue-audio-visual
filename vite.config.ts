/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url'
import basicSsl from '@vitejs/plugin-basic-ssl'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), basicSsl()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    https: true
  },
  build: {
    outDir: 'docs'
  },
  test: {
    globals: true,
    setupFiles: [ './tests.setup.ts' ]
  }
})
