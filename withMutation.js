"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * @typedef {Component} Wrapper
 * @returns {Function}
 */
var withMutation = function withMutation(mutation) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (WrappedComponent) {
    var wrappedDisplayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    var Wrapper = /*#__PURE__*/function (_Component) {
      (0, _inherits2.default)(Wrapper, _Component);

      var _super = _createSuper(Wrapper);

      function Wrapper(props, context) {
        var _this;

        (0, _classCallCheck2.default)(this, Wrapper);
        _this = _super.call(this, props, context);
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "mutate", function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _this.client.mutate(mutation.apply(null, args), options);
        });
        _this.client = props.client || context.client;

        if (!_this.client) {
          throw new Error("Could not find \"client\" in either the context or props of ".concat(wrappedDisplayName));
        }

        return _this;
      }

      (0, _createClass2.default)(Wrapper, [{
        key: "render",
        value: function render() {
          var mutationProps = (0, _defineProperty2.default)({}, options.name || 'mutate', this.mutate);
          return /*#__PURE__*/_react.default.createElement(WrappedComponent, (0, _extends2.default)({}, mutationProps, this.props));
        }
      }]);
      return Wrapper;
    }(_react.Component);

    (0, _defineProperty2.default)(Wrapper, "contextTypes", {
      client: _propTypes.default.object
    });
    Wrapper.displayName = "WithMutation(".concat(wrappedDisplayName, ")");
    return Wrapper;
  };
};

var _default = withMutation;
exports.default = _default;