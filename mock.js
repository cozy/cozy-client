"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMockClient = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _CozyClient = _interopRequireDefault(require("./CozyClient"));

var _store = require("./store");

var _cozyStackClient = require("cozy-stack-client");

var _dsl = require("./queries/dsl");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var fillQueryInsideClient = function fillQueryInsideClient(client, queryName, queryOptions) {
  var definition = queryOptions.definition,
      doctype = queryOptions.doctype,
      data = queryOptions.data,
      queryResult = (0, _objectWithoutProperties2.default)(queryOptions, ["definition", "doctype", "data"]);
  client.store.dispatch((0, _store.initQuery)(queryName, definition || (0, _dsl.Q)(doctype)));
  client.store.dispatch((0, _store.receiveQueryResult)(queryName, _objectSpread({
    data: data ? data.map(function (doc) {
      return (0, _cozyStackClient.normalizeDoc)(doc, doctype);
    }) : data
  }, queryResult)));
};

var mockedQueryFromMockedRemoteData = function mockedQueryFromMockedRemoteData(remoteData) {
  return function (qdef) {
    if (!remoteData) {
      return {
        data: null
      };
    }

    if (remoteData[qdef.doctype]) {
      return {
        data: remoteData[qdef.doctype]
      };
    } else {
      return {
        data: []
      };
    }
  };
};
/**
 * Creates a client suitable for use in tests
 *
 * - client.{query,save} are mocked
 * - client.stackClient.fetchJSON is mocked
 *
 * @param  {object} options Options
 * @param  {object} [options.queries] Prefill queries inside the store
 * @param  {object} [options.remote] Mock data from the server
 * @param  {object} [options.clientOptions] Options passed to the client
 * @returns {CozyClient}
 */


var createMockClient = function createMockClient(_ref) {
  var queries = _ref.queries,
      remote = _ref.remote,
      clientOptions = _ref.clientOptions;
  var client = new _CozyClient.default(clientOptions || {});
  client.ensureStore();

  for (var _i = 0, _Object$entries = Object.entries(queries || {}); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = (0, _slicedToArray2.default)(_Object$entries[_i], 2),
        queryName = _Object$entries$_i[0],
        queryOptions = _Object$entries$_i[1];

    fillQueryInsideClient(client, queryName, queryOptions);
  }

  client.query = jest.fn().mockImplementation(mockedQueryFromMockedRemoteData(remote));
  client.save = jest.fn();
  client.saveAll = jest.fn();
  client.stackClient.fetchJSON = jest.fn();
  return client;
};

exports.createMockClient = createMockClient;