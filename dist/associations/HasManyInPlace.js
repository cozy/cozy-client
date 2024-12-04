"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _dsl = require("../queries/dsl");

var _Association2 = _interopRequireDefault(require("./Association"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 *
 * Used when related documents are stored directly under the attribute with
 * only the ids.
 *
 * @property {Function} get
 *
 * @description
 *
 * An example document representing a TODO. See as the related
 * tasks are represented via ids.
 *
 * ```js
 * const todo = {
 *   label: "Protect people's privacy",
 *   tasks: [1, 2]
 * }
 * ```
 *
 * Here is the `Schema` that would represent this kind of document.
 * Components receiving todos via `Query`s would have an instance of `HasManyInPlace`
 * as their `tasks` attribute.
 *
 * ```js
 * const schema = {
 *   todos: {
 *      doctype: 'io.cozy.todos',
 *      relationships: {
 *        tasks: {
 *          doctype: 'io.cozy.tasks',
 *          type: 'has-many-in-place'
 *        }
 *      }
 *    }
 * }
 *
 * const todo = {
 *   label: "Get rich",
 *   tasks: [1, 2]
 * }
 * ```
 *
 */
var HasManyInPlace = /*#__PURE__*/function (_Association) {
  (0, _inherits2.default)(HasManyInPlace, _Association);

  var _super = _createSuper(HasManyInPlace);

  function HasManyInPlace() {
    (0, _classCallCheck2.default)(this, HasManyInPlace);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(HasManyInPlace, [{
    key: "addById",
    value: function addById(id) {
      var rel = this.getRelationship();
      rel.push(id);
    }
  }, {
    key: "removeById",
    value: function removeById(id) {
      var rel = this.getRelationship();
      var index = rel.indexOf(id);

      if (index !== -1) {
        rel.splice(index, 1);
      }
    }
  }, {
    key: "existsById",
    value: function existsById(id) {
      var rel = this.getRelationship();
      return rel.indexOf(id) !== -1;
    }
  }, {
    key: "getRelationship",
    value: function getRelationship() {
      this.target[this.name] = this.target[this.name] || [];
      return this.target[this.name];
    }
  }, {
    key: "dehydrate",
    value: function dehydrate(doc) {
      return _objectSpread(_objectSpread({}, doc), {}, (0, _defineProperty2.default)({}, this.name, this.raw || []));
    }
  }, {
    key: "raw",

    /**
     * Raw property
     *
     * @type {Array<string>}
     */
    get: function get() {
      return this.target[this.name];
    }
  }, {
    key: "data",
    get: function get() {
      var _this = this;

      var doctype = this.doctype;
      return (this.raw || []).map(function (_id) {
        return _this.get(doctype, _id);
      });
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
      var ids = document[assoc.name];

      if (ids && ids > 0) {
        return (0, _dsl.Q)(assoc.doctype).getByIds(ids);
      } else {
        return null;
      }
    }
  }]);
  return HasManyInPlace;
}(_Association2.default);

var _default = HasManyInPlace;
exports.default = _default;