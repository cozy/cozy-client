"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.transformBulkDocsResponse = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _zipWith = _interopRequireDefault(require("lodash/zipWith"));

var _dsl = require("./queries/dsl");

var _CozyLink2 = _interopRequireDefault(require("./CozyLink"));

var _const = require("./const");

var _errors = require("./errors");

var _logger = _interopRequireDefault(require("./logger"));

var _utils = require("./utils");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 *
 * To know if cozy-client should use Document.find()
 * or Document.all()
 * Similar to what is done in CozyPouchLink executeQuery()
 *
 * @param {QueryDefinition} queryDefinition - QueryDefinition to check
 * @returns {boolean} If has find options
 *
 */
var hasFindOptions = function hasFindOptions(queryDefinition) {
  var selector = queryDefinition.selector,
      partialFilter = queryDefinition.partialFilter,
      sort = queryDefinition.sort,
      fields = queryDefinition.fields;
  if (selector || partialFilter || sort || fields) return true;
  return false;
};
/**
 * Returns full documents after a bulk update
 *
 * @private
 *
 * @param  {import("./types").CouchDBBulkResult[]} bulkResponse - Response from bulk docs
 * @param  {import("./types").CozyClientDocument[]} originalDocuments - Documents that were updated
 * @returns {{ data: import("./types").CozyClientDocument[] }} - Full documents with updated _id and _rev
 */


var transformBulkDocsResponse = function transformBulkDocsResponse(bulkResponse, originalDocuments) {
  var updatedDocs = (0, _zipWith.default)(bulkResponse, originalDocuments, function (result, od) {
    return result.ok ? _objectSpread(_objectSpread({}, od), {}, {
      _id: result.id,
      _rev: result.rev
    }) : od;
  });

  if (bulkResponse.find(function (x) {
    return !x.ok;
  })) {
    throw new _errors.BulkEditError(bulkResponse, updatedDocs);
  }

  return {
    data: updatedDocs
  };
};
/**
 * @typedef {object} StackLinkOptions
 * @property {object} [stackClient] - A StackClient
 * @property {object} [client] - A StackClient (deprecated)
 * @property {import('cozy-pouch-link/dist/types').LinkPlatform} [platform] - Platform specific adapters and methods
 */

/**
 * Transfers queries and mutations to a remote stack
 */


exports.transformBulkDocsResponse = transformBulkDocsResponse;

var StackLink = /*#__PURE__*/function (_CozyLink) {
  (0, _inherits2.default)(StackLink, _CozyLink);

  var _super = _createSuper(StackLink);

  /**
   * @param {StackLinkOptions} [options] - Options
   */
  function StackLink() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        client = _ref.client,
        stackClient = _ref.stackClient,
        platform = _ref.platform;

    (0, _classCallCheck2.default)(this, StackLink);
    _this = _super.call(this);

    if (client) {
      _logger.default.warn('Using options.client is deprecated, prefer options.stackClient');
    }

    _this.stackClient = stackClient || client;
    _this.isOnline = platform === null || platform === void 0 ? void 0 : platform.isOnline;
    return _this;
  }

  (0, _createClass2.default)(StackLink, [{
    key: "registerClient",
    value: function registerClient(client) {
      this.stackClient = client.stackClient || client.client;
    }
  }, {
    key: "reset",
    value: function () {
      var _reset = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.stackClient = null;

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function reset() {
        return _reset.apply(this, arguments);
      }

      return reset;
    }()
  }, {
    key: "request",
    value: function () {
      var _request = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(operation, result, forward) {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = this.isOnline;

                if (!_context2.t0) {
                  _context2.next = 5;
                  break;
                }

                _context2.next = 4;
                return this.isOnline();

              case 4:
                _context2.t0 = !_context2.sent;

              case 5:
                if (!_context2.t0) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", forward(operation));

              case 7:
                _context2.prev = 7;

                if (!operation.mutationType) {
                  _context2.next = 12;
                  break;
                }

                _context2.next = 11;
                return this.executeMutation(operation, result, forward);

              case 11:
                return _context2.abrupt("return", _context2.sent);

              case 12:
                _context2.next = 14;
                return this.executeQuery(operation);

              case 14:
                return _context2.abrupt("return", _context2.sent);

              case 17:
                _context2.prev = 17;
                _context2.t1 = _context2["catch"](7);

                if (!(0, _utils.isReactNativeOfflineError)(_context2.t1)) {
                  _context2.next = 21;
                  break;
                }

                return _context2.abrupt("return", forward(operation));

              case 21:
                throw _context2.t1;

              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[7, 17]]);
      }));

      function request(_x, _x2, _x3) {
        return _request.apply(this, arguments);
      }

      return request;
    }()
  }, {
    key: "persistCozyData",
    value: function () {
      var _persistCozyData = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(data, forward) {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", forward(data));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function persistCozyData(_x4, _x5) {
        return _persistCozyData.apply(this, arguments);
      }

      return persistCozyData;
    }()
    /**
     *
     * @param {QueryDefinition} query - Query to execute
     * @returns {Promise<import("./types").ClientResponse>}
     */

  }, {
    key: "executeQuery",
    value: function executeQuery(query) {
      var doctype = query.doctype,
          selector = query.selector,
          id = query.id,
          ids = query.ids,
          referenced = query.referenced,
          options = (0, _objectWithoutProperties2.default)(query, ["doctype", "selector", "id", "ids", "referenced"]);

      if (!doctype) {
        _logger.default.warn('Bad query', query);

        throw new Error('No doctype found in a query definition');
      }

      var collection = this.stackClient.collection(doctype);

      if (id) {
        return collection.get(id, query);
      }

      if (ids) {
        return collection.getAll(ids);
      }

      if (referenced) {
        return collection.findReferencedBy(referenced, options);
      }

      if (hasFindOptions(query)) {
        return collection.find(selector, options);
      } else {
        return collection.all(options);
      }
    }
  }, {
    key: "executeMutation",
    value: function () {
      var _executeMutation = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(mutation, result, forward) {
        var mutationType, doc, docs, props, updateAllResp;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                mutationType = mutation.mutationType, doc = mutation.document, docs = mutation.documents, props = (0, _objectWithoutProperties2.default)(mutation, ["mutationType", "document", "documents"]);
                _context4.t0 = mutationType;
                _context4.next = _context4.t0 === _dsl.MutationTypes.CREATE_DOCUMENT ? 4 : _context4.t0 === _dsl.MutationTypes.UPDATE_DOCUMENTS ? 5 : _context4.t0 === _dsl.MutationTypes.UPDATE_DOCUMENT ? 9 : _context4.t0 === _dsl.MutationTypes.DELETE_DOCUMENT ? 10 : _context4.t0 === _dsl.MutationTypes.ADD_REFERENCES_TO ? 11 : _context4.t0 === _dsl.MutationTypes.REMOVE_REFERENCES_TO ? 12 : _context4.t0 === _dsl.MutationTypes.ADD_REFERENCED_BY ? 13 : _context4.t0 === _dsl.MutationTypes.REMOVE_REFERENCED_BY ? 18 : _context4.t0 === _dsl.MutationTypes.UPLOAD_FILE ? 23 : 24;
                break;

              case 4:
                return _context4.abrupt("return", this.stackClient.collection(doc._type).create(doc));

              case 5:
                _context4.next = 7;
                return this.stackClient.collection(docs[0]._type).updateAll(docs);

              case 7:
                updateAllResp = _context4.sent;
                return _context4.abrupt("return", transformBulkDocsResponse(updateAllResp, docs));

              case 9:
                return _context4.abrupt("return", this.stackClient.collection(doc._type).update(doc));

              case 10:
                return _context4.abrupt("return", this.stackClient.collection(doc._type).destroy(doc));

              case 11:
                return _context4.abrupt("return", this.stackClient.collection(props.referencedDocuments[0]._type).addReferencesTo(doc, props.referencedDocuments));

              case 12:
                return _context4.abrupt("return", this.stackClient.collection(props.referencedDocuments[0]._type).removeReferencesTo(doc, props.referencedDocuments));

              case 13:
                if (!(doc._type === _const.DOCTYPE_FILES)) {
                  _context4.next = 17;
                  break;
                }

                return _context4.abrupt("return", this.stackClient.collection(_const.DOCTYPE_FILES).addReferencedBy(doc, props.referencedDocuments));

              case 17:
                throw new Error('The document type should be io.cozy.files');

              case 18:
                if (!(doc._type === _const.DOCTYPE_FILES)) {
                  _context4.next = 22;
                  break;
                }

                return _context4.abrupt("return", this.stackClient.collection(_const.DOCTYPE_FILES).removeReferencedBy(doc, props.referencedDocuments));

              case 22:
                throw new Error('The document type should be io.cozy.files');

              case 23:
                return _context4.abrupt("return", this.stackClient.collection(_const.DOCTYPE_FILES).upload(props.file, props.dirPath));

              case 24:
                return _context4.abrupt("return", forward(mutation, result));

              case 25:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function executeMutation(_x6, _x7, _x8) {
        return _executeMutation.apply(this, arguments);
      }

      return executeMutation;
    }()
  }]);
  return StackLink;
}(_CozyLink2.default);

exports.default = StackLink;