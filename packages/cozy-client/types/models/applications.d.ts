export function getStoreURL(appData?: any[], app?: object): string;
export function getStoreInstallationURL(appData?: any[], app?: object): string;
export function isInstalled(apps?: any[], wantedApp?: object): object;
export function getUrl(app: object): string;
export function getAppDisplayName(app: object, lang: string): string;
export function sortApplicationsList(apps: object[], slugsOrder: string[]): object[];
