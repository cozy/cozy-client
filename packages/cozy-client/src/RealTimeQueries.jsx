import { memo, useEffect } from 'react'
import useClient from './hooks/useClient'
import { Mutations } from './queries/dsl'
import { receiveMutationResult } from './store'
import CozyClient from './CozyClient'
import { CouchDBDocument, CozyClientDocument, Doctype, Mutation } from './types'

/**
 * Normalizes an object representing a CouchDB document
 *
 * Ensures existence of `_type`
 *
 * @public
 * @param {CouchDBDocument} couchDBDoc - object representing the document
 * @returns {CozyClientDocument} full normalized document
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
 * @param {CozyClient} client CozyClient instane
 * @param {Doctype} doctype Doctype of the document to update
 * @param {CouchDBDocument} couchDBDoc Document to update
 * @param {Mutation} mutationDefinitionCreator Mutation to apply
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
 * Component that subscribes to a doctype changes and keep the
 * internal store updated.
 *
 * @param  {object} options - Options
 * @param  {Doctype} options.doctype - The doctype to watch
 * @returns {null} The component does not display anything.
 */
const RealTimeQueries = ({ doctype }) => {
  const client = useClient()

  useEffect(() => {
    const realtime = client.plugins.realtime

    if (!realtime) {
      throw new Error(
        'You must include the realtime plugin to use RealTimeQueries'
      )
    }

    const dispatchCreate = couchDBDoc => {
      dispatchChange(client, doctype, couchDBDoc, Mutations.createDocument)
    }
    const dispatchUpdate = couchDBDoc => {
      dispatchChange(client, doctype, couchDBDoc, Mutations.updateDocument)
    }
    const dispatchDelete = couchDBDoc => {
      dispatchChange(
        client,
        doctype,
        { ...couchDBDoc, _deleted: true },
        Mutations.deleteDocument
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
  }, [client, doctype])

  return null
}

export default memo(RealTimeQueries)
