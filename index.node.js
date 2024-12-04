"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  CozyLink: true,
  StackLink: true,
  compose: true,
  QueryDefinition: true,
  Mutations: true,
  MutationTypes: true,
  getDoctypeFromOperation: true,
  Q: true,
  Association: true,
  HasMany: true,
  HasOne: true,
  HasOneInPlace: true,
  HasManyInPlace: true,
  HasManyTriggers: true,
  getReferencedBy: true,
  deconstructCozyWebLinkWithSlug: true,
  deconstructRedirectLink: true,
  dehydrate: true,
  generateWebLink: true,
  ensureFirstSlash: true,
  rootCozyUrl: true,
  InvalidCozyUrlError: true,
  InvalidProtocolError: true,
  BlockedCozyError: true,
  cancelable: true,
  getQueryFromState: true,
  Registry: true,
  manifest: true,
  BulkEditError: true,
  models: true,
  fetchPolicies: true
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
Object.defineProperty(exports, "Q", {
  enumerable: true,
  get: function get() {
    return _dsl.Q;
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
Object.defineProperty(exports, "getReferencedBy", {
  enumerable: true,
  get: function get() {
    return _helpers.getReferencedBy;
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
Object.defineProperty(exports, "getQueryFromState", {
  enumerable: true,
  get: function get() {
    return _store.getQueryFromState;
  }
});
Object.defineProperty(exports, "Registry", {
  enumerable: true,
  get: function get() {
    return _registry.default;
  }
});
Object.defineProperty(exports, "BulkEditError", {
  enumerable: true,
  get: function get() {
    return _errors.BulkEditError;
  }
});
Object.defineProperty(exports, "fetchPolicies", {
  enumerable: true,
  get: function get() {
    return _policies.default;
  }
});
exports.models = exports.manifest = void 0;

var _CozyClient = _interopRequireDefault(require("./CozyClient"));

var _CozyLink = _interopRequireDefault(require("./CozyLink"));

var _StackLink = _interopRequireDefault(require("./StackLink"));

var _flow = _interopRequireDefault(require("lodash/flow"));

var _dsl = require("./queries/dsl");

var _associations = require("./associations");

var _helpers = require("./associations/helpers");

var _helpers2 = require("./helpers");

var _utils = require("./utils");

var _store = require("./store");

var _registry = _interopRequireDefault(require("./registry"));

var manifest = _interopRequireWildcard(require("./models/manifest"));

exports.manifest = manifest;

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

var _errors = require("./errors");

var _cli = require("./cli");

Object.keys(_cli).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _cli[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _cli[key];
    }
  });
});

var models = _interopRequireWildcard(require("./models"));

exports.models = models;

var _policies = _interopRequireDefault(require("./policies"));