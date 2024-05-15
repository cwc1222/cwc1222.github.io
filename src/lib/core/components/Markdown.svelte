<script lang="ts">
	import '$lib/scss/markdown.scss';
	export let compiledMd: string;
</script>

<div class="markdown-container">
	{@html compiledMd}
</div>
