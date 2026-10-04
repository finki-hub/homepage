import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import process from 'node:process';
import { defineConfig } from 'vite';

// CI checkout SHA (including merge commits), or Cloudflare's checked-out build SHA.
// Never accept a VITE_ override or browser/caller-provided revision.
const REVISION_PATTERN = /^[\da-f]{40}$/u;
const revision = [process.env.CF_PAGES_COMMIT_SHA, process.env.GITHUB_SHA].find(
  (candidate) =>
    typeof candidate === 'string' && REVISION_PATTERN.test(candidate),
);

export default defineConfig({
  define: {
    'import.meta.env.VITE_APP_REVISION': JSON.stringify(revision ?? ''),
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    hmr: {
      overlay: false,
    },
    host: '::',
    port: 8_080,
  },
});
