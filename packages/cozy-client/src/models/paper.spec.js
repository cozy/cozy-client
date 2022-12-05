import MockDate from 'mockdate'

import * as paperModel from './paper'

describe('isExpiring', () => {
  const fakeFile01 = {
    name: 'file01',
    metadata: {
      qualification: { label: 'national_id_card' },
      expirationDate: '2022-09-23T11:35:58.118Z'
    }
  }
  const fakeFile02 = {
    name: 'file02',
    metadata: {
      qualification: { label: 'personal_sporting_licence' },
      referencedDate: '2022-09-23T11:35:58.118Z'
    }
  }
  const fakeFile03 = {
    name: 'file03'
  }
  it.each`
    file          | result
    ${fakeFile01} | ${true}
    ${fakeFile02} | ${true}
    ${fakeFile03} | ${false}
  `(`should test if a $file.name is expiring or not`, ({ file, result }) => {
    expect(paperModel.isExpiring(file)).toEqual(result)
  })
})

describe('Expiration', () => {
  beforeEach(() => {
    MockDate.set('2022-11-01T11:35:58.118Z')
  })
  afterEach(() => {
    MockDate.reset()
  })

  const fakeFile01 = {
    _id: '01',
    name: 'national id card',
    created_at: '2022-09-01T00:00:00.000Z',
    metadata: {
      qualification: { label: 'national_id_card' },
      expirationDate: '2022-09-23T11:35:58.118Z'
    }
  }
  const fakeFile02 = {
    _id: '02',
    name: 'personal sporting licence',
    created_at: '2022-09-01T00:00:00.000Z',
    metadata: {
      qualification: { label: 'personal_sporting_licence' },
      referencedDate: '2022-09-23T11:35:58.118Z'
    }
  }

  describe('computeExpirationDate', () => {
    it('should return expirationDate', () => {
      const res = paperModel.computeNormalizeExpirationDate(
        fakeFile01,
        'expirationDate'
      )

      expect(res.toISOString()).toBe('2022-09-23T11:35:58.118Z')
    })
    it('should return referencedDate plus 365 days', () => {
      const res = paperModel.computeNormalizeExpirationDate(
        fakeFile02,
        'referencedDate'
      )

      expect(res.toISOString()).toBe('2023-09-23T11:35:58.118Z')
    })

    it('should return "null" if metadata is not found', () => {
      const res = paperModel.computeNormalizeExpirationDate(
        fakeFile02,
        'expirationDate'
      )

      expect(res).toBeNull()
    })
  })

  describe('computeNoticeDate', () => {
    it('should return notice date for file with expirationDate metadata', () => {
      const res = paperModel.computeNoticeDate(fakeFile01, 'expirationDate')

      expect(res.toISOString()).toBe('2022-06-25T11:35:58.118Z')
    })
    it('should return notice date for file with referencedDate metadata', () => {
      const res = paperModel.computeNoticeDate(fakeFile02, 'referencedDate')

      expect(res.toISOString()).toBe('2023-09-08T11:35:58.118Z')
    })
    it('should return null for file without corresponding metadata', () => {
      const res = paperModel.computeNoticeDate(fakeFile02, 'expirationDate')

      expect(res).toBeNull()
    })
  })
})
