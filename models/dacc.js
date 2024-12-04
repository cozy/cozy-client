"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAggregatesFromDACC = exports.buildAggregateParams = exports.sendMeasureToDACC = exports.checkMeasureParams = exports.isCorrectDateFormat = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cozyLogger = _interopRequireDefault(require("cozy-logger"));

var _CozyClient = _interopRequireDefault(require("../CozyClient"));

/**
 * Check whether or not the given date is in YYYY-MM-DD format
 *
 * @param {string} date - The date to check
 * @returns {boolean}
 */
var isCorrectDateFormat = function isCorrectDateFormat(date) {
  try {
    var parsedDate = new Date(Date.parse(date));
    return !!parsedDate.toISOString().startsWith(date);
  } catch (err) {
    return false;
  }
};
/**
 * Throw an errror if a DACC parameter is incorrect.
 *
 * @param { import("../types").DACCMeasure} measure - The DACC measure
 */


exports.isCorrectDateFormat = isCorrectDateFormat;

var checkMeasureParams = function checkMeasureParams(measure) {
  var createdBy = measure.createdBy,
      measureName = measure.measureName,
      startDate = measure.startDate,
      value = measure.value,
      group1 = measure.group1,
      group2 = measure.group2,
      group3 = measure.group3;

  if (!createdBy || typeof createdBy !== 'string') {
    throw new Error('Missing or wrong type parameter: createdBy');
  }

  if (!measureName || typeof measureName !== 'string') {
    throw new Error('Missing or wrong type parameter: measureName');
  }

  if (!startDate) {
    throw new Error('Missing parameter: startDate');
  }

  if (!isCorrectDateFormat(startDate)) {
    throw new Error('Date should be in YYYY-MM-DD format');
  }

  if (typeof value !== 'number') {
    throw new Error('Missing or wrong type parameter: value');
  }

  if (group1 && (typeof group1 !== 'object' || Object.keys(group1).length === 0) || group2 && (typeof group2 !== 'object' || Object.keys(group2).length === 0) || group3 && (typeof group3 !== 'object' || Object.keys(group3).length === 0)) {
    throw new Error('Groups should be key-value objects');
  }

  if (group3 && (!group2 || !group1) || group2 && !group1) {
    throw new Error('Group order must be respected');
  }
};
/**
 * Send measures to a DACC through a remote doctype
 *
 * @param {CozyClient} client - The CozyClient instance
 * @param {string} remoteDoctype - The remote doctype to use
 * @param {import("../types").DACCMeasure} measure - The DACC measure
 */


exports.checkMeasureParams = checkMeasureParams;

var sendMeasureToDACC = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(client, remoteDoctype, measure) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            checkMeasureParams(measure);
            _context.next = 4;
            return client.getStackClient().fetchJSON('POST', "/remote/".concat(remoteDoctype), {
              data: JSON.stringify(measure),
              path: 'measure'
            });

          case 4:
            _context.next = 10;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            (0, _cozyLogger.default)('error', "Error while sending measure to remote doctype: ".concat(_context.t0.message));
            throw _context.t0;

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function sendMeasureToDACC(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Build parameters to request DACC aggregate
 *
 *
 * @typedef Params - The unformatted DACC aggregate params
 * @property {string} [measureName] - The measure name
 * @property {string} [startDate]   - The measure start date
 * @property {string} [endDate]     - The measure end date
 *
 * @param {Params} params - The unformatted DACC aggregate params
 * @returns {import("../types").DACCAggregatesParams}
 */


exports.sendMeasureToDACC = sendMeasureToDACC;

var buildAggregateParams = function buildAggregateParams(params) {
  var measureName = params.measureName;

  if (!measureName || typeof measureName !== 'string') {
    throw new Error('Missing or wrong type parameter: measureName');
  }

  var startDate = params.startDate || new Date(0).toISOString();
  var endDate = params.endDate || new Date(Date.now()).toISOString();

  if (!isCorrectDateFormat(startDate) || !isCorrectDateFormat(endDate)) {
    (0, _cozyLogger.default)('error', "Date should be in YYYY-MM-DD format but received: startDate: ".concat(startDate, " | endDate: ").concat(endDate));
    throw new Error('Date should be in YYYY-MM-DD format');
  }

  return {
    measureName: measureName,
    startDate: startDate,
    endDate: endDate
  };
};
/**
 * Send measures to a DACC through a remote doctype
 *
 * @param {CozyClient} client - The CozyClient instance
 * @param {string} remoteDoctype - The remote doctype to use
 * @param {import("../types").DACCAggregatesParams} params - The request params
 * @returns { Promise<import("../types").DACCAggregatesResponse> }
 */


exports.buildAggregateParams = buildAggregateParams;

var fetchAggregatesFromDACC = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(client, remoteDoctype, params) {
    var aggregateParams;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            aggregateParams = buildAggregateParams(params);
            _context2.next = 4;
            return client.getStackClient().fetchJSON('POST', "/remote/".concat(remoteDoctype), {
              data: JSON.stringify(aggregateParams),
              path: 'aggregate'
            });

          case 4:
            return _context2.abrupt("return", _context2.sent);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            (0, _cozyLogger.default)('error', "Error while fetching aggregates to remote doctype: ".concat(_context2.t0.message));
            throw _context2.t0;

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function fetchAggregatesFromDACC(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.fetchAggregatesFromDACC = fetchAggregatesFromDACC;