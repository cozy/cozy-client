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
export function splitFilename(file: object): object;
export function isFile(file: File): boolean;
export function isDirectory(file: File): boolean;
export function isNote(file: File): boolean;
export function isShortcut(file: File): boolean;
export function getSharingShortcutStatus(file: object): string;
export function getSharingShortcutTargetMime(file: object): string;
export function getSharingShortcutTargetDoctype(file: object): string;
export function isSharingShortcut(file: object): boolean;
export function isSharingShorcut(file: object): boolean;
export function isSharingShortcutNew(file: object): boolean;
export function isSharingShorcutNew(file: object): boolean;
export function saveFileQualification(client: object, file: object, qualification: object): object;
export function fetchFilesByQualificationRules(client: object, docRules: object): object;
