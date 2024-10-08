/**
 * @typedef {object} QualificationAttributes
 * @property {string} [icon] - The qualification icon.
 * @property {string} [label] - The qualification label.
 * @property {string} [purpose] - The document purpose.
 * @property {string} [sourceCategory] - The activity field of the document source.
 * @property {string} [sourceSubCategory] - The sub-activity field of the document source.
 * @property {Array<string>} [subjects] - On what is about the document.
 */
/**
 * This class is used to create document Qualification, i.e. metadata
 * attributes used to describe the document.
 * The qualifications model is stored in the assets, associating
 * labels to attributes, namely: purpose, sourceCategory, sourceSubCategory
 * and subjects.
 * A qualification can be customized accordingly to rules detailed in
 * the checkValueAttributes method.
 */
export class Qualification {
    /**
     * @param {string} label - The qualification label
     * @param {QualificationAttributes} attributes - Qualification's attributes
     */
    constructor(label: string, attributes?: QualificationAttributes);
    /**
     * @type {string}
     */
    icon: string;
    /**
     * @type {string?}
     */
    label: string | null;
    /**
     * @type {string?}
     */
    purpose: string | null;
    /**
     * @type {string?}
     */
    sourceCategory: string | null;
    /**
     * @type {string?}
     */
    sourceSubCategory: string | null;
    /**
     * @type {Array<string>?}
     */
    subjects: Array<string> | null;
    /**
     * Check the given qualification attributes respects the following rules:
     *   - For the given label, if a purpose, sourceCategory or sourceSubCategory
     *     attribute is defined in the model, it must match the given qualification.
     *   - If not defined in the model for the label, a custom purpose, sourceCategory or
     *     sourceSubCategory value can be defined, if it exist in their respective
     *     known values list.
     *   - For the given label, if subjects are defined in the model, they must be included
     *     in the given qualification.
     *   - If extra subjects are set, they should exist in the known values.
     *
     * @param {object} attributes - The qualification attributes to check
     */
    checkAttributes(attributes: object): void;
    /**
     * Set purpose to the qualification.
     *
     * @param {Array} purpose - The purpose to set.
     * @returns {Qualification} The Qualification object.
     */
    setPurpose(purpose: any[]): Qualification;
    /**
     * Set sourceCategory to the qualification.
     *
     * @param {Array} sourceCategory - The sourceCategory to set.
     * @returns {Qualification} The Qualification object.
     */
    setSourceCategory(sourceCategory: any[]): Qualification;
    /**
     * Set sourceSubCategory to the qualification.
     *
     * @param {Array} sourceSubCategory - The sourceSubCategory to set.
     * @returns {Qualification} The Qualification object.
     */
    setSourceSubCategory(sourceSubCategory: any[]): Qualification;
    /**
     * Set subjects to the qualification.
     *
     * @param {Array} subjects - The subjects to set.
     * @returns {Qualification} The Qualification object.
     */
    setSubjects(subjects: any[]): Qualification;
    /**
     * Set icon to the qualification.
     *
     * @param {string} icon - The icon to set.
     * @returns {Qualification} The Qualification object.
     */
    setIcon(icon: string): Qualification;
    /**
     * Returns the qualification attributes
     *
     * @returns {object} The qualification attributes
     */
    toQualification(): object;
}
export namespace Qualification {
    /**
     * Returns the qualification associated to a label.
     *
     * @param {string} label - The label to qualify
     * @returns {Qualification} - The qualification
     */
    function getByLabel(label: string): Qualification;
}
export function setQualification(document: object, qualification: Qualification): object;
export function getQualification(document: object): Qualification | null;
export function getIconByLabel(label: string): import('../../types').IconQualificationLabels | string;
export type QualificationAttributes = {
    /**
     * - The qualification icon.
     */
    icon?: string;
    /**
     * - The qualification label.
     */
    label?: string;
    /**
     * - The document purpose.
     */
    purpose?: string;
    /**
     * - The activity field of the document source.
     */
    sourceCategory?: string;
    /**
     * - The sub-activity field of the document source.
     */
    sourceSubCategory?: string;
    /**
     * - On what is about the document.
     */
    subjects?: Array<string>;
};
