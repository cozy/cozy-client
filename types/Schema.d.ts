export default Schema;
export type DoctypeSchema = any;
export type SchemaDefinition = {
    [x: string]: any;
};
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
    /**
     * @param  {SchemaDefinition} schemaDefinition - Schema for the application documents
     * @param  {object} client - An instance of cozy client (optional)
     */
    constructor(schemaDefinition?: SchemaDefinition, client?: object);
    byDoctype: {};
    client: any;
    /**
     * @param {SchemaDefinition} schemaDefinition - Additional schema to merge to current schema
     */
    add(schemaDefinition?: SchemaDefinition): void;
    /**
     * Returns the schema for a doctype
     *
     * Creates an empty schema implicitly if it does not exist
     *
     * @param {string} doctype - Doctype
     */
    getDoctypeSchema(doctype: string): any;
    /**
     * Returns the relationship for a given doctype/name
     *
     * @param {string} doctype - Doctype
     * @param {string} relationshipName - Relationship name
     */
    getRelationship(doctype: string, relationshipName: string): any;
    /**
     * Validates a document considering the descriptions in schema.attributes.
     */
    validate(document: any): Promise<{}>;
    validateAttribute(document: any, attrName: any, attrProps: any): Promise<true | "must be unique">;
}
