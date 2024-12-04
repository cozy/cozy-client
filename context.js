"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.clientContext = void 0;

var _react = require("react");

var _CozyClient = _interopRequireDefault(require("./CozyClient"));

var clientContext = /*#__PURE__*/(0, _react.createContext)({
  /** @type {CozyClient|null}  */
  client: null,
  store: null
});
exports.clientContext = clientContext;
var _default = clientContext;
exports.default = _default;