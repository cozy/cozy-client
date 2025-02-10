"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.hasJobFinished = exports.normalizeJob = exports.JOBS_DOCTYPE = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _Collection = _interopRequireDefault(require("./Collection"));

var _DocumentCollection2 = _interopRequireDefault(require("./DocumentCollection"));

var _utils = require("./utils");

var _normalize = require("./normalize");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["/jobs/", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var JOBS_DOCTYPE = 'io.cozy.jobs';
exports.JOBS_DOCTYPE = JOBS_DOCTYPE;

var sleep = function sleep(delay) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, delay);
  });
};

var normalizeJob = (0, _normalize.normalizeDoctypeJsonApi)(JOBS_DOCTYPE);
exports.normalizeJob = normalizeJob;

var hasJobFinished = function hasJobFinished(job) {
  return job.state === 'done' || job.state === 'errored';
};
/**
 * Document representing a io.cozy.jobs
 *
 * @typedef {object} JobDocument
 * @property {string} _id - Id of the job
 * @property {string} attributes.state - state of the job. Can be 'errored', 'running', 'queued', 'done'
 * @property {string} attributes.error - Error message of the job if any
 */


exports.hasJobFinished = hasJobFinished;

var JobCollection = /*#__PURE__*/function (_DocumentCollection) {
  (0, _inherits2.default)(JobCollection, _DocumentCollection);

  var _super = _createSuper(JobCollection);

  function JobCollection(stackClient) {
    (0, _classCallCheck2.default)(this, JobCollection);
    return _super.call(this, JOBS_DOCTYPE, stackClient);
  }

  (0, _createClass2.default)(JobCollection, [{
    key: "queued",
    value: function queued(workerType) {
      return this.stackClient.fetchJSON('GET', "/jobs/queue/".concat(workerType));
    }
    /**
     * Creates a job
     *
     * @param  {string} workerType - Ex: "konnector"
     * @param  {object} [args={}] - Ex: {"slug": "my-konnector", "trigger": "trigger-id"}
     * @param  {object} [options={}] - creation options
     * @param  {boolean} [manual=false] -  Manual execution
     * @returns {object} createdJob
     */

  }, {
    key: "create",
    value: function create(workerType) {
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var manual = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      return this.stackClient.fetchJSON('POST', "/jobs/queue/".concat(workerType), {
        data: {
          type: JOBS_DOCTYPE,
          attributes: {
            arguments: args,
            options: options,
            manual: manual
          }
        }
      });
    }
    /**
     * Return a normalized job, given its id
     *
     * @param {string} id - id of the job
     * @returns {JobDocument}
     */

  }, {
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(id) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _Collection.default.get(this.stackClient, (0, _utils.uri)(_templateObject(), id), {
                  normalize: normalizeJob
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get(_x) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
    /**
     * Update the job's state
     * This does work only for jobs comming from @client triggers
     *
     * @param {JobDocument} job - io.cozy.jobs document
     */

  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(job) {
        var jobResult;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(job.worker !== 'client')) {
                  _context2.next = 2;
                  break;
                }

                throw new Error("JobCollection.update only works for client workers. ".concat(job.worker, " given"));

              case 2:
                _context2.next = 4;
                return this.stackClient.fetchJSON('PATCH', "/jobs/".concat(job._id), {
                  data: {
                    type: JOBS_DOCTYPE,
                    id: job._id,
                    attributes: {
                      state: job.attributes.state,
                      error: job.attributes.error
                    }
                  }
                });

              case 4:
                jobResult = _context2.sent;
                return _context2.abrupt("return", normalizeJob(jobResult.data));

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function update(_x2) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
    /**
     * Polls a job state until it is finished
     *
     * `options.until` can be used to tweak when to stop waiting. It will be
     * given the current job state. If true is returned, the awaiting is
     * stopped.
     */

  }, {
    key: "waitFor",
    value: function () {
      var _waitFor = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(id) {
        var _ref,
            _ref$onUpdate,
            onUpdate,
            _ref$until,
            until,
            _ref$delay,
            delay,
            _ref$timeout,
            timeout,
            start,
            jobData,
            now,
            _args3 = arguments;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _ref = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {}, _ref$onUpdate = _ref.onUpdate, onUpdate = _ref$onUpdate === void 0 ? null : _ref$onUpdate, _ref$until = _ref.until, until = _ref$until === void 0 ? hasJobFinished : _ref$until, _ref$delay = _ref.delay, delay = _ref$delay === void 0 ? 5 * 1000 : _ref$delay, _ref$timeout = _ref.timeout, timeout = _ref$timeout === void 0 ? 60 * 5 * 1000 : _ref$timeout;
                start = Date.now();
                _context3.next = 4;
                return this.get(id);

              case 4:
                jobData = _context3.sent.data.attributes;

              case 5:
                if (!(!jobData || !until(jobData))) {
                  _context3.next = 17;
                  break;
                }

                _context3.next = 8;
                return sleep(delay);

              case 8:
                _context3.next = 10;
                return this.get(id);

              case 10:
                jobData = _context3.sent.data.attributes;

                if (onUpdate) {
                  onUpdate(jobData);
                }

                now = Date.now();

                if (!(start - now > timeout)) {
                  _context3.next = 15;
                  break;
                }

                throw new Error('Timeout for JobCollection::waitFor');

              case 15:
                _context3.next = 5;
                break;

              case 17:
                return _context3.abrupt("return", jobData);

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function waitFor(_x3) {
        return _waitFor.apply(this, arguments);
      }

      return waitFor;
    }()
  }]);
  return JobCollection;
}(_DocumentCollection2.default);

var _default = JobCollection;
exports.default = _default;