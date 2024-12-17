import uniqueId from 'lodash/uniqueId'

/**
 * Measure performances since the given markName
 *
 * @param {import('./types').MeasureOptions} options - Options for the measurement
 */
const measure = ({ measureName, markName, category, color }) => {
  const name = measureName ?? markName

  // @ts-ignore
  performance.measure(name, {
    start: markName,
    detail: {
      devtools: {
        track: category ?? 'CozyClient',
        color: color ?? 'secondary'
      }
    }
  })
}

/**
 * Set a mark with the given name
 *
 * In order to ensure uniqueness of mark names,
 * the given markName is prefixed with a unique id
 *
 * This method returns the computed mark name containing
 * the unique id. This new ID should be used when
 * calling `measure()`
 *
 * @param {string} markName - the name of the mark
 */
const mark = markName => {
  const uniqMarkName = `${uniqueId()} ${markName}`
  performance.mark(uniqMarkName)
  return uniqMarkName
}

/** @type {import('./types').PerformanceAPI} */
export const webPerformanceApi = {
  measure,
  mark
}
