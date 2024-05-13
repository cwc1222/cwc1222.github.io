<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Articles</title>
	<meta name="description" content="The artibles list of cwc1222's blog" />
	<meta name="author" content="cwc1222" />
</svelte:head>

<div>
	<h1>Articles</h1>
	<hr />

	<div>
		{#each data.articles as a}
			<div class="card mb-3">
				<div class="card-body">
					<h2 class="card-title fs-4 text-uppercase">{a.attributes.title}</h2>
					<p class="text-muted fst-italic">
						{a.attributes.updatedAt
							? new Date(a.attributes.updatedAt).toLocaleString()
							: new Date(a.attributes.createdAt).toLocaleString()}
					</p>
					<p>
						{#each a.attributes.tags as tag}
							<span class="badge bg-secondary text-wrap mx-1">{tag}</span>
						{/each}
					</p>
					<p class="card-text fs-5 text-truncate-4">{a.attributes.description}</p>
					<p class="fs-5 text-end">
						<a href="/articles/{a.slug}" class="card-link text-info">Read more</a>
					</p>
				</div>
			</div>
		{/each}
	</div>
</div>
