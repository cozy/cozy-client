import { useState, useEffect } from 'react'
import { Q } from '../queries/dsl'

const useCapabilities = client => {
  const [capabilities, setCapabilities] = useState()
  const [fetchStatus, setFetchStatus] = useState('idle')
  useEffect(() => {
    const fetchData = async () => {
      setFetchStatus('loading')
      try {
        const capabilitiesResult = await client.query(
          Q('io.cozy.settings').getById('capabilities')
        )

        setCapabilities(capabilitiesResult)
        setFetchStatus('loaded')
      } catch (e) {
        setFetchStatus('failed')
      }
    }
    fetchData()
  }, [client])

  return {
    capabilities,
    fetchStatus
  }
}

export default useCapabilities
