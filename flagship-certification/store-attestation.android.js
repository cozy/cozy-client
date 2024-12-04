"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAppAttestationFromStore = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _reactNativeGooglePlayIntegrity = _interopRequireDefault(require("react-native-google-play-integrity"));

//@ts-ignore next-line - this is a react-native module that is not installed in the monorepo, only in the consumer app

/**
 * Retrieve the app's attestation from the Google Play store
 *
 * @param {string} nonce - the Nonce string retrieved from the stack
 * @param {import("./typedefs").CertificationConfig} certificationConfig - Configuration to access the stores certification API
 * @returns {Promise<import("./typedefs").AttestationResult>} the app's attestation
 */
var getAppAttestationFromStore = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(nonce, certificationConfig) {
    var integrityToken;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _reactNativeGooglePlayIntegrity.default.requestIntegrityToken(nonce, certificationConfig.cloudProjectNumber);

          case 3:
            integrityToken = _context.sent;
            return _context.abrupt("return", {
              platform: 'android',
              attestation: integrityToken,
              issuer: 'playintegrity'
            });

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            throw new Error('[FLAGSHIP_CERTIFICATION] Something went wrong while requesting an attestation from Google Play Integrity API:\n' + _context.t0.message);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function getAppAttestationFromStore(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getAppAttestationFromStore = getAppAttestationFromStore;