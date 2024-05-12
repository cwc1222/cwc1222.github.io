<script lang="ts">
    import type { MenuInfo, Theme } from '$lib/core/types';

    // Properties
    export let theme: Theme;
    export let menuInfo: MenuInfo;

    // Event Handlers
    const toggleThemeEvt = (e: Event) => {
        const ele = e.target as HTMLElement;
        theme = (ele?.dataset?.toTheme || "dark") as Theme;
        const event = new CustomEvent('toggle-theme', {
            bubbles: true, composed: true, detail: { toTheme: theme },
        });
        dispatchEvent(event);
    };

    let offcanvas: HTMLDivElement;
    const toggleMenuEvt = () => {
      if (!offcanvas) {
        return;
      }
      if (offcanvas.classList.contains("show")) {
        offcanvas.classList.remove("show");
      } else {
        offcanvas.classList.add("show");
      }
    };
</script>

<div class="d-md-none d-flex align-items-center justify-content-between mb-3">
  <button
    class="btn"
    on:click={toggleMenuEvt}
  >
    <i class="fa-solid fa-bars"></i>
  </button>
  <div class="d-flex flex-column flex-sm-row align-items-end align-items-sm-center gap-2">
    <span class="fs-5 fw-bold">{menuInfo.blogTitle}</span>
    <div>
      {#each menuInfo.socialMedias as sm}
      <a href="{sm.url}" title="{sm.name}" class="{sm.class} px-1" target="_blank">{@html sm.icon}</a>
      {/each}
    </div>
    <div>{@html menuInfo.ccMessage}</div>
  </div>
</div>
<div 
  class="offcanvas-md offcanvas-start menu"
  tabindex="-1" 
  bind:this={offcanvas}
>
  <div class="offcanvas-header">
    <button
      type="button" 
      class="btn-close" 
      aria-label="Close"
      on:click={toggleMenuEvt}
    >
    </button>
  </div>
  <div class="offcanvas-body">
    <nav class="container-fluid" style="min-height: 85vh;">
      <div class="row d-flex flex-column align-items-center justify-content-between text-center gap-2 fs-5 h-100">
        <div>
          <img 
            src="{menuInfo.avatar}"
            alt="avatar"
            width="500" 
            height="500"
            style="max-width: 100px"
            class="img-fluid img-thumbnail rounded-circle"
            loading="lazy"
          >
          <span class="fw-bold">{menuInfo.blogTitle}</span>
          <div class="mt-4 p-2">
            <span class="fs-6">{menuInfo.blogSubTitle.map(topic => `${topic}`).join(" | ")}</span>
          </div>
          <div class="fs-4 mt-4">
              {#if theme === "light"}
              <i on:click={toggleThemeEvt} data-to-theme="dark" aria-hidden="true" class="fa-solid fa-moon"></i>
              {:else}
              <i on:click={toggleThemeEvt} data-to-theme="light" aria-hidden="true" class="fa-solid fa-sun"></i>
              {/if}
          </div>
          <div class="mt-4">
            <ul class="m-0 p-0">
              {#each menuInfo.blogPages as p}
              <li class="list-group-item">
                  <a 
                    href="{p.href}" 
                    class="list-group-item list-group-item-action" 
                  >{p.name}</a>
                </li>
              {/each}
            </ul>
          </div>
        </div>
        <div class="d-md-block d-none">
          <div>
              {#each menuInfo.socialMedias as sm}
              <a href="{sm.url}" title="{sm.name}" class="{sm.class} px-1" target="_blank">{@html sm.icon}</a>
              {/each}
          </div>
          <div>{@html menuInfo.ccMessage}</div>
        </div>
      </div>
    </nav>
  </div>
</div>
