declare var _default: {};
export default _default;
export type Qualification = import("./models/document/qualification").Qualification;
export type NotesDoctype = "io.cozy.notes";
export type AppsDoctype = "io.cozy.apps";
export type SettingsDoctype = "io.cozy.settings";
export type OAuthClientsDoctype = "io.cozy-oauth.clients";
export type FilesDoctype = "io.cozy.files";
export type AccountsDoctype = "io.cozy.account";
export type KonnectorsDoctype = "io.cozy.konnectors";
export type TriggersDoctype = "io.cozy.triggers";
export type KnownDoctype = "io.cozy.files" | "io.cozy.account" | "io.cozy.triggers" | "io.cozy.konnectors" | "io.cozy.notes" | "io.cozy.apps" | "io.cozy.settings" | "io.cozy-oauth.clients";
export type Doctype = string;
export type AccountsDocument = {
    /**
     * - document identifier
     */
    _id?: string;
    /**
     * - slug of the associated konnector
     */
    account_type: string;
    /**
     * - user credentials
     */
    auth: object;
    /**
     * - Name of the attribute in the auth object that can be used to name the account.
     */
    identifier?: string;
    /**
     * - list of ignored errors
     */
    mutedErrors?: any[];
    /**
     * - used by harvest and the konnectors to communicate
     */
    state?: string;
};
/**
 * - An io.cozy.accounts document
 */
export type IOCozyAccount = CozyClientDocument & AccountsDocument;
export type KonnectorsDocument = {
    /**
     * - slug of konnector
     */
    slug: string;
    /**
     * - konnector fields
     */
    fields: ManifestFields;
    /**
     * - whether the konnector runs on client or not
     */
    clientSide: boolean;
};
/**
 * - An io.cozy.konnectors document
 */
export type IOCozyKonnector = CozyClientDocument & KonnectorsDocument;
export type TriggersDocument = {
    /**
     * - document identifier
     */
    _id?: string;
    /**
     * - type of the trigger. Can be "at", "cron", "event", "every", "in", "webhook", "client"
     */
    type: string;
    /**
     * - type of worker. Can be "konnector" or "sendmail"
     */
    worker: string;
    /**
     * - Parameters to pass to the the worker. For example, when the worker is set to konnector, message contains the related konnector and the related account.
     */
    message: object;
    /**
     * - state of the last executed jobs related to this trigger
     */
    current_state?: TriggerState;
    /**
     * - Arguments related to the type attribute. For example it's a cron configuration when the type is set to
     */
    arguments?: string;
};
/**
 * - An io.cozy.konnectors document
 */
export type IOCozyTrigger = CozyClientDocument & TriggersDocument;
export type TriggerState = {
    /**
     * - Global status of the trigger
     */
    status: 'queued' | 'running' | 'done' | 'errored';
    /**
     * - Date  of the last job in success
     */
    last_success: string;
    /**
     * - ID of the last job in success
     */
    last_successful_job_id: string;
    /**
     * - Date of the last executed job
     */
    last_execution: string;
    /**
     * - ID of the last executed job
     */
    last_executed_job_id: string;
    /**
     * - Date of the last job in failure
     */
    last_failure: string;
    /**
     * - ID of the last job in failure
     */
    last_failed_job_id: string;
    /**
     * - Date of the last job manually executed
     */
    last_manual_execution: string;
    /**
     * - ID of the last job manually executed
     */
    last_manual_job_id: string;
    /**
     * - Content of the last error
     */
    last_error: string;
};
export type Link = any;
export type Mutation = any;
export type DocumentCollection = any;
export type QueryResult = any;
export type HydratedDocument = any;
export type ReduxStore = any;
export type Token = any;
export type ClientResponse = any;
export type Manifest = any;
export type SanitizedManifest = any;
export type ManifestField = {
    /**
     * - field type : can be "text" or "hidden" or "date" or "dropdown" or "password"
     */
    type?: string;
    /**
     * - field role : with "identifier" value
     */
    role?: string;
    /**
     * - is the field required or not
     */
    required?: boolean;
    /**
     * - is the field required or not (legacy)
     */
    isRequired?: boolean;
    /**
     * - encrypted value of the field (legacy)
     */
    encrypted?: boolean;
};
export type ManifestFields = {
    [key: string]: ManifestField;
};
export type OldCozyClient = any;
export type NodeEnvironment = any;
export type QueryFetchStatus = "failed" | "loading" | "pending" | "loaded";
export type QueriesStateSlice = {
    [x: string]: QueryState;
};
export type IndexedDocuments = {
    [x: string]: CozyClientDocument;
};
export type DocumentsStateSlice = {
    [x: string]: Record<string, CozyClientDocument>;
};
export type QueryState = {
    id: string;
    definition: QueryDefinition;
    fetchStatus: QueryFetchStatus;
    isFetching: boolean;
    lastFetch: number;
    lastUpdate: number;
    lastErrorUpdate: number;
    lastError: Error;
    hasMore: boolean;
    count: number;
    fetchedPagesCount: number;
    data: object | any[];
    bookmark: string;
    execution_stats?: object;
    options?: QueryOptions;
};
export type AutoUpdateOptions = any;
export type QueryOptions = {
    /**
     * - Name of the query
     */
    as?: string;
    /**
     * - Fetch policy to bypass fetching based on what's already inside the state. See "Fetch policies"
     */
    fetchPolicy?: Function;
    /**
     * - Options for the query auto update
     */
    autoUpdate?: AutoUpdateOptions;
    /**
     * - Does not seem to be used
     */
    update?: string;
    /**
     * - Callback when the query is errored
     */
    onError?: Function;
    /**
     * - If set to false, the query won't be executed
     */
    enabled?: boolean;
    /**
     * - If set to true, when the fetchStatus has already been loaded, it won't be updated during future fetches. Instead, a `isFetching` attribute will be used to indicate when background fetching is started.
     */
    backgroundFetching?: boolean;
    /**
     * - Whether documents should be returned already hydrated
     */
    hydrated?: boolean;
    /**
     * - If true, the "data" returned will be
     * a single doc instead of an array for single doc queries. Defaults to false for backward
     * compatibility but will be set to true in the future.
     */
    singleDocData?: boolean;
};
export type FetchMoreAble = {
    fetchMore: Function;
};
export type FetchAble = {
    fetch: Function;
};
export type UseQueryReturnValue = QueryState & FetchMoreAble & FetchAble;
/**
 * A reference to a document
 */
export type ReferencedByRelationship = {
    parent?: RelationshipParent;
    referenced_by?: ReferencedBy;
};
export type RelationshipParent = {
    links: {
        related: string;
    };
    data?: Reference;
};
export type ReferencedBy = {
    links: {
        self: string;
    };
    data: Reference[] | null;
};
/**
 * A reference to a document
 * https://docs.cozy.io/en/cozy-doctypes/docs/io.cozy.files/#references
 */
export type Reference = {
    /**
     * - id of the document
     */
    id: string;
    /**
     * - doctype of the document
     */
    type: string;
};
export type ReferenceMap = {
    [x: string]: Reference[];
};
export type MutationOptions = {
    as?: string;
    update?: Function;
    updateQueries?: Function;
};
/**
 * - A document
 */
export type CozyClientDocument = {
    /**
     * - Id of the document
     */
    _id?: string;
    /**
     * - Id of the document
     */
    id?: string;
    /**
     * - Type of the document
     */
    _type?: string;
    /**
     * - Current revision of the document
     */
    _rev?: string;
    /**
     * - When the document has been deleted
     */
    _deleted?: boolean;
    /**
     * - Relationships of the document
     */
    relationships?: ReferencedByRelationship;
    /**
     * - referenced by of another document
     */
    referenced_by?: Reference[];
    /**
     * - Cozy Metadata
     */
    cozyMetadata?: object;
};
/**
 * - A io.cozy.files document's metadata
 */
export type FileMetadata = {
    /**
     * - The Note's content. See https://prosemirror.net/docs/ref/#model for more informations
     */
    content?: object;
    /**
     * - the schema used by prosemirror (with notes and marks serialized as arrays to preserve the order).
     */
    schema?: object;
    /**
     * - the initial title of the note (that will also be used for the file name)
     */
    title?: string;
    /**
     * - Number of a note
     */
    version?: number;
    /**
     * - Qualification of the file
     */
    qualification?: Qualification;
    /**
     * - Country of the paper
     */
    country?: string;
    /**
     * - Expiration date of the paper
     */
    expirationDate?: string;
    /**
     * - Reference date of the paper
     */
    referencedDate?: string;
    /**
     * - Notice period of the paper, in days
     */
    noticePeriod?: string;
    /**
     * - Image EXIF date, if relevant
     */
    datetime?: string;
};
/**
 * - An io.cozy.files document
 */
export type FileDocument = {
    /**
     * - Id of the file
     */
    _id: string;
    /**
     * - Doctype of the file
     */
    _type: FilesDoctype;
    /**
     * - Name of the file
     */
    name: string;
    /**
     * - Metadata of the file
     */
    metadata: FileMetadata;
    /**
     * - Type of the file
     */
    type: string;
    /**
     * - Class of the file
     */
    class: string;
    /**
     * - Mime of the file
     */
    mime: string;
    /**
     * - Whether or not the file is executable
     */
    executable: boolean;
    /**
     * - Whether or not the file is client-side encrypted
     */
    encrypted: boolean;
    /**
     * - Creation date of the file
     */
    created_at: string;
};
/**
 * - An io.cozy.files document
 */
export type IOCozyFile = CozyClientDocument & FileDocument;
/**
 * - An io.cozy.files document
 */
export type FolderDocument = {
    /**
     * - Id of the folder
     */
    _id: string;
    /**
     * - Doctype of the folder
     */
    _type: FilesDoctype;
    /**
     * - Name of the folder
     */
    name: string;
    /**
     * - Metadata of the folder
     */
    metadata: object;
    /**
     * - Type of the folder
     */
    type: object;
};
/**
 * - An io.cozy.files document
 */
export type IOCozyFolder = CozyClientDocument & FolderDocument;
/**
 * - An io.cozy.oauth.clients document
 */
export type OAuthClientDocument = {
    /**
     * - Id of the client
     */
    _id: string;
    /**
     * - Doctype of the client
     */
    _type: OAuthClientsDoctype;
    software_id: string;
    software_version: string;
    client_id: string;
    client_name: string;
    client_kind: string;
    client_uri: string;
    logo_uri: string;
    policy_uri: string;
    notification_platform: string;
    notification_device_token: string;
    redirect_uris: Array<string>;
};
/**
 * - An io.cozy.oauth.clients document
 */
export type IOCozyOAuthClient = CozyClientDocument & OAuthClientDocument;
export type ClientError = {
    status?: string;
};
export type FilePlugin = {
    externalDataDirectory?: object;
    cacheDirectory?: object;
    externalCacheDirectory?: object;
    dataDirectory?: object;
};
export type InAppBrowser = {
    open: Function;
};
export type AppMetadata = any;
export type ClientCapabilities = {
    /**
     * - Whether OIDC login is possible with this Cozy
     */
    can_auth_with_oidc?: boolean;
    /**
     * - Whether  password login is possible with this Cozy
     */
    can_auth_with_password?: boolean;
    /**
     * - Whether file versioning is active on this Cozy
     */
    file_versioning?: boolean;
    /**
     * - Whether the stack has been configured to use flat subdomains
     */
    flat_subdomains?: boolean;
};
export type Cordova = {
    file: FilePlugin;
    InAppBrowser: InAppBrowser;
    plugins: object;
};
export type CordovaWindow = {
    cordova: Cordova;
    SafariViewController: object;
    resolveLocalFileSystemURL: Function;
    handleOpenURL: Function;
};
/**
 * - A document
 */
export type CouchDBDocument = {
    /**
     * - Id of the document
     */
    _id: string;
    /**
     * - Current revision of the document
     */
    _rev: string;
    /**
     * - When the document has been deleted
     */
    _deleted?: boolean;
    /**
     * - Relationships of the document
     */
    relationships?: object;
};
/**
 * - An item of the CouchDB bulk docs response
 */
export type CouchDBBulkResult = {
    ok: boolean;
    id: string;
    rev: string;
    /**
     * ?
     */
    error: string | null;
    /**
     * ?
     */
    reason: string | null;
};
export type ViewKey = string | string[];
export type DocId = string;
export type CouchDBViewCursor = [string | string[], string];
export type Theme = {
    id: string;
    label: string;
    icon: string;
    items: Array<QualificationAttributes>;
    defaultItems?: Array<string>;
};
export type ThemesList = Theme[];
export type ThemesLabels = "transport" | "identity" | "family" | "health" | "invoice" | "work_study" | "home" | "finance";
export type QualificationAttributes = {
    label: string;
    purpose?: string;
    sourceCategory?: string;
    sourceSubCategory?: string;
    subjects?: Array<string>;
};
export type IdentityLabel = "identity_photo" | "national_id_card" | "passport" | "residence_permit" | "family_record_book" | "birth_certificate" | "driver_license" | "other_identity_document" | "electoral_card" | "citizen_registration_certificate" | "personal_sporting_licence";
export type FamilyLabel = "family_record_book" | "birth_certificate" | "wedding" | "pacs" | "divorce" | "large_family_card" | "caf" | "other_family_document" | "single_parent_benefit" | "payment_proof_family_allowance";
export type WorkStudyLabels = "resume" | "diploma" | "work_contract" | "pay_sheet" | "employment_center_certificate" | "unemployment_benefit" | "pension" | "gradebook" | "student_card" | "motivation_letter" | "other_work_document" | "work_disability_recognition" | "school_attendance_certificate";
export type HealthLabels = "health_book" | "health_certificate" | "pregnancy_medical_certificate" | "work_disability_recognition" | "national_health_insurance_card" | "national_health_insurance_right_certificate" | "health_insurance_card" | "prescription" | "health_invoice" | "other_health_document";
export type HomeLabels = "house_sale_agreeement" | "building_permit" | "technical_diagnostic_record" | "lease" | "rent_receipt" | "house_insurance" | "work_quote" | "work_invoice" | "other_house_document" | "phone_invoice" | "isp_invoice" | "telecom_invoice" | "energy_invoice" | "water_invoice" | "other_invoice" | "school_insurance_certificate" | "unfit_for_habitation_declaration" | "accommodation_proof";
export type TransportLabels = "driver_license" | "transport_card" | "vehicle_registration" | "car_insurance" | "mechanic_invoice" | "transport_invoice" | "other_transport_document";
export type FinanceLabels = "pay_sheet" | "single_parent_benefit" | "other_revenue" | "real_estate_tax" | "tax_return" | "tax_notice" | "tax_timetable" | "other_tax_document" | "bank_details" | "bank_statement" | "loan_agreement" | "other_bank_document" | "receipt" | "payment_proof_family_allowance";
export type InvoiceLabels = "health_invoice" | "transport_invoice" | "work_invoice" | "phone_invoice" | "isp_invoice" | "telecom_invoice" | "energy_invoice" | "water_invoice" | "appliance_invoice" | "web_service_invoice" | "restaurant_invoice" | "other_invoice";
export type ActivityLabels = "fidelity_card" | "library_card" | "personal_sporting_licence" | "other_activity_document";
export type ItemsLabels = "resume" | "identity_photo" | "national_id_card" | "passport" | "residence_permit" | "family_record_book" | "birth_certificate" | "driver_license" | "other_identity_document" | "wedding" | "pacs" | "divorce" | "large_family_card" | "caf" | "other_family_document" | "diploma" | "work_contract" | "pay_sheet" | "fidelity_card" | "library_card" | "single_parent_benefit" | "transport_card" | "electoral_card" | "employment_center_certificate" | "unemployment_benefit" | "pension" | "other_revenue" | "gradebook" | "student_card" | "motivation_letter" | "other_work_document" | "health_book" | "health_certificate" | "pregnancy_medical_certificate" | "work_disability_recognition" | "national_health_insurance_card" | "national_health_insurance_right_certificate" | "health_insurance_card" | "prescription" | "health_invoice" | "other_health_document" | "vehicle_registration" | "car_insurance" | "mechanic_invoice" | "transport_invoice" | "other_transport_document" | "house_sale_agreeement" | "real_estate_tax" | "building_permit" | "technical_diagnostic_record" | "lease" | "rent_receipt" | "house_insurance" | "work_quote" | "work_invoice" | "other_house_document" | "phone_invoice" | "isp_invoice" | "telecom_invoice" | "energy_invoice" | "water_invoice" | "appliance_invoice" | "web_service_invoice" | "restaurant_invoice" | "other_invoice" | "tax_return" | "tax_notice" | "tax_timetable" | "other_tax_document" | "bank_details" | "bank_statement" | "loan_agreement" | "other_bank_document" | "receipt" | "payment_proof_family_allowance" | "school_attendance_certificate" | "school_insurance_certificate" | "unfit_for_habitation_declaration" | "accommodation_proof" | "citizen_registration_certificate" | "personal_sporting_licence" | "other_activity_document";
/**
 * See https://github.com/cozy/DACC
 */
export type DACCMeasure = {
    /**
     * - It must match an existing measure name on the DACC server
     */
    measureName: string;
    /**
     * - Start of the aggregation period. Should be in YYYY-MM-DD format
     */
    startDate: string;
    /**
     * - The measured value on the aggregation period
     */
    value: number;
    /**
     * - The slug of the app creating the measure
     */
    createdBy: string;
    /**
     * - Should be a {key: value} where the key is set in the measure definition.
     */
    group1: object;
    /**
     * - Should be a {key: value} where the key is set in the measure definition.
     */
    group2: object;
    /**
     * - Should be a {key: value} where the key is set in the measure definition.
     */
    group3: object;
};
/**
 * See https://github.com/cozy/DACC
 */
export type DACCAggregatesParams = {
    /**
     * - It must match an existing measure name on the DACC server
     */
    measureName: string;
    /**
     * - Start of the aggregation period. Should be in YYYY-MM-DD format
     */
    startDate: string;
    /**
     * - End of the aggregation period. Should be in YYYY-MM-DD format
     */
    endDate: string;
};
/**
 * See https://github.com/cozy/DACC
 */
export type DACCAggregatesResponse = DACCAggregate[];
/**
 * See https://github.com/cozy/DACC
 */
export type DACCAggregate = {
    /**
     * - The name of the measures aggregate
     */
    measureName: string;
    /**
     * - The aggregation start date
     */
    startDate: string;
    /**
     * - The aggregate sum
     */
    sum: number;
    /**
     * - The aggregate count
     */
    count: number;
    /**
     * - The aggregate count of values different from zero
     */
    countNotZero: number;
    /**
     * - The aggregate average
     */
    avg: number;
    /**
     * - The aggregate min
     */
    min: number;
    /**
     * - The aggregate max
     */
    max: number;
    /**
     * - The aggregate standard deviation
     */
    std: number;
};
/**
 * Receives the URL to present to the user as a parameter, and should return a promise that resolves with the URL the user was redirected to after accepting the permissions.
 */
export type OpenURLCallback = (url: string) => any;
/**
 * A session code generated by the cozy-stack that can be used to create a session
 *
 * More information: https://docs.cozy.io/en/cozy-stack/auth/#post-authsession_code
 */
export type SessionCode = string;
/**
 * An object containing a code verifier and a code challenge that can be used in a
 * PKCE verification process
 *
 * More information: https://docs.cozy.io/en/cozy-stack/auth/#pkce-extension
 */
export type PKCECodes = {
    codeVerifier?: string;
    codeChallenge?: string;
};
/**
 * Subdomain type for a Cozy. Can be flat or nested subdomains
 *
 * Example of 'flat' domain: https://claude-notes.somedomain.fr
 * Example of 'nested' domain: https://notes.claude.somedomain.fr
 */
export type SubdomainType = "flat" | "nested";
/**
 * Represents the different parts of a deconstructed Cozy link
 */
export type CozyLinkData = {
    /**
     * - The Cozy's domain (i.e. 'mycozy.cloud')
     */
    cozyBaseDomain: string;
    /**
     * - The Cozy's name (i.e. 'claude')
     */
    cozyName: string;
    /**
     * - The link's path (i.e. '#/folder/SOME_FOLDER_ID')
     */
    hash?: string;
    /**
     * - The link's path (i.e. '/public/')
     */
    pathname?: string;
    /**
     * - The link's protocol (i.e. 'https')
     */
    protocol: string;
    /**
     * - The link's searchParams (i.e. 'id=SOME_FOLDER_ID&sharecode=SOME_SHARECODE')
     */
    searchParams?: string;
    /**
     * - The link's slug (i.e. 'drive' or 'notes)
     */
    slug: string;
};
/**
 * Represents the different parts of a deconstructed redirect link
 */
export type RedirectLinkData = {
    /**
     * - The redirect link's slug (i.e. 'drive')
     */
    slug: string;
    /**
     * - The redirect link's path (i.e. 'public')
     */
    path: string;
    /**
     * - The redirect link's path (i.e. '/folder/SOME_FOLDER_ID')
     */
    hash: string;
};
import { QueryDefinition } from "./queries/dsl";
