import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { html as cvHtml } from '$lib/markdown/about.md';

@customElement('cwc-about')
export class About extends LitElement {
  render() {
    return unsafeHTML(cvHtml);
  }
}
