export function transformBulkDocsResponse(bulkResponse: import("./types").CouchDBBulkResult[], originalDocuments: import("./types").CozyClientDocument[]): {
    data: import("./types").CozyClientDocument[];
};
/**
 * @typedef {object} StackLinkOptions
 * @property {object} [stackClient] - A StackClient
 * @property {object} [client] - A StackClient (deprecated)
 * @property {import('cozy-pouch-link/dist/types').LinkPlatform} [platform] - Platform specific adapters and methods
 */
/**
 * Transfers queries and mutations to a remote stack
 */
export default class StackLink extends CozyLink {
    /**
     * @param {StackLinkOptions} [options] - Options
     */
    constructor({ client, stackClient, platform }?: StackLinkOptions);
    stackClient: any;
    isOnline: any;
    registerClient(client: any): void;
    reset(): void;
    /**
     *
     * @param {QueryDefinition} query - Query to execute
     * @returns {Promise<import("./types").ClientResponse>}
     */
    executeQuery(query: QueryDefinition): Promise<import("./types").ClientResponse>;
    executeMutation(mutation: any, result: any, forward: any): Promise<any>;
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
};
import CozyLink from "./CozyLink";
import { QueryDefinition } from "./queries/dsl";
