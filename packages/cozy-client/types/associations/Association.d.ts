export default Association;
/**
 * Associations are used by components to access related store documents that are
 * linked in a document. They are also responsible for building the `QueryDefinition` that is
 * used by the client to automatically fetch relationship data.
 *
 * Hydrated documents used by components come with Association instances.
 *
 * @interface
 *
 * @description
 * Example: The schema defines an `author` relationship :
 *
 * ```js
 * const BOOK_SCHEMA = {
 *   relationships: {
 *      author: 'has-one'
 *   }
 * }
 * ```
 *
 * Hydrated `books` will have the `author` association instance under the `author` key.
 * Accessing `hydratedBook.author.data` gives you the author from the store, for example :
 *
 * ```json
 * {
 *   "name": "St-Exupery",
 *   "firstName": "Antoine",
 *   "_id": "antoine"
 * }
 * ```
 *
 * It is the responsibility of the relationship to decide how the relationship data is stored.
 * For example, here since we use the default `has-one` relationship, the relationship data
 * is stored in the `relationships` attribute of the original document (in our case here, our book
 * would be
 *
 * ```json
 * {
 *   "title": "Le petit prince",
 *   "relationships": {
 *     "author": {
 *       "data": {
 *         "doctype": "io.cozy.authors",
 *         "_id": "antoine"
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * In the case of an "in-place" relationship, the relationship data is stored directly under the attribute named
 * by the relationship (in our case `author`). Our book would be
 *
 * ```json
 * {
 *     "title": "Le petit prince",
 *     "author": "antoine"
 * }
 * ```
 *
 * ---
 *
 * Each different type of Association may change:
 *
 * - `get raw`: how the relationship data is stored (either as per the JSON API spec or
 *  in a custom way)
 * - `get data`: how the store documents are then fetched from the store to be added to
 * the hydrated document (.data method). View components will access
 * `hydratedDoc[relationshipName].data`.
 * - `get query`: how to build the query to fetch related documents
 *
 */
declare class Association {
    /**
     * Derived `Association`s need to implement this method.
     *
     * @param {CozyClientDocument} document - Document to query
     * @param {CozyClient} client - The CozyClient instance
     * @param {Association} assoc - Association containing info on how to build the query to fetch related documents
     *
     * @returns {CozyClientDocument | QueryDefinition }
     */
    static query(document: CozyClientDocument, client: CozyClient, assoc: Association): CozyClientDocument | QueryDefinition;
    /**
     * @param  {object} target - Original object containing raw data
     * @param  {string} name - Attribute under which the association is stored
     * @param  {string} doctype - Doctype of the documents managed by the association
     * @param {object} options - Options passed from the client
     * @param {Function} options.get - Get a document from the store
     * @param {Function} options.query - Execute client query
     * @param {Function} options.mutate - Execute client mutate
     * @param {Function} options.save - Execute client save
     * @param  {Function} options.dispatch - Store's dispatch, comes from the client
     */
    constructor(target: object, name: string, doctype: string, options: {
        get: Function;
        query: Function;
        mutate: Function;
        save: Function;
        dispatch: Function;
    });
    /**
     * The original document declaring the relationship
     *
     * @type {object}
     */
    target: object;
    /**
     * The name of the relationship.
     *
     * @type {string}
     * @example 'author'
     */
    name: string;
    /**
     * Doctype of the relationship
     *
     * @type {string}
     * @example 'io.cozy.authors'
     */
    doctype: string;
    /**
     * Returns the document from the store
     *
     * @type {Function}
     */
    get: Function;
    /**
     * Performs a query to retrieve relationship documents.
     *
     * @param {QueryDefinition} queryDefinition
     * @function
     */
    query: Function;
    /**
     * Performs a mutation on the relationship.
     *
     * @function
     */
    mutate: Function;
    /**
     * Saves the relationship in store.
     *
     * @type {Function}
     */
    save: Function;
    /**
     * Dispatch an action on the store.
     *
     * @type {Function}
     */
    dispatch: Function;
    /**
     *
     * Returns the raw relationship data as stored in the original document
     *
     * For a document with relationships stored as JSON API spec:
     *
     * ```js
     * const book = {
     *   title: 'Moby Dick',
     *   relationships: {
     *     author: {
     *       data: {
     *         doctype: 'io.cozy.authors',
     *         id: 'herman'
     *       }
     *     }
     *   }
     *  }
     * ```
     *
     * Raw value will be
     *
     * ```json
     * {
     *   "doctype": "io.cozy.authors",
     *   "id": "herman"
     * }
     * ```
     *
     * Derived `Association`s need to implement this method.
     *
     * @returns {object}
     */
    get raw(): any;
    /**
     * Returns the document(s) from the store
     *
     * For document with relationships stored as JSON API spec :
     *
     * ```js
     * const book = {
     *   title: 'Moby Dick',
     *   relationships: {
     *     author: {
     *       data: {
     *         doctype: 'io.cozy.authors',
     *         id: 'herman'
     *       }
     *     }
     *   }
     *  }
     * ```
     *
     * `data` will be
     *
     * ```json
     * {
     *   "_id": "herman"
     *   "_type": "io.cozy.authors",
     *   "firstName": "herman",
     *   "name": "Melville"
     * }
     * ```
     *
     * Derived `Association`s need to implement this method.
     *
     * @returns {object}
     */
    get data(): any;
}
import { CozyClientDocument } from "../types";
import CozyClient from "../CozyClient";
import { QueryDefinition } from "../queries/dsl";
