import CozyClient from '../../CozyClient'

const ALL_DOCTYPES_ENDPOINT = '/data/_all_doctypes'

/**
 * Fetches the list of all doctypes in the current instance.
 *
 * @param {CozyClient} client - The CozyClient instance used to make the request.
 * @returns {Promise<Array<string>>} - A promise that resolves to an array of strings, each representing a doctype.
 */
export const listAllDoctypes = async client => {
  const doctypesList = await client.stackClient.fetchJSON(
    'GET',
    ALL_DOCTYPES_ENDPOINT
  )
  return doctypesList
}
