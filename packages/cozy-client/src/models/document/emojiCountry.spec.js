import { getEmojiByCountry } from './emojiCountry'
import logger from '../../logger'

describe('getEmojiByCountry', () => {
  beforeEach(() => {
    jest.spyOn(logger, 'error').mockImplementation(() => jest.fn())
  })
  afterEach(() => {
    logger.error.mockRestore()
  })

  it('should return French flag', () => {
    const res = getEmojiByCountry('fr')

    expect(res).toBe('🇫🇷')
  })
  it('should return Belgian flag', () => {
    const res = getEmojiByCountry('be')

    expect(res).toBe('🇧🇪')
  })
  it('should return "null" if the country is not ISO 3166-1 alpha-2 string', () => {
    const res = getEmojiByCountry('fra')

    expect(logger.error).toHaveBeenCalledTimes(1)
    expect(res).toBe(null)
  })
  it('should return "null" if the country is undefined', () => {
    const res = getEmojiByCountry(undefined)

    expect(logger.error).not.toHaveBeenCalled()
    expect(res).toBe(null)
  })
})
