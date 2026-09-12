import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://miraa13c.github.io/mira',
  base: '/mira',
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
