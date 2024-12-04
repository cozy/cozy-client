"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSharingLink = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _const = require("../const");

var _CozyClient = _interopRequireDefault(require("../CozyClient"));

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Generate Sharing link for one or many files
 *
 * @param {CozyClient} client - Instance of CozyClient
 * @param {string[]} filesIds - Array of io.cozy.files ids
 * @param {object} options - Options
 * @param {string} [options.ttl] - Time to live (bigduration format, e.g. "4Y3M2D1h30m15s")
 * @param {string} [options.password] - To generate a password-protected link
 * @returns {Promise<string>} Shared link
 */
var getSharingLink = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(client, filesIds) {
    var _sharedLink$attribute, _sharedLink$attribute2;

    var _ref2,
        ttl,
        password,
        PERMS,
        _yield$client$save,
        sharedLink,
        webLink,
        _args = arguments;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref2 = _args.length > 2 && _args[2] !== undefined ? _args[2] : {}, ttl = _ref2.ttl, password = _ref2.password;
            PERMS = _objectSpread(_objectSpread({
              _type: _const.DOCTYPE_PERMISSIONS,
              permissions: {
                files: {
                  type: _const.DOCTYPE_FILES,
                  values: filesIds,
                  verbs: ['GET']
                }
              }
            }, ttl && {
              ttl: ttl
            }), password && {
              password: password
            });
            _context.next = 4;
            return client.save(PERMS);

          case 4:
            _yield$client$save = _context.sent;
            sharedLink = _yield$client$save.data;
            webLink = (0, _helpers.generateWebLink)({
              cozyUrl: client.getStackClient().uri,
              searchParams: [['sharecode', sharedLink === null || sharedLink === void 0 ? void 0 : (_sharedLink$attribute = sharedLink.attributes) === null || _sharedLink$attribute === void 0 ? void 0 : (_sharedLink$attribute2 = _sharedLink$attribute.shortcodes) === null || _sharedLink$attribute2 === void 0 ? void 0 : _sharedLink$attribute2.code]],
              pathname: '/public',
              slug: 'drive',
              subDomainType: client.capabilities.flat_subdomains ? 'flat' : 'nested'
            });
            return _context.abrupt("return", webLink);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getSharingLink(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getSharingLink = getSharingLink;