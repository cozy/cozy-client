import { keepDocWitHighestRev } from './helpers'

describe('keepDocWitHighestRev', () => {
  it('should return null if no docs', () => {
    expect(keepDocWitHighestRev([])).toBeNull()
    expect(keepDocWitHighestRev(undefined)).toBeNull()
  })

  it('should return the single document when only one is provided', () => {
    const doc = { _rev: '1-a', name: 'Single Doc' }
    const docs = [doc]
    expect(keepDocWitHighestRev(docs)).toBe(doc)
  })

  it('should return the document with the highest revision prefix', () => {
    const docs = [
      { _rev: '1-a', name: 'Doc 1' },
      { _rev: '3-c', name: 'Doc 3' },
      { _rev: '2-b', name: 'Doc 2' }
    ]
    expect(keepDocWitHighestRev(docs)).toEqual(docs[1])
  })

  it('should work correctly even if the documents are unsorted', () => {
    const docs = [
      { _rev: '5-zzz', name: 'Doc 5' },
      { _rev: '2-aaa', name: 'Doc 2' },
      { _rev: '10-xxx', name: 'Doc 10' },
      { _rev: '7-bbb', name: 'Doc 7' }
    ]
    expect(keepDocWitHighestRev(docs)).toEqual(docs[2])
  })
})
