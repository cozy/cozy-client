"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocalizer = exports.getBoundT = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _nodePolyglot = _interopRequireDefault(require("node-polyglot"));

var _en = _interopRequireDefault(require("./en.json"));

var _fr = _interopRequireDefault(require("./fr.json"));

var _countries = require("../../country/countries");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var locales = {
  en: _en.default,
  fr: _fr.default
};
var polyglots = {};
var langs = ['fr', 'en'];

for (var _i = 0, _langs = langs; _i < _langs.length; _i++) {
  var lang = _langs[_i];
  var polyglot = new _nodePolyglot.default();
  polyglot.extend(locales[lang]);
  polyglots[lang] = polyglot;
}
/**
 * @param {string} lang - fr, en, etc
 * @returns {(label: string, opts?: {country?: string, smart_count?: number}) => string}
 */


var getBoundT = function getBoundT(lang) {
  var t = getLocalizer(lang);
  return function (label) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var newOpts = _objectSpread(_objectSpread({}, opts), {}, {
      smart_count: (opts === null || opts === void 0 ? void 0 : opts.smart_count) || 1
    });

    var country = opts === null || opts === void 0 ? void 0 : opts.country;
    var emojiCountry = country !== 'foreign' ? (0, _countries.getEmojiByCountry)(country) : null;
    var strangerLabel = country === 'foreign' ? t('country.foreign') : null;
    return emojiCountry || strangerLabel ? "".concat(t(label, newOpts), " ").concat(emojiCountry || strangerLabel) : t(label, newOpts);
  };
};
/**
 * @param {string} lang - fr, en, etc
 * @returns {Function} - localization function
 */


exports.getBoundT = getBoundT;

var getLocalizer = function getLocalizer(lang) {
  var polyglot = polyglots[lang] || polyglots['en'];
  var t = polyglot.t.bind(polyglot);
  return t;
};

exports.getLocalizer = getLocalizer;