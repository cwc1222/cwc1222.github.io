import Frontmatter from 'front-matter';
import { readFileSync } from 'node:fs';
import { Glob } from "bun";
import type { MarkdownMetaData } from '../src/lib/core/types';

const createRssFeed = async (
	packageJson: any,
	articles: { slug: string; attributes: MarkdownMetaData }[]
) => {
	const feed = `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${packageJson.title}</title>
      <link>${packageJson.homepage}</link>
      <atom:link href="${packageJson.homepage}/rss.xml" rel="self" type="application/rss+xml"/>
      <description>${packageJson.description}</description>
      ${articles
				.map(
					(p) => `
      <item>
        <title>${p.attributes.title}</title>
        <description>${p.attributes.description}</description>
        <link>${packageJson.homepage}/articles/${p.slug}</link>
        <guid>${packageJson.homepage}/articles/${p.slug}</guid>
        <pubDate>${p.attributes.updatedAt? p.attributes.updatedAt.toUTCString() : p.attributes.createdAt.toUTCString()}</pubDate>
      </item>
      `
				)
				.join('')}
    </channel>
  </rss>
  `;
	await Bun.write('./static/rss.xml', feed);
};

const file = Bun.file('package.json');
const packageJson = await file.json();

const glob = new Glob("src/lib/markdown/articles/**/*.md");
let articles: {slug: string, attributes: MarkdownMetaData}[] = [];
for await (const file of glob.scan(".")) {
	const splitedPath = file.split('/')

	const rawCtn = readFileSync(file).toString();
	const fm = Frontmatter<MarkdownMetaData>(rawCtn);
	const attributes = fm.attributes;
	articles = [...articles, {
		slug: splitedPath[splitedPath.length-1].split('.')[0],
		attributes: attributes
	}]
}

articles.sort((a, b) => {
	// Desc
	const d1 = a.attributes.updatedAt
		? a.attributes.updatedAt
		: a.attributes.createdAt;
	const d2 = b.attributes.updatedAt
		? b.attributes.updatedAt
		: b.attributes.createdAt;
	if (d1 > d2) {
		return -1;
	}
	if (d1 < d2) {
		return 1;
	}
	return 0;
});

await createRssFeed(packageJson, articles);
