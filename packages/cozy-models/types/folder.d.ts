export namespace MAGIC_FOLDERS {
    const ADMINISTRATIVE: string;
    const PHOTOS: string;
    const PHOTOS_BACKUP: string;
    const PHOTOS_UPLOAD: string;
    const NOTES: string;
    const HOME: string;
    const PAPERS: string;
    const COACH_CO2: string;
}
export function ensureMagicFolder(client: CozyClient, id: string, path: string): Promise<import("cozy-client/types/types").IOCozyFolder>;
export function createFolderWithReference(client: CozyClient, path: string, document: import("cozy-client/types/types").CozyClientDocument): Promise<import("cozy-client/types/types").IOCozyFolder>;
export function getReferencedFolder(client: CozyClient, document: import("cozy-client/types/types").CozyClientDocument): Promise<import("cozy-client/types/types").IOCozyFolder>;
import CozyClient from "cozy-client";
