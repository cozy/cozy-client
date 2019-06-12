import pickBy from 'lodash/pickBy'

const encodeValues = (values, fromArray = false) => {
  if (Array.isArray(values)) {
    return '[' + values.map(v => encodeValues(v, true)).join(',') + ']'
  }
  return fromArray
    ? encodeURIComponent(`"${values}"`)
    : encodeURIComponent(values)
}

/**
 * Encode an object as querystring, values are encoded as
 * URI components, keys are not.
 *
 * @function
 * @private
 */
export const encode = data => {
  return Object.entries(data)
    .map(([k, v]) => {
      const encodedValue = encodeValues(v)
      return `${k}=${encodedValue}`
    })
    .join('&')
}

/**
 * Returns a URL from base url and a query parameter object.
 * Any undefined parameter is removed.
 *
 * @function
 * @private
 */
export const buildURL = (url, params) => {
  const qs = encode(pickBy(params))
  if (qs) {
    return `${url}?${qs}`
  } else {
    return url
  }
}
