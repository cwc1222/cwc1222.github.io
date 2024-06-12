import fs from 'node:fs';
import crypto from 'crypto';

import type { Plugin } from 'vite';
import type { TransformResult } from 'rollup';
import type { MermaidConfig } from 'mermaid';

import { Marked, marked, type MarkedOptions } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import Frontmatter from 'front-matter';
import slugify from '@sindresorhus/slugify';
import sizeOf from 'image-size';

import * as htmlparser2 from 'htmlparser2';
import { DomUtils } from 'htmlparser2';
import { Element } from 'domhandler';

import type { MarkdownMetaData, MarkdownToc, TocTree } from './src/lib/core/types';

interface PluginOptions {
	options?: MarkedOptions;
	mermaid?: MermaidConfig;
}

const regex = /[^a-zA-Z]+/g;
//const mdIncludedImgs: string[] = [];

const newMarkedInstance = (filePath: string) => {
	const renderer = new marked.Renderer();
	//renderer.code = function (code, language) {
	//	console.log(code);
	//	console.log(language);
	//	if (language === "mermaid") {
	//		return `<pre class="mermaid">${code}</pre>`;
	//	} else {
	//		return `<pre><code>${code}</code></pre>`;
	//	}
	//};
	renderer.heading = function (text, level) {
		return `<h${level} id=${slugify(text)}>${text}</h${level}>`;
	};
	renderer.image = function (href: string, title: string | null, text: string) {
		const splittedPath = filePath.split('/');
		const currentRoot = splittedPath.slice(0, splittedPath.length - 1).join('/');
		const imageFullPath = `${currentRoot}/${href}`;

		//console.log(`__dirname: ${__dirname}`);
		//console.log(`currentRoot: ${currentRoot}`);
		//console.log(`imageFullPath: ${imageFullPath}`);

		if (!fs.existsSync(imageFullPath)) {
			console.log(`[vite-plugin-md] Cannot find image ${imageFullPath}`);
			return `<img src="/image-not-found-255x255.webp" width="255" height="255" alt="${text || ''}" title="${title || ''}" />`;
		} else {
			//const imgUrl = href.replace(regex, '');
			//const imgImportStatement = `import ${imgUrl} from '${imageFullPath}'`;
			//mdIncludedImgs.push(imgImportStatement);
			const dimensions = sizeOf(imageFullPath);
			const splittedOrgName = href.split('.');
			const ext = splittedOrgName[1];
			const img = fs.readFileSync(imageFullPath, { encoding: 'base64' });
			const hash = crypto.createHash('md5').update(img, 'utf8').digest('hex');
			const imgName = `${splittedOrgName[0]}-${hash}.${ext}`;
			const imgDir = `${__dirname}/static/image`;
			if (!fs.existsSync(imgDir)) {
				fs.mkdirSync(imgDir, { recursive: true });
				console.log(`\n[vite-plugin-markdown] Created folder ${imgDir}`);
			} else {
				console.log(`\n[vite-plugin-markdown] ${imgDir} exists, skip...`);
			}
			if (!fs.existsSync(`${imgDir}/${imgName}`)) {
				fs.writeFileSync(`${imgDir}/${imgName}`, img, 'base64');
				console.log(`\n[vite-plugin-markdown] Created image ${imgDir}/${imgName}`);
			} else {
				console.log(`\n[vite-plugin-markdown] ${imgDir}/${imgName} exists, skip...`);
			}
			return `<img src="/image/${imgName}" width="${dimensions.width}" height="${dimensions.height}" alt="${text || ''}" title="${title || ''}" />`;
		}
	};
	const customMarked = new Marked(
		markedHighlight({
			langPrefix: 'hljs language-',
			highlight(code, lang, info) {
				const language = hljs.getLanguage(lang) ? lang : 'plaintext';
				if (lang === 'mermaid') {
					return `<div class="mermaid">${code}</div>`;
				}
				return hljs.highlight(code, { language }).value;
			}
		})
	);
	return {
		marked: customMarked,
		renderer: renderer
	};
};

const buildTree = (toc: MarkdownToc[], index: number): [TocTree, number] => {
	const currentLevel = +toc[index].level;
	const currentNode: TocTree = {
		level: currentLevel,
		content: toc[index].content,
		children: []
	};

	let i = index + 1;
	while (i < toc.length && +toc[i].level > currentLevel) {
		const [childNode, nextIndex] = buildTree(toc, i);
		currentNode.children.push(childNode);
		i = nextIndex;
	}

	return [currentNode, i];
};

class ExportedContent {
	#exports: string[] = [];
	#contextCode = '';

	addContext(contextCode: string): void {
		this.#contextCode += `${contextCode}\n`;
	}

	addExporting(exported: string): void {
		this.#exports.push(exported);
	}

	export(): string {
		return [this.#contextCode, `export { ${this.#exports.join(', ')} }`].join('\n');
	}
}

const tf = async (code: string, id: string): Promise<TransformResult> => {
	if (!id.endsWith('.md')) {
		return null;
	}
	const content = new ExportedContent();
	const m = newMarkedInstance(id);

	const fm = Frontmatter<MarkdownMetaData>(code);
	content.addContext(`const attributes = ${JSON.stringify(fm.attributes)}`);
	content.addExporting('attributes');

	const html = await m.marked.parse(fm.body, { renderer: m.renderer });
	content.addContext(`const html = ${JSON.stringify(html)}`);
	content.addExporting('html');

	const root = htmlparser2.parseDocument(html);
	const indicies = root.children
		.map((child) => (child instanceof Element ? (child as Element) : new Element('', {})))
		.filter((child) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(child.tagName));

	const tocRaw: { level: string; content: string }[] = indicies.map((index) => ({
		level: index.tagName.replace('h', ''),
		content: DomUtils.getInnerHTML(index)
	}));
	const toc = buildTree(tocRaw, 0)[0];
	content.addContext(`const toc = ${JSON.stringify(toc)}`);
	content.addExporting('toc');

	//for (const img of mdIncludedImgs) {
	//	content.addContext(img);
	//}

	return {
		code: content.export()
	};
};

export const vitePluginMarkdown = (options: PluginOptions = {}): Plugin => ({
	name: 'vite-plugin-markdown',
	enforce: 'post',
	async transform(code: string, id: string) {
		return tf(code, id);
	}
});
