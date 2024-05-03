/// <reference types="vite/client" />

declare global {
    import { LitApp } from 'src/index';
    import { ArticleElement } from "src/articles/article";
    import { ArticlesList } from "src/articles/list";
    import { ProjectsList } from "src/projects/list";
    import { About } from "src/about/about";

    interface HTMLElementTagNameMap {
        "cwc-app": LitApp,
        "cwc-article": ArticleElement,
        "cwc-articles-list": ArticlesList,
        "cwc-projects-list": ProjectsList,
        "cwc-about": About,
    }

    interface WindowEventMap {
        'goto-route': CustomEvent<any>;
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
    import { ArticleMetaData, ArticleToc } from "src/articles/types";

    // "unknown" would be more detailed depends on how you structure frontmatter
    //const attributes: Record<string, ArticleMetaData>;
    const attributes: ArticleMetaData;

    // When "Mode.TOC" is requested
    const toc: ArticleToc[];

    // When "Mode.HTML" is requested
    const html: string;

    // Modify below per your usage
    export { attributes, toc, html, };
}
