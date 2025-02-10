"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getSharingRules = exports.BITWARDEN_CIPHERS_DOCTYPE = exports.BITWARDEN_ORGANIZATIONS_DOCTYPE = exports.SHARING_DOCTYPE = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _DocumentCollection2 = _interopRequireDefault(require("./DocumentCollection"));

var _normalize = require("./normalize");

var _FileCollection = require("./FileCollection");

var _utils = require("./utils");

var _logger = _interopRequireDefault(require("./logger"));

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["/sharings/", "/recipients"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["/sharings/", "/recipients/self"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["/sharings/", "/groups/", ""]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["/sharings/", "/recipients/", ""]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["/sharings/", "/recipients"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["/sharings/", ""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["/sharings/doctype/", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var SHARING_DOCTYPE = 'io.cozy.sharings';
exports.SHARING_DOCTYPE = SHARING_DOCTYPE;
var BITWARDEN_ORGANIZATIONS_DOCTYPE = 'com.bitwarden.organizations';
exports.BITWARDEN_ORGANIZATIONS_DOCTYPE = BITWARDEN_ORGANIZATIONS_DOCTYPE;
var BITWARDEN_CIPHERS_DOCTYPE = 'com.bitwarden.ciphers';
exports.BITWARDEN_CIPHERS_DOCTYPE = BITWARDEN_CIPHERS_DOCTYPE;
var normalizeSharing = (0, _normalize.normalizeDoctypeJsonApi)(SHARING_DOCTYPE);
/**
 * @typedef {object} Rule A sharing rule
 * @property {string} title
 * @property {string} doctype
 * @property {Array} values
 * @property {string=} add
 * @property {string=} update
 * @property {string=} remove
 */

/**
 * @typedef {object} Recipient An io.cozy.contact
 */

/**
 * @typedef {object} Sharing An io.cozy.sharings document
 */

/**
 * @typedef {object} SharingPolicy Define the add/update/remove policies for a sharing
 * @property {string} add
 * @property {string} update
 * @property {string} remove
 */

/**
 * @typedef {(undefined|'one-way'|'two-way')} SharingType Define how a document is synced between sharing's owner and receivers.
 */

/**
 * @typedef {object} RelationshipItem Define a recipient that can be used as target of a sharing
 * @property {string} id - Recipient's ID
 * @property {string} type - Reciptient's type (should be 'io.cozy.contacts')
 */

/**
 * Implements the `DocumentCollection` API along with specific methods for
 * `io.cozy.sharings`.
 */

var SharingCollection = /*#__PURE__*/function (_DocumentCollection) {
  (0, _inherits2.default)(SharingCollection, _DocumentCollection);

  var _super = _createSuper(SharingCollection);

  function SharingCollection() {
    (0, _classCallCheck2.default)(this, SharingCollection);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(SharingCollection, [{
    key: "findByDoctype",
    value: function () {
      var _findByDoctype = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(doctype) {
        var resp;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.stackClient.fetchJSON('GET', (0, _utils.uri)(_templateObject(), doctype));

              case 2:
                resp = _context.sent;
                return _context.abrupt("return", _objectSpread(_objectSpread({}, resp), {}, {
                  data: resp.data.map(normalizeSharing)
                }));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function findByDoctype(_x) {
        return _findByDoctype.apply(this, arguments);
      }

      return findByDoctype;
    }()
    /**
     * Fetches a sharing by id
     *
     * @param {string} id Sharing's id
     * @returns {Sharing} sharing
     */

  }, {
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(id) {
        var path, resp;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                path = (0, _utils.uri)(_templateObject2(), id);
                _context2.next = 3;
                return this.stackClient.fetchJSON('GET', path);

              case 3:
                resp = _context2.sent;
                return _context2.abrupt("return", {
                  data: normalizeSharing(resp.data)
                });

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function get(_x2) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
    /**
     *
     * Creates a new Sharing. See https://docs.cozy.io/en/cozy-stack/sharing/#post-sharings
     *
     * @param {object} params Sharing  params
     * @param {Sharing} params.document The document to share
     * @param {string} params.description Description of the sharing
     * @param {string=} params.previewPath The preview path
     * @param {Array<Rule>=} params.rules The rules defined to the sharing. See https://docs.cozy.io/en/cozy-stack/sharing-design/#description-of-a-sharing
     * @param {Array<Recipient>=} params.recipients Recipients to add to the sharings (will have the same permissions given by the rules defined by the sharing )
     * @param {Array<Recipient>=} params.readOnlyRecipients Recipients to add to the sharings with only read only access
     * @param {boolean=} params.openSharing If someone else than the owner can add a recipient to the sharing
     * @param {string=} params.appSlug Slug of the targeted app
     */

  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(_ref) {
        var document, description, previewPath, rules, _ref$recipients, recipients, _ref$readOnlyRecipien, readOnlyRecipients, openSharing, appSlug, attributes, optionalAttributes, resp;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                document = _ref.document, description = _ref.description, previewPath = _ref.previewPath, rules = _ref.rules, _ref$recipients = _ref.recipients, recipients = _ref$recipients === void 0 ? [] : _ref$recipients, _ref$readOnlyRecipien = _ref.readOnlyRecipients, readOnlyRecipients = _ref$readOnlyRecipien === void 0 ? [] : _ref$readOnlyRecipien, openSharing = _ref.openSharing, appSlug = _ref.appSlug;
                attributes = {
                  description: description,
                  preview_path: previewPath,
                  open_sharing: openSharing,
                  rules: rules ? rules : getSharingRules(document)
                };
                optionalAttributes = {};

                if (appSlug) {
                  optionalAttributes = {
                    app_slug: appSlug
                  };
                }

                _context3.next = 6;
                return this.stackClient.fetchJSON('POST', '/sharings/', {
                  data: {
                    type: 'io.cozy.sharings',
                    attributes: _objectSpread(_objectSpread({}, attributes), optionalAttributes),
                    relationships: _objectSpread(_objectSpread({}, recipients.length > 0 && {
                      recipients: {
                        data: recipients.map(toRelationshipItem)
                      }
                    }), readOnlyRecipients.length > 0 && {
                      read_only_recipients: {
                        data: readOnlyRecipients.map(toRelationshipItem)
                      }
                    })
                  }
                });

              case 6:
                resp = _context3.sent;
                return _context3.abrupt("return", {
                  data: normalizeSharing(resp.data)
                });

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function create(_x3) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
    /**
     * @deprecated Use create() instead
     * share - Creates a new sharing. See https://docs.cozy.io/en/cozy-stack/sharing/#post-sharings
     *
     * @param  {Sharing} document The document to share. Should have and _id and a name.
     * @param  {Array} recipients A list of io.cozy.contacts
     * @param  {string} sharingType - If "two-way", will set the open_sharing attribute to true
     * @param  {string} description - Describes the sharing
     * @param  {string=} previewPath Relative URL of the sharings preview page
     */

  }, {
    key: "share",
    value: function () {
      var _share = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(document, recipients, sharingType, description) {
        var previewPath,
            recipientsToUse,
            _args4 = arguments;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                previewPath = _args4.length > 4 && _args4[4] !== undefined ? _args4[4] : null;

                _logger.default.warn('SharingCollection.share is deprecated, use SharingCollection.create instead');

                recipientsToUse = sharingType === 'two-way' ? {
                  recipients: recipients
                } : {
                  readOnlyRecipients: recipients
                };
                return _context4.abrupt("return", this.create(_objectSpread(_objectSpread({
                  document: document
                }, recipientsToUse), {}, {
                  description: description,
                  previewPath: previewPath,
                  openSharing: sharingType === 'two-way',
                  rules: getSharingRules(document, sharingType)
                })));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function share(_x4, _x5, _x6, _x7) {
        return _share.apply(this, arguments);
      }

      return share;
    }()
    /**
     * getDiscoveryLink - Returns the URL of the page that can be used to accept a sharing. See https://docs.cozy.io/en/cozy-stack/sharing/#get-sharingssharing-iddiscovery
     *
     * @param  {string} sharingId - Id of the sharing
     * @param  {string} sharecode - Code of the sharing
     * @param  {object} [options] - Options
     * @param  {boolean} [options.shortcut] - If true, add a shortcut to the sharing in the user's cozy and skip the OAuth authorize page.
     * @returns {string}
     */

  }, {
    key: "getDiscoveryLink",
    value: function getDiscoveryLink(sharingId, sharecode, options) {
      var _ref2 = options || {},
          shortcut = _ref2.shortcut;

      var searchParams = new URLSearchParams();
      searchParams.append('sharecode', sharecode);
      if (shortcut) searchParams.append('shortcut', true);
      return this.stackClient.fullpath("/sharings/".concat(sharingId, "/discovery?").concat(searchParams));
    }
    /**
     * Add an array of contacts to the Sharing
     *
     * @param {object} options Object
     * @param {Sharing} options.document Sharing Object
     * @param {Array<Recipient>=} options.recipients Recipients to add to the sharing
     * @param {Array<Recipient>=} options.readOnlyRecipients Recipients to add to the sharings with only read only access
     */

  }, {
    key: "addRecipients",
    value: function () {
      var _addRecipients = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(_ref3) {
        var document, _ref3$recipients, recipients, _ref3$readOnlyRecipie, readOnlyRecipients, resp;

        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                document = _ref3.document, _ref3$recipients = _ref3.recipients, recipients = _ref3$recipients === void 0 ? [] : _ref3$recipients, _ref3$readOnlyRecipie = _ref3.readOnlyRecipients, readOnlyRecipients = _ref3$readOnlyRecipie === void 0 ? [] : _ref3$readOnlyRecipie;
                _context5.next = 3;
                return this.stackClient.fetchJSON('POST', (0, _utils.uri)(_templateObject3(), document._id), {
                  data: {
                    type: 'io.cozy.sharings',
                    id: document._id,
                    relationships: _objectSpread(_objectSpread({}, recipients.length > 0 && {
                      recipients: {
                        data: recipients.map(toRelationshipItem)
                      }
                    }), readOnlyRecipients.length > 0 && {
                      read_only_recipients: {
                        data: readOnlyRecipients.map(toRelationshipItem)
                      }
                    })
                  }
                });

              case 3:
                resp = _context5.sent;
                return _context5.abrupt("return", {
                  data: normalizeSharing(resp.data)
                });

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function addRecipients(_x8) {
        return _addRecipients.apply(this, arguments);
      }

      return addRecipients;
    }()
    /**
     * Revoke only one recipient of the sharing.
     *
     * @param {Sharing} sharing Sharing Object
     * @param {number} recipientIndex Index of this recipient in the members array of the sharing
     */

  }, {
    key: "revokeRecipient",
    value: function revokeRecipient(sharing, recipientIndex) {
      return this.stackClient.fetchJSON('DELETE', (0, _utils.uri)(_templateObject4(), sharing._id, recipientIndex));
    }
    /**
     * Revoke only one group of the sharing.
     *
     * @param {Sharing} sharing Sharing Object
     * @param {number} groupIndex Index of this group in the groups array of the sharing
     */

  }, {
    key: "revokeGroup",
    value: function revokeGroup(sharing, groupIndex) {
      return this.stackClient.fetchJSON('DELETE', (0, _utils.uri)(_templateObject5(), sharing._id, groupIndex));
    }
    /**
     * Remove self from the sharing.
     *
     * @param {Sharing} sharing Sharing Object
     */

  }, {
    key: "revokeSelf",
    value: function revokeSelf(sharing) {
      return this.stackClient.fetchJSON('DELETE', (0, _utils.uri)(_templateObject6(), sharing._id));
    }
    /**
     * Revoke the sharing for all the members. Must be called
     * from the owner's cozy
     *
     * @param {Sharing} sharing Sharing Objects
     */

  }, {
    key: "revokeAllRecipients",
    value: function revokeAllRecipients(sharing) {
      return this.stackClient.fetchJSON('DELETE', (0, _utils.uri)(_templateObject7(), sharing._id));
    }
  }]);
  return SharingCollection;
}(_DocumentCollection2.default);

SharingCollection.normalizeDoctype = _normalize.normalizeDoctypeJsonApi;

var getSharingRulesWithoutWarning = function getSharingRulesWithoutWarning(document, sharingType) {
  if ((0, _FileCollection.isFile)(document)) {
    return getSharingRulesForFile(document, sharingType);
  }

  if (document._type === BITWARDEN_ORGANIZATIONS_DOCTYPE) {
    return getSharingRulesForOrganizations(document);
  }

  return getSharingRulesForPhotosAlbum(document, sharingType);
};
/**
 * Rules determine the behavior of the sharing when changes are made to the shared document
 * See https://docs.cozy.io/en/cozy-stack/sharing-design/#description-of-a-sharing
 *
 * @param {Sharing} document - The document to share. Should have and _id and a name
 * @param  {SharingType} sharingType - The type of the sharing
 *
 * @returns {Array<Rule>=} The rules that define how to share the document
 */


var getSharingRules = function getSharingRules(document, sharingType) {
  if (sharingType) {
    _logger.default.warn("sharingType is deprecated and will be removed. We now set this default rules: ".concat(getSharingRulesWithoutWarning(document), "} \n\n      If this default rules do not fill your need, please set custom rules\n      by using the 'rules' object of the SharingCollection.create() method"));
  }

  return getSharingRulesWithoutWarning(document, sharingType);
};
/**
 * Compute the rules that define how to share a Photo Album. See https://docs.cozy.io/en/cozy-stack/sharing-design/#description-of-a-sharing
 *
 * @param {Sharing} document - The document to share. Should have and _id and a name
 * @param  {SharingType} sharingType - The type of the sharing
 *
 * @returns {Array<Rule>=} The rules that define how to share a Photo Album
 */


exports.getSharingRules = getSharingRules;

var getSharingRulesForPhotosAlbum = function getSharingRulesForPhotosAlbum(document, sharingType) {
  var _id = document._id,
      _type = document._type;
  return [_objectSpread({
    title: 'collection',
    doctype: _type,
    values: [_id]
  }, getSharingPolicyForAlbum(sharingType)), _objectSpread({
    title: 'items',
    doctype: 'io.cozy.files',
    values: ["".concat(_type, "/").concat(_id)],
    selector: 'referenced_by'
  }, getSharingPolicyForReferencedFiles(sharingType))];
};
/**
 * Compute the sharing policy for a ReferencedFile based on its sharing type
 *
 * @param  {SharingType} sharingType - The type of the sharing
 *
 * @returns {SharingPolicy} The sharing policy for the ReferencedFile
 */


var getSharingPolicyForReferencedFiles = function getSharingPolicyForReferencedFiles(sharingType) {
  return sharingType === 'two-way' ? {
    add: 'sync',
    update: 'sync',
    remove: 'sync'
  } : {
    add: 'push',
    update: 'none',
    remove: 'push'
  };
};
/**
 * Compute the sharing policy for an Album based on its sharing type
 *
 * @param  {SharingType} sharingType - The type of the sharing
 *
 * @returns {Array<Rule>=} The sharing policy for the Album
 */


var getSharingPolicyForAlbum = function getSharingPolicyForAlbum(sharingType) {
  if (!sharingType) return {
    update: 'sync',
    remove: 'revoke'
  };
  return sharingType === 'two-way' ? {
    update: 'sync',
    remove: 'revoke'
  } : {
    update: 'push',
    remove: 'revoke'
  };
};
/**
 * Compute the rules that define how to share a File. See https://docs.cozy.io/en/cozy-stack/sharing-design/#description-of-a-sharing
 *
 * @param {Sharing} document - The document to share. Should have and _id and a name
 * @param  {SharingType} sharingType - The type of the sharing
 *
 * @returns {Array<Rule>=} The rules that define how to share a File
 */


var getSharingRulesForFile = function getSharingRulesForFile(document, sharingType) {
  var _id = document._id,
      name = document.name;
  return [_objectSpread({
    title: name,
    doctype: 'io.cozy.files',
    values: [_id]
  }, getSharingPolicyForFile(document, sharingType))];
};
/**
 * Compute the sharing policy for a File based on its sharing type
 *
 * @param {Sharing} document - The document to share. Should have and _id and a name
 * @param {SharingType} sharingType - The type of the sharing
 *
 * @returns {SharingPolicy} The sharing policy for the File
 */


var getSharingPolicyForFile = function getSharingPolicyForFile(document, sharingType) {
  if ((0, _FileCollection.isDirectory)(document)) {
    if (!sharingType) return {
      add: 'sync',
      update: 'sync',
      remove: 'sync'
    };
    return sharingType === 'two-way' ? {
      add: 'sync',
      update: 'sync',
      remove: 'sync'
    } : {
      add: 'push',
      update: 'push',
      remove: 'push'
    };
  }

  if (!sharingType) return {
    update: 'sync',
    remove: 'revoke'
  };
  return sharingType === 'two-way' ? {
    update: 'sync',
    remove: 'revoke'
  } : {
    update: 'push',
    remove: 'revoke'
  };
};
/**
 * Compute the rules that define how to share an Organization. See https://docs.cozy.io/en/cozy-stack/sharing-design/#description-of-a-sharing
 *
 * @param {Sharing} document The document to share. Should have and _id and a name
 *
 * @returns {Array<Rule>=} The rules that define how to share an Organization
 */


var getSharingRulesForOrganizations = function getSharingRulesForOrganizations(document) {
  var _id = document._id,
      name = document.name;
  var sharingRules = [{
    title: name,
    doctype: BITWARDEN_ORGANIZATIONS_DOCTYPE,
    values: [_id],
    add: 'sync',
    update: 'sync',
    remove: 'revoke'
  }, {
    title: 'Ciphers',
    doctype: BITWARDEN_CIPHERS_DOCTYPE,
    values: [_id],
    add: 'sync',
    update: 'sync',
    remove: 'sync',
    selector: 'organization_id'
  }];
  return sharingRules;
};
/**
 * Compute the RelationshipItem that can be referenced as a sharing recipient
 *
 * @param {Recipient} item The recipient of a sharing
 *
 * @returns {RelationshipItem} The RelationshipItem that can be referenced as a sharing recipient
 */


var toRelationshipItem = function toRelationshipItem(item) {
  return {
    id: item._id,
    type: item._type
  };
};

var _default = SharingCollection;
exports.default = _default;