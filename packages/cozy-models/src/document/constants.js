// #region Qualification labels for each theme
/**
 * @type {Array<import("../types").IdentityLabel>}
 */
export const THEME_IDENTITY_LABELS = [
  'identity_photo',
  'national_id_card',
  'passport',
  'residence_permit',
  'electoral_card',
  'family_record_book',
  'birth_certificate',
  'driver_license',
  'citizen_registration_certificate',
  'note_identity_document',
  'other_identity_document'
]

/**
 * @type {Array<import("../types").FamilyLabel>}
 */
export const THEME_FAMILY_LABELS = [
  'family_record_book',
  'birth_certificate',
  'wedding',
  'pacs',
  'single_parent_benefit',
  'divorce',
  'large_family_card',
  'caf',
  'payment_proof_family_allowance',
  'note_family_document',
  'other_family_document',
  'person_insurance'
]

/**
 * @type {Array<import("../types").WorkStudyLabels>}
 */
export const THEME_WORK_STUDY_LABELS = [
  'diploma',
  'work_contract',
  'pay_sheet',
  'unemployment_benefit',
  'employment_center_certificate',
  'pension',
  'work_disability_recognition',
  'gradebook',
  'student_card',
  'school_attendance_certificate',
  'school_insurance_certificate',
  'resume',
  'motivation_letter',
  'expense_claim',
  'note_work_document',
  'other_work_document'
]

/**
 * @type {Array<import("../types").HealthLabels>}
 */
export const THEME_HEALTH_LABELS = [
  'health_certificate',
  'health_book',
  'national_health_insurance_card',
  'national_health_insurance_right_certificate',
  'health_insurance_card',
  'prescription',
  'health_invoice',
  'work_disability_recognition',
  'pregnancy_medical_certificate',
  'note_health_document',
  'other_health_document'
]

/**
 * @type {Array<import("../types").HomeLabels>}
 */
export const THEME_HOME_LABELS = [
  'phone_invoice',
  'isp_invoice',
  'telecom_invoice',
  'energy_invoice',
  'water_invoice',
  'other_invoice',
  'work_invoice',
  'house_sale_agreeement',
  'building_permit',
  'technical_diagnostic_record',
  'unfit_for_habitation_declaration',
  'lease',
  'rent_receipt',
  'accommodation_proof',
  'house_insurance',
  'work_quote',
  'condition_report',
  'note_house_document',
  'other_house_document',
  'real_estate_insurance'
]

/**
 * @type {Array<import("../types").TransportLabels>}
 */
export const THEME_TRANSPORT_LABELS = [
  'driver_license',
  'vehicle_registration',
  'car_insurance',
  'transport_card',
  'mechanic_invoice',
  'transport_invoice',
  'note_transport_document',
  'other_transport_document'
]

/**
 * @type {Array<import("../types").ActivityLabels>}
 */
export const THEME_ACTIVITY_LABELS = [
  'personal_sporting_licence',
  'fidelity_card',
  'library_card',
  'note_activity_document',
  'other_activity_document'
]

/**
 * @type {Array<import("../types").FinanceLabels>}
 */
export const THEME_FINANCE_LABELS = [
  'fine',
  'tax_certificate',
  'tax_return',
  'tax_notice',
  'tax_timetable',
  'real_estate_tax',
  'pay_sheet',
  'receipt',
  'single_parent_benefit',
  'other_tax_document',
  'bank_details',
  'bank_statement',
  'loan_agreement',
  'payment_proof_family_allowance',
  'note_finance',
  'expense_claim',
  'other_bank_document',
  'other_revenue'
]

/**
 * @type {Array<import("../types").InvoiceLabels>}
 */
export const THEME_INVOICE_LABELS = [
  'phone_invoice',
  'isp_invoice',
  'telecom_invoice',
  'energy_invoice',
  'water_invoice',
  'appliance_invoice',
  'web_service_invoice',
  'restaurant_invoice',
  'work_invoice',
  'transport_invoice',
  'health_invoice',
  'note_invoice',
  'expense_claim',
  'energy_contract',
  'grocery_invoice',
  'other_invoice'
]

/**
 * @type {Array<import("../types").OthersLabels>}
 */
export const THEME_OTHERS_LABELS = ['other_administrative_document']
// #endregion Qualification labels for each theme

// #region Qualifcation labels for each icon
/**
 * @type {Array<import("../types").iconPeopleLabels>}
 */
const ICON_PEOPLE_LABELS = [
  'national_id_card',
  'other_identity_document',
  'resume',
  'work_disability_recognition'
]

/**
 * @type {Array<import("../types").iconWorkLabels>}
 */
const ICON_WORK_LABELS = [
  'employment_center_certificate',
  'motivation_letter',
  'other_work_document',
  'school_attendance_certificate',
  'school_insurance_certificate',
  'student_card',
  'unemployment_benefit',
  'work_contract'
]

/**
 * @type {Array<import("../types").iconJusticeLabels>}
 */
const ICON_JUSTICE_LABELS = ['fine']

/**
 * @type {Array<import("../types").iconGlobeLabels>}
 */
const ICON_GLOBE_LABELS = ['residence_permit']

/**
 * @type {Array<import("../types").iconPlaneLabels>}
 */
const ICON_PLANE_LABELS = ['passport']

/**
 * @type {Array<import("../types").iconLibraryLabels>}
 */
const ICON_LIBRARY_LABELS = ['library_card']

/**
 * @type {Array<import("../types").iconImageLabels>}
 */
const ICON_IMAGE_LABELS = ['identity_photo']

/**
 * @type {Array<import("../types").iconShopLabels>}
 */
const ICON_SHOP_LABELS = ['fidelity_card', 'grocery_invoice']

/**
 * @type {Array<import("../types").iconGouvLabels>}
 */
const ICON_GOUV_LABELS = ['electoral_card']

/**
 * @type {Array<import("../types").iconSchoolLabels>}
 */
const ICON_SCHOOL_LABELS = ['diploma', 'gradebook']

/**
 * @type {Array<import("../types").iconChildLabels>}
 */
const ICON_CHILD_LABELS = ['birth_certificate']

/**
 * @type {Array<import("../types").iconEmailLabels>}
 */
const ICON_EMAIL_LABELS = ['receipt']

/**
 * @type {Array<import("../types").iconLaudryLabels>}
 */
const ICON_LAUDRY_LABELS = ['appliance_invoice']

/**
 * @type {Array<import("../types").iconHomeLabels>}
 */
const ICON_HOME_LABELS = [
  'accommodation_proof',
  'building_permit',
  'condition_report',
  'house_insurance',
  'house_sale_agreeement',
  'lease',
  'mechanic_invoice',
  'other_house_document',
  'real_estate_insurance',
  'rent_receipt',
  'technical_diagnostic_record',
  'unfit_for_habitation_declaration',
  'work_invoice',
  'work_quote'
]

/**
 * @type {Array<import("../types").iconBenefitLabels>}
 */
const ICON_BENEFIT_LABELS = [
  'loan_agreement',
  'other_revenue',
  'pay_sheet',
  'payment_proof_family_allowance',
  'pension'
]

/**
 * @type {Array<import("../types").iconEuroLabels>}
 */
const ICON_EURO_LABELS = ['other_bank_document']

/**
 * @type {Array<import("../types").iconBankCheckLabels>}
 */
const ICON_BANK_CHECK_LABELS = ['bank_details']

/**
 * @type {Array<import("../types").iconBankLabels>}
 */
const ICON_BANK_LABELS = [
  'other_administrative_document',
  'other_tax_document',
  'real_estate_tax',
  'tax_certificate',
  'tax_notice',
  'tax_return',
  'tax_timetable'
]

/**
 * @type {Array<import("../types").iconCarLabels>}
 */
const ICON_CAR_LABELS = [
  'car_insurance',
  'driver_license',
  'other_transport_document',
  'transport_card',
  'transport_invoice',
  'vehicle_registration'
]

/**
 * @type {Array<import("../types").iconLightningLabels>}
 */
const ICON_LIGHTNING_LABELS = ['energy_contract', 'energy_invoice']

/**
 * @type {Array<import("../types").iconTelecomLabels>}
 */
const ICON_TELECOM_LABELS = [
  'isp_invoice',
  'telecom_invoice',
  'web_service_invoice'
]

/**
 * @type {Array<import("../types").iconTelephoneLabels>}
 */
const ICON_TELEPHONE_LABELS = ['phone_invoice']

/**
 * @type {Array<import("../types").iconWaterLabels>}
 */
const ICON_WATER_LABELS = ['water_invoice']

/**
 * @type {Array<import("../types").iconRemboursementLabels>}
 */
const ICON_REMBOURSEMENT_LABELS = ['expense_claim']

/**
 * @type {Array<import("../types").iconRestaurantLabels>}
 */
const ICON_RESTAURANT_LABELS = ['restaurant_invoice']

/**
 * @type {Array<import("../types").iconBillLabels>}
 */
const ICON_BILL_LABELS = ['other_invoice']

/**
 * @type {Array<import("../types").iconTeamLabels>}
 */
const ICON_TEAM_LABELS = [
  'caf',
  'citizen_registration_certificate',
  'divorce',
  'family_record_book',
  'large_family_card',
  'other_family_document',
  'pacs',
  'single_parent_benefit',
  'wedding'
]

/**
 * @type {Array<import("../types").iconFitnessLabels>}
 */
const ICON_FITNESS_LABELS = [
  'other_activity_document',
  'personal_sporting_licence'
]

/**
 * @type {Array<import("../types").iconHeartLabels>}
 */
const ICON_HEART_LABELS = [
  'health_book',
  'health_certificate',
  'health_insurance_card',
  'health_invoice',
  'national_health_insurance_card',
  'national_health_insurance_right_certificate',
  'other_health_document',
  'person_insurance',
  'pregnancy_medical_certificate',
  'prescription'
]

/**
 * @type {Array<import("../types").iconExchangeLabels>}
 */
const ICON_EXCHANGE_LABELS = ['bank_statement']

/**
 * @type {Array<import("../types").iconFileTypeNoteLabels>}
 */
const ICON_FILE_TYPE_NOTE_LABELS = [
  'note_activity_document',
  'note_family_document',
  'note_finance',
  'note_health_document',
  'note_house_document',
  'note_identity_document',
  'note_invoice',
  'note_transport_document',
  'note_work_document'
]

/**
 * @type {Array<import("../types").iconLabelPairs>}
 */
export const iconLabelPairs = [
  { icon: 'bank-check', labels: ICON_BANK_CHECK_LABELS },
  { icon: 'bank', labels: ICON_BANK_LABELS },
  { icon: 'benefit', labels: ICON_BENEFIT_LABELS },
  { icon: 'bill', labels: ICON_BILL_LABELS },
  { icon: 'car', labels: ICON_CAR_LABELS },
  { icon: 'child', labels: ICON_CHILD_LABELS },
  { icon: 'email', labels: ICON_EMAIL_LABELS },
  { icon: 'euro', labels: ICON_EURO_LABELS },
  { icon: 'exchange', labels: ICON_EXCHANGE_LABELS },
  { icon: 'file-type-note', labels: ICON_FILE_TYPE_NOTE_LABELS },
  { icon: 'fitness', labels: ICON_FITNESS_LABELS },
  { icon: 'globe', labels: ICON_GLOBE_LABELS },
  { icon: 'gouv', labels: ICON_GOUV_LABELS },
  { icon: 'heart', labels: ICON_HEART_LABELS },
  { icon: 'home', labels: ICON_HOME_LABELS },
  { icon: 'image', labels: ICON_IMAGE_LABELS },
  { icon: 'justice', labels: ICON_JUSTICE_LABELS },
  { icon: 'laudry', labels: ICON_LAUDRY_LABELS },
  { icon: 'library', labels: ICON_LIBRARY_LABELS },
  { icon: 'lightning', labels: ICON_LIGHTNING_LABELS },
  { icon: 'people', labels: ICON_PEOPLE_LABELS },
  { icon: 'plane', labels: ICON_PLANE_LABELS },
  { icon: 'remboursement', labels: ICON_REMBOURSEMENT_LABELS },
  { icon: 'restaurant', labels: ICON_RESTAURANT_LABELS },
  { icon: 'school', labels: ICON_SCHOOL_LABELS },
  { icon: 'shop', labels: ICON_SHOP_LABELS },
  { icon: 'team', labels: ICON_TEAM_LABELS },
  { icon: 'telecom', labels: ICON_TELECOM_LABELS },
  { icon: 'telephone', labels: ICON_TELEPHONE_LABELS },
  { icon: 'water', labels: ICON_WATER_LABELS },
  { icon: 'work', labels: ICON_WORK_LABELS }
]
// #endregion Qualifcation labels for each icon
