export const CONTACTS_DOCTYPE: "io.cozy.contacts";
export function getPrimaryOrFirst(property: any): (obj: any) => any;
export function getInitials(contact: object): string;
export function getPrimaryEmail(contact: object): string;
export function getPrimaryCozy(contact: object): string;
export function getPrimaryCozyDomain(contact: object): string;
export function getPrimaryPhone(contact: object): string;
export function getPrimaryAddress(contact: object): string;
export function makeFullname(contact: object, opts?: {
    attributesFullname: FullnameAttributes[];
}): string;
export function getFullname(contact: object): string;
export function makeDisplayName(contact: any, opts?: {
    attributesFullname: FullnameAttributes[];
}): string;
export function getDisplayName(contact: object): string;
export function makeDefaultSortIndexValue(contact: object): string;
export function getDefaultSortIndexValue(contact: object): string;
export function getIndexByFamilyNameGivenNameEmailCozyUrl(contact: object): string;
export function isContact(doc: object): boolean;
export type FullnameAttributes = "namePrefix" | "givenName" | "additionalName" | "familyName" | "nameSuffix";
