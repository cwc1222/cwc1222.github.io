<script lang="ts">
	import type { Theme, TocTree } from '$lib/core/types';
	import slugify from '@sindresorhus/slugify';
	import '$lib/scss/markdown.scss';
	import 'giscus';

	export let compiledMd: string;
	export let toc: TocTree;
	export let giscus: {
		repo: string;
		repoId: string;
		categoryId: string;
	};
	export let theme: Theme;

	const tocTreeToHtml = (toc: TocTree) => {
		let tocHtml = `<li class="level-${toc.level}"><a href="#${slugify(toc.content)}">${toc.content}</a>`;
		if (toc.children.length > 0) {
			tocHtml += `<ol>`;
			toc.children.forEach((child) => {
				tocHtml += tocTreeToHtml(child);
			});
			tocHtml += `</ol></li>`;
		}
		return tocHtml;
	};
</script>

<div class="markdown-container row">
	<div class="col-12 col-md-10">
		{@html compiledMd}
	</div>
	<div class="d-none d-md-block col-12 col-md-2 toc-wrapper">
		<div class="toc">
			<h2><a href="#{slugify(toc.content)}">{toc.content}</a></h2>
			<hr />
			<ol>
				{#each toc.children as c}
					{@html tocTreeToHtml(c)}
				{/each}
			</ol>
		</div>
	</div>
	<div class="col-12 col-md-10">
		<giscus-widget
			repo={giscus.repo}
			repoid={giscus.repoId}
			category="Announcements"
			categoryid={giscus.categoryId}
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
