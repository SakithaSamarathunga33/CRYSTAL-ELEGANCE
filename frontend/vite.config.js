import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


// API calls in src/ use relative paths (e.g. "/auth/login") so the same
// code works behind the production nginx reverse proxy. In dev, Vite needs
// to forward those same prefixes to the backend itself.
const backendProxyPrefixes = [
  '/users', '/customers', '/feedback', '/employees',
  '/salaries', '/suppliers', '/inventory', '/auth', '/api', '/orders',
  '/appointments', '/uploads',
];

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {

    },
  },
  server: {
    proxy: Object.fromEntries(
      backendProxyPrefixes.map((prefix) => [
        prefix,
        { target: 'http://localhost:4000', changeOrigin: true },
      ])
    ),
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
