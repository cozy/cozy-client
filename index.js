"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  CozyLink: true,
  StackLink: true,
  WebFlagshipLink: true,
  compose: true,
  QueryDefinition: true,
  Q: true,
  Mutations: true,
  MutationTypes: true,
  getDoctypeFromOperation: true,
  Association: true,
  HasMany: true,
  HasOne: true,
  HasOneInPlace: true,
  HasManyInPlace: true,
  HasManyTriggers: true,
  isReferencedBy: true,
  isReferencedById: true,
  getReferencedBy: true,
  getReferencedById: true,
  deconstructCozyWebLinkWithSlug: true,
  deconstructRedirectLink: true,
  dehydrate: true,
  generateWebLink: true,
  ensureFirstSlash: true,
  rootCozyUrl: true,
  InvalidRedirectLinkError: true,
  InvalidCozyUrlError: true,
  InvalidProtocolError: true,
  BlockedCozyError: true,
  cancelable: true,
  isQueryLoading: true,
  hasQueryBeenLoaded: true,
  isQueriesLoading: true,
  hasQueriesBeenLoaded: true,
  getQueryFromState: true,
  dispatchCreate: true,
  dispatchUpdate: true,
  dispatchDelete: true,
  Registry: true,
  RealTimeQueries: true,
  manifest: true,
  CozyProvider: true,
  withMutation: true,
  withMutations: true,
  Query: true,
  queryConnect: true,
  queryConnectFlat: true,
  withClient: true,
  models: true,
  fetchPolicies: true,
  BulkEditError: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _CozyClient.default;
  }
});
Object.defineProperty(exports, "CozyLink", {
  enumerable: true,
  get: function get() {
    return _CozyLink.default;
  }
});
Object.defineProperty(exports, "StackLink", {
  enumerable: true,
  get: function get() {
    return _StackLink.default;
  }
});
Object.defineProperty(exports, "WebFlagshipLink", {
  enumerable: true,
  get: function get() {
    return _WebFlagshipLink.default;
  }
});
Object.defineProperty(exports, "compose", {
  enumerable: true,
  get: function get() {
    return _flow.default;
  }
});
Object.defineProperty(exports, "QueryDefinition", {
  enumerable: true,
  get: function get() {
    return _dsl.QueryDefinition;
  }
});
Object.defineProperty(exports, "Q", {
  enumerable: true,
  get: function get() {
    return _dsl.Q;
  }
});
Object.defineProperty(exports, "Mutations", {
  enumerable: true,
  get: function get() {
    return _dsl.Mutations;
  }
});
Object.defineProperty(exports, "MutationTypes", {
  enumerable: true,
  get: function get() {
    return _dsl.MutationTypes;
  }
});
Object.defineProperty(exports, "getDoctypeFromOperation", {
  enumerable: true,
  get: function get() {
    return _dsl.getDoctypeFromOperation;
  }
});
Object.defineProperty(exports, "Association", {
  enumerable: true,
  get: function get() {
    return _associations.Association;
  }
});
Object.defineProperty(exports, "HasMany", {
  enumerable: true,
  get: function get() {
    return _associations.HasMany;
  }
});
Object.defineProperty(exports, "HasOne", {
  enumerable: true,
  get: function get() {
    return _associations.HasOne;
  }
});
Object.defineProperty(exports, "HasOneInPlace", {
  enumerable: true,
  get: function get() {
    return _associations.HasOneInPlace;
  }
});
Object.defineProperty(exports, "HasManyInPlace", {
  enumerable: true,
  get: function get() {
    return _associations.HasManyInPlace;
  }
});
Object.defineProperty(exports, "HasManyTriggers", {
  enumerable: true,
  get: function get() {
    return _associations.HasManyTriggers;
  }
});
Object.defineProperty(exports, "isReferencedBy", {
  enumerable: true,
  get: function get() {
    return _helpers.isReferencedBy;
  }
});
Object.defineProperty(exports, "isReferencedById", {
  enumerable: true,
  get: function get() {
    return _helpers.isReferencedById;
  }
});
Object.defineProperty(exports, "getReferencedBy", {
  enumerable: true,
  get: function get() {
    return _helpers.getReferencedBy;
  }
});
Object.defineProperty(exports, "getReferencedById", {
  enumerable: true,
  get: function get() {
    return _helpers.getReferencedById;
  }
});
Object.defineProperty(exports, "deconstructCozyWebLinkWithSlug", {
  enumerable: true,
  get: function get() {
    return _helpers2.deconstructCozyWebLinkWithSlug;
  }
});
Object.defineProperty(exports, "deconstructRedirectLink", {
  enumerable: true,
  get: function get() {
    return _helpers2.deconstructRedirectLink;
  }
});
Object.defineProperty(exports, "dehydrate", {
  enumerable: true,
  get: function get() {
    return _helpers2.dehydrate;
  }
});
Object.defineProperty(exports, "generateWebLink", {
  enumerable: true,
  get: function get() {
    return _helpers2.generateWebLink;
  }
});
Object.defineProperty(exports, "ensureFirstSlash", {
  enumerable: true,
  get: function get() {
    return _helpers2.ensureFirstSlash;
  }
});
Object.defineProperty(exports, "rootCozyUrl", {
  enumerable: true,
  get: function get() {
    return _helpers2.rootCozyUrl;
  }
});
Object.defineProperty(exports, "InvalidRedirectLinkError", {
  enumerable: true,
  get: function get() {
    return _helpers2.InvalidRedirectLinkError;
  }
});
Object.defineProperty(exports, "InvalidCozyUrlError", {
  enumerable: true,
  get: function get() {
    return _helpers2.InvalidCozyUrlError;
  }
});
Object.defineProperty(exports, "InvalidProtocolError", {
  enumerable: true,
  get: function get() {
    return _helpers2.InvalidProtocolError;
  }
});
Object.defineProperty(exports, "BlockedCozyError", {
  enumerable: true,
  get: function get() {
    return _helpers2.BlockedCozyError;
  }
});
Object.defineProperty(exports, "cancelable", {
  enumerable: true,
  get: function get() {
    return _utils.cancelable;
  }
});
Object.defineProperty(exports, "isQueryLoading", {
  enumerable: true,
  get: function get() {
    return _utils.isQueryLoading;
  }
});
Object.defineProperty(exports, "hasQueryBeenLoaded", {
  enumerable: true,
  get: function get() {
    return _utils.hasQueryBeenLoaded;
  }
});
Object.defineProperty(exports, "isQueriesLoading", {
  enumerable: true,
  get: function get() {
    return _utils.isQueriesLoading;
  }
});
Object.defineProperty(exports, "hasQueriesBeenLoaded", {
  enumerable: true,
  get: function get() {
    return _utils.hasQueriesBeenLoaded;
  }
});
Object.defineProperty(exports, "getQueryFromState", {
  enumerable: true,
  get: function get() {
    return _store.getQueryFromState;
  }
});
Object.defineProperty(exports, "dispatchCreate", {
  enumerable: true,
  get: function get() {
    return _store.dispatchCreate;
  }
});
Object.defineProperty(exports, "dispatchUpdate", {
  enumerable: true,
  get: function get() {
    return _store.dispatchUpdate;
  }
});
Object.defineProperty(exports, "dispatchDelete", {
  enumerable: true,
  get: function get() {
    return _store.dispatchDelete;
  }
});
Object.defineProperty(exports, "Registry", {
  enumerable: true,
  get: function get() {
    return _registry.default;
  }
});
Object.defineProperty(exports, "RealTimeQueries", {
  enumerable: true,
  get: function get() {
    return _RealTimeQueries.default;
  }
});
Object.defineProperty(exports, "CozyProvider", {
  enumerable: true,
  get: function get() {
    return _Provider.default;
  }
});
Object.defineProperty(exports, "withMutation", {
  enumerable: true,
  get: function get() {
    return _withMutation.default;
  }
});
Object.defineProperty(exports, "withMutations", {
  enumerable: true,
  get: function get() {
    return _withMutations.default;
  }
});
Object.defineProperty(exports, "Query", {
  enumerable: true,
  get: function get() {
    return _Query.default;
  }
});
Object.defineProperty(exports, "queryConnect", {
  enumerable: true,
  get: function get() {
    return _hoc.queryConnect;
  }
});
Object.defineProperty(exports, "queryConnectFlat", {
  enumerable: true,
  get: function get() {
    return _hoc.queryConnectFlat;
  }
});
Object.defineProperty(exports, "withClient", {
  enumerable: true,
  get: function get() {
    return _hoc.withClient;
  }
});
Object.defineProperty(exports, "fetchPolicies", {
  enumerable: true,
  get: function get() {
    return _policies.default;
  }
});
Object.defineProperty(exports, "BulkEditError", {
  enumerable: true,
  get: function get() {
    return _errors.BulkEditError;
  }
});
exports.models = exports.manifest = void 0;

var _CozyClient = _interopRequireDefault(require("./CozyClient"));

var _CozyLink = _interopRequireDefault(require("./CozyLink"));

var _StackLink = _interopRequireDefault(require("./StackLink"));

var _WebFlagshipLink = _interopRequireDefault(require("./WebFlagshipLink"));

var _flow = _interopRequireDefault(require("lodash/flow"));

var _dsl = require("./queries/dsl");

var _associations = require("./associations");

var _helpers = require("./associations/helpers");

var _helpers2 = require("./helpers");

var _utils = require("./utils");

var _store = require("./store");

var _registry = _interopRequireDefault(require("./registry"));

var _RealTimeQueries = _interopRequireDefault(require("./RealTimeQueries"));

var manifest = _interopRequireWildcard(require("./models/manifest"));

exports.manifest = manifest;

var _Provider = _interopRequireDefault(require("./Provider"));

var _withMutation = _interopRequireDefault(require("./withMutation"));

var _withMutations = _interopRequireDefault(require("./withMutations"));

var _Query = _interopRequireDefault(require("./Query"));

var _hoc = require("./hoc");

var models = _interopRequireWildcard(require("./models"));

exports.models = models;

var _policies = _interopRequireDefault(require("./policies"));

var _mock = require("./mock");

Object.keys(_mock).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _mock[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mock[key];
    }
  });
});

var _hooks = require("./hooks");

Object.keys(_hooks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _hooks[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _hooks[key];
    }
  });
});

var _errors = require("./errors");