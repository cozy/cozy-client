import { generateWebLink } from 'cozy-client'

export const normalizeDoc = (doc, doctype, client) => {
  const id = doc._id || doc.id

  const { relationships, referenced_by } = doc

  // PouchDB sends back .rev attribute but we do not want to
  // keep it on the server. It is potentially higher than the
  // _rev.
  const _rev = doc.rev || doc._rev
  const normalizedDoc = {
    ...doc,
    id,
    _id: id,
    _rev,
    _type: doctype,
    cozyFromPouch: true,
    relationships: {
      ...relationships,
      referenced_by
    }
  }
  if (normalizedDoc.rev) {
    delete normalizedDoc.rev
  }

  normalizeLinks(normalizedDoc, doctype, client)

  return normalizedDoc
}

const normalizeLinks = (docRef, doctype, client) => {
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

const filterDeletedDocumentsFromRows = doc => !!doc

export const fromPouchResult = (res, withRows, doctype, client) => {
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
    const docs = res.rows
      ? res.rows.map(row => row.doc).filter(filterDeletedDocumentsFromRows)
      : res.docs
    const offset = res.offset || 0

    return {
      data: docs.map(doc => normalizeDoc(doc, doctype, client)),
      meta: { count: docs.length },
      skip: offset,
      next: offset + docs.length < res.total_rows || docs.length >= res.limit
    }
  } else {
    return {
      data: Array.isArray(res)
        ? res.map(doc => normalizeDoc(doc, doctype, client))
        : normalizeDoc(res, doctype, client)
    }
  }
}
