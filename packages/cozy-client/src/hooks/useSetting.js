import { useCallback } from 'react'

import { editSettings, getQuery, normalizeSettings } from '../helpers'

import { useMutation } from './useMutation'
import useQuery from './useQuery'

/**
 * Query the cozy-app settings corresponding to the given slug and
 * return:
 * - the value corresponding to the given `key`
 * - the `save()` method that can be used to edit the setting's value
 * - the query that manages the state during the fetching of the setting
 * - the mutation that manages the state during the saving of the setting
 *
 * @param {string} slug - the cozy-app's slug containing the setting (can be 'instance' for global settings)
 * @param {string} key - The name of the setting to retrieve
 * @returns {import("../types").UseSettingReturnValue}
 */
export const useSetting = (slug, key) => {
  const query = getQuery(slug)

  const { data: settingsData, ...settingsQuery } = useQuery(
    query.definition(),
    query.options
  )

  const { mutate, ...mutation } = useMutation()

  const save = useCallback(
    value => {
      const settings = normalizeSettings(settingsData)

      const newSettings = editSettings(slug, settings, key, value)

      return mutate(newSettings)
    },
    [key, mutate, settingsData, slug]
  )

  const settings = normalizeSettings(settingsData)

  return {
    query: settingsQuery,
    value: settings?.[key],
    save,
    mutation
  }
}
