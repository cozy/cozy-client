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
export function ensureMagicFolder(client: CozyClient, id: string, path: string): Promise<IOCozyFolder>;
export function createFolderWithReference(client: CozyClient, path: string, document: CozyClientDocument): Promise<IOCozyFolder>;
export function getReferencedFolder(client: CozyClient, document: CozyClientDocument): Promise<IOCozyFolder>;
import CozyClient from "../CozyClient";
import { IOCozyFolder } from "../types";
import { CozyClientDocument } from "../types";
