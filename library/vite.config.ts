import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include: ['.'], exclude: ['dist', 'node_modules'],
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      'jl-particle-interactive': resolve(__dirname, 'index.ts'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: 'all',
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'JlParticleInteractive',
      fileName: 'jl-particle-interactive',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'ReactJsxRuntime',
        },
      },
    },
    copyPublicDir: false,
  },
});
