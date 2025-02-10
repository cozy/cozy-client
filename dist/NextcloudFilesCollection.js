"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NEXTCLOUD_FILES_DOCTYPE = exports.NextcloudFilesCollection = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _DocumentCollection2 = _interopRequireDefault(require("./DocumentCollection"));

var _utils = require("./utils");

var _errors = require("./errors");

var _normalize = require("./normalize");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var NEXTCLOUD_FILES_DOCTYPE = 'io.cozy.remote.nextcloud.files';
exports.NEXTCLOUD_FILES_DOCTYPE = NEXTCLOUD_FILES_DOCTYPE;
var normalizeNextcloudFileJsonApi = (0, _normalize.normalizeDoctypeJsonApi)(NEXTCLOUD_FILES_DOCTYPE);

var normalizeNextcloudFile = function normalizeNextcloudFile(sourceAccount, parentPath) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$fromTrash = _ref.fromTrash,
      fromTrash = _ref$fromTrash === void 0 ? false : _ref$fromTrash;

  return function (file) {
    var normalizedDoc = normalizeNextcloudFileJsonApi(file);
    return _objectSpread(_objectSpread({}, normalizedDoc), {}, {
      parentPath: parentPath,
      path: fromTrash ? normalizedDoc.path : (0, _utils.joinPath)(parentPath, normalizedDoc.name),
      cozyMetadata: _objectSpread(_objectSpread({}, normalizedDoc.cozyMetadata), {}, {
        sourceAccount: sourceAccount
      })
    });
  };
};

var NextcloudFilesCollection = /*#__PURE__*/function (_DocumentCollection) {
  (0, _inherits2.default)(NextcloudFilesCollection, _DocumentCollection);

  var _super = _createSuper(NextcloudFilesCollection);

  function NextcloudFilesCollection(stackClient) {
    (0, _classCallCheck2.default)(this, NextcloudFilesCollection);
    return _super.call(this, NEXTCLOUD_FILES_DOCTYPE, stackClient);
  }

  (0, _createClass2.default)(NextcloudFilesCollection, [{
    key: "find",
    value: function () {
      var _find = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(selector) {
        var resp;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(selector['cozyMetadata.sourceAccount'] && selector.parentPath)) {
                  _context.next = 5;
                  break;
                }

                _context.next = 3;
                return this.stackClient.fetchJSON('GET', "/remote/nextcloud/".concat(selector['cozyMetadata.sourceAccount']).concat((0, _utils.encodePath)(selector.parentPath)));

              case 3:
                resp = _context.sent;
                return _context.abrupt("return", {
                  data: resp.data.map(normalizeNextcloudFile(selector['cozyMetadata.sourceAccount'], selector.parentPath, {
                    fromTrash: selector.trashed
                  }))
                });

              case 5:
                throw new Error('Not implemented');

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function find(_x) {
        return _find.apply(this, arguments);
      }

      return find;
    }()
    /**
     *  Move a file to the trash
     *
     * @param {object} file - The `io.cozy.remote.nextcloud.files` file to move to the trash
     * @returns {Promise<object>}
     * @throws {FetchError}
     */

  }, {
    key: "destroy",
    value: function () {
      var _destroy = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(file) {
        var resp;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.stackClient.fetch('DELETE', "/remote/nextcloud/".concat(file.cozyMetadata.sourceAccount).concat((0, _utils.encodePath)(file.path)));

              case 2:
                resp = _context2.sent;

                if (!(resp.status === 204)) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", resp);

              case 5:
                throw new _errors.FetchError(resp, resp.json());

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function destroy(_x2) {
        return _destroy.apply(this, arguments);
      }

      return destroy;
    }()
    /**
     * Move to the trash multiple files
     *
     * @param {object[]} files - `io.cozy.remote.nextcloud.files` files to move to the trash
     * @returns {Promise<any>}
     * @throws {FetchError}
     */

  }, {
    key: "destroyAll",
    value: function () {
      var _destroyAll = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(files) {
        var _iterator, _step, file;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _iterator = _createForOfIteratorHelper(files);
                _context3.prev = 1;

                _iterator.s();

              case 3:
                if ((_step = _iterator.n()).done) {
                  _context3.next = 9;
                  break;
                }

                file = _step.value;
                _context3.next = 7;
                return this.destroy(file);

              case 7:
                _context3.next = 3;
                break;

              case 9:
                _context3.next = 14;
                break;

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](1);

                _iterator.e(_context3.t0);

              case 14:
                _context3.prev = 14;

                _iterator.f();

                return _context3.finish(14);

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 11, 14, 17]]);
      }));

      function destroyAll(_x3) {
        return _destroyAll.apply(this, arguments);
      }

      return destroyAll;
    }()
    /**
     * Download a file from a Nextcloud server
     *
     * @param {object} file - The `io.cozy.remote.nextcloud.files` file to download
     */

  }, {
    key: "download",
    value: function () {
      var _download = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(file) {
        var res, blob, href, filename;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.stackClient.fetch('GET', "/remote/nextcloud/".concat(file.cozyMetadata.sourceAccount).concat((0, _utils.encodePath)(file.path), "?Dl=1"));

              case 2:
                res = _context4.sent;
                _context4.next = 5;
                return res.blob();

              case 5:
                blob = _context4.sent;
                href = URL.createObjectURL(blob);
                filename = file.path.split('/').pop();
                (0, _utils.forceDownload)(href, filename);

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function download(_x4) {
        return _download.apply(this, arguments);
      }

      return download;
    }()
    /**
     * Move a file inside a Nextcloud server
     *
     * @param {object} file - The `io.cozy.remote.nextcloud.files` file to move
     * @param {object} to - The `io.cozy.remote.nextcloud.files` folder to move the file to
     */

  }, {
    key: "move",
    value: function () {
      var _move = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(file, to) {
        var newPath, resp;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                newPath = (0, _utils.joinPath)(to.path, file.name);
                _context5.next = 3;
                return this.stackClient.fetch('POST', "/remote/nextcloud/".concat(file.cozyMetadata.sourceAccount, "/move").concat((0, _utils.encodePath)(file.path), "?To=").concat((0, _utils.encodePath)(newPath)));

              case 3:
                resp = _context5.sent;

                if (!(resp.status === 204)) {
                  _context5.next = 6;
                  break;
                }

                return _context5.abrupt("return", resp);

              case 6:
                throw new _errors.FetchError(resp, resp.json());

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function move(_x5, _x6) {
        return _move.apply(this, arguments);
      }

      return move;
    }()
    /**
     * Move a file from a Nextcloud server to a Cozy
     *
     * @param {object} file - The `io.cozy.remote.nextcloud.files` file to move
     * @param {object} to - The `io.cozy.files` folder to move the file to
     * @param {object} [options] - Options
     * @param {boolean} [options.copy] - Whether to copy the file instead of moving it
     */

  }, {
    key: "moveToCozy",
    value: function () {
      var _moveToCozy = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(file, to) {
        var _ref2,
            _ref2$copy,
            copy,
            resp,
            _args6 = arguments;

        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _ref2 = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {}, _ref2$copy = _ref2.copy, copy = _ref2$copy === void 0 ? false : _ref2$copy;
                _context6.next = 3;
                return this.stackClient.fetch('POST', "/remote/nextcloud/".concat(file.cozyMetadata.sourceAccount, "/downstream").concat((0, _utils.encodePath)(file.path), "?To=").concat(to._id).concat(copy ? '&Copy=true' : ''));

              case 3:
                resp = _context6.sent;

                if (!(resp.status === 201)) {
                  _context6.next = 6;
                  break;
                }

                return _context6.abrupt("return", resp);

              case 6:
                throw new _errors.FetchError(resp, resp.json());

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function moveToCozy(_x7, _x8) {
        return _moveToCozy.apply(this, arguments);
      }

      return moveToCozy;
    }()
    /**
     * Move a file from a Cozy to a Nextcloud server
     *
     * @param {object} file - The `io.cozy.remote.nextcloud.files` folder to move the file to
     * @param {object} from - The `io.cozy.files` file to move
     * @param {object} [options] - Options
     * @param {boolean} [options.copy] - Whether to copy the file instead of moving it
     * @throws {FetchError}
     */

  }, {
    key: "moveFromCozy",
    value: function () {
      var _moveFromCozy = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(file, from) {
        var _ref3,
            _ref3$copy,
            copy,
            newPath,
            resp,
            _args7 = arguments;

        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _ref3 = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : {}, _ref3$copy = _ref3.copy, copy = _ref3$copy === void 0 ? false : _ref3$copy;
                newPath = (0, _utils.joinPath)(file.path, from.name);
                _context7.next = 4;
                return this.stackClient.fetch('POST', "/remote/nextcloud/".concat(file.cozyMetadata.sourceAccount, "/upstream").concat((0, _utils.encodePath)(newPath), "?From=").concat(from._id).concat(copy ? '&Copy=true' : ''));

              case 4:
                resp = _context7.sent;

                if (!(resp.status === 204)) {
                  _context7.next = 7;
                  break;
                }

                return _context7.abrupt("return", resp);

              case 7:
                throw new _errors.FetchError(resp, resp.json());

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function moveFromCozy(_x9, _x10) {
        return _moveFromCozy.apply(this, arguments);
      }

      return moveFromCozy;
    }()
    /**
     * Restores a file from the Nextcloud server.
     *
     * @param {Object} file - The file to restore.
     * @returns {Promise<Response>} - A promise that resolves to the response from the server.
     * @throws {FetchError} - If the server response is not successful.
     */

  }, {
    key: "restore",
    value: function () {
      var _restore = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(file) {
        var resp;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.stackClient.fetch('POST', "/remote/nextcloud/".concat(file.cozyMetadata.sourceAccount, "/restore").concat((0, _utils.encodePath)(file.path)));

              case 2:
                resp = _context8.sent;

                if (!(resp.status === 204)) {
                  _context8.next = 5;
                  break;
                }

                return _context8.abrupt("return", resp);

              case 5:
                throw new _errors.FetchError(resp, resp.json());

              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function restore(_x11) {
        return _restore.apply(this, arguments);
      }

      return restore;
    }()
    /**
     * Empties the trash for the specified source account.
     *
     * @param {string} sourceAccount - The source account to empty the trash for.
     * @returns {Promise<Response>} - A promise that resolves to the response from the server.
     * @throws {FetchError} - If the server returns an error response.
     */

  }, {
    key: "emptyTrash",
    value: function () {
      var _emptyTrash = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9(sourceAccount) {
        var resp;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.stackClient.fetch('DELETE', "/remote/nextcloud/".concat(sourceAccount, "/trash"));

              case 2:
                resp = _context9.sent;

                if (!(resp.status === 204)) {
                  _context9.next = 5;
                  break;
                }

                return _context9.abrupt("return", resp);

              case 5:
                throw new _errors.FetchError(resp, resp.json());

              case 6:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function emptyTrash(_x12) {
        return _emptyTrash.apply(this, arguments);
      }

      return emptyTrash;
    }()
    /**
     * Deletes a file permanently from the Nextcloud server.
     *
     * @param {Object} file - The file object to be deleted.
     * @returns {Promise<Response>} - A promise that resolves to the response from the server.
     * @throws {FetchError} - If the server returns an error response.
     */

  }, {
    key: "deletePermanently",
    value: function () {
      var _deletePermanently = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10(file) {
        var resp;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this.stackClient.fetch('DELETE', "/remote/nextcloud/".concat(file.cozyMetadata.sourceAccount).concat((0, _utils.encodePath)(file.path)));

              case 2:
                resp = _context10.sent;

                if (!(resp.status === 204)) {
                  _context10.next = 5;
                  break;
                }

                return _context10.abrupt("return", resp);

              case 5:
                throw new _errors.FetchError(resp, resp.json());

              case 6:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function deletePermanently(_x13) {
        return _deletePermanently.apply(this, arguments);
      }

      return deletePermanently;
    }()
    /**
     * Copy a file or folder to another path on the same Nextcloud server
     *
     * @param {object} file - The `io.cozy.remote.nextcloud.files` file to copy
     * @param {object} to - Whether to copy the file
     */

  }, {
    key: "copy",
    value: function () {
      var _copy = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11(file, to) {
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return this.stackClient.fetchJSON('POST', "/remote/nextcloud/".concat(file.cozyMetadata.sourceAccount, "/copy/").concat(file.path).concat(to ? "?Path=".concat(to.path, "/").concat(file.name) : ''));

              case 2:
                return _context11.abrupt("return", _context11.sent);

              case 3:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function copy(_x14, _x15) {
        return _copy.apply(this, arguments);
      }

      return copy;
    }()
  }]);
  return NextcloudFilesCollection;
}(_DocumentCollection2.default);

exports.NextcloudFilesCollection = NextcloudFilesCollection;