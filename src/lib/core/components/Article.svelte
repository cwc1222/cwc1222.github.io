<script lang="ts">
	import type { TocTree } from '$lib/core/types';
	import '$lib/scss/markdown.scss';
	import slugify from '@sindresorhus/slugify';

	export let compiledMd: string;
	export let toc: TocTree;

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
</div>
