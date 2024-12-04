"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isReactNativeOfflineError = exports.hasQueriesBeenLoaded = exports.isQueriesLoading = exports.hasQueryBeenLoaded = exports.isQueryLoading = exports.cancelable = void 0;

var _logger = _interopRequireDefault(require("./logger"));

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
    _logger.default.warn('isQueryLoading called on falsy value.');

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
/**
 * Returns whether the result of queries are loading
 */


exports.hasQueryBeenLoaded = hasQueryBeenLoaded;

var isQueriesLoading = function isQueriesLoading(queriesResults) {
  return Object.values(queriesResults).some(function (queryResult) {
    return isQueryLoading(queryResult);
  });
};
/**
 * Returns whether queries have been loaded at least once
 */


exports.isQueriesLoading = isQueriesLoading;

var hasQueriesBeenLoaded = function hasQueriesBeenLoaded(queriesResults) {
  return Object.values(queriesResults).some(function (queryResult) {
    return hasQueryBeenLoaded(queryResult);
  });
};
/**
 * Check is the error is about ReactNative not having access to internet
 *
 * @param {Error} err - The error to check
 * @returns {boolean} True if the error is a network error, otherwise false
 */


exports.hasQueriesBeenLoaded = hasQueriesBeenLoaded;

var isReactNativeOfflineError = function isReactNativeOfflineError(err) {
  // This error message is specific to ReactNative
  // Network errors on a browser would produce another error.message
  return err.message === 'Network request failed';
};

exports.isReactNativeOfflineError = isReactNativeOfflineError;