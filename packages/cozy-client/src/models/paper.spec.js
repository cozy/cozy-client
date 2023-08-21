import MockDate from 'mockdate'

import * as paperModel from './paper'

/**
 *
 * @param {object} param - options
 * @param {string} param.qualificationLabel - qualification label
 * @param {string} [param.expirationDate] - expiration date of file
 * @param {string} [param.referencedDate] - reference date of file
 * @param {string} [param.noticePeriod] - period before send notification
 */
const buildMockFile = ({
  qualificationLabel,
  expirationDate,
  referencedDate,
  noticePeriod
}) => {
  return /** @type {import('../types').IOCozyFile} */ ({
    name: qualificationLabel,
    created_at: '2022-09-01T00:00:00.000Z',
    metadata: {
      qualification: { label: qualificationLabel },
      ...(expirationDate && { expirationDate }),
      ...(referencedDate && { referencedDate }),
      ...(noticePeriod && { noticePeriod })
    }
  })
}

describe('Expiration', () => {
  beforeEach(() => {
    MockDate.set('2022-11-01T11:35:58.118Z')
  })
  afterEach(() => {
    MockDate.reset()
  })

  const fakeFileWithoutMetadata = /** @type {import('../types').IOCozyFile} */ ({
    _id: '00',
    name: 'unknown'
  })
  const fakeNationalIdCardFile = buildMockFile({
    qualificationLabel: 'national_id_card',
    expirationDate: '2022-09-23T11:35:58.118Z',
    noticePeriod: '90'
  })
  const fakePassportFile = buildMockFile({
    qualificationLabel: 'passport',
    expirationDate: '2022-09-23T11:35:58.118Z',
    noticePeriod: '90'
  })
  const fakePersonalSportingLicenceFile = buildMockFile({
    qualificationLabel: 'personal_sporting_licence',
    referencedDate: '2022-09-23T11:35:58.118Z'
  })
  const fakeResidencePermitFile = buildMockFile({
    qualificationLabel: 'residence_permit',
    expirationDate: '2022-09-23T11:35:58.118Z',
    noticePeriod: '90'
  })
  const fakeDriverLicense = buildMockFile({
    qualificationLabel: 'driver_license',
    expirationDate: '2022-09-23T11:35:58.118Z',
    noticePeriod: '90'
  })

  describe('computeExpirationDate', () => {
    it('should return expirationDate', () => {
      const res = paperModel.computeExpirationDate(fakeNationalIdCardFile)

      expect(res.toISOString()).toBe('2022-09-23T11:35:58.118Z')
    })
    it('should return referencedDate plus 365 days', () => {
      const res = paperModel.computeExpirationDate(
        fakePersonalSportingLicenceFile
      )

      expect(res.toISOString()).toBe('2023-09-23T11:35:58.118Z')
    })

    it('should return "null" if metadata is not found', () => {
      const res = paperModel.computeExpirationDate(fakeFileWithoutMetadata)

      expect(res).toBeNull()
    })
  })

  describe('computeExpirationNoticeDate', () => {
    it('should return notice date for file with expirationDate metadata', () => {
      const res = paperModel.computeExpirationNoticeDate(fakeNationalIdCardFile)

      expect(res.toISOString()).toBe('2022-06-25T11:35:58.118Z')
    })
    it('should return notice date for file with referencedDate metadata', () => {
      const res = paperModel.computeExpirationNoticeDate(
        fakePersonalSportingLicenceFile
      )

      expect(res.toISOString()).toBe('2023-09-08T11:35:58.118Z')
    })
    it('should return null for file without corresponding metadata', () => {
      const res = paperModel.computeExpirationNoticeDate(
        fakeFileWithoutMetadata
      )

      expect(res).toBeNull()
    })
  })

  describe('computeExpirationNoticeLink', () => {
    it.each`
      file                       | link
      ${fakeNationalIdCardFile}  | ${'https://www.service-public.fr/particuliers/vosdroits/N358'}
      ${fakeResidencePermitFile} | ${'https://www.service-public.fr/particuliers/vosdroits/N110'}
      ${fakePassportFile}        | ${'https://www.service-public.fr/particuliers/vosdroits/N360'}
      ${fakeDriverLicense}       | ${'https://permisdeconduire.ants.gouv.fr/demarches-en-ligne/perte-vol-deterioration-fin-de-validite-ou-changement-d-etat-civil'}
    `(
      `should return "$link" link for an file with "$file.metadata.qualification.label" qualification label`,
      ({ file, link }) => {
        expect(paperModel.computeExpirationNoticeLink(file)).toEqual(link)
      }
    )
  })

  describe('isExpiring', () => {
    const fakeNationalIdCardFileWithoutNoticeDate = buildMockFile({
      qualificationLabel: 'national_id_card',
      expirationDate: '2022-09-23T11:35:58.118Z',
      noticePeriod: ''
    })
    const fakeResidencePermitFileWithoutNoticeDate = buildMockFile({
      qualificationLabel: 'residence_permit',
      expirationDate: '2022-09-23T11:35:58.118Z',
      noticePeriod: ''
    })
    const fakeNationalIdCardFileWithoutExpirationDate = buildMockFile({
      qualificationLabel: 'national_id_card',
      expirationDate: '',
      noticePeriod: '90'
    })
    const fakeResidencePermitFileWithoutExpirationDate = buildMockFile({
      qualificationLabel: 'residence_permit',
      expirationDate: '',
      noticePeriod: '90'
    })

    it.each`
      file                               | result
      ${fakeNationalIdCardFile}          | ${true}
      ${fakePersonalSportingLicenceFile} | ${true}
      ${fakeResidencePermitFile}         | ${true}
    `(
      `should return "$result" for each file with "noticePeriod" & "expirationDate" metadata`,
      ({ file, result }) => {
        expect(paperModel.isExpiring(file)).toEqual(result)
      }
    )

    it.each`
      file                                        | result
      ${fakeNationalIdCardFileWithoutNoticeDate}  | ${false}
      ${fakeResidencePermitFileWithoutNoticeDate} | ${false}
    `(
      `should return "$result" for each file without "noticePeriod" metadata`,
      ({ file, result }) => {
        expect(paperModel.isExpiring(file)).toEqual(result)
      }
    )

    it.each`
      file                                            | result
      ${fakeNationalIdCardFileWithoutExpirationDate}  | ${false}
      ${fakeResidencePermitFileWithoutExpirationDate} | ${false}
    `(
      `should return "$result" for each file without "expirationDate" metadata`,
      ({ file, result }) => {
        expect(paperModel.isExpiring(file)).toEqual(result)
      }
    )
  })
})
