export function Q(doctype: Doctype): QueryDefinition;
export function isAGetByIdQuery(queryDefinition: QueryDefinition): boolean;
export function createDocument(document: any): {
    mutationType: string;
    document: any;
};
export function updateDocument(document: any): {
    mutationType: string;
    document: any;
};
export function updateDocuments(documents: any): {
    mutationType: string;
    documents: any;
};
export function deleteDocument(document: any): {
    mutationType: string;
    document: any;
};
export function addReferencesTo(document: any, referencedDocuments: any): {
    mutationType: string;
    referencedDocuments: any;
    document: any;
};
export function removeReferencesTo(document: any, referencedDocuments: any): {
    mutationType: string;
    referencedDocuments: any;
    document: any;
};
export function addReferencedBy(document: any, referencedDocuments: any): {
    mutationType: string;
    referencedDocuments: any;
    document: any;
};
export function removeReferencedBy(document: any, referencedDocuments: any): {
    mutationType: string;
    referencedDocuments: any;
    document: any;
};
export function uploadFile(file: any, dirPath: any): {
    mutationType: string;
    file: any;
    dirPath: any;
};
export function getDoctypeFromOperation(operation: any): any;
export namespace Mutations {
    export { createDocument };
    export { updateDocument };
    export { updateDocuments };
    export { deleteDocument };
    export { addReferencesTo };
    export { removeReferencesTo };
    export { addReferencedBy };
    export { removeReferencedBy };
    export { uploadFile };
}
export namespace MutationTypes {
    export { CREATE_DOCUMENT };
    export { UPDATE_DOCUMENT };
    export { UPDATE_DOCUMENTS };
    export { DELETE_DOCUMENT };
    export { ADD_REFERENCES_TO };
    export { REMOVE_REFERENCES_TO };
    export { ADD_REFERENCED_BY };
    export { REMOVE_REFERENCED_BY };
    export { UPLOAD_FILE };
}
export type PartialQueryDefinition = {
    indexedFields?: any[];
    sort?: any[];
    selector?: object;
};
export type MangoSelector = any;
export type Cursor = any[];
import { Doctype } from "../types";
/**
 * @typedef PartialQueryDefinition
 *
 * @property {Array} [indexedFields]
 * @property {Array} [sort]
 * @property {object} [selector]
 */
/**
 * @typedef {object} MangoSelector
 */
/**
 * @typedef {Array} Cursor
 */
/**
 * Chainable API to create query definitions to retrieve documents
 * from a Cozy. `QueryDefinition`s are sent to links.
 *
 * @augments {object}
 */
export class QueryDefinition {
    /**
     * @class
     *
     * @param {object} options Initial options for the query definition
     * @param {string} [options.doctype] - The doctype of the doc.
     * @param {string} [options.id] - The id of the doc.
     * @param {Array} [options.ids] - The ids of the docs.
     * @param {object} [options.selector] - The selector to query the docs.
     * @param {Array} [options.fields] - The fields to return.
     * @param {Array} [options.indexedFields] - The fields to index.
     * @param {object} [options.partialFilter] - The partial index definition to filter docs.
     * @param {Array} [options.sort] - The sorting params.
     * @param {Array<string>} [options.includes] - The docs to include.
     * @param {string} [options.referenced] - The referenced document.
     * @param {number|null} [options.limit] - The document's limit to return.
     * @param {number} [options.skip] - The number of docs to skip.
     * @param {Cursor} [options.cursor] - The cursor to paginate views.
     * @param {string} [options.bookmark] - The bookmark to paginate mango queries.
     */
    constructor(options?: {
        doctype: string;
        id: string;
        ids: any[];
        selector: object;
        fields: any[];
        indexedFields: any[];
        partialFilter: object;
        sort: any[];
        includes: Array<string>;
        referenced: string;
        limit: number | null;
        skip: number;
        cursor: Cursor;
        bookmark: string;
    });
    doctype: string;
    id: string;
    ids: any[];
    selector: any;
    fields: any[];
    indexedFields: any[];
    partialFilter: any;
    sort: any[];
    includes: string[];
    referenced: string;
    limit: number;
    skip: number;
    cursor: Cursor;
    bookmark: string;
    /**
     * Checks if the sort order matches the index' fields order.
     *
     * When sorting with CouchDB, it is required to:
     * - use indexed fields
     * - keep the same order than the indexed fields.
     *
     * See https://docs.cozy.io/en/tutorials/data/queries/#sort-data-with-mango
     *
     * @param {PartialQueryDefinition} obj - A partial QueryDefinition to check
     */
    checkSortOrder({ sort, selector, indexedFields }: PartialQueryDefinition): void;
    /**
     * Checks the selector predicates.
     *
     * It is useful to warn the developer when a partial index might be used.
     *
     * @param {MangoSelector} selector - The selector definition
     * @returns {void}
     */
    checkSelector(selector: MangoSelector): void;
    /**
     * Query a single document on its id.
     *
     * @param {string} id   The document id.
     * @returns {QueryDefinition}  The QueryDefinition object.
     */
    getById(id: string): QueryDefinition;
    /**
     * Query several documents on their ids.
     *
     * @param {Array} ids   The documents ids.
     * @returns {QueryDefinition}  The QueryDefinition object.
     */
    getByIds(ids: any[]): QueryDefinition;
    /**
     * Query documents with a [mango selector](http://docs.couchdb.org/en/latest/api/database/find.html#find-selectors).
     * Each field passed in the selector will be indexed, except if the indexField option is used.
     *
     * @param {MangoSelector} selector   The Mango selector.
     * @returns {QueryDefinition}  The QueryDefinition object.
     */
    where(selector: MangoSelector): QueryDefinition;
    /**
     * Specify which fields of each object should be returned. If it is omitted, the entire object is returned.
     *
     * @param {Array} fields The fields to return.
     * @returns {QueryDefinition}  The QueryDefinition object.
     */
    select(fields: any[]): QueryDefinition;
    /**
     * Specify which fields should be indexed. This prevent the automatic indexing of the mango fields.
     *
     * @param {Array} indexedFields The fields to index.
     * @returns {QueryDefinition}  The QueryDefinition object.
     */
    indexFields(indexedFields: any[]): QueryDefinition;
    /**
     * Specify a [partial index](https://docs.couchdb.org/en/stable/api/database/find.html#find-partial-indexes).
     * The filter must follow the same syntax than the selector.
     *
     * A partial index includes a filter, used to select documents before the indexing.
     * You can find more information about partial indexes [here](https://docs.cozy.io/en/tutorials/data/advanced/#partial-indexes)
     *
     * @param {object} partialFilter - The filter definition.
     */
    partialIndex(partialFilter: object): QueryDefinition;
    /**
     * Specify how to sort documents, following the [sort syntax](http://docs.couchdb.org/en/latest/api/database/find.html#find-sort)
     *
     * @param {Array} sort The list of field name and direction pairs.
     * @returns {QueryDefinition}  The QueryDefinition object.
     */
    sortBy(sort: any[]): QueryDefinition;
    /**
     * Includes documents having a relationships with the ones queried.
     * For example, query albums including the photos.
     *
     * @param {Array} includes The documents to include.
     * @returns {QueryDefinition}  The QueryDefinition object.
     */
    include(includes: any[]): QueryDefinition;
    /**
     * Maximum number of documents returned, useful for pagination. Default is 100.
     *
     * @param {number} limit The document's limit.
     * @returns {QueryDefinition}  The QueryDefinition object.
     */
    limitBy(limit: number): QueryDefinition;
    UNSAFE_noLimit(): QueryDefinition;
    /**
     * Skip the first ‘n’ documents, where ‘n’ is the value specified.
     *
     * Beware, this [performs badly](http://docs.couchdb.org/en/stable/ddocs/views/pagination.html#paging-alternate-method) on view's index.
     *  Prefer cursor-based pagination in such situation.
     *
     * @param {number} skip The number of documents to skip.
     * @returns {QueryDefinition}  The QueryDefinition object.
     */
    offset(skip: number): QueryDefinition;
    /**
     * Use [cursor-based](https://docs.cozy.io/en/cozy-stack/jsonapi/#pagination) pagination.
     * *Warning*: this is only useful for views.
     * The cursor is a [startkey, startkey_docid] array, where startkey is the view's key,
     * e.g. ["io.cozy.photos.albums", "album-id"] and startkey_docid is the id of
     * the starting document of the query, e.g. "file-id".
     * Use the last docid of each query as startkey_docid to paginate or leave blank for the first query.
     *
     * @param {Cursor} cursor The cursor for pagination.
     * @returns {QueryDefinition}  The QueryDefinition object.
     */
    offsetCursor(cursor: Cursor): QueryDefinition;
    /**
     * Use [bookmark](https://docs.couchdb.org/en/2.2.0/api/database/find.html#pagination) pagination.
     * Note this only applies for mango-queries (not views) and is way more efficient than skip pagination.
     * The bookmark is a string returned by the _find response and can be seen as a pointer in
     * the index for the next query.
     *
     * @param {string} bookmark The bookmark to continue a previous paginated query.
     * @returns {QueryDefinition}  The QueryDefinition object.
     */
    offsetBookmark(bookmark: string): QueryDefinition;
    /**
     * Use the [file reference system](https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/)
     *
     * @param {object} document The reference document
     * @returns {QueryDefinition}  The QueryDefinition object.
     */
    referencedBy(document: object): QueryDefinition;
    toDefinition(): {
        doctype: string;
        id: string;
        ids: any[];
        selector: any;
        fields: any[];
        indexedFields: any[];
        partialFilter: any;
        sort: any[];
        includes: string[];
        referenced: string;
        limit: number;
        skip: number;
        cursor: Cursor;
        bookmark: string;
    };
}
declare const CREATE_DOCUMENT: "CREATE_DOCUMENT";
declare const UPDATE_DOCUMENT: "UPDATE_DOCUMENT";
declare const UPDATE_DOCUMENTS: "UPDATE_DOCUMENTS";
declare const DELETE_DOCUMENT: "DELETE_DOCUMENT";
declare const ADD_REFERENCES_TO: "ADD_REFERENCES_TO";
declare const REMOVE_REFERENCES_TO: "REMOVE_REFERENCES_TO";
declare const ADD_REFERENCED_BY: "ADD_REFERENCED_BY";
declare const REMOVE_REFERENCED_BY: "REMOVE_REFERENCED_BY";
declare const UPLOAD_FILE: "UPLOAD_FILE";
export {};
