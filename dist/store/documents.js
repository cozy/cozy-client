"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractAndMergeDocument = exports.getCollectionFromSlice = exports.getDocumentFromSlice = exports.default = exports.mergeDocumentsWithRelationships = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _keyBy = _interopRequireDefault(require("lodash/keyBy"));

var _get = _interopRequireDefault(require("lodash/get"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _merge = _interopRequireDefault(require("lodash/merge"));

var _logger = _interopRequireDefault(require("../logger"));

var _queries = require("./queries");

var _dsl = require("../queries/dsl");

var _mutations = require("./mutations");

var _helpers = require("./helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var storeDocument = function storeDocument(state, document) {
  var type = document._type;

  if (!type) {
    if (process.env.NODE_ENV !== 'production') {
      _logger.default.info('Document without _type', document);
    }

    throw new Error('Document without _type');
  }

  if (!(0, _helpers.properId)(document)) {
    if (process.env.NODE_ENV !== 'production') {
      _logger.default.info('Document without id', document);
    }

    throw new Error('Document without id');
  }

  var existingDoc = (0, _get.default)(state, [type, (0, _helpers.properId)(document)]);

  if ((0, _isEqual.default)(existingDoc, document)) {
    return state;
  } else {
    return _objectSpread(_objectSpread({}, state), {}, (0, _defineProperty2.default)({}, type, _objectSpread(_objectSpread({}, state[type]), {}, (0, _defineProperty2.default)({}, (0, _helpers.properId)(document), mergeDocumentsWithRelationships(existingDoc, document)))));
  }
};

var mergeDocumentsWithRelationships = function mergeDocumentsWithRelationships() {
  var prevDocument = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var nextDocument = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  /**
   * @type {import("../types").CozyClientDocument}
   */
  var merged = _objectSpread(_objectSpread({}, prevDocument), nextDocument);

  if (prevDocument.relationships || nextDocument.relationships) merged.relationships = _objectSpread(_objectSpread({}, prevDocument.relationships), nextDocument.relationships);
  return merged;
}; // reducer


exports.mergeDocumentsWithRelationships = mergeDocumentsWithRelationships;

var documents = function documents() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (!(0, _queries.isReceivingData)(action) && !(0, _mutations.isReceivingMutationResult)(action)) {
    return state;
  }

  if (action && action.definition && action.definition.mutationType === _dsl.MutationTypes.DELETE_DOCUMENT) {
    var docId = action.definition.document._id;
    var _type = action.definition.document._type;
    return _objectSpread(_objectSpread({}, state), {}, (0, _defineProperty2.default)({}, _type, (0, _omit.default)(state[_type], docId)));
  }

  var _action$response = action.response,
      data = _action$response.data,
      included = _action$response.included;
  if (!data || Array.isArray(data) && data.length === 0) return state;
  var updatedStateWithIncluded = included ? included.reduce(storeDocument, state) : state;

  if (!Array.isArray(data)) {
    return storeDocument(updatedStateWithIncluded, data);
  }

  return extractAndMergeDocument(data, updatedStateWithIncluded);
};

var _default = documents; // selector

exports.default = _default;

var getDocumentFromSlice = function getDocumentFromSlice() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var doctype = arguments.length > 1 ? arguments[1] : undefined;
  var id = arguments.length > 2 ? arguments[2] : undefined;

  if (!doctype) {
    throw new Error('getDocumentFromSlice: Cannot retrieve document with undefined doctype');
  }

  if (!id) {
    throw new Error('getDocumentFromSlice: Cannot retrieve document with undefined id');
  }

  if (!state[doctype]) {
    if (process.env.NODE_ENV !== 'production') {
      _logger.default.info("getDocumentFromSlice: ".concat(doctype, " is absent from the store's documents. State is"), state);
    }

    return null;
  } else if (!state[doctype][id]) {
    if (process.env.NODE_ENV !== 'production') {
      _logger.default.info("getDocumentFromSlice: ".concat(doctype, ":").concat(id, " is absent from the store documents. State is"), state);
    }

    return null;
  }

  return state[doctype][id];
};

exports.getDocumentFromSlice = getDocumentFromSlice;

var getCollectionFromSlice = function getCollectionFromSlice() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var doctype = arguments.length > 1 ? arguments[1] : undefined;

  if (!doctype) {
    throw new Error('getDocumentFromSlice: Cannot retrieve document with undefined doctype');
  }

  if (!state[doctype]) {
    if (process.env.NODE_ENV !== 'production') {
      _logger.default.info("getCollectionFromSlice: ".concat(doctype, " is absent from the store documents. State is"), state);
    }

    return null;
  }

  return Object.values(state[doctype]);
};
/*
  This method has been created in order to get a returned object
  in `data` with the full set on information coming potentially from
  `included`

  This method should be somewhere else. The `document` shall not be
  dealt with included / data and so on.

  This method takes `data` and `included` and merge both sources
  together. It should be always up-to-date. The returned object
  will be as full of information as it can be.
*/


exports.getCollectionFromSlice = getCollectionFromSlice;

var extractAndMergeDocument = function extractAndMergeDocument(data, updatedStateWithIncluded) {
  var doctype = data[0]._type;

  if (!doctype) {
    _logger.default.info('Document without _type', data[0]);

    throw new Error('Document without _type');
  }

  var sortedData = (0, _keyBy.default)(data, _helpers.properId);
  var mergedData = Object.assign({}, updatedStateWithIncluded);
  mergedData[doctype] = Object.assign({}, updatedStateWithIncluded[doctype]);
  Object.values(sortedData).map(function (data) {
    var id = (0, _helpers.properId)(data);

    if (mergedData[doctype][id]) {
      mergedData[doctype][id] = (0, _merge.default)({}, mergedData[doctype][id], data);
    } else {
      mergedData[doctype][id] = data;
    }
  });
  return mergedData;
};

exports.extractAndMergeDocument = extractAndMergeDocument;