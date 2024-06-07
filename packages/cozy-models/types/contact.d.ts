export const CONTACTS_DOCTYPE: "io.cozy.contacts";
export function getPrimaryOrFirst(property: any): (obj: any) => any;
export function getInitials(contact: import('cozy-client/types/types').IOCozyContact): string;
export function getPrimaryEmail(contact: import('cozy-client/types/types').IOCozyContact): string;
export function getPrimaryCozy(contact: import('cozy-client/types/types').IOCozyContact): string;
export function getPrimaryCozyDomain(contact: import('cozy-client/types/types').IOCozyContact): string;
export function getPrimaryPhone(contact: import('cozy-client/types/types').IOCozyContact): string;
export function getPrimaryAddress(contact: import('cozy-client/types/types').IOCozyContact): string;
export function makeFullname(contact: import('cozy-client/types/types').IOCozyContact, opts?: {
    attributesFullname: FullnameAttributes[];
}): string;
export function getFullname(contact: import('cozy-client/types/types').IOCozyContact): string;
export function makeDisplayName(contact: import('cozy-client/types/types').IOCozyContact, opts?: {
    attributesFullname: FullnameAttributes[];
}): string;
export function getDisplayName(contact: import('cozy-client/types/types').IOCozyContact): string;
export function makeDefaultSortIndexValue(contact: import('cozy-client/types/types').IOCozyContact): string;
export function getDefaultSortIndexValue(contact: import('cozy-client/types/types').IOCozyContact): string;
export function getIndexByFamilyNameGivenNameEmailCozyUrl(contact: import('cozy-client/types/types').IOCozyContact): string;
export function isContact(doc: object): boolean;
export type FullnameAttributes = "namePrefix" | "givenName" | "additionalName" | "familyName" | "nameSuffix";
