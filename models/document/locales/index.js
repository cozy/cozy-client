"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBoundT = void 0;

var _nodePolyglot = _interopRequireDefault(require("node-polyglot"));

var polyglots = {};
var langs = ['fr', 'en'];

for (var _i = 0, _langs = langs; _i < _langs.length; _i++) {
  var lang = _langs[_i];
  var locales = {};

  try {
    locales = require("./".concat(lang, ".json"));
  } catch (e) {// eslint-disable-line no-empty-block
  }

  var polyglot = new _nodePolyglot.default();
  polyglot.extend(locales);
  polyglots[lang] = polyglot;
}
/**
 *
 * @param {string} lang - fr, en, etc
 * @returns {(key: string) => string}
 */


var getBoundT = function getBoundT(lang) {
  var polyglot = polyglots[lang] || polyglots['en'];
  return polyglot.t.bind(polyglot);
};

exports.getBoundT = getBoundT;