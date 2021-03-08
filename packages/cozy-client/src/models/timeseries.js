import { Q } from '../queries/dsl'
import { Doctype } from '../types'

const validateTimeSeriesFormat = timeseries => {
  if (!timeseries.startDate || !timeseries.endDate) {
    throw new Error(
      'You must specify a startDate and endDate for the time serie'
    )
  }
  if (!Date.parse(timeseries.startDate) || !Date.parse(timeseries.endDate)) {
    throw new Error('Invalid date format for the time serie')
  }
  if (!timeseries.dataType) {
    throw new Error('You must specify a dataType for the time serie')
  }
  if (!timeseries.series || !Array.isArray(timeseries.series)) {
    throw new Error('You must specify a series array for the time serie')
  }
}

/**
 * @typedef TimeSeries
 * @property dataType {String} - The type of time series, e.g. 'electricity'
 * @property startDate {Date} - The starting date of the series
 * @property endDate {Date} - The end date of the series
 * @property endType {Date} - The starting date of the series
 * @property source {String} - The data source, e.g. 'enedis.fr'
 * @property theme {String} - The theme used to group time series, e.g. 'energy'
 * @property series {Array} - An array of objects representing the time series
 */

/**
 * Helper to save a time series document.
 *
 * @param {object} client - The CozyClient instance
 *
 
 * @param {TimeSeries} timeseriesOption - The time series to save
 */
export const saveTimeSeries = async (client, timeseriesOption) => {
  const {
    dataType,
    series,
    startDate,
    endDate,
    source,
    theme
  } = timeseriesOption
  validateTimeSeriesFormat({ dataType, series, startDate, endDate, source })

  const doctype = `io.cozy.timeseries.${dataType}`
  const timeseries = {
    _type: doctype,
    startDate,
    endDate,
    source,
    theme,
    series
  }
  return client.save(timeseries)
}

/**
 * Helper to retrieve time series by their date interval and source.
 *
 * @param {object} client - The CozyClient instance
 * @param {{ startDate, endDate, dataType, source, limit }} The query params.
 *
 * @typedef TimeSeriesJSONAPI
 * @property data {Array<TimeSeries>} - The JSON-API data response
 * @returns {Promise<TimeSeriesJSONAPI>} The TimeSeries found by the query in JSON-API format
 */
export const fetchTimeSeriesByIntervalAndSource = async (
  client,
  { startDate, endDate, dataType, source, limit }
) => {
  /**
   * @type {Doctype}
   */
  const doctype = `io.cozy.timeseries.${dataType}`
  const query = Q(doctype)
    .where({
      source: source,
      startDate: {
        $gte: startDate
      },
      endDate: {
        $lte: endDate
      }
    })
    .indexFields(['source', 'startDate', 'endDate'])
    .sortBy([{ source: 'desc' }, { startDate: 'desc' }, { endDate: 'desc' }])
    .limitBy(limit || 5)

  return client.query(query)
}
