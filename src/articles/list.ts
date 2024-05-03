import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';

import { getArticles } from '@lib/articles';
import { Article } from './types';

@customElement('cwc-articles-list')
export class ArticlesList extends LitElement {
  static styles = css`
  `;

  gotoArticle(e: Event) {
    //const ele = (e.target as Element).closest(".card");
    const ele = (e.target as Element);
    if (!ele) {
      return;
    }
    const route = ele.getAttribute("route")
      ? `articles/${ele.getAttribute("route")}`
      : "404";
    const event = new CustomEvent('goto-route', {
      bubbles: true, composed: true, detail: { route: route },
    });
    this.dispatchEvent(event);
  }

  card(a: Article) {
    return html`
      <div class="card">
        <div class="card-body">
          <h5 class="card-title" @click=${this.gotoArticle} route=${a.slug}>${a.attributes.title}</h5>
        </div>
        <div class="card-footer text-muted">
          created at ${a.attributes.createdAt}
        </div>
      </div>
    `;
  }

  render() {
    const articles = getArticles().then(as => {
      return html`${as.map(a => this.card(a))}`;
    });

    return html`${until(articles, html`<span>Loading...</span>`)}`;
  }
}