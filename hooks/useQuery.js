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

var _context = require("../context");

var _dsl = require("../queries/dsl");

var _utils = require("./utils");

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
 * @param {QueryDefinition|(() => QueryDefinition)} queryDefinition - Definition created with Q()
 * @param {import("../types").QueryOptions} options - Options created with Q()
 * @returns {import("../types").UseQueryReturnValue}
 */


var useQuery = function useQuery(queryDefinition, options) {
  if (!useSelector) {
    throw new Error('You must use react-redux > 7.1.0 to use useQuery (uses useSelector) under the hood');
  }

  if (!queryDefinition) {
    _logger.default.warn('Bad query', queryDefinition);

    throw new Error('Bad query');
  }

  var as = options.as,
      _options$enabled = options.enabled,
      enabled = _options$enabled === void 0 ? true : _options$enabled; // If the query is not enabled, no need to call the queryDefinition
  // because sometimes, we can have a getById(null) since we want to
  // enabled the query only when the specific id is defined. And since
  // Q() can throw error when some checks are KO we don't call Q() if
  // enabled is not true

  var definition = enabled ? resolveToValue(queryDefinition) : null;

  if (!as) {
    throw new Error('You must specify options.as when using useQuery');
  }

  var client = (0, _useClient.default)();
  var queryState = useSelector(function () {
    if (options.singleDocData === undefined && definition !== null && definition !== void 0 && definition.id) {
      _logger.default.warn('useQuery options.singleDocData will pass to true in a next version of cozy-client, please add it now to prevent any problem in the future.');
    }

    return client.getQueryFromState(as, {
      hydrated: (0, _get.default)(options, 'hydrated', true),
      singleDocData: (0, _get.default)(options, 'singleDocData', false)
    });
  }, _utils.equalityCheckForQuery);
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