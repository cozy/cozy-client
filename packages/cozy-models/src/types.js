/**
 * @typedef {import("./document/qualification").Qualification} Qualification
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
 * @typedef {"io.cozy.remote.nextcloud.files"} NextcloudFilesDoctype
 * @typedef {AccountsDoctype|TriggersDoctype|KonnectorsDoctype|NotesDoctype|AppsDoctype|SettingsDoctype|OAuthClientsDoctype|FilesDoctype} KnownDoctype
 * @typedef {KnownDoctype|string} Doctype
 */

/**
 * @typedef {object} NodeEnvironment
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
 * @typedef {object} ContactName
 * @property {string} [familyName] - The family name (example: "House")
 * @property {string} [givenName] - The given name (example: "Gregory")
 * @property {string} [additionalName] - The additional name (example: "J.")
 * @property {string} [namePrefix] - The name prefix (example: "Dr.")
 * @property {string} [nameSuffix] - The name suffix (example: "III")
 */

/**
 * @typedef {object} ContactEmail
 * @property {string} address - Email address
 * @property {string} [type] - A user-provided localized type (example: `"Personal"`, `"Professional"`, `"Other"`)
 * @property {'work'|'home'} [label] - A keyword to identify the type, must be `work|home`
 * @property {boolean} [primary] - Indicates a preferred-use address
 */

/**
 * @typedef {object} ContactExtendedAddress
 * @property {string} [locality] - Locality name
 * @property {string} [building] - Building number
 * @property {string} [stairs] - Stairs number
 * @property {string} [floor] - Apartment floor
 * @property {string} [apartment] - Apartment number
 * @property {string} [entrycode] - Entry code
 */

/**
 * @typedef {object} ContactGeo
 * @property {Array<number>} [geo] - Coordinates of the address, must be [long, lat]
 * @property {"home"|"work"} [cozyCategory] - The category of the address type
 */

/**
 * @typedef {object} ContactAddress
 * @property {string} [id] - Id of the address
 * @property {string} [street] - Street name
 * @property {string} [pobox] - P.O Box number
 * @property {string} [city] - City name
 * @property {string} [region] - Region name
 * @property {string} [number] - Lane number
 * @property {string} [code] - Postal code
 * @property {string} [country] - Country name
 * @property {string} [type] - A user-provided localized type (example: `"Personal"`, `"Professional"`, `"Other"`)
 * @property {'work'|'home'} [label] - A keyword to identify the type, must be `work|home`
 * @property {boolean} [primary] - Indicates a preferred-use address
 * @property {ContactExtendedAddress} [extendedAddress]
 * @property {string} [formattedAddress] - Unstructured version of the address
 * @property {ContactGeo} [geo]
 */

/**
 * @typedef {object} ContactPhone
 * @property {string} number - Phone number
 * @property {string} [type] - A user-provided localized type (example: `"Personal"`, `"Professional"`, `"Other"`), could be provided by Contacts app too as `voice|fax|cell`
 * @property {'work'|'home'} [label] - A keyword to identify the type, must be `work|home`
 * @property {boolean} [primary] - Indicates a preferred-use number
 *
 */

/**
 * @typedef {object} ContactCozy
 * @property {string} url
 * @property {string} [type] - A user-provided localized type (example: `"Personal"`, `"Professional"`, `"Other"`)
 * @property {'work'|'home'} [label] - A keyword to identify the type, must be `work|home`
 * @property {boolean} [primary] - Indicates a preferred-use instance
 *
 */

/**
 * @typedef {object} ContactMetadata
 * @property {boolean} cozy - Whether the contact has been created by cozy
 * @property {object} google - Google metadata
 * @property {number} version - Used for migrations. Current version is 1
 *
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
 * @typedef {'identity'|'family'|'work_study'|'health'|'home'|'transport'|'finance'|'invoice'|'others'} ThemesLabels
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
 * @typedef {'identity_photo'|'national_id_card'|'passport'|'residence_permit'|'family_record_book'|'birth_certificate'|'driver_license'|'other_identity_document'|'citizen_registration_certificate'|'personal_sporting_licence'|'electoral_card'|'note_identity_document'} IdentityLabel
 *
 * @typedef {'family_record_book'|'birth_certificate'|'wedding'|'pacs'|'divorce'|'large_family_card'|'caf'|'other_family_document'|'payment_proof_family_allowance'|'single_parent_benefit'|'note_family_document'|'person_insurance'} FamilyLabel
 *
 * @typedef {'diploma'|'work_contract'|'pay_sheet'|'unemployment_benefit'|'pension'|'gradebook'|'student_card'|'resume'|'motivation_letter'|'other_work_document'|'work_disability_recognition'|'school_attendance_certificate'|'employment_center_certificate'|'school_insurance_certificate'|'note_work_document'|'expense_claim'} WorkStudyLabels
 *
 * @typedef {'health_certificate'|'health_book'|'national_health_insurance_card'|'health_insurance_card'|'prescription'|'health_invoice'|'national_health_insurance_right_certificate'|'work_disability_recognition'|'pregnancy_medical_certificate'|'other_health_document'|'note_health_document'} HealthLabels
 *
 * @typedef {'phone_invoice'|'isp_invoice'|'telecom_invoice'|'energy_invoice'|'water_invoice'|'other_invoice'|'house_sale_agreeement'|'building_permit'|'technical_diagnostic_record'|'lease'|'rent_receipt'|'house_insurance'|'work_quote'|'work_invoice'|'other_house_document'|'unfit_for_habitation_declaration'|'accommodation_proof'|'note_house_document'|'real_estate_insurance'|'condition_report'} HomeLabels
 *
 * @typedef {'driver_license'|'vehicle_registration'|'car_insurance'|'mechanic_invoice'|'transport_invoice'|'other_transport_document'|'transport_card'|'note_transport_document'} TransportLabels
 *
 * @typedef {'fine'|'tax_certificate'|'tax_return'|'tax_notice'|'tax_timetable'|'pay_sheet'|'receipt'|'other_tax_document'|'bank_details'|'bank_statement'|'loan_agreement'|'other_bank_document'|'payment_proof_family_allowance'|'other_revenue'|'single_parent_benefit'|'real_estate_tax'|'note_finance'|'expense_claim'} FinanceLabels
 *
 * @typedef {'phone_invoice'|'isp_invoice'|'telecom_invoice'|'energy_invoice'|'water_invoice'|'appliance_invoice'|'web_service_invoice'|'restaurant_invoice'|'work_invoice'|'transport_invoice'|'health_invoice'|'other_invoice'|'note_invoice'|'expense_claim'|'energy_contract'|'grocery_invoice'} InvoiceLabels
 *
 * @typedef {'personal_sporting_licence'|'other_activity_document'|'fidelity_card'|'library_card'|'note_activity_document'} ActivityLabels
 *
 * @typedef {'other_administrative_document'|'note_other'} OthersLabels
 *
 * @typedef {IdentityLabel|FamilyLabel|WorkStudyLabels|HealthLabels|HomeLabels|TransportLabels|FinanceLabels|InvoiceLabels|ActivityLabels|OthersLabels} ItemsLabels
 */

/**
 * @typedef {'national_id_card'|'other_identity_document'|'resume'|'work_disability_recognition'} iconPeopleLabels
 *
 * @typedef {'employment_center_certificate'|'motivation_letter'|'other_work_document'|'school_attendance_certificate'|'school_insurance_certificate'|'student_card'|'unemployment_benefit'|'work_contract'} iconWorkLabels
 *
 * @typedef {'fine'} iconJusticeLabels
 *
 * @typedef {'residence_permit'} iconGlobeLabels
 *
 * @typedef {'passport'} iconPlaneLabels
 *
 * @typedef {'library_card'} iconLibraryLabels
 *
 * @typedef {'identity_photo'} iconImageLabels
 *
 * @typedef {'fidelity_card'|'grocery_invoice'} iconShopLabels
 *
 * @typedef {'electoral_card'} iconGouvLabels
 *
 * @typedef {'diploma'|'gradebook'} iconSchoolLabels
 *
 * @typedef {'birth_certificate'} iconChildLabels
 *
 * @typedef {'receipt'} iconEmailLabels
 *
 * @typedef {'appliance_invoice'} iconLaudryLabels
 *
 * @typedef {'accommodation_proof'|'building_permit'|'condition_report'|'house_insurance'|'house_sale_agreeement'|'lease'|'mechanic_invoice'|'other_house_document'|'real_estate_insurance'|'rent_receipt'|'technical_diagnostic_record'|'unfit_for_habitation_declaration'|'work_invoice'|'work_quote'} iconHomeLabels
 *
 * @typedef {'loan_agreement'|'other_revenue'|'pay_sheet'|'payment_proof_family_allowance'|'pension'} iconBenefitLabels
 *
 * @typedef {'other_bank_document'} iconEuroLabels
 *
 * @typedef {'bank_details'} iconBankCheckLabels
 *
 * @typedef {'other_administrative_document'|'other_tax_document'|'real_estate_tax'|'tax_certificate'|'tax_notice'|'tax_return'|'tax_timetable'} iconBankLabels
 *
 * @typedef {'car_insurance'|'driver_license'|'other_transport_document'|'transport_card'|'transport_invoice'|'vehicle_registration'} iconCarLabels
 *
 * @typedef {'energy_contract'|'energy_invoice'} iconLightningLabels
 *
 * @typedef {'isp_invoice'|'telecom_invoice'|'web_service_invoice'} iconTelecomLabels
 *
 * @typedef {'phone_invoice'} iconTelephoneLabels
 *
 * @typedef {'water_invoice'} iconWaterLabels
 *
 * @typedef {'expense_claim'} iconRemboursementLabels
 *
 * @typedef {'restaurant_invoice'} iconRestaurantLabels
 *
 * @typedef {'other_invoice'} iconBillLabels
 *
 * @typedef {'caf'|'citizen_registration_certificate'|'divorce'|'family_record_book'|'large_family_card'|'other_family_document'|'pacs'|'single_parent_benefit'|'wedding'} iconTeamLabels
 *
 * @typedef {'other_activity_document'|'personal_sporting_licence'} iconFitnessLabels
 *
 * @typedef {'health_book'|'health_certificate'|'health_insurance_card'|'health_invoice'|'national_health_insurance_card'|'national_health_insurance_right_certificate'|'other_health_document'|'person_insurance'|'pregnancy_medical_certificate'|'prescription'} iconHeartLabels
 *
 * @typedef {'bank_statement'} iconExchangeLabels
 *
 * @typedef {'note_activity_document'|'note_family_document'|'note_finance'|'note_health_document'|'note_house_document'|'note_identity_document'|'note_invoice'|'note_transport_document'|'note_work_document'} iconFileTypeNoteLabels
 */

/**
 * @typedef {'bank-check'|'bank'|'benefit'|'bill'|'car'|'child'|'email'|'euro'|'exchange'|'file-type-note'|'fitness'|'globe'|'gouv'|'heart'|'home'|'image'|'justice'|'laudry'|'library'|'lightning'|'people'|'plane'|'remboursement'|'restaurant'|'school'|'shop'|'team'|'telecom'|'telephone'|'water'|'work'} IconQualificationLabels
 */

/**
 * @typedef {{ icon: IconQualificationLabels, labels: Array<string> }} iconLabelPairs
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
 * @typedef {object} Coordinates
 * @property {number} lat - The latitude, in decimal degrees
 * @property {number} lon - The longitude, in decimal degrees
 */

/**
 * @typedef {Object} CountryISO
 * @property {string} code2 - ISO 3166-1 alpha-2
 * @property {string} code3 - ISO 3166-1 alpha-3
 * @property {string} number - ISO 3166-1 numeric
 */

/**
 * @typedef {Object} Country
 * @property {string} code2 - ISO 3166-1 alpha-2
 * @property {string} code3 - ISO 3166-1 alpha-3
 * @property {string} number - ISO 3166-1 numeric
 * @property {string} name - Country name
 * @property {string} nationality - Nationality name
 */

export default {}
