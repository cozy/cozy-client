"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _context = _interopRequireDefault(require("./context"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var storePropType = _propTypes.default.shape({
  subscribe: _propTypes.default.func.isRequired,
  dispatch: _propTypes.default.func.isRequired,
  getState: _propTypes.default.func.isRequired
});

var CozyProvider = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(CozyProvider, _Component);

  var _super = _createSuper(CozyProvider);

  function CozyProvider(props, context) {
    var _this;

    (0, _classCallCheck2.default)(this, CozyProvider);
    _this = _super.call(this, props, context);

    if (!props.client) {
      throw new Error('CozyProvider was not passed a client instance.');
    }

    if (props.store) {
      props.client.setStore(props.store);
    }

    return _this;
  }

  (0, _createClass2.default)(CozyProvider, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        store: this.props.store || this.context.store || this.props.client.store,
        client: this.props.client
      };
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement(_context.default.Provider, {
        value: this.getChildContext()
      }, this.props.children);
    }
  }]);
  return CozyProvider;
}(_react.Component);

exports.default = CozyProvider;
(0, _defineProperty2.default)(CozyProvider, "propTypes", {
  store: storePropType,
  client: _propTypes.default.object.isRequired,
  children: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.arrayOf(_propTypes.default.element)]).isRequired
});
(0, _defineProperty2.default)(CozyProvider, "childContextTypes", {
  store: _propTypes.default.object,
  client: _propTypes.default.object.isRequired
});
(0, _defineProperty2.default)(CozyProvider, "contextTypes", {
  store: _propTypes.default.object
});