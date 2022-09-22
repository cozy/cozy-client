/**
 * @param {string} lang - fr, en, etc
 * @returns {(label: string, country?: string) => string}
 */
export function getBoundT(lang: string): (label: string, country?: string) => string;
