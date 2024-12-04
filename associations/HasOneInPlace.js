"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BelongsToInPlace = exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _Association2 = _interopRequireDefault(require("./Association"));

var _dsl = require("../queries/dsl");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Here the id of the document is directly set in the attribute
 * of the document, not in the relationships attribute
 */
var HasOneInPlace = /*#__PURE__*/function (_Association) {
  (0, _inherits2.default)(HasOneInPlace, _Association);

  var _super = _createSuper(HasOneInPlace);

  function HasOneInPlace() {
    (0, _classCallCheck2.default)(this, HasOneInPlace);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(HasOneInPlace, [{
    key: "dehydrate",
    value: function dehydrate(doc) {
      return _objectSpread(_objectSpread({}, doc), {}, (0, _defineProperty2.default)({}, this.name, this.raw || undefined));
    }
  }, {
    key: "raw",
    get: function get() {
      return this.target[this.name];
    }
  }, {
    key: "data",
    get: function get() {
      return this.get(this.doctype, this.raw);
    }
    /**
     * @param {import("../types").CozyClientDocument} document - Document to query
     * @param {object} client - The CozyClient instance
     * @param {Association} assoc - The query params
     *
     * @returns {import("../types").CozyClientDocument | QueryDefinition}
     */

  }], [{
    key: "query",
    value: function query(document, client, assoc) {
      var id = document[assoc.name];
      return client.getDocumentFromState(assoc.doctype, id) || (0, _dsl.Q)(assoc.doctype).getById(id);
    }
  }]);
  return HasOneInPlace;
}(_Association2.default);

exports.default = HasOneInPlace;
var BelongsToInPlace = HasOneInPlace;
exports.BelongsToInPlace = BelongsToInPlace;