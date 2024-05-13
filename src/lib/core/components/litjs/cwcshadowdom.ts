import { LitElement, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('cwc-shadowdom')
export class ShadowHtmlContainer extends LitElement {

  static styles = css`
    p {
      font-size: 1.1rem;
    }
    li {
      font-size: 1.1rem;
    }
  `;

  @property()
  htmlCtn!: string;

  render() {
    return unsafeHTML(this.htmlCtn);
  }
}
