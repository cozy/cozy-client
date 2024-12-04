"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.certifyFlagship = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _CozyClient = _interopRequireDefault(require("../CozyClient"));

var _storeAttestation = require("./store-attestation");

/**
 * Request a challenge from the Stack that can be used to request the app attestation from the app store
 *
 * @param {CozyClient} client - the CozyClient instance
 * @returns {Promise<string>} - the Nonce string returned by the stack
 */
var getStackChallenge = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(client) {
    var stackClient, result;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            stackClient = client.getStackClient();
            _context.next = 4;
            return stackClient.fetchJSON('POST', "/auth/clients/".concat(stackClient.oauthOptions.clientID, "/challenge"), null, {
              headers: {
                Authorization: stackClient.registrationAccessTokenToAuthHeader()
              }
            });

          case 4:
            result = _context.sent;
            return _context.abrupt("return", result.nonce);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            throw new Error('[FLAGSHIP_CERTIFICATION] Something went wrong while requesting a challenge from CozyStack:\n' + _context.t0.message);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function getStackChallenge(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Give the app attestation to the Stack
 *
 * @param {import("./typedefs").AttestationResult} appAttestation - the app attestation that was returned by the app store
 * @param {string} nonce - the Nonce string retrieved from the stack
 * @param {CozyClient} client - the CozyClient instance
 */


var giveAppAttestationToStack = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(appAttestation, nonce, client) {
    var platform, attestation, keyId, issuer, stackClient;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            platform = appAttestation.platform, attestation = appAttestation.attestation, keyId = appAttestation.keyId, issuer = appAttestation.issuer;
            stackClient = client.getStackClient();
            _context2.next = 5;
            return stackClient.fetchJSON('POST', "/auth/clients/".concat(stackClient.oauthOptions.clientID, "/attestation"), {
              platform: platform,
              attestation: attestation,
              challenge: nonce,
              keyId: keyId,
              issuer: issuer
            }, {
              headers: {
                Authorization: stackClient.registrationAccessTokenToAuthHeader()
              }
            });

          case 5:
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            throw new Error('[FLAGSHIP_CERTIFICATION] Something went wrong while giving attestation to CozyStack:\n' + _context2.t0.message);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function giveAppAttestationToStack(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Verify app's identity and integrity so the Stack can trust it
 * Verification is done on Stack side by using information from the app's store (Google Play or Apple AppStore)
 *
 * @param {import("./typedefs").CertificationConfig} certificationConfig - the required configuration to access the stores API
 * @param {CozyClient} client - the CozyClient instance
 */


var certifyFlagship = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(certificationConfig, client) {
    var stackChallengeNonce, appAttestation;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (certificationConfig) {
              _context3.next = 2;
              break;
            }

            throw new Error('[FLAGSHIP_CERTIFICATION] Certification configuration is not set');

          case 2:
            _context3.prev = 2;
            _context3.next = 5;
            return getStackChallenge(client);

          case 5:
            stackChallengeNonce = _context3.sent;
            _context3.next = 8;
            return (0, _storeAttestation.getAppAttestationFromStore)(stackChallengeNonce, certificationConfig);

          case 8:
            appAttestation = _context3.sent;
            _context3.next = 11;
            return giveAppAttestationToStack(appAttestation, stackChallengeNonce, client);

          case 11:
            _context3.next = 17;
            break;

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](2);
            console.warn("[FLAGSHIP_CERTIFICATION] Automatic certification for URI \"".concat(client.stackClient.uri, "\" failed. This is expected on dev environments and non-official phones. Cozy-stack will continue with manual certification through 2FA"));
            console.warn(_context3.t0.message);

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 13]]);
  }));

  return function certifyFlagship(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.certifyFlagship = certifyFlagship;