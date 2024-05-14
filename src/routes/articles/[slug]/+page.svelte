<script lang="ts">
	import type { PageData } from './$types';
	import { getContext, onMount } from 'svelte';

	import '$lib/core/components/litjs/cwc-markdown';
	import '$lib/core/components/litjs/cwc-markdown-toc';
	import 'giscus';
	import type { Theme } from '$lib/core/types';
	import type { Writable } from 'svelte/store';
	import { LitElement } from 'lit';

	export let data: PageData;

	let theme: Theme = data.defaultTheme;
	const themeStore = getContext('blog-theme') as Writable<Theme>;
	themeStore.subscribe((updated) => {
		theme = updated;
	});

	onMount(() => {
		window.addEventListener('scroll-anchor', ((e: CustomEvent<{ toAnchor: string; }>) => {
			const targetId = e?.detail?.toAnchor;
			if (!targetId) {
				return;
			}
			const shadowRoot = (document.querySelector("cwc-markdown") as LitElement )?.renderRoot;
			if (!shadowRoot) {
				return;
			}
			const target = shadowRoot.querySelector(targetId);
			if (!target) {
				return;
			}
			target.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
		}) as EventListener );
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

	<div class="row">
		<div class="col-12 col-md-10">
			<cwc-markdown markdown={articleMd}></cwc-markdown>
		</div>
		<div class="d-none d-md-block col-12 col-md-2 toc-wrapper">
			<cwc-markdown-toc toc={articleMd.toc}></cwc-markdown-toc>
		</div>
		<div class="col-12 col-md-10">
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
	</div>
</div>
