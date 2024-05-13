import { LitElement, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import type { Markdown } from '$lib/core/types';

@customElement('cwc-markdown')
export class ShadowMarkdownContainer extends LitElement {
	static styles = css`
		p {
			font-size: 1.1rem;
		}
		li {
			font-size: 1.1rem;
		}
	`;

	@property({ attribute: false })
	markdown!: Markdown;

	render() {
		return unsafeHTML(this.markdown?.html || "<p>Loading...</p>");
	}
}
