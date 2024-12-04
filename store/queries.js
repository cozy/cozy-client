"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryIDGenerator = exports.getQueryFromSlice = exports.resetQuery = exports.receiveQueryError = exports.receiveQueryResult = exports.loadQuery = exports.initQuery = exports.default = exports.updateData = exports.makeSorterFromDefinition = exports.executeQueryFromState = exports.mergeSelectorAndPartialIndex = exports.convert$gtNullSelectors = exports.sortAndLimitDocsIds = exports.isReceivingData = exports.isQueryAction = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _mapValues = _interopRequireDefault(require("lodash/mapValues"));

var _groupBy = _interopRequireDefault(require("lodash/groupBy"));

var _difference = _interopRequireDefault(require("lodash/difference"));

var _intersection = _interopRequireDefault(require("lodash/intersection"));

var _concat = _interopRequireDefault(require("lodash/concat"));

var _isPlainObject = _interopRequireDefault(require("lodash/isPlainObject"));

var _uniq = _interopRequireDefault(require("lodash/uniq"));

var _orderBy = _interopRequireDefault(require("lodash/orderBy"));

var _isString = _interopRequireDefault(require("lodash/isString"));

var _get = _interopRequireDefault(require("lodash/get"));

var _sift = _interopRequireDefault(require("sift"));

var _cozyFlags = _interopRequireDefault(require("cozy-flags"));

var _documents = require("./documents");

var _mutations = require("./mutations");

var _helpers = require("./helpers");

var _dsl = require("../queries/dsl");

var _logger = _interopRequireDefault(require("../logger"));

var _stateHelpers = require("./stateHelpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var INIT_QUERY = 'INIT_QUERY';
var LOAD_QUERY = 'LOAD_QUERY';
var RECEIVE_QUERY_RESULT = 'RECEIVE_QUERY_RESULT';
var RECEIVE_QUERY_ERROR = 'RECEIVE_QUERY_ERROR';
var RESET_QUERY = 'RESET_QUERY'; // Read if the devtools are open to store the execution time
// This is done at runtime to not read the value everytime
// we receive a result. So you have to refresh your page
// in order to get the stats

var executionStatsEnabled = (0, _cozyFlags.default)('debug');

var isQueryAction = function isQueryAction(action) {
  return [INIT_QUERY, LOAD_QUERY, RECEIVE_QUERY_RESULT, RECEIVE_QUERY_ERROR, RESET_QUERY].indexOf(action.type) !== -1;
};

exports.isQueryAction = isQueryAction;

var isReceivingData = function isReceivingData(action) {
  return action.type === RECEIVE_QUERY_RESULT;
};
/** @type {import("../types").QueryState} */


exports.isReceivingData = isReceivingData;
var queryInitialState = {
  id: null,
  definition: null,
  fetchStatus: 'pending',
  isFetching: null,
  lastFetch: null,
  lastUpdate: null,
  lastErrorUpdate: null,
  lastError: null,
  hasMore: false,
  count: 0,
  fetchedPagesCount: 0,
  data: [],
  bookmark: null
};
/**
 * Return the docs ids accordingly to the given sort and fetched docs
 *
 * @param {import("../types").QueryState} queryState - Current state
 * @param {import("../types").DocumentsStateSlice} documents - Reference to the documents slice
 * @param {Array<string>} ids - The updated ids after query
 * @param {object} params - The additional params
 * @param {number} params.count - The count of retrieved docs
 * @param {number} params.fetchedPagesCount - The number of pages already fetched
 * @returns {Array<string>} The list of sorted ids
 */

var sortAndLimitDocsIds = function sortAndLimitDocsIds(queryState, documents, ids, _ref) {
  var count = _ref.count,
      fetchedPagesCount = _ref.fetchedPagesCount;
  var evaluatedIds = (0, _toConsumableArray2.default)(ids);

  if (queryState.definition.sort && documents) {
    var sorter = makeSorterFromDefinition(queryState.definition);
    var allDocs = documents[queryState.definition.doctype];
    var docs = allDocs ? evaluatedIds.map(function (_id) {
      return allDocs[_id];
    }).filter(Boolean) : [];
    evaluatedIds = sorter(docs).map(_helpers.properId);
  }

  var limit = queryState.definition.limit;

  if (limit) {
    var sliceCount;

    if (count < limit) {
      // When there are less results than the limit, this is either the first
      // or last paginated query.
      sliceCount = fetchedPagesCount > 1 ? limit * (fetchedPagesCount - 1) + count : count;
    } else {
      sliceCount = limit * fetchedPagesCount;
    }

    evaluatedIds = evaluatedIds.slice(0, sliceCount);
  }

  return evaluatedIds;
};
/**
 * Return the query docs ids, taken from the action response and the documents' slice
 *
 * @param {import("../types").QueryState} queryState - Current state
 * @param {object} response - The action response
 * @param {import("../types").DocumentsStateSlice} documents - Reference to the documents slice
 * @param {object} params - The additional params
 * @param {number} params.count - The count of retrieved docs
 * @param {number} params.fetchedPagesCount - The number of pages already fetched
 * @returns {Array<string>} The list of sorted ids
 */


exports.sortAndLimitDocsIds = sortAndLimitDocsIds;

var updateQueryDataFromResponse = function updateQueryDataFromResponse(queryState, response, documents, _ref2) {
  var count = _ref2.count,
      fetchedPagesCount = _ref2.fetchedPagesCount;
  var updatedIds = (0, _uniq.default)([].concat((0, _toConsumableArray2.default)(queryState.data), (0, _toConsumableArray2.default)(response.data.map(_helpers.properId))));
  return sortAndLimitDocsIds(queryState, documents, updatedIds, {
    count: count,
    fetchedPagesCount: fetchedPagesCount
  });
};
/**
 * Reducer for a query slice
 *
 * @param  {import("../types").QueryState} state - Current state
 * @param  {any} action - Redux action
 * @param  {import("../types").DocumentsStateSlice} documents - Reference to the next documents slice
 * @returns {import("../types").QueryState} - Next state
 */


var query = function query() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : queryInitialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var documents = arguments.length > 2 ? arguments[2] : undefined;

  switch (action.type) {
    case INIT_QUERY:
      if (state.lastUpdate && state.id === action.queryId && state.definition === action.queryDefinition) {
        return state;
      }

      return _objectSpread(_objectSpread({}, state), {}, {
        id: action.queryId,
        definition: action.queryDefinition,
        options: action.options,
        fetchStatus: state.lastUpdate ? state.fetchStatus : 'pending'
      });

    case LOAD_QUERY:
      if (state.fetchStatus === 'loading') {
        return state;
      }

      if (state.fetchStatus === 'loaded' && action.backgroundFetching) {
        return _objectSpread(_objectSpread({}, state), {}, {
          fetchStatus: 'loaded',
          isFetching: true
        });
      }

      return _objectSpread(_objectSpread({}, state), {}, {
        fetchStatus: 'loading'
      });

    case RECEIVE_QUERY_RESULT:
      {
        var response = action.response; // Data can be null when we get a 404 not found
        // see Collection.get()
        // but we still need to update the fetchStatus.

        if (!response.data) {
          return _objectSpread(_objectSpread({}, state), {}, {
            fetchStatus: 'loaded',
            isFetching: action.backgroundFetching ? false : null,
            lastFetch: Date.now(),
            lastUpdate: Date.now()
          });
        }
        /** @type {Partial<import("../types").QueryState>} */


        var common = _objectSpread({
          fetchStatus: 'loaded',
          isFetching: action.backgroundFetching ? false : null,
          lastFetch: Date.now(),
          lastUpdate: Date.now()
        }, executionStatsEnabled && {
          execution_stats: response.execution_stats
        });

        if (!Array.isArray(response.data)) {
          return _objectSpread(_objectSpread(_objectSpread({}, state), common), {}, {
            hasMore: false,
            count: 1,
            data: [(0, _helpers.properId)(response.data)]
          });
        }

        var count = response.meta && response.meta.count ? response.meta.count : response.data.length;

        if (action.backgroundFetching) {
          return _objectSpread(_objectSpread(_objectSpread({}, state), common), {}, {
            bookmark: response.bookmark || null,
            hasMore: response.next !== undefined ? response.next : state.hasMore,
            count: count,
            data: response.data.map(_helpers.properId)
          });
        }

        var fetchedPagesCount = state.fetchedPagesCount + 1;
        var data = updateQueryDataFromResponse(state, response, documents, {
          count: count,
          fetchedPagesCount: fetchedPagesCount
        });
        return _objectSpread(_objectSpread(_objectSpread({}, state), common), {}, {
          bookmark: response.bookmark || null,
          hasMore: response.next !== undefined ? response.next : state.hasMore,
          count: count,
          fetchedPagesCount: fetchedPagesCount,
          data: data
        });
      }

    case RECEIVE_QUERY_ERROR:
      return _objectSpread(_objectSpread({}, state), {}, {
        id: action.queryId,
        fetchStatus: 'failed',
        isFetching: action.backgroundFetching ? false : null,
        lastError: action.error,
        lastErrorUpdate: Date.now()
      });

    case RESET_QUERY:
      return _objectSpread(_objectSpread({}, queryInitialState), {}, {
        id: action.queryId,
        definition: state.definition,
        options: state.options
      });

    default:
      return state;
  }
};
/**
 * Normalize sift selector
 *
 * @returns {object}
 */


var convert$gtNullSelectors = function convert$gtNullSelectors(selector) {
  var result = {};

  for (var _i = 0, _Object$entries = Object.entries(selector); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = (0, _slicedToArray2.default)(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    var convertedValue = (0, _isPlainObject.default)(value) ? convert$gtNullSelectors(value) : value;
    var convertedKey = key === '$gt' && convertedValue === null ? '$gtnull' : key;
    result[convertedKey] = convertedValue;
  }

  return result;
};
/**
 * Merges query selectors with query partial indexes
 *
 * @param {object} queryDefinition - A query definition
 * @returns {object} A query definition selector
 */


exports.convert$gtNullSelectors = convert$gtNullSelectors;

var mergeSelectorAndPartialIndex = function mergeSelectorAndPartialIndex(queryDefinition) {
  return _objectSpread(_objectSpread({}, (0, _get.default)(queryDefinition, 'selector')), (0, _get.default)(queryDefinition, 'partialFilter'));
};
/**
 * @param  {QueryDefinition} queryDefinition - A query definition
 * @returns {function(import("../types").CozyClientDocument): boolean}
 */


exports.mergeSelectorAndPartialIndex = mergeSelectorAndPartialIndex;

var getSelectorFilterFn = function getSelectorFilterFn(queryDefinition) {
  if (queryDefinition.selector || queryDefinition.partialFilter) {
    var selectors = mergeSelectorAndPartialIndex(queryDefinition); // sift does not work like couchdb when using { $gt: null } as a selector, so we use a custom operator

    _sift.default.use({
      $gtnull: function $gtnull(_selectorValue, actualValue) {
        return !!actualValue;
      }
    });

    return (0, _sift.default)(convert$gtNullSelectors(selectors));
  } else if (queryDefinition.id) {
    /** @type {object} */
    var siftQuery = {
      _id: queryDefinition.id
    };
    return (0, _sift.default)(siftQuery);
  } else if (queryDefinition.ids) {
    /** @type {object} */
    var _siftQuery = {
      _id: {
        $in: queryDefinition.ids
      }
    };
    return (0, _sift.default)(_siftQuery);
  } else {
    return null;
  }
};
/**
 * Execute the given query against the document state.
 *
 * @param {import('../types').CozyStore} state - The cozy state
 * @param {QueryDefinition} queryDefinition - The query definition to execute
 * @returns {import("../types").QueryStateData} - The returned documents from the query
 */


var executeQueryFromState = function executeQueryFromState(state, queryDefinition) {
  var documents = (0, _stateHelpers.getCollectionFromState)(state, queryDefinition.doctype);
  var isSingleObjectResponse = !!queryDefinition.id;

  if (!documents) {
    return {
      data: isSingleObjectResponse ? null : []
    };
  }

  var res = documents.filter(makeFilterDocumentFn(queryDefinition));

  if (isSingleObjectResponse) {
    return {
      data: res.length > 0 ? res[0] : null
    };
  }

  var sorter = makeSorterFromDefinition(queryDefinition);
  var sortedDocuments = sorter(res);
  return {
    data: sortedDocuments
  };
};
/**
 *
 * Returns a predicate function that checks if a document should be
 * included in the result of the query.
 *
 * @param  {QueryDefinition} queryDefinition - Definition of the query
 * @returns {function(import("../types").CozyClientDocument): boolean} Predicate function
 */


exports.executeQueryFromState = executeQueryFromState;

var makeFilterDocumentFn = function makeFilterDocumentFn(queryDefinition) {
  var qdoctype = queryDefinition.doctype;
  var selectorFilterFn = getSelectorFilterFn(queryDefinition);
  return function (datum) {
    var ddoctype = datum._type;
    if (ddoctype !== qdoctype) return false;
    if (datum._deleted) return false;
    if (!selectorFilterFn) return true; // no selector: query all the docs

    return !!selectorFilterFn(datum); // evaluate the sift function
  };
};

var makeCaseInsensitiveStringSorter = function makeCaseInsensitiveStringSorter(attrName) {
  return function (item) {
    var attrValue = (0, _get.default)(item, attrName);
    return (0, _isString.default)(attrValue) ? attrValue.toLowerCase() : attrValue;
  };
};
/**
 * Creates a sort function from a definition.
 *
 * Used to sort query results inside the store when creating a file or
 * receiving updates.
 *
 * @param {QueryDefinition} definition - A query definition
 * @returns {function(Array<import("../types").CozyClientDocument>): Array<import("../types").CozyClientDocument>}
 *
 * @private
 */


var makeSorterFromDefinition = function makeSorterFromDefinition(definition) {
  var sort = definition.sort;

  if (!sort) {
    return function (docs) {
      return docs;
    };
  } else if (!Array.isArray(definition.sort)) {
    _logger.default.warn('Correct update of queries with a sort that is not an array is not supported. Use an array as argument of QueryDefinition::sort');

    return function (docs) {
      return docs;
    };
  } else {
    var attributeOrders = sort.map(function (x) {
      return Object.entries(x)[0];
    });
    var attrs = attributeOrders.map(function (x) {
      return x[0];
    }).map(makeCaseInsensitiveStringSorter);
    var orders = attributeOrders.map(function (x) {
      return x[1];
    });
    return function (docs) {
      return (0, _orderBy.default)(docs, attrs, orders);
    };
  }
};
/**
 * Updates query state when new data comes in
 *
 * @param  {import("../types").QueryState} query - Current query state
 * @param  {Array<import("../types").CozyClientDocument>} newData - New documents (in most case from the server)
 * @param  {import("../types").DocumentsStateSlice} documents - A reference to the documents slice
 * @returns {import("../types").QueryState} - Updated query state
 */


exports.makeSorterFromDefinition = makeSorterFromDefinition;

var updateData = function updateData(query, newData, documents) {
  var belongsToQuery = makeFilterDocumentFn(query.definition);
  var res = (0, _mapValues.default)((0, _groupBy.default)(newData, belongsToQuery), function (docs) {
    return docs.map(_helpers.properId);
  });
  var _res$true = res.true,
      matchedIds = _res$true === void 0 ? [] : _res$true,
      _res$false = res.false,
      unmatchedIds = _res$false === void 0 ? [] : _res$false;
  var originalIds = query.data;
  var autoUpdate = query.options && query.options.autoUpdate;
  var shouldRemove = !autoUpdate || autoUpdate.remove !== false;
  var shouldAdd = !autoUpdate || autoUpdate.add !== false;
  var shouldUpdate = !autoUpdate || autoUpdate.update !== false;
  var toRemove = shouldRemove ? (0, _intersection.default)(originalIds, unmatchedIds) : [];
  var toAdd = shouldAdd ? (0, _difference.default)(matchedIds, originalIds) : [];
  var toUpdate = shouldUpdate ? (0, _intersection.default)(originalIds, matchedIds) : [];
  var changed = toRemove.length || toAdd.length || toUpdate.length; // concat doesn't check duplicates (contrarily to union), which is ok as
  // toAdd does not contain any id present in originalIds, by construction.
  // It is also faster than union.

  var updatedData = (0, _difference.default)((0, _concat.default)(originalIds, toAdd), toRemove);
  var fetchedPagesCount = query.fetchedPagesCount;
  var docsIds = sortAndLimitDocsIds(query, documents, updatedData, {
    count: updatedData.length,
    fetchedPagesCount: fetchedPagesCount
  });
  return _objectSpread(_objectSpread({}, query), {}, {
    data: docsIds,
    count: docsIds.length,
    fetchedPagesCount: fetchedPagesCount,
    lastUpdate: changed ? Date.now() : query.lastUpdate
  });
};
/**
 * Creates a function that returns an updated query state
 * from an action
 *
 * @param  {object} action - A redux action
 * @param  {import("../types").DocumentsStateSlice} documents - Reference to documents slice
 * @returns {function(import("../types").QueryState): import("../types").QueryState} - Updater query state
 */


exports.updateData = updateData;

var autoQueryUpdater = function autoQueryUpdater(action, documents) {
  return function (query) {
    var data = (0, _get.default)(action, 'response.data') || (0, _get.default)(action, 'definition.document');
    if (!data) return query;

    if (!Array.isArray(data)) {
      data = [data];
    }

    if (!data.length) {
      return query;
    }

    if (query.definition.doctype !== data[0]._type) {
      return query;
    }

    return updateData(query, data, documents);
  };
};
/**
 * Creates a function that returns an updated query state
 * from an action
 *
 * @param  {object} action - A redux action
 * @param  {import("../types").DocumentsStateSlice} documents - Reference to documents slice
 * @returns {function(import("../types").QueryState): import("../types").QueryState} - Updater query state
 */


var manualQueryUpdater = function manualQueryUpdater(action, documents) {
  return function (query) {
    var updateQueries = action.updateQueries;
    var response = action.response;
    var updater = updateQueries[query.id];

    if (!updater) {
      return query;
    }

    var doctype = query.definition.doctype;
    var oldData = query.data;
    var oldDocs = mapIdsToDocuments(documents, doctype, oldData);
    var newData = updater(oldDocs, response);
    var newDataIds = newData.map(_helpers.properId);
    return _objectSpread(_objectSpread({}, query), {}, {
      data: newDataIds,
      count: newDataIds.length,
      lastUpdate: Date.now()
    });
  };
};
/**
 * @param  {import("../types").QueriesStateSlice}  state - Redux slice containing all the query states indexed by name
 * @param  {object}  action - Income redux action
 * @param  {import("../types").DocumentsStateSlice}  documents - Reference to documents slice
 * @param  {boolean} haveDocumentsChanged - Has the document slice changed with current action
 * @returns {import("../types").QueriesStateSlice}
 */


var queries = function queries() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var documents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var haveDocumentsChanged = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  if (action.type == INIT_QUERY) {
    var newQueryState = query(state[action.queryId], action, documents); // Do not create new object unnecessarily

    if (newQueryState === state[action.queryId]) {
      return state;
    }

    return _objectSpread(_objectSpread({}, state), {}, (0, _defineProperty2.default)({}, action.queryId, newQueryState));
  }

  if (isQueryAction(action)) {
    var updater = autoQueryUpdater(action, documents);
    return (0, _mapValues.default)(state, function (queryState) {
      if (queryState.id == action.queryId) {
        return query(queryState, action, documents);
      } else if (haveDocumentsChanged) {
        return updater(queryState);
      } else {
        return queryState;
      }
    });
  }

  if ((0, _mutations.isReceivingMutationResult)(action)) {
    var _updater = action.updateQueries ? manualQueryUpdater(action, documents) : autoQueryUpdater(action, documents);

    return (0, _mapValues.default)(state, _updater);
  }

  return state;
};

var _default = queries;
/**
 * Create the query states in the store. Queries are indexed
 * in the store by queryId
 *
 * @param  {string} queryId  Name/id of the query
 * @param  {QueryDefinition} queryDefinition - Definition of the created query
 * @param  {import("../types").QueryOptions} [options] - Options for the created query
 * @returns {object} Redux action to dispatch
 */

exports.default = _default;

var initQuery = function initQuery(queryId, queryDefinition) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (!queryDefinition.doctype) {
    throw new Error('Cannot init query with no doctype');
  }

  return {
    type: INIT_QUERY,
    queryId: queryId,
    queryDefinition: queryDefinition,
    options: options
  };
};
/**
 * Update the fetchStatus when the query is loading
 *
 * @param  {string} queryId - id of the query
 * @param  {import("../types").QueryOptions} [options] - Options for the created query
 * @returns {object} Redux action to dispatch
 */


exports.initQuery = initQuery;

var loadQuery = function loadQuery(queryId, options) {
  return _objectSpread({
    type: LOAD_QUERY,
    queryId: queryId
  }, options);
};
/**
 * Update the fetchStatus when the query is loading
 *
 * @param  {string} queryId - id of the query
 * @param {object} response - The action response
 * @param  {import("../types").QueryOptions} [options] - Options for the created query
 * @returns {object} Redux action to dispatch
 */


exports.loadQuery = loadQuery;

var receiveQueryResult = function receiveQueryResult(queryId, response) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _objectSpread({
    type: RECEIVE_QUERY_RESULT,
    queryId: queryId,
    response: response
  }, options);
};
/**
 * Update the fetchStatus when the query is loading
 *
 * @param  {string} queryId - id of the query
 * @param {object} error - The action error
 * @param  {import("../types").QueryOptions} [options] - Options for the created query
 * @returns {object} Redux action to dispatch
 */


exports.receiveQueryResult = receiveQueryResult;

var receiveQueryError = function receiveQueryError(queryId, error) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _objectSpread({
    type: RECEIVE_QUERY_ERROR,
    queryId: queryId,
    error: error
  }, options);
};
/**
 * Reset the query state to its initial state
 *
 * @param {string} queryId - id of the query
 * @returns {object} - Redux action to dispatch
 */


exports.receiveQueryError = receiveQueryError;

var resetQuery = function resetQuery(queryId) {
  return {
    type: RESET_QUERY,
    queryId: queryId
  };
}; // selectors


exports.resetQuery = resetQuery;

var mapIdsToDocuments = function mapIdsToDocuments(documents, doctype, ids) {
  return ids.map(function (id) {
    return (0, _documents.getDocumentFromSlice)(documents, doctype, id);
  });
};

var getQueryFromSlice = function getQueryFromSlice(state, queryId, documents) {
  if (!state || !state[queryId]) {
    return _objectSpread(_objectSpread({}, queryInitialState), {}, {
      id: queryId,
      data: null
    });
  }

  var query = state[queryId];
  return documents ? _objectSpread(_objectSpread({}, query), {}, {
    data: mapIdsToDocuments(documents, query.definition.doctype, query.data)
  }) : query;
};

exports.getQueryFromSlice = getQueryFromSlice;

var QueryIDGenerator = /*#__PURE__*/function () {
  function QueryIDGenerator() {
    (0, _classCallCheck2.default)(this, QueryIDGenerator);
    this.idCounter = 1;
  }
  /**
   * Generates a random id for unamed queries
   */


  (0, _createClass2.default)(QueryIDGenerator, [{
    key: "generateRandomId",
    value: function generateRandomId() {
      var id = this.idCounter;
      this.idCounter++;
      return id.toString();
    }
    /**
     * Generates an id for queries
     * If the query is a getById only query,
     * we can generate a name for it.
     *
     * If not, let's generate a random id
     *
     * @param {QueryDefinition} queryDefinition The query definition
     * @returns {string}
     */

  }, {
    key: "generateId",
    value: function generateId(queryDefinition) {
      if (!(0, _dsl.isAGetByIdQuery)(queryDefinition)) {
        return this.generateRandomId();
      } else {
        var id = queryDefinition.id,
            doctype = queryDefinition.doctype;
        return "".concat(doctype, "/").concat(id);
      }
    }
  }]);
  return QueryIDGenerator;
}();

exports.QueryIDGenerator = QueryIDGenerator;
QueryIDGenerator.UNNAMED = 'unnamed';