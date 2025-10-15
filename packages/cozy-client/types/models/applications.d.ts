export function getStoreURL(appData?: any[], app?: object): string;
export function getStoreInstallationURL(appData?: any[], app?: object): string;
export function isInstalled(apps?: any[], wantedApp?: object): object;
export function getUrl(app: object): string;
export function getAppDisplayName(app: object, lang: string): string;
export function sortApplicationsList(apps: object[], slugsOrder: string[]): object[];
export function checkEntrypointCondition(entrypointCondition: EntrypointCondition): boolean;
export function shouldDisplayEntrypoint(entrypoint: Entrypoint): boolean;
export function selectEntrypoints(entrypoints: Entrypoint[], names: string[]): Entrypoint[];
export function filterEntrypoints(entrypoints: Entrypoint[]): Entrypoint[];
export type EntrypointTitle = {
    /**
     * - English title
     */
    en?: string;
    /**
     * - French title
     */
    fr?: string;
    /**
     * - Russian title
     */
    ru?: string;
    /**
     * - Vietnamese title
     */
    vi?: string;
};
export type EntrypointCondition = {
    /**
     * - The type of condition (currently only 'flag' is supported)
     */
    type: 'flag';
    /**
     * - The name of the flag
     */
    name: string;
    /**
     * - The expected value of the flag
     */
    value: boolean;
};
export type Entrypoint = {
    /**
     * - The unique name of the entrypoint
     */
    name: string;
    /**
     * - Localized titles for the entrypoint
     */
    title: EntrypointTitle;
    /**
     * - The URL hash for navigation
     */
    hash: string;
    /**
     * - Base64 encoded SVG icon
     */
    icon: string;
    /**
     * - Conditions that must be met to display the entrypoint
     */
    conditions?: EntrypointCondition[];
};
