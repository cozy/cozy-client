import Polyglot from 'node-polyglot'

import enLocale from './en.json'
import frLocale from './fr.json'

const locales = { en: enLocale, fr: frLocale }

const polyglots = {}
const langs = ['fr', 'en']
for (const lang of langs) {
  const polyglot = new Polyglot()
  polyglot.extend(locales[lang])
  polyglots[lang] = polyglot
}

/**
 * @param {string} lang - fr, en, etc
 * @returns {{ t: Function, polyglot: object, lang: string }}
 */
export const getLocalizer = lang => {
  const polyglot = polyglots[lang] || polyglots['en']
  const t = polyglot.t.bind(polyglot)
  return { t, polyglot, lang }
}
