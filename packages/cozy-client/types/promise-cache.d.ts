export default PromiseCache;
/**
 * Caches promises while they are pending
 * Serves to dedupe equal queries requested at the same time
 */
declare class PromiseCache {
    /**
     * Holds pending promises
     *
     * @type {Object.<string, Promise>}
     */
    pending: {
        [x: string]: Promise<any>;
    };
    /**
     * Tries to find a pending promise corresponding to the result of keyFunc
     * - If not found, promiseFunc is executed and the resulting promise is stored while it's pending
     * - If found, it is immediately returned
     *
     * @template T
     * @param  {function(): Promise<T>} promiseFunc - Not executed only if an "equal" promise is already pending.
     * @param  {function(): string} keyFunc - Returns a key to find in cache to find a pending promise.
     * @returns {Promise<T>}
     */
    exec<T>(promiseFunc: () => Promise<T>, keyFunc: () => string): Promise<T>;
    /**
     *
     * @param {function(): string} keyFunc - Returns a key to find in cache to find a pending promise.
     * @returns {Promise | null}
     */
    get(keyFunc: () => string): Promise<any> | null;
}
