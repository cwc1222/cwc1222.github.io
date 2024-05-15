<script lang="ts">
	import type { PageData } from './$types';
	import type { Writable } from 'svelte/store';
	import type { Theme } from '$lib/core/types';

	import 'giscus';
	import { getContext } from 'svelte';
	import Article from '$lib/core/components/Article.svelte';

	export let data: PageData;

	let theme: Theme = data.defaultTheme;
	const themeStore = getContext('blog-theme') as Writable<Theme>;
	themeStore.subscribe((updated) => {
		theme = updated;
	});
</script>

<svelte:head>
	<title>Article: {data.article.attributes.title}</title>
	<meta
		name="description"
		content="The article, {data.article.attributes.title}, of cwc1222's blog"
	/>
	<meta name="author" content="cwc1222" />
</svelte:head>

<div>
	<h1>Article</h1>
	<hr />
	<Article compiledMd={data.article.html} toc={data.article.toc}></Article>
	<giscus-widget
		repo={data.gitscusConfig.repo}
		repoid={data.gitscusConfig.repoId}
		category="Announcements"
		categoryid={data.gitscusConfig.categoryId}
		mapping="title"
		term="Welcome to giscus!"
		reactionsenabled="1"
		emitmetadata="0"
		inputposition="top"
		{theme}
		lang="en"
		loading="lazy"
	></giscus-widget>
</div>
