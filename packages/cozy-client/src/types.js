import { QueryDefinition } from './queries/dsl'

/**
 * @typedef {import("./models/document/qualification").Qualification} Qualification
 */

/**
 * @typedef {"io.cozy.notes"} NotesDoctype
 * @typedef {"io.cozy.apps"} AppsDoctype
 * @typedef {"io.cozy.settings"} SettingsDoctype
 * @typedef {"io.cozy-oauth.clients"} OAuthClientsDoctype
 * @typedef {"io.cozy.files"} FilesDoctype
 * @typedef {"io.cozy.account"} AccountsDoctype
 * @typedef {"io.cozy.konnectors"} KonnectorsDoctype
 * @typedef {"io.cozy.triggers"} TriggersDoctype
 * @typedef {AccountsDoctype|TriggersDoctype|KonnectorsDoctype|NotesDoctype|AppsDoctype|SettingsDoctype|OAuthClientsDoctype|FilesDoctype} KnownDoctype
 * @typedef {KnownDoctype|string} Doctype
 */

/**
 * @typedef {object} AccountsDocument
 * @property {String} [_id] - document identifier
 * @property {String} account_type - slug of the associated konnector
 * @property {object} auth - user credentials
 * @property {String} [identifier] - Name of the attribute in the auth object that can be used to name the account.
 * @property {Array} [mutedErrors] - list of ignored errors
 * @property {String} [state] - used by harvest and the konnectors to communicate
 * @typedef {CozyClientDocument & AccountsDocument} IOCozyAccount - An io.cozy.accounts document
 */

/**
 * @typedef {object} KonnectorsDocument
 * @property {String} slug - slug of konnector
 * @property {ManifestFields} fields - konnector fields
 * @property {Boolean} clientSide - whether the konnector runs on client or not
 * @typedef {CozyClientDocument & KonnectorsDocument} IOCozyKonnector - An io.cozy.konnectors document
 */

/**
 * @typedef {object} TriggersDocument
 * @property {String} [_id] - document identifier
 * @property {String} type - type of the trigger. Can be "at", "cron", "event", "every", "in", "webhook", "client"
 * @property {String} worker - type of worker. Can be "konnector" or "sendmail"
 * @property {object} message - Parameters to pass to the the worker. For example, when the worker is set to konnector, message contains the related konnector and the related account.
 * @property {TriggerState} [current_state] - state of the last executed jobs related to this trigger
 * @property {String} [arguments] - Arguments related to the type attribute. For example it's a cron configuration when the type is set to @cron.
 * @typedef {CozyClientDocument & TriggersDocument} IOCozyTrigger - An io.cozy.konnectors document
 */

/**
 * @typedef {object} TriggerState
 * @property {'queued'|'running'|'done'|'errored'} status - Global status of the trigger
 * @property {String} last_success - Date  of the last job in success
 * @property {String} last_successful_job_id - ID of the last job in success
 * @property {String} last_execution - Date of the last executed job
 * @property {String} last_executed_job_id - ID of the last executed job
 * @property {String} last_failure - Date of the last job in failure
 * @property {String} last_failed_job_id - ID of the last job in failure
 * @property {String} last_manual_execution - Date of the last job manually executed
 * @property {String} last_manual_job_id - ID of the last job manually executed
 * @property {String} last_error - Content of the last error
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
 * @typedef {object} SanitizedManifest
 */

/**
 * @typedef {Object} ManifestField
 * @property {String} [type] - field type : can be "text" or "hidden" or "date" or "dropdown" or "password"
 * @property {String} [role] - field role : with "identifier" value
 * @property {Boolean} [required] - is the field required or not
 * @property {Boolean} [isRequired] - is the field required or not (legacy)
 * @property {Boolean} [encrypted] - encrypted value of the field (legacy)
 */

/**
 * @typedef {{
 *   [key: string]: ManifestField;
 * }} ManifestFields
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
 * @property {boolean} isFetching
 * @property {number} lastFetch
 * @property {number} lastUpdate
 * @property {number} lastErrorUpdate
 * @property {Error} lastError
 * @property {boolean} hasMore
 * @property {number} count
 * @property {number} fetchedPagesCount
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
 * @property {boolean} [enabled=true] - If set to false, the query won't be executed
 * @property {boolean} [backgroundFetching] - If set to true, when the fetchStatus has already been loaded, it won't be updated during future fetches. Instead, a `isFetching` attribute will be used to indicate when background fetching is started.
 * @property {boolean} [hydrated=true] - Whether documents should be returned already hydrated
 * @property {boolean} [singleDocData] - If true, the "data" returned will be
 * a single doc instead of an array for single doc queries. Defaults to false for backward
 * compatibility but will be set to true in the future.
 */

/**
 * @typedef {object} FetchMoreAble
 * @property {Function} fetchMore
 */

/**
 * @typedef {object} FetchAble
 * @property {Function} fetch
 */

/**
 * @typedef {QueryState & FetchMoreAble & FetchAble} UseQueryReturnValue
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
 * @property {object} [cozyMetadata] - Cozy Metadata
 */

/**
 * Metadata on io.cozy.files documents
 *
 * This is a first step, to continue
 *
 * Filled according to:
 * https://docs.cozy.io/en/cozy-doctypes/docs/io.cozy.files_metadata/
 * https://docs.cozy.io/en/cozy-doctypes/docs/io.cozy.notes/
 *
 * @typedef {object} FileMetadata - A io.cozy.files document's metadata
 * @property {object} [content] - The Note's content. See https://prosemirror.net/docs/ref/#model for more informations
 * @property {object} [schema] - the schema used by prosemirror (with notes and marks serialized as arrays to preserve the order).
 * @property {string} [title] - the initial title of the note (that will also be used for the file name)
 * @property {number} [version] - Number of a note
 * @property {Qualification} [qualification] - Qualification of the file
 * @property {string} [country] - Country of the paper
 * @property {string} [expirationDate] - Expiration date of the paper
 * @property {string} [referencedDate] - Reference date of the paper
 * @property {string} [noticePeriod] - Notice period of the paper, in days
 * @property {string} [datetime] - Image EXIF date, if relevant
 */

/**
 * @typedef {object} FileDocument - An io.cozy.files document
 * @property {string} _id - Id of the file
 * @property {FilesDoctype} _type - Doctype of the file
 * @property {string} name - Name of the file
 * @property {FileMetadata} metadata - Metadata of the file
 * @property {string} type - Type of the file
 * @property {string} class - Class of the file
 * @property {string} mime - Mime of the file
 * @property {boolean} executable - Whether or not the file is executable
 * @property {boolean} encrypted - Whether or not the file is client-side encrypted
 * @property {string} created_at - Creation date of the file
 * @typedef {CozyClientDocument & FileDocument} IOCozyFile - An io.cozy.files document
 */

/**
 * @typedef {object} FolderDocument - An io.cozy.files document
 * @property {string} _id - Id of the folder
 * @property {FilesDoctype} _type - Doctype of the folder
 * @property {string} name - Name of the folder
 * @property {object} metadata - Metadata of the folder
 * @property {object} type - Type of the folder
 * @typedef {CozyClientDocument & FolderDocument} IOCozyFolder - An io.cozy.files document
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
 * @property {boolean} [can_auth_with_oidc] - Whether OIDC login is possible with this Cozy
 * @property {boolean} [can_auth_with_password] - Whether  password login is possible with this Cozy
 * @property {boolean} [file_versioning] - Whether file versioning is active on this Cozy
 * @property {boolean} [flat_subdomains] - Whether the stack has been configured to use flat subdomains
 * @description Read more about client capabilities here https://docs.cozy.io/en/cozy-stack/settings/#get-settingscapabilities.
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
 * @typedef {Array<string>|string} ViewKey
 * @typedef {string} DocId
 * @typedef {[ViewKey, DocId]} CouchDBViewCursor
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
 * @typedef {'identity_photo'|'national_id_card'|'passport'|'residence_permit'|'family_record_book'|'birth_certificate'|'driver_license'|'other_identity_document'|'citizen_registration_certificate'|'personal_sporting_licence'|'electoral_card'} IdentityLabel
 *
 * @typedef {'family_record_book'|'birth_certificate'|'wedding'|'pacs'|'divorce'|'large_family_card'|'caf'|'other_family_document'|'payment_proof_family_allowance'|'single_parent_benefit'} FamilyLabel
 *
 * @typedef {'diploma'|'work_contract'|'pay_sheet'|'unemployment_benefit'|'pension'|'gradebook'|'student_card'|'resume'|'motivation_letter'|'other_work_document'|'work_disability_recognition'|'school_attendance_certificate'|'employment_center_certificate'|'school_insurance_certificate'} WorkStudyLabels
 *
 * @typedef {'health_certificate'|'health_book'|'national_health_insurance_card'|'health_insurance_card'|'prescription'|'health_invoice'|'national_health_insurance_right_certificate'|'work_disability_recognition'|'pregnancy_medical_certificate'|'other_health_document'} HealthLabels
 *
 * @typedef {'phone_invoice'|'isp_invoice'|'telecom_invoice'|'energy_invoice'|'water_invoice'|'other_invoice'|'house_sale_agreeement'|'building_permit'|'technical_diagnostic_record'|'lease'|'rent_receipt'|'house_insurance'|'work_quote'|'work_invoice'|'other_house_document'|'unfit_for_habitation_declaration'|'accommodation_proof'} HomeLabels
 *
 * @typedef {'driver_license'|'vehicle_registration'|'car_insurance'|'mechanic_invoice'|'transport_invoice'|'other_transport_document'|'transport_card'} TransportLabels
 *
 * @typedef {'tax_return'|'tax_notice'|'tax_timetable'|'pay_sheet'|'receipt'|'other_tax_document'|'bank_details'|'bank_statement'|'loan_agreement'|'other_bank_document'|'payment_proof_family_allowance'|'other_revenue'|'single_parent_benefit'|'real_estate_tax'} FinanceLabels
 *
 * @typedef {'phone_invoice'|'isp_invoice'|'telecom_invoice'|'energy_invoice'|'water_invoice'|'appliance_invoice'|'web_service_invoice'|'restaurant_invoice'|'work_invoice'|'transport_invoice'|'health_invoice'|'other_invoice'} InvoiceLabels
 *
 * @typedef {'personal_sporting_licence'|'other_activity_document'|'fidelity_card'|'library_card'} ActivityLabels
 *
 * @typedef {IdentityLabel|FamilyLabel|WorkStudyLabels|HealthLabels|HomeLabels|TransportLabels|FinanceLabels|InvoiceLabels|ActivityLabels} ItemsLabels
 */

/**
 * @typedef {object} DACCMeasure
 * See https://github.com/cozy/DACC
 *
 * @property {string} measureName - It must match an existing measure name on the DACC server
 * @property {string} startDate - Start of the aggregation period. Should be in YYYY-MM-DD format
 * @property {number} value - The measured value on the aggregation period
 * @property {string} createdBy - The slug of the app creating the measure
 * @property {object} group1 - Should be a {key: value} where the key is set in the measure definition.
 * @property {object} group2 - Should be a {key: value} where the key is set in the measure definition.
 * @property {object} group3 - Should be a {key: value} where the key is set in the measure definition.
 */

/**
 * @typedef {object} DACCAggregatesParams
 * See https://github.com/cozy/DACC
 *
 * @property {string} measureName - It must match an existing measure name on the DACC server
 * @property {string} startDate - Start of the aggregation period. Should be in YYYY-MM-DD format
 * @property {string} endDate - End of the aggregation period. Should be in YYYY-MM-DD format
 */

/**
 * @typedef {Array<DACCAggregate>} DACCAggregatesResponse
 * See https://github.com/cozy/DACC
 */

/**
 * @typedef {object} DACCAggregate
 * See https://github.com/cozy/DACC
 *
 * @property {string} measureName - The name of the measures aggregate
 * @property {string} startDate - The aggregation start date
 * @property {number} sum - The aggregate sum
 * @property {number} count - The aggregate count
 * @property {number} countNotZero - The aggregate count of values different from zero
 * @property {number} avg - The aggregate average
 * @property {number} min - The aggregate min
 * @property {number} max - The aggregate max
 * @property {number} std - The aggregate standard deviation
 *
 */

/**
 * Receives the URL to present to the user as a parameter, and should return a promise that resolves with the URL the user was redirected to after accepting the permissions.
 *
 * @callback OpenURLCallback
 * @param {string} url - URL to present to the user
 */

/**
 * A session code generated by the cozy-stack that can be used to create a session
 *
 * More information: https://docs.cozy.io/en/cozy-stack/auth/#post-authsession_code
 *
 * @typedef {string} SessionCode
 */

/**
 * An object containing a code verifier and a code challenge that can be used in a
 * PKCE verification process
 *
 * More information: https://docs.cozy.io/en/cozy-stack/auth/#pkce-extension
 *
 * @typedef {object} PKCECodes
 * @property {string} [codeVerifier]
 * @property {string} [codeChallenge]
 */

/**
 * Subdomain type for a Cozy. Can be flat or nested subdomains
 *
 * Example of 'flat' domain: https://claude-notes.somedomain.fr
 * Example of 'nested' domain: https://notes.claude.somedomain.fr
 *
 * @typedef {'flat'|'nested'} SubdomainType
 */

/**
 * Represents the different parts of a deconstructed Cozy link
 *
 * @typedef {object} CozyLinkData
 * @property {string} cozyBaseDomain - The Cozy's domain (i.e. 'mycozy.cloud')
 * @property {string} cozyName - The Cozy's name (i.e. 'claude')
 * @property {string} [hash] - The link's path (i.e. '#/folder/SOME_FOLDER_ID')
 * @property {string} [pathname] - The link's path (i.e. '/public/')
 * @property {string} protocol - The link's protocol (i.e. 'https')
 * @property {string} [searchParams] - The link's searchParams (i.e. 'id=SOME_FOLDER_ID&sharecode=SOME_SHARECODE')
 * @property {string} slug - The link's slug (i.e. 'drive' or 'notes)
 */

/**
 * Represents the different parts of a deconstructed redirect link
 *
 * @typedef {object} RedirectLinkData
 * @property {string} slug - The redirect link's slug (i.e. 'drive')
 * @property {string} pathname - The redirect link's path (i.e. 'public')
 * @property {string} hash - The redirect link's path (i.e. '/folder/SOME_FOLDER_ID')
 */

export default {}
