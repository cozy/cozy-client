"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.openFileWith = exports.openOfflineFile = exports.getNativeFile = exports.saveAndOpenWithCordova = exports.temporarySave = exports.saveFileWithCordova = exports.deleteOfflineFile = exports.openFileWithCordova = exports.writeFile = exports.getDirectory = exports.createCozyPath = exports.getCozyEntry = exports.getEntry = exports.getCozyPath = exports.getTemporaryRootPath = exports.getRootPath = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cozyDeviceHelper = require("cozy-device-helper");

var _CozyClient = _interopRequireDefault(require("../CozyClient"));

var _types = require("../types");

var _logger = _interopRequireDefault(require("../logger"));

var _const = require("../const");

var ERROR_GET_DIRECTORY = 'Error to get directory';
var ERROR_WRITE_FILE = 'Error to write file';
var ERROR_GET_FILE = 'Error to get file';
var COZY_PATH = 'Cozy';
var COZY_FILES_PATH = (0, _cozyDeviceHelper.isIOS)() ? 'CozyDrive' : 'Cozy Drive';
/**
 * @typedef {object} FilesystemEntry
 */

/**
 * @type {CordovaWindow}
 */
// @ts-ignore

var win = window;
/**
 * Get root path according the OS
 *
 * @returns {string}
 */

var getRootPath = function getRootPath() {
  return (0, _cozyDeviceHelper.isAndroidApp)() ? win.cordova.file.externalDataDirectory : win.cordova.file.dataDirectory;
};
/**
 * Get the temporary root path according to the OS
 */


exports.getRootPath = getRootPath;

var getTemporaryRootPath = function getTemporaryRootPath() {
  return (0, _cozyDeviceHelper.isAndroidApp)() ? win.cordova.file.externalCacheDirectory : win.cordova.file.cacheDirectory;
};
/**
 * Get Cozy path according to the OS
 *
 * @returns {string}
 */


exports.getTemporaryRootPath = getTemporaryRootPath;

var getCozyPath = function getCozyPath() {
  return COZY_PATH + '/' + COZY_FILES_PATH + '/';
};
/**
 * Get entry of a path in the cordova.file location
 *
 * @param {string} path - Path wanting to be getted
 * @returns {Promise<FilesystemEntry>}
 */


exports.getCozyPath = getCozyPath;

var getEntry = function getEntry(path) {
  return new Promise(function (resolve, reject) {
    win.resolveLocalFileSystemURL(path, resolve, function (err) {
      _logger.default.error("".concat(path, " could not be resolved: ").concat(err.message));

      reject(err);
    });
  });
};
/**
 * Get Cozy location on the device
 */


exports.getEntry = getEntry;

var getCozyEntry = function getCozyEntry() {
  return getEntry(getRootPath() + getCozyPath()).catch(function () {
    return createCozyPath();
  });
};
/**
 * Create Cozy path on the device
 */


exports.getCozyEntry = getCozyEntry;

var createCozyPath = function createCozyPath() {
  return getEntry(getRootPath()).then(function (entry) {
    return getDirectory(entry, COZY_PATH).then(function (entry) {
      return getDirectory(entry, COZY_FILES_PATH);
    });
  });
};
/**
 * Get the directory according to its name
 *
 * @param {object} rootDirEntry - The root directory entry
 * @param {string} folderName - The folder's name
 */


exports.createCozyPath = createCozyPath;

var getDirectory = function getDirectory(rootDirEntry, folderName) {
  return new Promise(function (resolve, reject) {
    rootDirEntry.getDirectory(folderName, {
      create: true
    }, resolve, function (error) {
      _logger.default.warn(ERROR_GET_DIRECTORY, folderName);

      _logger.default.warn(error);

      reject(ERROR_GET_DIRECTORY);
    });
  });
};
/**
 * @param {object} fileEntry - The file entry
 * @param {object} dataObj - The data to be written
 */


exports.getDirectory = getDirectory;

var writeFile = function writeFile(fileEntry, dataObj) {
  return new Promise(function (resolve, reject) {
    fileEntry.createWriter(function (fileWriter) {
      fileWriter.onwriteend = function () {
        resolve(fileEntry);
      };

      fileWriter.onerror = function (error) {
        _logger.default.warn(ERROR_WRITE_FILE);

        _logger.default.warn(error);

        reject(ERROR_WRITE_FILE);
      };

      fileWriter.write(dataObj);
    });
  });
};
/**
 * @param {object} dirEntry - The directory entry
 * @param {object} fileData - The file data
 * @param {string} fileName - The file name
 */


exports.writeFile = writeFile;

var saveFile = function saveFile(dirEntry, fileData, fileName) {
  return new Promise(function (resolve, reject) {
    dirEntry.getFile(fileName, {
      create: true,
      exclusive: false
    }, function (fileEntry) {
      writeFile(fileEntry, fileData).then(function () {
        resolve(fileEntry);
      }).catch(reject);
    }, function (error) {
      _logger.default.warn(ERROR_GET_FILE);

      _logger.default.warn(error);

      reject(ERROR_GET_FILE);
    });
  });
};
/**
 * Open a file in an other app
 *
 * @param {*} URI - URI to be opened
 * @param {*} mimetype - Mimetype of the opened file
 */


var openFileWithCordova = function openFileWithCordova(URI, mimetype) {
  return new Promise(function (resolve, reject) {
    var callbacks = {
      error: reject,
      success: resolve
    };
    win.cordova.plugins.fileOpener2.open(URI, mimetype, callbacks);
  });
};
/**
 * @param {string} fileName - The file name
 */


exports.openFileWithCordova = openFileWithCordova;

var deleteOfflineFile = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(fileName) {
    var entry, fileEntry;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getCozyEntry();

          case 2:
            entry = _context.sent;
            _context.next = 5;
            return getEntry("".concat(entry.nativeURL).concat(fileName));

          case 5:
            fileEntry = _context.sent;
            return _context.abrupt("return", fileEntry.remove());

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function deleteOfflineFile(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * @param {object} fileData - The file data
 * @param {string} fileName - The file name
 */


exports.deleteOfflineFile = deleteOfflineFile;

var saveFileWithCordova = function saveFileWithCordova(fileData, fileName) {
  return getCozyEntry().then(function (entry) {
    return saveFile(entry, fileData, fileName);
  });
};
/**
 * Save the document in the temporary folder
 *
 * @param {object} file - io.cozy.files document
 * @param {string} fileName - The file name
 */


exports.saveFileWithCordova = saveFileWithCordova;

var temporarySave = function temporarySave(file, fileName) {
  return getEntry(getTemporaryRootPath()).then(function (entry) {
    return saveFile(entry, file, fileName);
  });
};
/**
 * Save the document in the temporary folder and open it in an other app
 *
 * @param {Blob} blob - Binary of the file
 * @param {object} file - io.cozy.files document
 */


exports.temporarySave = temporarySave;

var saveAndOpenWithCordova = function saveAndOpenWithCordova(blob, file) {
  return temporarySave(blob, file.name).then(function (entry) {
    return openFileWithCordova(entry.nativeURL, file.mime);
  });
};
/**
 * @param {object} file - io.cozy.files document
 */


exports.saveAndOpenWithCordova = saveAndOpenWithCordova;

var getNativeFile = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(file) {
    var entry;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getCozyEntry();

          case 2:
            entry = _context2.sent;
            return _context2.abrupt("return", getEntry("".concat(entry.nativeURL).concat(file.id)));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getNativeFile(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * @param {object} file - io.cozy.files document
 */


exports.getNativeFile = getNativeFile;

var openOfflineFile = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(file) {
    var fileEntry;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getNativeFile(file);

          case 2:
            fileEntry = _context3.sent;
            return _context3.abrupt("return", openFileWithCordova(fileEntry.nativeURL, file.mime));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function openOfflineFile(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * openFileWith - Opens a file on a mobile device
 *
 * @param {CozyClient} client - The CozyClient instance
 * @param {object} file - io.cozy.files document
 */


exports.openOfflineFile = openOfflineFile;

var openFileWith = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(client, file) {
    var fileData, blob;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!((0, _cozyDeviceHelper.isMobileApp)() && win.cordova.plugins.fileOpener2)) {
              _context4.next = 23;
              break;
            }

            _context4.prev = 1;
            _context4.next = 4;
            return client.collection(_const.DOCTYPE_FILES).fetchFileContent(file.id);

          case 4:
            fileData = _context4.sent;
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](1);
            throw _context4.t0.status === 404 ? 'missing' : 'offline';

          case 10:
            _context4.next = 12;
            return fileData.blob();

          case 12:
            blob = _context4.sent;
            _context4.prev = 13;
            _context4.next = 16;
            return fsnative.saveAndOpenWithCordova(blob, file);

          case 16:
            _context4.next = 21;
            break;

          case 18:
            _context4.prev = 18;
            _context4.t1 = _context4["catch"](13);
            throw 'noapp';

          case 21:
            _context4.next = 24;
            break;

          case 23:
            throw 'noapp';

          case 24:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 7], [13, 18]]);
  }));

  return function openFileWith(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();

exports.openFileWith = openFileWith;
var fsnative = {
  saveAndOpenWithCordova: saveAndOpenWithCordova
};
var _default = fsnative;
exports.default = _default;