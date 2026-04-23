import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/carsharing/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/helpers/" as *;
          @use "@/styles/main" as *;
        `,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve('src'), // @ → папка src
    },
  },
})
