import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('cwc-shadowdom')
export class ShadowHtmlContainer extends LitElement {

  @property()
  htmlCtn!: string;

  render() {
    return unsafeHTML(this.htmlCtn);
  }
}
