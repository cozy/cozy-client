"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureFilePath = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dsl = require("../queries/dsl");

var _CozyClient = _interopRequireDefault(require("../CozyClient"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var buildFileByIdQuery = function buildFileByIdQuery(id) {
  return {
    definition: function definition() {
      return (0, _dsl.Q)('io.cozy.files').getById(id);
    },
    options: {
      as: "io.cozy.files/".concat(id),
      singleDocData: true,
      fetchPolicy: _CozyClient.default.fetchPolicies.olderThan(30 * 1000)
    }
  };
};
/**
 * Ensures existence of `path` inside the io.cozy.files document
 *
 * @public
 * @param {import("../types").IOCozyFile} couchDBDoc - object representing the document
 * @param {object} options Options
 * @param {string} [options.doctype] - Doctype of the document
 * @param {CozyClient} [options.client] - CozyClient instance
 *
 * @returns {Promise<import("../types").CozyClientDocument>} full normalized document
 */


var ensureFilePath = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(couchDBDoc) {
    var options,
        parentQuery,
        parentResult,
        path,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};

            if (!couchDBDoc.path) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", couchDBDoc);

          case 3:
            parentQuery = buildFileByIdQuery(couchDBDoc.dir_id);
            _context.next = 6;
            return options.client.fetchQueryAndGetFromState({
              definition: parentQuery.definition(),
              options: parentQuery.options
            });

          case 6:
            parentResult = _context.sent;

            if (!(!parentResult.data || !parentResult.data.path)) {
              _context.next = 9;
              break;
            }

            throw new Error("Could not define a file path for ".concat(couchDBDoc._id || couchDBDoc.id));

          case 9:
            path = parentResult.data.path + '/' + couchDBDoc.name;
            return _context.abrupt("return", _objectSpread({
              path: path
            }, couchDBDoc));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function ensureFilePath(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.ensureFilePath = ensureFilePath;