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
export type SyncStatus = "synced" | "not_synced" | "not_complete";
export type SyncInfo = {
    /**
     * - The date of the last synchronization
     */
    date: string;
    /**
     * - The current synchronization status
     */
    status: SyncStatus;
};
export type LocalStorage = {
    getItem: (arg0: string) => Promise<string | null>;
    setItem: (arg0: string, arg1: string) => Promise<void>;
    removeItem: (arg0: string) => Promise<void>;
};
export type LinkPlatform = {
    /**
     * Methods to access local storage
     */
    storage: LocalStorage;
    /**
     * PouchDB class (can be pouchdb-core or pouchdb-browser)
     */
    pouchAdapter: any;
    /**
     * Method that check if the app is connected to internet
     */
    isOnline: () => Promise<boolean>;
};
