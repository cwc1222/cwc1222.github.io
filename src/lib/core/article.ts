import type { Markdown, Article } from "$lib/core/types";

export const getRecentArticles = async () => { }

export const getArticle = async (slug: string) => { }

export class ArticleManager {
  #articles: Article[] = [];
  #numberOfArticles: number | null = null;

  private async loadArticles() {
    const articleMds = Object.entries(
      import.meta.glob("/src/lib/markdown/articles/*.md")
    );
    const articlesLst = Promise.all(
      articleMds.map(async ([path, resolver]) => {
        const { attributes, html, toc } = (await resolver()) as Markdown;
        const postPath = path.split("/");
        return {
          slug: postPath[postPath.length - 1].split(".")[0],
          toc: toc,
          attributes: attributes,
          html: html,
        };
      })
    );
    this.#articles = await articlesLst;
    this.#numberOfArticles = this.#articles.length;
  }

  public async getArticles() {
    if (this.#numberOfArticles === null) {
      await this.loadArticles();
    }
    return this.#articles;
  }
}
