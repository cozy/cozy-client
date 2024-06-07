declare var _default: {};
export default _default;
export type Qualification = import("./document/qualification").Qualification;
export type NotesDoctype = "io.cozy.notes";
export type AppsDoctype = "io.cozy.apps";
export type SettingsDoctype = "io.cozy.settings";
export type OAuthClientsDoctype = "io.cozy-oauth.clients";
export type FilesDoctype = "io.cozy.files";
export type AccountsDoctype = "io.cozy.account";
export type KonnectorsDoctype = "io.cozy.konnectors";
export type TriggersDoctype = "io.cozy.triggers";
export type NextcloudFilesDoctype = "io.cozy.remote.nextcloud.files";
export type KnownDoctype = "io.cozy.files" | "io.cozy.account" | "io.cozy.triggers" | "io.cozy.konnectors" | "io.cozy.notes" | "io.cozy.apps" | "io.cozy.settings" | "io.cozy-oauth.clients";
export type Doctype = string;
export type NodeEnvironment = any;
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
export type ContactName = {
    /**
     * - The family name (example: "House")
     */
    familyName?: string;
    /**
     * - The given name (example: "Gregory")
     */
    givenName?: string;
    /**
     * - The additional name (example: "J.")
     */
    additionalName?: string;
    /**
     * - The name prefix (example: "Dr.")
     */
    namePrefix?: string;
    /**
     * - The name suffix (example: "III")
     */
    nameSuffix?: string;
};
export type ContactEmail = {
    /**
     * - Email address
     */
    address: string;
    /**
     * - A user-provided localized type (example: `"Personal"`, `"Professional"`, `"Other"`)
     */
    type?: string;
    /**
     * - A keyword to identify the type, must be `work|home`
     */
    label?: 'work' | 'home';
    /**
     * - Indicates a preferred-use address
     */
    primary?: boolean;
};
export type ContactExtendedAddress = {
    /**
     * - Locality name
     */
    locality?: string;
    /**
     * - Building number
     */
    building?: string;
    /**
     * - Stairs number
     */
    stairs?: string;
    /**
     * - Apartment floor
     */
    floor?: string;
    /**
     * - Apartment number
     */
    apartment?: string;
    /**
     * - Entry code
     */
    entrycode?: string;
};
export type ContactGeo = {
    /**
     * - Coordinates of the address, must be [long, lat]
     */
    geo?: Array<number>;
    /**
     * - The category of the address type
     */
    cozyCategory?: "home" | "work";
};
export type ContactAddress = {
    /**
     * - Id of the address
     */
    id?: string;
    /**
     * - Street name
     */
    street?: string;
    /**
     * - P.O Box number
     */
    pobox?: string;
    /**
     * - City name
     */
    city?: string;
    /**
     * - Region name
     */
    region?: string;
    /**
     * - Lane number
     */
    number?: string;
    /**
     * - Postal code
     */
    code?: string;
    /**
     * - Country name
     */
    country?: string;
    /**
     * - A user-provided localized type (example: `"Personal"`, `"Professional"`, `"Other"`)
     */
    type?: string;
    /**
     * - A keyword to identify the type, must be `work|home`
     */
    label?: 'work' | 'home';
    /**
     * - Indicates a preferred-use address
     */
    primary?: boolean;
    extendedAddress?: ContactExtendedAddress;
    /**
     * - Unstructured version of the address
     */
    formattedAddress?: string;
    geo?: ContactGeo;
};
export type ContactPhone = {
    /**
     * - Phone number
     */
    number: string;
    /**
     * - A user-provided localized type (example: `"Personal"`, `"Professional"`, `"Other"`), could be provided by Contacts app too as `voice|fax|cell`
     */
    type?: string;
    /**
     * - A keyword to identify the type, must be `work|home`
     */
    label?: 'work' | 'home';
    /**
     * - Indicates a preferred-use number
     */
    primary?: boolean;
};
export type ContactCozy = {
    url: string;
    /**
     * - A user-provided localized type (example: `"Personal"`, `"Professional"`, `"Other"`)
     */
    type?: string;
    /**
     * - A keyword to identify the type, must be `work|home`
     */
    label?: 'work' | 'home';
    /**
     * - Indicates a preferred-use instance
     */
    primary?: boolean;
};
export type ContactMetadata = {
    /**
     * - Whether the contact has been created by cozy
     */
    cozy: boolean;
    /**
     * - Google metadata
     */
    google: object;
    /**
     * - Used for migrations. Current version is 1
     */
    version: number;
};
export type Theme = {
    id: string;
    label: string;
    icon: string;
    items: Array<QualificationAttributes>;
    defaultItems?: Array<string>;
};
export type ThemesList = Theme[];
export type ThemesLabels = "transport" | "home" | "identity" | "family" | "health" | "invoice" | "work_study" | "finance" | "others";
export type QualificationAttributes = {
    label: string;
    purpose?: string;
    sourceCategory?: string;
    sourceSubCategory?: string;
    subjects?: Array<string>;
};
export type IdentityLabel = "identity_photo" | "national_id_card" | "passport" | "residence_permit" | "family_record_book" | "birth_certificate" | "driver_license" | "other_identity_document" | "electoral_card" | "citizen_registration_certificate" | "personal_sporting_licence" | "note_identity_document";
export type FamilyLabel = "family_record_book" | "birth_certificate" | "wedding" | "pacs" | "divorce" | "large_family_card" | "caf" | "other_family_document" | "single_parent_benefit" | "payment_proof_family_allowance" | "person_insurance" | "note_family_document";
export type WorkStudyLabels = "resume" | "diploma" | "work_contract" | "pay_sheet" | "employment_center_certificate" | "unemployment_benefit" | "pension" | "gradebook" | "student_card" | "motivation_letter" | "other_work_document" | "work_disability_recognition" | "school_attendance_certificate" | "school_insurance_certificate" | "expense_claim" | "note_work_document";
export type HealthLabels = "work_disability_recognition" | "health_book" | "health_certificate" | "pregnancy_medical_certificate" | "national_health_insurance_card" | "national_health_insurance_right_certificate" | "health_insurance_card" | "prescription" | "health_invoice" | "other_health_document" | "note_health_document";
export type HomeLabels = "house_sale_agreeement" | "building_permit" | "technical_diagnostic_record" | "lease" | "rent_receipt" | "house_insurance" | "work_quote" | "work_invoice" | "other_house_document" | "phone_invoice" | "isp_invoice" | "telecom_invoice" | "energy_invoice" | "water_invoice" | "other_invoice" | "unfit_for_habitation_declaration" | "accommodation_proof" | "real_estate_insurance" | "condition_report" | "note_house_document";
export type TransportLabels = "driver_license" | "transport_card" | "vehicle_registration" | "car_insurance" | "mechanic_invoice" | "transport_invoice" | "other_transport_document" | "note_transport_document";
export type FinanceLabels = "single_parent_benefit" | "payment_proof_family_allowance" | "pay_sheet" | "expense_claim" | "other_revenue" | "real_estate_tax" | "tax_certificate" | "tax_return" | "tax_notice" | "tax_timetable" | "other_tax_document" | "bank_details" | "bank_statement" | "loan_agreement" | "other_bank_document" | "receipt" | "fine" | "note_finance";
export type InvoiceLabels = "expense_claim" | "health_invoice" | "work_invoice" | "phone_invoice" | "isp_invoice" | "telecom_invoice" | "energy_invoice" | "water_invoice" | "other_invoice" | "transport_invoice" | "energy_contract" | "appliance_invoice" | "web_service_invoice" | "restaurant_invoice" | "grocery_invoice" | "note_invoice";
export type ActivityLabels = "personal_sporting_licence" | "fidelity_card" | "library_card" | "other_activity_document" | "note_activity_document";
export type OthersLabels = "other_administrative_document" | "note_other";
export type ItemsLabels = "resume" | "identity_photo" | "national_id_card" | "passport" | "residence_permit" | "family_record_book" | "birth_certificate" | "driver_license" | "other_identity_document" | "electoral_card" | "citizen_registration_certificate" | "personal_sporting_licence" | "note_identity_document" | "wedding" | "pacs" | "divorce" | "large_family_card" | "caf" | "other_family_document" | "single_parent_benefit" | "payment_proof_family_allowance" | "person_insurance" | "note_family_document" | "diploma" | "work_contract" | "pay_sheet" | "employment_center_certificate" | "unemployment_benefit" | "pension" | "gradebook" | "student_card" | "motivation_letter" | "other_work_document" | "work_disability_recognition" | "school_attendance_certificate" | "school_insurance_certificate" | "expense_claim" | "note_work_document" | "health_book" | "health_certificate" | "pregnancy_medical_certificate" | "national_health_insurance_card" | "national_health_insurance_right_certificate" | "health_insurance_card" | "prescription" | "health_invoice" | "other_health_document" | "note_health_document" | "house_sale_agreeement" | "building_permit" | "technical_diagnostic_record" | "lease" | "rent_receipt" | "house_insurance" | "work_quote" | "work_invoice" | "other_house_document" | "phone_invoice" | "isp_invoice" | "telecom_invoice" | "energy_invoice" | "water_invoice" | "other_invoice" | "unfit_for_habitation_declaration" | "accommodation_proof" | "real_estate_insurance" | "condition_report" | "note_house_document" | "transport_card" | "vehicle_registration" | "car_insurance" | "mechanic_invoice" | "transport_invoice" | "other_transport_document" | "note_transport_document" | "other_revenue" | "real_estate_tax" | "tax_certificate" | "tax_return" | "tax_notice" | "tax_timetable" | "other_tax_document" | "bank_details" | "bank_statement" | "loan_agreement" | "other_bank_document" | "receipt" | "fine" | "note_finance" | "energy_contract" | "appliance_invoice" | "web_service_invoice" | "restaurant_invoice" | "grocery_invoice" | "note_invoice" | "fidelity_card" | "library_card" | "other_activity_document" | "note_activity_document" | "other_administrative_document" | "note_other";
export type iconPeopleLabels = "resume" | "national_id_card" | "other_identity_document" | "work_disability_recognition";
export type iconWorkLabels = "work_contract" | "employment_center_certificate" | "unemployment_benefit" | "student_card" | "motivation_letter" | "other_work_document" | "school_attendance_certificate" | "school_insurance_certificate";
export type iconJusticeLabels = "fine";
export type iconGlobeLabels = "residence_permit";
export type iconPlaneLabels = "passport";
export type iconLibraryLabels = "library_card";
export type iconImageLabels = "identity_photo";
export type iconShopLabels = "grocery_invoice" | "fidelity_card";
export type iconGouvLabels = "electoral_card";
export type iconSchoolLabels = "diploma" | "gradebook";
export type iconChildLabels = "birth_certificate";
export type iconEmailLabels = "receipt";
export type iconLaudryLabels = "appliance_invoice";
export type iconHomeLabels = "house_sale_agreeement" | "building_permit" | "technical_diagnostic_record" | "lease" | "rent_receipt" | "house_insurance" | "work_quote" | "work_invoice" | "other_house_document" | "unfit_for_habitation_declaration" | "accommodation_proof" | "real_estate_insurance" | "condition_report" | "mechanic_invoice";
export type iconBenefitLabels = "payment_proof_family_allowance" | "pay_sheet" | "pension" | "other_revenue" | "loan_agreement";
export type iconEuroLabels = "other_bank_document";
export type iconBankCheckLabels = "bank_details";
export type iconBankLabels = "real_estate_tax" | "tax_certificate" | "tax_return" | "tax_notice" | "tax_timetable" | "other_tax_document" | "other_administrative_document";
export type iconCarLabels = "driver_license" | "transport_card" | "vehicle_registration" | "car_insurance" | "transport_invoice" | "other_transport_document";
export type iconLightningLabels = "energy_invoice" | "energy_contract";
export type iconTelecomLabels = "isp_invoice" | "telecom_invoice" | "web_service_invoice";
export type iconTelephoneLabels = "phone_invoice";
export type iconWaterLabels = "water_invoice";
export type iconRemboursementLabels = "expense_claim";
export type iconRestaurantLabels = "restaurant_invoice";
export type iconBillLabels = "other_invoice";
export type iconTeamLabels = "family_record_book" | "citizen_registration_certificate" | "wedding" | "pacs" | "divorce" | "large_family_card" | "caf" | "other_family_document" | "single_parent_benefit";
export type iconFitnessLabels = "personal_sporting_licence" | "other_activity_document";
export type iconHeartLabels = "person_insurance" | "health_book" | "health_certificate" | "pregnancy_medical_certificate" | "national_health_insurance_card" | "national_health_insurance_right_certificate" | "health_insurance_card" | "prescription" | "health_invoice" | "other_health_document";
export type iconExchangeLabels = "bank_statement";
export type iconFileTypeNoteLabels = "note_identity_document" | "note_family_document" | "note_work_document" | "note_health_document" | "note_house_document" | "note_transport_document" | "note_finance" | "note_invoice" | "note_activity_document";
export type IconQualificationLabels = "image" | "work" | "car" | "telecom" | "water" | "bank" | "child" | "bank-check" | "benefit" | "bill" | "email" | "euro" | "exchange" | "file-type-note" | "fitness" | "globe" | "gouv" | "heart" | "home" | "justice" | "laudry" | "library" | "lightning" | "people" | "plane" | "remboursement" | "restaurant" | "school" | "shop" | "team" | "telephone";
export type iconLabelPairs = {
    icon: IconQualificationLabels;
    labels: Array<string>;
};
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
export type Coordinates = {
    /**
     * - The latitude, in decimal degrees
     */
    lat: number;
    /**
     * - The longitude, in decimal degrees
     */
    lon: number;
};
export type CountryISO = {
    /**
     * - ISO 3166-1 alpha-2
     */
    code2: string;
    /**
     * - ISO 3166-1 alpha-3
     */
    code3: string;
    /**
     * - ISO 3166-1 numeric
     */
    number: string;
};
export type Country = {
    /**
     * - ISO 3166-1 alpha-2
     */
    code2: string;
    /**
     * - ISO 3166-1 alpha-3
     */
    code3: string;
    /**
     * - ISO 3166-1 numeric
     */
    number: string;
    /**
     * - Country name
     */
    name: string;
    /**
     * - Nationality name
     */
    nationality: string;
};
