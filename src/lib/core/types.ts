
export type Theme = "dark" | "light";

export type MenuInfo = {
	avatar: string,
	blogTitle: string,
	blogSubTitle: string[],
	blogPages: {
		name: string,
		href: string,
	}[],
	ccMessage: string,
	socialMedias: {
		name: string,
		class: string,
		icon: string,
		url: string,
	}[],
}

export type MarkdownMetaData = {
    title: string,
    description: string,
    createdAt: Date,
    updatedAt?: Date,
    tags: Array<string>,
}

export type MarkdownToc = { level: string, content: string }

export type Markdown = {
    toc: MarkdownToc,
    attributes: MarkdownMetaData;
    html: string;
}

export type Article = {
    slug: string,
    toc: MarkdownToc,
    attributes: MarkdownMetaData;
    html: string;
}