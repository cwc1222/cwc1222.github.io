import type { Article } from "$lib/core/types";

import cvPdf from '$lib/assets/cv.pdf?url';
import packageJson from '../../../package.json';
import { articleManager } from "$lib/core/article";

const toSitemap = async (articles: Article[]) => {
  const [pages] = await Promise.all([
		import.meta.glob('/src/routes/**/+page.svelte'),
	]);
  const routes = Object.keys(pages)
		.map((x) => x.substring(11)) // remove /src/routes prefix
		.map((x) => x.substring(0, x.length - 13)) // remove /+page.svelte suffix
		.map((x) => x.replaceAll(/\/\(\w+\)/g, '')) // remove (groups)
		.filter((x) => !x.includes('[')) // filter out parameterized routes
		.sort(); // satisfy OCD

  return `
  <?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
      ${routes.map(r => `
      <url>
        <loc>${packageJson.homepage}${r}</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
      `).join('')}
      ${articles.map(p => `
        <url>
          <loc>${packageJson.homepage}/articles/${p.slug}</loc>
          <changefreq>daily</changefreq>
          <priority>0.7</priority>
        </url>
        `).join('')}
      <url>
        <loc>${packageJson.homepage}${cvPdf}</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
    </urlset>
  `.trim();
};

export async function GET(): Promise<Response> {
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=600',
    'Content-Type': 'application/xml',
  }

  const articles = await articleManager.getArticles();
  const body = await toSitemap(articles);

  return new Response(body, { headers })
}