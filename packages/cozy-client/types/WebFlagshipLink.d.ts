export default class WebFlagshipLink extends CozyLink {
    /**
     * @param {object} [options] - Options
     * @param  {import('cozy-intent').WebviewService} [options.webviewIntent] - The webview's intent reference
     */
    constructor({ webviewIntent }?: {
        webviewIntent?: any;
    });
    webviewIntent: any;
    registerClient(client: any): void;
    reset(): Promise<void>;
    request(operation: any, result: any, forward: any): Promise<any>;
    persistCozyData(data: any, forward: any): Promise<void>;
}
import CozyLink from './CozyLink';
