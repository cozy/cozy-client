"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var TERMS_DOCTYPE = 'io.cozy.terms';
/* TODO Use collection terms */

function save(_x, _x2) {
  return _save.apply(this, arguments);
}

function _save() {
  _save = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(client, terms) {
    var id, termsAttributes, _yield$client$query, savedTermsDocs, savedTerms, termsToSave, _termsToSave;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = terms.id, termsAttributes = (0, _objectWithoutProperties2.default)(terms, ["id"]);
            _context.next = 3;
            return client.query({
              doctype: TERMS_DOCTYPE,
              selector: {
                termsId: id,
                version: termsAttributes.version
              },
              limit: 1
            });

          case 3:
            _yield$client$query = _context.sent;
            savedTermsDocs = _yield$client$query.data;

            if (!(savedTermsDocs && savedTermsDocs.length)) {
              _context.next = 13;
              break;
            }

            // we just update the url if this is the same id and same version
            // but the url changed
            savedTerms = savedTermsDocs[0];

            if (!(savedTerms.termsId == id && savedTerms.version == termsAttributes.version && savedTerms.url != termsAttributes.url)) {
              _context.next = 11;
              break;
            }

            termsToSave = _objectSpread(_objectSpread({
              _type: TERMS_DOCTYPE
            }, savedTerms), {}, {
              url: termsAttributes.url
            });
            _context.next = 11;
            return client.save(termsToSave);

          case 11:
            _context.next = 16;
            break;

          case 13:
            _termsToSave = _objectSpread(_objectSpread({
              _type: TERMS_DOCTYPE
            }, termsAttributes), {}, {
              termsId: id,
              accepted: true,
              acceptedAt: new Date()
            });
            _context.next = 16;
            return client.save(_termsToSave);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _save.apply(this, arguments);
}

var _default = {
  save: save
};
exports.default = _default;