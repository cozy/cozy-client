export namespace MAGIC_FOLDERS {
    let ADMINISTRATIVE: string;
    let PHOTOS: string;
    let PHOTOS_BACKUP: string;
    let PHOTOS_UPLOAD: string;
    let NOTES: string;
    let HOME: string;
    let PAPERS: string;
    let COACH_CO2: string;
}
export function ensureMagicFolder(client: CozyClient, id: string, path: string): Promise<import("../types").IOCozyFolder>;
export function createFolderWithReference(client: CozyClient, path: string, document: import("../types").CozyClientDocument): Promise<import("../types").IOCozyFolder>;
export function getReferencedFolder(client: CozyClient, document: import("../types").CozyClientDocument): Promise<import("../types").IOCozyFolder>;
import CozyClient from '../CozyClient';
