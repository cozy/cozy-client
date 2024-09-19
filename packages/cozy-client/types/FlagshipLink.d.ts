export default class FlagshipLink extends CozyLink {
    /**
     * @param {object} [options] - Options
     * @param  {import('cozy-intent').WebviewService} [options.webviewIntent] - The webview's intent reference
     */
    constructor({ webviewIntent }?: {
        webviewIntent: import('cozy-intent').WebviewService;
    });
    webviewIntent: import("cozy-intent").WebviewService;
    registerClient(client: any): void;
}
import CozyLink from "./CozyLink";
