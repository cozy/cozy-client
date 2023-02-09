/**
 * Filters unauthorized categories. Defaults to ['others'] if no suitable category.
 *
 * @param {Array<Object>} categories - Array of categories
 * @returns {Array<Object>} sanitized categories
 */
export function sanitizeCategories(categories: Array<any>): Array<any>;
export function areTermsValid(terms: any): boolean;
export function isPartnershipValid(partnership: any): boolean;
/**
 * Normalize app manifest, retro-compatibility for old manifests
 *
 * @param  {import('../types').Manifest} manifest - app manifest to normalize
 * @returns {import('../types').SanitizedManifest}
 */
export function sanitize(manifest: import('../types').Manifest): import('../types').SanitizedManifest;
export const ROLE_IDENTIFIER: "identifier";
/**
 * Legacy login fields declared by some konnectors
 */
export const legacyLoginFields: string[];
export function sanitizeIdentifier(fields: import('../types').ManifestFields): import('../types').ManifestFields;
export function getIdentifier(fields?: import('../types').ManifestFields): string | null;
