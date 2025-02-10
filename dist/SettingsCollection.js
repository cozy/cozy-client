"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.normalizeSettings = exports.SETTINGS_DOCTYPE = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _DocumentCollection2 = _interopRequireDefault(require("./DocumentCollection"));

var _logger = _interopRequireDefault(require("./logger"));

var _utils = require("./utils");

var _normalize = require("./normalize");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["/data/", "/", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var SETTINGS_DOCTYPE = 'io.cozy.settings';
/**
 * Normalizing a document for SettingsCollection context
 *
 * @param {object} doc - Document to normalize
 * @returns {object} normalized document
 */

exports.SETTINGS_DOCTYPE = SETTINGS_DOCTYPE;
var normalizeSettings = (0, _normalize.normalizeDoctypeJsonApi)(SETTINGS_DOCTYPE);
/**
 * Implements `DocumentCollection` API to interact with the /settings endpoint of the stack
 */

exports.normalizeSettings = normalizeSettings;

var SettingsCollection = /*#__PURE__*/function (_DocumentCollection) {
  (0, _inherits2.default)(SettingsCollection, _DocumentCollection);

  var _super = _createSuper(SettingsCollection);

  function SettingsCollection(stackClient) {
    (0, _classCallCheck2.default)(this, SettingsCollection);
    return _super.call(this, SETTINGS_DOCTYPE, stackClient);
  }
  /**
   * async get - Calls a route on the /settings API
   *
   * @param  {string} id The setting id to call, eg `io.cozy.settings.instance` for `instance` route or `io.cozy.settings.context` for `context`route
   * @returns {object} The response from the route
   */


  (0, _createClass2.default)(SettingsCollection, [{
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(id) {
        var _resp, path, resp;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(id === 'io.cozy.settings.bitwarden')) {
                  _context.next = 5;
                  break;
                }

                _context.next = 3;
                return this.stackClient.fetchJSON('GET', '/data/io.cozy.settings/io.cozy.settings.bitwarden');

              case 3:
                _resp = _context.sent;
                return _context.abrupt("return", {
                  data: normalizeSettings(_resp)
                });

              case 5:
                if (id.startsWith('io.cozy.settings.')) {
                  path = id.substring(17);
                } else {
                  _logger.default.warn("Deprecated: in next versions of cozy-client, it will not be possible to query settings with an incomplete id\n\n- Q('io.cozy.settings').getById('instance')\n+ Q('io.cozy.settings').getById('io.cozy.settings.instance')");

                  path = id;
                }

                _context.next = 8;
                return this.stackClient.fetchJSON('GET', "/settings/".concat(path));

              case 8:
                resp = _context.sent;
                return _context.abrupt("return", {
                  data: normalizeSettings(_objectSpread({
                    id: "/settings/".concat(path)
                  }, resp.data))
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get(_x) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
    /**
     * Updates a settings document
     *
     * @param {object} document - Document to update. Do not forget the _id attribute
     */

  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(document) {
        var resp;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(document._id === 'io.cozy.settings.instance')) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 3;
                return this.stackClient.fetchJSON('PUT', '/settings/instance', {
                  data: document
                });

              case 3:
                resp = _context2.sent;
                _context2.next = 9;
                break;

              case 6:
                _context2.next = 8;
                return this.stackClient.fetchJSON('PUT', (0, _utils.uri)(_templateObject(), this.doctype, document._id), document);

              case 8:
                resp = _context2.sent;

              case 9:
                return _context2.abrupt("return", {
                  data: normalizeSettings(resp.data)
                });

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function update(_x2) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
    /**
     * Updates the current OAuth client's last synchronization date
     */

  }, {
    key: "updateLastSynced",
    value: function () {
      var _updateLastSynced = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.stackClient.fetchJSON('POST', '/settings/synchronized'));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function updateLastSynced() {
        return _updateLastSynced.apply(this, arguments);
      }

      return updateLastSynced;
    }()
  }]);
  return SettingsCollection;
}(_DocumentCollection2.default);

SettingsCollection.normalizeDoctype = _normalize.normalizeDoctypeJsonApi;
var _default = SettingsCollection;
exports.default = _default;