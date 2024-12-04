"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "getMutedErrors", {
  enumerable: true,
  get: function get() {
    return _account.getMutedErrors;
  }
});
Object.defineProperty(exports, "muteError", {
  enumerable: true,
  get: function get() {
    return _account.muteError;
  }
});

var _account = require("./account");

var _logger = _interopRequireDefault(require("../logger"));

_logger.default.warn('models/accounts is deprecated in cozy-client, please use models/account instead');