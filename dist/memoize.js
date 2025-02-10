"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorReturned = exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ErrorReturned = /*#__PURE__*/function (_String) {
  (0, _inherits2.default)(ErrorReturned, _String);

  var _super = _createSuper(ErrorReturned);

  function ErrorReturned() {
    (0, _classCallCheck2.default)(this, ErrorReturned);
    return _super.apply(this, arguments);
  }

  return ErrorReturned;
}( /*#__PURE__*/(0, _wrapNativeSuper2.default)(String));
/**
 * Delete outdated results from cache
 */


exports.ErrorReturned = ErrorReturned;

var garbageCollect = function garbageCollect(cache, maxDuration) {
  var now = Date.now();

  for (var _i = 0, _Object$keys = Object.keys(cache); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    var delta = now - cache[key].date;

    if (delta > maxDuration) {
      delete cache[key];
    }
  }
};

var isPromise = function isPromise(maybePromise) {
  return typeof maybePromise === 'object' && typeof maybePromise.then === 'function';
};
/**
 * Memoize with maxDuration and custom key
 */


var memoize = function memoize(fn, options) {
  var cache = {};
  return function () {
    var key = options.key.apply(null, arguments);
    garbageCollect(cache, options.maxDuration);
    var existing = cache[key];

    if (existing) {
      return existing.result;
    } else {
      var result = fn.apply(this, arguments);
      cache[key] = {
        result: result,
        date: Date.now()
      };
      /**
       * If the result is a promise and this promise
       * failed or resolved with a specific error (aka ErrorReturned),
       * let's remove the result from the cache since we don't want to
       * memoize error
       */

      if (isPromise(result)) {
        result.then(function (v) {
          if (v instanceof ErrorReturned) {
            delete cache[key];
          }
        }).catch(function (e) {
          delete cache[key];
        });
      }

      return result;
    }
  };
};

var _default = memoize;
exports.default = _default;