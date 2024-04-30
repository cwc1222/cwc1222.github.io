import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';

import { getArticles } from '@lib/articles';
import { Article } from './types';

@customElement('cwc-articles-list')
export class ArticlesList extends LitElement {

  gotoArticle(e: Event) {
    const ele = (e.target as Element).closest(".card");
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
      <div class="card" @click=${this.gotoArticle} route=${a.slug}>
        <div class="card-header">
        ${a.slug}
        </div>
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
        </div>
        <div class="card-footer text-muted">
          2 days ago
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