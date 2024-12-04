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

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _CozyLink2 = _interopRequireDefault(require("./CozyLink"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var WebFlagshipLink = /*#__PURE__*/function (_CozyLink) {
  (0, _inherits2.default)(WebFlagshipLink, _CozyLink);

  var _super = _createSuper(WebFlagshipLink);

  /**
   * @param {object} [options] - Options
   * @param  {import('cozy-intent').WebviewService} [options.webviewIntent] - The webview's intent reference
   */
  function WebFlagshipLink() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        webviewIntent = _ref.webviewIntent;

    (0, _classCallCheck2.default)(this, WebFlagshipLink);
    _this = _super.call(this);
    _this.webviewIntent = webviewIntent;
    return _this;
  }

  (0, _createClass2.default)(WebFlagshipLink, [{
    key: "registerClient",
    value: function registerClient(client) {// does nothing, we don't need any client for this kind of link
    }
  }, {
    key: "reset",
    value: function () {
      var _reset = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function reset() {
        return _reset.apply(this, arguments);
      }

      return reset;
    }()
  }, {
    key: "request",
    value: function () {
      var _request = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(operation, result, forward) {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.webviewIntent.call('flagshipLinkRequest', operation));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function request(_x, _x2, _x3) {
        return _request.apply(this, arguments);
      }

      return request;
    }()
  }, {
    key: "persistCozyData",
    value: function () {
      var _persistCozyData = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(data, forward) {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return");

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function persistCozyData(_x4, _x5) {
        return _persistCozyData.apply(this, arguments);
      }

      return persistCozyData;
    }()
  }]);
  return WebFlagshipLink;
}(_CozyLink2.default);

exports.default = WebFlagshipLink;