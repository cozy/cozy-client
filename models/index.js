"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geo = exports.user = exports.paper = exports.dacc = exports.sharing = exports.timeseries = exports.document = exports.contact = exports.utils = exports.permission = exports.note = exports.account = exports.konnectorFolder = exports.folder = exports.file = exports.applications = exports.instance = exports.trigger = exports.accounts = exports.triggers = void 0;

var trigger = _interopRequireWildcard(require("./trigger"));

exports.trigger = trigger;

var instance = _interopRequireWildcard(require("./instance"));

exports.instance = instance;

var applications = _interopRequireWildcard(require("./applications"));

exports.applications = applications;

var file = _interopRequireWildcard(require("./file"));

exports.file = file;

var folder = _interopRequireWildcard(require("./folder"));

exports.folder = folder;

var konnectorFolder = _interopRequireWildcard(require("./konnectorFolder"));

exports.konnectorFolder = konnectorFolder;

var account = _interopRequireWildcard(require("./account"));

exports.account = account;

var note = _interopRequireWildcard(require("./note"));

exports.note = note;

var permission = _interopRequireWildcard(require("./permission"));

exports.permission = permission;

var utils = _interopRequireWildcard(require("./utils"));

exports.utils = utils;

var contact = _interopRequireWildcard(require("./contact"));

exports.contact = contact;

var document = _interopRequireWildcard(require("./document"));

exports.document = document;

var timeseries = _interopRequireWildcard(require("./timeseries"));

exports.timeseries = timeseries;

var sharing = _interopRequireWildcard(require("./sharing"));

exports.sharing = sharing;

var dacc = _interopRequireWildcard(require("./dacc"));

exports.dacc = dacc;

var paper = _interopRequireWildcard(require("./paper"));

exports.paper = paper;

var user = _interopRequireWildcard(require("./user"));

exports.user = user;

var geo = _interopRequireWildcard(require("./geo"));

exports.geo = geo;
// For backward compatibility before 9.0.0
var triggers = trigger;
exports.triggers = triggers;
var accounts = account;
exports.accounts = accounts;