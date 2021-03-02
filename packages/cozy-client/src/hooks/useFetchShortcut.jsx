import { useState, useEffect } from 'react'

const useFetchShortcut = (client, id) => {
  const [shortcutInfos, setShortcutInfos] = useState(null)
  const [shortcutImg, setShortcutImg] = useState(null)
  const [fetchStatus, setFetchStatus] = useState('idle')
  useEffect(() => {
    const fetchData = async () => {
      setFetchStatus('loading')
      try {
        const shortcutInfosResult = await client
          .getStackClient()
          .fetchJSON('GET', `/shortcuts/${id}`)
        const shortcutRemoteUrl = new URL(
          shortcutInfosResult.data.attributes.url
        )

        const imgUrl = `${client.getStackClient().uri}/bitwarden/icons/${
          shortcutRemoteUrl.host
        }/icon.png`

        setShortcutImg(imgUrl)
        setShortcutInfos(shortcutInfosResult)
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
