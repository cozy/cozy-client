/** Filters unauthorized categories. Defaults to ['others'] if no suitable category. */
export function sanitizeCategories(categories: any): any;
export function areTermsValid(terms: any): boolean;
export function isPartnershipValid(partnership: any): boolean;
/**
 * Normalize app manifest, retro-compatibility for old manifests
 *
 * @param  {Manifest} manifest - app manifest to normalize
 * @returns {Manifest}
 */
export function sanitize(manifest: Manifest): Manifest;
import { Manifest } from "./types";
