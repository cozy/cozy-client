export default class ObservableQuery {
    constructor(queryId: any, definition: any, client: any, options: any);
    queryId: any;
    definition: any;
    client: any;
    observers: {};
    idCounter: number;
    lastResult: any;
    options: any;
    handleStoreChange: () => void;
    /**
     * Returns the query from the store with hydrated documents.
     *
     * @typedef {object} HydratedQueryState
     *
     * @returns {HydratedQueryState}
     */
    currentResult(): any;
    fetch(): any;
    /**
     * Generates and executes a query that is offsetted by the number of documents
     * we have in the store.
     */
    fetchMore(): any;
    currentRawResult(): any;
    notifyObservers(): void;
    subscribeToStore(): void;
    _unsubscribeStore: any;
    unsubscribeFromStore(): void;
    subscribe(callback: any): () => void;
    unsubscribe(callbackId: any): void;
    getStore(): any;
}
