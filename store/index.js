"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "initQuery", {
  enumerable: true,
  get: function get() {
    return _queries.initQuery;
  }
});
Object.defineProperty(exports, "loadQuery", {
  enumerable: true,
  get: function get() {
    return _queries.loadQuery;
  }
});
Object.defineProperty(exports, "receiveQueryResult", {
  enumerable: true,
  get: function get() {
    return _queries.receiveQueryResult;
  }
});
Object.defineProperty(exports, "receiveQueryError", {
  enumerable: true,
  get: function get() {
    return _queries.receiveQueryError;
  }
});
Object.defineProperty(exports, "initMutation", {
  enumerable: true,
  get: function get() {
    return _mutations.initMutation;
  }
});
Object.defineProperty(exports, "receiveMutationResult", {
  enumerable: true,
  get: function get() {
    return _mutations.receiveMutationResult;
  }
});
Object.defineProperty(exports, "receiveMutationError", {
  enumerable: true,
  get: function get() {
    return _mutations.receiveMutationError;
  }
});
exports.resetState = exports.getRawQueryFromState = exports.getQueryFromState = exports.getQueryFromStore = exports.getDocumentFromState = exports.getCollectionFromState = exports.getStateRoot = exports.createStore = exports.default = exports.StoreProxy = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _cozyFlags = _interopRequireDefault(require("cozy-flags"));

var _redux = require("redux");

var _extension = require("@redux-devtools/extension");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _documents = _interopRequireWildcard(require("./documents"));

var _queries = _interopRequireWildcard(require("./queries"));

var _mutations = require("./mutations");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var RESET_ACTION_TYPE = 'COZY_CLIENT.RESET_STATE';

var resetState = function resetState() {
  return {
    type: RESET_ACTION_TYPE
  };
};

exports.resetState = resetState;

var StoreProxy = /*#__PURE__*/function () {
  function StoreProxy(state) {
    (0, _classCallCheck2.default)(this, StoreProxy);
    this.state = state;
  }

  (0, _createClass2.default)(StoreProxy, [{
    key: "readDocument",
    value: function readDocument(doctype, id) {
      return this.state.documents[doctype][id];
    }
  }, {
    key: "writeDocument",
    value: function writeDocument(document) {
      this.setState(function (state) {
        return _objectSpread(_objectSpread({}, state), {}, {
          documents: _objectSpread(_objectSpread({}, state.documents), {}, (0, _defineProperty2.default)({}, document._type, _objectSpread(_objectSpread({}, state.documents[document._type]), {}, (0, _defineProperty2.default)({}, document._id, document))))
        });
      });
    }
  }, {
    key: "setState",
    value: function setState(updaterFn) {
      this.state = updaterFn(this.state);
    }
  }, {
    key: "getState",
    value: function getState() {
      return this.state;
    }
  }]);
  return StoreProxy;
}();

exports.StoreProxy = StoreProxy;
var initialState = {
  documents: {},
  queries: {}
};

var combinedReducer = function combinedReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type == RESET_ACTION_TYPE) {
    return initialState;
  }

  if (!(0, _queries.isQueryAction)(action) && !(0, _mutations.isMutationAction)(action)) {
    return state;
  }

  if (action.update) {
    var proxy = new StoreProxy(state);
    action.update(proxy, action.response);
    return {
      documents: proxy.getState().documents,
      queries: (0, _queries.default)(proxy.getState().queries, action, proxy.getState().documents)
    };
  }

  var nextDocuments = (0, _documents.default)(state.documents, action);
  var haveDocumentsChanged = nextDocuments !== state.documents;
  return {
    documents: nextDocuments,
    queries: (0, _queries.default)(state.queries, action, nextDocuments, haveDocumentsChanged)
  };
};

var _default = combinedReducer;
exports.default = _default;
var composedEnhancer = (0, _cozyFlags.default)('debug') ? (0, _extension.composeWithDevTools)((0, _redux.applyMiddleware)(_reduxThunk.default)) : (0, _redux.applyMiddleware)(_reduxThunk.default);

var createStore = function createStore() {
  return (0, _redux.createStore)((0, _redux.combineReducers)({
    cozy: combinedReducer
  }), composedEnhancer);
};

exports.createStore = createStore;

var getStateRoot = function getStateRoot(state) {
  return state.cozy || {};
};

exports.getStateRoot = getStateRoot;

var getCollectionFromState = function getCollectionFromState(state, doctype) {
  return (0, _documents.getCollectionFromSlice)(getStateRoot(state).documents, doctype);
};

exports.getCollectionFromState = getCollectionFromState;

var getDocumentFromState = function getDocumentFromState(state, doctype, id) {
  return (0, _documents.getDocumentFromSlice)(getStateRoot(state).documents, doctype, id);
};

exports.getDocumentFromState = getDocumentFromState;

var getQueryFromStore = function getQueryFromStore(store, queryId) {
  return getQueryFromState(store.getState(), queryId);
};

exports.getQueryFromStore = getQueryFromStore;

var getQueryFromState = function getQueryFromState(state, queryId) {
  return (0, _queries.getQueryFromSlice)(getStateRoot(state).queries, queryId, getStateRoot(state).documents);
};

exports.getQueryFromState = getQueryFromState;

var getRawQueryFromState = function getRawQueryFromState(state, queryId) {
  return (0, _queries.getQueryFromSlice)(getStateRoot(state).queries, queryId);
};

exports.getRawQueryFromState = getRawQueryFromState;