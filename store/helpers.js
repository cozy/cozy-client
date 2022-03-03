"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.properId = void 0;

var properId = function properId(doc) {
  return doc.id || doc._id;
};

exports.properId = properId;