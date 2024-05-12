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

    import { ShadowHtmlContainer } from "src/lib/core/components/litjs/cwcshadowdom";

    interface HTMLElementTagNameMap {
        "cwc-shadowdom": ShadowHtmlContainer,
    }
}

declare module '*.md' {
    import type { MarkdownMetaData, MarkdownToc } from "$lib/core/article";

    // "unknown" would be more detailed depends on how you structure frontmatter
    //const attributes: Record<string, ArticleMetaData>;
    const attributes: MarkdownMetaData;

    // When "Mode.TOC" is requested
    const toc: MarkdownToc[];

    // When "Mode.HTML" is requested
    const html: string;

    // Modify below per your usage
    export { attributes, toc, html, };
}
