import { QueryDefinition } from './queries/dsl'

/**
 * @typedef {"io.cozy.accounts"} AccountsDoctype
 * @typedef {"io.cozy.triggers"} TriggersDoctype
 * @typedef {"io.cozy.konnectors"} KonnectorsDoctype
 * @typedef {"io.cozy.notes"} NotesDoctype
 * @typedef {"io.cozy.apps"} AppsDoctype
 * @typedef {"io.cozy.settings"} SettingsDoctype
 * @typedef {"io.cozy-oauth.clients"} OAuthClientsDoctype
 * @typedef {"io.cozy.files"} FilesDoctype
 * @typedef {AccountsDoctype|TriggersDoctype|KonnectorsDoctype|NotesDoctype|AppsDoctype|SettingsDoctype|OAuthClientsDoctype|FilesDoctype} KnownDoctype
 * @typedef {KnownDoctype|string} Doctype
 */

/**
 * @typedef {object} Link
 * @typedef {object} Mutation
 * @typedef {object} DocumentCollection
 * @typedef {object} QueryResult
 * @typedef {object} HydratedDocument
 * @typedef {object} ReduxStore
 * @typedef {object} Token
 * @typedef {object} ClientResponse
 * @typedef {object} Manifest
 */

/**
 * @typedef {object} OldCozyClient
 */

/**
 * @typedef {object} NodeEnvironment
 */

/**
 * @typedef {"loading"|"loaded"|"pending"|"failed"} QueryFetchStatus
 */

/**
 * @typedef {Record<Doctype, QueryState>} QueriesStateSlice
 */

/**
 * @typedef {Record<string, CozyClientDocument>} IndexedDocuments
 */

/**
 * @typedef {Record<Doctype, IndexedDocuments>} DocumentsStateSlice
 */

/**
 * @typedef {object} QueryState
 * @property {string} id
 * @property {QueryDefinition} definition
 * @property {QueryFetchStatus} fetchStatus
 * @property {number} lastFetch
 * @property {number} lastUpdate
 * @property {number} lastErrorUpdate
 * @property {Error} lastError
 * @property {boolean} hasMore
 * @property {number} count
 * @property {object|Array} data
 * @property {string} bookmark
 * @property {object} [execution_stats]
 * @property {QueryOptions} [options]
 */

/**
 * @typedef {object} AutoUpdateOptions
 * @param {boolean} update - Should documents be updated in the query (default: true)
 * @param {boolean} add - Should documents be added to the query (default: true)
 * @param {boolean} remove - Should documents be removed from the query (default: true)
 */

/**
 * @typedef {object} QueryOptions
 * @property {string} [as] - Name of the query
 * @property {Function} [fetchPolicy] - Fetch policy to bypass fetching based on what's already inside the state. See "Fetch policies"
 * @property {AutoUpdateOptions} [autoUpdate] - Options for the query auto update
 * @property {string} [update] - Does not seem to be used
 * @property {Function} [onError] - Callback when the query is errored
 */

/**
 * @typedef {object} FetchMoreAble
 * @property {Function} fetchMore
 */

/**
 * @typedef {QueryState & FetchMoreAble} UseQueryReturnValue
 */

/**
 * A reference to a document
 *
 * @typedef {object} ReferencedByRelationship
 * @property {RelationshipParent} [parent]
 * @property {ReferencedBy} [referenced_by]
 */

/**
 * @typedef {object} RelationshipParent
 * @property {{related: string}} links
 * @property {Reference} [data]
 */

/**
 * @typedef {object} ReferencedBy
 * @property {{self: string}} links
 * @property {Reference[]|null} data
 */

/**
 * A reference to a document
 * https://docs.cozy.io/en/cozy-doctypes/docs/io.cozy.files/#references
 *
 * @typedef {object} Reference
 * @property {string} id - id of the document
 * @property {string} type - doctype of the document
 */

/**
 * @typedef {Object.<string, Array<Reference>>} ReferenceMap
 */

/**
 * @typedef {object} MutationOptions
 * @property {string} [as]
 * @property {Function} [update]
 * @property {Function} [updateQueries]
 */

/**
 * @typedef {object} CozyClientDocument - A document
 * @property {string} [_id] - Id of the document
 * @property {string} [id] - Id of the document
 * @property {string} [_type] - Type of the document
 * @property {string} [_rev] - Current revision of the document
 * @property {boolean} [_deleted] - When the document has been deleted
 * @property {ReferencedByRelationship} [relationships] - Relationships of the document
 * @property {Reference[]} [referenced_by] - referenced by of another document
 */

/**
 * @typedef {object} FileDocument - An io.cozy.files document
 * @property {string} _id - Id of the file
 * @property {FilesDoctype} _type - Doctype of the file
 * @property {string} name - Name of the file
 * @property {object} metadata - Metadata of the file
 * @property {object} type - Type of the file
 * @property {object} class - Class of the file
 * @typedef {CozyClientDocument & FileDocument} IOCozyFile - An io.cozy.files document
 */

/**
 * @typedef {object} FolderDocument - An io.cozy.files document
 * @property {string} _id - Id of the folder
 * @property {FilesDoctype} _type - Doctype of the folder
 * @property {string} name - Name of the folder
 * @property {object} metadata - Metadata of the folder
 * @property {object} type - Type of the folder
 * @typedef {CozyClientDocument & FileDocument} IOCozyFolder - An io.cozy.files document
 */

/**
 * @typedef {object} OAuthClientDocument - An io.cozy.oauth.clients document
 * @property {string} _id - Id of the client
 * @property {OAuthClientsDoctype} _type - Doctype of the client
 * @property {string} software_id
 * @property {string} software_version
 * @property {string} client_id
 * @property {string} client_name
 * @property {string} client_kind
 * @property {string} client_uri
 * @property {string} logo_uri
 * @property {string} policy_uri
 * @property {string} notification_platform
 * @property {string} notification_device_token
 * @property {Array<String>} redirect_uris
 * @typedef {CozyClientDocument & OAuthClientDocument} IOCozyOAuthClient - An io.cozy.oauth.clients document
 */

/**
 * @typedef {object} ClientError
 * @property {string} [status]
 */

/**
 * @typedef FilePlugin
 * @property {object} [externalDataDirectory]
 * @property {object} [cacheDirectory]
 * @property {object} [externalCacheDirectory]
 * @property {object} [dataDirectory]
 */

/**
 * @typedef InAppBrowser
 * @property {Function} open
 */

/**
 * @typedef {object} AppMetadata
 */

/**
 * @typedef {object} ClientCapabilities
 *
 * @description Read more about client capabilities here https://docs.cozy.io/en/cozy-stack/settings/#get-settingscapabilities.
 *
 * @property {boolean} can_auth_with_oidc - Whether OIDC login is possible with this Cozy
 * @property {boolean} can_auth_with_password - Whether  password login is possible with this Cozy
 * @property {boolean} file_versioning - Whether file versioning is active on this Cozy
 * @property {boolean} flat_subdomains - Whether the stack has been configured to use flat subdomains
 */

/**
 * @typedef Cordova
 * @property {FilePlugin} file
 * @property {InAppBrowser} InAppBrowser
 * @property {object} plugins
 */

/**
 * @typedef  CordovaWindow
 * @property {Cordova} cordova
 * @property {object} SafariViewController
 * @property {Function} resolveLocalFileSystemURL
 * @property {Function} handleOpenURL
 */

/**
 * @typedef {object} CouchDBDocument - A document
 * @property {string} _id - Id of the document
 * @property {string} _rev - Current revision of the document
 * @property {boolean} [_deleted] - When the document has been deleted
 * @property {object} [relationships] - Relationships of the document
 */

/**
 * @typedef {object} CouchDBBulkResult - An item of the CouchDB bulk docs response
 * @property {boolean} ok
 * @property {string} id
 * @property {string} rev
 * @property {string?} error?
 * @property {string?} reason?
 */

/**
 * @typedef {object} Theme
 * @property {string} id
 * @property {string} label
 * @property {string} icon
 * @property {Array<QualificationAttributes>} items
 * @property {Array<string>} [defaultItems]
 *
 * @typedef {Array<Theme>} ThemesList
 *
 * @typedef {'identity'|'family'|'work_study'|'health'|'home'|'transport'|'finance'|'invoice'} ThemesLabels
 */

/**
 * @typedef {object} QualificationAttributes
 * @property {string} label
 * @property {string} [purpose]
 * @property {string} [sourceCategory]
 * @property {string} [sourceSubCategory]
 * @property {Array<string>} [subjects]
 */

/**
 * @typedef {'identity_photo'|'national_id_card'|'passport'|'residence_permit'|'family_record_book'|'birth_certificate'|'driver_license'|'other_identity_document'|'citizen_registration_certificate'|'personal_sporting_licence'} IdentityLabel
 *
 * @typedef {'family_record_book'|'birth_certificate'|'wedding'|'pacs'|'divorce'|'large_family_card'|'caf'|'other_family_document'|'payment_proof_family_allowance'} FamilyLabel
 *
 * @typedef {'diploma'|'work_contract'|'pay_sheet'|'unemployment_benefit'|'pension'|'gradebook'|'student_card'|'resume'|'motivation_letter'|'other_work_document'|'work_disability_recognition'|'school_attendance_certificate'} WorkStudyLabels
 *
 * @typedef {'health_certificate'|'health_book'|'national_health_insurance_card'|'health_insurance_card'|'prescription'|'health_invoice'|'national_health_insurance_right_certificate'|'work_disability_recognition'|'pregnancy_medical_certificate'|'other_health_document'} HealthLabels
 *
 * @typedef {'phone_invoice'|'isp_invoice'|'telecom_invoice'|'energy_invoice'|'water_invoice'|'house_sale_agreeement'|'building_permit'|'technical_diagnostic_record'|'lease'|'rent_receipt'|'house_insurance'|'work_quote'|'work_invoice'|'other_house_document'|'unfit_for_habitation_declaration'|'accommodation_proof'|'house_insurance'} HomeLabels
 *
 * @typedef {'driver_license'|'vehicle_registration'|'car_insurance'|'mechanic_invoice'|'transport_invoice'|'other_transport_document'} TransportLabels
 *
 * @typedef {'tax_return'|'tax_notice'|'tax_timetable'|'receipt'|'other_tax_document'|'bank_details'|'bank_statement'|'loan_agreement'|'other_bank_document'|'payment_proof_family_allowance'|'other_revenue'} FinanceLabels
 *
 * @typedef {'phone_invoice'|'isp_invoice'|'telecom_invoice'|'energy_invoice'|'water_invoice'|'appliance_invoice'|'web_service_invoice'|'restaurant_invoice'|'work_invoice'|'transport_invoice'|'health_invoice'|'other_invoice'} InvoiceLabels
 *
 * @typedef {'personal_sporting_licence'|'other_activity_document'} ActivityLabels
 *
 * @typedef {IdentityLabel|FamilyLabel|WorkStudyLabels|HealthLabels|HomeLabels|TransportLabels|FinanceLabels|InvoiceLabels|ActivityLabels} ItemsLabels
 */

export default {}
