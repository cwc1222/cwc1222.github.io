import { LitElement, html, unsafeCSS } from 'lit';
import {query} from 'lit/decorators/query.js';
import { customElement, state } from 'lit/decorators.js';

//import "@static/scss/index.scss";
//import "@static/scss/fontawesome.scss"
//import * as styles from "@static/scss/index.scss"
//import styles from "@static/scss/index.scss"
import styles from '@static/scss/index.scss?inline';
import avatar from "@static/image/avatar_500x500.webp";

import "./articles/list.js"

type BlogPage = {
  name: string;
  link: string;
}

@customElement('lit-app')
export class LitApp extends LitElement {
  static styles = unsafeCSS(styles);

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
      name: "Articles",
      link: "/articles",
    },
    {
      name: "About",
      link: "/about",
    },
  ]

  @query("#offcanvas-root")
  _offcanvas!: HTMLDivElement;

  toggleMenu() {
    if (this._offcanvas.classList.contains("show")) {
      this._offcanvas.classList.remove("show");
    } else {
      this._offcanvas.classList.add("show");
    }
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
    <li class="list-group-item active">
      <a 
        href="${p.link}" 
        class="list-group-item list-group-item-action active" 
        aria-current="true"
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
          @click=${this.toggleMenu}
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
            @click=${this.toggleMenu}
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
                >
                <span class="fw-bold">${this.blogTitle}</span>
                <div class="mt-4">
                  <span class="fs-6">${this.blogSubTitle.map(topic => `${topic}`).join(" | ")}</span>
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
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-md-3">
          ${this.menu()}
        </div>
        <div class="col-sm-12 col-md-9">
          <slot></slot>
        </div>
      </div>
    </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
      'lit-app': LitApp,
  }
}
