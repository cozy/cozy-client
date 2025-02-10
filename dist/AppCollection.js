"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.normalizeApp = exports.APPS_DOCTYPE = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _get3 = _interopRequireDefault(require("lodash/get"));

var _registry = require("cozy-client/dist/registry");

var _Collection = _interopRequireDefault(require("./Collection"));

var _DocumentCollection2 = _interopRequireDefault(require("./DocumentCollection"));

var _normalize = require("./normalize");

var _errors = require("./errors");

var _logger = _interopRequireDefault(require("./logger"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var APPS_DOCTYPE = 'io.cozy.apps';
exports.APPS_DOCTYPE = APPS_DOCTYPE;

var normalizeApp = function normalizeApp(app, doctype) {
  var normalizedApp = (0, _normalize.normalizeDoctypeJsonApi)(doctype)(app);
  return _objectSpread(_objectSpread({}, normalizedApp), {}, {
    id: app.id // ignores any 'id' attribute in the manifest

  });
};
/**
 * Extends `DocumentCollection` API along with specific methods for `io.cozy.apps`.
 */


exports.normalizeApp = normalizeApp;

var AppCollection = /*#__PURE__*/function (_DocumentCollection) {
  (0, _inherits2.default)(AppCollection, _DocumentCollection);

  var _super = _createSuper(AppCollection);

  function AppCollection(stackClient) {
    var _this;

    (0, _classCallCheck2.default)(this, AppCollection);
    _this = _super.call(this, APPS_DOCTYPE, stackClient);
    _this.endpoint = '/apps/';
    return _this;
  }

  (0, _createClass2.default)(AppCollection, [{
    key: "get",
    value: function () {
      var _get2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(idArg, query) {
        var _this2 = this;

        var id, sources, dataFetchers, _iterator, _step, source, res, data;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (idArg.indexOf('/') > -1) {
                  id = idArg.split('/')[1];
                } else {
                  _logger.default.warn("Deprecated: in next versions of cozy-client, it will not be possible to query apps/konnectors only with id, please use the form ".concat(this.doctype, "/").concat(idArg, "\n\n- Q('io.cozy.apps').getById('banks')\n+ Q('io.cozy.apps').getById('io.cozy.apps/banks')"));

                  id = idArg;
                }

                if (!(query && query.sources && (!Array.isArray(query.sources) || query.sources.length === 0))) {
                  _context.next = 3;
                  break;
                }

                throw new Error('Invalid "sources" attribute passed in query, please use an array with at least one element.');

              case 3:
                sources = (0, _get3.default)(query, 'sources', ['stack']);
                dataFetchers = {
                  stack: function stack() {
                    return _Collection.default.get(_this2.stackClient, "".concat(_this2.endpoint).concat(encodeURIComponent(id)), {
                      normalize: function normalize(data) {
                        return normalizeApp(data, _this2.doctype);
                      }
                    });
                  },
                  registry: function registry() {
                    return _this2.stackClient.fetchJSON('GET', _registry.registryEndpoint + id);
                  }
                };
                _iterator = _createForOfIteratorHelper(sources);
                _context.prev = 6;

                _iterator.s();

              case 8:
                if ((_step = _iterator.n()).done) {
                  _context.next = 27;
                  break;
                }

                source = _step.value;
                _context.prev = 10;
                _context.next = 13;
                return dataFetchers[source]();

              case 13:
                res = _context.sent;

                if (!(source !== 'registry')) {
                  _context.next = 16;
                  break;
                }

                return _context.abrupt("return", res);

              case 16:
                _logger.default.warn("The use of source registry is deprecated since it can polute the io.cozy.apps slice. For exemple, if we request data from the registry, than the app will be present in the io.cozy.apps slice and then the isInstalled() will return true.\n\n            Use Q('io.cozy.apps_registry) instead");

                data = (0, _registry.transformRegistryFormatToStackFormat)(res);
                return _context.abrupt("return", {
                  data: normalizeApp(data, this.doctype)
                });

              case 21:
                _context.prev = 21;
                _context.t0 = _context["catch"](10);

                if (!(source === sources[sources.length - 1])) {
                  _context.next = 25;
                  break;
                }

                throw _context.t0;

              case 25:
                _context.next = 8;
                break;

              case 27:
                _context.next = 32;
                break;

              case 29:
                _context.prev = 29;
                _context.t1 = _context["catch"](6);

                _iterator.e(_context.t1);

              case 32:
                _context.prev = 32;

                _iterator.f();

                return _context.finish(32);

              case 35:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[6, 29, 32, 35], [10, 21]]);
      }));

      function get(_x, _x2) {
        return _get2.apply(this, arguments);
      }

      return get;
    }()
    /**
     * Lists all apps, without filters.
     *
     * The returned documents are not paginated by the stack.
     *
     * @returns {{data, meta, skip, next}} The JSON API conformant response.
     * @throws {FetchError}
     */

  }, {
    key: "all",
    value: function () {
      var _all = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var _this3 = this;

        var resp;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.stackClient.fetchJSON('GET', this.endpoint);

              case 2:
                resp = _context2.sent;
                return _context2.abrupt("return", {
                  data: resp.data.map(function (app) {
                    return normalizeApp(app, _this3.doctype);
                  }),
                  meta: {
                    count: resp.meta.count
                  },
                  skip: 0,
                  next: false
                });

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function all() {
        return _all.apply(this, arguments);
      }

      return all;
    }()
  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                throw new Error('create() method is not available for applications');

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
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                throw new Error('update() method is not available for applications');

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function update() {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "destroy",
    value: function () {
      var _destroy = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                throw new Error('destroy() method is not available for applications');

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function destroy() {
        return _destroy.apply(this, arguments);
      }

      return destroy;
    }()
  }]);
  return AppCollection;
}(_DocumentCollection2.default);

AppCollection.normalizeDoctype = _normalize.normalizeDoctypeJsonApi;
var _default = AppCollection;
exports.default = _default;