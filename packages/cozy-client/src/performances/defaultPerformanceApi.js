/** @type {import('./types').PerformanceAPI} */
export const defaultPerformanceApi = {
  measure: options => {},
  mark: markName => {
    return markName
  }
}
