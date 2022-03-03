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

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _store = require("./store");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var connect = function connect(query) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  console.warn("cozy-client's `connect` is deprecated. Please use `queryConnect` instead. For more informations about it, please see https://github.com/cozy/cozy-client/blob/master/docs/how-tos.md#how-to-connect-to-the-documents-store-declaratively-");
  return function (WrappedComponent) {
    var wrappedDisplayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    var mapStateToProps = function mapStateToProps(state, ownProps) {
      return _objectSpread({}, (0, _store.getQueryFromState)(state, ownProps.queryId));
    };

    var ConnectedWrappedComponent = (0, _reactRedux.connect)(mapStateToProps)(WrappedComponent);

    var Wrapper = /*#__PURE__*/function (_Component) {
      (0, _inherits2.default)(Wrapper, _Component);

      var _super = _createSuper(Wrapper);

      function Wrapper(props, context) {
        var _this;

        (0, _classCallCheck2.default)(this, Wrapper);
        _this = _super.call(this, props, context);
        _this.client = props.client || context.client;

        if (!_this.client) {
          throw new Error("Could not find \"client\" in either the context or props of ".concat(wrappedDisplayName));
        }

        _this.queryId = options.as || _this.client.generateId();
        _this.queryDef = typeof query === 'function' ? query(_this.client, props) : query;
        return _this;
      }

      (0, _createClass2.default)(Wrapper, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.client.query(this.queryDef, {
            as: this.queryId
          });
        }
      }, {
        key: "render",
        value: function render() {
          return /*#__PURE__*/_react.default.createElement(ConnectedWrappedComponent, (0, _extends2.default)({
            queryId: this.queryId
          }, this.props));
        }
      }]);
      return Wrapper;
    }(_react.Component);

    (0, _defineProperty2.default)(Wrapper, "contextTypes", {
      client: _propTypes.default.object
    });
    Wrapper.displayName = "CozyConnect(".concat(wrappedDisplayName, ")");
    return Wrapper;
  };
};

var _default = connect;
exports.default = _default;