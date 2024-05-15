import type { Markdown, MarkdownToc, TocTree, Article } from '$lib/core/types';

class ArticleManager {
	#articles: Article[] = [];
	#numberOfArticles: number | null = null;

	private buildTree(toc: MarkdownToc[], index: number): [TocTree, number] {
		const currentLevel = +toc[index].level;
		const currentNode: TocTree = {
			level: currentLevel,
			content: toc[index].content,
			children: []
		};

		let i = index + 1;
		while (i < toc.length && +toc[i].level > currentLevel) {
			const [childNode, nextIndex] = this.buildTree(toc, i);
			currentNode.children.push(childNode);
			i = nextIndex;
		}

		return [currentNode, i];
	}

	private async loadArticles() {
		const articleMds = Object.entries(import.meta.glob('/src/lib/markdown/articles/**/*.md'));
		const articlesLst = Promise.all(
			articleMds.map(async ([path, resolver]) => {
				const { attributes, html, toc } = (await resolver()) as Markdown;
				const postPath = path.split('/');
				return {
					slug: postPath[postPath.length - 1].split('.')[0],
					toc: this.buildTree(toc, 0)[0],
					attributes: attributes,
					html: html
				};
			})
		);
		this.#articles = (await articlesLst).sort((a, b) => {
			// Desc
			const d1 = a.attributes.updatedAt
				? new Date(a.attributes.updatedAt)
				: new Date(a.attributes.createdAt);
			const d2 = b.attributes.updatedAt
				? new Date(b.attributes.updatedAt)
				: new Date(b.attributes.createdAt);
			if (d1 > d2) {
				return -1;
			}
			if (d1 < d2) {
				return 1;
			}
			return 0;
		});
		this.#numberOfArticles = this.#articles.length;
	}

	public async getArticles(): Promise<Article[]> {
		if (this.#numberOfArticles === null) {
			await this.loadArticles();
		}
		return this.#articles;
	}

	public async getRecentNthArticles(n: number): Promise<Article[]> {
		if (this.#numberOfArticles === null) {
			await this.loadArticles();
		}
		return this.#articles.slice(0, n);
	}

	public async getArticle(slug: string): Promise<Article | undefined> {
		if (this.#numberOfArticles === null) {
			await this.loadArticles();
		}
		return this.#articles.filter((a) => a.slug === slug)[0];
	}
}

export const articleManager = new ArticleManager();
