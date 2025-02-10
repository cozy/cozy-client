"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIllegalCharacters = void 0;

/**
 * Get the list of illegal characters in the file name
 *
 * @public
 * @param {string} name - the file name
 * @returns {string} illegal characters separated by spaces
 */
var getIllegalCharacters = function getIllegalCharacters(name) {
  var FILENAME_ILLEGAL_CHARACTERS = /\/|\x00|\n|\r/g; // eslint-disable-line no-control-regex

  var match = name.match(FILENAME_ILLEGAL_CHARACTERS);
  return match ? match.join(' ') : '';
};

exports.getIllegalCharacters = getIllegalCharacters;