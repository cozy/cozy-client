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
    pouches: import("lodash").Dictionary<any>;
    syncedDoctypes: any;
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
    /** Starts replication */
    replicateOnce(): Promise<void | import("./types").CancelablePromises>;
    executeQuery: any;
    addListeners(): void;
    removeListeners(): void;
    destroy(): Promise<any[]>;
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
    /**
     * Creating each replication
     *
     * @type {import('./types').CancelablePromises}
     */
    replications: import('./types').CancelablePromises;
    handleReplicationError(err: any): void;
    cancelCurrentReplications(): void;
    waitForCurrentReplications(): Promise<void> | Promise<any[]>;
    getPouch(doctype: any): any;
    updateSyncInfo(doctype: any): void;
    getSyncInfo(doctype: any): any;
    isSynced(doctype: any): boolean;
    clearSyncedDoctypes(): void;
    warmupQueries(doctype: any, queries: any): Promise<void>;
    checkToWarmupDoctype(doctype: any, replicationOptions: any): void;
    areQueriesWarmedUp(doctype: any, queries: any): any;
    clearWarmedUpQueries(): void;
}
import Loop from "./loop";
