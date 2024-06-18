import { fromPouchResult, normalizeDoc } from './jsonapi'

const BART_FIXTURE = {
  id: 1,
  doc: {
    _id: 1,
    name: 'Bart'
  }
}
const LISA_FIXTURE = {
  id: 2,
  doc: {
    _id: 2,
    name: 'Lisa'
  }
}
const MARGE_FIXTURE = {
  id: 3,
  doc: {
    _id: 3,
    name: 'Marge'
  }
}
const DELETED_DOC_FIXTURE = {
  id: 4,
  delete: true
}

describe('doc normalization', () => {
  it('keeps the highest between rev and _rev and removes the rev attribute', () => {
    const normalized = normalizeDoc(
      {
        _id: 1234,
        _rev: '3-deadbeef',
        rev: '4-cffee',
        firstName: 'Bobba',
        lastName: 'Fett'
      },
      'io.cozy.contacts'
    )
    expect(normalized).toEqual({
      _id: 1234,
      id: 1234,
      _rev: '4-cffee',
      _type: 'io.cozy.contacts',
      cozyFromPouch: true,
      firstName: 'Bobba',
      lastName: 'Fett',
      relationships: {
        referenced_by: undefined
      }
    })
  })
})

describe('jsonapi', () => {
  it('should return a response understandable by cozy-client', () => {
    const res = {
      rows: [BART_FIXTURE, LISA_FIXTURE, MARGE_FIXTURE, DELETED_DOC_FIXTURE]
    }
    const normalized = fromPouchResult(res, true, 'io.cozy.simpsons')
    expect(normalized.data[0].name).toBe('Bart')
    expect(normalized.data[0].id).toBe(1)
    expect(normalized.data[0]._id).toBe(1)
    expect(normalized.data[0]._type).toBe('io.cozy.simpsons')

    expect(normalized.data[1].name).toBe('Lisa')
    expect(normalized.data[1].id).toBe(2)
    expect(normalized.data[1]._id).toBe(2)

    expect(normalized.data[2].name).toBe('Marge')
    expect(normalized.data[2].id).toBe(3)
    expect(normalized.data[2]._id).toBe(3)
  })

  describe('pagination', () => {
    it('has no next when there is no pagination information', () => {
      const res = { rows: [BART_FIXTURE] }
      const normalized = fromPouchResult(res, true, 'io.cozy.simpsons')
      expect(normalized.next).toBe(false)
    })

    it('paginates when there is a total_rows field greater than the rows number', () => {
      const res = { rows: [BART_FIXTURE], total_rows: 3 }
      const normalized = fromPouchResult(res, true, 'io.cozy.simpsons')
      expect(normalized.next).toBe(true)
    })

    it("does't paginates when there is a total_rows field equal to the rows number", () => {
      const res = {
        rows: [BART_FIXTURE, MARGE_FIXTURE, LISA_FIXTURE],
        total_rows: 3
      }
      const normalized = fromPouchResult(res, true, 'io.cozy.simpsons')
      expect(normalized.next).toBe(false)
    })

    it('paginates when there is a limit field', () => {
      const res = { rows: [BART_FIXTURE, LISA_FIXTURE], limit: 2 }
      const normalized = fromPouchResult(res, true, 'io.cozy.simpsons')
      expect(normalized.next).toBe(true)

      const lastRes = { rows: [MARGE_FIXTURE], limit: 2 }
      const lastNormalized = fromPouchResult(lastRes, true, 'io.cozy.simpsons')
      expect(lastNormalized.next).toBe(false)
    })
  })
})
