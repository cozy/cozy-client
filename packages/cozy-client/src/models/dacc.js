import log from 'cozy-logger'
import { DACCMeasure, DACCAggregatesParams } from '../types'

export const isCorrectDateFormat = date => {
  try {
    const parsedDate = new Date(Date.parse(date))
    return parsedDate.toISOString().startsWith(date)
  } catch (err) {
    return false
  }
}

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
  if (!isCorrectDateFormat(startDate)) {
    throw new Error('Date should be in YYYY-MM-DD format')
  }
  if (typeof value !== 'number') {
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
        data: JSON.stringify(measure),
        path: 'measure'
      })
  } catch (error) {
    log(
      'error',
      `Error while sending measure to remote doctype: ${error.message}`
    )
    throw error
  }
}

export const buildAggregateParams = params => {
  const { measureName } = params
  if (!measureName || typeof measureName !== 'string') {
    throw new Error('Missing or wrong type parameter: measureName')
  }
  const startDate = params.startDate || new Date(0).toISOString()
  const endDate = params.endDate || new Date(Date.now()).toISOString()
  if (!isCorrectDateFormat(startDate) || !isCorrectDateFormat(endDate)) {
    throw new Error('Date should be in YYYY-MM-DD format')
  }
  return { measureName, startDate, endDate }
}

/**
 * Send measures to a DACC through a remote doctype
 *
 * @param {object} client - The CozyClient instance
 * @param {string} remoteDoctype - The remote doctype to use
 * @param {DACCAggregatesParams} params - The request params
 */
export const fetchAggregatesFromDACC = async (
  client,
  remoteDoctype,
  params
) => {
  try {
    const aggregateParams = buildAggregateParams(params)
    await client
      .getStackClient()
      .fetchJSON('POST', `/remote/${remoteDoctype}`, {
        data: JSON.stringify(aggregateParams),
        path: 'aggregate'
      })
  } catch (error) {
    log(
      'error',
      `Error while fetching aggregates to remote doctype: ${error.message}`
    )
    throw error
  }
}
