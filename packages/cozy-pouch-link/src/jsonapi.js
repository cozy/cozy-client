import { generateWebLink } from 'cozy-client'

const normalizeDocs = (docs, doctype, client) => {
  for (let i = docs.length; i >= 0; i--) {
    const doc = docs[i]
    if (!doc) {
      docs.splice(i, 1)
      continue
    }
    normalizeDoc(doc, doctype, client)
  }
}

export const normalizeDoc = (doc, doctype, client) => {
  const id = doc._id || doc.id
  const _rev = doc.rev || doc._rev
  doc.id = id
  doc._id = id
  doc._rev = _rev
  doc._type = doctype

  if (doc.relationships) {
    doc.relationships.referenced_by = doc.referenced_by
  } else {
    doc.relationships = {
      referenced_by: doc.referenced_by
    }
  }
  if (doc.rev) {
    delete doc.rev
  }

  if (doctype === 'io.cozy.apps') {
    normalizeAppsLinks(doc, doctype, client)
  }

  return doc
}

const normalizeAppsLinks = (docRef, doctype, client) => {
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
    normalizeDocs(docs, doctype)

    const result = {
      data: docs,
      meta: { count: docs.length },
      skip: offset,
      next: offset + docs.length < res.total_rows || docs.length >= res.limit
    }
    return result
  } else {
    return {
      data: Array.isArray(res)
        // FIXME
        ? res.map(doc => normalizeDoc(doc, doctype, client))
        // FIXME
        : normalizeDoc(res, doctype, client)
    }
  }
}
