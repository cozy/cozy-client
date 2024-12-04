"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSettings = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = require("react");

var _helpers = require("../helpers");

var _useMutation2 = require("./useMutation");

var _useQuery2 = _interopRequireDefault(require("./useQuery"));

var _utils = require("../utils");

var _settings = require("../helpers/settings");

/**
 * Query the cozy-app settings corresponding to the given slug and
 * return:
 * - the values corresponding to the given `keys`
 * - the `save()` method that can be used to edit the setting's value
 * - the query that manages the state during the fetching of the setting
 * - the mutation that manages the state during the saving of the setting
 *
 * @template {string} T
 *
 * @param {string} slug - the cozy-app's slug containing the setting (special cases are: 'instance' for global settings and 'passwords' for bitwarden settings)
 * @param {T[]} keys - The name of the setting to retrieve
 * @returns {import("../types").UseSettingsReturnValue<T>}
 */
var useSettings = function useSettings(slug, keys) {
  var query = (0, _helpers.getQuery)(slug);

  var _useQuery = (0, _useQuery2.default)(query.definition, query.options),
      settingsData = _useQuery.data,
      settingsQuery = (0, _objectWithoutProperties2.default)(_useQuery, ["data"]);

  var _useMutation = (0, _useMutation2.useMutation)(),
      mutate = _useMutation.mutate,
      mutation = (0, _objectWithoutProperties2.default)(_useMutation, ["mutate"]);

  var save = (0, _react.useCallback)(function (items) {
    var settings = (0, _helpers.normalizeSettings)(settingsData);
    var newSettings = (0, _helpers.editSettings)(slug, settings, items);
    return mutate(newSettings);
  }, [mutate, settingsData, slug]);
  var settings = (0, _helpers.normalizeSettings)(settingsData);
  var settingValue = (0, _utils.hasQueryBeenLoaded)(settingsQuery) ? (0, _settings.extractKeys)(settings, keys) : undefined;
  return {
    query: settingsQuery,
    values: settingValue,
    save: save,
    mutation: mutation
  };
};

exports.useSettings = useSettings;