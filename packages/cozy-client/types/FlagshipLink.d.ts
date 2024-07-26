export default class FlagshipLink extends CozyLink {
    /**
     * @param {object} [options] - Options
     * @param  {object} [options.stackClient] - A StackClient
     * @param  {object} [options.client] - A StackClient (deprecated)
     * @param  {import('cozy-intent').WebviewService} [options.webviewIntent] - The webview's intent reference
     */
    constructor({ client, stackClient, webviewIntent }?: {
        stackClient: object;
        client: object;
        webviewIntent: import('cozy-intent').WebviewService;
    });
    stackClient: any;
    webviewIntent: import("cozy-intent").WebviewService;
    registerClient(client: any): void;
    reset(): void;
}
import CozyLink from "./CozyLink";
