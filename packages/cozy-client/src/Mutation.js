export const create = doc => client => client.collection(doc._type).create(doc)
export const update = doc => client => client.collection(doc._type).update(doc)
export const destroy = doc => client =>
  client.collection(doc._type).destroy(doc)
