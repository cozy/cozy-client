import { Qualification } from './qualification'
import {
  ThemesList,
  QualificationAttributes,
  IdentityLabel,
  FamilyLabel,
  WorkStudyLabels,
  HealthLabels,
  HomeLabels,
  TransportLabels,
  FinanceLabels,
  InvoiceLabels,
  ItemsLabels,
  ActivityLabels
} from '../../types'

/**
 *
 * @param {Array<ItemsLabels>} labels - Array of items labels
 * @returns {Array<QualificationAttributes>}
 */
const buildItemsByLabel = labels => {
  return labels
    .map(label => {
      try {
        return Qualification.getByLabel(label)
      } catch (e) {
        console.log('error', e) // eslint-disable-line no-console
        return null
      }
    })
    .filter(item => item)
}

/**
 * @type {Array<IdentityLabel>}
 */
const identityLabels = [
  'identity_photo',
  'national_id_card',
  'passport',
  'residence_permit',
  'family_record_book',
  'birth_certificate',
  'driver_license',
  'citizen_registration_certificate',
  'other_identity_document'
]

/**
 * @type {Array<FamilyLabel>}
 */
const familyLabels = [
  'family_record_book',
  'birth_certificate',
  'wedding',
  'pacs',
  'divorce',
  'large_family_card',
  'caf',
  'payment_proof_family_allowance',
  'other_family_document'
]

/**
 * @type {Array<WorkStudyLabels>}
 */
const workStudyLabels = [
  'diploma',
  'work_contract',
  'pay_sheet',
  'unemployment_benefit',
  'pension',
  'work_disability_recognition',
  'gradebook',
  'student_card',
  'school_attendance_certificate',
  'resume',
  'motivation_letter',
  'other_work_document'
]

/**
 * @type {Array<HealthLabels>}
 */
const healthLabels = [
  'health_certificate',
  'health_book',
  'national_health_insurance_card',
  'national_health_insurance_right_certificate',
  'health_insurance_card',
  'prescription',
  'health_invoice',
  'work_disability_recognition',
  'pregnancy_medical_certificate',
  'other_health_document'
]

/**
 * @type {Array<HomeLabels>}
 */
const homeLabels = [
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
  'other_house_document'
]

/**
 * @type {Array<TransportLabels>}
 */
const transportLabels = [
  'driver_license',
  'vehicle_registration',
  'car_insurance',
  'mechanic_invoice',
  'transport_invoice',
  'other_transport_document'
]

/**
 * @type {Array<ActivityLabels>}
 */
const activityLabels = ['personal_sporting_licence', 'other_activity_document']

/**
 * @type {Array<FinanceLabels>}
 */
const financeLabels = [
  'tax_return',
  'tax_notice',
  'tax_timetable',
  'pay_sheet',
  'receipt',
  'other_tax_document',
  'bank_details',
  'bank_statement',
  'loan_agreement',
  'payment_proof_family_allowance',
  'other_bank_document',
  'other_revenue'
]

/**
 * @type {Array<InvoiceLabels>}
 */
const invoiceLabels = [
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
  'other_invoice'
]

/**
 * @type {ThemesList}
 */
export const themesList = [
  {
    id: 'theme1',
    label: 'identity',
    icon: 'people',
    items: buildItemsByLabel(identityLabels),
    defaultItems: ['birth_certificate']
  },
  {
    id: 'theme2',
    label: 'family',
    icon: 'team',
    items: buildItemsByLabel(familyLabels),
    defaultItems: ['family_record_book']
  },
  {
    id: 'theme3',
    label: 'work_study',
    icon: 'company',
    items: buildItemsByLabel(workStudyLabels)
  },
  {
    id: 'theme4',
    label: 'health',
    icon: 'heart',
    items: buildItemsByLabel(healthLabels)
  },
  {
    id: 'theme5',
    label: 'home',
    icon: 'home',
    items: buildItemsByLabel(homeLabels)
  },
  {
    id: 'theme6',
    label: 'transport',
    icon: 'car',
    items: buildItemsByLabel(transportLabels),
    defaultItems: ['driver_license']
  },
  {
    id: 'theme7',
    label: 'activity',
    icon: 'compass',
    items: buildItemsByLabel(activityLabels)
  },
  {
    id: 'theme8',
    label: 'finance',
    icon: 'bank',
    items: buildItemsByLabel(financeLabels)
  },
  {
    id: 'theme9',
    label: 'invoice',
    icon: 'bill',
    items: buildItemsByLabel(invoiceLabels)
  }
]
