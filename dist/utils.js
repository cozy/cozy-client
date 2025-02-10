"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.joinPath = joinPath;
exports.encodePath = exports.forceDownload = exports.formatBytes = exports.slugify = exports.sleep = exports.attempt = exports.uri = void 0;

/**
 * @function
 * @description Template tag function for URIs encoding
 *
 * Will automatically apply `encodeURIComponent` to template literal placeholders
 *
 * @example
 * ```
 * const safe = uri`/data/${doctype}/_all_docs?limit=${limit}`
 * ```
 *
 * @private
 */
var uri = function uri(strings) {
  var parts = [strings[0]];

  for (var i = 0; i < (arguments.length <= 1 ? 0 : arguments.length - 1); i++) {
    parts.push(encodeURIComponent(i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1]) + strings[i + 1]);
  }

  return parts.join('');
};
/**
 * @function
 * @description Helps to avoid nested try/catch when using async/await
 *
 * Inspired by a Go pattern: http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
 *
 * @example
 * ```
 * if (await attempt(collection.all()) return
 * await sleep(1000)
 * if (await attempt(collection.all()) return
 * await sleep(1000)
 * return
 * ```
 *
 * @private
 */


exports.uri = uri;

var attempt = function attempt(promise) {
  return promise.then(function () {
    return true;
  }).catch(function () {
    return false;
  });
};
/**
 * @function
 * @description Helps to avoid nested try/catch when using async/await — see documentation for attempt
 * @private
 */


exports.attempt = attempt;

var sleep = function sleep(time, args) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time, args);
  });
};

exports.sleep = sleep;

var slugify = function slugify(text) {
  return text.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with -
  .replace(/[^\w-]+/g, '') // Remove all non-word chars
  .replace(/--+/g, '-') // Replace multiple - with single -
  .replace(/^-+/, '') // Trim - from start of text
  .replace(/-+$/, '');
}; // Trim - from end of text


exports.slugify = slugify;

var formatBytes = function formatBytes(bytes) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  if (bytes === 0) return '0 Bytes';
  var k = 1024;
  var dm = decimals < 0 ? 0 : decimals;
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
/**
 * Force a download from the given href
 *
 * @param {string} href - The link to download
 * @param {string} filename - The file name to download
 */


exports.formatBytes = formatBytes;

var forceDownload = function forceDownload(href, filename) {
  var element = document.createElement('a');
  element.setAttribute('href', href);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
/**
 * Join two paths together ensuring there is only one slash between them
 *
 * @param {string} start The starting part of the path
 * @param {string} end The ending part of the path
 * @returns {string} The joined path
 */


exports.forceDownload = forceDownload;

function joinPath(start, end) {
  return "".concat(start).concat(start.endsWith('/') ? '' : '/').concat(end);
}
/**
 * Encode a path for use in a URL by encoding special characters but keeping slashes
 *
 * @param {string} path - The path to encode
 * @returns {string} - The encoded path with special characters for parentheses and spaces
 */


var encodePath = function encodePath(path) {
  return path.split('/').map(function (segment) {
    return encodeURIComponent(segment).replace(/\(/g, '%28').replace(/\)/g, '%29');
  }).join('/');
};

exports.encodePath = encodePath;