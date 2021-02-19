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
     * @typedef {object} Qualification Qualification's object.
     * @property {string} label - The qualification label.
     * @property {string} purpose - The document purpose.
     * @property {string} sourceCategory - The activity field of the document source.
     * @property {string} sourceSubCategory - The sub-activity field of the document source.
     * @property {Array} subjects - On what is about the document.
     */
    /**
     * @param {string} label - The qualification label
     * @param {Qualification} attributes - Qualification's attributes
     */
    constructor(label: string, attributes?: {
        /**
         * - The qualification label.
         */
        label: string;
        /**
         * - The document purpose.
         */
        purpose: string;
        /**
         * - The activity field of the document source.
         */
        sourceCategory: string;
        /**
         * - The sub-activity field of the document source.
         */
        sourceSubCategory: string;
        /**
         * - On what is about the document.
         */
        subjects: any[];
    });
    label: string;
    purpose: string;
    sourceCategory: string;
    sourceSubCategory: string;
    subjects: any[];
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
    setPurpose(purpose: any[]): {
        /**
         * - The qualification label.
         */
        label: string;
        /**
         * - The document purpose.
         */
        purpose: string;
        /**
         * - The activity field of the document source.
         */
        sourceCategory: string;
        /**
         * - The sub-activity field of the document source.
         */
        sourceSubCategory: string;
        /**
         * - On what is about the document.
         */
        subjects: any[];
    };
    /**
     * Set sourceCategory to the qualification.
     *
     * @param {Array} sourceCategory - The sourceCategory to set.
     * @returns {Qualification} The Qualification object.
     */
    setSourceCategory(sourceCategory: any[]): {
        /**
         * - The qualification label.
         */
        label: string;
        /**
         * - The document purpose.
         */
        purpose: string;
        /**
         * - The activity field of the document source.
         */
        sourceCategory: string;
        /**
         * - The sub-activity field of the document source.
         */
        sourceSubCategory: string;
        /**
         * - On what is about the document.
         */
        subjects: any[];
    };
    /**
     * Set sourceSubCategory to the qualification.
     *
     * @param {Array} sourceSubCategory - The sourceSubCategory to set.
     * @returns {Qualification} The Qualification object.
     */
    setSourceSubCategory(sourceSubCategory: any[]): {
        /**
         * - The qualification label.
         */
        label: string;
        /**
         * - The document purpose.
         */
        purpose: string;
        /**
         * - The activity field of the document source.
         */
        sourceCategory: string;
        /**
         * - The sub-activity field of the document source.
         */
        sourceSubCategory: string;
        /**
         * - On what is about the document.
         */
        subjects: any[];
    };
    /**
     * Set subjects to the qualification.
     *
     * @param {Array} subjects - The subjects to set.
     * @returns {Qualification} The Qualification object.
     */
    setSubjects(subjects: any[]): {
        /**
         * - The qualification label.
         */
        label: string;
        /**
         * - The document purpose.
         */
        purpose: string;
        /**
         * - The activity field of the document source.
         */
        sourceCategory: string;
        /**
         * - The sub-activity field of the document source.
         */
        sourceSubCategory: string;
        /**
         * - On what is about the document.
         */
        subjects: any[];
    };
    /**
     * Returns the qualification attributes
     *
     * @returns {object} The qualification attributes
     */
    toQualification(): object;
}
export namespace Qualification {
    function getByLabel(label: string): {
        /**
         * - The qualification label.
         */
        label: string;
        /**
         * - The document purpose.
         */
        purpose: string;
        /**
         * - The activity field of the document source.
         */
        sourceCategory: string;
        /**
         * - The sub-activity field of the document source.
         */
        sourceSubCategory: string;
        /**
         * - On what is about the document.
         */
        subjects: any[];
    };
}
export function setQualification(document: object, qualification: {
    /**
     * - The qualification label.
     */
    label: string;
    /**
     * - The document purpose.
     */
    purpose: string;
    /**
     * - The activity field of the document source.
     */
    sourceCategory: string;
    /**
     * - The sub-activity field of the document source.
     */
    sourceSubCategory: string;
    /**
     * - On what is about the document.
     */
    subjects: any[];
}): object;
export function getQualification(document: object): {
    /**
     * - The qualification label.
     */
    label: string;
    /**
     * - The document purpose.
     */
    purpose: string;
    /**
     * - The activity field of the document source.
     */
    sourceCategory: string;
    /**
     * - The sub-activity field of the document source.
     */
    sourceSubCategory: string;
    /**
     * - On what is about the document.
     */
    subjects: any[];
};
