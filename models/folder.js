"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReferencedFolder = exports.createFolderWithReference = exports.ensureMagicFolder = exports.MAGIC_FOLDERS = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sortBy = _interopRequireDefault(require("lodash/sortBy"));

var _CozyClient = _interopRequireDefault(require("../CozyClient"));

var _types = require("../types");

var _const = require("../const");

var APP_DOCTYPE = 'io.cozy.apps';
var administrative = 'administrative';
var photos = 'photos';
var MAGIC_FOLDERS = {
  ADMINISTRATIVE: "".concat(APP_DOCTYPE, "/").concat(administrative),
  PHOTOS: "".concat(APP_DOCTYPE, "/").concat(photos),
  PHOTOS_BACKUP: "".concat(APP_DOCTYPE, "/").concat(photos, "/mobile"),
  PHOTOS_UPLOAD: "".concat(APP_DOCTYPE, "/").concat(photos, "/upload"),
  NOTES: "".concat(APP_DOCTYPE, "/notes"),
  HOME: "".concat(APP_DOCTYPE, "/home"),
  PAPERS: "".concat(APP_DOCTYPE, "/").concat(administrative, "/papers"),
  COACH_CO2: "".concat(APP_DOCTYPE, "/").concat(administrative, "/coachco2")
};
/**
 * Returns a "Magic Folder", given its id. See https://docs.cozy.io/en/cozy-doctypes/docs/io.cozy.apps/#special-iocozyapps-doctypes
 *
 * @param  {CozyClient} client    cozy-client instance
 * @param  {string} id Magic Folder id. `CozyFolder.magicFolders` contains the
 * ids of folders that can be magic folders.
 * @param {string} path Default path to use if magic folder does not exist
 * @returns {Promise<IOCozyFolder>} Folder document
 */

exports.MAGIC_FOLDERS = MAGIC_FOLDERS;

var ensureMagicFolder = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(client, id, path) {
    var magicFolderDocument, existingMagicFolder, magicFoldersValues;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            magicFolderDocument = {
              _type: APP_DOCTYPE,
              _id: id
            };
            _context.next = 3;
            return getReferencedFolder(client, magicFolderDocument);

          case 3:
            existingMagicFolder = _context.sent;

            if (!existingMagicFolder) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", existingMagicFolder);

          case 6:
            magicFoldersValues = Object.values(MAGIC_FOLDERS);

            if (magicFoldersValues.includes(id)) {
              _context.next = 9;
              break;
            }

            throw new Error("Cannot create Magic folder with id ".concat(id, ". Allowed values are ").concat(magicFoldersValues.join(', '), "."));

          case 9:
            if (path) {
              _context.next = 11;
              break;
            }

            throw new Error('Magic folder default path must be defined');

          case 11:
            return _context.abrupt("return", createFolderWithReference(client, path, magicFolderDocument));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function ensureMagicFolder(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * The next functions are considered private and only exported for unit tests
 */

/**
 * Create a folder with a reference to the given document
 *
 * @param  {CozyClient}  client - cozy-client instance
 * @param  {string}  path - Folder path
 * @param  {CozyClientDocument}  document - Document to make reference to. Any doctype.
 * @returns {Promise<IOCozyFolder>}  Folder document
 */


exports.ensureMagicFolder = ensureMagicFolder;

var createFolderWithReference = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(client, path, document) {
    var collection, dirId, _yield$collection$get, dirInfos;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            collection = client.collection(_const.DOCTYPE_FILES);
            _context2.next = 3;
            return collection.ensureDirectoryExists(path);

          case 3:
            dirId = _context2.sent;
            _context2.next = 6;
            return collection.addReferencesTo(document, [{
              _id: dirId
            }]);

          case 6:
            _context2.next = 8;
            return collection.get(dirId);

          case 8:
            _yield$collection$get = _context2.sent;
            dirInfos = _yield$collection$get.data;
            return _context2.abrupt("return", dirInfos);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function createFolderWithReference(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Returns the most recent folder referenced by the given document
 *
 * @param  {CozyClient}  client    cozy-client instance
 * @param  {CozyClientDocument}  document  Document to get references from
 * @returns {Promise<IOCozyFolder>} Folder referenced by the given document
 */


exports.createFolderWithReference = createFolderWithReference;

var getReferencedFolder = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(client, document) {
    var _yield$client$collect, included, foldersOutsideTrash;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return client.collection(_const.DOCTYPE_FILES).findReferencedBy(document);

          case 2:
            _yield$client$collect = _context3.sent;
            included = _yield$client$collect.included;
            foldersOutsideTrash = included.filter(function (folder) {
              return !/^\/\.cozy_trash/.test(folder.attributes.path);
            }); // there can be multiple folders with the same reference in some edge cases
            // when this happens we return the most recent one

            return _context3.abrupt("return", foldersOutsideTrash.length > 0 ? (0, _sortBy.default)(foldersOutsideTrash, 'created_at').pop() : null);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getReferencedFolder(_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getReferencedFolder = getReferencedFolder;