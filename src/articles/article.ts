import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { until } from 'lit/directives/until.js';

import { getArticle } from '@lib/articles.js';

@customElement('cwc-article')
export class ArticleElement extends LitElement {
  @property()
  slug: string | undefined = "";

  handleReturnToList() {
    const route = "articles";
    const event = new CustomEvent('goto-route', {
      bubbles: true, composed: true, detail: { route: route },
    });
    this.dispatchEvent(event);
  }

  articleHtml() {
    if (!this.slug) {
      return html`<h2>Article "${this.slug}" not found</h2>`;
    }
    const articles = getArticle(this.slug).then(a => {
      if (!a) {
        return html`<h2>Article "${this.slug}" not found</h2>`;
      }
      return html`${unsafeHTML(a.html)}`
    });
    return html`${until(
      articles,
      html`<span>Loading ${this.slug}...</span>`
    )}`;
  }

  render() {
    return html`
      <div @click=${this.handleReturnToList}>Return to list</div>
      <div>${this.articleHtml()}</div>
    `;
  }
}
