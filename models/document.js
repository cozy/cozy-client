"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQualification = exports.setQualification = exports.Qualification = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _lodash = require("lodash");

var qualificationModel = _interopRequireWildcard(require("../assets/qualifications.json"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
var Qualification = /*#__PURE__*/function () {
  /**
   * @param {string} label - The qualification label
   * @param {QualificationAttributes} attributes - Qualification's attributes
   */
  function Qualification(label) {
    var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2.default)(this, Qualification);
    var qualification = qualificationModel.qualifications.find(function (qualif) {
      return qualif.label === label;
    });

    if (qualification) {
      /**
       * @type {string?}
       */
      this.label = qualification.label;
      /**
       * @type {string?}
       */

      this.purpose = attributes.purpose || qualification.purpose;
      this.sourceCategory = attributes.sourceCategory || qualification.sourceCategory;
      this.sourceSubCategory = attributes.sourceSubCategory || qualification.sourceSubCategory;
      this.subjects = attributes.subjects || qualification.subjects;
    } else {
      throw new Error("No qualification found for the label ".concat(label));
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


  (0, _createClass2.default)(Qualification, [{
    key: "checkAttributes",
    value: function checkAttributes(attributes) {
      if (this.purpose !== attributes.purpose) {
        if (!this.purpose) {
          var isKnownValue = qualificationModel.purposeKnownValues.includes(attributes.purpose);

          if (!isKnownValue) {
            console.info("This purpose is not listed among the known values: ".concat(attributes.purpose, ". ") + "Please open an issue on https://github.com/cozy/cozy-client/issues");
          }
        } else {
          throw new Error("The purpose for the label ".concat(this.label, " should be ").concat(this.purpose, ". ") + "Please use this or open an issue on https://github.com/cozy/cozy-client/issues");
        }
      }

      if (this.sourceCategory !== attributes.sourceCategory) {
        if (!this.sourceCategory) {
          var _isKnownValue = qualificationModel.sourceCategoryKnownValues.includes(attributes.sourceCategory);

          if (!_isKnownValue) {
            console.info("This sourceCategory is not listed among the known values: ".concat(attributes.sourceCategory, ". ") + "Please open an issue on https://github.com/cozy/cozy-client/issues");
          }
        } else {
          throw new Error("The sourceCategory for the label ".concat(this.label, " should be ").concat(this.sourceCategory, ". ") + "Please use this or open an issue on https://github.com/cozy/cozy-client/issues");
        }
      }

      if (this.sourceSubCategory !== attributes.sourceSubCategory) {
        if (!this.sourceSubCategory) {
          var _isKnownValue2 = qualificationModel.sourceSubCategoryKnownValues.includes(attributes.sourceSubCategory);

          if (!_isKnownValue2) {
            console.info("This sourceSubCategory is not listed among the known values: ".concat(attributes.sourceSubCategory, ". ") + "Please open an issue on https://github.com/cozy/cozy-client/issues");
          }
        } else {
          throw new Error("The sourceSubCategory for the label ".concat(this.label, " should be ").concat(this.sourceSubCategory, ". ") + "Please use this or open an issue on https://github.com/cozy/cozy-client/issues");
        }
      }

      var missingSubjects = (0, _lodash.difference)(this.subjects, attributes.subjects);

      if (missingSubjects.length > 0) {
        throw new Error("The subjects for the label ".concat(this.label, " should include ").concat(this.subjects, ". ") + "Please use this or open an issue on https://github.com/cozy/cozy-client/issues");
      }

      var extraSubjects = (0, _lodash.difference)(attributes.subjects, this.subjects);

      if (extraSubjects.length > 0) {
        var unknownSubjects = (0, _lodash.difference)(extraSubjects, qualificationModel.subjectsKnownValues);
        if (unknownSubjects.length > 0) console.info("These subjects are not listed among the known values: ".concat(unknownSubjects, ". ") + "Please open an issue on https://github.com/cozy/cozy-client/issues");
      }
    }
    /**
     * Set purpose to the qualification.
     *
     * @param {Array} purpose - The purpose to set.
     * @returns {Qualification} The Qualification object.
     */

  }, {
    key: "setPurpose",
    value: function setPurpose(purpose) {
      return new Qualification(this.label, _objectSpread(_objectSpread({}, this.toQualification()), {}, {
        purpose: purpose
      }));
    }
    /**
     * Set sourceCategory to the qualification.
     *
     * @param {Array} sourceCategory - The sourceCategory to set.
     * @returns {Qualification} The Qualification object.
     */

  }, {
    key: "setSourceCategory",
    value: function setSourceCategory(sourceCategory) {
      return new Qualification(this.label, _objectSpread(_objectSpread({}, this.toQualification()), {}, {
        sourceCategory: sourceCategory
      }));
    }
    /**
     * Set sourceSubCategory to the qualification.
     *
     * @param {Array} sourceSubCategory - The sourceSubCategory to set.
     * @returns {Qualification} The Qualification object.
     */

  }, {
    key: "setSourceSubCategory",
    value: function setSourceSubCategory(sourceSubCategory) {
      return new Qualification(this.label, _objectSpread(_objectSpread({}, this.toQualification()), {}, {
        sourceSubCategory: sourceSubCategory
      }));
    }
    /**
     * Set subjects to the qualification.
     *
     * @param {Array} subjects - The subjects to set.
     * @returns {Qualification} The Qualification object.
     */

  }, {
    key: "setSubjects",
    value: function setSubjects(subjects) {
      return new Qualification(this.label, _objectSpread(_objectSpread({}, this.toQualification()), {}, {
        subjects: subjects
      }));
    }
    /**
     * Returns the qualification attributes
     *
     * @returns {object} The qualification attributes
     */

  }, {
    key: "toQualification",
    value: function toQualification() {
      return {
        label: this.label,
        purpose: this.purpose,
        sourceCategory: this.sourceCategory,
        sourceSubCategory: this.sourceSubCategory,
        subjects: this.subjects
      };
    }
  }]);
  return Qualification;
}();
/**
 * Returns the qualification associated to a label.
 *
 * @param {string} label - The label to qualify
 * @returns {Qualification} - The qualification
 */


exports.Qualification = Qualification;

Qualification.getByLabel = function (label) {
  return new Qualification(label);
};
/**
 * Set the qualification to the document metadata
 *
 * @param {object} document - The document to set the qualification
 * @param {Qualification} qualification - The qualification to set
 * @returns {object} - The qualified document
 */


var setQualification = function setQualification(document, qualification) {
  if (qualification.label) {
    new Qualification(qualification.label).checkAttributes(qualification);
  } else {
    throw new Error('You must set a label to qualify');
  }

  return (0, _lodash.set)(document, 'metadata.qualification', qualification);
};
/**
 * Helper to get the qualification from a document
 *
 * @param {object} document - The document
 * @returns {Qualification} - The document qualification
 *
 */


exports.setQualification = setQualification;

var getQualification = function getQualification(document) {
  var docQualification = (0, _lodash.get)(document, 'metadata.qualification');
  var qualification = new Qualification(docQualification.label, docQualification.qualification);
  return qualification.toQualification();
};

exports.getQualification = getQualification;