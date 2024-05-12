
<script lang="ts">
  import type { PageData } from './$types';
  import "$lib/core/components/litjs/cwcshadowdom";

  export let data: PageData;
</script>

<svelte:head>
  <title>Article</title> 
</svelte:head>

<div>
  <h1>Article</h1>
  <hr>

  <cwc-shadowdom htmlCtn={data.article.html}></cwc-shadowdom>
</div>
