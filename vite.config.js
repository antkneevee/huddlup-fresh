import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Use relative paths so the app can be served from any subdirectory
  base: './',
  plugins: [react()],
  css: {
    postcss: './postcss.config.cjs'
  }
});
