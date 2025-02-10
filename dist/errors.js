"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FetchError = exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var EXPIRED_TOKEN = /Expired token/;
var CLIENT_NOT_FOUND = /Client not found/;
var INVALID_TOKEN = /Invalid JWT token/;
var INVALID_TOKEN_ALT = /Invalid token/;
var UNREGISTERED_CLIENT = /the client must be registered/;
var _default = {
  EXPIRED_TOKEN: EXPIRED_TOKEN,
  CLIENT_NOT_FOUND: CLIENT_NOT_FOUND,
  INVALID_TOKEN: INVALID_TOKEN,
  INVALID_TOKEN_ALT: INVALID_TOKEN_ALT,
  UNREGISTERED_CLIENT: UNREGISTERED_CLIENT
};
exports.default = _default;
var invalidTokenRegex = /invalid_token/;
var expiredTokenRegex = /access_token_expired/;

var getWwwAuthenticateErrorMessage = function getWwwAuthenticateErrorMessage(response) {
  var _response$headers;

  var wwwAuthenticateHeader = (_response$headers = response.headers) === null || _response$headers === void 0 ? void 0 : _response$headers.get('www-authenticate');
  if (!wwwAuthenticateHeader) return undefined;
  if (expiredTokenRegex.test(wwwAuthenticateHeader)) return 'Expired token';
  if (invalidTokenRegex.test(wwwAuthenticateHeader)) return 'Invalid token';
};

var getReasonMessage = function getReasonMessage(reason, wwwAuthenticateErrorMessage) {
  // As for now we only want to use `reason.error` over `reason.message` if it's an unregistered client error
  // For other scenarios, we want to still use `reason.message` over `JSON.stringify(reason)` for better backward compatibility
  var isUnregisteredError = typeof reason.error === 'string' && UNREGISTERED_CLIENT.test(reason.error) ? reason.error : undefined;
  return isUnregisteredError || reason.message || wwwAuthenticateErrorMessage || (typeof reason === 'string' ? reason : JSON.stringify(reason));
};

var FetchError = /*#__PURE__*/function (_Error) {
  (0, _inherits2.default)(FetchError, _Error);

  var _super = _createSuper(FetchError);

  function FetchError(response, reason) {
    var _Error$captureStackTr;

    var _this;

    (0, _classCallCheck2.default)(this, FetchError);
    _this = _super.call(this);
    (_Error$captureStackTr = Error.captureStackTrace) === null || _Error$captureStackTr === void 0 ? void 0 : _Error$captureStackTr.call(Error, (0, _assertThisInitialized2.default)(_this), _this.constructor); // WARN We have to hardcode this because babel doesn't play nice when extending Error

    _this.name = 'FetchError';
    _this.response = response;
    _this.url = response.url;
    _this.status = response.status;
    _this.reason = reason;

    if (reason === null) {
      throw new Error("FetchError received a ".concat(response.status, " error without a Response Body when calling ").concat(response.url));
    }

    var wwwAuthenticateErrorMessage = getWwwAuthenticateErrorMessage(response);
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), 'message', {
      value: getReasonMessage(reason, wwwAuthenticateErrorMessage)
    });
    return _this;
  }

  return FetchError;
}( /*#__PURE__*/(0, _wrapNativeSuper2.default)(Error));

exports.FetchError = FetchError;