"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findKonnectorAccountFolderByReference = exports.buildFolderPermission = exports.buildFolderPath = exports.statDirectoryByPath = exports.createDirectoryByPath = exports.ensureKonnectorFolder = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _folder = require("./folder");

var _CozyClient = _interopRequireDefault(require("../CozyClient"));

var _account = require("./account");

var _locales = require("./document/locales");

var _dsl = require("../queries/dsl");

//@ts-check
var FILES_DOCTYPE = 'io.cozy.files';
var PERMISSIONS_DOCTYPE = 'io.cozy.permissions'; // Default name for base directory

var DEFAULT_LOCALIZED_BASE_DIR = 'Administrative';
/**
 * Ensures the destination folder of a konnector exists and is initiated with proper permissions and references
 *
 * @param {CozyClient} client - CozyClient instance
 * @param {Object} options - options object
 * @param {import('../types').IOCozyKonnector} options.konnector - io.cozy.konnectors document
 * @param {import('../types').IOCozyAccount} options.account - io.cozy.accounts document
 * @param {String} options.lang - instance current language. ex: 'fr'
 * @returns {Promise<import('../types').IOCozyFolder>}
 */

var ensureKonnectorFolder = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(client, _ref) {
    var konnector, account, lang, permissions, fileCollection, t, _yield$Promise$all, _yield$Promise$all2, adminFolder, photosFolder, sourceAccountIdentifier, alreadyExistingAccountFolder, alreadyExistingKonnectorMainFolder, path, folder, _yield$fileCollection, konnectorFolder;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            konnector = _ref.konnector, account = _ref.account, lang = _ref.lang;
            permissions = client.collection(PERMISSIONS_DOCTYPE);
            fileCollection = client.collection(FILES_DOCTYPE);
            t = (0, _locales.getLocalizer)(lang);
            _context.next = 6;
            return Promise.all([(0, _folder.ensureMagicFolder)(client, _folder.MAGIC_FOLDERS.ADMINISTRATIVE, t('MagicFolders.administrative')), (0, _folder.ensureMagicFolder)(client, _folder.MAGIC_FOLDERS.PHOTOS, t('MagicFolders.photos'))]);

          case 6:
            _yield$Promise$all = _context.sent;
            _yield$Promise$all2 = (0, _slicedToArray2.default)(_yield$Promise$all, 2);
            adminFolder = _yield$Promise$all2[0];
            photosFolder = _yield$Promise$all2[1];
            sourceAccountIdentifier = (0, _account.getAccountName)(account);
            _context.next = 13;
            return findKonnectorAccountFolderByReference({
              client: client,
              slug: konnector.slug,
              sourceAccountIdentifier: sourceAccountIdentifier
            });

          case 13:
            alreadyExistingAccountFolder = _context.sent;

            if (!alreadyExistingAccountFolder) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", alreadyExistingAccountFolder);

          case 16:
            _context.next = 18;
            return findKonnectorMainFolderByReference({
              client: client,
              slug: konnector.slug
            });

          case 18:
            alreadyExistingKonnectorMainFolder = _context.sent;

            if (!alreadyExistingKonnectorMainFolder) {
              _context.next = 23;
              break;
            }

            _context.next = 22;
            return saveKonnectorAccountFolder({
              client: client,
              mainFolder: alreadyExistingKonnectorMainFolder,
              konnector: konnector,
              sourceAccountIdentifier: sourceAccountIdentifier
            });

          case 22:
            return _context.abrupt("return", _context.sent);

          case 23:
            // if the previous shortcuts did not work, create the folders like we did before but with proper references
            path = buildFolderPath(konnector, account, {
              administrative: adminFolder.path,
              photos: photosFolder.path
            });
            _context.next = 26;
            return statDirectoryByPath(client, path);

          case 26:
            _context.t0 = _context.sent;

            if (_context.t0) {
              _context.next = 31;
              break;
            }

            _context.next = 30;
            return createDirectoryByPath(client, path);

          case 30:
            _context.t0 = _context.sent;

          case 31:
            folder = _context.t0;
            _context.next = 34;
            return fileCollection.statById(folder.dir_id);

          case 34:
            _yield$fileCollection = _context.sent;
            konnectorFolder = _yield$fileCollection.data;
            _context.next = 38;
            return Promise.all([permissions.add(konnector, buildFolderPermission(folder)), ensureKonnectorReference({
              client: client,
              folder: folder,
              konnector: konnector
            }), ensureSourceAccountIdentifierReference({
              client: client,
              folder: folder,
              sourceAccountIdentifier: sourceAccountIdentifier
            }), ensureKonnectorReference({
              client: client,
              folder: konnectorFolder,
              konnector: konnector
            })]);

          case 38:
            return _context.abrupt("return", folder);

          case 39:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function ensureKonnectorFolder(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Creates a directory from a given path
 *
 * @param  {CozyClient}  client CozyClient
 * @param  {string}  path   Directory path
 * @returns {Promise<import('../types').IOCozyFolder>}         Directory attributes
 */


exports.ensureKonnectorFolder = ensureKonnectorFolder;

var createDirectoryByPath = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(client, path) {
    var _yield$client$collect, data;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return client.collection(FILES_DOCTYPE).createDirectoryByPath(path);

          case 2:
            _yield$client$collect = _context2.sent;
            data = _yield$client$collect.data;
            return _context2.abrupt("return", data);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function createDirectoryByPath(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Retrieves a directory from its path
 *
 * @param  {CozyClient}  client CozyClient
 * @param  {string}  path   Directory path
 * @returns {Promise<import('../types').IOCozyFolder|null>}        Created io.cozy.files document
 * @throws will throw an error on any error without status === 404
 */


exports.createDirectoryByPath = createDirectoryByPath;

var statDirectoryByPath = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(client, path) {
    var response;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return client.collection(FILES_DOCTYPE).statByPath(path);

          case 3:
            response = _context3.sent;

            if (!response.data.trashed) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", null);

          case 6:
            return _context3.abrupt("return", response.data);

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);

            if (!(_context3.t0 && _context3.t0.status === 404)) {
              _context3.next = 13;
              break;
            }

            return _context3.abrupt("return", null);

          case 13:
            throw new Error(_context3.t0.message);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));

  return function statDirectoryByPath(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Build folder path for a given konnector and a given account.
 *
 * If konnector.folders[0].defaultDir exists, it is used as default directory.
 *
 * Occurrences of following strings in base directory are replaced by:
 * * `$administrative`: Administrative folder
 * * `$photos`: Photos folder
 *
 * Occurrences of following strings in path are replaced by:
 * * `$account: Account label (id or name)`
 * * `$konnector`: Konnector name
 *
 * If no konnectors.folders[0].defaultDir is set, the default dir used is
 * *  `$administrative/$konnector/$account`
 *
 * @param  {import('../types').IOCozyKonnector} konnector Konnector document
 * @param  {import('../types').IOCozyAccount} account   Account document
 * @param  {Object<string, string>} magicFolders   Object containing a mapping from folder
 * identifiers (ex: $administrative) to their localized values (ex:
 * Administratif).
 * @returns {String}           The result path
 */


exports.statDirectoryByPath = statDirectoryByPath;

var buildFolderPath = function buildFolderPath(konnector, account) {
  var _konnector$folders, _konnector$folders$;

  var magicFolders = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var fullPath = (konnector === null || konnector === void 0 ? void 0 : (_konnector$folders = konnector.folders) === null || _konnector$folders === void 0 ? void 0 : (_konnector$folders$ = _konnector$folders[0]) === null || _konnector$folders$ === void 0 ? void 0 : _konnector$folders$.defaultDir) || '$administrative/$konnector/$account'; // Trim `/` and avoid multiple `/` characters with regexp

  var sanitizedPath = trim(fullPath.replace(/(\/+)/g, '/'), '/'); // If the konnector doesn't have any of our base dir, we set it to $administrative

  if (!hasBaseDir(sanitizedPath)) {
    sanitizedPath = '$administrative/' + sanitizedPath;
  }
  /**
   * Now that we have our sanitizedPath, we can split it in two strings
   * * `baseDir` containing the baseDir path
   * * `buildedSubDir` containing the rest of the path (ie the path without baseDir)
   */


  var baseDir = sanitizedPath.split('/', 1);
  var buildedSubDir = buildSubDir(sanitizedPath, baseDir[0]);
  var renderedBaseDir = renderBaseDir(baseDir[0], magicFolders);
  var renderedPath = renderSubDir(buildedSubDir, {
    // When adding a new allowed variable here, please keep documentation
    // of `renderSubDir` function up to date.
    konnector: konnector.name,
    account: (0, _account.getAccountName)(account).replace(sanitizeAccountIdentifierRx, '-')
  });
  return "/".concat(renderedBaseDir, "/").concat(renderedPath);
};
/**
 * Check if the provided Path start withs our allowedBaseDirPath to see
 *
 * @param {String} path - path to test
 * @returns {Boolean}
 */


exports.buildFolderPath = buildFolderPath;

var hasBaseDir = function hasBaseDir(path) {
  return allowedBaseDirVariables.some(function (baseDirVar) {
    return path.startsWith(baseDirVar);
  });
};
/**
 * Base directories are directory where konnector may copy their data.
 * They are expressed as variables which then need to be localized.
 * Default is `$administrative`.
 */


var allowedBaseDirVariables = ['$administrative', '$photos'];
/**
 * This method creates the subDir. We can't have an empty subDir, so we set
 * it to our default '$konnector/$account'
 *
 * @param {String} fullPath String containing potentially the defaultDir
 * @param {String} defaultDir String to remove from the fullPath
 * @returns {String}
 */

var buildSubDir = function buildSubDir(fullPath, defaultDir) {
  var buildedSubDir = fullPath.substring(defaultDir.length);

  if (buildedSubDir === '') {
    buildedSubDir = '$konnector/$account';
  }

  return buildedSubDir;
};
/**
 * Render base directory, based on given magicFolders object.
 * For example, it will render `$administrative` with the given value passed in
 * folders object. We expect to find in folders a localized value.
 *
 * @param  {String} baseDir base directory variable, expects `$administrative`
 * or `$photos`
 * @param  {Object<string, string>} magicFolders Object indexing base directory variable with
 * corresponding localized name.
 * @returns {String}         Localized directory
 */


var renderBaseDir = function renderBaseDir(baseDir) {
  var magicFolders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // Look for variable name into folders but without $ prefix
  var renderedBaseDir = magicFolders[baseDir.slice(1)] || DEFAULT_LOCALIZED_BASE_DIR; // Trim `/` and avoid multiple `/` characters with regexp

  return trim(renderedBaseDir.replace(/(\/+)/g, '/'), '/');
};
/**
 * Render the given folder path using the given `variables` object.
 * Available variable are `$konnector` (konnector name) and `$account`
 * (account label, i.e. id or name)
 *
 * @param  {String} path      Path to render : ex '/Administratif/$konnector/$account'
 * @param  {Object} variables Object mapping variable to actual values
 * @param  {import('../types').IOCozyKonnector['name']} variables.konnector - konnector name
 * @param  {String} variables.account - account name
 * @returns {String}           Rendered path
 */


var renderSubDir = function renderSubDir(path, variables) {
  // Trim `/` and avoid multiple `/` characters with regexp
  var sanitizedPath = trim(path.replace(/(\/+)/g, '/'), '/'); // Let's get only full variable name limited by '/'. We want to avoid false
  // positive like parsing `$variableInString` to `valueInString`

  var segments = sanitizedPath.split('/');
  return segments.map(function (segment) {
    return (variables === null || variables === void 0 ? void 0 : variables[segment.slice(1)]) || segment;
  }).join('/');
};

var sanitizeAccountIdentifierRx = /\//g;
/**
 * Returns a permission ready to be passed to
 * client.collection('io.cozy.permissions').add().
 *
 * @param  {import('../types').IOCozyFolder} folder    The folder which the konnector should have access
 * @returns {Object}           Permission object
 */

var buildFolderPermission = function buildFolderPermission(folder) {
  return {
    // Legacy name
    saveFolder: {
      type: FILES_DOCTYPE,
      values: [folder._id],
      verbs: ['GET', 'PATCH', 'POST']
    }
  };
};
/**
 * Replacer of the lodash/trim function
 *
 * @param {String} str - Input string
 * @param {String} c - String to trim from the input string
 * @returns {String}
 */


exports.buildFolderPermission = buildFolderPermission;

var trim = function trim(str) {
  var c = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '\\s';
  return str.replace(new RegExp("^([".concat(c, "]*)(.*?)([").concat(c, "]*)$")), '$2');
};
/**
 * Test if a given folder has a given konnector reference
 *
 * @param {import('../types').IOCozyFolder} folder - folder to test
 * @param {string} slug -  konnector slug
 * @returns {boolean}
 */


var hasKonnectorReference = function hasKonnectorReference(folder, slug) {
  var _folder$referenced_by;

  return Boolean((_folder$referenced_by = folder.referenced_by) === null || _folder$referenced_by === void 0 ? void 0 : _folder$referenced_by.find(function (ref) {
    return ref.type === 'io.cozy.konnectors' && ref.id === 'io.cozy.konnectors/' + slug;
  }));
};
/**
 * Test if a given folder has a given source account identifier reference
 *
 * @param {import('../types').IOCozyFolder} folder - folder to test
 * @param {string} [sourceAccountIdentifier] - source account identifier
 * @returns {boolean}
 */


var hasSourceAccountIdentifierReference = function hasSourceAccountIdentifierReference(folder, sourceAccountIdentifier) {
  var _folder$referenced_by2;

  return Boolean((_folder$referenced_by2 = folder.referenced_by) === null || _folder$referenced_by2 === void 0 ? void 0 : _folder$referenced_by2.find(function (ref) {
    return ref.type === 'io.cozy.accounts.sourceAccountIdentifier' && (sourceAccountIdentifier ? ref.id === sourceAccountIdentifier : true);
  }));
};
/**
 * Ensure that a given folder has the given konnector reference
 *
 * @param {object} options - options object
 * @param {CozyClient} options.client - CozyClient instance
 * @param {import('../types').IOCozyFolder} options.folder - folder to test
 * @param {import('../types').IOCozyKonnector} options.konnector - konnector to which we want the reference
 * @returns {Promise<void>}
 */


var ensureKonnectorReference = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(_ref5) {
    var client, folder, konnector, fileCollection;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            client = _ref5.client, folder = _ref5.folder, konnector = _ref5.konnector;
            fileCollection = client.collection(FILES_DOCTYPE);

            if (hasKonnectorReference(folder, konnector.slug)) {
              _context4.next = 5;
              break;
            }

            _context4.next = 5;
            return fileCollection.addReferencesTo(konnector, [folder]);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function ensureKonnectorReference(_x7) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * Ensure that a given folder has the given source account identifier reference
 *
 * @param {object} options - options object
 * @param {CozyClient} options.client - CozyClient instance
 * @param {import('../types').IOCozyFolder} options.folder - folder to test
 * @param {string} options.sourceAccountIdentifier - source account identifier to which we want the reference
 * @returns {Promise<void>}
 */


var ensureSourceAccountIdentifierReference = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(_ref7) {
    var client, folder, sourceAccountIdentifier, fileCollection;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            client = _ref7.client, folder = _ref7.folder, sourceAccountIdentifier = _ref7.sourceAccountIdentifier;
            fileCollection = client.collection(FILES_DOCTYPE);

            if (hasSourceAccountIdentifierReference(folder, sourceAccountIdentifier)) {
              _context5.next = 5;
              break;
            }

            _context5.next = 5;
            return fileCollection.addReferencesTo({
              _id: sourceAccountIdentifier,
              _type: 'io.cozy.accounts.sourceAccountIdentifier'
            }, [folder]);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function ensureSourceAccountIdentifierReference(_x8) {
    return _ref8.apply(this, arguments);
  };
}();
/**
 * try to find a konnector account folder using file references
 *
 * @param {object} options - options object
 * @param {CozyClient} options.client - CozyClient instance
 * @param {string} options.slug - konnector slug
 * @param {string} options.sourceAccountIdentifier - source account identifier
 * @returns {Promise<import('../types').IOCozyFolder>}
 */


var findKonnectorAccountFolderByReference = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(_ref9) {
    var client, slug, sourceAccountIdentifier, _yield$client$query, folders;

    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            client = _ref9.client, slug = _ref9.slug, sourceAccountIdentifier = _ref9.sourceAccountIdentifier;
            _context6.next = 3;
            return client.query((0, _dsl.Q)(FILES_DOCTYPE).partialIndex({
              type: 'directory',
              trashed: false
            }).referencedBy({
              _type: 'io.cozy.konnectors',
              _id: "io.cozy.konnectors/".concat(slug)
            }));

          case 3:
            _yield$client$query = _context6.sent;
            folders = _yield$client$query.included;
            return _context6.abrupt("return", folders.find(function (folder) {
              return hasSourceAccountIdentifierReference(folder, sourceAccountIdentifier);
            }));

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function findKonnectorAccountFolderByReference(_x9) {
    return _ref10.apply(this, arguments);
  };
}();
/**
 * try to find a konnector main folder using file references
 *
 * @param {object} options - options object
 * @param {CozyClient} options.client - CozyClient instance
 * @param {string} options.slug - konnector slug
 * @returns {Promise<import('../types').IOCozyFolder>}
 */


exports.findKonnectorAccountFolderByReference = findKonnectorAccountFolderByReference;

var findKonnectorMainFolderByReference = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(_ref11) {
    var client, slug, _yield$client$query2, files;

    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            client = _ref11.client, slug = _ref11.slug;
            _context7.next = 3;
            return client.query((0, _dsl.Q)(FILES_DOCTYPE).partialIndex({
              type: 'directory',
              trashed: false
            }).referencedBy({
              _type: 'io.cozy.konnectors',
              _id: "io.cozy.konnectors/".concat(slug)
            }));

          case 3:
            _yield$client$query2 = _context7.sent;
            files = _yield$client$query2.included;
            return _context7.abrupt("return", files.find(function (file) {
              return !hasSourceAccountIdentifierReference(file);
            }));

          case 6:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function findKonnectorMainFolderByReference(_x10) {
    return _ref12.apply(this, arguments);
  };
}();
/**
 * Will create or update an account folder with proper references
 *
 * @param {object} options - options object
 * @param {CozyClient} options.client - CozyClient instance
 * @param {import('../types').IOCozyFolder} options.mainFolder - Main konnector folder where the account folder may be created
 * @param {import('../types').IOCozyKonnector} options.konnector - Konnector associated to the main folder
 * @param {string} options.sourceAccountIdentifier - source account identifier
 * @returns {Promise<import('../types').IOCozyFolder>}
 */


function saveKonnectorAccountFolder(_x11) {
  return _saveKonnectorAccountFolder.apply(this, arguments);
}

function _saveKonnectorAccountFolder() {
  _saveKonnectorAccountFolder = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(_ref13) {
    var client, mainFolder, konnector, sourceAccountIdentifier, path, folder;
    return _regenerator.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            client = _ref13.client, mainFolder = _ref13.mainFolder, konnector = _ref13.konnector, sourceAccountIdentifier = _ref13.sourceAccountIdentifier;
            path = mainFolder.path + '/' + sourceAccountIdentifier;
            _context8.next = 4;
            return statDirectoryByPath(client, path);

          case 4:
            _context8.t0 = _context8.sent;

            if (_context8.t0) {
              _context8.next = 9;
              break;
            }

            _context8.next = 8;
            return createDirectoryByPath(client, path);

          case 8:
            _context8.t0 = _context8.sent;

          case 9:
            folder = _context8.t0;
            _context8.next = 12;
            return ensureKonnectorReference({
              client: client,
              folder: folder,
              konnector: konnector
            });

          case 12:
            _context8.next = 14;
            return ensureSourceAccountIdentifierReference({
              client: client,
              folder: folder,
              sourceAccountIdentifier: sourceAccountIdentifier
            });

          case 14:
            return _context8.abrupt("return", folder);

          case 15:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _saveKonnectorAccountFolder.apply(this, arguments);
}