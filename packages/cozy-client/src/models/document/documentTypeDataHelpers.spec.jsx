import { getThemeByItem, isQualificationNote } from './documentTypeDataHelpers'

describe('DocumentTypeDataHelpers', () => {
  it('should test getThemeByItem and return defaultTheme', () => {
    const item = {
      label: 'family_record_book',
      purpose: 'attestation',
      sourceCategory: 'gov',
      sourceSubCategory: 'civil_registration',
      subjects: ['family'],
      defaultTheme: 'theme2'
    }
    const theme = getThemeByItem(item)
    expect(theme.id).toBe('theme2')
  })

  it('should test getThemeByItem and return the theme if no defaultTheme', () => {
    const item = {
      label: 'residence_permit',
      purpose: 'attestation',
      sourceCategory: 'gov',
      sourceSubCategory: 'immigration',
      subjects: ['permit', 'identity']
    }
    const theme = getThemeByItem(item)
    expect(theme.id).toBe('theme1')
  })

  describe('isQualificationNote', () => {
    it('should return true for a qualification with a label starting with "note_"', () => {
      const qualification = { label: 'note_example' }
      const result = isQualificationNote(qualification)
      expect(result).toBe(true)
    })

    it('should return false for a qualification with a label not starting with "note_"', () => {
      const qualification = { label: 'example_note' }
      const result = isQualificationNote(qualification)
      expect(result).toBe(false)
    })
  })
})
