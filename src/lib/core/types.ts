export type Theme = 'dark' | 'light';

export type MenuInfo = {
	avatar: string;
	blogTitle: string;
	blogSubTitle: string[];
	blogPages: {
		name: string;
		href: string;
	}[];
	ccMessage: string;
	socialMedias: {
		name: string;
		class: string;
		icon: string;
		url: string;
	}[];
};

export type MarkdownMetaData = {
	title: string;
	description: string;
	lang: 'en-us' | 'zh-tw' | 'es-py';
	createdAt: Date;
	updatedAt?: Date;
	tags: Array<string>;
	serie: Array<string>;
	mermaid: Boolean;
};

export type MarkdownToc = { level: string; content: string };

export type Markdown = {
	toc: TocTree;
	attributes: MarkdownMetaData;
	html: string;
};

export type TocTree = {
	level: number;
	content: string;
	children: TocTree[];
};

export type Article = {
	slug: string;
	toc: TocTree;
	attributes: MarkdownMetaData;
	html: string;
};
