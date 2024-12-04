"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEmojiByCountry = void 0;
var emojiCountry = {
  fr: '🇫🇷'
};
/**
 * @param {string} country - fr, en, etc
 * @param {Function} t - Translation function
 * @returns {string} - Emoji of country
 */

var getEmojiByCountry = function getEmojiByCountry(country, t) {
  if (country === 'stranger') return t('country.stranger');
  return emojiCountry[country];
};

exports.getEmojiByCountry = getEmojiByCountry;