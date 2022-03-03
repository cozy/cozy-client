"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getThemeByItem = void 0;

var _types = require("../../types");

var _documentTypeData = require("./documentTypeData");

/**
 * @param {QualificationAttributes} item - Qualification item
 * @returns {Theme|undefined}
 */
var findDefaultItemTheme = function findDefaultItemTheme(item) {
  return _documentTypeData.themesList.find(function (theme) {
    return theme.defaultItems && theme.defaultItems.includes(item.label);
  });
};
/**
 * @param {QualificationAttributes} item - Qualification item
 * @returns {Theme|undefined}
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

exports.getThemeByItem = getThemeByItem;