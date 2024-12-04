"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _useQuery2 = _interopRequireDefault(require("./useQuery"));

var _dsl = require("../queries/dsl");

var _CozyClient = _interopRequireDefault(require("../CozyClient"));

var DEFAULT_CACHE_TIMEOUT_QUERIES = 10 * 60 * 1000; // 10 minutes

/**
 * Returns all apps in maintenance
 *
 * @returns {import("../types").AppsDoctype[]} An array with all apps in maintenance
 */

var useAppsInMaintenance = function useAppsInMaintenance() {
  var _useQuery = (0, _useQuery2.default)((0, _dsl.Q)('io.cozy.apps_registry').getById('maintenance'), {
    as: 'io.cozy.apps_registry/maintenance',
    fetchPolicy: _CozyClient.default.fetchPolicies.olderThan(DEFAULT_CACHE_TIMEOUT_QUERIES),
    singleDocData: false
  }),
      appsInMaintenance = _useQuery.data;

  return appsInMaintenance || [];
};

var _default = useAppsInMaintenance;
exports.default = _default;