import get from 'lodash/get'
const GB = 1000 * 1000 * 1000
const PREMIUM_QUOTA = 50 * GB

// If manager URL is present, then the instance is not self-hosted
export const isSelfHosted = instanceInfo => {
  return get(instanceInfo, 'context.data.attributes.manager_url') ? false : true
}
export const arePremiumLinksEnabled = instanceInfo => {
  return get(instanceInfo, 'context.data.attributes.enable_premium_links')
    ? true
    : false
}
export const isFreemiumUser = instanceInfo => {
  const quota = get(instanceInfo, 'diskUsage.data.attributes.quota', false)
  return parseInt(quota) <= PREMIUM_QUOTA
}
export const getUuid = instanceInfo => {
  return get(instanceInfo, 'instance.data.attributes.uuid')
}

/**
 * Returns whether an instance is concerned by our offers
 *
 * @param {object} data Object containing all the results from /settings/*
 * @param {object} data.context Object returned by /settings/context
 * @param {object} data.instance Object returned by /settings/instance
 * @param {object} data.diskUsage Object returned by /settings/disk-usage
 */
export const shouldDisplayOffers = data => {
  return (
    !isSelfHosted(data) &&
    arePremiumLinksEnabled(data) &&
    getUuid(data) &&
    isFreemiumUser(data)
  )
}

/**
 * Returns the link to the Premium page on the Cozy's Manager
 *
 * @param {object} instanceInfo
 */
export const buildPremiumLink = instanceInfo => {
  const managerUrl = get(
    instanceInfo,
    'context.data.attributes.manager_url',
    false
  )
  const uuid = getUuid(instanceInfo)
  if (managerUrl && uuid) {
    return `${managerUrl}/cozy/instances/${uuid}/premium`
  }
}
