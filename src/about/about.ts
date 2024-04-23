import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { html as cvHtml } from '@static/markdown/cv.md';
//import { attributes } from '@static/markdown/cv.md';

@customElement('cwc-about')
export class About extends LitElement {
    render() {
        return html`${unsafeHTML(cvHtml)}`
    }
}
