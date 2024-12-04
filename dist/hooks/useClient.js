"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _context = _interopRequireDefault(require("../context"));

var _CozyClient = _interopRequireDefault(require("../CozyClient"));

/**
 * Returns the cozy client from the context
 *
 * @returns {CozyClient|null} - Current cozy client
 */
var useClient = function useClient() {
  var _useContext = (0, _react.useContext)(_context.default),
      client = _useContext.client;

  return client;
};

var _default = useClient;
exports.default = _default;