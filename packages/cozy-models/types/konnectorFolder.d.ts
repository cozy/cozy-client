export function ensureKonnectorFolder(client: CozyClient, { konnector, account, lang }: {
    konnector: import("cozy-client/types/types").IOCozyKonnector;
    account: import("cozy-client/types/types").IOCozyAccount;
    lang: string;
}): Promise<import("cozy-client/types/types").IOCozyFolder>;
export function createDirectoryByPath(client: CozyClient, path: string): Promise<import("cozy-client/types/types").IOCozyFolder>;
export function statDirectoryByPath(client: CozyClient, path: string): Promise<import("cozy-client/types/types").IOCozyFolder | null>;
export function buildFolderPath(konnector: import("cozy-client/types/types").IOCozyKonnector, account: import("cozy-client/types/types").IOCozyAccount, magicFolders?: {
    [x: string]: string;
}): string;
export function buildFolderPermission(folder: import("cozy-client/types/types").IOCozyFolder): any;
export function findKonnectorAccountFolderByReference({ client, slug, sourceAccountIdentifier }: {
    client: CozyClient;
    slug: string;
    sourceAccountIdentifier: string;
}): Promise<import("cozy-client/types/types").IOCozyFolder>;
import CozyClient from "cozy-client";
