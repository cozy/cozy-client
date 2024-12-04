"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAppAttestationFromStore = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _reactNativeIos11Devicecheck = _interopRequireDefault(require("react-native-ios11-devicecheck"));

//@ts-ignore next-line

/**
 * Retrieve the app's attestation from the Apple AppStore
 *
 * @param {string} nonce - the Nonce string retrieved from the stack
 * @param {import("./typedefs").CertificationConfig} certificationConfig - Configuration to access the stores certification API
 * @returns {Promise<import("./typedefs").AttestationResult>} the app's attestation
 */
var getAppAttestationFromStore = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(nonce, certificationConfig) {
    var keyId, attestKey;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _reactNativeIos11Devicecheck.default.generateKey();

          case 3:
            keyId = _context.sent;
            _context.next = 6;
            return _reactNativeIos11Devicecheck.default.attestKey(keyId, nonce);

          case 6:
            attestKey = _context.sent;
            return _context.abrupt("return", {
              platform: 'ios',
              attestation: attestKey,
              keyId: keyId
            });

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            throw new Error('[FLAGSHIP_CERTIFICATION] Something went wrong while requesting an attestation from Apple DeviceCheck:\n' + _context.t0.message);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function getAppAttestationFromStore(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getAppAttestationFromStore = getAppAttestationFromStore;