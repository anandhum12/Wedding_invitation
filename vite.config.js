import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // relative asset paths so the site works at https://<user>.github.io/<repo>/
  base: './',
});
