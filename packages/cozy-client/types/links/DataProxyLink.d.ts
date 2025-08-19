export default class DataProxyLink extends CozyLink {
    /**
     * @param {object} [options] - Options
     * @param  {object} [options.dataproxy] - The dataproxy reference
     */
    constructor({ dataproxy }?: {
        dataproxy: object;
    });
    dataproxy: any;
    _queue: any[];
    _drainingRequests: boolean;
    registerClient(client: any): void;
    /**
     * When the link is given to a cozy-client instance, the dataproxy might not be ready yet.
     * Thus, this method will be typically called afterwards by the DataProxyProvider once
     * the dataproxy is ready and set
     *
     * @param {object} dataproxy - The dataproxy instance
     */
    registerDataProxy(dataproxy: object): void;
    doRequest(operation: any, options: any): Promise<any>;
    _flushQueue(): Promise<void>;
    _onReceiveMessage: (event: any) => void;
}
import CozyLink from "./CozyLink";
