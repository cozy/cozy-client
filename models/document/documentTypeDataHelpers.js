"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isQualificationNote = exports.getThemeByItem = void 0;

var _documentTypeData = require("./documentTypeData");

/**
 * @param {import("../../types").QualificationAttributes} item - Qualification item
 * @returns {import("../../types").Theme|undefined}
 */
var findDefaultItemTheme = function findDefaultItemTheme(item) {
  return _documentTypeData.themesList.find(function (theme) {
    return theme.defaultItems && theme.defaultItems.includes(item.label);
  });
};
/**
 * @param {import("../../types").QualificationAttributes} item - Qualification item
 * @returns {import("../../types").Theme|undefined}
 */


var getThemeByItem = function getThemeByItem(item) {
  var defaultTheme = findDefaultItemTheme(item);

  if (defaultTheme) {
    return defaultTheme;
  }

  return _documentTypeData.themesList.find(function (theme) {
    return theme.items.some(function (it) {
      return it.label === item.label;
    });
  });
};
/**
 * Check if a qualification is a note
 *
 * @param {import("../../types").QualificationAttributes} item - Qualification item
 * @returns {boolean}
 */


exports.getThemeByItem = getThemeByItem;

var isQualificationNote = function isQualificationNote(item) {
  return item.label.toLowerCase().startsWith('note_');
};

exports.isQualificationNote = isQualificationNote;