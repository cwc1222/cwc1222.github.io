import { sveltekit } from '@sveltejs/kit/vite';

import * as mdp from 'vite-plugin-markdown';
import { default as anchorPlugin } from 'markdown-it-anchor';
import markdownit from 'markdown-it';
import hljs from 'highlight.js';

const md = markdownit({
	highlight: function (str, lang) {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(str, { language: lang }).value;
			} catch (__) {}
		}

		return ''; // use external default escaping
	}
}).use(anchorPlugin);

import { defineConfig } from 'vitest/config';

const { plugin: mdPlugin, Mode } = mdp;

export default defineConfig({
	plugins: [sveltekit(), mdPlugin({ mode: [Mode.HTML, Mode.TOC], markdownIt: md })],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
