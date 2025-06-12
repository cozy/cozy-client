/**
 * Normalizes an object representing a io.cozy.files object
 *
 * Ensures existence of `_id` and `_type`
 *
 * @public
 * @param {object} file - object representing the file
 * @returns {object} full normalized object
 */
export function normalize(file: object): object;
/**
 * Ensure the file has a `path` attribute, or build it
 *
 * @public
 * @param {object} file - object representing the file
 * @param {object} parent - parent directory for the file
 * @returns {object} file object with path attribute
 */
export function ensureFilePath(file: object, parent: object): object;
/**
 * Get the id of the parent folder (`null` for the root folder)
 *
 * @param {object} file  - io.cozy.files document
 * @returns {string|null} id of the parent folder, if any
 */
export function getParentFolderId(file: object): string | null;
export const ALBUMS_DOCTYPE: "io.cozy.photos.albums";
export function splitFilename(file: import("../types").IOCozyFile): {
    filename: string;
    extension: string;
};
export function isFile(file: import("../types").IOCozyFile): boolean;
export function isDirectory(file: import("../types").IOCozyFile): boolean;
export function isNote(file: import("../types").IOCozyFile): boolean;
export function isDocs(file: import("../types").IOCozyFile): boolean;
export function isEncrypted(file: import("../types").IOCozyFile): boolean;
export function getEncryptiondRef(dir: import("../types").IOCozyFile): boolean;
export function isEncryptedFolder(dir: import("../types").IOCozyFile): boolean;
export function isEncryptedFileOrFolder(fileOrdir: import("../types").IOCozyFile): boolean;
export function isOnlyOfficeFile(file: import("../types").IOCozyFile): boolean;
export function shouldBeOpenedByOnlyOffice(file: import("../types").IOCozyFile): boolean;
export function isShortcut(file: import("../types").IOCozyFile): boolean;
export function getSharingShortcutStatus(file: import("../types").IOCozyFile): string;
export function getSharingShortcutTargetMime(file: import("../types").IOCozyFile): string;
export function getSharingShortcutTargetDoctype(file: import("../types").IOCozyFile): string;
export function isSharingShortcut(file: import("../types").IOCozyFile): boolean;
export function isSharingShorcut(file: import("../types").IOCozyFile): boolean;
export function isSharingShortcutNew(file: import("../types").IOCozyFile): boolean;
export function isSharingShorcutNew(file: object): boolean;
export function saveFileQualification(client: CozyClient, file: import("../types").IOCozyFile, qualification: object): Promise<import("../types").IOCozyFile>;
export function fetchFilesByQualificationRules(client: object, docRules: object): Promise<import("../types").QueryResult>;
export function hasMetadataAttribute({ file, attribute }: {
    file: import("../types").IOCozyFile;
    attribute: string;
}): boolean;
export function getFullpath(client: CozyClient, dirId: string, name: string): Promise<string>;
export function move(client: CozyClient, file: import('../types').IOCozyFile | import('../types').NextcloudFile, destination: import('../types').IOCozyFolder | import('../types').NextcloudFile, { force }?: {
    force: boolean;
}): Promise<{
    moved: undefined | import('../types').IOCozyFile;
    deleted: null | string[];
}>;
export function overrideFileForPath(client: CozyClient, dirPath: string, file: object, metadata: object): Promise<import("../types").IOCozyFile>;
export function generateNewFileNameOnConflict(filenameWithoutExtension: string, conflictOptions?: import('../types').ConflictOptions): string;
export function generateFileNameForRevision(file: import("../types").IOCozyFile, revision: object, f: Function): string;
export function uploadFileWithConflictStrategy(client: CozyClient, file: string | ArrayBuffer, options: FileUploadOptions): any;
export function isPlainText(mimeType?: string, fileName?: string): boolean;
export function hasQualifications(file: import("../types").IOCozyFile): boolean;
export function hasCertifications(file: import("../types").IOCozyFile): boolean;
export function isFromKonnector(file: import("../types").IOCozyFile): boolean;
export function fetchBlobFileById(client: CozyClient, fileId: string): Promise<Blob>;
export function copy(client: object, file: object, destination: object): Promise<any>;
export function downloadFile({ client, file, url, webviewIntent }: {
    client: CozyClient;
    file: import("../types").IOCozyFile;
    url: string;
    webviewIntent: import('cozy-intent').WebviewService;
}): Promise<any>;
export type FileUploadOptions = {
    /**
     * - The file name to upload
     */
    name?: string;
    /**
     * - The dirId to upload the file to
     */
    dirId?: string;
    /**
     * - An object containing the metadata to attach
     */
    metadata?: object;
    /**
     * - The file Content-Type
     */
    contentType?: string;
    /**
     * - Erase / rename
     */
    conflictStrategy?: string;
    /**
     * - Conflict options
     */
    conflictOptions?: import('../types').ConflictOptions;
};
import CozyClient from "../CozyClient";
