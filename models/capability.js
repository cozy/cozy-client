"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMagicLink = exports.isOIDC = void 0;

/**
 * Checks if the instance can auth with OIDC
 *
 * @param {import("../CozyClient").default} client - The CozyClient instance
 * @returns {boolean} - Returns true if the instance can auth with OIDC
 */
var isOIDC = function isOIDC(client) {
  var _client$capabilities$;

  return (_client$capabilities$ = client.capabilities.can_auth_with_oidc) !== null && _client$capabilities$ !== void 0 ? _client$capabilities$ : false;
};
/**
 * Checks if the instance can auth with magic link
 *
 * @param {import("../CozyClient").default} client - The CozyClient instance
 * @returns {boolean} - Returns true if the instance can auth with magic link
 */


exports.isOIDC = isOIDC;

var isMagicLink = function isMagicLink(client) {
  var _client$capabilities$2;

  return (_client$capabilities$2 = client.capabilities.can_auth_with_magic_links) !== null && _client$capabilities$2 !== void 0 ? _client$capabilities$2 : false;
};

exports.isMagicLink = isMagicLink;