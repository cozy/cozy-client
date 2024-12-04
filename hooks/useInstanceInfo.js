"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useInstanceInfo = void 0;

var _useQuery = _interopRequireDefault(require("./useQuery"));

var _CozyClient = _interopRequireDefault(require("../CozyClient"));

var _dsl = require("../queries/dsl");

var _utils = require("../utils");

/**
 * Retrieve intance info like context, uuid, disk usage etc
 *
 * @returns {import("../types").InstanceInfo}
 */
var useInstanceInfo = function useInstanceInfo() {
  var instanceQuery = buildSettingsByIdQuery('io.cozy.settings.instance');
  var instanceResult = (0, _useQuery.default)(instanceQuery.definition, instanceQuery.options);
  var contextQuery = buildSettingsByIdQuery('io.cozy.settings.context');
  var contextResult = (0, _useQuery.default)(contextQuery.definition, contextQuery.options);
  var diskUsageQuery = buildSettingsByIdQuery('io.cozy.settings.disk-usage');
  var diskUsageResult = (0, _useQuery.default)(diskUsageQuery.definition, diskUsageQuery.options);
  return {
    isLoaded: (0, _utils.hasQueryBeenLoaded)(instanceResult) !== null && (0, _utils.hasQueryBeenLoaded)(contextResult) !== null && (0, _utils.hasQueryBeenLoaded)(diskUsageResult) !== null,
    instance: {
      data: instanceResult.data
    },
    context: {
      data: contextResult.data
    },
    diskUsage: {
      data: diskUsageResult.data
    }
  };
};

exports.useInstanceInfo = useInstanceInfo;
var DEFAULT_CACHE_TIMEOUT_QUERIES = 9 * 60 * 1000;

var buildSettingsByIdQuery = function buildSettingsByIdQuery(id) {
  return {
    definition: (0, _dsl.Q)('io.cozy.settings').getById(id),
    options: {
      as: "io.cozy.settings/".concat(id),
      fetchPolicy: _CozyClient.default.fetchPolicies.olderThan(DEFAULT_CACHE_TIMEOUT_QUERIES),
      singleDocData: true
    }
  };
};