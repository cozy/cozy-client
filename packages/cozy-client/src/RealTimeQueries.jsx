import { memo, useEffect } from 'react'
import useClient from './hooks/useClient'
import {
  dispatchCreate,
  dispatchDelete,
  dispatchUpdate
} from './store/realtime'

/**
 * Component that subscribes to a doctype changes and keep the
 * internal store updated.
 *
 * @param  {object} options - Options
 * @param  {import("./types").Doctype} options.doctype - The doctype to watch
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

    const subscribe = async () => {
      await realtime.subscribe('created', doctype, data =>
        dispatchCreate(client, doctype, data)
      )
      await realtime.subscribe('updated', doctype, data =>
        dispatchUpdate(client, doctype, data)
      )
      await realtime.subscribe('deleted', doctype, data =>
        dispatchDelete(client, doctype, data)
      )
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
