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
    lastFetch: number;
    lastUpdate: number;
    lastErrorUpdate: number;
    lastError: Error;
    hasMore: boolean;
    count: number;
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
};
export type FetchMoreAble = {
    fetchMore: Function;
};
export type UseQueryReturnValue = QueryState & FetchMoreAble;
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
    type: object;
    /**
     * - Class of the file
     */
    class: object;
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
export type IOCozyFolder = CozyClientDocument & FileDocument;
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
export type IdentityLabel = "identity_photo" | "national_id_card" | "passport" | "residence_permit" | "driver_license" | "student_card" | "family_record_book" | "birth_certificate" | "citizen_registration_certificate" | "personal_sporting_licence" | "other_identity_document";
export type FamilyLabel = "family_record_book" | "birth_certificate" | "wedding" | "pacs" | "divorce" | "large_family_card" | "caf" |  "payment_proof_family_allowance" | "other_family_document";
export type WorkStudyLabels = "resume" | "diploma" | "work_contract" | "pay_sheet" | "unemployment_benefit" | "pension" | "other_revenue" | "gradebook" | "student_card" | "school_attendance_certificate" | "motivation_letter" | "other_work_document";
export type HealthLabels = "health_certificate" | "health_book" | "national_health_insurance_card" | "national_health_insurance_right_certificate" | "health_insurance_card" | "prescription" | "health_invoice" | "pregnancy_medical_certificate" | "work_disability_recognition" | "other_health_document";
export type HomeLabels = "phone_invoice" | "isp_invoice" | "telecom_invoice" | "energy_invoice" | "water_invoice" | "house_sale_agreeement" | "building_permit" | "unfit_for_habitation_declaration" | "technical_diagnostic_record" | "lease" | "accommodation_proof" | "rent_receipt" | "house_insurance" | "work_quote" | "work_invoice" | "other_house_document";
export type TransportLabels = "driver_license" | "vehicle_registration" | "car_insurance" | "mechanic_invoice" | "transport_invoice" | "payment_proof_family_allowance" | "other_transport_document";
export type FinanceLabels = "tax_return" | "tax_notice" | "tax_timetable" | "receipt" | "other_tax_document" | "bank_details" | "bank_statement" | "loan_agreement" | "other_bank_document";
export type InvoiceLabels = "health_invoice" | "phone_invoice" | "isp_invoice" | "telecom_invoice" | "energy_invoice" | "water_invoice" | "work_invoice" | "transport_invoice" | "appliance_invoice" | "web_service_invoice" | "restaurant_invoice" | "other_invoice";
export type ItemsLabels = "personal_sporting_licence" | "national_health_insurance_right_certificate" | "citizen_registration_certificate" | "accommodation_proof" | "unfit_for_habitation_declaration" | "school_attendance_certificate" | "payment_proof_family_allowance" | "pregnancy_medical_certificate" | "work_disability_recognition" | "resume" | "identity_photo" | "national_id_card" | "passport" | "residence_permit" | "family_record_book" | "birth_certificate" | "driver_license" | "other_identity_document" | "wedding" | "pacs" | "divorce" | "large_family_card" | "caf" | "other_family_document" | "diploma" | "work_contract" | "pay_sheet" | "unemployment_benefit" | "pension" | "other_revenue" | "gradebook" | "student_card" | "motivation_letter" | "other_work_document" | "health_certificate" | "health_book" | "national_health_insurance_card" | "health_insurance_card" | "prescription" | "health_invoice" | "phone_invoice" | "isp_invoice" | "telecom_invoice" | "energy_invoice" | "water_invoice" | "house_sale_agreeement" | "building_permit" | "technical_diagnostic_record" | "lease" | "rent_receipt" | "house_insurance" | "work_quote" | "work_invoice" | "other_house_document" | "vehicle_registration" | "car_insurance" | "mechanic_invoice" | "transport_invoice" | "other_transport_document" | "tax_return" | "tax_notice" | "tax_timetable" | "receipt" | "other_tax_document" | "bank_details" | "bank_statement" | "loan_agreement" | "other_bank_document" | "appliance_invoice" | "web_service_invoice" | "restaurant_invoice" | "other_invoice";
import { QueryDefinition } from "./queries/dsl";
