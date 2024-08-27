import { PouchLocalStorage } from './localStorage'

describe('LocalStorage', () => {
  describe('Type assertion', () => {
    it('should throw if setItem method is missing', () => {
      expect(() => {
        new PouchLocalStorage({
          getItem: jest.fn(),
          removeItem: jest.fn()
        })
      }).toThrow(
        'Provided storageEngine is missing the following methods: setItem'
      )
    })

    it('should throw if getItem method is missing', () => {
      expect(() => {
        new PouchLocalStorage({
          setItem: jest.fn(),
          removeItem: jest.fn()
        })
      }).toThrow(
        'Provided storageEngine is missing the following methods: getItem'
      )
    })

    it('should throw if removeItem method is missing', () => {
      expect(() => {
        new PouchLocalStorage({
          getItem: jest.fn(),
          setItem: jest.fn()
        })
      }).toThrow(
        'Provided storageEngine is missing the following methods: removeItem'
      )
    })

    it('should throw if multiple methods are missing', () => {
      expect(() => {
        new PouchLocalStorage({
          getItem: jest.fn()
        })
      }).toThrow(
        'Provided storageEngine is missing the following methods: setItem, removeItem'
      )
    })
  })
})
