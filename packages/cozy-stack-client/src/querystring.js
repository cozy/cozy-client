import pickBy from 'lodash/pickBy'

/**
 * Encode an object as querystring, values are encoded as
 * URI components, keys are not.
 *
 * @private
 */
export const encode = data => {
  return Object.entries(data)
    .map(([k, v]) => {
      const encodedValue = Array.isArray(v)
        ? '[' +
          encodeURIComponent(v.map(arrayVal => `"${arrayVal}"`).join(',')) +
          ']'
        : encodeURIComponent(v)
      return `${k}=${encodedValue}`
    })
    .join('&')
}

/**
 * Returns a URL from base url and a query parameter object.
 * Any undefined parameter is removed.
 *
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
