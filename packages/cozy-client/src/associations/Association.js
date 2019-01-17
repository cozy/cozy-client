/**
 * Associations are used by components to access related store documents that are
 * linked in a document. They are also responsible for building the query that is
 * used by the client to automatically fetch relationship data.
 *
 * Hydrated documents used by components come with Association instances.
 *
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
 * ```js
 * {
 *   name: 'St-Exupery',
 *   firstName: 'Antoine',
 *   _id: 'antoine'
 * }
 * ```
 *
 * It is the responsibility of the relationship to decide how the relationship data is stored.
 * For example, here since we use the default `has-one` relationship, the relationship data
 * is stored in the `relationships` attribute of the original document (in our case here, our book
 * would be
 *
 * ```js
 * {
 *   title: 'Le petit prince',
 *   relationships: {
 *     author: {
 *       data: {
 *         doctype: 'io.cozy.authors',
 *         _id: 'antoine'
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * In the case of an "in-place" relationship, the relationship data is stored directly under the attribute named
 * by the relationship (in our case `author`). Our book would be
 *
 * ```js
 * {
 *     title: 'Le petit prince',
 *     author: 'antoine'
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
  constructor(target, name, doctype, { dispatch, get, query, mutate, save }) {
class Association {
    /**
     * The original document declaring the relationship
     * @type {object}
     */
    this.target = target
    /**
     * The name of the relationship.
     * @type {string}
     * @example 'author'
     */
    this.name = name
    /**
     * Doctype of the relationship
     * @type {string}
     * @example 'io.cozy.authors'
     */
    this.doctype = doctype
    /**
     * Returns the document from the store
     * @type {function}
     */
    this.get = get
    /**
     * Performs a query to retrieve relationship documents.
     * Expects a QueryDefinition object as parameter.
     * @type {function}
     */
    this.query = query
    /**
     * Performs a mutation on the relationship.
     * @type {function}
     */
    this.mutate = mutate
    /**
     * Saves the relationship in store.
     * @type {function}
     */
    this.save = save
    /**
     * Dispatch an action on the store.
     * @type {function}
     */
    this.dispatch = dispatch
  }

  /**
   * Returns the raw relationship data as stored in the original document
   *
   * @example
   * For a document with relationships stored as JSON API spec
   * ```
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

   * Raw value will be
   * ```
   * {
   *   doctype: 'io.cozy.authors',
   *   id: 'herman'
   * }
   * ```
   * It's the child Association responsability to implement this method.
   */
  get raw() {
    throw new Error('A relationship must define its raw getter')
  }

  /**
   * Returns the document(s) from the store
   *
   * @example
   * For document with relationships store as JSON API spec
   * ```
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
   * data will be
   * ```
   * {
   *   _id: 'herman'
   *   _type: 'io.cozy.authors',
   *   firstName: 'herman',
   *   name: 'Melville'
   * }
   * ```
   * It's the child Association responsability to implement this method.
   */
  get data() {
    throw new Error('A relationship must define its data getter')
  }

  /**
   * Returns a QueryDefinition object, used by the client to retrieve the
   * relationship(s).
   */
  static query() {
    throw new Error('A custom relationship must define its query() function')
  }
}

export default Association
