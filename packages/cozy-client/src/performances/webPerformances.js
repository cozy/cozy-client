import uniqueId from 'lodash/uniqueId'

/**
 * Measure performances since the given markName
 *
 * @param {string} measureName - Measure name that will be displayed in the performance graph
 * @param {string} markName - Mark name used as the start point for performance measurement
 * @param {string} category - Category where the measure will be displayed int he performance graph
 */
const measure = (measureName, markName, category, color) => {
  performance.measure(measureName, {
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

export const webPerformances = {
  measure,
  mark
}
