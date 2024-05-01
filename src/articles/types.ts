
type ArticleMetaData = {
    title: string,
    description: string,
    createdAt: Date,
    updatedAt?: Date,
    tags: Array<string>,
}

type ArticleToc = { level: string, content: string }

type Markdown = {
    toc: ArticleToc,
    attributes: ArticleMetaData;
    html: string;
}

type Article = {
    slug: string,
    toc: ArticleToc,
    attributes: ArticleMetaData;
    html: string;
}

export type {
    ArticleMetaData,
    ArticleToc,
    Article,
    Markdown,
}