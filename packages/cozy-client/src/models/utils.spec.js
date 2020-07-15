import { getCreatedByApp } from './utils'

test('getCreatedByApp', () => {
  expect(getCreatedByApp({ cozyMetadata: { createdByApp: 'banks' } })).toBe(
    'banks'
  )
  expect(getCreatedByApp({})).toBe(undefined)
})
