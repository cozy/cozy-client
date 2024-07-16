export const LOCALSTORAGE_SYNCED_KEY: "cozy-client-pouch-link-synced";
export const LOCALSTORAGE_WARMUPEDQUERIES_KEY: "cozy-client-pouch-link-warmupedqueries";
export const LOCALSTORAGE_LASTSEQUENCES_KEY: "cozy-client-pouch-link-lastreplicationsequence";
export const LOCALSTORAGE_LASTREPLICATEDDOCID_KEY: "cozy-client-pouch-link-lastreplicateddocid";
export const LOCALSTORAGE_ADAPTERNAME: "cozy-client-pouch-link-adaptername";
export function persistLastReplicatedDocID(doctype: string, id: string): void;
export function getAllLastReplicatedDocID(): any;
export function getLastReplicatedDocID(doctype: string): string;
export function destroyAllLastReplicatedDocID(): void;
export function persistSyncedDoctypes(syncedDoctypes: Record<string, SyncInfo>): void;
export function getPersistedSyncedDoctypes(): object;
export function destroySyncedDoctypes(): void;
export function persistDoctypeLastSequence(doctype: string, sequence: string): void;
export function getAllLastSequences(): any;
export function getDoctypeLastSequence(doctype: string): string;
export function destroyAllDoctypeLastSequence(): void;
export function destroyDoctypeLastSequence(doctype: string): void;
export function persistWarmedUpQueries(warmedUpQueries: object): void;
export function getPersistedWarmedUpQueries(): object;
export function destroyWarmedUpQueries(): void;
export function getAdapterName(): string;
export function persistAdapterName(adapter: string): void;
/**
 * Persist the synchronized doctypes
 */
export type SyncInfo = {
    Date: string;
};
