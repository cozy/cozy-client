export function transformBulkDocsResponse(bulkResponse: import("../types").CouchDBBulkResult[], originalDocuments: import("../types").CozyClientDocument[]): {
    data: import("../types").CozyClientDocument[];
};
/**
 * @typedef {object} StackLinkOptions
 * @property {object} [stackClient] - A StackClient
 * @property {object} [client] - A StackClient (deprecated)
 * @property {import('cozy-pouch-link/dist/types').LinkPlatform} [platform] - Platform specific adapters and methods
 * @property {import('../performances/types').PerformanceAPI} [performanceApi] - The performance API that can be used to measure performances
 */
/**
 * Transfers queries and mutations to a remote stack
 */
export default class StackLink extends CozyLink {
    /**
     * @param {StackLinkOptions} [options] - Options
     */
    constructor({ client, stackClient, platform, performanceApi }?: StackLinkOptions);
    stackClient: any;
    isOnline: any;
    /** @type {import('../performances/types').PerformanceAPI} */
    performanceApi: import('../performances/types').PerformanceAPI;
    registerClient(client: any): void;
    /**
     *
     * @param {QueryDefinition} query - Query to execute
     * @returns {Promise<import("../types").ClientResponse>}
     */
    executeQuery(query: QueryDefinition): Promise<import("../types").ClientResponse>;
    executeMutation(mutation: any, options: any, result: any, forward: any): Promise<any>;
}
export type StackLinkOptions = {
    /**
     * - A StackClient
     */
    stackClient?: object;
    /**
     * - A StackClient (deprecated)
     */
    client?: object;
    /**
     * - Platform specific adapters and methods
     */
    platform?: any;
    /**
     * - The performance API that can be used to measure performances
     */
    performanceApi?: import('../performances/types').PerformanceAPI;
};
import CozyLink from "./CozyLink";
import { QueryDefinition } from "../queries/dsl";
