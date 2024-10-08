export default HasManyInPlace;
/**
 *
 * Used when related documents are stored directly under the attribute with
 * only the ids.
 *
 * @property {Function} get
 *
 * @description
 *
 * An example document representing a TODO. See as the related
 * tasks are represented via ids.
 *
 * ```js
 * const todo = {
 *   label: "Protect people's privacy",
 *   tasks: [1, 2]
 * }
 * ```
 *
 * Here is the `Schema` that would represent this kind of document.
 * Components receiving todos via `Query`s would have an instance of `HasManyInPlace`
 * as their `tasks` attribute.
 *
 * ```js
 * const schema = {
 *   todos: {
 *      doctype: 'io.cozy.todos',
 *      relationships: {
 *        tasks: {
 *          doctype: 'io.cozy.tasks',
 *          type: 'has-many-in-place'
 *        }
 *      }
 *    }
 * }
 *
 * const todo = {
 *   label: "Get rich",
 *   tasks: [1, 2]
 * }
 * ```
 *
 */
declare class HasManyInPlace extends Association {
    /**
     * Raw property
     *
     * @type {Array<string>}
     */
    get raw(): string[];
    addById(id: any): void;
    removeById(id: any): void;
    existsById(id: any): boolean;
    getRelationship(): any;
    dehydrate(doc: any): any;
    get data(): any[];
}
import Association from './Association';
