"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/**
 * Caches promises while they are pending
 * Serves to dedupe equal queries requested at the same time
 */
var PromiseCache = /*#__PURE__*/function () {
  function PromiseCache() {
    (0, _classCallCheck2.default)(this, PromiseCache);

    /**
     * Holds pending promises
     *
     * @type {Object.<string, Promise>}
     */
    this.pending = {};
  }
  /**
   * Tries to find a pending promise corresponding to the result of keyFunc
   * - If not found, promiseFunc is executed and the resulting promise is stored while it's pending
   * - If found, it is immediately returned
   *
   * @template T
   * @param  {function(): Promise<T>} promiseFunc - Not executed only if an "equal" promise is already pending.
   * @param  {function(): string} keyFunc - Returns a key to find in cache to find a pending promise.
   * @returns {Promise<T>}
   */


  (0, _createClass2.default)(PromiseCache, [{
    key: "exec",
    value: function () {
      var _exec = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(promiseFunc, keyFunc) {
        var key, already, prom, response;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                key = keyFunc();
                already = this.pending[key];

                if (already) {
                  prom = already;
                } else {
                  prom = promiseFunc();
                  this.pending[key] = prom;
                }

                _context.prev = 3;
                _context.next = 6;
                return prom;

              case 6:
                response = _context.sent;
                return _context.abrupt("return", response);

              case 8:
                _context.prev = 8;
                this.pending[key] = null;
                return _context.finish(8);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3,, 8, 11]]);
      }));

      function exec(_x, _x2) {
        return _exec.apply(this, arguments);
      }

      return exec;
    }()
    /**
     *
     * @param {function(): string} keyFunc - Returns a key to find in cache to find a pending promise.
     * @returns {Promise | null}
     */

  }, {
    key: "get",
    value: function get(keyFunc) {
      var key = keyFunc();
      var already = this.pending[key];
      if (already) return already;
      return null;
    }
  }]);
  return PromiseCache;
}();

var _default = PromiseCache;
exports.default = _default;