export function ensureKonnectorFolder(client: CozyClient, { konnector, account, lang }: {
    konnector: import('../types').IOCozyKonnector;
    account: import('../types').IOCozyAccount;
    lang: string;
}): Promise<import('../types').IOCozyFolder>;
export function createDirectoryByPath(client: CozyClient, path: string): Promise<import('../types').IOCozyFolder>;
export function statDirectoryByPath(client: CozyClient, path: string): Promise<import('../types').IOCozyFolder | null>;
export function buildFolderPath(konnector: import('../types').IOCozyKonnector, account: import('../types').IOCozyAccount, magicFolders?: {
    [x: string]: string;
}): string;
export function buildFolderPermission(folder: import('../types').IOCozyFolder): any;
import CozyClient from "../CozyClient";
