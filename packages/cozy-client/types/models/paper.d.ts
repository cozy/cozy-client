export const KNOWN_DATE_METADATA_NAMES: string[];
export const KNOWN_INFORMATION_METADATA_NAMES: string[];
export const KNOWN_OTHER_METADATA_NAMES: string[];
export function isExpiring(file: IOCozyFile): boolean;
export function computeExpirationDate(file: IOCozyFile): Date | null;
export function computeExpirationNoticeDate(file: IOCozyFile): Date | null;
export function computeExpirationNoticeLink(file: IOCozyFile): string | null;
export function isExpired(file: IOCozyFile): boolean;
export function isExpiringSoon(file: IOCozyFile): boolean;
export function formatMetadataQualification(metadata: any): {
    name: string;
    value: string | null;
}[];
export type IOCozyFile = import("../types").CozyClientDocument & import("../types").FileDocument;
