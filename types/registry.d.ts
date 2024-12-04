export function transformRegistryFormatToStackFormat(doc: any): any;
export const registryEndpoint: "/registry/";
export default Registry;
export type RegistryApp = {
    slug: string;
    terms: object;
    installed: boolean;
    type: string;
};
export type RegistryAppChannel = "stable" | "dev" | "beta";
/**
 * @typedef {object} RegistryApp
 * @property {string} slug
 * @property {object} terms
 * @property {boolean} installed
 * @property {string} type
 */
/**
 * @typedef {"dev"|"beta"|"stable"} RegistryAppChannel
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
     *
     * @param  {RegistryApp} app - App to be installed
     * @returns {Promise}
     */
    uninstallApp(app: RegistryApp): Promise<any>;
    /**
     * Fetch at most 200 apps from the channel
     *
     * @param  {object} params - Fetching parameters
     * @param  {string} params.type - "webapp" or "konnector"
     * @param  {RegistryAppChannel} params.channel - The channel of the apps to fetch
     * @param  {string} params.limit - maximum number of fetched apps - defaults to 200
     *
     * @returns {Promise<Array<RegistryApp>>}
     */
    fetchApps(params: {
        type: string;
        channel: RegistryAppChannel;
        limit: string;
    }): Promise<Array<RegistryApp>>;
    /**
     * Fetch the list of apps that are in maintenance mode
     *
     * @returns {Promise<Array<RegistryApp>>}
     */
    fetchAppsInMaintenance(): Promise<Array<RegistryApp>>;
    /**
     * Fetch the status of a single app on the registry
     *
     * @param  {string} slug - The slug of the app to fetch
     *
     * @returns {Promise<RegistryApp>}
     */
    fetchApp(slug: string): Promise<RegistryApp>;
    /**
     * Fetch the latest version of an app for the given channel and slug
     *
     * @param  {object} params - Fetching parameters
     * @param  {string} params.slug - The slug of the app to fetch
     * @param  {RegistryAppChannel} params.channel - The channel of the app to fetch
     * @param  {string} params.version - The version of the app to fetch. Can also be "latest"
     *
     * @returns {Promise<RegistryApp>}
     */
    fetchAppVersion(params: {
        slug: string;
        channel: RegistryAppChannel;
        version: string;
    }): Promise<RegistryApp>;
}
