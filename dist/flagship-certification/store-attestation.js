"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAppAttestationFromStore = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/**
 * Retrieve the app's attestation from the app's store
 * /!\ This is a mock implementation that should never be called
 *
 * @param {string} nonce - the Nonce string retrieved from the stack
 * @param {import("./typedefs").CertificationConfig} certificationConfig - Configuration to access the stores certification API
 * @returns {Promise<import("./typedefs").AttestationResult>} the app's attestation
 */
var validateAppMock = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(nonce, certificationConfig) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            throw new Error("getAppAttestationFromStore can only be called from a React Native container");

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function validateAppMock(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getAppAttestationFromStore = validateAppMock;
exports.getAppAttestationFromStore = getAppAttestationFromStore;