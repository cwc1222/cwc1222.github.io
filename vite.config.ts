import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { vitePluginMarkdown } from './vite-plugin-md';
// import * as mdp from 'vite-plugin-markdown';
// const { plugin: mdPlugin, Mode } = mdp;

export default defineConfig({
	plugins: [sveltekit(), vitePluginMarkdown({})],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
