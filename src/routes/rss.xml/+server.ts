import type { Article } from "$lib/core/types";

import packageJson from '../../../package.json';
import { articleManager } from "$lib/core/article";

const toRssFeed = (articles: Article[]) => {
  return `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${packageJson.title}</title>
      <link>${packageJson.homepage}</link>
      <atom:link href="${packageJson.homepage}/rss.xml" rel="self" type="application/rss+xml"/>
      <description>${packageJson.description}</description>
      ${articles.map( p => `
      <item>
        <title>${p.attributes.title}</title>
        <description>${p.attributes.description}</description>
        <link>${packageJson.homepage}/articles/${p.slug}</link>
        <guid>${packageJson.homepage}/articles/${p.slug}</guid>
        <pubDate>${new Date(p.attributes.createdAt).toUTCString()}</pubDate>
      </item>
      `).join('')}
    </channel>
  </rss>
  `;
};

export async function GET(): Promise<Response> {
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=600',
    'Content-Type': 'application/xml',
  }

  const articles = await articleManager.getArticles();
  const body = toRssFeed(articles);

  return new Response(body, { headers })
}