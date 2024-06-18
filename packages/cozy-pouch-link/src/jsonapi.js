export const normalizeDoc = (doc, doctype) => {
  const id = doc._id || doc.id

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
    cozyFromPouch: true
  }
  if (normalizedDoc.rev) {
    delete normalizedDoc.rev
  }
  return normalizedDoc
}

const filterDeletedDocumentsFromRows = doc => !!doc

export const fromPouchResult = (res, withRows, doctype) => {
  if (withRows) {
    const docs = res.rows
      ? res.rows.map(row => row.doc).filter(filterDeletedDocumentsFromRows)
      : res.docs
    const offset = res.offset || 0

    return {
      data: docs.map(doc => normalizeDoc(doc, doctype)),
      meta: { count: docs.length },
      skip: offset,
      next: offset + docs.length < res.total_rows || docs.length >= res.limit
    }
  } else {
    return {
      data: Array.isArray(res)
        ? res.map(doc => normalizeDoc(doc, doctype))
        : normalizeDoc(res, doctype)
    }
  }
}
