"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SHORTCUTS_DOCTYPE = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _DocumentCollection2 = _interopRequireDefault(require("./DocumentCollection"));

var _normalize = require("./normalize");

var _utils = require("./utils");

var _getIllegalCharacter = require("./getIllegalCharacter");

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["/shortcuts/", ""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["/shortcuts"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var SHORTCUTS_DOCTYPE = 'io.cozy.files.shortcuts';
exports.SHORTCUTS_DOCTYPE = SHORTCUTS_DOCTYPE;
var normalizeShortcutsJsonApi = (0, _normalize.normalizeDoctypeJsonApi)(SHORTCUTS_DOCTYPE);

var normalizeShortcuts = function normalizeShortcuts(doc) {
  return _objectSpread(_objectSpread({}, normalizeShortcutsJsonApi(doc)), {}, {
    _id: doc._id // Ensures that the _id replaces by _id inside attributes

  });
};

var ShortcutsCollection = /*#__PURE__*/function (_DocumentCollection) {
  (0, _inherits2.default)(ShortcutsCollection, _DocumentCollection);

  var _super = _createSuper(ShortcutsCollection);

  function ShortcutsCollection(stackClient) {
    (0, _classCallCheck2.default)(this, ShortcutsCollection);
    return _super.call(this, SHORTCUTS_DOCTYPE, stackClient);
  }
  /**
   * Create a shortcut
   *
   * @param {object} attributes shortcut's attributes
   * @param {string} attributes.name Filename
   * @param {string} attributes.url Shortcut's URL
   * @param {string} attributes.dir_id dir_id where to create the shortcut
   * @throws {Error} - explaining reason why creation failed
   */


  (0, _createClass2.default)(ShortcutsCollection, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(attributes) {
        var name, illegalCharacters, path, resp;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!attributes.type) {
                  attributes.type = SHORTCUTS_DOCTYPE;
                }

                if (!(!attributes.name || !attributes.name.trim() || !attributes.url || !attributes.dir_id)) {
                  _context.next = 3;
                  break;
                }

                throw new Error('you need at least a name, an url and a dir_id attributes to create a shortcut');

              case 3:
                name = attributes.name.trim();

                if (!(name === '.' || name === '..')) {
                  _context.next = 6;
                  break;
                }

                throw new Error("Invalid filename: ".concat(name));

              case 6:
                illegalCharacters = (0, _getIllegalCharacter.getIllegalCharacters)(name);

                if (!illegalCharacters.length) {
                  _context.next = 9;
                  break;
                }

                throw new Error("Invalid filename containing illegal character(s): ".concat(illegalCharacters));

              case 9:
                path = (0, _utils.uri)(_templateObject());
                _context.next = 12;
                return this.stackClient.fetchJSON('POST', path, {
                  data: {
                    attributes: attributes,
                    type: 'io.cozy.files.shortcuts'
                  }
                });

              case 12:
                resp = _context.sent;
                return _context.abrupt("return", {
                  data: normalizeShortcuts(resp.data)
                });

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(id) {
        var path, resp;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                path = (0, _utils.uri)(_templateObject2(), id);
                _context2.next = 3;
                return this.stackClient.fetchJSON('GET', path);

              case 3:
                resp = _context2.sent;
                return _context2.abrupt("return", {
                  data: normalizeShortcuts(resp.data)
                });

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function get(_x2) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }]);
  return ShortcutsCollection;
}(_DocumentCollection2.default);

ShortcutsCollection.normalizeDoctype = _normalize.normalizeDoctypeJsonApi;
var _default = ShortcutsCollection;
exports.default = _default;