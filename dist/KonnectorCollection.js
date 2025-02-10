"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.KONNECTORS_DOCTYPE = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _pick = _interopRequireDefault(require("lodash/pick"));

var _AppCollection2 = _interopRequireDefault(require("./AppCollection"));

var _TriggerCollection = _interopRequireWildcard(require("./TriggerCollection"));

var _normalize = require("./normalize");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var KONNECTORS_DOCTYPE = 'io.cozy.konnectors';
exports.KONNECTORS_DOCTYPE = KONNECTORS_DOCTYPE;

var KonnectorCollection = /*#__PURE__*/function (_AppCollection) {
  (0, _inherits2.default)(KonnectorCollection, _AppCollection);

  var _super = _createSuper(KonnectorCollection);

  function KonnectorCollection(stackClient) {
    var _this;

    (0, _classCallCheck2.default)(this, KonnectorCollection);
    _this = _super.call(this, stackClient);
    _this.doctype = KONNECTORS_DOCTYPE;
    _this.endpoint = '/konnectors/';
    return _this;
  }

  (0, _createClass2.default)(KonnectorCollection, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                throw new Error('create() method is not available for konnectors');

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function create() {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "destroy",
    value: function () {
      var _destroy = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                throw new Error('destroy() method is not available for konnectors');

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function destroy() {
        return _destroy.apply(this, arguments);
      }

      return destroy;
    }()
    /**
     * Find triggers for a particular konnector
     *
     * @param  {string} slug of the konnector
     */

  }, {
    key: "findTriggersBySlug",
    value: function () {
      var _findTriggersBySlug = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(slug) {
        var triggerCol, _yield$triggerCol$all, rawTriggers;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                triggerCol = new _TriggerCollection.default(this.stackClient);
                _context3.next = 3;
                return triggerCol.all({
                  limit: null
                });

              case 3:
                _yield$triggerCol$all = _context3.sent;
                rawTriggers = _yield$triggerCol$all.data;
                return _context3.abrupt("return", rawTriggers.map(function (x) {
                  return x.attributes;
                }).filter(function (triggerAttrs) {
                  return (0, _TriggerCollection.isForKonnector)(triggerAttrs, slug);
                }));

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function findTriggersBySlug(_x) {
        return _findTriggersBySlug.apply(this, arguments);
      }

      return findTriggersBySlug;
    }()
    /**
     * Launch a trigger for a given konnector.
     *
     * @param  {string} slug - Konnector slug
     * @param  {object} options - Options
     * @param  {object} options.accountId - Pinpoint the account that should be used, useful if the user
     * has more than 1 account for 1 konnector
     */

  }, {
    key: "launch",
    value: function () {
      var _launch = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(slug) {
        var options,
            triggerCol,
            konnTriggers,
            filteredTriggers,
            filterAttrs,
            _args4 = arguments;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
                triggerCol = new _TriggerCollection.default(this.stackClient);
                _context4.next = 4;
                return this.findTriggersBySlug(slug);

              case 4:
                konnTriggers = _context4.sent;
                filteredTriggers = options.accountId ? konnTriggers.filter(function (triggerAttrs) {
                  return (0, _TriggerCollection.isForAccount)(triggerAttrs, options.accountId);
                }) : konnTriggers;

                if (!(filteredTriggers.length === 1)) {
                  _context4.next = 10;
                  break;
                }

                return _context4.abrupt("return", triggerCol.launch(konnTriggers[0]));

              case 10:
                filterAttrs = JSON.stringify((0, _pick.default)({
                  slug: slug,
                  accountId: options.accountId
                }));

                if (!(filteredTriggers.length === 0)) {
                  _context4.next = 15;
                  break;
                }

                throw new Error("No trigger found for ".concat(filterAttrs));

              case 15:
                if (!(filteredTriggers.length > 1)) {
                  _context4.next = 17;
                  break;
                }

                throw new Error("More than 1 trigger found for ".concat(filterAttrs));

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function launch(_x2) {
        return _launch.apply(this, arguments);
      }

      return launch;
    }()
    /**
     * Updates a konnector
     *
     * @param  {string} slug - Konnector slug
     * @param  {object} options - Options
     * @param  {object} options.source - Specify the source (ex: registry://slug/stable)
     * @param  {boolean} options.sync - Wait for konnector to be updated, otherwise the job
     * is just scheduled
     */

  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(slug) {
        var options,
            source,
            sync,
            reqOptions,
            rawKonnector,
            _args5 = arguments;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};

                if (slug) {
                  _context5.next = 3;
                  break;
                }

                throw new Error('Cannot call update with no slug');

              case 3:
                source = options.source || null;
                sync = options.sync || false;
                reqOptions = sync ? {
                  headers: {
                    Accept: 'text/event-stream'
                  }
                } : {};
                _context5.next = 8;
                return this.stackClient.fetchJSON('PUT', "/konnectors/".concat(slug) + (source ? "?Source=".concat(source) : ''), reqOptions);

              case 8:
                rawKonnector = _context5.sent;
                return _context5.abrupt("return", (0, _normalize.normalizeDoc)(rawKonnector));

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function update(_x3) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }]);
  return KonnectorCollection;
}(_AppCollection2.default);

var _default = KonnectorCollection;
exports.default = _default;