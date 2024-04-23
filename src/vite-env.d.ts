/// <reference types="vite/client" />

declare global {
    import { LitApp } from 'src/index';

    interface HTMLElementTagNameMap {
        "cwc-app": LitApp,
        "cwc-articles-list": ArticlesList,
        "cwc-about": About,
    }
}


declare module '*.scss?inline' {
    import { CSSResult } from 'lit';
    const styles: CSSResult;
    export default styles;
}

declare module '*.scss' {
    import { CSSResult } from 'lit';
    const styles: CSSResult;
    export default styles;
}

declare module '*.md' {

    type MarkdownMetaData = {
        title: string,
        description: string,
        createdAt: Date,
        tags: Array<string>,
    }

    // "unknown" would be more detailed depends on how you structure frontmatter
    const attributes: Record<string, MarkdownMetaData>;

    // When "Mode.TOC" is requested
    const toc: { level: string, content: string }[];

    // When "Mode.HTML" is requested
    const html: string;

    // Modify below per your usage
    export { attributes, toc, html, };
}
