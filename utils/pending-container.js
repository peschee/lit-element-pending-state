/**
 * Mixin for implementing the pending-state protocol (https://github.com/justinfagnani/pending-state-protocol)
 */
export const PendingContainer = base =>
  class extends base {
    static get properties() {
      return {
        hasPendingChildren: { type: Boolean },
        resolvedCount: { type: Number },
        pendingCount: { type: Number }
      };
    }

    constructor() {
      super();

      this.hasPendingChildren = false;
      this.pendingCount = 0;
      this.resolvedCount = 0;
    }

    get progress() {
      if (this.pendingCount === 0) {
        return 0;
      }

      return this.resolvedCount / this.pendingCount;
    }

    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("pending-state", this._onPendingState);
    }

    disconnectedCallback() {
      this.removeEventListener("pending-state", this._onPendingState);
      super.disconnectedCallback();
    }

    async _onPendingState(ev) {
      const { promise } = ev.detail;
      if (!promise) {
        return;
      }

      this.hasPendingChildren = true;
      this.pendingCount += 1;

      try {
        await promise;
      } catch (err) {
        console.error("Could not resolve promise", err);
      } finally {
        this.resolvedCount += 1;
        if (this.pendingCount === this.resolvedCount) {
          this.hasPendingChildren = false;
        }
      }
    }
  };
