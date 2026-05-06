// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

const trimmed =
  typeof process.env.PUBLIC_SITE_URL === 'string'
    ? process.env.PUBLIC_SITE_URL.trim()
    : '';

// Define PUBLIC_SITE_URL en `.env` o en el panel del host antes del build.
const site = trimmed.length > 0 ? trimmed : 'https://example.com';

// https://astro.build/config
export default defineConfig({
	site,
	integrations: [mdx(), sitemap()],
});
