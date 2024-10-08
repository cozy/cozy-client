export function getHasManyItem(doc: object, relName: string, relItemId: string): any;
export function getHasManyItems(doc: any, relName: any): any;
export function setHasManyItem(doc: object, relName: string, relItemId: string, relItemAttrs: object): any;
export function removeHasManyItem(doc: object, relName: string, relItemId: string): any;
export function updateHasManyItem(doc: object, relName: string, relItemId: string, updater: Function): any;
export function updateRelationship(doc: any, relName: any, updateFn: any): any;
export default HasMany;
export type Relationship = {
    /**
     * - name of the relationship
     */
    relName: string;
    /**
     * - id of the relation
     */
    relItemId: string;
    /**
     * - Attributes to be set (at least _id and _type)
     */
    relItemAttrs: Relation;
};
export type Relation = {
    /**
     * - id of the relation
     */
    _id: string;
    /**
     * - doctype of the relation
     */
    _type: string;
};
/**
 * Related documents are stored in the relationships attribute of the object,
 * following the JSON API spec.
 *
 * Responsible for
 *
 * - Creating relationships
 * - Removing relationships
 *
 * @description
 *
 * ```
 * const schema = {
 *   todos: {
 *      doctype: 'io.cozy.todos',
 *      relationships: {
 *        tasks: {
 *          doctype: 'io.cozy.tasks',
 *          type: 'has-many'
 *        }
 *      }
 *    }
 * }
 *
 * const todo = {
 *   label: "Protect people's privacy",
 *   relationships: {
 *     tasks: {
 *       data: [
 *         {_id: 1, _type: 'io.cozy.tasks'},
 *         {_id: 2, _type: 'io.cozy.tasks'}
 *       ]
 *     }
 *   }
 * }
 * ```
 */
declare class HasMany extends Association {
    get hasMore(): any;
    /**
     * Returns the total number of documents in the relationship.
     * Does not handle documents absent from the store. If you want
     * to do that, you can use .data.length.
     *
     * @returns {number} - Total number of documents in the relationships
     */
    get count(): number;
    fetchMore(): void;
    exists(document: any): boolean;
    containsById(id: any): boolean;
    existsById(id: any): boolean;
    /**
     * Add the relationships to the target document
     *
     * @param {import("../types").CozyClientDocument[]} docsArg - Documents to add as relationships
     * @returns {import("../types").CozyClientDocument} The saved target document
     */
    add(docsArg: import("../types").CozyClientDocument[]): import("../types").CozyClientDocument;
    /**
     * Remove the relationships from the target document
     *
     * @param {import("../types").CozyClientDocument[]} docsArg - Documents to remove as relationships
     * @returns {import("../types").CozyClientDocument} The saved target document
     */
    remove(docsArg: import("../types").CozyClientDocument[]): import("../types").CozyClientDocument;
    /**
     * Update target document with relationships
     *
     * @param {string[]} idsArg - The ids to add as a relationship
     */
    addTargetRelationships(idsArg: string[]): void;
    /**
     * Add a referenced document by id. You need to call save()
     * in order to synchronize your document with the store.
     *
     * @todo We shouldn't create the array of relationship manually since
     * it'll not be present in the store as well.
     * We certainly should use something like `updateRelationship`
     *
     */
    addById(idsArg: any): any;
    /**
     * Remove relationships from target document
     *
     * @param {string[]} idsArg - The ids to remove from the target relationships
     */
    removeTargetRelationships(idsArg: string[]): void;
    removeById(idsArg: any): any;
    updateMetaCount(): void;
    getRelationship(): any;
    updateTargetRelationship(store: any, updateFn: any): void;
    updateRelationship(target: any, updateFn: any): any;
    updateRelationshipData: (getUpdatedRelationshipData: any) => (dispatch: any, getState: any) => void;
    dehydrate(doc: any): any;
}
import Association from './Association';
