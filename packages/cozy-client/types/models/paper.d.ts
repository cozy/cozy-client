export function isExpiring(file: IOCozyFile): boolean;
export function computeExpirationDate(file: IOCozyFile): Date | null;
export function computeExpirationNoticeDate(file: IOCozyFile): Date | null;
export function computeExpirationNoticeLink(file: IOCozyFile): string | null;
export function isExpired(file: IOCozyFile): boolean;
export function isExpiringSoon(file: IOCozyFile): boolean;
export type IOCozyFile = import("../types").CozyClientDocument & import("../types").FileDocument;
