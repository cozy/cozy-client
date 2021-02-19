export default Schema;
/**
 * Stores information on a particular doctype.
 *
 * - Attribute validation
 * - Relationship access
 *
 * ```js
 * const schema = new Schema({
 *   todos: {
 *     attributes: {
 *       label: {
 *         unique: true
 *       }
 *     },
 *     relationships: {
 *       author: 'has-one-in-place'
 *     }
 *   }
 * }, cozyStackClient)
 * ```
 */
declare class Schema {
    constructor(schemaDefinition?: {}, client?: any);
    byDoctype: {};
    client: any;
    add(schemaDefinition?: {}): void;
    /**
     * Returns the schema for a doctype
     *
     * Creates an empty schema implicitly if it does not exist
     */
    getDoctypeSchema(doctype: any): any;
    /**
     * Returns the relationship for a given doctype/name
     */
    getRelationship(doctype: any, relationshipName: any): any;
    /**
     * Validates a document considering the descriptions in schema.attributes.
     */
    validate(document: any): Promise<{}>;
    validateAttribute(document: any, attrName: any, attrProps: any): Promise<true | "must be unique">;
}
