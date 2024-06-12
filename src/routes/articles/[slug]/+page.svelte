<script lang="ts">
	import type { PageData } from './$types';
	import type { Writable } from 'svelte/store';
	import type { Theme } from '$lib/core/types';

	import { getContext, onMount } from 'svelte';
	import Article from '$lib/core/components/Article.svelte';

	export let data: PageData;

	let theme: Theme = data.defaultTheme;
	const themeStore = getContext('blog-theme') as Writable<Theme>;
	themeStore.subscribe((updated) => {
		theme = updated;
		//const mermaidTheme = theme === "dark" ? "dark" : "default";
		//mermaid.init({theme: mermaidTheme});
	});

	const giscus = {
		repo: data.gitscusConfig.repo,
		repoId: data.gitscusConfig.repoId,
		categoryId: data.gitscusConfig.categoryId
	};

	onMount(async () => {
		if (data.article.attributes.mermaid) {
			const mermaid = (await import('mermaid')).default;
			mermaid.init({ theme: 'dark', logLevel: 'warn' });
		}
	});
</script>

<svelte:head>
	<title>Article: {data.article.attributes.title}</title>
	<meta
		name="description"
		content="The article, {data.article.attributes.title}, of cwc1222's blog"
	/>
	<meta name="author" content="cwc1222" />
	<meta http-equiv="content-language" content={data.article.attributes.lang} />
</svelte:head>

<div>
	<h1>Article</h1>
	<hr />
	<Article compiledMd={data.article.html} toc={data.article.toc} {giscus} bind:theme></Article>
</div>
