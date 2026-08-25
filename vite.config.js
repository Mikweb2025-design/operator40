import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';

let pkgVersion = '0.0.0';
try { pkgVersion = JSON.parse(readFileSync('./package.json', 'utf8')).version; } catch {}
let gitHash = '';
try { gitHash = execSync('git rev-parse --short HEAD').toString().trim(); } catch {}
const buildId = gitHash ? `${pkgVersion} · ${gitHash}` : pkgVersion;
// buildId deterministico: stesso commit → stesso hash asset → locale e server restano allineati

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(buildId),
    __BUILD_ID__: JSON.stringify(buildId),
  },
  base: './',
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 2000,
    sourcemap: false,
    minify: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
          icons: ['lucide-react'],
          vision: ['@mediapipe/tasks-vision'],
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
  test: {
    environment: 'node',
    include: ['src/**/*.test.{js,ts,jsx,tsx}', 'tests/**/*.{test,spec}.{js,ts}'],
    globals: true,
  },
});
