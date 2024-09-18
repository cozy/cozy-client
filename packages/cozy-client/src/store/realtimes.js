import { Mutations } from '../queries/dsl'
import { receiveMutationResult } from './mutations'

/**
 * Normalizes an object representing a CouchDB document
 *
 * Ensures existence of `_type`
 *
 * @public
 * @param {import("../types").CouchDBDocument} couchDBDoc - object representing the document
 * @returns {import("../types").CozyClientDocument} full normalized document
 */
const normalizeDoc = (couchDBDoc, doctype) => {
  return {
    id: couchDBDoc._id,
    _type: doctype,
    ...couchDBDoc
  }
}

/**
 * DispatchChange
 *
 * @param {object} client CozyClient instane
 * @param {import("../types").Doctype} doctype Doctype of the document to update
 * @param {import("../types").CouchDBDocument} couchDBDoc Document to update
 * @param {import("../types").Mutation} mutationDefinitionCreator Mutation to apply
 */
const dispatchChange = (
  client,
  doctype,
  couchDBDoc,
  mutationDefinitionCreator
) => {
  const data = normalizeDoc(couchDBDoc, doctype)
  const response = {
    data
  }

  const options = {}
  client.dispatch(
    receiveMutationResult(
      client.generateRandomId(),
      response,
      options,
      mutationDefinitionCreator(data)
    )
  )
}

/**
 * Dispatches a create action for a document to update CozyClient store from realtime callbacks.
 *
 * @param {object} client - CozyClient instance
 * @param {import("../types").Doctype} doctype - Doctype of the document to create
 * @param {import("../types").CouchDBDocument} couchDBDoc - Document to create
 */
export const dispatchCreate = (client, doctype, couchDBDoc) => {
  dispatchChange(client, doctype, couchDBDoc, Mutations.createDocument)
}

/**
 * Dispatches a update action for a document to update CozyClient store from realtime callbacks.
 *
 * @param {object} client - CozyClient instance
 * @param {import("../types").Doctype} doctype - Doctype of the document to create
 * @param {import("../types").CouchDBDocument} couchDBDoc - Document to create
 */
export const dispatchUpdate = (client, doctype, couchDBDoc) => {
  dispatchChange(client, doctype, couchDBDoc, Mutations.updateDocument)
}

/**
 * Dispatches a delete action for a document to update CozyClient store from realtime callbacks.
 *
 * @param {object} client - CozyClient instance
 * @param {import("../types").Doctype} doctype - Doctype of the document to create
 * @param {import("../types").CouchDBDocument} couchDBDoc - Document to create
 */
export const dispatchDelete = (client, doctype, couchDBDoc) => {
  dispatchChange(
    client,
    doctype,
    { ...couchDBDoc, _deleted: true },
    Mutations.deleteDocument
  )
}
