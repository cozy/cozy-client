/**
 * Associations are used by components to access related store documents that are
 * linked in a document. They are also responsible for building the query that is
 * used by the client to automatically fetch relationship data.
 *
 * Hydrated documents used by components come with Association instances.
 *
 * Example: The schema defines an `author` relationship :
 *
 * ```
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
 * ```
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
 * ```
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
 * ```
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
 * @module Association
 */
export default class Association {
  constructor(target, name, doctype, { get, query, mutate, save }) {
    this.target = target
    this.name = name
    this.doctype = doctype
    this.get = get
    this.query = query
    this.mutate = mutate
    this.save = save
  }

  static query() {
    throw new Error('A custom relationship must define its query() function')
  }
}
