export const LOCALSTORAGE_SYNCED_KEY: "cozy-client-pouch-link-synced";
export const LOCALSTORAGE_WARMUPEDQUERIES_KEY: "cozy-client-pouch-link-warmupedqueries";
export const LOCALSTORAGE_LASTSEQUENCES_KEY: "cozy-client-pouch-link-lastreplicationsequence";
export const LOCALSTORAGE_LASTREPLICATEDDOCID_KEY: "cozy-client-pouch-link-lastreplicateddocid";
export const LOCALSTORAGE_ADAPTERNAME: "cozy-client-pouch-link-adaptername";
export class PouchLocalStorage {
    constructor(storageEngine: any);
    storageEngine: any;
    /**
     * Persist the last replicated doc id for a doctype
     *
     * @param {string} doctype - The replicated doctype
     * @param {string} id - The docid
     *
     * @returns {Promise<void>}
     */
    persistLastReplicatedDocID(doctype: string, id: string): Promise<void>;
    /**
     * @returns {Promise<Record<string, string>>}
     */
    getAllLastReplicatedDocID(): Promise<Record<string, string>>;
    /**
     * Get the last replicated doc id for a doctype
     *
     * @param {string} doctype - The doctype
     * @returns {Promise<string>} The last replicated docid
     */
    getLastReplicatedDocID(doctype: string): Promise<string>;
    /**
     * Destroy all the replicated doc id
     *
     * @returns {Promise<void>}
     */
    destroyAllLastReplicatedDocID(): Promise<void>;
    /**
     * Persist the synchronized doctypes
     *
     * @param {Record<string, import("./types").SyncInfo>} syncedDoctypes - The sync doctypes
     *
     * @returns {Promise<void>}
     */
    persistSyncedDoctypes(syncedDoctypes: Record<string, import("./types").SyncInfo>): Promise<void>;
    /**
     * Get the persisted doctypes
     *
     * @returns {Promise<object>} The synced doctypes
     */
    getPersistedSyncedDoctypes(): Promise<object>;
    /**
     * Destroy the synced doctypes
     *
     * @returns {Promise<void>}
     */
    destroySyncedDoctypes(): Promise<void>;
    /**
     * Persist the last CouchDB sequence for a synced doctype
     *
     * @param {string} doctype - The synced doctype
     * @param {string} sequence - The sequence hash
     *
     * @returns {Promise<void>}
     */
    persistDoctypeLastSequence(doctype: string, sequence: string): Promise<void>;
    /**
     * @returns {Promise<object>}
     */
    getAllLastSequences(): Promise<object>;
    /**
     * Get the last CouchDB sequence for a doctype
     *
     * @param {string} doctype - The doctype
     *
     * @returns {Promise<string>} the last sequence
     */
    getDoctypeLastSequence(doctype: string): Promise<string>;
    /**
     * Destroy all the last sequence
     *
     * @returns {Promise<void>}
     */
    destroyAllDoctypeLastSequence(): Promise<void>;
    /**
     * Destroy the last sequence for a doctype
     *
     * @param {string} doctype - The doctype
     *
     * @returns {Promise<void>}
     */
    destroyDoctypeLastSequence(doctype: string): Promise<void>;
    /**
     * Persist the warmed up queries
     *
     * @param {object} warmedUpQueries - The warmedup queries
     *
     * @returns {Promise<void>}
     */
    persistWarmedUpQueries(warmedUpQueries: object): Promise<void>;
    /**
     * Get the warmed up queries
     *
     * @returns {Promise<object>} the warmed up queries
     */
    getPersistedWarmedUpQueries(): Promise<object>;
    /**
     * Destroy the warmed queries
     *
     * @returns {Promise<void>}
     */
    destroyWarmedUpQueries(): Promise<void>;
    /**
     * Get the adapter name
     *
     * @returns {Promise<string>} The adapter name
     */
    getAdapterName(): Promise<string>;
    /**
     * Persist the adapter name
     *
     * @param {string} adapter - The adapter name
     *
     * @returns {Promise<void>}
     */
    persistAdapterName(adapter: string): Promise<void>;
}
