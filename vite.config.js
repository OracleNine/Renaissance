import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: '/static/',
  build: {
    chunkSizeWarningLimit: 2000,
    outDir: path.resolve(__dirname, './static'),
    emptyOutDir: false,
    manifest: "manifest.json",
    rollupOptions: {
      external: ['django-prose-editor/editor', 'django-prose-editor/configurable'],
      input: {
        'alpine': path.resolve(__dirname, './assets/alpine.js'),
      },
      output: {
        entryFileNames: `js/[name]-bundle.js`,
      },
    },
  },
});