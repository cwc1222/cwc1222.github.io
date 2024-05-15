<script lang="ts">
	import '$lib/scss/index.scss';
	import Menu from '$lib/core/components/Menu.svelte';

	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { LayoutData } from './$types';
	import type { Theme } from '$lib/core/types';

	export let data: LayoutData;

	const blogTheme: Writable<Theme> = writable(data.defaultTheme);
	setContext('blog-theme', blogTheme);
	$: {
		blogTheme.set(data.defaultTheme);
	}
</script>

<main class="container-fluid">
	<div class="row">
		<div class="col-sm-12 col-md-3">
			<Menu bind:theme={data.defaultTheme} menuInfo={data.menuInfo}></Menu>
		</div>
		<div class="col-sm-12 col-md-9">
			<slot></slot>
		</div>
	</div>
</main>
