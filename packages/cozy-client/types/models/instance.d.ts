export function isSelfHosted(instanceInfo: any): boolean;
export function arePremiumLinksEnabled(instanceInfo: any): boolean;
export function isFreemiumUser(instanceInfo: any): boolean;
export function getUuid(instanceInfo: any): any;
export function shouldDisplayOffers(data: SettingsInfo): boolean;
export function hasAnOffer(data: SettingsInfo): boolean;
export function buildPremiumLink(instanceInfo: InstanceInfo): string;
export type InstanceInfo = any;
export type ContextInfo = any;
export type DiskUsageInfo = any;
export type SettingsInfo = {
    /**
     * - Object returned by /settings/context
     */
    context: ContextInfo;
    /**
     * - Object returned by /settings/instance
     */
    instance: InstanceInfo;
    /**
     * - Object returned by /settings/disk-usage
     */
    diskUsage: DiskUsageInfo;
};
