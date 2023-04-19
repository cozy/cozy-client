import { useState, useEffect } from 'react'
import Registry from '../registry'
import CozyClient from '../CozyClient'

/**
 * Returns all apps in maintenance
 *
 * @param {CozyClient} client CozyClient instance
 *
 * @returns {import("../types").AppsDoctype[]} An array with all apps in maintenance
 */
const useAppsInMaintenance = client => {
  const [appsInMaintenance, setAppsInMaintenance] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const registry = new Registry({
        client
      })

      const newAppsInMaintenance = await registry.fetchAppsInMaintenance()
      setAppsInMaintenance(newAppsInMaintenance || [])
    }
    fetchData()
  }, [client])

  return appsInMaintenance
}

export default useAppsInMaintenance
