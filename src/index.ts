import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { query } from 'lit/decorators/query.js';
import { until } from 'lit/directives/until.js';
import { Router } from '@lit-labs/router';

//import "@static/scss/index.scss";
//import "@static/scss/fontawesome.scss"
//import * as styles from "@static/scss/index.scss"
//import styles from "@static/scss/index.scss"
import styles from '@static/scss/index.scss?inline';
import avatar from "@static/image/avatar_500x500.webp";

import "./articles/list.js";
import "./about/about.js";
import { getArticle } from './lib/articles.js';

type BlogPage = {
  name: string;
  href: string;
}

type Theme = "dark" | "light";

@customElement('cwc-app')
export class LitApp extends LitElement {
  static styles = unsafeCSS(styles);

  private _routes = new Router(this, [
    {path: '/articles', render: () => html`<cwc-articles-list></cwc-articles-list>`},
    {path: '/articles/:slug', render: ( {slug} ) => {
      if (!slug) {
        return html`<h2>404 - Article "${slug}" connot be resolved</h2>`;
      }
      const articles = getArticle(slug).then(a => {
        if (!a) {
          return html`<h2>Article "${slug}" connot be resolved</h2>`;
        }
        return html`<h2>${a.slug} found!</h2>`;
      });
      return html`${until(
        articles,
        html`<span>Loading ${slug}...</span>`
      )}`;
    }},
    {path: '/projects', render: () => html``},
    {path: '/about', render: () => html`<cwc-about></cwc-about>`},
    {path: '/404', render: () => html`<h2>404 - Page not found</h2>`},
  ]);

  @state()
  blogTitle: string = "cwc1222's blog";

  @state()
  blogSubTitle: string[] = [
    "Computer Science",
    "Web Programming",
    "Distributed System",
    "Language Learning",
    "Travel"
  ];

  @state()
  pages: BlogPage[] = [
    {
      name: "Home/Articles",
      href: "/articles",
    },
    {
      name: "Projects",
      href: "/projects",
    },
    {
      name: "About",
      href: "/about",
    },
  ];

  @query("slot[name=content]")
  _slot!: HTMLSlotElement;

  @query("#offcanvas-root")
  _offcanvas!: HTMLDivElement;

  @query("i[to-theme=light]")
  iconSun!: HTMLElement;

  @query("i[to-theme=dark]")
  iconMoon!: HTMLElement;

  handleRouteChange(e: CustomEvent<any>) {
    const route = "/" + e?.detail?.route || "404";
    history.pushState(null, '', route);
    this._routes.goto(`${route}`);
  }

  toggleMenuEvt() {
    if (this._offcanvas.classList.contains("show")) {
      this._offcanvas.classList.remove("show");
    } else {
      this._offcanvas.classList.add("show");
    }
  }

  toggleThemeEvt(e: Event) {
    const ele = e.target as Element;
    const toTheme = (ele.getAttribute("to-theme") || "dark") as Theme;
    if (toTheme === "dark") {
      ele.classList.add("d-none");
      this.iconSun.classList.remove("d-none");
    }
    if (toTheme === "light") {
      ele.classList.add("d-none");
      this.iconMoon.classList.remove("d-none");
    }

    //const event = new CustomEvent('toggle-theme', {
    //  bubbles: true, composed: true, detail: { toTheme: toTheme },
    //});
    //this.dispatchEvent(event);
    document.querySelector("html")?.setAttribute("data-bs-theme", toTheme);
  }

  socialMedias() {
    return html`
      <a href="#" title="github" class="link-secondary"><i class="fa-brands fa-github"></i></a>
      <a href="#" title="linkedin" class="link-primary"><i class="fa-brands fa-linkedin"></i></a>
      <a href="#" title="rss" class="link-secondary"><i class="fa-solid fa-rss"></i></a>
    `;
  }

  ccMessage() {
    return html`<i class="fa-regular fa-closed-captioning"></i><span> cwc1222 2024</span>`;
  }

  pageItem(p: BlogPage) {
    return html`
    <li class="list-group-item">
      <a 
        href="${p.href}" 
        class="list-group-item list-group-item-action" 
      >${p.name}</a>
    </li>
    `;
  }

  menu() {
    return html`
      <div class="d-md-none d-flex align-items-center justify-content-between mb-3">
        <div 
          class="btn" 
          type="button" 
          @click=${this.toggleMenuEvt}
        >
          <i class="fa-solid fa-bars"></i>
        </div>
        <div class="d-flex flex-column flex-sm-row align-items-end align-items-sm-center gap-2">
          <span class="fs-5 fw-bold">${this.blogTitle}</span>
          <div>${this.socialMedias()}</div>
          <div>${this.ccMessage()}</div>
        </div>
      </div>
      <div 
        class="offcanvas-md offcanvas-start menu"
        tabindex="-1" 
        id="offcanvas-root"
      >
        <div class="offcanvas-header">
          <button
            type="button" 
            class="btn-close" 
            aria-label="Close"
            @click=${this.toggleMenuEvt}
          >
          </button>
        </div>
        <div class="offcanvas-body">
          <nav class="container-fluid" style="min-height: 85vh;">
            <div class="row d-flex flex-column align-items-center justify-content-between text-center gap-2 fs-5 h-100">
              <div>
                <img 
                  src="${avatar}"
                  alt="avatar"
                  width="500" 
                  height="500"
                  style="max-width: 100px"
                  class="img-fluid img-thumbnail rounded-circle"
                  loading="lazy"
                >
                <span class="fw-bold">${this.blogTitle}</span>
                <div class="mt-4 p-2">
                  <span class="fs-6">${this.blogSubTitle.map(topic => `${topic}`).join(" | ")}</span>
                </div>
                <div class="fs-4 mt-4">
                  <i @click=${this.toggleThemeEvt} to-theme="dark" class="fa-solid fa-moon d-none"></i>
                  <i @click=${this.toggleThemeEvt} to-theme="light" class="fa-solid fa-sun"></i>
                </div>
                <div class="mt-4">
                  <ul class="m-0 p-0">
                    ${this.pages.map(p => this.pageItem(p))}
                  </ul>
                </div>
              </div>
              <div class="d-md-block d-none">
                <div>${this.socialMedias()}</div>
                <div>${this.ccMessage()}</div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    `;
  }

  render() {
    return html`
    <div class="container-fluid" @goto-route=${this.handleRouteChange}>
      <div class="row">
        <div class="col-sm-12 col-md-3">
          ${this.menu()}
        </div>
        <div class="col-sm-12 col-md-9">
          ${this._routes.outlet()}
        </div>
      </div>
    </div>
    `;
  }
}
