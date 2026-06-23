import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: '/static/',
  build: {
    outDir: path.resolve(__dirname, './static'),
    emptyOutDir: false,
    manifest: "manifest.json",
    rollupOptions: {
      input: {
        'alpine': path.resolve(__dirname, './assets/alpine.js'),
      },
      output: {
        entryFileNames: `js/[name]-bundle.js`,
      },
    },
  },
});