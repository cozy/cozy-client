export function isQueryLoading(col: any): boolean;
export function hasQueryBeenLoaded(col: any): any;
/**
 * {Promise}
 */
export type AugmentedPromise = {
    /**
     * - Cancel the promise
     */
    cancel: Function;
};
/**
 * Wraps a promise so that it can be canceled
 *
 * Rejects with canceled: true as soon as cancel is called
 *
 * @typedef AugmentedPromise {Promise}
 * @property {Function} cancel - Cancel the promise
 *
 * @param  {Promise} promise  - Promise
 * @returns {AugmentedPromise} - Promise with .cancel method
 */
export function cancelable(promise: Promise<any>): AugmentedPromise;
