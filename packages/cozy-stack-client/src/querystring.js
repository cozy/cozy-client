import pickBy from 'lodash/pickBy'

const encodeValues = values => {
  const encoded =
    '[' +
    encodeURIComponent(
      values
        .map(value => {
          return Array.isArray(value)
            ? '[' + value.map(arrayVal => `"${arrayVal}"`).join(',') + ']'
            : `"${value}"`
        })
        .join(',')
    ) +
    ']'
  return encoded
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
      const encodedValue = Array.isArray(v)
        ? encodeValues(v)
        : encodeURIComponent(v)
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
