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
export const DOCTYPE_FILES: "io.cozy.files";
export function splitFilename(file: import("cozy-client/types/types").IOCozyFile): {
    filename: string;
    extension: string;
};
export function isFile(file: import("cozy-client/types/types").IOCozyFile): boolean;
export function isDirectory(file: import("cozy-client/types/types").IOCozyFile): boolean;
export function isNote(file: import("cozy-client/types/types").IOCozyFile): boolean;
export function isEncrypted(file: import("cozy-client/types/types").IOCozyFile): boolean;
export function isOnlyOfficeFile(file: import("cozy-client/types/types").IOCozyFile): boolean;
export function shouldBeOpenedByOnlyOffice(file: import("cozy-client/types/types").IOCozyFile): boolean;
export function isShortcut(file: import("cozy-client/types/types").IOCozyFile): boolean;
export function getSharingShortcutStatus(file: import("cozy-client/types/types").IOCozyFile): string;
export function getSharingShortcutTargetMime(file: import("cozy-client/types/types").IOCozyFile): string;
export function getSharingShortcutTargetDoctype(file: import("cozy-client/types/types").IOCozyFile): string;
export function isSharingShortcut(file: import("cozy-client/types/types").IOCozyFile): boolean;
export function isSharingShorcut(file: import("cozy-client/types/types").IOCozyFile): boolean;
export function isSharingShortcutNew(file: import("cozy-client/types/types").IOCozyFile): boolean;
export function isSharingShorcutNew(file: object): boolean;
export function saveFileQualification(client: CozyClient, file: import("cozy-client/types/types").IOCozyFile, qualification: object): Promise<import("cozy-client/types/types").IOCozyFile>;
export function fetchFilesByQualificationRules(client: object, docRules: object): Promise<import("cozy-client/types/types").QueryResult>;
export function hasMetadataAttribute({ file, attribute }: {
    file: import("cozy-client/types/types").IOCozyFile;
    attribute: string;
}): boolean;
export function getFullpath(client: CozyClient, dirId: string, name: string): Promise<string>;
export function move(client: CozyClient, file: import("cozy-client/types/types").IOCozyFile | import("cozy-client/types/types").NextcloudFile, destination: import("cozy-client/types/types").IOCozyFolder | import("cozy-client/types/types").NextcloudFile, { force }?: {
    force: boolean;
}): Promise<{
    moved: undefined | import("cozy-client/types/types").IOCozyFile;
    deleted: null | string[];
}>;
export function overrideFileForPath(client: CozyClient, dirPath: string, file: object, metadata: object): Promise<import("cozy-client/types/types").IOCozyFile>;
export function generateNewFileNameOnConflict(filenameWithoutExtension: string, conflictOptions?: import("cozy-client/types/types").ConflictOptions): string;
export function generateFileNameForRevision(file: import("cozy-client/types/types").IOCozyFile, revision: object, f: Function): string;
export function uploadFileWithConflictStrategy(client: CozyClient, file: string | ArrayBuffer, options: FileUploadOptions): any;
export function readMobileFile(fileURL: string): Promise<any>;
export function doMobileUpload(client: CozyClient, fileURL: string, options: FileUploadOptions): Promise<any>;
export function isPlainText(mimeType?: string, fileName?: string): boolean;
export function hasQualifications(file: import("cozy-client/types/types").IOCozyFile): boolean;
export function hasCertifications(file: import("cozy-client/types/types").IOCozyFile): boolean;
export function isFromKonnector(file: import("cozy-client/types/types").IOCozyFile): boolean;
export function fetchBlobFileById(client: CozyClient, fileId: string): Promise<Blob>;
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
    conflictOptions?: import("cozy-client/types/types").ConflictOptions;
};
import CozyClient from "cozy-client";
