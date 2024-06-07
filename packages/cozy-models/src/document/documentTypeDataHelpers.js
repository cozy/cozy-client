import { themesList } from './documentTypeData'

/**
 * @param {import("../types").QualificationAttributes} item - Qualification item
 * @returns {import("../types").Theme|undefined}
 */
const findDefaultItemTheme = item => {
  return themesList.find(
    theme => theme.defaultItems && theme.defaultItems.includes(item.label)
  )
}

/**
 * @param {import("../types").QualificationAttributes} item - Qualification item
 * @returns {import("../types").Theme|undefined}
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

/**
 * Check if a qualification is a note
 *
 * @param {import("../types").QualificationAttributes} item - Qualification item
 * @returns {boolean}
 */
export const isQualificationNote = item => {
  return item.label.toLowerCase().startsWith('note_')
}
