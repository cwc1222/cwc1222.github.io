import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { MarkdownToc } from '$lib/core/types';

@customElement('cwc-markdown-toc')
export class ShadowMarkdownToc extends LitElement {
	static styles = css`
		.toc {
			color: grey;
		}
		h2 {
			font-size: 1rem;
			font-weight: bold;
		}
		hr {
			margin: 1rem 0;
			border: 0;
			border-top: 1px solid;
			opacity: 0.25;
		}
		ol {
			padding-left: 0;
			margin-bottom: 0;
			list-style: none;
		}
		li {
			margin-bottom: 0.25rem;
		}
		a:not(:hover) {
			text-decoration: none;
			color: inherit;
		}
	`;

	@property({ attribute: false })
	toc: MarkdownToc[] = [];

	_contentToUrl(ctn: string) {
		return ctn.toLowerCase().split(' ').join('-');
	}

	render() {
		if (this.toc.length < 1) {
			return html``;
		}
		return html`
			<div class="toc">
				<h2>Table of content</h2>
				<hr />
				<nav>
					<ol>
						${this.toc
							.slice(1, this.toc.length)
							.map(
								(t) => html`<li><a href="#${this._contentToUrl(t.content)}">${t.content}</a></li>`
							)}
					</ol>
				</nav>
			</div>
		`;
	}
}
