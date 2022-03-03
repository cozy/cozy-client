"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasQueryBeenLoaded = exports.isQueryLoading = exports.cancelable = void 0;

/**
 * @typedef {Promise} CancelablePromise
 * @property {Function} cancel - Cancel the promise
 */

/**
 * Wraps a promise so that it can be canceled
 *
 * Rejects with canceled: true as soon as cancel is called
 *
 * @param  {Promise} promise  - Promise
 * @returns {CancelablePromise} - Promise with .cancel method
 */
var cancelable = function cancelable(promise) {
  var _reject;

  var wrapped = new Promise(function (resolve, reject) {
    _reject = reject;
    promise.then(resolve);
    promise.catch(reject);
  }); // @ts-ignore

  wrapped.cancel = function () {
    _reject({
      canceled: true
    });
  };

  return wrapped;
};

exports.cancelable = cancelable;

/**
 * Returns whether the result of a query (given via queryConnect or Query)
 * is loading.
 */
var isQueryLoading = function isQueryLoading(col) {
  if (!col) {
    console.warn('isQueryLoading called on falsy value.'); // eslint-disable-line no-console

    return false;
  }

  return col.fetchStatus === 'loading' || col.fetchStatus === 'pending';
};
/**
 * Returns whether a query has been loaded at least once
 */


exports.isQueryLoading = isQueryLoading;

var hasQueryBeenLoaded = function hasQueryBeenLoaded(col) {
  return col.lastFetch;
};

exports.hasQueryBeenLoaded = hasQueryBeenLoaded;