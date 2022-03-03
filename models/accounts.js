"use strict";

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

console.warn('models/accounts is deprecated in cozy-client, please use models/account instead');