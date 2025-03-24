import CozyClient, { generateWebLink } from 'cozy-client'
import omit from 'lodash/omit'
import startsWith from 'lodash/startsWith'

/**
 * Normalize several PouchDB document
 *
 * @param {CozyClient} client - The CozyClient instance
 * @param {string} doctype - The document's doctype
 * @param {Array<import('./CozyPouchLink').CozyClientDocument>} docs - The documents to normalize
 */
export const normalizeDocs = (client, doctype, docs) => {
  for (let i = docs.length; i >= 0; i--) {
    const doc = docs[i]
    if (!doc) {
      docs.splice(i, 1)
      continue
    }
    if (startsWith(doc.id, '_design/')) {
      docs.splice(i, 1)
      continue
    }
    normalizeDoc(client, doctype, doc)
  }
}

/**
 * Normalize a PouchDB document
 * Note we directly modify the objet rather than creating a new one, as it is
 * much more performant. See commit description for details.
 *
 * @param {CozyClient} client - The CozyClient instance
 * @param {string} doctype - The document's doctype
 * @param {import('./CozyPouchLink').CozyClientDocument} doc - The document to normalize
 */
export const normalizeDoc = (client, doctype, doc) => {
  const id = doc._id || doc.id
  doc.id = id
  doc._id = id
  doc._rev = doc._rev || doc.rev
  doc._type = doctype
  if (doc.relationships) {
    doc.relationships.referenced_by = doc.referenced_by
  } else {
    doc.relationships = {
      referenced_by: doc.referenced_by
    }
  }
  if (doc.rev) {
    doc.rev = undefined
  }

  if (doctype === 'io.cozy.apps') {
    normalizeAppsLinks(client, doctype, doc)
  }
}

const normalizeAppsLinks = (client, doctype, docRef) => {
  if (doctype !== 'io.cozy.apps') {
    return
  }

  const webLink = generateWebLink({
    cozyUrl: client.getStackClient().uri,
    slug: docRef.slug,
    subDomainType: client.capabilities.flat_subdomains ? 'flat' : 'nested',
    pathname: '',
    hash: '',
    searchParams: []
  })

  docRef.links = {
    self: `/apps/${docRef.slug}`,
    related: webLink,
    icon: `/apps/${docRef.slug}/icon/${docRef.version}`
  }
}

export const fromPouchResult = ({ res, withRows, doctype, client }) => {
  if (!res) {
    return null
  }

  // Sometimes, queries are transformed by Collections and they call a dedicated
  // cozy-stack route. When this is the case, we want to be able to replicate the same
  // query from cozy-pouch-link. It is not possible as-is because the received data
  // is not the same as the one stored in the Couch database
  // To handle this, we store the received data in the Pouch with a dedicated id and
  // we store the query result in a `cozyPouchData` attribute
  // So when `cozyPouchData` attribute exists, we know that we want to return its content
  // as the result of the query
  if (res.cozyPouchData) {
    return {
      data: res.cozyPouchData
    }
  }
  if (withRows) {
    const docs = res.rows ? res.rows.map(row => row.doc) : res.docs
    const offset = res.offset || 0
    const next = offset + docs.length < res.total_rows || docs.length >= res.limit
    normalizeDocs(client, doctype, docs)

    const result = {
      data: docs,
      meta: { count: docs.length },
      skip: offset,
      next
    }

    return result
  } else {
    Array.isArray(res)
      ? normalizeDocs(client, doctype, res)
      : normalizeDoc(client, doctype, res)
    return {
      data: res
    }
  }
}

export const sanitized = doc => omit(doc, '_type')

/**
 *   We persist in the local Pouch database all the documents that do not
 *   exist on the remote Couch database
 *
 *   Those documents are computed by the cozy-stack then are sent to the
 *   client using JSON-API format containing `attributes` and `meta`
 *   attributes
 *
 *   Then the cozy-stack-client would normalize those documents by spreading
 *   `attributes` and `meta` content into the document's root
 *
 *   So we don't need to store `attributes` and `meta` data into the Pouch
 *   database as their data already exists in the document's root
 *
 *   Note that this is also the case for `links` and `relationships`
 *   attributes, but we don't remove them for now. They are also part of the
 *   JSON-API, but the normalization do not spread them in the document's
 *   root, so we have to check their usefulnes first
 */

export const sanitizeJsonApi = doc => {
  const docWithoutType = sanitized(doc)
  const sanitizedDoc = omit(docWithoutType, ['attributes', 'meta'])
  return sanitizedDoc
}
