declare var _default: {};
export default _default;
export type Cancelable = {
    /**
     * - Cancel the promise
     */
    cancel?: Function;
};
export type CancelablePromise = Promise<any> & Cancelable;
export type CancelablePromises = CancelablePromise[] & Cancelable;
