import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('cwc-articles-list')
export class ArticlesList extends LitElement {

  @property({attribute: false})
  articles: number[] = Array.from({ length: 10 }, (_, i) => (i));

  card(article: any) {
    return html`
      <div class="card">
        <div class="card-header">Card Header</div>
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <h1 class="mt-2">Hello Card ${article}</h1>
        </div>
        <div class="card-footer text-muted">
          2 days ago
        </div>
      </div>
    `;
  }

  render() {
    return html`
       ${this.articles.map((article) => this.card(article))} 
    `;
  }
}