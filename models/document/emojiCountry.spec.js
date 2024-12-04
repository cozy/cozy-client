import { getEmojiByCountry } from './emojiCountry'

describe('getEmojiByCountry', () => {
  const mockT = jest.fn(key => key)
  it('should return fr flag', () => {
    const res = getEmojiByCountry('fr', mockT)

    expect(res).toBe('🇫🇷')
  })
  it('should return "stranger" string (key: country.stranger)', () => {
    const mockT = jest.fn(key => key)
    const res = getEmojiByCountry('stranger', mockT)

    expect(res).toBe('country.stranger')
  })
  it('should return "undefined" if the country is not "fr"', () => {
    const res = getEmojiByCountry('en', mockT)

    expect(res).toBe(undefined)
  })
  it('should return "undefined" if the country is undefined', () => {
    const res = getEmojiByCountry(undefined, mockT)

    expect(res).toBe(undefined)
  })
})
