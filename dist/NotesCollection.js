"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NOTES_URL_DOCTYPE = exports.NOTES_DOCTYPE = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _DocumentCollection2 = _interopRequireDefault(require("./DocumentCollection"));

var _normalize = require("./normalize");

var _utils = require("./utils");

var _NotesSchema = require("./NotesSchema");

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["/notes/", "/open"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["/files/", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var NOTES_DOCTYPE = 'io.cozy.notes';
exports.NOTES_DOCTYPE = NOTES_DOCTYPE;
var NOTES_URL_DOCTYPE = 'io.cozy.notes.url';
exports.NOTES_URL_DOCTYPE = NOTES_URL_DOCTYPE;
var normalizeNote = (0, _normalize.normalizeDoctypeJsonApi)(NOTES_DOCTYPE);
var normalizeNoteUrl = (0, _normalize.normalizeDoctypeJsonApi)(NOTES_URL_DOCTYPE);
/**
 * Implements `DocumentCollection` API to interact with the /notes endpoint of the stack
 */

var NotesCollection = /*#__PURE__*/function (_DocumentCollection) {
  (0, _inherits2.default)(NotesCollection, _DocumentCollection);

  var _super = _createSuper(NotesCollection);

  function NotesCollection(stackClient) {
    (0, _classCallCheck2.default)(this, NotesCollection);
    return _super.call(this, NOTES_DOCTYPE, stackClient);
  }
  /**
   * Fetches the note data
   *
   * @param {string} id Note id
   * @returns {{data}} Information about the note
   */


  (0, _createClass2.default)(NotesCollection, [{
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(id) {
        var resp;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.stackClient.fetchJSON('GET', "/notes/".concat(id));

              case 2:
                resp = _context.sent;
                return _context.abrupt("return", {
                  data: normalizeNote(resp.data)
                });

              case 4:
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
     * Fetches all notes
     *
     * @returns {{data, links, meta}} The JSON API conformant response.
     */

  }, {
    key: "all",
    value: function () {
      var _all = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var resp;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.stackClient.fetchJSON('GET', '/notes');

              case 2:
                resp = _context2.sent;
                return _context2.abrupt("return", _objectSpread(_objectSpread({}, resp), {}, {
                  data: resp.data.map(normalizeNote)
                }));

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
    /**
     * Destroys the note on the server
     *
     * @param {object} note       The io.cozy.notes document to destroy
     * @param {string} [note._id] The note's id
     *
     * @returns {{ data }} The deleted note
     */

  }, {
    key: "destroy",
    value: function () {
      var _destroy = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(_ref) {
        var _id, resp;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _id = _ref._id;
                _context3.next = 3;
                return this.stackClient.fetchJSON('DELETE', (0, _utils.uri)(_templateObject(), _id));

              case 3:
                resp = _context3.sent;
                return _context3.abrupt("return", {
                  data: _objectSpread(_objectSpread({}, normalizeNote(resp.data)), {}, {
                    _deleted: true
                  })
                });

              case 5:
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
     * Create a note
     *
     * @param {object} options - Options
     * @param {string} [options.dir_id] dir_id where to create the note
     *
     * @returns {{data, links, meta}} The JSON API conformant response.
     */

  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(_ref2) {
        var dir_id, resp;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                dir_id = _ref2.dir_id;
                _context4.next = 3;
                return this.stackClient.fetchJSON('POST', '/notes', {
                  data: {
                    type: 'io.cozy.notes.documents',
                    attributes: {
                      title: '',
                      schema: (0, _NotesSchema.getDefaultSchema)(),
                      dir_id: dir_id
                    }
                  }
                });

              case 3:
                resp = _context4.sent;
                return _context4.abrupt("return", _objectSpread(_objectSpread({}, resp), {}, {
                  data: normalizeNote(resp.data)
                }));

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function create(_x3) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
    /**
     * Returns the details to build the note's url
     *
     * @see https://github.com/cozy/cozy-stack/blob/master/docs/notes.md#get-notesidopen
     *
     * @param {object} note       The io.cozy.notes document to open
     * @param {string} [note._id] The note's id
     *
     * @returns {{ data }} The note's url details
     */

  }, {
    key: "fetchURL",
    value: function () {
      var _fetchURL = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(_ref3) {
        var _id, resp;

        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _id = _ref3._id;
                _context5.next = 3;
                return this.stackClient.fetchJSON('GET', (0, _utils.uri)(_templateObject2(), _id));

              case 3:
                resp = _context5.sent;
                return _context5.abrupt("return", {
                  data: normalizeNoteUrl(resp.data)
                });

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function fetchURL(_x4) {
        return _fetchURL.apply(this, arguments);
      }

      return fetchURL;
    }()
    /**
     * Returns promise mirror schema for a note
     *
     * @returns {object} schema
     */

  }, {
    key: "getDefaultSchema",
    value: function getDefaultSchema() {
      return (0, _NotesSchema.getDefaultSchema)();
    }
  }]);
  return NotesCollection;
}(_DocumentCollection2.default);

NotesCollection.normalizeDoctype = _normalize.normalizeDoctypeJsonApi;
var _default = NotesCollection;
exports.default = _default;