import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  publicDir: false,
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/plugin.ts'),
      name: 'vue-audio-visual',
      fileName: 'vue-audio-visual'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
