/**
 * @typedef {Object} CountryISO
 * @property {string} code2 - ISO 3166-1 alpha-2
 * @property {string} code3 - ISO 3166-1 alpha-3
 * @property {string} name - Country name
 * @property {string} number - ISO 3166-1 numeric
 */
/**
 * List of countries with their ISO codes
 *
 * @constant
 * @type {CountryISO[]}
 */
export const COUNTRIES_ISO: CountryISO[];
export function checkCountryCode(code: string): boolean;
export type CountryISO = {
    /**
     * - ISO 3166-1 alpha-2
     */
    code2: string;
    /**
     * - ISO 3166-1 alpha-3
     */
    code3: string;
    /**
     * - Country name
     */
    name: string;
    /**
     * - ISO 3166-1 numeric
     */
    number: string;
};
