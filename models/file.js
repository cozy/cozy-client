"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalize = normalize;
exports.ensureFilePath = ensureFilePath;
exports.getParentFolderId = getParentFolderId;
exports.fetchBlobFileById = exports.isFromKonnector = exports.hasCertifications = exports.hasQualifications = exports.isPlainText = exports.doMobileUpload = exports.readMobileFile = exports.uploadFileWithConflictStrategy = exports.generateFileNameForRevision = exports.generateNewFileNameOnConflict = exports.overrideFileForPath = exports.move = exports.getFullpath = exports.hasMetadataAttribute = exports.isReferencedByAlbum = exports.fetchFilesByQualificationRules = exports.saveFileQualification = exports.isSharingShorcutNew = exports.isSharingShortcutNew = exports.isSharingShorcut = exports.isSharingShortcut = exports.getSharingShortcutTargetDoctype = exports.getSharingShortcutTargetMime = exports.getSharingShortcutStatus = exports.isShortcut = exports.shouldBeOpenedByOnlyOffice = exports.isOnlyOfficeFile = exports.isNote = exports.isDirectory = exports.isFile = exports.splitFilename = exports.ALBUMS_DOCTYPE = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _get = _interopRequireDefault(require("lodash/get"));

var _isString = _interopRequireDefault(require("lodash/isString"));

var _has = _interopRequireDefault(require("lodash/has"));

var _trimEnd = _interopRequireDefault(require("lodash/trimEnd"));

var _qualification = require("./document/qualification");

var _dsl = require("../queries/dsl");

var _types = require("../types");

var _const = require("../const");

var _CozyClient = _interopRequireDefault(require("../CozyClient"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var FILE_TYPE = 'file';
var DIR_TYPE = 'directory';
var ALBUMS_DOCTYPE = 'io.cozy.photos.albums';
exports.ALBUMS_DOCTYPE = ALBUMS_DOCTYPE;
var FILENAME_WITH_EXTENSION_REGEX = /(.+)(\..*)$/;
/**
 * Returns base filename and extension
 *
 * @param {IOCozyFile} file An io.cozy.files
 * @returns {object}  {filename, extension}
 */

var splitFilename = function splitFilename(file) {
  if (!(0, _isString.default)(file.name)) throw new Error('file should have a name property');

  if (file.type === 'file') {
    var match = file.name.match(FILENAME_WITH_EXTENSION_REGEX);

    if (match) {
      return {
        filename: match[1],
        extension: match[2]
      };
    }
  }

  return {
    filename: file.name,
    extension: ''
  };
};
/**
 *
 * @param {IOCozyFile} file io.cozy.files
 */


exports.splitFilename = splitFilename;

var isFile = function isFile(file) {
  return file && file.type === FILE_TYPE;
};
/**
 *
 * @param {IOCozyFile} file io.cozy.files
 */


exports.isFile = isFile;

var isDirectory = function isDirectory(file) {
  return file && file.type === DIR_TYPE;
};
/**
 *
 * @param {IOCozyFile} file io.cozy.files
 */


exports.isDirectory = isDirectory;

var isNote = function isNote(file) {
  if (file && file.name && file.name.endsWith('.cozy-note') && file.type === FILE_TYPE && file.metadata && file.metadata.content !== undefined && file.metadata.schema !== undefined && file.metadata.title !== undefined && file.metadata.version !== undefined) return true;
  return false;
};
/**
 * Whether the file is supported by Only Office
 *
 * @param {IOCozyFile} file - io.cozy.file document
 * @returns {boolean}
 */


exports.isNote = isNote;

var isOnlyOfficeFile = function isOnlyOfficeFile(file) {
  return isFile(file) && !isNote(file) && (file.class === 'text' || file.class === 'spreadsheet' || file.class === 'slide');
};
/**
 * Whether the file should be opened by only office
 * We want to be consistent with the stack so we check the class attributes
 * But we want to exclude .txt and .md because the CozyUI Viewer can already show them
 *
 * @param {IOCozyFile} file - io.cozy.file document
 * @returns {boolean}
 */


exports.isOnlyOfficeFile = isOnlyOfficeFile;

var shouldBeOpenedByOnlyOffice = function shouldBeOpenedByOnlyOffice(file) {
  return isOnlyOfficeFile(file) && !file.name.endsWith('.txt') && !file.name.endsWith('.md');
};
/**
 *
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {boolean} true if the file is a shortcut
 */


exports.shouldBeOpenedByOnlyOffice = shouldBeOpenedByOnlyOffice;

var isShortcut = function isShortcut(file) {
  return file && file.class === 'shortcut';
};
/**
 * Normalizes an object representing a io.cozy.files object
 *
 * Ensures existence of `_id` and `_type`
 *
 * @public
 * @param {object} file - object representing the file
 * @returns {object} full normalized object
 */


exports.isShortcut = isShortcut;

function normalize(file) {
  var id = file._id || file.id;
  var doctype = file._type || _const.DOCTYPE_FILES;
  return _objectSpread({
    _id: id,
    id: id,
    _type: doctype
  }, file);
}
/**
 * Ensure the file has a `path` attribute, or build it
 *
 * @public
 * @param {object} file - object representing the file
 * @param {object} parent - parent directory for the file
 * @returns {object} file object with path attribute
 */


function ensureFilePath(file, parent) {
  if (file.path) return file;
  if (!parent || !parent.path) throw new Error("Could not define a file path for ".concat(file._id || file.id));
  var path = parent.path + '/' + file.name;
  return _objectSpread({
    path: path
  }, file);
}
/**
 * Get the id of the parent folder (`null` for the root folder)
 *
 * @param {object} file  - io.cozy.files document
 * @returns {string|null} id of the parent folder, if any
 */


function getParentFolderId(file) {
  var parentId = (0, _get.default)(file, 'attributes.dir_id');
  return parentId === '' ? null : parentId;
}
/**
 * Returns the status of a sharing shortcut.
 *
 * @param {IOCozyFile} file - io.cozy.files document
 *
 * @returns {string} A description of the status
 */


var getSharingShortcutStatus = function getSharingShortcutStatus(file) {
  return (0, _get.default)(file, 'metadata.sharing.status');
};
/**
 * Returns the mime type of the target of the sharing shortcut, if it is a file.
 *
 * @param {IOCozyFile} file  - io.cozy.files document
 *
 * @returns {string} The mime-type of the target file, or an empty string is the target is not a file.
 */


exports.getSharingShortcutStatus = getSharingShortcutStatus;

var getSharingShortcutTargetMime = function getSharingShortcutTargetMime(file) {
  return (0, _get.default)(file, 'metadata.target.mime');
};
/**
 * Returns the doctype of the target of the sharing shortcut.
 *
 * @param {IOCozyFile} file - io.cozy.files document
 *
 * @returns {string} A doctype
 */


exports.getSharingShortcutTargetMime = getSharingShortcutTargetMime;

var getSharingShortcutTargetDoctype = function getSharingShortcutTargetDoctype(file) {
  return (0, _get.default)(file, 'metadata.target._type');
};
/**
 * Returns whether the file is a shortcut to a sharing
 *
 * @param {IOCozyFile} file - io.cozy.files document
 *
 * @returns {boolean}
 */


exports.getSharingShortcutTargetDoctype = getSharingShortcutTargetDoctype;

var isSharingShortcut = function isSharingShortcut(file) {
  return Boolean(getSharingShortcutStatus(file));
};
/**
 * Returns whether the file is a shortcut to a sharing
 *
 * @deprecated Prefer to use isSharingShortcut.
 * @param {IOCozyFile} file - io.cozy.files document
 *
 * @returns {boolean}
 */


exports.isSharingShortcut = isSharingShortcut;

var isSharingShorcut = function isSharingShorcut(file) {
  console.warn('Deprecation: `isSharingShorcut` is deprecated, please use `isSharingShortcut` instead');
  return isSharingShortcut(file);
};
/**
 * Returns whether the sharing shortcut is new
 *
 * @param {IOCozyFile} file - io.cozy.files document
 *
 * @returns {boolean}
 */


exports.isSharingShorcut = isSharingShorcut;

var isSharingShortcutNew = function isSharingShortcutNew(file) {
  return getSharingShortcutStatus(file) === 'new';
};
/**
 * Returns whether the sharing shortcut is new
 *
 * @deprecated Prefer to use isSharingShortcutNew.
 * @param {object} file - io.cozy.files document
 *
 * @returns {boolean}
 */


exports.isSharingShortcutNew = isSharingShortcutNew;

var isSharingShorcutNew = function isSharingShorcutNew(file) {
  console.warn('Deprecation: `isSharingShorcutNew` is deprecated, please use `isSharingShortcutNew` instead');
  return isSharingShortcutNew(file);
};
/**
 * Save the file with the given qualification
 *
 * @param {CozyClient} client - The CozyClient instance
 * @param {IOCozyFile} file - The file to qualify
 * @param {object} qualification - The file qualification
 * @returns {Promise<IOCozyFile>} The saved file
 */


exports.isSharingShorcutNew = isSharingShorcutNew;

var saveFileQualification = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(client, file, qualification) {
    var qualifiedFile;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            qualifiedFile = (0, _qualification.setQualification)(file, qualification);
            return _context.abrupt("return", client.collection(_const.DOCTYPE_FILES).updateMetadataAttribute(file._id, qualifiedFile.metadata));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function saveFileQualification(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Helper to query files based on qualification rules
 *
 * @param {object} client - The CozyClient instance
 * @param {object} docRules - the rules containing the searched qualification and the count
 * @returns {Promise<QueryResult>} The files found by the rules
 */


exports.saveFileQualification = saveFileQualification;

var fetchFilesByQualificationRules = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(client, docRules) {
    var rules, count, query, result;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            rules = docRules.rules, count = docRules.count;
            query = (0, _dsl.Q)(_const.DOCTYPE_FILES).where(_objectSpread({}, rules)).partialIndex({
              trashed: false
            }).indexFields(['cozyMetadata.updatedAt', 'metadata.qualification']).sortBy([{
              'cozyMetadata.updatedAt': 'desc'
            }]).limitBy(count ? count : 1);
            _context2.next = 4;
            return client.query(query);

          case 4:
            result = _context2.sent;
            return _context2.abrupt("return", result);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function fetchFilesByQualificationRules(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Whether the file is referenced by an album
 *
 * @param {IOCozyFile} file - An io.cozy.files document
 * @returns {boolean}
 */


exports.fetchFilesByQualificationRules = fetchFilesByQualificationRules;

var isReferencedByAlbum = function isReferencedByAlbum(file) {
  if (file.relationships && file.relationships.referenced_by && file.relationships.referenced_by.data && file.relationships.referenced_by.data.length > 0) {
    var references = file.relationships.referenced_by.data;

    var _iterator = _createForOfIteratorHelper(references),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var reference = _step.value;

        if (reference.type === ALBUMS_DOCTYPE) {
          return true;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  return false;
};
/**
 * Whether the file's metadata attribute exists
 *
 * @param {object} params - Param
 * @param {IOCozyFile} params.file - An io.cozy.files document
 * @param {string} params.attribute - Metadata attribute to check
 * @returns {boolean}
 */


exports.isReferencedByAlbum = isReferencedByAlbum;

var hasMetadataAttribute = function hasMetadataAttribute(_ref3) {
  var file = _ref3.file,
      attribute = _ref3.attribute;
  return (0, _has.default)(file, "metadata.".concat(attribute));
};
/**
 * async getFullpath - Gets a file's path
 *
 * @param {CozyClient} client - The CozyClient instance
 * @param {string} dirId  - The id of the parent directory
 * @param {string} name  - The file's name
 * @returns {Promise<string>} The full path of the file in the cozy
 **/


exports.hasMetadataAttribute = hasMetadataAttribute;

var getFullpath = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(client, dirId, name) {
    var _yield$client$query, parentDir, parentDirectoryPath;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (dirId) {
              _context3.next = 2;
              break;
            }

            throw new Error('You must provide a dirId');

          case 2:
            _context3.next = 4;
            return client.query((0, _dsl.Q)(_const.DOCTYPE_FILES).getById(dirId));

          case 4:
            _yield$client$query = _context3.sent;
            parentDir = _yield$client$query.data;
            parentDirectoryPath = (0, _trimEnd.default)(parentDir.path, '/');
            return _context3.abrupt("return", "".concat(parentDirectoryPath, "/").concat(name));

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getFullpath(_x6, _x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Move file to destination.
 *
 * @param {CozyClient} client             - The CozyClient instance
 * @param   {string} fileId               - The file's id (required)
 * @param   {object} destination          - The destination object containing:
 * @param   {string} destination.folderId - The destination folder's id (required)
 * @param   {string} destination.path     - The file's path after the move (optional, used to optimize performance in case of conflict)
 * @param   {boolean} force               - Whether we should overwrite, i.e. put to trash, the destination in case of conflict (defaults to false).
 * @returns {Promise}                     - A promise that returns the move action response and the deleted file id (if any) if resolved or an Error if rejected
 *
 */


exports.getFullpath = getFullpath;

var move = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(client, fileId, destination) {
    var force,
        folderId,
        path,
        resp,
        destinationPath,
        _yield$client$query2,
        movedFile,
        filename,
        conflictResp,
        _resp,
        _args4 = arguments;

    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            force = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : false;
            folderId = destination.folderId, path = destination.path;
            _context4.prev = 2;
            _context4.next = 5;
            return client.collection(_const.DOCTYPE_FILES).updateFileMetadata(fileId, {
              dir_id: folderId
            });

          case 5:
            resp = _context4.sent;
            return _context4.abrupt("return", {
              moved: resp.data,
              deleted: null
            });

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](2);

            if (!(_context4.t0.status === 409 && force)) {
              _context4.next = 35;
              break;
            }

            if (!path) {
              _context4.next = 16;
              break;
            }

            destinationPath = path;
            _context4.next = 24;
            break;

          case 16:
            _context4.next = 18;
            return client.query((0, _dsl.Q)(_const.DOCTYPE_FILES).getById(fileId));

          case 18:
            _yield$client$query2 = _context4.sent;
            movedFile = _yield$client$query2.data;
            filename = movedFile.name;
            _context4.next = 23;
            return getFullpath(client, folderId, filename);

          case 23:
            destinationPath = _context4.sent;

          case 24:
            _context4.next = 26;
            return client.collection(_const.DOCTYPE_FILES).statByPath(destinationPath);

          case 26:
            conflictResp = _context4.sent;
            _context4.next = 29;
            return client.collection(_const.DOCTYPE_FILES).destroy(conflictResp.data);

          case 29:
            _context4.next = 31;
            return client.collection(_const.DOCTYPE_FILES).updateFileMetadata(fileId, {
              dir_id: folderId
            });

          case 31:
            _resp = _context4.sent;
            return _context4.abrupt("return", {
              moved: _resp.data,
              deleted: conflictResp.data.id
            });

          case 35:
            throw _context4.t0;

          case 36:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 9]]);
  }));

  return function move(_x9, _x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 *
 * Method to upload a file even if a file with the same name already exists.
 *
 * @param {CozyClient} client   - The CozyClient instance
 * @param {string} dirPath      - Fullpath of directory to upload to ex: path/to/
 * @param {object} file         - HTML Object file
 * @param {object} metadata     - An object containing the wanted metadata to attach
 * @returns {Promise<IOCozyFile>} The overrided file
 */


exports.move = move;

var overrideFileForPath = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(client, dirPath, file, metadata) {
    var path, filesCollection, existingFile, _existingFile$data, fileId, dirId, resp, _dirId, createdFile;

    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            path = dirPath;
            if (!path.endsWith('/')) path = path + '/';
            filesCollection = client.collection(_const.DOCTYPE_FILES);
            _context5.prev = 3;
            _context5.next = 6;
            return filesCollection.statByPath(path + file.name);

          case 6:
            existingFile = _context5.sent;
            _existingFile$data = existingFile.data, fileId = _existingFile$data.id, dirId = _existingFile$data.dir_id;
            _context5.next = 10;
            return filesCollection.updateFile(file, {
              dirId: dirId,
              fileId: fileId,
              metadata: metadata
            });

          case 10:
            resp = _context5.sent;
            return _context5.abrupt("return", resp);

          case 14:
            _context5.prev = 14;
            _context5.t0 = _context5["catch"](3);

            if (!/Not Found/.test(_context5.t0)) {
              _context5.next = 24;
              break;
            }

            _context5.next = 19;
            return filesCollection.ensureDirectoryExists(path);

          case 19:
            _dirId = _context5.sent;
            _context5.next = 22;
            return filesCollection.createFile(file, {
              dirId: _dirId,
              metadata: metadata
            });

          case 22:
            createdFile = _context5.sent;
            return _context5.abrupt("return", createdFile);

          case 24:
            throw _context5.t0;

          case 25:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[3, 14]]);
  }));

  return function overrideFileForPath(_x12, _x13, _x14, _x15) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * Method to generate a new filename if there is a conflict
 *
 * @param {string} filenameWithoutExtension - A filename without the extension
 * @returns {string} A filename with the right suffix
 */


exports.overrideFileForPath = overrideFileForPath;

var generateNewFileNameOnConflict = function generateNewFileNameOnConflict(filenameWithoutExtension) {
  //Check if the string ends by _1
  var regex = new RegExp('(_)([0-9]+)$');
  var matches = filenameWithoutExtension.match(regex);

  if (matches) {
    var versionNumber = parseInt(matches[2]); //increment versionNumber

    versionNumber++;
    var newFilenameWithoutExtension = filenameWithoutExtension.replace(new RegExp('(_)([0-9]+)$'), "_".concat(versionNumber));
    return newFilenameWithoutExtension;
  } else {
    return "".concat(filenameWithoutExtension, "_1");
  }
};
/**
 * Generate a file name for a revision
 *
 * @param {IOCozyFile} file - io.cozy.files document
 * @param {object} revision - The revision containing the updated_at
 * @param {function} f      - A function taking a a date and a format as arguments to generate the name.
 */


exports.generateNewFileNameOnConflict = generateNewFileNameOnConflict;

var generateFileNameForRevision = function generateFileNameForRevision(file, revision, f) {
  var _splitFilename = splitFilename(file),
      filename = _splitFilename.filename,
      extension = _splitFilename.extension;

  return "".concat(filename, "_").concat(f(revision.updated_at, 'DD MMMM - HH[h]mm')).concat(extension);
};
/**
 * @typedef FileUploadOptions
 * @property {string} [name]              - The file name to upload
 * @property {string} [dirId]             - The dirId to upload the file to
 * @property {object} [metadata]          - An object containing the metadata to attach
 * @property {string} [contentType]       - The file Content-Type
 * @property {string} [conflictStrategy]  - Erase / rename
 */

/**
 * The goal of this method is to upload a file based on a conflict strategy.
 * Be careful: We need to check if the file exists by doing a statByPath query
 * before trying to upload the file since if we post and the stack return a
 * 409 conflict, we will get a SPDY_ERROR_PROTOCOL on Chrome. This is the only
 * viable workaround
 * If there is no conflict, then we upload the file.
 * If there is a conflict, then we apply the conflict strategy : `erase` or `rename`:
 *   - The `erase` strategy means an upload with a new version
 *   - The `rename` strategy means a new upload with a new name
 *
 * @param {CozyClient} client         - The CozyClient instance
 * @param {string|ArrayBuffer} file   - Can be the file path (file://) or the binary itself
 * @param {FileUploadOptions} options - The upload options
 */


exports.generateFileNameForRevision = generateFileNameForRevision;

var uploadFileWithConflictStrategy = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(client, file, options) {
    var name, dirId, conflictStrategy, path, existingFile, fileId, resp, _splitFilename2, filename, extension, newFileName;

    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            name = options.name, dirId = options.dirId, conflictStrategy = options.conflictStrategy;
            _context6.prev = 1;
            _context6.next = 4;
            return getFullpath(client, dirId, name);

          case 4:
            path = _context6.sent;
            _context6.next = 7;
            return client.collection(_const.DOCTYPE_FILES).statByPath(path);

          case 7:
            existingFile = _context6.sent;
            fileId = existingFile.data.id;

            if (!(conflictStrategy === 'erase')) {
              _context6.next = 16;
              break;
            }

            _context6.next = 12;
            return client.collection(_const.DOCTYPE_FILES).updateFile(file, _objectSpread(_objectSpread({}, options), {}, {
              fileId: fileId
            }));

          case 12:
            resp = _context6.sent;
            return _context6.abrupt("return", resp);

          case 16:
            // @ts-ignore
            _splitFilename2 = splitFilename({
              name: name,
              type: 'file'
            }), filename = _splitFilename2.filename, extension = _splitFilename2.extension;
            newFileName = generateNewFileNameOnConflict(filename) + extension; //recall itself with the newFilename.

            return _context6.abrupt("return", uploadFileWithConflictStrategy(client, file, _objectSpread(_objectSpread({}, options), {}, {
              name: newFileName
            })));

          case 19:
            _context6.next = 26;
            break;

          case 21:
            _context6.prev = 21;
            _context6.t0 = _context6["catch"](1);

            if (!/Not Found/.test(_context6.t0.message)) {
              _context6.next = 25;
              break;
            }

            return _context6.abrupt("return", client.collection(_const.DOCTYPE_FILES).createFile(file, options));

          case 25:
            throw _context6.t0;

          case 26:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 21]]);
  }));

  return function uploadFileWithConflictStrategy(_x16, _x17, _x18) {
    return _ref7.apply(this, arguments);
  };
}();
/**
 * Read a file on a mobile
 *
 * @param {string} fileURL - The local file path (file://)
 */


exports.uploadFileWithConflictStrategy = uploadFileWithConflictStrategy;

var readMobileFile = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10(fileURL) {
    var p;
    return _regenerator.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            /** Cordova plugin doesn't support promise since they are supporting Android 4.X.X
             * so we have to create manually a promise to be able to write beautiful code ;)
             */
            p = new Promise(function (resolve, reject) {
              var onResolvedLocalFS = /*#__PURE__*/function () {
                var _ref9 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9(fileEntry) {
                  return _regenerator.default.wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          fileEntry.file( /*#__PURE__*/function () {
                            var _ref10 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(file) {
                              var reader;
                              return _regenerator.default.wrap(function _callee8$(_context8) {
                                while (1) {
                                  switch (_context8.prev = _context8.next) {
                                    case 0:
                                      reader = new FileReader();
                                      reader.onloadend = /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
                                        return _regenerator.default.wrap(function _callee7$(_context7) {
                                          while (1) {
                                            switch (_context7.prev = _context7.next) {
                                              case 0:
                                                resolve(reader.result);

                                              case 1:
                                              case "end":
                                                return _context7.stop();
                                            }
                                          }
                                        }, _callee7);
                                      })); // Read the file as an ArrayBuffer

                                      reader.readAsArrayBuffer(file);

                                    case 3:
                                    case "end":
                                      return _context8.stop();
                                  }
                                }
                              }, _callee8);
                            }));

                            return function (_x21) {
                              return _ref10.apply(this, arguments);
                            };
                          }(), function (err) {
                            // Since this module is pretty recent, let's have this info in sentry if needed
                            console.error('error getting fileentry file!' + err); // eslint-disable-line no-console

                            reject(err);
                          });

                        case 1:
                        case "end":
                          return _context9.stop();
                      }
                    }
                  }, _callee9);
                }));

                return function onResolvedLocalFS(_x20) {
                  return _ref9.apply(this, arguments);
                };
              }();

              var onError = function onError(error) {
                reject(error);
              };
              /**
               * file:/// can not be converted to a fileEntry without the Cordova's File plugin.
               * `resolveLocalFileSystemURL` is provided by this plugin and can resolve the native
               * path to a fileEntry readable by a `FileReader`
               *
               * When we finished to read the fileEntry as buffer, we start the upload process
               *
               */
              // @ts-ignore


              window.resolveLocalFileSystemURL(fileURL, onResolvedLocalFS, onError);
            });
            return _context10.abrupt("return", p);

          case 2:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function readMobileFile(_x19) {
    return _ref8.apply(this, arguments);
  };
}();
/**
 * Upload a file on a mobile
 *
 * @param {CozyClient} client         - The CozyClient instance
 * @param {string} fileURL            - The local file path (file://)
 * @param {FileUploadOptions} options - The upload options
 */


exports.readMobileFile = readMobileFile;

var doMobileUpload = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11(client, fileURL, options) {
    var file;
    return _regenerator.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return readMobileFile(fileURL);

          case 2:
            file = _context11.sent;
            return _context11.abrupt("return", uploadFileWithConflictStrategy(client, file, options));

          case 4:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function doMobileUpload(_x22, _x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();
/**
 * @param {string} [mimeType=''] - Mime type of file
 * @param {string} [fileName=''] - Name of file
 * @returns {boolean}
 */


exports.doMobileUpload = doMobileUpload;

var isPlainText = function isPlainText() {
  var mimeType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var fileName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return mimeType ? /^text\//.test(mimeType) : /\.(txt|md)$/.test(fileName);
};
/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {boolean}
 */


exports.isPlainText = isPlainText;

var hasQualifications = function hasQualifications(file) {
  return (0, _has.default)(file, 'metadata.qualification');
};
/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {boolean}
 */


exports.hasQualifications = hasQualifications;

var hasCertifications = function hasCertifications(file) {
  return (0, _get.default)(file, 'metadata.carbonCopy', false) || (0, _get.default)(file, 'metadata.electronicSafe', false);
};
/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {boolean}
 */


exports.hasCertifications = hasCertifications;

var isFromKonnector = function isFromKonnector(file) {
  return (0, _has.default)(file, 'cozyMetadata.sourceAccount');
};
/**
 * @param {CozyClient} client - Instance of CozyClient
 * @param {string} fileId - Id of io.cozy.files document
 * @returns {Promise<Blob>}
 */


exports.isFromKonnector = isFromKonnector;

var fetchBlobFileById = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12(client, fileId) {
    var fileColl, fileBin, fileBlob;
    return _regenerator.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            fileColl = client.collection(_const.DOCTYPE_FILES);
            _context12.next = 3;
            return fileColl.fetchFileContentById(fileId);

          case 3:
            fileBin = _context12.sent;
            _context12.next = 6;
            return fileBin.blob();

          case 6:
            fileBlob = _context12.sent;
            return _context12.abrupt("return", fileBlob);

          case 8:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function fetchBlobFileById(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();

exports.fetchBlobFileById = fetchBlobFileById;