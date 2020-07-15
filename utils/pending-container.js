/**
 * Mixin for implementing the pending-state protocol
 *
 * @see https://github.com/justinfagnani/pending-state-protocol
 */
export const PendingContainer = base =>
  class extends base {
    static get properties() {
      return {
        __hasPendingChildren: { type: Boolean },
        __pendingCount: { type: Number },
      };
    }

    constructor() {
      super();

      this.__hasPendingChildren = false;
      this.__pendingCount = 0;
    }

    connectedCallback() {
      this.addEventListener('pending-state', this.__onPendingState);
      if (super.connectedCallback) {
        super.connectedCallback();
      }
    }

    disconnectedCallback() {
      this.removeEventListener('pending-state', this.__onPendingState);
      if (super.disconnectedCallback) {
        super.disconnectedCallback();
      }
    }

    async __onPendingState(ev) {
      console.log('__onPendingState', ev);

      const { promise } = ev.detail;
      if (!promise) {
        return;
      }

      this.__hasPendingChildren = true;
      this.__pendingCount += 1;

      try {
        await promise;
      } catch (err) {
        // to suppress uncaught exception logs
      } finally {
        this.__pendingCount -= 1;
        if (this.__pendingCount === 0) {
          this.__hasPendingChildren = false;
        }
      }
    }
  };
