export function isSelfHosted(instanceInfo: any): boolean;
export function arePremiumLinksEnabled(instanceInfo: any): boolean;
export function isFreemiumUser(instanceInfo: any): boolean;
export function getUuid(instanceInfo: any): any;
export function shouldDisplayOffers(data: {
    context: object;
    instance: object;
    diskUsage: object;
}): boolean;
export function hasAnOffer(data: {
    context: object;
    instance: object;
    diskUsage: object;
}): boolean;
export function buildPremiumLink(instanceInfo: object): string;
