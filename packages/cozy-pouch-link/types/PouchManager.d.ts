export default PouchManager;
/**
 * Handles the lifecycle of several pouches
 *
 * - Creates/Destroys the pouches
 * - Replicates periodically
 */
declare class PouchManager {
    constructor(doctypes: any, options: any);
    options: any;
    doctypes: any;
    storage: PouchLocalStorage;
    PouchDB: any;
    isOnline: any;
    events: any;
    init(): Promise<void>;
    pouches: import("lodash").Dictionary<any>;
    /** @type {Record<string, import('./types').SyncInfo>} - Stores synchronization info per doctype */
    syncedDoctypes: Record<string, import('./types').SyncInfo>;
    warmedUpQueries: any;
    getReplicationURL: any;
    doctypesReplicationOptions: any;
    listenerLaunched: boolean;
    ensureDatabasesExistDone: boolean;
    /**
     * Starts periodic syncing of the pouches
     *
     * @returns {Promise<Loop | void>}
     */
    startReplicationLoop(): Promise<Loop | void>;
    /** Stop periodic syncing of the pouches */
    stopReplicationLoop(): void;
    /**
     * Starts replication
     *
     * @param {object} options - The options
     * @param {boolean|null} [options.waitForReplications=true] - Whether the others replication process should be waited
     * @returns {Promise<any>} the replication result
     */
    replicateOnce({ waitForReplications }?: {
        waitForReplications: boolean | null;
    }): Promise<any>;
    executeQuery: any;
    /** @type {import('./types').CancelablePromise[]} - Stores replication promises */
    replications: import('./types').CancelablePromise[];
    addListeners(): void;
    removeListeners(): void;
    destroy(): Promise<(import("./utils").FulfilledPromise | import("./utils").RejectedPromise)[]>;
    /**
     * Via a call to info() we ensure the database exist on the
     * remote side. This is done only once since after the first
     * call, we are sure that the databases have been created.
     */
    ensureDatabasesExist(): Promise<void>;
    replicationLoop: Loop;
    /**
     * If a replication is currently ongoing, will start a replication
     * just after it has finished. Otherwise it will start a replication
     * immediately
     */
    syncImmediately(): void;
    handleReplicationError(err: any): void;
    cancelCurrentReplications(): void;
    waitForCurrentReplications(): Promise<void> | Promise<(import("./utils").FulfilledPromise | import("./utils").RejectedPromise)[]>;
    getPouch(doctype: any): any;
    /**
     * Update the Sync info for the specifed doctype
     *
     * @param {string} doctype - The doctype to update
     * @param {import('./types').SyncStatus} status - The new Sync status for the doctype
     */
    updateSyncInfo(doctype: string, status?: import('./types').SyncStatus): Promise<void>;
    /**
     * Get the Sync info for the specified doctype
     *
     * @param {string} doctype - The doctype to check
     * @returns {import('./types').SyncInfo}
     */
    getSyncInfo(doctype: string): import('./types').SyncInfo;
    /**
     * Get the Sync status for the specified doctype
     *
     * @param {string} doctype - The doctype to check
     * @returns {import('./types').SyncStatus}
     */
    getSyncStatus(doctype: string): import('./types').SyncStatus;
    clearSyncedDoctypes(): Promise<void>;
    warmupQueries(doctype: any, queries: any): Promise<void>;
    checkToWarmupDoctype(doctype: any, replicationOptions: any): void;
    areQueriesWarmedUp(doctype: any, queries: any): Promise<any>;
    clearWarmedUpQueries(): Promise<void>;
}
import { PouchLocalStorage } from "./localStorage";
import Loop from "./loop";
