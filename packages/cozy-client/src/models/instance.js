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
export const isFreemiumUser = diskUsage => {
  const quota = get(diskUsage, 'data.attributes.quota', false)
  return parseInt(quota) <= PREMIUM_QUOTA
}
export const getUuid = instanceInfo => {
  return get(instanceInfo, 'instance.data.attributes.uuid')
}
