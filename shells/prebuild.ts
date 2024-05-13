import Frontmatter from 'front-matter';
import { readdirSync, readFileSync } from 'node:fs';

import type { MarkdownMetaData } from "../src/lib/core/types";
const file = Bun.file("package.json");
const packageJson = await file.json();
const articleRoot = "src/lib/markdown/articles";
const articles = readdirSync(articleRoot)
  .map(a => {
    const rawCtn = readFileSync(`${articleRoot}/${a}`).toString();
    const fm = Frontmatter<MarkdownMetaData>(rawCtn);
    const attributes = fm.attributes;
    return {
      slug: a,
      attributes: attributes
    }
  });

const createRssFeed = async () => {
  const feed = `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${packageJson.title}</title>
      <link>${packageJson.homepage}</link>
      <atom:link href="${packageJson.homepage}/rss.xml" rel="self" type="application/rss+xml"/>
      <description>${packageJson.description}</description>
      ${articles.map(p => `
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
  await Bun.write("./static/rss.xml", feed);
};
await createRssFeed();
