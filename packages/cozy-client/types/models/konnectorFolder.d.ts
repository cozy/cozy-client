export function ensureKonnectorFolder(client: CozyClient, { konnector, account }: {
    konnector: import('../types').IOCozyKonnector;
    account: import('../types').IOCozyAccount;
}): Promise<import('../types').IOCozyFolder>;
export function createDirectoryByPath(client: CozyClient, path: string): Promise<import('../types').FileDocument>;
export function statDirectoryByPath(client: CozyClient, path: string): Promise<import('../types').FileDocument>;
export function buildFolderPath(konnector: import('../types').IOCozyKonnector, account: import('../types').IOCozyAccount, magicFolders?: any): string;
export function buildFolderPermission(folder: import('../types').IOCozyFolder): any;
import CozyClient from "../CozyClient";
