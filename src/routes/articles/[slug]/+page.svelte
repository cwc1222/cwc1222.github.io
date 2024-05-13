<script lang="ts">
	import type { PageData } from './$types';
	import '$lib/core/components/litjs/cwcshadowdom';

	export let data: PageData;

	const articleMd = {
		html: data.article.html,
		toc: data.article.toc,
		attributes: data.article.attributes
	};
</script>

<svelte:head>
	<title>Article</title>
	<meta
		name="description"
		content="The article, {data.article.attributes.title}, of cwc1222's blog"
	/>
	<meta name="author" content="cwc1222" />
</svelte:head>

<div>
	<h1>Article</h1>
	<hr />

	<cwc-shadowdom markdown={articleMd}></cwc-shadowdom>
</div>
