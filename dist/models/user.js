"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasPassword = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _instance = require("./instance");

var _bitwarden = require("./bitwarden");

var _capability = require("./capability");

/**
 * Checks whether the user has a password
 *
 * @param {import("../CozyClient").default} client - The CozyClient instance
 * @returns {Promise<boolean>} - Returns true if the user has a password
 */
var hasPassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(client) {
    var hasExtensionInstalled, hasPasswordDefined;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _bitwarden.hasExtensionInstalledAttribute)(client);

          case 2:
            hasExtensionInstalled = _context.sent;
            _context.next = 5;
            return (0, _instance.hasPasswordDefinedAttribute)(client);

          case 5:
            hasPasswordDefined = _context.sent;
            return _context.abrupt("return", !((0, _capability.isMagicLink)(client) || (0, _capability.isOIDC)(client)) || hasExtensionInstalled || hasPasswordDefined);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function hasPassword(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.hasPassword = hasPassword;