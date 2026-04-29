import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';

// Netlify puede servir el sitio como estático desde dist/. Si más adelante necesitas SSR
// o funciones serverless, vuelve a añadir @astrojs/netlify como `adapter`.
export default defineConfig({
  output: 'static',
  integrations: [vue(), tailwind()],
});