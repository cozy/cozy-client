"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _get = _interopRequireDefault(require("lodash/get"));

var _store = require("./store");

/**
 * ObservableQueries are the glue between the store and observers
 * of the store. They have the responsibility to hydrate the documents
 * before passing them to the React component.
 */
var hasOwn = Object.prototype.hasOwnProperty;

var ObservableQuery = /*#__PURE__*/function () {
  function ObservableQuery(queryId, definition, client, options) {
    var _this = this;

    (0, _classCallCheck2.default)(this, ObservableQuery);
    (0, _defineProperty2.default)(this, "handleStoreChange", function () {
      var nextResult = _this.currentRawResult();

      if (!shallowEqual(nextResult, _this.lastResult)) {
        _this.lastResult = nextResult;

        _this.notifyObservers();
      }
    });

    if (!queryId || !definition || !client) {
      throw new Error('ObservableQuery takes 3 arguments: queryId, definition and client');
    }

    this.queryId = queryId;
    this.definition = definition;
    this.client = client;
    this.observers = {};
    this.idCounter = 1;
    this.lastResult = this.currentRawResult();
    this.options = options;
  }

  (0, _createClass2.default)(ObservableQuery, [{
    key: "currentResult",

    /**
     * Returns the query from the store with hydrated documents.
     *
     * @typedef {object} HydratedQueryState
     *
     * @returns {HydratedQueryState}
     */
    value: function currentResult() {
      return this.client.getQueryFromState(this.queryId, {
        hydrated: (0, _get.default)(this.options, 'hydrated', true),
        singleDocData: true
      });
    }
  }, {
    key: "fetch",
    value: function fetch() {
      return this.client.query(this.definition, {
        as: this.queryId
      });
    }
    /**
     * Generates and executes a query that is offsetted by the number of documents
     * we have in the store.
     */

  }, {
    key: "fetchMore",
    value: function fetchMore() {
      var rawResult = this.currentRawResult();
      return rawResult.bookmark ? this.client.query(this.definition.offsetBookmark(rawResult.bookmark), {
        as: this.queryId
      }) : this.client.query(this.definition.offset(rawResult.data.length), {
        as: this.queryId
      });
    }
  }, {
    key: "currentRawResult",
    value: function currentRawResult() {
      return (0, _store.getRawQueryFromState)(this.getStore().getState(), this.queryId);
    }
  }, {
    key: "notifyObservers",
    value: function notifyObservers() {
      var _this2 = this;

      Object.keys(this.observers).forEach(function (id) {
        return _this2.observers[id]();
      });
    }
  }, {
    key: "subscribeToStore",
    value: function subscribeToStore() {
      if (this._unsubscribeStore) {
        throw new Error('ObservableQuery instance is already subscribed to store.');
      }

      this._unsubscribeStore = this.getStore().subscribe(this.handleStoreChange);
    }
  }, {
    key: "unsubscribeFromStore",
    value: function unsubscribeFromStore() {
      if (!this._unsubscribeStore) {
        throw new Error('ObservableQuery instance is not subscribed to store');
      }

      this._unsubscribeStore();
    }
  }, {
    key: "subscribe",
    value: function subscribe(callback) {
      var _this3 = this;

      var callbackId = this.idCounter;
      this.idCounter++;
      this.observers[callbackId] = callback;

      if (Object.keys(this.observers).length === 1) {
        this.subscribeToStore();
      }

      return function () {
        return _this3.unsubscribe(callbackId);
      };
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(callbackId) {
      if (!this.observers[callbackId]) {
        throw new Error("Cannot unsubscribe unknown callbackId ".concat(callbackId));
      }

      delete this.observers[callbackId];

      if (Object.keys(this.observers).length === 0) {
        this.unsubscribeFromStore();
        this._unsubscribeStore = null;
      }
    }
  }, {
    key: "getStore",
    value: function getStore() {
      return this.client.store;
    }
  }]);
  return ObservableQuery;
}();

exports.default = ObservableQuery;

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}