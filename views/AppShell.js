import { LitElement, html, css } from "lit-element";
import { nothing } from "lit-html";

import { lazyLoad } from "../utils/lazy-loading.js";
import { PendingContainer } from "../utils/pending-container.js";

export class AppShell extends PendingContainer(LitElement) {
  static get properties() {
    return { currentView: { type: String } };
  }

  static get styles() {
    return css`
      nav,
      header,
      aside {
        margin-bottom: 1rem;
      }
    `;
  }

  constructor() {
    super();
    this.currentView = "one";
  }

  render() {
    return html`
      <div>
        <header>
          <aside>
            Pending state:<br />
            <code>hasPendingChildren</code>: ${this.hasPendingChildren}<br />
            <code>resolvedCount</code>: ${this.resolvedCount}<br />
            <code>pendingCount</code>: ${this.pendingCount}<br />
            <code>progress</code>: ${this.progress}
          </aside>

          <nav>
            <a href="one" @click=${this._switchView}>One</a>
            <a href="two" @click=${this._switchView}>Two</a>
            <a href="three" @click=${this._switchView}>Three</a>
          </nav>
        </header>

        <main @pending-state=${(e) => console.log('main', e)}>
          ${this._renderCurrentView()}
        </main>
      </div>
    `;
  }

  _renderCurrentView() {
    switch (this.currentView) {
      case "one":
        return lazyLoad(
          import("./ViewOne.js"),
          html`
            <view-one></view-one>
          `
        );
      case "two":
        return lazyLoad(
          import("./ViewTwo.js"),
          html`
            <view-two></view-two>
          `
        );
      case "three":
        return lazyLoad(
          import("./ViewThree.js"),
          html`
            <view-three></view-three>
          `
        );
      default:
        return nothing;
    }
  }

  _switchView(e) {
    e.preventDefault();
    this.currentView = e.target.getAttribute("href");
  }
}

customElements.define("app-shell", AppShell);
