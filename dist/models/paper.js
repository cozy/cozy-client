"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isForeignPaper = exports.makeExpirationDescription = exports.makeExpiresInMessage = exports.makeExpiredMessage = exports.formatContactValue = exports.getTranslatedNameForContact = exports.formatOtherMetadataValue = exports.getTranslatedNameForOtherMetadata = exports.formatInformationMetadataValue = exports.getTranslatedNameForInformationMetadata = exports.formatDateMetadataValue = exports.getTranslatedNameForDateMetadata = exports.getMetadataQualificationType = exports.formatMetadataQualification = exports.isExpiringSoon = exports.isExpired = exports.computeExpirationNoticeLink = exports.computeExpirationNoticeDate = exports.computeExpirationDate = exports.isExpiring = exports.KNOWN_BILLS_ATTRIBUTES_NAMES = exports.KNOWN_OTHER_METADATA_NAMES = exports.KNOWN_INFORMATION_METADATA_NAMES = exports.KNOWN_DATE_METADATA_NAMES = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _add = _interopRequireDefault(require("date-fns/add"));

var _sub = _interopRequireDefault(require("date-fns/sub"));

var _formatDistanceToNowStrict = _interopRequireDefault(require("date-fns/formatDistanceToNowStrict"));

var _fr = _interopRequireDefault(require("date-fns/locale/fr"));

var _locales = require("./document/locales");

var _locales2 = require("./country/locales");

var _contact = require("./contact");

var _get = _interopRequireDefault(require("lodash/get"));

var _countries = require("./country/countries");

/**
 * @typedef {import("../types").IOCozyFile} IOCozyFile
 */
var PERSONAL_SPORTING_LICENCE_PERIOD_DAYS = 365;
var PERSONAL_SPORTING_LICENCE_NOTICE_PERIOD_DAYS = 15;
var EXPIRATION_LINK_BY_LABEL = {
  national_id_card: 'https://www.service-public.fr/particuliers/vosdroits/N358',
  residence_permit: 'https://www.service-public.fr/particuliers/vosdroits/N110',
  passport: 'https://www.service-public.fr/particuliers/vosdroits/N360',
  driver_license: 'https://permisdeconduire.ants.gouv.fr/demarches-en-ligne/perte-vol-deterioration-fin-de-validite-ou-changement-d-etat-civil'
};
var KNOWN_DATE_METADATA_NAMES = ['AObtentionDate', 'BObtentionDate', 'CObtentionDate', 'DObtentionDate', 'obtentionDate', 'expirationDate', 'referencedDate', 'issueDate', 'shootingDate', 'date', 'datetime'];
exports.KNOWN_DATE_METADATA_NAMES = KNOWN_DATE_METADATA_NAMES;
var KNOWN_INFORMATION_METADATA_NAMES = ['number', 'bicNumber', 'country', 'refTaxIncome', 'contractType', 'netSocialAmount', 'employerName', 'vehicle.licenseNumber', 'vehicle.confidentialNumber', 'noticePeriod'];
exports.KNOWN_INFORMATION_METADATA_NAMES = KNOWN_INFORMATION_METADATA_NAMES;
var KNOWN_OTHER_METADATA_NAMES = ['contact', 'page', 'qualification'];
exports.KNOWN_OTHER_METADATA_NAMES = KNOWN_OTHER_METADATA_NAMES;
var KNOWN_BILLS_ATTRIBUTES_NAMES = ['amount', 'subtype', 'employer'];
/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {boolean}
 * @description Tells if a given file is a national id card, is French, has an expiration date set and has a notice period set
 */

exports.KNOWN_BILLS_ATTRIBUTES_NAMES = KNOWN_BILLS_ATTRIBUTES_NAMES;

var isExpiringFrenchNationalIdCard = function isExpiringFrenchNationalIdCard(file) {
  var _file$metadata, _file$metadata$qualif, _file$metadata2, _file$metadata3, _file$metadata4;

  var label = (_file$metadata = file.metadata) === null || _file$metadata === void 0 ? void 0 : (_file$metadata$qualif = _file$metadata.qualification) === null || _file$metadata$qualif === void 0 ? void 0 : _file$metadata$qualif.label;
  var country = (_file$metadata2 = file.metadata) === null || _file$metadata2 === void 0 ? void 0 : _file$metadata2.country;
  var expirationDate = (_file$metadata3 = file.metadata) === null || _file$metadata3 === void 0 ? void 0 : _file$metadata3.expirationDate;
  var noticePeriod = (_file$metadata4 = file.metadata) === null || _file$metadata4 === void 0 ? void 0 : _file$metadata4.noticePeriod;

  if (label === 'national_id_card' && (!country || country === 'fr') && expirationDate && noticePeriod) {
    return true;
  }

  return false;
};
/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {boolean}
 * @description Tells if a given file has an expiration date set and a notice period set
 */


var isExpiringGeneric = function isExpiringGeneric(file) {
  var _file$metadata5, _file$metadata6;

  var expirationDate = (_file$metadata5 = file.metadata) === null || _file$metadata5 === void 0 ? void 0 : _file$metadata5.expirationDate;
  var noticePeriod = (_file$metadata6 = file.metadata) === null || _file$metadata6 === void 0 ? void 0 : _file$metadata6.noticePeriod;

  if (expirationDate && noticePeriod) {
    return true;
  }

  return false;
};
/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {boolean}
 * @description Tells if a given file is a sporting license, has a reference date set or a creation date if not
 */


var isExpiringPersonalSportingLicense = function isExpiringPersonalSportingLicense(file) {
  var _file$metadata7, _file$metadata7$quali, _file$metadata8;

  var label = (_file$metadata7 = file.metadata) === null || _file$metadata7 === void 0 ? void 0 : (_file$metadata7$quali = _file$metadata7.qualification) === null || _file$metadata7$quali === void 0 ? void 0 : _file$metadata7$quali.label;
  var referencedDate = (_file$metadata8 = file.metadata) === null || _file$metadata8 === void 0 ? void 0 : _file$metadata8.referencedDate;
  var created_at = file.created_at;

  if (label === 'personal_sporting_licence' && (referencedDate || created_at)) {
    return true;
  }

  return false;
};
/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {boolean}
 * @description Tells if a given file matches one of the known types of expiring papers
 */


var isExpiring = function isExpiring(file) {
  if (isExpiringFrenchNationalIdCard(file)) {
    return true;
  }

  if (isExpiringGeneric(file)) {
    return true;
  }

  if (isExpiringPersonalSportingLicense(file)) {
    return true;
  }

  return false;
};
/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {Date | null} Expiration date
 * @description Computes et returns the expiration date of the given file, or null if it is not expiring
 */


exports.isExpiring = isExpiring;

var computeExpirationDate = function computeExpirationDate(file) {
  if (isExpiringFrenchNationalIdCard(file) || isExpiringGeneric(file)) {
    var _file$metadata9;

    var expirationDate = (_file$metadata9 = file.metadata) === null || _file$metadata9 === void 0 ? void 0 : _file$metadata9.expirationDate;
    return new Date(expirationDate);
  }

  if (isExpiringPersonalSportingLicense(file)) {
    var _file$metadata10;

    var referencedDate = (_file$metadata10 = file.metadata) === null || _file$metadata10 === void 0 ? void 0 : _file$metadata10.referencedDate;
    var created_at = file.created_at;
    return (0, _add.default)(new Date(referencedDate !== null && referencedDate !== void 0 ? referencedDate : created_at), {
      days: PERSONAL_SPORTING_LICENCE_PERIOD_DAYS
    });
  }

  return null;
};
/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {number | null} Expiration notice period in days
 * @description Computes et returns the expiration notice period of the given file, or null if it is not expiring
 */


exports.computeExpirationDate = computeExpirationDate;

var computeExpirationNoticePeriodInDays = function computeExpirationNoticePeriodInDays(file) {
  if (isExpiringFrenchNationalIdCard(file) || isExpiringGeneric(file)) {
    var _file$metadata11;

    var noticePeriodInDays = (_file$metadata11 = file.metadata) === null || _file$metadata11 === void 0 ? void 0 : _file$metadata11.noticePeriod;
    return parseInt(noticePeriodInDays, 10);
  }

  if (isExpiringPersonalSportingLicense(file)) {
    return PERSONAL_SPORTING_LICENCE_NOTICE_PERIOD_DAYS;
  }

  return null;
};
/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {Date | null} Expiration notice date
 * @description Computes et returns the expiration notice date of the given file, or null if it is not expiring
 */


var computeExpirationNoticeDate = function computeExpirationNoticeDate(file) {
  var expirationDate = computeExpirationDate(file);

  if (expirationDate == null) {
    return null;
  }

  var noticePeriodInDays = computeExpirationNoticePeriodInDays(file);

  if (noticePeriodInDays == null) {
    return null;
  }

  return (0, _sub.default)(expirationDate, {
    days: noticePeriodInDays
  });
};
/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {string | null} Expiration notice link
 * @description Computes and returns the expiration notice link of the given file, or null if it has none
 */


exports.computeExpirationNoticeDate = computeExpirationNoticeDate;

var computeExpirationNoticeLink = function computeExpirationNoticeLink(file) {
  var _file$metadata12, _file$metadata12$qual;

  var qualificationLabel = (_file$metadata12 = file.metadata) === null || _file$metadata12 === void 0 ? void 0 : (_file$metadata12$qual = _file$metadata12.qualification) === null || _file$metadata12$qual === void 0 ? void 0 : _file$metadata12$qual.label;
  if (!qualificationLabel) return null;
  return EXPIRATION_LINK_BY_LABEL[qualificationLabel] || null;
};
/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {boolean}
 * @description Tells if the given file is expiring and if today is after its expiration date
 */


exports.computeExpirationNoticeLink = computeExpirationNoticeLink;

var isExpired = function isExpired(file) {
  var now = new Date();
  var expirationDate = computeExpirationDate(file);
  var isExpired = expirationDate != null && expirationDate <= now;
  return isExpired;
};
/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {boolean}
 * @description Tells if the given file is expiring and if today is between its expiration notice date and its expiration date
 */


exports.isExpired = isExpired;

var isExpiringSoon = function isExpiringSoon(file) {
  var now = new Date();
  var expirationDate = computeExpirationDate(file);
  var expirationNoticeDate = computeExpirationNoticeDate(file);
  var isExpiringSoon = expirationDate != null && expirationNoticeDate != null && expirationNoticeDate <= now && now < expirationDate;
  return isExpiringSoon;
};
/**
 * @param {Object} params -
 * @param {Object} params.metadata - An io.cozy.files metadata object
 * @param {string} params.knownMetadataPath - Path of the metadata
 * @param {string | null} [params.value] - Value of the metadata
 * @returns {{ name: string, value: string | null }} displayable metadata
 */


exports.isExpiringSoon = isExpiringSoon;

var makeMetadataQualification = function makeMetadataQualification(_ref) {
  var metadata = _ref.metadata,
      knownMetadataPath = _ref.knownMetadataPath,
      value = _ref.value;

  var _value = value || (0, _get.default)(metadata, knownMetadataPath, null) || null;

  var shouldReturnThisMetadata = Object.keys(metadata).some(function (val) {
    return knownMetadataPath.startsWith(val);
  });

  if (shouldReturnThisMetadata || knownMetadataPath === 'contact') {
    return {
      name: knownMetadataPath,
      value: _value
    };
  }

  return null;
};
/**
 * @param {Object} metadata - An io.cozy.files metadata object
 * @returns {{ name: string, value: string | null }[]} Array of displayable metadata
 * @description Select and format displayable metadata of a paper
 */


var formatMetadataQualification = function formatMetadataQualification(metadata) {
  var dates = KNOWN_DATE_METADATA_NAMES.map(function (dateName) {
    return makeMetadataQualification({
      metadata: metadata,
      knownMetadataPath: dateName
    });
  }).filter(Boolean).filter(function (data, _, arr) {
    if (arr.length > 1) return data.name !== 'datetime';
    return data;
  });
  var informations = KNOWN_INFORMATION_METADATA_NAMES.map(function (infoName) {
    return makeMetadataQualification({
      metadata: metadata,
      knownMetadataPath: infoName
    });
  }).filter(Boolean);
  var others = KNOWN_OTHER_METADATA_NAMES.map(function (otherName) {
    var _metadata$otherName;

    var value = otherName === 'qualification' ? (_metadata$otherName = metadata[otherName]) === null || _metadata$otherName === void 0 ? void 0 : _metadata$otherName.label : metadata[otherName];
    return makeMetadataQualification({
      metadata: metadata,
      knownMetadataPath: otherName,
      value: value
    });
  }).filter(Boolean);
  return [].concat((0, _toConsumableArray2.default)(dates), (0, _toConsumableArray2.default)(informations), (0, _toConsumableArray2.default)(others));
};
/**
 * @typedef {('date' | 'information' | 'contact' | 'other' | 'bills')} MetadataQualificationType
 */

/**
 * @param {string} metadataName - A metadata name
 * @returns {MetadataQualificationType | null} The type of the metadata
 * @description Returns the type of the metatada from a metadata name
 */


exports.formatMetadataQualification = formatMetadataQualification;

var getMetadataQualificationType = function getMetadataQualificationType(metadataName) {
  if (KNOWN_DATE_METADATA_NAMES.includes(metadataName)) {
    return 'date';
  }

  if (KNOWN_INFORMATION_METADATA_NAMES.includes(metadataName)) {
    return 'information';
  }

  if (KNOWN_OTHER_METADATA_NAMES.includes(metadataName)) {
    if (metadataName === 'contact') {
      return 'contact';
    }

    return 'other';
  }

  if (KNOWN_BILLS_ATTRIBUTES_NAMES.includes(metadataName)) {
    return 'bills';
  }

  return null;
};
/**
 * @param {string} name - The name of a metadata of type date like 'expirationDate' or 'shootingDate'
 * @param {Object} options - Options
 * @param {string} options.lang - Lang requested for the translation like 'fr' or 'en'
 * @returns {string} Translated name for the metadata
 */


exports.getMetadataQualificationType = getMetadataQualificationType;

var getTranslatedNameForDateMetadata = function getTranslatedNameForDateMetadata(name, _ref2) {
  var lang = _ref2.lang;
  var t = (0, _locales.getLocalizer)(lang);
  return t("Scan.qualification.date.title.".concat(name));
};
/**
 * @param {string} value - The value of a metadata of type date
 * @param {Object} options - Options
 * @param {string} options.lang - Lang requested for the translation
 * @param {function} options.f - Date formatting function
 * @returns {string} Formatted and translated value for the metadata
 */


exports.getTranslatedNameForDateMetadata = getTranslatedNameForDateMetadata;

var formatDateMetadataValue = function formatDateMetadataValue(value, _ref3) {
  var lang = _ref3.lang,
      f = _ref3.f;
  var t = (0, _locales.getLocalizer)(lang);

  if (value) {
    if (lang === 'en') {
      return f(value, 'MM/DD/YYYY');
    }

    return f(value, 'DD/MM/YYYY');
  } else {
    return t('Scan.qualification.noInfo');
  }
};
/**
 * @param {string} name - The name of a metadata of type information like 'national_id_card' or 'fine'
 * @param {Object} options - Options
 * @param {string} options.lang - Lang requested for the translation
 * @param {string} options.qualificationLabel - The qualification label of the metadata
 * @returns {string} Translated name for the metadata
 */


exports.formatDateMetadataValue = formatDateMetadataValue;

var getTranslatedNameForInformationMetadata = function getTranslatedNameForInformationMetadata(name, _ref4) {
  var lang = _ref4.lang,
      qualificationLabel = _ref4.qualificationLabel;
  var t = (0, _locales.getLocalizer)(lang);

  if (name === 'number') {
    return t("Scan.qualification.information.title.".concat(qualificationLabel, ".").concat(name));
  } else {
    return t("Scan.qualification.information.title.".concat(name));
  }
};
/**
 * @param {string} value - The value of a metadata of type information
 * @param {Object} options - Options
 * @param {string} options.lang - Lang requested for the translation
 * @param {string} options.name - The name of the metadata
 * @param {string} options.qualificationLabel - The qualification label of the metadata
 * @returns {string} Formatted and translated value for the metadata
 */


exports.getTranslatedNameForInformationMetadata = getTranslatedNameForInformationMetadata;

var formatInformationMetadataValue = function formatInformationMetadataValue(value, _ref5) {
  var lang = _ref5.lang,
      name = _ref5.name,
      qualificationLabel = _ref5.qualificationLabel;
  var tDoc = (0, _locales.getLocalizer)(lang);

  var _localizerCountry = (0, _locales2.getLocalizer)(lang),
      tCountry = _localizerCountry.t;

  if (typeof value !== 'number' && !value) {
    return tDoc('Scan.qualification.noInfo');
  }

  if (name === 'noticePeriod') {
    return "".concat(value, " ").concat(tDoc('Scan.qualification.information.day', {
      smart_count: value
    }));
  }

  if (name === 'contractType') {
    return tDoc("Scan.attributes.contractType.".concat(value), {
      _: value
    });
  }

  if (name === 'refTaxIncome' || name === 'netSocialAmount' || name === 'amount' || name === 'number' && qualificationLabel === 'pay_sheet') {
    return "".concat(value, " \u20AC");
  }

  if (name === 'country' && (0, _countries.isValidCountryCodeTranslation)(lang, value)) {
    return tCountry("countries.".concat(value));
  }

  return value;
};
/**
 * @param {string} name - The name of a metadata of type other like 'page' or 'qualification'
 * @param {Object} options - Options
 * @param {string} options.lang - Lang requested for the translation
 * @returns {string} Translated name for the metadata
 */


exports.formatInformationMetadataValue = formatInformationMetadataValue;

var getTranslatedNameForOtherMetadata = function getTranslatedNameForOtherMetadata(name, _ref6) {
  var lang = _ref6.lang;
  var t = (0, _locales.getLocalizer)(lang);
  return t("Scan.qualification.".concat(name));
};
/**
 * @param {string} value - The value of a metadata of type other
 * @param {Object} options - Options
 * @param {string} options.lang - Lang requested for the translation
 * @param {string} options.name - The name of the metadata
 * @returns {string} Formatted and translated value for the metadata
 */


exports.getTranslatedNameForOtherMetadata = getTranslatedNameForOtherMetadata;

var formatOtherMetadataValue = function formatOtherMetadataValue(value, _ref7) {
  var lang = _ref7.lang,
      name = _ref7.name;
  var t = (0, _locales.getLocalizer)(lang);

  if (name === 'qualification') {
    return t("Scan.items.".concat(value), {
      smart_count: 1
    });
  } else {
    return t("Scan.qualification.".concat(value));
  }
};
/**
 * @param {Object} options - Options
 * @param {string} options.lang - Lang requested for the translation
 * @returns {string} Translated name for contact
 */


exports.formatOtherMetadataValue = formatOtherMetadataValue;

var getTranslatedNameForContact = function getTranslatedNameForContact(_ref8) {
  var lang = _ref8.lang;
  var t = (0, _locales.getLocalizer)(lang);
  return t('Scan.qualification.contact');
};
/**
 * @param {object[]} contacts - An array of contact
 * @returns {string} Formatted and translated value of an array of contact
 */


exports.getTranslatedNameForContact = getTranslatedNameForContact;

var formatContactValue = function formatContactValue(contacts) {
  return contacts && contacts.length > 0 ? contacts.map(function (contact) {
    return "".concat((0, _contact.getDisplayName)(contact));
  }).join(', ') : '';
};
/**
 * @param {Object} options - Options
 * @param {string} options.lang - Lang requested for the translation
 * @returns {string}
 */


exports.formatContactValue = formatContactValue;

var makeExpiredMessage = function makeExpiredMessage(_ref9) {
  var lang = _ref9.lang;
  var t = (0, _locales.getLocalizer)(lang);
  return t('Scan.expiration.expired');
};
/**
 * @param {string} expirationDate - Expiration date
 * @param {Object} options - Options
 * @param {string} options.lang - Lang requested for the translation
 * @returns {string}
 */


exports.makeExpiredMessage = makeExpiredMessage;

var makeExpiresInMessage = function makeExpiresInMessage(expirationDate, _ref10) {
  var lang = _ref10.lang;
  var t = (0, _locales.getLocalizer)(lang);
  var distance = (0, _formatDistanceToNowStrict.default)(new Date(expirationDate), {
    locale: lang === 'fr' ? _fr.default : undefined // fallbacks to english if undefined

  });
  return t('Scan.expiration.expiresIn', {
    duration: distance
  });
};
/**
 * @param {string} expirationDate - Expiration date
 * @param {Object} options - Options
 * @param {string} options.lang - Lang requested for the translation
 * @returns {string}
 */


exports.makeExpiresInMessage = makeExpiresInMessage;

var makeExpirationDescription = function makeExpirationDescription(expirationDate, _ref11) {
  var lang = _ref11.lang;
  var t = (0, _locales.getLocalizer)(lang);
  var distance = (0, _formatDistanceToNowStrict.default)(new Date(expirationDate), {
    locale: lang === 'fr' ? _fr.default : undefined // fallbacks to english if undefined

  });
  return t('Scan.expiration.description', {
    duration: distance
  });
};
/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {boolean}
 */


exports.makeExpirationDescription = makeExpirationDescription;

var isForeignPaper = function isForeignPaper(file) {
  var _file$metadata13;

  if ((_file$metadata13 = file.metadata) !== null && _file$metadata13 !== void 0 && _file$metadata13.country) {
    return file.metadata.country.toLowerCase() !== 'fr';
  }

  return false;
};

exports.isForeignPaper = isForeignPaper;