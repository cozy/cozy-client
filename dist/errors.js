"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulkEditError = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var _zipWith = _interopRequireDefault(require("lodash/zipWith"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var BulkEditError = /*#__PURE__*/function (_Error) {
  (0, _inherits2.default)(BulkEditError, _Error);

  var _super = _createSuper(BulkEditError);

  /**
   * Indicates that a bulk edit has (potentially partially) failed
   *
   * @param  {import("./types").CouchDBBulkResult[]} bulkResponse - CouchDB Bulk response
   * @param  {import("./types").CozyClientDocument[]} updatedDocs - Docs with updated _id and _rev
   */
  function BulkEditError(bulkResponse, updatedDocs) {
    var _this;

    (0, _classCallCheck2.default)(this, BulkEditError);
    _this = _super.call(this, 'Error while bulk saving');
    _this.name = 'BulkEditError';
    _this.results = (0, _zipWith.default)(bulkResponse, updatedDocs, function (result, doc) {
      return _objectSpread(_objectSpread({}, result), {}, {
        doc: doc
      });
    });
    return _this;
  }
  /**
   * Get documents that have been correctly updated
   *
   * @returns {import("./types").CozyClientDocument[]}
   */


  (0, _createClass2.default)(BulkEditError, [{
    key: "getUpdatedDocuments",
    value: function getUpdatedDocuments() {
      return this.results.filter(function (r) {
        return r.ok;
      }).map(function (r) {
        return r.doc;
      });
    }
    /**
     * Get bulk errors results
     *
     * @returns {Array<import("./types").CouchDBBulkResult & { doc: import("./types").CozyClientDocument }>}
     */

  }, {
    key: "getErrors",
    value: function getErrors() {
      return this.results.filter(function (r) {
        return !r.ok;
      });
    }
  }]);
  return BulkEditError;
}( /*#__PURE__*/(0, _wrapNativeSuper2.default)(Error));

exports.BulkEditError = BulkEditError;