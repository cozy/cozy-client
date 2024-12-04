"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitizeCategories = sanitizeCategories;
exports.areTermsValid = areTermsValid;
exports.isPartnershipValid = isPartnershipValid;
exports.sanitize = sanitize;
exports.getIdentifier = exports.sanitizeIdentifier = exports.legacyLoginFields = exports.ROLE_IDENTIFIER = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _flow2 = _interopRequireDefault(require("lodash/flow"));

var _cloneDeep2 = _interopRequireDefault(require("lodash/cloneDeep"));

var _findKey = _interopRequireDefault(require("lodash/findKey"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var ROLE_IDENTIFIER = 'identifier';
/**
 * Legacy login fields declared by some konnectors
 */

exports.ROLE_IDENTIFIER = ROLE_IDENTIFIER;
var legacyLoginFields = ['login', 'identifier', 'new_identifier', 'email'];
exports.legacyLoginFields = legacyLoginFields;
var legacyEncryptedFields = ['secret', 'dob', 'code', 'answer', 'access_token', 'refresh_token', 'appSecret'];
var APP_CATEGORIES = ['banking', 'cozy', 'energy', 'health', 'host_provider', 'insurance', 'isp', 'mes_infos', 'online_services', 'others', 'partners', 'press', 'productivity', 'ptnb', 'public_service', 'shopping', 'social', 'telecom', 'transport'];
/**
 * Filters unauthorized categories. Defaults to ['others'] if no suitable category.
 *
 * @param {Array<Object>} categories - Array of categories
 * @returns {Array<Object>} sanitized categories
 */

function sanitizeCategories(categories) {
  if (!categories) return ['others'];
  var filteredList = categories.filter(function (c) {
    return APP_CATEGORIES.includes(c);
  });
  if (!filteredList.length) return ['others'];
  return filteredList;
}

function areTermsValid(terms) {
  return Boolean(terms && terms.id && terms.url && terms.version);
}

function isPartnershipValid(partnership) {
  return Boolean(partnership && partnership.description);
}
/**
 * Normalize app manifest, retro-compatibility for old manifests
 *
 * @param  {import('../types').Manifest} manifest - app manifest to normalize
 * @returns {import('../types').SanitizedManifest}
 */


function sanitize(manifest) {
  var sanitized = _objectSpread({}, manifest); // Make categories an array and delete category attribute if it exists


  if (!manifest.categories && manifest.category && typeof manifest.category === 'string') {
    sanitized.categories = [manifest.category];
    delete sanitized.category;
  }

  sanitized.categories = sanitizeCategories(sanitized.categories); // manifest name is not an object

  if (typeof manifest.name === 'object') sanitized.name = manifest.name.en; // Fix camelCase from cozy-stack

  if (manifest.available_version) {
    sanitized.availableVersion = manifest.available_version;
    delete sanitized.available_version;
  } // Fix camelCase from cozy-stack


  if (manifest.latest_version) {
    sanitized.latestVersion = manifest.latestVersion;
    delete sanitized.latest_version;
  } // Remove invalid terms


  if (sanitized.terms && !areTermsValid(sanitized.terms)) {
    delete sanitized.terms;
  } // Remove invalid partnership


  if (sanitized.partnership && !isPartnershipValid(sanitized.partnership)) {
    delete sanitized.partnership;
  }

  if (sanitized.fields) {
    sanitized.fields = sanitizeFields(manifest.fields);
  }

  return sanitized;
}
/**
 * Ensures that fields has at least one field with the role 'identifier'
 *
 * @param  {import('../types').ManifestFields} fields - Manifest fields
 * @returns {import('../types').ManifestFields} - Sanitized manifest fields
 */


var sanitizeIdentifier = function sanitizeIdentifier(fields) {
  var sanitized = (0, _cloneDeep2.default)(fields);
  var hasIdentifier = false;

  for (var fieldName in sanitized) {
    if (sanitized[fieldName].role === ROLE_IDENTIFIER) {
      if (hasIdentifier) delete sanitized[fieldName].role;else hasIdentifier = true;
    }
  }

  if (hasIdentifier) return sanitized;

  var _iterator = _createForOfIteratorHelper(legacyLoginFields),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var name = _step.value;

      if (sanitized[name]) {
        sanitized[name].role = ROLE_IDENTIFIER;
        return sanitized;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  for (var _fieldName in sanitized) {
    if (sanitized[_fieldName].type !== 'password') {
      sanitized[_fieldName].role = ROLE_IDENTIFIER;
      return sanitized;
    }
  }

  return sanitized;
};
/**
 * Returns the key for the field having the role=identifier attribute
 *
 * @param  {import('../types').ManifestFields} fields Konnector fields
 * @returns {String|null}  The key for the identifier field, example 'login'
 */


exports.sanitizeIdentifier = sanitizeIdentifier;

var getIdentifier = function getIdentifier() {
  var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _findKey.default)(sanitizeIdentifier(fields), function (field) {
    return field.role === ROLE_IDENTIFIER;
  }) || null;
};
/**
 * Ensures old fields are removed
 *
 * @param  {Object} fields Manifest fields
 * @returns {Object}        Sanitized manifest fields
 */


exports.getIdentifier = getIdentifier;

var removeOldFields = function removeOldFields(fields) {
  var sanitized = (0, _cloneDeep2.default)(fields);
  delete sanitized.advancedFields;
  return sanitized;
};
/**
 * Ensures every field not explicitely tagged as not required is required
 *
 * @param  {import('../types').ManifestFields} [fields={}] Manifest fields
 * @returns {import('../types').ManifestFields}            Sanitized manifest fields
 */


var sanitizeRequired = function sanitizeRequired(fields) {
  var sanitized = (0, _cloneDeep2.default)(fields);

  for (var fieldName in sanitized) {
    var field = sanitized[fieldName]; // Ensure legacy for field isRequired

    var required = typeof field.required === 'undefined' ? field.isRequired : field.required;
    sanitized[fieldName].required = typeof required === 'boolean' ? required : true;
  }

  return sanitized;
};
/**
 * Ensures:
 * * any field flagged as encrypted keeps its flag
 * * any legacy encrypted field is tagged as encrypted
 *
 * @param  {import('../types').ManifestFields} [fields={}] Manifest fields
 * @returns {import('../types').ManifestFields}             Sanitized Manifest fields
 */


var sanitizeEncrypted = function sanitizeEncrypted(fields) {
  var sanitized = (0, _cloneDeep2.default)(fields);

  for (var fieldName in sanitized) {
    var field = sanitized[fieldName];
    if (typeof field.encrypted !== 'boolean') field.encrypted = field.type === 'password' || legacyEncryptedFields.includes(fieldName);
  }

  return sanitized;
};
/**
 * Sanitizes manifest fields with multiple rules
 *
 * @param  {import('../types').ManifestFields} [fields={}] Manifest fields
 * @returns {import('../types').ManifestFields}            Sanitized manifest fields
 */


var sanitizeFields = (0, _flow2.default)([removeOldFields, sanitizeIdentifier, sanitizeRequired, sanitizeEncrypted]);