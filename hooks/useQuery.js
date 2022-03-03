"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.useQueries = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = require("react");

var _reactRedux = require("react-redux");

var _get = _interopRequireDefault(require("lodash/get"));

var _useClient = _interopRequireDefault(require("./useClient"));

var _logger = _interopRequireDefault(require("../logger"));

var _types = require("../types");

var _context = require("../context");

var _dsl = require("../queries/dsl");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var useSelector = (0, _reactRedux.createSelectorHook)(_context.clientContext);

var resolveToValue = function resolveToValue(fnOrValue) {
  return typeof fnOrValue === 'function' ? fnOrValue() : fnOrValue;
};

var generateFetchMoreQueryDefinition = function generateFetchMoreQueryDefinition(queryResult) {
  return queryResult.bookmark ? queryResult.definition.offsetBookmark(queryResult.bookmark) : queryResult.definition.offset(queryResult.data.length);
};
/**
 * Fetches a queryDefinition and returns the queryState
 *
 * @param  {QueryDefinition} queryDefinition - Definition created with Q()
 *
 * @typedef {object} UseQueryOptions
 * @property  {object} as - Name for the query [required]
 * @property  {boolean} enabled - If set to false, the query won't be executed
 * @property  {object} fetchPolicy - Fetch policy
 * @property  {object} singleDocData - If true, the "data" returned will be
 * a single doc instead of an array for single doc queries. Defaults to false for backward
 * compatibility but will be set to true in the future.
 * @property {Function} onError - Callback if the query is errored
 *
 * @returns {UseQueryReturnValue}
 */


var useQuery = function useQuery(queryDefinition, options) {
  if (!useSelector) {
    throw new Error('You must use react-redux > 7.1.0 to use useQuery (uses useSelector) under the hood');
  }

  if (!queryDefinition) {
    _logger.default.warn('Bad query', queryDefinition);

    throw new Error('Bad query');
  }

  var definition = resolveToValue(queryDefinition);
  var as = options.as,
      _options$enabled = options.enabled,
      enabled = _options$enabled === void 0 ? true : _options$enabled;

  if (!as) {
    throw new Error('You must specify options.as when using useQuery');
  }

  var client = (0, _useClient.default)();
  var queryState = useSelector(function () {
    if (options.singleDocData === undefined && queryDefinition.id) {
      _logger.default.warn('useQuery options.singleDocData will pass to true in a next version of cozy-client, please add it now to prevent any problem in the future.');
    }

    return client.getQueryFromState(as, {
      hydrated: (0, _get.default)(options, 'hydrated', true),
      singleDocData: (0, _get.default)(options, 'singleDocData', false)
    });
  });
  (0, _react.useEffect)(function () {
    if (enabled === false) {
      return;
    }

    client.query(definition, options);
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [as, enabled]);
  var fetchMore = (0, _react.useCallback)(function () {
    var queryState = client.getQueryFromState(as);
    return client.query(generateFetchMoreQueryDefinition(queryState), {
      as: as
    });
  }, [as, client]);
  var fetch = (0, _react.useCallback)(function () {
    return client.query(definition, options);
  }, [client, definition, options]);
  return _objectSpread(_objectSpread({}, queryState), {}, {
    fetchMore: fetchMore,
    fetch: fetch
  });
};

var useQueries = function useQueries(querySpecs) {
  var res = {};

  for (var _i = 0, _Object$entries = Object.entries(querySpecs); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = (0, _slicedToArray2.default)(_Object$entries[_i], 2),
        queryAttrName = _Object$entries$_i[0],
        queryOpts = _Object$entries$_i[1];

    // eslint-disable-next-line
    res[queryAttrName] = useQuery(queryOpts.query, queryOpts);
  }

  return res;
};

exports.useQueries = useQueries;
var _default = useQuery;
exports.default = _default;