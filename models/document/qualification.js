"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIconByLabel = exports.getQualification = exports.setQualification = exports.Qualification = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _set = _interopRequireDefault(require("lodash/set"));

var _difference = _interopRequireDefault(require("lodash/difference"));

var qualificationModel = _interopRequireWildcard(require("../../assets/qualifications.json"));

var _logger = _interopRequireDefault(require("../../logger"));

var _constants = require("./constants");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
       * @type {string}
       */
      this.icon = attributes.icon || getIconByLabel(label);
      /**
       * @type {string?}
       */

      this.label = qualification.label;
      var purpose = attributes.purpose || qualification.purpose;

      if (purpose) {
        /**
         * @type {string?}
         */
        this.purpose = purpose;
      }

      var sourceCategory = attributes.sourceCategory || qualification.sourceCategory;

      if (sourceCategory) {
        /**
         * @type {string?}
         */
        this.sourceCategory = sourceCategory;
      }

      var sourceSubCategory = attributes.sourceSubCategory || qualification.sourceSubCategory;

      if (sourceSubCategory) {
        /**
         * @type {string?}
         */
        this.sourceSubCategory = sourceSubCategory;
      }

      var subjects = attributes.subjects || qualification.subjects;

      if (subjects) {
        /**
         * @type {Array<string>?}
         */
        this.subjects = subjects;
      }
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
            _logger.default.info("This purpose is not listed among the known values: ".concat(attributes.purpose, ". ") + "Please open an issue on https://github.com/cozy/cozy-client/issues");
          }
        } else {
          throw new Error("The purpose for the label ".concat(this.label, " should be ").concat(this.purpose, ". ") + "Please use this or open an issue on https://github.com/cozy/cozy-client/issues");
        }
      }

      if (this.sourceCategory !== attributes.sourceCategory) {
        if (!this.sourceCategory) {
          var _isKnownValue = qualificationModel.sourceCategoryKnownValues.includes(attributes.sourceCategory);

          if (!_isKnownValue) {
            _logger.default.info("This sourceCategory is not listed among the known values: ".concat(attributes.sourceCategory, ". ") + "Please open an issue on https://github.com/cozy/cozy-client/issues");
          }
        } else {
          throw new Error("The sourceCategory for the label ".concat(this.label, " should be ").concat(this.sourceCategory, ". ") + "Please use this or open an issue on https://github.com/cozy/cozy-client/issues");
        }
      }

      if (this.sourceSubCategory !== attributes.sourceSubCategory) {
        if (!this.sourceSubCategory) {
          var _isKnownValue2 = qualificationModel.sourceSubCategoryKnownValues.includes(attributes.sourceSubCategory);

          if (!_isKnownValue2) {
            _logger.default.info("This sourceSubCategory is not listed among the known values: ".concat(attributes.sourceSubCategory, ". ") + "Please open an issue on https://github.com/cozy/cozy-client/issues");
          }
        } else {
          throw new Error("The sourceSubCategory for the label ".concat(this.label, " should be ").concat(this.sourceSubCategory, ". ") + "Please use this or open an issue on https://github.com/cozy/cozy-client/issues");
        }
      }

      var missingSubjects = (0, _difference.default)(this.subjects, attributes.subjects);

      if (missingSubjects.length > 0) {
        throw new Error("The subjects for the label ".concat(this.label, " should include ").concat(this.subjects, ". ") + "Please use this or open an issue on https://github.com/cozy/cozy-client/issues");
      }

      var extraSubjects = (0, _difference.default)(attributes.subjects, this.subjects);

      if (extraSubjects.length > 0) {
        var unknownSubjects = (0, _difference.default)(extraSubjects, qualificationModel.subjectsKnownValues);
        if (unknownSubjects.length > 0) _logger.default.info("These subjects are not listed among the known values: ".concat(unknownSubjects, ". ") + "Please open an issue on https://github.com/cozy/cozy-client/issues");
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
     * Set icon to the qualification.
     *
     * @param {string} icon - The icon to set.
     * @returns {Qualification} The Qualification object.
     */

  }, {
    key: "setIcon",
    value: function setIcon(icon) {
      return new Qualification(this.label, _objectSpread(_objectSpread({}, this.toQualification()), {}, {
        icon: icon
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
        icon: this.icon,
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
    var result = qualification; // Throw an error if one of the attributes does not conform

    new Qualification(qualification.label).checkAttributes(qualification);

    if (!qualification.icon) {
      result = new Qualification(qualification.label, qualification).setIcon(getIconByLabel(qualification.label));
    }

    return (0, _set.default)(document, 'metadata.qualification', result);
  } else {
    throw new Error('You must set a label to qualify');
  }
};
/**
 * Helper to get the qualification from a document
 *
 * @param {object} document - The document
 * @returns {Qualification|null} - The document qualification
 */


exports.setQualification = setQualification;

var getQualification = function getQualification(document) {
  var _document$metadata;

  var docQualification = document === null || document === void 0 ? void 0 : (_document$metadata = document.metadata) === null || _document$metadata === void 0 ? void 0 : _document$metadata.qualification;

  if (docQualification) {
    var qualification = new Qualification(docQualification.label, docQualification.qualification);
    return qualification.toQualification();
  }

  return null;
};
/**
 * Helper to get the icon name from a qualification label
 *
 * @param {string} label - The qualification label
 * @returns {import('../../types').IconQualificationLabels|string} - The icon name
 */


exports.getQualification = getQualification;

var getIconByLabel = function getIconByLabel(label) {
  var _iterator = _createForOfIteratorHelper(_constants.iconLabelPairs),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var pair = _step.value;

      if (pair.labels.includes(label)) {
        return pair.icon;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  _logger.default.info("The ".concat(label, " qualification does not seem to have an icon.\n    Please open an issue on https://github.com/cozy/cozy-client/issues"));

  return '';
};

exports.getIconByLabel = getIconByLabel;