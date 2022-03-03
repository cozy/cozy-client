"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchURL = exports.generateUrlForNote = exports.generatePrivateUrl = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _helpers = require("../helpers");

/**
 *
 * @param {string} notesAppUrl URL to the Notes App (https://notes.foo.mycozy.cloud)
 * @param {object} file io.cozy.files object
 */
var generatePrivateUrl = function generatePrivateUrl(notesAppUrl, file) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnUrl = options.returnUrl;
  var url = new URL(notesAppUrl);

  if (returnUrl) {
    url.searchParams.set('returnUrl', returnUrl);
  }

  url.hash = "#/n/".concat(file.id);
  return url.toString();
};

exports.generatePrivateUrl = generatePrivateUrl;

var generateUrlForNote = function generateUrlForNote(notesAppUrl, file) {
  console.warn('generateUrlForNote is deprecated. Please use models.note.generatePrivateUrl instead');
  return generatePrivateUrl(notesAppUrl, file);
};
/**
 * Fetch and build an URL to open a note.
 *
 * @param {object} client CozyClient instance
 * @param {object} file io.cozy.file object
 * @returns {Promise<string>} url
 */


exports.generateUrlForNote = generateUrlForNote;

var fetchURL = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(client, file) {
    var _yield$client$getStac, _yield$client$getStac2, note_id, subdomain, protocol, instance, sharecode, public_name, searchParams;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return client.getStackClient().collection('io.cozy.notes').fetchURL({
              _id: file.id
            });

          case 2:
            _yield$client$getStac = _context.sent;
            _yield$client$getStac2 = _yield$client$getStac.data;
            note_id = _yield$client$getStac2.note_id;
            subdomain = _yield$client$getStac2.subdomain;
            protocol = _yield$client$getStac2.protocol;
            instance = _yield$client$getStac2.instance;
            sharecode = _yield$client$getStac2.sharecode;
            public_name = _yield$client$getStac2.public_name;

            if (!sharecode) {
              _context.next = 17;
              break;
            }

            searchParams = [['id', note_id]];
            searchParams.push(['sharecode', sharecode]);
            if (public_name) searchParams.push(['username', public_name]);
            return _context.abrupt("return", (0, _helpers.generateWebLink)({
              cozyUrl: "".concat(protocol, "://").concat(instance),
              searchParams: searchParams,
              pathname: '/public/',
              slug: 'notes',
              subDomainType: subdomain
            }));

          case 17:
            return _context.abrupt("return", (0, _helpers.generateWebLink)({
              cozyUrl: "".concat(protocol, "://").concat(instance),
              pathname: '',
              slug: 'notes',
              subDomainType: subdomain,
              hash: "/n/".concat(note_id)
            }));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchURL(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchURL = fetchURL;