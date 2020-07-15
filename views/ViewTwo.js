import { LitElement, html, css } from 'lit-element';

export class ViewTwo extends LitElement {
  render() {
    return html` View 2… `;
  }
}

customElements.define('view-two', ViewTwo);
