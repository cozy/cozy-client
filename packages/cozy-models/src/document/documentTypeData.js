import {
  THEME_ACTIVITY_LABELS,
  THEME_FAMILY_LABELS,
  THEME_FINANCE_LABELS,
  THEME_HEALTH_LABELS,
  THEME_HOME_LABELS,
  THEME_IDENTITY_LABELS,
  THEME_INVOICE_LABELS,
  THEME_OTHERS_LABELS,
  THEME_TRANSPORT_LABELS,
  THEME_WORK_STUDY_LABELS
} from './constants'
import { Qualification } from './qualification'

/**
 *
 * @param {Array<import("../types").ItemsLabels>} labels - Array of items labels
 * @returns {Array<import("../types").QualificationAttributes>}
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
 * @type {import("../types").ThemesList}
 */
export const themesList = [
  {
    id: 'theme1',
    label: 'identity',
    icon: 'people',
    items: buildItemsByLabel(THEME_IDENTITY_LABELS),
    defaultItems: ['birth_certificate']
  },
  {
    id: 'theme2',
    label: 'family',
    icon: 'team',
    items: buildItemsByLabel(THEME_FAMILY_LABELS),
    defaultItems: ['family_record_book']
  },
  {
    id: 'theme3',
    label: 'work_study',
    icon: 'work',
    items: buildItemsByLabel(THEME_WORK_STUDY_LABELS)
  },
  {
    id: 'theme4',
    label: 'health',
    icon: 'heart',
    items: buildItemsByLabel(THEME_HEALTH_LABELS)
  },
  {
    id: 'theme5',
    label: 'home',
    icon: 'home',
    items: buildItemsByLabel(THEME_HOME_LABELS)
  },
  {
    id: 'theme6',
    label: 'transport',
    icon: 'car',
    items: buildItemsByLabel(THEME_TRANSPORT_LABELS),
    defaultItems: ['driver_license']
  },
  {
    id: 'theme7',
    label: 'activity',
    icon: 'chess',
    items: buildItemsByLabel(THEME_ACTIVITY_LABELS)
  },
  {
    id: 'theme8',
    label: 'finance',
    icon: 'bank',
    items: buildItemsByLabel(THEME_FINANCE_LABELS)
  },
  {
    id: 'theme9',
    label: 'invoice',
    icon: 'bill',
    items: buildItemsByLabel(THEME_INVOICE_LABELS)
  },
  {
    id: 'theme10',
    label: 'others',
    icon: 'dots',
    items: buildItemsByLabel(THEME_OTHERS_LABELS)
  }
]
