import get from 'lodash/get'
import { Q } from '../queries/dsl'

const GB = 1000 * 1000 * 1000
const PREMIUM_QUOTA = 50 * GB

/**
 * @typedef {object} InstanceInfo
 * @typedef {object} ContextInfo
 * @typedef {object} DiskUsageInfo
 */

/**
 * @typedef SettingsInfo
 * @property {ContextInfo} context - Object returned by /settings/context
 * @property {InstanceInfo} instance - Object returned by /settings/instance
 * @property {DiskUsageInfo} diskUsage - Object returned by /settings/disk-usage
 */

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
 * @param {SettingsInfo} data Object containing all the results from /settings/*
 * @returns {boolean} Should we display offers
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
 * Returns if an instance has subscribed to one of our offers
 *
 * @param {SettingsInfo} data Object containing all the results from /settings/*
 * @returns {boolean} Does the cozy have offers
 */
export const hasAnOffer = data => {
  return (
    !isSelfHosted(data) &&
    arePremiumLinksEnabled(data) &&
    getUuid(data) &&
    !isFreemiumUser(data)
  )
}

/**
 * Returns the link to the Premium page on the Cozy's Manager
 *
 * @param {InstanceInfo} instanceInfo - Instance information
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
  } else {
    return null
  }
}

/**
 * Checks the value of the password_defined attribute
 *
 * @param {import("../CozyClient").default} client - The CozyClient instance
 * @returns {Promise<boolean>} - Returns the value of the password_defined attribute
 */
export const hasPasswordDefinedAttribute = async client => {
  try {
    const {
      data: {
        attributes: { password_defined }
      }
    } = await client.fetchQueryAndGetFromState({
      definition: Q('io.cozy.settings').getById('io.cozy.settings.instance'),
      options: {
        as: 'io.cozy.settings/io.cozy.settings.instance',
        singleDocData: true
      }
    })

    return password_defined
  } catch {
    return false
  }
}
