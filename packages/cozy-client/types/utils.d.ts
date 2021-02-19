export function isQueryLoading(col: any): boolean;
export function hasQueryBeenLoaded(col: any): any;
/**
 * Wraps a promise so that it can be canceled
 *
 * Rejects with canceled: true as soon as cancel is called
 *
 * @param  {Promise} promise
 * @returns {AugmentedPromise} - Promise with .cancel method
 */
export function cancelable(promise: Promise<any>): any;
