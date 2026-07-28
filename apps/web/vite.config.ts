import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      'jl-particle-interactive': resolve(__dirname, '../../packages/jl-particle-interactive/src/index.ts'),
    },
  },
});
