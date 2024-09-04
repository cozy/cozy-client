import { useState, useEffect } from 'react'

import { Q } from '../queries/dsl'
import CozyClient from '../CozyClient'

const DEFAULT_CACHE_TIMEOUT_QUERIES = 10 * 60 * 1000 // 10 minutes

const useFetchShortcut = (client, id) => {
  const [shortcutInfos, setShortcutInfos] = useState(null)
  const [shortcutImg, setShortcutImg] = useState(null)
  const [fetchStatus, setFetchStatus] = useState('idle')
  useEffect(() => {
    const fetchData = async () => {
      setFetchStatus('loading')
      try {
        const shortcutInfosResult = await client.fetchQueryAndGetFromState({
          definition: Q('io.cozy.files.shortcuts').getById(id),
          options: {
            as: `io.cozy.files.shortcuts/${id}`,
            fetchPolicy: CozyClient.fetchPolicies.olderThan(
              DEFAULT_CACHE_TIMEOUT_QUERIES
            ),
            singleDocData: true
          }
        })

        const targetApp = shortcutInfosResult?.data?.metadata?.target?.app
        if (targetApp) {
          const targetAppIconUrl = await client.getStackClient().getIconURL({
            type: 'app',
            slug: targetApp,
            priority: 'stack'
          })
          setShortcutImg(targetAppIconUrl)
        } else {
          const shortcutRemoteUrl = new URL(shortcutInfosResult.data.url)

          const imgUrl = `${client.getStackClient().uri}/bitwarden/icons/${
            shortcutRemoteUrl.host
          }/icon.png`

          setShortcutImg(imgUrl)
        }
        setShortcutInfos({ data: shortcutInfosResult.data })
        setFetchStatus('loaded')
      } catch (e) {
        setFetchStatus('failed')
      }
    }
    fetchData()
  }, [client, id])

  return {
    shortcutInfos,
    shortcutImg,
    fetchStatus
  }
}

export default useFetchShortcut
