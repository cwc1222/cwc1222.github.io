import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { Article } from "./types";

@customElement('cwc-article')
export class ArticleElement extends LitElement {
    @property({attribute: false})
    article!: Article;

    render() {
        return html`${unsafeHTML(this.article.html)}`
    }
}
