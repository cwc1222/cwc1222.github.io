import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';


@customElement('cwc-projects-list')
export class ProjectsList extends LitElement {
  render() {
    return html`
    <h2>
      <span>Still working on it...</span>
      <slot></slot>
    </h2>
    `;
  }
}