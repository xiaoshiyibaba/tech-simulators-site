import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/tech-simulators-site/jung-site/',
  plugins: [tailwindcss()],
  build: {
    outDir: 'dist',
  },
});
