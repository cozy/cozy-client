export default class DataProxyLink extends CozyLink {
    /**
     * @param {object} [options] - Options
     * @param  {object} [options.dataproxy] - The dataproxy reference
     */
    constructor({ dataproxy }?: {
        dataproxy: object;
    });
    dataproxy: any;
    registerClient(client: any): void;
    /**
     * When the link is given to a cozy-client instance, the dataproxy might not be ready yet.
     * Thus, this method will be typically called afterwards by the DataProxyProvider once
     * the dataproxy is ready and set
     *
     * @param {object} dataproxy - The dataproxy instance
     */
    registerDataProxy(dataproxy: object): void;
}
import CozyLink from "./CozyLink";
