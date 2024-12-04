// @ts-check
const EARTH_RADIUS_M = 6378137
const EARTH_CIRCUMFERENCE_M = 40075000

/**
 * Compute the speed from distance and duration
 *
 * @param {number} distance - The distance in meters
 * @param {number} duration - The duration in seconds
 * @returns {number} - The speed, in m/s, rounded to 2 decimals
 */
export const computeSpeed = (distance, duration) => {
  if (!distance || !duration) {
    return 0
  }
  return Math.round((distance / duration) * 100) / 100
}

/**
 * Convert degrees to radians
 *
 * @param {number} degrees - The degrees to convert
 * @returns {number} The converted radians
 */
const degreesToRadians = degrees => {
  return (degrees * Math.PI) / 180
}

/**
 * Convert radians to degrees
 *
 * @param {number} radians - The radians to convert
 * @returns {number} The converted degrees
 */
const radiansToDegrees = radians => {
  return (radians * 180) / Math.PI
}

/**
 * Round the value to the n decimal
 *
 * @param {number} value - The value to round
 * @param {number} n - The number of decimals
 * @returns {number} The rounded value
 */
const roundToNDecimals = (value, n) => {
  const multiplier = Math.pow(10, n)
  return Math.round(value * multiplier) / multiplier
}

/**
 * Compute the distance between 2 geographic points, in meters.
 *
 * This is an implementation of the Haversine formula, that
 * supposes a perfect sphere. We know this is not exactly the case
 * for Earth, especially at the poles, but this approximation is good enough.
 * More complex methods do exist, such as Vincenty formula, but we prefer
 * simplicity over precision here.
 * See https://en.wikipedia.org/wiki/Geodesics_on_an_ellipsoid
 *
 * @param {import("../types").Coordinates} point1 - The first point coordinates, in decimal degrees
 * @param {import("../types").Coordinates} point2 - The second point coordinates, in decimal degrees
 * @returns {number} The distance between the points, in meters, rounded to 2 decimals
 */
export const geodesicDistance = (point1, point2) => {
  if (
    point1?.lon === undefined ||
    point1?.lat === undefined ||
    point2?.lon === undefined ||
    point2?.lat === undefined
  ) {
    return null
  }
  const lon1 = degreesToRadians(point1.lon)
  const lat1 = degreesToRadians(point1.lat)

  const lon2 = degreesToRadians(point2.lon)
  const lat2 = degreesToRadians(point2.lat)

  const diffLon = lon2 - lon1
  const diffLat = lat2 - lat1

  const aLat = Math.pow(Math.sin(diffLat / 2), 2)
  const aLon = Math.pow(Math.sin(diffLon / 2), 2)

  const a = aLat + Math.cos(lat1) * Math.cos(lat2) * aLon
  const c = 2 * Math.asin(Math.sqrt(a))

  const distance = EARTH_RADIUS_M * c
  return roundToNDecimals(distance, 2)
}

/**
 * Compute the geographical center of the given points
 *
 * This consists of finding the centroid of a set of points
 * in a sphere.
 * Note this assumes the Earth is a perfect sphere, which is not,
 * but the approximation should be good enough.
 *
 * @param {Array<import("../types").Coordinates>} coordinates - The geo points
 * @returns {import("../types").Coordinates} The center point
 */
export const computeSphericalCenter = coordinates => {
  if (coordinates.length < 1) {
    return null
  }
  if (coordinates.length === 1) {
    return coordinates[0]
  }
  let totalX = 0
  let totalY = 0
  let totalZ = 0

  for (const coord of coordinates) {
    let lon = degreesToRadians(coord.lon)
    let lat = degreesToRadians(coord.lat)

    // Convert spherical coordinates to Cartesian coordinates
    let x = Math.cos(lat) * Math.cos(lon)
    let y = Math.cos(lat) * Math.sin(lon)
    let z = Math.sin(lat)

    totalX += x
    totalY += y
    totalZ += z
  }

  const avgX = totalX / coordinates.length
  const avgY = totalY / coordinates.length
  const avgZ = totalZ / coordinates.length

  // Don't forget to convert Cartesian coordinates back to spherical
  const centralLon = radiansToDegrees(Math.atan2(avgY, avgX))
  const hyp = Math.sqrt(avgX * avgX + avgY * avgY)
  const centralLat = radiansToDegrees(Math.atan2(avgZ, hyp))
  return {
    lat: roundToNDecimals(centralLat, 13),
    lon: roundToNDecimals(centralLon, 13)
  }
}

/**
 * Compute the longitude delta from a distance, in meters.
 *
 * This requires the latitude: we want to compute the horizontal delta
 * on the Earth surface. As it is a sphere (kind of), this delta won't be
 * the same depending on whether it is on the equator (min variation)
 * or on the poles (max variation), for instance.
 *
 * @param {number} latitude - The latitude
 * @param {number} distance - The distance in meters
 * @returns {number} the longitude delta degrees
 */
export const deltaLongitude = (latitude, distance) => {
  const phi = degreesToRadians(latitude)
  const deltaLambda = distance / (EARTH_RADIUS_M * Math.cos(phi))

  return roundToNDecimals(radiansToDegrees(deltaLambda), 13)
}

/**
 * Compute the latitude delta from a distance, in meters.
 *
 * The reasoning is rather simple: there are 360° of latitudes of same distance.
 * Then, it consists of computing 1 degree distance, and divide the
 * given distance by this value.
 *
 * @param {number} distance - The distance in meters
 * @returns {number} The delta latitude degrees
 */
export const deltaLatitude = distance => {
  const distOneLatDegree = EARTH_CIRCUMFERENCE_M / 360 // 111 319 meters per degree
  const deltaLat = distance / distOneLatDegree
  return roundToNDecimals(deltaLat, 13)
}
