import CozyClient, { generateWebLink } from 'cozy-client'
import omit from 'lodash/omit'
import startsWith from 'lodash/startsWith'
import { getCozyPouchData } from './db/helpers'

/**
 * Normalize several PouchDB document
 *
 * @param {CozyClient} client - The CozyClient instance
 * @param {string} doctype - The document's doctype
 * @param {Array<import('./CozyPouchLink').CozyPouchDocument>} docs - The documents to normalize
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
 * @param {import('./CozyPouchLink').CozyPouchDocument} doc - The document to normalize
 */
export const normalizeDoc = (client, doctype, doc) => {
  const id = doc._id || doc.id
  doc.id = id
  doc._id = id
  doc._rev = doc._rev || doc.rev
  doc._type = doctype

  if (doc.referenced_by) {
    // TODO: should we remove referenced_by at the doc root?
    // For now, we keep it for safety
    doc.relationships = {
      ...doc.relationships,
      referenced_by: {
        links: undefined,
        data: doc.referenced_by
      }
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

  // Handle special case for docs with `cozyPouchData`
  const cozyPouchData = getCozyPouchData(res)
  if (cozyPouchData) {
    return { data: cozyPouchData }
  }
  if (withRows) {
    const docs = res.rows ? res.rows.map(row => row.doc) : res.docs
    const offset = res.offset || 0
    const next =
      offset + docs.length < res.total_rows || docs.length >= res.limit
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

export const sanitizeJsonApi = doc => {
  const docWithoutType = sanitized(doc)
  const sanitizedDoc = omit(docWithoutType, ['attributes', 'meta'])
  return sanitizedDoc
}
