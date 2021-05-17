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
export function splitFilename(file: IOCozyFile): object;
export function isFile(file: IOCozyFile): boolean;
export function isDirectory(file: IOCozyFile): boolean;
export function isNote(file: IOCozyFile): boolean;
export function isOnlyOfficeFile(file: IOCozyFile): boolean;
export function shouldBeOpenedByOnlyOffice(file: IOCozyFile): boolean;
export function isShortcut(file: IOCozyFile): boolean;
export function getSharingShortcutStatus(file: IOCozyFile): string;
export function getSharingShortcutTargetMime(file: IOCozyFile): string;
export function getSharingShortcutTargetDoctype(file: IOCozyFile): string;
export function isSharingShortcut(file: IOCozyFile): boolean;
export function isSharingShorcut(file: IOCozyFile): boolean;
export function isSharingShortcutNew(file: IOCozyFile): boolean;
export function isSharingShorcutNew(file: object): boolean;
export function saveFileQualification(client: CozyClient, file: IOCozyFile, qualification: object): Promise<IOCozyFile>;
export function fetchFilesByQualificationRules(client: object, docRules: object): Promise<QueryResult>;
export function isReferencedByAlbum(file: IOCozyFile): boolean;
export function hasMetadataAttribute({ file, attribute }: {
    file: IOCozyFile;
    attribute: string;
}): boolean;
import { IOCozyFile } from "../types";
import CozyClient from "../CozyClient";
import { QueryResult } from "../types";
