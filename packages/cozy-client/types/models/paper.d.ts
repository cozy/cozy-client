export const KNOWN_DATE_METADATA_NAMES: string[];
export const KNOWN_INFORMATION_METADATA_NAMES: string[];
export const KNOWN_OTHER_METADATA_NAMES: string[];
export const KNOWN_BILLS_ATTRIBUTES_NAMES: string[];
export function isExpiring(file: IOCozyFile): boolean;
export function computeExpirationDate(file: IOCozyFile): Date | null;
export function computeExpirationNoticeDate(file: IOCozyFile): Date | null;
export function computeExpirationNoticeLink(file: IOCozyFile): string | null;
export function isExpired(file: IOCozyFile): boolean;
export function isExpiringSoon(file: IOCozyFile): boolean;
export function makeMetadataQualification({ metadata, knownMetadataPath, value }: {
    metadata: any;
    knownMetadataPath: string;
    value: string | null;
}): {
    name: string;
    value: string | null;
};
export function formatMetadataQualification(metadata: any): {
    name: string;
    value: string | null;
}[];
export function getMetadataQualificationType(metadataName: string): MetadataQualificationType | null;
export function getTranslatedNameForDateMetadata(name: string, { lang }: {
    lang: string;
}): string;
export function formatDateMetadataValue(value: string, { lang, f }: {
    lang: string;
    f: Function;
}): string;
export function getTranslatedNameForInformationMetadata(name: string, { lang, qualificationLabel }: {
    lang: string;
    qualificationLabel: string;
}): string;
export function formatInformationMetadataValue(value: string, { lang, name, qualificationLabel }: {
    lang: string;
    name: string;
    qualificationLabel: string;
}): string;
export function getTranslatedNameForOtherMetadata(name: string, { lang }: {
    lang: string;
}): string;
export function formatOtherMetadataValue(value: string, { lang, name }: {
    lang: string;
    name: string;
}): string;
export function getTranslatedNameForContact({ lang }: {
    lang: string;
}): string;
export function formatContactValue(contacts: object[]): string;
export function makeExpiredMessage({ lang }: {
    lang: string;
}): string;
export function makeExpiresInMessage(expirationDate: string, { lang }: {
    lang: string;
}): string;
export function makeExpirationDescription(expirationDate: string, { lang }: {
    lang: string;
}): string;
export function isForeignPaper(file: IOCozyFile): boolean;
export type IOCozyFile = import("../types").CozyClientDocument & import("../types").FileDocument;
export type MetadataQualificationType = "other" | "date" | "contact" | "information" | "bills";
