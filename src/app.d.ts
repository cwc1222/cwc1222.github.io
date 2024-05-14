// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	import { ShadowMarkdownContainer } from 'src/lib/core/components/litjs/cwc-markdown';
	import { ShadowMarkdownToc } from 'src/lib/core/components/litjs/cwc-markdown-toc';

	interface HTMLElementTagNameMap {
		'cwc-markdown': ShadowMarkdownContainer;
		'cwc-markdown-toc': ShadowMarkdownToc;
	}

	import { Theme } from '$lib/core/types';
	interface WindowEventMap {
		'toggle-theme': CustomEvent<{ toTheme: Theme; }>;
		'scroll-anchor': CustomEvent<{ toAnchor: string; }>;
	}
}

declare module '*.md' {
	import type { MarkdownMetaData, MarkdownToc } from '$lib/core/types';

	// "unknown" would be more detailed depends on how you structure frontmatter
	//const attributes: Record<string, ArticleMetaData>;
	const attributes: MarkdownMetaData;

	// When "Mode.TOC" is requested
	const toc: MarkdownToc[];

	// When "Mode.HTML" is requested
	const html: string;

	// Modify below per your usage
	export { attributes, toc, html };
}
