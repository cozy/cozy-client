export function replicateOnce(pouchManager: import('./PouchManager').default): Promise<any>;
export type FulfilledPromise = {
    /**
     * - The status of the promise
     */
    status: 'fulfilled';
    /**
     * - The Error rejected by the promise (undefined when fulfilled)
     */
    reason: undefined;
    /**
     * - The resolved value of the promise
     */
    value: any;
};
export type RejectedPromise = {
    /**
     * - The status of the promise
     */
    status: 'rejected';
    /**
     * - The Error rejected by the promise
     */
    reason: Error;
    /**
     * - The resolved value of the promise (undefined when rejected)
     */
    value: undefined;
};
