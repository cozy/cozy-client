declare var _default: {};
export default _default;
export type Link = any;
export type Mutation = any;
export type DocumentCollection = any;
export type QueryResult = any;
export type HydratedDocument = any;
export type ReduxStore = any;
export type Token = any;
export type ClientResponse = any;
export type Manifest = any;
export type QueryFetchStatus = "loading" | "loaded" | "failed" | "pending";
export type QueryState = {
    id: string;
    definition: QueryDefinition;
    fetchStatus: QueryFetchStatus;
    lastFetch: number;
    lastUpdate: number;
    lastError: Error;
    hasMore: boolean;
    count: number;
    data: object | any[];
    bookmark: string;
};
export type FetchMoreAble = {
    fetchMore: Function;
};
export type UseQueryReturnValue = QueryState & FetchMoreAble;
/**
 * A reference to a document (special case of a relationship used between photos and albums)
 * https://docs.cozy.io/en/cozy-doctypes/docs/io.cozy.files/#references
 */
export type Reference = {
    /**
     * - id of the document
     */
    _id: string;
    /**
     * - doctype of the document
     */
    _type: string;
};
export type ReferenceMap = {
    [x: string]: Reference[];
};
export type MutationOptions = {
    as?: string;
    update?: Function;
    updateQueries?: Function;
};
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
    _type?: string;
    /**
     * - Id of the folder
     */
    relationships?: string;
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
export type ClientError = {
    status?: string;
};
export type FilePlugin = {
    externalRootDirectory?: object;
    cacheDirectory?: object;
    externalCacheDirectory?: object;
    dataDirectory?: object;
};
export type InAppBrowser = {
    open: Function;
};
export type Cordova = {
    file: FilePlugin;
    InAppBrowser: InAppBrowser;
    plugins: object;
};
export type CordovaWindow = {
    cordova: Cordova;
    SafariViewController: object;
    resolveLocalFileSystemURL: Function;
    handleOpenURL: Function;
};
import { QueryDefinition } from "./queries/dsl";
