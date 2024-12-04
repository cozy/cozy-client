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

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _merge = _interopRequireDefault(require("lodash/merge"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _logger = _interopRequireDefault(require("./logger"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var makeMutationsObject = function makeMutationsObject(mutations, client, props) {
  return _merge.default.apply(void 0, (0, _toConsumableArray2.default)(mutations.map(function (mutations) {
    return typeof mutations === 'function' ? mutations(client, props) : mutations;
  })));
};
/**
 * @function
 * @description HOC to provide mutations to components. Needs client in context or as prop.
 * @deprecated Prefer to use withClient and access directly the client.
 * @param  {Array<Function>} mutations One ore more mutations, which are function
 * taking CozyClient as parameter and returning an object containing one or
 * more mutations as attributes.
 * @returns {Function} - Component that will receive mutations as props
 */


var withMutations = function withMutations() {
  for (var _len = arguments.length, mutations = new Array(_len), _key = 0; _key < _len; _key++) {
    mutations[_key] = arguments[_key];
  }

  return function (WrappedComponent) {
    var wrappedDisplayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    var Wrapper = /*#__PURE__*/function (_Component) {
      (0, _inherits2.default)(Wrapper, _Component);

      var _super = _createSuper(Wrapper);

      function Wrapper(props, context) {
        var _this;

        (0, _classCallCheck2.default)(this, Wrapper);
        _this = _super.call(this, props, context);
        var client = props.client || context.client;

        _logger.default.warn("Deprecation: withMutations will be removed in the near future, prefer to use withClient to access the client. See https://github.com/cozy/cozy-client/pull/638 for more information.");

        if (!client) {
          throw new Error("Could not find \"client\" in either the context or props of ".concat(wrappedDisplayName));
        }

        _this.mutations = _objectSpread({
          createDocument: client.create.bind(client),
          saveDocument: client.save.bind(client),
          deleteDocument: client.destroy.bind(client)
        }, makeMutationsObject(mutations, client, props));
        return _this;
      }

      (0, _createClass2.default)(Wrapper, [{
        key: "render",
        value: function render() {
          return /*#__PURE__*/_react.default.createElement(WrappedComponent, (0, _extends2.default)({}, this.mutations, this.props));
        }
      }]);
      return Wrapper;
    }(_react.Component);

    (0, _defineProperty2.default)(Wrapper, "contextTypes", {
      client: _propTypes.default.object
    });
    Wrapper.displayName = "WithMutations(".concat(wrappedDisplayName, ")");
    return Wrapper;
  };
};

var _default = withMutations;
exports.default = _default;