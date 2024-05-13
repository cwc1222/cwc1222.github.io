<script lang="ts">
	import type { PageData } from './$types';

	import '$lib/core/components/litjs/cwc-markdown';
	import { html as introHtml, toc, attributes } from '$lib/markdown/intro.md';

	export let data: PageData;

	const introMd = {
		html: introHtml,
		toc,
		attributes
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="The home page of cwc1222's blog" />
	<meta name="author" content="cwc1222" />
</svelte:head>

<div>
	<h1>Home</h1>
	<hr />

	<div class="row">
		<div class="col-12 mb-3">
			<cwc-markdown markdown={introMd}></cwc-markdown>
		</div>
		<hr />
		<h3 class="mb-4">Recent Posts</h3>
		{#each data.articles as a}
			<div class="col-12 col-md-4 mb-2">
				<div class="card">
					<div class="card-body" style="height: 15rem; overflow: hidden;">
						<h2 class="card-title fs-5 text-uppercase">{a.attributes.title}</h2>
						<p class="text-muted fst-italic fs-6">
							{a.attributes.updatedAt
								? new Date(a.attributes.updatedAt).toLocaleString()
								: new Date(a.attributes.createdAt).toLocaleString()}
						</p>
						<p>
							{#each a.attributes.tags.length > 2 ? a.attributes.tags.slice(0, 2) : a.attributes.tags as tag}
								<span class="badge bg-secondary text-wrap mx-1">{tag}</span>
							{/each}
						</p>
						<p class="card-text fs-6 text-truncate-3">{a.attributes.description}</p>
					</div>
					<div class="card-footer">
						<p class="fs-6 text-end">
							<a href="/articles/{a.slug}" class="card-link text-info">Read more</a>
						</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
