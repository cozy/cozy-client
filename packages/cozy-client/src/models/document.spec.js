import { Qualification, setQualification, getQualification } from './document'
import * as qualificationModel from '../assets/qualifications.json'

describe('document qualification', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn')
    jest.spyOn(console, 'info')
  })

  afterEach(() => {
    console.warn.mockRestore()
    console.info.mockRestore()
  })

  it('should get the correct qualification by the label', () => {
    const qualification = Qualification.getQualificationByLabel(
      'national_id_card'
    ).toQualification()
    expect(qualification.label).toEqual('national_id_card')
    expect(qualification.sourceCategory).toEqual('gov')
    expect(qualification.sourceSubCategory).toEqual('civil_registration')
    expect(qualification.subjects).toEqual(['identity'])
  })
  it('should get the file qualification', () => {
    const qualification = {
      label: 'isp_invoice',
      purpose: 'invoice',
      sourceCategory: 'telecom',
      sourceSubCategory: 'internet',
      subjects: ['subscription']
    }
    const fileDoc = {
      _id: '123',
      metadata: { qualification }
    }
    const fileQualification = getQualification(fileDoc)
    expect(fileQualification).toEqual(qualification)
  })

  it('should set the correct qualification', () => {
    const fileDoc = {
      _id: '123',
      metadata: {
        datetime: '2020-01-01T20:38:04Z'
      }
    }
    let qualification = {
      label: 'health_invoice',
      purpose: 'invoice',
      sourceCategory: 'health'
    }
    setQualification(fileDoc, qualification)
    expect(fileDoc).toEqual({
      _id: '123',
      metadata: {
        datetime: '2020-01-01T20:38:04Z',
        qualification: {
          label: 'health_invoice',
          purpose: 'invoice',
          sourceCategory: 'health'
        }
      }
    })

    qualification = Qualification.getQualificationByLabel(
      'other_identity_document'
    )
      .setPurpose('attestation')
      .setSourceCategory('gov')
      .setSourceSubCategory('civil_registration')
      .setSubjects(['identity'])
    setQualification(fileDoc, qualification)
    expect(fileDoc).toEqual({
      _id: '123',
      metadata: {
        datetime: '2020-01-01T20:38:04Z',
        qualification: {
          label: 'other_identity_document',
          purpose: 'attestation',
          sourceCategory: 'gov',
          sourceSubCategory: 'civil_registration',
          subjects: ['identity']
        }
      }
    })
  })

  it('should throw an error when setting a qualification with no label', () => {
    expect(() => setQualification({}, { purpose: 'invoice' })).toThrow()
  })

  it('should throw an error when setting a qualification with an unknown label', () => {
    expect(() =>
      setQualification({}, { label: 'dummy', purpose: 'invoice' })
    ).toThrow()
  })

  it('should throw an error when setting a qualification with missing attributes', () => {
    const qualification = {
      label: 'health_invoice'
    }
    expect(() => setQualification({}, qualification)).toThrow()
  })

  it('should inform when setting an unknown subject', () => {
    const qualification = {
      label: 'health_invoice',
      purpose: 'invoice',
      sourceCategory: 'health',
      subjects: ['very_hard_drugs']
    }
    setQualification({}, qualification)
    expect(console.info).toHaveBeenCalledTimes(1)
  })
})
describe('qualifications items', () => {
  const isAttributeValueAuthorized = (attributeVal, authorizedValues) => {
    let isAuthorized
    if (Array.isArray(attributeVal)) {
      isAuthorized = attributeVal.some(s => authorizedValues.includes(s))
    } else {
      isAuthorized = authorizedValues.includes(attributeVal)
    }
    expect(isAuthorized).toBe(true)
  }

  it('should always define a label', () => {
    qualificationModel.qualifications.forEach(q => {
      expect(q).toHaveProperty('label')
    })
  })

  it('should define authorized attributes', () => {
    qualificationModel.qualifications.forEach(q => {
      if (q.purpose) {
        isAttributeValueAuthorized(
          q.purpose,
          qualificationModel.purposeAuthorizedValues
        )
      }
      if (q.sourceCategory) {
        isAttributeValueAuthorized(
          q.sourceCategory,
          qualificationModel.sourceCategoryAuthorizedValues
        )
      }
      if (q.sourceSubCategory) {
        isAttributeValueAuthorized(
          q.sourceSubCategory,
          qualificationModel.sourceSubCategoryAuthorizedValues
        )
      }
      if (q.subjects) {
        isAttributeValueAuthorized(
          q.subjects,
          qualificationModel.subjectsAuthorizedValues
        )
      }
    })
  })
})
