import { Manifest } from './types'

const APP_CATEGORIES = [
  'banking',
  'cozy',
  'energy',
  'health',
  'host_provider',
  'insurance',
  'isp',
  'mes_infos',
  'online_services',
  'others',
  'partners',
  'press',
  'productivity',
  'ptnb',
  'public_service',
  'shopping',
  'social',
  'telecom',
  'transport'
]

/** Filters unauthorized categories. Defaults to ['others'] if no suitable category. */
export function sanitizeCategories(categories) {
  if (!categories) return ['others']
  const filteredList = categories.filter(c => APP_CATEGORIES.includes(c))
  if (!filteredList.length) return ['others']
  return filteredList
}

export function areTermsValid(terms) {
  return Boolean(terms && terms.id && terms.url && terms.version)
}

export function isPartnershipValid(partnership) {
  return Boolean(partnership && partnership.description)
}

/**
 * Normalize app manifest, retro-compatibility for old manifests
 *
 * @param  {Manifest} manifest - app manifest to normalize
 * @returns {Manifest}
 */
export function sanitize(manifest) {
  const sanitized = { ...manifest }

  // Make categories an array and delete category attribute if it exists
  if (
    !manifest.categories &&
    manifest.category &&
    typeof manifest.category === 'string'
  ) {
    sanitized.categories = [manifest.category]
    delete sanitized.category
  }

  sanitized.categories = sanitizeCategories(sanitized.categories)

  // manifest name is not an object
  if (typeof manifest.name === 'object') sanitized.name = manifest.name.en

  // Fix camelCase from cozy-stack
  if (manifest.available_version) {
    sanitized.availableVersion = manifest.available_version
    delete sanitized.available_version
  }

  // Fix camelCase from cozy-stack
  if (manifest.latest_version) {
    sanitized.latestVersion = manifest.latestVersion
    delete sanitized.latest_version
  }

  // Remove invalid terms
  if (sanitized.terms && !areTermsValid(sanitized.terms)) {
    delete sanitized.terms
  }

  // Remove invalid partnership
  if (sanitized.partnership && !isPartnershipValid(sanitized.partnership)) {
    delete sanitized.partnership
  }

  return sanitized
}
