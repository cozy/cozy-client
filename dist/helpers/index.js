"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "deconstructCozyWebLinkWithSlug", {
  enumerable: true,
  get: function get() {
    return _urlHelper.deconstructCozyWebLinkWithSlug;
  }
});
Object.defineProperty(exports, "deconstructRedirectLink", {
  enumerable: true,
  get: function get() {
    return _urlHelper.deconstructRedirectLink;
  }
});
Object.defineProperty(exports, "generateWebLink", {
  enumerable: true,
  get: function get() {
    return _urlHelper.generateWebLink;
  }
});
Object.defineProperty(exports, "ensureFirstSlash", {
  enumerable: true,
  get: function get() {
    return _urlHelper.ensureFirstSlash;
  }
});
Object.defineProperty(exports, "rootCozyUrl", {
  enumerable: true,
  get: function get() {
    return _urlHelper.rootCozyUrl;
  }
});
Object.defineProperty(exports, "InvalidRedirectLinkError", {
  enumerable: true,
  get: function get() {
    return _urlHelper.InvalidRedirectLinkError;
  }
});
Object.defineProperty(exports, "InvalidCozyUrlError", {
  enumerable: true,
  get: function get() {
    return _urlHelper.InvalidCozyUrlError;
  }
});
Object.defineProperty(exports, "InvalidProtocolError", {
  enumerable: true,
  get: function get() {
    return _urlHelper.InvalidProtocolError;
  }
});
Object.defineProperty(exports, "BlockedCozyError", {
  enumerable: true,
  get: function get() {
    return _urlHelper.BlockedCozyError;
  }
});
Object.defineProperty(exports, "dehydrate", {
  enumerable: true,
  get: function get() {
    return _dehydrateHelper.dehydrate;
  }
});
Object.defineProperty(exports, "editSettings", {
  enumerable: true,
  get: function get() {
    return _settings.editSettings;
  }
});
Object.defineProperty(exports, "getQuery", {
  enumerable: true,
  get: function get() {
    return _settings.getQuery;
  }
});
Object.defineProperty(exports, "getSettings", {
  enumerable: true,
  get: function get() {
    return _settings.getSettings;
  }
});
Object.defineProperty(exports, "normalizeSettings", {
  enumerable: true,
  get: function get() {
    return _settings.normalizeSettings;
  }
});
Object.defineProperty(exports, "saveAfterFetchSettings", {
  enumerable: true,
  get: function get() {
    return _settings.saveAfterFetchSettings;
  }
});

var _urlHelper = require("./urlHelper");

var _dehydrateHelper = require("./dehydrateHelper");

var _settings = require("./settings");