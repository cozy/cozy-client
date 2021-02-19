export namespace MAGIC_FOLDERS {
    const ADMINISTRATIVE: string;
    const PHOTOS: string;
    const PHOTOS_BACKUP: string;
    const PHOTOS_UPLOAD: string;
    const NOTES: string;
    const HOME: string;
}
export function ensureMagicFolder(client: object, id: string, path: string): object;
export function createFolderWithReference(client: object, path: string, document: object): object;
export function getReferencedFolder(client: object, document: object): any[];
