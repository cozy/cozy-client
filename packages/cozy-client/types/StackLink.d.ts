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
     */
    constructor({ client, stackClient }?: {
        stackClient: object;
        client: object;
    });
    stackClient: any;
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
