"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deltaLatitude = exports.deltaLongitude = exports.computeSphericalCenter = exports.geodesicDistance = exports.computeSpeed = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// @ts-check
var EARTH_RADIUS_M = 6378137;
var EARTH_CIRCUMFERENCE_M = 40075000;
/**
 * Compute the speed from distance and duration
 *
 * @param {number} distance - The distance in meters
 * @param {number} duration - The duration in seconds
 * @returns {number} - The speed, in m/s, rounded to 2 decimals
 */

var computeSpeed = function computeSpeed(distance, duration) {
  if (!distance || !duration) {
    return 0;
  }

  return Math.round(distance / duration * 100) / 100;
};
/**
 * Convert degrees to radians
 *
 * @param {number} degrees - The degrees to convert
 * @returns {number} The converted radians
 */


exports.computeSpeed = computeSpeed;

var degreesToRadians = function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
};
/**
 * Convert radians to degrees
 *
 * @param {number} radians - The radians to convert
 * @returns {number} The converted degrees
 */


var radiansToDegrees = function radiansToDegrees(radians) {
  return radians * 180 / Math.PI;
};
/**
 * Round the value to the n decimal
 *
 * @param {number} value - The value to round
 * @param {number} n - The number of decimals
 * @returns {number} The rounded value
 */


var roundToNDecimals = function roundToNDecimals(value, n) {
  var multiplier = Math.pow(10, n);
  return Math.round(value * multiplier) / multiplier;
};
/**
 * Compute the distance between 2 geographic points, in meters.
 *
 * This is an implementation of the Haversine formula, that
 * supposes a perfect sphere. We know this is not exactly the case
 * for Earth, especially at the poles, but this approximation is good enough.
 * More complex methods do exist, such as Vincenty formula, but we prefer
 * simplicity over precision here.
 * See https://en.wikipedia.org/wiki/Geodesics_on_an_ellipsoid
 *
 * @param {import("../types").Coordinates} point1 - The first point coordinates, in decimal degrees
 * @param {import("../types").Coordinates} point2 - The second point coordinates, in decimal degrees
 * @returns {number} The distance between the points, in meters, rounded to 2 decimals
 */


var geodesicDistance = function geodesicDistance(point1, point2) {
  if ((point1 === null || point1 === void 0 ? void 0 : point1.lon) === undefined || (point1 === null || point1 === void 0 ? void 0 : point1.lat) === undefined || (point2 === null || point2 === void 0 ? void 0 : point2.lon) === undefined || (point2 === null || point2 === void 0 ? void 0 : point2.lat) === undefined) {
    return null;
  }

  var lon1 = degreesToRadians(point1.lon);
  var lat1 = degreesToRadians(point1.lat);
  var lon2 = degreesToRadians(point2.lon);
  var lat2 = degreesToRadians(point2.lat);
  var diffLon = lon2 - lon1;
  var diffLat = lat2 - lat1;
  var aLat = Math.pow(Math.sin(diffLat / 2), 2);
  var aLon = Math.pow(Math.sin(diffLon / 2), 2);
  var a = aLat + Math.cos(lat1) * Math.cos(lat2) * aLon;
  var c = 2 * Math.asin(Math.sqrt(a));
  var distance = EARTH_RADIUS_M * c;
  return roundToNDecimals(distance, 2);
};
/**
 * Compute the geographical center of the given points
 *
 * This consists of finding the centroid of a set of points
 * in a sphere.
 * Note this assumes the Earth is a perfect sphere, which is not,
 * but the approximation should be good enough.
 *
 * @param {Array<import("../types").Coordinates>} coordinates - The geo points
 * @returns {import("../types").Coordinates} The center point
 */


exports.geodesicDistance = geodesicDistance;

var computeSphericalCenter = function computeSphericalCenter(coordinates) {
  if (coordinates.length < 1) {
    return null;
  }

  if (coordinates.length === 1) {
    return coordinates[0];
  }

  var totalX = 0;
  var totalY = 0;
  var totalZ = 0;

  var _iterator = _createForOfIteratorHelper(coordinates),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var coord = _step.value;
      var lon = degreesToRadians(coord.lon);
      var lat = degreesToRadians(coord.lat); // Convert spherical coordinates to Cartesian coordinates

      var x = Math.cos(lat) * Math.cos(lon);
      var y = Math.cos(lat) * Math.sin(lon);
      var z = Math.sin(lat);
      totalX += x;
      totalY += y;
      totalZ += z;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var avgX = totalX / coordinates.length;
  var avgY = totalY / coordinates.length;
  var avgZ = totalZ / coordinates.length; // Don't forget to convert Cartesian coordinates back to spherical

  var centralLon = radiansToDegrees(Math.atan2(avgY, avgX));
  var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
  var centralLat = radiansToDegrees(Math.atan2(avgZ, hyp));
  return {
    lat: roundToNDecimals(centralLat, 13),
    lon: roundToNDecimals(centralLon, 13)
  };
};
/**
 * Compute the longitude delta from a distance, in meters.
 *
 * This requires the latitude: we want to compute the horizontal delta
 * on the Earth surface. As it is a sphere (kind of), this delta won't be
 * the same depending on whether it is on the equator (min variation)
 * or on the poles (max variation), for instance.
 *
 * @param {number} latitude - The latitude
 * @param {number} distance - The distance in meters
 * @returns {number} the longitude delta degrees
 */


exports.computeSphericalCenter = computeSphericalCenter;

var deltaLongitude = function deltaLongitude(latitude, distance) {
  var phi = degreesToRadians(latitude);
  var deltaLambda = distance / (EARTH_RADIUS_M * Math.cos(phi));
  return roundToNDecimals(radiansToDegrees(deltaLambda), 13);
};
/**
 * Compute the latitude delta from a distance, in meters.
 *
 * The reasoning is rather simple: there are 360° of latitudes of same distance.
 * Then, it consists of computing 1 degree distance, and divide the
 * given distance by this value.
 *
 * @param {number} distance - The distance in meters
 * @returns {number} The delta latitude degrees
 */


exports.deltaLongitude = deltaLongitude;

var deltaLatitude = function deltaLatitude(distance) {
  var distOneLatDegree = EARTH_CIRCUMFERENCE_M / 360; // 111 319 meters per degree

  var deltaLat = distance / distOneLatDegree;
  return roundToNDecimals(deltaLat, 13);
};

exports.deltaLatitude = deltaLatitude;