"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCozyURL = getCozyURL;
exports.isSecureProtocol = isSecureProtocol;
exports.getBrowserCozyURL = getBrowserCozyURL;
exports.getNodeCozyURL = getNodeCozyURL;

var _detectNode = _interopRequireDefault(require("detect-node"));

/* global URL */
var SECURED_PROTOCOL = 'https:';
/**
 * Get a uniform formatted URL and SSL information according to a provided URL
 */

function getCozyURL() {
  return _detectNode.default ? getNodeCozyURL() : getBrowserCozyURL();
}

function isSecureProtocol(urlArg) {
  var url = urlArg;
  if (url === undefined) url = getCozyURL();
  return url.protocol === SECURED_PROTOCOL;
}

function getBrowserCozyURL() {
  try {
    var root = document.querySelector('[role=application]');
    var data = root.dataset;
    return new URL("".concat(window.location.protocol, "//").concat(data.cozyDomain));
  } catch (e) {
    throw new Error("[cozy-url] cozyDomain isn't defined in index.ejs https://git.io/fhmP9, (".concat(e.message, ")"));
  }
}

function getNodeCozyURL() {
  var _require = require('url'),
      URL = _require.URL;

  try {
    return new URL(process.env.COZY_URL);
  } catch (e) {
    throw new Error("[cozy-url] COZY_URL variable isn't defined, (".concat(e.message, ")."));
  }
}