<script lang="ts">
	import type { PageData } from './$types';
	import '$lib/core/components/litjs/cwcshadowdom';

	export let data: PageData;
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

	<cwc-shadowdom htmlCtn={data.article.html}></cwc-shadowdom>
</div>
