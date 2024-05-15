<script lang="ts">
	import Markdown from '$lib/core/components/Markdown.svelte';

	import { html as cvHtml, attributes } from '$lib/markdown/about.md';
	import cvPdf from '$lib/assets/cv.pdf?url';
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="The about page of cwc1222" />
	<meta name="author" content="cwc1222" />
</svelte:head>

<div>
	<h1>About cwc1222</h1>
	<hr />
</div>
<div class="p-3">
	<h2>CHUN-WEI CHEN</h2>
	<a target="_blank" href={cvPdf} class="h5 text-info">Curriculum Vitae</a>
	<span class="h6 text-muted">
		{attributes.updatedAt
			? new Date(attributes.updatedAt).toLocaleString()
			: new Date(attributes.createdAt).toLocaleString()}
	</span>
</div>
<div class="px-3">
	<Markdown compiledMd={cvHtml}></Markdown>
</div>
