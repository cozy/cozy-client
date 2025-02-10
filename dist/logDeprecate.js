"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = _interopRequireDefault(require("./logger"));

var logDeprecate = function logDeprecate() {
  if (process.env.NODE_ENV === 'test') {
    throw new Error('Deprecation error: ' + (arguments.length <= 0 ? undefined : arguments[0]));
  }

  _logger.default.warn.apply(_logger.default, arguments);
};

var _default = logDeprecate;
exports.default = _default;