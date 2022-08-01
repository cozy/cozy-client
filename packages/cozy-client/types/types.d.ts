declare var _default: {};
export default _default;
export type AccountsDoctype = "io.cozy.accounts";
export type TriggersDoctype = "io.cozy.triggers";
export type KonnectorsDoctype = "io.cozy.konnectors";
export type NotesDoctype = "io.cozy.notes";
export type AppsDoctype = "io.cozy.apps";
export type SettingsDoctype = "io.cozy.settings";
export type OAuthClientsDoctype = "io.cozy-oauth.clients";
export type FilesDoctype = "io.cozy.files";
export type KnownDoctype = "io.cozy.files" | "io.cozy.accounts" | "io.cozy.triggers" | "io.cozy.konnectors" | "io.cozy.notes" | "io.cozy.apps" | "io.cozy.settings" | "io.cozy-oauth.clients";
export type Doctype = string;
export type Link = any;
export type Mutation = any;
export type DocumentCollection = any;
export type QueryResult = any;
export type HydratedDocument = any;
export type ReduxStore = any;
export type Token = any;
export type ClientResponse = any;
export type Manifest = any;
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
    hydrated?: object;
    /**
     * - If true, the "data" returned will be
     * a single doc instead of an array for single doc queries. Defaults to false for backward
     * compatibility but will be set to true in the future.
     */
    singleDocData?: object;
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
    metadata: object;
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
export type ClientCapabilities = any;
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
export type ThemesLabels = "transport" | "identity" | "family" | "work_study" | "health" | "home" | "finance" | "invoice";
export type QualificationAttributes = {
    label: string;
    purpose?: string;
    sourceCategory?: string;
    sourceSubCategory?: string;
    subjects?: Array<string>;
};
export type IdentityLabel = "identity_photo" | "national_id_card" | "passport" | "residence_permit" | "family_record_book" | "birth_certificate" | "driver_license" | "other_identity_document" | "citizen_registration_certificate" | "personal_sporting_licence";
export type FamilyLabel = "family_record_book" | "birth_certificate" | "wedding" | "pacs" | "divorce" | "large_family_card" | "caf" | "other_family_document" | "payment_proof_family_allowance";
export type WorkStudyLabels = "resume" | "diploma" | "work_contract" | "pay_sheet" | "unemployment_benefit" | "pension" | "gradebook" | "student_card" | "motivation_letter" | "other_work_document" | "work_disability_recognition" | "school_attendance_certificate";
export type HealthLabels = "work_disability_recognition" | "health_certificate" | "health_book" | "national_health_insurance_card" | "health_insurance_card" | "prescription" | "health_invoice" | "national_health_insurance_right_certificate" | "pregnancy_medical_certificate" | "other_health_document";
export type HomeLabels = "phone_invoice" | "isp_invoice" | "telecom_invoice" | "energy_invoice" | "water_invoice" | "house_sale_agreeement" | "building_permit" | "technical_diagnostic_record" | "lease" | "rent_receipt" | "house_insurance" | "work_quote" | "work_invoice" | "other_house_document" | "unfit_for_habitation_declaration" | "accommodation_proof";
export type TransportLabels = "driver_license" | "vehicle_registration" | "car_insurance" | "mechanic_invoice" | "transport_invoice" | "other_transport_document";
export type FinanceLabels = "payment_proof_family_allowance" | "pay_sheet" | "tax_return" | "tax_notice" | "tax_timetable" | "receipt" | "other_tax_document" | "bank_details" | "bank_statement" | "loan_agreement" | "other_bank_document" | "other_revenue";
export type InvoiceLabels = "health_invoice" | "phone_invoice" | "isp_invoice" | "telecom_invoice" | "energy_invoice" | "water_invoice" | "work_invoice" | "transport_invoice" | "appliance_invoice" | "web_service_invoice" | "restaurant_invoice" | "other_invoice";
export type ActivityLabels = "personal_sporting_licence" | "other_activity_document";
export type ItemsLabels = "resume" | "identity_photo" | "national_id_card" | "passport" | "residence_permit" | "family_record_book" | "birth_certificate" | "driver_license" | "other_identity_document" | "citizen_registration_certificate" | "personal_sporting_licence" | "wedding" | "pacs" | "divorce" | "large_family_card" | "caf" | "other_family_document" | "payment_proof_family_allowance" | "diploma" | "work_contract" | "pay_sheet" | "unemployment_benefit" | "pension" | "gradebook" | "student_card" | "motivation_letter" | "other_work_document" | "work_disability_recognition" | "school_attendance_certificate" | "health_certificate" | "health_book" | "national_health_insurance_card" | "health_insurance_card" | "prescription" | "health_invoice" | "national_health_insurance_right_certificate" | "pregnancy_medical_certificate" | "other_health_document" | "phone_invoice" | "isp_invoice" | "telecom_invoice" | "energy_invoice" | "water_invoice" | "house_sale_agreeement" | "building_permit" | "technical_diagnostic_record" | "lease" | "rent_receipt" | "house_insurance" | "work_quote" | "work_invoice" | "other_house_document" | "unfit_for_habitation_declaration" | "accommodation_proof" | "vehicle_registration" | "car_insurance" | "mechanic_invoice" | "transport_invoice" | "other_transport_document" | "tax_return" | "tax_notice" | "tax_timetable" | "receipt" | "other_tax_document" | "bank_details" | "bank_statement" | "loan_agreement" | "other_bank_document" | "other_revenue" | "appliance_invoice" | "web_service_invoice" | "restaurant_invoice" | "other_invoice" | "other_activity_document";
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
import { QueryDefinition } from "./queries/dsl";
