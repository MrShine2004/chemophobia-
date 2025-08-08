import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()], // Добавьте это для React
    base: '/', // Критично для Vercel!
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // Лучше указывать ./src
      },
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          entryFileNames: 'assets/[name]-[hash].js',
        }
      }
    },
    define: {
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY)
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      open: true
    }
  }
})