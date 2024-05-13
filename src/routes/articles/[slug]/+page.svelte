<script lang="ts">
	import type { PageData } from './$types';
	import { getContext } from 'svelte';

	import '$lib/core/components/litjs/cwc-markdown';
	import 'giscus';
	import type { Theme } from '$lib/core/types';
	import type { Writable } from 'svelte/store';

	export let data: PageData;

	let theme: Theme = data.defaultTheme;
	const themeStore = getContext('blog-theme') as Writable<Theme>;
	themeStore.subscribe((updated) => {
		theme = updated;
	});

	const articleMd = {
		html: data.article.html,
		toc: data.article.toc,
		attributes: data.article.attributes
	};
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

	<cwc-markdown markdown={articleMd}></cwc-markdown>
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
