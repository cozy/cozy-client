export default class StackLink extends CozyLink {
    constructor({ client, stackClient }?: {
        client: any;
        stackClient: any;
    });
    stackClient: any;
    registerClient(client: any): void;
    reset(): void;
    executeQuery(query: any): any;
    executeMutation(mutation: any, result: any, forward: any): any;
}
import CozyLink from "./CozyLink";
