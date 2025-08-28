export const CONTACTS_DOCTYPE: "io.cozy.contacts";
export function getPrimaryOrFirst(property: any): (obj: any) => any;
export function getInitials(contact: import('../types').IOCozyContact): string;
export function getPrimaryEmail(contact: import('../types').IOCozyContact): string;
export function getPrimaryCozy(contact: import('../types').IOCozyContact): string;
export function getPrimaryCozyDomain(contact: import('../types').IOCozyContact): string;
export function getPrimaryPhone(contact: import('../types').IOCozyContact): string;
export function getPrimaryAddress(contact: import('../types').IOCozyContact): string;
export function makeFullname(contact: import('../types').IOCozyContact, opts?: {
    attributesFullname: FullnameAttributes[];
}): string;
export function getFullname(contact: import('../types').IOCozyContact): string;
export function makeDisplayName(contact: import('../types').IOCozyContact, opts?: {
    attributesFullname: FullnameAttributes[];
}): string;
export function getDisplayName(contact: import('../types').IOCozyContact): string;
export function makeDefaultSortIndexValue(contact: import('../types').IOCozyContact): string;
export function getDefaultSortIndexValue(contact: import('../types').IOCozyContact): string;
export function getIndexByFamilyNameGivenNameEmailCozyUrl(contact: import('../types').IOCozyContact): string;
export function isContact(doc: object): boolean;
export function cleanFormattedAddress(formattedAddress: string): string;
export function getFormattedAddress(address: object, t: Function): string;
export function updateIndexFullNameAndDisplayName(contact: object): object;
export type FullnameAttributes = "namePrefix" | "givenName" | "additionalName" | "familyName" | "nameSuffix";
