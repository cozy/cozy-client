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

var _get2 = _interopRequireDefault(require("lodash/get"));

var _set = _interopRequireDefault(require("lodash/set"));

var _dsl = require("../queries/dsl");

var _Association2 = _interopRequireDefault(require("./Association"));

var _logger = _interopRequireDefault(require("../logger"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var HasOne = /*#__PURE__*/function (_Association) {
  (0, _inherits2.default)(HasOne, _Association);

  var _super = _createSuper(HasOne);

  function HasOne() {
    (0, _classCallCheck2.default)(this, HasOne);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(HasOne, [{
    key: "add",

    /**
     * Add the relationship to the target document
     *
     * @param {import("../types").CozyClientDocument} doc - Document to add as a relationship
     * @returns {import("../types").CozyClientDocument} The saved target document
     */
    value: function add(doc) {
      this.setRelationship(doc);
      return this.save(this.target);
    }
    /**
     * Remove the relationship from the target document
     *
     * @returns {import("../types").CozyClientDocument} The saved target document
     */

  }, {
    key: "remove",
    value: function remove() {
      this.setRelationship(undefined);
      return this.save(this.target);
    }
  }, {
    key: "setRelationship",
    value: function setRelationship(doc) {
      if (doc && doc._type !== this.doctype) {
        throw new Error("Tried to associate a ".concat(doc._type, " document to a HasOne relationship on ").concat(this.doctype, " document"));
      }

      var path = "relationships[".concat(this.name, "].data");

      if (doc) {
        (0, _set.default)(this.target, path, {
          _id: doc._id,
          _type: doc._type
        });
      } else {
        (0, _set.default)(this.target, path, undefined);
      }
    }
  }, {
    key: "set",
    value: function set(doc) {
      _logger.default.warn('set is deprecated for has-one relationships. Use `add` instead.');

      this.setRelationship(doc);
    }
  }, {
    key: "unset",
    value: function unset() {
      _logger.default.warn('unset is deprecated for has-one relationships. Use `remove` instead.');

      this.setRelationship(undefined);
    }
  }, {
    key: "dehydrate",
    value: function dehydrate(doc) {
      if (!this.raw) {
        return doc;
      }

      return _objectSpread(_objectSpread({}, doc), {}, {
        relationships: _objectSpread(_objectSpread({}, doc.relationships), {}, (0, _defineProperty2.default)({}, this.name, {
          data: this.raw
        }))
      });
    }
  }, {
    key: "raw",
    get: function get() {
      return (0, _get2.default)(this.target, "relationships[".concat(this.name, "].data"), null);
    }
  }, {
    key: "data",
    get: function get() {
      if (!this.raw) {
        return null;
      }

      return this.get(this.doctype, this.raw._id);
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
      var relationship = (0, _get2.default)(document, "relationships.".concat(assoc.name, ".data"), {});

      if (!relationship || !relationship._id) {
        return null;
      }

      return (0, _dsl.Q)(assoc.doctype).getById(relationship._id);
    }
  }]);
  return HasOne;
}(_Association2.default);

exports.default = HasOne;