"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitizeCategories = sanitizeCategories;
exports.areTermsValid = areTermsValid;
exports.isPartnershipValid = isPartnershipValid;
exports.sanitize = sanitize;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _types = require("./types");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var APP_CATEGORIES = ['banking', 'cozy', 'energy', 'health', 'host_provider', 'insurance', 'isp', 'mes_infos', 'online_services', 'others', 'partners', 'press', 'productivity', 'ptnb', 'public_service', 'shopping', 'social', 'telecom', 'transport'];
/** Filters unauthorized categories. Defaults to ['others'] if no suitable category. */

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
 * Normalize app manifest, retrocompatibility for old manifests
 *
 * @param  {Manifest} manifest
 * @returns {Manifest}
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

  return sanitized;
}