"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.isForAccount = exports.isForKonnector = exports.normalizeTrigger = exports.TRIGGERS_DOCTYPE = exports.JOBS_DOCTYPE = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get3 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _Collection = _interopRequireWildcard(require("./Collection"));

var _normalize = require("./normalize");

var _JobCollection = require("./JobCollection");

var _utils = require("./utils");

var _DocumentCollection2 = _interopRequireDefault(require("./DocumentCollection"));

var _errors = require("./errors");

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["/jobs/triggers/", "/launch"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["/jobs/triggers/", ""]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["/jobs/triggers/", ""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["/jobs/triggers"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var JOBS_DOCTYPE = 'io.cozy.jobs';
exports.JOBS_DOCTYPE = JOBS_DOCTYPE;
var TRIGGERS_DOCTYPE = 'io.cozy.triggers';
exports.TRIGGERS_DOCTYPE = TRIGGERS_DOCTYPE;
var normalizeTrigger = (0, _normalize.normalizeDoctypeJsonApi)(TRIGGERS_DOCTYPE);
exports.normalizeTrigger = normalizeTrigger;

var isForKonnector = function isForKonnector(triggerAttrs, slug) {
  return triggerAttrs.worker === 'konnector' && triggerAttrs.message.konnector == slug;
};

exports.isForKonnector = isForKonnector;

var isForAccount = function isForAccount(triggerAttrs, accountId) {
  return triggerAttrs.message.account == accountId;
};

exports.isForAccount = isForAccount;

var buildParamsUrl = function buildParamsUrl(worker, type) {
  var urlParams = new URLSearchParams();

  if (worker) {
    if (Array.isArray(worker.$in)) {
      urlParams.set('Worker', worker.$in.join(','));
    } else {
      urlParams.set('Worker', worker);
    }
  }

  if (type) {
    if (Array.isArray(type.$in)) {
      urlParams.set('Type', type.$in.join(','));
    } else {
      urlParams.set('Type', type);
    }
  }

  return urlParams.toString();
};
/**
 * Implements `DocumentCollection` API along with specific methods for `io.cozy.triggers`.
 */


var TriggerCollection = /*#__PURE__*/function (_DocumentCollection) {
  (0, _inherits2.default)(TriggerCollection, _DocumentCollection);

  var _super = _createSuper(TriggerCollection);

  function TriggerCollection(stackClient) {
    (0, _classCallCheck2.default)(this, TriggerCollection);
    return _super.call(this, TRIGGERS_DOCTYPE, stackClient);
  }
  /**
   * Get the list of triggers.
   *
   * @see https://docs.cozy.io/en/cozy-stack/jobs/#get-jobstriggers
   * @param  {{Worker}} options The fetch options: Worker allow to filter only triggers associated with a specific worker.
   * @returns {{data}} The JSON API conformant response.
   * @throws {FetchError}
   */


  (0, _createClass2.default)(TriggerCollection, [{
    key: "all",
    value: function () {
      var _all = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var options,
            resp,
            _args = arguments;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.prev = 1;
                _context.next = 4;
                return this.stackClient.fetchJSON('GET', "/jobs/triggers");

              case 4:
                resp = _context.sent;
                return _context.abrupt("return", {
                  data: resp.data.map(function (row) {
                    return normalizeTrigger(row);
                  }),
                  meta: {
                    count: resp.data.length
                  },
                  next: false,
                  skip: 0
                });

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", (0, _Collection.dontThrowNotFoundError)(_context.t0));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 8]]);
      }));

      function all() {
        return _all.apply(this, arguments);
      }

      return all;
    }()
    /**
     * Creates a Trigger document
     *
     * @see https://docs.cozy.io/en/cozy-stack/jobs/#post-jobstriggers
     * @param  {object}  attributes Trigger's attributes
     * @returns {object}  Stack response, containing trigger document under `data` attribute.
     */

  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(attributes) {
        var path, resp;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                path = (0, _utils.uri)(_templateObject());
                _context2.next = 3;
                return this.stackClient.fetchJSON('POST', path, {
                  data: {
                    attributes: attributes
                  }
                });

              case 3:
                resp = _context2.sent;
                return _context2.abrupt("return", {
                  data: normalizeTrigger(resp.data)
                });

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
    /**
     * Deletes a trigger
     *
     * @see https://docs.cozy.io/en/cozy-stack/jobs/#delete-jobstriggerstrigger-id
     * @param  {object} document The trigger to delete — must have an _id field
     * @returns {object} The deleted document
     */

  }, {
    key: "destroy",
    value: function () {
      var _destroy = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(document) {
        var _id;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _id = document._id;

                if (_id) {
                  _context3.next = 3;
                  break;
                }

                throw new Error('TriggerCollection.destroy needs a document with an _id');

              case 3:
                _context3.next = 5;
                return this.stackClient.fetchJSON('DELETE', (0, _utils.uri)(_templateObject2(), _id));

              case 5:
                return _context3.abrupt("return", {
                  data: normalizeTrigger(_objectSpread(_objectSpread({}, document), {}, {
                    _deleted: true
                  }))
                });

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function destroy(_x2) {
        return _destroy.apply(this, arguments);
      }

      return destroy;
    }()
    /**
     *
     * Be warned, ATM /jobs/triggers does not return the same informations
     * than /data/io.cozy.triggers (used by the super.find method).
     *
     * See https://github.com/cozy/cozy-stack/pull/2010
     *
     * @param {object} selector - Which kind of worker {konnector,service}
     * @param {object} options - Options
     * @returns {{data, meta, skip, next}} The JSON API conformant response.
     * @throws {FetchError}
     */

  }, {
    key: "find",
    value: function () {
      var _find = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var selector,
            options,
            worker,
            type,
            rest,
            hasOnlyWorkerAndType,
            url,
            resp,
            _args4 = arguments;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                selector = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
                options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
                worker = selector.worker, type = selector.type, rest = (0, _objectWithoutProperties2.default)(selector, ["worker", "type"]);
                hasOnlyWorkerAndType = Object.keys(rest).length === 0 && !options.partialFilter;

                if (!hasOnlyWorkerAndType) {
                  _context4.next = 18;
                  break;
                }

                // @see https://github.com/cozy/cozy-stack/blob/master/docs/jobs.md#get-jobstriggers
                url = "/jobs/triggers?".concat(buildParamsUrl(worker, type));
                _context4.prev = 6;
                _context4.next = 9;
                return this.stackClient.fetchJSON('GET', url);

              case 9:
                resp = _context4.sent;
                return _context4.abrupt("return", {
                  data: resp.data.map(function (row) {
                    return normalizeTrigger(row);
                  }),
                  meta: {
                    count: resp.data.length
                  },
                  next: false,
                  skip: 0
                });

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4["catch"](6);
                return _context4.abrupt("return", (0, _Collection.dontThrowNotFoundError)(_context4.t0));

              case 16:
                _context4.next = 19;
                break;

              case 18:
                return _context4.abrupt("return", (0, _get3.default)((0, _getPrototypeOf2.default)(TriggerCollection.prototype), "find", this).call(this, selector, options));

              case 19:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[6, 13]]);
      }));

      function find() {
        return _find.apply(this, arguments);
      }

      return find;
    }()
  }, {
    key: "get",
    value: function () {
      var _get2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(id) {
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", _Collection.default.get(this.stackClient, (0, _utils.uri)(_templateObject3(), id), {
                  normalize: normalizeTrigger
                }));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function get(_x3) {
        return _get2.apply(this, arguments);
      }

      return get;
    }()
    /**
     * Force given trigger execution.
     *
     * @see https://docs.cozy.io/en/cozy-stack/jobs/#post-jobstriggerstrigger-idlaunch
     * @param {object} trigger Trigger to launch
     * @returns {object} Stack response, containing job launched by trigger, under `data` attribute.
     */

  }, {
    key: "launch",
    value: function () {
      var _launch = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(trigger) {
        var path, resp;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                path = (0, _utils.uri)(_templateObject4(), trigger._id);
                _context6.next = 3;
                return this.stackClient.fetchJSON('POST', path);

              case 3:
                resp = _context6.sent;
                return _context6.abrupt("return", {
                  data: (0, _JobCollection.normalizeJob)(resp.data)
                });

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function launch(_x4) {
        return _launch.apply(this, arguments);
      }

      return launch;
    }()
    /**
     * Updates a Trigger document. Only updatable attributes plus _id are allowed.
     *
     * @param  {object}  trigger Trigger's attributes to update + id
     * @returns {object}  Stack response, containing resulting trigger document under `data` attribute.
     */

  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(trigger) {
        var key, attributes, triggerUpdateResult;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.t0 = _regenerator.default.keys(trigger);

              case 1:
                if ((_context7.t1 = _context7.t0()).done) {
                  _context7.next = 7;
                  break;
                }

                key = _context7.t1.value;

                if (['_id', '_rev', '_type', 'arguments', 'message', 'cozyMetadata'].includes(key)) {
                  _context7.next = 5;
                  break;
                }

                throw new Error("TriggerCollection.update only works for 'arguments', and 'message' attributes.");

              case 5:
                _context7.next = 1;
                break;

              case 7:
                attributes = _objectSpread(_objectSpread({}, trigger.arguments ? {
                  arguments: trigger.arguments
                } : {}), trigger.message ? {
                  message: trigger.message
                } : {});
                _context7.next = 10;
                return this.stackClient.fetchJSON('PATCH', "/jobs/triggers/".concat(trigger._id), {
                  data: {
                    attributes: attributes
                  }
                });

              case 10:
                triggerUpdateResult = _context7.sent;
                return _context7.abrupt("return", {
                  data: normalizeTrigger(triggerUpdateResult.data)
                });

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function update(_x5) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }]);
  return TriggerCollection;
}(_DocumentCollection2.default);

TriggerCollection.normalizeDoctype = _normalize.normalizeDoctypeJsonApi;
var _default = TriggerCollection;
exports.default = _default;