/**
 * @typedef {'primary' | 'primary-light' | 'primary-dark' | 'secondary' | 'secondary-light' | 'secondary-dark' | 'tertiary' | 'tertiary-light' | 'tertiary-dark' | 'error'} MeasureColor
 */

/**
 * @typedef {object} MeasureOptions
 * @property {string} markName - Mark name used as the start point for performance measurement
 * @property {string} [measureName] - Measure name that will be displayed in the performance graph. If not provided, markName will be used by default
 * @property {string} [category] - Category where the measure will be displayed int he performance graph
 * @property {MeasureColor} [color] - Category where the measure will be displayed int he performance graph
 */

/**
 * @typedef {object} PerformanceAPI
 * @property {function(MeasureOptions): void} measure
 * @property {function(string): string} mark
 */

export default {}
