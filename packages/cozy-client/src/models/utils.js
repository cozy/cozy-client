import get from 'lodash/get'

export const getCreatedByApp = doc => get(doc, 'cozyMetadata.createdByApp')
