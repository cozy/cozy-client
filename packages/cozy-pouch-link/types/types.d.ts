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
    queryEngine: DatabaseQueryEngine;
    /**
     * Method that check if the app is connected to internet
     */
    isOnline: () => Promise<boolean>;
};
export type MangoPartialFilter = any;
export type MangoSelector = any;
export type MangoSort = any[];
export type MangoQueryOptions = {
    /**
     * Selector
     */
    selector?: MangoSelector;
    /**
     * The sorting parameters
     */
    sort?: MangoSort;
    /**
     * The fields to return
     */
    fields?: Array<string>;
    /**
     * The partial filter fields
     */
    partialFilterFields?: Array<string>;
    /**
     * For pagination, the number of results to return
     */
    limit?: number | null;
    /**
     * For skip-based pagination, the number of referenced files to skip
     */
    skip?: number | null;
    /**
     * The _id of the CouchDB index to use for this request
     */
    indexId?: string | null;
    /**
     * For bookmark-based pagination, the document _id to start from
     */
    bookmark?: string | null;
    indexedFields?: Array<string>;
    /**
     * Name of the index to use
     */
    use_index?: string;
    /**
     * If true, we request the stats from Couch
     */
    execution_stats?: boolean;
    /**
     * An optional partial filter
     */
    partialFilter?: MangoPartialFilter | null;
};
export type PouchDbIndex = {
    /**
     * - The ddoc's id
     */
    id: string;
    /**
     * - The ddoc's name
     */
    name: string;
    /**
     * - If the index has been created or if it already exists
     */
    result: 'exists' | 'created';
};
export type PouchDBInfo = {
    /**
     * - The database name
     */
    db_name: string;
    /**
     * - The number of doc in the database
     */
    doc_count: number;
    /**
     * - The sequence number
     */
    update_seq: number;
};
export type PouchDBChangesResults = {
    /**
     * - The changes results
     */
    results: Array<PouchDBChanges>;
    /**
     * - The last sequence number
     */
    last_seq: number;
};
export type PouchDBChanges = {
    /**
     * - The doc id
     */
    id: string;
    /**
     * - Whether or not the change is a deleted doc
     */
    deleted: boolean;
    /**
     * - The list of changes revisions
     */
    changes: Array<object>;
    /**
     * - The changed doc
     */
    doc: object;
};
import DatabaseQueryEngine from "./db/dbInterface";
