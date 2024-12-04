/**
 * @typedef {object} Document - Couchdb document like an io.cozy.files
 * @property {string} _id
 * @property {string} id
 * @property {string} _type
 * @property {string} type
 */
/**
 * @typedef {('ALL'|'GET'|'PATCH'|'POST'|'PUT'|'DELETE')} PermissionVerb
 */
/**
 * @typedef {object} PermissionItem
 * @property {PermissionVerb[]} verbs - ALL, GET, PUT, PATCH, DELETE, POST…
 * @property {string} selector - defaults to `id`
 * @property {string[]} values
 * @property {string} type - a couch db database like 'io.cozy.files'
 */
/**
 * Is this permission read only ?
 *
 * @private
 * @param {PermissionItem} perm - permission node in a io.cozy.permissions document
 * @param {object} options - Options
 * @param {PermissionVerb[]} [options.writability] - Writability
 * @returns {boolean} true if the note should be displayed read-only
 */
export function isReadOnly(perm: PermissionItem, options?: {
    writability: PermissionVerb[];
}): boolean;
/**
 * Fetches the list of permissions blocks
 *
 * @param {CozyClient} client -
 * @returns {Promise<PermissionItem[]>} list of permissions
 */
export function fetchOwn(client: CozyClient): Promise<PermissionItem[]>;
/**
 * Checks if the permission item is about a specific doctype
 *
 * @param {PermissionItem} permission -
 * @param {string} type - doctype
 */
export function isForType(permission: PermissionItem, type: string): boolean;
export function isDocumentReadOnly(args: any): Promise<boolean>;
export function isShortcutCreatedOnTheRecipientCozy(permission: Permission): boolean;
/**
 * - Couchdb document like an io.cozy.files
 */
export type Document = {
    _id: string;
    id: string;
    _type: string;
    type: string;
};
export type PermissionVerb = "POST" | "DELETE" | "PUT" | "GET" | "PATCH" | "ALL";
export type PermissionItem = {
    /**
     * - ALL, GET, PUT, PATCH, DELETE, POST…
     */
    verbs: PermissionVerb[];
    /**
     * - defaults to `id`
     */
    selector: string;
    values: string[];
    /**
     * - a couch db database like 'io.cozy.files'
     */
    type: string;
};
/**
 * When a cozy to cozy sharing is created Cozy's stack creates a
 * shortcut in `/Inbox of sharing` on the recipient's cozy to have a
 * quick access even when the sharing is not accepted yet.
 *
 * However, this file is created only if the stack knows the URL of the cozy.
 * This is not always the case.
 *
 * This method is here to tell us if the shortcut's file is created
 * on the recipient's cozy. It can be used to make an UI distinction between the
 * both situation.
 */
export type Permission = {
    /**
     * Permission document
     */
    data: object;
    /**
     * Member information from the sharing
     */
    included: any[];
};
import CozyClient from "../CozyClient";
