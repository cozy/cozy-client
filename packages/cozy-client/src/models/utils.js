import get from 'lodash/get'

export const hasBeenUpdatedByApp = (doc, appSlug) => {
  const updatedByApps = get(doc, 'cozyMetadata.updatedByApps')
  return Boolean(updatedByApps && updatedByApps.find(x => x.slug === appSlug))
}

export const getCreatedByApp = doc => get(doc, 'cozyMetadata.createdByApp')
