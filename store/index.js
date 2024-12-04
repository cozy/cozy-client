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
Object.defineProperty(exports, "resetQuery", {
  enumerable: true,
  get: function get() {
    return _queries.resetQuery;
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
Object.defineProperty(exports, "executeQueryFromState", {
  enumerable: true,
  get: function get() {
    return _queries.executeQueryFromState;
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
Object.defineProperty(exports, "getStateRoot", {
  enumerable: true,
  get: function get() {
    return _stateHelpers.getStateRoot;
  }
});
Object.defineProperty(exports, "getCollectionFromState", {
  enumerable: true,
  get: function get() {
    return _stateHelpers.getCollectionFromState;
  }
});
Object.defineProperty(exports, "getDocumentFromState", {
  enumerable: true,
  get: function get() {
    return _stateHelpers.getDocumentFromState;
  }
});
Object.defineProperty(exports, "getQueryFromStore", {
  enumerable: true,
  get: function get() {
    return _stateHelpers.getQueryFromStore;
  }
});
Object.defineProperty(exports, "getQueryFromState", {
  enumerable: true,
  get: function get() {
    return _stateHelpers.getQueryFromState;
  }
});
Object.defineProperty(exports, "getRawQueryFromState", {
  enumerable: true,
  get: function get() {
    return _stateHelpers.getRawQueryFromState;
  }
});
Object.defineProperty(exports, "isQueryExisting", {
  enumerable: true,
  get: function get() {
    return _stateHelpers.isQueryExisting;
  }
});
Object.defineProperty(exports, "dispatchCreate", {
  enumerable: true,
  get: function get() {
    return _realtime.dispatchCreate;
  }
});
Object.defineProperty(exports, "dispatchUpdate", {
  enumerable: true,
  get: function get() {
    return _realtime.dispatchUpdate;
  }
});
Object.defineProperty(exports, "dispatchDelete", {
  enumerable: true,
  get: function get() {
    return _realtime.dispatchDelete;
  }
});
exports.resetState = exports.createStore = exports.default = exports.StoreProxy = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _cozyFlags = _interopRequireDefault(require("cozy-flags"));

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _documents = _interopRequireDefault(require("./documents"));

var _queries = _interopRequireWildcard(require("./queries"));

var _mutations = require("./mutations");

var _stateHelpers = require("./stateHelpers");

var _realtime = require("./realtime");

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

var composedEnhancer = // @ts-ignore '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' doesn't exist 'Window & typeof globalThis'.ts(2339)
// should be (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ in ts file
// see https://github.com/reduxjs/redux-devtools/tree/main/extension#11-basic-store
(0, _cozyFlags.default)('debug') && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;

var createStore = function createStore() {
  return (0, _redux.createStore)((0, _redux.combineReducers)({
    cozy: combinedReducer
  }), composedEnhancer((0, _redux.applyMiddleware)(_reduxThunk.default)));
};

exports.createStore = createStore;