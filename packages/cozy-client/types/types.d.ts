declare var _default: {};
export default _default;
export type Link = any;
export type Mutation = any;
export type DocumentCollection = any;
export type QueryResult = any;
export type HydratedDocument = any;
export type ReduxStore = any;
export type QueryState = any;
export type MutationOptions = any;
export type Token = any;
export type ClientResponse = any;
/**
 * - A document
 */
export type CozyClientDocument = {
    /**
     * - Id of the folder
     */
    _id?: string;
    /**
     * - Id of the folder
     */
    _type: string;
};
/**
 * - An io.cozy.files document
 */
export type IOCozyFile = {
    /**
     * - Id of the file
     */
    _id: string;
    /**
     * - Name of the file
     */
    name: string;
    /**
     * - Metadata of the file
     */
    metadata: object;
    /**
     * - Type of the file
     */
    type: object;
    /**
     * - Class of the file
     */
    class: object;
};
/**
 * - An io.cozy.files document
 */
export type IOCozyFolder = {
    /**
     * - Id of the folder
     */
    _id: string;
    /**
     * - Name of the folder
     */
    name: string;
    /**
     * - Metadata of the folder
     */
    metadata: object;
    /**
     * - Type of the folder
     */
    type: object;
};
