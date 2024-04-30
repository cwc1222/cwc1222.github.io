import { Article, Markdown } from "src/articles/types";

const articleMds = Object.entries(
    import.meta.glob(
        '../../static/markdown/articles/*.md',
    )
);

let articles: Article[] | null = null;

export const getArticles = async () => {
    if (articles !== null) {
        return articles;
    }
    articles = await Promise.all(
        articleMds.map(async ([path, resolver]) => {
            const { attributes, html, toc } = (await resolver()) as Markdown;
			const postPath = path.split("/");
            return {
                fileName: postPath[postPath.length - 1],
                slug: postPath[postPath.length - 1].split(".")[0],
                toc: toc,
				attributes: attributes,
                html: html,
			};
        })
    );
    return articles;
};

export const getArticle = async (slug: string) => {
    if (articles === null) {
        articles = await getArticles();
    }
    const matched = articles.filter(a => a.slug === slug);
    if (matched.length < 1) {
        return null;
    }
    return matched[0];
};
