"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchTimeSeriesByIntervalAndSource = exports.saveTimeSeries = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dsl = require("../queries/dsl");

var validateTimeSeriesFormat = function validateTimeSeriesFormat(timeseries) {
  if (!timeseries.startDate || !timeseries.endDate) {
    throw new Error('You must specify a startDate and endDate for the time serie');
  }

  if (!Date.parse(timeseries.startDate) || !Date.parse(timeseries.endDate)) {
    throw new Error('Invalid date format for the time serie');
  }

  if (!timeseries.dataType) {
    throw new Error('You must specify a dataType for the time serie');
  }

  if (!timeseries.series || !Array.isArray(timeseries.series)) {
    throw new Error('You must specify a series array for the time serie');
  }
};
/**
 * @typedef TimeSeries
 * @property dataType {String} - The type of time series, e.g. 'electricity'
 * @property startDate {Date} - The starting date of the series
 * @property endDate {Date} - The end date of the series
 * @property endType {Date} - The starting date of the series
 * @property source {String} - The data source, e.g. 'enedis.fr'
 * @property theme {String} - The theme used to group time series, e.g. 'energy'
 * @property series {Array} - An array of objects representing the time series
 */

/**
 * Helper to save a time series document.
 *
 * @param {object} client - The CozyClient instance
 *
 
 * @param {TimeSeries} timeseriesOption - The time series to save
 */


var saveTimeSeries = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(client, timeseriesOption) {
    var dataType, series, startDate, endDate, source, theme, doctype, timeseries;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dataType = timeseriesOption.dataType, series = timeseriesOption.series, startDate = timeseriesOption.startDate, endDate = timeseriesOption.endDate, source = timeseriesOption.source, theme = timeseriesOption.theme;
            validateTimeSeriesFormat({
              dataType: dataType,
              series: series,
              startDate: startDate,
              endDate: endDate,
              source: source
            });
            doctype = "io.cozy.timeseries.".concat(dataType);
            timeseries = {
              _type: doctype,
              startDate: startDate,
              endDate: endDate,
              source: source,
              theme: theme,
              series: series
            };
            return _context.abrupt("return", client.save(timeseries));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function saveTimeSeries(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Helper to retrieve time series by their date interval and source.
 *
 * @param {object} client - The CozyClient instance
 * @param {object} params - The query params
 * @param {Date} params.startDate - The starting date of the series
 * @param {Date} params.endDate - The end date of the series
 * @param {String} params.dataType - The type of time series, e.g. 'electricity'
 * @param {String} params.source - The data source, e.g. 'enedis.fr'
 * @param {number} params.limit - Number of serie items to retrieve
 *
 * @typedef TimeSeriesJSONAPI
 * @property data {Array<TimeSeries>} - The JSON-API data response
 * @returns {Promise<TimeSeriesJSONAPI>} The TimeSeries found by the query in JSON-API format
 */


exports.saveTimeSeries = saveTimeSeries;

var fetchTimeSeriesByIntervalAndSource = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(client, _ref2) {
    var startDate, endDate, dataType, source, limit, doctype, query;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            startDate = _ref2.startDate, endDate = _ref2.endDate, dataType = _ref2.dataType, source = _ref2.source, limit = _ref2.limit;

            /**
             * @type {import("../types").Doctype}
             */
            doctype = "io.cozy.timeseries.".concat(dataType);
            query = (0, _dsl.Q)(doctype).where({
              source: source,
              startDate: {
                $gte: startDate
              },
              endDate: {
                $lte: endDate
              }
            }).indexFields(['source', 'startDate', 'endDate']).sortBy([{
              source: 'desc'
            }, {
              startDate: 'desc'
            }, {
              endDate: 'desc'
            }]).limitBy(limit || 5);
            return _context2.abrupt("return", client.query(query));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function fetchTimeSeriesByIntervalAndSource(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.fetchTimeSeriesByIntervalAndSource = fetchTimeSeriesByIntervalAndSource;