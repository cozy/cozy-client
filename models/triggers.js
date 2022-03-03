"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "triggerStates", {
  enumerable: true,
  get: function get() {
    return _account.triggerStates;
  }
});
Object.defineProperty(exports, "triggers", {
  enumerable: true,
  get: function get() {
    return _account.triggers;
  }
});

var _account = require("./account");

console.warn('models/accounts is deprecated in cozy-client, please use models/account instead');