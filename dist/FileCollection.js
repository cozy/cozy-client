"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.isDirectory = exports.isFile = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lite = _interopRequireDefault(require("mime/lite"));

var _has = _interopRequireDefault(require("lodash/has"));

var _get = _interopRequireDefault(require("lodash/get"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _pick = _interopRequireDefault(require("lodash/pick"));

var _mangoIndex = require("./mangoIndex");

var _DocumentCollection2 = _interopRequireDefault(require("./DocumentCollection"));

var _normalize = require("./normalize");

var _utils = require("./utils");

var _errors = require("./errors");

var _Collection = require("./Collection");

var _getIllegalCharacter = require("./getIllegalCharacter");

var querystring = _interopRequireWildcard(require("./querystring"));

var _logger = _interopRequireDefault(require("./logger"));

function _templateObject25() {
  var data = (0, _taggedTemplateLiteral2.default)(["/files/_changes"]);

  _templateObject25 = function _templateObject25() {
    return data;
  };

  return data;
}

function _templateObject24() {
  var data = (0, _taggedTemplateLiteral2.default)(["/data/", "/", "/relationships/not_synchronizing"]);

  _templateObject24 = function _templateObject24() {
    return data;
  };

  return data;
}

function _templateObject23() {
  var data = (0, _taggedTemplateLiteral2.default)(["/data/", "/", "/relationships/not_synchronizing"]);

  _templateObject23 = function _templateObject23() {
    return data;
  };

  return data;
}

function _templateObject22() {
  var data = (0, _taggedTemplateLiteral2.default)(["/data/", "/", "/relationships/not_synchronizing"]);

  _templateObject22 = function _templateObject22() {
    return data;
  };

  return data;
}

function _templateObject21() {
  var data = (0, _taggedTemplateLiteral2.default)(["/files/", "/versions"]);

  _templateObject21 = function _templateObject21() {
    return data;
  };

  return data;
}

function _templateObject20() {
  var data = (0, _taggedTemplateLiteral2.default)(["/files/upload/metadata"]);

  _templateObject20 = function _templateObject20() {
    return data;
  };

  return data;
}

function _templateObject19() {
  var data = (0, _taggedTemplateLiteral2.default)(["/files/", ""]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _templateObject18() {
  var data = (0, _taggedTemplateLiteral2.default)(["/files/", "?Name=", "&Type=directory&MetadataID=", ""]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = (0, _taggedTemplateLiteral2.default)(["/files/metadata?Path=", ""]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = (0, _taggedTemplateLiteral2.default)(["/files/", ""]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = (0, _taggedTemplateLiteral2.default)(["/files/downloads?Path=", ""]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = (0, _taggedTemplateLiteral2.default)(["/files/downloads?VersionId=", "&Filename=", ""]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = (0, _taggedTemplateLiteral2.default)(["/files/downloads?Id=", "&Filename=", ""]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = (0, _taggedTemplateLiteral2.default)(["/files/", "?Name=", "&Type=file&Executable=", "&Encrypted=", ""]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = (0, _taggedTemplateLiteral2.default)(["/files/", "?Name=", "&Type=file&Executable=", "&Encrypted=", "&MetadataID=", "&Size=", "&SourceAccount=", "&SourceAccountIdentifier=", ""]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2.default)(["/files/", ""]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2.default)(["/files/", "/copy"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["/files/trash/", ""]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["/files/", ""]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["/data/", "/", "/relationships/references"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["/data/", "/", "/relationships/references"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["/files/", "/relationships/referenced_by"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["/files/", "/relationships/referenced_by"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["/data/", "/", "/relationships/references"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["/files/_all_docs?include_docs=true"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * @typedef {object} IOCozyFolder Folder
 */

/**
 * @typedef {object} SpecificFileAttributesForKonnector Specific file attributes for creation for konnector
 * @property {string} sourceAccount the id of the source account used by a konnector
 * @property {string} sourceAccountIdentifier the unique identifier of the account targeted by the connector
 */

/**
 * Cursor used for Mango queries pagination
 *
 * @typedef {Array<string>|string} ViewKey
 * @typedef {string} DocId
 * @typedef {Array<*> & {0: ViewKey, 1: DocId}} CouchDBViewCursor
 */

/**
 * Attributes used for directory creation
 *
 * @typedef {object} DirectoryAttributes
 * @property {string} dirId - Id of the parent directory.
 * @property {boolean} name - Name of the created directory.
 * @property {boolean} executable - Indicates whether the file will be executable.
 * @property {object} [metadata] io.cozy.files.metadata to attach to the directory
 */

/**
 * Attributes used for file creation
 *
 * @typedef {object} FileAttributes
 * @property {string} id - Id of the document
 * @property {string} _id - Id of the document
 * @property {string} dirId - Id of the parent directory.
 * @property {string} name - Name of the created file.
 * @property {Date} lastModifiedDate - Can be used to set the last modified date of a file.
 * @property {boolean} executable - Whether or not the file is executable
 * @property {boolean} encrypted - Whether or not the file is client-side encrypted
 * @property {object} metadata io.cozy.files.metadata to attach to the file
 */

/**
 * Document representing a io.cozy.files
 *
 * @typedef {object} FileDocument
 * @property {string} _id - Id of the file
 * @property {string} _rev - Rev of the file
 * @property {FileAttributes} attributes - Attributes of the file
 * @property {object} meta - Meta
 * @property {object} relationships - Relationships
 * @property {object} referenced_by - Referenced by
 */

/**
 * Stream is not defined in a browser, but is on NodeJS environment
 *
 * @typedef {object} Stream
 */

/**
 * Document representing a io.cozy.oauth.clients
 *
 * @typedef {object} OAuthClient
 * @property {string} _id - Id of the client
 * @property {string} _type - Doctype of the client (i.e. io.cozy.oauth.clients)
 */
var ROOT_DIR_ID = 'io.cozy.files.root-dir';
var CONTENT_TYPE_OCTET_STREAM = 'application/octet-stream';
var normalizeFileJsonApi = (0, _normalize.normalizeDoctypeJsonApi)('io.cozy.files');
/**
 * Normalize a file, adding document's doctype if needed
 *
 * @param  {FileDocument} file - File to normalize
 * @returns {FileDocument} normalized file
 * @private
 */

var normalizeFile = function normalizeFile(file) {
  var _file$meta;

  return _objectSpread(_objectSpread({}, normalizeFileJsonApi(file)), {}, {
    _rev: file === null || file === void 0 ? void 0 : (_file$meta = file.meta) === null || _file$meta === void 0 ? void 0 : _file$meta.rev // Beware of JSON-API

  });
};
/**
 * Normalize references, expliciting _type and _id — see https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/
 *
 * @param  {Array<object>} references - The list of files referenced by a document to normalize
 * @returns {Array<object>} the data attribute of the normalized references
 * @private
 */


var normalizeReferences = function normalizeReferences(references) {
  return references ? references.map(function (ref) {
    return {
      _type: ref.type,
      _id: ref.id
    };
  }) : [];
};
/**
 * Sanitize the file name by trimming spaces
 *
 * @param {string} name - The file name to trim
 * @returns {string} the trimmed file name
 * @private
 */


var sanitizeFileName = function sanitizeFileName(name) {
  return name && name.trim();
};
/**
 * Sanitize and validate the file name - throw errors according to case
 *
 * @param {string} name - The file name
 * @returns {string} the trimmed safe file name
 * @throws {Error} - explaining reason why file name is not valid
 * @private
 */


var sanitizeAndValidateFileName = function sanitizeAndValidateFileName(name) {
  var safeName = sanitizeFileName(name);

  if (typeof safeName !== 'string' || safeName === '') {
    throw new Error('Missing name argument');
  }

  if (name === '.' || name === '..') {
    throw new Error("Invalid filename: ".concat(name));
  }

  var illegalCharacters = (0, _getIllegalCharacter.getIllegalCharacters)(safeName);

  if (illegalCharacters.length) {
    throw new Error("Invalid filename containing illegal character(s): ".concat(illegalCharacters));
  }

  return safeName;
};
/**
 * Returns true when parameter has type directory, file or has _type io.cozy.files
 *
 * @param {object} doc - The document whose type is checked
 * @param {string} [doc._type] - The document's doctype
 * @param {'directory'|'file'} [doc.type] - The io.cozy-files document type
 *
 * @returns {boolean} true when objects has type directory, file or has _type io.cozy.files or false
 */


var isFile = function isFile(_ref) {
  var _type = _ref._type,
      type = _ref.type;
  return _type === 'io.cozy.files' || type === 'directory' || type === 'file';
};
/**
 * Returns true when parameters has type directory
 *
 * @param {object} args File
 * @param {string} args.type - The type of the file
 * @returns {boolean} true when parameters has type directory or false
 */


exports.isFile = isFile;

var isDirectory = function isDirectory(_ref2) {
  var type = _ref2.type;
  return type === 'directory';
};

exports.isDirectory = isDirectory;

var raceWithCondition = function raceWithCondition(promises, predicate) {
  return new Promise(function (resolve) {
    promises.forEach(function (p) {
      return p.then(function (res) {
        if (predicate(res)) {
          resolve(true);
        }
      });
    });
    Promise.all(promises).then(function () {
      return resolve(false);
    });
  });
};

var dirName = function dirName(path) {
  var lastIndex = path.lastIndexOf('/');
  return path.substring(0, lastIndex);
};
/**
 * Implements `DocumentCollection` API along with specific methods for
 * `io.cozy.files`.
 *
 * Files are a special type of documents and are handled differently by the stack:
 * special routes are to be used, and there is a notion of referenced files, aka
 * files associated to a specific document
 */


var FileCollection = /*#__PURE__*/function (_DocumentCollection) {
  (0, _inherits2.default)(FileCollection, _DocumentCollection);

  var _super = _createSuper(FileCollection);

  function FileCollection(doctype, stackClient) {
    var _this;

    (0, _classCallCheck2.default)(this, FileCollection);
    _this = _super.call(this, doctype, stackClient);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "extractResponseLinkRelated", function (res) {
      var href = res.links && res.links.related;
      if (!href) throw new Error('No related link in server response');
      return _this.stackClient.fullpath(href);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "forceFileDownload", function (href, filename) {
      (0, _utils.forceDownload)(href, filename);
    });
    _this.specialDirectories = {};
    return _this;
  }
  /**
   * Fetches the file's data
   *
   * @param {string} id File id
   * @returns {{data, included}} Information about the file or folder and it's descendents
   */


  (0, _createClass2.default)(FileCollection, [{
    key: "get",
    value: function get(id) {
      return this.statById(id);
    }
    /**
     * Get all files by their ids
     *
     * @param {Array<string>} ids - files ids
     * @returns {Promise<{data, meta, execution_stats}>} JSON API response
     */

  }, {
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(ids) {
        var resp;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.stackClient.fetchJSON('POST', (0, _utils.uri)(_templateObject()), {
                  keys: ids
                });

              case 3:
                resp = _context.sent;
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", (0, _Collection.dontThrowNotFoundError)(_context.t0));

              case 9:
                return _context.abrupt("return", {
                  data: resp.data.map(function (f) {
                    return normalizeFile(f);
                  }),
                  meta: {
                    count: resp.data.length
                  },
                  execution_stats: resp.execution_stats
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 6]]);
      }));

      function getAll(_x) {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "fetchFindFiles",
    value: function () {
      var _fetchFindFiles = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(selector, options) {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.stackClient.fetchJSON('POST', '/files/_find', this.toMangoOptions(selector, options)));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchFindFiles(_x2, _x3) {
        return _fetchFindFiles.apply(this, arguments);
      }

      return fetchFindFiles;
    }()
    /**
     * Returns a filtered list of documents using a Mango selector.
     *
     * The returned documents are paginated by the stack.
     *
     * @param {object}            selector  The Mango selector.
     * @param {MangoQueryOptions} options   The query options
     * @returns {Promise<{data, meta, skip, next, bookmark, execution_stats}>} The JSON API conformant response.
     * @throws {FetchError}
     */

  }, {
    key: "find",
    value: function () {
      var _find = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(selector) {
        var options,
            _options$skip,
            skip,
            resp,
            path,
            nextLink,
            nextLinkURL,
            nextBookmark,
            _args3 = arguments;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
                _options$skip = options.skip, skip = _options$skip === void 0 ? 0 : _options$skip;
                _context3.prev = 2;
                path = '/files/_find';
                _context3.next = 6;
                return this.findWithMango(path, selector, options);

              case 6:
                resp = _context3.sent;
                _context3.next = 12;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](2);
                return _context3.abrupt("return", (0, _Collection.dontThrowNotFoundError)(_context3.t0));

              case 12:
                nextLink = (0, _get.default)(resp, 'links.next', '');
                nextLinkURL = new URL("".concat(this.stackClient.uri).concat(nextLink));
                nextBookmark = nextLinkURL.searchParams.get('page[cursor]');
                return _context3.abrupt("return", {
                  data: resp.data.map(function (f) {
                    return normalizeFile(f);
                  }),
                  meta: resp.meta,
                  next: resp.meta.count > skip + resp.data.length,
                  skip: skip,
                  bookmark: nextBookmark || undefined,
                  execution_stats: resp.meta.execution_stats
                });

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 9]]);
      }));

      function find(_x4) {
        return _find.apply(this, arguments);
      }

      return find;
    }()
    /**
     * async findReferencedBy - Returns the list of files referenced by a document — see https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/
     *
     * @param  {object}       document          A JSON representing a document, with at least a `_type` and `_id` field.
     * @param  {object}       options           Additional options
     * @param  {number|null}  [options.skip]    For skip-based pagination, the number of referenced files to skip.
     * @param  {number|null}  [options.limit]   For pagination, the number of results to return.
     * @param  {CouchDBViewCursor|null}  [options.cursor]  For cursor-based pagination, the index cursor.
     * @returns {Promise<{data, included, meta, skip, next}>} The JSON API conformant response.
     */

  }, {
    key: "findReferencedBy",
    value: function () {
      var _findReferencedBy = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(document) {
        var _ref3,
            _ref3$skip,
            skip,
            limit,
            cursor,
            params,
            path,
            url,
            resp,
            _args4 = arguments;

        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _ref3 = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {}, _ref3$skip = _ref3.skip, skip = _ref3$skip === void 0 ? 0 : _ref3$skip, limit = _ref3.limit, cursor = _ref3.cursor;
                params = {
                  include: 'files',
                  'page[limit]': limit,
                  'page[cursor]': cursor,
                  sort: 'datetime'
                };
                path = (0, _utils.uri)(_templateObject2(), document._type, document._id);
                url = querystring.buildURL(path, params);
                _context4.next = 6;
                return this.stackClient.fetchJSON('GET', url);

              case 6:
                resp = _context4.sent;
                return _context4.abrupt("return", {
                  data: normalizeReferences(resp.data),
                  included: resp.included ? resp.included.map(function (f) {
                    return normalizeFile(f);
                  }) : [],
                  next: (0, _has.default)(resp, 'links.next'),
                  meta: resp.meta,
                  skip: skip
                });

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function findReferencedBy(_x5) {
        return _findReferencedBy.apply(this, arguments);
      }

      return findReferencedBy;
    }()
    /**
     *  Add referenced_by documents to a file — see https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/#post-filesfile-idrelationshipsreferenced_by
     *
     *  For example, to have an album referenced by a file:
     * ```
     * addReferencedBy({_id: 123, _type: "io.cozy.files", name: "cozy.jpg"}, [{_id: 456, _type: "io.cozy.photos.albums", name: "Happy Cloud"}])
     * ```
     *
     * @param  {FileDocument} document  A JSON representing the file
     * @param  {Array}  documents       An array of JSON documents having a `_type` and `_id` field.
     * @returns {Promise<{data, meta}>}          The JSON API conformant response.
     */

  }, {
    key: "addReferencedBy",
    value: function () {
      var _addReferencedBy = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(document, documents) {
        var refs, resp;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                refs = documents.map(function (d) {
                  return {
                    id: d._id,
                    type: d._type
                  };
                });
                _context5.next = 3;
                return this.stackClient.fetchJSON('POST', (0, _utils.uri)(_templateObject3(), document._id), {
                  data: refs
                });

              case 3:
                resp = _context5.sent;
                return _context5.abrupt("return", {
                  data: normalizeReferences(resp.data),
                  meta: resp.meta
                });

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function addReferencedBy(_x6, _x7) {
        return _addReferencedBy.apply(this, arguments);
      }

      return addReferencedBy;
    }()
    /**
     *  Remove referenced_by documents from a file — see https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/#delete-filesfile-idrelationshipsreferenced_by
     *
     *  For example, to remove an album reference from a file:
     * ```
     *  removeReferencedBy({_id: 123, _type: "io.cozy.files", name: "cozy.jpg"}, [{_id: 456, _type: "io.cozy.photos.albums", name: "Happy Cloud"}])
     * ```
     *
     * @param  {object} document        A JSON representing the file
     * @param  {Array}  documents       An array of JSON documents having a `_type` and `_id` field.
     * @returns {Promise<{data, meta}>}          The JSON API conformant response.
     */

  }, {
    key: "removeReferencedBy",
    value: function () {
      var _removeReferencedBy = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(document, documents) {
        var refs, resp;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                refs = documents.map(function (d) {
                  return {
                    id: d._id || d.id,
                    type: d._type || d.type
                  };
                });
                _context6.next = 3;
                return this.stackClient.fetchJSON('DELETE', (0, _utils.uri)(_templateObject4(), document._id || document.id), {
                  data: refs
                });

              case 3:
                resp = _context6.sent;
                return _context6.abrupt("return", {
                  data: normalizeReferences(resp.data),
                  meta: resp.meta
                });

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function removeReferencedBy(_x8, _x9) {
        return _removeReferencedBy.apply(this, arguments);
      }

      return removeReferencedBy;
    }()
    /**
     *  Add files references to a document — see https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/#post-datatypedoc-idrelationshipsreferences
     *
     *  For example, to add a photo to an album:
     * ```
     *  addReferencesTo({_id: 456, _type: "io.cozy.photos.albums", name: "Happy Cloud"}, [{_id: 123, _type: "io.cozy.files", name: "cozy.jpg"}])
     * ```
     *
     * @param  {object} document        A JSON representing a document, with at least a `_type` and `_id` field.
     * @param  {Array}  documents       An array of JSON files having an `_id` field.
     *
     * Returns 204 No Content
     */

  }, {
    key: "addReferencesTo",
    value: function () {
      var _addReferencesTo = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(document, documents) {
        var refs;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                refs = documents.map(function (d) {
                  return {
                    id: d._id,
                    type: 'io.cozy.files'
                  };
                });
                return _context7.abrupt("return", this.stackClient.fetchJSON('POST', (0, _utils.uri)(_templateObject5(), document._type, document._id), {
                  data: refs
                }));

              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function addReferencesTo(_x10, _x11) {
        return _addReferencesTo.apply(this, arguments);
      }

      return addReferencesTo;
    }()
    /**
     *  Remove files references to a document — see https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/#delete-datatypedoc-idrelationshipsreferences
     *
     *  For example, to remove a photo from an album:
     * ```
     *  removeReferencesTo({_id: 456, _type: "io.cozy.photos.albums", name: "Happy Cloud"}, [{_id: 123, _type: "io.cozy.files", name: "cozy.jpg"}])
     * ```
     *
     * @param  {object} document        A JSON representing a document, with at least a `_type` and `_id` field.
     * @param  {Array}  documents       An array of JSON files having an `_id` field.
     *
     * Returns 204 No Content
     */

  }, {
    key: "removeReferencesTo",
    value: function () {
      var _removeReferencesTo = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(document, documents) {
        var refs;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                refs = documents.map(function (d) {
                  return {
                    id: d._id,
                    type: 'io.cozy.files'
                  };
                });
                return _context8.abrupt("return", this.stackClient.fetchJSON('DELETE', (0, _utils.uri)(_templateObject6(), document._type, document._id), {
                  data: refs
                }));

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function removeReferencesTo(_x12, _x13) {
        return _removeReferencesTo.apply(this, arguments);
      }

      return removeReferencesTo;
    }()
    /**
     * Sends file to trash and removes references to it
     *
     * @param  {FileDocument} file - File that will be sent to trash
     * @returns {Promise} - Resolves when references have been removed
     * and file has been sent to trash
     */

  }, {
    key: "destroy",
    value: function () {
      var _destroy = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9(file) {
        var _ref4,
            _ref4$ifMatch,
            ifMatch,
            _id,
            relationships,
            resp,
            references,
            _args9 = arguments;

        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _ref4 = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : {}, _ref4$ifMatch = _ref4.ifMatch, ifMatch = _ref4$ifMatch === void 0 ? '' : _ref4$ifMatch;
                _id = file._id, relationships = file.relationships;
                _context9.next = 4;
                return this.stackClient.fetchJSON('DELETE', (0, _utils.uri)(_templateObject7(), _id), undefined, {
                  headers: {
                    'If-Match': ifMatch
                  }
                });

              case 4:
                resp = _context9.sent;
                // needed because we had a bug in cozy-stack https://github.com/cozy/cozy-stack/pull/3566
                // to remove once the code is deployed everywhere
                references = (0, _get.default)(relationships, 'referenced_by.data', file.referenced_by);

                if (!Array.isArray(references)) {
                  _context9.next = 9;
                  break;
                }

                _context9.next = 9;
                return this.removeReferencedBy(file, references);

              case 9:
                return _context9.abrupt("return", {
                  data: normalizeFile(resp.data)
                });

              case 10:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function destroy(_x14) {
        return _destroy.apply(this, arguments);
      }

      return destroy;
    }()
    /**
     * Empty the Trash
     */

  }, {
    key: "emptyTrash",
    value: function emptyTrash() {
      return this.stackClient.fetchJSON('DELETE', '/files/trash');
    }
    /**
     * Restores a trashed file.
     *
     * @param {string} id   - The file's id
     * @returns {Promise}   - A promise that returns the restored file if resolved.
     * @throws {FetchError}
     *
     */

  }, {
    key: "restore",
    value: function restore(id) {
      return this.stackClient.fetchJSON('POST', (0, _utils.uri)(_templateObject8(), id));
    }
    /**
     * Copy a file.
     *
     * @param {string} id   - The file's id
     * @param {string} [name]   - The file copy name
     * @param {string} [dirId]   - The destination directory id
     * @returns {Promise<object>}   - A promise that returns the copied file if resolved.
     * @throws {FetchError}
     *
     */

  }, {
    key: "copy",
    value: function () {
      var _copy = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10(id, name, dirId) {
        var params, path, url, resp;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                params = {
                  name: name === undefined ? undefined : sanitizeAndValidateFileName(name),
                  DirID: dirId
                };
                path = (0, _utils.uri)(_templateObject9(), id);
                url = querystring.buildURL(path, params);
                _context10.next = 5;
                return this.stackClient.fetchJSON('POST', url);

              case 5:
                resp = _context10.sent;
                return _context10.abrupt("return", {
                  data: normalizeFile(resp.data)
                });

              case 7:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function copy(_x15, _x16, _x17) {
        return _copy.apply(this, arguments);
      }

      return copy;
    }()
    /**
     * async deleteFilePermanently - Definitely delete a file
     *
     * @param  {string} id - The id of the file to delete
     * @returns {Promise<object>} The deleted file object
     */

  }, {
    key: "deleteFilePermanently",
    value: function () {
      var _deleteFilePermanently = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11(id) {
        var resp;
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return this.stackClient.fetchJSON('PATCH', (0, _utils.uri)(_templateObject10(), id), {
                  data: {
                    type: 'io.cozy.files',
                    id: id,
                    attributes: {
                      permanent_delete: true
                    }
                  }
                });

              case 2:
                resp = _context11.sent;
                return _context11.abrupt("return", resp.data);

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function deleteFilePermanently(_x18) {
        return _deleteFilePermanently.apply(this, arguments);
      }

      return deleteFilePermanently;
    }()
    /**
     * @param {File|Blob|Stream|string|ArrayBuffer} data file to be uploaded
     * @param {string} dirPath Path to upload the file to. ie : /Administative/XXX/
     * @returns {Promise<object>} Created io.cozy.files
     */

  }, {
    key: "upload",
    value: function () {
      var _upload = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12(data, dirPath) {
        var dirId;
        return _regenerator.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this.ensureDirectoryExists(dirPath);

              case 2:
                dirId = _context12.sent;
                return _context12.abrupt("return", this.createFile(data, {
                  dirId: dirId
                }));

              case 4:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function upload(_x19, _x20) {
        return _upload.apply(this, arguments);
      }

      return upload;
    }()
    /**
     * Creates directory or file.
     * - Used by StackLink to support CozyClient.create('io.cozy.files', options)
     *
     * @param {FileAttributes|DirectoryAttributes} attributes - Attributes of the created file/directory
     * @param {File|Blob|string|ArrayBuffer} attributes.data Will be used as content of the created file
     * @throws {Error} - explaining reason why creation failed
     */

  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13(attributes) {
        var data, createFileOptions;
        return _regenerator.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                if (!(attributes.type === 'directory')) {
                  _context13.next = 4;
                  break;
                }

                return _context13.abrupt("return", this.createDirectory(attributes));

              case 4:
                data = attributes.data, createFileOptions = (0, _objectWithoutProperties2.default)(attributes, ["data"]);
                return _context13.abrupt("return", this.createFile(data, createFileOptions));

              case 6:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function create(_x21) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
    /***
     * Updates an existing file or directory
     *
     * Used by StackLink to support CozyClient.save({file}).
     * Update the binary file if a `data` param is passed. Only updates
     * attributes otherwise.
     * @param {object} attributes
     * @param {FileAttributes} attributes.file - The file with its new content
     * @param {File|Blob|string|ArrayBuffer} attributes.data Will be used as content of the updated file
     * @returns {Promise<FileAttributes>} Updated document
     * @throws {Error} - explaining reason why update failed
     */

  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee14(attributes) {
        var data, updateFileOptions, fileId;
        return _regenerator.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                data = attributes.data, updateFileOptions = (0, _objectWithoutProperties2.default)(attributes, ["data"]);
                fileId = attributes.id || attributes._id;

                if (!data) {
                  _context14.next = 7;
                  break;
                }

                if (!(attributes.type === 'directory')) {
                  _context14.next = 5;
                  break;
                }

                throw new Error('You cannot pass a data object for a directory');

              case 5:
                updateFileOptions.fileId = fileId;
                return _context14.abrupt("return", this.updateFile(data, updateFileOptions));

              case 7:
                return _context14.abrupt("return", this.updateAttributes(fileId, attributes));

              case 8:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function update(_x22) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
    /**
     * Creates a file
     *
     *
     * @private
     * @param {File|Blob|Stream|string|ArrayBuffer} data file to be uploaded
     * @param {FileAttributes & SpecificFileAttributesForKonnector} params Additional parameters
     * @param  {object}  params.options     Options to pass to doUpload method (additional headers)
     * @throws {Error} - explaining reason why creation failed
     */

  }, {
    key: "createFile",
    value: function () {
      var _createFile = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee15(data) {
        var _ref5,
            nameOption,
            _ref5$dirId,
            dirId,
            _ref5$executable,
            executable,
            _ref5$encrypted,
            encrypted,
            metadata,
            _ref5$sourceAccount,
            sourceAccount,
            _ref5$sourceAccountId,
            sourceAccountIdentifier,
            options,
            name,
            metadataId,
            meta,
            size,
            path,
            _args15 = arguments;

        return _regenerator.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _ref5 = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : {};
                nameOption = _ref5.name, _ref5$dirId = _ref5.dirId, dirId = _ref5$dirId === void 0 ? '' : _ref5$dirId, _ref5$executable = _ref5.executable, executable = _ref5$executable === void 0 ? false : _ref5$executable, _ref5$encrypted = _ref5.encrypted, encrypted = _ref5$encrypted === void 0 ? false : _ref5$encrypted, metadata = _ref5.metadata, _ref5$sourceAccount = _ref5.sourceAccount, sourceAccount = _ref5$sourceAccount === void 0 ? '' : _ref5$sourceAccount, _ref5$sourceAccountId = _ref5.sourceAccountIdentifier, sourceAccountIdentifier = _ref5$sourceAccountId === void 0 ? '' : _ref5$sourceAccountId, options = (0, _objectWithoutProperties2.default)(_ref5, ["name", "dirId", "executable", "encrypted", "metadata", "sourceAccount", "sourceAccountIdentifier"]);
                name = nameOption; // handle case where data is a file and contains the name

                if (!name && typeof data.name === 'string') {
                  name = data.name;
                }

                name = sanitizeAndValidateFileName(name);
                metadataId = '';

                if (!metadata) {
                  _context15.next = 11;
                  break;
                }

                _context15.next = 9;
                return this.createFileMetadata(metadata);

              case 9:
                meta = _context15.sent;
                metadataId = meta.data.id;

              case 11:
                size = '';

                if (options.contentLength) {
                  size = String(options.contentLength);
                }

                path = (0, _utils.uri)(_templateObject11(), dirId, name, executable, encrypted, metadataId, size, sourceAccount, sourceAccountIdentifier);
                return _context15.abrupt("return", this.doUpload(data, path, options));

              case 15:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function createFile(_x23) {
        return _createFile.apply(this, arguments);
      }

      return createFile;
    }()
    /**
     * updateFile - Updates a file's data
     *
     * @param {File|Blob|Stream|string|ArrayBuffer} data file to be uploaded
     * @param {FileAttributes} params       Additional parameters
     * @param  {object}  params.options     Options to pass to doUpload method (additional headers)
     * @returns {object}                    Updated document
     * @throws {Error} - explaining reason why update failed
     */

  }, {
    key: "updateFile",
    value: function () {
      var _updateFile = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee16(data) {
        var _ref6,
            _ref6$executable,
            executable,
            _ref6$encrypted,
            encrypted,
            fileId,
            _ref6$name,
            name,
            metadata,
            options,
            fileName,
            sanitizedName,
            metadataId,
            path,
            meta,
            size,
            _args16 = arguments;

        return _regenerator.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _ref6 = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : {};
                _ref6$executable = _ref6.executable, executable = _ref6$executable === void 0 ? false : _ref6$executable, _ref6$encrypted = _ref6.encrypted, encrypted = _ref6$encrypted === void 0 ? false : _ref6$encrypted, fileId = _ref6.fileId, _ref6$name = _ref6.name, name = _ref6$name === void 0 ? '' : _ref6$name, metadata = _ref6.metadata, options = (0, _objectWithoutProperties2.default)(_ref6, ["executable", "encrypted", "fileId", "name", "metadata"]);

                if (!(!fileId || typeof fileId !== 'string')) {
                  _context16.next = 4;
                  break;
                }

                throw new Error('missing fileId argument');

              case 4:
                // name might be set in a File object
                fileName = name || data.name;

                if (!(!fileName || typeof fileName !== 'string')) {
                  _context16.next = 7;
                  break;
                }

                throw new Error('missing name in data argument');

              case 7:
                sanitizedName = sanitizeAndValidateFileName(fileName);
                /**
                 * We already use the body to send the content of the file. So we have 2 choices :
                 * Use an object in a query string to send the metadata
                 * create a new header http
                 * In both case, we have a size limitation depending of the browser.
                 *
                 * So we had this current workaround where we create the metadata before
                 * (no size limit since we can use the body for that) and after we use the ID.
                 */

                path = (0, _utils.uri)(_templateObject12(), fileId, sanitizedName, executable, encrypted);

                if (!metadata) {
                  _context16.next = 15;
                  break;
                }

                _context16.next = 12;
                return this.createFileMetadata(metadata);

              case 12:
                meta = _context16.sent;
                metadataId = meta.data.id;
                path = path + "&MetadataID=".concat(metadataId);

              case 15:
                size = '';

                if (options.contentLength) {
                  size = String(options.contentLength);
                  path = path + "&Size=".concat(size);
                }

                return _context16.abrupt("return", this.doUpload(data, path, options, 'PUT'));

              case 18:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function updateFile(_x24) {
        return _updateFile.apply(this, arguments);
      }

      return updateFile;
    }()
  }, {
    key: "getDownloadLinkById",
    value: function getDownloadLinkById(id, filename) {
      return this.stackClient.fetchJSON('POST', (0, _utils.uri)(_templateObject13(), id, encodeURIComponent(filename))).then(this.extractResponseLinkRelated);
    }
  }, {
    key: "getDownloadLinkByRevision",
    value: function getDownloadLinkByRevision(versionId, filename) {
      return this.stackClient.fetchJSON('POST', (0, _utils.uri)(_templateObject14(), versionId, encodeURIComponent(filename))).then(this.extractResponseLinkRelated);
    }
  }, {
    key: "getDownloadLinkByPath",
    value: function getDownloadLinkByPath(path) {
      return this.stackClient.fetchJSON('POST', (0, _utils.uri)(_templateObject15(), path)).then(this.extractResponseLinkRelated);
    }
  }, {
    key: "download",

    /**
     * Download a file or a specific version of the file
     *
     * @param {object} file io.cozy.files object
     * @param {string} versionId Id of the io.cozy.files.version
     * @param {string} filename The name you want for the downloaded file
     *                            (by default the same as the file)
     */
    value: function () {
      var _download = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee17(file) {
        var versionId,
            filename,
            href,
            filenameToUse,
            _args17 = arguments;
        return _regenerator.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                versionId = _args17.length > 1 && _args17[1] !== undefined ? _args17[1] : null;
                filename = _args17.length > 2 && _args17[2] !== undefined ? _args17[2] : undefined;
                filenameToUse = filename ? filename : file.name;
                /**
                 * Passing a filename to forceFileDownload is not enough
                 * for a few browsers since the stack's response header will
                 * not contain that name. Passing the filename to
                 * getDownloadLinkBy{Id,Revision} will ask the stack to
                 * return this filename in its content-disposition
                 * header response
                 */

                if (versionId) {
                  _context17.next = 9;
                  break;
                }

                _context17.next = 6;
                return this.getDownloadLinkById(file._id, filenameToUse);

              case 6:
                href = _context17.sent;
                _context17.next = 12;
                break;

              case 9:
                _context17.next = 11;
                return this.getDownloadLinkByRevision(versionId, filenameToUse);

              case 11:
                href = _context17.sent;

              case 12:
                this.forceFileDownload("".concat(href, "?Dl=1"), filenameToUse);

              case 13:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function download(_x25) {
        return _download.apply(this, arguments);
      }

      return download;
    }()
  }, {
    key: "fetchFileContent",
    value: function () {
      var _fetchFileContent = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee18(id) {
        return _regenerator.default.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _logger.default.warn('FileCollection.fetchFileContent() is deprecated. Use FileCollection.fetchFileContentById() instead');

                return _context18.abrupt("return", this.fetchFileContentById(id));

              case 2:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function fetchFileContent(_x26) {
        return _fetchFileContent.apply(this, arguments);
      }

      return fetchFileContent;
    }()
    /**
     * Fetch the binary of a file or a specific version of a file
     * Useful for instance when you can't download the file directly
     * (via a content-disposition attachement header) and need to store
     * it before doing an operation.
     *
     * @param {string} id Id of the io.cozy.files or io.cozy.files.version
     *
     */

  }, {
    key: "fetchFileContentById",
    value: function () {
      var _fetchFileContentById = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee19(id) {
        return _regenerator.default.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                return _context19.abrupt("return", this.stackClient.fetch('GET', "/files/download/".concat(id)));

              case 1:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function fetchFileContentById(_x27) {
        return _fetchFileContentById.apply(this, arguments);
      }

      return fetchFileContentById;
    }()
    /**
     * Get a beautified size for a given file
     * 1024B => 1KB
     * 102404500404B => 95.37 GB
     *
     * @param {object} file io.cozy.files object
     * @param {number} decimal number of decimal
     */

  }, {
    key: "getBeautifulSize",
    value: function getBeautifulSize(file, decimal) {
      return (0, _utils.formatBytes)(parseInt(file.size), decimal);
    }
    /**
     * Attributes used for create archive link by ids
     *
     * @typedef {object} ArchivePages
     * @property {string} id - Id of the file
     * @property {number} page - The page number. PDF files only (1 is the first page)
     */

    /**
     * Download an archive of the files
     *
     * @param {string[]} fileIds - List of file ids
     * @param {string} [notSecureFilename] - Name of the archive (default: 'files')
     * @param {object} [options] - Additional options
     * @param {ArchivePages[]} [options.pages] - Array of objects, with `id` the file identifier, and `page` the page number (1 is the first page)
     */

  }, {
    key: "downloadArchive",
    value: function () {
      var _downloadArchive = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee20(fileIds, notSecureFilename) {
        var _ref7,
            pages,
            filename,
            href,
            fullpath,
            _args20 = arguments;

        return _regenerator.default.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _ref7 = _args20.length > 2 && _args20[2] !== undefined ? _args20[2] : {}, pages = _ref7.pages;
                filename = notSecureFilename ? (0, _utils.slugify)(notSecureFilename) : 'files';
                _context20.next = 4;
                return this.createArchiveLinkByIds({
                  ids: fileIds,
                  name: filename,
                  pages: pages
                });

              case 4:
                href = _context20.sent;
                fullpath = this.stackClient.fullpath(href);
                this.forceFileDownload(fullpath, filename + '.zip');

              case 7:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));

      function downloadArchive(_x28, _x29) {
        return _downloadArchive.apply(this, arguments);
      }

      return downloadArchive;
    }()
    /**
     * @deprecated Use createArchiveLinkByIds instead
     */

  }, {
    key: "getArchiveLinkByIds",
    value: function () {
      var _getArchiveLinkByIds = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee21(ids) {
        var name,
            resp,
            _args21 = arguments;
        return _regenerator.default.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                name = _args21.length > 1 && _args21[1] !== undefined ? _args21[1] : 'files';

                _logger.default.warn('CozyClient FileCollection getArchiveLinkByIds method is deprecated. Use createArchiveLinkByIds instead');

                _context21.next = 4;
                return this.stackClient.fetchJSON('POST', '/files/archive', {
                  data: {
                    type: 'io.cozy.archives',
                    attributes: {
                      name: name,
                      ids: ids
                    }
                  }
                });

              case 4:
                resp = _context21.sent;
                return _context21.abrupt("return", resp.links.related);

              case 6:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this);
      }));

      function getArchiveLinkByIds(_x30) {
        return _getArchiveLinkByIds.apply(this, arguments);
      }

      return getArchiveLinkByIds;
    }()
    /**
     * Create the archive link for a list of files
     * The generated archive is temporary and is not persisted
     *
     * @param {object} params - Parameters
     * @param {string[]} params.ids - List of file ids
     * @param {string} [params.name] - Name of the archive (default: 'files')
     * @param {ArchivePages[]} [params.pages] - Array of objects, with `id` the file identifier, and `page` the page number (1 is the first page)
     * @returns {Promise<string>} - The archive link
     */

  }, {
    key: "createArchiveLinkByIds",
    value: function () {
      var _createArchiveLinkByIds = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee22(_ref8) {
        var ids, _ref8$name, name, pages, resp;

        return _regenerator.default.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                ids = _ref8.ids, _ref8$name = _ref8.name, name = _ref8$name === void 0 ? 'files' : _ref8$name, pages = _ref8.pages;
                _context22.next = 3;
                return this.stackClient.fetchJSON('POST', '/files/archive', {
                  data: {
                    type: 'io.cozy.archives',
                    attributes: _objectSpread({
                      name: name,
                      ids: ids
                    }, pages && {
                      pages: pages
                    })
                  }
                });

              case 3:
                resp = _context22.sent;
                return _context22.abrupt("return", resp.links.related);

              case 5:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));

      function createArchiveLinkByIds(_x31) {
        return _createArchiveLinkByIds.apply(this, arguments);
      }

      return createArchiveLinkByIds;
    }()
    /**
     * Checks if the file belongs to the parent's hierarchy.
     *
     * @param  {string|object}  child    The file which can either be an id or an object
     * @param  {string|object}  parent   The parent target which can either be an id or an object
     * @returns {boolean}                 Whether the file is a parent's child
     */

  }, {
    key: "isChildOf",
    value: function () {
      var _isChildOf = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee23(child, parent) {
        var _this2 = this;

        var _ref9, childID, childDirID, childPath, _ref10, parentID, childDoc, currPath, targetsPath, newPath;

        return _regenerator.default.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _ref9 = typeof child === 'object' ? child : {
                  _id: child
                }, childID = _ref9._id, childDirID = _ref9.dirID, childPath = _ref9.path;
                _ref10 = typeof parent === 'object' ? parent : {
                  _id: parent
                }, parentID = _ref10._id;

                if (!(childID === parentID || childDirID === parentID)) {
                  _context23.next = 4;
                  break;
                }

                return _context23.abrupt("return", true);

              case 4:
                if (childPath) {
                  _context23.next = 10;
                  break;
                }

                _context23.next = 7;
                return this.statById(childID);

              case 7:
                childDoc = _context23.sent;
                childPath = childDoc.data.path;
                childDirID = childDoc.data.dirID;

              case 10:
                // Build hierarchy paths
                currPath = childPath;
                targetsPath = [childPath];

                while (currPath != '') {
                  newPath = dirName(currPath);

                  if (newPath != '') {
                    targetsPath.push(newPath);
                  }

                  currPath = newPath;
                }

                targetsPath.reverse(); // Look for all hierarchy in parallel and return true as soon as a dir is the searched parent

                return _context23.abrupt("return", raceWithCondition(targetsPath.map(function (path) {
                  return _this2.statByPath(path);
                }), function (stat) {
                  return stat.data._id == parentID;
                }));

              case 15:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }));

      function isChildOf(_x32, _x33) {
        return _isChildOf.apply(this, arguments);
      }

      return isChildOf;
    }()
    /**
     * statById - Fetches the metadata about a document. For folders, the results include the list of child files and folders.
     *
     * @param {string}      id                      ID of the document
     * @param {object|null} options                 Pagination options
     * @param {number|null} [options.page[limit]]   For pagination, the number of results to return.
     * @param {number|null} [options.page[skip]]    For skip-based pagination, the number of referenced files to skip.
     * @param {CouchDBViewCursor|null} [options.page[cursor]]  For cursor-based pagination, the index cursor.
     *
     * @returns {object} A promise resolving to an object containing "data" (the document metadata), "included" (the child documents) and "links" (pagination informations)
     */

  }, {
    key: "statById",
    value: function () {
      var _statById = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee24(id) {
        var options,
            params,
            path,
            url,
            resp,
            _args24 = arguments;
        return _regenerator.default.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                options = _args24.length > 1 && _args24[1] !== undefined ? _args24[1] : {};
                params = (0, _pick.default)(options, ['page[limit]', 'page[skip]', 'page[cursor]']);
                path = (0, _utils.uri)(_templateObject16(), id);
                url = querystring.buildURL(path, params);
                _context24.next = 6;
                return this.stackClient.fetchJSON('GET', url);

              case 6:
                resp = _context24.sent;
                return _context24.abrupt("return", {
                  data: normalizeFile(resp.data),
                  included: resp.included && resp.included.map(function (f) {
                    return normalizeFile(f);
                  }),
                  links: resp.links
                });

              case 8:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this);
      }));

      function statById(_x34) {
        return _statById.apply(this, arguments);
      }

      return statById;
    }()
  }, {
    key: "statByPath",
    value: function () {
      var _statByPath = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee25(path) {
        var resp;
        return _regenerator.default.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                _context25.next = 2;
                return this.stackClient.fetchJSON('GET', (0, _utils.uri)(_templateObject17(), path));

              case 2:
                resp = _context25.sent;
                return _context25.abrupt("return", {
                  data: normalizeFile(resp.data),
                  included: resp.included && resp.included.map(function (f) {
                    return normalizeFile(f);
                  })
                });

              case 4:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this);
      }));

      function statByPath(_x35) {
        return _statByPath.apply(this, arguments);
      }

      return statByPath;
    }()
    /**
     * Create directory
     *
     * @private
     * @param  {DirectoryAttributes} attributes - Attributes of the directory
     * @returns {Promise}
     * @throws {Error} - explaining reason why creation failed
     */

  }, {
    key: "createDirectory",
    value: function () {
      var _createDirectory = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee26() {
        var attributes,
            name,
            dirId,
            lastModifiedDate,
            metadata,
            metadataId,
            meta,
            safeName,
            lastModified,
            resp,
            _args26 = arguments;
        return _regenerator.default.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                attributes = _args26.length > 0 && _args26[0] !== undefined ? _args26[0] : {};
                name = attributes.name, dirId = attributes.dirId, lastModifiedDate = attributes.lastModifiedDate, metadata = attributes.metadata;
                metadataId = '';

                if (!metadata) {
                  _context26.next = 8;
                  break;
                }

                _context26.next = 6;
                return this.createFileMetadata(metadata);

              case 6:
                meta = _context26.sent;
                metadataId = meta.data.id;

              case 8:
                safeName = sanitizeAndValidateFileName(name);
                lastModified = lastModifiedDate && (typeof lastModifiedDate === 'string' ? new Date(lastModifiedDate) : lastModifiedDate);
                _context26.next = 12;
                return this.stackClient.fetchJSON('POST', (0, _utils.uri)(_templateObject18(), dirId, safeName, metadataId), undefined, {
                  headers: {
                    Date: lastModified ? lastModified.toGMTString() : ''
                  }
                });

              case 12:
                resp = _context26.sent;
                return _context26.abrupt("return", {
                  data: normalizeFile(resp.data)
                });

              case 14:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this);
      }));

      function createDirectory() {
        return _createDirectory.apply(this, arguments);
      }

      return createDirectory;
    }()
  }, {
    key: "ensureDirectoryExists",
    value: function () {
      var _ensureDirectoryExists = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee27(path) {
        var resp;
        return _regenerator.default.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                if (this.specialDirectories[path]) {
                  _context27.next = 5;
                  break;
                }

                _context27.next = 3;
                return this.createDirectoryByPath(path);

              case 3:
                resp = _context27.sent;
                this.specialDirectories[path] = resp.data._id;

              case 5:
                return _context27.abrupt("return", this.specialDirectories[path]);

              case 6:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this);
      }));

      function ensureDirectoryExists(_x36) {
        return _ensureDirectoryExists.apply(this, arguments);
      }

      return ensureDirectoryExists;
    }()
    /**
     * Get a directory or create it
     *
     * @private
     * @param  {string} name - Name of the directory we want to get or create
     * @param  {FileDocument} parentDirectory - Parent directory of the directory we want to get or create
     * @returns {Promise}
     * @throws {Error} - explaining reason why creation failed
     */

  }, {
    key: "getDirectoryOrCreate",
    value: function () {
      var _getDirectoryOrCreate = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee28(name, parentDirectory) {
        var safeName, path, stat, parsedError, errors;
        return _regenerator.default.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                if (!(parentDirectory && !parentDirectory.attributes)) {
                  _context28.next = 2;
                  break;
                }

                throw new Error('Malformed parent directory');

              case 2:
                safeName = sanitizeFileName(name);
                path = "".concat(parentDirectory._id === ROOT_DIR_ID ? '' : parentDirectory.attributes.path, "/").concat(safeName);
                _context28.prev = 4;
                _context28.next = 7;
                return this.statByPath(path || '/');

              case 7:
                stat = _context28.sent;
                return _context28.abrupt("return", stat);

              case 11:
                _context28.prev = 11;
                _context28.t0 = _context28["catch"](4);
                parsedError = JSON.parse(_context28.t0.message);
                errors = parsedError.errors;

                if (!(errors && errors.length && errors[0].status === '404')) {
                  _context28.next = 17;
                  break;
                }

                return _context28.abrupt("return", this.createDirectory({
                  name: safeName,
                  dirId: parentDirectory && parentDirectory._id
                }));

              case 17:
                throw errors;

              case 18:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, this, [[4, 11]]);
      }));

      function getDirectoryOrCreate(_x37, _x38) {
        return _getDirectoryOrCreate.apply(this, arguments);
      }

      return getDirectoryOrCreate;
    }()
    /**
     * async createDirectoryByPath - Creates one or more folders until the given path exists
     *
     * @param  {string} path - Path of the created directory
     * @returns {object} The document corresponding to the last segment of the path
     */

  }, {
    key: "createDirectoryByPath",
    value: function () {
      var _createDirectoryByPath = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee29(path) {
        var parts, root, parentDir, _iterator, _step, part;

        return _regenerator.default.wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                parts = path.split('/').filter(function (part) {
                  return part !== '';
                });
                _context29.next = 3;
                return this.statById(ROOT_DIR_ID);

              case 3:
                root = _context29.sent;

                if (parts.length) {
                  _context29.next = 6;
                  break;
                }

                return _context29.abrupt("return", root);

              case 6:
                parentDir = root;
                _iterator = _createForOfIteratorHelper(parts);
                _context29.prev = 8;

                _iterator.s();

              case 10:
                if ((_step = _iterator.n()).done) {
                  _context29.next = 17;
                  break;
                }

                part = _step.value;
                _context29.next = 14;
                return this.getDirectoryOrCreate(part, parentDir.data);

              case 14:
                parentDir = _context29.sent;

              case 15:
                _context29.next = 10;
                break;

              case 17:
                _context29.next = 22;
                break;

              case 19:
                _context29.prev = 19;
                _context29.t0 = _context29["catch"](8);

                _iterator.e(_context29.t0);

              case 22:
                _context29.prev = 22;

                _iterator.f();

                return _context29.finish(22);

              case 25:
                return _context29.abrupt("return", parentDir);

              case 26:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29, this, [[8, 19, 22, 25]]);
      }));

      function createDirectoryByPath(_x39) {
        return _createDirectoryByPath.apply(this, arguments);
      }

      return createDirectoryByPath;
    }()
    /**
     *
     * async updateAttributes - Updates a file / folder's attributes except
     * the metadata attribute. If you want to update its metadata attribute,
     * then use `updateFileMetadataAttribute` since `metadata` is a specific
     * doctype.
     *
     * For instance, if you want to update the name of a file, you can pass
     * attributes = { name: 'newName'}
     *
     * You can see the attributes for both Folder and File (as they share the
     * same doctype they have a few in common) here :
     * https://docs.cozy.io/en/cozy-doctypes/docs/io.cozy.files/#iocozyfiles
     *
     * @private You shoud use update() directly.
     * @param  {string} id         File id
     * @param  {object} attributes New file attributes
     * @returns {object}            Updated document
     * @throws {Error} - explaining reason why update failed
     */

  }, {
    key: "updateAttributes",
    value: function () {
      var _updateAttributes = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee30(id, attributes) {
        var sanitizedAttributes, resp;
        return _regenerator.default.wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                sanitizedAttributes = _objectSpread({}, attributes);

                if (attributes.name) {
                  sanitizedAttributes.name = sanitizeAndValidateFileName(attributes.name);
                }

                _context30.next = 4;
                return this.stackClient.fetchJSON('PATCH', (0, _utils.uri)(_templateObject19(), id), {
                  data: {
                    type: 'io.cozy.files',
                    id: id,
                    attributes: sanitizedAttributes
                  }
                });

              case 4:
                resp = _context30.sent;
                return _context30.abrupt("return", {
                  data: normalizeFile(resp.data)
                });

              case 6:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30, this);
      }));

      function updateAttributes(_x40, _x41) {
        return _updateAttributes.apply(this, arguments);
      }

      return updateAttributes;
    }()
  }, {
    key: "updateFileMetadata",
    value: function () {
      var _updateFileMetadata = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee31(id, attributes) {
        return _regenerator.default.wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                _logger.default.warn('CozyClient FileCollection updateFileMetadata method is deprecated. Use updateAttributes instead');

                return _context31.abrupt("return", this.updateAttributes(id, attributes));

              case 2:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31, this);
      }));

      function updateFileMetadata(_x42, _x43) {
        return _updateFileMetadata.apply(this, arguments);
      }

      return updateFileMetadata;
    }()
    /**
     * Send a metadata object that can be associated to a file uploaded after that,
     * via the MetadataID query parameter.
     * See https://github.com/cozy/cozy-stack/blob/master/docs/files.md#post-filesuploadmetadata
     *
     * @param {object} attributes The file's metadata
     * @returns {Promise<object>}          The Metadata object
     */

  }, {
    key: "createFileMetadata",
    value: function () {
      var _createFileMetadata = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee32(attributes) {
        var resp;
        return _regenerator.default.wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                _context32.next = 2;
                return this.stackClient.fetchJSON('POST', (0, _utils.uri)(_templateObject20()), {
                  data: {
                    type: 'io.cozy.files.metadata',
                    attributes: attributes
                  }
                });

              case 2:
                resp = _context32.sent;
                return _context32.abrupt("return", {
                  data: resp.data
                });

              case 4:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32, this);
      }));

      function createFileMetadata(_x44) {
        return _createFileMetadata.apply(this, arguments);
      }

      return createFileMetadata;
    }()
    /**
     *
     * Updates the metadata attribute of a io.cozy.files
     * Creates a new version of the file without having
     * to upload again the file's content
     *
     * To see available content of the metadata attribute
     * see : https://docs.cozy.io/en/cozy-doctypes/docs/io.cozy.files_metadata/
     *
     * @param {string} id File id
     * @param {object} metadata io.cozy.files.metadata attributes
     * @returns {Promise<object>} io.cozy.files updated
     */

  }, {
    key: "updateMetadataAttribute",
    value: function () {
      var _updateMetadataAttribute = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee33(id, metadata) {
        var resp;
        return _regenerator.default.wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                _context33.next = 2;
                return this.stackClient.fetchJSON('POST', (0, _utils.uri)(_templateObject21(), id), {
                  data: {
                    type: 'io.cozy.files.metadata',
                    attributes: metadata
                  }
                });

              case 2:
                resp = _context33.sent;
                return _context33.abrupt("return", {
                  data: resp.data
                });

              case 4:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee33, this);
      }));

      function updateMetadataAttribute(_x45, _x46) {
        return _updateMetadataAttribute.apply(this, arguments);
      }

      return updateMetadataAttribute;
    }()
    /**
     * Get the file mime-type based on its name
     *
     * @param {string} name - The file name
     * @returns {string} the inferred file mime-type
     */

  }, {
    key: "getFileTypeFromName",
    value: function getFileTypeFromName(name) {
      return _lite.default.getType(name) || CONTENT_TYPE_OCTET_STREAM;
    }
    /**
     *
     * This method should not be called directly to upload a file.
     * You should use `createFile`
     *
     * @param {File|Blob|Stream|string|ArrayBuffer} dataArg file to be uploaded
     * @param {string} path Uri to call the stack from. Something like
     * `/files/${dirId}?Name=${name}&Type=file&Executable=${executable}&MetadataID=${metadataId}`
     * @param {object} options Additional headers
     * @param {string} method POST / PUT / PATCH
     */

  }, {
    key: "doUpload",
    value: function () {
      var _doUpload = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee34(dataArg, path, options) {
        var method,
            correctPath,
            data,
            isBuffer,
            isFile,
            isBlob,
            isStream,
            isString,
            _ref11,
            contentType,
            contentLength,
            checksum,
            lastModifiedDate,
            ifMatch,
            sPath,
            params,
            name,
            headers,
            date,
            resp,
            _args34 = arguments;

        return _regenerator.default.wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                method = _args34.length > 3 && _args34[3] !== undefined ? _args34[3] : 'POST';
                correctPath = path;
                data = dataArg;

                if (data) {
                  _context34.next = 5;
                  break;
                }

                throw new Error('missing data argument');

              case 5:
                // transform any ArrayBufferView to ArrayBuffer
                if (data.buffer && data.buffer instanceof ArrayBuffer) {
                  data = data.buffer;
                }

                isBuffer = typeof ArrayBuffer !== 'undefined' && data instanceof ArrayBuffer;
                isFile = typeof File !== 'undefined' && data instanceof File;
                isBlob = typeof Blob !== 'undefined' && data instanceof Blob;
                isStream = data.readable === true && typeof data.pipe === 'function';
                isString = typeof data === 'string';

                if (!(!isBuffer && !isFile && !isBlob && !isStream && !isString)) {
                  _context34.next = 13;
                  break;
                }

                throw new Error('invalid data type');

              case 13:
                _ref11 = options || {}, contentType = _ref11.contentType, contentLength = _ref11.contentLength, checksum = _ref11.checksum, lastModifiedDate = _ref11.lastModifiedDate, ifMatch = _ref11.ifMatch;

                if (!contentType) {
                  if (typeof data === 'string') {
                    contentType = 'text/plain';
                  } else {
                    if (data.type) {
                      // The type is specified in the file object
                      contentType = data.type;
                    } else {
                      // Extract the name from the correctPath and infer the type
                      sPath = correctPath.split('?');
                      params = sPath.length > 1 ? sPath[1] : '';
                      name = new URLSearchParams(params).get('Name');
                      contentType = this.getFileTypeFromName(name.toLowerCase());
                    }
                  }
                }

                lastModifiedDate = lastModifiedDate || data.lastModified;

                if (lastModifiedDate) {
                  lastModifiedDate = new Date(lastModifiedDate);
                }

                headers = {
                  'Content-Type': contentType
                };
                if (contentLength) headers['Content-Length'] = String(contentLength);
                if (checksum) headers['Content-MD5'] = checksum;

                if (lastModifiedDate) {
                  date = lastModifiedDate.toISOString();
                  correctPath = "".concat(correctPath, "&UpdatedAt=").concat(date, "&CreatedAt=").concat(date);
                }

                if (ifMatch) headers['If-Match'] = ifMatch;
                _context34.next = 24;
                return this.stackClient.fetchJSON(method, correctPath, data, {
                  headers: headers,
                  onUploadProgress: options.onUploadProgress
                });

              case 24:
                resp = _context34.sent;
                return _context34.abrupt("return", {
                  data: normalizeFile(resp.data)
                });

              case 26:
              case "end":
                return _context34.stop();
            }
          }
        }, _callee34, this);
      }));

      function doUpload(_x47, _x48, _x49) {
        return _doUpload.apply(this, arguments);
      }

      return doUpload;
    }()
    /**
     * async findNotSynchronizedDirectories - Returns the list of directories not synchronized on the given OAuth client (mainly Cozy Desktop clients) — see https://docs.cozy.io/en/cozy-stack/not-synchronized-vfs/#get-datatypedoc-idrelationshipsnot_synchronizing
     *
     * @param  {OAuthClient}  oauthClient           A JSON representing an OAuth client, with at least a `_type` and `_id` field.
     * @param  {object|null}  options               Pagination options
     * @param  {number|null}  options.skip          For skip-based pagination, the number of referenced files to skip.
     * @param  {number|null}  options.limit         For pagination, the number of results to return.
     * @param  {CouchDBViewCursor|null}  options.cursor        For cursor-based pagination, the index cursor.
     * @param  {boolean}      options.includeFiles  Include the whole file documents in the results list
     *
     * @returns {Array<object|IOCozyFolder>}    The JSON API conformant response.
     */

  }, {
    key: "findNotSynchronizedDirectories",
    value: function () {
      var _findNotSynchronizedDirectories = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee35(oauthClient) {
        var _ref12,
            _ref12$skip,
            skip,
            limit,
            cursor,
            _ref12$includeFiles,
            includeFiles,
            params,
            path,
            url,
            resp,
            _args35 = arguments;

        return _regenerator.default.wrap(function _callee35$(_context35) {
          while (1) {
            switch (_context35.prev = _context35.next) {
              case 0:
                _ref12 = _args35.length > 1 && _args35[1] !== undefined ? _args35[1] : {}, _ref12$skip = _ref12.skip, skip = _ref12$skip === void 0 ? 0 : _ref12$skip, limit = _ref12.limit, cursor = _ref12.cursor, _ref12$includeFiles = _ref12.includeFiles, includeFiles = _ref12$includeFiles === void 0 ? false : _ref12$includeFiles;
                params = {
                  include: includeFiles ? 'files' : undefined,
                  'page[limit]': limit,
                  'page[cursor]': cursor,
                  sort: 'id'
                };
                path = (0, _utils.uri)(_templateObject22(), oauthClient._type, oauthClient._id);
                url = querystring.buildURL(path, params);
                _context35.next = 6;
                return this.stackClient.fetchJSON('GET', url);

              case 6:
                resp = _context35.sent;
                return _context35.abrupt("return", {
                  data: resp.data.map(function (f) {
                    return normalizeFile(f);
                  }),
                  included: resp.included ? resp.included.map(function (f) {
                    return normalizeFile(f);
                  }) : [],
                  next: (0, _has.default)(resp, 'links.next'),
                  meta: resp.meta,
                  skip: skip
                });

              case 8:
              case "end":
                return _context35.stop();
            }
          }
        }, _callee35, this);
      }));

      function findNotSynchronizedDirectories(_x50) {
        return _findNotSynchronizedDirectories.apply(this, arguments);
      }

      return findNotSynchronizedDirectories;
    }()
    /**
     *  Add directory synchronization exclusions to an OAuth client — see https://docs.cozy.io/en/cozy-stack/not-synchronized-vfs/#post-datatypedoc-idrelationshipsnot_synchronizing
     *
     *  For example, to exclude directory `/Photos` from `My Computer`'s desktop synchronization:
     * ```
     * addNotSynchronizedDirectories({_id: 123, _type: "io.cozy.oauth.clients", clientName: "Cozy Drive (My Computer)", clientKind: "desktop"}, [{_id: 456, _type: "io.cozy.files", name: "Photos", path: "/Photos"}])
     * ```
     *
     * @param  {OAuthClient} oauthClient  A JSON representing the OAuth client
     * @param  {Array}  directories       An array of JSON documents having a `_type` and `_id` fields and representing directories.
     *
     * Returns 204 No Content
     */

  }, {
    key: "addNotSynchronizedDirectories",
    value: function addNotSynchronizedDirectories(oauthClient, directories) {
      var refs = directories.map(function (d) {
        return {
          id: d._id,
          type: d._type
        };
      });
      return this.stackClient.fetchJSON('POST', (0, _utils.uri)(_templateObject23(), oauthClient._type, oauthClient._id), {
        data: refs
      });
    }
    /**
     *  Remove directory synchronization exclusions from an OAuth client — see https://docs.cozy.io/en/cozy-stack/not-synchronized-vfs/#delete-datatypedoc-idrelationshipsnot_synchronizing
     *
     *  For example, to re-include directory `/Photos` into `My Computer`'s desktop synchronization:
     * ```
     *  removeNotSynchronizedDirectories({_id: 123, _type: "io.cozy.oauth.clients", clientName: "Cozy Drive (My Computer)", clientKind: "desktop"}, [{_id: 456, _type: "io.cozy.files", name: "Photos", path: "/Photos"}])
     * ```
     *
     * @param  {OAuthClient} oauthClient  A JSON representing the OAuth client
     * @param  {Array}  directories       An array of JSON documents having a `_type` and `_id` field and representing directories.
     *
     * Returns 204 No Content
     */

  }, {
    key: "removeNotSynchronizedDirectories",
    value: function removeNotSynchronizedDirectories(oauthClient, directories) {
      var refs = directories.map(function (d) {
        return {
          id: d._id,
          type: d._type
        };
      });
      return this.stackClient.fetchJSON('DELETE', (0, _utils.uri)(_templateObject24(), oauthClient._type, oauthClient._id), {
        data: refs
      });
    }
    /**
     * Use cozy-stack's _changes API for io.cozy.files
     * Design docs are filtered by default, thus documents are retrieved in the
     * response (includeDocs is set to true in the parameters of _changes).
     * Deleted and trashed documents can be filtered on demand and files' paths
     * can be requested as well.
     *
     * Since deleted and trashed documents are skipped by cozy-stack rather than
     * CouchDB, when either option is set to true, the response can contain less
     * documents than the defined limit. Thus one should rely solely on the
     * `pending` result attribute to determine if more documents can be fetched or
     * not.
     *
     * You should use fetchChangesRaw to call CouchDB's _changes API.
     *
     * @typedef {object} CouchOptions
     * @property {string} since - Bookmark telling CouchDB from which point in time should changes be returned
     * @property {number} limit - The maximum number of returned documents for one call
     * @property {boolean} includeDocs - Whether or not complete documents should be returned
     *
     * @typedef {object} FetchChangesOptions
     * @property {Array<string>} fields - The list of fields that should be returned for each document
     * @property {boolean} includeFilePath - Whether to include the path of file changes (needs includeDocs to be true)
     * @property {boolean} skipDeleted - Whether to skip changes for deleted documents
     * @property {boolean} skipTrashed - Whether to skip changes for trashed documents (needs includeDocs to be true)
     *
     * @param  {CouchOptions} couchOptions - Couch options for changes
     * @param  {FetchChangesOptions} options - Further options on the returned documents. By default, it is set to
     *                                        { includeFilePath: false, skipDeleted: false, skipTrashed: false }
     *
     * @typedef {object} FetchChangesReturnValue
     * @property {string} newLastSeq
     * @property {boolean} pending
     * @property {Array<object>} documents
     * @returns {FetchChangesReturnValue}
     */

  }, {
    key: "fetchChanges",
    value: function () {
      var _fetchChanges = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee36() {
        var couchOptions,
            options,
            opts,
            params,
            path,
            url,
            _yield$this$stackClie,
            newLastSeq,
            pending,
            results,
            _args36 = arguments;

        return _regenerator.default.wrap(function _callee36$(_context36) {
          while (1) {
            switch (_context36.prev = _context36.next) {
              case 0:
                couchOptions = _args36.length > 0 && _args36[0] !== undefined ? _args36[0] : {};
                options = _args36.length > 1 && _args36[1] !== undefined ? _args36[1] : {};
                opts = {};

                if (typeof couchOptions !== 'object') {
                  opts.since = couchOptions;

                  _logger.default.warn("fetchChanges use couchOptions as Object not a string, since is deprecated, please use fetchChanges({since: \"".concat(couchOptions, "\"})."));
                } else if (Object.keys(couchOptions).length > 0) {
                  Object.assign(opts, couchOptions);
                }

                if (Object.keys(options).length > 0) {
                  Object.assign(opts, options);

                  if (options.skipTrashed || options.includeFilePath) {
                    opts.includeDocs = true;
                  }
                }

                params = _objectSpread(_objectSpread({}, (0, _omit.default)(opts, ['fields', 'includeDocs', 'includeFilePath', 'skipDeleted', 'skipTrashed'])), {}, {
                  fields: opts.fields ? opts.fields.join(',') : null,
                  include_docs: opts.includeDocs,
                  include_file_path: opts.includeFilePath,
                  skip_deleted: opts.skipDeleted,
                  skip_trashed: opts.skipTrashed
                });
                path = (0, _utils.uri)(_templateObject25());
                url = querystring.buildURL(path, params);
                _context36.next = 10;
                return this.stackClient.fetchJSON('GET', url);

              case 10:
                _yield$this$stackClie = _context36.sent;
                newLastSeq = _yield$this$stackClie.last_seq;
                pending = _yield$this$stackClie.pending;
                results = _yield$this$stackClie.results;
                return _context36.abrupt("return", {
                  newLastSeq: newLastSeq,
                  pending: pending,
                  results: results
                });

              case 15:
              case "end":
                return _context36.stop();
            }
          }
        }, _callee36, this);
      }));

      function fetchChanges() {
        return _fetchChanges.apply(this, arguments);
      }

      return fetchChanges;
    }()
  }]);
  return FileCollection;
}(_DocumentCollection2.default);

var _default = FileCollection;
exports.default = _default;