import { LitElement, html, css } from 'lit-element';

export class ViewOne extends LitElement {
  render() {
    return html` View 1… `;
  }
}

customElements.define('view-one', ViewOne);
