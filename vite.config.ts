import { sveltekit } from '@sveltejs/kit/vite';
import * as mdp from 'vite-plugin-markdown';

import { defineConfig } from 'vitest/config';

const { plugin: mdPlugin, Mode } = mdp;

export default defineConfig({
	plugins: [sveltekit(), mdPlugin({ mode: [Mode.HTML, Mode.TOC] })],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
