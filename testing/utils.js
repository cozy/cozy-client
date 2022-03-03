"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeWrapper = exports.setupClient = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _mock = require("../mock");

var _simpsons = _interopRequireDefault(require("../testing/simpsons.json"));

var _Provider = _interopRequireDefault(require("../Provider"));

var _CozyClient = _interopRequireDefault(require("../CozyClient"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Setups a client suitable for testing
 *
 * @typedef {object} MockQueryOptions
 *
 * @param  {object} options - Options
 * @param  {MockQueryOptions} [options.queries] - Additional queries to insert in the client
 * @returns {CozyClient}
 */
var setupClient = function setupClient() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      queries = _ref.queries;

  var client = (0, _mock.createMockClient)({
    queries: _objectSpread({
      simpsons: {
        data: _simpsons.default,
        doctype: 'io.cozy.simpsons'
      },
      'simpsons/marge': {
        data: _simpsons.default.filter(function (x) {
          return x.name === 'Marge';
        }),
        doctype: 'io.cozy.simpsons',
        definition: {
          id: 'marge',
          doctype: 'io.cozy.simpsons'
        }
      },
      upperSimpsons: {
        data: _simpsons.default.map(function (x) {
          return _objectSpread(_objectSpread({}, x), {}, {
            name: x.name.toUpperCase()
          });
        }),
        doctype: 'io.cozy.simpsons-upper'
      }
    }, queries)
  });
  client.ensureStore();
  return client;
};
/**
 * @private
 * @param  {CozyClient} client - A client
 * @returns {any}
 */


exports.setupClient = setupClient;

var makeWrapper = function makeWrapper(client) {
  var Wrapper = function Wrapper(_ref2) {
    var children = _ref2.children;
    return /*#__PURE__*/_react.default.createElement(_Provider.default, {
      client: client
    }, children);
  };

  return Wrapper;
};

exports.makeWrapper = makeWrapper;