import { memo, useEffect } from 'react'
import useClient from './hooks/useClient'
import { Mutations } from './queries/dsl'
import { receiveMutationResult } from './store'
import CozyClient from './CozyClient'

/**
 * Normalizes an object representing a CouchDB document
 *
 * Ensures existence of `_type`
 *
 * @public
 * @param {import("./types").CouchDBDocument} couchDBDoc - object representing the document
 * @returns {import("./types").CozyClientDocument} full normalized document
 */
const normalizeDoc = (couchDBDoc, doctype, customNormalization) => {
  const normalizedDoc = customNormalization(couchDBDoc)
  return {
    id: normalizedDoc._id,
    _type: doctype,
    ...normalizedDoc
  }
}

/**
 * DispatchChange
 *
 * @param {CozyClient} client CozyClient instane
 * @param {import("./types").Doctype} doctype Doctype of the document to update
 * @param {import("./types").CouchDBDocument} couchDBDoc Document to update
 * @param {import("./types").Mutation} mutationDefinitionCreator Mutation to apply
 */
const dispatchChange = (
  client,
  doctype,
  couchDBDoc,
  mutationDefinitionCreator,
  customNormalization
) => {
  const data = normalizeDoc(couchDBDoc, doctype, customNormalization)
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
 * Component that subscribes to a doctype changes and keep the
 * internal store updated.
 *
 * @param {object} options - Options
 * @param {import("./types").Doctype} options.doctype - The doctype to watch
 * @param {Function} options.customNormalization - Function to call before dispatching the change
 * @returns {null} The component does not display anything.
 */
const RealTimeQueries = ({ doctype, customNormalization }) => {
  const client = useClient()

  useEffect(() => {
    const realtime = client.plugins.realtime

    if (!realtime) {
      throw new Error(
        'You must include the realtime plugin to use RealTimeQueries'
      )
    }

    const dispatchCreate = couchDBDoc => {
      dispatchChange(
        client,
        doctype,
        couchDBDoc,
        Mutations.createDocument,
        customNormalization
      )
    }
    const dispatchUpdate = couchDBDoc => {
      dispatchChange(
        client,
        doctype,
        couchDBDoc,
        Mutations.updateDocument,
        customNormalization
      )
    }
    const dispatchDelete = couchDBDoc => {
      dispatchChange(
        client,
        doctype,
        { ...couchDBDoc, _deleted: true },
        Mutations.deleteDocument,
        customNormalization
      )
    }

    const subscribe = async () => {
      await realtime.subscribe('created', doctype, dispatchCreate)
      await realtime.subscribe('updated', doctype, dispatchUpdate)
      await realtime.subscribe('deleted', doctype, dispatchDelete)
    }
    subscribe()

    return () => {
      realtime.unsubscribe('created', doctype, dispatchCreate)
      realtime.unsubscribe('updated', doctype, dispatchUpdate)
      realtime.unsubscribe('deleted', doctype, dispatchDelete)
    }
  }, [client, customNormalization, doctype])

  return null
}

export default memo(RealTimeQueries)
