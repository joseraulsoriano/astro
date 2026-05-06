import type { APIRoute } from 'astro';

/** robots.txt sirve también la URL absoluta del sitemap (requiere `site` en astro.config). */
export const GET: APIRoute = ({ site }) => {
  const lines = ['User-agent: *', 'Allow: /', ''];

  if (site) {
    const sitemapURL = new URL('sitemap-index.xml', site);
    lines.push(`Sitemap: ${sitemapURL.href}`, '');
  }

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
