"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _minilog = _interopRequireDefault(require("@cozy/minilog"));

var logger = (0, _minilog.default)('cozy-client');

_minilog.default.suggest.deny('cozy-client', 'info');

var _default = logger;
exports.default = _default;