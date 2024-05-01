import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { html as cvHtml, attributes } from '@static/markdown/about.md';

import cvPdf from '@static/cv.pdf?url';

@customElement('cwc-about')
export class About extends LitElement {
  static styles = css`
    .fs-3 {
      font-size: 1.3rem;
    }
    .fs-4 {
      font-size: 0.9rem;
    }
    .cv-row {
      vertical-align: bottom;
    }
  `;

  render() {
    return html`
      <div>
        <h1>About cwc1222</h1>
        <hr>
      </div>
      <div class="cv-row">
        <h2>CHUN-WEI CHEN</h2>
        <a target="_blank" href="${cvPdf}" class="fs-3">Curriculum Vitae</a>
        <span class="fs-4">
          ${
            attributes.updatedAt 
              ? new Date(attributes.updatedAt).toLocaleString()
              : new Date(attributes.createdAt).toLocaleString()
          }
        </span>
      </div>      
      <div>${unsafeHTML(cvHtml)}</div>
    `
  }
}
