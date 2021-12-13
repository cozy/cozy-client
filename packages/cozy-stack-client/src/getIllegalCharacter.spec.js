import { getIllegalCharacters } from './getIllegalCharacter'

describe('getIllegalCharacters', () => {
  it('should return empty string when no illegal characters found', () => {
    const name =
      'Valid file name with #@&"\'()§è!çà)-°_^¨*$€ù%`£=+:;.,?∞…÷≠≤<>•ë“‘{¶«Çø}æê®†Úºîœπ‡Ò∂ƒﬁÌÏÈ¬µ‹≈©◊ß~ '
    expect(getIllegalCharacters(name)).toEqual('')
  })

  it('should return illegal characters split with spaces when illegal characters found', () => {
    const name = 'Invalid file name with / and / and \x00 and \n and \r'
    expect(getIllegalCharacters(name)).toEqual('/ / \x00 \n \r')
  })

  it('should return illegal characters split with spaces when / found', () => {
    const name = 'Invalid file name with /'
    expect(getIllegalCharacters(name)).toEqual('/')
  })

  it('should return illegal characters split with spaces when \x00 found', () => {
    const name = 'Invalid file name with \x00'
    expect(getIllegalCharacters(name)).toEqual('\x00')
  })

  it('should return illegal characters split with spaces when \n found', () => {
    const name = 'Invalid file name with \n'
    expect(getIllegalCharacters(name)).toEqual('\n')
  })

  it('should return illegal characters split with spaces when \r found', () => {
    const name = 'Invalid file name with \r'
    expect(getIllegalCharacters(name)).toEqual('\r')
  })
})
