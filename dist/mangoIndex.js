"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeOperatorsExplicit = exports.isMatchingIndex = exports.getIndexFields = exports.transformSort = exports.getIndexNameFromFields = exports.makeKeyFromPartialFilter = exports.normalizeDesignDoc = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _head = _interopRequireDefault(require("lodash/head"));

var _get = _interopRequireDefault(require("lodash/get"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _isObject = _interopRequireDefault(require("lodash/isObject"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * @typedef {Object} MangoPartialFilter
 */

/**
 * @typedef {object} MangoSelector
 */

/**
 * @typedef {Array<object>} MangoSort
 */

/**
 * @typedef {object} MangoQueryOptions
 * @property {MangoSelector} [selector] Selector
 * @property {MangoSort} [sort] The sorting parameters
 * @property {Array<string>} [fields] The fields to return
 * @property {Array<string>} [partialFilterFields] The partial filter fields
 * @property {number|null} [limit] For pagination, the number of results to return
 * @property {number|null} [skip] For skip-based pagination, the number of referenced files to skip
 * @property {string|null} [indexId] The _id of the CouchDB index to use for this request
 * @property {string|null} [bookmark] For bookmark-based pagination, the document _id to start from
 * @property {Array<string>} [indexedFields]
 * @property {string} [use_index] Name of the index to use
 * @property {boolean} [execution_stats] If true, we request the stats from Couch
 * @property {MangoPartialFilter|null} [partialFilter] An optional partial filter
 */

/**
 * Attributes representing a design doc
 *
 * @typedef {object} DesignDoc
 *
 * @property {string} _id - Id of the design doc. Can be named, e.g. '_design/by_indexed_attribute' or not, e.g. '_design/12345'
 * @property {string} language - The index language. Can be 'query' for mango index or 'javascript' for views.
 * @property {object} views - Views definition, i.e. the index.
 * @property {string} _rev - Rev version
 */
var normalizeDesignDoc = function normalizeDesignDoc(designDoc) {
  var id = designDoc._id || designDoc.id;
  return _objectSpread({
    id: id,
    _id: id
  }, designDoc.doc);
};
/**
 * Process a partial filter to generate a string key
 *
 * /!\ Warning: this method is similar to cozy-pouch-link mango.makeKeyFromPartialFilter()
 * If you edit this method, please check if the change is also needed in mango file
 *
 * @param {object} condition - An object representing the partial filter or a sub-condition of the partial filter
 * @returns {string} - The string key of the processed partial filter
 */


exports.normalizeDesignDoc = normalizeDesignDoc;

var makeKeyFromPartialFilter = function makeKeyFromPartialFilter(condition) {
  if (typeof condition !== 'object' || condition === null) {
    return String(condition);
  }

  var conditions = Object.entries(condition).map(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    if (Array.isArray(value) && value.every(function (subObj) {
      return typeof subObj === 'string';
    })) {
      return "".concat(key, "_(").concat(value.join('_'), ")");
    } else if (Array.isArray(value)) {
      return "(".concat(value.map(function (subCondition) {
        return "".concat(makeKeyFromPartialFilter(subCondition));
      }).join(")_".concat(key, "_(")), ")");
    } else if (typeof value === 'object') {
      return "".concat(key, "_").concat(makeKeyFromPartialFilter(value));
    } else {
      return "".concat(key, "_").concat(value);
    }
  });
  return conditions.join(')_and_(');
};
/**
 * Name an index, based on its indexed fields and partial filter.
 *
 * It follows this naming convention:
 * `by_{indexed_field1}_and_{indexed_field2}_filter_({partial_filter.key1}_{partial_filter.value1})_and_({partial_filter.key2}_{partial_filter.value2})`
 *
 * /!\ Warning: this method is similar to cozy-pouch-link mango.getIndexNameFromFields()
 * If you edit this method, please check if the change is also needed in mango file
 *
 * @param {Array<string>} fields - The indexed fields
 * @param {object} [partialFilter] - The partial filter
 * @returns {string} The index name, built from the fields
 */


exports.makeKeyFromPartialFilter = makeKeyFromPartialFilter;

var getIndexNameFromFields = function getIndexNameFromFields(fields, partialFilter) {
  var indexName = "by_".concat(fields.join('_and_'));

  if (partialFilter) {
    return "".concat(indexName, "_filter_(").concat(makeKeyFromPartialFilter(partialFilter), ")");
  }

  return indexName;
};
/**
 * Transform sort into Array
 *
 * @param {MangoSort} sort - The sorting parameters
 * @returns {MangoSort}
 */


exports.getIndexNameFromFields = getIndexNameFromFields;

var transformSort = function transformSort(sort) {
  if (!sort || Array.isArray(sort)) {
    return sort;
  }

  throw Error('Passing an object to the "sort" is not supported');
};
/**
 * Compute fields that should be indexed for a mango
 * query to work
 *
 *
 * @returns {Array} - Fields to index
 */


exports.transformSort = transformSort;

var getIndexFields = function getIndexFields(
/** @type {MangoQueryOptions} */
_ref3) {
  var selector = _ref3.selector,
      partialFilter = _ref3.partialFilter,
      _ref3$sort = _ref3.sort,
      sort = _ref3$sort === void 0 ? [] : _ref3$sort;
  return Array.from(new Set([].concat((0, _toConsumableArray2.default)(sort.map(function (sortOption) {
    return (0, _head.default)(Object.keys(sortOption));
  })), (0, _toConsumableArray2.default)(selector ? Object.keys(selector) : []), (0, _toConsumableArray2.default)(partialFilter ? Object.keys(partialFilter) : []))));
};
/**
 * Check if an index is matching the given fields
 *
 * @param {DesignDoc} index - The index to check
 * @param {Array} fields - The fields that the index must have
 * @param {object} partialFilter - An optional partial filter
 * @returns {boolean} True if the index is matches the given fields
 */


exports.getIndexFields = getIndexFields;

var isMatchingIndex = function isMatchingIndex(index, fields, partialFilter) {
  var viewId = Object.keys((0, _get.default)(index, "views"))[0];
  var fieldsInIndex = Object.keys((0, _get.default)(index, "views.".concat(viewId, ".map.fields")));

  if ((0, _isEqual.default)(fieldsInIndex, fields)) {
    var partialFilterInIndex = (0, _get.default)(index, "views.".concat(viewId, ".map.partial_filter_selector"));

    if (!partialFilter && !partialFilterInIndex) {
      return true;
    }

    var explicitPartialFilter = makeOperatorsExplicit(partialFilter !== null && partialFilter !== void 0 ? partialFilter : {});

    if ((0, _isEqual.default)(explicitPartialFilter, partialFilterInIndex)) {
      return true;
    }
  }

  return false;
};
/**
 * Handle the $nor operator in a query
 * CouchDB transforms $nor into $and with $ne operators
 *
 * @param {Array} conditions - The conditions inside the $nor operator
 * @returns {Array} - The reversed conditions
 */


exports.isMatchingIndex = isMatchingIndex;

var handleNorOperator = function handleNorOperator(conditions) {
  return conditions.map(function (condition) {
    return Object.entries(condition).reduce(function (acc, _ref4) {
      var _ref5 = (0, _slicedToArray2.default)(_ref4, 2),
          key = _ref5[0],
          value = _ref5[1];

      if (typeof value === 'string') {
        acc[key] = {
          $ne: value
        };
      } else {
        acc[key] = makeOperatorsExplicit(value, true);
      }

      return acc;
    }, {});
  }).sort(sortObjectByKey);
};
/**
 * Transform a query to make all operators explicit
 *
 * @param {object} query - The query to transform
 * @param {boolean} reverseEq - If true, $eq will be transformed to $ne (useful for manage $nor)
 * @returns {object} - The transformed query with all operators explicit
 */


var makeOperatorsExplicit = function makeOperatorsExplicit(query) {
  var reverseEq = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var explicitQuery = Object.entries(query).reduce(function (acc, _ref6) {
    var _value$$or;

    var _ref7 = (0, _slicedToArray2.default)(_ref6, 2),
        key = _ref7[0],
        value = _ref7[1];

    if (key === '$nor') {
      acc['$and'] = handleNorOperator(value);
    } else if ((_value$$or = value['$or']) !== null && _value$$or !== void 0 && _value$$or.every(function (v) {
      return typeof v === 'string';
    })) {
      acc['$or'] = value['$or'].map(function (v) {
        return makeOperatorsExplicit((0, _defineProperty2.default)({}, key, v), reverseEq);
      }).sort(sortObjectByKey); // To manage $or with list of strings
    } else if (Array.isArray(value) && value.every(_isObject.default)) {
      acc[key] = value.map(function (v) {
        return makeOperatorsExplicit(v, reverseEq);
      }).sort(sortObjectByKey); // To manage $and and $or with multiple conditions inside
    } else if ((0, _isObject.default)(value) && !Array.isArray(value)) {
      acc[key] = makeOperatorsExplicit(value, reverseEq); // To manage nested objects
    } else if (reverseEq && key === '$eq') {
      acc['$ne'] = value;
    } else if (!key.startsWith('$')) {
      acc[key] = {
        $eq: value
      }; // To manage implicit $eq
    } else {
      acc[key] = value; // To manage explicit operators
    }

    return acc;
  }, {});
  var explicitQueryKeys = Object.keys(explicitQuery).sort();

  if (explicitQueryKeys.length === 1) {
    return explicitQuery;
  }

  return {
    $and: explicitQueryKeys.map(function (key) {
      return (0, _defineProperty2.default)({}, key, explicitQuery[key]);
    })
  };
};
/**
 * Compares two objects based on their first key to determine their order.
 *
 * @param {object} a - The first object to compare
 * @param {object} b - The second object to compare
 * @returns {number} - A negative number if the key of `a` should appear before the key of `b`,
 *                     a positive number if it should appear after, or 0 if they are equal.
 */


exports.makeOperatorsExplicit = makeOperatorsExplicit;

var sortObjectByKey = function sortObjectByKey(a, b) {
  var keyA = Object.keys(a)[0];
  var keyB = Object.keys(b)[0];
  return keyA.localeCompare(keyB);
};