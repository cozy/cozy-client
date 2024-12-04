import { Q } from '../queries/dsl'
import CozyClient from '../CozyClient'

const buildFileByIdQuery = id => ({
  definition: () => Q('io.cozy.files').getById(id),
  options: {
    as: `io.cozy.files/${id}`,
    singleDocData: true,
    fetchPolicy: CozyClient.fetchPolicies.olderThan(30 * 1000)
  }
})

/**
 * Ensures existence of `path` inside the io.cozy.files document
 *
 * @public
 * @param {import("../types").IOCozyFile} couchDBDoc - object representing the document
 * @param {object} options Options
 * @param {string} [options.doctype] - Doctype of the document
 * @param {CozyClient} [options.client] - CozyClient instance
 *
 * @returns {Promise<import("../types").CozyClientDocument>} full normalized document
 */
export const ensureFilePath = async (couchDBDoc, options = {}) => {
  if (couchDBDoc.path) return couchDBDoc

  const parentQuery = buildFileByIdQuery(couchDBDoc.dir_id)
  const parentResult = await options.client.fetchQueryAndGetFromState({
    definition: parentQuery.definition(),
    options: parentQuery.options
  })

  if (!parentResult.data || !parentResult.data.path)
    throw new Error(
      `Could not define a file path for ${couchDBDoc._id || couchDBDoc.id}`
    )
  const path = parentResult.data.path + '/' + couchDBDoc.name
  return { path, ...couchDBDoc }
}
