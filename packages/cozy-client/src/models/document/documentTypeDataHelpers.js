import { Theme, QualificationAttributes } from '../../types'

import { themesList } from './documentTypeData'

/**
 * @param {QualificationAttributes} item - Qualification item
 * @returns {Theme|undefined}
 */
const findDefaultItemTheme = item => {
  return themesList.find(
    theme => theme.defaultItems && theme.defaultItems.includes(item.label)
  )
}

/**
 * @param {QualificationAttributes} item - Qualification item
 * @returns {Theme|undefined}
 */
export const getThemeByItem = item => {
  const defaultTheme = findDefaultItemTheme(item)
  if (defaultTheme) {
    return defaultTheme
  }
  return themesList.find(theme => {
    return theme.items.some(it => it.label === item.label)
  })
}
