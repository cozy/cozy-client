"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isQueryExisting = exports.getRawQueryFromState = exports.getQueryFromState = exports.getQueryFromStore = exports.getDocumentFromState = exports.getCollectionFromState = exports.getStateRoot = void 0;

var _documents = require("./documents");

var _queries = require("./queries");

var getStateRoot = function getStateRoot(state) {
  return state.cozy || {};
};

exports.getStateRoot = getStateRoot;

var getCollectionFromState = function getCollectionFromState(state, doctype) {
  return (0, _documents.getCollectionFromSlice)(getStateRoot(state).documents, doctype);
};

exports.getCollectionFromState = getCollectionFromState;

var getDocumentFromState = function getDocumentFromState(state, doctype, id) {
  return (0, _documents.getDocumentFromSlice)(getStateRoot(state).documents, doctype, id);
};

exports.getDocumentFromState = getDocumentFromState;

var getQueryFromStore = function getQueryFromStore(store, queryId) {
  return getQueryFromState(store.getState(), queryId);
};

exports.getQueryFromStore = getQueryFromStore;

var getQueryFromState = function getQueryFromState(state, queryId) {
  return (0, _queries.getQueryFromSlice)(getStateRoot(state).queries, queryId, getStateRoot(state).documents);
};

exports.getQueryFromState = getQueryFromState;

var getRawQueryFromState = function getRawQueryFromState(state, queryId) {
  return (0, _queries.getQueryFromSlice)(getStateRoot(state).queries, queryId);
};

exports.getRawQueryFromState = getRawQueryFromState;

var isQueryExisting = function isQueryExisting(state, queryId) {
  return getStateRoot(state).queries[queryId] !== undefined;
};

exports.isQueryExisting = isQueryExisting;