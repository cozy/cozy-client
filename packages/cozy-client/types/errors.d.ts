export class BulkEditError extends Error {
    /**
     * Indicates that a bulk edit has (potentially partially) failed
     *
     * @param  {CouchDBBulkResult[]} bulkResponse - CouchDB Bulk response
     * @param  {CozyClientDocument[]} updatedDocs - Docs with updated _id and _rev
     */
    constructor(bulkResponse: CouchDBBulkResult[], updatedDocs: CozyClientDocument[]);
    results: {
        doc: CozyClientDocument;
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
     * @returns {CozyClientDocument[]}
     */
    getUpdatedDocuments(): CozyClientDocument[];
    /**
     * Get bulk errors results
     *
     * @returns {Array<CouchDBBulkResult & { doc: CozyClientDocument }>}
     */
    getErrors(): Array<CouchDBBulkResult & {
        doc: CozyClientDocument;
    }>;
}
import { CozyClientDocument } from "./types";
import { CouchDBBulkResult } from "./types";
