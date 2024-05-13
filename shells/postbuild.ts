import { createSitemap } from 'svelte-sitemap/src/index.js';

const file = Bun.file('package.json');
const packageJson = await file.json();

createSitemap(packageJson.homepage, { debug: false, changeFreq: 'monthly' });
