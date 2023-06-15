import Polyglot from 'node-polyglot'

import { getEmojiByCountry } from '../emojiCountry'

const polyglots = {}
const langs = ['fr', 'en']
for (const lang of langs) {
  let locales = {}
  try {
    locales = require(`./${lang}.json`)
  } catch (e) {
    // eslint-disable-line no-empty-block
  }
  const polyglot = new Polyglot()
  polyglot.extend(locales)
  polyglots[lang] = polyglot
}

/**
 * @param {string} lang - fr, en, etc
 * @returns {(label: string, opts?: {country?: string, smart_count?: number}) => string}
 */
const getBoundT = lang => {
  const polyglot = polyglots[lang] || polyglots['en']
  const t = polyglot.t.bind(polyglot)

  return (label, opts = {}) => {
    const newOpts = {
      ...opts,
      smart_count: opts?.smart_count || 1
    }
    const emojiCountry = getEmojiByCountry(opts?.country, t)

    return emojiCountry
      ? `${t(label, newOpts)} ${emojiCountry}`
      : t(label, newOpts)
  }
}

export { getBoundT }
