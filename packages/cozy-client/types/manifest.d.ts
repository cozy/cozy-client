/** Filters unauthorized categories. Defaults to ['others'] if no suitable category. */
export function sanitizeCategories(categories: any): any;
export function areTermsValid(terms: any): boolean;
export function isPartnershipValid(partnership: any): boolean;
/**
 * Normalize app manifest, retrocompatibility for old manifests
 *
 * @param  {Manifest} manifest
 * @returns {Manifest}
 */
export function sanitize(manifest: any): any;
