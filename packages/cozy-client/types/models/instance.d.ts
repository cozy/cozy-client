export function isSelfHosted(instanceInfo: any): boolean;
export function arePremiumLinksEnabled(instanceInfo: any): boolean;
export function isFreemiumUser(instanceInfo: any): boolean;
export function getUuid(instanceInfo: any): any;
export function shouldDisplayOffers(data: SettingsInfo): boolean;
export function hasAnOffer(data: SettingsInfo): boolean;
export function buildPremiumLink(instanceInfo: InstanceInfo): string;
export function hasPasswordDefinedAttribute(client: import("../CozyClient").default): Promise<boolean>;
export function makeDiskInfos(usage: number | string, quota?: number | string): DiskInfos;
export type InstanceInfo = object;
export type ContextInfo = object;
export type DiskUsageInfo = object;
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
export type DiskInfosRaw = {
    /**
     * - Space used in GB
     */
    diskQuota: number;
    /**
     * -  Maximum space available in GB
     */
    diskUsage: number;
    /**
     * - Usage percent of the disk
     */
    percentUsage: number;
};
export type DiskInfos = {
    /**
     * - Space used in GB rounded
     */
    humanDiskQuota: string;
    /**
     * - Maximum space available in GB rounded
     */
    humanDiskUsage: string;
    /**
     * - Usage percent of the disk rounded
     */
    percentUsage: string;
};
