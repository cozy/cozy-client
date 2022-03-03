"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Use those fetch policies with `<Query />` to limit the number of re-fetch.
 *
 * @example
 * ```
 * import { fetchPolicies } from 'cozy-client'
 * const olderThan30s = fetchPolicies.olderThan(30 * 1000)
 * <Query fetchPolicy={olderThan30s} />
 * ```
 */
var fetchPolicies = {
  /**
   * Returns a fetchPolicy that will only re-fetch queries that are older
   * than `<delay>` ms.
   *
   * @param  {number} delay - Milliseconds since the query has been fetched
   * @returns {Function} Fetch policy to be used with `<Query />`
   */
  olderThan: function olderThan(delay) {
    return function (queryState) {
      if (!queryState || !queryState.lastUpdate) {
        return true;
      } else {
        var elapsed = Date.now() - queryState.lastUpdate;
        return elapsed > delay;
      }
    };
  },

  /**
   * Fetch policy that deactivates any fetching.
   */
  noFetch: function noFetch() {
    return false;
  }
};
var _default = fetchPolicies;
exports.default = _default;