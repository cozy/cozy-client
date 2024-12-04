export class BulkEditError extends Error {
    /**
     * Indicates that a bulk edit has (potentially partially) failed
     *
     * @param  {import("./types").CouchDBBulkResult[]} bulkResponse - CouchDB Bulk response
     * @param  {import("./types").CozyClientDocument[]} updatedDocs - Docs with updated _id and _rev
     */
    constructor(bulkResponse: import("./types").CouchDBBulkResult[], updatedDocs: import("./types").CozyClientDocument[]);
    results: {
        doc: import("./types").CozyClientDocument;
        ok: boolean;
        id: string;
        rev: string;
        /**
         * ?
         */
        error: string;
        /**
         * ?
         */
        reason: string;
    }[];
    /**
     * Get documents that have been correctly updated
     *
     * @returns {import("./types").CozyClientDocument[]}
     */
    getUpdatedDocuments(): import("./types").CozyClientDocument[];
    /**
     * Get bulk errors results
     *
     * @returns {Array<import("./types").CouchDBBulkResult & { doc: import("./types").CozyClientDocument }>}
     */
    getErrors(): Array<import("./types").CouchDBBulkResult & {
        doc: import("./types").CozyClientDocument;
    }>;
}
