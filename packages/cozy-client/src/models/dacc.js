import log from 'cozy-logger'
import { DACCMeasure } from '../types'

/**
 * Throw an errror if a DACC parameter is incorrect.
 *
 * @param { DACCMeasure} measure - The DACC measure
 */
export const checkMeasureParams = measure => {
  const {
    createdBy,
    measureName,
    startDate,
    value,
    group1,
    group2,
    group3
  } = measure

  if (!createdBy || typeof createdBy !== 'string') {
    throw new Error('Missing or wrong type parameter: createdBy')
  }
  if (!measureName || typeof measureName !== 'string') {
    throw new Error('Missing or wrong type parameter: measureName')
  }
  if (!startDate) {
    throw new Error('Missing parameter: startDate')
  }
  const parsedDate = new Date(Date.parse(startDate))
  if (!parsedDate.toISOString().startsWith(startDate)) {
    throw new Error('Date should be in YYYY-MM-DD format')
  }
  if (!value || typeof value !== 'number') {
    throw new Error('Missing or wrong type parameter: value')
  }
  if (
    (group1 &&
      (typeof group1 !== 'object' || Object.keys(group1).length === 0)) ||
    (group2 &&
      (typeof group2 !== 'object' || Object.keys(group2).length === 0)) ||
    (group3 && (typeof group3 !== 'object' || Object.keys(group3).length === 0))
  ) {
    throw new Error('Groups should be key-value objects')
  }
  if ((group3 && (!group2 || !group1)) || (group2 && !group1)) {
    throw new Error('Group order must be respected')
  }
}

/**
 * Send measures to a DACC through a remote doctype
 *
 * @param {object} client - The CozyClient instance
 * @param {string} remoteDoctype - The remote doctype to use
 * @param {DACCMeasure} measure - The DACC measure
 */
export const sendMeasureToDACC = async (client, remoteDoctype, measure) => {
  try {
    checkMeasureParams(measure)

    await client
      .getStackClient()
      .fetchJSON('POST', `/remote/${remoteDoctype}`, {
        data: JSON.stringify(measure)
      })
  } catch (error) {
    log(
      'error',
      `Error while sending measure to remote doctype: ${error.message}`
    )
    throw error
  }
}
