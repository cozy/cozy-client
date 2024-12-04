"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFakeClient = exports.createMockClient = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _merge = _interopRequireDefault(require("lodash/merge"));

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
      queryError = queryOptions.queryError,
      queryResult = (0, _objectWithoutProperties2.default)(queryOptions, ["definition", "doctype", "data", "queryError"]);
  client.store.dispatch((0, _store.initQuery)(queryName, definition || (0, _dsl.Q)(doctype)));

  if (queryError) {
    client.store.dispatch((0, _store.receiveQueryError)(queryName, queryError));
  } else {
    client.store.dispatch((0, _store.receiveQueryResult)(queryName, _objectSpread({
      data: data ? data.map(function (doc) {
        return (0, _cozyStackClient.normalizeDoc)(doc, doctype);
      }) : data
    }, queryResult)));
  }
};

var mockedQueryFromMockedRemoteData = function mockedQueryFromMockedRemoteData(remoteData) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(qdef) {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (remoteData) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", {
                data: null
              });

            case 2:
              if (!remoteData[qdef.doctype]) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", {
                data: remoteData[qdef.doctype]
              });

            case 6:
              return _context.abrupt("return", {
                data: []
              });

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
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
 * @param  {object} [options.clientFunctions] Functions to overide client functions
 * @returns {CozyClient}
 */


var createMockClient = function createMockClient() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      queries = _ref2.queries,
      remote = _ref2.remote,
      clientOptions = _ref2.clientOptions,
      clientFunctions = _ref2.clientFunctions;

  var mockedQuery = jest.fn().mockImplementation(mockedQueryFromMockedRemoteData(remote));
  var clientFunctionsMerge = (0, _merge.default)({
    query: mockedQuery,
    save: jest.fn(),
    saveAll: jest.fn(),
    stackClient: {
      fetchJSON: jest.fn()
    }
  }, clientFunctions);
  return createFakeClient({
    queries: queries,
    remote: remote,
    clientOptions: clientOptions,
    clientFunctions: clientFunctionsMerge
  });
};
/**
 * Creates a client with pre-filled store
 * This can be useful for demo in documentation (e.g. storybook)
 *
 * - client.{query,save} are replaced with empty functions
 * - client.stackClient.fetchJSON is replaced with empty functions
 *
 * @param  {object} options Options
 * @param  {object} [options.queries] Prefill queries inside the store
 * @param  {object} [options.remote] Mock data from the server
 * @param  {object} [options.clientOptions] Options passed to the client
 * @param  {object} [options.clientFunctions] Functions to overide client functions useful for testing
 * @returns {CozyClient}
 */


exports.createMockClient = createMockClient;

var createFakeClient = function createFakeClient() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      queries = _ref3.queries,
      remote = _ref3.remote,
      clientOptions = _ref3.clientOptions,
      clientFunctions = _ref3.clientFunctions;

  var client = new _CozyClient.default(clientOptions || {});
  client.ensureStore();

  for (var _i = 0, _Object$entries = Object.entries(queries || {}); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = (0, _slicedToArray2.default)(_Object$entries[_i], 2),
        queryName = _Object$entries$_i[0],
        queryOptions = _Object$entries$_i[1];

    fillQueryInsideClient(client, queryName, queryOptions);
  }

  client.query = mockedQueryFromMockedRemoteData(remote);
  (0, _merge.default)(client, clientFunctions);
  return client;
};

exports.createFakeClient = createFakeClient;