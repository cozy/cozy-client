export function getReplicationURL(uri: any, token: any, doctype: any): string;
export function isExpiredTokenError(pouchError: any): boolean;
export default PouchLink;
export type CozyClientDocument = any;
export type ReplicationStatus = "idle" | "replicating";
export type PouchLinkOptions = {
    /**
     * Milliseconds between replications
     */
    replicationInterval?: number;
    /**
     * Doctypes to replicate
     */
    doctypes: string[];
    /**
     * A mapping from doctypes to replication options. All pouch replication options can be used, as well as the "strategy" option that determines which way the replication is done (can be "sync", "fromRemote" or "toRemote")
     */
    doctypesReplicationOptions: Record<string, object>;
    /**
     * Platform specific adapters and methods
     */
    platform: import('./types').LinkPlatform;
};
/**
 * @typedef {import('cozy-client/src/types').CozyClientDocument} CozyClientDocument
 *
 * @typedef {"idle"|"replicating"} ReplicationStatus
 */
/**
 * @typedef {object} PouchLinkOptions
 * @property {number} [replicationInterval] Milliseconds between replications
 * @property {string[]} doctypes Doctypes to replicate
 * @property {Record<string, object>} doctypesReplicationOptions A mapping from doctypes to replication options. All pouch replication options can be used, as well as the "strategy" option that determines which way the replication is done (can be "sync", "fromRemote" or "toRemote")
 * @property {import('./types').LinkPlatform} platform Platform specific adapters and methods
 */
/**
 * Link to be passed to a `CozyClient` instance to support CouchDB. It instantiates
 * PouchDB collections for each doctype that it supports and knows how
 * to respond to queries and mutations.
 */
declare class PouchLink extends CozyLink {
    /**
     * Return the PouchDB adapter name.
     * Should be IndexedDB for newest adapters.
     *
     * @param {import('./types').LocalStorage} localStorage Methods to access local storage
     * @returns {Promise<string>} The adapter name
     */
    static getPouchAdapterName: (localStorage: import('./types').LocalStorage) => Promise<string>;
    /**
     * constructor - Initializes a new PouchLink
     *
     * @param {PouchLinkOptions} [opts={}]
     */
    constructor(opts?: PouchLinkOptions);
    options: {
        replicationInterval: number;
    } & PouchLinkOptions;
    doctypes: string[];
    doctypesReplicationOptions: Record<string, any>;
    indexes: {};
    storage: PouchLocalStorage;
    /** @type {Record<string, ReplicationStatus>} - Stores replication states per doctype */
    replicationStatus: Record<string, ReplicationStatus>;
    getReplicationURL(doctype: any): string;
    registerClient(client: any): Promise<void>;
    client: any;
    /**
     * Migrate the current adapter
     *
     * @typedef {object} MigrationParams
     * @property {string} [fromAdapter] - The current adapter type, e.g. 'idb'
     * @property {string} [toAdapter] - The new adapter type, e.g. 'indexeddb'
     * @property {string} [url] - The Cozy URL
     * @property {Array<object>} [plugins] - The PouchDB plugins
     *
     * @param {MigrationParams} params - Migration params
     */
    migrateAdapter({ fromAdapter, toAdapter, url, plugins }: {
        /**
         * - The current adapter type, e.g. 'idb'
         */
        fromAdapter?: string;
        /**
         * - The new adapter type, e.g. 'indexeddb'
         */
        toAdapter?: string;
        /**
         * - The Cozy URL
         */
        url?: string;
        /**
         * - The PouchDB plugins
         */
        plugins?: Array<object>;
    }): Promise<void>;
    onLogin(): Promise<void>;
    pouches: PouchManager;
    /**
     * Receives PouchDB updates (documents grouped by doctype).
     * Normalizes the data (.id -> ._id, .rev -> _rev).
     * Passes the data to the client and to the onSync handler.
     *
     * Emits an event (pouchlink:sync:end) when the sync (all doctypes) is done
     */
    handleOnSync(doctypeUpdates: any): void;
    handleDoctypeSyncStart(doctype: any): void;
    handleDoctypeSyncEnd(doctype: any): void;
    /**
     * User of the link can call this to start ongoing replications.
     * Typically, it can be used when the application regains focus.
     *
     * Emits pouchlink:sync:start event when the replication begins
     *
     * @public
     * @returns {void}
     */
    public startReplication(): void;
    /**
     * User of the link can call this to stop ongoing replications.
     * Typically, it can be used when the applications loses focus.
     *
     * Emits pouchlink:sync:stop event
     *
     * @public
     * @returns {void}
     */
    public stopReplication(): void;
    onSyncError(error: any): Promise<void>;
    getSyncInfo(doctype: any): import("./types").SyncInfo;
    getPouch(doctype: any): any;
    supportsOperation(operation: any): boolean;
    sanitizeJsonApi(data: any): Pick<Pick<any, string | number | symbol>, string | number | symbol>;
    /**
     * Retrieve the existing document from Pouch
     *
     * @private
     * @param {*} id - ID of the document to retrieve
     * @param {*} type - Doctype of the document to retrieve
     * @param {*} throwIfNotFound - If true the method will throw when the document is not found. Otherwise it will return null
     * @returns {Promise<CozyClientDocument | null>}
     */
    private getExistingDocument;
    /**
     *
     * Check if there is warmup queries for this doctype
     * and return if those queries are already warmed up or not
     *
     * @param {string} doctype - Doctype to check
     * @returns {Promise<boolean>} the need to wait for the warmup
     */
    needsToWaitWarmup(doctype: string): Promise<boolean>;
    hasIndex(name: any): boolean;
    /**
     * Create the PouchDB index if not existing
     *
     * @param {Array} fields - Fields to index
     * @param {object} indexOption - Options for the index
     * @param {object} [indexOption.partialFilter] - partialFilter
     * @param {string} [indexOption.indexName] - indexName
     * @param {string} [indexOption.doctype] - doctype
     * @returns {Promise<import('./types').PouchDbIndex>}
     */
    createIndex(fields: any[], { partialFilter, indexName, doctype }?: {
        partialFilter: object;
        indexName: string;
        doctype: string;
    }): Promise<import('./types').PouchDbIndex>;
    /**
     * Retrieve the PouchDB index if exist, undefined otherwise
     *
     * @param {string} doctype - The query's doctype
     * @param {import('./types').MangoQueryOptions} options - The find options
     * @param {string} indexName - The index name
     * @returns {import('./types').PouchDbIndex | undefined}
     */
    findExistingIndex(doctype: string, options: import('./types').MangoQueryOptions, indexName: string): import('./types').PouchDbIndex | undefined;
    /**
     * Handle index creation if it is missing.
     *
     * When an index is missing, we first check if there is one with a different
     * name but the same definition. If there is none, we create the new index.
     *
     * /!\ Warning: this method is similar to DocumentCollection.handleMissingIndex()
     * If you edit this method, please check if the change is also needed in DocumentCollection
     *
     * @param {string} doctype The mango selector
     * @param {import('./types').MangoQueryOptions} options The find options
     * @returns {Promise<import('./types').PouchDbIndex>} index
     * @private
     */
    private ensureIndex;
    executeQuery({ doctype, selector, sort, fields, limit, id, ids, skip, indexedFields, partialFilter }: {
        doctype: any;
        selector: any;
        sort: any;
        fields: any;
        limit: any;
        id: any;
        ids: any;
        skip: any;
        indexedFields: any;
        partialFilter: any;
    }): Promise<{
        data: any;
        meta?: undefined;
        skip?: undefined;
        next?: undefined;
    } | {
        data: any;
        meta: {
            count: any;
        };
        skip: any;
        next: boolean;
    }>;
    executeMutation(mutation: any, result: any, forward: any): Promise<any>;
    createDocument(mutation: any): Promise<any>;
    updateDocument(mutation: any): Promise<any>;
    updateDocuments(mutation: any): Promise<any[]>;
    deleteDocument(mutation: any): Promise<any>;
    addReferencesTo(mutation: any): Promise<void>;
    dbMethod(method: any, mutation: any): Promise<any>;
    syncImmediately(): Promise<void>;
}
import { CozyLink } from "cozy-client";
import { PouchLocalStorage } from "./localStorage";
import PouchManager from "./PouchManager";
