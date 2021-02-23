import { Q } from '../queries/dsl'

const validateTimeSerieFormat = timeserie => {
  if (!timeserie.startDate || !timeserie.endDate) {
    throw new Error(
      'You must specify a startDate and endDate for the time serie'
    )
  }
  if (!Date.parse(timeserie.startDate) || !Date.parse(timeserie.endDate)) {
    throw new Error('Invalid date format for the time serie')
  }
  if (!timeserie.dataType) {
    throw new Error('You must specify a dataType for the time serie')
  }
  if (!timeserie.serie || !Array.isArray(timeserie.serie)) {
    throw new Error('You must specify a serie array for the time serie')
  }
}

/**
 * Helper to save a time series document.
 *
 * @param {object} client - The CozyClient instance
 *
 * @typedef TimeSeries
 * @attributes dataType {String} - The type of time series, e.g. 'electricity'
 * @attributes startDate {date} - The starting date of the series
 * @attributes endType {date} - The starting date of the series
 * @attributes source {String} - The data source, e.g. 'enedis.fr'
 * @attributes theme {String} - The theme used to group time series, e.g. 'energy'
 * @attributes series {Array} - An array of objects representing the time series
 * @param {TimeSeries}- The time series to save
 */
export const saveTimeSerie = async (
  client,
  { dataType, serie, startDate, endDate, source, theme }
) => {
  validateTimeSerieFormat({ dataType, serie, startDate, endDate, source })

  const doctype = `io.cozy.timeseries.${dataType}`
  const timeserie = {
    _type: doctype,
    startDate,
    endDate,
    source,
    theme,
    serie
  }
  return client.save(timeserie)
}

/**
 * Helper to retrieve time series by their date interval and source.
 *
 * The starting date must be greater or equal while the ending date must
 * be stricly less than the given startDate and endDate parameters.
 *
 * @param {object} client - The CozyClient instance
 * @param {{ startDate, endDate, dataType, source, limit }} The query params.
 *
 * @typedef TimeSeries
 * @augments object
 * @property data {Array<GeoJSON>}
 * @returns {TimeSeries} The TimeSeries found by the query in JSON-API format
 */
export const fetchTimeSerieByIntervalAndSource = async (
  client,
  { startDate, endDate, dataType, source, limit }
) => {
  const doctype = `io.cozy.timeseries.${dataType}`
  const query = Q(doctype)
    .where({
      source: source,
      startDate: {
        $gte: startDate
      },
      endDate: {
        $lt: endDate
      }
    })
    .indexFields(['source', 'startDate', 'endDate'])
    .sortBy([{ source: 'desc' }, { startDate: 'desc' }, { endDate: 'desc' }])
    .limitBy(limit || 5)

  return client.query(query)
}
