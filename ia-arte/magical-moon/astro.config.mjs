import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const site = process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321';

const sinIndiceEnSitemap = [
  '/dashboard',
  '/auth/login',
  '/auth/recuperar',
];

export default defineConfig({
  site,
  output: 'static',
  integrations: [
    vue(),
    tailwind(),
    sitemap({
      filter: (pageUrl) => {
        try {
          const path = new URL(pageUrl).pathname.replace(/\/$/, '') || '/';
          return !sinIndiceEnSitemap.some(
            (ex) => path === ex || path.startsWith(`${ex}/`),
          );
        } catch {
          return true;
        }
      },
    }),
  ],
});
