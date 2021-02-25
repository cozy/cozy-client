/**
 *
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
    executeMutation(mutation: any, result: any, forward: any): any;
}
import CozyLink from "./CozyLink";
