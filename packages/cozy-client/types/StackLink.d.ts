export function transformBulkDocsResponse(bulkResponse: import("./types").CouchDBBulkResult[], originalDocuments: import("./types").CozyClientDocument[]): {
    data: import("./types").CozyClientDocument[];
};
/**
 * Transfers queries and mutations to a remote stack
 */
export default class StackLink extends CozyLink {
    /**
     * @param {object} [options] - Options
     * @param  {object} [options.stackClient] - A StackClient
     * @param  {object} [options.client] - A StackClient (deprecated)
     * @param {import('cozy-pouch-link/dist/types').LinkPlatform} [options.platform] Platform specific adapters and methods
     */
    constructor({ client, stackClient, platform }?: {
        stackClient: object;
        client: object;
        platform: import('cozy-pouch-link/dist/types').LinkPlatform;
    });
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
import CozyLink from "./CozyLink";
import { QueryDefinition } from "./queries/dsl";
