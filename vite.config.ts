import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import compression from 'vite-plugin-compression2';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      logStats: true,
      ansiColors: true,

      png: { quality: 82, effort: 7 },
      jpeg: { quality: 80, mozjpeg: true },
      webp: { quality: 80 },
      avif: { quality: 70 },

      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
                cleanupIds: false,
                convertPathData: false,
              },
            },
          },
          'sortAttrs',
          'cleanupNumericValues',
        ],
      },

      include: /\.(png|jpe?g|gif|webp|avif|svg)$/i,
    }),

    compression({
      algorithms: ['brotliCompress', 'gzip'],
      threshold: 1024,
      deleteOriginalAssets: false,
    }),
  ],
  base: '/carsharing/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
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
});
