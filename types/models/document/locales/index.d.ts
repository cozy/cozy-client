/**
 * @param {string} lang - fr, en, etc
 * @returns {(label: string, opts?: {country?: string, smart_count?: number}) => string}
 */
export function getBoundT(lang: string): (label: string, opts?: {
    country?: string;
    smart_count?: number;
}) => string;
/**
 * @param {string} lang - fr, en, etc
 * @returns {Function} - localization function
 */
export function getLocalizer(lang: string): Function;
