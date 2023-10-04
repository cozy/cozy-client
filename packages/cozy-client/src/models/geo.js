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

const degreesToRadians = degrees => {
  return (degrees * Math.PI) / 180
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

  // Radius of earth is 6371 km
  const distance = 6371 * 1000 * c
  return Math.round(distance * 100) / 100
}
