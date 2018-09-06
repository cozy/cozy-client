import Association from './Association'

export const dehydrateDoc = document => {
  const dehydrated = {}
  Object.entries(document).forEach(([key, value]) => {
    if (!(value instanceof Association)) {
      dehydrated[key] = value
    } else if (value.raw) {
      dehydrated[key] = value.raw
    }
  })
  return dehydrated
}

export const associationsFromModel = model => {
  const relationships = model.relationships || {}
  return Object.entries(relationships).map(([name, relationship]) => {
    const { type, doctype, query } = relationship
    return {
      name,
      type,
      doctype,
      query
    }
  })
}

export const responseToRelationship = response => ({
  data: response.data.map(d => ({ _id: d._id, _type: d._type })),
  meta: response.meta,
  next: response.next,
  skip: response.skip
})
