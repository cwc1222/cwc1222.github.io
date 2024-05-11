<script lang="ts">
	import "$lib/scss/index.scss";
	import Menu from "$lib/core/components/svelte/Menu.svelte";

	import type { LayoutData } from './$types';
	
	export let data: LayoutData;

</script>

<main class="container-fluid">
	<div class="row">
		<div class="col-sm-12 col-md-3">
			<Menu
				theme="dark"
				menuInfo={data}
			></Menu>
		</div>
		<div class="col-sm-12 col-md-9">
			<slot></slot>
		</div>
	</div>
</main>
