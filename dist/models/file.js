"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalize = normalize;
exports.ensureFilePath = ensureFilePath;
exports.getParentFolderId = getParentFolderId;
exports.downloadFile = exports.copy = exports.fetchBlobFileById = exports.isFromKonnector = exports.hasCertifications = exports.hasQualifications = exports.isPlainText = exports.doMobileUpload = exports.readMobileFile = exports.uploadFileWithConflictStrategy = exports.generateFileNameForRevision = exports.generateNewFileNameOnConflict = exports.overrideFileForPath = exports.move = exports.getFullpath = exports.hasMetadataAttribute = exports.fetchFilesByQualificationRules = exports.saveFileQualification = exports.isSharingShorcutNew = exports.isSharingShortcutNew = exports.isSharingShorcut = exports.isSharingShortcut = exports.getSharingShortcutTargetDoctype = exports.getSharingShortcutTargetMime = exports.getSharingShortcutStatus = exports.isShortcut = exports.shouldBeOpenedByOnlyOffice = exports.isOnlyOfficeFile = exports.isEncrypted = exports.isNote = exports.isDirectory = exports.isFile = exports.splitFilename = exports.ALBUMS_DOCTYPE = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _cozyDeviceHelper = require("cozy-device-helper");

var _get = _interopRequireDefault(require("lodash/get"));

var _isString = _interopRequireDefault(require("lodash/isString"));

var _has = _interopRequireDefault(require("lodash/has"));

var _trimEnd = _interopRequireDefault(require("lodash/trimEnd"));

var _qualification = require("./document/qualification");

var _dsl = require("../queries/dsl");

var _const = require("../const");

var _CozyClient = _interopRequireDefault(require("../CozyClient"));

var _logger = _interopRequireDefault(require("../logger"));

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
 * @param {import("../types").IOCozyFile} file An io.cozy.files
 * @returns {{filename: string, extension: string}}
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
 * @param {import("../types").IOCozyFile} file io.cozy.files
 */


exports.splitFilename = splitFilename;

var isFile = function isFile(file) {
  return file && file.type === FILE_TYPE;
};
/**
 *
 * @param {import("../types").IOCozyFile} file io.cozy.files
 */


exports.isFile = isFile;

var isDirectory = function isDirectory(file) {
  return file && file.type === DIR_TYPE;
};
/**
 * Is file param a correct note
 *
 * @param {import("../types").IOCozyFile} file io.cozy.files
 * @returns {boolean}
 */


exports.isDirectory = isDirectory;

var isNote = function isNote(file) {
  if (file && file.name && file.name.endsWith('.cozy-note') && file.type === FILE_TYPE && file.metadata && file.metadata.title !== undefined && file.metadata.version !== undefined) return true;
  return false;
};
/**
 * Whether the file is client-side encrypted
 *
 * @param {import("../types").IOCozyFile} file - io.cozy.files document
 * @returns {boolean}
 */


exports.isNote = isNote;

var isEncrypted = function isEncrypted(file) {
  return !!file.encrypted;
};
/**
 * Whether the file is supported by Only Office
 *
 * @param {import("../types").IOCozyFile} file - io.cozy.file document
 * @returns {boolean}
 */


exports.isEncrypted = isEncrypted;

var isOnlyOfficeFile = function isOnlyOfficeFile(file) {
  return isFile(file) && !isNote(file) && (file.class === 'text' || file.class === 'spreadsheet' || file.class === 'slide');
};
/**
 * Whether the file should be opened by only office
 * We want to be consistent with the stack so we check the class attributes
 * But we want to exclude .txt and .md because the CozyUI Viewer can already show them
 *
 * @param {import("../types").IOCozyFile} file - io.cozy.file document
 * @returns {boolean}
 */


exports.isOnlyOfficeFile = isOnlyOfficeFile;

var shouldBeOpenedByOnlyOffice = function shouldBeOpenedByOnlyOffice(file) {
  return isOnlyOfficeFile(file) && !file.name.endsWith('.txt') && !file.name.endsWith('.md');
};
/**
 *
 * @param {import("../types").IOCozyFile} file - io.cozy.files document
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
 * @param {import("../types").IOCozyFile} file - io.cozy.files document
 *
 * @returns {string} A description of the status
 */


var getSharingShortcutStatus = function getSharingShortcutStatus(file) {
  return (0, _get.default)(file, 'metadata.sharing.status');
};
/**
 * Returns the mime type of the target of the sharing shortcut, if it is a file.
 *
 * @param {import("../types").IOCozyFile} file  - io.cozy.files document
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
 * @param {import("../types").IOCozyFile} file - io.cozy.files document
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
 * @param {import("../types").IOCozyFile} file - io.cozy.files document
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
 * @param {import("../types").IOCozyFile} file - io.cozy.files document
 *
 * @returns {boolean}
 */


exports.isSharingShortcut = isSharingShortcut;

var isSharingShorcut = function isSharingShorcut(file) {
  _logger.default.warn('Deprecation: `isSharingShorcut` is deprecated, please use `isSharingShortcut` instead');

  return isSharingShortcut(file);
};
/**
 * Returns whether the sharing shortcut is new
 *
 * @param {import("../types").IOCozyFile} file - io.cozy.files document
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
  _logger.default.warn('Deprecation: `isSharingShorcutNew` is deprecated, please use `isSharingShortcutNew` instead');

  return isSharingShortcutNew(file);
};
/**
 * Save the file with the given qualification
 *
 * @param {CozyClient} client - The CozyClient instance
 * @param {import("../types").IOCozyFile} file - The file to qualify
 * @param {object} qualification - The file qualification
 * @returns {Promise<import("../types").IOCozyFile>} The saved file
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
 * @returns {Promise<import("../types").QueryResult>} The files found by the rules
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
 * Whether the file's metadata attribute exists
 *
 * @param {object} params - Param
 * @param {import("../types").IOCozyFile} params.file - An io.cozy.files document
 * @param {string} params.attribute - Metadata attribute to check
 * @returns {boolean}
 */


exports.fetchFilesByQualificationRules = fetchFilesByQualificationRules;

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
 * Manage 4 cases :
 * - Move inside a Cozy server
 * - Move inside a Nextcloud server
 * - Move from a Nextcloud server to Cozy
 * - Move from Cozy to a Nextcloud server
 *
 * @param {CozyClient} client                                                                    - The CozyClient instance
 * @param {import('../types').IOCozyFile | import('../types').NextcloudFile} file                - The file to move (required)
 * @param {import('../types').IOCozyFolder | import('../types').NextcloudFile} destination       - The destination folder (required)
 * @param {object} options                                                                       - The options
 * @param {boolean} options.force                                                                - Whether we should overwrite,
 * i.e. put to trash, the destination in case of conflict (defaults to false).
 * @returns {Promise<{moved: undefined|import('../types').IOCozyFile, deleted: null|string[] }>} - A promise that returns the move action response (if any)
 * and the deleted file id (if any) if resolved or an Error if rejected
 */


exports.getFullpath = getFullpath;

var move = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(client, file, destination) {
    var _ref6,
        force,
        resp,
        destinationPath,
        conflictResp,
        _resp,
        _args4 = arguments;

    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _ref6 = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : {
              force: false
            }, force = _ref6.force;
            _context4.prev = 1;

            if (!(file._type === 'io.cozy.remote.nextcloud.files')) {
              _context4.next = 10;
              break;
            }

            if (!(destination._type === 'io.cozy.remote.nextcloud.files')) {
              _context4.next = 7;
              break;
            }

            _context4.next = 6;
            return client.collection('io.cozy.remote.nextcloud.files').move(file, destination);

          case 6:
            return _context4.abrupt("return", {
              moved: undefined,
              deleted: null
            });

          case 7:
            _context4.next = 9;
            return client.collection('io.cozy.remote.nextcloud.files').moveToCozy(file, destination);

          case 9:
            return _context4.abrupt("return", {
              moved: undefined,
              deleted: null
            });

          case 10:
            if (!(destination._type === 'io.cozy.remote.nextcloud.files')) {
              _context4.next = 14;
              break;
            }

            _context4.next = 13;
            return client.collection('io.cozy.remote.nextcloud.files').moveFromCozy(destination, file);

          case 13:
            return _context4.abrupt("return", {
              moved: undefined,
              deleted: null
            });

          case 14:
            _context4.next = 19;
            break;

          case 16:
            _context4.prev = 16;
            _context4.t0 = _context4["catch"](1);
            throw _context4.t0;

          case 19:
            _context4.prev = 19;
            _context4.next = 22;
            return client.collection(_const.DOCTYPE_FILES).updateFileMetadata(file._id, {
              dir_id: destination._id
            });

          case 22:
            resp = _context4.sent;
            return _context4.abrupt("return", {
              moved: resp.data,
              deleted: null
            });

          case 26:
            _context4.prev = 26;
            _context4.t1 = _context4["catch"](19);

            if (!(_context4.t1.status === 409 && force)) {
              _context4.next = 43;
              break;
            }

            _context4.next = 31;
            return getFullpath(client, destination._id, file.name);

          case 31:
            destinationPath = _context4.sent;
            _context4.next = 34;
            return client.collection(_const.DOCTYPE_FILES).statByPath(destinationPath);

          case 34:
            conflictResp = _context4.sent;
            _context4.next = 37;
            return client.collection(_const.DOCTYPE_FILES).destroy(conflictResp.data);

          case 37:
            _context4.next = 39;
            return client.collection(_const.DOCTYPE_FILES).updateFileMetadata(file._id, {
              dir_id: destination._id
            });

          case 39:
            _resp = _context4.sent;
            return _context4.abrupt("return", {
              moved: _resp.data,
              deleted: conflictResp.data.id
            });

          case 43:
            throw _context4.t1;

          case 44:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 16], [19, 26]]);
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
 * @returns {Promise<import("../types").IOCozyFile>} The overrided file
 */


exports.move = move;

var overrideFileForPath = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(client, dirPath, file, metadata) {
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
    return _ref7.apply(this, arguments);
  };
}();
/**
 * Method to generate a new filename if there is a conflict
 *
 * @param {string} filenameWithoutExtension - A filename without the extension
 * @param {import('../types').ConflictOptions} [conflictOptions] - Conflict options
 * @returns {string} A filename with the right suffix
 */


exports.overrideFileForPath = overrideFileForPath;

var generateNewFileNameOnConflict = function generateNewFileNameOnConflict(filenameWithoutExtension, conflictOptions) {
  var delimiter = (conflictOptions === null || conflictOptions === void 0 ? void 0 : conflictOptions.delimiter) || '_'; //Check if the string ends by _1

  var regex = new RegExp("(".concat(delimiter, ")([0-9]+)$"));
  var matches = filenameWithoutExtension.match(regex);

  if (matches) {
    var versionNumber = parseInt(matches[2]); //increment versionNumber

    versionNumber++;
    var newFilenameWithoutExtension = filenameWithoutExtension.replace(new RegExp("(".concat(delimiter, ")([0-9]+)$")), "".concat(delimiter).concat(versionNumber));
    return newFilenameWithoutExtension;
  } else {
    return "".concat(filenameWithoutExtension).concat(delimiter, "1");
  }
};
/**
 * Generate a file name for a revision
 *
 * @param {import("../types").IOCozyFile} file - io.cozy.files document
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
 * @property {import('../types').ConflictOptions} [conflictOptions] - Conflict options
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
  var _ref8 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(client, file, options) {
    var name, dirId, conflictStrategy, conflictOptions, path, existingFile, fileId, resp, _splitFilename2, filename, extension, newFileName;

    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            name = options.name, dirId = options.dirId, conflictStrategy = options.conflictStrategy, conflictOptions = options.conflictOptions;
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
            newFileName = generateNewFileNameOnConflict(filename, conflictOptions) + extension; //recall itself with the newFilename.

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
    return _ref8.apply(this, arguments);
  };
}();
/**
 * Read a file on a mobile
 *
 * @param {string} fileURL - The local file path (file://)
 */


exports.uploadFileWithConflictStrategy = uploadFileWithConflictStrategy;

var readMobileFile = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10(fileURL) {
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
                var _ref10 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9(fileEntry) {
                  return _regenerator.default.wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          fileEntry.file( /*#__PURE__*/function () {
                            var _ref11 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(file) {
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
                              return _ref11.apply(this, arguments);
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
                  return _ref10.apply(this, arguments);
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
    return _ref9.apply(this, arguments);
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
  var _ref13 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11(client, fileURL, options) {
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
    return _ref13.apply(this, arguments);
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
 * @param {import("../types").IOCozyFile} file - io.cozy.files document
 * @returns {boolean}
 */


exports.isPlainText = isPlainText;

var hasQualifications = function hasQualifications(file) {
  return (0, _has.default)(file, 'metadata.qualification');
};
/**
 * @param {import("../types").IOCozyFile} file - io.cozy.files document
 * @returns {boolean}
 */


exports.hasQualifications = hasQualifications;

var hasCertifications = function hasCertifications(file) {
  return (0, _get.default)(file, 'metadata.carbonCopy', false) || (0, _get.default)(file, 'metadata.electronicSafe', false);
};
/**
 * @param {import("../types").IOCozyFile} file - io.cozy.files document
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
  var _ref14 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12(client, fileId) {
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
    return _ref14.apply(this, arguments);
  };
}();
/**
 * Copies a file to a specified destination.
 *
 * @param {object} client - The client object used for making API requests.
 * @param {object} file - The file object to be copied.
 * @param {object} destination - The destination object where the file will be copied to.
 * @returns {Promise} - A promise that resolves with the response from the API.
 * @throws {Error} - If an error occurs during the API request.
 */


exports.fetchBlobFileById = fetchBlobFileById;

var copy = /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13(client, file, destination) {
    var _resp2, _resp3, _resp4, resp;

    return _regenerator.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;

            if (!(file._type === 'io.cozy.remote.nextcloud.files' && destination._type === 'io.cozy.remote.nextcloud.files')) {
              _context13.next = 6;
              break;
            }

            _context13.next = 4;
            return client.collection('io.cozy.remote.nextcloud.files').copy(file, destination);

          case 4:
            _resp2 = _context13.sent;
            return _context13.abrupt("return", _resp2);

          case 6:
            if (!(file._type === 'io.cozy.remote.nextcloud.files' && destination._type === 'io.cozy.files')) {
              _context13.next = 11;
              break;
            }

            _context13.next = 9;
            return client.collection('io.cozy.remote.nextcloud.files').moveToCozy(file, destination, {
              copy: true
            });

          case 9:
            _resp3 = _context13.sent;
            return _context13.abrupt("return", _resp3);

          case 11:
            if (!(destination._type === 'io.cozy.remote.nextcloud.files')) {
              _context13.next = 16;
              break;
            }

            _context13.next = 14;
            return client.collection('io.cozy.remote.nextcloud.files').moveFromCozy(destination, file, {
              copy: true
            });

          case 14:
            _resp4 = _context13.sent;
            return _context13.abrupt("return", _resp4);

          case 16:
            _context13.next = 18;
            return client.collection(_const.DOCTYPE_FILES).copy(file._id, undefined, destination._id);

          case 18:
            resp = _context13.sent;
            return _context13.abrupt("return", resp);

          case 22:
            _context13.prev = 22;
            _context13.t0 = _context13["catch"](0);
            throw _context13.t0;

          case 25:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 22]]);
  }));

  return function copy(_x27, _x28, _x29) {
    return _ref15.apply(this, arguments);
  };
}();
/**
 * Download the requested file
 *
 * This method can be used in a web page context or in a WebView hosted by a Flagship app
 *
 * When used in a FlagshipApp WebView context, then the action is redirected to the host app
 * that will process the download
 *
 * @param {object} params - The download parameters
 * @param {CozyClient} params.client - Instance of CozyClient
 * @param {import("../types").IOCozyFile} params.file - io.cozy.files metadata of the document to downloaded
 * @param {string} [params.url] - Blob url that should be used to download encrypted files
 * @param {import('cozy-intent').WebviewService} [params.webviewIntent] - webviewIntent that can be used to redirect the download to host Flagship app
 *
 * @returns {Promise<any>}
 */


exports.copy = copy;

var downloadFile = /*#__PURE__*/function () {
  var _ref17 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee14(_ref16) {
    var client, file, url, webviewIntent, filesCollection, _yield$webviewIntent$, isFlagshipDownloadAvailable;

    return _regenerator.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            client = _ref16.client, file = _ref16.file, url = _ref16.url, webviewIntent = _ref16.webviewIntent;
            filesCollection = client.collection(_const.DOCTYPE_FILES);

            if (!((0, _cozyDeviceHelper.isFlagshipApp)() && webviewIntent && !isEncrypted(file))) {
              _context14.next = 19;
              break;
            }

            _context14.next = 5;
            return webviewIntent === null || webviewIntent === void 0 ? void 0 : webviewIntent.call('isAvailable', 'downloadFile');

          case 5:
            _context14.t1 = _yield$webviewIntent$ = _context14.sent;
            _context14.t0 = _context14.t1 !== null;

            if (!_context14.t0) {
              _context14.next = 9;
              break;
            }

            _context14.t0 = _yield$webviewIntent$ !== void 0;

          case 9:
            if (!_context14.t0) {
              _context14.next = 13;
              break;
            }

            _context14.t2 = _yield$webviewIntent$;
            _context14.next = 14;
            break;

          case 13:
            _context14.t2 = false;

          case 14:
            isFlagshipDownloadAvailable = _context14.t2;

            if (!isFlagshipDownloadAvailable) {
              _context14.next = 19;
              break;
            }

            _context14.next = 18;
            return webviewIntent.call('downloadFile', file);

          case 18:
            return _context14.abrupt("return", _context14.sent);

          case 19:
            if (!isEncrypted(file)) {
              _context14.next = 21;
              break;
            }

            return _context14.abrupt("return", filesCollection.forceFileDownload(url, file.name));

          case 21:
            return _context14.abrupt("return", filesCollection.download(file));

          case 22:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));

  return function downloadFile(_x30) {
    return _ref17.apply(this, arguments);
  };
}();

exports.downloadFile = downloadFile;