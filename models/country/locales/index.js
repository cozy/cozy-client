"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocalizer = void 0;

var _nodePolyglot = _interopRequireDefault(require("node-polyglot"));

var _en = _interopRequireDefault(require("./en.json"));

var _fr = _interopRequireDefault(require("./fr.json"));

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
 * @returns {{ t: Function, polyglot: object, lang: string }}
 */


var getLocalizer = function getLocalizer(lang) {
  var polyglot = polyglots[lang] || polyglots['en'];
  var t = polyglot.t.bind(polyglot);
  return {
    t: t,
    polyglot: polyglot,
    lang: lang
  };
};

exports.getLocalizer = getLocalizer;