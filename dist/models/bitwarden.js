"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasExtensionInstalledAttribute = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dsl = require("../queries/dsl");

/**
 * Checks the value of the extension_installed attribute
 *
 * @param {import("../CozyClient").default} client - The CozyClient instance
 * @returns {Promise<boolean>} - Returns the value of the extension_installed attribute
 */
var hasExtensionInstalledAttribute = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(client) {
    var _yield$client$fetchQu, extension_installed;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return client.fetchQueryAndGetFromState({
              definition: (0, _dsl.Q)('io.cozy.settings').getById('io.cozy.settings.bitwarden'),
              options: {
                as: 'io.cozy.settings/io.cozy.settings.bitwarden',
                singleDocData: true
              }
            });

          case 3:
            _yield$client$fetchQu = _context.sent;
            extension_installed = _yield$client$fetchQu.data.extension_installed;
            return _context.abrupt("return", Boolean(extension_installed));

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", false);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function hasExtensionInstalledAttribute(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.hasExtensionInstalledAttribute = hasExtensionInstalledAttribute;