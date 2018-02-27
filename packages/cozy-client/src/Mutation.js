export const create = doc => link => link.collection(doc._type).create(doc)
export const update = doc => link => link.collection(doc._type).update(doc)
export const destroy = doc => link => link.collection(doc._type).destroy(doc)
