"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupConsoleToThrow = exports.withIgnoreConsoleError = exports.withIgnoreConsoleWarn = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/**
 * Calls callback while ignoring console[type] calls
 *
 * Useful for tests that we know will use console[type] but we do not
 * want to them to trigger an exception during tests.
 */
var withIgnoreConsole = function withIgnoreConsole(type) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(callback) {
      var original, res;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              original = console[type];

              console[type] = function () {};

              _context.prev = 2;
              res = callback();

              if (!res.then) {
                _context.next = 7;
                break;
              }

              _context.next = 7;
              return res;

            case 7:
              _context.prev = 7;
              console[type] = original;
              return _context.finish(7);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2,, 7, 10]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

var withIgnoreConsoleWarn = withIgnoreConsole('warn');
exports.withIgnoreConsoleWarn = withIgnoreConsoleWarn;
var withIgnoreConsoleError = withIgnoreConsole('error');
/**
 * Override console.warn and error to throw
 */

exports.withIgnoreConsoleError = withIgnoreConsoleError;

var setupConsoleToThrow = function setupConsoleToThrow() {
  var originalWarn = console.warn;

  console.warn = function () {
    originalWarn.apply(this, arguments);
    throw new Error('console.warn should not be called during tests');
  };

  var originalError = console.error;

  console.error = function () {
    originalError.apply(this, arguments);
    throw new Error('console.error should not be called during tests');
  };
};

exports.setupConsoleToThrow = setupConsoleToThrow;