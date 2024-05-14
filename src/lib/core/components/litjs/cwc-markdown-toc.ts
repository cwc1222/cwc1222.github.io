import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { MarkdownToc } from '$lib/core/types';

import slugify from '@sindresorhus/slugify';

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

	_handleAnchor(e: Event) {
		const ele = e.target as HTMLAnchorElement;
		const target = ele.getAttribute("href");
		if (!target) {
			return;
		}
		const event = new CustomEvent('scroll-anchor', {
			bubbles: true,
			composed: true,
			detail: { toAnchor: target }
		});
		dispatchEvent(event);
	}

	@property({ attribute: false })
	toc: MarkdownToc[] = [];

	render() {
		if (this.toc.length < 2) {
			// needs at least 1 anchor apart from the title, h1
			return html``;
		}
		return html`
			<div class="toc">
				<h2><a @click=${this._handleAnchor} href="#${slugify(this.toc[0].content)}">${this.toc[0].content}</a></h2>
				<hr />
				<nav>
					<ol>
						${this.toc
							.slice(1, this.toc.length)
							.map(
								(t) => html`<li style="margin-left: ${parseInt(t.level)-2}rem"><a @click=${this._handleAnchor} href="#${slugify(t.content)}">${t.content}</a></li>`
							)}
					</ol>
				</nav>
			</div>
		`;
	}
}
