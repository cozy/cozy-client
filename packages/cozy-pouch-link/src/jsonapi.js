export const normalizeDoc = (doc, doctype) => {
  const id = doc._id || doc.id
  return { id, _id: id, _type: doctype, ...doc }
}

export const fromPouchResult = (res, isArray, doctype) => {
  if (isArray) {
    const docs = res.rows || res.docs
    const offset = res.offset || 0
    return {
      data: docs.map(doc => normalizeDoc(doc, doctype)),
      meta: { count: docs.length },
      skip: offset,
      next: offset + docs.length <= res.total_rows
    }
  } else {
    return {
      data: normalizeDoc(res, doctype)
    }
  }
}
