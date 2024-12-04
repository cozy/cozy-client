import Polyglot from 'node-polyglot'

import enLocale from './en.json'
import frLocale from './fr.json'
import { getEmojiByCountry } from '../../country/countries'

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
 * @returns {(label: string, opts?: {country?: string, smart_count?: number}) => string}
 */
const getBoundT = lang => {
  const t = getLocalizer(lang)

  return (label, opts = {}) => {
    const newOpts = {
      ...opts,
      smart_count: opts?.smart_count || 1
    }
    const country = opts?.country

    const emojiCountry =
      country !== 'foreign' ? getEmojiByCountry(country) : null
    const strangerLabel = country === 'foreign' ? t('country.foreign') : null

    return emojiCountry || strangerLabel
      ? `${t(label, newOpts)} ${emojiCountry || strangerLabel}`
      : t(label, newOpts)
  }
}

/**
 * @param {string} lang - fr, en, etc
 * @returns {Function} - localization function
 */
const getLocalizer = lang => {
  const polyglot = polyglots[lang] || polyglots['en']
  const t = polyglot.t.bind(polyglot)
  return t
}

export { getBoundT, getLocalizer }
