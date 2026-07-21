import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const staticAssetBase = './';

export default defineConfig({
  base: staticAssetBase,
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 8080,
  },
  preview: {
    host: '0.0.0.0',
    port: 8080,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
});
