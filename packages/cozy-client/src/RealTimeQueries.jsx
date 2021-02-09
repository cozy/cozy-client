import { memo, useEffect } from 'react'
import useClient from './hooks/useClient'
import { file as fileModel } from './models'
import { Mutations } from './queries/dsl'
import { receiveMutationResult } from './store'

const dispatchChange = (client, document, mutationDefinitionCreator) => {
  const response = {
    data: fileModel.normalize(document)
  }

  const options = {}
  client.dispatch(
    receiveMutationResult(
      client.generateId(),
      response,
      options,
      mutationDefinitionCreator(document)
    )
  )
}

/**
 * Component that subscribes to a doctype changes and keep the
 * internal store updated.
 *
 *
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

    const dispatchCreate = document => {
      dispatchChange(client, document, Mutations.createDocument)
    }
    const dispatchUpdate = document => {
      dispatchChange(client, document, Mutations.updateDocument)
    }
    const dispatchDelete = document => {
      dispatchChange(
        client,
        { ...document, _deleted: true },
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
