import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';

let pkgVersion = '0.0.0';
try { pkgVersion = JSON.parse(readFileSync('./package.json', 'utf8')).version; } catch {}
const buildId = new Date().toISOString().slice(0, 16).replace('T', ' ');

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(`${pkgVersion} · ${buildId}`),
    __BUILD_ID__: JSON.stringify(buildId),
  },
  base: './',
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 2000,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
          icons: ['lucide-react'],
        },
      },
    },
  },
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    port: 4173,
    host: true,
  },
});
