import { LitElement, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import type { Markdown } from '$lib/core/types';

import styles from '$hljs/scss/arta.scss?inline';

@customElement('cwc-markdown')
export class ShadowMarkdownContainer extends LitElement {
	static styles = [
		css`
			p {
				font-size: 1.1rem;
			}
			li {
				font-size: 1.1rem;
			}
		`,
		unsafeCSS(styles)
	];

	@property({ attribute: false })
	markdown!: Markdown;

	render() {
		return unsafeHTML(this.markdown?.html || '<p>Loading...</p>');
	}
}
