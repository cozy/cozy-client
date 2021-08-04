export function transformBulkDocsResponse(bulkResponse: CouchDBBulkResult[], originalDocuments: CozyClientDocument[]): {
    data: CozyClientDocument[];
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
    executeQuery(query: any): any;
    executeMutation(mutation: any, result: any, forward: any): Promise<any>;
}
import { CouchDBBulkResult } from "./types";
import { CozyClientDocument } from "./types";
import CozyLink from "./CozyLink";
