"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTestAssets = exports.queryResultFromData = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _redux = require("redux");

var _CozyLink = _interopRequireDefault(require("../CozyLink"));

var _CozyClient = _interopRequireDefault(require("../CozyClient"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var queryResultFromData = function queryResultFromData(data) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _objectSpread({
    data: data,
    meta: {
      count: data.length
    },
    skip: 0,
    next: false
  }, opts);
};

exports.queryResultFromData = queryResultFromData;

var createTestAssets = function createTestAssets() {
  // TODO this requestHandler should be improved upon
  var requestHandler = function requestHandler() {
    return {
      data: []
    };
  };

  var link = new _CozyLink.default(requestHandler);
  var client = new _CozyClient.default({
    links: [link],
    store: false
  });
  var store = (0, _redux.createStore)((0, _redux.combineReducers)({
    cozy: client.reducer()
  }));
  client.setStore(store);
  return {
    client: client,
    store: store,
    link: link
  };
};

exports.createTestAssets = createTestAssets;