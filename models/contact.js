"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isContact = exports.getIndexByFamilyNameGivenNameEmailCozyUrl = exports.getDefaultSortIndexValue = exports.makeDefaultSortIndexValue = exports.getDisplayName = exports.makeDisplayName = exports.getFullname = exports.makeFullname = exports.getPrimaryAddress = exports.getPrimaryPhone = exports.getPrimaryCozyDomain = exports.getPrimaryCozy = exports.getPrimaryEmail = exports.getInitials = exports.getPrimaryOrFirst = exports.CONTACTS_DOCTYPE = void 0;

var _get = _interopRequireDefault(require("lodash/get"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _logger = _interopRequireDefault(require("../logger"));

var CONTACTS_DOCTYPE = 'io.cozy.contacts';
/**
 * @typedef {'namePrefix'|'givenName'|'additionalName'|'familyName'|'nameSuffix'} FullnameAttributes
 */

exports.CONTACTS_DOCTYPE = CONTACTS_DOCTYPE;

var getPrimaryOrFirst = function getPrimaryOrFirst(property) {
  return function (obj) {
    return !obj || !obj[property] || obj[property].length === 0 || !obj[property][0] ? '' : obj[property].find(function (property) {
      return property.primary;
    }) || obj[property][0];
  };
};
/**
 * Returns the initials of the contact.
 *
 * @param {import('../types').IOCozyContact} contact - A contact
 * @returns {string} - the contact's initials
 */


exports.getPrimaryOrFirst = getPrimaryOrFirst;

var getInitials = function getInitials(contact) {
  var _contact$name, _contact$name2;

  if (contact !== null && contact !== void 0 && (_contact$name = contact.name) !== null && _contact$name !== void 0 && _contact$name.givenName || contact !== null && contact !== void 0 && (_contact$name2 = contact.name) !== null && _contact$name2 !== void 0 && _contact$name2.familyName) {
    return ['givenName', 'familyName'].map(function (part) {
      return (0, _get.default)(contact, ['name', part, 0], '');
    }).join('').toUpperCase();
  }

  var email = getPrimaryEmail(contact);

  if (email) {
    return email[0].toUpperCase();
  }

  var cozy = getPrimaryCozyDomain(contact);

  if (cozy) {
    return cozy[0].toUpperCase();
  }

  return '';
};
/**
 * Returns the contact's main email
 *
 * @param {import('../types').IOCozyContact} contact - A contact
 * @returns {string} - The contact's main email
 */


exports.getInitials = getInitials;

var getPrimaryEmail = function getPrimaryEmail(contact) {
  return Array.isArray(contact.email) ? getPrimaryOrFirst('email')(contact).address || '' : contact.email;
};
/**
 * Returns the contact's main cozy
 *
 * @param {import('../types').IOCozyContact} contact - A contact
 * @returns {string} - The contact's main cozy
 */


exports.getPrimaryEmail = getPrimaryEmail;

var getPrimaryCozy = function getPrimaryCozy(contact) {
  return Array.isArray(contact.cozy) ? getPrimaryOrFirst('cozy')(contact).url || '' : contact.url;
};
/**
 * Returns the contact's main cozy url without protocol
 *
 * @param {import('../types').IOCozyContact} contact - A contact
 * @returns {string} - The contact's main cozy url
 */


exports.getPrimaryCozy = getPrimaryCozy;

var getPrimaryCozyDomain = function getPrimaryCozyDomain(contact) {
  try {
    var url = new URL(getPrimaryCozy(contact));
    return url.hostname.replace(/^(www.)/g, '');
  } catch (_unused) {
    return getPrimaryCozy(contact);
  }
};
/**
 * Returns the contact's main phone number
 *
 * @param {import('../types').IOCozyContact} contact - A contact
 * @returns {string} - The contact's main phone number
 */


exports.getPrimaryCozyDomain = getPrimaryCozyDomain;

var getPrimaryPhone = function getPrimaryPhone(contact) {
  return getPrimaryOrFirst('phone')(contact).number || '';
};
/**
 * Returns the contact's main address
 *
 * @param {import('../types').IOCozyContact} contact - A contact
 * @returns {string} - The contact's main address
 */


exports.getPrimaryPhone = getPrimaryPhone;

var getPrimaryAddress = function getPrimaryAddress(contact) {
  return getPrimaryOrFirst('address')(contact).formattedAddress || '';
};
/**
 * @type {FullnameAttributes[]}
 */


exports.getPrimaryAddress = getPrimaryAddress;
var defaultFullnameAttributes = ['namePrefix', 'givenName', 'additionalName', 'familyName', 'nameSuffix'];
/**
 * Makes fullname from contact name
 *
 * @param {import('../types').IOCozyContact} contact - A contact
 * @param {{ attributesFullname: FullnameAttributes[] }} [opts] - Options
 * @returns {string} - The contact's fullname
 */

var makeFullname = function makeFullname(contact, opts) {
  var fullnameAttributes = (opts === null || opts === void 0 ? void 0 : opts.attributesFullname) || defaultFullnameAttributes;

  if (contact.name) {
    return fullnameAttributes.map(function (part) {
      return contact.name[part];
    }).filter(function (part) {
      return part !== undefined;
    }).join(' ').trim();
  }

  return '';
};
/**
 * Returns the contact's fullname
 *
 * @param {import('../types').IOCozyContact} contact - A contact
 * @returns {string} - The contact's fullname
 */


exports.makeFullname = makeFullname;

var getFullname = function getFullname(contact) {
  if ((0, _get.default)(contact, 'fullname')) {
    return contact.fullname;
  }

  return makeFullname(contact);
};
/**
 * Makes displayName from contact data
 *
 * @param {import('../types').IOCozyContact} contact - A contact
 * @param {{ attributesFullname: FullnameAttributes[] }} [opts] - Options
 * @returns {string} - The contact's displayName
 */


exports.getFullname = getFullname;

var makeDisplayName = function makeDisplayName(contact, opts) {
  var fullname = makeFullname(contact, opts);
  var primaryEmail = getPrimaryEmail(contact);
  var primaryCozyDomain = getPrimaryCozyDomain(contact);

  if (fullname && fullname.length > 0) {
    return fullname;
  }

  if (primaryEmail && primaryEmail.length > 0) {
    return primaryEmail;
  }

  if (primaryCozyDomain && primaryCozyDomain.length > 0) {
    return primaryCozyDomain;
  }

  return '';
};
/**
 * Returns a display name for the contact
 *
 * @param {import('../types').IOCozyContact} contact - A contact
 * @returns {string} - the contact's display name
 **/


exports.makeDisplayName = makeDisplayName;

var getDisplayName = function getDisplayName(contact) {
  if ((0, _get.default)(contact, 'displayName')) {
    return contact.displayName;
  }

  return makeDisplayName(contact);
};
/**
 * Makes 'byFamilyNameGivenNameEmailCozyUrl' index of a contact
 *
 * @param {import('../types').IOCozyContact} contact - A contact
 * @returns {string} - the contact's 'byFamilyNameGivenNameEmailCozyUrl' index
 */


exports.getDisplayName = getDisplayName;

var makeDefaultSortIndexValue = function makeDefaultSortIndexValue(contact) {
  var defaultSortIndexValue = [(0, _get.default)(contact, 'name.familyName', ''), (0, _get.default)(contact, 'name.givenName', ''), getPrimaryEmail(contact), getPrimaryCozyDomain(contact)].join('').trim().toLowerCase();

  if (defaultSortIndexValue.length === 0) {
    return null;
  }

  return defaultSortIndexValue;
};
/**
 * Returns 'byFamilyNameGivenNameEmailCozyUrl' index of a contact
 *
 * @param {import('../types').IOCozyContact} contact - A contact
 * @returns {string} - the contact's 'byFamilyNameGivenNameEmailCozyUrl' index
 */


exports.makeDefaultSortIndexValue = makeDefaultSortIndexValue;

var getDefaultSortIndexValue = function getDefaultSortIndexValue(contact) {
  var defaultSortIndexValue = (0, _get.default)(contact, 'indexes.byFamilyNameGivenNameEmailCozyUrl', null);

  if (defaultSortIndexValue !== null) {
    return (0, _isEmpty.default)(defaultSortIndexValue) ? null : defaultSortIndexValue;
  }

  return makeDefaultSortIndexValue(contact);
};
/**
 * Returns 'byFamilyNameGivenNameEmailCozyUrl' index of a contact
 *
 * @deprecated Prefer to use getDefaultSortIndexValue.
 * @param {import('../types').IOCozyContact} contact - A contact
 * @returns {string} - the contact's 'byFamilyNameGivenNameEmailCozyUrl' index
 */


exports.getDefaultSortIndexValue = getDefaultSortIndexValue;

var getIndexByFamilyNameGivenNameEmailCozyUrl = function getIndexByFamilyNameGivenNameEmailCozyUrl(contact) {
  _logger.default.warn('Deprecation: `getIndexByFamilyNameGivenNameEmailCozyUrl` is deprecated, please use `getDefaultSortIndexValue` instead');

  return getDefaultSortIndexValue(contact);
};
/**
 * Whether the document is a contact
 *
 * @param {object} doc - A document (from io.cozy.something, or com.bitwarden or anything else)
 * @returns {boolean}
 */


exports.getIndexByFamilyNameGivenNameEmailCozyUrl = getIndexByFamilyNameGivenNameEmailCozyUrl;

var isContact = function isContact(doc) {
  return doc._type === CONTACTS_DOCTYPE;
};

exports.isContact = isContact;