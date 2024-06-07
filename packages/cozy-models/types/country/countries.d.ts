/**
 * List of countries with their ISO codes
 *
 * @constant
 * @type {import('../types').CountryISO[]}
 */
export const COUNTRIES_ISO: import('../types').CountryISO[];
export function isValidCountryCodeTranslation(lang: string, val: string): boolean;
export function isCountryCodeAlpha3(code: string): boolean;
export function isCountryCodeAlpha2(code: string): boolean;
export function checkCountryCode(code: string): boolean;
export function getAllCountries(lang: string): import('../types').Country[];
export function getCountryNameByCodeISO(code: string | number, { lang }?: {
    lang: string;
}): string | null;
export function getAllCountryNames(lang: string): string[];
export function getNationalityByCodeISO(code: string | number, { lang }?: {
    lang: string;
}): string | null;
export function getAllNationalities(lang: string): string[];
export function getEmojiByCountry(countryCode: string): string;
