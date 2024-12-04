"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _HasMany2 = _interopRequireDefault(require("./HasMany"));

var _dsl = require("../queries/dsl");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var TRIGGERS_DOCTYPE = 'io.cozy.triggers';
/**
 * Association used for konnectors to retrieve all their related triggers.
 *
 * @augments HasMany
 */

var HasManyTriggers = /*#__PURE__*/function (_HasMany) {
  (0, _inherits2.default)(HasManyTriggers, _HasMany);

  var _super = _createSuper(HasManyTriggers);

  function HasManyTriggers() {
    (0, _classCallCheck2.default)(this, HasManyTriggers);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(HasManyTriggers, [{
    key: "data",
    get: function get() {
      var _this = this;

      return (0, _get2.default)((0, _getPrototypeOf2.default)(HasManyTriggers.prototype), "data", this).filter(function (_ref) {
        var slug = _ref.slug;
        return slug === _this.target.slug;
      });
    }
    /**
     * In this association the query is special, we need to fetch all the triggers
     * having for the 'konnector' worker, and then filter them based on their
     * `message.konnector` attribute
     */

  }], [{
    key: "query",
    value: function query(doc, client) {
      return (0, _dsl.Q)(TRIGGERS_DOCTYPE).where({
        worker: 'konnector'
      });
    }
  }]);
  return HasManyTriggers;
}(_HasMany2.default);

var _default = HasManyTriggers;
exports.default = _default;