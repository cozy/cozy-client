export function transformRegistryFormatToStackFormat(doc: any): any;
export const registryEndpoint: "/registry/";
export default Registry;
export type RegistryApp = {
    slug: string;
    terms: object;
    installed: boolean;
};
/**
 * @typedef {object} RegistryApp
 * @property {string} slug
 * @property {object} terms
 * @property {boolean} installed
 */
declare class Registry {
    constructor(options: any);
    client: any;
    /**
     * Installs or updates an app from a source.
     *
     * Accepts the terms if the app has them.
     *
     * @param  {RegistryApp} app - App to be installed
     * @param  {string} source - String (ex: registry://drive/stable)
     * @returns {Promise}
     */
    installApp(app: RegistryApp, source: string): Promise<any>;
    /**
     * Uninstalls an app.
     */
    uninstallApp(app: any): Promise<any>;
    /**
     * Fetch at most 200 apps from the channel
     *
     * @param  {object} params - Fetching parameters
     * @param  {string} params.type - "webapp" or "konnector"
     * @param  {string} params.channel - "dev"/"beta"/"stable"
     * @param  {string} params.limit - maximum number of fetched apps - defaults to 200
     *
     * @returns {Promise<Array<RegistryApp>>}
     */
    fetchApps(params: {
        type: string;
        channel: string;
        limit: string;
    }): Promise<Array<RegistryApp>>;
    /**
     * Fetch the list of apps that are in maintenance mode
     *
     * @returns {Array<RegistryApp>}
     */
    fetchAppsInMaintenance(): Array<RegistryApp>;
    /**
     * Fetch the status of a single app on the registry
     *
     * @param  {string} slug - The slug of the app to fetch
     *
     * @returns {RegistryApp}
     */
    fetchApp(slug: string): RegistryApp;
}
