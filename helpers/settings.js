"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQuery = exports.extractKeys = exports.editSettings = exports.normalizeSettings = exports.saveAfterFetchSettings = exports.getSettings = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _CozyClient = _interopRequireDefault(require("../CozyClient"));

var _policies = _interopRequireDefault(require("../policies"));

var _dsl = require("../queries/dsl");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var defaultFetchPolicy = _policies.default.olderThan(60 * 60 * 1000);
/**
 * Query the cozy-app settings corresponding to the given slug and
 * extract the values corresponding to the given `keys`
 *
 * @template {string} T
 *
 * @param {CozyClient} client - Cozy client instance
 * @param {string} slug - the cozy-app's slug containing the setting (can be 'instance' for global settings)
 * @param {T[]} keys - The names of the settings to retrieve
 * @returns {Promise<Record<T, any>>} - The values of the requested settings
 */


var getSettings = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(client, slug, keys) {
    var query, currentSettingsResult, currentSettings;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = getQuery(slug);
            _context.next = 3;
            return client.fetchQueryAndGetFromState({
              definition: query.definition,
              options: query.options
            });

          case 3:
            currentSettingsResult = _context.sent;
            currentSettings = normalizeSettings(currentSettingsResult.data); // @ts-ignore

            return _context.abrupt("return", extractKeys(currentSettings, keys));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getSettings(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Save the given value into the corresponding cozy-app setting
 *
 * This methods will first query the cozy-app's settings before injecting the new value and then
 * save the new resulting settings into database
 *
 * @template {string} T
 *
 * @param {CozyClient} client - Cozy client instance
 * @param {string} slug - the cozy-app's slug containing the setting (special cases are: 'instance' for global settings and 'bitwarden' for cozy-pass)
 * @param {Record<string, any> | ((oldValue) => Record<T, any>)} itemsOrSetter - The new values of the settings to save. It can be a raw dictionary, or a callback that should return a new dictionary
 * @param {T[]=} setterKeys - The new values of the settings to save. It can be a raw dictionary, or a callback that should return a new dictionary
 * @returns {Promise<any>} - The result of the `client.save()` call
 */


exports.getSettings = getSettings;

var saveAfterFetchSettings = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(client, slug, itemsOrSetter, setterKeys) {
    var query, currentSettingsResult, currentSettings, items, currentItems, _currentItems, newSettings;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            query = getQuery(slug);
            _context2.next = 3;
            return client.fetchQueryAndGetFromState({
              definition: query.definition,
              options: query.options
            });

          case 3:
            currentSettingsResult = _context2.sent;
            currentSettings = normalizeSettings(currentSettingsResult.data);
            items = undefined;

            if (typeof itemsOrSetter === 'function') {
              currentItems = extractKeys(currentSettings, setterKeys);
              items = itemsOrSetter(currentItems);
            } else {
              _currentItems = extractKeys(currentSettings, Object.keys(itemsOrSetter));
              items = _objectSpread(_objectSpread({}, _currentItems), itemsOrSetter);
            }

            newSettings = editSettings(slug, currentSettings, items);
            _context2.next = 10;
            return client.save(newSettings);

          case 10:
            return _context2.abrupt("return", _context2.sent);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function saveAfterFetchSettings(_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Convert a result from a `client.query()` or a `useQuery()` that can be
 * an object or an array of objects into a single object
 *
 * @param {Array | Object} data - Result from a client.query or a useQuery
 * @returns {Object} A single object containing the setting data
 */


exports.saveAfterFetchSettings = saveAfterFetchSettings;

var normalizeSettings = function normalizeSettings(data) {
  var settingsData = Array.isArray(data) ? data[0] : data;
  return settingsData || {};
};
/**
 * Edit the given settings by injecting `value` into the `key` entry
 * This methods takes care of the kind of settings that is edited as there are
 * some exceptions in settings formats (i.e. `io.cozy.settings.instance`)
 *
 * @param {string} slug - the cozy-app's slug containing the setting (can be 'instance' for global settings)
 * @param {Object} currentSettings - the Setting object (ideally from a `client.query()` or a `useQuery()` and normalized using `normalizeSettings`)
 * @param {Record<string, unknown>} items - The new values for the settings
 * @returns {Object} a new Setting object containing the new value
 */


exports.normalizeSettings = normalizeSettings;

var editSettings = function editSettings(slug, currentSettings, items) {
  var type = getDoctype(slug);
  var newSettings = slug === 'instance' ? mergeInstance(currentSettings, items) : mergeSettings(currentSettings, type, items);
  return newSettings;
};

exports.editSettings = editSettings;

var mergeInstance = function mergeInstance(currentSettings, items) {
  var newSettings = _objectSpread(_objectSpread({
    _id: currentSettings._id,
    _type: currentSettings._type,
    _rev: currentSettings.meta.rev
  }, currentSettings), {}, {
    attributes: _objectSpread({}, currentSettings.attributes)
  });

  for (var _i = 0, _Object$entries = Object.entries(items); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = (0, _slicedToArray2.default)(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    newSettings[key] = value;
    newSettings.attributes[key] = value;
  }

  return newSettings;
};

var mergeSettings = function mergeSettings(currentSettings, type, items) {
  var newSettings = _objectSpread({
    _type: type
  }, currentSettings);

  for (var _i2 = 0, _Object$entries2 = Object.entries(items); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i = (0, _slicedToArray2.default)(_Object$entries2[_i2], 2),
        key = _Object$entries2$_i[0],
        value = _Object$entries2$_i[1];

    newSettings[key] = value;
  }

  return newSettings;
};
/**
 * Extract values from given settings for requested keys
 *
 * @template {string} T
 *
 * @param {Record<T, any>} settings - the Setting object (ideally from a `client.query()` or a `useQuery()` and normalized using `normalizeSettings`)
 * @param {T[]} keys - The names of the settings to extract
 * @returns {Record<T, any>} - Dictionnary containing the values for the requested keys
 */


var extractKeys = function extractKeys(settings, keys) {
  var result = {};

  var _iterator = _createForOfIteratorHelper(keys),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var key = _step.value;
      // @ts-ignore
      result[key] = settings[key];
    } // @ts-ignore

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return result;
};
/**
 * Create a Query that can be used to fetch the cozy-app settings for the given slug
 *
 * @param {string} slug - the cozy-app's slug containing the setting (special cases are: 'instance' for global settings and 'passwords' for bitwarden settings)
 * @returns {import('../types').Query} - the Query that can be used to fetch the cozy-app settings
 */


exports.extractKeys = extractKeys;

var getQuery = function getQuery(slug) {
  if (slug === 'instance') {
    return getNestedSettings(slug);
  }

  if (slug === 'passwords') {
    return getNestedSettings('bitwarden');
  }

  return getRootSettings(slug);
};

exports.getQuery = getQuery;

var getRootSettings = function getRootSettings(slug) {
  var settingsDoctype = getDoctype(slug);
  var query = {
    definition: (0, _dsl.Q)(settingsDoctype).limitBy(1),
    options: {
      as: settingsDoctype,
      fetchPolicy: defaultFetchPolicy,
      singleDocData: true
    }
  };
  return query;
};

var getNestedSettings = function getNestedSettings(slug) {
  var doctype = "io.cozy.settings";
  var subDoctype = getDoctype(slug);
  var query = {
    definition: (0, _dsl.Q)(doctype).getById(subDoctype),
    options: {
      as: "".concat(doctype, "/").concat(subDoctype),
      fetchPolicy: defaultFetchPolicy,
      singleDocData: true
    }
  };
  return query;
};

var getDoctype = function getDoctype(slug) {
  if (['instance', 'bitwarden'].includes(slug)) {
    return "io.cozy.settings.".concat(slug);
  }

  if (slug === 'passwords') {
    return 'io.cozy.settings.bitwarden';
  }

  return "io.cozy.".concat(slug, ".settings");
};