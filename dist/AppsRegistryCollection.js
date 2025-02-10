"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.normalizeAppFromRegistry = exports.APPS_REGISTRY_DOCTYPE = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _DocumentCollection2 = _interopRequireDefault(require("./DocumentCollection"));

var _normalize = require("./normalize");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var APPS_REGISTRY_DOCTYPE = 'io.cozy.apps_registry';
exports.APPS_REGISTRY_DOCTYPE = APPS_REGISTRY_DOCTYPE;

var normalizeAppFromRegistry = function normalizeAppFromRegistry(data, doctype) {
  var _data$latest_version;

  // The registry don't return a id, so we use the slug as id.
  // Without id the document can't be stored in the cache.
  var id = "".concat(data.type === 'webapp' ? 'io.cozy.apps' : 'io.cozy.konnectors', "/").concat(data.slug);

  var attributes = _objectSpread(_objectSpread({}, data.attributes), (_data$latest_version = data.latest_version) === null || _data$latest_version === void 0 ? void 0 : _data$latest_version.manifest);

  return _objectSpread({}, (0, _normalize.normalizeDoc)(_objectSpread(_objectSpread({}, data), {}, {
    attributes: attributes,
    id: id,
    _id: id
  }), doctype));
};

exports.normalizeAppFromRegistry = normalizeAppFromRegistry;

var fetchKonnectorsByChannel = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(channel, doctype, stackClient) {
    var resp;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return stackClient.fetchJSON('GET', "/registry?versionsChannel=".concat(channel, "&filter[type]=konnector&limit=500"));

          case 2:
            resp = _context.sent;
            return _context.abrupt("return", {
              data: resp.data.map(function (data) {
                return normalizeAppFromRegistry(data, doctype);
              })
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchKonnectorsByChannel(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Extends `DocumentCollection` API along with specific methods for `io.cozy.apps_registry`.
 */


var AppsRegistryCollection = /*#__PURE__*/function (_DocumentCollection) {
  (0, _inherits2.default)(AppsRegistryCollection, _DocumentCollection);

  var _super = _createSuper(AppsRegistryCollection);

  function AppsRegistryCollection(stackClient) {
    var _this;

    (0, _classCallCheck2.default)(this, AppsRegistryCollection);
    _this = _super.call(this, APPS_REGISTRY_DOCTYPE, stackClient);
    _this.endpoint = '/registry/';
    return _this;
  }
  /**
   * Fetches an app from the registry.
   *
   * @param  {string} slug - Slug of the app
   * @returns {Promise<{data: object}>} JsonAPI response containing normalized document as data attribute
   * @throws {FetchError}
   */


  (0, _createClass2.default)(AppsRegistryCollection, [{
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(slug) {
        var _this2 = this;

        var channel, resp;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!slug.startsWith('konnectors/')) {
                  _context2.next = 3;
                  break;
                }

                channel = slug.split('/')[1];
                return _context2.abrupt("return", fetchKonnectorsByChannel(channel, this.doctype, this.stackClient));

              case 3:
                _context2.next = 5;
                return this.stackClient.fetchJSON('GET', "".concat(this.endpoint).concat(slug));

              case 5:
                resp = _context2.sent;

                if (!(slug === 'maintenance')) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", {
                  data: resp.map(function (data) {
                    return normalizeAppFromRegistry(data, _this2.doctype);
                  })
                });

              case 8:
                return _context2.abrupt("return", {
                  data: normalizeAppFromRegistry(resp, this.doctype)
                });

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function get(_x4) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                throw new Error('create() method is not available for AppsRegistryCollection');

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function create() {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "destroy",
    value: function () {
      var _destroy = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                throw new Error('destroy() method is not available for AppsRegistryCollection');

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function destroy() {
        return _destroy.apply(this, arguments);
      }

      return destroy;
    }()
  }]);
  return AppsRegistryCollection;
}(_DocumentCollection2.default);

var _default = AppsRegistryCollection;
exports.default = _default;