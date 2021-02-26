import { get, set, difference } from 'lodash'
import * as qualificationModel from '../assets/qualifications.json'

/**
 * @typedef {object} QualificationAttributes
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
  constructor(label, attributes = {}) {
    const qualification = qualificationModel.qualifications.find(
      qualif => qualif.label === label
    )
    if (qualification) {
      /**
       * @type {string?} - The qualification label.
       */
      this.label = qualification.label
      /**
       * @type {string?} - The document purpose.
       */
      this.purpose = attributes.purpose || qualification.purpose
      this.sourceCategory =
        attributes.sourceCategory || qualification.sourceCategory
      this.sourceSubCategory =
        attributes.sourceSubCategory || qualification.sourceSubCategory
      this.subjects = attributes.subjects || qualification.subjects
    } else {
      throw new Error(`No qualification found for the label ${label}`)
    }
  }

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
  checkAttributes(attributes) {
    if (this.purpose !== attributes.purpose) {
      if (!this.purpose) {
        const isKnownValue = qualificationModel.purposeKnownValues.includes(
          attributes.purpose
        )
        if (!isKnownValue) {
          console.info(
            `This purpose is not listed among the known values: ${attributes.purpose}. ` +
              `Please open an issue on https://github.com/cozy/cozy-client/issues`
          )
        }
      } else {
        throw new Error(
          `The purpose for the label ${this.label} should be ${this.purpose}. ` +
            `Please use this or open an issue on https://github.com/cozy/cozy-client/issues`
        )
      }
    }
    if (this.sourceCategory !== attributes.sourceCategory) {
      if (!this.sourceCategory) {
        const isKnownValue = qualificationModel.sourceCategoryKnownValues.includes(
          attributes.sourceCategory
        )
        if (!isKnownValue) {
          console.info(
            `This sourceCategory is not listed among the known values: ${attributes.sourceCategory}. ` +
              `Please open an issue on https://github.com/cozy/cozy-client/issues`
          )
        }
      } else {
        throw new Error(
          `The sourceCategory for the label ${this.label} should be ${this.sourceCategory}. ` +
            `Please use this or open an issue on https://github.com/cozy/cozy-client/issues`
        )
      }
    }
    if (this.sourceSubCategory !== attributes.sourceSubCategory) {
      if (!this.sourceSubCategory) {
        const isKnownValue = qualificationModel.sourceSubCategoryKnownValues.includes(
          attributes.sourceSubCategory
        )
        if (!isKnownValue) {
          console.info(
            `This sourceSubCategory is not listed among the known values: ${attributes.sourceSubCategory}. ` +
              `Please open an issue on https://github.com/cozy/cozy-client/issues`
          )
        }
      } else {
        throw new Error(
          `The sourceSubCategory for the label ${this.label} should be ${this.sourceSubCategory}. ` +
            `Please use this or open an issue on https://github.com/cozy/cozy-client/issues`
        )
      }
    }

    const missingSubjects = difference(this.subjects, attributes.subjects)
    if (missingSubjects.length > 0) {
      throw new Error(
        `The subjects for the label ${this.label} should include ${this.subjects}. ` +
          `Please use this or open an issue on https://github.com/cozy/cozy-client/issues`
      )
    }
    const extraSubjects = difference(attributes.subjects, this.subjects)
    if (extraSubjects.length > 0) {
      const unknownSubjects = difference(
        extraSubjects,
        qualificationModel.subjectsKnownValues
      )
      if (unknownSubjects.length > 0)
        console.info(
          `These subjects are not listed among the known values: ${unknownSubjects}. ` +
            `Please open an issue on https://github.com/cozy/cozy-client/issues`
        )
    }
  }

  /**
   * Set purpose to the qualification.
   *
   * @param {Array} purpose - The purpose to set.
   * @returns {Qualification} The Qualification object.
   */
  setPurpose(purpose) {
    return new Qualification(this.label, { ...this.toQualification(), purpose })
  }

  /**
   * Set sourceCategory to the qualification.
   *
   * @param {Array} sourceCategory - The sourceCategory to set.
   * @returns {Qualification} The Qualification object.
   */
  setSourceCategory(sourceCategory) {
    return new Qualification(this.label, {
      ...this.toQualification(),
      sourceCategory
    })
  }

  /**
   * Set sourceSubCategory to the qualification.
   *
   * @param {Array} sourceSubCategory - The sourceSubCategory to set.
   * @returns {Qualification} The Qualification object.
   */
  setSourceSubCategory(sourceSubCategory) {
    return new Qualification(this.label, {
      ...this.toQualification(),
      sourceSubCategory
    })
  }

  /**
   * Set subjects to the qualification.
   *
   * @param {Array} subjects - The subjects to set.
   * @returns {Qualification} The Qualification object.
   */
  setSubjects(subjects) {
    return new Qualification(this.label, {
      ...this.toQualification(),
      subjects
    })
  }

  /**
   * Returns the qualification attributes
   *
   * @returns {object} The qualification attributes
   */
  toQualification() {
    return {
      label: this.label,
      purpose: this.purpose,
      sourceCategory: this.sourceCategory,
      sourceSubCategory: this.sourceSubCategory,
      subjects: this.subjects
    }
  }
}

/**
 * Returns the qualification associated to a label.
 *
 * @param {string} label - The label to qualify
 * @returns {Qualification} - The qualification
 */
Qualification.getByLabel = label => {
  return new Qualification(label)
}

/**
 * Set the qualification to the document metadata
 *
 * @param {object} document - The document to set the qualification
 * @param {Qualification} qualification - The qualification to set
 * @returns {object} - The qualified document
 */
export const setQualification = (document, qualification) => {
  if (qualification.label) {
    new Qualification(qualification.label).checkAttributes(qualification)
  } else {
    throw new Error('You must set a label to qualify')
  }

  return set(document, 'metadata.qualification', qualification)
}

/**
 * Helper to get the qualification from a document
 *
 * @param {object} document - The document
 * @returns {Qualification} - The document qualification
 *
 */
export const getQualification = document => {
  const docQualification = get(document, 'metadata.qualification')
  const qualification = new Qualification(
    docQualification.label,
    docQualification.qualification
  )
  return qualification.toQualification()
}
