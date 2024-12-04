"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.themesList = void 0;

var _constants = require("./constants");

var _qualification = require("./qualification");

/**
 *
 * @param {Array<import("../../types").ItemsLabels>} labels - Array of items labels
 * @returns {Array<import("../../types").QualificationAttributes>}
 */
var buildItemsByLabel = function buildItemsByLabel(labels) {
  return labels.map(function (label) {
    try {
      return _qualification.Qualification.getByLabel(label);
    } catch (e) {
      console.log('error', e); // eslint-disable-line no-console

      return null;
    }
  }).filter(function (item) {
    return item;
  });
};
/**
 * @type {import("../../types").ThemesList}
 */


var themesList = [{
  id: 'theme1',
  label: 'identity',
  icon: 'people',
  items: buildItemsByLabel(_constants.THEME_IDENTITY_LABELS),
  defaultItems: ['birth_certificate']
}, {
  id: 'theme2',
  label: 'family',
  icon: 'team',
  items: buildItemsByLabel(_constants.THEME_FAMILY_LABELS),
  defaultItems: ['family_record_book']
}, {
  id: 'theme3',
  label: 'work_study',
  icon: 'work',
  items: buildItemsByLabel(_constants.THEME_WORK_STUDY_LABELS)
}, {
  id: 'theme4',
  label: 'health',
  icon: 'heart',
  items: buildItemsByLabel(_constants.THEME_HEALTH_LABELS)
}, {
  id: 'theme5',
  label: 'home',
  icon: 'home',
  items: buildItemsByLabel(_constants.THEME_HOME_LABELS)
}, {
  id: 'theme6',
  label: 'transport',
  icon: 'car',
  items: buildItemsByLabel(_constants.THEME_TRANSPORT_LABELS),
  defaultItems: ['driver_license']
}, {
  id: 'theme7',
  label: 'activity',
  icon: 'chess',
  items: buildItemsByLabel(_constants.THEME_ACTIVITY_LABELS)
}, {
  id: 'theme8',
  label: 'finance',
  icon: 'bank',
  items: buildItemsByLabel(_constants.THEME_FINANCE_LABELS)
}, {
  id: 'theme9',
  label: 'invoice',
  icon: 'bill',
  items: buildItemsByLabel(_constants.THEME_INVOICE_LABELS)
}, {
  id: 'theme10',
  label: 'others',
  icon: 'dots',
  items: buildItemsByLabel(_constants.THEME_OTHERS_LABELS)
}];
exports.themesList = themesList;