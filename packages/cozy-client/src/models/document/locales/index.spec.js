import { getBoundT } from './index'

describe('getBoundT', () => {
  const t = getBoundT('en')

  it('should return "ID card" without suffix', () => {
    const res = t('Scan.items.national_id_card')

    expect(res).toBe('ID card')
  })
  it('should return "ID card" with "(Stranger)" suffix', () => {
    const res = t('Scan.items.national_id_card', 'stranger')

    expect(res).toBe('ID card (Stranger)')
  })
  it('should return "ID card" with "🇫🇷" suffix', () => {
    const res = t('Scan.items.national_id_card', 'fr')

    expect(res).toBe('ID card (🇫🇷)')
  })
})
