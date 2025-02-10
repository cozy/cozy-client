"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _cozyFlags = _interopRequireDefault(require("cozy-flags"));

var _utils = require("./utils");

var _uniq = _interopRequireDefault(require("lodash/uniq"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _head = _interopRequireDefault(require("lodash/head"));

var _merge = _interopRequireDefault(require("lodash/merge"));

var _startsWith = _interopRequireDefault(require("lodash/startsWith"));

var _qs = _interopRequireDefault(require("qs"));

var _mangoIndex = require("./mangoIndex");

var _normalize = require("./normalize");

var _Collection = _interopRequireWildcard(require("./Collection"));

var querystring = _interopRequireWildcard(require("./querystring"));

var _errors = require("./errors");

var _logger = _interopRequireDefault(require("./logger"));

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2.default)(["/data/", "/_design/", "/copy?rev=", ""]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2.default)(["/data/", "/_design/", "?rev=", ""]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["/data/", "/_design_docs?include_docs=true"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["/data/", "/_index"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["/data/", "/", "?rev=", ""]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["/data/", "/", ""]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["/data/", "/", ""]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["/data/", "/_all_docs?include_docs=true"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["/data/", "/_find"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["/data/", "/", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var DATABASE_DOES_NOT_EXIST = 'Database does not exist.';

var prepareForDeletion = function prepareForDeletion(x) {
  return Object.assign({}, (0, _omit.default)(x, '_type'), {
    _deleted: true
  });
};
/**
 * Abstracts a collection of documents of the same doctype, providing CRUD methods and other helpers.
 */


var DocumentCollection = /*#__PURE__*/function () {
  function DocumentCollection(doctype, stackClient) {
    (0, _classCallCheck2.default)(this, DocumentCollection);
    this.doctype = doctype;
    this.stackClient = stackClient;
    this.indexes = {};
    this.endpoint = "/data/".concat(this.doctype, "/");
  }
  /**
   * Provides a callback for `Collection.get`
   *
   * @param {string} doctype - Document doctype
   * @returns {Function} (data, response) => normalizedDocument
   *                                        using `normalizeDoc`
   */


  (0, _createClass2.default)(DocumentCollection, [{
    key: "all",

    /**
     * Lists all documents of the collection, without filters.
     *
     * The returned documents are paginated by the stack.
     *
     * @param {object} options The fetch options: pagination & fetch of specific docs.
     * @param {number|null} [options.limit=100] - Pagination limit
     * @param {number} [options.skip=0] - Pagination Skip
     * @param {string} [options.bookmark] - Pagination bookmark
     * @param {Array<string>} [options.keys] - Keys to query
     * @returns {Promise<{data, meta, skip, bookmark, next}>} The JSON API conformant response.
     * @throws {FetchError}
     */
    value: function () {
      var _all = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _this = this;

        var _ref,
            _ref$limit,
            limit,
            _ref$skip,
            skip,
            bookmark,
            keys,
            isUsingAllDocsRoute,
            route,
            url,
            params,
            path,
            resp,
            data,
            next,
            _args = arguments;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, _ref$limit = _ref.limit, limit = _ref$limit === void 0 ? 100 : _ref$limit, _ref$skip = _ref.skip, skip = _ref$skip === void 0 ? 0 : _ref$skip, bookmark = _ref.bookmark, keys = _ref.keys;
                // If the limit is intentionnally null, we need to use _all_docs, since
                // _normal_docs uses _find and has a hard limit of 1000
                isUsingAllDocsRoute = !!keys || limit === null;
                route = isUsingAllDocsRoute ? '_all_docs' : '_normal_docs';
                url = (0, _utils.uri)(_templateObject(), this.doctype, route);
                params = {
                  include_docs: true,
                  limit: limit,
                  skip: skip,
                  keys: keys,
                  bookmark: bookmark
                };
                path = querystring.buildURL(url, params); // If no document of this doctype exist, this route will return a 404,
                // so we need to try/catch and return an empty response object in case of a 404

                _context.prev = 6;
                _context.next = 9;
                return this.stackClient.fetchJSON('GET', path);

              case 9:
                resp = _context.sent;
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](6);
                return _context.abrupt("return", (0, _Collection.dontThrowNotFoundError)(_context.t0));

              case 15:
                /* If using `all_docs` we need to filter our design documents and check if
                the document is not null. If we use `normal_doc` we can't have any design doc
                 */
                if (isUsingAllDocsRoute) {
                  data = resp.rows.filter(function (doc) {
                    return doc && doc.doc !== null && !doc.error && !(0, _startsWith.default)(doc.id, '_design');
                  }).map(function (row) {
                    return (0, _normalize.normalizeDoc)(row.doc, _this.doctype);
                  });
                } else {
                  data = resp.rows.map(function (row) {
                    return (0, _normalize.normalizeDoc)(row, _this.doctype);
                  });
                } // The presence of a bookmark doesn’t guarantee that there are more results.
                // See https://docs.couchdb.org/en/2.2.0/api/database/find.html#pagination


                next = bookmark ? resp.rows.length >= limit : skip + resp.rows.length < resp.total_rows;
                return _context.abrupt("return", {
                  data: data,
                  meta: {
                    count: isUsingAllDocsRoute ? data.length : resp.total_rows
                  },
                  skip: skip,
                  bookmark: resp.bookmark,
                  next: next
                });

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[6, 12]]);
      }));

      function all() {
        return _all.apply(this, arguments);
      }

      return all;
    }()
    /**
     * Fetch Documents with Mango
     *
     * @param {string} path - path to fetch
     * @param {MangoSelector} selector - selector
     * @param {MangoQueryOptions} options - request options
     */

  }, {
    key: "fetchDocumentsWithMango",
    value: function () {
      var _fetchDocumentsWithMango = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(path, selector) {
        var options,
            _args2 = arguments;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                options = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
                return _context2.abrupt("return", this.stackClient.fetchJSON('POST', path, this.toMangoOptions(selector, options)));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchDocumentsWithMango(_x, _x2) {
        return _fetchDocumentsWithMango.apply(this, arguments);
      }

      return fetchDocumentsWithMango;
    }()
    /**
     * Migrate an existing index to a new one with a different name.
     *
     * Index migration became necessary for optimistic index, because
     * we started to use named index while we used to have unamed index,
     * i.e. indexes with CouchDB-generated ID. This can also be used to
     * migrate an index to a new name.
     *
     * @param {object} sourceIndex - The index to migrate
     * @param {string} targetIndexName - The new index name
     * @private
     */

  }, {
    key: "migrateIndex",
    value: function () {
      var _migrateIndex = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(sourceIndex, targetIndexName) {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.copyIndex(sourceIndex, targetIndexName);

              case 3:
                _context3.next = 5;
                return this.destroyIndex(sourceIndex);

              case 5:
                _context3.next = 16;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);

                if ((0, _Collection.isDocumentUpdateConflict)(_context3.t0)) {
                  _context3.next = 11;
                  break;
                }

                throw _context3.t0;

              case 11:
                (0, _utils.sleep)(1000);
                _context3.next = 14;
                return this.copyIndex(sourceIndex, targetIndexName);

              case 14:
                _context3.next = 16;
                return this.destroyIndex(sourceIndex);

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));

      function migrateIndex(_x3, _x4) {
        return _migrateIndex.apply(this, arguments);
      }

      return migrateIndex;
    }()
    /**
     * Handle index creation if it is missing.
     *
     * When an index is missing, we first check if there is one with a different
     * name but the same definition. If yes, it means we found an old unamed
     * index, so we migrate it. If there is none, we create the new index.
     *
     * /!\ Warning: this method is similar to CozyPouchLink.ensureIndex()
     * If you edit this method, please check if the change is also needed in CozyPouchLink
     *
     * @param {object} selector The mango selector
     * @param {MangoQueryOptions} options The find options
     * @private
     */

  }, {
    key: "handleMissingIndex",
    value: function () {
      var _handleMissingIndex = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(selector, options) {
        var indexedFields, partialFilter, indexName, existingIndex;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                indexedFields = options.indexedFields, partialFilter = options.partialFilter;

                if (!indexedFields) {
                  indexedFields = (0, _mangoIndex.getIndexFields)({
                    sort: options.sort,
                    selector: selector
                  });
                }

                indexName = (0, _mangoIndex.getIndexNameFromFields)(indexedFields, partialFilter);
                _context4.next = 5;
                return this.findExistingIndex(selector, options);

              case 5:
                existingIndex = _context4.sent;

                if (existingIndex) {
                  _context4.next = 11;
                  break;
                }

                _context4.next = 9;
                return this.createIndex(indexedFields, {
                  partialFilter: partialFilter,
                  indexName: indexName
                });

              case 9:
                _context4.next = 17;
                break;

              case 11:
                if (!(existingIndex._id !== "_design/".concat(indexName))) {
                  _context4.next = 16;
                  break;
                }

                _context4.next = 14;
                return this.migrateIndex(existingIndex, indexName);

              case 14:
                _context4.next = 17;
                break;

              case 16:
                throw new Error("Index unusable for query, index used: ".concat(indexName));

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function handleMissingIndex(_x5, _x6) {
        return _handleMissingIndex.apply(this, arguments);
      }

      return handleMissingIndex;
    }()
    /**
     * Find documents with the mango selector and create index
     * if missing.
     *
     * We adopt an optimistic approach for index creation:
     * we run the query first, and only if an index missing
     * error is returned, the index is created and
     * the query run again.
     *
     * @param {string} path The route path
     * @param {MangoSelector} selector The mango selector
     * @param {MangoQueryOptions} options The find options
     *
     * @returns {Promise<object>} - The find response
     * @protected
     */

  }, {
    key: "findWithMango",
    value: function () {
      var _findWithMango = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(path, selector) {
        var options,
            resp,
            _resp$meta,
            warning,
            _args5 = arguments;

        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                options = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
                _context5.prev = 1;
                _context5.next = 4;
                return this.fetchDocumentsWithMango(path, selector, options);

              case 4:
                resp = _context5.sent;
                warning = resp.warning || ((_resp$meta = resp.meta) === null || _resp$meta === void 0 ? void 0 : _resp$meta.warning);

                if (!(warning && options.partialFilter && (0, _Collection.isIndexNotUsedWarning)(warning))) {
                  _context5.next = 8;
                  break;
                }

                throw new Error('no_index');

              case 8:
                _context5.next = 21;
                break;

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](1);

                if (!((0, _Collection.isIndexNotFoundError)(_context5.t0) || (0, _Collection.isNoUsableIndexError)(_context5.t0) || (0, _Collection.isTimeoutError)(_context5.t0))) {
                  _context5.next = 20;
                  break;
                }

                _context5.next = 15;
                return this.handleMissingIndex(selector, options);

              case 15:
                _context5.next = 17;
                return this.fetchDocumentsWithMango(path, selector, options);

              case 17:
                resp = _context5.sent;
                _context5.next = 21;
                break;

              case 20:
                throw _context5.t0;

              case 21:
                return _context5.abrupt("return", resp);

              case 22:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 10]]);
      }));

      function findWithMango(_x7, _x8) {
        return _findWithMango.apply(this, arguments);
      }

      return findWithMango;
    }()
    /**
     * Returns a filtered list of documents using a Mango selector.
     
    The returned documents are paginated by the stack.
     *
     * @param {MangoSelector} selector The Mango selector.
     * @param {MangoQueryOptions} options MangoQueryOptions
     * @returns {Promise<{data, skip, bookmark, next, execution_stats}>} The JSON API conformant response.
     * @throws {FetchError}
     */

  }, {
    key: "find",
    value: function () {
      var _find = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(selector) {
        var _this2 = this;

        var options,
            _options$skip,
            skip,
            resp,
            path,
            _args6 = arguments;

        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
                _options$skip = options.skip, skip = _options$skip === void 0 ? 0 : _options$skip;
                _context6.prev = 2;
                path = (0, _utils.uri)(_templateObject2(), this.doctype);
                _context6.next = 6;
                return this.findWithMango(path, selector, options);

              case 6:
                resp = _context6.sent;
                _context6.next = 12;
                break;

              case 9:
                _context6.prev = 9;
                _context6.t0 = _context6["catch"](2);
                return _context6.abrupt("return", (0, _Collection.dontThrowNotFoundError)(_context6.t0));

              case 12:
                return _context6.abrupt("return", {
                  data: resp.docs.map(function (doc) {
                    return (0, _normalize.normalizeDoc)(doc, _this2.doctype);
                  }),
                  next: resp.next,
                  skip: skip,
                  bookmark: resp.bookmark,
                  execution_stats: resp.execution_stats
                });

              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[2, 9]]);
      }));

      function find(_x9) {
        return _find.apply(this, arguments);
      }

      return find;
    }()
    /**
     * Returns a filtered list with all documents using a Mango selector,
     * automatically fetching more documents if the total of documents is
     * superior to the pagination limit.
     * Can result in a lot of network requests.
     *
     The returned documents are paginated by the stack.
     *
     * @param {MangoSelector} selector The Mango selector.
     * @param {MangoQueryOptions} options MangoQueryOptions
     * @returns {Promise<Array<{data}>>} Documents fetched
     * @throws {FetchError}
     */

  }, {
    key: "findAll",
    value: function () {
      var _findAll = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(selector) {
        var options,
            next,
            documents,
            bookmark,
            resp,
            _args7 = arguments;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
                next = true;
                documents = [];
                bookmark = options.bookmark || undefined;

              case 4:
                if (!next) {
                  _context7.next = 13;
                  break;
                }

                _context7.next = 7;
                return this.find(selector, _objectSpread(_objectSpread({}, options), {}, {
                  bookmark: bookmark
                }));

              case 7:
                resp = _context7.sent;
                documents.push.apply(documents, (0, _toConsumableArray2.default)(resp.data));
                bookmark = resp.bookmark;
                next = resp.next;
                _context7.next = 4;
                break;

              case 13:
                return _context7.abrupt("return", documents);

              case 14:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function findAll(_x10) {
        return _findAll.apply(this, arguments);
      }

      return findAll;
    }()
    /**
     * Get a document by id
     *
     * @param  {string} id The document id.
     * @returns {Promise<object>}  JsonAPI response containing normalized document as data attribute
     */

  }, {
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(id) {
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.abrupt("return", _Collection.default.get(this.stackClient, "".concat(this.endpoint).concat(encodeURIComponent(id)), {
                  normalize: this.constructor.normalizeDoctype(this.doctype)
                }));

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function get(_x11) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
    /**
     * Get many documents by id
     */

  }, {
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9(ids) {
        var _this3 = this;

        var resp, rows;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return this.stackClient.fetchJSON('POST', (0, _utils.uri)(_templateObject3(), this.doctype), {
                  keys: ids
                });

              case 3:
                resp = _context9.sent;
                _context9.next = 9;
                break;

              case 6:
                _context9.prev = 6;
                _context9.t0 = _context9["catch"](0);
                return _context9.abrupt("return", (0, _Collection.dontThrowNotFoundError)(_context9.t0));

              case 9:
                rows = resp.rows.filter(function (row) {
                  return row.doc;
                });
                return _context9.abrupt("return", {
                  data: rows.map(function (row) {
                    return (0, _normalize.normalizeDoc)(row.doc, _this3.doctype);
                  }),
                  meta: {
                    count: rows.length
                  }
                });

              case 11:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 6]]);
      }));

      function getAll(_x12) {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
    /**
     * Creates a document
     *
     * @param {object} doc - Document to create. Optional: you can force the id with the _id attribute
     */

  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10(_ref2) {
        var _id, _type, document, hasFixedId, method, endpoint, resp;

        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _id = _ref2._id, _type = _ref2._type, document = (0, _objectWithoutProperties2.default)(_ref2, ["_id", "_type"]);
                // In case of a fixed id, let's use the dedicated creation endpoint
                // https://github.com/cozy/cozy-stack/blob/master/docs/data-system.md#create-a-document-with-a-fixed-id
                hasFixedId = !!_id;
                method = hasFixedId ? 'PUT' : 'POST';
                endpoint = (0, _utils.uri)(_templateObject4(), this.doctype, hasFixedId ? _id : '');
                _context10.next = 6;
                return this.stackClient.fetchJSON(method, endpoint, document);

              case 6:
                resp = _context10.sent;
                return _context10.abrupt("return", {
                  data: (0, _normalize.normalizeDoc)(resp.data, this.doctype)
                });

              case 8:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function create(_x13) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
    /**
     * Updates a document
     *
     * @param {object} document - Document to update. Do not forget the _id attribute
     */

  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11(document) {
        var resp;
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return this.stackClient.fetchJSON('PUT', (0, _utils.uri)(_templateObject5(), this.doctype, document._id), document);

              case 2:
                resp = _context11.sent;
                return _context11.abrupt("return", {
                  data: (0, _normalize.normalizeDoc)(resp.data, this.doctype)
                });

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function update(_x14) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
    /**
     * Destroys a document
     *
     * @param {object} doc - Document to destroy. Do not forget _id and _rev attributes
     */

  }, {
    key: "destroy",
    value: function () {
      var _destroy = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12(_ref3) {
        var _id, _rev, document, resp;

        return _regenerator.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _id = _ref3._id, _rev = _ref3._rev, document = (0, _objectWithoutProperties2.default)(_ref3, ["_id", "_rev"]);
                _context12.next = 3;
                return this.stackClient.fetchJSON('DELETE', (0, _utils.uri)(_templateObject6(), this.doctype, _id, _rev));

              case 3:
                resp = _context12.sent;
                return _context12.abrupt("return", {
                  data: (0, _normalize.normalizeDoc)(_objectSpread(_objectSpread({}, document), {}, {
                    _id: _id,
                    _rev: resp.rev,
                    _deleted: true
                  }), this.doctype)
                });

              case 5:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function destroy(_x15) {
        return _destroy.apply(this, arguments);
      }

      return destroy;
    }()
    /**
     * Updates several documents in one batch
     *
     * @param  {Document[]} rawDocs Documents to be updated
     */

  }, {
    key: "updateAll",
    value: function () {
      var _updateAll = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13(rawDocs) {
        var stackClient, docs, update, firstDoc, resp;
        return _regenerator.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                stackClient = this.stackClient;
                docs = rawDocs ? rawDocs.map(function (d) {
                  return (0, _omit.default)(d, '_type');
                }) : rawDocs;

                if (!(!docs || !docs.length)) {
                  _context13.next = 4;
                  break;
                }

                return _context13.abrupt("return", Promise.resolve([]));

              case 4:
                _context13.prev = 4;
                _context13.next = 7;
                return stackClient.fetchJSON('POST', "/data/".concat(this.doctype, "/_bulk_docs"), {
                  docs: docs
                });

              case 7:
                update = _context13.sent;
                return _context13.abrupt("return", update);

              case 11:
                _context13.prev = 11;
                _context13.t0 = _context13["catch"](4);

                if (!(_context13.t0.reason && _context13.t0.reason.reason && _context13.t0.reason.reason === DATABASE_DOES_NOT_EXIST)) {
                  _context13.next = 24;
                  break;
                }

                _context13.next = 16;
                return this.create(docs[0]);

              case 16:
                firstDoc = _context13.sent;
                _context13.next = 19;
                return this.updateAll(docs.slice(1));

              case 19:
                resp = _context13.sent;
                resp.unshift({
                  ok: true,
                  id: firstDoc._id,
                  rev: firstDoc._rev
                });
                return _context13.abrupt("return", resp);

              case 24:
                throw _context13.t0;

              case 25:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this, [[4, 11]]);
      }));

      function updateAll(_x16) {
        return _updateAll.apply(this, arguments);
      }

      return updateAll;
    }()
    /**
     * Deletes several documents in one batch
     *
     * @param  {Document[]} docs - Documents to delete
     */

  }, {
    key: "destroyAll",
    value: function destroyAll(docs) {
      return this.updateAll(docs.map(prepareForDeletion));
    }
    /**
     * Returns Mango Options from Selector and Options
     *
     * @param {MangoSelector} selector - Mango selector
     * @param {MangoQueryOptions} options - Mango Options
     * @returns {MangoQueryOptions} Mango options
     */

  }, {
    key: "toMangoOptions",
    value: function toMangoOptions(selector) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var sort = options.sort,
          indexedFields = options.indexedFields,
          partialFilter = options.partialFilter;
      var fields = options.fields,
          _options$skip2 = options.skip,
          skip = _options$skip2 === void 0 ? 0 : _options$skip2,
          limit = options.limit,
          bookmark = options.bookmark;
      sort = (0, _mangoIndex.transformSort)(sort);

      if (!indexedFields && selector) {
        _logger.default.warn('Selector fields should be manually indexed to prevent unexpected behaviour');
      }

      indexedFields = indexedFields ? indexedFields : (0, _mangoIndex.getIndexFields)({
        sort: sort,
        selector: selector
      });
      var indexName = options.indexId || "_design/".concat((0, _mangoIndex.getIndexNameFromFields)(indexedFields, partialFilter));

      if (sort) {
        var sortOrders = (0, _uniq.default)(sort.map(function (sortOption) {
          return (0, _head.default)(Object.values(sortOption));
        }));
        if (sortOrders.length > 1) throw new Error('Mango sort can only use a single order (asc or desc).');
        var sortOrder = sortOrders.length > 0 ? (0, _head.default)(sortOrders) : 'asc';

        var _iterator = _createForOfIteratorHelper(indexedFields),
            _step;

        try {
          var _loop = function _loop() {
            var field = _step.value;
            if (!sort.find(function (sortOption) {
              return (0, _head.default)(Object.keys(sortOption)) === field;
            })) sort.push((0, _defineProperty2.default)({}, field, sortOrder));
          };

          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            _loop();
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } // We need to pass the partialFilter in the selector, otherwise CouchDB might
      // fallback on another index if it does not exist yet


      var mergedSelector = partialFilter ? (0, _merge.default)(_objectSpread({}, selector), partialFilter) : selector;
      return {
        selector: mergedSelector,
        use_index: indexName,
        // _id is necessary for the store, and _rev is required for offline. See https://github.com/cozy/cozy-client/blob/95978d39546023920b0c01d689fed5dd41577a02/packages/cozy-client/src/CozyClient.js#L1153
        fields: fields ? [].concat((0, _toConsumableArray2.default)(fields), ['_id', '_rev']) : undefined,
        limit: limit,
        skip: skip,
        bookmark: options.bookmark || bookmark,
        sort: sort,
        execution_stats: (0, _cozyFlags.default)('debug') ? true : undefined
      };
    }
  }, {
    key: "checkUniquenessOf",
    value: function () {
      var _checkUniquenessOf = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee14(property, value) {
        var indexId, existingDocs;
        return _regenerator.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return this.getUniqueIndexId(property);

              case 2:
                indexId = _context14.sent;
                _context14.next = 5;
                return this.find((0, _defineProperty2.default)({}, property, value), {
                  indexId: indexId,
                  fields: ['_id']
                });

              case 5:
                existingDocs = _context14.sent;
                return _context14.abrupt("return", existingDocs.data.length === 0);

              case 7:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function checkUniquenessOf(_x17, _x18) {
        return _checkUniquenessOf.apply(this, arguments);
      }

      return checkUniquenessOf;
    }()
  }, {
    key: "getUniqueIndexId",
    value: function getUniqueIndexId(property) {
      return this.getIndexId([property], {
        indexName: "".concat(this.doctype, "/").concat(property)
      });
    }
  }, {
    key: "getIndexId",
    value: function () {
      var _getIndexId = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee15(fields, _ref4) {
        var _ref4$partialFilter, partialFilter, _ref4$indexName, indexName, index;

        return _regenerator.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _ref4$partialFilter = _ref4.partialFilter, partialFilter = _ref4$partialFilter === void 0 ? '' : _ref4$partialFilter, _ref4$indexName = _ref4.indexName, indexName = _ref4$indexName === void 0 ? (0, _mangoIndex.getIndexNameFromFields)(fields) : _ref4$indexName;

                if (this.indexes[indexName]) {
                  _context15.next = 20;
                  break;
                }

                _context15.prev = 2;
                _context15.next = 5;
                return this.createIndex(fields, {
                  partialFilter: partialFilter
                });

              case 5:
                index = _context15.sent;
                _context15.next = 19;
                break;

              case 8:
                _context15.prev = 8;
                _context15.t0 = _context15["catch"](2);

                if ((0, _Collection.isIndexConflictError)(_context15.t0)) {
                  _context15.next = 14;
                  break;
                }

                throw _context15.t0;

              case 14:
                _context15.next = 16;
                return (0, _utils.sleep)(1000);

              case 16:
                _context15.next = 18;
                return this.createIndex(fields, {
                  partialFilter: partialFilter
                });

              case 18:
                index = _context15.sent;

              case 19:
                this.indexes[indexName] = index;

              case 20:
                return _context15.abrupt("return", this.indexes[indexName].id);

              case 21:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this, [[2, 8]]);
      }));

      function getIndexId(_x19, _x20) {
        return _getIndexId.apply(this, arguments);
      }

      return getIndexId;
    }()
    /**
     *
     * @param {Array} fields - Fields to index
     * @param {object} indexOption - Options for the index
     * @param {MangoPartialFilter} [indexOption.partialFilter] - partialFilter
     * @param {string} [indexOption.indexName] - indexName
     * @returns {Promise<{id, fields}>}
     */

  }, {
    key: "createIndex",
    value: function () {
      var _createIndex = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee16(fields) {
        var _ref5,
            partialFilter,
            indexName,
            indexDef,
            resp,
            indexResp,
            selector,
            options,
            _args16 = arguments;

        return _regenerator.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _ref5 = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : {}, partialFilter = _ref5.partialFilter, indexName = _ref5.indexName;
                indexDef = {
                  index: {
                    fields: fields
                  }
                };

                if (indexName) {
                  indexDef.ddoc = indexName;
                }

                if (partialFilter) {
                  indexDef.index.partial_filter_selector = partialFilter;
                }

                _context16.prev = 4;
                _context16.next = 7;
                return this.stackClient.fetchJSON('POST', (0, _utils.uri)(_templateObject7(), this.doctype), indexDef);

              case 7:
                resp = _context16.sent;
                _context16.next = 17;
                break;

              case 10:
                _context16.prev = 10;
                _context16.t0 = _context16["catch"](4);

                if ((0, _Collection.isIndexConflictError)(_context16.t0)) {
                  _context16.next = 16;
                  break;
                }

                throw _context16.t0;

              case 16:
                return _context16.abrupt("return");

              case 17:
                indexResp = {
                  id: resp.id,
                  fields: fields
                };

                if (!(resp.result === 'exists')) {
                  _context16.next = 20;
                  break;
                }

                return _context16.abrupt("return", indexResp);

              case 20:
                // indexes might not be usable right after being created; so we delay the resolving until they are
                selector = {};
                fields.forEach(function (f) {
                  return selector[f] = {
                    $gt: null
                  };
                });
                options = {
                  indexId: indexResp.id,
                  limit: 1,
                  partialFilterFields: partialFilter ? (0, _mangoIndex.getIndexFields)({
                    partialFilter: partialFilter
                  }) : null
                };
                _context16.next = 25;
                return (0, _utils.attempt)(this.find(selector, options));

              case 25:
                if (!_context16.sent) {
                  _context16.next = 27;
                  break;
                }

                return _context16.abrupt("return", indexResp);

              case 27:
                _context16.next = 29;
                return (0, _utils.sleep)(1000);

              case 29:
                _context16.next = 31;
                return (0, _utils.attempt)(this.find(selector, options));

              case 31:
                if (!_context16.sent) {
                  _context16.next = 33;
                  break;
                }

                return _context16.abrupt("return", indexResp);

              case 33:
                _context16.next = 35;
                return (0, _utils.sleep)(500);

              case 35:
                return _context16.abrupt("return", indexResp);

              case 36:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this, [[4, 10]]);
      }));

      function createIndex(_x21) {
        return _createIndex.apply(this, arguments);
      }

      return createIndex;
    }()
    /**
     * Retrieve all design docs of mango indexes
     *
     * @returns {Promise<DesignDoc[]>} The design docs
     */

  }, {
    key: "fetchAllMangoIndexes",
    value: function () {
      var _fetchAllMangoIndexes = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee17() {
        var path, indexes;
        return _regenerator.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                path = (0, _utils.uri)(_templateObject8(), this.doctype);
                _context17.next = 3;
                return this.stackClient.fetchJSON('GET', path);

              case 3:
                indexes = _context17.sent;
                return _context17.abrupt("return", indexes.rows.filter(function (index) {
                  return index.doc.language === 'query';
                }).map(function (doc) {
                  return (0, _mangoIndex.normalizeDesignDoc)(doc);
                }));

              case 5:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function fetchAllMangoIndexes() {
        return _fetchAllMangoIndexes.apply(this, arguments);
      }

      return fetchAllMangoIndexes;
    }()
    /**
     * Delete the specified design doc
     *
     * @param {DesignDoc} index - The design doc to remove
     * @returns {Promise<object>} The delete response
     */

  }, {
    key: "destroyIndex",
    value: function () {
      var _destroyIndex = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee18(index) {
        var ddoc, rev, path;
        return _regenerator.default.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                ddoc = index._id.split('/')[1];
                rev = index._rev;
                path = (0, _utils.uri)(_templateObject9(), this.doctype, ddoc, rev);
                return _context18.abrupt("return", this.stackClient.fetchJSON('DELETE', path));

              case 4:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function destroyIndex(_x22) {
        return _destroyIndex.apply(this, arguments);
      }

      return destroyIndex;
    }()
    /**
     * Copy an existing design doc.
     *
     * This is useful to create a new design doc without
     * having to recompute the existing index.
     *
     * @param {DesignDoc} existingIndex - The design doc to copy
     * @param {string} newIndexName - The name of the copy
     * @returns {Promise<DesignDoc>} The copy response
     */

  }, {
    key: "copyIndex",
    value: function () {
      var _copyIndex = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee19(existingIndex, newIndexName) {
        var ddoc, rev, path, options;
        return _regenerator.default.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                ddoc = existingIndex._id.split('/')[1];
                rev = existingIndex._rev;
                path = (0, _utils.uri)(_templateObject10(), this.doctype, ddoc, rev);
                options = {
                  headers: {
                    Destination: "_design/".concat(newIndexName)
                  }
                };
                return _context19.abrupt("return", this.stackClient.fetchJSON('POST', path, null, options));

              case 5:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function copyIndex(_x23, _x24) {
        return _copyIndex.apply(this, arguments);
      }

      return copyIndex;
    }()
    /**
     * Find an existing mango index based on the query definition
     *
     * This is useful to avoid creating new indexes having the
     * same definition of an existing one.
     *
     * @param {MangoSelector}     selector  The query selector
     * @param {MangoQueryOptions} options   The find options
     *
     * @returns {Promise<DesignDoc>} A matching index if it exists
     * @private
     */

  }, {
    key: "findExistingIndex",
    value: function () {
      var _findExistingIndex = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee20(selector, options) {
        var sort, indexedFields, partialFilter, indexes, fieldsToIndex, existingIndex;
        return _regenerator.default.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                sort = options.sort, indexedFields = options.indexedFields, partialFilter = options.partialFilter;
                _context20.next = 3;
                return this.fetchAllMangoIndexes();

              case 3:
                indexes = _context20.sent;

                if (!(indexes.length < 1)) {
                  _context20.next = 6;
                  break;
                }

                return _context20.abrupt("return", null);

              case 6:
                sort = (0, _mangoIndex.transformSort)(sort);
                fieldsToIndex = indexedFields ? indexedFields : (0, _mangoIndex.getIndexFields)({
                  sort: sort,
                  selector: selector
                });
                existingIndex = indexes.find(function (index) {
                  return (0, _mangoIndex.isMatchingIndex)(index, fieldsToIndex, partialFilter);
                });
                return _context20.abrupt("return", existingIndex);

              case 10:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));

      function findExistingIndex(_x25, _x26) {
        return _findExistingIndex.apply(this, arguments);
      }

      return findExistingIndex;
    }()
    /**
     * Calls _changes route from CouchDB
     * No further treatment is done contrary to fetchchanges
     *
     * @param {object} couchOptions - Couch options for changes https://kutt.it/5r7MNQ
     * @param {string} [couchOptions.since] - Bookmark telling CouchDB from which point in time should changes be returned
     * @param {Array<string>} [couchOptions.doc_ids] - Only return changes for a subset of documents
     * @param {boolean} [couchOptions.includeDocs] - Includes full documents as part of results
     * @param {string} [couchOptions.filter] - Filter
     * @see https://docs.couchdb.org/en/stable/api/database/changes.html
     */

  }, {
    key: "fetchChangesRaw",
    value: function () {
      var _fetchChangesRaw = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee21(couchOptions) {
        var hasDocIds, urlParams, method, endpoint, params, result;
        return _regenerator.default.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                hasDocIds = couchOptions.doc_ids && couchOptions.doc_ids.length > 0;
                urlParams = "?".concat([_qs.default.stringify(_objectSpread(_objectSpread({}, (0, _omit.default)(couchOptions, ['doc_ids', 'includeDocs'])), {}, {
                  include_docs: couchOptions.includeDocs
                })), hasDocIds && couchOptions.filter === undefined ? 'filter=_doc_ids' : undefined].filter(Boolean).join('&'));
                method = hasDocIds ? 'POST' : 'GET';
                endpoint = "/data/".concat(this.doctype, "/_changes").concat(urlParams);
                params = hasDocIds ? {
                  doc_ids: couchOptions.doc_ids
                } : undefined;
                _context21.next = 7;
                return this.stackClient.fetchJSON(method, endpoint, params);

              case 7:
                result = _context21.sent;
                return _context21.abrupt("return", result);

              case 9:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this);
      }));

      function fetchChangesRaw(_x27) {
        return _fetchChangesRaw.apply(this, arguments);
      }

      return fetchChangesRaw;
    }()
    /**
     * Use Couch _changes API
     * Deleted and design docs are filtered by default, thus documents are retrieved in the response
     * (include_docs is set to true in the parameters of _changes).
     *
     * You should use fetchChangesRaw to have low level control on _changes parameters.
     *
     * @param {object} couchOptions - Couch options for changes
     * @param {string} [couchOptions.since] - Bookmark telling CouchDB from which point in time should changes be returned
     * @param {Array<string>} [couchOptions.doc_ids] - Only return changes for a subset of documents
     *
     * @param {object} options - Further options on the returned documents. By default, it is set to { includeDesign: false, includeDeleted: false }
     * @param {boolean} [options.includeDesign] - Whether to include changes from design docs (needs include_docs to be true)
     * @param {boolean} [options.includeDeleted] - Whether to include changes for deleted documents (needs include_docs to be true)
     *
     * @typedef {object} FetchChangesReturnValue
     * @property {string} newLastSeq
     * @property {Array<object>} documents
     * @returns {Promise<FetchChangesReturnValue>}
     */

  }, {
    key: "fetchChanges",
    value: function () {
      var _fetchChanges = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee22() {
        var _this4 = this;

        var couchOptions,
            options,
            opts,
            result,
            newLastSeq,
            docs,
            _args22 = arguments;
        return _regenerator.default.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                couchOptions = _args22.length > 0 && _args22[0] !== undefined ? _args22[0] : {};
                options = _args22.length > 1 && _args22[1] !== undefined ? _args22[1] : {};
                opts = {
                  // Necessary since we deal with deleted and design docs later
                  includeDocs: true
                };

                if (typeof couchOptions !== 'object') {
                  opts.since = couchOptions;

                  _logger.default.warn("fetchChanges use couchOptions as Object not a string, since is deprecated, please use fetchChanges({since: \"".concat(couchOptions, "\"})."));
                } else if (Object.keys(couchOptions).length > 0) {
                  Object.assign(opts, couchOptions);
                }

                _context22.next = 6;
                return this.fetchChangesRaw(opts);

              case 6:
                result = _context22.sent;
                newLastSeq = result.last_seq;
                docs = result.results.map(function (x) {
                  return x.doc;
                }).filter(Boolean);

                if (!options.includeDesign) {
                  docs = docs.filter(function (doc) {
                    return doc._id.indexOf('_design') !== 0;
                  });
                }

                if (!options.includeDeleted) {
                  docs = docs.filter(function (doc) {
                    return !doc._deleted;
                  });
                }

                return _context22.abrupt("return", {
                  newLastSeq: newLastSeq,
                  documents: docs.map(function (doc) {
                    return (0, _normalize.normalizeDoc)(doc, _this4.doctype);
                  })
                });

              case 12:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));

      function fetchChanges() {
        return _fetchChanges.apply(this, arguments);
      }

      return fetchChanges;
    }()
  }], [{
    key: "normalizeDoctype",
    value: function normalizeDoctype(doctype) {
      return (0, _normalize.normalizeDoctypeRawApi)(doctype);
    }
  }]);
  return DocumentCollection;
}();

var _default = DocumentCollection;
exports.default = _default;