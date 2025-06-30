export function isQueryLoading(col: any): boolean;
export function hasQueryBeenLoaded(col: any): any;
export function isQueriesLoading(queriesResults: any): boolean;
export function hasQueriesBeenLoaded(queriesResults: any): boolean;
export function isReactNativeOfflineError(err: Error): boolean;
export function isDebug(): boolean;
export type CancelablePromise = Promise<any>;
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
export function cancelable(promise: Promise<any>): CancelablePromise;
