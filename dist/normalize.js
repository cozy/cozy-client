"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeDoc = normalizeDoc;
exports.normalizeDoctypeJsonApi = normalizeDoctypeJsonApi;
exports.normalizeDoctypeRawApi = normalizeDoctypeRawApi;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Normalize a document, adding its doctype if needed
 *
 * @param {object} doc - Document to normalize
 * @param {string} doctype - Document doctype
 * @returns {object} normalized document
 * @private
 */
function normalizeDoc() {
  var doc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var doctype = arguments.length > 1 ? arguments[1] : undefined;
  var id = doc._id || doc.id;
  return _objectSpread({
    id: id,
    _id: id,
    _type: doctype
  }, doc);
}
/**
 * Normalizes a document in JSON API format for a specific doctype
 *
 * @param {string} doctype - The document type
 * @returns {Function} A function that normalizes the document
 */


function normalizeDoctypeJsonApi(doctype) {
  /**
   * @param {object} data - The document from "data" property of the response in JSON API format
   * @param {object} response - The response from the API (not used in this function)
   * @returns {object} The normalized document
   */
  return function (data, response) {
    // use the "data" attribute of the response
    var normalizedDoc = normalizeDoc(data, doctype);
    return _objectSpread(_objectSpread({}, normalizedDoc), normalizedDoc.attributes || {});
  };
}
/**
 * `normalizeDoctype` for api end points returning raw documents
 *
 * @private
 * @param {string} doctype - Document doctype
 * @returns {Function} A function that normalizes the document
 */


function normalizeDoctypeRawApi(doctype) {
  /**
   * @param {object} data - The data from the API response (not used in this function)
   * @param {object} response - The raw response from the API
   * @returns {object} The normalized document
   */
  return function (data, response) {
    // use the response directly
    var normalizedDoc = normalizeDoc(response, doctype);
    return _objectSpread(_objectSpread({}, normalizedDoc), normalizedDoc.attributes || {});
  };
}